Ext.define('Aporo.extension.column.Button', {
    extend: 'Ext.grid.column.Column',
    xtype: 'buttoncolumn',

    defaultRenderer: function(value) {
        return '<div class="button">Cancel</div>';
    },

    updateCell: function(cell, record, content) {
        if (cell && record) {
            cell.innerHTML = this.getCellContent(record);

            // var el = Ext.get(cell);
            // el.clearListeners();
            // debugger;

            // el.on('tap', function() {

            //     grid.fireEvent('cancel', el, record);
            // }, this);
        }
    }
});