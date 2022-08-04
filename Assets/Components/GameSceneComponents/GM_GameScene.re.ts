import Player from 'Assets/Classes/ConnectedPlayer/Player';
import GameInstance from 'Assets/Classes/ParentClasses/GameInstance';
import { CameraBoundary, WorldBoundary } from 'Assets/Classes/Utility/CustomTypes';
import GameWorldConfig from 'Assets/Classes/Utility/GameWorldConfig';
import GeneralUtility, { ELogType } from 'Assets/Classes/Utility/GeneralUtility';
import { GE_onMyInitComplete } from 'Assets/Classes/Utility/GlobalEvents';
import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import * as RE from 'rogue-engine';
import { Camera, Object3D } from 'three';
import PlayerController from '../ParentComponents/PlayerController.re';
import ProjectilePrefabs from '../Utility/ProjectilePrefabs.re';

export default class GM_GameScene extends GameMode {

  private _config: GameWorldConfig;
  private _projectileHolder: ProjectilePrefabs;

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
    this.ListenForInitialization();
    
    
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
      GeneralUtility.LogWithType(ELogType.Initialize, "Adding player: " + GameInstance.getSavedGameManager().GetSavedGame()._username);

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
      GeneralUtility.LogWithType(ELogType.Initialize, "PlayerController added for player: " + GameInstance.getSavedGameManager().GetSavedGame()._username);

      //Castle related - Should create a default castle for no castle placed. Too lazy right now.
      _castle = this._castlePrefab.instantiate();

      GeneralUtility.LogWithType(ELogType.Initialize, "Castle added for player: " + GameInstance.getSavedGameManager().GetSavedGame()._username);
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


    for(let i = 0; i < this.object3d.children.length; i++){
      const _child = RE.getComponent(ProjectilePrefabs, this.object3d.children[i]) as ProjectilePrefabs;

      if(_child){
        this._projectileHolder = _child;
        break;
      }
    }
  }

  private _onInitDone: (event) => void = (event) => {
    if(!event.detail.message){
      GeneralUtility.LogWithType(ELogType.ErrorCheck, 'Phase initialization check not working. Check dispatched event.detail.message.');
      return;
    }
    GeneralUtility.LogWithType(ELogType.Initialize, 'Phase Initialized: ' + event.detail.message);
  };

  private ListenForInitialization(){
    document.addEventListener(GE_onMyInitComplete, this._onInitDone, false );

    RE.onObjectRemoved((object, target) => {
      document.removeEventListener(GE_onMyInitComplete, this._onInitDone, false);
      stop();
    });
  }

  public GetConfig(): GameWorldConfig{
    return this._config;
  }

  public GetProjectilePrefabs(): ProjectilePrefabs{
    return this._projectileHolder;
  }
}

RE.registerComponent(GM_GameScene);