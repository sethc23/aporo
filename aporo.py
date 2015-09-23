
# from ipdb import set_trace as i_trace; i_trace()
from ipdb import set_trace as _debug



class Aporo:

    def __init__(self):
        # from urllib                         import quote_plus,unquote
        # from re                             import findall          as re_findall
        # from re                             import sub              as re_sub       # self.T.re_sub('patt','repl','str','cnt')
        # from re                             import search           as re_search    # re_search('patt','str')
        # from codecs                         import encode           as codecs_enc
        # from traceback                      import format_exc       as tb_format_exc
        # from sys                            import exc_info         as sys_exc_info
        # import                                  inspect             as I
        # from System_Control                 import System_Reporter
        # SYS_r                               =   System_Reporter()
        from datetime                       import timedelta
        from datetime                       import datetime         as DT
        from subprocess                     import Popen            as sub_popen
        from subprocess                     import PIPE             as sub_PIPE
        from types                          import NoneType
        from time                           import sleep            as delay
        from os                             import environ          as os_environ
        from os                             import path             as os_path
        from os                             import mkdir            as os_mkdir
        from os                             import walk             as os_walk
        from uuid                           import uuid4            as get_guid
        from sys                            import path             as py_path
        py_path.append(                         os_environ['SERV_HOME'] + '/aporo')
        py_path.append(                         os_environ['HOME'] + '/.scripts')
        from py_classes                     import To_Class
        APORO_DB                            =   'aporo'
        APORO_APP_URL                       =   'http://app.aporodelivery.com/'
        DAYS_SCHEDULED_AHEAD                =   7
        DG_K_PERIOD                         =   4
        UTC_OFFSET_hr                       =   4
        D                                   =   {'exec_cmds'            :   self.exec_cmds,
                                                 'guid'                 :   str(get_guid().hex)[:7],
                                                 'user'                 :   os_environ['USER'],
                                                 'today'                :   DT.now(),
                                                 'growl_notice'         :   True,
                                                 'debug'                :   True,}
        D.update(                               {'tmp_tbl'              :   'tmp_' + D['guid'] } )

        self.T                              =   To_Class(D)
        all_imports                         =   locals().keys()
        for k in all_imports:
            if not k=='D':
                self.T.update(                  {k                      :   eval(k) })
        globals().update(                       self.T.__getdict__())
        self.pgSQL                          =   self.pgSQL(self)
        self.Config                         =   self.Config(self)
        self.Maintenance                    =   self.Maintenance(self)
        self.AP                             =   self

    def exec_cmds(self,cmds,cmd_host,this_worker):
        cmd                                 =   ' '.join(cmds)
        if cmd_host==this_worker:
            p                               =   self.T.sub_popen(cmd,stdout=self.T.sub_PIPE,shell=True)
        else:
            cmd                             =   "ssh %s '%s'" % (cmd_host,cmd)
            p                               =   self.T.sub_popen(cmd,stdout=self.T.sub_PIPE,shell=True)
        return p.communicate()

    class pgSQL:

        def __init__(self,_parent):
            self.AP                         =   _parent
            self.T                          =   _parent.T
            self.pgSQL                      =   self
            import                              pandas              as pd
            # from pandas.io.sql                  import execute          as sql_cmd
            pd.set_option(                      'expand_frame_repr', False)
            pd.set_option(                      'display.max_columns', None)
            pd.set_option(                      'display.max_rows', 1000)
            pd.set_option(                      'display.width', 180)
            np                              =   pd.np
            np.set_printoptions(                linewidth=200,threshold=np.nan)
            import                              geopandas       as gd
            from sqlalchemy                     import create_engine
            from logging                        import getLogger
            from logging                        import INFO             as logging_info
            getLogger(                          'sqlalchemy.dialects.postgresql').setLevel(logging_info)
            from psycopg2                       import connect          as pg_connect
            from psycopg2                       import OperationalError,InterfaceError
            from system_settings                import DB_HOST,DB_PORT
            try:
                eng                         =   create_engine(r'postgresql://postgres:postgres@%s:%s/%s'
                                                                  %(DB_HOST,DB_PORT,self.T.APORO_DB),
                                                                  encoding='utf-8',
                                                                  echo=False)

                conn                        =   pg_connect("dbname='%s' " % self.T.APORO_DB +
                                                                   "user='postgres' "+
                                                                   "host='%s' password='' port=%s" % (DB_HOST,
                                                                                                      DB_PORT))
                cur                         =   conn.cursor()
            except OperationalError:
                print 'NO DB CONNECTED'
                pass

            all_imports                     =   locals().keys()
            excludes = ['self', '_parent']
            for k in all_imports:
                if not excludes.count(k):
                    self.T.update(              {k                      :   eval(k) })
            self.Functions                  =   self.Functions(self.pgSQL)
            self.Triggers                   =   self.Triggers(self.pgSQL)

        class Functions:

            def __init__(self,_parent):
                self.T                      =   _parent.T
                self.Create                 =   self.Create(self)

            class Create:

                def __init__(self,_parent):
                    self.T                  =   _parent.T
                    self.Create             =   self

                def distribute_normalize_dg_vend_reqs(self,with_verification):
                    """

                    First, this function attempts to take as many 4 hours periods as possible.

                    Second, this function attempts to minimize the number of 1-2 hour blocks by:
                        combining hour blocks, e.g., 1 and 4 becomes 5, or
                        combining and splitting hour block, e.g., 2 and 4 become 3,3.

                    """

                    verification =  """

                            p = \"\"\"
                                SELECT
                                    vend_sched_unit_sum=contract_unit_sum AS
                                        matching_vend_sched_and_contracts_unit_sum
                                FROM

                                    (
                                    select sum(vs.f1) vend_sched_unit_sum
                                    FROM
                                        (
                                        select
                                            (
                                            select sum((units->>jk)::integer) vend_units
                                            from json_object_keys(units::json) jk
                                            ) f1
                                        from vend_sched
                                        where to_char(start_datetime,'DDD YYYY') = '##(day_of_year_and_year)s'
                                        ) vs
                                    ) f1,

                                    (
                                    select sum(c.f1) contract_unit_sum--=sum(c.hour_period)
                                    FROM
                                        (
                                        select
                                            (
                                            select sum((units->>jk)::integer) vend_units
                                            from json_object_keys(units::json) jk
                                            ) f1
                                        from contracts
                                        where to_char(start_datetime,'DDD YYYY') = '##(day_of_year_and_year)s'
                                        ) c
                                    ) f2
                                \"\"\" ## {'day_of_year_and_year'   :   day_of_year_and_year}

                            res = plpy.execute(p)
                            try:
                                assert len(res)!=0
                                assert res[0]['matching_vend_sched_and_contracts_unit_sum']==True
                                plpy.log("TEST PASSED: distribute_normalize_dg_vend_reqs")
                            except AssertionError:
                                plpy.log(res)
                                plpy.fatal("TEST FAILED: distribute_normalize_dg_vend_reqs FAILED")

                    """

                    T   =   {'verification'     :   verification if with_verification else ""}

                    cmd =   """

                        DROP FUNCTION IF EXISTS distribute_normalize_dg_vend_reqs(integer) cascade;
                        DROP FUNCTION IF EXISTS distribute_normalize_dg_vend_reqs(text) cascade;

                        CREATE OR REPLACE FUNCTION distribute_normalize_dg_vend_reqs(day_of_year_and_year text)
                        RETURNS text AS $$

                        from random                     import randrange
                        from copy                       import deepcopy
                        from json                       import dumps as jdump

                        def distribute_and_normalize_hrs_dg_cnt(hrs,dg_cnt,day_of_year_and_year):

                            # DISTRIBUTE HOUR BLOCKS
                            def next_work_period(hrs,dg_nums):

                                def apply_reduction_to_list(hrs,dg_num,work_period):
                                    reduced_dg_num      =   [ dg_num[i]-1 for i in range(len(work_period)) if dg_num[i]-1 ]
                                    remaining_dg_nums   =   reduced_dg_num + dg_num[len(work_period):]
                                    remaining_hrs       =   hrs[-1*len(remaining_dg_nums):] if remaining_dg_nums else []
                                    if len(hrs)>len(work_period):
                                        work_block      =   [ hrs[0],hrs[len(work_period)] ]
                                    else:
                                        # adding the '1' so as to include last hour of work
                                        work_block      =   [ hrs[0],hrs[-1]+1 ]
                                    return work_block,remaining_hrs,remaining_dg_nums

                                work_period             =   [dg_nums[0]]
                                end_pt                  =   len(hrs) if len(hrs)<4 else 4
                                for i in range(1,end_pt):
                                    if dg_nums[i-1]<=dg_nums[i]:
                                        work_period.append( dg_nums[i])
                                    else:
                                        break

                                return apply_reduction_to_list(hrs,dg_nums,work_period)

                            pt,work_blocks = 1,[]
                            while True:
                                wk_blk,hrs,dg_cnt       =   next_work_period(hrs,dg_cnt)
                                work_blocks.append(         (wk_blk[1]-wk_blk[0],wk_blk) )
                                assert len(hrs)==len(dg_cnt)
                                if hrs==dg_cnt==[]:
                                    break
                            pt,a_total_hours            =   0,0
                            for it in work_blocks:
                                a_total_hours          +=   it[0]
                                pt                     +=   1

                            # NORMALIZE HOUR BLOCKS (combine and split)
                            def normalize_work_blocks(wb):

                                def find_blocks_and_combine_split(wb,idx):

                                    def combine_and_split(wb,a_idx,b_idx):
                                        x,y = idx_earlier,idx_later = (a_idx,b_idx) if a_idx<b_idx else (b_idx,a_idx)
                                        a_hrs,a         =   wb.pop(y)
                                        b_hrs,b         =   wb.pop(x)
                                        idx             =   x+1
                                        x,y = time_earlier,time_later = (a,b) if a[0]<b[0] else (b,a)
                                        xy_hours        =   y[1] - x[0]
                                        assert xy_hours==   a_hrs+b_hrs
                                        new_x_hrs       =   int(xy_hours/2.0 if (xy_hours/2.0).is_integer() else int(xy_hours/2.0)+1) # greater hours first
                                        new_y_hrs       =   xy_hours - new_x_hrs
                                        x_e             =   x[0]+new_x_hrs
                                        y[0]            =   x_e
                                        y_e             =   y[0]+new_y_hrs
                                        y_e             =   y_e if y[1]-x[0]==xy_hours else y_e-1
                                        wb.append(          (new_x_hrs, [x[0],x_e]) )
                                        wb.append(          (new_y_hrs, [y[0],y_e]) )
                                        return idx,sorted(wb,key=lambda s: s[1],reverse=True)

                                    hrs,s,e             =   [],[],[]
                                    t                   =   [ (hrs.append(cnt),s.append(it[0]),e.append(it[1])) for cnt,it in wb ]
                                    for i in range(idx,len(s)-1):
                                        if hrs[i]<3:
                                            if e[i+1:].count(s[i]):
                                                return combine_and_split(wb,i,e.index(s[i],i+1))
                                            elif s[:i].count(e[i]):
                                                return combine_and_split(wb,i,s[:i].index(e[i]))
                                    return len(s)-1,False

                                def find_blocks_and_combine(wb):

                                    def combine(wb,a_idx,b_idx):
                                        x,y = idx_earlier,idx_later = (a_idx,b_idx) if a_idx<b_idx else (b_idx,a_idx)
                                        a_hrs,a         =   wb.pop(y)
                                        b_hrs,b         =   wb.pop(x)
                                        x,y = time_earlier,time_later = (a,b) if a[0]<b[0] else (b,a)
                                        xy_hours        =   y[1] - x[0]
                                        assert xy_hours==a_hrs+b_hrs
                                        wb.append(          (xy_hours, [x[0],y[1]]) )
                                        return sorted(wb,key=lambda s: s[1],reverse=True)

                                    hrs,s,e             =[],[],[]
                                    t                   = [ (hrs.append(cnt),s.append(it[0]),e.append(it[1])) for cnt,it in wb ]
                                    for i in range(len(s)):
                                        if hrs[i]<3:

                                            match_cnt_start = s.count(e[i])
                                            if match_cnt_start:
                                                pt      =   0
                                                for j in range(match_cnt_start):
                                                    chk_pt = s.index(e[i],pt)
                                                    if hrs[chk_pt] + hrs[i] == 5:
                                                        # plpy.log('start funct found combine')
                                                        # plpy.log(s[i],e[i],wb[i])
                                                        # plpy.log(s[chk_pt],e[chk_pt],wb[chk_pt])
                                                        return combine(wb,i,chk_pt)
                                                    else:
                                                        pt = chk_pt+1

                                            match_cnt_end = e.count(s[i])
                                            if match_cnt_end:
                                                pt      =   0
                                                for j in range(match_cnt_end):
                                                    chk_pt = e.index(s[i],pt)
                                                    if hrs[chk_pt] + hrs[i] == 5:
                                                        # plpy.log('end funct found combine' )
                                                        # plpy.log(s[i],e[i],wb[i] )
                                                        # plpy.log(s[chk_pt],e[chk_pt],wb[chk_pt] )
                                                        return combine(wb,i,chk_pt)
                                                    else:
                                                        pt = chk_pt+1
                                    return False

                                nothing_to_combine=False
                                while True:
                                    res = find_blocks_and_combine(wb)
                                    if not res:
                                        nothing_to_combine = True
                                    else:
                                        wb = res
                                    if nothing_to_combine:
                                        break

                                nothing_to_combine_split=False
                                idx = 0
                                while True:
                                    idx,res = find_blocks_and_combine_split(wb,idx)
                                    if not res:
                                        nothing_to_combine_split = True
                                    else:
                                        wb = res
                            #             print 'combined and split'
                                    if nothing_to_combine_split:
                                        break

                                return sorted(wb,key=lambda s: s[1],reverse=False)



                            wb                          =   normalize_work_blocks(deepcopy(work_blocks[:]))
                            plpy.log(                       wb)
                            # GET SOURCE DATA FROM VEND_SCHED

                            p = \"\"\"
                                SELECT
                                    vend vend,
                                    start_hr start_hrs,
                                    vend_units vend_units
                                FROM
                                    (
                                    SELECT
                                        start_datetime,
                                        to_char(start_datetime,'HH24')::integer start_hr,
                                        json_object_keys(units::json) vend,
                                        (units->>json_object_keys(units::json))::integer vend_units
                                    FROM     vend_sched
                                    WHERE    to_char(start_datetime,'DDD YYYY') = '##s'
                                    ORDER BY start_datetime,vend_units
                                    ) f1
                                \"\"\" ## day_of_year_and_year

                            res                         =   plpy.execute(p)
                            assert len(res)            !=   0
                            vend                        =   map(lambda s: s['vend'],res)
                            vend_st_hrs                 =   map(lambda s: s['start_hrs'],res)
                            vend_units                  =   map(lambda s: s['vend_units'],res)


                            # MAKE DATA FOR INSERTING
                            pt,b_total_hours            =   0,0
                            delete_statement            =   ''.join(["DELETE FROM contracts ",
                                                                     "WHERE to_char(start_datetime,'DDD YYYY') = ",
                                                                     "'##s'" ## day_of_year_and_year])
                            ins_template                =   ''.join(["(to_timestamp('##s " ## day_of_year_and_year,
                                                                     "##d','DDD YYYY HH24'),'##s',##d)"])

                            j_pt,new_wb,uniq_vend       =   0,[],[]
                            new_units                   =   [ [] for i in range(len(wb)) ]
                            curr_units                  =   0
                            for i in range(len(wb)):

                                hrs,hr_range            =   wb[i]
                                h_st,h_en               =   hr_range
                                b_total_hours          +=   hrs
                                pt                     +=   1

                                break_to_i              =   False
                                for j in range(j_pt,len(vend_st_hrs)):

                                    curr_vend           =   vend[j] # if the units run out, does vendor change before j? --no
                                    curr_vend_st_hrs    =   vend_st_hrs[j]
                                    if not curr_units:
                                        curr_units      =   vend_units[j]

                                    repl_curr_units     =   curr_units
                                    # ^^ USED AS POINTER SO UNIT PT. IS SAVED B/T CHANGE IN 'i'

                                    for k in range(curr_units):

                                        if not (curr_vend_st_hrs<h_en or repl_curr_units>0):
                                            break

                                        elif len(new_units[i])==hrs:    # ONLY TRUE NOW while vend_unit:dg_unit == 1:1
                                            break_to_i  =   True
                                            j_pt        =   j
                                            break

                                        else:

                                            repl_curr_units-=   1

                                            T           =   {'curr_vend_st_hrs'     :   curr_vend_st_hrs,
                                                             'h_en'                 :   h_en,
                                                             'len_new_units[i]'     :   len(new_units[i]),
                                                             'hrs'                  :   hrs,
                                                             'j'                    :   j,
                                                             'curr_vend'            :   curr_vend,
                                                             'j_pt'                 :   j_pt,
                                                            }
                                            plpy.log(       str([(ki,T[ki]) for ki in sorted(T)]))

                                            new_units[i].append( [curr_vend,1] )              # '1' here b/c vend_sched is row/hr

                                    curr_units          =   repl_curr_units

                                    if break_to_i:
                                        break


                            plpy.log('MAKING INSERTS NOW')
                            for i in range(len(new_units)):
                                this_row                =   new_units[i]
                                hrs,hr_range            =   wb[i]
                                h_st,h_en               =   hr_range


                                # USING DICTIONARY HERE RESULTS USING ON VENDORS WITH CNTS
                                D                        =  {}
                                hrs
                                for v,cnt in this_row:
                                    if D.has_key(v):        D[v]+=cnt
                                    else:                   D.update({v:cnt})
                                plpy.log(h_st,jdump(D),hrs)

                                new_wb.append(              ins_template ## (h_st,jdump(D),hrs) )




                            assert a_total_hours       ==   b_total_hours
                            assert len(work_blocks)    >=   len(new_wb)
                            plpy.log(                       "INSERT ITEMS")
                            for it in new_wb:
                                plpy.log(                   it)
                            all_inserts                 =   ','.join(new_wb)


                            p = \"\"\"

                                ##(delete_statement)s;

                                \"\"\" ## {'all_inserts':all_inserts,'delete_statement':delete_statement}

                            res                         =   plpy.execute(p)

                            p = \"\"\"

                                INSERT INTO contracts (start_datetime,units,hour_period)
                                VALUES ##(all_inserts)s
                                RETURNING contract_id;

                                \"\"\" ## {'all_inserts':all_inserts,'delete_statement':delete_statement}

                            res                         =   plpy.execute(p)

                            try:
                                assert len(res)        !=   0
                                all_contract_ids        =   map(lambda s: s['contract_id'],res)
                                plpy.log(                   "INSERTED CONTRACT_IDS",all_contract_ids)
                                return True
                            except AssertionError:
                                plpy.log(                   p)
                                plpy.log(                   res)
                                plpy.error(                 "F(X) FAILED: distribute_and_normalize_hrs_dg_cnt")

                            # END OF FUNCTION: distribute_and_normalize_hrs_dg_cnt


                        p = \"\"\"

                            SELECT hr,dg_sum
                            FROM
                                (
                                SELECT DISTINCT ON (uid)
                                    uid,hr,
                                    sum(dg_num) over (partition by uid) dg_sum
                                FROM
                                    (
                                    SELECT
                                        ((f1.units->json_object_keys(f1.units::json))::text)::integer dg_num,
                                        f1.uid,f1.units,to_char(f1.start_datetime,'HH24')::integer hr
                                    FROM
                                        (
                                        SELECT * FROM vend_sched vc
                                        WHERE to_char(start_datetime,'DDD YYYY')='##s'
                                        ) f1
                                    ) f2
                                ) f3
                            ORDER BY hr

                            \"\"\" ## day_of_year_and_year

                        res                             =   plpy.execute(p)
                        plpy.log(                           res)
                        if len(res)==0:
                            plpy.log("ERROR - distribute_normalize_dg_vend_reqs - no results for day ##s" ## day_of_year_and_year)
                            return 'nothing updated'
                        else:
                            hrs                         =   map(lambda s: s['hr'],res)
                            dg_cnt                      =   map(lambda s: s['dg_sum'],res)
                            return   distribute_and_normalize_hrs_dg_cnt(hrs,dg_cnt,
                                                                                                day_of_year_and_year)

                            #%(verification)s

                            #if f_res:
                            #    return 'OK'
                            #else:
                            #    plpy.log("ERROR - distribute_normalize_dg_vend_reqs - no results for day ##d" ## day_of_year_and_year)
                            #    plpy.error("ERROR - distribute_normalize_dg_vend_reqs - f_res:" + f_res)

                        $$ LANGUAGE plpythonu;
                    """ % T
                    cmd = cmd.replace('##','%')
                    # pt=1
                    # for it in cmd.split('\n'):
                    #     print pt,it
                    #     pt+=1
                    self.T.conn.set_isolation_level(        0)
                    self.T.cur.execute(                     cmd)
                    return

        class Triggers:

            def __init__(self,_parent):
                self.T                      =   _parent.T
                self.Create                 =   self.Create(self)

            class Create:

                def __init__(self,_parent):
                    self.T                  =   _parent.T
                    self.Create             =   self

                def vend_sched_insert(self):
                    cmd="""
                        --DROP FUNCTION IF EXISTS vend_sched_after_inserts() cascade;
                        --DROP TRIGGER IF EXISTS vend_sched_after_inserts ON vend_sched;

                        DROP FUNCTION IF EXISTS vend_sched_each_insert() cascade;
                        DROP TRIGGER IF EXISTS vend_sched_each_insert ON vend_sched;

                        CREATE OR REPLACE FUNCTION vend_sched_each_insert()
                        RETURNS trigger AS $funct$

                        from traceback                      import format_exc       as tb_format_exc
                        from sys                            import exc_info         as sys_exc_info

                        try:

                            T                           =   TD["new"]

                            p = \"\"\"

                                INSERT INTO tmp_for_triggers (_table,_col,_value)
                                VALUES ('vend_sched','uid',##(uid)s)
                                RETURNING _value uid

                                \"\"\" ## T

                            res = plpy.execute(p)
                            try:
                                assert len(res)        !=   0
                                assert res[0]['uid']   ==   str(T['uid'])
                                return
                            except AssertionError:
                                plpy.log(                   "len(res),res[0]['uid'],str(T['uid'])",
                                                             len(res),res[0]['uid'],str(T['uid']) )
                                plpy.log(                   p)
                                plpy.log(                   res)
                                plpy.log(                   T)
                                plpy.error(                 "TRIGGER F(X) FAILED: vend_sched_each_insert")



                        except plpy.SPIError:
                            plpy.log(                       "TRIGGER F(X) FAILED: vend_sched_each_insert")
                            plpy.log(                       tb_format_exc())
                            plpy.log(                       sys_exc_info()[0])
                            return


                        $funct$ language "plpythonu";

                        CREATE TRIGGER vend_sched_each_insert
                        AFTER INSERT ON vend_sched
                        FOR EACH ROW
                        EXECUTE PROCEDURE vend_sched_each_insert();

                    """.replace('##','%')
                    self.T.conn.set_isolation_level(        0)
                    self.T.cur.execute(                     cmd)

                    cmd="""

                        DROP FUNCTION IF EXISTS vend_sched_after_inserts() cascade;
                        DROP TRIGGER IF EXISTS vend_sched_after_inserts ON vend_sched;

                        CREATE OR REPLACE FUNCTION vend_sched_after_inserts()
                        RETURNS trigger AS $funct$

                        from os                             import system           as os_cmd

                        try:

                            chk                             =   "select count(*) cnt from tmp_for_triggers"
                            res                             =   plpy.execute(t)
                            # plpy.log(                           "QUICK COUNT")
                            # plpy.log(                           res)

                            if res[0]['cnt']==0:
                                return
                            else:

                                p = \"\"\"
                                    WITH cleanup AS (
                                        DELETE FROM tmp_for_triggers WHERE _table='vend_sched'
                                        RETURNING _value uid
                                        )
                                    SELECT DISTINCT to_char(vs.start_datetime,'DDD YYYY') new_days_and_year
                                    FROM
                                        vend_sched vs,
                                        cleanup c
                                    WHERE vs.uid::text = c.uid
                                    \"\"\"

                                res                         =   plpy.execute(p)
                                try:
                                    assert len(res)        !=   0
                                except AssertionError:
                                    plpy.log(p)
                                    plpy.log(res)
                                    plpy.error("TRIGGER F(X) FAILED: vend_sched_after_inserts")
                                t                           =   map(lambda s: s['new_days_and_year'],res)
                                new_days_and_year           =   '{##s}' ## str(t).strip('[]').replace("'",'"')


                                cmd = ''.join([ "curl -X POST ",
                                                "'",
                                                '&'.join([  "http://app.aporodelivery.com/ngx/?",
                                                            "table=vend_sched",
                                                            "trigger=vend_sched_insert",
                                                            "new=##s" ## new_days_and_year ]),
                                                "'",
                                                #" > /dev/null 2>&1",
                                                " &",
                                                 ])
                                plpy.log(cmd)
                                os_cmd(cmd)

                                return

                        except plpy.SPIError:
                            plpy.log('TRIGGER: vend_sched_after_inserts FAILED')
                            plpy.log(tb_format_exc())
                            plpy.log(sys_exc_info()[0])
                            return


                        $funct$ language "plpythonu";

                        CREATE TRIGGER vend_sched_after_inserts
                        AFTER INSERT ON vend_sched
                        EXECUTE PROCEDURE vend_sched_after_inserts();
                    """.replace('##','%')
                    self.T.conn.set_isolation_level(        0)
                    self.T.cur.execute(                     cmd)
                    return

    class Config:

        def __init__(self,_parent):
            self.AP                         =   _parent
            self.T                          =   _parent.T
            self.exec_cmds                  =   _parent.exec_cmds
            # self.Config                     =   self

        def update_build_files(self):
            def make_dir_path(d_path,base_dir):
                dirs_in_path                =   d_path.replace(base_dir,'').lstrip('/').split('/')
                for d in dirs_in_path:
                    base_dir                =   '/'.join([base_dir,d])
                    if not os_path.isdir(base_dir):
                        os_mkdir(               base_dir)

            from_dir                        =   os_environ['APORO']
            to_dir                          =   os_environ['SERV_HOME'] + '/BUILD/files/aporo/src'

            specific_paths                  =   {os_environ['SERV_HOME']+'/.scripts/pgsql_functions.sql':
                                                 to_dir.replace('/src','/setup')}


            for k,v in specific_paths.items():
                cmd                 =   'cp -R %s %s' % (k,v)
                p                   =   sub_popen(cmd,stdout=sub_PIPE,shell=True)
                (_out,_err)         =   p.communicate()
                assert _out        ==   ''
                assert _err        ==   None

            # COPY FILES TO DESTINATION
            excludes                        =   ['.pyc','ENV']
            src_files                       =   []
            for root, sub_dir, files in os_walk(from_dir):
                for f in files:
                    f_path                  =   os_path.join(root,f)
                    if not sum([f_path.count(it) for it in excludes]):
                        new_f_path          =   f_path.replace(from_dir,to_dir)
                        src_files.append(       new_f_path)
                        new_dir_path        =   new_f_path[:new_f_path.rfind('/')]
                        if not os_path.isdir(new_dir_path):
                            make_dir_path(      new_dir_path,to_dir)
                        cmd                 =   'cp -R %s %s' % (f_path,new_f_path)
                        p                   =   sub_popen(cmd,stdout=sub_PIPE,shell=True)
                        (_out,_err)         =   p.communicate()
                        assert _out        ==   ''
                        assert _err        ==   None

            # REMOVE FILES FROM DESTINATION NOT IN SOURCE
            for root, sub_dir, files in os_walk(from_dir):
                for f in files:
                    f_path                  =   os_path.join(root,f)
                    if src_files.count(f_path):
                        t                   =   src_files.pop(src_files.index(f_path))
            for it in src_files:
                cmd                         =   'rm -fR %s' % it
                p                           =   sub_popen(cmd,stdout=sub_PIPE,shell=True)
                (_out,_err)                 =   p.communicate()
                assert _out                ==   ''
                assert _err                ==   None

            return

        def build_db(self):
            cmds                            =   ['echo "money" | sudo -S --prompt=\'\' ',
                                                 'script -qc \"bash -i -l -c \'',
                                                 '$APORO/ENV/bin/python $APORO/mgmt/build.py',
                                                 '\'\";',
                                                 'rm -f typescript;'
                                                ]

            (_out,_err)                     =   self.exec_cmds(cmds,'ub2','ub2')
            print _out
            print _err
            assert _err==None
            for it in _out.split('\n'):
                if it.lower().count('error')>0:
                    print it
                else:
                    print it

            return

        def destroy_db(self):
            psql_cmd    = ['script -aqc "echo \"money\" | sudo -S -k --prompt=\'\'',
                           ' sudo su postgres -c \\\"',
                                'psql --host=0.0.0.0 --port=8800 --username=postgres -c \'',
                                '\\i $TMP;',
                           '\' \\\" ";',
                           'rm typescript;']
            cmd1        = [ 'echo "UPDATE pg_database set datallowconn = \'false\' where datname = \'aporo\';" > tmp;',
                            'echo "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = \'aporo\';" >> tmp;',
                            'echo "DROP DATABASE IF EXISTS aporo;" >> tmp;']
            cmd2        = [ 'TMP="`pwd`/tmp";',
                            ''.join(psql_cmd),]
            cmd3        = [ 'TMP="`pwd`/tmp";',
                            'rm $TMP;',
                            'unset TMP;']
            (_out,_err)                     =   self.exec_cmds(cmd1,'ub2','ub2')
            assert _err==None
            (_out,_err)                     =   self.exec_cmds(cmd2,'ub2','ub2')
            assert _err==None
            (_out,_err)                     =   self.exec_cmds(cmd3,'ub2','ub2')
            assert _err==None
            return

        def load_sample_data(self):
            """
                . Make User ALPHA
                . Make Vendor 1 ("vendor_mgr")
                . Device ALPHA
                . Make User BRAVO
                . Make Currier 1
                . Device BRAVO
                . Make Order 1
                . - add locations

                . Make User CHARLIE
                . Make Vendor 2 ("vendor_empl")
                . Device CHARLIE
                . Make User DELTA
                . Make Currier 2
                . Device DELTA
                . Make Order Two
                . - add locations
            """
            cmd = """

            -- MAKE VENDOR 1

                WITH
                    ins_1 as (
                        select z_get_seq_value('devices_device_id_seq'::text) device_id
                    ),
                    ins_2 as (
                        select z_get_seq_value('vendors_vendor_id_seq'::text) vendor_id
                    ),
                    ins_3 as (
                        INSERT INTO users (first_name,last_name,user_type,device_id,vendor_id)
                        SELECT 'ALPHA','ALPHA','vendor_mgr',i1.device_id,i2.vendor_id
                        FROM ins_1 i1,ins_2 i2
                        RETURNING device_id,vendor_id,user_id
                    ),
                    ins_4 as (
                        INSERT INTO vendors (vend_name,addr1,schedule,area,holidays,device_id,user_id)
                        SELECT 'ALPHA_BIZ','ONE_pickup_addr',
                                '{
                                "tue":         [{"dg":[2,1,1,2,1],"start":[11,10,15,17,20],"end":[15,11,17,20,23]}],
                                "wed":         [{"copy": "tue","start":[11],"end":[13],"dg":[3]}],
                                "thu":         [{"copy": "wed","start":[17],"end":[20],"dg":[4]}],
                                "fri":         [{"copy":  "thu"}],
                                "sat":         [{"start":[10,13],"end":[18,17],"dg":[1,2]}],
                                "sun":         [{"copy":  "sat"}]
                                }',
                                'Murray Hill','{"Labor Day" : "closed"}',i3.device_id,i3.user_id
                        FROM ins_3 i3
                        RETURNING device_id,user_id,vendor_id

                    )

                INSERT INTO devices (model,platform,user_id,vendor_id)
                SELECT 'iphone','os7',i4.user_id,i4.vendor_id
                FROM ins_4 i4;

            -- MAKE CURRIER 1

                WITH
                    ins_1 as (
                        select z_get_seq_value('devices_device_id_seq'::text) device_id
                    ),
                    ins_2 as (
                        select z_get_seq_value('curriers_currier_id_seq'::text) currier_id
                    ),
                    ins_3 as (
                        INSERT INTO users (first_name,last_name,user_type,device_id,vendor_id)
                        SELECT 'BRAVO','BRAVO','currier',i1.device_id,i2.currier_id
                        FROM ins_1 i1,ins_2 i2
                        RETURNING device_id,currier_id,user_id
                    ),
                    ins_4 as (
                        INSERT INTO curriers (speed_rating,worktime_rating,device_id,user_id)
                        SELECT '1.0','1.0',i3.device_id,i3.user_id
                        FROM ins_3 i3
                        RETURNING device_id,user_id,currier_id
                    )

                INSERT INTO devices (model,platform,user_id,currier_id)
                SELECT 'Samsung Galaxy','Kanga',i4.user_id,i4.currier_id
                FROM ins_4 i4;

            -- MAKE ORDER 1

                WITH
                    ins_1 as (
                        select vendor_id,device_id,addr1 from vendors order by vendor_id asc limit 1
                    ),
                    ins_2 as (
                        select currier_id,device_id from curriers order by currier_id asc limit 1
                    ),
                    ins_3 as (
                        INSERT INTO orders (vendor_id,vendor_dev_id,currier_id,currier_dev_id,call_in,deliv_addr,tag)
                        SELECT v.vendor_id,v.device_id,c.currier_id,c.device_id,True,'ONE_deliv_addr','TAG1'
                        FROM ins_1 v,ins_2 c
                        RETURNING order_id,currier_id,web,call_in,deliv_addr,tag
                    ),
                    ins_4 as (
                        INSERT INTO locations (order_id,loc_num,currier_id,web,call_in,pickup,addr,tag)
                        SELECT o.order_id,1,o.currier_id,o.web,o.call_in,True,v.addr1,o.tag
                        FROM ins_1 v,ins_3 o
                        RETURNING order_id,currier_id
                    )
                INSERT INTO locations (order_id,loc_num,currier_id,web,call_in,delivery,addr,tag)
                SELECT o.order_id,2,o.currier_id,o.web,o.call_in,True,o.deliv_addr,o.tag
                FROM ins_3 o;

            -- MAKE VENDOR 2

                WITH
                    ins_1 as (
                        select z_get_seq_value('devices_device_id_seq'::text) device_id
                    ),
                    ins_2 as (
                        select z_get_seq_value('vendors_vendor_id_seq'::text) vendor_id
                    ),
                    ins_3 as (
                        INSERT INTO users (first_name,last_name,user_type,device_id,vendor_id)
                        SELECT 'CHARLIE','CHARLIE','vendor_empl',i1.device_id,i2.vendor_id
                        FROM ins_1 i1,ins_2 i2
                        RETURNING device_id,vendor_id,user_id
                    ),
                    ins_4 as (
                        INSERT INTO vendors (vend_name,addr1,schedule,area,holidays,device_id,user_id)
                        SELECT 'CHARLIE_BIZ','TWO_pickup_addr',
                                '{
                                "tue":         [{"dg":[2,1,2,3,1],"start":[11,10,15,17,20],"end":[15,11,17,20,23]}],
                                "wed":         [{"copy": "tue","start":[11],"end":[13],"dg":[2]}],
                                "thu":         [{"copy": "wed","start":[17],"end":[20],"dg":[1]}],
                                "fri":         [{"copy":  "thu"}],
                                "sat":         [{"start":[10,13],"end":[18,17],"dg":[2,3]}],
                                "sun":         [{"copy":  "sat"}]
                                }',
                                'Murray Hill','{"Labor Day" : "closed"}',i3.device_id,i3.user_id
                        FROM ins_3 i3
                        RETURNING device_id,user_id,vendor_id
                    )

                INSERT INTO devices (model,platform,user_id,vendor_id)
                SELECT 'Blackberry','something old',i4.user_id,i4.vendor_id
                FROM ins_4 i4;

            -- MAKE CURRIER 2

                WITH
                    ins_1 as (
                        select z_get_seq_value('devices_device_id_seq'::text) device_id
                    ),
                    ins_2 as (
                        select z_get_seq_value('curriers_currier_id_seq'::text) currier_id
                    ),
                    ins_3 as (
                        INSERT INTO users (first_name,last_name,user_type,device_id,vendor_id)
                        SELECT 'DELTA','DELTA','currier',i1.device_id,i2.currier_id
                        FROM ins_1 i1,ins_2 i2
                        RETURNING device_id,currier_id,user_id
                    ),
                    ins_4 as (
                        INSERT INTO curriers (speed_rating,worktime_rating,device_id,user_id)
                        SELECT '1.0','10.0',i3.device_id,i3.user_id
                        FROM ins_3 i3
                        RETURNING device_id,user_id,currier_id
                    )

                INSERT INTO devices (model,platform,user_id,currier_id)
                SELECT 'Windows Mobile','9.0',i4.user_id,i4.currier_id
                FROM ins_4 i4;

            """

            try:
                self.T.conn.set_isolation_level(        0)
                self.T.cur.execute(                     cmd)
            except:
                # _debug()
                # self.AP.pgSQL.__init__(self.AP)
                self.AP.pgSQL                           =   self.AP.pgSQL.__init__(self.AP)
                self.T.conn.set_isolation_level(        0)
                self.T.cur.execute(                     cmd)

            time_in_90 = self.T.DT.now() + self.T.timedelta(hours=1,minutes=30)
            cmd="""
            -- MAKE ORDER 2
                WITH
                    ins_1 as (
                        select vendor_id,device_id,addr1 from vendors order by vendor_id asc offset 1 limit 1
                    ),
                    ins_2 as (
                        select currier_id,device_id from curriers order by currier_id asc offset 1 limit 1
                    ),
                    ins_3 as (
                        INSERT INTO orders (vendor_id,vendor_dev_id,currier_id,currier_dev_id,web,req_pickup_time,deliv_addr,tag)
                        SELECT v.vendor_id,v.device_id,c.currier_id,c.device_id,True,'%(time_in_90)s','TWO_deliv_addr','TAG2'
                        FROM ins_1 v,ins_2 c
                        RETURNING order_id,currier_id,web,call_in,deliv_addr,tag
                    ),
                    ins_4 as (
                        INSERT INTO locations (order_id,loc_num,currier_id,web,call_in,pickup,addr,tag)
                        SELECT o.order_id,3,o.currier_id,o.web,o.call_in,True,v.addr1,o.tag
                        FROM ins_1 v,ins_3 o
                        RETURNING order_id,currier_id
                    )
                INSERT INTO locations (order_id,loc_num,currier_id,web,call_in,delivery,addr,tag)
                SELECT o.order_id,4,o.currier_id,o.web,o.call_in,True,o.deliv_addr,o.tag
                FROM ins_3 o;

            """ % {'time_in_90':self.T.DT.now() + self.T.timedelta(hours=1,minutes=30)}

            self.T.conn.set_isolation_level(        0)
            self.T.cur.execute(                     cmd)
            return

        def load_forms(self):
            from mgmt import forms as F
            from json import dumps as j_dump
            forms = [it for it in dir(F) if not it.count('__')]
            for it in forms:
                f = getattr(F,it)()
                f_name,f_url,f_method,f_input_source,f_inputs,f_additional_forms = f
                f = f_name,f_url,f_method,f_input_source,f_inputs.replace("'","''"),f_additional_forms
                cmd = """

                    INSERT INTO forms (created,form_name,url,method,input_source,form_inputs,additional_forms)
                    VALUES (now(),'%s','%s','%s','%s','%s','%s')

                """ % f
                self.T.conn.set_isolation_level(        0)
                self.T.cur.execute(                     cmd)
            return

    class Maintenance:

        def __init__(self,_parent):

            self.AP                         =   _parent
            self.T                          =   _parent.T
            self.exec_cmds                  =   _parent.exec_cmds
            self.Maintenance                =   self
            py_path.append(                     '/home/ub2/SERVER2/ipython/ENV/' +
                                                'local/lib/python2.7/site-packages/matplotlib')
            from matplotlib.pyplot          import bar
            from time                       import tzname           as t_tzname
            THIS_TZ                         =   list(t_tzname)[-1]
            all_imports                     =   locals().keys()
            excludes = ['self', '_parent']
            for k in all_imports:
                if not excludes.count(k):
                    self.T.update(                {k                      :   eval(k) })

        def update_contracts_by_vendor(self):
            """
            For all vendors,
            """
            def process_contracts_by_date(self,v,start_date,end_date):
                pd = process_dates      =   self.T.pd.DataFrame(data=
                                                    {'process_dates':[start_date + self.T.timedelta(days=x)
                                                                         for x in range(
                                                                            (end_date - start_date).days + 1)]})
                pd['day_i']             =   pd.process_dates.map(lambda d: d.weekday())
                day_dict                    =   {'Mon':0,'Tue':1,'Wed':2,'Thu':3,'Fri':4,'Sat':5,'Sun':6}

                    # for val in vendors:
                    #   for D in days:
                    #       for j in hours:
                    #           upsert to contracts DB

                g                           =   v.groupby('vendor_id')
                for _,val in g.groups.iteritems():
                    V                       =   v.iloc[val,:].reset_index(drop=True)
                    V['sort_order']         =   V._day.map(day_dict)
                    V                       =   V.sort('sort_order').drop(['sort_order'],axis=1)

                    for _,D in V.iterrows():
                        vend_name           =   D.vend_name
                        day                 =   D._day
                        day_i               =   day_dict[day]
                        dg_cnt              =   D._dg
                        start_times         =   D._start
                        end_times           =   D._end
                        copy_from           =   D._copy_from
                        copy_interval       =   '0' if not copy_from else str(day_dict[day] - day_dict[copy_from])
                        area                =   D.area
                        holidays            =   D.holidays
                        entry_num           =   0 if not D.cnt.is_integer() else int(D.cnt)

                        if not entry_num:
                            hr_unit_D           =   {0:0}
                        else:
                            hrs,dgs             =   [],[]
                            for j in range(entry_num):
                                hrs.extend(         range(start_times[j],end_times[j]))
                                dgs.extend(         [  dg_cnt[j] for it in range(start_times[j],end_times[j])  ])

                            t                   =   self.T.bar(hrs,dgs)
                            hr_unit_D           =   {}
                            for j in t.get_children():
                                hr_unit_D.update(   {j.get_x()      :   j.get_height()})

                        for _,d in pd[pd.day_i==day_i].process_dates.iteritems():
                            for hr,dg in hr_unit_D.iteritems():
                                T       =   {'dt'           :   self.T.DT(*d.timetuple()[:3]+(hr,0)).isoformat(),
                                             'vend'         :   vend_name,
                                             'dg'           :   str(dg),
                                             'hr'           :   str(hr),
                                             'tz'           :   self.T.THIS_TZ,
                                             'copy_from'    :   copy_from,
                                             'copy_interval':   copy_interval,
                                             'area'         :   area}
                                copy_from,copy_interval     =   'None',0
                                cmd     =   """
                                            WITH
                                                sel AS (    -- checking to see whether entry exists for datetime (units value not important here)
                                                    SELECT  count(*) cnt
                                                    FROM    vend_sched
                                                    WHERE   start_datetime = '%(dt)s'::timestamp with time zone at time zone '%(tz)s'
                                            ),
                                                sel_day AS (
                                                    SELECT  count(*) cnt
                                                    FROM    vend_sched
                                                    WHERE   to_char(start_datetime,'DDD') =
                                                        to_char('%(dt)s'::timestamp with time zone at time zone '%(tz)s','DDD')
                                            ),
                                                copy_from AS (
                                                    INSERT INTO vend_sched (start_datetime,units,area,is_open,dg_units)
                                                    SELECT  start_datetime + interval '%(copy_interval)s days',
                                                            CASE
                                                                WHEN start_datetime + interval '1 days'=
                                                                        '%(dt)s'::timestamp with time zone at time zone '%(tz)s'
                                                                THEN json_object_set_keys(units::json,array['%(vend)s'],array[%(dg)s])::jsonb
                                                                ELSE units
                                                            END,
                                                            area,is_open,100
                                                    FROM    sel_day sd,vend_sched
                                                    WHERE   sd.cnt = 0
                                                    AND     '%(copy_from)s' != 'None'
                                                    AND     to_char(start_datetime,'Dy'::text) = '%(copy_from)s'
                                                    AND     units ? '%(vend)s'
                                                    AND     to_char(start_datetime,'DDD')::integer =
                                                        to_char('%(dt)s'::timestamp with time zone at time zone '%(tz)s','DDD')::integer - %(copy_interval)s
                                                    RETURNING uid
                                            ),
                                                upd_from AS (
                                                    UPDATE  vend_sched vs SET
                                                        units = json_object_set_keys(k.units::json,array['%(vend)s'],array[%(dg)s])::jsonb,
                                                        dg_units = 50

                                                    FROM    (select count(*) cnt from sel) s,
                                                            (select count(*) cnt from sel_day) sd,
                                                            (select count(*) cnt from copy_from) cf,
                                                            (
                                                                select  uid,start_datetime,units
                                                                from    vend_sched
                                                                where   start_datetime =
                                                                            '%(dt)s'::timestamp with time zone at time zone '%(tz)s' -
                                                                            interval '%(copy_interval)s days'
                                                                and     '%(copy_from)s' != 'None'
                                                            ) k
                                                    WHERE   (s.cnt = 0 AND sd.cnt != 0 AND cf.cnt = 0)
                                                    AND     %(dg)s != 0
                                                    AND     '%(copy_from)s' != 'None'
                                                    AND     k.start_datetime + interval '%(copy_interval)s days' =
                                                                vs.start_datetime
                                                    RETURNING vs.uid
                                            ),
                                                upd_from_2 AS (
                                                    UPDATE  vend_sched vs SET
                                                        units = json_object_set_keys(k.units::json,array['%(vend)s'],array[k.units->'%(vend)s'])::jsonb,
                                                        dg_units = 50

                                                    FROM    (select count(*) cnt from upd_from) uf,
                                                            (
                                                                select  uid,start_datetime,units
                                                                from    vend_sched
                                                                where   to_char(start_datetime,'DDD')::integer =
                                                                            to_char('%(dt)s'::timestamp with time zone at time zone '%(tz)s','DDD')::integer
                                                                            - %(copy_interval)s
                                                                and     '%(copy_from)s' != 'None'
                                                            ) k
                                                    WHERE   uf.cnt = 0
                                                    AND     '%(copy_from)s' != 'None'
                                                    AND     vs.start_datetime = k.start_datetime + interval '%(copy_interval)s days'
                                                    RETURNING vs.uid
                                            ),  ins AS (
                                                    INSERT INTO vend_sched (start_datetime,units,area,is_open)
                                                    SELECT
                                                        '%(dt)s'::timestamp with time zone at time zone '%(tz)s',
                                                        json_build_object('%(vend)s',%(dg)s)::jsonb,
                                                        '%(area)s',
                                                        True
                                                    FROM    sel s,
                                                            (select count(*) cnt from copy_from) cf,
                                                            (select count(*) cnt from upd_from) uf,
                                                            (select count(*) cnt from upd_from_2) uf2
                                                    WHERE   s.cnt = 0 AND cf.cnt = 0 AND uf.cnt=0 AND uf2.cnt=0
                                                    RETURNING uid
                                            )
                                            UPDATE  vend_sched SET units = json_object_set_keys(units::json,array['%(vend)s'],array[%(dg)s])::jsonb
                                            FROM    sel,(select count(*) cnt from copy_from) cf
                                            WHERE   (sel.cnt != 0 OR cf.cnt != 0)
                                            AND     start_datetime='%(dt)s'::timestamp with time zone at time zone '%(tz)s'
                                            """ % T

                                self.T.conn.set_isolation_level(        0)
                                self.T.cur.execute(                     cmd)

                return

            start_date                      =   self.T.DT.today()
            end_date                        =   start_date + self.T.timedelta(days=self.T.DAYS_SCHEDULED_AHEAD)
            v                               =   self.T.pd.read_sql("""
                                                    select
                                                        vendor_id,
                                                        vend_name,
                                                        initcap(_day::text)   _day,
                                                        _sched #> '{0,dg}'    _dg,
                                                        _sched #> '{0,start}' _start,
                                                        _sched #> '{0,end}'   _end,
                                                        trim(both '"' from initcap((_sched #> '{0,copy}')::text)) _copy_from,
                                                        json_array_length(_sched#>'{0,end}') cnt,
                                                        area,holidays
                                                    from
                                                    (
                                                        select
                                                            vendor_id,vend_name,arr _day,to_json(schedule->arr)::json _sched,
                                                            area,holidays
                                                        from
                                                            (select vendor_id,vend_name,schedule,area,holidays from vendors
                                                                where is_active is true and processed_through is null) f1,
                                                            (select unnest(array['mon','tue','wed','thu','fri','sat','sun']) arr) f2
                                                    ) f3
                                                    where _sched is not null
                                                    """,self.T.eng)
            process_contracts_by_date(          self,v,start_date,end_date)
            # TODO: incorporate holidays & DST in scheduling/maintenance
            # TODO: apply wgt to vendor_units, where wgt=cumsum( a function generated weekly for each V based in history )
            return


