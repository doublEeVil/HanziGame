// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        type: 0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log("addd");
    },

    start () {
    
        cc.log("this is entity");
    },

    change: function() {
        cc.log("huantu");
        // var sp = this.node.getComponent(cc.Sprite);
        // let url = "img/ziti/ziti_bei.png";
        // cc.url.raw(url)
        // this.scheduleOnce(function() {
        //     sp.spriteFrame.setTexture(cc.url.raw(url));
        // }, 0.1);

        // cc.log(sp);
    }
    // update (dt) {},
});
