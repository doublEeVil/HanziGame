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

        btn_play: {
            default: null,
            type: cc.Node
        },

        btn_pause: {
            default: null,
            type: cc.Node
        },

        sp_danci: {
            default: [],
            type: cc.Node
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

        lb_dialog_title: {
            default: null,
            type: cc.Label
        },

        audios: {
            default: [],
            type: cc.AudioSource
        }
    },


    // onLoad () {},

    start () {
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

        this.btn_play.on(cc.Node.EventType.TOUCH_END, function() {
            cc.log(this.audios[0]);
            if (this.audioPause) {
                this.audios[0].resume();
            } else {
                this.audios[0].play();
            }
            this.audioPause = false;
            
        }, this);

        this.btn_pause.on(cc.Node.EventType.TOUCH_END, function() {
            if (this.audios[0].isPlaying) {
                this.audios[0].pause();
                this.audioPause = true;
            }
        }, this);


        for (let i = 0; i < this.sp_danci.length; i++) {
            let obj = this.sp_danci[i];
            this.addCallback(obj);
        }

        this.loadGame();
    },

    loadGame: function() {

        this.node.opacity = 255;
        this.dialog.active = false;

    },

    addCallback: function(obj) {
        let self = this;
        obj.on(cc.Node.EventType.TOUCH_END, function(){
            if (self.sp_danci.indexOf(obj) == 2) {
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
    },

    gameFail: function() {
        this.lb_dialog_title.string = "哦， 你选错了\n再来一次？";
        this.node.opacity = 125;
        this.dialog.active = true;
    }

});
