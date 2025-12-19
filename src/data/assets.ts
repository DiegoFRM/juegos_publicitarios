export default {
    bundles: [
        {
            name: "load-screen",
            assets: [
                { alias: "progress_bar", src: "sprites/progress_bar.png" },
                { alias: "progress_bar_fill", src: "sprites/progress_bar_fill.png" }
            ]
        },
        {
            name: "game-screen",
            assets: [
                { alias: "background-game-screen", src: "sprites/background_2.webp" },
                { alias: "backgroundWin-game-screen", src: "sprites/win.png" },
                { alias: "shadow_win", src: "sprites/shadow_win.png" },
                { alias: "mask-win", src: "sprites/mask.png" },
                { alias: "item_0", src: "sprites/orange.png" },
                { alias: "item_1", src: "sprites/crown.png" },
                { alias: "item_2", src: "sprites/ruby.png" },
                { alias: "item_3", src: "sprites/lemon.png" },
                { alias: "item_4", src: "sprites/clover.png" },
                { alias: "item_5", src: "sprites/magic_ball.png" },
                { alias: "item_6", src: "sprites/lemon.png" },
                { alias: "item_7", src: "sprites/granat.png" },
                { alias: "item_8", src: "sprites/cupcake.png" },
                { alias: "item_9", src: "sprites/potion.png" },
                { alias: "item_10", src: "sprites/pretzel.png" },
                { alias: "item_11", src: "sprites/ruby.png" },
                { alias: "item_12", src: "sprites/star.png" },
                { alias: "item_13", src: "sprites/strawberry.png" },
                { alias: "item_9", src: "sprites/potion.png" },
                { alias: "select_1", src: "sprites/element_crown.png" },
                { alias: "select_2", src: "sprites/element_ruby.png" },
                { alias: "select_3", src: "sprites/element_lemon.png" },
                { alias: "select_4", src: "sprites/element_clover.png" },
                { alias: "select_5", src: "sprites/element_magic_ball.png" },
                { alias: "tick", src: "sprites/correct.png" },
                { alias: "cross", src: "sprites/cross.png" },
                { alias: "hand", src: "sprites/hand.webp" },
                { alias: "star_particle", src: "sprites/star_particle.png" },
            ]
        }
    ],
    models: [
        { alias: "ground", src: "models/ground2.glb" },
        { alias: "objects", src: "models/objects2.glb" }
    ],
    fonts: [
        { alias: "grobold", src: "fonts/grobold.ttf" }
    ],
    sounds: [
        { alias: "theme", src: "sounds/theme.mp3" },
        { alias: "rooster", src: "sounds/rooster.mp3" },
        { alias: "irons", src: "sounds/irons.mp3" },
        { alias: "sheep", src: "sounds/sheep.mp3" },
        { alias: "cow", src: "sounds/cow.mp3" },
        { alias: "chicken", src: "sounds/chicken.mp3" },
        { alias: "plant_growing_1", src: "sounds/plant_growing_1.mp3" },
        { alias: "plant_growing_2", src: "sounds/plant_growing_2.mp3" },
        { alias: "plant_growing_3", src: "sounds/plant_growing_3.mp3" },
        { alias: "click", src: "sounds/pop.mp3" },
        { alias: "category_button", src: "sounds/bucket.mp3" },
        { alias: "place_object", src: "sounds/collect_moon.mp3" },
        { alias: "pop_button", src: "sounds/click2.mp3" },
        { alias: "click_add", src: "sounds/click_add.mp3" },
        { alias: "building", src: "sounds/building.mp3" }
    ],
    textures: [
        { alias: "smoke", src: "textures/smoke.png" }
    ]
};
