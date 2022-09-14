import * as RE from 'rogue-engine';
import EnemyComp from '../ParentComponents/SceneObjects/EnemyComp.re';
import Spawner from '../ParentComponents/SceneObjects/Spawner.re';

export default class EnemySpawner extends Spawner {


  private _spawnCooldown: number = 3;
  private _counter: number = 0;



  start() {
    
  }

  update() {
    if(!this._spawned){
      return;
    }

    this._counter += RE.Runtime.deltaTime;

    if(this._counter >= this._spawnCooldown){
      let _newSpawned = this._spawned.instantiate();
      
      let _enemyComp = RE.getComponent(EnemyComp, _newSpawned) as EnemyComp;
      _enemyComp.onStaticMeshComplete = () => {
        _enemyComp.GetStaticMesh().position.x = this.object3d.position.x;
        _enemyComp.GetStaticMesh().position.y = this.object3d.position.y;
        _enemyComp.GetStaticMesh().position.z = this.object3d.position.z;
      };
      

      this._counter = 0;
      //RE.Debug.log("Spawning a new thing.");
    }
  }
}

RE.registerComponent(EnemySpawner);
