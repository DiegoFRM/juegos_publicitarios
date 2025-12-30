import { Container, BitmapText, Assets, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';
import Hamburger from './Hamburguer';
export default class Globe extends Container {
    private _hamburger!: Hamburger;
    private _globeText!: Text;
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
        this._hamburger = new Hamburger(0, -10)
        this._hamburger.scale.set(0.35)
        this.addChild(this._hamburger);

        this._globeText = new Text({
            text: '',
            style: {
                fontFamily: 'grobold',
                fontSize: 35,
                align: 'center',
                fill: '#9b362a',
                stroke: '#9b362a',
            },
        });
        this._globeText.position.set(53,35);
        this._globeText.anchor.set(0.5, 0.5);
        this.addChild(this._globeText);
        
    }

    public show(meat: boolean, lettuce: boolean, chesse: boolean,amount:number): void {
        this._hamburger.orderBurger(meat, lettuce, chesse)
        gsap.fromTo(this.scale, { x: 0, y: 0 }, { x: 1, y: 1, duration: 0.5, ease: 'back.out' });
        gsap.to(this, { alpha: 1, duration: 0.5, ease: 'back.out' });

         if(amount != 0){
            this._globeText.text = 'x' + amount;
         }

        }


    public hide(): void {
        gsap.to(this.scale, {
            x: 0, y: 0, duration: 0.5, ease: 'back.in', onComplete: () => {
                this.alpha = 0;
            }
        });
    }
}