import * as RE from 'rogue-engine';

export default class GameInstance {

  private static _gameInstance: GameInstance;

  public static InitializeGameInstance(){
    if (GameInstance._gameInstance == null) {
      GameInstance._gameInstance = this;
      RE.Debug.log("Creating gamem instance");
    }
    else{
      RE.Debug.log("No game instance yo.");
    }
  }

  public static getInstance() {
    return this._gameInstance;
  }
}
