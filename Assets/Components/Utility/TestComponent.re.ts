import * as RE from 'rogue-engine';

export default class TestComponent extends RE.Component {
  /**
   * Something in the editor that we want removed at runtime.
   */
  update() {

    RE.App.currentScene.remove(this.object3d);
    RE.Debug.log("Removing Test item: " + this.object3d.name);
  }

}

RE.registerComponent(TestComponent);
