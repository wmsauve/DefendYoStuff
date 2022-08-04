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

  @RE.props.list.select() _objectTag: EObjectTags[] = [0];
  _objectTagOptions = [
    EObjectTags[EObjectTags.Landscape], 
    EObjectTags[EObjectTags.Projectile],
    EObjectTags[EObjectTags.Enemy],
    EObjectTags[EObjectTags.Ally],
    EObjectTags[EObjectTags.Neutral],
  ];

  public _geometry: Object3D;

  start(){
    if(!this._staticMeshPrefab){
      return;
    }

    this._geometry = this._staticMeshPrefab.instantiate(this.object3d);

    if(this.onStaticMeshComplete != null){
      this.onStaticMeshComplete();
    }

    RE.App.currentScene.add(this._geometry);
  }

  public onStaticMeshComplete: () => void;

}

RE.registerComponent(SceneObject);
