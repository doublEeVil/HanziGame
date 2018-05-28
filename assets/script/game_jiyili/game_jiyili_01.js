// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

/**
 * 记忆力大挑战
 * 连连看
 */
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

        lb_time: {
            default: null,
            type: cc.Label
        },

        btn_home: {
            default: null,
            type: cc.Node
        }, 

        btn_info: {
            default: null,
            type: cc.Node
        }, 

        info_msg: {
            default: null,
            type: cc.Node
        },

        game_info: {
            default: null,
            type: cc.Node
        }, 

        dialog_yes_no: {
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
        },

        dialog_title: {
            default: null,
            type: cc.Label
        },

        lb_coin: {
            default: null,
            type: cc.Label
        }, 

        type: 1,

        cardCouple: 3,

        timeLeft: 30,

        bgm: {
            default: null,
            type: cc.AudioSource
        },

        audio_dida: {
            default: null,
            type: cc.AudioSource
        },

        audio_notice_right: {
            default: null,
            type: cc.AudioSource
        },

        btn_back: {
            default: null,
            type: cc.Node
        },

        mp3: {
            default: [],
            type: cc.AudioSource
        },

        btn_task1: {
            default: null,
            type: cc.Node
        },

        btn_task2: {
            default: null,
            type: cc.Node
        },

        btn_task3: {
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
            "9": "wan",
            "10": "fan",
            "11": "dan",
        },

        this.cards = [];
        this.cardsValues = []; //已选择的
        this.cardsNotice = []; //添加的钩
        this.cardsChoose = []; //选择的卡牌
        this.leftCardsNum = 8;
        this.pass = false;

        this.INIT_TIME = 40;

        this.cardScaleX = 0.2;

        // 判断音效
        if (cc.sys.localStorage.getItem("bgm") == "off") {
            this.bgm.stop();
        } else {
            this.bgm.play();
            this.bgm.loop = true;
        }
    },

    start () {
        // let node1 = new cc.Node('Sprite'); 
        // let sp1 = node1.addComponent(cc.Sprite);
        // sp1.spriteFrame = new cc.SpriteFrame(cc.url.raw("img/jiyili/card_right/card_right_bei.png"));
        // node1.setPosition(0, 200);
        // this.node.addChild(node1);

        // let node2 = new cc.Node('Sprite'); 
        // let sp2 = node2.addComponent(cc.Sprite);
        // sp2.spriteFrame = new cc.SpriteFrame(cc.url.raw("img/jiyili/card_right/card_right_mi.png"));
        // this.node.addChild(node2);

        // this.node.removeChild(node1);
        // node1.destroy();

        let self = this;

        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            // if (self.getGameMode() == "richang") {
            //     cc.director.loadScene("richang_level");
            // } else {
            //     cc.director.loadScene("qimo_level");
            // }

            cc.director.loadScene("choose");
        });

        this.lb_coin.string = "+" + this.getCoin();
        this.lb_time.string = (this.INIT_TIME + " s");

        this.game_info.active = true;
        this.node.opacity = 120;
        this.game_info.on(cc.Node.EventType.TOUCH_END, function(){
            this.game_info.active = false;
            this.node.opacity = 255;
            this.perLoad();
        }, this);
      
        this.btn_task1.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("jiyili_game_03");
        });
        this.btn_task2.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("jiyili_game_02");
        });
        this.btn_task3.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("jiyili_game_01");
        });
    },

    setCoin: function(coin) {
        cc.sys.localStorage.setItem("coin", coin);
    },

    getCoin: function() {
        var coin = cc.sys.localStorage.getItem("coin");
        if (coin == null) {
            this.setCoin(0);
        }
        coin = cc.sys.localStorage.getItem("coin");
        return parseInt(coin);
    },


    /**
     * 漂字
     */
    piaozi: function(str, x, y) {
        console.log("++++")
        var node =new cc.Node("node");
        var label=node.addComponent(cc.Label);
        label.string=str;
        var color=new cc.Color(255,0, 0);
        node.position=cc.p(x, y);
        node.color=color;
        this.node.addChild(node)
        this.scheduleOnce(function() {
            if (node != null) {
                node.destroy();
            }
        }, 2);
        node.runAction(cc.spawn(cc.moveTo(0.5, x, y + 100), cc.fadeOut(0.5)));
    },

    perLoad: function() {
        this.btn_home.on(cc.Node.EventType.TOUCH_END, function(){
            cc.director.loadScene("choice");
        });

        this.btn_info.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log(this.info_msg)
            this.info_msg.setGlobalZOrder(20);
            this.info_msg.setLocalZOrder(20);
            this.info_msg.active = true;
        }, this);

        this.btn_info.on(cc.Node.EventType.TOUCH_END, function(){
            this.info_msg.active = false;
        }, this);

        this.btn_ok.on(cc.Node.EventType.TOUCH_END, function(){
            if (this.pass == true) {
                // 重来
                this.node.opacity = 255;
                this.dialog_yes_no.active = false;

                this.timeLeft = 30;
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].destroy();
                }
                this.cardsNotice = []; //添加的钩
                this.cardsChoose = []; //选择的卡牌
                this.leftCardsNum = 8;
                this.loadGame(1, this.type);
            } else {
                // 重来
                this.node.opacity = 255;
                this.dialog_yes_no.active = false;

                this.timeLeft = 30;
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].destroy();
                }
                this.cardsNotice = []; //添加的钩
                this.cardsChoose = []; //选择的卡牌
                this.leftCardsNum = 8;
                this.loadGame(1, this.type);
                // if (this.getGameMode() == "richang") {
                //     cc.director.loadScene("richang_level");   
                // } else {
                //     cc.director.loadScene("qimo_level");   
                // } 
            }
        }, this);

        this.btn_no.on(cc.Node.EventType.TOUCH_END, function(){
            if (this.pass == false) {
                // 未通过，选择否
                if (this.getGameMode() == "richang") {
                    cc.director.loadScene("richang_level");   
                } else {
                    cc.director.loadScene("qimo_level");   
                } 
            } else {
                // 重新游戏
                this.node.opacity = 255;
                this.dialog_yes_no.active = false;
                
                this.timeLeft = 30;
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].destroy();
                }
                this.cardsNotice = []; //添加的钩
                this.cardsChoose = []; //选择的卡牌
                this.leftCardsNum = 8;
                this.loadGame(1, this.type);
                }
        }, this);
        
        this.loadGame(4, this.type);
    },


    gameFail: function() {
        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }
        this.dialog_title.string = "挑战失败了哦\n是否again?";
        this.node.opacity = 120;
        this.dialog_yes_no.active = true;
        //
        this.unscheduleAllCallbacks();
        // 暂停所有触摸
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].off(cc.Node.EventType.TOUCH_START);
        }

    },

    /**
     * 布局游戏
     * num为需要消除的对数
     * type为模式 1：汉字-图片 2：汉字-拼音 3：拼音-图片 4：汉字-拼音-图片
     */
    loadGame: function(num, type) {
        this.game_type = type;

        let self = this;
        let baseUrl1 = "";
        let baseUrl2 = "";

        this.timeLeft = this.INIT_TIME;

        this.lb_time.string = (this.timeLeft + " s");

        if (type == 1) {
            baseUrl1 = "resources/img/jiyili/card_right/card_right_";
            baseUrl2 = "resources/img/jiyili/card_shiyi/card_shiyi_";
        } else if (type == 2) {
            baseUrl1 = "resources/img/jiyili/card_right/card_right_";
            baseUrl2 = "resources/img/jiyili/card_pinyin/card_pinyin_";
        } else if (type == 3){
            baseUrl1 = "resources/img/jiyili/card_pinyin/card_pinyin_";
            baseUrl2 = "resources/img/jiyili/card_shiyi/card_shiyi_";
        } else {

        }
        this.baseUrl1 = baseUrl1;
        this.baseUrl2 = baseUrl2;
        this.reflushCardValues();
        
        // 暂时先固定4个， 8对
        num = 4;
        let posX = [-300, -100, 100, 300, -300, -100, 100, 300];
        let posY = [100, 100, 100, 100, -100, -100, -100, -100];

        //1. 按对数,类型生成卡牌，只显示背面
        for (var i = 0; i < 8; i++) {
            this.cards[i] = new cc.Node('Sprite'); 
            this.cards[i].value = this.cardsValues[i % 4];
            this.cards[i].i = i;
            let sp = this.cards[i].addComponent(cc.Sprite);
            let url = ""; 
            if (i < 4) {
                url = baseUrl1 + this.num2res[this.cards[i].value] + ".png";
            } else {
                url = baseUrl2 + this.num2res[this.cards[i].value] + ".png";
            }
            url = "resources/img/jiyili/card_bg/bg_back.png";
            sp.spriteFrame = new cc.SpriteFrame(cc.url.raw(url));
            this.cards[i].setPosition(posX[i], posY[i]);
            this.cards[i].setScale(0.2);
            this.node.addChild(this.cards[i]);
        }

        // 随机交换位置
        for (var i = 0; i < this.cards.length; i++) {
            let cx = this.cards[i].x;
            let cy = this.cards[i].y;
            let rand = parseInt(cc.rand() % 8);
            this.cards[i].setPosition(this.cards[rand].x, this.cards[rand].y);
            this.cards[rand].setPosition(cx, cy);
        }
        //2. 全部翻转
        // for (var i = 0; i < this.cards.length; i++) {
        //     let nowScaleX = this.cards[i].getScaleX();
        //     let nowScaleY = this.cards[i].getScaleY();
        //     let action1 = cc.scaleTo(0.75, 0, nowScaleY);
        //     let action2 = cc.scaleTo(0.75, nowScaleX, nowScaleY);
        //     let action3 = cc.sequence(action1, action2);
        //     this.cards[i].runAction(action3);
        // }
        // this.scheduleOnce(function() {
        //     for (var i = 0; i < this.cards.length; i++) {
        //         let url = ""; 
        //         if (i < 4) {
        //             url = baseUrl1 + this.num2res[this.cards[i].value] + ".png";
        //         } else {
        //             url = baseUrl2 + this.num2res[this.cards[i].value] + ".png";
        //         }
        //         let sp = this.cards[i].getComponent(cc.Sprite);
        //         sp.spriteFrame.setTexture(cc.url.raw(url));
        //     }
        // }, 0.75);

        //3. 添加游戏计时
        this.schedule(function() {
            this.timeLeft--;
            if (this.timeLeft < 0) {
                return;
            }
            if (!this.audio_dida.isPlaying) {
                if (cc.sys.localStorage.getItem("audio") != "off") { 
                    // 循环播放
                    if (this.timeLeft <= 10) {
                        this.audio_dida.play();
                        this.audio_dida.loop = true;
                    }
                }

            }
            if (this.timeLeft == 0) {
                //alert("计时结束，要加油哦");
                this.pass = false;
                this.gameFail();
            }
            this.lb_time.string = (this.timeLeft + " s")
        },1 , 3600);

        //4. 选对：打钩， 消除， 一直到全部消除
        this.addTouchCallback();
        //4.5 选错，提示错误，重新布局
    },

    addTouchCallback: function() {
        let self = this;
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].on(cc.Node.EventType.TOUCH_START, function(event) {
                if (!this.choose) {
                    cc.log("点击" + this.value);
                    self.showCardFace(this);
                    let value = this.value;
                    this.choose = true;
                    //self.addRightFlag(this);
                    self.checkGameOver(this);

                    // 发音
                    if (self.game_type == 1 || self.game_type == 2) {
                        if (this.i < 4) {
                            self.getAudio(this.value);
                        }
                    }

                }
            }, this.cards[i]);
        }
    },

    /**
     * 翻转显示背面
     */
    showCardBack: function(card) {
        //let nowScaleX = card.getScaleX();
        let nowScaleX = this.cardScaleX;
        let nowScaleY = card.getScaleY();
        let action1 = cc.scaleTo(0.3, 0, nowScaleY);
        let action2 = cc.scaleTo(0.3, nowScaleX, nowScaleY);
        let action3 = cc.sequence(action1, action2);
        card.runAction(action3);
        this.scheduleOnce(function() {
            let url = "resources/img/jiyili/card_bg/bg_back.png";
            let sp = card.getComponent(cc.Sprite);
            sp.spriteFrame.setTexture(cc.url.raw(url));
        }, 0.3);
    },

    /**
     * 翻转显示正面
     */
    showCardFace: function(card) {
        //let nowScaleX = card.getScaleX();
        let nowScaleX = this.cardScaleX;
        let nowScaleY = card.getScaleY();
        let action1 = cc.scaleTo(0.3, 0, nowScaleY);
        let action2 = cc.scaleTo(0.3, nowScaleX, nowScaleY);
        let action3 = cc.sequence(action1, action2);
        card.runAction(action3);
        this.scheduleOnce(function() {
            let url = ""; 
            if (card.i < 4) {
                url = this.baseUrl1 + this.num2res[card.value] + ".png";
            } else {
                url = this.baseUrl2 + this.num2res[card.value] + ".png";
            }
            let sp = card.getComponent(cc.Sprite);
            sp.spriteFrame.setTexture(cc.url.raw(url));
        }, 0.3);
    },

    /**
     * 检测是否消除成功
     */
    checkGameOver: function(card) {
        this.cardsChoose.push(card);
        if (this.cardsChoose.length <= 1) {
            return;
        }
        // 暂停所有触摸
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].off(cc.Node.EventType.TOUCH_START);
        }
        // 判断是否消除
        this.scheduleOnce(function(){
            if (this.cardsChoose[0].value == this.cardsChoose[1].value) {
                //可以消除
                this.addRightFlag(this.cardsChoose[0]);
                this.addRightFlag(this.cardsChoose[1]);

                //选对的音乐
                if (cc.sys.localStorage.getItem("audio") != "off") { 
                    this.audio_notice_right.play();
                } 

                this.scheduleOnce(function() {
                    this.cardsChoose[0].runAction(cc.hide());
                    this.cardsChoose[1].runAction(cc.hide());
                    this.cardsNotice[0].destroy();
                    this.cardsNotice[1].destroy();
                    this.leftCardsNum -= 2;
                    if (this.leftCardsNum == 0) {
                        this.gameSuccess();
                    }
                    this.cardsChoose.splice(0, this.cardsChoose.length);
                    this.cardsNotice.splice(0, this.cardsNotice.length);
                    this.addTouchCallback();
                    this.setCoin(this.getCoin()+1);
                    this.lb_coin.string = "+" + this.getCoin();
                }, 0.25);
            } else {
                //不可以消除
                for (let i = 0; i < this.cardsChoose.length; i++) {
                    this.cardsChoose[i].choose = false;
                    this.showCardBack(this.cardsChoose[i]);
                }
                this.cardsChoose.splice(0, this.cardsChoose.length);
                this.scheduleOnce(function(){
                    this.addTouchCallback();
                }, 0.25)
            }

        }, 0.5);
    },


    gameSuccess: function() {
        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }

        this.scheduleOnce(function() {
            let tip;
            if (this.type == 3) {
                tip = "已经通关了";
                // 弹框
                this.type = 0;
                this.pass = true;
                this.dialog_title.string = "你记忆力真棒\n是否再来一次";
                this.node.opacity = 123;
                this.dialog_yes_no.active = true;
                this.unscheduleAllCallbacks();
            } else {
                tip = "恭喜，进入下一关";
                //this.type += 1;
                this.unscheduleAllCallbacks();
            }
            //alert(tip);
            // 清楚全部数据
            this.type += 1;
            this.timeLeft = 30;
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].destroy();
            }
            this.cardsNotice = []; //添加的钩
            this.cardsChoose = []; //选择的卡牌
            this.leftCardsNum = 8;
            this.loadGame(3, this.type);
        }, 0.25);
    }, 

    /**
     * 在卡牌上面生成一个钩
     */
    addRightFlag: function(card) {
        let node1 = new cc.Node('Sprite'); 
        let sp1 = node1.addComponent(cc.Sprite);
        sp1.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/img/jiyili/notice/ok.png"));
        node1.setPosition(card.x, card.y);
        node1.setScale(0.3);
        this.cardsNotice.push(node1);
        this.node.addChild(node1);
    }, 

    /**
     * 重新生成卡牌对应的值
     */
    reflushCardValues: function() {
        let flag = true;
        let rand = 0;
        while (true) {
            flag = true;
            if (this.cardsValues.length >= 4) {
                break;
            }
            rand = parseInt(cc.random0To1() * 11) + 1;
            for (let i = 0; i < this.cardsValues.length; i++) {
                if (this.cardsValues[i] == rand) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.cardsValues.push(rand);
            }
        }
    },

    getGameMode: function() {
        let mode = cc.sys.localStorage.getItem("mode");
        if (mode == null) {
            return "richang";
        }
        return mode;
    },

    getAudio: function(i) {
        let audio;
        if (i == "1") {
            audio = this.mp3[8];
        } else if (i == "2") {
            audio = this.mp3[0];
        } else if (i == "3") {
            audio = this.mp3[2];
        } else if (i == "4") {
            audio = this.mp3[7];
        } else if (i == "5") {
            audio = this.mp3[1];
        } else if (i == "6") {
            audio = this.mp3[9];
        } else if (i == "7") {
            audio = this.mp3[6];
        } else if (i == "8") {
            audio = this.mp3[5];
        } else if (i == "9") {
            audio = this.mp3[10];
        } else if (i == "10") {
            audio = this.mp3[4];
        } else if (i == "11") {
            audio = this.mp3[3];
        }
        if (audio == null) {
            return;
        }
        audio.play();
    },

    
    // update (dt) {},
});
