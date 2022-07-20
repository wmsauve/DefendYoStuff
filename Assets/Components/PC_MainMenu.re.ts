import * as RE from 'rogue-engine';
import PlayerController from './ParentComponents/PlayerController.re';

export default class PC_MainMenu extends PlayerController {
  awake() {
    super.awake();
    RE.Debug.log('Child player controller.');
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(PC_MainMenu);
