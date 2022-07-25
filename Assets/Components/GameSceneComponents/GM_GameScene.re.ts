import { CameraBoundary, WorldBoundary } from 'Assets/Classes/Utility/CustomTypes';
import GameWorldConfig from 'Assets/Classes/Utility/GameWorldConfig';
import GeneralUtility from 'Assets/Classes/Utility/GeneralUtility';
import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import * as RE from 'rogue-engine';
import { Camera, Object3D } from 'three';

export default class GM_GameScene extends GameMode {

  private _config: GameWorldConfig;
  private _castle: Object3D;

  /**
   * These values are related to moving the camera in any given direction depending on where the mouse is positioned.
   */
  @RE.props.num() _rightBoundary;
  @RE.props.num() _topBoundary;
  @RE.props.num() _botBoundary;
  @RE.props.num() _leftBoundary;

  @RE.props.object3d() _castleLocation;
  @RE.props.num() _worldSizeX;
  @RE.props.num() _worldSizeZ;


  start() {
    this.InitializeComponentValues();


    //Initialize Playercontroller and other components.
    super.start();
  }

  update() {

  }

  InitializeComponentValues(){
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