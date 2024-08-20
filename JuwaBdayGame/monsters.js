const monsters = {
    Emby: {
        position: {
         x: 280,
         y: 325
        },
         image: {
            src: "./img/embySprite.png"
         },
         frames: {
            max: 4,
            hold: 60
          },
            animate: true,
            name: "Juwka",
            attacks: [attacks.eep, attacks.cry, attacks.HapiBana, attacks.love, attacks.zaWarudo, attacks.strangeDevice]
          
    },
    
    Draggle: {
        position: {
          x: 800,
          y: 70
        },
          image: {
            src: "./img/juwaEnemy.png"
          } ,
          frames: {
             max: 4,
             hold: 90
           },
             animate: true,
             isEnemy: true,
             name: "AA MONSTA AAA",
             attacks: [attacks.boo, attacks.foiaball]
          
    }
}