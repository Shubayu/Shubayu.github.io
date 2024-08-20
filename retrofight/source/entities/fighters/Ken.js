import { Fighter } from "./Fighter.js"
import { FighterState, FrameDelay, PushBox, HurtBox, FIGHTER_HURT_DELAY, SpecialMoveDirection, SpecialMoveButton } from "../../constants/fighter.js";
import { playSound } from "../../engine/soundHandler.js";
import { Control } from "../../constants/control.js";
import { Fireball } from "./special/Fireball.js";


export class Ken extends Fighter {
  image = document.querySelector('img[alt="ken"]');
  voiceHadouken = document.querySelector('audio#sound-ken-voice-hadouken')

  frames = new Map([

   ['idle-1', [[[343, 683, 60, 95], [30, 86]], PushBox.IDLE, HurtBox.IDLE]],
   ['idle-2', [[[0, 683, 60, 95],[30, 86]],    PushBox.IDLE, HurtBox.IDLE]],
   ['idle-3', [[[70, 683, 60, 95],[30, 86]],   PushBox.IDLE, HurtBox.IDLE]],
   ['idle-4', [[[138, 683, 60, 95],[30, 86]],  PushBox.IDLE, HurtBox.IDLE]],
   ['idle-5', [[[275, 683, 60, 95],[30, 86]],  PushBox.IDLE, HurtBox.IDLE]],
   ['idle-6', [[[344, 683, 60, 95],[30, 86]],  PushBox.IDLE, HurtBox.IDLE]],

   ['backward-1', [[[415, 867, 62, 99], [30, 86]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-2', [[[485, 866, 60, 99],[30, 86]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-3', [[[556, 864, 62, 99],[30, 86]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-4', [[[626, 863, 63, 99],[30, 86]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-5', [[[700, 864, 59, 99],[30, 86]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-6', [[[771, 864, 60, 99],[30, 86]], PushBox.IDLE, HurtBox.BACKWARD]],
   
   ['forward-1', [[[6, 871, 62, 99], [30, 84]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-2', [[[67, 866, 62, 99],[35, 84]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-3', [[[138, 866, 64, 99],[33, 84]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-4', [[[214, 866, 62, 99],[26, 84]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-5', [[[286, 864, 62, 91],[24, 84]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-6', [[[354, 864, 50, 90],[26, 84]], PushBox.IDLE, HurtBox.FORWARD]],

   ['jump-up-1', [[[658, 1059, 56, 87], [30, 84]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-2', [[[722, 1034, 56, 104],[32, 107]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-3', [[[792, 994, 53, 89],[25, 103]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-4', [[[850, 966, 54, 77],[26, 103]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-5', [[[911, 965, 48, 72],[28, 101]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-6', [[[973, 976, 48, 88],[26, 103]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-7', [[[1030, 1007, 56, 100],[26, 102]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-8', [[[1097, 1059, 56, 100],[26, 100]], PushBox.JUMP, HurtBox.JUMP]],


   ['jump-roll-1', [[[1237, 1037, 55, 103],[25, 106]], PushBox.JUMP, [[-11, -106, 24, 16], [-26, -90, 40, 42], [-26, -31, 40, 32]]]],
   ['jump-roll-2', [[[1301, 990, 61, 78],[22, 90]], PushBox.JUMP, [[-17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]]]],
   ['jump-roll-3', [[[1363, 994, 104, 42],[61, 76]], PushBox.JUMP, [[-22, -60, 24, 18], [-28, -46, 44, 24], [-22, -66, 38, 18]]]],
   ['jump-roll-4', [[[1467, 956, 53, 83],[42, 111]], PushBox.JUMP, [[-39, -60, 24, 18], [-28, -46, 44, 24], [-34, -118, 44, 48]]]],
   ['jump-roll-5', [[[1539, 987, 122, 44],[71, 81]], PushBox.JUMP, [[-72, -60, 24, 18], [-28, -46, 44, 24], [-14, -82, 48, 34]]]],
   ['jump-roll-6', [[[1662, 975, 71, 87],[53, 98]], PushBox.JUMP, [[-55, -60, 24, 18], [-28, -46, 44, 24], [-22, -66, 38, 18]]]],
   ['jump-roll-7', [[[1746, 976, 56, 105],[32, 107]], PushBox.JUMP, [[-55, -60, 24, 18], [-28, -46, 44, 24], [-22, -66, 38, 18]]]],

   ['jump-land', [[[660, 1060, 56, 87],[29, 83]], PushBox.IDLE, HurtBox.IDLE]],


   ['crouch-1', [[[8, 779, 53, 83],[27, 81]], PushBox.IDLE, HurtBox.IDLE]],
   ['crouch-2', [[[79, 794, 57, 69],[25, 66]], PushBox.BEND, HurtBox.BEND]],
   ['crouch-3', [[[148, 802, 61, 61],[25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],

   ['idle-turn-1', [[[420, 682, 54, 95],[27, 92]], PushBox.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
   ['idle-turn-2', [[[488, 678, 58, 98],[25, 95]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
   ['idle-turn-3', [[[560, 684, 54, 94],[25, 90]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],

   
   ['crouch-turn-1', [[[356, 802, 53, 61],[27, 58]], PushBox.CROUCH, HurtBox.CROUCH]],
   ['crouch-turn-2', [[[424, 794, 53, 61],[25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],
   ['crouch-turn-3', [[[486, 802, 53, 61],[25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],

   ['light-punch-1', [[[3, 1152, 64, 91],[26, 83]], PushBox.IDLE, HurtBox.IDLE]],
   ['light-punch-2', [[[72, 1152, 92, 91],[26, 83]], PushBox.IDLE, HurtBox.IDLE, [11, -85, 50, 18]]],

   ['med-punch-1', [[[517, 1149, 65, 94],[26, 86]], PushBox.IDLE, HurtBox.IDLE]],
   ['med-punch-2', [[[650, 1148, 77, 95],[26, 86]], PushBox.IDLE, HurtBox.PUNCH]],
   ['med-punch-3', [[[736, 1148, 108, 95],[26, 86]], PushBox.IDLE, HurtBox.PUNCH, [17, -85, 68, 14]]],

   ['heavy-punch-1', [[[736, 1148, 108, 94],[26, 90]], PushBox.IDLE, HurtBox.PUNCH, [6, -85, 76, 14]]],
 
   ['light-kick-1', [[[62, 1565, 66, 92],[46, 88]], PushBox.IDLE, [[-33, -96, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]]]],
   ['light-kick-2', [[[143, 1565, 114, 94],[68, 88]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [-17, -90, 66, 15]]],

   ['med-kick-1', [[[143, 1565, 114, 92],[68, 88]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [-18, -90, 66, 15]]],

   ['heavy-kick-1', [[[683, 1571, 61, 90],[37, 88]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
   ['heavy-kick-2', [[[763, 1567, 95, 94],[45, 88]], PushBox.IDLE, [[-65, -96, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]], [15, -99, 40, 32]]],
   ['heavy-kick-3', [[[870, 1567, 120, 94],[42, 88]], PushBox.IDLE, [[13, -92, 62, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]], [21, -97, 62, 24]]],
   ['heavy-kick-4', [[[1005, 1584, 101, 77],[39, 75]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
   ['heavy-kick-5', [[[1147, 1577, 64, 81],[38, 75]], PushBox.IDLE, [[-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],

   ["hit-face-1", [[[325, 3275, 62, 90], [41, 87]], PushBox.IDLE, [[-25, -89, 20, 20], [-33, -74, 40, 46], [-30, -37, 40, 38]]]],
   ["hit-face-2", [[[400, 3279, 68, 89], [47, 86]], PushBox.IDLE, [[-42, -88, 20, 20], [-46, -74, 40, 46], [-33, -37, 40, 38]]]],
   ["hit-face-3", [[[484, 3279, 72, 88], [53, 88]], PushBox.IDLE, [[-52, -87, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],
   ["hit-face-4", [[[575, 3274, 81, 93], [56, 90]], PushBox.IDLE, [[-57, -89, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],

   ["hit-stomach-1", [[[1, 3279, 58, 85], [37, 83]], PushBox.IDLE, [[-15, -85, 28, 18], [-31, -69, 42, 42], [-30, -34, 42, 34]]]],
   ["hit-stomach-2", [[[74, 3282, 66, 82], [39, 80]], PushBox.IDLE, [[-17, 82, 28, 18], [-33, -65, 38, 36], [-34, -34, 42, 34]]]],
   ["hit-stomach-3", [[[149, 3287, 71, 84], [47, 75]], PushBox.IDLE, [[-17, 82, 28, 18], [-41, -59, 38, 30], [-34, -34, 42, 34]]]],
   ["hit-stomach-4", [[[231, 3293, 75, 72], [50, 69]], PushBox.IDLE, [[-28, -67, 28, 18], [-41, -59, 38, 30], [-40, -34, 42, 34]]]],

   ["stun-1", [[[149, 3370, 77, 87], [28, 85]], PushBox.IDLE, [[8, -87, 28, 18], [-16, -75, 40, 46], [-26, -31, 40, 32]]]],
   ["stun-2", [[[77, 3368, 65, 89], [28, 87]], PushBox.IDLE, [[-9, -89, 28, 18], [-23, -75, 40, 46], [-26, -31, 40, 32]]]],
   ["stun-3", [[[1, 3367, 67, 90], [35, 88]], PushBox.IDLE, [[-22, -91, 28, 18], [-30, -72, 42, 40], [-26, -31, 40, 32]]]],

   ["special-1", [[[3, 2741, 74, 90], [45, 85]], PushBox.IDLE, HurtBox.IDLE]],
   ["special-2", [[[91, 2747, 85, 83], [45, 80]], PushBox.IDLE, HurtBox.IDLE]],
   ["special-3", [[[188, 2750, 90, 81], [45, 78]], PushBox.IDLE, HurtBox.IDLE]],
   ["special-4", [[[293, 2754, 106, 77], [45, 74]], PushBox.IDLE, HurtBox.IDLE]],
 ])

  animations = {
   [FighterState.IDLE]: [
     ['idle-1', 4], ['idle-2', 4], ['idle-3', 4],
     ['idle-4', 4], ['idle-5', 4], ['idle-6', 4],
   ],

   [FighterState.WALK_FORWARD]: [
     ['forward-1', 3], ['forward-2', 6], ['forward-3', 4],
     ['forward-4', 4], ['forward-5', 4], ['forward-6', 6],
   ],

   [FighterState.WALK_BACKWARD]: [
     ['backward-1', 3], ['backward-2', 6], ['backward-3', 4],
     ['backward-4', 4], ['backward-5', 4], ['backward-6', 6],
   ],

   [FighterState.JUMP_START]: [
     ['jump-land', 3], ['jump-land', FrameDelay.TRANSITION],
   ],

   [FighterState.JUMP_UP]: [
     ['jump-up-1', 8], ['jump-up-2', 8], ['jump-up-3', 8], ["jump-up-4", 8],
     ['jump-up-5', 8], ['jump-up-6', 8], ['jump-up-7', 20], ["jump-up-8", FrameDelay.FREEZE],
   ],

   [FighterState.JUMP_FORWARD]: [
     ['jump-roll-1', 13], ['jump-roll-2', 5], ["jump-roll-3", 3], ['jump-roll-4', 3],
     ['jump-roll-5', 3], ['jump-roll-6', 5], ['jump-roll-7', FrameDelay.FREEZE],
   ],

   [FighterState.JUMP_BACKWARD]: [
     ['jump-roll-7', 15], ['jump-roll-6', 3], ["jump-roll-5", 3],
     ['jump-roll-4', 3], ['jump-roll-3', 3], ['jump-roll-2', 1], ["jump-roll-1", FrameDelay.FREEZE],
   ],

   [FighterState.JUMP_LAND]: [
     ['jump-land', 2], ['jump-land', 5], 
     ['jump-land', FrameDelay.TRANSITION],
   ],

   [FighterState.CROUCH]: [
     ['crouch-3', FrameDelay.FREEZE],
   ],

   [FighterState.CROUCH_DOWN]: [
     ['crouch-1', 2], ['crouch-2', 2], 
     ['crouch-3', 2], ['crouch-3', FrameDelay.TRANSITION],
   ],

   [FighterState.CROUCH_UP]: [
     ['crouch-3', 2], ['crouch-2', 2], 
     ['crouch-1', 2], ['crouch-1', FrameDelay.TRANSITION],
   ],

   [FighterState.CROUCH_TURN]: [
     ['crouch-turn-3', 2], ['crouch-turn-2', 2], 
     ['crouch-turn-1', 2], ['crouch-turn-1', FrameDelay.TRANSITION],
   ],

   [FighterState.IDLE_TURN]: [
     ['idle-turn-3', 2], ['idle-turn-2', 2], 
     ['idle-turn-1', 2], ['idle-turn-1', FrameDelay.TRANSITION],
   ],

   [FighterState.LIGHT_PUNCH]: [
     ['light-punch-1', 2], ['light-punch-2', 4], 
     ['light-punch-1', 4], ['light-punch-1', FrameDelay.TRANSITION],
   ],

   [FighterState.MEDIUM_PUNCH]: [
     ['med-punch-1', 1], ['med-punch-2', 2], 
     ['med-punch-3', 4], ['med-punch-2', 3],
     ['med-punch-1', 3], ['med-punch-1', FrameDelay.TRANSITION],
   ],

   [FighterState.HEAVY_PUNCH]: [
     ['med-punch-1', 3], ['med-punch-2', 2], 
     ['heavy-punch-1', 6], ['med-punch-2', 10],
     ['med-punch-1', 12], ['med-punch-1', FrameDelay.TRANSITION],
   ],
   
   [FighterState.LIGHT_KICK]: [
     ['med-punch-1', 4], ['light-kick-1', 4], 
     ['light-kick-2', 14], ['light-kick-1', 6], ['med-punch-1', 1],
     ['med-punch-1', FrameDelay.TRANSITION],
   ],

   [FighterState.MEDIUM_KICK]: [
     ['med-punch-1', 5], ['light-kick-1', 6], 
     ['med-kick-1', 7], ['light-kick-1', 1],
     ['light-kick-1', FrameDelay.TRANSITION],
   ],

   [FighterState.HEAVY_KICK]: [
     ['heavy-kick-1', 2], ['heavy-kick-2', 4], 
     ['heavy-kick-3', 8], ['heavy-kick-4', 10],
     ['heavy-kick-5', 7], ['heavy-kick-5', FrameDelay.TRANSITION],
   ],

   [FighterState.HURT_HEAD_LIGHT]: [
    ["hit-face-1", FIGHTER_HURT_DELAY], ["hit-face-1", 3],
    ["hit-face-2", 8], ["hit-face-2", FrameDelay.TRANSITION],
   ],

   [FighterState.HURT_HEAD_MEDIUM]: [
    ["hit-face-1", FIGHTER_HURT_DELAY], ["hit-face-1", 3],
    ["hit-face-2", 4], ["hit-face-3", 9], ["hit-face-3", FrameDelay.TRANSITION],
   ],
   
   [FighterState.HURT_HEAD_HEAVY]: [
    ["hit-face-3", FIGHTER_HURT_DELAY], ["hit-face-3", 7],
    ["hit-face-4", 4], ["stun-3", 9], ["stun-3", FrameDelay.TRANSITION],
   ],

   [FighterState.HURT_BODY_LIGHT]: [
    ["hit-stomach-1", FIGHTER_HURT_DELAY], ["hit-stomach-1", 11],
    ["hit-stomach-1", FrameDelay.TRANSITION],
   ],

   [FighterState.HURT_BODY_MEDIUM]: [
    ["hit-stomach-1", FIGHTER_HURT_DELAY], ["hit-stomach-1", 7],
    ["hit-stomach-2", 9], ["hit-stomach-2", FrameDelay.TRANSITION],
   ],

   [FighterState.HURT_BODY_HEAVY]: [
    ["hit-stomach-2", FIGHTER_HURT_DELAY], ["hit-stomach-2", 3], ["hit-stomach-3", 4],
    ["hit-stomach-4", 4], ["stun-3", 9], ["stun-3", FrameDelay.TRANSITION],
   ],

   [FighterState.SPECIAL_1]: [
    ["special-1", 2], ["special-2", 8], ["hit-stomach-3", 2],
    ["special-4", 40], ["special-4", FrameDelay.TRANSITION],
   ],
 }  

 initialVelocity = {
   x: {
     [FighterState.WALK_FORWARD]: 3 * 60,
     [FighterState.WALK_BACKWARD]: - (2 * 60),
     [FighterState.JUMP_FORWARD]:  ((48 * 3) + (12 * 2)),
     [FighterState.JUMP_BACKWARD]: - ((45 * 4) + (15 * 3)),
   },
   jump: -420,
 }

 specialMoves = [
  {
    state: FighterState.SPECIAL_1,
    sequence: [
      SpecialMoveDirection.DOWN, SpecialMoveDirection.FORWARD_DOWN, 
      SpecialMoveDirection.FORWARD, SpecialMoveButton.ANY_PUNCH
    ],
    cursor: 0,
  },
 ]

 gravity = 1000

 fireball = { fired: false, strength: undefined }

 constructor(playerId, onAttackHit, entityList) {
   super(playerId, onAttackHit);

   this.entityList = entityList

   this.states[FighterState.SPECIAL_1] = {
    init: this.handleHadoukenInit.bind(this),
    update: this.handleHadoukenState.bind(this),
    shadow: [1.6, 1, 11, 0],
    validFrom: [
      FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.IDLE_TURN, 
      FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP, FighterState.CROUCH_TURN, 
    ],
   }
   this.states[FighterState.IDLE].validFrom.push(FighterState.SPECIAL_1)
 }

 handleHadoukenInit(_, strength) {
  this.resetVelocities()
  playSound(this.voiceHadouken)
  this.fireball = { fired: false, strength }
 }

 handleHadoukenState(time) {
  if (!this.fireball.fired && this.animationFrame == 3) {
    this.fireball.fired = true
    this.entityList.add.call(this.entityList, Fireball, time, this, this.fireball.strength)
  }

  if (!this.isAnimationCompleted()) return
  this.changeState(FighterState.IDLE, time)
 }
}
