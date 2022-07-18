import SavedGame from "./SavedGame";

export default class SaveGameManager {

  private _savedGame: SavedGame;
  private _saveGameKey: '_savedKey';
  private _promiseFetch = new Promise((resolve, reject) => {

    resolve(window.localStorage.getItem(this._saveGameKey));
    reject('error');

  });

  public SaveGame(){

  }

  public async LoadGame(){
    console.log('are you doing stuff homie?');

    let _fetchSaved = await this._promiseFetch
    .then(() => {
      console.log('got fetched yo.');
    })
    .catch((e) => {
      console.log('error yo.');
    });

    console.log(JSON.parse(_fetchSaved));

  }

  private GenerateSavedGame(){
    this._savedGame = new SavedGame('hellodudehello');
    let _tempSaved = window.localStorage.setItem(this._saveGameKey, JSON.stringify(this._savedGame.GetData()));
  }

}

