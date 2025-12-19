import { Graphics } from 'pixi.js';
export default class MaskItems extends Graphics {
    private _scaler: Graphics;
    constructor() {
        super();
        this._scaler = new Graphics();
    }

    public get scaler(): Graphics {
              const maskGraphic = new Graphics();
        const w = 630;
        const h = 384;
        const x = backgroundWin.x + (backgroundWin.width / 2.7);
        const y = backgroundWin.y + (backgroundWin.height / 2.3);
        maskGraphic.moveTo(x + w / 2 - 30, y)
            // Pico superior
            .bezierCurveTo(
                x + w / 2 - 10, y - 12,
                x + w / 2 + 10, y - 12,
                x + w / 2 + 30, y
            )
            // Superior derecha
            .bezierCurveTo(
                x + w - 90, y,
                x + w - 40, y,
                x + w, y + 35
            )
            // Lateral derecho
            .bezierCurveTo(
                x + w + 22, y + h / 2,
                x + w + 22, y + h / 2,
                x + w, y + h - 35
            )
            // Inferior derecha
            .bezierCurveTo(
                x + w - 40, y + h,
                x + w - 90, y + h,
                x + w / 2 + 30, y + h
            )
            // Pico inferior
            .bezierCurveTo(
                x + w / 2 + 10, y + h + 12,
                x + w / 2 - 10, y + h + 12,
                x + w / 2 - 30, y + h
            )
            // Inferior izquierda
            .bezierCurveTo(
                x, y + h,
                x + 80, y + h,
                x, y + h - 35
            )
            // Lateral izquierdo
            .bezierCurveTo(
                x - 22, y + h / 2,
                x - 22, y + h / 2,
                x, y + 35
            )
            // Superior izquierda
            .bezierCurveTo(
                x - 40, y,
                x + 80, y,
                x + w / 2 - 30, y
            )
            .closePath();
        maskGraphic.fill({ color: 'red' });
        maskGraphic.x = -580;
        maskGraphic.y = -387;
        return this._scaler;
    }
}