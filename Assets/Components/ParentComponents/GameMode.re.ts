import GameInstance from 'Assets/Classes/ParentClasses/GameInstance';
import GeneralUtility from 'Assets/Classes/Utility/GeneralUtility';
import * as RE from 'rogue-engine';


export default class GameMode extends RE.Component {

  @RE.props.prefab() _pcPrefab: RE.Prefab;


  awake() {
    GameInstance.InitializeGameInstance();
  }

  start() {
    RE.Debug.log("Setting GameMode.");

    GeneralUtility.SetCurrentGameMode(this);
  }

}

RE.registerComponent(GameMode);
