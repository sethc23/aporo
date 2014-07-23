Ext.define('Aporo.controller.PassiveDG', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.util.JSON'
    ],

    config: {
        refs: {
            PassiveDGMainView: 'PassiveDGMainView',
            PassiveDGMenuView: 'PassiveDGMenuView'
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
            }
        }
    },

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    work: null,

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
        this.back();
    },

    onCheckIn: function() {
        this.back();
    },

    onHistory: function() {
        this.back();
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
            params: Ext.util.JSON.encode({
                action: 'GET',
                currier_id: Aporo.app.globals.currier_id
            }),

            success: function(response) {
                var json = Ext.util.JSON.decode(response.responseText);

                me.updateWorkJSON(json);
                me.getPassiveDGMainView().setMasked(false);
            },
            failure: function(response) {
                console.log('failure', response);

                me.back();
            }
        });
    },

    updateWorkJSON: function(json) {
        console.log('# updateWorkJSON', json);

        this.work = json;

        // TODO save to disk via phonegap
        
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
        }
        else {
            header.hide();
            checkInNowButton.hide();

            findWorkButton.show();
        }
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
                }
                else {
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
