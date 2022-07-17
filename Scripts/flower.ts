// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameMgr from "./GameMgr";
import player from "./player";
const {ccclass, property} = cc._decorator;

@ccclass
export default class flower extends cc.Component {

 
    @property(cc.Prefab)
    private anim = null;
   

    @property(GameMgr)
    gameMgr: GameMgr = null;
    @property(player)
    player: player = null;
    @property({type:cc.AudioClip})
    stompSound: cc.AudioClip = null;
    //private onGround: boolean = false;

    //private toLimit: boolean = false;

    //@property
    	
    
 

    // LIFE-CYCLE CALLBACKS:
    


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown ,this)
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_UP, this.OnKeyUP ,this)
        this.anim = this.getComponent(cc.Animation);
        
        this.gameMgr = cc.find("Canvas/GameMgr").getComponent(GameMgr);

    }
    

    start () {
        let action =cc.repeatForever(    cc.sequence(   cc.moveBy(2,0,100),cc.delayTime(1.8), cc.moveBy(2,0,-100)     )    )  ;
        this.node.runAction(action);
        this.anim.play("flower_move").wrapMode = cc.WrapMode.Loop;
        this.anim.play("flower_move").wrapMode.repeatCount = Infinity;

    }

    
    
   

    update (dt) {
    
    }

    onBeginContact(contact, self, other){
        if(other.node.name=="player"){
            
            if(!this.player.isitbig()){
                this.gameMgr.updateLife(-1);
            }else{
                let action =cc.scaleBy(2,0.5,0.5)  ;
                other.node.runAction(action);
                // this.player.setsmall();
                this.gameMgr.updateScore(500);
                cc.audioEngine.playEffect(this.stompSound,false);
                this.node.destroy();
                
            }
          
        }
        //cc.log("test");
        
        //else if( other.node.name == "ground"  ){
        //     this.onGround = true;
        // }
    }
    onPreSolve(contact, self, other){
        if(other.node.name=="player"){
            
            this.player.setsmall();
          
        }
        //cc.log("test");
        
        //else if( other.node.name == "ground"  ){
        //     this.onGround = true;
        // }
    }
}

