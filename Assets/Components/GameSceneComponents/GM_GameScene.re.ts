import Player from 'Assets/Classes/ConnectedPlayer/Player';
import { CameraBoundary, WorldBoundary } from 'Assets/Classes/Utility/CustomTypes';
import GameWorldConfig from 'Assets/Classes/Utility/GameWorldConfig';
import GeneralUtility from 'Assets/Classes/Utility/GeneralUtility';
import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import * as RE from 'rogue-engine';
import { Camera, Object3D } from 'three';
import PlayerController from '../ParentComponents/PlayerController.re';

export default class GM_GameScene extends GameMode {

  private _config: GameWorldConfig;

  /**
   * If multiplayer is added, client logic related to a player should be tied to Player.
   * TODO: work on standalone versus client set up. Default to standalone for now with player being added in start.
   */
  private _connectedPlayers: Player[] = [];
  @RE.props.prefab() _castlePrefab: RE.Prefab;

  /**
   * These values are related to moving the camera in any given direction depending on where the mouse is positioned.
   */
  @RE.props.num() _rightBoundary;
  @RE.props.num() _topBoundary;
  @RE.props.num() _botBoundary;
  @RE.props.num() _leftBoundary;

  @RE.props.num() _worldSizeX;
  @RE.props.num() _worldSizeZ;


  start() {
    this.InitializePlayers();
    this.InitializeComponentValues();
    super.start();
  }

  update() {

  }

  private InitializePlayers(){
    let _standAlonePlayer = new Player();
    this._connectedPlayers.push(_standAlonePlayer);


    for (let i = 0; i < this._connectedPlayers.length; i++) {

      let _container: Object3D;
      let _playerController: PlayerController;
      let _castle: Object3D;

      RE.Debug.log("Adding player: ");

      //Player controller
      if(!this._pcPrefab){
        _container = new Object3D();
        RE.App.currentScene.add(_container);

        RE.addComponent(new PlayerController("playerController", _container));
        _playerController = RE.getComponent(PlayerController, _container) as PlayerController;
  
      }
      else{
        _container = this._pcPrefab.instantiate();
        _playerController = RE.getComponent(PlayerController, this.object3d) as PlayerController;
      }

      RE.Debug.log("PlayerController added for player: ");

      //Castle related - Should create a default castle for no castle placed. Too lazy right now.
      _castle = this._castlePrefab.instantiate();

      RE.Debug.log("Castle added for player: ");
      this._connectedPlayers[i].SetControllerComponents(_playerController, _container, _castle);
      
    }
  }

  private InitializeComponentValues(){
    const _cam = RE.App.currentScene.getObjectByName("Main Camera") as Camera;

    let _tempWorldConfig: WorldBoundary = {  
      leftX: _cam.position.x - this._worldSizeX,
      rightX:_cam.position.x + this._worldSizeX,
      forwardZ: _cam.position.z - this._worldSizeZ,
      backZ: _cam.position.z + this._worldSizeZ,
    }

    let _tempBoundConfig: CameraBoundary = {
      left: GeneralUtility.CapValue(-1, 0, this._leftBoundary),
      right: GeneralUtility.CapValue(0, 1, this._rightBoundary),
      top: GeneralUtility.CapValue(0, 1, this._topBoundary),
      bot: GeneralUtility.CapValue(-1, 0, this._botBoundary),
    }

    this._config = new GameWorldConfig(_tempBoundConfig, _tempWorldConfig);

  }

  public GetConfig(): GameWorldConfig{
    return this._config;
  }
}

RE.registerComponent(GM_GameScene);