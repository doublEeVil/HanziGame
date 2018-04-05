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

        btn_level_food: {
            default: null,
            type: cc.Node
        },

        loading: {
            default: null,
            type: cc.ProgressBar
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;

        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("level");
        });

        this.btn_level_food.on(cc.Node.EventType.TOUCH_END, function() {
            //cc.director.loadScene("xuexi");
            self.loading.node.active = true;
            self.node.opacity = 50;

            cc.loader.onProgress = function (num, total, item) {
                cc.log(num, total);
                self.loading.progress = num / total;
                if (num == total) { 
                    cc.director.loadScene("xuexi");
                    cc.loader.onProgress = function(){}
                }
            }

            cc.director.preloadScene("xuexi", function() {
                //cc.director.loadScene("buyu_game");
            });
        });
    },

    // update (dt) {},
});
