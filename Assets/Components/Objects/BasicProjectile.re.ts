import * as RE from 'rogue-engine';
import SceneObject, { EObjectTags } from '../ParentComponents/SceneObject.re';
import Projectile from '../ParentComponents/SceneObjects/Projectile.re';
import { EWhichProjectile } from '../Utility/ProjectilePrefabs.re';

export default class BasicProjectile extends Projectile {

  start() {
    super.start();

    this.SetProjectileType(EWhichProjectile.basic);

    this._cannonBody.onCollisionEnter(event => {

      const _staticMesh = RE.getComponent(SceneObject, event.other.object3d) as SceneObject;
      if(!_staticMesh){
        return;
      }

      for(let i = 0; i < _staticMesh._objectTag.length; i++){

        if(_staticMesh._objectTag[i] !== EObjectTags.Landscape
        && _staticMesh._objectTag[i] !== EObjectTags.Enemy){
          this.CleanUpSceneObject();
          continue;
        }

        if(_staticMesh._objectTag[i] === EObjectTags.Landscape){
          
        }
        else if(_staticMesh._objectTag[i] === EObjectTags.Enemy){
          //Do a bit of damage to the object.
        }        

        this.CleanUpSceneObject();
        break;
      }

    });

  }

  update() {
    if(!this._geometry){
      return;
    }

  }

}

RE.registerComponent(BasicProjectile);
