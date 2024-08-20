import { Fighter } from "./Fighter.js"
import { FighterState, FrameDelay, PushBox, HurtBox, FIGHTER_HURT_DELAY, SpecialMoveDirection, SpecialMoveButton } from "../../constants/fighter.js";
import { playSound } from "../../engine/soundHandler.js";
import { Control } from "../../constants/control.js";
import { Fireball } from "./special/Fireball.js";


export class Juwa extends Fighter {
  image = document.querySelector('img[alt="juwa"]');
  voiceHadouken = document.querySelector('audio#sound-juwa-voice-hadouken')

  frames = new Map([
   ['idle-1', [[[2817, 116, 75, 98], [32, 88]], PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-2', [[[2735, 116, 75, 98],[34, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-3', [[[2654, 116, 76, 98],[32, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-4', [[[2573, 116, 75, 98],[32, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-5', [[[2494, 116, 75, 98],[32, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-6', [[[2411, 116, 75, 98],[33, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-7', [[[2330, 116, 75, 98],[32, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-8', [[[2249, 116, 75, 98],[32, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-9', [[[2171, 116, 75, 98],[32, 88]],  PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-10', [[[2089, 116, 75, 98],[32, 88]], PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],
   ['idle-11', [[[2000, 116, 75, 98],[32, 88]], PushBox.IDLE, [[-12, -85, 19, 16], [-19, -70, 33, 42], [-19, -31, 50, 32]]]],

   ['backward-1', [[[1888, 1006, 75, 100], [34, 94]], PushBox.IDLE,  HurtBox.BACKWARD]],
   ['backward-2', [[[1807, 1006, 72, 100],[34, 94]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-3', [[[1726, 1006, 76, 100],[34, 94]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-4', [[[1672, 1006, 50, 100],[24, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-5', [[[1614, 1006, 52, 100],[19, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-6', [[[1558, 1006, 50, 100],[25, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-7', [[[1466, 1006, 68, 103],[36, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-8', [[[1384, 1006, 72, 103],[36, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-9', [[[1304, 1006, 74, 103],[38, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-10', [[[1234, 1006, 60, 103],[24, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-11', [[[1160, 1006, 50, 103],[18, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   ['backward-12', [[[1104, 1006, 52, 103],[25, 98]], PushBox.IDLE, HurtBox.BACKWARD]],
   
   ['forward-1', [[[2816, 1006, 69, 100], [34, 94]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-2', [[[2734, 1006, 70, 100],[34, 94]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-3', [[[2653, 1006, 70, 100],[34, 94]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-4', [[[2571, 1006, 68, 100],[36, 99]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-5', [[[2519, 1006, 51, 100],[24, 99]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-6', [[[2441, 1006, 71, 100],[36, 99]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-7', [[[2361, 1006, 74, 100],[36, 96]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-8', [[[2280, 1006, 71, 100],[36, 96]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-9', [[[2198, 1006, 71, 102],[36, 96]], PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-10', [[[2117, 1006, 65, 102],[36, 99]],PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-11', [[[2060, 1006, 53, 102],[30, 99]],PushBox.IDLE, HurtBox.FORWARD]],
   ['forward-12', [[[1971, 1006, 65, 102],[36, 99]],PushBox.IDLE, HurtBox.FORWARD]],

   ['jump-up-1', [[[2154, 495, 51, 118], [30, 120]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-2', [[[2090, 511, 50, 83],[29, 96]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-3', [[[2021, 501, 53, 72],[30, 96]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-4', [[[1949, 505, 60, 56],[29, 96]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-5', [[[1872, 501, 55, 69],[31, 96]], PushBox.JUMP, HurtBox.JUMP]],
   ['jump-up-6', [[[1806, 495, 56, 100],[30, 109]], PushBox.JUMP, HurtBox.JUMP]],
   //['jump-up-7', [[1748, 491, 56, 118],[30, 120]]],

   ['jump-roll-1', [[[1661, 503, 68, 100], [42, 84]], PushBox.JUMP, [[-5, -88, 24, 16], [-30, -74, 40, 42], [-26, -31, 50, 32]]]],
   ['jump-roll-2', [[[1565, 508, 95, 104],[35, 84]], PushBox.JUMP, [[-5, -88, 24, 16], [-30, -74, 40, 42], [-26, -31, 50, 32]]]],
   ['jump-roll-3', [[[1476, 500, 83, 66],[33, 84]], PushBox.JUMP, [[-5, -88, 24, 16], [-30, -74, 40, 42], [-26, -31, 50, 32]]]],
   ['jump-roll-4', [[[1350, 493, 100, 95],[26, 84]], PushBox.JUMP, [[-5, -88, 24, 16], [-30, -74, 40, 42], [-26, -31, 50, 32]]]],
   ['jump-roll-5', [[[1213, 521, 120, 119],[24, 84]], PushBox.JUMP, [[-5, -88, 24, 16], [-30, -74, 40, 42], [-26, -31, 50, 32]]]],
   ['jump-roll-6', [[[1103, 525, 100, 100],[26, 84]], PushBox.JUMP, [[-5, -88, 24, 16], [-30, -74, 40, 42], [-26, -31, 50, 32]]]],

   ['jump-land', [[[2821, 223, 68, 118], [30, 80]], PushBox.IDLE, HurtBox.IDLE]],


   ['crouch-1', [[[2660, 251, 65, 70],[27, 56]], PushBox.IDLE, HurtBox.CROUCH]],
   ['crouch-2', [[[2742, 240, 61, 90],[25, 66]], PushBox.BEND, HurtBox.CROUCH]],
   ['crouch-3', [[[2821, 224, 67, 90],[25, 80]], PushBox.CROUCH, HurtBox.CROUCH]],

   ['idle-turn-1', [[[2000, 114, 70, 95],[27, 92]], PushBox.IDLE, [[-10, -89, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
   ['idle-turn-2', [[[2090, 114, 70, 98],[25, 95]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],
   ['idle-turn-3', [[[2172, 114, 71, 95],[25, 90]], PushBox.IDLE, [[-16, -96, 28, 18], [-14, -74, 40, 42], [-14, -31, 40, 32]]]],

   
   ['crouch-turn-1', [[[2410, 247, 61, 61],[27, 58]], PushBox.CROUCH, HurtBox.CROUCH]],
   ['crouch-turn-2', [[[2497, 247, 62, 61],[25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],
   ['crouch-turn-3', [[[2580, 237, 61, 61],[25, 58]], PushBox.CROUCH, HurtBox.CROUCH]],

   ['light-punch-1', [[[2820, 1245, 85, 95],[32, 88]], PushBox.IDLE, HurtBox.IDLE]],
   ['light-punch-2', [[[2724, 1246, 92, 95],[32, 88]], PushBox.IDLE, HurtBox.IDLE]],
   ['light-punch-3', [[[2611, 1245, 113, 117],[32, 88]], PushBox.IDLE, HurtBox.IDLE,  [25, -75, 50, 18]]],

   ['med-punch-1', [[[2530, 1250, 69, 95],[26, 87]], PushBox.IDLE, HurtBox.IDLE, [10, -70, 68, 14]]],
   ['med-punch-2', [[[2434, 1245, 71, 95],[26, 87]], PushBox.IDLE, HurtBox.PUNCH]],
   ['med-punch-3', [[[2290, 1245, 125, 95],[26, 87]], PushBox.IDLE, HurtBox.PUNCH]],

   ['heavy-punch-1', [[[2293, 1132, 82, 113],[26, 105]], PushBox.IDLE, HurtBox.PUNCH]],
   ['heavy-punch-2', [[[2205, 1155, 85, 90],[26, 80]], PushBox.IDLE, HurtBox.CROUCH]],
   ['heavy-punch-3', [[[2091, 1155, 91, 90],[26, 80]], PushBox.IDLE, HurtBox.CROUCH,]],
   ['heavy-punch-4', [[[1962, 1155, 113, 90],[26, 80]], PushBox.IDLE, HurtBox.CROUCH, [10, -70, 76, 14]]],
 
   ['light-kick-1', [[[2821, 1375, 60, 95], [30, 87]], PushBox.IDLE, HurtBox.IDLE]],
   ['light-kick-2', [[[2734, 1377, 72, 95], [30, 87]], PushBox.IDLE, HurtBox.IDLE, [-4, -65, 45, 28]]],

   ['med-kick-1', [[[2671, 1377, 54, 94], [30, 87]], PushBox.IDLE,  HurtBox.IDLE]],
   ['med-kick-2', [[[2596, 1377, 56, 92], [30, 87]], PushBox.IDLE,  HurtBox.IDLE, [-10, -75, 80, 10]]], 
   ['med-kick-3', [[[2465, 1377, 103, 94], [30, 87]], PushBox.IDLE,  HurtBox.IDLE]],

   ['heavy-kick-1', [[[2500, 1491, 78, 90],[30, 87]], PushBox.IDLE, [[-1, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]],
   ['heavy-kick-2', [[[2365, 1483, 120, 98],[30, 91]], PushBox.IDLE,  [[-1, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]]]], 
   ['heavy-kick-3', [[[2227, 1470, 121, 116],[30, 110]], PushBox.IDLE,  [[60, -80, 30, 18], [-25, -78, 42, 42], [-11, -50, 42, 50]], [29, -75, 62, 24]]],

   ["hit-face-1", [[[2456, 344, 83, 91], [41, 87]], PushBox.IDLE, [[-25, -89, 20, 20], [-33, -74, 40, 46], [-30, -37, 40, 38]]]],
   ["hit-face-2", [[[2365, 346, 83, 91], [47, 86]], PushBox.IDLE, [[-42, -88, 20, 20], [-46, -74, 40, 46], [-33, -37, 40, 38]]]],
   ["hit-face-3", [[[2249, 349, 95, 97], [53, 88]], PushBox.IDLE, [[-52, -87, 20, 20], [-53, -71, 40, 46], [-33, -37, 40, 38]]]],

   ["hit-stomach-1", [[[2107, 373, 66, 61], [37, 83]], PushBox.IDLE, [[-15, -85, 28, 18], [-31, -69, 42, 42], [-30, -34, 42, 34]]]],

   ["stun-1", [[[2820, 2011, 65, 87], [28, 85]], PushBox.IDLE, [[8, -87, 28, 18], [-16, -75, 40, 46], [-26, -31, 40, 32]]]],
   ["stun-2", [[[2739, 2011, 67, 89], [28, 87]], PushBox.IDLE, [[-9, -89, 28, 18], [-23, -75, 40, 46], [-26, -31, 40, 32]]]],
   ["stun-3", [[[2658, 2011, 67, 90], [35, 88]], PushBox.IDLE, [[-22, -91, 28, 18], [-30, -72, 42, 40], [-26, -31, 40, 32]]]],

   ["special-1", [[[2428, 2828, 70, 90], [45, 90]], PushBox.IDLE, HurtBox.IDLE]],
   ["special-2", [[[2493, 2828, 70, 95], [45, 90]], PushBox.IDLE, HurtBox.IDLE]],
   ["special-3", [[[2574, 2828, 70, 95], [45, 90]], PushBox.IDLE, HurtBox.IDLE]],
   ["special-4", [[[2618, 2928, 95, 95], [45, 90]], PushBox.IDLE, HurtBox.IDLE]],
 ])

 animations = {
   [FighterState.IDLE]: [
     ['idle-1', 6], ['idle-2', 6], ['idle-3', 6], ['idle-4', 6], ['idle-5', 6], ['idle-6', 6],
     ['idle-7', 6], ['idle-8', 6],
   ],

   [FighterState.WALK_FORWARD]: [
     ['forward-1', 3], ['forward-2', 6], ['forward-3', 4], ['forward-4', 4], ['forward-5', 4], ['forward-6', 6],
     ['forward-7', 3], ['forward-8', 6], ['forward-9', 4], ['forward-10', 4], ['forward-11', 4], ['forward-12', 6],
   ],

   [FighterState.WALK_BACKWARD]: [
     ['backward-1', 3], ['backward-2', 6], ['backward-3', 4], ['backward-4', 4], ['backward-5', 4], ['backward-6', 6],
     ['backward-7', 3], ['backward-8', 6], ['backward-9', 4], ['backward-10', 4], ['backward-11', 4], ['backward-12', 6],
   ],

   [FighterState.JUMP_START]: [
     ['jump-land', 3], ['jump-land', FrameDelay.TRANSITION],
   ],

   [FighterState.JUMP_UP]: [
     ['jump-up-1', 8], ['jump-up-2', 8], ['jump-up-3', 8], ["jump-up-4", 8],
     ['jump-up-5', 8], ['jump-up-6', FrameDelay.FREEZE],
   ],

   [FighterState.JUMP_FORWARD]: [
     ['jump-roll-6', 13], ['jump-roll-5', 5], ['jump-roll-4', 3], 
     ['jump-roll-3', 3], ['jump-roll-2', 5], ['jump-roll-1', FrameDelay.FREEZE], 
   ],

   [FighterState.JUMP_BACKWARD]: [
     ['jump-roll-1', 8], ['jump-roll-2', 8], ['jump-roll-3', 8], 
     ['jump-roll-4', 8], ['jump-roll-5', 8], ['jump-roll-6', FrameDelay.FREEZE],
   ],

   [FighterState.JUMP_LAND]: [
     ['jump-land', 2], ['jump-land', 5], 
     ['jump-land', FrameDelay.TRANSITION],
   ],

   [FighterState.CROUCH]: [
     ['crouch-2', FrameDelay.FREEZE],
   ],

   [FighterState.CROUCH_DOWN]: [
     ['crouch-3', 2], ['crouch-3', 2], 
     ['crouch-2', 2], ['crouch-2', FrameDelay.TRANSITION],
   ],

   [FighterState.CROUCH_UP]: [
     ['crouch-2', 2], ['crouch-2', 2], 
     ['crouch-3', 2], ['crouch-3', FrameDelay.TRANSITION],
   ],

   [FighterState.CROUCH_TURN]: [
     ['crouch-turn-2', 2], ['crouch-turn-2', 2], 
     ['crouch-turn-3', 2], ['crouch-turn-3', FrameDelay.TRANSITION],
   ],

   [FighterState.IDLE_TURN]: [
     ['idle-turn-1', 2], ['idle-turn-2', 2], 
     ['idle-turn-3', 2], ['idle-turn-3', FrameDelay.TRANSITION],
   ],
   [FighterState.LIGHT_PUNCH]: [
     ['light-punch-1',1], ['light-punch-2', 1], 
     ['light-punch-3', 1], ['light-punch-2', 1],
     ['light-punch-1', 1], ['light-punch-1', FrameDelay.TRANSITION],
   ],
   [FighterState.MEDIUM_PUNCH]: [
     ['med-punch-1', 1], ['med-punch-2', 2], 
     ['med-punch-3', 4], ['med-punch-2', 3],
     ['med-punch-1', 2], ['med-punch-1', FrameDelay.TRANSITION],
   ],
   [FighterState.HEAVY_PUNCH]: [
     ['heavy-punch-1', 3], ['heavy-punch-2', 2], 
     ['heavy-punch-3', 6], ['heavy-punch-4', 10],
     ['heavy-punch-3', 12], ['heavy-punch-2', 13],['heavy-punch-1', FrameDelay.TRANSITION],
   ],
   [FighterState.LIGHT_KICK]: [
     ['light-kick-1', 3], ['light-kick-2', 3], 
     ['light-kick-1', 8], ['light-kick-1', FrameDelay.TRANSITION],
   ],
   [FighterState.MEDIUM_KICK]: [
     ['med-kick-1', 5], ['med-kick-2', 6], 
     ['med-kick-3', 12], ['med-kick-2', 7],
     ['med-kick-1', 7], ['med-kick-1', FrameDelay.TRANSITION],
   ],
   [FighterState.HEAVY_KICK]: [
     ['heavy-kick-1', 2], ['heavy-kick-2', 4], 
     ['heavy-kick-3', 8], ['heavy-kick-2', 10],
     ['heavy-kick-1', 7], ['heavy-kick-1', FrameDelay.TRANSITION],
   ],
   [FighterState.HURT_HEAD_LIGHT]: [
    ["hit-face-1", FIGHTER_HURT_DELAY], ["hit-face-1", 3],
    ["hit-face-2", 8], ["hit-face-2", FrameDelay.TRANSITION],
   ],
   [FighterState.HURT_HEAD_MEDIUM]: [
    ["hit-face-1", FIGHTER_HURT_DELAY], ["hit-face-1", 3],
    ["hit-face-2", 8], ["hit-face-2", FrameDelay.TRANSITION],
   ],
   [FighterState.HURT_HEAD_HEAVY]: [
    ["hit-face-1", FIGHTER_HURT_DELAY], ["hit-face-1", 3],
    ["hit-face-2", 4], ["hit-face-3", 9], ["hit-face-3", 7], ["hit-face-3", 4],
    ["stun-3", 9], ["stun-3", FrameDelay.TRANSITION],
   ],
   [FighterState.HURT_BODY_LIGHT]: [
    ["hit-stomach-1", FIGHTER_HURT_DELAY], ["hit-stomach-1", 11],
    ["hit-stomach-2", FrameDelay.TRANSITION],
   ],
   [FighterState.HURT_BODY_MEDIUM]: [
    ["hit-stomach-1", FIGHTER_HURT_DELAY], ["hit-stomach-1", 7],
    ["hit-stomach-1", 9], ["hit-stomach-2", FrameDelay.TRANSITION],
   ],
   [FighterState.HURT_BODY_HEAVY]: [
    ["hit-stomach-1", FIGHTER_HURT_DELAY], ["hit-stomach-1", 3], ["hit-stomach-1", 4],
    ["hit-stomach-1", 9], ["stun-3", 9], ["stun-3", FrameDelay.TRANSITION],
   ],

   [FighterState.SPECIAL_1]: [
    ["special-1", 2], ["special-2", 8], ["hit-stomach-3", 2],
    ["special-4", 40], ["special-4", FrameDelay.TRANSITION],
   ],
 }  

 initialVelocity = {
  x: {
    [FighterState.WALK_FORWARD]: 3 * 60,
    [FighterState.WALK_BACKWARD]: -(2 * 60),
    [FighterState.JUMP_FORWARD]:  ((48 * 3) + (12 * 2)),
    [FighterState.JUMP_BACKWARD]: -((45 * 4) + (15 * 3)),
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
   shadow: [1, 1, 1, 0],
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
