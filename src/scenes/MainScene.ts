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
    Texture,
    Ticker,
} from 'pixi.js';
import { GlowFilter } from 'pixi-filters'
import gsap from 'gsap';
import ScaledSprite from '../helpers/Scale/ScaledSprite';

import eventsSystem from '../utils/EventsSystem';
import sound from '../utils/Sound';
import PlaneBasicAnimations from '../utils/PlaneBasicAnimations';
import AssetsInlineHelper from '../helpers/AssetsInlineHelper';
import ScaledContainer from '../helpers/Scale/ScaledContainer';
import BackgroundScaler from '../helpers/BackgroundScaler';
import SplashParticles from '../utils/SplashParticles';
import particlesData from '../data/particlesData';
import WelcomeScreen from '../helpers/WelcomeScreen';
import TutorialHand from '../helpers/TutorialHand';
import localization from '../helpers/Localization';
import { sdk } from '@smoud/playable-sdk';

export default class MainScene extends Container {
    private _splashParticles!: SplashParticles;
    private _assetsContainer!: ScaledContainer;
    private _backgroundScaler!: BackgroundScaler;
    private _background!: Graphics;
    private _active: boolean = true;
    private _isPaused: boolean = false;
    private _assetsInlineHelper: AssetsInlineHelper;
    private _backgroundColor: number = 0x33067a;
    private _welcomeScreen!: WelcomeScreen;
    private _tutorialHand!: TutorialHand;
    private _windowContainer!: Container;
    private _gameLogo!: ScaledSprite;
    private _downloadButton!: ScaledSprite;
    private _elementSprites: Array<Sprite> = [];
    private _elementPressedIndex: number = 0;
    private _elementsContainer!: ScaledContainer;
    private _tutorialTimeOut: gsap.core.Tween | null = null;


    public _count: number = 5
    public tween: any = [];

    constructor(app: Application, assetsInlineHelper: AssetsInlineHelper) {
        super();
        this._assetsInlineHelper = assetsInlineHelper;
        this._addEvents();
        app.stage.addChild(this);
        this._startLoadingAssets(app);
    }

    private _addEvents(): void {
        eventsSystem.on('startGame', this._startGame.bind(this));
    }

    private _startGame(): void {
        this._windowContainer.filters = null;
           
                for (let j = 0; j < 5; j++) {
                   this.tween[j].resume();
                }
            
    }

    private _create(app: Application): void { }

    private async _startLoadingAssets(app: Application) {
        this._assetsInlineHelper.loadBundleByName('game-screen').then(async () => {
            await this._assetsInlineHelper.loadFonts();
            await this._createPreloadAssets(app);
        });
    }

    private _createGameLogo(): void {
        this._gameLogo = new ScaledSprite(Assets.get('logo_' + localization.getLanguage()));
        this._gameLogo.scaler.setPortraitScreenPosition(0.5, 0.94);
        this._gameLogo.scaler.setLandscapeScreenPosition(0.5, 0.91);
        this._gameLogo.scaler.setPortraitScreenSize(0.5, 0.18);
        this._gameLogo.scaler.setLandscapeScreenSize(0.2, 0.14);
        this._gameLogo.anchor.set(0.5);
        this._gameLogo.scaler.setOriginalSize(this._gameLogo.width, this._gameLogo.height);
        this.addChild(this._gameLogo);

        this._downloadButton = new ScaledSprite(Assets.get('download_button'));
        this._downloadButton.scaler.setPortraitScreenPosition(0.08, 0.95);
        this._downloadButton.scaler.setLandscapeScreenPosition(0.05, 0.935);
        this._downloadButton.scaler.setPortraitScreenSize(0.2, 0.1);
        this._downloadButton.scaler.setLandscapeScreenSize(0.1, 0.12);
        this._downloadButton.anchor.set(0.5);
        this._downloadButton.scaler.setOriginalSize(this._downloadButton.width, this._downloadButton.height);
        this._downloadButton.eventMode = 'static';
        this._downloadButton.cursor = 'pointer';
        this._downloadButton.on('pointerdown', () => {
            sdk.install();
        });
        this.addChild(this._downloadButton);
        this.resize(window.innerWidth, window.innerHeight);
    }

    private _createParticles(app: Application) {
        this._splashParticles = new SplashParticles(app);
        this.addChild(this._splashParticles)
    }

    private _createTutorialHand(): void {
        this._tutorialHand = new TutorialHand('hand');
        this.addChild(this._tutorialHand);
    }

    private async _createPreloadAssets(app: Application) {

        const blurFilter = new BlurFilter();
        const colorMatrix = new ColorMatrixFilter();

        const elementActive: Array<Sprite> = [];
        const squares: Array<Graphics> = [];
        const selects: Array<Sprite> = [];
        const ticks: Array<Sprite> = [];
        const maskGraphics: Array<Graphics> = []
        const background = new Graphics().rect(0, 0, app.screen.width, app.screen.height).fill(this._backgroundColor);

        this._elementSprites = elementActive;

        let particleData: any = [];
        //colorMatrix.grayscale(0.5, true);
        colorMatrix.blendMode = 'multiply'; 
        blurFilter.blur = 3;

        this.addChild(background);
        this._background = background;



        const createExplosion = (element: Sprite) => {
            const globalPos = element.getGlobalPosition();
            this._splashParticles.showSplashParticles(particlesData.pieceParticles, globalPos);
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
        backgroundResize.anchor.set(0.5, 0.5);
        backgroundContainer.addChild(backgroundResize);
        backgroundContainer.filters = blurFilter;


        const elementsContainer = new Container();
        elementsContainer.filters = blurFilter;
        assetsContainer.addChild(elementsContainer);

        elementActive[0] = new Sprite(Assets.get('select_1'));
        elementActive[0].anchor.set(0.5);
        elementActive[0].y = -180;
        elementActive[0].x = 250;
        elementsContainer.addChild(elementActive[0]);


        elementActive[1] = new Sprite(Assets.get('select_2'));
        elementActive[1].anchor.set(0.5);
        elementActive[1].scale.set(0.3)
        elementActive[1].y = 50;
        elementActive[1].x = 0;
        elementsContainer.addChild(elementActive[1]);


        elementActive[2] = new Sprite(Assets.get('select_3'));
        elementActive[2].anchor.set(0.5);
        elementActive[2].scale.set(0.5)
        elementActive[2].y = -10;
        elementActive[2].x = -300;
        elementsContainer.addChild(elementActive[2]);

        elementActive[3] = new Sprite(Assets.get('select_4'));
        elementActive[3].anchor.set(0.5);
        elementActive[3].scale.set(0.5)
        elementActive[3].y = 50;
        elementActive[3].x = 300;
        elementsContainer.addChild(elementActive[3]);

        elementActive[4] = new Sprite(Assets.get('select_5'));
        elementActive[4].anchor.set(0.5);
        elementActive[4].y = -200;
        elementActive[4].x = -120;
        elementsContainer.addChild(elementActive[4]);

        const checkElements = new ScaledContainer();
        this.addChild(checkElements);
        for (let a = 0; a < 5; a++) {
            squares[a] = new Graphics();
            selects[a] = new Sprite(Assets.get('select_' + [a + 1]));
            ticks[a] = new Sprite(Assets.get('tick'))

            squares[a].roundRect(-290 + (a * 120), 0, 100, 100, 20)
                .fill({ color: '#f3ebc0' })
                .stroke({ width: 1, color: 0xFFFFFF });
            squares[a].alpha = 0;
            squares[a].y = 0;

            selects[a].x = -240 + (a * 120);
            selects[a].y = 52;
            selects[a].scale.set(0.7);
            selects[a].anchor.set(0.5);
            selects[a].alpha = 0;


            ticks[a].x = -210 + (a * 120);
            ticks[a].y = 100;
            ticks[a].scale.set(0.2);
            ticks[a].anchor.set(0.5);
            ticks[a].alpha = 0;
            checkElements.addChild(squares[a], selects[a], ticks[a]);
        }

        this._elementsContainer = checkElements;
        checkElements.scaler.setPortraitScreenPosition(0.5, 0.05);
        checkElements.scaler.setLandscapeScreenPosition(0.5, 0.03);
        checkElements.scaler.setPortraitScreenSize(0.95, 0.9);
        checkElements.scaler.setLandscapeScreenSize(0.52, 0.17);
        checkElements.scaler.setOriginalSize(checkElements.width, checkElements.height);


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
                    //y: -360
                })
                gsap.to(selects[a], {
                    delay: 1,
                    duration: 1 * a,
                    ease: "elastic.out(1,0.5)",
                    alpha: 1,
                    //y: -310,
                })
            }
        }

        const activeElements = (element: Sprite, index: number) => {
            //console.log('positions', element.x, element.y)
            element.cursor = 'pointer';
            element.on('pointerdown', (event) => {
                if (this._tutorialTimeOut) {
                    this._tutorialTimeOut.kill();
                }
                if (this._elementPressedIndex <= 4) {
                    this._tutorialTimeOut = gsap.delayedCall(5, () => {
                        this._showTutorialHand();
                    });
                }
                selects[index].filters = [colorMatrix];
                selects[index].alpha = 0.3;
                createExplosion(element);
                this._tutorialHand.cancelTutorial();
                gsap.to(element, {
                    duration: 1,
                    alpha: 0,
                    y: -400,
                    x: selects[index].x,
                    onComplete: () => {

                        elementsContainer.removeChild(element);
                    }
                })
                gsap.fromTo(ticks[index], {
                    scale: 0
                }, {
                    duration: 0.5,
                    ease: "elastic.out(1,0.5)",
                    alpha: 1,
                    scale: 0.2,
                    onComplete: () => {

                        elementsContainer.removeChild(element);
                        this._elementPressedIndex++;
                        if (this._elementPressedIndex >= 5) {
                            sdk.install();
                        }
                    }
                })

            });
        }

        const windowContainer = new Container();
        assetsContainer.addChild(windowContainer);
        windowContainer.filters = blurFilter;
        this._windowContainer = windowContainer;

        const backgroundWin = new Sprite(Assets.get('backgroundWin-game-screen'));
        backgroundWin.scale.set(0.7);
        backgroundWin.anchor.set(0.5, 0.5);
        windowContainer.addChild(backgroundWin);

        const backgroundWinMask = new Sprite(Assets.get('mask-win'));
        backgroundWinMask.scale.set(0.7);
        backgroundWinMask.anchor.set(0.5, 0.46);
        backgroundWinMask.zIndex = 100000;
        windowContainer.addChild(backgroundWinMask);

        const _continue = (): void => {
           
                gsap.to(windowContainer, {
                    duration: 1,
                    delay:1,
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
                        this._showTutorialHand();
                    })
                })
                
        }


        const line1 = new Container();
        const line1Array:Array<Sprite>=[]
        line1.scale.set(0.7);
        line1.mask = backgroundWinMask;
        line1.x = -250
        this._loadSlots(line1,line1Array)
        windowContainer.addChild(line1);
        this.tween[0] = gsap.fromTo(line1,{
                y:220
        } ,{
                duration:3,
                ease: "elastic.inOut(1,1)",
                y: 3130,
                onComplete:()=>{
                    this._selectElementsScale(line1Array[28])
                    createExplosion(line1Array[28]);
                }
            })

        const line2 = new Container();
        const line2Array:Array<Sprite>=[]
        line2.scale.set(0.7);
        line2.mask = backgroundWinMask;
        line2.x = -125
        this._loadSlots(line2,line2Array)
        windowContainer.addChild(line2);
        this.tween[1] = gsap.fromTo(line2,{
                y:220
        } ,{
                duration:3,
                delay:0.3,
                ease: "elastic.inOut(1,1)",
                y: 3243,
                onComplete:()=>{ 
                    this._selectElementsScale(line2Array[29]);
                    createExplosion(line2Array[29]);
                }
            })


        const line3 = new Container();
        const line3Array:Array<Sprite>=[]
        line3.scale.set(0.7);
        line3.mask = backgroundWinMask;
        line3.x = 0
        this._loadSlots(line3,line3Array)
        windowContainer.addChild(line3);
        this.tween[2] = gsap.fromTo(line3,{
                y:220
        } ,{
                duration:3,
                delay:0.5,
                ease: "elastic.inOut(1,1)",
                y: 3356,
                onComplete:()=>{
                     this._selectElementsScale(line3Array[30]);
                    createExplosion(line3Array[30]);
                }
            })

        const line4 = new Container();
        const line4Array:Array<Sprite>=[]
        line4.scale.set(0.7);
        line4.mask = backgroundWinMask;
        line4.x = 125
        this._loadSlots(line4,line4Array)
        windowContainer.addChild(line4);
        this.tween[3] = gsap.fromTo(line4,{
                y:220
        } ,{
                duration:3,
                delay:0.7,
                ease: "elastic.inOut(1,1)",
                y: 3469,
                onComplete:()=>{
                    this._selectElementsScale(line4Array[31]);
                    createExplosion(line4Array[31]);
                }
            })


        const line5 = new Container();
        const line5Array:Array<Sprite>=[]
        line5.scale.set(0.7);
        line5.mask = backgroundWinMask;
        line5.x = 250
        this._loadSlots(line5,line5Array)
        windowContainer.addChild(line5);
        this.tween[4] = gsap.fromTo(line5,{
                y:220
        } ,{
                duration:3,
                delay:1,
                ease: "elastic.inOut(1,1)",
                y: 3582,
                onComplete:()=>{
                    this._selectElementsScale(line5Array[32]);
                    createExplosion(line5Array[32]);
                    _continue()
                }
            })

            this.tween[0].pause();
            this.tween[1].pause();
            this.tween[2].pause();
            this.tween[3].pause();
            this.tween[4].pause(); 



        const shadowWin = new Sprite(Assets.get('shadow_win'));
        shadowWin.scale.set(0.7, 0.71);
        shadowWin.anchor.set(0.5, 0.46);

        shadowWin.y = backgroundWinMask.y
        windowContainer.addChild(shadowWin);

        this._assetsContainer.scaler.setOriginalSize(assetsContainer.width * .4, assetsContainer.height * .4);
        this.resize(app.screen.width, app.screen.height);

        this._welcomeScreen = new WelcomeScreen();
        this.addChild(this._welcomeScreen);
        this._welcomeScreen.show();

        this._createGameLogo();
        this._createTutorialHand();
        this._createParticles(app);
        app.ticker.add(this._update.bind(this));
        
    }

    private _showTutorialHand(): void {
        const activeElements = this._elementSprites.filter((element) => element.alpha === 1);
        if (activeElements.length === 0) return;
        const randomIndex = Math.floor(Math.random() * activeElements.length);
        const randomElement = activeElements[randomIndex];
        this._tutorialHand.showTutorialObjects([randomElement], 0.5, true);
    }

    private _selectElementsScale(element:Sprite): void {
        
         gsap.to(element,
                        {
                            duration: 1,
                            ease: "elastic.out(1,1)",
                            scale: 1.2,
                            zIndex: 1000,
                        })
    }

    private _update(ticker: Ticker): void {
        //console.log('ticker', ticker.deltaTime);
        this._splashParticles.updateParticles(ticker.deltaTime);
    }

    private _loadSlots(parentContainer: Container,array:Array<Sprite>){
        
            let index:number = 0
        for (let i = 0; i < 39; i++) {

            if(index > 12 ){
                index = 0
            }else{
                index++
            }

            array[i] = new Sprite(Assets.get('item_' + index));
            array[i].anchor.set(0.5, 0.5);
            array[i].y = i - (160 * i);
            parentContainer.addChild(array[i]);
        }
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
        this._gameLogo && this._gameLogo.scaler.resize(width, height);
        this._downloadButton && this._downloadButton.scaler.resize(width, height);
        this._tutorialHand && this._tutorialHand.resize(width, height);
        this._welcomeScreen && this._welcomeScreen.resize(width, height);
        this._elementsContainer && this._elementsContainer.scaler.resize(width, height);
    }

    public get active(): boolean {
        return this._active;
    }
}
