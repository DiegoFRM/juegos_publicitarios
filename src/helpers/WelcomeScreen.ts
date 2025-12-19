import { Container, Graphics, Assets } from 'pixi.js';
import ScaledSprite from './Scale/ScaledSprite';
import ScaledText from './Scale/ScaledText';
import gsap from 'gsap';

import localization from '../helpers/Localization';
import eventsSystem from '../utils/EventsSystem';
export default class WelcomeScreen extends Container {
    private _fade!: Graphics;
    private _tapToStartText!: ScaledText;
    private _tapTextTween!: gsap.core.Tween;
    constructor() {
        super();
        this._createFade();
        this._createTitles();
        this.alpha = 0;
        this.eventMode = 'none';
    }

    private _createFade(): void {
        const fade = new Graphics().rect(0, 0, window.innerWidth, window.innerHeight).fill(0x000000);
        this.addChild(fade);
        fade.alpha = 0;
        this._fade = fade;

        this.on('pointerdown', this._close.bind(this));
    }

    private _createTitles(): void {

        this._tapToStartText = new ScaledText({
            text: localization.get('tapToStart'),
            style: {
                fontFamily: 'albertus_nova',
                fontSize: 55,
                align: 'center',
                fill: 'white',
            },
        });
        this._tapToStartText.anchor.set(0.5);
        this.addChild(this._tapToStartText);
        const tapScaler = this._tapToStartText.scaler;
        tapScaler.setPortraitScreenPosition(0.5, 0.5);
        tapScaler.setPortraitScreenSize(0.5, 0.2);
        tapScaler.setLandscapeScreenPosition(0.5, 0.5);
        tapScaler.setLandscapeScreenSize(0.5, 0.15);
        tapScaler.setOriginalSize(this._tapToStartText.width, this._tapToStartText.height);

        this.resize(window.innerWidth, window.innerHeight);

    }

    public show(): void {
        this.eventMode = 'static';
        this.alpha = 1;
        gsap.to(this._fade, { alpha: 0.5, duration: 0.5});
        this._tapTextTween = gsap.to(this._tapToStartText, {
            alpha: 0,
            duration: 0.8,  
            yoyo: true,
            repeat: -1,
            ease: "linear",
        });
    }
    
    private _close(): void {
        this._tapTextTween.kill();
        this.eventMode = 'none';
        eventsSystem.emit('startGame');
        gsap.to(this, {
            alpha: 0,
            duration: 0.5,
        });
    }

    public resize(width: number, height: number): void {
        this._fade.clear().rect(0, 0, width, height).fill(0x000000);
        this._tapToStartText.scaler.resize(width, height);
    }
}