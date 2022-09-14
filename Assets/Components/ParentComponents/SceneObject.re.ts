import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re';
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

  protected _geometry: Object3D;
  protected _cannonBody: CannonBody;

  start(){
    if(!this._staticMeshPrefab){

      return;
    }

    this._geometry = this._staticMeshPrefab.instantiate(this.object3d);
    
    this._cannonBody = RE.getComponent(CannonBody, this._geometry) as CannonBody;

    if(this.onStaticMeshComplete != null){
      this.onStaticMeshComplete();
    }

    RE.App.currentScene.add(this._geometry);
  }

  public onStaticMeshComplete: () => void;

  //Getter
  GetCannonBody(): CannonBody{
    return this._cannonBody;
  }

  GetStaticMesh(): Object3D{
    return this._geometry;
  }

  //Remove object.
  CleanUpSceneObject(){
    RE.App.currentScene.remove(this._geometry);
    RE.App.currentScene.remove(this.object3d);
  }

}

RE.registerComponent(SceneObject);
