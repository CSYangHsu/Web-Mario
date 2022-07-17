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
export default class turtle extends cc.Component {

 
    @property(cc.Prefab)
   
    private anim = null;
   
    
    //private onGround: boolean = false;

    //private toLimit: boolean = false;

    //@property
    @property(GameMgr)
    gameMgr: GameMgr = null;
    @property({type:cc.AudioClip})
    stompSound: cc.AudioClip = null;
    @property(player)
    player: player = null;
    
    
 

    // LIFE-CYCLE CALLBACKS:
    


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown ,this)
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_UP, this.OnKeyUP ,this)
        this.anim = this.getComponent(cc.Animation);

    }
    

    start () {
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
        this.anim.play("turtle_running").wrapMode = cc.WrapMode.Loop;
        this.anim.play("turtle_running").wrapMode.repeatCount = Infinity;
    
    }

    

   

    // update (dt) {
    //     cc.log(this.node.getComponent(cc.RigidBody).linearVelocity);
    // }

    onBeginContact(contact, self, other){
        if(other.node.name=="player"){
            if( contact.getWorldManifold().normal.y==1 && contact.getWorldManifold().normal.x == 0 ){
                //this.player.setjump();
                this.gameMgr.updateScore(100);
                cc.audioEngine.playEffect(this.stompSound,false);
                this.node.destroy();
            }else{
                if(!this.player.isitbig()){
                    this.gameMgr.updateLife(-1);
                }else{
                    let action =cc.scaleBy(2,0.5,0.5)  ;
                    other.node.runAction(action);
                    this.gameMgr.updateScore(100);
                    this.player.setsmall();
                    cc.audioEngine.playEffect(this.stompSound,false);
                    this.node.destroy();
                    
                }
            }
        }
        //cc.log("test");
        
        //else if( other.node.name == "ground"  ){
        //     this.onGround = true;
        // }
    }

    onPreSolve(contact, self, other){
        if( other.node.name == "block"&&(contact.getWorldManifold().normal.y==0 &&(contact.getWorldManifold().normal.x == 1||contact.getWorldManifold().normal.x == -1))  ){
            this.node.scaleX *= -1;
            if(this.node.getComponent(cc.RigidBody).linearVelocity.x==200){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-200,0);
            }else if(this.node.getComponent(cc.RigidBody).linearVelocity.x==-200){
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(200,0);
            }
          
        
        }
    }
}
