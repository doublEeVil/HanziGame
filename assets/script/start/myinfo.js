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

        lb_coin: {
            default: null,
            type: cc.Label
        }, 

        lb_yuanbao: {
            default: null,
            type: cc.Label
        }, 

        lb_hulu: {
            default: null,
            type: cc.Label
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("main");
        });

        this.lb_coin.string = "+" + this.getCoin();
        this.lb_yuanbao.string = "+" + this.getYuanbao();;
        this.lb_hulu.string = "+" + this.getHulu();
    },

    getCoin: function() {
        var coin = cc.sys.localStorage.getItem("coin");
        if (coin == null) {
            return 0;
        }
        coin = cc.sys.localStorage.getItem("coin");
        return parseInt(coin);
    },

    getYuanbao: function() {
        var coin = cc.sys.localStorage.getItem("yuanbao");
        if (coin == null) {
            return 0;
        }
        coin = cc.sys.localStorage.getItem("yuanbao");
        return parseInt(coin);
    },

    getHulu: function() {
        var coin = cc.sys.localStorage.getItem("hulu");
        if (coin == null) {
            return 0;
        }
        coin = cc.sys.localStorage.getItem("hulu");
        return parseInt(coin);
    },


    // update (dt) {},
});
