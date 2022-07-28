
/**
 * The point at which the mouse begins to shift the camera.
 */
export type CameraBoundary = {
  left: number,
  right: number,
  top: number,
  bot: number,
} 

/**
 * The max distance at which the camera will move.
 */
export type WorldBoundary = {
  /**
   * minus x
   */
  leftX: number,
  /**
   * positive x
   */
  rightX: number,
  /**
   * minus z
   */
  forwardZ: number,
  /**
   * positive z
   */
  backZ: number,
}


