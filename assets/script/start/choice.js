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

        btn_ch_study: {
            default: null,
            type: cc.Node
        },
        
        btn_ch_jiliyi: {
            default: null,
            type: cc.Node
        },
        
        btn_ch_xxl: {
            default: null,
            type: cc.Node
        },
        
        btn_ch_setting: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        //添加按钮事件
        this.btn_ch_study.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            cc.director.loadScene("xuexi");
        });

        //添加按钮事件
        this.btn_ch_jiliyi.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            cc.director.loadScene("jiyili_welcome");
        });

        //添加按钮事件
        this.btn_ch_xxl.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            alert("暂未开放");
            //this.destroy();
            //cc.director.loadScene("jiyili_welcome");
        });

        //添加按钮事件
        this.btn_ch_setting.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            alert("暂未开放");
            //this.destroy();
            //cc.director.loadScene("jiyili_welcome");
        });
    },

    // update (dt) {},
});
