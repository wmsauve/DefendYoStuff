import { CameraBoundary, WorldBoundary } from 'Assets/Classes/Utility/CustomTypes';
import GeneralUtility from 'Assets/Classes/Utility/GeneralUtility';
import * as RE from 'rogue-engine';
import { Camera, Vector2 } from 'three';
import SceneComponent from '../ParentComponents/SceneComponent.re';
import GM_GameScene from './GM_GameScene.re';

enum EMouseLocation {
  Top,
  Left,
  Bottom,
  Right,
  Center,
  BotLeft,
  BotRight,
  TopLeft,
  TopRight,
}

export default class CameraMovementHandler extends SceneComponent {
  private _camera: Camera;

  private _mouse: Vector2 = new Vector2();
  private _currentMouseLoc: EMouseLocation = EMouseLocation.Center;

  private _boundary: CameraBoundary;
  private _world: WorldBoundary;
  
  /**
   * Viewport is normalized between -1 and 1.
   * Boundaries will cap to -1 at the most left and 1 at the most right, -1 at the lowest and 1 at the highest.
   */
  InitializeComponent(){
    RE.Debug.log("Initializing this: " + this.name);
    this._camera = RE.App.currentScene.getObjectByName("Main Camera") as Camera;
    
    const _gameMode = GeneralUtility.FetchGameModeRef() as GM_GameScene;
    //Get ref
    this._boundary = _gameMode.GetConfig().GetCameraBoundary();
    this._world = _gameMode.GetConfig().GetWorldBoundary();

    this.SetEventListeners();
  }

  update() {
    if(!this._camera){
      return;
    }

    let _tempShift: Vector2 = new Vector2();
    switch(this._currentMouseLoc){
      case EMouseLocation.Left:
        _tempShift.x = this._camera.position.x - 1;
        _tempShift.y = this._camera.position.z;
        break;
      case EMouseLocation.Right:
        _tempShift.x = this._camera.position.x + 1;
        _tempShift.y = this._camera.position.z;
        break;
      case EMouseLocation.Top:
        _tempShift.x = this._camera.position.x;
        _tempShift.y = this._camera.position.z - 1;
        break;
      case EMouseLocation.Bottom:
        _tempShift.x = this._camera.position.x;
        _tempShift.y = this._camera.position.z + 1;
        break;
      case EMouseLocation.TopLeft:
        _tempShift.x = this._camera.position.x - 1;
        _tempShift.y = this._camera.position.z - 1;
        break;
      case EMouseLocation.TopRight:
        _tempShift.x = this._camera.position.x + 1;
        _tempShift.y = this._camera.position.z - 1;
        break;
      case EMouseLocation.BotLeft:
        _tempShift.x = this._camera.position.x - 1;
        _tempShift.y = this._camera.position.z + 1;
        break;
      case EMouseLocation.BotRight:
        _tempShift.x = this._camera.position.x + 1;
        _tempShift.y = this._camera.position.z + 1;
        break;
      case EMouseLocation.Center:
        _tempShift.x = this._camera.position.x;
        _tempShift.y = this._camera.position.z;
      default:
        break;
    }

    if(_tempShift.x < this._world.leftX) { _tempShift.x = this._world.leftX }
    if(_tempShift.x > this._world.rightX) { _tempShift.x = this._world.rightX }
    if(_tempShift.y > this._world.backZ) { _tempShift.y = this._world.backZ }
    if(_tempShift.y < this._world.forwardZ) { _tempShift.y = this._world.forwardZ }

    this._camera.position.x = _tempShift.x;
    this._camera.position.z = _tempShift.y;
  }

  private _findMouseLoc: (event) => void = (event) => {
    if(!this._mouse){
      return;
    }

    this._mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this._mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    if(this._mouse.x < this._boundary.right 
    && this._mouse.x > this._boundary.left
    && this._mouse.y < this._boundary.top
    && this._mouse.y > this._boundary.bot){
      this._currentMouseLoc = EMouseLocation.Center;
      return;
    }

    if(this._mouse.x < this._boundary.left){

      if(this._mouse.y > this._boundary.top){
        this._currentMouseLoc = EMouseLocation.TopLeft;
        return;
      }
      else if(this._mouse.y < this._boundary.bot){
        this._currentMouseLoc = EMouseLocation.BotLeft;
        return;
      }
      else{
        this._currentMouseLoc = EMouseLocation.Left;
        return;
      }

    }

    if(this._mouse.x > this._boundary.right){

      if(this._mouse.y > this._boundary.top){
        this._currentMouseLoc = EMouseLocation.TopRight;
        return;
      }
      else if(this._mouse.y < this._boundary.bot){
        this._currentMouseLoc = EMouseLocation.BotRight;
        return;
      }
      else{
        this._currentMouseLoc = EMouseLocation.Right;
        return;
      }

    }

    if(this._mouse.y > this._boundary.top){
      this._currentMouseLoc = EMouseLocation.Top;
      return;
    }

    if(this._mouse.y < this._boundary.bot){
      this._currentMouseLoc = EMouseLocation.Bottom;
      return;
    }

  };

  // private _zoomCamera: (event) => void = (event) => {
  //   this._camera.position.z += event.deltaY * 0.1;
  // };

  private _leaveViewport: (event) => void = (event) => {
    if(event.clientY <= 0 
    || event.clientX <= 0 
    || (event.clientX >= window.innerWidth 
    || event.clientY >= window.innerHeight)){
      this._currentMouseLoc = EMouseLocation.Center;
    }
  };
  

  private SetEventListeners(){
    document.addEventListener( 'mousemove', this._findMouseLoc, false );
    //document.addEventListener( 'wheel', this._zoomCamera, false );
    document.addEventListener( 'mouseleave', this._leaveViewport, false );

    RE.onObjectRemoved((object, target) => {
      document.removeEventListener('mousemove', this._findMouseLoc, false);
      //document.removeEventListener('wheel', this._zoomCamera, false);
      document.removeEventListener('mouseleave', this._leaveViewport, false);
      stop();
    });
  }


}

RE.registerComponent(CameraMovementHandler);
