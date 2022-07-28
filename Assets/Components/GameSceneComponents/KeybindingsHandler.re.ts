import GameInstance from 'Assets/Classes/ParentClasses/GameInstance';
import SavedGame from 'Assets/Classes/ParentClasses/SavedGame';
import * as RE from 'rogue-engine';
import { Vector2 } from 'three';
import SceneComponent from '../ParentComponents/SceneComponent.re';
import PC_GameScene, { EMovementMethod } from './PC_GameScene.re';

export default class KeybindingsHandler extends SceneComponent {
  private _parent: PC_GameScene;
  private _keybindingsInit: boolean = false;

  private _forward: boolean = false;
  private _backward: boolean = false;
  private _left: boolean = false;
  private _right: boolean = false;

  private _forwardKey: string;
  private _backKey: string;
  private _leftKey: string;
  private _rightKey: string;

  private _skill1: string;
  private _skill2: string;
  private _skill3: string;
  private _skill4: string;

  InitializeComponent(parent: PC_GameScene){
    super.InitializeComponent();

    this.SetUpKeyBindings();
    this._parent = parent;
  }

  update(){
    if(!this._camera 
    || !this._keybindingsInit
    || this._parent._camMovement != EMovementMethod.None
    && this._parent._camMovement != EMovementMethod.Keyboard){
      return;
    }

    if (RE.Input.keyboard.getKeyPressed(this._forwardKey)){
      this._forward = true;
    }
    else{
      this._forward = false;
    }

    if (RE.Input.keyboard.getKeyPressed(this._backKey)){
      this._backward = true;
    }
    else{
      this._backward = false;
    }

    if (RE.Input.keyboard.getKeyPressed(this._leftKey)){
      this._left = true;
    }
    else{
      this._left = false;
    }

    if (RE.Input.keyboard.getKeyPressed(this._rightKey)){
      this._right = true;
    }
    else{
      this._right = false;
    }

    //Set Control type.
    if(RE.Input.keyboard.getKeyPressed(this._forwardKey) 
    || RE.Input.keyboard.getKeyPressed(this._backKey) 
    || RE.Input.keyboard.getKeyPressed(this._leftKey) 
    || RE.Input.keyboard.getKeyPressed(this._rightKey) ){
      this._parent.SetCamMovement(EMovementMethod.Keyboard, EMovementMethod.Keyboard);
    }

    if(!this._forward && !this._backward && !this._left && !this._right){
      this._parent.SetCamMovement(EMovementMethod.None, EMovementMethod.Keyboard);
    }

    let _tempShift: {x:number, z:number} = {x: 0, z: 0};
    let _changeAmount: {x:number, z:number} = {x: 0, z: 0};
    if(this._forward){
      _changeAmount.z -= 1;
    }
    if(this._backward){
      _changeAmount.z += 1;
    }
    if(this._left){
      _changeAmount.x -= 1;
    }
    if(this._right){
      _changeAmount.x += 1;
    }
    _tempShift.x = this._camera.position.x + _changeAmount.x;
    _tempShift.z = this._camera.position.z + _changeAmount.z;

    let _clampChecked = this._parent.ClampWorldMovement(new Vector2(_tempShift.x, _tempShift.z));

    this._camera.position.x = _clampChecked.x;
    this._camera.position.z = _clampChecked.y;

  }

  private SetUpKeyBindings(){
    const _keybindings: SavedGame = GameInstance.getSavedGameManager().GetSavedGame();

    this._forwardKey = _keybindings._forKeybind;
    this._backKey = _keybindings._backKeybind;
    this._leftKey = _keybindings._leftKeybind;
    this._rightKey = _keybindings._rightKeybind;

    this._skill1 = _keybindings._s1Keybind;
    this._skill2 = _keybindings._s2Keybind;
    this._skill3 = _keybindings._s3Keybind;
    this._skill4 = _keybindings._s4Keybind;

    this._keybindingsInit = true;
  }
}

RE.registerComponent(KeybindingsHandler);
