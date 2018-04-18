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
        btn_back: {
            default: null,
            type: cc.Node
        },
        btn_xuexi: {
            default: null,
            type: cc.Node
        },

        btn_jiyili: {
            default: null,
            type: cc.Node
        },

        btn_xxl: {
            default: null,
            type: cc.Node
        },

        btn_buyu: {
            default: null,
            type: cc.Node
        },

        loading: {
            default: null,
            type: cc.ProgressBar
        },

        dialog: {
            default: null,
            type: cc.Node
        },

        btn_ok: {
            default: null,
            type: cc.Node
        },

        btn_no: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;

        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("main");
        });

        this.btn_xuexi.on(cc.Node.EventType.TOUCH_END, function() {
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("xuexi_qimo");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("xuexi_qimo", function() {

            });
        });

        this.btn_ok.on(cc.Node.EventType.TOUCH_END, function(){
            self.dialog.active = false;

            //进入游戏界面
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("xuexi_qimo");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("xuexi_qimo", function() {

            });
        });

        this.btn_no.on(cc.Node.EventType.TOUCH_END, function(){
            cc.log("---", self.loadSceneName)
            // 进入对应的界面
            self.dialog.active = false;
            self.loading.node.active = true;
            self.node.opacity = 50;

            

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene(self.loadSceneName);
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene(self.loadSceneName, function() {

            });
        });

        this.btn_jiyili.on(cc.Node.EventType.TOUCH_END, function() {
            if (self.isFirstLoad()) {
                self.node.opacity = 125;
                self.dialog.active = true;
                self.loadSceneName = "jiyili_game_03";
                return;
            }

            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("jiyili_game_03");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("jiyili_game_03", function() {

            });
        });

        this.btn_xxl.on(cc.Node.EventType.TOUCH_END, function() {
            if (self.isFirstLoad()) {
                self.node.opacity = 125;
                self.dialog.active = true;
                self.loadSceneName = "xxl_game";
                return;
            }

            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("xxl_game");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("xxl_game", function() {

            });
        });

        this.btn_buyu.on(cc.Node.EventType.TOUCH_END, function() {
            if (self.isFirstLoad()) {
                self.node.opacity = 125;
                self.dialog.active = true;
                self.loadSceneName = "buyu_game";
                return;
            }

            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("buyu_game");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("buyu_game", function() {

            });
        });
    },

    isFirstLoad: function() {
        if (null == cc.sys.localStorage.getItem("qi_level_first")) {
            cc.sys.localStorage.setItem("qi_level_first", "true")
            return true;
        }
        return true;
    }
    // update (dt) {},
});
