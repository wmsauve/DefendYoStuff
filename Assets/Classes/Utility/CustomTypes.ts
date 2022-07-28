
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

/**
 * Currently, keybindings are camera movement and skills.
 * Perhaps add more in the future.
 */
export type KeyBindings = {
  /**
   * Camera moves in the minus z direction in world coordinates.
   */
  forward: string,
  /**
   * Camera moves in the plus z direction in world coordinates.
   */
  backward: string,
  /**
   * Camera moves in the minus x direction in world coordinates.
   */
  left: string,
  /**
   * Camera moves in the plus x direction in world coordinates.
   */
  right: string,

  /**
   * leftmost skill
   */
  skill1: string,
  /**
   * left center skill
   */
  skill2: string,
  /**
   * right center skill
   */
  skill3: string,
  /**
   * rightmost skill
   */
  skill4: string,
}

