import * as RE from 'rogue-engine';
import { Camera, Raycaster, Vector2, Vector3 } from 'three';
import PlayerController from './ParentComponents/PlayerController.re';

export default class PC_MainMenu extends PlayerController {

  private _camera: Camera;

  private _mouse: Vector2 = new Vector2();
  private _target: Vector2 = new Vector2();

  //private _rayCaster: Raycaster;

  start() {
    super.start();

    this._camera = RE.App.currentScene.getObjectByName("Main Camera") as Camera;
    this.SetEventListeners();
  }

  update() {
    if(!this._camera || !this._mouse || !this._target){
      return;
    }

    //this._rayCaster.setFromCamera( this._mouse, this._camera);

    // this._camera.rotation.x = this._mouse.y;
    // this._camera.rotation.y = - this._mouse.x;



    // this._target.x = ( 1 - this._mouse.x ) * 0.002;
    // this._target.y = ( 1 - this._mouse.y ) * 0.002;
  


    // this._angleX = 0.02 * ( this._target.y - this._angleX );
    // this._angleY = 0.02 * ( this._target.x - this._angleY );
  }

  SetEventListeners(){
    document.addEventListener( 'mousemove', (event) => {
      this._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      this._camera.rotateOnWorldAxis(new Vector3(1,0,0), this._mouse.x);
      this._camera.rotateOnWorldAxis(new Vector3(0,1,0), this._mouse.y);
    }, false );

    document.addEventListener( 'wheel', (event) => {
      this._camera.position.z += event.deltaY * 0.1; // move camera along z-axis
    }, false );
  }

}

RE.registerComponent(PC_MainMenu);
