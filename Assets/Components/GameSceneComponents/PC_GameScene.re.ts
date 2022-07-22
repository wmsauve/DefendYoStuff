import * as RE from 'rogue-engine';
import PlayerController from '../ParentComponents/PlayerController.re';
import SceneComponent from '../ParentComponents/SceneComponent.re';
import CameraRotationHandler from './CameraRotationHandler.re';

export default class PC_GameScene extends PlayerController {

  private _cameraRotComponent: SceneComponent;

  start() {
    super.start();

    RE.addComponent(new CameraRotationHandler('cameraRot', this.object3d));
    this._cameraRotComponent = RE.getComponent(CameraRotationHandler, this.object3d) as SceneComponent;
    this._cameraRotComponent.InitializeComponent();
  }

  update() {

  }



}

RE.registerComponent(PC_GameScene);
