import {
    Application,
    Sprite,
    Graphics,
    Assets,
    Rectangle,
    BlurFilter,
    BitmapText,
    Container,
    ColorMatrixFilter,
    ParticleContainer,
    Particle,
    Texture
} from 'pixi.js';
import gsap from 'gsap';
import i18next from 'i18next';
import eventsSystem from '../utils/EventsSystem';
import sound from '../utils/Sound';
import PlaneBasicAnimations from '../utils/PlaneBasicAnimations';
import AssetsInlineHelper from '../helpers/AssetsInlineHelper';
import ScaledContainer from '../helpers/Scale/ScaledContainer';
import BackgroundScaler from '../helpers/BackgroundScaler';
import SplashParticles from '../utils/SplashParticles';
import particlesData from '../data/particlesData';
import ScaledText from '../helpers/Scale/ScaledText';

export default class MainScene extends Container {
    private _splashParticles: SplashParticles;
    private _assetsContainer!: ScaledContainer;
    private _backgroundScaler!: BackgroundScaler;
    private _background!: Graphics;
    private _active: boolean = true;
    private _isPaused: boolean = false;
    private _assetsInlineHelper: AssetsInlineHelper;
    private _backgroundColor: number = 0x33067a;


    public _count: number = 5
    public tween: any = [
        { 0: [] },
        { 1: [] },
        { 2: [] },
        { 3: [] },
        { 4: [] }
    ];

    constructor(app: Application, assetsInlineHelper: AssetsInlineHelper) {
        super();
        this._assetsInlineHelper = assetsInlineHelper;
        this._addEvents();
        app.stage.addChild(this);
        this._startLoadingAssets(app);
    }

    private _addEvents(): void { }

    private _create(app: Application): void { }

    private async _startLoadingAssets(app: Application) {
        this._assetsInlineHelper.loadBundleByName('game-screen').then(async () => {
            await this._assetsInlineHelper.loadFonts();
            await this._createPreloadAssets(app);
        });
    }



    private async _createPreloadAssets(app: Application) {

        // 1. Configuración de traducciones
        const resources = {
            es: { translation: { "tapStart": "PRESIONA PARA EMPEZAR" } },
            en: { translation: { "tapStart": "TAP TO START" } },
            ko: { translation: { "tapStart": "탭해서 시작하기" } },
            jp: { translation: { "tapStart": "タップして開始" } },
        };

        await i18next.init({
            lng: 'es', // Idioma inicial
            resources
        });

        const blurFilter = new BlurFilter();
        const colorMatrix = new ColorMatrixFilter();
        const elementActive: Array<Sprite> = [];
        const squares: Array<Graphics> = [];
        const selects: Array<Sprite> = [];
        const ticks: Array<Sprite> = [];
        const maskGraphics: Array<Graphics> = []
        const background = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill(this._backgroundColor);

        let particleData: any = [];
        colorMatrix.grayscale(0.2, true);
        blurFilter.blur = 10;

        this.addChild(background);
        this._background = background;



        function createExplosion(container: any, texture: Texture, x: number, y: number, scale: number) {
            for (let i = 0; i < 30; i++) {
                const p = new Particle({ texture, x, y, scaleX: scale, scaleY: scale });
                container.addParticle(p);
                particleData.push({
                    sprite: p,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    life: 1, // Usamos esto para el desvanecimiento
                });
            }
        }


        const assetsContainer = new ScaledContainer();
        assetsContainer.scaler.setPortraitScreenPosition(0.5, 0.5);
        assetsContainer.scaler.setPortraitScreenSize(1, 1);
        assetsContainer.scaler.setLandscapeScreenPosition(0.5, 0.5);
        assetsContainer.scaler.setLandscapeScreenSize(1, 1);
        this.addChild(assetsContainer);
        this._assetsContainer = assetsContainer;

        const backgroundContainer = new Container();
        assetsContainer.addChild(backgroundContainer);

        const backgroundResize = new Sprite(Assets.get('background-game-screen'));
        //const backgroundResize = new BackgroundScaler(Assets.get('background-game-screen'))
        backgroundResize.anchor.set(0.5, 0.4);
        backgroundContainer.addChild(backgroundResize);
        backgroundContainer.filters = blurFilter;


        const elementsContainer = new Container();
        elementsContainer.filters = blurFilter;
        assetsContainer.addChild(elementsContainer);

        elementActive[0] = new Sprite(Assets.get('select_1'));
        elementActive[0].anchor.set(0.5);
        elementActive[0].y = 10;
        elementActive[0].x = 250;
        elementsContainer.addChild(elementActive[0]);


        elementActive[1] = new Sprite(Assets.get('select_2'));
        elementActive[1].anchor.set(0.5);
        elementActive[1].scale.set(0.3)
        elementActive[1].y = 240;
        elementActive[1].x = 0;
        elementsContainer.addChild(elementActive[1]);


        elementActive[2] = new Sprite(Assets.get('select_3'));
        elementActive[2].anchor.set(0.5);
        elementActive[2].scale.set(0.5)
        elementActive[2].y = 180;
        elementActive[2].x = -300;
        elementsContainer.addChild(elementActive[2]);

        elementActive[3] = new Sprite(Assets.get('select_4'));
        elementActive[3].anchor.set(0.5);
        elementActive[3].scale.set(0.5)
        elementActive[3].y = 240;
        elementActive[3].x = 300;
        elementsContainer.addChild(elementActive[3]);

        elementActive[4] = new Sprite(Assets.get('select_5'));
        elementActive[4].anchor.set(0.5);
        elementActive[4].y = -10;
        elementActive[4].x = -120;
        elementsContainer.addChild(elementActive[4]);

        for (let a = 0; a < 5; a++) {
            squares[a] = new Graphics();
            selects[a] = new Sprite(Assets.get('select_' + [a + 1]));
            ticks[a] = new Sprite(Assets.get('tick'))

            squares[a].roundRect(-280 + (a * 120), 0, 100, 100, 20)
                .fill({ color: '#f3ebc0' })
                .stroke({ width: 1, color: 0xFFFFFF });
            squares[a].alpha = 0;
            squares[a].y = -380;

            selects[a].x = -230 + (a * 120);
            selects[a].y = -380;
            selects[a].scale.set(0.7);
            selects[a].anchor.set(0.5);
            selects[a].alpha = 0;
            selects[a].filters = [colorMatrix];

            ticks[a].x = -200 + (a * 120);
            ticks[a].y = -280;
            ticks[a].scale.set(0.2);
            ticks[a].anchor.set(0.5);
            ticks[a].alpha = 0;
            elementsContainer.addChild(squares[a], selects[a], ticks[a]);
        }

        const cross = new Sprite(Assets.get('cross'))
        cross.scale.set(0.6);
        cross.anchor.set(0.5);
        cross.alpha = 0;
        elementsContainer.addChild(cross);


        function animationStartSquares() {
            for (let a = 0; a < 5; a++) {
                gsap.to(squares[a], {
                    delay: 1,
                    duration: 1 * a,
                    ease: "elastic.out(1,0.5)",
                    alpha: 1,
                    y: -360
                })
                gsap.to(selects[a], {
                    delay: 1,
                    duration: 1 * a,
                    ease: "elastic.out(1,0.5)",
                    alpha: 1,
                    y: -310,
                })
            }
        }

        function activeElements(element: Sprite, index: number) {
            console.log('positions', element.x, element.y)
            element.on('pointerdown', (event) => {
                createExplosion(particleContainer, texture, element.x, element.y, 0.2)

                gsap.fromTo(ticks[index], {
                    scale: 0
                }, {
                    duration: 0.5,
                    ease: "elastic.out(1,0.5)",
                    alpha: 1,
                    scale: 0.2,
                })
                selects[index].filters = null;
                elementsContainer.removeChild(element);
            });
        }

        const windowContainer = new Container();
        assetsContainer.addChild(windowContainer);
        windowContainer.filters = blurFilter;

        const backgroundWin = new Sprite(Assets.get('backgroundWin-game-screen'));
        backgroundWin.scale.set(0.7);
        backgroundWin.anchor.set(0.5, 0.5);
        windowContainer.addChild(backgroundWin);

        for (let c = 0; c < 5; c++) {
            maskGraphics[c] = new Graphics();
            const w = 630;
            const h = 384;
            const x = backgroundWin.x + (backgroundWin.width / 2.7);
            const y = backgroundWin.y + (backgroundWin.height / 2.3);
            maskGraphics[c].moveTo(x + w / 2 - 30, y)
                // Pico superior
                .bezierCurveTo(x + w / 2 - 10, y - 12, x + w / 2 + 10, y - 12, x + w / 2 + 30, y)
                // Superior derecha
                .bezierCurveTo(x + w - 90, y, x + w - 40, y, x + w, y + 35)
                // Lateral derecho
                .bezierCurveTo(x + w + 22, y + h / 2, x + w + 22, y + h / 2, x + w, y + h - 35)
                // Inferior derecha
                .bezierCurveTo(x + w - 40, y + h, x + w - 90, y + h, x + w / 2 + 30, y + h)
                // Pico inferior
                .bezierCurveTo(x + w / 2 + 10, y + h + 12, x + w / 2 - 10, y + h + 12, x + w / 2 - 30, y + h)
                // Inferior izquierda
                .bezierCurveTo(x, y + h, x + 80, y + h, x, y + h - 35)
                // Lateral izquierdo
                .bezierCurveTo(x - 22, y + h / 2, x - 22, y + h / 2, x, y + 35)
                // Superior izquierda
                .bezierCurveTo(x - 40, y, x + 80, y, x + w / 2 - 30, y)
                .closePath();
            maskGraphics[c].fill({ color: 'red' });
            maskGraphics[c].x = -580;
            maskGraphics[c].y = -387;
            windowContainer.addChild(maskGraphics[c]);
        }

        const _continue = (selectObject: number): void => {
            if (this._count == selectObject) {
                console.log(selectObject)
                gsap.to(windowContainer, {
                    duration: 1,
                    ease: "elastic.inOut(1,0.5)",
                    y: 1200,
                    onComplete: (() => {
                        assetsContainer.removeChild(windowContainer);
                        backgroundContainer.filters = null;
                        elementsContainer.filters = null;
                        animationStartSquares()
                        backgroundResize.eventMode = 'static';
                        backgroundResize.on('pointerdown', (event) => {
                            console.log('incorrect!')
                            gsap.fromTo(cross, {
                                alpha: 1,
                            }, {
                                alpha: 0,
                                duration: 0.3,
                                ease: "none",
                                repeat: 3
                            })
                        })
                        for (let a = 0; a < 5; a++) {
                            elementActive[a].eventMode = 'static';
                            activeElements(elementActive[a], a)
                        }
                    })
                })
                this._count = 6;
            }
        }


        const line1 = new Container();
        line1.scale.set(0.7);
        line1.mask = maskGraphics[0];
        line1.y = -210
        line1.x = -250
        this._loadSlider(line1, 1.0799999999999998, 1, 1, _continue, this)
        windowContainer.addChild(line1);

        const line2 = new Container();
        line2.scale.set(0.7);
        line2.mask = maskGraphics[1];
        line2.y = -210
        line2.x = -125
        this._loadSlider(line2, 1.00999999999999999, 1.3, 2, _continue, this)
        windowContainer.addChild(line2);


        const line3 = new Container();
        line3.scale.set(0.7);
        line3.mask = maskGraphics[2];
        line3.y = -210
        line3.x = 0
        this._loadSlider(line3, 0.94, 1.4, 3, _continue, this)
        windowContainer.addChild(line3);

        const line4 = new Container();
        line4.scale.set(0.7);
        line4.mask = maskGraphics[3];
        line4.y = -210
        line4.x = 125
        this._loadSlider(line4, 0.8699999999999999999, 1.5, 4, _continue, this)
        windowContainer.addChild(line4);


        const line5 = new Container();
        line5.scale.set(0.7);
        line5.mask = maskGraphics[4];
        line5.y = -210
        line5.x = 250
        this._loadSlider(line5, 0.7999999999999999, 1.6, 5, _continue, this)
        windowContainer.addChild(line5);


        const shadowWin = new Sprite(Assets.get('shadow_win'));
        shadowWin.scale.set(0.7);
        shadowWin.anchor.set(0.5, 0.461);
        windowContainer.addChild(shadowWin);

        this._assetsContainer.scaler.setOriginalSize(assetsContainer.width * .4, assetsContainer.height * .4);
        this.resize(app.screen.width, app.screen.height);

        const rect = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill("#000000");
        this._background = rect
        rect.alpha = 0.7
        this.addChild(rect)

        const hand = new Sprite(Assets.get('hand'));
        const texture = new Texture(Assets.get('star_particle'));
        hand.x = app.screen.width / 2;
        hand.y = app.screen.height / 2;
        this.addChild(hand);
        const animaHand = gsap.to(hand,
            {
                duration: 1,
                x: hand.x - 50,
                y: hand.y - 50,
                ease: 'none',
                yoyo: true,
                repeat: -1,
            })

        rect.eventMode = 'static';
        rect.on('pointerdown', (event) => {
            this.removeChild(loadingText);
            this.removeChild(hand);
            windowContainer.filters = null;
            gsap.to(rect, {
                duration: 1,
                ease: "none",
                alpha: 0,
                onComplete: (() => {
                    this.removeChild(rect)
                    for (let j = 0; j < 5; j++) {
                        for (let i = 0; i < 14; i++) {
                            this.tween[j][i].resume()
                        }
                    }

                })
            })
        });

        const particleContainer = new ParticleContainer({
            dynamicProperties: { position: true, alpha: true }
        });

        elementsContainer.addChild(particleContainer)

        app.ticker.add((ticker) => {
            // Recorremos el array de datos (de atrás hacia adelante para eliminar fácil)
            for (let i = particleData.length - 1; i >= 0; i--) {
                const data = particleData[i];
                const p = data.sprite;

                // 1. Aplicar movimiento usando nuestros datos externos
                p.x += data.vx * ticker.deltaTime * 2;
                p.y += data.vy * ticker.deltaTime * 2;
                data.life *= 0.5 * ticker.deltaTime;

                p.alpha = data.life
                if (data.life <= 0) {
                    p.alpha = 0
                    particleContainer.removeParticle(p); // Quita del render de Pixi
                    particleData.splice(i, 1);   // Quita de nuestra lógica
                }
            }
        });


        const loadingText = new ScaledText({
            text: i18next.t('tapStart'),
            style: {
                fontFamily: 'grobold',
                fontSize: 55,
                align: 'center',
                fill: 'white'
            },
        });
        loadingText.anchor.set(0.5, 0.5);
        loadingText.x = app.screen.width / 2;
        loadingText.y = app.screen.height / 2 - 100;
        this.addChild(loadingText);

    }

    private _loadSlider(parentContainer: Container, selection: number, delay: number, selectObject: number, callBack: any, _this: any) {
        const itemsArray: Array<string | number | any> = [];
        const boxWidth = 174;
        for (let i = 0; i < 14; i++) {
            itemsArray[i] = new Sprite(Assets.get('item_' + i));
            itemsArray[i].anchor.set(0.5, 0.5);
            itemsArray[i].y = i + (160 * i);
            itemsArray[i].name = 'item_' + i;
            itemsArray[i].data = i;
            parentContainer.addChild(itemsArray[i]);
        }

        for (let j = 0; j < 14; j++) {
            animation(itemsArray[j], j, selection, _this)
        }

        function animation(element: Sprite, index: number, selection: number, _this: any) {

            let tweenIn: any = []
            tweenIn[index] = gsap.to(element, {
                duration: delay,
                ease: "none",
                y: `+=${13 * boxWidth}`,
                modifiers: {
                    y: gsap.utils.unitize((y) => parseFloat(y) % (13 * boxWidth)) //force x value to be between 0 and 500 using modulus
                },
                repeat: 1,
                onComplete: () => {
                    stop(tweenIn[index], selection)

                }

            })
            tweenIn[index].pause();
            _this.tween[selectObject - 1][index] = tweenIn[index]

        }



        function stop(animation: any, selection: number) {
            animation.pause();
            gsap.to(animation, {
                duration: 2,
                progress: gsap.utils.wrap(0, 1, selection),
                ease: "elastic.out(1,1)",
                onComplete: () => {
                    gsap.to(itemsArray[selectObject],
                        {
                            delay: 1,
                            duration: 1,
                            ease: "elastic.out(1,1)",
                            scale: 1.2,
                            zIndex: 1000,
                            onComplete: () => {
                                callBack(selectObject)
                            }
                        }
                    )
                }
            });

        }


    }

    private starsParticles(texture: Texture, posX: number, poxY: number): void {

    }


    public pause(): void {
        this._isPaused = true;
    }

    public resume(): void {
        this._isPaused = false;
    }


    public resize(width: number, height: number) {
        if (!this._background) return;
        this._background.clear().rect(0, 0, width, height).fill(this._backgroundColor);
        this._background.x = width * 0.5;
        this._background.y = height * 0.5;
        this._background.pivot.set(width * 0.5, height * 0.5);
        this._assetsContainer.scaler.resize(width, height);
    }

    public get active(): boolean {
        return this._active;
    }
}
