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

        tog: {
            default: [],
            type: cc.Toggle
        },

        lb_audio: {
            default: null,
            type: cc.Label
        },

        lb_bgm: {
            default: null,
            type: cc.Label
        },

        lb_lang: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.count = 0;
    },

    start () {
        this.btn_back.on(cc.Node.EventType.TOUCH_END, function() {
            cc.director.loadScene("main");
        });

        cc.log(cc.sys.localStorage.getItem("audio"));
        cc.log(cc.sys.localStorage.getItem("bgm") );
        cc.log(cc.sys.localStorage.getItem("lang") );

        let audio = this.getAudio();

        let bgm = this.getBgm();

        let lang = this.getLang();


        if (audio == "on") {
            this.tog[0].isChecked = true;
            this.tog[1].isChecked = false;
        } else {
            this.tog[0].isChecked = false;
            this.tog[1].isChecked = true;
        }

        if (bgm == "on") {
            this.tog[2].isChecked = true;
            this.tog[3].isChecked = false;
        } else {
            this.tog[2].isChecked = false;
            this.tog[3].isChecked = true;
        }

        if (lang == "zh") {
            this.tog[4].isChecked = true;
            this.tog[5].isChecked = false;
        } else {
            this.tog[4].isChecked = false;
            this.tog[5].isChecked = true;
        }

        if (lang == "en") {
            this.lb_audio.string = "audio";
            this.lb_bgm.string = "bgm";
            this.lb_lang.string = "language";
        }

    },

    radioButtonClicked: function(toggle) {
        //cc.log(toggle);
        let index = this.tog.indexOf(toggle);

        if (index == 0) {
            cc.sys.localStorage.setItem("audio", "on");
        } else if (index == 1) {
            cc.sys.localStorage.setItem("audio", "off");
        } else if (index == 2) {
            cc.sys.localStorage.setItem("bgm", "on");
        } else if (index == 3) {
            cc.sys.localStorage.setItem("bgm", "off");
        } else if (index == 4) {
            cc.sys.localStorage.setItem("lang", "zh");

            this.lb_audio.string = "音效";
            this.lb_bgm.string = "音乐";
            this.lb_lang.string = "语言";

        } else if (index == 5) {
            cc.sys.localStorage.setItem("lang", "en");

            this.lb_audio.string = "audio";
            this.lb_bgm.string = "bgm";
            this.lb_lang.string = "language";
        }
    },

    getAudio: function() {
        let f = cc.sys.localStorage.getItem("audio");
        if (f == null) {
            cc.sys.localStorage.setItem("audio", "on");
            return "on";
        }
        return f;
    },

    getBgm: function() {
        let f = cc.sys.localStorage.getItem("bgm");
        if (f == null) {
            cc.sys.localStorage.setItem("bgm", "on");
            return "on";
        }
        return f;
    },

    getLang: function() {
        let f = cc.sys.localStorage.getItem("lang");
        if (f == null) {
            cc.sys.localStorage.setItem("lang", "zh");
            return "zh";
        }
        return f;
    },

    update (dt) {

    },
});
