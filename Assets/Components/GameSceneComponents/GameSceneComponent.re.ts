import * as RE from 'rogue-engine';
import SceneComponent from '../ParentComponents/SceneComponent.re';
import PC_GameScene from './PC_GameScene.re';

export default class GameSceneComponent extends SceneComponent {

  public _parent: PC_GameScene;

  InitializeComponent(parent: PC_GameScene) {
    this._parent = parent;

    super.InitializeComponent();
  }

}

RE.registerComponent(GameSceneComponent);
