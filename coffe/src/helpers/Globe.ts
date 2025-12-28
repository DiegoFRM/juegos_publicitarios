import { Container, BitmapText, Assets, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';
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

        const globeText = new Text({
            text: 'Not what I expected!',
            style: {
                fontFamily: 'merge',
                fill: 0xb5561d,
                fontSize: 23,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: globe.width * 0.85,
            },
        });
        globeText.position.set(globe.width * 0.05, -globe.height * 0.05);
        globeText.anchor.set(0.5, 0.5);
        this.addChild(globeText);
        this._globeText = globeText;
    }

    public show(textToShow: string): void {
        this._globeText.text = textToShow;
        this.alpha = 1;
        gsap.fromTo(this.scale, {x: 0, y: 0}, {x: 1, y: 1, duration: 0.5, ease: 'back.out'});
        gsap.delayedCall(this._timeToShow, this.hide.bind(this));
    }

    public hide(): void {
        gsap.to(this.scale, {x: 0, y: 0, duration: 0.5, ease: 'back.in', onComplete: () => {
            this.alpha = 0;
        }});
    }
}