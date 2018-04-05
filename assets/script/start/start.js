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
        },

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
        },

        btn_login_one_key: {
            default: null,
            type: cc.Node
        },

        btn_login : {
            default: null,
            type: cc.Node
        },

        btn_sign: {
            default: null,
            type: cc.Node
        },

        loading: {
            default: null,
            type: cc.ProgressBar
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadResDir("img");
        // 初始化大部分资源
        this.num2res = {
            "1": "mi",
            "2": "bei",
            "3": "chi",
            "4": "mian",
            "5": "cha",
            "6": "tang",
            "7": "jiu",
            "8": "he",
            "9": "wan",
            "10": "fan",
            "11": "dan",
        };
    },

    start () {
        let self = this;
        let WIDTH = this.node.width;
        let HEIGHT = this.node.height;
        cc.log("WIDTH:", WIDTH, " HIGHT:", HEIGHT)

        //移动背景2_1
        let move_1 = cc.moveTo(2.5, cc.p(-this.bg_2_1.width*2, this.bg_2_1.y)).easing(cc.easeCubicActionIn());
        this.bg_2_1.runAction(move_1);
        
        //移动背景2_2
        let move_2 = cc.moveTo(2.5, cc.p(this.bg_2_2.width*2, this.bg_2_2.y)).easing(cc.easeCubicActionIn());
        this.bg_2_2.runAction(move_2);
        
        //移动背景1
        let move_3 = cc.moveTo(10, cc.p(-this.bg_1.width/4, this.bg_1.y)).easing(cc.easeCubicActionOut());
        this.scheduleOnce(function() {
            this.bg_1.runAction(move_3);
        }, 0.1);

        //添加按钮事件
        this.btn_start.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            //cc.director.loadScene("jiyili_welcome");
        });

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

        //添加按钮事件
        this.btn_login_one_key.on(cc.Node.EventType.TOUCH_END, function() {

            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("main");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("main", function() {

            });

            //cc.director.loadScene("level");
        });

        this.btn_login.on(cc.Node.EventType.TOUCH_END, function() {
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("main");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("main", function() {

            });
        });

        this.btn_sign.on(cc.Node.EventType.TOUCH_END, function() {
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("main");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("main", function() {

            });
        });
    },

    // update (dt) {},
});
