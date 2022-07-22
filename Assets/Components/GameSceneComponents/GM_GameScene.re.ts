import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import * as RE from 'rogue-engine';

export default class GM_GameScene extends GameMode {

  start() {
    super.start();
  }

  update() {

  }
}

RE.registerComponent(GM_GameScene);