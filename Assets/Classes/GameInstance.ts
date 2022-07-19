import * as RE from 'rogue-engine';
import SaveGameManager from './SaveGameManager';

export default class GameInstance {

  private static _gameInstance: GameInstance;
  private static _savedManager: SaveGameManager;

  //values to store in game instance.

  public static InitializeGameInstance(){
    if (GameInstance._gameInstance == null) {
      GameInstance._gameInstance = this;
      RE.Debug.log("Initializing Game Instance.");
    }

    if (GameInstance._savedManager == null){
      GameInstance._savedManager = new SaveGameManager();
      RE.Debug.log("Inititalize Saved game manager.");
      GameInstance._savedManager.LoadGame();
    }
    
  }


  
  public static getInstance() {
    return this._gameInstance;
  }
}
