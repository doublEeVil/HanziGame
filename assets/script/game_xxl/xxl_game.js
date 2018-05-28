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
        aniPer: {
            default: [],
            type: [cc.Prefab],
        },

        aniPer_2: {
            default: [],
            type: [cc.Prefab],
        },

        crash: {
            default: null,
            type: cc.Prefab
        },

        fayin: {
            default: null,
            type: cc.Prefab
        },

        lb_coin: {
            default: null,
            type: cc.Label
        },

        lb_time: {
            default: null,
            type: cc.Label
        },

        dialog: {
            default: null,
            type: cc.Node
        },

        btn_no : {
            default: null,
            type: cc.Node
        },

        btn_ok: {
            default: null,
            type: cc.Node
        },

        lb_title: {
            default: null,
            type: cc.Label
        },

        sp_aim: {
            default: null,
            type: cc.Node
        },

        lb_aim_num: {
            default: null,
            type: cc.Label
        },

        lb_done: {
            default: null,
            type: cc.Label
        },

        lb_aim_info_1: {
            default: null,
            type: cc.Label
        },

        lb_aim_info_2: {
            default: null,
            type: cc.Label
        },

        sp_aim_2: {
            default: null,
            type: cc.Node
        },

        lb_aim_num_2: {
            default: null,
            type: cc.Label
        },

        lb_done_2: {
            default: null,
            type: cc.Label
        },

        canvas: {
            default: null,
            type: cc.Node
        },

        dialog_about: {
            default: null,
            type: cc.Node
        },

        lb_about: {
            default: null,
            type: cc.Label
        },

        btn_help: {
            default: null,
            type: cc.Node
        },        

        audio: {
            type: [cc.AudioSource],
            default: []
        },

        audio_ice: {
            type: cc.AudioSource,
            default: null
        },

        audio_dida: {
            type: cc.AudioSource,
            default: null
        },

        btn_back: {
            type: cc.Node,
            default: null
        },

        bgm: {
            default:null,
            type: cc.AudioSource
        },

        goal_node: {
            default: null,
            type: cc.Node
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
        this.X_NUM = 7; //多少列
        this.Y_NUM = 6; //多少行
        this.CELL_SIZE = 80;

        this.showIce = [];
        this.objs = [];
        this.startX = -230;
        this.startY = -210;

        this.timeLeft = 120;
        this.pass = false;

        this.aim_type = 0;
        this.aim_num = 20;
        this.done_num = 0;

        this.aim_type_2 = 0;
        this.aim_num_2 = 20;
        this.done_num_2 = 0;

        this.INIT_TIME = 120;

        this.level = 1;

        this.info_msg = ["3个连成一起\n就可以消除元素\n每个环节你需要消除不同的目标\nslide ro exhange the iceblocks\nlink three same iceblocks together"];

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

        this.btn_ok.on(cc.Node.EventType.TOUCH_END, function(){
            if (this.pass == true) {
                // 已经通关全部,重新游戏
                cc.log("btn-ok");
                this.loadGame();
            } else {
                // 返回关卡
                //cc.director.loadScene("level");
                this.loadGame();
            }
        }, this);

        this.btn_no.on(cc.Node.EventType.TOUCH_END, function(){
            if (this.pass) {
                // 通过，选择否,重新开始
                //cc.director.loadScene("level");
                if (this.getGameMode() == "richang") {
                    cc.director.loadScene("richang_level");
                } else {
                    cc.director.loadScene("qimo_level");
                }
            } else {
                // 未通过，
                if (this.getGameMode() == "richang") {
                    cc.director.loadScene("richang_level");
                } else {
                    cc.director.loadScene("qimo_level");
                }
            }
        }, this);


        this.btn_help.on(cc.Node.EventType.TOUCH_START, function() {
            this.dialog_about.active = true;
            this.lb_about.string = this.info_msg[0];
        }, this);
        this.btn_help.on(cc.Node.EventType.TOUCH_END, function() {
            this.dialog_about.active = false;
            this.lb_about.string = this.info_msg[0];
        }, this);

        // 一进入游戏的按钮
        self.btn_task1.setScale(1.1);
        self.btn_task1.setColor(new cc.Color(235,123,67));
        self.btn_task2.setScale(1.0);
        self.btn_task2.setColor(new cc.Color(255,255,255));
        self.btn_task3.setScale(1.0);
        self.btn_task3.setColor(new cc.Color(255,255,255));

        this.btn_task1.on(cc.Node.EventType.TOUCH_END, function() {
            self.btn_task1.setScale(1.1);
            self.btn_task1.setColor(new cc.Color(235,123,67));
            self.btn_task2.setScale(1.0);
            self.btn_task2.setColor(new cc.Color(255,255,255));
            self.btn_task3.setScale(1.0);
            self.btn_task3.setColor(new cc.Color(255,255,255));
            self.level = 1;
            self.loadGame();
        });
        this.btn_task2.on(cc.Node.EventType.TOUCH_END, function() {
            self.btn_task2.setScale(1.1);
            self.btn_task2.setColor(new cc.Color(235,123,67));
            self.btn_task1.setScale(1.0);
            self.btn_task1.setColor(new cc.Color(255,255,255));
            self.btn_task3.setScale(1.0);
            self.btn_task3.setColor(new cc.Color(255,255,255));
            self.level = 3;
            self.loadGame();
        });
        this.btn_task3.on(cc.Node.EventType.TOUCH_END, function() {
            self.btn_task3.setScale(1.1);
            self.btn_task3.setColor(new cc.Color(235,123,67));
            self.btn_task2.setScale(1.0);
            self.btn_task2.setColor(new cc.Color(255,255,255));
            self.btn_task1.setScale(1.0);
            self.btn_task1.setColor(new cc.Color(255,255,255));
            self.level = 5;
            self.loadGame();
        });

        this.loadGame();
    },

    getCurLevel: function() {
        var level = cc.sys.localStorage.getItem("xxl_level");
        if (null == level) {
            cc.sys.localStorage.setItem("xxl_level", 1);
            return 1;
        }
        return parseInt(level);
    },

    loadGame: function() {
        //this.level = 3;
        //this.level = this.getCurLevel();
        if (this.level >= 6) {
            this.level = 6;
        }
        // this.level = 6;

        this.dialog.active = false;
        this.canvas.opacity = 255;

        // 初始化数据
        this.goal_node.stopAllActions();
        if (this.INIT_GOAL_NODE_X == null) {
            this.INIT_GOAL_NODE_X = this.goal_node.x;
            this.INIT_GOAL_NODE_Y = this.goal_node.y;
        }
        this.goal_node.x = this.INIT_GOAL_NODE_X;
        this.goal_node.y = this.INIT_GOAL_NODE_Y;

        this.unscheduleAllCallbacks();
        this.timeLeft = this.INIT_TIME;
        
        if (this.level % 2 == 0) {
            this.timeLeft = 100;
        } else {
            this.timeLeft = 60;
        }

        this.done_num = 0;
        this.done_num_2 = 0;

        this.node.off(cc.Node.EventType.TOUCH_START);
        this.node.off(cc.Node.EventType.TOUCH_END);

        if (this.objs != null && this.objs.length != 0) {
            for (let x = 0; x < this.X_NUM; x++) {
                for (let y = 0; y < this.Y_NUM; y++) {
                    this.objs[x][y].destroy();
                    this.objs[x][y] = null;
                }
            }
        }
        this.objs = [];

        //this.node.removeAllChildren();
        let aniPer;
        if (this.level == 1 || this.level == 2 || this.level == 5 || this.level == 6) {
            // 显示汉字
            aniPer = this.aniPer;
        } else {
            // 显示拼音
            aniPer = this.aniPer_2;
        }
        this.showIce = [];
        // 添加5个
        while (true) {
            if (this.showIce.length >= 5) {
                break;
            }
            let rand = this.getRand(11);
            let ani = aniPer[rand];
            if (this.showIce.indexOf(ani) == -1) {
                this.showIce.push(ani);
            }
        }
        // 初始化金币， 时间
        this.lb_coin.string = "+" + this.getCoin();
        this.lb_time.string = this.timeLeft + "s";
        this.lb_aim_num.string = this.aim_num + "个";
        this.lb_done.string = "已经完成 " + this.done_num + " 个";
        this.aim_type = this.getRand(4);

        this.lb_aim_num_2.string = this.aim_num_2 + "个";
        this.lb_done_2.string = "已经完成 " + this.done_num_2 + " 个";
        this.aim_type_2 = this.getRand(4);

        while (this.aim_type_2 == this.aim_type) {
            this.aim_type_2 = this.getRand(4);
        }

        if (this.aim_node != null) {
            this.aim_node.destroy();
        }
        if (this.aim_node_2 != null) {
            this.aim_node_2.destroy();
        }
        let ani ;
        let ani_2;
        if (this.level == 1 || this.level == 2) {
            this.lb_aim_info_1.string = "消除元素的拼音为";
            this.lb_aim_info_2.string = "消除元素的拼音为";
            let index = this.aniPer.indexOf(this.showIce[this.aim_type]);
            ani = this.aniPer_2[index];
            index = this.aniPer.indexOf(this.showIce[this.aim_type_2]);
            ani_2 = this.aniPer_2[index];
        } else if (this.level == 3 || this.level == 4) {
            this.lb_aim_info_1.string = "消除元素的字形为";
            this.lb_aim_info_2.string = "消除元素的字形为";
            let index = this.aniPer_2.indexOf(this.showIce[this.aim_type]);
            ani = this.aniPer[index];
            index = this.aniPer_2.indexOf(this.showIce[this.aim_type_2]);
            ani_2 = this.aniPer[index];
        } else  if (this.level == 5 || this.level == 6){
            this.lb_aim_info_1.string = "消除元素的读音为";
            this.lb_aim_info_2.string = "消除元素的读音为";
            ani = this.fayin;
            ani_2 = this.fayin;
        }

        this.aim_node = cc.instantiate(ani);
        //this.aim_node.x = this.sp_aim.x + 578;
        //this.aim_node.y = this.sp_aim.y - 4;
        this.aim_node.x = this.sp_aim.x
        this.aim_node.y = this.sp_aim.y
        this.sp_aim = this.aim_node;
        this.goal_node.addChild(this.sp_aim);
        //this.node.addChild(this.aim_node);

        this.aim_node_2 = cc.instantiate(ani_2);
        // this.aim_node_2.x = this.sp_aim_2.x + 578;
        // this.aim_node_2.y = this.sp_aim_2.y - 4;
        //this.node.addChild(this.aim_node_2);
        this.aim_node_2.x = this.sp_aim_2.x;
        this.aim_node_2.y = this.sp_aim_2.y;
        this.sp_aim_2 = this.aim_node_2;
        this.goal_node.addChild(this.aim_node_2);

        if (this.level == 5 || this.level == 6) {
            // 添加发音按钮事件
            this.aim_node.on(cc.Node.EventType.TOUCH_END, function() {
                let index = this.aniPer.indexOf(this.showIce[this.aim_type]);
                //this.audio[index].play();
                this.playAudio(this.audio[index]);
            }, this);

            this.aim_node_2.on(cc.Node.EventType.TOUCH_END, function() {
                let index = this.aniPer.indexOf(this.showIce[this.aim_type_2]);
                //this.audio[index].play();
                this.playAudio(this.audio[index]);
            }, this);
        }

        if (this.level % 2 == 0) {
            // 偶数显示2个
            this.lb_aim_info_2.node.active = true;
            //this.sp_aim_2.active = true;
            this.lb_aim_num_2.node.active = true;
            this.lb_done_2.node.active = true;
            this.aim_node_2.active = true;
        } else {
            // 下面这一列不显示
            this.lb_aim_info_2.node.active = false;
            this.sp_aim_2.active = false;
            this.lb_aim_num_2.node.active = false;
            this.lb_done_2.node.active = false;
            this.aim_node_2.active = false;
        }

        let self = this;
        cc.log('xxl start');
        
        //先显示目标
        let initX = this.goal_node.x;
        let initY = this.goal_node.y; 
        this.goal_node.setPosition(initX - 300, initY);
        this.node.opacity = 0;
        this.scheduleOnce(function() {
            this.goal_node.runAction(cc.moveTo(1, initX, initY));
        }, 2);
        
        this.scheduleOnce(function() {
            this.node.opacity = 255;

            //0. 先自定义好要显示的哪四种
            //1. 摆好 7 * 7的
            let rand;

            for (let x = 0; x < this.X_NUM; x++) {
                let arrY = [];
                for (let y = 0; y < this.Y_NUM; y++) {
                    rand = this.getRand(5);
                    var obj = cc.instantiate(this.showIce[rand]);
                    obj.x = this.startX + (x * this.CELL_SIZE);
                    obj.y = this.startY + (y * this.CELL_SIZE);
                    obj.type = rand;
                    obj.indexX = x;
                    obj.indexY = y;
                    obj.setScale(70/60); //TODO -----
                    this.node.addChild(obj);
                    arrY[y] = obj;
                }
                this.objs[x] = arrY;
            }

            this.addCallBack(this.node);
        
            // 初始化是否消除
            let arr = this.checkCanDestroy();
            var callback = function() {
                //this.removeCallback();
                if (arr == null) {
                    return;
                }
                if (arr.length >= 3) {
                    this.scheduleOnce(function() {
                        this.destroyObj(arr);
                    }, 0.1);
                } else {
                    this.unschedule(callback);
                    //this.addCallBack(this.node);
                }
                arr = this.checkCanDestroy();
            }
            this.schedule(callback, 0.5, 160);

            // 倒计时
            this.schedule(function() {
                this.timeLeft--;
                if (!this.audio_dida.isPlaying) {
                    if (cc.sys.localStorage.getItem("audio") != "off") { 
                        // 循环播放
                        this.audio_dida.play();
                        this.audio_dida.loop = true;
                    }
                }

                if (this.timeLeft < 0) {
                    return;
                }
                if (this.timeLeft == 0) {
                    //alert("计时结束，要加油哦");
                    this.gameFail();
                }
                this.lb_time.string = (this.timeLeft + " s")
            }, 1);

            // 检测是否完成目标
            this.schedule(function() {
                if (this.done_num >= this.aim_num && this.level % 2 == 1) {
                    this.gameSuccess();
                    return;
                }
                if (this.done_num >= this.aim_num && this.done_num_2 >= this.aim_num_2 && this.level % 2 == 0) {
                    this.gameSuccess();
                    return;
                }
            }, 0.5);
        }, 3);

    },

    gameSuccess: function() {
        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }
        this.pass = true;
        this.dialog.active = true;
        this.canvas.opacity = 100;
        this.lb_title.string = "恭喜完成目标\n是否进行下一挑战？";
        if (this.level == 6) {
            this.lb_title.string = "恭喜完成全部目标\n是否重新开始游戏";
        }
        this.unscheduleAllCallbacks();
        this.node.off(cc.Node.EventType.TOUCH_START);

        // 增加关卡
        this.level++;
        cc.sys.localStorage.setItem("xxl_level", this.level);
    },

    gameFail: function() {
        // 停止音乐
        if (this.audio_dida.isPlaying) {
            this.audio_dida.stop();
        }
        this.pass = false;
        this.unscheduleAllCallbacks();
        this.canvas.opacity = 100;
        this.lb_title.string = "挑战失败了哦\n是否again?";
        this.dialog.active = true;
        this.node.off(cc.Node.EventType.TOUCH_START);
    },

    addCoin: function(num) {
        this.setCoin(this.getCoin()+num);
    },

    setCoin: function(coin) {
        cc.sys.localStorage.setItem("hulu", coin);
    },

    getCoin: function() {
        var coin = cc.sys.localStorage.getItem("hulu");
        if (coin == null) {
            this.setCoin(0);
        }
        coin = cc.sys.localStorage.getItem("hulu");
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

    /**
     * 添加点击事件
     */
    addCallBack: function(obj) {
        let self = this;
        obj.on(cc.Node.EventType.TOUCH_START, function(event) {
            var delta = event.touch.getDelta();
            obj.startTouchX = event.touch._startPoint.x - 50; //偏移量调整
            obj.startTouchY = event.touch._startPoint.y - 50;
            let x = parseInt(obj.startTouchX / self.CELL_SIZE);
            let y = parseInt(obj.startTouchY / self.CELL_SIZE);
            //console.log(parseInt(obj.startTouchX), parseInt(obj.startTouchY))
            console.log(x, y);
            // x = (x <= 0 ? 1 : x);
            // y = (y <= 0 ? 1 : y);
            self.touchObj = self.objs[x][y];
        });

        obj.on(cc.Node.EventType.TOUCH_END, function(event) {
            obj.endTouchX = event.touch._point.x - 50; //偏移量调整
            obj.endTouchY = event.touch._point.y - 50;
            console.log(obj.endTouchX, obj.endTouchY);
            // 判断移动
            let dx = obj.endTouchX - obj.startTouchX; 
            let dy = obj.endTouchY - obj.startTouchY;
            if (Math.abs(Math.abs(dx) - Math.abs(dy)) < 10 ) {
                return;
            }
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
                return;
            }
            if (Math.abs(dx) > 150 && Math.abs(dy) > 150) {
                return;
            }
            let num;
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    // 向右
                    num = 1;
                } else {
                    // 向左
                    num = 3;
                }
            } else {
                if (dy > 0) {
                    // 向上
                    num = 4;
                } else {
                    // 向下
                    num = 2;
                }
            }
            console.log(num, dx, dy);
            self.checkCanMove(self.touchObj, num);
        });
    },

    removeCallback: function() {
        this.node.off(cc.Node.EventType.TOUCH_START);
    },

    checkCanMove: function(obj, num) {
        if (null == obj) {
            return;
        }
        let tObj;
        if (num == 1) {
            tObj = this.objs[obj.indexX+1][obj.indexY];
        } 
        if (num == 2) {
            tObj = this.objs[obj.indexX][obj.indexY-1];
        } 
        if (num == 3) {
            tObj = this.objs[obj.indexX-1][obj.indexY];
        }
        if (num == 4) {
            tObj = this.objs[obj.indexX][obj.indexY+1];
        }
        //
        if (null == tObj) {
            return;
        }
        // 对调位置
        obj.choose = true;
        tObj.choose = true;

        this.swap(obj, tObj);

        // 检测是否可以交换
        // 可以则交换， 并进行消除
        // 否则，回到原位
        let canDestroy = this.checkCanDestroy();
        //cc.log(canDestroy);
        if (canDestroy == null) {
            return
        }
        if (canDestroy.length < 3) {
            this.scheduleOnce(function() {
                this.swap(obj, tObj);
            }, 0.3)
        } else  {
            var callback = function() {
                if (canDestroy.length >= 3) {
                    //this.removeCallback();
                    this.scheduleOnce(function() {
                        this.destroyObj(canDestroy);
                    }, 0.1);
                } else {
                    this.unschedule(callback);
                    //this.addCallBack(this.node);
                }
                canDestroy = this.checkCanDestroy();
            }
            this.schedule(callback, 0.5, 160);
            // this.scheduleOnce(function() {
            //     this.destroyObj(canDestroy);
            // }, 0.4);
        }
    },

    /**
     * 消除可以消除的
     */
    destroyObj: function(arr){
        if (arr.length < 3) {
            return;
        }
        let self = this;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].type == this.aim_type) {
                this.done_num++;
                this.lb_done.string = "已经完成" + this.done_num + "个";

                this.addCoin(10);
                this.lb_coin.string = "+" + this.getCoin();
                //漂字
                this.piaozi("+10", 0, 0)
            }
            if (this.level % 2 == 0) {
                if (arr[i].type == this.aim_type_2) {
                    this.done_num_2++;
                    this.lb_done_2.string = "已经完成" + this.done_num_2 + "个";
                    this.addCoin(10);
                    //漂字
                    this.piaozi("+10", 0, 0)
                    this.lb_coin.string = "+" + this.getCoin();
                }
            }
            // 非目标消除，+1
            if (arr[i].type != this.aim_type && arr[i].type != this.aim_type_2) {
                this.addCoin(1);
                //漂字
                this.piaozi("+1", 0, 0)
                this.lb_coin.string = "+" + this.getCoin();
            }

            self.objs[arr[i].indexX][arr[i].indexY] = null;
            self.crashObj(arr[i]);
        }
        //可以消除， 播放音效
        if (cc.sys.localStorage.getItem("audio") != "off") { 
            //this.audio_ice.play();
            this.playAudio(this.audio_ice);
        }
      
        this.refresh();
    },

    /**
     * 重新刷新界面
     */
    refresh: function() {
        for (let x = 0; x < this.X_NUM; x++) {
            for (let y = 0; y < this.Y_NUM; y++) {
                if (this.objs[x][y] != null) {
                    continue;
                }
                //把上面的非空下落
                for (let cy = y + 1; cy < this.Y_NUM; cy++) {
                    if (this.objs[x][cy] != null) {
                        let tNode = this.objs[x][cy];
                        tNode.indexX = x;
                        tNode.indexY = y;
                        this.objs[x][cy] = null;
                        this.objs[x][y] = tNode;
                        let moveX = this.startX + (x * this.CELL_SIZE);
                        let moveY = this.startY + (y * this.CELL_SIZE);
                        tNode.runAction(cc.moveTo(0.3, moveX, moveY));
                        break;
                    }
                }
            }
        }
        // 填充空白
        for (let x = 0; x < this.X_NUM; x++) {
            for (let y = 0; y < this.Y_NUM; y++) {
                if (this.objs[x][y] != null) {
                    continue;
                }
                let rand = this.getRand(4);
                var obj = cc.instantiate(this.showIce[rand]);
                let posX = this.startX + (x * this.CELL_SIZE);
                let posY = this.startY + (y * this.CELL_SIZE);
                obj.type = rand;
                obj.indexX = x;
                obj.indexY = y;
                obj.x = posX;
                obj.y = 700;
                obj.setScale(70/60); //TODO ----
                this.node.addChild(obj);
                this.objs[x][y] = obj;
                obj.runAction(cc.moveTo(0.3, posX, posY));
            }
        }
        //位置的问题，强制定位
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 7; y++) {
                //this.objs[x][y].x = this.startX + (x * 70);
                //this.objs[x][y].y = this.startY + (y * 70);
            }
        }
    },

    /**
     * 
     */
    checkCanDestroy: function() {
        let arr = [];
        // 检测消除算法
        // 1. 构建全部图
        for (let x = 0; x < this.X_NUM; x++) {
            for (let y = 0; y < this.Y_NUM; y++) {
                //cc.log(x + " " + y + " " + this.objs[x][y])
                if (this.objs[x][y] == null) {
                    // 暂时先这么做，防止卡死
                    return;
                }
                if (x < this.X_NUM - 1) {
                    this.objs[x][y].right = this.objs[x+1][y];
                }
                if (x > 0) {
                    this.objs[x][y].left = this.objs[x-1][y];
                }
                if (y < this.Y_NUM - 1) {
                    this.objs[x][y].up = this.objs[x][y+1];
                }
                if (y > 0) {
                    this.objs[x][y].down = this.objs[x][y-1];
                }
            }
        }

        // 2. 检测消除对象       
        for (let x = 0; x < this.X_NUM; x++) {
            for (let y = 0; y < this.Y_NUM; y++) {
                // 检测横是否
                let xi = 1;
                let curObj = this.objs[x][y];
                let type = curObj.type;
                let nextObj = curObj.right;
                let tArr = [];
                tArr.push(curObj);
                while (nextObj != null && nextObj.type == type) {
                    tArr.push(nextObj);
                    xi++;
                    nextObj = nextObj.right;
                }
                if (xi >= 3) {
                    for (let i = 0; i < xi; i++) {
                        if (arr.indexOf(tArr[i]) == -1) {
                            arr.push(tArr[i]);
                        }
                    }
                }
                // 检测垂直
                xi = 1;
                tArr = [];
                nextObj = curObj.up;
                tArr.push(curObj);
                while(nextObj != null && nextObj.type == type) {
                    tArr.push(nextObj);
                    xi++;
                    nextObj = nextObj.up;
                }
                if (xi >= 3) {
                    for (let i = 0; i < xi; i++) {
                        if (arr.indexOf(tArr[i]) == -1) {
                            arr.push(tArr[i]);
                        }
                    }
                }
            }
        }
        return arr;
    },

    /**
     * 交换属性
     */
    swap: function(objA, objB) {
        if (objA == null) {
            return;
        }
        if (objB == null) {
            return;
        }
        let objX = objA.x;
        let objY = objA.y;
        let tObjX = objB.x;
        let tObjY = objB.y;
        // objA.runAction(cc.moveTo(0.2, tObjX, tObjY));
        // objB.runAction(cc.moveTo(0.2, objX, objY));

        this.objs[objA.indexX][objA.indexY] = objB;
        this.objs[objB.indexX][objB.indexY] = objA;
        let tx = objA.indexX;
        let ty = objA.indexY;
        objA.indexX = objB.indexX;
        objA.indexY = objB.indexY;
        objB.indexX = tx;
        objB.indexY = ty;

        let ax = this.startX + (objA.indexX * this.CELL_SIZE);
        let bx = this.startX + (objB.indexX * this.CELL_SIZE);
        let ay = this.startY + (objA.indexY * this.CELL_SIZE);
        let by = this.startY + (objB.indexY * this.CELL_SIZE);

        objA.runAction(cc.moveTo(0.2, ax, ay));
        objB.runAction(cc.moveTo(0.2, bx, by));
    },

    /**
     * 销毁
     */
    crashObj: function(obj){
        if (obj == null) {
            return;
        }
        let x = obj.x;
        let y = obj.y;
        obj.destroy();
        var ice = cc.instantiate(this.crash);
        ice.x = x;
        ice.y = y;
        this.node.addChild(ice);
        this.scheduleOnce(function(){
            ice.destroy();
        }, 0.3);
    },

    /**
     *  return 0 - num-1
     */
    getRand: function(num) {
        return parseInt(cc.random0To1() * num);
    },

    getGameMode: function() {
        let mode = cc.sys.localStorage.getItem("mode");
        if (mode == null) {
            return "richang";
        }
        return mode;
    },

    playAudio: function(audio) {
        this.bgm.volume = 0.2;
        audio.play();
        this.scheduleOnce(function(){
            this.bgm.volume = 1;
        }, audio.getDuration()+0.2);
    }

    // update (dt) {},
});
