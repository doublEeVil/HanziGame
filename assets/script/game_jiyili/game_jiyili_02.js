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
        type: 1,
        center: {
            default: null,
            type: cc.Node
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

        lb_coin: {
            default: null,
            type: cc.Label
        },

        lb_time: {
            default: null,
            type: cc.Label
        },

        dialog_next: {
            default: null,
            type: cc.Node
        },

        btn_no: {
            default: null,
            type: cc.Button
        },

        btn_ok: {
            default: null,
            type: cc.Button
        },

        lb_title: {
            default: null,
            type: cc.Label
        },

        audio_dida: {
            type: cc.AudioSource,
            default: null
        },

        audio_notice_right: {
            type: cc.AudioSource,
            default: null
        },

        btn_back: {
            default: null,
            type: cc.Node
        },

        bgm: {
            default:null,
            type: cc.AudioSource
        },

    },

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
            "12": "yao",
            "13": "ge",
            "14": "xie",
            "15": "wu",
            "16": "zi",
            "17": "tou",
            "18": "bao",
            "19": "tiao",
        },
        
        this.cardWrongOrLike = {
            "101":"resources/img/jiyili/card_like/card_like_bei1.png",
            "102":"resources/img/jiyili/card_like/card_like_bei2.png",
            "103":"resources/img/jiyili/card_like/card_like_cha1.png",
            "104":"resources/img/jiyili/card_like/card_like_cha2.png",
            "105":"resources/img/jiyili/card_like/card_like_dan.png",
            "106":"resources/img/jiyili/card_like/card_like_fan1.png",
            "107":"resources/img/jiyili/card_like/card_like_fan2.png",
            "108":"resources/img/jiyili/card_like/card_like_he.png",
            "109":"resources/img/jiyili/card_like/card_like_jiu.png",
            "110":"resources/img/jiyili/card_like/card_like_mi1.png",
            "111":"resources/img/jiyili/card_like/card_like_mi2.png",
            "112":"resources/img/jiyili/card_like/card_like_tang.png",
            "113":"resources/img/jiyili/card_like/card_like_wan1.png",
            "114":"resources/img/jiyili/card_like/card_like_wan2.png",
            "115":"resources/img/jiyili/card_wrong/card_wrong_dan.png",
            "116":"resources/img/jiyili/card_wrong/card_wrong_mian.png",
            "117":"resources/img/jiyili/card_wrong/card_wrong_tang.png",
        }

        this.cards = [];
        this.wrongValues = []; //错误的
        this.cardsValues = []; //已选择的
        this.cardsChoose = [];
        this.cardsNotice = [];

        this.timeLeft = 30;
        this.pass = false;

        this.curChooseIndex = 0;


        // 判断音效
        if (cc.sys.localStorage.getItem("bgm") == "off") {
            this.bgm.stop();
        } else {
            this.bgm.play();
            this.bgm.loop = true;
        }
    },

    start () {
        let self = this;

        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            if (self.getGameMode() == "richang") {
                cc.director.loadScene("richang_level");
            } else {
                cc.director.loadScene("qimo_level");
            }
        });

        this.lb_coin.string = "+" + this.getCoin();

        this.game_info.active = true;
        this.node.opacity = 120;
        this.game_info.on(cc.Node.EventType.TOUCH_END, function(){
            this.game_info.active = false;
            this.node.opacity = 255;
            this.perLoad();
        }, this);
    },

    addCoin: function(num) {
        this.setCoin(this.getCoin()+num);
    },

    reduceCoin: function(num) {
        if (this.getCoin() < num) {
            return;
        }
        this.setCoin(this.getCoin() - num);
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

    perLoad: function() {

        this.btn_info.on(cc.Node.EventType.TOUCH_START, function() {
            cc.log(this.info_msg)
            this.info_msg.setGlobalZOrder(20);
            this.info_msg.setLocalZOrder(20);
            this.info_msg.active = true;
        }, this);

        this.btn_info.on(cc.Node.EventType.TOUCH_END, function(){
            this.info_msg.active = false;
        }, this);

        this.btn_no.node.on(cc.Node.EventType.TOUCH_END, function(){
            if (this.pass == false) {
                // 回到Level
                if (this.getGameMode() == "richang") {
                    cc.director.loadScene("richang_level");   
                } else {
                    cc.director.loadScene("qimo_level");   
                }
             
            } else {
                // 重新游戏
                // this.dialog_next.active = false;
                // this.node.opacity = 255;
                // this.timeLeft = 30;
                // this.loadGame();
                if (this.getGameMode() == "richang") {
                    cc.director.loadScene("richang_level");   
                } else {
                    cc.director.loadScene("qimo_level");   
                }
            }
        }, this);

        this.btn_ok.node.on(cc.Node.EventType.TOUCH_END, function(){
            if (this.pass == true) {
                // 重新游戏
                //this.unscheduleAllCallbacks();
                cc.log("btn ok");
                // this.dialog_next.active = false;
                // this.node.opacity = 255;
                // this.timeLeft = 30;
                // this.loadGame();
                cc.director.loadScene("jiyili_game_01"); 
            } else {
                // 重新游戏
                //this.unscheduleAllCallbacks();
                cc.log("btn ok");
                this.dialog_next.active = false;
                this.node.opacity = 255;
                this.timeLeft = 30;
                this.loadGame();
            }
        }, this);

        this.setBaseUrl();
        this.loadGame();
    },

    loadGame: function() {
        // 生成4张图片，只显示背面，添加点击事件，
        // 点击翻转显示正面
        // 4张图片全部点击后，翻转显示背面，合为一张图片
        // 重新显示8张图片，显示背面，再翻转显示正面
        // 点击事件，选出一开始显示的4张图
        this.unscheduleAllCallbacks();
        this.lb_time.string = (this.timeLeft + " s");
        this.curChooseIndex = 0;
        
        this.reflushCardValues();
        for (let i = 0; i < this.cardsNotice.length; i++) {
            this.cardsNotice[i].destroy();
        }
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].choose = false;
            this.cards[i].destroy();
        }
        this.cardsNotice.splice(0, this.cardsNotice.length);
        this.cards.splice(0, this.cards.length);
        this.cardsChoose.splice(0, this.cardsChoose.length);

        this.schedule(function() {
            this.timeLeft--;
            if (this.timeLeft < 0) {
                return;
            }

            if (!this.audio_dida.isPlaying) {
                // 循环播放
                if (cc.sys.localStorage.getItem("audio") != "off") {
                    this.audio_dida.play();
                    this.audio_dida.loop = true;
                }

            }

            if (this.timeLeft == 0) {
                //alert("计时结束，要加油哦");
                this.pass = false;
                this.gameFail();
            }
            this.lb_time.string = (this.timeLeft + " s")
        },1 , 3600);

        this.show4pic();
    },

    /**
     * 失败处理
     */
    gameFail: function() {

        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }

        this.lb_title.string = "你失败了哦，是否再来一局？";
        if (this.timeLeft == 0) {
            this.lb_title.string = "时间到了哦！是否再来一局？";
        }
        this.node.opacity = 120;
        this.dialog_next.active = true;
        //
        this.unscheduleAllCallbacks();
        // 暂停所有触摸
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].off(cc.Node.EventType.TOUCH_START);
        }

    },


    setBaseUrl: function() {
        this.zi_right_url = "resources/img/jiyili/card_right/card_right_";
        this.zi_wrong_url = "resources/img/jiyili/card_wrong/card_wrong_";
        this.zi_like_url = "resources/img/jiyili/card_like/card_like_";
        this.pic_url = "resources/img/jiyili/card_shiyi/card_shiyi_";
        this.pinyin_url = "resources/img/jiyili/card_pinyin/card_pinyin_";
    },

    show4pic: function() {
        let self = this;
        let posX = [-300, -100, 100, 300];
        let posY = [0, 0, 0, 0];

        //1. 生成4张图片，只显示背面
        for (var i = 0; i < 4; i++) {
            this.cards[i] = new cc.Node('Sprite'); 
            this.cards[i].value = this.cardsValues[i % 4];
            this.cards[i].i = i;
            let sp = this.cards[i].addComponent(cc.Sprite);
            let url = "resources/img/jiyili/card_bg/bg_back.png";
            sp.spriteFrame = new cc.SpriteFrame(cc.url.raw(url));
            this.cards[i].setPosition(posX[i], posY[i]);
            this.cards[i].setScale(0.3);
            this.cards[i].type = "zi_right";
            this.node.addChild(this.cards[i]);
        }
        // //2.添加点击事件
        // for (var i = 0; i < 4; i++) {
        //     this.cards[i].on(cc.Node.EventType.TOUCH_START, function(event){
        //         if (!this.choose) {
        //             this.choose = true;
        //             self.showCardFace(this);
        //             self.cardsChoose.push(this);
        //             self.checkShowAllDone();
        //         }
        //     }, this.cards[i]);
        // }
        // 直接显示
        let showIndex = 0;
        this.schedule(function() {
            self.showCardFace(this.cards[showIndex]);
            self.cardsChoose.push(this.cards[showIndex]);
            showIndex++;
        }, 1, 3)
        // for (var i = 0; i < 4; i++) {
        //     self.showCardFace(this.cards[i]);
        //     self.cardsChoose.push(this.cards[i]);
        // }
        this.scheduleOnce(function(){
            self.checkShowAllDone();
        }, 4.5);
    },

    
    checkShowAllDone: function() {
        if (this.cardsChoose.length < 4) {
            return;
        }
        //移除全部事件
        for (var i = 0; i < 4; i++) {
            this.cards[i].off(cc.Node.EventType.TOUCH_START);
        }
        // 翻转
        this.scheduleOnce(function() {
            for (var i = 0; i < 4; i++) {
                this.showCardBack(this.cards[i]);
            }
        }, 1.5);
        //合并为一张卡牌
        this.scheduleOnce(function(){
            for (var i = 0; i < 4; i++) {
                this.cards[i].choose = false;
                let move = cc.moveTo(0.3, 0, 0);
                let scale = cc.scaleTo(0.3, 0.2, 0.2);
                let action = cc.spawn(move, scale);
                this.cards[i].runAction(action);
            }
            this.cardsChoose.splice(0, this.cardsChoose.length);
            this.scheduleOnce(function(){
                this.loadWrongOrLike();
            }, 0.6);
        }, 2.5);
    },

    /**
     * 加载错误的
     */
    loadWrongOrLike: function() {
        this.reflushWrongValues();
        this.scheduleOnce(function() {
            // 再生成4张混淆的
            for(var i = 4; i < 8; i++) {
                this.cards[i] = new cc.Node('Sprite'); 
                this.cards[i].value = this.wrongValues[i % 4];
                this.cards[i].i = i;
                let sp = this.cards[i].addComponent(cc.Sprite);
                let url = "resources/img/jiyili/card_bg/bg_back.png";
                sp.spriteFrame = new cc.SpriteFrame(cc.url.raw(url));
                this.cards[i].setPosition(0, 0);
                this.cards[i].setScale(0.2);
                this.cards[i].type = "zi_wrong";
                this.node.addChild(this.cards[i]);
            }
            // 发向不同的位置
            this.resetPosition();
            let self = this;
            // 显示
            for (var i = 0; i < 8; i++) {
                this.showCardFace(this.cards[i]);
                this.cards[i].on(cc.Node.EventType.TOUCH_END, function(){
                    self.checkGameOver(this);
                }, this.cards[i]);
            }
        }, 0.3)
    },

    checkGameOver: function(card) {
        if (card.choose) {
            return;
        }
        if (card.i == this.curChooseIndex) {
            // 选对了
            this.curChooseIndex++;
            // 添加一个钩
            this.addRightFlag(card);

            //选对的音乐
            if (cc.sys.localStorage.getItem("audio") != "off") { 
                this.audio_notice_right.play();
            }
            

            if (this.cardsNotice.length == 4) {
                // 游戏结束
                //alert("恭喜， 全部选对");
                this.pass = true;
                this.lb_title.string = "恭喜你挑战成功\n开始下一环节挑战";
                this.node.opacity = 123;
                this.dialog_next.active = true;
                this.unscheduleAllCallbacks();

                this.addCoin(4);
                this.lb_coin.string = "+" + this.getCoin();

                // 停止音乐
                if (this.audio_dida.isPlaying) {
                    this.audio_dida.stop();
                }
            }
        } else {
            // 选错了
            // 重新来一遍
            //抖动效果
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].off(cc.Node.EventType.TOUCH_START);
            }
            let a1 = cc.rotateTo(0.05, 10);
            let a2 = cc.rotateTo(0.05, -10);
            let doudong = cc.sequence(a1, a2);
            let action = cc.repeat(doudong, 30); 
            card.runAction(action);
            this.scheduleOnce(function(){
                card.stopAllActions();
                this.gameFail();
            }, 0.5);

            this.reduceCoin(1);
            this.lb_coin.string = "+" + this.getCoin();
        }
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
     * 重新生成cuowu卡牌对应的值
     */
    reflushWrongValues: function() {
        this.wrongValues.splice(0, this.wrongValues.length);
        let flag = true;
        let rand = 0;
        while (true) {
            flag = true;
            if (this.wrongValues.length >= 4) {
                break;
            }
            rand = parseInt(cc.random0To1() * 17) + 101;
            for (let i = 0; i < this.cardsValues.length; i++) {
                if (this.wrongValues[i] == rand) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.wrongValues.push(rand);
            }
        }
    },

    /**
     * 重新排布位置
     */
    resetPosition: function() {
        let posX = [-300,-100,100,300,-300,-100,100,300];
        let posY = [100, 100, 100, 100, -100, -100, -100, -100];

        for(let i = 0; i < 8 * 8; i++) {
            let rand = parseInt(cc.rand() % 8);
            let tmp = posX[i % 8];
            posX[i % 8] = posX[rand];
            posX[rand] = tmp;
            tmp = posY[i % 8];
            posY[i % 8] = posY[rand];
            posY[rand] = tmp; 
        }

        for (let i = 0; i < 8; i++) {
            let action = cc.moveTo(0.3, posX[i], posY[i]);
            this.cards[i].runAction(action);
        }
    },

    /**
     * 翻转显示背面
     */
    showCardBack: function(card) {
        let nowScaleX = card.getScaleX();
        let nowScaleY = card.getScaleY();
        let action1 = cc.scaleTo(0.35, 0, nowScaleY);
        let action2 = cc.scaleTo(0.35, nowScaleX, nowScaleY);
        let action3 = cc.sequence(action1, action2);
        card.runAction(action3);
        this.scheduleOnce(function() {
            let url = "resources/img/jiyili/card_bg/bg_back.png";
            let sp = card.getComponent(cc.Sprite);
            sp.spriteFrame.setTexture(cc.url.raw(url));
        }, 0.35);
    },

    /**
     * 翻转显示正面
     */
    showCardFace: function(card) {
        let nowScaleX = card.getScaleX();
        let nowScaleY = card.getScaleY();
        let action1 = cc.scaleTo(0.35, 0, nowScaleY);
        let action2 = cc.scaleTo(0.35, nowScaleX, nowScaleY);
        let action3 = cc.sequence(action1, action2);
        card.runAction(action3);
        this.scheduleOnce(function() {
            let url = ""; 
            if (card.type == "zi_right") {
                url = this.zi_right_url + this.num2res[card.value] + ".png";
            } else if (card.type = "zi_wrong") {
                url = this.cardWrongOrLike[card.value];
            }
            let sp = card.getComponent(cc.Sprite);
            sp.spriteFrame.setTexture(cc.url.raw(url));
        }, 0.35);
    },

    /**
     * 重新生成卡牌对应的值
     */
    reflushCardValues: function() {
        let flag = true;
        let rand = 0;
        this.cardsValues = [];
        while (true) {
            flag = true;
            if (this.cardsValues.length >= 4) {
                break;
            }
            //游戏模式选择
            if (this.getGameMode() == "richang") {
                rand = parseInt(cc.random0To1() * 19) + 1;
            } else {
                rand = parseInt(cc.random0To1() * 11) + 1;
            }
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
    }
    // update (dt) {},
});
