
cc.Class({
    extends: cc.Component,

    properties: {
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
        
        pos: {
            default: null,
            type: cc.Node
        },

        //拼音
        lb_pinyin: {
            default: null,
            type: cc.Label
        },

        vplayer: {
            default: null,
            type: cc.VideoPlayer
        },

        webview: {
            default: null,
            type: cc.WebView
        }, 

        info: {
            default: null,
            type: cc.Label
        },

        layout: {
            default: null,
            type: cc.Layout
        },

        bg_quan: {
            default: null,
            type: cc.Node
        },

        dialog: {
            default: null,
            type: cc.Node
        },

        btn_next_ok: {
            default: null,
            type: cc.Node
        },

        btn_next_no: {
            default: null,
            type: cc.Node
        },

        welcome: {
            default: null,
            type: cc.Node
        },

        audio: {
            type: [cc.AudioSource],
            default: []
        },

        bgm: {
            default:null,
            type: cc.AudioSource
        },

        btn_back: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.num2time = {
            "1": 82,
            "2": 91,
            "3": 66,
            "4": 109,
            "5": 85,
            "6": 112,
            "7": 99,
            "8": 82,
            "9": 71,
            "10": 67,
            "11": 112,
            "12": 103,
            "13": 34,
            "14": 83,
            "15": 45,
            "16": 43,
            "17": 51,
            "18": 65,
            "19": 80,

        },

        this.num2res = {
            "1": "bei",
            "2": "cha",
            "3": "chi",
            "4": "dan",
            "5": "fan",
            "6": "he",
            "7": "jiu",
            "8": "mian",
            "9": "mi",
            "10": "tang",
            "11": "wang",
            "12": "yao",
            "13": "ge",
            "14": "xie",
            "15": "wu",
            "16": "zi",
            "17": "tou",
            "18": "bao",
            "19": "tiao",
        },

        // this.num2hanzi = {
        //     "1": "米",
        //     "2": "杯",
        //     "3": "吃",            
        //     "4": "面",            
        //     "5": "茶",            
        //     "6": "汤",            
        //     "7": "酒",  
        //     "8": "喝",
        //     "9": "碗",
        //     "10": "饭",            
        //     "11": "蛋",                                       
        // },

        this.num2info = {
            "9":"大米，小米，玉米，黑米\n红米，米饭，米粉",
            "1":"杯子，水杯，一杯水，酒杯",
            "3":"好吃，不吃，吃饭\n吃东西，吃包子，吃饺子\n你想吃什么？",
            "8":"面条，拉面，面粉\n这是饺子，这是包子，那是面条",
            "2":"茶水，茶叶，茶杯\n红茶，绿茶，奶茶",
            "10":"汤汁，面汤，鸡汤",
            "7":"白酒，红酒，米酒\n啤酒，葡萄酒，什么酒",
            "6":"喝水，喝茶，喝啤酒\n喝鸡蛋汤，喝果汁\n我不喝啤酒，喝果汁",
            "11":"饭碗，大碗，小碗，一碗米饭",
            "5":"米饭，吃饭，饭菜，做饭\n中午你去哪儿吃饭？",
            "4":"鸡蛋，鸡蛋汤",
            "12":"不要，你要几个？我要一个\nto want,to desire",
            "13":"三个包子，四个苹果",
            "14":"这些，那些，一些 some",
            "15":"上午，下午，中午 morning noon afternoon",
            "16":"包子，饺子，baozi jiaozi",
            "17":"馒头，mantou",
            "18":"包子",
            "19":"面条，noodles",
        }

        this.WIDTH = cc.director.getWinSize().width;
        this.HEIGHT = cc.director.getWinSize().height;

        // 判断音效
        if (cc.sys.localStorage.getItem("bgm") == "off") {
            this.bgm.stop();
        } else {
            this.bgm.play();
            this.bgm.loop = true;
        }

        this.ZI_URL = "http://192.168.31.92/";
    },

    /**
     * 一开始只出现一个字
     * 然后字飘到左上角
     * 笔画和图片同时出现
     */
    start () {
        this.btn_back.on(cc.Node.EventType.TOUCH_END, function(){
            cc.director.loadScene("richang_level");
        });

        // this.node.opacity = 100;
        // this.scheduleOnce(function() {
        //     this.welcome.runAction(cc.fadeOut(2));
        // }, 1);

        // this.scheduleOnce(function(){
        //     this.node.runAction(cc.fadeIn(1));
        //     this.perLoad();
        // }, 0.5);
        this.perLoad();
    },

    playAudio: function(audio) {
        this.bgm.volume = 0.2;
        audio.play();
        this.scheduleOnce(function(){
            this.bgm.volume = 1;
        }, audio.getDuration()+0.2);
    },

    perLoad: function() {
        var self = this;
        this.btn_audio.node.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_audio press");
            //按钮变化
            let now_scale = self.btn_audio.node.scale;
            let action1 = cc.scaleBy(0.1, 1.1 * now_scale).easing(cc.easeCubicActionOut());
            let action2 = cc.scaleTo(0.1, now_scale).easing(cc.easeCubicActionOut());
            self.btn_audio.node.runAction(cc.sequence(action1, action2));
            //self.audio[self.index-1].play();
            self.playAudio(self.audio[self.index-1]);
        });

        this.btn_forward.node.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_forward press");
            self.index--;
            if (self.index <= 0) {
                self.index = 1;
                return;
            }
            self.loadAll();
        });

        this.btn_next.node.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_next press");
            self.index++;
            if (self.index >= 20) {
                self.index = 19;
                self.showDialog();
                return;
            }
            self.loadAll();
        });

        this.btn_next_ok.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("ok");
            cc.director.loadScene("jiyili_game_03");
        }, this);

        this.btn_next_no.on(cc.Node.EventType.TOUCH_END, function() {
            this.dialog.active = false;
            this.node.opacity = 255;
            this.webview.node.runAction(cc.show());
        }, this);

        // 添加回调事件
        this.addCallBack(this.node);

        self.loadAll();
        self.timeCount = 0;
        //自动下一个
        var callback = function() {
            self.timeCount++;
            if (self.timeCount != self.num2time[self.index]) {
                return;
            }
            self.index++;
            if (self.index >= 20) {
                self.index = 19;
                self.showDialog();
                self.unschedule(callback);
                return;
            }
            self.timeCount = 0;
            self.loadAll();
        }
        this.schedule(callback, 0.1);

        //添加点击事件
        for (let i = 1; i <= 19; i++) {
            var zitiNode = this.layout.node.getChildByName("ziti_" + this.num2res["" + i]);
            zitiNode.index = i;
            zitiNode.on(cc.Node.EventType.TOUCH_END, function() {
                self.index = this.index;
                self.loadAll();
            }, zitiNode);
        }
    },

    /**
     * 添加点击事件
     */
    addCallBack: function(obj) {
        let self = this;
        obj.on(cc.Node.EventType.TOUCH_START, function(event) {
            var delta = event.touch.getDelta();
            obj.startTouchX = event.touch._startPoint.x;
            obj.startTouchY = event.touch._startPoint.y;
        });

        obj.on(cc.Node.EventType.TOUCH_END, function(event) {
            obj.endTouchX = event.touch._point.x;
            obj.endTouchY = event.touch._point.y;
            // 判断移动
            let dx = obj.endTouchX - obj.startTouchX;
            let dy = obj.endTouchY - obj.startTouchY;
            if (dx == 0) {
                return;
            }
            if (Math.abs(dx/dy) < 1.2) {
                return;
            }
            if (dx > 0) {
                self.index--;
                if (self.index <= 0) {
                    self.index = 1;
                    return;
                }
                self.loadAll();
            } else {
                self.index++;
                if (self.index >= 20) {
                    self.index = 19;
                    self.showDialog();
                    return;
                }
                self.loadAll();
            }        
        });
    },

    showDialog: function() {
        this.dialog.active = true;
        this.node.opacity = 125;
        this.webview.node.runAction(cc.hide());
    },

    loadAll: function() {
        // 
        //this.unscheduleAllCallbacks();
        if (this.ziti != null) {
            this.ziti.stopAllActions()
        }
        if (this.shiyi != null) {
            this.shiyi.stopAllActions();
        }
        this.timeCount = 0;
        ///
        var self = this;
        //this.lb_pinyin.getComponent("PinYinLabel").pinyinString = this.num2hanzi["" + this.index];

        let url_pinyin = 'resources/img/xuexi/pinyin/pinyin_' + this.num2res["" + this.index] + '.png';
        if (null == this.pinyin) {
            this.pinyin = new cc.Node('Sprite');
            let sp1 = this.pinyin.addComponent(cc.Sprite);
            sp1.spriteFrame = new cc.SpriteFrame(cc.url.raw(url_pinyin));
            this.pinyin.setPosition(this.sp_pinyin.node.x, this.sp_pinyin.node.y);
            this.node.addChild(this.pinyin);
        }
        let pinyin_sp = this.pinyin.getComponent(cc.Sprite);
        this.scheduleOnce(function(){
            pinyin_sp.spriteFrame.setTexture(cc.url.raw(url_pinyin));
        }, 0.1);

        let url_shiyi = 'resources/img/xuexi/shiyi/shiyi_' + this.num2res["" + this.index] + '.png';
        if (null == this.shiyi) {
            this.shiyi = new cc.Node('shiyi'); 
            let sp1 = this.shiyi.addComponent(cc.Sprite);
            sp1.spriteFrame = new cc.SpriteFrame(cc.url.raw(url_shiyi));
            this.shiyi.setPosition(this.sp_shiyi.node.x, this.sp_shiyi.node.y);
            this.shiyi.setScale(0.7);
            this.shiyi.opacity = 0;
            this.node.addChild(this.shiyi);
            this.scheduleOnce(function() {
                let opacity255 = cc.fadeIn(1);
                this.shiyi.runAction(opacity255);
            }, 1);
        } else {
            this.shiyi.opacity = 0;
            let shiyi_sp = this.shiyi.getComponent(cc.Sprite);
            shiyi_sp.spriteFrame.setTexture(cc.url.raw(url_shiyi));
            this.scheduleOnce(function() {
                let opacity255 = cc.fadeIn(1);
                this.shiyi.runAction(opacity255);
            }, 1);
        }
        
        let url_ziti = 'resources/img/xuexi/ziti/ziti_' + this.num2res["" + this.index] + '.png';
        if (null == this.ziti) {
            this.ziti = new cc.Node('ziti'); 
            let sp1 = this.ziti.addComponent(cc.Sprite);
            sp1.spriteFrame = new cc.SpriteFrame(cc.url.raw(url_ziti));
            this.ziti.setPosition(this.sp_shiyi.node.x, this.sp_shiyi.node.y);
            this.ziti.setScale(4);
            this.node.addChild(this.ziti);
        } else {
            let sp_ziti = this.ziti.getComponent(cc.Sprite);
            this.scheduleOnce(function(){
                sp_ziti.spriteFrame.setTexture(cc.url.raw(url_ziti));
            }, 0.01)
        }

        this.ziti.opacity = 0;
        let move1 = cc.moveTo(0.01, cc.p(this.sp_shiyi.node.x, this.sp_shiyi.node.y));
        let scale1 = cc.scaleTo(0.01, 4);
        let show = cc.fadeIn(0.1);
        this.ziti.runAction(cc.spawn(move1, scale1, show));

        let move2 = cc.moveTo(1.5, cc.p(this.vplayer.node.x, this.vplayer.node.y)).easing(cc.easeCubicActionOut());
        let scale2 = cc.scaleTo(1.5, 0.2).easing(cc.easeCubicActionOut());
        let action2 = cc.spawn(move2, scale2);
        this.scheduleOnce(function() {
            this.ziti.runAction(action2);
        }, 1);
        
        // this.vplayer.node.runAction(cc.fadeOut(0.01));
        // this.vplayer.resume();
        // this.scheduleOnce(function(){
        //     this.vplayer.node.runAction(cc.fadeIn(0.5));
        //     let url_bihua = 'resources/img/xuexi/zixing2/' + this.num2res["" + this.index] + '.mp4';
        //     this.vplayer.clip = cc.url.raw(url_bihua);
        //     //this.vplayer.url = cc.url.raw(url_bihua);
        //     //this.vplayer.remoteURL = cc.url.raw(url_bihua);
        //     //cc.log(this.vplayer);
        //     //this.vplayer.play();
        // }, 0.1);

        //显示字解释
        this.scheduleOnce(function(){
            this.info.string = this.num2info[this.index];
        }, 0.02);

        // webview
        this.scheduleOnce(function(){
            let url_bihua = 'resources/img/xuexi/zixing/zixing_' + this.num2res["" + this.index] + '.gif';
            //let url_bihua = 'resources/html/' + this.num2res["" + this.index] + '.html';
            this.webview.url = cc.url.raw(url_bihua);
        }, 0.1);

        //layout
        if (this.curDisplayZi != null) {
            this.curDisplayZi.stopAllActions();
            //this.curDisplayZi.setScale(1);
            this.curDisplayZi.color = new cc.Color(255,255,255);
        }
        var zitiNode = this.layout.node.getChildByName("ziti_" + this.num2res["" + this.index]);
        //zitiNode.setScale(1.5);
        //zitiNode.runAction(cc.scaleTo(0.15, 1.5));
        zitiNode.color = new cc.Color(255,0,0);
        this.curDisplayZi = zitiNode;
        
        this.bg_quan.setPosition(zitiNode.x, this.layout.node.y);
    },

    // update (dt) {},
});
