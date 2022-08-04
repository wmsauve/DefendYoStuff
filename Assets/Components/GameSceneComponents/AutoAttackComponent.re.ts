import GeneralUtility from 'Assets/Classes/Utility/GeneralUtility';
import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re';
import { Vec3 } from 'cannon-es';
import * as RE from 'rogue-engine';
import { Raycaster, Vector2, Vector3 } from 'three';
import SceneObject, { EObjectTags } from '../ParentComponents/SceneObject.re';
import Projectile from '../ParentComponents/SceneObjects/Projectile.re';
import { EWhichProjectile } from '../Utility/ProjectilePrefabs.re';
import GameSceneComponent from './GameSceneComponent.re';
import GM_GameScene from './GM_GameScene.re';
import PC_GameScene from './PC_GameScene.re';

export default class AutoAttackComponent extends GameSceneComponent {

  private _raycaster: Raycaster;
  private _pointer: Vector2;

  private _currentProjectile: RE.Prefab;

  private _bullets: Projectile[] = [];


  InitializeComponent(_parent: PC_GameScene){
    super.InitializeComponent(_parent);

    this._raycaster = new Raycaster();
    this._pointer = new Vector2(); 


    //Get projectile.
    const _gameMode = GeneralUtility.FetchGameModeRef() as GM_GameScene;
    this._currentProjectile = _gameMode.GetProjectilePrefabs().FetchProjectile(EWhichProjectile.basic);

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

        _objComp?._objectTag.forEach(element => {
          if(element === EObjectTags.Landscape){
            let _bullet = this._currentProjectile.instantiate();
            let _bulletComp = RE.getComponent(Projectile, _bullet) as Projectile;
            this._bullets.push(_bulletComp);

            _bulletComp.onStaticMeshComplete = () => {
              //Shoot this bullet from screen to position on landscape.
              let _worldCoords = new Vector3(this._pointer.x, this._pointer.y, -1).unproject(this._camera);
              _bulletComp._geometry.position.x = _worldCoords.x;
              _bulletComp._geometry.position.z = _worldCoords.z;
              _bulletComp._geometry.position.y = _worldCoords.y;
              RE.Debug.log("set pos static mesh.");

              let _dirVector = new Vector3();
              _dirVector.x = intersects[i].point.x - _worldCoords.x;
              _dirVector.y = intersects[i].point.y - _worldCoords.y;
              _dirVector.z = intersects[i].point.z - _worldCoords.z;
              _dirVector.normalize();
              RE.Debug.log(JSON.stringify(_dirVector) + " yooyoy.");
              let _cannonBody = RE.getComponent(CannonBody, _bulletComp._geometry) as CannonBody;
              
              
              _cannonBody.body.applyImpulse(new Vec3(_dirVector.x, _dirVector.y, _dirVector.z).scale(_cannonBody.body.mass * 200))

              // RE.Debug.log(_bulletComp._geometry.position.x.toString() + " is x?")
              // RE.Debug.log(_bulletComp._geometry.position.y.toString() + " is y?")
              // RE.Debug.log(_bulletComp._geometry.position.z.toString() + " is z?")
            }

          }
        });
      }
    }
  }
}

RE.registerComponent(AutoAttackComponent);
