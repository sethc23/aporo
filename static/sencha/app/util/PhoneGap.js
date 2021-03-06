Ext.define('Aporo.util.PhoneGap', {
    extend: 'Ext.Evented',

    statics: {
        batteryLevel: null,
        batteryPluggedIn: null,

        is: function() {
            if (Ext.browser.is.PhoneGap && typeof device != "undefined") {
                return true;
            }

            return false;
        },

        startBatteryListener: function() {
            if (!Aporo.util.PhoneGap.is()) {
                return;
            }

            var callback = function(info) {
                Aporo.util.PhoneGap.batteryLevel = info.level;
                Aporo.util.PhoneGap.batteryPluggedIn = info.isPlugged;
            };

            window.addEventListener('batterystatus', callback, false);
            window.addEventListener('batterylow', callback, false);
            window.addEventListener('batterycritical', callback, false);
        },

        /**
         * Aporo.util.PhoneGap.saveFile({
         *     fileName: 'Work.JSON',
         *     data: json,
         *     success: function() {
         *         console.log('Work.JSON saved');
         *     },
         *     failure: function(error) {
         *         Ext.Msg.alert('Error saving Work.JSON', error.code);
         *     }
         * });
         */
        saveFile: function(config) {
            if (!Aporo.util.PhoneGap.is()) {
                config.failure();
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
        },

        /**
         * Aporo.util.PhoneGap.readFile({
         *     fileName: 'Work.JSON',
         *     format: 'json',
         *     success: function(data) {
         *         console.log(data);
         *     },
         *     failure: function(error) {
         *         Ext.Msg.alert('Error reading Work.JSON', error.code);
         *     }
         * });
         */
        readFile: function(config) {
            if (!Aporo.util.PhoneGap.is()) {
                config.failure();
                return;
            }

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                fileSystem.root.getFile(config.fileName, {
                    create: true,
                    exclusive: false
                }, function(fileEntry) {
                    fileEntry.file(function(file) {
                        var reader = new FileReader();
                        reader.onloadend = function(e) {
                            var data = e.target.result;

                            if (data && data != "null") {
                                config.success(config.format == "json" ? Ext.decode(data) : data)
                            } else {
                                // File not found
                                config.success(null);
                            }
                        };
                        reader.readAsText(file);
                    }, config.failure);
                }, config.failure);
            }, config.failure);
        },

        /**
         * Aporo.util.PhoneGap.fileExists({
         *     fileName: 'Work.JSON',
         *     success: function(exists) {
         *         console.log('File exists:', exists);
         *     },
         *     failure: function(error) {
         *         Ext.Msg.alert('Error checking file existence:', error.code);
         *     }
         * });
         */
        fileExists: function(config) {
            if (!Aporo.util.PhoneGap.is()) {
                config.success(true);
                return;
            }

            this.readFile({
                fileName: config.fileName,
                success: function(data) {
                    config.success(data ? true : false);
                },
                failure: config.failure
            })
        }
    }
});