import GameInstance from "./GameInstance";
import SavedGame from "./SavedGame";
import GeneralUtility, { ELogType } from "../Utility/GeneralUtility";

export default class SaveGameManager {

  private _savedGame: SavedGame;
  private _saveGameKey: string = '_savedKey';
  private _promiseFetch = new Promise((resolve:(_data: SavedGame) => void, reject) => {

    let _fetchedSaved = window.localStorage.getItem(this._saveGameKey);

    if(_fetchedSaved){
      resolve(JSON.parse(_fetchedSaved));
    }
    else{
      reject('Generating new Saved data.');
    }
  
  });

  public SaveGame(){

  }

  public LoadGame(){
 
    this._promiseFetch
    .then((_data) => {
      GeneralUtility.LogWithType(ELogType.Initialize, "Loading Data.");
      console.log(_data);

      GeneralUtility.LogWithType(ELogType.Initialize, "Checking version.");
      if(_data._version && _data._version === GameInstance.getInstanceVersion()){
        this.ApplySaved(_data);
      }
      else{
        //TODO: add function later to resolve difference between someone's saved and an update to SavedGame
        GeneralUtility.LogWithType(ELogType.Initialize, "Version difference.");
      }
    })
    .catch((_message) => {
      GeneralUtility.LogWithType(ELogType.Initialize, _message);
      this.GenerateSavedGame();
    });

  }

  //Functionality related
  private GenerateSavedGame(){
    this._savedGame = new SavedGame();
    this._savedGame._version = GameInstance.getInstanceVersion();

    this._savedGame._username = "DefaultUser";
    this._savedGame._completedLevel = 0;

    this._savedGame._forKeybind = "KeyW";
    this._savedGame._backKeybind = "KeyS";
    this._savedGame._leftKeybind = "KeyA";
    this._savedGame._rightKeybind = "KeyD";

    this._savedGame._s1Keybind = "Digit1";
    this._savedGame._s2Keybind = "Digit2";
    this._savedGame._s3Keybind = "Digit3";
    this._savedGame._s4Keybind = "Digit4";

    let _tempSaved = window.localStorage.setItem(this._saveGameKey, JSON.stringify(this._savedGame));
  }

  private ApplySaved(_fetched: SavedGame){
    this._savedGame = _fetched;
  }

  public GetSavedGame(): SavedGame{
    return this._savedGame;
  }
}

