import { Container, BitmapText, Assets, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';
import Hamburger from './Hamburguer';
export default class Globe extends Container {
    private _globeText!: Text;
    private _timeToShow: number = 2;
    constructor(x: number, y: number) {
        super();
        this.position.set(x, y);
        this._createGlobe();
        this.alpha = 0;
    }

    private _createGlobe(): void {
        const globe = new Sprite(Assets.get('globe'));
        globe.anchor.set(0.5, 0.5);
        this.addChild(globe);
    }

    public show(): void {
        const hamburger = new Hamburger(0,-10)
        hamburger.scale.set(0.35)
        hamburger.orderBurger(true,false,true)
        this.addChild(hamburger)
        this.alpha = 1;
        gsap.fromTo(this.scale, {x: 0, y: 0}, {x: 1, y: 1, duration: 0.5, ease: 'back.out'});
        //gsap.delayedCall(this._timeToShow, this.hide.bind(this));
    }

    public hide(): void {
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.5, ease: 'back.in', onComplete: () => {
            this.alpha = 0;
        }});
    }
}