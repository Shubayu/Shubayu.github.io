import { FighterId } from "../constants/fighter.js";
import { createDefualtFighterState } from "./fighterState.js";

export const gameState = {
    fighters: [
        createDefualtFighterState(FighterId.KEN),
        createDefualtFighterState(FighterId.JUWA),
    ]
}