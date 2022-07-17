// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Player from "./player";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {

    
    @property(cc.Node)
    current_player_name: cc.Node = null;

    @property(cc.Node)
    record: cc.Node = null;


    @property(cc.Node)
    wall: cc.Node = null;
 
    @property(cc.Node)
    upperBound: cc.Node = null;
 
    @property(cc.Node)
    lowerBound: cc.Node = null;
 
    @property(Player)
    player: Player = null;
 
 
    @property(cc.Node)
    startIcon: cc.Node = null;
 
    @property(cc.Node)
    pauseIcon: cc.Node = null;

    @property(cc.Node)
    timeNode: cc.Node = null;
 
 
    @property(cc.Node)
    scoreNode: cc.Node = null;
 
    @property(cc.Node)
    highestScoreNode: cc.Node = null;

    @property(cc.Node)
    lifeNode: cc.Node = null;
 
   
 
    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
 
    private time: number = 60;
    private score: number = 0;
 
    private highestScore: number = 0;
 
    private scoreCount;
 
    private pause: boolean = false;
 
    private playerLife: number = 3;
    mapnum: number ;
    private playernow: string ;
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    returnscore(){
        return this.score;
    }

    onLoad()
    {
       
        firebase.database().ref("/map").once('value',e=>{
            this.mapnum = e.val().now;
            if(this.mapnum==1){
                cc.log("hi tihsi is map 1");
                firebase.database().ref("/status1").once('value',e=>{
                    this.record.getComponent(cc.Label).string = ("player:  ")+e.val().player.toString()+("   ")+("life: ")+e.val().life.toString()+(" score: ")+e.val().score.toString()+(" time: ")+e.val().time.toString();
                });
                
            }else if(this.mapnum==2){
                cc.log("hi tihsi is map 2");
                firebase.database().ref("/status2").once('value',e=>{
                    this.record.getComponent(cc.Label).string =("player:  ")+e.val().player.toString()+"   "+ ("life: ")+e.val().life.toString()+(" score: ")+e.val().score.toString()+(" time: ")+e.val().time.toString();
                });
    
            }
            
        });
        
        
        
    }
 
    start () {
        
        cc.audioEngine.playMusic(this.bgm, true);
        firebase.database().ref("/name").once('value',e=>{
            if(e.val().user){
                cc.log("player name:  ",e.val().user)
                this.current_player_name.getComponent(cc.Label).string =(e.val().user).toString();
                this.playernow = (e.val().user).toString();
            
            }
        });

        
      
        
        

        // firebase.database().ref("/name").once('value',e=>{
        //     if(e.val().user){
        //         cc.log("player name:  ",e.val().user)
        //         this.current_player_name.getComponent(cc.Label).string =(e.val().user).toString();
        //         this.playernow = (e.val().user).toString();
            
        //     }
        // });

        // firebase.database().ref("/map").once('value',e=>{
        //     this.mapnum = e.val().now;
        //     cc.log("mappppppppppp:   ",this.mapnum);
        // });
        
        
        // if(this.mapnum==1){
        //     cc.log("hi tihsi is map 1");
        //     firebase.database().ref("/status1").once('value',e=>{
        //         this.record.getComponent(cc.Label).string = ("player:  ")+e.val().player.toString()+("   ")+("life: ")+e.val().life.toString()+(" score: ")+e.val().score.toString()+(" time: ")+e.val().time.toString();
        //     });
            
        // }else if(this.mapnum==2){
        //     firebase.database().ref("/status2").once('value',e=>{
        //         this.record.getComponent(cc.Label).string =("player:  ")+e.val().player.toString()+"   "+ ("life: ")+e.val().life.toString()+(" score: ")+e.val().score.toString()+(" time: ")+e.val().time.toString();
        //     });

        // }
        

        // this.current_player_name.getComponent(cc.Label).string ="";
        // console.log("user information:       ",firebase.auth().currentUser);
        // console.log("name:       ",firebase.auth().currentUser.displayName);
        
        this.playerLife=3;
        this.score = 0;
        this.time = 60;
        this.updateScore(0);
        //this.updateHighestScore(0);
        this.scoreCount = ()=>{ this.updateScore(this.score); };
        this.scoreCount();
        this.schedule(function(){this.updateTime(1);},1);
      
       
    }
    updateTime(t: number){
        this.time -= 1;
        this.timeNode.getComponent(cc.Label).string = this.time.toString();
        if(this.time==0)    this.gameOver(); 
    }
    
    updateHighestScore(score: number)
    {
       
        this.highestScore = score;
        this.highestScoreNode.getComponent(cc.Label).string = this.highestScore.toString();
    }
 
    updateScore(score: number)
    {
        
        this.score += score;
        this.scoreNode.getComponent(cc.Label).string =  this.score.toString();
        
        
    }
 
    updateLife(num: number)
    {
        //cc.log("life+ ",num);
        

        // if(num<0){
        //     let action1 = cc.callFunc( ()=>{this.player.node.active = false;},this);
        //     let action2 = cc.delayTime(2);
        //     let action3 = cc.callFunc( ()=>{this.player.node.active = true;},this);
        //     let action4 = cc.callFunc( ()=>{this.player.reborn();},this);

        //     this.player.node.runAction( cc.sequence(action1, action2,action3,action4));

        // }
       
            
           
           
       
        this.playerLife += num;
        this.playerLife = Math.min(Math.max(this.playerLife, 0), 3);
        this.lifeNode.getComponent(cc.Label).string =  this.playerLife.toString();
        if(this.playerLife == 0){
        
        
            this.gameOver();
        }
            
        
       
        
            
    }
 
    gameStart()
    {
        this.startIcon.active = false;
 
        if(this.score > this.highestScore)  this.updateHighestScore(this.score);
        this.updateScore(0);
        this.updateLife(3);
        
 
        
        
 
        
        this.schedule(this.scoreCount, 2);
 
        cc.audioEngine.playMusic(this.bgm, true);
    }
 
    gamePause()
    {
        if(this.pause)
            this.pause = false;
        else
            this.pause = true;
        if(this.pause)
        {
            this.pauseIcon.active = true;
            this.scheduleOnce(()=>{
                cc.game.pause();
            }, 0.1);
        }
        else
        {
            this.pauseIcon.active = false;
            cc.game.resume();
        }
    }
 
    gameOver()
    {
        
    
        this.player.node.active = false;
        this.unschedule(this.scoreCount);
 
        //this.startIcon.active = true;
        cc.audioEngine.pauseAllEffects();
        cc.audioEngine.stopMusic();

        cc.audioEngine.stop;
        cc.director.loadScene("lose");
        console.log("before database");
        if(this.mapnum==1){
            firebase.database().ref("/status1").set({
                life: 0,
                score: this.score,
                time: 60-this.time,
                player: this.playernow
            })
        }else if(this.mapnum==2){
            firebase.database().ref("/status2").set({
                life: 0,
                score: this.score,
                time: 60-this.time,
                player: this.playernow
            })

        }
        
        
        
        

    }
 
    gameEnd()
    {   
        this.player.node.active = false;
        this.unschedule(this.scoreCount);
 
        //this.startIcon.active = true;
        cc.audioEngine.pauseAllEffects();
        cc.audioEngine.stopMusic();

        cc.audioEngine.stop;

     
        if(this.mapnum==1){
            firebase.database().ref("/status1").set({
                life: this.playerLife,
                score: this.score,
                time: 60-this.time,
                player: this.playernow
            })
        }else if(this.mapnum==2){
            firebase.database().ref("/status2").set({
                life: this.playerLife,
                score: this.score,
                time: 60-this.time,
                player: this.playernow
            })

        }
        cc.director.loadScene("win");
        
        
    }

    // update (dt) {}
}
