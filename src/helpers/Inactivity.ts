import { Application } from 'pixi.js';

export default class InactivityDetector {
    private timer: ReturnType<typeof setTimeout> | null = null;
    private readonly timeoutMs: number;
    private readonly onInactivity: () => void;

    constructor(app: Application, timeoutSeconds: number, onInactivity: () => void) {
        this.timeoutMs = timeoutSeconds * 1000;
        this.onInactivity = onInactivity;

        // 1. Configurar el escenario para detectar interacción
        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen; // Cubre toda el área del canvas

        // 2. Escuchar eventos de Pixi (Mouse, Touch, Stylus)
        app.stage.on('pointermove', () => this.resetTimer());
        app.stage.on('pointerdown', () => this.resetTimer());

        // 3. Escuchar eventos globales (Teclado)
        window.addEventListener('keydown', () => this.resetTimer());

        // Iniciar el contador
        this.resetTimer();
    }

    private resetTimer(): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.onInactivity();
        }, this.timeoutMs);
    }

    // Método para limpiar listeners si destruyes el componente
    public destroy(): void {
        if (this.timer) clearTimeout(this.timer);
        window.removeEventListener('keydown', () => this.resetTimer());
    }
}