export default {
    titlesParticles: {
        type: "image",
        id: 'red_particle',
        numberOfParticles: 50,
        scale: { 
            portrait:{from: 0.5, to: 1.2 },
            landscape:{from: 0.6, to: 1.4 },   
        },
        disappearSeconds: {min: 1, max: 2},
        ignoreGravity: true,
        speed: 4,
    },
    pieceParticles: {
        type: "image",
        id: 'red_particle',
        numberOfParticles: 15,
        scale: { 
            portrait:{from: 0.25, to: 0.5 },
            landscape:{from: 0.5, to: 1.1},   
        },
        disappearSeconds: {min: 0.2, max: 0.5},
        speed: 3,
        ignoreGravity: true,
    },
    completeParticles: {
        type: "image",
        id: 'red_particle',
        numberOfParticles: 60,
        scale: { 
            portrait:{from: 0.25, to: 0.5 },
            landscape:{from: 0.5, to: 1 },   
        },
        disappearSeconds: {min: 0.2, max: 1},
        speed: 4,
    }
}