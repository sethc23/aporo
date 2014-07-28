Ext.define('Aporo.extension.column.Checkbox', {
    extend: 'Ext.grid.column.Column',
    xtype: 'checkboxcolumn',

    defaultRenderer: function(value) {
        if (!value || value === false) {
            return '<div class="checkbox"></div>';
        }

        return '<div class="checkbox checked"></div>';
    },

    updateCell: function(cell, record, content) {
        if (cell && record) {
            cell.innerHTML = this.getCellContent(record);
        }
    }
});