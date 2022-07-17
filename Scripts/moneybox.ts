// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GameMgr from "./GameMgr";
@ccclass
export default class moneybox extends cc.Component {

    
    @property(cc.Prefab)
    private anim = null;
    private coin_aim = null;
    private coin_exit = true;
   
    @property(GameMgr)
    gameMgr: GameMgr = null;

    @property(cc.Node)
    coin: cc.Node = null;
    
    
    
    //private onGround: boolean = false;

    //private toLimit: boolean = false;

    //@property
    	
    
 

    // LIFE-CYCLE CALLBACKS:
    


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown ,this)
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_UP, this.OnKeyUP ,this)
        this.anim = this.getComponent(cc.Animation);
        this.coin_aim = this.coin.getComponent(cc.Animation);
        

    }
    

    start () {
       
        //let action =cc.repeatForever(    cc.sequence(   cc.moveBy(2,0,100), cc.moveBy(2,0,-100)     )    )  ;
        //this.node.runAction(action);
        this.anim.play("moneybox_shine").wrapMode = cc.WrapMode.Loop;
        this.anim.play("moneybox_shine").wrapMode.repeatCount = Infinity;
        //let coin = this.node.getChildByName("coin");
        //coin.runAction(cc.hide());
        this.coin.active = false;
        
        this.coin_exit = true;


    }

    
    
   

    update (dt) {
    
    }

    onBeginContact(contact, self, other){
        
        //else if( other.node.name == "ground"  ){
        //     this.onGround = true;
        // }
        if( other.node.name == "player"&& this.coin_exit &&contact.getWorldManifold().normal.y==-1 && contact.getWorldManifold().normal.x == 0 ){
            
            this.anim.stop("moneybox_shine");//.wrapMode.repeatCount = 1;
            // let coin = this.node.getChildByName("coin");
            //coin.runAction(cc.show())
            this.coin.active=true;
            let action =     cc.moveBy(0.2,0,30)        ;
            this.coin.runAction(action);
            this.coin_aim.play("coin_flip");
            this.coin_aim.play("coin_flip").on("finished",function(){this.coin.destroy();this.gameMgr.updateScore(150);this.coin.active=false;},this);
            this.coin_exit = false;
            //coin.runAction(cc.hide());
            //update(money)
            
            
        }
    }
   
}
