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
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        sp_welcome: {
            default: null,
            type: cc.Prefab
        },

        card_entity: {
            default: null,
            type: cc.Prefab
        },

        cards: {
            default: [],
            type: [cc.Node]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cardRightVal = [1, 2 , 3, 4];
        this.cardWrongVal = [101, 102, 201, 211];
    },

    start () {
        cc.log("welcome 记忆力");
        //1. 添加欢迎界面
        let welcome = cc.instantiate(this.sp_welcome);
        this.node.addChild(welcome);
        
        // 导入游戏
        this.loadCards();
    },

    /**
     * 初始化游戏，重新布置界面
     */
    loadCards: function() {
        //2. 添加4张正确卡牌
        let i = 0;
        for (; i < 4; i++) {
            this.cards[i] = cc.instantiate(this.card_entity);
            this.node.addChild(this.cards[i]);
            this.setCardValue(this.cards[i], 206);
            this.cards[i].setScale(0.4, 0.4);
            this.showCardFace(this.cards[i]);
            this.cardAddSprite(this.cards[i]);
        }
        this.cards[0].setPosition(-150, 250);
        this.cards[1].setPosition(-150, -170);
        this.cards[2].setPosition(170, 250);
        this.cards[3].setPosition(170, -170);

        //3. 过4秒后，卡牌翻转，并合并为一张卡牌
        //4. 卡牌分发成8张，显示背面
        //5. 卡牌翻转, 显示前景
        //6. 开始计时 1分钟结束
        //7. 翻错，提示， 重复2-7
        //8. 翻对，继续下一步
        //9. 全部成功， 提示， 游戏重新开始
    },

    /**
     * 设置卡牌值
     */
    setCardValue: function(card, val) {
        var func = card.getComponent('card_entity');
        func.setVal(val);
    },

    /**
     * 显示背面
     */
    showCardBack: function(card) {
        var func = card.getComponent('card_entity');
        func.showBack();
    },

    /**
     * 显示正面
     */
    showCardFace: function(card) {
        var func = card.getComponent('card_entity');
        func.showFace();
    },
    
    /**
     * 增加sprite子节点
     */
    cardAddSprite: function(card) {
        let sp = card.addComponent(cc.Sprite);
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw("img/jiyili/card_bg/bg_back.png"));
    }

    // update (dt) {},
});
