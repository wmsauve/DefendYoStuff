import * as RE from 'rogue-engine';

export default class SceneObject extends RE.Component {

  @RE.props.text() _objectTag: string;

  start() {

  }

  update() {

  }
}

RE.registerComponent(SceneObject);
