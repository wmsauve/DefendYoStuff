import GameMode from 'Assets/Components/ParentComponents/GameMode.re';

export default class GeneralUtility {

  private static _currentGameMode: GameMode;

  //Functions related
  static CapValue(_min: number, _max: number, _val: number): number {

    if(_val < _min){
      return _min;
    }

    if(_val > _max){
      return _max;
    }

    return _val;
  }

  static SetCurrentGameMode(gameMode: GameMode){
    this._currentGameMode = gameMode;
  }

  static FetchGameModeRef(): GameMode{
    return this._currentGameMode;
  }
}

