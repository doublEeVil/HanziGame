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

        index: 1,   

        // btn
        btn_audio: {
            default: null,
            type: cc.Sprite
        },

        btn_forward: {
            default: null,
            type: cc.Sprite
        },

        btn_next: {
            default: null,
            type: cc.Sprite
        },

        btn_skip: {
            default: null,
            type: cc.Sprite
        },

        //
        sp_pinyin: {
            default: null,
            type: cc.Node
        },

        sp_shiyi: {
            default: null,
            type: cc.Node
        },

        sp_ziti: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.num2res = {
            "1": "mi",
            "2": "bei",
            "3": "chi",
            "4": "mian",
            "5": "cha",
            "6": "tang",
            "7": "jiu",
            "8": "he",
            "9": "wang",
            "10": "bei",
            "11": "dan",
        },
        this.num2len = {
            "1": 2,
            "2": 3,
            "3": 3,
            "4": 4,    
            "5": 3,
            "6": 4,
            "7": 3,
            "8": 2, 
            "9": 3,
            "10": 3,
            "11": 3,      
        },

        this.WIDTH = cc.director.getWinSize().width;
        this.HEIGHT = cc.director.getWinSize().height;
    },

    start () {
        var self = this;
        this.btn_audio.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_audio press");
        });

        this.btn_forward.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_forward press");
            self.index--;
            if (self.index <= 0) {
                self.index = 1;
                return;
            }
            self.loadAll();
        });

        this.btn_next.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_next press");
            self.index++;
            if (self.index >= 11) {
                self.index = 11;
                return;
            }
            self.loadAll();
        });

        this.btn_skip.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_skip press");
        });

        this.scheduleOnce(function() {
            this.loadAll();
        }, 0.0);
    },

    loadAll: function() {
        // pinyin
        var self = this;
        let url_pinyin = 'img/pinyin/pinyin_' + this.num2res["" + this.index] + '.png';
        this.sp_pinyin.spriteFrame.setTexture(cc.url.raw(url_pinyin)); 
        cc.log("--", this.sp_pinyin.node.width)
        //this.sp_pinyin.node.width = 12 * this.num2len[this.index];
        //shiyi
        let url_shiyi = 'img/shiyi/shiyi_' + this.num2res["" + this.index] + '.png';
        this.sp_shiyi.spriteFrame.setTexture(cc.url.raw(url_shiyi));
        this.sp_shiyi.node.opacity = 0;
        let action1 = cc.fadeIn(1.5);
        this.scheduleOnce(function() {
            this.sp_shiyi.node.runAction(action1);
        }, 1.0);

        //ziti
        let url_ziti = 'img/ziti/ziti_' + this.num2res["" + this.index] + '.png';
        this.sp_ziti.spriteFrame.setTexture(cc.url.raw(url_ziti));
        this.sp_ziti.node.x = 0;
        this.sp_ziti.node.y = 0;
        let move = cc.moveTo(1.5, cc.p(-400, 250)).easing(cc.easeCubicActionOut());
        let scale = cc.scaleTo(1.5, 1).easing(cc.easeCubicActionOut());
        let action2 = cc.spawn(move, scale);
        this.scheduleOnce(function() {
            this.sp_ziti.node.runAction(action2);
        }, 0.2);

    },

    // update (dt) {},
});
