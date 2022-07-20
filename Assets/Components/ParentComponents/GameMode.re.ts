import PlayerController from 'Assets/Components/ParentComponents/PlayerController.re';
import * as RE from 'rogue-engine';
import { Object3D } from 'three';
import PC_MainMenu from '../PC_MainMenu.re';

export default class GameMode extends RE.Component {

  @RE.props.prefab() _pcPrefab: Object3D;
  private _playerController: PlayerController;

  awake() {
    RE.Debug.log('Initializing GameMode');
    if(!this._pcPrefab){

      RE.addComponent(new PlayerController("playerController", this.object3d));
      this._playerController = RE.getComponent(PlayerController, this.object3d) as PlayerController;
    }
    else{
      //How do we get the PC_Mainmenu
      this._playerController = RE.getComponent(PC_MainMenu, this._pcPrefab) as PC_MainMenu;
      RE.addComponent(this._playerController);
      if(this._playerController){
        RE.Debug.log("there is a player controller here");
      }
      else{
        RE.Debug.log("no player controller here");
      }
    }
  }

}

RE.registerComponent(GameMode);
