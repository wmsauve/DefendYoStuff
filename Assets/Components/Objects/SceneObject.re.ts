import * as RE from 'rogue-engine';
import { Object3D } from 'three';


export default class SceneObject extends RE.Component {

  @RE.props.text() _objectTag: string;
  @RE.props.prefab() _staticMeshPrefab: RE.Prefab;

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
