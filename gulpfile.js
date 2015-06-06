var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var shell = require('gulp-shell');
var Fs = require('fire-fs');
var Path = require('path');
var pjson = JSON.parse(Fs.readFileSync('./package.json'));
var mkdirp = require('mkdirp');
var git = require('./utils/git.js');
var spawn = require('child_process').spawn;

// require tasks
require('./utils/download-shell');


// public tasks

gulp.task('bootstrap', gulpSequence(['init-submodules', 'install-builtin', 'install-runtime', 'update-electron'], 'npm', 'bower'));

gulp.task('update', gulpSequence('pull-fireball', ['update-builtin', 'update-runtime', 'update-electron']));

gulp.task('update-deps', ['npm', 'bower']);

gulp.task('run', ['run-electron']);

gulp.task('package-studio', ['run-packagestudio']);


// run
gulp.task('run-electron', function(cb) {
  var cmdStr = '';
  var optArr = [];
  if (process.platform === "win32") {
    cmdStr = 'bin\\electron\\electron.exe';
    optArr = ['.\\', '--debug=3030', '--dev', '--show-devtools'];
  } else {
    cmdStr = 'bin/electron/Electron.app/Contents/MacOS/Electron';
    optArr = ['./','--debug=3030','--dev','--show-devtools'];
  }
  var child = spawn(cmdStr, optArr, { stdio: 'inherit'});
  child.on('exit', function() {
    cb();
  });
});

gulp.task('run-fireshell', function(cb) {
  var cmdStr = '';
  var optArr = [];
  if (process.platform === "win32") {
    cmdStr = 'bin\\fire-shell\\fireball.exe';
    optArr = ['.\\', '--debug=3030', '--dev', '--show-devtools'];
  } else {
    cmdStr = 'bin/fire-shell/Fireball.app/Contents/MacOS/Fireball';
    optArr = ['./','--debug=3030','--dev','--show-devtools'];
  }
  var child = spawn(cmdStr, optArr, { stdio: 'inherit'});
  child.on('exit', function() {
    cb();
  });
});

gulp.task('run-packagestudio', function(cb) {

  var packagePath = null;
  var knownOptions = {
    string: 'path',
    default: { path: null }
  };
  var argv = require('minimist')(process.argv.slice(2), knownOptions);
//  if (argv.length > 1) {
  packagePath = argv.path;
//  }
  console.log(packagePath);
  var cmdStr = '';
  var optArr = [];
  if (process.platform === "win32") {
    cmdStr = 'bin\\electron\\electron.exe';
    optArr = ['.\\', '--debug=3030', '--dev', '--dev-mode="packages"', '--show-devtools', packagePath];
  } else {
    cmdStr = 'bin/electron/Electron.app/Contents/MacOS/Electron';
    optArr = ['./','--debug=3030','--dev','--dev-mode="packages"','--show-devtools', packagePath];
  }
  var cmdline = cmdStr + ' ' + optArr.join(' ');
//  console.log(cmdline);
  var proc = require('child_process').exec(cmdline);
//  var child = spawn(cmdStr, optArr, { stdio: 'inherit'});
  proc.stdout.on('data', function(data) {
    console.log(data.toString());
  });
  proc.stderr.on('data', function(data) {
    console.log(data.toString());
  });
  proc.on('exit', function() {
    cb();
  });
});

gulp.task('init-submodules', function(cb) {
  git.runGitCmdInPath(['submodule', 'update', '--init'], './', function() {
    console.log('Git submodules inited!');
    cb();
  });
});

gulp.task('pull-fireball', function(cb) {
  git.runGitCmdInPath(['pull', 'origin'], './', function() {
    console.log('Fireball update complete!');
    cb();
  });
});

gulp.task('pull-submodules', function(cb) {
  var modules = pjson.submodules;
  var count = 0;
  modules.map(function(module) {
    if (Fs.existsSync(Path.join(module, '.git'))) {
      count++;
      git.runGitCmdInPath(['pull', 'origin', 'master'], module, function() {
        if (--count <= 0) {
          console.log('Git submodules pull complete!');
          cb();
        }
      });
    } else {
      console.log(module + ' not initialized. Please run "gulp init-submodules" first!');
    }
  });
});

gulp.task('install-builtin', function(cb) {
  var count = 0;
  if (Fs.isDirSync('builtin')) {
    pjson.builtins.map(function(packageName) {
      if (!Fs.existsSync(Path.join('builtin', packageName, '.git'))) {
        count++;
        git.runGitCmdInPath(['clone', 'https://github.com/fireball-packages/' + packageName], 'builtin', function() {
          if (--count <= 0) {
            console.log('Builtin packages installation complete!');
            cb();
          }
        });
      } else {
        console.log(packageName + ' has already installed in builtin/' + packageName + ' folder!');
      }
    });
  } else {
    mkdirp('builtin');
    pjson.builtins.map(function(packageName) {
      count++;
      git.runGitCmdInPath(['clone', 'https://github.com/fireball-packages/' + packageName], 'builtin', function() {
        if (--count <= 0) {
          console.log('Builtin packages installation complete!');
          cb();
        }
      });
    });
  }
});

gulp.task('update-builtin', function(cb) {
  var count = 0;
  if (Fs.isDirSync('builtin')) {
    pjson.builtins.map(function(packageName) {
      if (Fs.existsSync(Path.join('builtin', packageName, '.git'))) {
        count++;
        git.runGitCmdInPath(['pull', 'origin'], Path.join('builtin', packageName), function() {
          if (--count <= 0) {
            console.log('Builtin packages update complete!');
            cb();
          }
        });
      } else {
        console.warn('Builtin package ' + packageName + ' not initialized, please run "gulp install-builtin" first!');
      }
    });
  } else {
    console.warn('Builtin folder not initialized, please run "gulp install-builtin" first!');
    cb();
  }
});

gulp.task('install-runtime', function(cb) {
  var count = 0;
  if (Fs.isDirSync('runtime')) {
    pjson.runtimes.map(function(runtimeName) {
      if (!Fs.existsSync(Path.join('runtime', runtimeName, '.git'))) {
        count++;
        git.runGitCmdInPath(['clone', 'https://github.com/fireball-x/' + runtimeName], 'runtime', function() {
          if (--count <= 0) {
            console.log('Runtime engines installation complete!');
            cb();
          }
        });
      } else {
        console.log(runtimeName + ' has already installed in runtime/' + runtimeName + ' folder!');
      }
    });
  } else {
    mkdirp('runtime');
    pjson.runtimes.map(function(runtimeName) {
      count++;
      git.runGitCmdInPath(['clone', 'https://github.com/fireball-x/' + runtimeName], 'runtime', function() {
        if (--count <= 0) {
          console.log('Runtime engines installation complete!');
          cb();
        }
      });
    });
  }
});

gulp.task('update-runtime', function(cb) {
  var count = 0;
  if (Fs.isDirSync('runtime')) {
    pjson.runtimes.map(function(runtimeName) {
      if (Fs.existsSync(Path.join('runtime', runtimeName, '.git'))) {
        count++;
        git.runGitCmdInPath(['pull', 'origin'], Path.join('runtime', runtimeName), function() {
          if (--count <= 0) {
            console.log('Runtime engines update complete!');
            cb();
          }
        });
      } else {
        console.warn('Runtime engine ' + runtimeName + ' not initialized, please run "gulp install-runtime" first!');
      }
    });
  } else {
    console.warn('Runtime folder not initialized, please run "gulp install-runtime" first!');
    cb();
  }
});

gulp.task('npm', function(cb) {
  var cmdstr = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  var tmpenv = process.env;
  var os = require('os');
  tmpenv.npm_config_disturl = 'https://atom.io/download/atom-shell';
  tmpenv.npm_config_target = pjson['fire-shell-version'];
  tmpenv.npm_config_arch = os.arch();
  tmpenv.HOME = Path.join(tmpenv.HOME, '.electron-gyp');
  var child = spawn(cmdstr, ['install'], {
    stdio: 'inherit',
    env: tmpenv
  });
  child.on('exit', cb);
});

gulp.task('bower', shell.task(['bower install']));

gulp.task('check-deps', function(cb) {
  var checkDeps = require('./utils/check-deps');
  checkDeps.checkSubmoduleDeps(pjson.submodules);
});