import * as RE from 'rogue-engine';
import { Object3D } from 'three';

export enum EObjectTags{
  Landscape,
  Projectile,
  Enemy,
  Ally,
  Neutral,
}


export default class SceneObject extends RE.Component {

  @RE.props.prefab() _staticMeshPrefab: RE.Prefab;
  /**
   * TODO: Add list of tags. Seems like it doesn't work 100% yet. Not important at the moment.
   */
  @RE.props.select() _objectTag = 0;
  _objectTagOptions = [
    EObjectTags[EObjectTags.Landscape], 
    EObjectTags[EObjectTags.Projectile],
    EObjectTags[EObjectTags.Enemy],
    EObjectTags[EObjectTags.Ally],
    EObjectTags[EObjectTags.Neutral],
  ];

  private _geometry: Object3D;

  start(){
    if(!this._staticMeshPrefab){
      return;
    }

    this._geometry = this._staticMeshPrefab.instantiate(this.object3d);

    RE.App.currentScene.add(this._geometry);
  }

}

RE.registerComponent(SceneObject);
