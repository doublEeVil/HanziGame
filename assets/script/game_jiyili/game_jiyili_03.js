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

            // 新增的3个
            "115":"resources/img/jiyili/card_like/card_like_chi.png",
            "116":"resources/img/jiyili/card_like/card_like_wu.png",
            "117":"resources/img/jiyili/card_like/card_like_xie.png",

            /*
            "115":"resources/img/jiyili/card_wrong/card_wrong_dan.png",
            "116":"resources/img/jiyili/card_wrong/card_wrong_mian.png",
            "117":"resources/img/jiyili/card_wrong/card_wrong_tang.png",
            */
        }
        this.cards = [];
        this.wrongValues = []; //错误的
        this.cardsValues = []; //已选择的
        this.cardsChoose = [];
        this.cardsNotice = [];

        this.INIT_TIME = 40;
        this.timeLeft = 40;
        this.pass = false;

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
            // if (self.getGameMode() == "richang") {
            //     cc.director.loadScene("richang_level");
            // } else {
            //     cc.director.loadScene("qimo_level");
            // }

            cc.director.loadScene("choose");
        });

        this.lb_coin.string = "+" + this.getCoin();
        this.lb_time.string = (this.timeLeft + " s");

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

    reduceCoin: function(num) {
        if (this.getCoin() < num) {
            return;
        }
        this.setCoin(this.getCoin() - num);
    },

    addCoin: function(num) {
        this.setCoin(this.getCoin()+num);
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
        this.btn_home.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("choice");
        });

        this.btn_info.on(cc.Node.EventType.TOUCH_START, function() {
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
            if (this.pass == false) {
                // 重新游戏
                //this.unscheduleAllCallbacks();
                cc.log("btn ok");
                this.dialog_next.active = false;
                this.node.opacity = 255;
                this.timeLeft = this.INIT_TIME;
                this.loadGame();
            } else {
                cc.director.loadScene("jiyili_game_02");  
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

        this.lb_title.string = "挑战失败了哦\n是否again?";
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
        //2.添加点击事件
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
        // 模拟点击事件
        for (let i = 0; i < 4; i++) {
            this.showCardFace(this.cards[i]);
            this.cardsChoose.push(this.cards[i]);
            self.checkShowAllDone();
        }
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
        }, 3.5);
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
        }, 4.5);
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
                this.cards[i].fayin = this.getFayin(this.cards[i].value);
                this.cards[i].on(cc.Node.EventType.TOUCH_END, function(){
                    //添加声音
                    self.playAudio(this);
                    if (!this.choose) {
                        self.checkGameOver(this);
                    }
                }, this.cards[i]);
            }
        }, 0.3)
    },

    checkGameOver: function(card) {
        if (card.choose) {
            return;
        }
        if (this.cardsValues.indexOf(card.value) != -1) {
            // 选对了
            // 添加一个钩
            card.choose = true;
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
                this.piaozi("+4", 0, 0);

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

            //显示正确的答案
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cardsValues.indexOf(this.cards[i].value) != -1) {
                    this.addRightFlag(this.cards[i]);
                    // 一闪一闪
                    this.cards[i].runAction(cc.blink(0.5, 4));
                }   
            }

            this.scheduleOnce(function(){
                card.stopAllActions();
                this.gameFail();
            }, 3);


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
    // update (dt) {},

    getGameMode: function() {
        let mode = cc.sys.localStorage.getItem("mode");
        if (mode == null) {
            return "richang";
        }
        return mode;
    },

    getFayin: function(num) {
        let fayin;
        if (num == 101) {
            fayin = "lin2";
        } else if (num == 102) {
            fayin = "huai4";
        } else if (num == 103) {
            fayin = "tu2";
        } else if (num == 104) {
            fayin = "nan2";
        } else if (num == 105) {
            fayin = "can2";
        } else if (num == 106) {
            fayin = "ban3";
        } else if (num == 107) {
            fayin = "yin3";
        } else if (num == 108) {
            fayin = "ke3";
        } else if (num == 109) {
            fayin = "sa3";
        } else if (num == 110) {
            fayin = "mu4";
        } else if (num == 111) {
            fayin = "lai2";
        } else if (num == 112) {
            fayin = "yang2";
        } else if (num == 113) {
            fayin = "wan3";
        } else if (num == 114) {
            fayin = "wan4";
        } else if (num == 115) {
            fayin = "qi4";
        } else if (num == 116) {
            fayin = "niu2";
        } else if (num == 117) {
            fayin = "ci3";
        } else if (num == 1) {
            fayin = "mi";
        } else if (num == 2) {
            fayin = "bei";
        } else if (num == 3) {
            fayin = "chi";
        } else if (num == 4) {
            fayin = "mian";
        } else if (num == 5) {
            fayin = "cha";
        } else if (num == 6) {
            fayin = "tang";
        } else if (num == 7) {
            fayin = "jiu";
        } else if (num == 8) {
            fayin = "he";
        } else if (num == 9) {
            fayin = "wan";
        } else if (num == 10) {
            fayin = "fan";
        } else if (num == 11) {
            fayin = "dan";
        } else if (num == 12) {
            fayin = "yao";
        } else if (num == 13) {
            fayin = "ge";
        } else if (num == 14) {
            fayin = "xie";
        } else if (num == 15) {
            fayin = "wu";
        } else if (num == 16) {
            fayin = "zi";
        } else if (num == 17) {
            fayin = "tou";
        } else if (num == 18) {
            fayin = "bao";
        } else if (num == 19) {
            fayin = "tiao";
        }
        return fayin;
    },

    playAudio: function(obj) {
        if (obj.fayin == null) {
            return;
        }
        let audio;
        let fayin = obj.fayin;
        if (fayin == "ban3") {
            audio = this.mp3[19];
        } else if (fayin == "can2") {
            audio = this.mp3[20];
        } else if (fayin == "huai4") {
            audio = this.mp3[21];
        } else if (fayin == "ke3") {
            audio = this.mp3[22];
        } else if (fayin == "lai2") {
            audio = this.mp3[23];
        } else if (fayin == "lin2") {
            audio = this.mp3[24];
        } else if (fayin == "mu4") {
            audio = this.mp3[25];
        } else if (fayin == "nan2") {
            audio = this.mp3[26];
        } else if (fayin == "sa3") {
            audio = this.mp3[27];
        } else if (fayin == "tu2") {
            audio = this.mp3[28];
        } else if (fayin == "wan3") {
            audio = this.mp3[29];
        } else if (fayin == "wan4") {
            audio = this.mp3[30];
        } else if (fayin == "yang2") {
            audio = this.mp3[31];
        } else if (fayin == "yin3") {
            audio = this.mp3[32];
        } else if (fayin == "qi4") {
            audio = this.mp3[35];
        } else if (fayin == "niu2") {
            audio = this.mp3[34];
        } else if (fayin == "ci3") {
            audio = this.mp3[33];
        } else if (fayin == "bei") {
            audio = this.mp3[0];
        } else if (fayin == "cha") {
            audio = this.mp3[1];
        } else if (fayin == "chi") {
            audio = this.mp3[2];
        } else if (fayin == "dan") {
            audio = this.mp3[3];
        } else if (fayin == "fan") {
            audio = this.mp3[4];
        } else if (fayin == "he") {
            audio = this.mp3[5];
        } else if (fayin == "jiu") {
            audio = this.mp3[6];
        } else if (fayin == "mian") {
            audio = this.mp3[7];
        } else if (fayin == "mi") {
            audio = this.mp3[8];
        } else if (fayin == "tang") {
            audio = this.mp3[9];
        } else if (fayin == "wan") {
            audio = this.mp3[10];
        } else if (fayin == "bao") {
            audio = this.mp3[11];
        } else if (fayin == "yao") {
            audio = this.mp3[12];
        } else if (fayin == "ge") {
            audio = this.mp3[13];
        } else if (fayin == "xie") {
            audio = this.mp3[14];
        } else if (fayin == "wu") {
            audio = this.mp3[15];
        } else if (fayin == "zi") {
            audio = this.mp3[16];
        } else if (fayin == "tou") {
            audio = this.mp3[17];
        } else if (fayin == "tiao") {
            audio = this.mp3[18];
        }
        if (audio == null) {
            return;
        }
        audio.play();
    }
});
