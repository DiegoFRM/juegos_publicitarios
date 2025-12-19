import { Application, Container, Sprite, Assets } from "pixi.js";
import { WinParticle } from "../types/game";
import gsap from "gsap";
​
export default class SplashParticles extends Container {
    private _particles: {
        sprite: Sprite;
        vx: number;
        vy: number;
        rotation: number;
        textureIndex: number;
        ignoreGravity: boolean;
    }[] = [];
​
    private _textureName: string = "";
    private _numberOfFrames: number = 0;
    private _frameRate: number = 0;
​
    constructor(app: Application) {
        super();
        app.stage.addChild(this);
    }
​
    public showSplashParticles(winParticlesData: WinParticle, position: { x: number; y: number }): void {
        const isAnimation = winParticlesData.type === "animation";
        this._textureName = winParticlesData.frameId || winParticlesData.id;
​
        if (isAnimation) {
            this._numberOfFrames = winParticlesData.numberOfFrames || 16;
            this._frameRate = winParticlesData.frameRate ? 1 / winParticlesData.frameRate : 0.02;
        }
​
        const isPortrait = window.innerHeight > window.innerWidth;
        const particlesScale = isPortrait ? winParticlesData.scale.portrait : winParticlesData.scale.landscape;
        for (let i = 0; i < winParticlesData.numberOfParticles; i++) {
            const particle = this._getParticle();
            particle.texture = Assets.get(isAnimation ? this._textureName + "00" : winParticlesData.id);
            particle.alpha = 1;
​
​
            const randomScale = particlesScale.from + Math.random() * (particlesScale.to - particlesScale.from);
            particle.scale.set(randomScale);
            particle.x = position.x;
            particle.y = position.y;
​
            const angle = Math.random() * 2 * Math.PI;
            const speed = winParticlesData.speed * Math.random() * 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
​
            const particleData = {
                sprite: particle,
                vx: vx,
                vy: vy,
                ignoreGravity: winParticlesData.ignoreGravity || false,
                rotation: Math.random() * 0.1,
                textureIndex: Math.floor(Math.random() * 16),
            };
​
            if (isAnimation) {
                this._animateParticle(particleData);
            }
​
            this._particles.push(particleData);
​
            if (winParticlesData.disappearSeconds) {
                const minTime = winParticlesData.disappearSeconds.min; // seconds
                const maxTime = winParticlesData.disappearSeconds.max; // seconds
                const disappearTime = minTime + Math.random() * (maxTime - minTime);
​
                gsap.to(particle, {
                    alpha: 0,
                    duration: 0.4,
                    delay: disappearTime,
                    onComplete: () => {
                        particle.alpha = 0;
​
                        // Clean particle from array
                        const index = this._particles.indexOf(particleData);
                        if (index !== -1) this._particles.splice(index, 1);
                    },
                });
            }            
        }
    }
​
    public showMultipleSplashParticles(
        winParticlesData: WinParticle,
        position: { x: number; y: number },
        numberOfTimes: number,
        timeBetween: number
    ): void {
        let delay = 0;
        for (let i = 0; i < numberOfTimes; i++) {
            gsap.delayedCall(delay, () => {
                this.showSplashParticles(winParticlesData, position);
            });
            delay += timeBetween;
        }
    }
​
    private _getParticle(): Sprite {
        let particle = this.children.find((child: any) => child.alpha === 0) as Sprite;
​
        if (!particle) {
            particle = new Sprite();
            particle.eventMode = 'none';
            particle.anchor.set(0.5);
            this.addChild(particle);
        }
​
        return particle;
    }
​
    private _animateParticle(particleData: {
        sprite: Sprite;
        vx: number;
        vy: number;
        rotation: number;
        textureIndex: number;
    }): void {
        if (particleData.sprite.alpha === 0) return;
​
        const index = particleData.textureIndex >= 10 ? particleData.textureIndex : "0" + particleData.textureIndex;
        particleData.sprite.texture = Assets.get(this._textureName + index);
​
        particleData.textureIndex++;
        if (particleData.textureIndex > this._numberOfFrames) {
            particleData.textureIndex = 0;
        }
​
        gsap.delayedCall(this._frameRate, () => {
            this._animateParticle(particleData);
        });
    }
​
    public updateParticles(deltaTime: number): void {
        for (let i = this._particles.length - 1; i >= 0; i--) {
            const p = this._particles[i];
​
            p.sprite.x += p.vx * 0.7 * deltaTime;
            p.sprite.y += p.vy * deltaTime;
            p.sprite.rotation += p.rotation * deltaTime;
            if (!p.ignoreGravity) {
                p.vy += 0.2 * deltaTime; // gravity
            }
​
            // Auto-remove if off screen
            if (p.sprite.y > window.innerHeight * 1.2) {
                p.sprite.alpha = 0;
                this._particles.splice(i, 1);
            }
        }
    }
}