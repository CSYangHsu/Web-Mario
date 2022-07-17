// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameMgr from "./GameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';


    @property(GameMgr)
    gameMgr: GameMgr = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }
    start () {

    }
    onBeginContact(contact, self, other){
        if(other.node.name=="player"){
        
            this.gameMgr.updateLife(-1);
           
        }
        //cc.log("test");
        
        //else if( other.node.name == "ground"  ){
        //     this.onGround = true;
        // }
    }

    // update (dt) {}
}
