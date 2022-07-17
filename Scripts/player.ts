// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import GameMgr from "./GameMgr";
const {ccclass, property} = cc._decorator;



@ccclass
export default class player extends cc.Component {


    @property(GameMgr)
    gameMgr: GameMgr = null;

    @property({type:cc.AudioClip})
    dieSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    jumpSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    mushroomSound: cc.AudioClip = null;

    



    @property(cc.Prefab)
    isbig: boolean = false;
    
    private playerSpeed: number = 0;

    private aDown: boolean = false; // key for player to go left
 
    private dDown: boolean = false; // key for player to go right
 
    private sDown: boolean = false; // key for player to jump
    dieflag : boolean = false;
    
    onGround: boolean = false;
    canJump: boolean = true;
    // private jumpInterval: number = 0.4;
    anim = null;


    @property(cc.SpriteFrame)
    dieSprite: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    standSprite: cc.SpriteFrame = null;
   // private toLimit: boolean = false;
    
    //@property
    	
    
 

    // LIFE-CYCLE CALLBACKS:
    


    onLoad () {
        
        
       
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on( cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown ,this)
        cc.systemEvent.on( cc.SystemEvent.EventType.KEY_UP, this.OnKeyUP ,this)
        this.anim = this.getComponent(cc.Animation);

       

    }
    OnKeyDown(event){
        if( (event.keyCode == cc.macro.KEY.a||event.keyCode == cc.macro.KEY.left)&&!this.dieflag ){
            this.aDown = true;
            this.dDown = false;
           

        }else if( (event.keyCode == cc.macro.KEY.d||event.keyCode == cc.macro.KEY.right) &&!this.dieflag){
            this.dDown = true;
            this.aDown = false;
            
        }else if( (event.keyCode == cc.macro.KEY.w||event.keyCode == cc.macro.KEY.up)&&!this.dieflag ){
            this.sDown = true;
        }

    }

    OnKeyUP(event){
        if((event.keyCode == cc.macro.KEY.a||event.keyCode == cc.macro.KEY.left)){
          
            this.aDown = false;
            if(this.anim.getAnimationState("player_running").isPlaying) {
                this.anim.stop("player_running");
                //this.anim.play("player_stand");
                this.changeSprite(this.standSprite);
              
            }

        }else if((event.keyCode == cc.macro.KEY.d||event.keyCode == cc.macro.KEY.right) ){
         
            this.dDown = false;
            if(this.anim.getAnimationState("player_running").isPlaying) {
                this.anim.stop("player_running");
                //this.anim.play("player_stand");
                this.changeSprite(this.standSprite);
            }
            
            
        }else if((event.keyCode == cc.macro.KEY.w||event.keyCode == cc.macro.KEY.up) ){
            this.sDown = false;
            this.canJump = true;
            //this.onGround = false;
            
        }

    }

    start () {

    }

    private playerMovement(dt){
        this.playerSpeed = 0;
        if(this.sDown && this.onGround && this.canJump&&!this.dieflag){
            this.playerJump();
            if(this.anim.getAnimationState("player_running").isPlaying)    this.anim.stop("player_running");
            if(!this.anim.getAnimationState("player_jump").isPlaying) {this.anim.play("player_jump"); cc.audioEngine.playEffect(this.jumpSound,false);}
        }
        
        if(this.aDown&&!this.dieflag){
            this.playerSpeed = -300;
            this.node.scaleX = -1;
            if(!this.anim.getAnimationState("player_running").isPlaying&&!this.anim.getAnimationState("player_jump").isPlaying)    this.anim.play("player_running");
        }else if(this.dDown&&!this.dieflag){
            this.playerSpeed = 300;
            this.node.scaleX = 1;
            if(!this.anim.getAnimationState("player_running").isPlaying&&!this.anim.getAnimationState("player_jump").isPlaying)    this.anim.play("player_running");
                
        }
            
            

        
        this.node.x += this.playerSpeed * dt;

    }

    private playerJump(){
        //cc.log("player jump");
        this.canJump = false;
        //this.onGround=false;
        this.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,700);
        // this.scheduleOnce(function(){
        //     this.canJump = true;
        // },this.jumpInterval);
    
        
    }

    update (dt) {
        this.playerMovement(dt);
        //if(this.getComponent(cc.RigidBody).linearVelocity.y != 0)   this.onGround = false;

        
        
        
    }

    onBeginContact(contact, self, other){
        if(this.dieflag)   this.dieflag = false;
        this.onGround = true;

       

        if( other.node.name == "mushroom"  ){
            this.onGround = false;
            let action = cc.scaleBy(2,2,2)  ;
            if(!this.isbig){this.node.runAction(action);this.isbig = true;}  
            
            
        }else if( other.node.name == "flower"  ){
            this.player_hurt();
        }else if( other.node.name == "goomba" && (contact.getWorldManifold().normal.y!=-1 || contact.getWorldManifold().normal.x != 0) ){
            this.player_hurt();
        }else if( other.node.name == "turtle" && (contact.getWorldManifold().normal.y!=-1 || contact.getWorldManifold().normal.x != 0) ){
            this.player_hurt();
        }
        // else if( other.node.name == "under_bound"  ){
        //     this.player_hurt();
        // }
    }

    onPreSolve(contact, self, other){
        if( other.node.name == "under_bound"  ){
            let action =cc.scaleBy(2,0.5,0.5)  ;
            if(this.isbig)  this.node.runAction(action);
            //this.gameMgr.updateScore(300);
            this.setsmall();
            this.player_hurt();
            //cc.audioEngine.playEffect(this.stompSound,false);
            //this.node.destroy();
        }
        
    }
    

    onEndContact(contact, self, other){
        this.onGround = false;
    }
    playerDie()
    {
       
        cc.director.getPhysicsManager().enabled = false;
        cc.audioEngine.playEffect(this.dieSound,false);
        this.dieflag = true;
    }
    changeSprite(pic:cc.SpriteFrame) {
        // change sprite frame to the one specified by the property
        this.getComponent(cc.Sprite).spriteFrame = pic;
    }
   

    reborn(){
        
        this.playerDie();
        this.anim.stop();
        let action =  cc.sequence( cc.callFunc(()=>{this.getComponent(cc.Sprite).spriteFrame = this.dieSprite;},this),cc.callFunc(()=>{this.playerDie();},this),cc.delayTime(2),cc.moveTo(0,-134,0) ,cc.callFunc(()=>{cc.director.getPhysicsManager().enabled = true;this.getComponent(cc.Sprite).spriteFrame = this.standSprite;},this),cc.callFunc(()=>{this.onGround = false;
            this.dieflag = true;
            this.isbig = false;},this) )       ;
        this.node.runAction(action);
        
        
       
    }
    setjump(){
        this.canJump = true;
        this.onGround = true;
    }
    player_hurt(){
        
       
        if(!this.isbig){
            this.reborn();
        }
        // else{
        //     this.setsmall();
        // }
        //this.isbig = false;
        // this.changeSprite(this.dieSprite);
        // this.dieflag=true;
        
        
        // let action = cc.sequence( cc.callFunc(this.changeSprite,this,this.dieSprite) , cc.delayTime(2), cc.callFunc(this.reborn,this)     )  ;          

        // this.node.runAction(action);
            
        
    }
    isitbig(){
        return this.isbig;
    }
    setsmall(){
        this.isbig=false;
    }

    

    
    

    


    
    
}
