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
        entity: {
            default: null,
            type: cc.Prefab
        },

        partical: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("te");
        var newStar = cc.instantiate(this.entity);
        cc.log(newStar);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        var newStarFunc = newStar.getComponent('entity');
        newStarFunc.change();
        cc.log(newStar.x + " ," + newStar.y);
        
        
    },

    // update (dt) {},
});

/*
1. 取得其他节点
    node.getComponent('entity')
    node.getComponent(cc.Sprite);
2. 预制体生成新的资源
    var newStar = cc.instantiate(this.entity);
3. 调用预制体内部方法
    var newStarFunc = newStar.getComponent('entity');
    newStarFunc.change();
4. 更换图片
    let url = "img/ziti/ziti_bei.png";
    sp.spriteFrame.setTexture(cc.url.raw(url));
5. 定时器
    this.scheduleOnce(function() {
                sp.spriteFrame.setTexture(cc.url.raw(url));
    }, 0.5);
6. 粒子
    var myParticle = this.particle.getComponent(cc.ParticleSystem);
    if (myParticle.particleCount > 0) { // check if particle has fully plaed
        myParticle.stopSystem(); // stop particle system
    } else {
        myParticle.resetSystem(); // restart particle system
    }
7. 动态添加图片
    let node1 = new cc.Node('Sprite'); 
    let sp1 = node1.addComponent(cc.Sprite);
    sp1.spriteFrame = new cc.SpriteFrame(cc.url.raw("img/jiyili/card_right/card_right_bei.png"));
    node1.setPosition(0, 200);
    this.node.addChild(node1);
8. 禁用触摸以及隐藏
    node.active = false;
9. 单纯禁用触摸
    node.off(cc.Node.EventType.TOUCH_START);
*/