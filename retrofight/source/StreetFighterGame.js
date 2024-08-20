import { registerKeyboardEvents, registerGamepadEvents, pollGamepads,  } from "./engine/inputHandler.js";
import { getContext } from "./utils/context.js";
import { BattleScene } from "./scenes/BattleScene.js";

export class StreetFighterGame{
  context = getContext()
  
  frameTime = {
    previous: 0,
    secondsPassed: 0
  }
  
  constructor() {
   this.scene = new BattleScene()
}

 frame(time) {
  window.requestAnimationFrame(this.frame.bind(this))

  this.frameTime = {
   secondsPassed: (time - this.frameTime.previous) / 1000, 
   previous: time
  }
   
  pollGamepads()
    this.scene.update(this.frameTime, this.context)
    this.scene.draw(this.context)
}

  start() {
    registerKeyboardEvents()
    registerGamepadEvents()

    window.requestAnimationFrame(this.frame.bind(this))
  }
}
