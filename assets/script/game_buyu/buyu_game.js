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
        lb_yuanbao : {
            default: null,
            type: cc.Label
        },

        aniYu: {
            default: [],
            type: [cc.Prefab]
        },

        boom: {
            default: null,
            type: cc.Prefab
        },

        card: {
            default: [],
            type: [cc.Prefab]
        },

        game_help: {
            default: null,
            type: cc.Node
        },

        btn_back : {
            default: null,
            type: cc.Node
        },

        lb_time: {
            default: null,
            type: cc.Label
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
        },

        lb_title: {
            default: null,
            type: cc.Label
        },

        lb_left_aim_num: {
            default: null,
            type: cc.Label   
        },

        audio_dida: {
            default: null,
            type: cc.AudioSource
        },

        audio_zi: {
            default: [],
            type: [cc.AudioSource]
        },

        bgm: {
            default:null,
            type: cc.AudioSource
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.type2fayin = {
            "bei":0,
            "cha":1,
            "chi":2,
            "dan":3,
            "fan":4,
            "he":5, 
            "jiu":6,
            "mian":7,  
            "mi":8,
            "tang":9,  
            "wan":10,
            "yao":11,
            "ge":12,
            "xie":13,
            "wu":14,
            "zi":15,          
            "tou":16,
            "bao":17,
            "tiao":18
            
        }

        this.YU_MAX_NUM = 12;

        this.allyu = [];

        this.INIT_TIME = 480;

        this.time_left = this.INIT_TIME;

        this.INIT_AIM_NUM = 8;
        this.aim_num = this.INIT_AIM_NUM;

        // 判断音效
        if (cc.sys.localStorage.getItem("bgm") == "off") {
            this.bgm.stop();
        } else {
            this.bgm.play();
            this.bgm.loop = true;
        }
    },

    start () {
        var self = this;

        this.game_help.runAction(cc.fadeOut(5));
        this.scheduleOnce(function() {
            this.loadGame();
        }, 5)

        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            if (self.getGameMode() == "richang") {
                cc.director.loadScene("richang_level");
            } else {
                cc.director.loadScene("qimo_level");
            }
        });


        this.btn_ok.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            //cc.director.loadScene("level");
            self.loadGame();
        });

        this.btn_no.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("btn_start pressed");
            //this.destroy();
            if (self.getGameMode() == "richang") {
                cc.director.loadScene("richang_level");
            } else {
                cc.director.loadScene("qimo_level");
            }

        });

        this.lb_yuanbao.string = this.getYuanbao();
        this.lb_time.string = this.time_left + "s" ;
        this.lb_left_aim_num.string = "剩余目标个数 " + this.aim_num;
    },

    getYuanbao: function() {
        let yuanbao = cc.sys.localStorage.getItem("yuanbao");
        if (yuanbao == null) {
            return 0;
        }
        return parseInt(yuanbao);
    },

    addYuanbao: function(num) {
        cc.sys.localStorage.setItem("yuanbao", this.getYuanbao() + num);
    },

    gameSuccess: function() {
        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }
        this.node.opacity = 100;
        this.dialog.active = true;
        this.lb_title.string = "恭喜你，挑战成功\n是否再来一次";
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.unscheduleAllCallbacks();
    },

    gameFail: function() {
        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }
        this.node.opacity = 100;
        this.dialog.active = true;
        this.lb_title.string = "你失败了哦\n是否再来一次";
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.unscheduleAllCallbacks();
    },

    loadGame: function() {
        //初始化
        this.unscheduleAllCallbacks();
        this.dialog.active = false;
        this.node.opacity = 255;

        this.time_left = this.INIT_TIME;
        this.aim_num = this.INIT_AIM_NUM;

        //事件
        this.schedule(function(){
            this.time_left--;
            if (this.time_left < 0) {
                return;
            }

            if (!this.audio_dida.isPlaying) {
                // 循环播放
                if (cc.sys.localStorage.getItem("audio") != "off") {
                    this.audio_dida.play();
                    this.audio_dida.loop = true;
                }

            }

            if (this.time_left == 0) {
                this.gameFail();
            }
            this.lb_time.string = this.time_left + "s";

        },1)

        this.lb_yuanbao.string = this.getYuanbao();
        this.lb_left_aim_num.string = "剩余目标个数 " + this.aim_num;

        // 只做一种玩法
        // 显示一张卡牌, 消失，消去对应的渔
        // 而且鱼只有一个游动方向

        //1. 显示一张卡牌，然后消失
        let rand = this.getRand(22);
        if (this.getGameMode() == "richang") {
            rand = this.getRand(30)
        }
        let ani = this.card[rand];
        this.aimCard = cc.instantiate(ani);
        this.node.addChild(this.aimCard);
        this.aimCard.runAction(cc.fadeOut(2.5).easing(cc.easeCubicActionIn()));
        cc.log(this.aimCard.x + " : " + this.aimCard.y);
        this.aimCard.setPosition(0,0);
        this.aim_type = this.getPerfabType(ani);
        this.scheduleOnce(function() {
            this.aimCard.destroy();
            //2. 布局渔
            this.game_start = false;
            this.yu_num = this.YU_MAX_NUM;
            let yu;
            for (let i = 0; i < this.yu_num; i++) {
                rand = this.getRand(24);
                if (this.getGameMode() == "richang") {
                    rand = this.getRand(32)
                }
                yu = cc.instantiate(this.aniYu[rand]);
                yu.type = this.getPerfabType(this.aniYu[rand]);
                yu.direction = this.getDirection(rand);
                if (yu.direction == "left") {
                    yu.x = this.getRand(1800) + 560;
                    yu.y = this.getRand(560) - 350;
                } else {
                    yu.x = -this.getRand(1800) - 560;
                    yu.y = this.getRand(560) - 350;
                }

                
                this.node.addChild(yu);
                this.allyu.push(yu);
            }
            this.game_start = true;
            //3. 添加点击事件
            this.addCallBack(this.node);
        }, 3);

    },

    /**
     * 添加点击事件
     */
    addCallBack: function(obj) {
        let self = this;

        obj.on(cc.Node.EventType.TOUCH_END, function(event) {
            let pos = event.getLocation();
            obj.endTouchX = event.touch._point.x;
            obj.endTouchY = event.touch._point.y;
            let boomObj = cc.instantiate(self.boom);
            boomObj.x = pos.x - 1136/2;
            boomObj.y = pos.y - 640/2;
            self.node.addChild(boomObj);
            cc.log(boomObj.x + " : " + boomObj.y);

            //检测消除
            let yu;
            for (let i = 0; i <self.allyu.length; i++) {
                yu = self.allyu[i];
                if (Math.abs(yu.x - boomObj.x) < 40 && Math.abs(yu.y - boomObj.y) < 40) {
                    // 增加发音
                    if (cc.sys.localStorage.getItem("audio") != "off") {
                        self.audio_zi[self.type2fayin[yu.type]].play();
                    }
                    
                    if (yu.type != self.aim_type) {
                        return;
                    }

                    self.addYuanbao(1);
                    self.lb_yuanbao.string = self.getYuanbao();
                    self.aim_num--;
                    self.lb_left_aim_num.string = "剩余目标个数 " + self.aim_num;
                    if (self.aim_num == 0) {
                        self.gameSuccess();
                        return;
                    }

                    self.removeArray(self.allyu, yu);
                    yu.destroy();
                    return;
                }
            }

            //移除
            self.scheduleOnce(function(){
                boomObj.destroy();
            }, 2)
        });
    },

    /**
     *  return 0 - num-1
     */
    getRand: function(num) {
        return parseInt(cc.random0To1() * num);
    },

    update (dt) {
        // 移动鱼
        let yu;
        let rand;
        for (let i = 0; i < this.allyu.length; i++) {
            yu = this.allyu[i];
            if (yu.type == "fan" || yu.type == "chi" || yu.type == "jiu") {
                rand = 3.5;
            } else if (yu.type == "tang" || yu.type == "he") {
                rand = 2.5;
            } else {
                rand = 1.5;
            }
            if (yu.direction == "left") {
                yu.x = yu.x - rand;
            } else {
                yu.x = yu.x + rand;
            }
        }
        // 消除鱼， 同时生成新的鱼
        for (let i = 0; i < this.allyu.length; i++) {
            yu = this.allyu[i];
            if (yu.direction == "left" && yu.x < - 1136/2 - 20) {
                this.removeArray(this.allyu, yu);
                yu.destroy();
            } 
            if (yu.direction == "right" && yu.x > 1136/2 + 40) {
                this.removeArray(this.allyu, yu);
                yu.destroy();
            }
        }

        if (this.aim_type == null) {
            return;
        }

        for (let i = this.allyu.length; i < this.YU_MAX_NUM - 1; i++) {
            // 先20%的随机，是就必然是目标
            rand = this.getRand(101);
            if (rand < 20) {
                let ani1 = this.getPerfabByType(this.aim_type);
                rand = this.aniYu.indexOf(ani1);
                yu = cc.instantiate(ani1);
            } else {
                rand = this.getRand(24);
                if (this.getGameMode() == "richang") {
                    rand = this.getRand(32);
                }
                yu = cc.instantiate(this.aniYu[rand]);
            }
            yu.direction = this.getDirection(rand);
            if (yu.direction == "left") {
                yu.x = this.getRand(500) + 640;
                yu.y = this.getRand(560) - 350;
            } else {
                yu.x = -this.getRand(500) - 640;
                yu.y = this.getRand(560) - 350;
            }
            yu.type = this.getPerfabType(this.aniYu[rand]);
            this.allyu.push(yu);
            this.node.addChild(yu);
        }

    },

    removeArray: function(arr, val) {
        var index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
        }
    },

    getPerfabByType: function(type) {
        let rand;
        if (type == "bei") {
            rand = this.getRand(4) + 0;
        } else if (type == "cha") {
            rand = this.getRand(2) + 4;
        } else if (type == "chi") {
            rand = this.getRand(2) + 6;
        } else if (type == "dan") {
            rand = this.getRand(2) + 8;
        } else if (type == "fan") {
            rand = this.getRand(2) + 10;
        } else if (type == "he") {
            rand = this.getRand(2) + 12;
        } else if (type == "jiu") {
            rand = this.getRand(2) + 14;
        } else if (type == "mi") {
            rand = this.getRand(2) + 16;
        } else if (type == "mian") {
            rand = this.getRand(2) + 18;
        } else if (type == "tang") {
            rand = this.getRand(2) + 20;
        } else if (type == "wan") {
            rand = this.getRand(2) + 22;
        } else if (type == "yao") {
            rand = 24;
        } else if (type == "ge") {
            rand = 25;
        } else if (type == "xie") {
            rand = 26;
        } else if (type == "wu") {
            rand = 27;
        } else if (type == "zi") {
            rand = 28;
        } else if (type == "tou") {
            rand = 29;
        } else if (type == "bao") {
            rand = 30;
        } else if (type == "tiao") {
            rand = 31;
        } 
        return this.aniYu[rand];
    },

    getPerfabType: function(ani) {
        let type;
        let index = this.aniYu.indexOf(ani);
        if (index != -1) {
            // 鱼的预制体
            if (index == 0 || index == 1 || index == 2 || index == 3) {
                type = "bei";
            } else if (index == 4 || index == 5) {
                type = "cha"
            } else if (index == 6 || index == 7) {
                type = "chi"
            } else if (index == 8 || index == 9) {
                type = "dan"
            } else if (index == 10 || index == 11) {
                type = "fan"
            } else if (index == 12 || index == 13) {
                type = "he"
            } else if (index == 14 || index == 15) {
                type = "jiu"
            } else if (index == 16 || index == 17) {
                type = "mi"
            } else if (index == 18 || index == 19) {
                type = "mian"
            } else if (index == 20 || index == 21) {
                type = "tang"
            } else if (index == 22 || index == 23) {
                type = "wan"
            } else if (index == 24) {
                type = "yao"
            } else if (index == 25) {
                type = "ge"
            } else if (index == 26) {
                type = "xie"
            } else if (index == 27) {
                type = "wu"
            } else if (index == 28) {
                type = "zi"
            } else if (index == 29) {
                type = "tou"
            } else if (index == 30) {
                type = "bao"
            } else if (index == 31) {
                type = "tiao"
            }
        } else {
            index = this.card.indexOf(ani);
            // 卡牌预制体
            if (index == 0 || index == 11) {
                type = "bei";
            } else
            if (index == 1 || index == 12) {
                type = "cha";
            } else
            if (index == 2 || index == 13) {
                type = "chi";
            } else
            if (index == 3 || index == 14) {
                type = "dan";
            } else
            if (index == 4 || index == 15) {
                type = "fan";
            } else
            if (index == 5 || index == 16) {
                type = "he";
            } else
            if (index == 6 || index == 17) {
                type = "jiu";
            } else
            if (index == 7 || index == 18) {
                type = "mian";
            } else
            if (index == 8 || index == 19) {
                type = "mi";
            } else
            if (index == 9 || index == 20) {
                type = "tang";
            } else
            if (index == 10 || index == 21) {
                type = "wan";
            }
            if (index == 22 ) {
                type = "yao";
            }
            if (index == 23 ) {
                type = "ge";
            }
            if (index == 24 ) {
                type = "xie";
            }
            if (index == 25 ) {
                type = "wu";
            }
            if (index == 26 ) {
                type = "zi";
            }
            if (index == 27 ) {
                type = "tou";
            }
            if (index == 28 ) {
                type = "bao";
            }
            if (index == 29 ) {
                type = "tiao";
            }
        }
        return type;
    },

    getDirection: function(num) {
        let direction = "left";
        if (num == 10 || num == 11 || num == 12 || num == 19 || num == 22) {
            direction = "right";
        }
        return direction;
    },

    getGameMode: function() {
        let mode = cc.sys.localStorage.getItem("mode");
        if (mode == null) {
            return "richang";
        }
        return mode;
    }
});
