// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameMgr from "./GameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class win extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(GameMgr)
    gameMgr: GameMgr = null;

    // LIFE-CYCLE CALLBACKS:

   // onLoad () {this.gameMgr = cc.find("Canvas/GameMgr").getComponent(GameMgr);}

    start () {

    }
    onPreSolve(contact, self, other){
        if( other.node.name == "player"  ){
            this.gameMgr.gameEnd();
        }
        
    }
    // update (dt) {}
}
