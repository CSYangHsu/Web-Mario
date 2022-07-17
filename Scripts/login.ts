// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;


@ccclass
export default class login extends cc.Component {
 
    @property(cc.Node)
    Account: cc.Node = null;
 
    @property(cc.Node)
    Password: cc.Node = null;
 
    @property(cc.Node)
    Name: cc.Node = null;

    @property(cc.Node)
    createbutton: cc.Node = null;
    

    @property(cc.Node)
    signinbutton: cc.Node = null;

    @property(cc.Node)
    startIcon: cc.Node = null;
 
    start () {
       

        // let signinbtn = new cc.Component.EventHandler();
        // signinbtn.target = this.node;
        // signinbtn.component = "login";
        // signinbtn.handler = "signinaccount";
       
        // this.signinbutton.getComponent(cc.Button).clickEvents.push(signinbtn);

        // let createbtn = new cc.Component.EventHandler();
        // createbtn.target = this.node;
        // createbtn.component = "login";
        // createbtn.handler = "createaccount";
       
        // this.createbutton.getComponent(cc.Button).clickEvents.push(createbtn);

        
    }
    setError(flag: boolean){
        
        if(flag){
            alert("FAIL!");
            this.Password.getComponent(cc.EditBox).string="";
            this.Account.getComponent(cc.EditBox).string="";
            this.Name.getComponent(cc.EditBox).string="";
        }
        else    alert("Success!")  
        
        
        
    };
    createaccount(){
        // cc.director.loadScene("main");
        
        let password = this.Password.getComponent(cc.EditBox).string;
        let account = this.Account.getComponent(cc.EditBox).string;
        let name = this.Name.getComponent(cc.EditBox).string;

        
      

        // alert("teset");
        if (name == '' || account == '' || password == '') {
            this.setError(true);
        } else {
           
            firebase.auth().createUserWithEmailAndPassword(account, password).then(() => {
                // Signed in 
                
                var user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: name,
                });
                
                // console.log(user);
                this.setError(false);

                
                
                
                // ...
            }).catch(e => {this.setError(true);});
          
            
           
        }

       //-----------signin 
        
        
      

        
    }
    signinaccount(){
        // cc.director.loadScene("main");
        cc.log("we are signin");
        
        let password = this.Password.getComponent(cc.EditBox).string;
        let account = this.Account.getComponent(cc.EditBox).string;
        let name = this.Name.getComponent(cc.EditBox).string;
        // alert("teset");
        if (name == '' || account == '' || password == '') {
            this.setError(true);
        } else {
           
            firebase.auth().signInWithEmailAndPassword(account, password).then(() => {
                // Signed in 
                
                var user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: name,
                });
                
                // console.log(user);
                this.setError(false);
                firebase.database().ref("/name").set({
                    user: name
                })
                cc.director.loadScene("menu");
                
                
                // ...
            }).catch(e => {this.setError(true);});
          
            
           
        }
        
    }
   
}