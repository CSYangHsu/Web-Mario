# Web-Mario
A “Mario style game” by Cocos Creator and Firebase for database.   
![image](https://user-images.githubusercontent.com/86723888/179404131-d080b4b6-326e-4ee7-8473-4ce7da333b88.png)  
demo: https://mario-35737.web.app/  
  
  
  
  
## OUTLINE
* [Home-Page](#Home-Page)
* [MENU](#MENU)
* [GAME](#GAME)
* [ENDING](#ENDING)
  
  
### Home-Page
![image](https://user-images.githubusercontent.com/86723888/179410797-fab614e4-fede-473d-bf8e-fda2d0ebccab.png)  
Create / Login account with e-mail, password, and username.
  
   
### MENU
There are two stages for players.  
![image](https://user-images.githubusercontent.com/86723888/179410905-4e552492-dd3f-4834-8806-d50fceef0e57.png)
  
  

### GAME
![image](https://user-images.githubusercontent.com/86723888/179411008-cbfb4faa-0afa-4dae-895b-d9ce187c4a5e.png)
* The game would be limited in 1 minute and 3 lives.
* Just like the classic Mario game, player can kill little monsters by stomping on their heads ( except PAKKUN FLOWERS ).
* There are also SUPER MUSHROOMs inside the item boxes and coins inside coin boxes.
* At the top left of the scene, there are multiple things recorded:  
1. Current player name
2. The last game record
3. Remaining time
4. Current life and score  
![image](https://user-images.githubusercontent.com/86723888/179411359-ccee2a91-3e4a-43e9-9c34-f20ac20ca4d9.png)
  
  
  
  
  
  
* Design of database  
  
![image](https://user-images.githubusercontent.com/86723888/179411896-4eb23c20-0f46-4f0a-9921-283eae8b4c87.png)
  
  
  
  
### ENDING
If you are still alive and reached the endpoint in 60 secs, you win.  
![image](https://user-images.githubusercontent.com/86723888/179414911-d89f6df7-0148-4484-8f4c-32ac9dbfe979.png)
![image](https://user-images.githubusercontent.com/86723888/179414178-15ebc2fb-7944-467e-a5d5-d86a12b5d5be.png)  
The win/lose scene would automatically go back to the Home-Page in 10 secs.

 
  
  

