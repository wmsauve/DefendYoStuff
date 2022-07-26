import PlayerController from "Assets/Components/ParentComponents/PlayerController.re";
import { Object3D } from "three";

export default class Player {

  private _playerController: PlayerController;
  
  /**
   * In the default case, this is the GameModeHandler object3d.
   * 
   * In the case a child player controller class is included,
   * this is that object instantiated.
   */
  private _controllerContainer: Object3D;

  private _castle: Object3D;


  public SetControllerComponents(controller: PlayerController, container: Object3D, castle: Object3D){
    this._playerController = controller;
    this._controllerContainer = container;
    this._castle = castle;
  }
}
