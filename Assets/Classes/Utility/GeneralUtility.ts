import GameMode from 'Assets/Components/ParentComponents/GameMode.re';
import { Debug } from 'rogue-engine';


export enum ELogType{
  Initialize,
  ErrorCheck,
  Testing,
}

export default class GeneralUtility {

  private static _currentGameMode: GameMode;

  //Utility related functions
  private static _logDefText: string = "LogDefault";
  private static _logInitText: string = "LogInit";
  private static _logErrText: string = "LogError";
  private static _logTestText: string = "LogTesting";

  public static LogWithType(_logType: ELogType, _message: string){

    let _log: string = "";

    switch(_logType){
      case ELogType.Initialize:
        _log = this._logInitText;
        break;
      case ELogType.ErrorCheck:
        _log = this._logErrText;
        break;
      case ELogType.Testing:
        _log = this._logTestText;
        break;
      default:
        _log = this._logDefText;
        break;
    }
    Debug.log(_log + " : " + _message);
  }



  //Game related functions
  public static CapValue(_min: number, _max: number, _val: number): number {

    if(_val < _min){
      return _min;
    }

    if(_val > _max){
      return _max;
    }

    return _val;
  }

  public static EventDispatcher(_eventName: string, _options?: {}){
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

  public static SetCurrentGameMode(gameMode: GameMode){
    this._currentGameMode = gameMode;
  }

  public static FetchGameModeRef(): GameMode{
    return this._currentGameMode;
  }
}

