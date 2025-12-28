import { Sprite, Texture } from 'pixi.js';
export default class BackgroundScaler extends Sprite {
    private _originalSize: { width: number; height: number } = { width: 0, height: 0 };
    constructor(texture: Texture) {
        super(texture);
        this._originalSize = { width: texture.width, height: texture.height };
        this.anchor.set(0.5);
    }

    public changeTexture(texture: Texture): void {
        this.texture = texture;
        this._originalSize = { width: texture.width, height: texture.height };
    }

    public resize(width: number, height: number): void {
        this.position.set(width * 0.5, height * 0.5);
        const scaleX = width / this._originalSize.width;
        const scaleY = height / this._originalSize.height;
        const scaleToUse = Math.max(scaleX, scaleY);
        this.scale.set(scaleToUse);
    }

    
}