Ext.define('Aporo.controller.PassiveDG', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            PassiveDGMainView: 'PassiveDGMainView',
            PassiveDGMenuView: 'PassiveDGMenuView',
            PassiveDGContracts: 'PassiveDGContracts',
            PassiveDGHistory: 'PassiveDGHistory'
        },

        control: {
            PassiveDGMainView: {
                activate: 'onActivate'
            },

            // Menu
            'PassiveDGMainView #findWorkButton': {
                tap: 'onFindWork'
            },
            'PassiveDGMainView #checkInNowButton': {
                tap: 'onCheckInNow'
            },
            'PassiveDGMainView #btnContracts': {
                tap: 'onContracts'
            },
            'PassiveDGMainView #btnCheckIn': {
                tap: 'onCheckIn'
            },
            'PassiveDGMainView #btnHistory': {
                tap: 'onHistory'
            },

            // Contracts
            PassiveDGContracts: {
                activate: 'onContractsActivate'
            },
            'PassiveDGContracts #update': {
                tap: 'onUpdateContracts'
            }
        }
    },

    slideLeftTransition: {
        type: 'slide',
        direction: 'left'
    },
    slideRightTransition: {
        type: 'slide',
        direction: 'right'
    },

    work: null,

    contracts: null,
    contractsStore: null,

    /**
     * Actions
     */

    onActivate: function() {
        console.log('# onActivate');

        this.getWorkJSON();

        this.getPassiveDGMainView().setMasked({
            xtype: 'loadmask'
        });
    },

    back: function() {
        Ext.getCmp('Viewport').pop();
    },

    onFindWork: function() {
        this.back();
    },

    onCheckInNow: function() {
        Ext.Msg.confirm('Are you sure?', 'Are you sure you want to check-in now?', function(buttonId) {
            if (buttonId == "yes") {
                this.back();
            }
        }, this);
    },

    onContracts: function() {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Contracts');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.passiveDG.Contracts'));
    },

    onCheckIn: function() {
        this.back();
    },

    onHistory: function() {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('History');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.passiveDG.History'));
    },

    /**
     * Work JSON
     */

    getWorkJSON: function() {
        console.log('# getWorkJSON');

        var me = this;

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/work/',
            method: 'GET',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'GET',
                currier_id: Aporo.config.Env.currier_id
            }),

            success: function(response) {
                var json = Ext.decode(response.responseText);

                me.updateWorkJSON(json);
                me.getPassiveDGMainView().setMasked(false);
            },
            failure: function(response) {
                Ext.Msg.alert('Error', 'There was a problem fetching Work.JSON');

                me.back();
            }
        });
    },

    updateWorkJSON: function(json) {
        console.log('# updateWorkJSON', json);

        this.work = json;

        Aporo.util.PhoneGap.saveFile({
            fileName: 'Work.JSON',
            data: json,
            success: function() {
                console.log('Work.JSON saved');
            },
            failure: function(error) {
                Ext.Msg.alert('Error saving Work.JSON', error.code);
            }
        });

        this.updateHeader();
    },

    updateHeader: function() {
        var nextWork = this.nextWork(),
            menuView = Ext.getCmp('PassiveDGMenuView'),
            header = menuView.getComponent('header'),
            findWorkButton = menuView.getComponent('findWorkButton'),
            checkInNowButton = menuView.getComponent('checkInNowButton');

        if (this.hasWork()) {
            findWorkButton.hide();
            checkInNowButton.hide();

            var startDatetime = Date.parse(nextWork['start_datetime']);

            // (a)  If the current datetime is greater than, equal to, or within 15 minutes 
            // before “start_datetime”, then the Header has text “Check In Now.” 
            if (Date.now() >= (startDatetime - 900000)) {
                header.hide();
                checkInNowButton.show();
                return;
            }

            // (b)  If the current datetime is less than 15 minutes minus “start_datetime”, 
            // then the Header has text “Next Check In:” plus content from Next Work.
            else {
                var today = new Date(),
                    startDate = new Date(Date.parse(nextWork['start_datetime'])),
                    isToday = today.toDateString() == startDate.toDateString();

                header.setHtml([
                    'Next Check In:',
                    isToday ? 'TODAY' : nextWork['start_day'],
                    nextWork['start_time'],
                    nextWork['area']
                ].join('<br />'));
            }
        } else {
            header.hide();
            checkInNowButton.hide();

            findWorkButton.show();
        }
    },

    /**
     * Contracts JSON
     */

    getContractsJSON: function() {
        console.log('# getContractsJSON');

        var me = this;

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/dg_contracts/',
            method: 'GET',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'GET',
                currier_id: Aporo.config.Env.currier_id
            }),

            success: function(response) {
                var json = Ext.decode(response.responseText);

                me.contractsStore = Ext.create('Ext.data.Store', {
                    storeId: 'contractsStore',
                    fields: [
                        'area',
                        'contract_id',
                        'hour_period',
                        'start_datetime',
                        'start_day',
                        'start_time',

                        'registered',
                        'changedRegistered',

                        {
                            name: 'curriers',
                            convert: function(value, record) {
                                var registered = false,
                                    curriers = record.get('curriers');

                                for (var i = 0; i < value.length; i++) {
                                    if (value[i].currier_id == Aporo.config.Env.currier_id) {
                                        registered = true;
                                        break;
                                    }
                                }

                                record.set('registered', registered);

                                return value;
                            }
                        }
                    ],
                    data: json
                });

                me.getPassiveDGContracts().setStore(me.contractsStore);

                // me.updateWorkJSON(json);
                // me.getPassiveDGMainView().setMasked(false);
            },
            failure: function(response) {
                Ext.Msg.alert('Error', 'There was a problem fetching Contracts.JSON');

                me.back();
            }
        });
    },

    /**
     * Contracts
     */

    onContractsActivate: function() {
        this.getContractsJSON();
    },

    onUpdateContracts: function() {
        var me = this;

        // Get all changed records
        var records = this.contractsStore.data.filterBy(function(item) {
            return item.get('changedRegistered');
        }).items;

        if (records.length == 0) {
            return;
        }

        Ext.Msg.confirm('Update', 'Are you sure you want to update all ' + records.length + ' contract(s)?', function(buttonId) {
            if (buttonId == "yes") {
                // Make a raw version of the records
                var rawRecords = [];
                for (var i = 0; i < records.length; i++) {
                    var data = records[i].raw;

                    data.action = records[i].get('registered') ? "add" : "remove";

                    rawRecords.push(data);
                }

                console.log(rawRecords);

                Ext.Ajax.request({
                    url: Aporo.config.Env.baseApiUrl + 'api/dg_contracts/',
                    method: 'POST',
                    useDefaultXhrHeader: false,
                    params: Ext.encode(rawRecords),

                    success: function(response) {
                        var json = Ext.decode(response.responseText),
                            contracts = json[0]['contracts.json'],
                            work = json[0]['work.json'];

                        me.contractsStore.setData(contracts);
                        me.updateWorkJSON(work);

                        // Set all as not changed
                        for (var i = 0; i < records.length; i++) {
                            records[i].set('changedRegistered', false);
                        }
                    },
                    failure: function(response) {
                        Ext.Msg.alert('Problem', 'Problem updating all contracts');
                    }
                });

            }
        }, this);
    },

    /**
     * Helpers
     */

    nextWork: function() {
        var nextWork = null;

        if (!this.work || !this.work['dg_schedule'] || this.work['dg_schedule'].length == 0) {
            return nextWork;
        }

        var tasks = this.work['dg_schedule'];
        for (var i = 0; i < tasks.length; i++) {
            var endDatetime = tasks[i]['check_in_datetime'];
            if (!endDatetime || endDatetime == '' || endDatetime == 'null') {
                if (nextWork) {
                    if (Date.parse(nextWork['start_datetime']) > Date.parse(tasks[i]['start_datetime'])) {
                        nextWork = tasks[i];
                    }
                } else {
                    nextWork = tasks[i];
                }
            }
        }

        // TODO remove this
        // nextWork['start_datetime'] = "2014-07-27T08:00:00";
        // nextWork['start_day'] = "Tue, Jul 27";
        // nextWork['start_time'] = "12:00 PM";

        return nextWork;
    },

    hasWork: function() {
        // TODO remove this
        // return false;

        return this.work && this.work['dg_schedule'] && this.work['dg_schedule'].length > 0;
    }
});