import GameInstance from 'Assets/Classes/ParentClasses/GameInstance';
import GeneralUtility, { ELogType } from 'Assets/Classes/Utility/GeneralUtility';
import * as RE from 'rogue-engine';


export default class GameMode extends RE.Component {

  @RE.props.prefab() _pcPrefab: RE.Prefab;


  awake() {
    GameInstance.InitializeGameInstance();
  }

  start() {
    GeneralUtility.LogWithType(ELogType.Initialize, "Setting which GameMode.")

    GeneralUtility.SetCurrentGameMode(this);
  }

}

RE.registerComponent(GameMode);
