(function(){function a(a){if(a){var b={};return b.fontName=a.fontType!==c.Text.FontType.Custom?c.Text.FontType[a.fontType].toLowerCase():a.customFontType,b.fontSize=a.size,b.dimensions=null,b.hAlignment=a.align,b.vAlignment=null,b.fillColor=a.color.toCCColor(),b}return null}var b="undefined"!=typeof global?global:this,c=b.Fire||{},d=c.JS,e=c.FObject,f=c.HashObject,g=c.Asset,h=c.Vec2,i=c.v2,j=c.Matrix23,k=c.Rect,l=c.Color,m=c.Texture,n=c.Sprite,o=c.Atlas,p=c.Engine,q=c._ObjectFlags.Destroying,r=c._ObjectFlags.DontDestroy,s=c._ObjectFlags.Hide,t=c._ObjectFlags.HideInGame,u=c._ObjectFlags.HideInEditor,v=c.__TESTONLY__,w=c.ContentStrategyType,x=c.BitmapText,y=c.BitmapFont,z=c._Runtime;z.init=function(){},l.prototype.toCCColor=function(){return{r:255*this.r|0,g:255*this.g|0,b:255*this.b|0,a:255*this.a|0}};var A=function(){function a(a,b,c,e){a=a||800,b=b||600,e=e||!1;var f=this;this.game=new cc.Game({width:a,height:b,debugMode:1,showFPS:!1,frameRate:60,id:c,renderMode:1,jsList:[]},function(){f.root=f.stage=new cc.Scene,this.view.setResolutionPolicy(cc.ResolutionPolicy.SHOW_ALL),this.director.runScene(f.stage)}),this.game.run(),this.game.pause(),d||(this.game.setEnvironment(),d=new cc.SpriteFrame(new cc.Texture2D,cc.rect()));var g=!1;this.sceneView=null,this.isSceneView=!1,this._camera=null,this.renderer=this.view=this.game.view}function b(a,b){var c=b.getChildren(),d=0;if(c.length>=2){var e=c[c.length-2];d=e.getLocalZOrder()+1}return a.setLocalZOrder(d),d}var d=null;return a.initRenderer=function(a){a._renderObj=null,a._renderObjInScene=null,a._tempMatrix=new c.Matrix23},Object.defineProperty(a.prototype,"canvas",{get:function(){return this.game.canvas}}),Object.defineProperty(a.prototype,"container",{get:function(){return this.game.container}}),Object.defineProperty(a.prototype,"width",{get:function(){return this.size.x},set:function(a){this.size=i(a,this.height)}}),Object.defineProperty(a.prototype,"height",{get:function(){return this.size.y},set:function(a){this.size=i(this.width,a)}}),Object.defineProperty(a.prototype,"size",{get:function(){var a=this.game.director.getWinSize();return new h(a.width,a.height)},set:function(a){this.setDesignResolutionSize(a.x,a.y,this.game.view.getResolutionPolicy())}}),Object.defineProperty(a.prototype,"background",{set:function(a){this.view.setBackgroundColor(a.toCCColor())}}),Object.defineProperty(a.prototype,"camera",{get:function(){return this._camera},set:function(a){this._camera=a,c.isValid(a)&&(a.renderContext=this)}}),a.prototype.onPreRender=function(){this.game.setEnvironment()},a.prototype.render=function(){this.game.frameRun()},a.prototype.setDesignResolutionSize=function(a,b,c){var d=this.game.container.parentNode;d?d.host&&(d=d.host):d=this.game.container,this.view.setFrame(d),this.view.setDesignResolutionSize(a,b,c)},a.prototype.onRootEntityCreated=function(a){this.game.setEnvironment();var c=new cc.Node;a._ccNode=c,c.setAnchorPoint(0,1);var d=0;p._canModifyCurrentScene&&(this.game.setEnvironment(),this.root.addChild(c),d=b(c,this.root)),this.sceneView&&(this.sceneView.game.setEnvironment(),c=new cc.Node,a._ccNodeInScene=c,c.setAnchorPoint(0,1),p._canModifyCurrentScene&&(this.sceneView.game.setEnvironment(),this.sceneView.root.addChild(c)),c.setLocalZOrder(d))},a.prototype.onEntityRemoved=function(a){var b=a._ccNode;b&&(b.parent&&(this.game.setEnvironment(),b.parent.removeChild(b)),a._ccNode=null),b=a._ccNodeInScene,b&&(b.parent&&(this.sceneView.game.setEnvironment(),b.parent.removeChild(b)),a._ccNodeInScene=null)},a.prototype.onEntityParentChanged=function(a,b){this._setParentNode(a._ccNode,a._parent&&a._parent._ccNode),this.sceneView&&this.sceneView._setParentNode(a._ccNodeInScene,a._parent&&a._parent._ccNodeInScene)},a.prototype._setParentNode=function(a,c){a&&(this.game.setEnvironment(),a.removeFromParent(),c=c||this.root,c.addChild(a),b(a,c))},a.prototype.onEntityIndexChanged=function(a,b,c){var d=a._parent?a._parent._children:p._scene.entities;this.game.setEnvironment();for(var e=0,f=d.length,g=null;f>e;e++)g=d[e],g._ccNode.setLocalZOrder(e);if(this.sceneView)for(this.sceneView.game.setEnvironment(),e=0;f>e;e++){g=d[e];var h=g._ccNodeInScene;h&&h.setLocalZOrder(e)}},a.prototype.onSceneLaunched=function(a){this._addToScene(a),this.sceneView&&this.sceneView._addToScene(a)},a.prototype._addToScene=function(a){this.game.setEnvironment();for(var b=a.entities,c=0,d=b.length;d>c;c++){var e=this.isSceneView?b[c]._ccNodeInScene:b[c]._ccNode;e&&(e.getParent()||this.root.addChild(e),e.setLocalZOrder(c))}},a.prototype.onSceneLoaded=function(a){this.game.setEnvironment();for(var b=a.entities,c=0,d=b.length;d>c;c++)this.onEntityCreated(b[c],!1)},a.prototype._onChildEntityCreated=function(a){this.game.setEnvironment();var c=new cc.Node;a._ccNode=c,c.setAnchorPoint(0,1),a._parent._ccNode.addChild(c);var d=b(c,a._parent._ccNode);this.sceneView&&(this.sceneView.game.setEnvironment(),c=new cc.Node,a._ccNodeInScene=c,c.setAnchorPoint(0,1),a._parent._ccNodeInScene.addChild(c),c.setLocalZOrder(d));for(var e=a._children,f=0,g=e.length;g>f;f++)this._onChildEntityCreated(e[f])},a.prototype.onEntityCreated=function(a,c){var d=0;this.game.setEnvironment();var e=new cc.Node;a._ccNode=e,e.setAnchorPoint(0,1),a._parent?(a._parent._ccNode.addChild(e),d=b(e,a._parent._ccNode)):c&&(this.root.addChild(e),d=b(e,this.root)),this.sceneView&&(this.sceneView.game.setEnvironment(),e=new cc.Node,a._ccNodeInScene=e,e.setAnchorPoint(0,1),a._parent?a._parent._ccNodeInScene.addChild(e):c&&this.sceneView.root.addChild(e),e.setLocalZOrder(d));for(var f=a._children,g=0,h=f.length;h>g;g++)this._onChildEntityCreated(f[g])},a.prototype._addSprite=function(a,b){this.game.setEnvironment();var c=new cc.Sprite(a);return c.setAnchorPoint(0,1),b.addChild(c,0),c.setLocalZOrder(-1),c},a.prototype.addSprite=function(a){var b=this.createTexture(a._sprite),c=!(a.entity._objFlags&t);c&&(a._renderObj=this._addSprite(b,a.entity._ccNode)),this.sceneView&&(a._renderObjInScene=this.sceneView._addSprite(b,a.entity._ccNodeInScene)),this.updateColor(a)},a.prototype.show=function(a,b){a._renderObj&&(a._renderObj.visible=b),a._renderObjInScene&&(a._renderObjInScene.visible=b)},a.prototype.remove=function(a){a._renderObj&&(a._renderObj&&a._renderObj.parent&&(this.game.setEnvironment(),a._renderObj.parent.removeChild(a._renderObj)),a._renderObj=null),this.sceneView&&(a._renderObjInScene&&a._renderObjInScene.parent&&(this.sceneView.game.setEnvironment(),a._renderObjInScene.parent.removeChild(a._renderObjInScene)),a._renderObjInScene=null)},a.prototype.updateColor=function(a){var b=a._color.toCCColor();a._renderObj&&(this.game.setEnvironment(),a._renderObj.setColor(b),a._renderObj.setOpacity(255*a._color.a)),this.sceneView&&a._renderObjInScene&&(this.sceneView.game.setEnvironment(),a._renderObjInScene.setColor(b),a._renderObjInScene.setOpacity(255*a._color.a)),a._renderObj||a._renderObjInScene||c.error(""+a+" must be added to render context first!")},a.prototype.updateMaterial=function(a){var b=this.createTexture(a._sprite);a._renderObj&&(this.game.setEnvironment(),a._renderObj.setSpriteFrame(b)),a._renderObjInScene&&this.sceneView&&(this.sceneView.game.setEnvironment(),a._renderObjInScene.setSpriteFrame(b)),a._renderObj||a._renderObjInScene||c.error(""+a+" must be added to render context first!")},a.prototype.updateTransform=function(a,b){var c;if(c=this.isSceneView?a._renderObjInScene:a._renderObj){var d=b.getTRS();c.setPosition(b.tx,b.ty);var e=d.rotation*Math.R2D;e=-e,c._rotationX!==e&&c.setRotation(e);var f=d.scale;(c._scaleX!==f.x||c._scaleY!==f.y)&&c.setScale(f.x,f.y)}},a.prototype.createTexture=function(a){if(a&&a.texture&&a.texture.image){var b=a.texture._uuid||a.texture.id;this.isSceneView;var c=cc.textureCache.addUIImage(a.texture.image,b),e=cc.rect(a.x,a.y,Math.min(c.width-a.x,a.width),Math.min(c.height-a.y,a.height));return new cc.SpriteFrame(c,e)}return d},a}();A.prototype._getChildrenOffset=function(a,b){if(a){var d=this.inSceneView?a._ccNodeInScene:a._ccNode,e=b||a._children[0];if(e){var f=this.inSceneView?e._ccNodeInScene:e._ccNode,g=d.children.indexOf(f);return-1!==g?g:b?d.children.length:(c.error("%s's cocos object not contains in its cocos parent's children",e.name),-1)}return d.children.length}return 0},A.prototype.checkMatchCurrentScene=function(){function a(b,c,d){if(d&&b._ccNodeInScene!==d)throw new Error("entity does not match cocos scene node: "+b.name);if(b._ccNode!==c)throw new Error("entity does not match cocos game node: "+b.name);var f=b._children.length,g;if(d&&(g=e.sceneView._getChildrenOffset(b),d.children.length!==f+g))throw console.error("Mismatched list of child elements in Scene view, entity: %s,\ncocos childCount: %s, entity childCount: %s, rcOffset: %s",b.name,d.children.length,f,g),new Error("(see above error)");var h=e._getChildrenOffset(b);if(c.children.length!==f+h)throw new Error("Mismatched list of child elements in Game view, entity: "+b.name);for(var i=0;f>i;i++)a(b._children[i],c.children[h+i],d&&d.children[i+g])}var b=p._scene.entities,c=this.stage.children,d;this.sceneView&&(d=this.sceneView.stage.children,d=d[1].children);for(var e=this,f=0;f<b.length;f++){if(d&&d.length!==b.length)throw new Error("Mismatched list of root elements in scene view");if(c.length!==b.length)throw new Error("Mismatched list of root elements in game view");a(b[f],c[f],d&&d[f])}},z.RenderContext=A;var B=function(a){var b=a.bitmapFont;if(b){var c={};c.alignment=a.align,c.imageOffset=null,c.width=null,c.image=b.texture.image,c.config={commonHeight:b.lineHeight,atlasName:b.atlasName};for(var d=c.config.fontDefDictionary={},e=b.charInfos,f=e.length,g=0;f>g;g++){var h=e[g],i=h.id;d[i]={rect:{x:h.x,y:h.y,width:h.width,height:h.height},xOffset:h.xOffset,yOffset:h.yOffset,xAdvance:h.xAdvance}}var j=c.config.kerningDict={},k=b.kernings;f=k.length;for(var l=0;f>l;l++){var m=k[l];j[m.first|65535&m.second]=m.amount}return c}};cc.LabelBMFont.prototype.initWithString=function(a,b){if(!b)return!1;var c=this,d=a||"";c._config=b.config;var e=new cc.Texture2D;return e.initWithElement(b.image),c._textureLoaded=!0,c.initWithTexture(e,d.length)?(c._alignment=b.alignment||cc.TEXT_ALIGNMENT_LEFT,c._imageOffset=b.imageOffset||cc.p(0,0),c._width=null===b.width?-1:b.width,c._realOpacity=255,c._realColor=cc.color(255,255,255,255),c._contentSize.width=0,c._contentSize.height=0,c.setAnchorPoint(0,1),this._renderCmd._initBatchTexture(),c.setString(d,!0),!0):!1},A.prototype.getTextSize=function(a){var b=!(a.entity._objFlags&t),c=0,d=0;return b&&a._renderObj?(c=a._renderObj.width,d=a._renderObj.height):a._renderObjInScene&&(c=a._renderObjInScene.width,d=a._renderObjInScene.height),new h(c,d)},A.prototype.setText=function(a,b){a._renderObj&&(this.game.setEnvironment(),a._renderObj.setString(b)),this.sceneView&&a._renderObjInScene&&(this.sceneView.game.setEnvironment(),a._renderObjInScene.setString(b))},A.prototype.setAlign=function(a){a._renderObj&&(this.game.setEnvironment(),a._renderObj.setAlignment(a.align)),this.sceneView&&a._renderObjInScene&&(this.sceneView.game.setEnvironment(),a._renderObjInScene.setAlignment(a.align))},A.prototype.updateBitmapFont=function(a){this.remove(a),this.addBitmapText(a)},A.prototype.addBitmapText=function(a){var b=B(a);if(b){var c,d=!(a.entity._objFlags&t);d&&(this.game.setEnvironment(),c=new cc.LabelBMFont(a.text,b),a._renderObj=c,a.entity._ccNode.addChild(c),c.setLocalZOrder(-1)),this.sceneView&&(this.sceneView.game.setEnvironment(),c=new cc.LabelBMFont(a.text,b),a._renderObjInScene=c,a.entity._ccNodeInScene.addChild(c),c.setLocalZOrder(-1))}},A.prototype.updateBitmapTextTransform=A.prototype.updateTransform;var C=function(b,c){var d=a(b);c.setFontName(d.fontName),c.setFontSize(d.fontSize),c.color=d.fillColor,c.setOpacity(255*b.color.a),c.setHorizontalAlignment(d.hAlignment)};A.prototype.setTextStyle=function(a){a._renderObj&&(this.game.setEnvironment(),C(a,a._renderObj)),this.sceneView&&a._renderObjInScene&&(this.sceneView.game.setEnvironment(),C(a,a._renderObjInScene))},A.prototype.setTextContent=function(a,b){a._renderObj&&(this.game.setEnvironment(),a._renderObj.setString(b)),this.sceneView&&a._renderObjInScene&&(this.sceneView.game.setEnvironment(),a._renderObjInScene.setString(b))},A.prototype.addText=function(b){var c=a(b);if(c){var d,e=!(b.entity._objFlags&t);e&&(this.game.setEnvironment(),d=new cc.LabelTTF(b.text),d.setAnchorPoint(0,1),b._renderObj=d,b.entity._ccNode.addChild(d)),this.sceneView&&(this.sceneView.game.setEnvironment(),d=new cc.LabelTTF(b.text),d.setAnchorPoint(0,1),b._renderObjInScene=d,b.entity._ccNodeInScene.addChild(d)),d&&(this.setTextStyle(b),d.setLocalZOrder(-1))}},A.prototype.getTextSize=function(a){var b=!(a.entity._objFlags&t),c=null;return b&&a._renderObj?c=a._renderObj.getContentSize():a._renderObjInScene&&(c=a._renderObjInScene.getContentSize()),c?new h(c.width,c.height):h.zero},A.prototype.updateTextTransform=A.prototype.updateTransform,A.createSceneRenderCtx=function(a,b,c,d){var e=new A(a,b,c,d),f=new cc.Layer,g=new cc.Layer,h=new cc.Layer;return e.stage.addChild(h,0,0),e.stage.addChild(g,1,1),e.stage.addChild(f,2,2),e.root=g,e.isSceneView=!0,p._renderContext.sceneView=e,e},A.prototype.getForegroundNode=function(){return this.stage.children[this.stage.children.length-1]},A.prototype.getBackgroundNode=function(){return this.stage.children[0]},function(){function a(a,b){this.renderContext=b||c.Engine._renderContext,this.renderContext.game.setEnvironment(),this.drawNode=new cc.DrawNode,a.addChild(this.drawNode),this.lineWidthFactor=this.renderContext.game.renderType===cc.Game.RENDER_TYPE_WEBGL?window.devicePixelRatio:.5,this.lastPos=cc.p(0,0)}function b(a,b){return b=void 0===b?255:255*b,new cc.Color(a>>16,(65280&a)>>8,255&a,b)}var e=.5;a.prototype.clear=function(){this.drawNode.clear(),this.lastPos=cc.p(0,0),this.drawNode.setDrawColor(new cc.Color(255,255,255,255))},a.prototype.beginFill=function(a,c){return a=a||0,c=void 0===c?1:c,this.drawNode.setDrawColor(b(a,c)),this},a.prototype.lineStyle=function(a,c,d){return a=a||0,c=c||0,d=void 0===d?1:d,this.drawNode.setLineWidth(a*this.lineWidthFactor),this.drawNode.setDrawColor(b(c,d)),this},a.prototype.lineTo=function(a,b){var c=cc.p(a+e,this._height-b+e);return this.drawNode.drawSegment(this.lastPos,c),this.lastPos=c,this},a.prototype.moveTo=function(a,b){return this.lastPos=cc.p(a+e,this._height-b+e),this},a.prototype.endFill=function(){return this},d.get(a.prototype,"_height",function(){return this.renderContext.size.y}),A.Graphics=a}(),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=c),exports.Fire=c):"undefined"!=typeof define&&define.amd?define(c):(b.Fire=c,b.Editor=Editor)}).call(this);