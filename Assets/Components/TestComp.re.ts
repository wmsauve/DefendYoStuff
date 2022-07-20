import * as RE from 'rogue-engine';
import GameInstance from '../Classes/ParentClasses/GameInstance';
import SaveGameManager from '../Classes/ParentClasses/SaveGameManager';

export default class TestComp extends RE.Component {
  awake() {
    GameInstance.InitializeGameInstance();
  }


  update(): void {

    if(RE.Input.keyboard.getKeyDown("KeyA")){
      RE.App.loadScene("GameScene");
    }

    if(RE.Input.keyboard.getKeyDown("KeyD")){
      // const myObject = {
      //   name: "john",
      //   age: 32,
      //   gender: "male",
      //   profession: "teacher"
      // }
      // window.localStorage.setItem('savedFile', JSON.stringify(myObject));
      
    }

    if(RE.Input.keyboard.getKeyDown("KeyS")){
      //SaveGameManager.SaveGame();
    }
  }
  private ReturnTrueOnScene(scene: number){
    if(RE.App.scenes[scene].uuid === RE.App.currentScene.uuid){ return true }
    return false
  }
}

RE.registerComponent(TestComp);
