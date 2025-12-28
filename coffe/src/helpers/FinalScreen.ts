import { Container, Graphics, Assets } from 'pixi.js';
import ScaledSprite from './Scale/ScaledSprite';
import ScaledSpine from './Scale/ScaledSpine';
import PlatformRedirect from './PlatformRedirect';
import gsap from 'gsap';
export default class FinalScreen extends Container {
    private _fade!: Graphics;
    private _winLogo!: ScaledSpine;
    private _playButton!: ScaledSprite;
    private _logo!: ScaledSprite
    private _showAssets: ScaledSprite[] = [];
    private _platformRedirect: PlatformRedirect;

    private _logoSize: number = 260;
    private _fadeValue: number = 0.3;
    constructor(width: number, height: number, platformRedirect: PlatformRedirect) {
        super();
        this._platformRedirect = platformRedirect;
        this._createFade(width, height);
        this._createLogo();
        this._createAssets();
        this.alpha = 0;
    }

    private _createFade(width: number, height: number): void {
        this._fade = new Graphics().rect(0, 0, width, height).fill(0x000000);
        this._fade.alpha = 0;
        this._fade.eventMode = 'none';
        this._fade.cursor = 'pointer';
        this._fade.on('pointerdown', () => {
            this._platformRedirect.redirect();
        });
        this.addChild(this._fade);
    }

    private _createLogo(): void {
        this._winLogo = new ScaledSpine({skeleton: 'ui_json', atlas: 'ui_atlas'});
        const logoScaler = this._winLogo.scaler;
        logoScaler.setPortraitScreenPosition(0.5, 0.47);
        logoScaler.setPortraitScreenSize(0.4, 0.21);
        logoScaler.setLandscapeScreenPosition(0.3, 0.45);
        logoScaler.setLandscapeScreenSize(0.2, 0.4);
        logoScaler.setOriginalSize(this._logoSize, this._logoSize);
        this.addChild(this._winLogo);
    }

    private _createAssets(): void {
        this._playButton = new ScaledSprite(Assets.get('play_button'));
        this._playButton.anchor.set(0.5, 0.5);
        const buttonScaler = this._playButton.scaler;
        buttonScaler.setPortraitScreenPosition(0.5, 0.8);
        buttonScaler.setPortraitScreenSize(0.55, 0.1);
        buttonScaler.setLandscapeScreenPosition(0.65, 0.6);
        buttonScaler.setLandscapeScreenSize(0.3, 0.1);
        buttonScaler.setOriginalSize(this._playButton.width, this._playButton.height);
        this.addChild(this._playButton);
        this._showAssets.push(this._playButton);

        this._logo = new ScaledSprite(Assets.get('logo'));
        const logoScaler = this._logo.scaler;
        this._logo.anchor.set(0.5, 0.5);
        logoScaler.setPortraitScreenPosition(0.5, 0.15);
        logoScaler.setPortraitScreenSize(0.4, 0.15);
        logoScaler.setLandscapeScreenPosition(0.65, 0.4);
        logoScaler.setLandscapeScreenSize(0.3, 0.2);
        logoScaler.setOriginalSize(this._logo.width, this._logo.height);
        this.addChild(this._logo);
        this._showAssets.push(this._logo);
    }

    public resize(width: number, height: number): void {
        this._fade.clear().rect(0, 0, width, height).fill(0x000000);
        this._winLogo.scaler.resize(width, height);
        this._playButton.scaler.resize(width, height);
        this._logo.scaler.resize(width, height);
    }

    public show(hasFailed: boolean): void {
        this.alpha = 1;
        gsap.to(this._fade, {alpha: this._fadeValue, duration: 0.5});
        this._winLogo.playAnimation(hasFailed ? 'win': 'fail', false);
        this._showAssets.forEach((asset, index) => {
            asset.alpha = 0;
            gsap.from(asset.scale, {
                x: 0,
                y: 0,
                duration: 0.5, 
                delay: 0.2 * index,
                ease: 'back.out',
                onStart: () => {
                    asset.alpha = 1;
                },
            });
        });
        this._fade.eventMode = 'static';
    }

}