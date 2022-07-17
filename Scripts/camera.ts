// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        Player_Node: cc.Node,



    },

   update (dt){

        let target_pos = this.Player_Node.getPosition();
        
        target_pos.y=cc.misc.clampf(target_pos.y,0,320);
        
        let current_pos = this.node.getPosition();
        current_pos.lerp( target_pos, 0.01, current_pos );
        
        this.node.setPosition(current_pos);
   }









});
