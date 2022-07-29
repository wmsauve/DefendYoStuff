import * as RE from 'rogue-engine';
import { Raycaster, Vector2 } from 'three';
import GameSceneComponent from './GameSceneComponent.re';
import PC_GameScene from './PC_GameScene.re';

export default class AutoAttackComponent extends GameSceneComponent {

  private _raycaster: Raycaster;
  private _pointer: Vector2;


  InitializeComponent(_parent: PC_GameScene){
    super.InitializeComponent(_parent);

    this._raycaster = new Raycaster();
    this._pointer = new Vector2();

  }

  update() {
    if(!this._camera
    || !this._raycaster){
      return;
    }

    if(RE.Input.mouse.isLeftButtonDown){
      RE.Debug.log("Pressing left mouse");
      RE.Debug.log(RE.Input.mouse.x.toString() + " : position of x mouse.");

      this._pointer.x = ( RE.Input.mouse.x / window.innerWidth ) * 2 - 1;
	    this._pointer.y = - ( RE.Input.mouse.y / window.innerHeight ) * 2 + 1;

      this._raycaster.setFromCamera(this._pointer, this._camera);

      const intersects = this._raycaster.intersectObjects( RE.App.currentScene.children );

      for ( let i = 0; i < intersects.length; i ++ ) {
    
        RE.Debug.log(intersects[ i ].object.name);

    
      }

    }


  }
}

RE.registerComponent(AutoAttackComponent);
