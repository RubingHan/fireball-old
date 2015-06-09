var Fs = require('fire-fs');
var Path = require('fire-path');
var Del = require('del');

require('../init');

//
describe('Editor.App (Dashboard)', function() {
    describe('Editor.App.loadRuntimeInfos', function() {
        afterEach(function ( done ) {
            Editor.App._runtimeInfos = {};
            done();
        });

        it('should load all runtimes in fixtures/runtime-simple/', function( done ) {
            var path = Editor.url('app://dashboard/test/fixtures/runtime-simple/');
            assert.isTrue(Fs.existsSync(path));
            Editor.App.loadRuntimeInfos( path, function ( err ) {
                expect(Editor.App._runtimeInfos).to.deep.equal({
                    "cocos2d-js": {
                        "description": "A cocos2d-js runtime",
                        "name": "cocos2d-js",
                        "path": Editor.url("app://dashboard/test/fixtures/runtime-simple/runtime-cocos2d-js"),
                        "version": "0.0.1",
                    },
                    "pixi": {
                        "description": "A pixi runtime",
                        "name": "pixi",
                        "path": Editor.url("app://dashboard/test/fixtures/runtime-simple/runtime-pixi"),
                        "version": "0.0.1",
                    },
                    "three.js": {
                        "description": "A three.js runtime",
                        "name": "three.js",
                        "path": Editor.url("app://dashboard/test/fixtures/runtime-simple/runtime-three-js"),
                        "version": "0.0.1",
                    },
                    "babylonjs": {
                        "description": "A babylonjs runtime",
                        "name": "babylonjs",
                        "path": Editor.url("app://dashboard/test/fixtures/runtime-simple/runtime-babylonjs"),
                        "version": "0.0.1"
                    },
                });
                done();
            });
        });

        it('should report error but continue loading other runtime infos in fixtures/runtime-with-error/', function( done ) {
            var path = Editor.url('app://dashboard/test/fixtures/runtime-with-error/');
            assert.isTrue(Fs.existsSync(path));
            Editor.App.loadRuntimeInfos( path, function ( err ) {
                expect(Editor.App._runtimeInfos).to.deep.equal({
                    "pixi": {
                        "description": "A pixi runtime",
                        "name": "pixi",
                        "path": Editor.url("app://dashboard/test/fixtures/runtime-with-error/runtime-pixi"),
                        "version": "0.0.1"
                    },
                });
                done();
            });
        });
    });

    describe('Editor.App.createProject', function() {
        var path = Editor.url('app://dashboard/test/fixtures/new-project/');
        before(function ( done ) {
            var path = Editor.url('app://dashboard/test/fixtures/runtime-simple/');
            Editor.App.loadRuntimeInfos( path, done );
        });
        after(function ( done ) {
            Editor.App._runtimeInfos = {};
            Del(path, done);
        });

        it('should create a project after call', function( done ) {
            Editor.App.createProject( {
                path: path,
                runtime: 'pixi',
            }, function ( err ) {
                assert.isNull(err, err ? err.message : '');
                expect(Fs.existsSync(path)).to.equal(true);
                expect(Fs.existsSync(Path.join(path, 'settings'))).to.equal(true);
                expect(Fs.existsSync(Path.join(path, 'local'))).to.equal(true);
                expect(Fs.existsSync(Path.join(path, 'library'))).to.equal(true);
                expect(Fs.existsSync(Path.join(path, 'assets'))).to.equal(true);
                expect(Fs.existsSync(Path.join(path, 'packages'))).to.equal(true);

                var pjsonPath = Path.join(path, 'settings/project.json');
                expect(Fs.existsSync(pjsonPath)).to.equal(true);
                var pjsonObj = JSON.parse(Fs.readFileSync(pjsonPath));
                assert.equal( pjsonObj.runtime, 'pixi' );

                done();
            });
        });

        it('should report error when runtime not found', function( done ) {
            Editor.App.createProject({
                path: path,
                runtime: 'foobar',
            }, function ( err) {
                expect( err ).to.be.instanceof(Error);
                done ();
            });
        });

        it('should report error when project exists', function( done ) {
            Editor.App.createProject({
                path: path,
                runtime: 'pixi',
            }, function ( err) {
                expect( err ).to.be.instanceof(Error);
                done ();
            });
        });
    });
});
