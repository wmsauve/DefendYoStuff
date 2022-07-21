import PlayerController from 'Assets/Components/ParentComponents/PlayerController.re';
import * as RE from 'rogue-engine';
import { Object3D } from 'three';
import PC_MainMenu from '../PC_MainMenu.re';

export default class GameMode extends RE.Component {

  @RE.props.prefab() _pcPrefab: RE.Prefab;
  private _playerController: PlayerController;
  
  /**
   * In the default case, this is the GameModeHandler object3d.
   * 
   * In the case a child player controller class is included,
   * this is that object instantiated.
   */
  private _controllerContainer: Object3D;

  start() {
    RE.Debug.log("Initializing GameMode.");
    if(!this._pcPrefab){

      RE.addComponent(new PlayerController("playerController", this.object3d));
      this._playerController = RE.getComponent(PlayerController, this.object3d) as PlayerController;
      this._controllerContainer = this.object3d;

    }
    else{
      //How do we get the PC_Mainmenu
      this._controllerContainer = this._pcPrefab.instantiate();
      this._playerController = RE.getComponent(PlayerController, this.object3d) as PlayerController;
    }
  }

}

RE.registerComponent(GameMode);
