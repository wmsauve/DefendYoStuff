import * as RE from 'rogue-engine';

export default class TestComp2 extends RE.Component {
  awake() {
    RE.Debug.log('Hello dude dude.');
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(TestComp2);
