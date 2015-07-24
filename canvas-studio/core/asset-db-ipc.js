var Ipc = require('ipc');

function _needCompile ( assetType ) {
    return assetType === 'javascript' ||
        assetType === 'coffeescript' ||
        assetType === 'typescript'
    ;
}

Ipc.on('asset-db:asset-changed', function ( result ) {
    // console.log(arguments);
    if ( _needCompile( result.type ) ) {
        Editor.Compiler.compileLater();
    }
});

Ipc.on('asset-db:assets-moved', function ( results ) {
    var needRecompile = false;
    results.forEach( function ( result ) {
        var info = Editor.assetdb.assetInfo(result.uuid);
        var assetType = info.type;

        if ( !needRecompile ) {
            needRecompile = _needCompile(assetType);
        }

        if ( assetType === 'scene' ) {
            for ( var i = 0; i < Editor.sceneList.length; ++i ) {
                if ( result.uuid === Editor.sceneList[i].uuid ) {
                    Editor.sceneList[i].url = Editor.assetdb.uuidToUrl(result.uuid);
                    break;
                }
            }
        }
    });

    if ( needRecompile ) {
        Editor.Compiler.compileLater();
    }
});

Ipc.on('asset-db:assets-created', function ( results ) {
    var needRecompile = false;
    results.forEach( function ( result ) {
        var info = Editor.assetdb.assetInfo(result.uuid);
        var assetType = info.type;

        if ( !needRecompile ) {
            needRecompile = _needCompile(assetType);
        }

        if ( assetType === 'scene' ) {
            Editor.sceneList.push({
                url: result.url,
                uuid: result.uuid,
            });
        }
    });

    if ( needRecompile ) {
        Editor.Compiler.compileLater();
    }
});

Ipc.on('asset-db:assets-deleted', function ( results ) {
    var needRecompile = false;
    results.forEach( function ( result ) {
        var info = Editor.assetdb.assetInfoByPath(result.path);
        var assetType = info.type;

        if ( !needRecompile ) {
            needRecompile = _needCompile(assetType);
        }

        if ( assetType === 'scene' ) {
            for ( var i = 0; i < Editor.sceneList.length; ++i ) {
                if ( Editor.sceneList[i].uuid === result.uuid ) {
                    Editor.sceneList.splice( i, 1 );
                    break;
                }
            }
        }
    });

    if ( needRecompile ) {
        Editor.Compiler.compileLater();
    }
});
