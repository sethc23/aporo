Ext.define('TransportApp.controller.HistoryController', {
    extend: 'Ext.app.Controller',
    config: {

    },
    launch: function () {
        this.callParent(arguments);
        console.log("launchHis");

    },
    init: function () {
        this.callParent(arguments);
        console.log("initHis");
    }
});