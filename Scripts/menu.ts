// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

	
@ccclass
export default class menu extends cc.Component {
    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
 
  
 
    start () {
        cc.audioEngine.playMusic(this.bgm, true);
        let startbtn1 = new cc.Component.EventHandler();
        startbtn1.target = this.node;
        startbtn1.component = "menu";
        startbtn1.handler = "loadGameScene1";

        let startbtn2 = new cc.Component.EventHandler();
        startbtn2.target = this.node;
        startbtn2.component = "menu";
        startbtn2.handler = "loadGameScene2";
 
        cc.find("Canvas/StartButton").getComponent(cc.Button).clickEvents.push(startbtn1);
        cc.find("Canvas/StartButton2").getComponent(cc.Button).clickEvents.push(startbtn2);
    }
 
    loadGameScene1(){
    
        firebase.database().ref("/map").set({
            now:1
        })
        cc.director.loadScene("main1");
        
        
    }
    loadGameScene2(){
        firebase.database().ref("/map").set({
            now:2
        })
        cc.director.loadScene("main2");
        
    }
   
}