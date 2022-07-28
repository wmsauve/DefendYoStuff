import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import { Debug } from 'rogue-engine';

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

  static EventDispatcher(_eventName: string, _options?: {}){
    let _newEvent: CustomEvent;

    if(_options){
      //default error checker okay?
      _newEvent = new CustomEvent(_eventName, _options);
    }
    else{
      _newEvent = new CustomEvent(_eventName);
    }

    document.dispatchEvent(_newEvent);
  }

  static SetCurrentGameMode(gameMode: GameMode){
    this._currentGameMode = gameMode;
  }

  static FetchGameModeRef(): GameMode{
    return this._currentGameMode;
  }
}

