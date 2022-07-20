import * as RE from 'rogue-engine';

export default class PlayerController extends RE.Component {

  awake() {
    RE.Debug.log("Parent Player controller.");
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(PlayerController);
