import * as RE from 'rogue-engine';
import GameInstance from './GameInstance.re';

export default class TestComp extends RE.Component {
  awake() {
    GameInstance.InitializeGameInstance();
  }


  update(): void {
    if(RE.Input.keyboard.getKeyDown("KeyA")){
      RE.App.loadScene("GameScene");
    }
  }
  private ReturnTrueOnScene(scene: number){
    if(RE.App.scenes[scene].uuid === RE.App.currentScene.uuid){ return true }
    return false
  }
}

RE.registerComponent(TestComp);
