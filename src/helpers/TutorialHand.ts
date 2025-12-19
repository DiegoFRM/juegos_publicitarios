import { Sprite, Assets, Container } from 'pixi.js';
import ScaledSprite from './Scale/ScaledSprite';
import gsap from 'gsap';

export default class TutorialHand extends ScaledSprite {
    private _running = false;
    private _animationSpeed = 1;
    private _scaleFactor = 1.2;
    private _skipWiggle = false;

    constructor(texture: string) {
        super(Assets.get(texture));
        this.scaler.setPortraitScreenSize(0.4, 0.3);
        this.scaler.setLandscapeScreenSize(0.3, 0.3);
        this.scaler.setOriginalSize(this.width, this.height);
        this.scaler.ignorePosition = true;
        this.anchor.set(0);
        this.alpha = 0;
        this.resize(window.innerWidth, window.innerHeight);
    }

    public get running(): boolean {
        return this._running;
    }

    public async showTutorialObjects(objects: (Sprite | Container)[], delay: number = 0, parent?: boolean, skipWiggle?:boolean): Promise<void> {
        await gsap.delayedCall(delay,() => {});
        if (this._running) return;
        skipWiggle && (this._skipWiggle = skipWiggle);
        this._running = true;

        while (this._running) {
            for (let i = 0; i < objects.length; i++) {
                if (!this._running) break;
                const object = objects[i];
                if (i == 0) {
                    const startPosition = parent ? object.getGlobalPosition() : object.position;
                    console.log('TutorialHand start at:', startPosition);
                    this.position.set(startPosition.x, startPosition.y);
                    await gsap.to(this, { alpha: 1, duration: 0.5, delay: 0.5 });
                    this._wiggleObject(object);
                } else {
                    await this._moveToObject(object, parent);
                }                
            }
            await gsap.to(this, { alpha: 0, duration: 0.5, delay: 0.75 });
        }

        await gsap.to(this, { alpha: 0, duration: 0.5 });
    }

    public cancelTutorial(): void {
        if (!this._running) return;
        this._running = false;
        gsap.killTweensOf(this);
        gsap.to(this, { alpha: 0, duration: 0.5 });
    }

    private _moveToObject(object: Sprite | Container, parent?: boolean): Promise<void> {
        return new Promise((resolve) => {
            const objectPosition = parent ? object.getGlobalPosition() : object.position;
            console.log('TutorialHand move to:', objectPosition);
            if (this.x == objectPosition.x && this.y == objectPosition.y) {
                this._wiggleObject(object);
                resolve();
                return;
            }
            gsap.to(this, {
                x: objectPosition.x,
                y: objectPosition.y,
                delay: 0.5,
                duration: this._animationSpeed,
                ease: 'power1.inOut',
                onComplete: () => {
                    if (this._running) this._wiggleObject(object);
                    resolve();
                }
            });
        });
    }

    private _wiggleObject(object: Sprite | Container): void {
        if (this._skipWiggle) return;
        gsap.killTweensOf(object.scale);
        gsap.to(object.scale, {
            x: object.scale.x * this._scaleFactor,
            y: object.scale.y * this._scaleFactor,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    }

    public resize(width: number, height: number): void {
        this.scaler.resize(width, height);
    }
}
