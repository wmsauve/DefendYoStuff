import * as RE from 'rogue-engine';
import Spawner from '../ParentComponents/SceneObjects/Spawner.re';

export default class EnemySpawner extends Spawner {


  private _spawnCooldown: number = 3;
  private _counter: number = 0;

  awake() {

  }

  start() {
 
  }

  update() {
    if(!this._spawned){
      return;
    }

    this._counter += RE.Runtime.deltaTime;

    if(this._counter >= this._spawnCooldown){
      let _newSphere = this._spawned.instantiate();
      _newSphere.position.x = 20;
      _newSphere.position.y = 200;
      this._counter = 0;
      //RE.Debug.log("Spawning a new thing.");
    }
  }
}

RE.registerComponent(EnemySpawner);
