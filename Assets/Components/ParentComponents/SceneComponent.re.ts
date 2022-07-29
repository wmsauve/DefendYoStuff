import GeneralUtility, { ELogType } from 'Assets/Classes/Utility/GeneralUtility';
import * as RE from 'rogue-engine';
import { Camera } from 'three';

export default class SceneComponent extends RE.Component {
  public _camera: Camera;

  InitializeComponent(params?: any){
    GeneralUtility.LogWithType(ELogType.Initialize, "Initializing this component: " + this.name)

    this._camera = RE.App.currentScene.getObjectByName("Main Camera") as Camera;
  }

}

RE.registerComponent(SceneComponent);
