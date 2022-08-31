import { EWhichProjectile } from 'Assets/Components/Utility/ProjectilePrefabs.re';
import * as RE from 'rogue-engine';
import SceneObject from '../SceneObject.re';

export default class Projectile extends SceneObject {

  
  private _myType: EWhichProjectile = EWhichProjectile.None;

  start() {
    super.start();
  }

  public SetProjectileType(_type: EWhichProjectile){
    this._myType = _type;
  }

  public GetProjectileType(): EWhichProjectile{
    return this._myType;
  }


}

RE.registerComponent(Projectile);
