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

        btn_setting: {
            default: null,
            type: cc.Node
        },

        btn_myinfo: {
            default: null,
            type: cc.Node
        },
        
        btn_richang: {
            default: null,
            type: cc.Node
        },

        btn_qimo: {
            default: null,
            type: cc.Node
        },

        loading: {
            default: null,
            type: cc.ProgressBar
        },

        lb_richang: {
            default: null,
            type: cc.Label
        },
        lb_qimo: {
            default: null,
            type: cc.Label
        },
        lb_caigeci: {
            default: null,
            type: cc.Label
        },
        lb_zhaoguilv: {
            default: null,
            type: cc.Label
        },
        lb_jinrihanzi: {
            default: null,
            type: cc.Label
        },
        lb_gengduo: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       if (cc.sys.localStorage.getItem("lang") == "en") {
           this.lb_richang.string = "daily mode";
           this.lb_qimo.string = "final exam";
           this.lb_caigeci.string = "guess song";
           this.lb_zhaoguilv.string = "finding law"
           this.lb_jinrihanzi.string = "daily hanzi";
           this.lb_gengduo.string = "more";
       }
    },



    start () {
        let self = this;

        this.btn_setting.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("setting");
        });

        this.btn_myinfo.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("myinfo");
        });

        this.btn_richang.on(cc.Node.EventType.TOUCH_END, function() {
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.sys.localStorage.setItem("mode", "richang");
                    cc.director.loadScene("richang_level");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("richang_level", function() {

            });
        });

        this.btn_qimo.on(cc.Node.EventType.TOUCH_END, function() {
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.sys.localStorage.setItem("mode", "qimo");
                    cc.director.loadScene("qimo_level");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("qimo_level", function() {

            });
        });
    },

    // update (dt) {},
});
