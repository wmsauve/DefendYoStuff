import * as RE from 'rogue-engine';
import Projectile from '../ParentComponents/SceneObjects/Projectile.re';

export default class BasicProjectile extends Projectile {


  start() {
    super.start();
  }

  update() {

  }
}

RE.registerComponent(BasicProjectile);
