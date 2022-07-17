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
export default class goomba extends cc.Component {

 
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
        let action =cc.repeatForever(    cc.sequence(   cc.moveBy(0.7,0,180), cc.moveBy(0.7,0,-180)     ));//.easing(cc.easeInOut(0.5))   );
        this.node.runAction(action);
        this.anim.play("goomba_fly").wrapMode = cc.WrapMode.Loop;
        this.anim.play("goomba_fly").wrapMode.repeatCount = Infinity;
       

    }

    
    
   

    update (dt) {
    
    }

    onBeginContact(contact, self, other){
        if(other.node.name=="player"){
            if( contact.getWorldManifold().normal.y==1 && contact.getWorldManifold().normal.x == 0 ){
                //this.player.setjump();
                this.gameMgr.updateScore(300);
                cc.audioEngine.playEffect(this.stompSound,false);
                this.node.destroy();
            }else{
                if(!this.player.isitbig()){
                    this.gameMgr.updateLife(-1);
                }else{
                    let action =cc.scaleBy(2,0.5,0.5)  ;
                    other.node.runAction(action);
                    this.gameMgr.updateScore(300);
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
}

