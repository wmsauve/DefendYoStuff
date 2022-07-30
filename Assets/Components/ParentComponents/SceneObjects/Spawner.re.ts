import * as RE from 'rogue-engine';
import SceneObject from '../SceneObject.re';

export default class Spawner extends SceneObject {

  @RE.props.prefab() _spawned: RE.Prefab;
}

RE.registerComponent(Spawner);
