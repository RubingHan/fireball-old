(function () {
    // mixin Editor for canvas-studio
    Editor.require('app://canvas-studio/page/editor-init');

    // init engine-framework
    Editor.require('app://engine-framework');

    // init asset-db
    Editor.require('app://asset-db');

    // init canvas-assets
    Editor.require('packages://canvas-assets/init');

    // init ui-property
    Editor.require('packages://ui-property/init');
})();
