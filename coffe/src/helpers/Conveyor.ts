import { Container, BitmapText, Assets, Sprite, Text, AnimatedSprite, Texture } from 'pixi.js';
import gsap from 'gsap';


export default class Conveyor extends Container {
    private _conveyorRed: Array<string> = [];
    private _conveyorUpgrade: Array<string> = [];
    private _anim:any

    constructor(x: number, y: number) {
        super();
        this.position.set(x, y);
        this._conveyorRedContainer();
    }

    private async _conveyorRedContainer() {
        for (let c = 0; c < 15; c++) {
            this._conveyorRed[c] = 'conveyor_' + c
        }

        let textures = [];
        for (const frame of this._conveyorRed) {
            const texture = await Assets.load(frame);
            textures.push(texture);
        }

        this._anim = new AnimatedSprite(textures);
        this._anim.x = 0;
        this._anim.y = 0;
        this._anim.anchor.set(0.5,0.45);
        this._anim.animationSpeed  = 0.2;
        this._anim.play();
        this._anim.loop = true;
        this._anim.onComplete= () => {
            //this._conveyorUpgradeAnimation()
        }

        this.addChild(this._anim)
    }

        private async _conveyorUpgradeAnimation() {
            
            this.removeChild(this._anim)
        for (let c = 0; c < 31; c++) {
            this._conveyorUpgrade[c] = 'conveyorUpgrade_' + c
        }

        const textures = [];
        for (const frame of this._conveyorUpgrade) {
            const texture = await Assets.load(frame);
            textures.push(texture);
        }

        this._anim = new AnimatedSprite(textures);
        this._anim.x = 0;
        this._anim.y = 0;
        this._anim.anchor.set(0.5,0.45);
        this._anim.animationSpeed  = 0.3;
        
        this._anim.loop = false;
        this._anim.play();

        this.addChild(this._anim)
    }


}