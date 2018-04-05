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
        btn_level_1: {
            default: null,
            type: cc.Node
        },

        btn_search: {
            default: null,
            type: cc.Node
        },

        btn_study_log: {
            default: null,
            type: cc.Node
        },

        btn_setting: {
            default: null,
            type: cc.Node
        },

        dialog: {
            default: null, 
            type: cc.Node
        },

        btn_to_study_ok: {
            default: null, 
            type: cc.Node
        },

        btn_to_study_no: {
            default: null, 
            type: cc.Node
        },

        btn_study: {
            default: null, 
            type: cc.Node
        },

        btn_xxl: {
            default: null, 
            type: cc.Node
        },

        btn_jiyili: {
            default: null, 
            type: cc.Node
        },

        btn_buyu: {
            default: null, 
            type: cc.Node
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        let self = this;

        this.btn_level_1.on(cc.Node.EventType.TOUCH_END, function() {
            this.node.opacity = 100;
            this.dialog.active = true;
        }, this);

        this.btn_to_study_ok.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("ok pressed");
            cc.director.loadScene("xuexi");
        });

        this.btn_to_study_no.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("no pressed");
            cc.director.loadScene("jiyili_welcome");
        });

        this.btn_search.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("no pressed");
            cc.director.loadScene("search");
        });

        this.btn_study.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("no pressed");
            cc.director.loadScene("xuexi_level");
        });

        this.btn_xxl.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("no pressed");
            cc.director.loadScene("xxl_level");
        });

        this.btn_jiyili.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("no pressed");
            cc.director.loadScene("jiyili_level");
        });

        this.btn_setting.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("setting");
        });

        this.btn_study_log.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("myinfo");
        });

        this.btn_buyu.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("buyu_level");
        });
        
    },

    // update (dt) {},
});
