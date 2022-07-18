export default class SavedGame {

  private _savedGame: {
    username: string,

  };

  constructor(username: string){
    this._savedGame.username = username;
  }

  public GetData(): {username: string} {
    return this._savedGame;
  }
}

