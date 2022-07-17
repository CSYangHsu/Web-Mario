// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameMgr from "./GameMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mushroom extends cc.Component {

   
    @property(cc.Prefab)
   
    private anim = null;
    existflag = false;
   

    @property({type:cc.AudioClip})
    mushroomSound: cc.AudioClip = null;

    @property(GameMgr)
    gameMgr: GameMgr = null;
    
    //private onGround: boolean = false;

    //private toLimit: boolean = false;

    //@property
    	
    
 

    // LIFE-CYCLE CALLBACKS:
    


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown ,this)
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_UP, this.OnKeyUP ,this)
        this.gameMgr = cc.find("Canvas/GameMgr").getComponent(GameMgr);
     

    }
    

    start () {
        // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
        // this.anim.play("turtle_running").wrapMode = cc.WrapMode.Loop;
        // this.anim.play("turtle_running").wrapMode.repeatCount = Infinity;
        //this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
        this.node.active=false;
    
    }
    setflag(){
        // this.existflag = true;
    }
    

   

    update (dt) {
        // if(this.existflag){
        //     this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
        // }
       
    }

    onBeginContact(contact, self, other){
        if( other.node.name == "leftBound"  ){
            this.node.scaleX = -1;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(200,0);
        }
        else if( other.node.name == "rightBound"  ){
            this.node.scaleX = 1;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
        }
        else if( other.node.name == "block"  ){
            this.node.scaleX *= -1;
            if(this.node.getComponent(cc.RigidBody).linearVelocity.x==200){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
            }else if(this.node.getComponent(cc.RigidBody).linearVelocity.x==-200){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(200,0);
            }
        
        }else  if( other.node.name == "player"  ){    
            this.gameMgr.updateScore(100);  
            
            cc.audioEngine.playEffect(this.mushroomSound,false);
            // let action = cc.scaleBy(2,2,2)  ;
            
            // if(!other.node.isbig)    cc.log("hi test:  false");
            // else     cc.log("hi test:  true");
            this.node.destroy();
        
        }
    }
}
