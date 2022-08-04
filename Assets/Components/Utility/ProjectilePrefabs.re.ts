import * as RE from 'rogue-engine';

export enum EWhichProjectile{
  basic,
  None,
}

export default class ProjectilePrefabs extends RE.Component {

  @RE.props.prefab() _basicProjectile: RE.Prefab;


  public FetchProjectile(_which: EWhichProjectile): RE.Prefab{
    switch(_which){
      case EWhichProjectile.basic:
        return this._basicProjectile;   
      default:
        return this._basicProjectile;
    }
  }

}

RE.registerComponent(ProjectilePrefabs);
