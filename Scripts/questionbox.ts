// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;
import GameMgr from "./GameMgr";
@ccclass
export default class quesionbox extends cc.Component {

    
    
    @property(cc.Prefab)
    private anim = null;
    private mushroom_aim = null;
    mushroom_exit : boolean = true;

    @property(cc.Node)
    mushroom: cc.Node = null;
   

    
    
    //private onGround: boolean = false;

    //private toLimit: boolean = false;

    //@property
    	
    
 

    // LIFE-CYCLE CALLBACKS:
    


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown ,this)
        //cc.systemEvent.on( cc.SystemEvent.EventType.KEY_UP, this.OnKeyUP ,this)
        this.anim = this.getComponent(cc.Animation);
        this.mushroom_aim= this.mushroom.getComponent(cc.Animation);
        

    }
    

    start () {
        //let action =cc.repeatForever(    cc.sequence(   cc.moveBy(2,0,100), cc.moveBy(2,0,-100)     )    )  ;
        //this.node.runAction(action);
        //this.anim.play("questionbox_shine").speed =0.5;
        this.anim.play("questionbox_shine").wrapMode = cc.WrapMode.Loop;
        this.anim.play("questionbox_shine").wrapMode.repeatCount = Infinity;
        // let mushroom = this.node.getChildByName("mushroom");
        // mushroom.runAction(cc.hide());
     
        this.mushroom.active = false;
        this.mushroom_exit = true;


    }

    
    
   

    update (dt) {
    
    }

    onBeginContact(contact, self, other){
        
        //else if( other.node.name == "ground"  ){
        //     this.onGround = true;
        // }
        if( other.node.name == "player"&& this.mushroom_exit&& contact.getWorldManifold().normal.y==-1 && contact.getWorldManifold().normal.x == 0 ){
            // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            // this.anim.play("turtle_running");
            // this.anim.play("turtle_die");
            // this.anim.play("turtle_die").wrapMode = cc.WrapMode.Loop;
            // this.anim.play("turtle_die").wrapMode.repeatCount = Infinity;
            
          
            this.anim.stop("questionbox_shine");//.wrapMode.repeatCount = 1;
            //let mushroom = this.mushroom;
            this.mushroom.active = true;
            this.mushroom.runAction(cc.show());
            let action =   cc.moveBy(0.2,0,20)  ;
        
            this.mushroom.runAction(action);
            let speed = Math.random();
            if(speed<0.5)    speed=100
            else    speed=-100;
            this.mushroom.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed,0);
            this.mushroom_exit=false;
            
            
            
        }
    }
}
