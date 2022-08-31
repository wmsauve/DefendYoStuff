import * as RE from 'rogue-engine';
import Projectile from '../ParentComponents/SceneObjects/Projectile.re';
import { EWhichProjectile } from '../Utility/ProjectilePrefabs.re';

export default class BasicProjectile extends Projectile {


  start() {
    super.start();

    this.SetProjectileType(EWhichProjectile.basic);
  }

  update() {
    if(!this._geometry){
      return;
    }

  }
}

RE.registerComponent(BasicProjectile);
