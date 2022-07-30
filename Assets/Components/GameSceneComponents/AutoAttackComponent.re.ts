import * as RE from 'rogue-engine';
import { Raycaster, Vector2 } from 'three';
import SceneObject, { EObjectTags } from '../ParentComponents/SceneObject.re';
import GameSceneComponent from './GameSceneComponent.re';
import PC_GameScene from './PC_GameScene.re';

export default class AutoAttackComponent extends GameSceneComponent {

  private _raycaster: Raycaster;
  private _pointer: Vector2;

  private _currentProjectile: RE.Prefab;


  InitializeComponent(_parent: PC_GameScene){
    super.InitializeComponent(_parent);

    this._raycaster = new Raycaster();
    this._pointer = new Vector2();

    //Figure out the best way to get the prefab here for instantiating.
    //this._currentProjectile = ;

  }

  update() {
    if(!this._camera
    || !this._raycaster){
      return;
    }

    if(RE.Input.mouse.isLeftButtonDown){
      this._pointer.x = ( RE.Input.mouse.x / window.innerWidth ) * 2 - 1;
	    this._pointer.y = - ( RE.Input.mouse.y / window.innerHeight ) * 2 + 1;

      this._raycaster.setFromCamera(this._pointer, this._camera);

      const intersects = this._raycaster.intersectObjects( RE.App.currentScene.children );

      for ( let i = 0; i < intersects.length; i ++ ) {
        
        let _objComp = RE.getComponent(SceneObject, intersects[i].object);
        if(_objComp && _objComp._objectTag === EObjectTags.Landscape){
          RE.Debug.log(i.toString() + " :index of hit object.");
          RE.Debug.log(JSON.stringify(intersects[ i ].point) + " : hit point.");
        }

      }
    }
  }
}

RE.registerComponent(AutoAttackComponent);
