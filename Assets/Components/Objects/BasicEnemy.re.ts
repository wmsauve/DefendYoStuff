import * as RE from 'rogue-engine';
import EnemyComp from '../ParentComponents/SceneObjects/EnemyComp.re';

export default class BasicEnemy extends EnemyComp {


  start() {
    super.start();

  }

  update() {

  }
}

RE.registerComponent(BasicEnemy);
