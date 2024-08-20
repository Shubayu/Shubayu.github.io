const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//console.log(gsap)




canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 80) {
collisionsMap.push(collisions.slice(i, 80 + i))
collisions.slice(i, 80 + i)
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 80) {
battleZonesMap.push(battleZonesData.slice(i, 80 + i))

}

const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 80) {
  charactersMap.push(charactersMapData.slice(i, 80 + i))

  
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

let gameStarted = false
function startGame() {
    // Hide the start screen
    const startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    gameStarted = true
  }



const boundaries = []
const offset ={
  x: -250,
  y: -1160
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 5419)
   boundaries.push(
    new Boundary({
      position: {
       x: j * Boundary.width + offset.x,
       y: i * Boundary.height + offset.y
      }
    })
  )}
  )
})


const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 5419)
   battleZones.push(
    new Boundary({
      position: {
       x: j * Boundary.width + offset.x,
       y: i * Boundary.height + offset.y
      }
    })
  )}
  )
})


//console.log(battleZones)

const characters = []
const npcLookDown = new Image()
npcLookDown.src = "./img/npcLookDown.png"

const npcLookUp = new Image()
npcLookUp.src = "./img/npcLookUp.png"

const npcLookLeft = new Image()
npcLookLeft.src = "./img/npcLookLeft.png"

const npcLookRight = new Image()
npcLookRight.src = "./img/npcLookRight.png"

const cowNPC = new Image()
cowNPC.src = "./img/cowNPC.png"

const Shubub = new Image()
Shubub.src = "./img/JuwaCharDown.png"

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
                                                  //1163 npc der nach unten schaut links neben dem haus
    if (symbol === 1163) {
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
         
          frames: {
            max: 4,
            hold: 100
          },
          scale: 1,
          animate: true,
          dialogue: ["hey du ...", "genau du! ...", "hör mal ...", "der alte hase da unten hat dir bestimmt davon erzählt, das diese Welt hier nur eine art About Us game oder so ist ...",
          "das erzählt er jedem der hier ankommt ...", "jedenfalls stimmt das nicht so ganz ...", "nehm dich einfach in acht ...", "viel glück!!"],
                    
          
        })
      )
    }

                                                      //1199 einleiter npc. unter dem haus der mit dem rücken zur cam gedreht ist
    else if (symbol === 1199) {
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookUp,
          frames: {
            max: 4,
            hold: 100
          },
          scale: 1,
          animate: true,
          dialogue: ["Hallouu hallo hallölee! ...", "dies hier ist ein exklusives, nur für den Juwub und Shubub club entwickeltes kleinen Spiel ...", 
          "Hier auf dieser Map findet Ihr paar Gatos und so, mit denen ihr interagieren könnt ...", "ich glaub es war mit -G- oder -Enter- aber da du das hier liest, weißt du es ja schon",
          "Okay also, geplant war, dass dies hier eine art ~interaktives About Us~ game wird ...", "die NPC`s die hier rumstehen erzählen daher also paar allgemeine sachen über uns, und auch paar secret sachen ...",
          "fogendes konzept: es werden Fakten erzählt, aber nicht ob sie von Shu oder von Juwa sind ...", "Ihr müsst also raten zu wem sie gehören 🙂 ...", "tauscht euch gerne auf dem discord dazu aus!! ...", "bevor dieses Gespräch aber zu lange geht, lauf los und erkunde die Welt!"]
        })
      )
    }

    else if (symbol === 1197) {         //1197 Npc der links zum meer schaut 1
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookLeft,
          frames: {
            max: 4,
            hold: 70
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }
    else if (symbol === 1198) {       //1198 npc der links zum meer schaut 2
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookLeft,
          frames: {
            max: 4,
            hold: 80
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1196) {       //1196 cow über haus 1
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: cowNPC,
          frames: {
            max: 4,
            hold: 150
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1100) {       //1100 char ganz oben mit rücken zur cam
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookUp,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1195) {       //1195 cow über haus 2
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: cowNPC,
          frames: {
            max: 4,
            hold: 150
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1194) {       //1195 cow über haus 2
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookLeft,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1271) {       //npc auf gehweg nach rechts
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookRight,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }
    else if (symbol === 1238) {       //npc auf gehweg nach links
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookLeft,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1192) {       //vor herz baum links
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1193) {       //vor herz baum links
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1191) {       //brücke
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1190) {       //brücke
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1189) {       //look right island 2
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookRight,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1188) {       //look down island 2 end
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1187) {       //look down island 2 end
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1186) {       //look down island 2 end
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1185) {       //look down island 2 end
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1184) {       //look down island 2 end
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookDown,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1183) {       //look up island 2
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: npcLookUp,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }

    else if (symbol === 1182) {       //shubub
      characters.push(
        new NPC({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: Shubub,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 1,
          animate: true,
          dialogue: [""]
        })
      )
    }
    
  })
})







const image = new Image()
image.src = "./img/JuwgameMap8040.png"


const foregroundImage = new Image()
foregroundImage.src = "./img/foreground8040.png"

const playerDownImage = new Image()
playerDownImage.src = "./img/JuwaCharDown.png"

const playerUpImage = new Image()
playerUpImage.src = "./img/JuwaCharUp.png"

const playerLeftImage = new Image()
playerLeftImage.src = "./img/JuwaCharLeft.png"

const playerRightImage = new Image()
playerRightImage.src = "./img/JuwaCharRight.png"

const player = new Character({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2
  }, 
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 30
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    down: playerDownImage,
    right: playerRightImage
  }
 })

const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
  x: offset.x,
  y: offset.y
},
image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
    
}




const movables = [background, ...boundaries, foreground, ...battleZones, ...characters]

const renderables = [background, ...boundaries, ...battleZones, ...characters, player, foreground]

const battle = {
  initiated: false
}

function animate () {
    const animationId = window.requestAnimationFrame(animate)
    //console.log(animationId)
    renderables.forEach((renderable) => {
      renderable.draw()
    })

    let moving = true
    player.animate = false

    //console.log(animationId)

 if (battle.initiated) return    

 //activate battle    
 if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
  for (let i = 0; i < battleZones.length; i++) {
    const battleZone = battleZones[i]

    const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
    
    Math.max(player.position.x, battleZone.position.x)) *

    (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -

    Math.max(player.position.y, battleZone.position.y))
    
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: battleZone
      }) &&
      overlappingArea > (player.width * player.height) / 2
      && Math.random() < 0.008
      
    ) {
      console.log("activate battle")

      window.cancelAnimationFrame(animationId)

      audio.Map.stop()
      audio.initBattle.play()
      audio.battle.play()

      battle.initiated = true
      gsap.to("#overlappingDiv", {
        opacity: 1,
        repeat: 4,
        yoyo: true,
        duration: 0.3,
        onComplete() {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            duration: 0.3,
            onComplete() {
              initBattle()
              animateBattle()
              gsap.to("#overlappingDiv", {
                opacity: 0,
                duration: 0.3,
                
              })
            }
          })

        

          
        }
      })
      break
    }
  }
}  



if (keys.w.pressed) {
  player.animate = true
  player.image = player.sprites.up

  checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: 3}
  })


  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, 
        position: {
         x: boundary.position.x,
         y: boundary.position.y + 3
      }}
      })
    ) {
      console.log("colliding")
      moving = false
      break
    }
  }

  

if (moving)
 movables.forEach((movable) => {
    movable.position.y += 0.7
  })}



  else if (keys.a.pressed) {
    player.animate = true
    player.image = player.sprites.left

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3}
    })

    for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, 
        position: {
         x: boundary.position.x + 3,
         y: boundary.position.y + 3
      }}
      })
    ) {
      console.log("colliding")
      moving = false
      break
    }
  }
if (moving)
  movables.forEach((movable) => {
  movable.position.x += 0.7
})}




else if (keys.d.pressed) {
  player.animate = true
  player.image = player.sprites.right

  checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: 3}
  })

  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, 
        position: {
         x: boundary.position.x -1,
         y: boundary.position.y
      }}
      })
    ) {
      console.log("colliding")
      moving = false
      break
    }
  }
if (moving)
 movables.forEach((movable) => {
  movable.position.x -= 0.7
})}


else if (keys.s.pressed) {
  player.animate = true
  player.image = player.sprites.down

  checkForCharacterCollision({
    characters,
    player,
    characterOffset: { x: 0, y: 3}
  })

  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i]
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, 
        position: {
         x: boundary.position.x,
         y: boundary.position.y - 3
      }
    }
  })
)  {
      console.log("colliding")
      moving = false
      break
    }
  }
  if (moving)
    movables.forEach((movable) => {
      movable.position.y -= 0.7
      })
  }
}

    
//animate()




let lastKey = " "
window.addEventListener("keydown", (e) => {
  if (player.isInteracting) {
    audio.talk.play()
    switch (e.key) {
      case " ":
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector("#characterDialogueBox").innerHTML = 
          player.interactionAsset.dialogue[dialogueIndex]
          return
        }
        //finish convo
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector("#characterDialogueBox").style.display = "none"

        break
    }
    return
  }
  
  
  
   switch (e.key) {
    case " ":
      if (!player.interactionAsset) return
      

      //beginning the convo

      const firstMessage = player.interactionAsset.dialogue[0]
      document.querySelector("#characterDialogueBox").innerHTML = firstMessage
      document.querySelector("#characterDialogueBox").style.display = "flex"
      player.isInteracting = true
      break
      


    case "w":
      keys.w.pressed = true
      lastKey = "w"
      break
      
      case "a":
      keys.a.pressed = true
      lastKey = "a"
      break
      
      case "s":
      keys.s.pressed = true
      lastKey = "s"
      break
      
      case "d":
      keys.d.pressed = true
      lastKey = "d"
      break
  }
})



    //console.log(keys)
        


window.addEventListener ("keyup", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = false
        break 
        
      case "a":
        keys.a.pressed = false
        break
      
      case "s":
        keys.s.pressed = false
        break
      
      case "d":
        keys.d.pressed = false
        break
    }})
let clicked = false
addEventListener("click", () => {
  if (!clicked) {
  audio.Map.play()
  clicked = true
}
})


