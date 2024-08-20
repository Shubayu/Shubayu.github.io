import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/game.js"
import { 
    STAGE_WIDTH, 
    SCROLL_BOUNDRY, 
    STAGE_PADDING,
    STAGE_HEIGHT, 
    } from "../constants/stage.js"

export class Camera {
    constructor(x, y, fighters) {
        this.position = { x, y }
        this.fighters = fighters
    }

    update(_, context)  {
        const [{ position: position1 }, { position: position2 }] = this.fighters

        this.position.y = -5 + Math.floor(Math.min(position1.y, position2.y) /10)

        const lowX = Math.min(position1.x, position2.x)
        const highX = Math.max(position1.x, position2.x)

        if (highX - lowX > SCREEN_WIDTH - SCROLL_BOUNDRY * 2) {
            const midPoint = (highX - lowX) / 2
            this.position.x = lowX + midPoint - (SCREEN_WIDTH / 2)
        } else {
            for (const fighter of this.fighters) {
                if (fighter.position.x < this.position.x + SCROLL_BOUNDRY) {
                    this.position.x = fighter.position.x - SCROLL_BOUNDRY
                } else if (fighter.position.x > this.position.x + SCREEN_WIDTH - SCROLL_BOUNDRY) {
                    this.position.x = fighter.position.x - SCREEN_WIDTH + SCROLL_BOUNDRY
                }
            }   
        }

        if (this.position.x < STAGE_PADDING) this.position.x = STAGE_PADDING
        if (this.position.x > STAGE_WIDTH + STAGE_PADDING - SCREEN_WIDTH) {
            this.position.x = STAGE_WIDTH + STAGE_PADDING - SCREEN_WIDTH
        }
        if (this.position.y < 0) this.position.y = 0
        if (this.position.y > STAGE_HEIGHT - SCREEN_HEIGHT) {
            this.position.y = STAGE_HEIGHT - SCREEN_HEIGHT
        }
    }
}