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
                tap: 'onContracts'
            },
            'PassiveDGMainView #checkInNowButton': {
                tap: 'onCheckIn'
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
                activate: 'onContractsActivate',
                deactivate: 'onContractsDeactivate'
            },
            'PassiveDGContracts #update': {
                tap: 'onUpdateContracts'
            },

            // History
            PassiveDGHistory: {
                activate: 'onHistoryActivate'
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

    historyStore: null,

    /**
     * Actions
     */

    /**
     * Called when the main view is shown
     */
    onActivate: function() {
        this.getWorkJSON();

        this.getPassiveDGMainView().setMasked({
            xtype: 'loadmask'
        });
    },

    /**
     * Pops the viewport
     */
    back: function() {
        Ext.getCmp('Viewport').pop();
    },

    /**
     * Shows the contracts grid
     */
    onContracts: function() {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Contracts');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.passiveDG.Contracts'));
    },

    /**
     * Called whent the users attempts to check in using the button
     */
    onCheckIn: function() {
        var me = this;

        // The user’s Work.JSON is empty.  If this is the case, then the user is presented with notification 
        // “No work is scheduled. Please sign up for new Contracts=.”
        //                                                                      --> directed to Contracts

        if (!me.hasWork()) {
            Ext.Msg.alert('No work', 'No work is scheduled. Please sign up for new Contracts.', function() {
                me.onContracts();
            }, me);

            return;
        }

        // There is no work scheduled for the user today.  If this is the case, then the user is presented 
        // with notification “No work scheduled for you today. Check Contracts for new opportunities.” 
        //                                                                      --> directed to Contracts

        var nextWork = me.nextWork(),
            startDate = new Date(Date.parse(nextWork['start_datetime'])),
            today = new Date(),
            workToday = Math.abs(today.getTime() - startDate.getTime()) < 86400000,
            canCheckIn = (startDate.getTime() - today.getTime() <= 900000);

        if (!workToday && startDate.getDate() == today.getDate()) {
            Ext.Msg.alert('No work scheduled today', 'No work scheduled for you today. Check Contracts for new opportunities.', function() {
                me.onContracts();
            }, me);

            return;
        }

        // There is work scheduled for the user today, but check in starts more than 15 minutes from the 
        // current time.  If this is the case, then the user is presented with notification “Next Check-In 
        // for Today at (time). Check Contracts for other opportunities,” where “(time)” is “start_time” 
        // of first entry in Work.JSON minus 15 minutes. 
        //                                                                --> directed to Passive DG Menu

        if (!canCheckIn) {
            Ext.Msg.alert('Check-In', 'Next Check-In for today at: ' + Ext.Date.format(startDate, 'G:i') + '<br />Check Contracts for other opportunities.', null);

            return;
        }

        // If the user is attempting to check in within 15 minutes before, on, or after the “start_datetime” 
        // of Next Work, then the application makes a URL post request:

        me.getPassiveDGMainView().setMasked({
            xtype: 'loadmask'
        });

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/work/',
            method: 'POST',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'check_in',
                currier_id: Aporo.config.Env.currier_id
            }),
            success: function(response) {
                me.getPassiveDGMainView().setMasked(false);

                // Move to the ActiveDG view
                Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Active DG Menu');
                Ext.getCmp('Viewport').push(Ext.create('Aporo.view.activeDG.MainView'));
            },
            failure: function(response) {
                me.getPassiveDGMainView().setMasked(false);

                Ext.Msg.alert('Error', 'There was a problem checking in.');
            }
        });
    },

    /**
     * Shows the history grid
     */
    onHistory: function() {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('History');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.passiveDG.History'));
    },

    /**
     * Work JSON
     */

    /**
     * Returns the work.json. Fetches it from the server if it is not already downloaded.
     */
    getWork: function(callback) {
        var me = this;

        if (me.work) {
            return me.work;
        }

        me.getWorkJSON(function() {
            callback.call(me, me.json);
        });
    },

    /**
     * Gets the work JSON from the server
     */
    getWorkJSON: function(callback) {
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

                if (callback) {
                    callback.call(me, json);
                }
            },
            failure: function(response) {
                Ext.Msg.alert('Error', 'There was a problem fetching Work.JSON');

                me.back();
            }
        });
    },

    /**
     * Updates the local copy of work json
     */
    updateWorkJSON: function(json) {
        this.work = json;

        Aporo.util.PhoneGap.saveFile({
            fileName: 'Work.JSON',
            data: json,
            success: function() {

            },
            failure: function(error) {
                if (error) {
                    Ext.Msg.alert('Error', 'Error saving Work.JSON:<br />' + error.code);
                }
            }
        });

        this.updateHeader();
    },

    /**
     * Updates the header using the work data
     */
    updateHeader: function() {
        var me = this,
            nextWork = me.nextWork(),
            menuView = Ext.getCmp('PassiveDGMenuView'),
            header = menuView.getComponent('header'),
            findWorkButton = menuView.getComponent('findWorkButton'),
            checkInNowButton = menuView.getComponent('checkInNowButton');

        if (me.hasWork()) {
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

    /**
     * fetches the data for the contracts grid
     */
    getContractsJSON: function() {
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

                // Create the contacts store
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
                                // Get the registered state using the curriers array
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

                // Give the grid the new store
                me.getPassiveDGContracts().setStore(me.contractsStore);
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

        Ext.getCmp('Viewport').on('beforepop', this.onBeforePop, this);
    },

    onContractsDeactivate: function() {
        Ext.getCmp('Viewport').un('beforepop', this.onBeforePop, this);
    },

    onBeforePop: function() {
        var records = this.changedRecords();

        if (records.length > 0) {
            Ext.Msg.confirm('Updated Contracts', 'If you go back, all updated contracts will be lost. Are you sure you want to do this?', function(buttonId) {
                if (buttonId == "yes") {
                    Ext.getCmp('Viewport').pop();
                }
            }, this);

            return false;
        }

        return true;
    },

    changedRecords: function() {
        var records = this.contractsStore.data.filterBy(function(item) {
            return item.get('changedRegistered');
        }).items;

        return records;
    },

    /**
     * Updates all contracts with the server when anything has been changed
     */
    onUpdateContracts: function() {
        var me = this;

        // Get all changed records
        var records = me.changedRecords();

        if (records.length == 0) {
            return;
        }

        Ext.Msg.confirm('Update', 'Are you sure you want to update all ' + records.length + ' contract(s)?', function(buttonId) {
            if (buttonId == "yes") {
                // Make a raw version of the records to post to the server
                var rawRecords = [];
                for (var i = 0; i < records.length; i++) {
                    var data = records[i].raw;

                    data.action = records[i].get('registered') ? "add" : "remove";

                    rawRecords.push(data);
                }

                me.getPassiveDGContracts().setMasked({
                    xtype: 'loadmask'
                });

                Ext.Ajax.request({
                    url: Aporo.config.Env.baseApiUrl + 'api/dg_contracts/',
                    method: 'POST',
                    useDefaultXhrHeader: false,
                    params: Ext.encode(rawRecords),

                    success: function(response) {
                        me.getPassiveDGContracts().setMasked(false);

                        var json = Ext.decode(response.responseText),
                            contracts = json['contracts.json'],
                            work = json['work.json'];

                        me.contractsStore.setData(contracts);
                        me.updateWorkJSON(work);

                        Ext.Msg.alert('Success', 'Contracts updated!');
                    },
                    failure: function(response) {
                        Ext.Msg.alert('Problem', 'Problem updating all contracts');
                    }
                });

            }
        }, me);
    },

    /**
     * History JSON
     */

    /**
     * Gets the history data for the grid
     */
    getHistoryJSON: function() {
        var me = this;

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/work/',
            method: 'GET',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'history',
                currier_id: Aporo.config.Env.currier_id
            }),

            success: function(response) {
                var json = Ext.decode(response.responseText);

                // Create the store for the history grid
                me.historyStore = Ext.create('Ext.data.Store', {
                    storeId: 'historyStore',
                    fields: [
                        'area',
                        'hour_period',
                        'start_day',
                        'start_time',
                        'total_breaktime',
                        'total_deliveries', {
                            name: 'check_in_datetime',
                            type: 'date'
                        }, {
                            name: 'check_out_datetime',
                            type: 'date'
                        }
                    ],
                    data: json['dg_schedule']
                });

                // Give the history grid the store
                me.getPassiveDGHistory().setStore(me.historyStore);
            },
            failure: function(response) {
                Ext.Msg.alert('Error', 'There was a problem fetching history');

                me.back();
            }
        });
    },

    /**
     * History
     */

    onHistoryActivate: function() {
        this.getHistoryJSON();
    },

    /**
     * Helpers
     */

    /**
     * Returns the next work
     */
    nextWork: function() {
        var me = this,
            nextWork = null;

        if (!me.work || !me.work['dg_schedule'] || me.work['dg_schedule'].length == 0) {
            return nextWork;
        }

        var tasks = me.work['dg_schedule'];
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

        // DEBUG
        // nextWork['start_datetime'] = "2014-07-23T18:00:00";
        // nextWork['start_day'] = "Tue, Jul 25";
        // nextWork['start_time'] = "12:00 PM";

        return nextWork;
    },

    /**
     * Returns false when there is no work
     */
    hasWork: function() {
        // DEBUG
        // return false;

        var me = this;
        return me.work && me.work['dg_schedule'] && me.work['dg_schedule'].length > 0;
    }
});