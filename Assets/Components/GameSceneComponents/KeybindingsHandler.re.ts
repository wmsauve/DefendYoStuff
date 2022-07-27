import * as RE from 'rogue-engine';
import { Vector2 } from 'three';
import SceneComponent from '../ParentComponents/SceneComponent.re';
import PC_GameScene, { EMovementMethod } from './PC_GameScene.re';

enum EPressedKey {
  Forward,
  Backward,
  Left,
  Right,
  None
}

export default class KeybindingsHandler extends SceneComponent {
  private _parent: PC_GameScene;

  private _currentPressed: EPressedKey = EPressedKey.None;

  InitializeComponent(parent: PC_GameScene){
    super.InitializeComponent();

    this._parent = parent;

  }

  update(){
    if(!this._camera 
    || this._parent._camMovement != EMovementMethod.None
    && this._parent._camMovement != EMovementMethod.Keyboard){
      return;
    }


    //use onkey down and booleans to allow for diagonal movement.
    let _tempShift: Vector2 = new Vector2();
    if (RE.Input.keyboard.getKeyPressed("KeyW")) {
      _tempShift.x = this._camera.position.x;
      _tempShift.y = this._camera.position.z - 1;
      this._parent.SetCamMovement(EMovementMethod.Keyboard, EMovementMethod.Keyboard);
      this._currentPressed = EPressedKey.Forward;
    }
    else if (RE.Input.keyboard.getKeyPressed("KeyS")) {
      _tempShift.x = this._camera.position.x;
      _tempShift.y = this._camera.position.z + 1;
      this._parent.SetCamMovement(EMovementMethod.Keyboard, EMovementMethod.Keyboard);
      this._currentPressed = EPressedKey.Backward;
    }

    if (RE.Input.keyboard.getKeyPressed("KeyA")) {
      _tempShift.x = this._camera.position.x - 1;
      _tempShift.y = this._camera.position.z;
      this._parent.SetCamMovement(EMovementMethod.Keyboard, EMovementMethod.Keyboard);
      this._currentPressed = EPressedKey.Left;
    }
    else if (RE.Input.keyboard.getKeyPressed("KeyD")) {
      _tempShift.x = this._camera.position.x + 1;
      _tempShift.y = this._camera.position.z;
      this._parent.SetCamMovement(EMovementMethod.Keyboard, EMovementMethod.Keyboard);
      this._currentPressed = EPressedKey.Right;
    }


    //Stop snapping back
    if(RE.Input.keyboard.getKeyUp("KeyW") && this._currentPressed == EPressedKey.Forward
    || RE.Input.keyboard.getKeyUp("KeyS") && this._currentPressed == EPressedKey.Backward
    || RE.Input.keyboard.getKeyUp("KeyA") && this._currentPressed == EPressedKey.Left
    || RE.Input.keyboard.getKeyUp("KeyD") && this._currentPressed == EPressedKey.Right){
      this._parent.SetCamMovement(EMovementMethod.None, EMovementMethod.Keyboard);
      this._currentPressed = EPressedKey.None;
    }

    if(this._parent._camMovement != EMovementMethod.Keyboard){
      _tempShift.x = this._camera.position.x;
      _tempShift.y = this._camera.position.z;
    }

    let _clampChecked = this._parent.ClampWorldMovement(_tempShift);

    this._camera.position.x = _clampChecked.x;
    this._camera.position.z = _clampChecked.y;
  }

}

RE.registerComponent(KeybindingsHandler);
