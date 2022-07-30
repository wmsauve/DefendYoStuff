import * as RE from 'rogue-engine';
import SceneObject from '../ParentComponents/SceneObject.re';

export default class Castle extends SceneObject {

  /**
   * TODO: Gonna have to figure out how to add different kinds of castles later.
   * For now, we got a basic castle.
   */


  start(){
    super.start();


  }




}

RE.registerComponent(Castle);
