import * as RE from 'rogue-engine';
import { Camera, Vector2, Raycaster, Quaternion } from 'three';
import SceneComponent from '../ParentComponents/SceneComponent.re';

export default class CameraRotationHandler extends SceneComponent {
  private _camera: Camera;

  private _mouse: Vector2 = new Vector2();

  private _target: Quaternion = new Quaternion();
  private _old: Quaternion = new Quaternion();
  private _lerpT: number = 0;
  private _lerping: boolean = false;

  private _rayCaster: Raycaster;




  InitializeComponent(){
    RE.Debug.log("Initializing this: " + this.name);
    this._camera = RE.App.currentScene.getObjectByName("Main Camera") as Camera;
    this._rayCaster = new Raycaster();

    this.SetEventListeners();
  }

  update() {

    if(!this._target || !this._old || !this._lerping || !this._camera){
      return;
    }
    
    this._camera.quaternion.slerpQuaternions( this._old, this._target, this._lerpT ); 

    this._lerpT += RE.Runtime.deltaTime * 10;
    if(this._lerpT >= 1){
      this._lerpT = 0;
      this._lerping = false;
    }
  }

  private _rotateCamera: (event) => void = (event) => {
    if(!this._camera || !this._mouse || !this._rayCaster || this._lerping){
      return;
    }

    this._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    // this._rayCaster.setFromCamera( this._mouse, this._camera);

    // const intersects = this._rayCaster.intersectObjects( RE.App.currentScene.children, false );

    // if ( intersects.length > 0 ) {

    //   for (const element of intersects) {
    //     let _objRef = RE.getComponent(SceneObject, element.object);
    //     if(!_objRef || _objRef._objectTag != "landscape"){
    //       continue;
    //     }

    //     this._lerping = true;
    //     //set quaternion of current position.
    //     this._old = new Quaternion().copy( this._camera.quaternion );
    //     //set new position
    //     this._camera.lookAt(element.point); 
    //     this._target = new Quaternion().copy( this._camera.quaternion );

    //     break;
    //   }
    // }



  };

  private _zoomCamera: (event) => void = (event) => {
    this._camera.position.z += event.deltaY * 0.1;
  };
  

  SetEventListeners(){
    document.addEventListener( 'mousemove', this._rotateCamera, false );
    document.addEventListener( 'wheel', this._zoomCamera, false );

    RE.onObjectRemoved((object, target) => {
      document.removeEventListener('mousemove', this._rotateCamera, false);
      document.removeEventListener('wheel', this._zoomCamera, false);
      stop();
    });
  }
}

RE.registerComponent(CameraRotationHandler);
