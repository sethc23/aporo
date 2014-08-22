# Makefile for program source directory in GNU NLS utilities package.
# Copyright (C) 1995, 1996, 1997 by Ulrich Drepper <drepper@gnu.ai.mit.edu>
# Copyright (C) 2004-2008 Rodney Dawes <dobey.pwns@gmail.com>
#
# This file may be copied and used freely without restrictions.  It may
# be used in projects which are not available under a GNU Public License,
# but which still want to provide support for the GNU gettext functionality.
#
# - Modified by Owen Taylor <otaylor@redhat.com> to use GETTEXT_PACKAGE
#   instead of PACKAGE and to look for po2tbl in ./ not in intl/
#
# - Modified by jacob berkman <jacob@ximian.com> to install
#   Makefile.in.in and po2tbl.sed.in for use with glib-gettextize
#
# - Modified by Rodney Dawes <dobey.pwns@gmail.com> for use with intltool
#
# We have the following line for use by intltoolize:
# INTLTOOL_MAKEFILE

GETTEXT_PACKAGE = drizzle7
PACKAGE = drizzle7
VERSION = 7

SHELL = /bin/sh

srcdir = .
top_srcdir = ..
top_builddir = ..


prefix = /usr/local
exec_prefix = ${prefix}
datadir = ${datarootdir}
datarootdir = ${prefix}/share
libdir = ${exec_prefix}/lib
DATADIRNAME = lib
itlocaledir = $(prefix)/$(DATADIRNAME)/locale
subdir = po
install_sh = ${SHELL} /Users/sethchase/Desktop/OPENRESTY/openresty_mods/drizzle7-2011.07.21/config/install-sh
# Automake >= 1.8 provides /opt/local/bin/gmkdir -p.
# Until it can be supposed, use the safe fallback:
mkdir_p = $(install_sh) -d

INSTALL = /opt/local/bin/ginstall -c
INSTALL_DATA = ${INSTALL} -m 644

GMSGFMT = /opt/local/bin/msgfmt
MSGFMT = /opt/local/bin/msgfmt
XGETTEXT = /opt/local/bin/xgettext
INTLTOOL_UPDATE = /opt/local/bin/intltool-update
INTLTOOL_EXTRACT = /opt/local/bin/intltool-extract
INTLTOOL_WARNINGS = 
MSGMERGE = INTLTOOL_EXTRACT=$(INTLTOOL_EXTRACT) XGETTEXT=$(XGETTEXT) srcdir=$(srcdir) $(INTLTOOL_UPDATE) --gettext-package $(GETTEXT_PACKAGE) --dist
GENPOT   = INTLTOOL_EXTRACT=$(INTLTOOL_EXTRACT) XGETTEXT=$(XGETTEXT) srcdir=$(srcdir) $(INTLTOOL_UPDATE) --gettext-package $(GETTEXT_PACKAGE) --pot

ALL_LINGUAS = 

PO_LINGUAS=$(shell if test -r $(srcdir)/LINGUAS; then grep -v "^\#" $(srcdir)/LINGUAS; else echo "$(ALL_LINGUAS)"; fi)

USER_LINGUAS=$(shell if test -n "$(LINGUAS)"; then LLINGUAS="$(LINGUAS)"; ALINGUAS="$(ALL_LINGUAS)"; for lang in $$LLINGUAS; do if test -n "`grep \^$$lang$$ $(srcdir)/LINGUAS 2>/dev/null`" -o -n "`echo $$ALINGUAS|tr ' ' '\n'|grep \^$$lang$$`"; then printf "$$lang "; fi; done; fi)

USE_LINGUAS=$(shell if test -n "$(USER_LINGUAS)" -o -n "$(LINGUAS)"; then LLINGUAS="$(USER_LINGUAS)"; else if test -n "$(PO_LINGUAS)"; then LLINGUAS="$(PO_LINGUAS)"; else LLINGUAS="$(ALL_LINGUAS)"; fi; fi; for lang in $$LLINGUAS; do printf "$$lang "; done)

POFILES=$(shell LINGUAS="$(PO_LINGUAS)"; for lang in $$LINGUAS; do printf "$$lang.po "; done)

DISTFILES = Makefile.in.in POTFILES.in $(POFILES)
EXTRA_DISTFILES = ChangeLog POTFILES.skip Makevars LINGUAS

POTFILES = \
	../client/drizzle.cc \
	../client/drizzledump.cc \
	../client/drizzledump_data.cc \
	../client/drizzledump_drizzle.cc \
	../client/drizzledump_mysql.cc \
	../client/drizzleimport.cc \
	../client/drizzleslap.cc \
	../client/drizzletest.cc \
	../drizzled/cursor.cc \
	../drizzled/drizzled.cc \
	../drizzled/error.cc \
	../drizzled/execute/parser.cc \
	../drizzled/gettext.h \
	../drizzled/ha_commands.cc \
	../drizzled/identifier/catalog.cc \
	../drizzled/identifier/schema.cc \
	../drizzled/identifier/table.cc \
	../drizzled/main.cc \
	../drizzled/message/transaction_writer.cc \
	../drizzled/module/library.cc \
	../drizzled/module/loader.cc \
	../drizzled/module/registry.cc \
	../drizzled/module/registry.h \
	../drizzled/module/vertex.h \
	../drizzled/option.cc \
	../drizzled/plugin/authentication.cc \
	../drizzled/plugin/authorization.cc \
	../drizzled/plugin/error_message.cc \
	../drizzled/plugin/event_observer.cc \
	../drizzled/plugin/function.cc \
	../drizzled/plugin/listen.cc \
	../drizzled/plugin/listen_tcp.cc \
	../drizzled/plugin/logging.cc \
	../drizzled/plugin/query_cache.cc \
	../drizzled/plugin/query_rewrite.cc \
	../drizzled/plugin/scheduler.cc \
	../drizzled/plugin/schema_engine.cc \
	../drizzled/plugin/storage_engine.cc \
	../drizzled/plugin/table_function.cc \
	../drizzled/plugin/xa_resource_manager.cc \
	../drizzled/plugin/xa_storage_engine.cc \
	../drizzled/replication_services.cc \
	../drizzled/schema.cc \
	../drizzled/session.cc \
	../drizzled/set_var.cc \
	../drizzled/show.cc \
	../drizzled/signal_handler.cc \
	../drizzled/sql_base.cc \
	../drizzled/sql_select.cc \
	../drizzled/sql_table.cc \
	../drizzled/sql_yacc.cc \
	../drizzled/statement/alter_table.cc \
	../drizzled/sys_var.cc \
	../drizzled/table.cc \
	../drizzled/table/instance/base.cc \
	../drizzled/transaction_services.cc \
	../plugin/auth_all/auth_all.cc \
	../plugin/auth_file/auth_file.cc \
	../plugin/auth_http/auth_http.cc \
	../plugin/auth_ldap/auth_ldap.cc \
	../plugin/console/console.cc \
	../plugin/default_replicator/default_replicator.cc \
	../plugin/drizzle_protocol/drizzle_protocol.cc \
	../plugin/errmsg_stderr/errmsg_stderr.cc \
	../plugin/filtered_replicator/filtered_replicator.cc \
	../plugin/haildb/haildb_engine.cc \
	../plugin/hello_events/hello_events.cc \
	../plugin/innobase/handler/data_dictionary.cc \
	../plugin/innobase/handler/ha_innodb.cc \
	../plugin/innobase/handler/replication_dictionary.cc \
	../plugin/innobase/pars/pars0grm.cc \
	../plugin/innobase/srv/srv0start.cc \
	../plugin/innobase/xtrabackup/xtrabackup.cc \
	../plugin/json_server/json_server.cc \
	../plugin/logging_gearman/logging_gearman.cc \
	../plugin/logging_query/logging_query.cc \
	../plugin/logging_stats/logging_stats.cc \
	../plugin/md5/md5.cc \
	../plugin/memcached_stats/analysis_table.cc \
	../plugin/memcached_stats/memcached_stats.cc \
	../plugin/memcached_stats/stats_table.cc \
	../plugin/multi_thread/multi_thread.cc \
	../plugin/multi_thread/multi_thread.h \
	../plugin/myisam/ha_myisam.cc \
	../plugin/myisam/my_handler_errors.cc \
	../plugin/mysql_protocol/mysql_protocol.cc \
	../plugin/mysql_unix_socket_protocol/protocol.cc \
	../plugin/pbms/src/parameters_ms.cc \
	../plugin/pbms/src/plugin_ms.cc \
	../plugin/rabbitmq/rabbitmq_handler.cc \
	../plugin/rabbitmq/rabbitmq_log.cc \
	../plugin/session_dictionary/processlist.cc \
	../plugin/signal_handler/signal_handler.cc \
	../plugin/syslog/errmsg.cc \
	../plugin/syslog/function.cc \
	../plugin/syslog/logging.cc \
	../plugin/syslog/module.cc \
	../plugin/transaction_log/hexdump_transaction_message.cc \
	../plugin/transaction_log/module.cc \
	../plugin/transaction_log/print_transaction_message.cc \
	../plugin/transaction_log/transaction_log.cc \
	../plugin/transaction_log/transaction_log_reader.cc \
	../plugin/transaction_log/utilities/transaction_file_reader.cc \
	../plugin/transaction_log/utilities/transaction_reader.cc \
	../plugin/transaction_log/write_buffer.cc \
	../plugin/slave/module.cc \
	../plugin/slave/queue_producer.cc \
	../plugin/slave/replication_slave.cc \
	../plugin/slave/sql_executor.cc \
	../plugin/session_dictionary/sessions.cc \
	../plugin/regex_policy/module.cc

CATALOGS=$(shell LINGUAS="$(USE_LINGUAS)"; for lang in $$LINGUAS; do printf "$$lang.gmo "; done)

.SUFFIXES:
.SUFFIXES: .po .pox .gmo .mo .msg .cat

.po.pox:
	$(MAKE) $(GETTEXT_PACKAGE).pot
	$(MSGMERGE) $< $(GETTEXT_PACKAGE).pot -o $*.pox

.po.mo:
	$(MSGFMT) -o $@ $<

.po.gmo:
	file=`echo $* | sed 's,.*/,,'`.gmo \
	  && rm -f $$file && $(GMSGFMT) -o $$file $<

.po.cat:
	sed -f ../intl/po2msg.sed < $< > $*.msg \
	  && rm -f $@ && gencat $@ $*.msg


all: all-yes

all-yes: $(CATALOGS)
all-no:

$(GETTEXT_PACKAGE).pot: $(POTFILES)
	$(GENPOT)

install: install-data
install-data: install-data-yes
install-data-no: all
install-data-yes: all
	linguas="$(USE_LINGUAS)"; \
	for lang in $$linguas; do \
	  dir=$(DESTDIR)$(itlocaledir)/$$lang/LC_MESSAGES; \
	  $(mkdir_p) $$dir; \
	  if test -r $$lang.gmo; then \
	    $(INSTALL_DATA) $$lang.gmo $$dir/$(GETTEXT_PACKAGE).mo; \
	    echo "installing $$lang.gmo as $$dir/$(GETTEXT_PACKAGE).mo"; \
	  else \
	    $(INSTALL_DATA) $(srcdir)/$$lang.gmo $$dir/$(GETTEXT_PACKAGE).mo; \
	    echo "installing $(srcdir)/$$lang.gmo as" \
		 "$$dir/$(GETTEXT_PACKAGE).mo"; \
	  fi; \
	  if test -r $$lang.gmo.m; then \
	    $(INSTALL_DATA) $$lang.gmo.m $$dir/$(GETTEXT_PACKAGE).mo.m; \
	    echo "installing $$lang.gmo.m as $$dir/$(GETTEXT_PACKAGE).mo.m"; \
	  else \
	    if test -r $(srcdir)/$$lang.gmo.m ; then \
	      $(INSTALL_DATA) $(srcdir)/$$lang.gmo.m \
		$$dir/$(GETTEXT_PACKAGE).mo.m; \
	      echo "installing $(srcdir)/$$lang.gmo.m as" \
		   "$$dir/$(GETTEXT_PACKAGE).mo.m"; \
	    else \
	      true; \
	    fi; \
	  fi; \
	done

# Empty stubs to satisfy archaic automake needs
dvi info ctags tags CTAGS TAGS ID:

# Define this as empty until I found a useful application.
install-exec installcheck:

uninstall:
	linguas="$(USE_LINGUAS)"; \
	for lang in $$linguas; do \
	  rm -f $(DESTDIR)$(itlocaledir)/$$lang/LC_MESSAGES/$(GETTEXT_PACKAGE).mo; \
	  rm -f $(DESTDIR)$(itlocaledir)/$$lang/LC_MESSAGES/$(GETTEXT_PACKAGE).mo.m; \
	done

check: all $(GETTEXT_PACKAGE).pot
	rm -f missing notexist
	srcdir=$(srcdir) $(INTLTOOL_UPDATE) -m
	if [ -r missing -o -r notexist -a "x${INTLTOOL_WARNINGS}" = "xyes" ]; then \
	  exit 1; \
	fi

mostlyclean:
	rm -f *.pox $(GETTEXT_PACKAGE).pot *.old.po cat-id-tbl.tmp
	rm -f .intltool-merge-cache

clean: mostlyclean

distclean: clean
	rm -f Makefile Makefile.in POTFILES stamp-it
	rm -f *.mo *.msg *.cat *.cat.m *.gmo

maintainer-clean: distclean
	@echo "This command is intended for maintainers to use;"
	@echo "it deletes files that may require special tools to rebuild."
	rm -f Makefile.in.in

distdir = ../$(PACKAGE)-$(VERSION)/$(subdir)
dist distdir: $(DISTFILES)
	dists="$(DISTFILES)"; \
	extra_dists="$(EXTRA_DISTFILES)"; \
	for file in $$extra_dists; do \
	  test -f $(srcdir)/$$file && dists="$$dists $(srcdir)/$$file"; \
	done; \
	for file in $$dists; do \
	  test -f $$file || file="$(srcdir)/$$file"; \
	  ln $$file $(distdir) 2> /dev/null \
	    || cp -p $$file $(distdir); \
	done

update-po: Makefile
	$(MAKE) $(GETTEXT_PACKAGE).pot
	tmpdir=`pwd`; \
	linguas="$(USE_LINGUAS)"; \
	for lang in $$linguas; do \
	  echo "$$lang:"; \
	  result="`$(MSGMERGE) -o $$tmpdir/$$lang.new.po $$lang`"; \
	  if $$result; then \
	    if cmp $(srcdir)/$$lang.po $$tmpdir/$$lang.new.po >/dev/null 2>&1; then \
	      rm -f $$tmpdir/$$lang.new.po; \
            else \
	      if mv -f $$tmpdir/$$lang.new.po $$lang.po; then \
	        :; \
	      else \
	        echo "msgmerge for $$lang.po failed: cannot move $$tmpdir/$$lang.new.po to $$lang.po" 1>&2; \
	        rm -f $$tmpdir/$$lang.new.po; \
	        exit 1; \
	      fi; \
	    fi; \
	  else \
	    echo "msgmerge for $$lang.gmo failed!"; \
	    rm -f $$tmpdir/$$lang.new.po; \
	  fi; \
	done

Makefile POTFILES: stamp-it
	@if test ! -f $@; then \
	  rm -f stamp-it; \
	  $(MAKE) stamp-it; \
	fi

stamp-it: Makefile.in.in $(top_builddir)/config.status POTFILES.in
	cd $(top_builddir) \
	  && CONFIG_FILES=$(subdir)/Makefile.in CONFIG_HEADERS= CONFIG_LINKS= \
	       $(SHELL) ./config.status

# We need one of these so we don't break if the html rule is used.
html:

# Tell versions [3.59,3.63) of GNU make not to export all variables.
# Otherwise a system limit (for SysV at least) may be exceeded.
.NOEXPORT:
