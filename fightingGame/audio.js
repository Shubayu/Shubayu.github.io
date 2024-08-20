const audio = {
    attackSound: new Howl({
        src: "./audio/attackSound.ogg",
        html5: true,
        volume: 0.5,
    }),

    Map: new Howl({
        src: "./audio/fightBgm.ogg",
        html5: true,
        volume: 1,
        loop: true
    }),

    attackKenji1: new Howl({
        src: "./audio/attackKenji1.ogg",
        html5: true,
        volume: 0.5,

    }),

    jumpSound: new Howl({
        src: "./audio/jumpSound.ogg",
        html5: true,
        volume: 0.2,

    }),

    kenjiJump: new Howl({
        src: "./audio/kenjiJump.ogg",
        html5: true,
        volume: 0.2,

    }),

    hitSound: new Howl({
        src: "./audio/tackleHit.ogg",
        html5: true,
        volume: 0.05,

    }),

    shububWins: new Howl({
        src: "./audio/shububWins.ogg",
        html5: true,
        volume: 1,
        loop: false

    }),

    juwaWins: new Howl({
        src: "./audio/juwaWins.ogg",
        html5: true,
        volume: 1,
        loop: false

    })




}