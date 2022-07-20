import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import * as RE from 'rogue-engine';

export default class GM_MainMenu extends GameMode {
  awake() {
    super.awake();
    RE.Debug.log('Child game mode.');
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(GM_MainMenu);