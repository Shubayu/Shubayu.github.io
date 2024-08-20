class Sprite {
    constructor({
      position, 
      image, 
      frames = { max: 1, hold: 10}, 
      sprites, 
      animate = false, 
      rotation = 0,
      scale = 1,
    }) {
        this.position = position
        this.image = new Image()
        this.frames = {...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
          this.width = (this.image.width / this.frames.max) * scale
          this.height = this.image.height * scale
        }
        this.image.src = image.src

        this.animate = animate
        this.sprites = sprites
        this.opacity = 1

        this.roation = rotation
        this.scale = scale
      
    }

    draw() {
        c.save()
        c.translate(
         this.position.x + this.width / 2, 
         this.position.y + this.height / 2
         )
        c.rotate(this.rotation)

        c.translate(
          -this.position.x - this.width / 2, 
          -this.position.y - this.height / 2
          )
        
        c.globalAlpha = this.opacity

        const crop = {
          position: {
            x: this.frames.val * (this.width / this.scale),
            y: 0
          },
          width: this.image.width / this.frames.max,
          height: this.image.height
        }

        const image = {
          position: {
            x: this.position.x,
            y: this.position.y
          },
          width: this.image.width / this.frames.max,
          height: this.image.height
        }

        c.drawImage(
          this.image,
          crop.position.x,
          crop.position.y,
          crop.width,
          crop.height,
          image.position.x,
          image.position.y,
          image.width * this.scale,
          image.height * this.scale
      )
         c.restore()


      if (!this.animate) return
      if (this.frames.max > 1) {
        this.frames.elapsed++
      }
  
      if (this.frames.elapsed % this.frames.hold === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
      }
    
    }
  
 }
  


class Monster extends Sprite {
  constructor({
    position, 
    image, 
    frames = { max: 1, hold: 10}, 
    sprites, 
    animate = false, 
    rotation = 0,  
    isEnemy = false, 
    name,
    attacks
  }) {
    super({
      position, 
      image, 
      frames, 
      sprites, 
      animate, 
      rotation
    })
    this.health = 100
    this.isEnemy = isEnemy
    this.name = name
    this.attacks = attacks
  }

  faint() {
    document.querySelector("#dialogueBox").innerHTML = this.name + " is kill and dieded so hard uhh sooo harrddd. will cry and throw up now uhhh "
    gsap.to(this.position, {
      y: this.position.y +4,
    })
    gsap.to(this, {
      opacity: 0
    })
    audio.battle.stop()
    audio.victory.play()
    
  }

  attack({attack, recipient, renderedSprites}) {
    document.querySelector("#dialogueBox").style.display = "block"
    document.querySelector("#dialogueBox").innerHTML = this.name + " used " + attack.name + " for kill "

     let healthBar = "#enemyHealthBar"
      if (this.isEnemy) healthBar = "#playerHealthBar"

     let rotation = 3
     if (this.isEnemy) rotation = -1.5

      recipient.health -= attack.damage

    switch (attack.name) {
                                                        // here is cry
      case "cry" :
      audio.cryHit.play()                              
      const cryImage = new Image()
      cryImage.src = "./img/BanaCry.png"
      const cry = new Sprite({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        image: cryImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation
      })
        renderedSprites.splice(1, 0, cry)
        gsap.to(cry.position, {
        delay: 1,
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
           //enemy ets hit
           audio.soundHit.play()
           gsap.to(healthBar, {
            width: recipient.health + "%"
          })

          gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            yoyo: true,
            repeat: 5,
            duration: 0.07,
          })
           gsap.to(recipient, {
             opacity: 0,
             repeat: 5,
             yoyo: true,
            duration: 0.07
          })
          renderedSprites.splice(1, 1)
        }
      })
       break

                                                    //here is eep
      case "eep" :
      audio.eepHit.play()
      const tl = gsap.timeline()

      let movementDistance = 40
      if (this.isEnemy) movementDistance = -20

        tl.to(this.position, {
        delay: 0.4,
        x: this.position.x - movementDistance

      })
        .to(this.position, {
          x: this.position.x + movementDistance * 2,
          y: this.position.y - movementDistance,
          duration: 0.1, 
          onComplete: () =>{
            //enemy ets hit
            audio.soundHit.play()
            gsap.to(healthBar, {
              width: recipient.health + "%"
            })

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.07,   
            })
              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.07
              })
             }
        })
          .to(this.position, {
            x: this.position.x,
            y: this.position.y
          })

      break
                                             // here is boo
      case "boo" : 
      audio.booHit.play()
      const booImage = new Image()
      booImage.src = "./img/Ghost.png"
      const boo = new Sprite({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        image: booImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation
       })
       
       renderedSprites.splice(1, 0, boo)

      gsap.to(boo.position, {
        delay: 2.5,
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
           //enemy ets hit
           audio.soundHit.play()
           gsap.to(healthBar, {
            width: recipient.health + "%"
          })

          gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            
            yoyo: true,
            repeat: 5,
            duration: 0.07,
         })

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.07
            })
          renderedSprites.splice(1, 1)
        }
      })
      break
                                          // here is LOVE
      case "love" :   
      audio.juwaLove.play()                  
      const loveImage = new Image()
      loveImage.src = "./img/Love.png"
      const love = new Sprite({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        image: loveImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation
       })

       renderedSprites.splice(1, 0, love)

       gsap.to(love.position, {
        delay: 1,
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
          audio.soundHit.play
           //enemy ets hit
           audio.soundHit.play()
           gsap.to(healthBar, {
            width: recipient.health + "%"
          })

          gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            
            yoyo: true,
            repeat: 5,
            duration: 0.07,
            
          })

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.07
            })
          renderedSprites.splice(1, 1)
        }
      })
      break
                                                    // foiaball 
      case "foiaball" : 
      audio.foiaballHit.play()                             
      const foiaballImage = new Image()
      foiaballImage.src = "./img/fireBall.png"
      const foiaball = new Sprite({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        image: foiaballImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation
      })
        renderedSprites.splice(1, 0, foiaball)
        gsap.to(foiaball.position, {
        delay: 0,
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
           //enemy ets hit
           audio.soundHit.play()
           gsap.to(healthBar, {
            width: recipient.health + "%"
          })

          gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            
            yoyo: true,
            repeat: 5,
            duration: 0.07,
          })
          
          gsap.to(recipient, {
           opacity: 0,
           repeat: 5,
           yoyo: true,
           duration: 0.07
         })
          renderedSprites.splice(1, 1)
        }
      })
       break
                                                              //hapi bana cat
       case "HapiBana" :   
       audio.hapiHit.play()                           
       const HapiBanaImage = new Image()
       HapiBanaImage.src = "./img/HapiBana.png"
       const HapiBana = new Sprite({
         position: {
           x: this.position.x,
           y: this.position.y
         },
         image: HapiBanaImage,
         frames: {
           max: 4,
           hold: 10
         },
         animate: true,
         rotation
       })
         renderedSprites.splice(1, 0, HapiBana)
         gsap.to(HapiBana.position, {
         delay: 1,
         x: recipient.position.x,
         y: recipient.position.y,
         onComplete: () => {
            //enemy ets hit
            audio.soundHit.play()
            gsap.to(healthBar, {
             width: recipient.health + "%"
           })

           gsap.to(recipient.position, {
             x: recipient.position.x + 10,
             
             yoyo: true,
             repeat: 5,
             duration: 0.07,
           })
           
           gsap.to(recipient, {
            opacity: 0,
            repeat: 5,
            yoyo: true,
            duration: 0.07
          })
           renderedSprites.splice(1, 1)
         }
       })
        break
        case "zaWarudo" :                     // za warudo
       audio.zaWarudo.play()                           
       const zaWarudoImage = new Image()
       zaWarudoImage.src = "./img/zaWarudoGatoo.png"
       const zaWarudo = new Sprite({
         position: {
           x: this.position.x,
           y: this.position.y
         },
         image: zaWarudoImage,
         frames: {
           max: 4,
           hold: 20
         },
         animate: true,
         rotation
       })
         renderedSprites.splice(1, 0, zaWarudo)
         gsap.to(zaWarudo.position, {
         delay: 2.6,
         x: recipient.position.x,
         y: recipient.position.y,
         onComplete: () => {
            //enemy ets hit
            audio.soundHit.play()
            gsap.to(healthBar, {
             width: recipient.health + "%"
           })

           gsap.to(recipient.position, {
             x: recipient.position.x + 10,
             
             yoyo: true,
             repeat: 5,
             duration: 0.07,
           })
           
           gsap.to(recipient, {
            opacity: 0,
            repeat: 5,
            yoyo: true,
            duration: 0.07
          })
           renderedSprites.splice(1, 1)
         }
       })
        break

        case "strangeDevice" :                     // za warudo
        audio.strangeDevice.play()                           
        const strangeDeviceImage = new Image()
        strangeDeviceImage.src = "./img/albedoXiao.png"
        const strangeDevice = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y
          },
          image: strangeDeviceImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })
          renderedSprites.splice(1, 0, strangeDevice)
          gsap.to(strangeDevice.position, {
          delay: 1.5,
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
             //enemy ets hit
             audio.soundHit.play()
             gsap.to(healthBar, {
              width: recipient.health + "%"
            })
 
            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              
              yoyo: true,
              repeat: 5,
              duration: 0.07,
            })
            
            gsap.to(recipient, {
             opacity: 0,
             repeat: 5,
             yoyo: true,
             duration: 0.07
           })
            renderedSprites.splice(1, 1)
          }
        })
         break
    }
 } 
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
      this.position = position
      this.width = 48
      this.height = 48
    }
    draw() {
      c.fillStyle = "rgba(255, 0, 0, 0.0"
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  
  }

class Character extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
   
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale,
    
    })
  }
}

class NPC extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
    dialogue = [""],
  
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
      scale,
    
    })
    this.dialogue = dialogue
    this.dialogueIndex = 0
  }
}
