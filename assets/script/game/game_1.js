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
            type: cc.Sprite
        },

        sp_shiyi: {
            default: null,
            type: cc.Sprite
        },

        sp_ziti: {
            default: null,
            type: cc.Sprite
        },

        //播放gif
        wbview_bihua :{
            default: null,
            type: cc.WebView
        },
        
        pos: {
            default: null,
            type: cc.Node
        },

        //拼音
        lb_pinyin: {
            default: null,
            type: cc.Label
        }
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
            "10": "fan",
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

        this.num2hanzi = {
            "1": "米",
            "2": "杯",
            "3": "吃",            
            "4": "面",            
            "5": "茶",            
            "6": "汤",            
            "7": "酒",  
            "8": "喝",
            "9": "碗",
            "10": "饭",            
            "11": "蛋",                                       
        }

        this.WIDTH = cc.director.getWinSize().width;
        this.HEIGHT = cc.director.getWinSize().height;
    },

    /**
     * 一开始只出现一个字
     * 然后字飘到左上角
     * 笔画和图片同时出现
     */
    start () {
        var self = this;
        this.btn_audio.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_audio press");
            //按钮变化
            let action1 = cc.scaleBy(0.1, 1.1).easing(cc.easeCubicActionOut());
            let action2 = cc.scaleTo(0.1, 1.0).easing(cc.easeCubicActionOut());
            self.btn_audio.node.runAction(cc.sequence(action1, action2));
        });

        this.btn_forward.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_forward press");
            //按钮变化
            let action1 = cc.scaleBy(0.1, 1.1).easing(cc.easeCubicActionOut());
            let action2 = cc.scaleTo(0.1, 1.0).easing(cc.easeCubicActionOut());
            self.btn_forward.node.runAction(cc.sequence(action1, action2));
            self.index--;
            if (self.index <= 0) {
                self.index = 1;
                return;
            }
            self.loadAll();
        });

        this.btn_next.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log("btn_next press");
            //按钮变化
            let action1 = cc.scaleBy(0.1, 1.1).easing(cc.easeCubicActionOut());
            let action2 = cc.scaleTo(0.1, 1.0).easing(cc.easeCubicActionOut());
            self.btn_next.node.runAction(cc.sequence(action1, action2));
            self.index++;
            if (self.index >= 12) {
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
        // let url_pinyin = 'img/pinyin/pinyin_' + this.num2res["" + this.index] + '.png';
        // this.sp_pinyin.spriteFrame.setTexture(cc.url.raw(url_pinyin)); 
        // cc.log("--", this.sp_pinyin.node.width)
        //this.sp_pinyin.node.width = 12 * this.num2len[this.index];
        this.lb_pinyin.getComponent("PinYinLabel").pinyinString = this.num2hanzi["" + this.index];


        let url_shiyi = 'img/shiyi/shiyi_' + this.num2res["" + this.index] + '.png';
        this.sp_shiyi.spriteFrame.setTexture(cc.url.raw(url_shiyi));
        this.sp_shiyi.node.runAction(cc.hide());
        
        let opacity255 = cc.fadeIn(2.5);
        this.scheduleOnce(function() {
            this.sp_shiyi.node.runAction(cc.show());
            this.sp_shiyi.node.runAction(opacity255);
            //this.sp_shiyi.node.runAction(cc.spawn(opacity255, cc.show()));
        }, 1);

        //出现字
        let url_ziti = 'img/ziti/ziti_' + this.num2res["" + this.index] + '.png';
        this.sp_ziti.spriteFrame.setTexture(cc.url.raw(url_ziti));
        // this.sp_ziti.node.x = this.pos.x;
        // this.sp_ziti.node.y = this.pos.y;
        // this.sp_ziti.node.scale = 4;
        // this.sp_ziti.node.opacity = 255;

        let move1 = cc.moveTo(0, cc.p(this.pos.x, this.pos.y));
        let scale1 = cc.scaleTo(0, 1);
        this.sp_ziti.node.runAction(cc.spawn(move1, scale1));

        let move2 = cc.moveTo(1.5, cc.p(-186, 437)).easing(cc.easeCubicActionOut());
        let scale2 = cc.scaleTo(1.5, 0.2).easing(cc.easeCubicActionOut());
        let action2 = cc.spawn(move2, scale2);
        this.scheduleOnce(function() {
            this.sp_ziti.node.runAction(action2);
        }, 0.5);

        //笔画,用webview播放gif
        cc.log("bihua..", this.wbview_bihua)
        this.wbview_bihua.node.runAction(cc.hide());
        this.scheduleOnce(function(){
            this.wbview_bihua.node.runAction(cc.show());
            let url_bihua = 'img/zixing/zixing_' + this.num2res["" + this.index] + '.gif';
            this.wbview_bihua.url = cc.url.raw(url_bihua);
        }, 1)

    },

    // update (dt) {},
});
