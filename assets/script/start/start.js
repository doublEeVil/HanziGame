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
        bg_2_1: {
            default: null, 
            type: cc.Node
        }, 

        bg_2_2: {
            default: null, 
            type: cc.Node
        },

        bg_1: {
            default: null, 
            type: cc.Node
        }, 

        btn_start: {
            default: null, 
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let WIDTH = this.node.width;
        let HEIGHT = this.node.height;
        cc.log("WIDTH:", WIDTH, " HIGHT:", HEIGHT)

        //移动背景2_1
        let move_1 = cc.moveTo(5.0, cc.p(-this.bg_2_1.width*2, this.bg_2_1.y)).easing(cc.easeCubicActionOut());
        this.bg_2_1.runAction(move_1);
        
        //移动背景2_2
        let move_2 = cc.moveTo(5.0, cc.p(this.bg_2_2.width*2, this.bg_2_2.y)).easing(cc.easeCubicActionOut());
        this.bg_2_2.runAction(move_2);
        
        //移动背景1
        let move_3 = cc.moveTo(10, cc.p(-this.bg_1.width/4, this.bg_1.y)).easing(cc.easeCubicActionOut());
        this.scheduleOnce(function() {
            this.bg_1.runAction(move_3);
        }, 1);

        //添加按钮事件
        this.btn_start.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_start pressed");
            this.destroy();
            cc.director.loadScene("game");
        });
    },

    // update (dt) {},
});
