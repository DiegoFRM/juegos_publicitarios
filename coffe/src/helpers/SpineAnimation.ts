import { Spine } from '@esotericsoftware/spine-pixi-v8';
import { Container, Graphics } from 'pixi.js';

export default class SpineAnimation extends Container {
    private _spineAnimation!: Spine;
    private _shadowSize: number = 160;
    constructor(x: number, y: number, spineData: {skeleton: string, atlas: string}, addShadow: boolean = false) {
        super();
        this.position.set(x, y);
        //console.log('SpineAnimation', spineData);
        this._spineAnimation = Spine.from(spineData);
        addShadow && this._addShadow();
        this.addChild(this._spineAnimation);
    }

    private _addShadow(): void {
        const shadow = new Graphics().circle(0, 0, this._shadowSize);
        shadow.fill(0x000000);
        shadow.alpha = 0.15;
        shadow.position.set(this._spineAnimation.x, this._spineAnimation.y + 10);
        shadow.scale.set(1, 0.4);
        this.addChild(shadow);
    }

    public playAnimation(animationName: string, loop: boolean = false): void {
        this._spineAnimation.state.setAnimation(0, animationName, loop);
    }

    public addAnimation(animationName: string, loop: boolean = false): void {
        this._spineAnimation.state.addAnimation(0, animationName, loop);
    }

    public getAnimationDuration(animationName: string): number {
        const animation = this._spineAnimation.skeleton.data.findAnimation(animationName);
        if (animation) {
            return animation.duration;
        } else {
            console.warn(`Animation "${animationName}" not found.`);
            return 0;
        }
    }

    public stopAnimation(): void {
        this._spineAnimation.state.clearTracks();
    }

    public waitForAnimationEnd(): Promise<void> {
        return new Promise((resolve) => {
            this._spineAnimation.state.addListener({
                complete: () => {
                    this._spineAnimation.state.clearListeners();
                    resolve();
                }
            });
        });
    }

    public addSlotContainer(slotName: string, container: Container): void {
        this._spineAnimation.addSlotObject(slotName, container);
    }

    public setSkin(skinName: string): void {
        this._spineAnimation.skeleton.setSkinByName(skinName);
        this._spineAnimation.skeleton.setSlotsToSetupPose();
    }

    public get spineAnimation(): Spine {
        return this._spineAnimation;
    }

    public getAnimations(): string[] {
        return this._spineAnimation.skeleton.data.animations.map(animation => animation.name);
    }

    public getSkins(): string[] {
        return this._spineAnimation.skeleton.data.skins.map(skin => skin.name);
    }
}