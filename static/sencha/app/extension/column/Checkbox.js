Ext.define('Aporo.extension.column.Checkbox', {
    extend: 'Ext.grid.column.Column',
    xtype: 'checkboxcolumn',

    defaultRenderer: function(value) {
        if (!value || value === false) {
            return '<input type="checkbox" />';
        }

        return '<input type="checkbox" checked="checked" />';
    },

    updateCell: function(cell, record, content) {
        if (cell && record) {
            cell.innerHTML = this.getCellContent(record);
        }
    }
});