import * as RE from 'rogue-engine';

export default class TestComponent extends RE.Component {
  /**
   * Something in the editor that we want removed at runtime.
   */

  @RE.props.list.num() _test: number[] = [0];

  update() {

    //RE.App.currentScene.remove(this.object3d);
    //RE.Debug.log("Removing Test item: " + this.object3d.name);
  }

}

RE.registerComponent(TestComponent);
