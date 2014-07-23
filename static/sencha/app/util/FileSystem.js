Ext.define('Aporo.util.FileSystem', {
    extend: 'Ext.Evented',

    statics: {
        saveFile: function(config) {
            if (!Ext.browser.is.PhoneGap) {
                return;
            }

            if (typeof config.data != "String") {
                config.data = Ext.encode(config.data);
            }

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                fileSystem.root.getFile(config.fileName, {
                    create: true,
                    exclusive: false
                }, function(fileEntry) {
                    fileEntry.createWriter(function(writer) {
                        writer.write(config.data);
                        config.success();
                    }, config.failure);
                }, config.failure);
            }, config.failure);
        }
    }
});