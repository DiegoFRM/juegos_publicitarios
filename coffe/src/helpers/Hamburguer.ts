import { Container, BitmapText, Assets, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';


export default class Hamburger extends Container {
    private _hbBottom!:Sprite
    private _hbTop!:Sprite
    private _lettuce!:Sprite
    private _meat!:Sprite
    private _chesse!:Sprite

    constructor(x: number, y: number) {
        super();
        this.position.set(x, y);
        this._newHamburger();
    }

    private _newHamburger():void{
        this._hbBottom = new Sprite(Assets.get('hb_bottom'));
        this._hbBottom.anchor.set(0.5, 0.5);
        this.addChild(this._hbBottom);

        this._lettuce = new Sprite(Assets.get('lettuce'));
        this._lettuce.anchor.set(0.5, 0.5);
        this.addChild(this._lettuce);

        this._meat = new Sprite(Assets.get('meat'));
        this._meat.anchor.set(0.5, 0.5);
        this.addChild(this._meat);

        this._chesse = new Sprite(Assets.get('chesse'));
        this._chesse.anchor.set(0.5, 0.5);
        this.addChild(this._chesse);

        this._hbTop = new Sprite(Assets.get('hb_top'));
        this._hbTop.anchor.set(0.5, 0.5);
        this.addChild(this._hbTop);
    }

    public createHamburger(meatSelect:boolean,lettuceSelect:boolean,chesseSelect:boolean):void{
        this._lettuce.alpha = lettuceSelect ? 1 : 0;
        this._meat.alpha = meatSelect ? 1 : 0;
        this._chesse.alpha = chesseSelect ? 1 : 0;
    }

}