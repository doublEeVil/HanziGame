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
        value: {
            get () {
                return this._value;
            },
            set (val) {
                this._value = val;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.num2res = {
            // 正确的字
            "1": "img/jiyili/card_right/card_right_" + "mi" + ".png",
            "2": "img/jiyili/card_right/card_right_" + "bei" + ".png",
            "3": "img/jiyili/card_right/card_right_" + "chi" + ".png",
            "4": "img/jiyili/card_right/card_right_" + "mian" + ".png",
            "5": "img/jiyili/card_right/card_right_" + "cha" + ".png",
            "6": "img/jiyili/card_right/card_right_" + "tang" + ".png",
            "7": "img/jiyili/card_right/card_right_" + "jiu" + ".png",
            "8": "img/jiyili/card_right/card_right_" + "he" + ".png",
            "9": "img/jiyili/card_right/card_right_" + "wan" + ".png",
            "10": "img/jiyili/card_right/card_right_" + "fan" + ".png",
            "11": "img/jiyili/card_right/card_right_" + "dan" + ".png",

            // 错误的字
            "101": "img/jiyili/card_wrong/card_wrong_" + "dan" + ".png",
            "102": "img/jiyili/card_wrong/card_wrong_" + "mian" + ".png",
            "103": "img/jiyili/card_wrong/card_wrong_" + "tang" + ".png",

            // 相似的字
            "201": "img/jiyili/card_like/card_like_" + "bei1" + ".png",
            "202": "img/jiyili/card_like/card_like_" + "bei2" + ".png",
            "203": "img/jiyili/card_like/card_like_" + "cha1" + ".png",
            "204": "img/jiyili/card_like/card_like_" + "cha2" + ".png",
            "205": "img/jiyili/card_like/card_like_" + "dan" + ".png",
            "206": "img/jiyili/card_like/card_like_" + "fan1" + ".png",
            "207": "img/jiyili/card_like/card_like_" + "fan2" + ".png",
            "208": "img/jiyili/card_like/card_like_" + "he" + ".png",
            "209": "img/jiyili/card_like/card_like_" + "jiu" + ".png",
            "210": "img/jiyili/card_like/card_like_" + "mi1" + ".png",
            "211": "img/jiyili/card_like/card_like_" + "mi2" + ".png",
            "212": "img/jiyili/card_like/card_like_" + "tang" + ".png",
            "213": "img/jiyili/card_like/card_like_" + "wan1" + ".png",
            "214": "img/jiyili/card_like/card_like_" + "wan2" + ".png",

        }
    },

    start () {

    },

    /**
     * 显示背面
     */
    showBack: function() {
        var sp = this.node.getComponent(cc.Sprite);
        cc.log("ddd", sp.spriteFrame)
        let url = "img/jiyili/card_bg/bg_back.png";
        cc.url.raw(url)
        let nowScaleX = this.node.getScaleX();
        let nowScaleY = this.node.getScaleY();
        let action1 = cc.scaleTo(0.75, 0, nowScaleY);
        let action2 = cc.scaleTo(0.75, nowScaleX, nowScaleY);
        let action3 = cc.sequence(action1, action2);
        this.node.runAction(action3);
        this.scheduleOnce(function() {
            sp.spriteFrame.setTexture(cc.url.raw(url));
        }, 0.75);
    },

    /**
     * 显示正面
     */
    showFace: function() {
        var sp = this.node.getComponent(cc.Sprite);
        let url = this.num2res[""+this.value];
        cc.url.raw(url)
        cc.log("---", url);
        let nowScaleX = this.node.getScaleX();
        let nowScaleY = this.node.getScaleY();
        let action1 = cc.scaleTo(0.75, 0, nowScaleY);
        let action2 = cc.scaleTo(0.75, nowScaleX, nowScaleY);
        let action3 = cc.sequence(action1, action2);
        this.node.runAction(action3);
        this.scheduleOnce(function() {
            sp.spriteFrame.setTexture(cc.url.raw(url));
        }, 0.75);
    },

    /**
     * 值设置
     */
    setVal: function(vl) {
        this.value = vl;
    },

    getVal: function() {
        return this.value
    }
    // update (dt) {},
});
