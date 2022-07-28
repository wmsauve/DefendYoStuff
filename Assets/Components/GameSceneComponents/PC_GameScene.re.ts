import { WorldBoundary } from 'Assets/Classes/Utility/CustomTypes';
import GeneralUtility from 'Assets/Classes/Utility/GeneralUtility';
import { GE_onMyInitComplete } from 'Assets/Classes/Utility/GlobalEvents';
import * as RE from 'rogue-engine';
import { Vector2 } from 'three';
import PlayerController from '../ParentComponents/PlayerController.re';
import SceneComponent from '../ParentComponents/SceneComponent.re';
import CameraMovementHandler from './CameraMovementHandler.re';
import GM_GameScene from './GM_GameScene.re';
import KeybindingsHandler from './KeybindingsHandler.re';

export enum EMovementMethod {
  Mouse,
  Keyboard,
  Gamepad,
  None,
}

export default class PC_GameScene extends PlayerController {

  private _controlsComponents: SceneComponent[] = [];

  private _world: WorldBoundary;

  public _camMovement: EMovementMethod = EMovementMethod.None;

  start() {
    super.start();

    RE.addComponent(new CameraMovementHandler('cameraMovement', this.object3d));
    let _camComp = RE.getComponent(CameraMovementHandler, this.object3d) as SceneComponent;
    this._controlsComponents.push(_camComp);

    RE.addComponent(new KeybindingsHandler('keybindings', this.object3d));
    let _keysComp = RE.getComponent(KeybindingsHandler, this.object3d) as SceneComponent;
    this._controlsComponents.push(_keysComp);


    for (let i = 0; i < this._controlsComponents.length; i++) {
      this._controlsComponents[i].InitializeComponent(this);
    }

    this.SetUpWorldClamp();
    
    

    GeneralUtility.EventDispatcher(GE_onMyInitComplete, { detail: { message: 'Player Controller Components Set.' } });
  }

  update(){
    //console.log(EMovementMethod[this._camMovement] + " movement yo.");
  }


  private SetUpWorldClamp(){
    const _gameMode = GeneralUtility.FetchGameModeRef() as GM_GameScene;
    this._world = _gameMode.GetConfig().GetWorldBoundary();
  }

  public SetCamMovement(_newState: EMovementMethod, _controlType: EMovementMethod){
    
    //We don't care if cam is moving and we have a request for a movement type.
    if(this._camMovement != EMovementMethod.None
    && _newState != EMovementMethod.None){
      return;
    }

    //accept anything if a request comes while cam movement is none.
    if(this._camMovement == EMovementMethod.None){
      this._camMovement = _newState;
    }

    //only set none if the none comes from the control type that is equal to the current control state.
    if(_newState == EMovementMethod.None
    && this._camMovement != EMovementMethod.None){
      
      if(_controlType == this._camMovement){
        this._camMovement = _newState;
      }
    }

  };

  public ClampWorldMovement(_val: Vector2): Vector2 {
    if(_val.x < this._world.leftX) { _val.x = this._world.leftX }
    if(_val.x > this._world.rightX) { _val.x = this._world.rightX }
    if(_val.y > this._world.backZ) { _val.y = this._world.backZ }
    if(_val.y < this._world.forwardZ) { _val.y = this._world.forwardZ }
    return _val;
  }
}

RE.registerComponent(PC_GameScene);
