import { CameraBoundary, WorldBoundary } from "./CustomTypes";

export default class GameWorldConfig {
  //Values related
  private _cameraBoundary: CameraBoundary = {
    left: 0,
    right: 0,
    top: 0,
    bot: 0,
  };

  private _worldBoundary: WorldBoundary = {
    leftX: 0,
    rightX: 0,
    forwardZ: 0,
    backZ: 0,
  }

  constructor(cameraBound: CameraBoundary, worldBound: WorldBoundary){
    this._cameraBoundary = cameraBound;
    this._worldBoundary = worldBound;
  }

  public GetCameraBoundary(): CameraBoundary{
    return this._cameraBoundary;
  }

  public GetWorldBoundary(): WorldBoundary{
    return this._worldBoundary;
  }
}
