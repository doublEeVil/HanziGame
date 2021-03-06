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

        lb_dialog_title: {
            default: null,
            type: cc.Label
        },

        btn_back: {
            default: null,
            type: cc.Node
        },

        lb_team: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.INIT_CHOOSE = {
            "0" : "冰",
            "1" : "灵",
            "2" : "水" 
        }

        this.lb_ch = [];
                
        this.arr_right = ['河','江','湖','海','洋','浪','溪','汤',
                            '汁','酒','汗','泪','洗'];
    },

    start () {
        // 添加点击事件，判断点击了那个字
        /*
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            let endTouchX = event.touch._point.x - 1136/2;
            let endTouchY = event.touch._point.y - 640/2;
            cc.log(endTouchX + " " + endTouchY);
            
            //起始位置是x:-200，字是100，y:-180
            let initY = -180;
            let initX = -200;
            let width = 400;
            if(Math.abs(endTouchY-initY) < 50) {
                if (endTouchX > initX && endTouchX < (initX + width)) {
                    let index;
                    index = parseInt((endTouchX - initX)/120);
                    cc.log("====" + index);
                }
            }
        });
        */

        let self = this;

        this.btn_back.on(cc.Node.EventType.TOUCH_END, function(){
           cc.director.loadScene("main"); 
        });

        this.btn_ok.on(cc.Node.EventType.TOUCH_END, function() {
            self.loadGame();
        });

        this.btn_no.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("main");
        });

        this.loadGame();
    },

    loadGame: function() {
        for (let i = 0; i < this.lb_ch.length; i++) {
            if (this.lb_ch[i] != null) {
                this.lb_ch[i].destroy();
            }
        }
        this.lb_ch = [];
        this.dialog.active = false;
        this.node.opacity = 255;

        let rand = parseInt(cc.random0To1() * this.arr_right.length);
        this.right_word = this.arr_right[rand];

        // 定义要显示的字
        let str = "";
        for (let i = 0; i < this.arr_right.length; i++) {
            if (i == rand) {
                str += "?";
            } else {
                str += this.arr_right[i];
            }
            str += " ";
        }
        this.lb_team.string = str;

        // 随机正确的值位置
        this.right_index = parseInt(cc.random0To1() * 4);
        let init_word_index = 0;
        for (let i = 0; i < 4; i++) {
            let lb_node = new cc.Node('Label');
            let lb = lb_node.addComponent(cc.Label);
            if (i == this.right_index) {
                lb.string = this.right_word;
            } else {
                lb.string = this.INIT_CHOOSE[init_word_index++];
            }
            lb.fontSize = 110;
            lb.lineHeight = 120;
            let moveX = -170 + i * 120;
            let moveY = -180;
            lb_node.x = 1900;
            lb_node.y = -180;
            lb_node.color = new cc.Color(226, 2, 69);
            this.lb_ch.push(lb_node);
            this.node.addChild(lb_node);

            lb_node.index = i;
            this.addClick(lb_node);

            // 添加出现动画
            let move1 = cc.moveTo(0.5 + 0.2 * i, moveX, moveY);
            lb_node.runAction(move1.easing(cc.easeIn(2.0)));
        }
    },

    addClick:  function(obj) {
        let self = this;
        obj.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log("==", obj.index);
            let action = new cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1));
            obj.runAction(action);
            if (obj.index == self.right_index) {
                self.gameSuccess();
            } else {
                self.gameFail();
            }
        });
    },


    gameSuccess: function() {
        this.lb_dialog_title.string = "恭喜，你找对了\n再来一次？";
        this.node.opacity = 125;
        this.dialog.active = true;
        for (let i = 0; i < this.lb_ch.length; i++) {
            if (this.lb_ch[i] != null) {
                this.lb_ch[i].off(cc.Node.EventType.TOUCH_END);
            }
        }
    },

    gameFail: function() {
        this.lb_dialog_title.string = "哦， 你选错了\n再来一次？";
        this.node.opacity = 125;
        this.dialog.active = true;
        for (let i = 0; i < this.lb_ch.length; i++) {
            if (this.lb_ch[i] != null) {
                this.lb_ch[i].off(cc.Node.EventType.TOUCH_END);
            }
        }
    }

});
