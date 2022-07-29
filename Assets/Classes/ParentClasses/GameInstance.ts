import * as RE from 'rogue-engine';
import GeneralUtility, { ELogType } from '../Utility/GeneralUtility';
import SaveGameManager from './SaveGameManager';

export default class GameInstance {

  private static _gameInstance: GameInstance;
  private static _savedManager: SaveGameManager;
  private static _currentVersion: number = 1.01;

  //values to store in game instance.

  public static InitializeGameInstance(){
    if (GameInstance._gameInstance == null) {
      GameInstance._gameInstance = this;
      GeneralUtility.LogWithType(ELogType.Initialize, "Initializing Game Instance.");
    }

    if (GameInstance._savedManager == null){
      GameInstance._savedManager = new SaveGameManager();
      GeneralUtility.LogWithType(ELogType.Initialize, "Inititalize Saved game manager.");
      GameInstance._savedManager.LoadGame();
    }
    
  }


  
  public static getInstance(): GameInstance {
    return this._gameInstance;
  }

  public static getSavedGameManager(): SaveGameManager{
    return this._savedManager;
  }

  public static getInstanceVersion(): number {
    return this._currentVersion;
  }
}
