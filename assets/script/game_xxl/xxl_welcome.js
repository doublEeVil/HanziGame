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
        logo: {
            default: null,
            type: cc.Node
        },

        info: {
            default: null,
            type: cc.Node
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.logo.runAction(cc.fadeOut(2));
        this.scheduleOnce(function() {
            this.info.active = true;
            this.info.runAction(cc.fadeIn(0.5));
        }, 2);

        this.info.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("xxl_game");
        })
    },

    // update (dt) {},
});
