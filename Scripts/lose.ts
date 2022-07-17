// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class lose extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    private time: number = 7;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.audioEngine.pauseAllEffects();
        this.time = 7;
        cc.audioEngine.playMusic(this.bgm, true);


        // this.current_player_name.getComponent(cc.Label).string ="";
        // console.log("user information:       ",firebase.auth().currentUser);
        // console.log("name:       ",firebase.auth().currentUser.displayName);
       
        this.schedule(function(){this.updateTime();},1);
      
       
    }

    updateTime(){
        this.time-=1;
        if(this.time<=0){
           
            cc.audioEngine.stopMusic();
            cc.director.loadScene("login");
        } 
    }

    // update (dt) {}
}
