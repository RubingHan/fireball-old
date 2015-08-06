var Fs = require('fire-fs');
var gulp = require('gulp');

var pjson = require('../../package.json');
var setupMirror = require('../libs/setup-mirror');

gulp.task('setup-mirror', function(cb) {
    setupMirror(cb);
});

gulp.task('setup-branch', function(cb) {
    var hasSettingFile = false;
    var hasBranchSetting = false;
    if ( Fs.existsSync('local-setting.json') ) {
        try {
            var jsonObj = JSON.parse(Fs.readFileSync('local-setting.json'));
            if (jsonObj.branch) {
                return cb();
            } else {
                hasBranchSetting = false;
                hasSettingFile = true;
            }
        }
        catch (err) {
            hasBranchSetting = false;
            hasSettingFile = false;
        }
    } else {
        hasBranchSetting = false;
        hasSettingFile = false;
    }

    if (hasBranchSetting === false) {
        var obj = {};
        if (hasSettingFile) {
            obj = JSON.parse(Fs.readFileSync('local-setting.json'));
        }
        obj.branch = {
            hosts: {},
            builtins: {},
        };

        pjson.hosts.forEach(function(entry) {
            obj.branch.hosts[entry] = "master";
        });
        pjson.builtins.forEach(function(entry) {
            obj.branch.builtins[entry] = "master";
        });
        Fs.writeFileSync('local-setting.json', JSON.stringify(obj, null, '  '));
        console.log("Setup submodule branch local setting. You can change 'local-setting.json' to specify your branches.");
        cb();
        return;
    }

    cb();
});
