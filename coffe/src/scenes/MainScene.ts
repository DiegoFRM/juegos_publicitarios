import { Application, Container, Sprite, Graphics, Assets, Rectangle, BlurFilter, BitmapText } from 'pixi.js';
import ScaledContainer from '../helpers/Scale/ScaledContainer';
import ScaledSprite from '../helpers/Scale/ScaledSprite';
import BasicAnimations from '../helpers/BasicAnimations';
import ScaledSpineButton from '../helpers/Scale/ScaledSpineButton';
import { ButtonsConfig, CharacterConfig, GameCharactersConfig, ClientConfig, BackgroundConfig } from '../types/game';
import SpineAnimation from '../helpers/SpineAnimation';
import Globe from '../helpers/Globe';
import Hamburger from '../helpers/Hamburguer';
import FinalScreen from '../helpers/FinalScreen';
import TutorialHand from '../helpers/TutorialHand';
import PlatformRedirect from '../helpers/PlatformRedirect';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Conveyor from '../helpers/Conveyor';
import ScaledText from '../helpers/Scale/ScaledText';

import charactersConfig from '../data/characters_config.json';
import gameConfig from '../data/game_config.json';
import uiConfig from '../data/ui_config.json';
import sound from '../helpers/Sound';
import eventsSystem from '../helpers/EventsSystem';

export default class MainScene extends Container {
    private _background!: Sprite;
    private _assetsContainer!: ScaledContainer;
    private _conveyor!: Conveyor;
    private _basicAnimations: BasicAnimations;
    private _sceneContainer!: Container;
    private _showContainer!: Container;
    private _logo!: ScaledSprite;
    private _downloadButton!: ScaledSprite;
    private _newOrder!: Graphics;
    private _tutorialOrder!: Graphics;
    private _chef!: SpineAnimation;
    private _charactersConfig: GameCharactersConfig = charactersConfig;
    private _currentClient!: ClientConfig
    private _globe!: Globe;
    private _hamburger!: Hamburger;
    private _currentBurger: number = 0;
    private _readyBurger: boolean = false;
    private _meat: boolean = false;
    private _lettuce: boolean = false;
    private _chesse: boolean = false;
    private _coin!: Sprite
    private _barcoin!: Sprite
    private _count!: Sprite
    private _maskCount!: Graphics
    private _textCoin!: ScaledText
    private _countCoin: number = 0;
    private _buttonUpgrade!: Sprite;
    private _countFails:number = 0;
    private _animation!: GSAPAnimation;
    private _finalScreen!: FinalScreen;
    private _blurFilter!: BlurFilter;
    private _tutorialHand!: TutorialHand;
    private _tutorialTimer: gsap.core.Tween | null = null;
    private _platformRedirect: PlatformRedirect = new PlatformRedirect(
        gameConfig.redirect_links.ios,
        gameConfig.redirect_links.android,
        gameConfig.redirect_links.ios
    );

    private _clientsAnimations: SpineAnimation[][] = [];
    private _currentCharacters: SpineAnimation[] = [];
    private _gameButtons: ScaledSpineButton[] = [];
    private _isActive: boolean = true;
    private _moveBackgroundTime: number = 3;
    private _backgroundScaleValue: number = 2;
    private _tutorialTimerSeconds: number = 4;
    private _clientIndex: number = 0;
    private _characterPositions: { from: number, middle: number, to: number } = { from: 0, middle: 0, to: 0 };
    private _secondCharacterPosition: { from: number, middle: number, to: number } = { from: 0, middle: 0, to: 0 };
    private _walkTime: number = this._isPortrait() ? this._charactersConfig.walkTime.portrait : this._charactersConfig.walkTime.landscape;
    private _gamePassed: boolean = true;
    private _isFirstTime: boolean = true;
    private _screenCharactersOffset: number = 60;
    private _button1!: Sprite;
    private _button2!: Sprite;
    private _button3!: Sprite;
    private _orders: Array<any> = [
        { a: true, b: false, c: true },
        { a: true, b: true, c: true },
        { a: true, b: false, c: true },
        { a: true, b: false, c: true },
        { a: true, b: true, c: true }
    ]
    private _makeHamburger: Array<boolean> = [true, false, true];

    constructor(app: Application, basicAnimations: BasicAnimations) {
        super();
        app.stage.addChild(this);
        this._basicAnimations = basicAnimations;
        this._setBackgroundScaleValue(uiConfig.background);
        this._create();
        this._createBlurFilter();
        this._update(app)
    }

    private _createBlurFilter(): void {
        this._blurFilter = new BlurFilter();
        this._blurFilter.strength = 0;
        this._showContainer.filters = [this._blurFilter];
    }

    private _addBlur(): void {
        gsap.to(this._blurFilter, { strength: 10, duration: 1 });
    }

    private _setBackgroundScaleValue(backgroundConfig: BackgroundConfig): void {
        if (!this._isPortrait()) {
            this._backgroundScaleValue = backgroundConfig.scale.landscape;
        } else {
            this._backgroundScaleValue = backgroundConfig.scale.portrait;
        }
    }

    private _isPortrait(): boolean {
        return window.innerWidth < window.innerHeight;
    }


    public get active(): boolean {
        return this._isActive;
    }



    private _create(): void {

        gsap.registerPlugin(MotionPathPlugin)
        const assetsContainer = new ScaledContainer();
        assetsContainer.scaler.setPortraitScreenPosition(0.6, 0.5);
        assetsContainer.scaler.setPortraitScreenSize(1.4, 1.4);
        assetsContainer.scaler.setLandscapeScreenPosition(0.5, 0.55);
        assetsContainer.scaler.setLandscapeScreenSize(1, 1.7);
        this.addChild(assetsContainer);
        this._assetsContainer = assetsContainer;


        this._background = new Sprite(Assets.get('background'));
        this._background.anchor.set(0.5, 0.5);
        this._background.position.set(0, 0);
        assetsContainer.addChild(this._background);

        this._conveyor = new Conveyor(0, 0)
        this._conveyor.zIndex = 10;
        assetsContainer.addChild(this._conveyor);

        this._sceneContainer = new Container();
        this.addChild(this._sceneContainer);

        this._newOrder = new Graphics().rect(230, -190, 170, 90).fill('red');
        this._newOrder.alpha = 0;
        this._newOrder.zIndex = 11;
        assetsContainer.addChild(this._newOrder)

        this._tutorialOrder = new Graphics().rect(230, -190, 170, 90).fill('red');
        this._tutorialOrder.alpha = 0;
        this._tutorialOrder.zIndex = 11;
        assetsContainer.addChild(this._tutorialOrder);

        this._count = new Sprite(Assets.get('count'));
        this._count.anchor.set(0.5);
        this._count.scale.set(1.5)
        this._count.y = -330;
        this._count.zIndex = 10;
        assetsContainer.addChild(this._count);

        this._buttonUpgrade = new Sprite(Assets.get('buttonUpgrade'));
        this._buttonUpgrade.anchor.set(0.5);
        this._buttonUpgrade.y = 300;
        this._buttonUpgrade.zIndex = 11;
        this._buttonUpgrade.alpha = 0;
        assetsContainer.addChild(this._buttonUpgrade);
        this._buttonUpgrade.on('pointerdown', () => {
            this._chef.playAnimation('2. happy_action', false);
            this._conveyor.conveyorUpgradeAnimation();
            this._buttonUpgrade.eventMode = 'static';
            this._buttonUpgrade.cursor = 'none';
            gsap.to(this._chef, {
                alpha: 1, duration: 1, onComplete: () => {
                    gsap.to(this._logo, { alpha: 0, duration: 0.5 });
                    gsap.to(this._downloadButton, { alpha: 0, duration: 0.5 });
                    console.log('Finished game');
                    this._finalScreen.show(this._gamePassed);
                    this._addBlur();
                    window.parent && window.parent.postMessage && window.parent.postMessage('complete', '*');
                }
            })
        })



        this._maskCount = new Graphics().rect(-530, -370, 400, 100).fill('red');
        this._maskCount.zIndex = 10;
        this._maskCount.alpha = 1;

        this._barcoin = new Sprite(Assets.get('barcoin'));
        this._barcoin.anchor.set(0.5, 0.5);
        this._barcoin.scale.set(1.5)
        this._barcoin.y = -330;
        this._barcoin.mask = this._maskCount;
        this._barcoin.x = 50;
        this._barcoin.zIndex = 10;

        this._textCoin = new ScaledText({
            text: this._countCoin,
            style: {
                fontFamily: 'grobold',
                fontSize: 55,
                align: 'center',
                fill: 'white',
                stroke: '#287514',
            },
        });
        this._textCoin.zIndex = 11;
        this._textCoin.anchor.set(0.5, 0.5);
        this._textCoin.x = this._count.x + 40
        this._textCoin.y = this._count.y 
        assetsContainer.addChild(this._textCoin);



        assetsContainer.addChild(this._barcoin);
        assetsContainer.addChild(this._maskCount);



        this._showContainer = new Container();
        this._showContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this._showContainer.addChild(this._sceneContainer)
        this.addChild(this._showContainer);

        this._newOrder.on('pointerdown', () => {
            this._newOrder.cursor = 'none';
            this._newOrder.eventMode = 'none';
            this._newHamburger();
            this._moveHamburger();
        })


        this._assetsContainer.scaler.setOriginalSize(assetsContainer.width * .4, assetsContainer.height * .4);

        this._createCharacters();
        this._createUI();
        this._createFinalScreen();
        this.resize(document.body.clientWidth, document.body.clientHeight);
        this._setPositionValues();
        this._startGame();

    }

    private async _update(app: Application) {
        app.ticker.add(() => {

            if(this._countFails == 4){
                gsap.to(this._chef, {
                alpha: 1, duration: 1, onComplete: () => {
                    gsap.to(this._logo, { alpha: 0, duration: 0.5 });
                    gsap.to(this._downloadButton, { alpha: 0, duration: 0.5 });
                    console.log('Finished game');
                    this._finalScreen.show(false);
                    this._addBlur();
                    window.parent && window.parent.postMessage && window.parent.postMessage('complete', '*');
                }
            })
            this._countFails++
            }

            if (this._readyBurger) {
                if (this._hamburger.x <= -325) {
                    if (this._hamburger.y < 0 &&
                        this._hamburger.y < -42
                    ) {
                        console.log(this._makeHamburger)
                        console.log(this._orders[this._currentBurger])
                        console.log(this._currentBurger)
                        if (this._makeHamburger[0] == this._orders[this._currentBurger].a &&
                            this._makeHamburger[1] == this._orders[this._currentBurger].b &&
                            this._makeHamburger[2] == this._orders[this._currentBurger].c
                        ) {
                            this._animation.kill();
                            this._hamburger.y = 100;
                            this._hamburger.alpha = 0;
                            this._finishCharacter(true);
                            this._assetsContainer.removeChild(this._hamburger)
                            this._currentBurger++
                            this._readyBurger = false;
                            this._meat = false;
                            this._lettuce = false;
                            this._chesse = false;
                            this._makeHamburger = [false, false, false]
                        } else {
                            this._chef.playAnimation('3. sad_action', false)
                            this._readyBurger = false;
                            this._meat = false;
                            this._lettuce = false;
                            this._chesse = false;
                            this._makeHamburger = [false, false, false]
                            this.activeMachine();
                            this._countFails++;
                        }
                    }
                }
            }
        });
    }


    private _createFinalScreen(): void {
        this._finalScreen = new FinalScreen(window.innerWidth, window.innerHeight, this._platformRedirect);
        this.addChild(this._finalScreen);
    }

    private _setPositionValues(): void {
        const screenWidth = window.innerWidth / this._showContainer.scale.x;
        this._characterPositions.from = -screenWidth * 0.5 - this._screenCharactersOffset;
        this._characterPositions.to = screenWidth * 0.5 + this._screenCharactersOffset;
        this._characterPositions.middle = this._charactersConfig.clientsPosition.middle;

        this._secondCharacterPosition.from = this._characterPositions.from - this._screenCharactersOffset;
        this._secondCharacterPosition.to = this._characterPositions.to + this._screenCharactersOffset;
        this._secondCharacterPosition.middle = this._characterPositions.middle + this._screenCharactersOffset
    }

    private _createCharacters(): void {
        const chefData: CharacterConfig = this._charactersConfig.chef;
        this._chef = new SpineAnimation(50, 260, { skeleton: chefData.skeleton, atlas: chefData.atlas }, true);
        this._chef.scale.set(chefData.scale);
        this._chef.zIndex = 2;
        this._assetsContainer.addChild(this._chef);

        this._globe = new Globe(this._chef.x - 350, this._chef.y - 300);
        this._globe.zIndex = 20;
        this._assetsContainer.addChild(this._globe);

        for (const clientData of this._charactersConfig.clients) {
            const clientAnimations: SpineAnimation[] = [];
            for (const characterData of clientData.characters) {
                const character = new SpineAnimation(0, 0, { skeleton: characterData.skeleton, atlas: characterData.atlas }, true);
                character.scale.set(characterData.scale);
                character.setSkin(characterData.skin);
                character.zIndex = 10;
                this._assetsContainer.addChild(character);
                clientAnimations.push(character);
                character.alpha = 0;
            }
            this._clientsAnimations.push(clientAnimations);
        }
    }

    private async _startGame(): Promise<void> {
        //await this._moveBackground();
        this._moveCharacters();

    }

    private _moveCharacters(): void {
        const charactersOffset = this._charactersConfig.clientsPosition.offset;
        this._chef.playAnimation('1. happy_idle', true);
        this._currentClient = this._charactersConfig.clients[this._clientIndex];
        this._currentCharacters = this._clientsAnimations[this._clientIndex];
        this._currentCharacters.forEach((character, index) => {
            character.position.set(this._characterPositions.from, this._charactersConfig.clientsPosition.y);
            index > 0 && character.position.set(character.position.x - charactersOffset.x, character.position.y +
                charactersOffset.y * index);
            character.alpha = 1;
            character.playAnimation('walk_happy', true);
            const middlePosition = index > 0 ? this._characterPositions.middle - charactersOffset.x * 1.7 : this._characterPositions.middle * 3;
            gsap.to(character.position, {
                x: middlePosition + 60,
                duration: this._walkTime,
                delay: 0,
                ease: 'none',
                onComplete: () => {
                    character.playAnimation('happy_idle', true);

                    if (this._currentBurger == 0) {
                        this.newOrder(0);
                        this._tutorialHamburger();
                        this._chef.playAnimation('4. Waving', false);
                    } else {
                        if (this._currentBurger == 2) {
                            this.newOrder(2);
                        } else if(this._currentBurger == 4) {
                            this.newOrder(4);
                        }else {
                            this.newOrder(0);
                        }
                        this.activeMachine()
                    }
                }
            });
        });
    };

    private newOrder(amount: number): void {
        this._globe.show(
            this._orders[this._currentBurger].a,
            this._orders[this._currentBurger].b,
            this._orders[this._currentBurger].c,
            amount
        )

    }

    private _newHamburger(): void {
        this._meat = false;
        this._lettuce = false;
        this._chesse = false;
        this._hamburger = new Hamburger(325, -50);
        this._hamburger.zIndex = 10;
        this._hamburger.scale.set(0.4);
        this._assetsContainer.addChild(this._hamburger)
        this._hamburger.createHamburger(this._meat, this._lettuce, this._chesse);

    }

    private activeMachine(): void {
        this._newOrder.cursor = 'pointer';
        this._newOrder.eventMode = 'static';
        this._activeButtons();
    }

    private _moveHamburger(): void {
        this._animation.kill()
        gsap.to(this._hamburger,
            {
                motionPath: {
                    path: [{ x: 325, y: -50 }, { x: 325, y: 130 }, { x: 250, y: 165 }],

                },
                ease: 'none',
                duration: 1
            })

        gsap.to(this._hamburger,
            {
                x: -200,
                delay: 1,
                duration: 5,
                ease: 'none',
                onComplete: () => {
                    this._readyBurger = true;
                    this._deactivateButtons();
                }
            })

        this._animation = gsap.to(this._hamburger,
            {
                motionPath: {
                    path: [{ x: -250, y: 165 }, { x: -325, y: -110 }, { x: -150, y: -110 }],

                },
                ease: 'none',
                delay: 6,
                duration: 2, onComplete: () => {
                    this._hamburger.zIndex = 0;
                    gsap.to(this._hamburger, {
                        x: -100,
                        y: -60
                    }

                    )
                    this._hamburger.throwBurger(
                        this._makeHamburger[0],
                        this._makeHamburger[1],
                        this._makeHamburger[2]
                    )
                }
            })


    }

    private tutorialMoveBurger(): void {
        gsap.to(this._hamburger,
            {
                motionPath: {
                    path: [{ x: 325, y: -50 }, { x: 325, y: 130 }, { x: 250, y: 165 }],

                },
                ease: 'none',
                duration: 1,
                onComplete: () => {
                    gsap.to(this._hamburger,
                        {
                            x: 0,
                            duration: 2,
                            onComplete: () => {
                                this._selectElementScale(this._hamburger)
                            }
                        })
                }
            })
    }

    private _selectElementScale(element: any): void {
        gsap.to(element, {
            width: element.width + 10,
            height: element.height + 10,
            yoyo: true,
            repeat: -1
        })
    }

    private _tutorialHamburger(): void {
        let step = 0;
        const handTutorial = new Sprite(Assets.get('hand'))
        handTutorial.zIndex = 30;
        this._assetsContainer.addChild(handTutorial);
        handTutorial.x = 320;
        handTutorial.y = -120;
        let animation = gsap.to(handTutorial, {
            duration: 0.7,
            x: handTutorial.x + 20,
            y: handTutorial.y + 20,
            yoyo: true,
            ease: 'back.in',
            repeat: -1
        })

        this._tutorialOrder.cursor = 'pointer';
        this._tutorialOrder.eventMode = 'static';
        this._tutorialOrder.on('pointerdown', () => {

            switch (step) {
                case 0:
                    this._newHamburger();
                    this.tutorialMoveBurger()
                    animation.kill()
                    this._tutorialOrder.x = -450;
                    this._tutorialOrder.y = 250;
                    gsap.to(handTutorial, {
                        duration: 1,
                        rotation: 4,
                        x: -100,
                        y: 60,
                        ease: 'back.in',
                        onComplete: () => {
                            animation = gsap.to(handTutorial, {
                                duration: 0.7,
                                y: handTutorial.y + 20,
                                yoyo: true,
                                ease: 'back.in',
                                repeat: -1
                            })
                        }
                    })
                    step++

                    break;
                case 1:
                    animation.kill()
                    this._chesse = true;
                    this._tutorialOrder.x = -300;
                    this._tutorialOrder.y = 250;
                    this._hamburger.createHamburger(this._meat, this._lettuce, this._chesse);
                    gsap.to(handTutorial, {
                        duration: 1,
                        rotation: 4,
                        x: 20,
                        ease: 'back.in',
                        onComplete: () => {
                            animation = gsap.to(handTutorial, {
                                duration: 0.7,
                                y: handTutorial.y + 20,
                                yoyo: true,
                                ease: 'back.in',
                                repeat: -1
                            })
                        }
                    })
                    step++
                    break;
                case 2:
                    animation.kill();
                    this._tutorialOrder.y = 320;
                    this._tutorialOrder.zIndex = 40;
                    this._meat = true;
                    this._hamburger.createHamburger(this._meat, this._lettuce, this._chesse);
                    gsap.to(handTutorial, {
                        duration: 1,
                        rotation: 4,
                        y: 150,
                        ease: 'back.in',
                        onComplete: () => {
                            animation = gsap.to(handTutorial, {
                                duration: 0.7,
                                y: handTutorial.y + 20,
                                yoyo: true,
                                ease: 'back.in',
                                repeat: -1
                            })
                        }
                    })
                    step++
                    break;
                case 3:
                    this._readyBurger = true;
                    handTutorial.alpha = 0;
                    this._tutorialOrder.destroy();
                    this._animation = gsap.to(this._hamburger,
                        {
                            motionPath: {
                                path: [{ x: -250, y: 165 }, { x: -325, y: -110 }, { x: -150, y: -110 }],

                            },
                            ease: 'none',
                            duration: 2,
                        })
                    break;
            }

        })

    }



    private _goToNextClient(): void {
        this._clientIndex++;
        if (this._clientIndex < this._charactersConfig.clients.length) {
            this._moveCharacters();
        } else {
            gsap.to(this._logo, { alpha: 0, duration: 0.5 });
            gsap.to(this._downloadButton, { alpha: 0, duration: 0.5 });
            console.log('Finished game');
            this._finalScreen.show(this._gamePassed);
            this._addBlur();
            window.parent && window.parent.postMessage && window.parent.postMessage('complete', '*');
        }
    }

    private _finishCharacter(isCorrect: boolean): void {
        let positionTo: number, finishAnimation: string;
        const currentCharacters = this._currentCharacters;
        if (isCorrect) {
            finishAnimation = 'happy_food';
            this.activeMachine();
            if (this._currentBurger == 2) {
                this._chef.playAnimation('2. happy_action', false);
            } else {
                this._chef.playAnimation('2. happy_action', false);
                finishAnimation = 'happy_food';
                this._globe.hide();
                let distance = 0;
                if (this._maskCount.x >= 320) {
                    distance = 350
                    this._countCoin = 500;

                } else {
                    this._countCoin = this._countCoin + 200
                    distance = this._maskCount.x + 160
                }
                this._textCoin.text = this._countCoin
                gsap.to(this._maskCount, {
                    x: distance,
                    duration: 1,
                    onComplete: () => {
                        if (this._maskCount.x == 350) {

                            this._buttonUpgrade.alpha = 1;
                            this._buttonUpgrade.eventMode = 'static';
                            this._buttonUpgrade.cursor = 'pointer';
                            gsap.fromTo(this._buttonUpgrade.scale, {
                                x: 0, y: 0
                            }, { x: 1, y: 1, duration: 0.5, ease: 'bounce.inOut' });
                        }
                    }
                })
            }

        } else {
            this._gamePassed = false;
            finishAnimation = this._currentClient.characters[0].name == 'naomi' ? 'negative' : 'happy_idle';
            this._chef.playAnimation('3. sad_action', false)

        }
        if (this._currentBurger != 2) {
            const reactionTime = currentCharacters[0].getAnimationDuration(finishAnimation);
            currentCharacters.forEach((character, index) => {
                character.playAnimation(finishAnimation, false);
                if (currentCharacters.length > 1 && index == 0) {
                    positionTo = isCorrect ? this._secondCharacterPosition.to : this._characterPositions.from;
                } else {
                    positionTo = isCorrect ? this._characterPositions.to : this._characterPositions.from;
                }
                gsap.to(character.position, {
                    x: this._characterPositions.from,
                    duration: this._walkTime,
                    delay: reactionTime,
                    ease: 'none',
                    onComplete: () => {
                        character.alpha = 0;
                    },
                    onStart: () => {
                        character.scale.x *= -1;

                        character.playAnimation('walk_happy', true);
                    }
                });
                if (index == currentCharacters.length - 1) {
                    gsap.delayedCall(this._isPortrait() ? this._walkTime + reactionTime :
                        this._walkTime * 0.85, () => {
                            this._chef.playAnimation('1. happy_idle', true);
                            this._goToNextClient();
                        });
                }
            });
        }
    }





    private _createUI(): void {

        this._logo = new ScaledSprite(Assets.get('logo'));
        this._logo.anchor.set(0.5);
        this._logo.scaler.setPortraitScreenPosition(0.15, 0.06);
        this._logo.scaler.setPortraitScreenSize(0.25, 0.1);
        this._logo.scaler.setLandscapeScreenPosition(0.9, 0.075);
        this._logo.scaler.setLandscapeScreenSize(0.15, 0.11);
        this._logo.scaler.setOriginalSize(this._logo.width, this._logo.height);
        this.addChild(this._logo);

        this._downloadButton = new ScaledSprite(Assets.get('download_button'));
        this._downloadButton.anchor.set(0.5);
        this._downloadButton.scaler.setPortraitScreenPosition(0.9, 0.05);
        this._downloadButton.scaler.setPortraitScreenSize(0.1, 0.05);
        this._downloadButton.scaler.setLandscapeScreenPosition(0.92, 0.9);
        this._downloadButton.scaler.setLandscapeScreenSize(0.11, 0.11);
        this._downloadButton.scaler.setOriginalSize(this._downloadButton.width, this._downloadButton.height);
        this._downloadButton.eventMode = 'static';
        this._downloadButton.cursor = 'pointer';
        this._downloadButton.on('pointerdown', () => {
            this._platformRedirect.redirect();
        });

        this.addChild(this._downloadButton);

        this._createButtons();
    }

    private _createButtons(): void {
        this._button1 = new Sprite(Assets.get('button1'))
        this._assetsContainer.addChild(this._button1)
        this._button1.anchor.set(0.5);
        this._button1.x = -130;
        this._button1.y = 110;
        this._button1.zIndex = 3;
        this._button1.alpha = 1;

        this._button2 = new Sprite(Assets.get('button2'))
        this._assetsContainer.addChild(this._button2);
        this._button2.anchor.set(0.5);
        this._button2.x = 5;
        this._button2.y = 110;
        this._button2.zIndex = 3;
        this._button2.alpha = 1;

        this._button3 = new Sprite(Assets.get('button3'))
        this._assetsContainer.addChild(this._button3);
        this._button3.anchor.set(0.5);
        this._button3.x = 140;
        this._button3.y = 110;
        this._button3.zIndex = 3;
        this._button3.alpha = 1;

        this._button1.on("pointerdown", () => {
            this._chesse = true;
            this._hamburger.createHamburger(this._meat, this._lettuce, this._chesse);
            this._makeHamburger[2] = true;
        });

        this._button2.on("pointerdown", () => {
            this._meat = true;
            this._hamburger.createHamburger(this._meat, this._lettuce, this._chesse);
            this._makeHamburger[0] = true;
        });


        this._button3.on("pointerdown", () => {
            this._lettuce = true;
            this._hamburger.createHamburger(this._meat, this._lettuce, this._chesse);
            this._makeHamburger[1] = true;
        });


    }

    private _activeButtons(): void {
        this._button1.eventMode = 'static';
        this._button1.cursor = 'pointer';
        this._button2.eventMode = 'static';
        this._button2.cursor = 'pointer';
        this._button3.eventMode = 'static';
        this._button3.cursor = 'pointer';
    }

    private _hideButtons(): void {

    }

    private _deactivateButtons(): void {
        this._button1.eventMode = 'none';
        this._button1.cursor = 'none';
        this._button2.eventMode = 'none';
        this._button2.cursor = 'none';
        this._button3.eventMode = 'none';
        this._button3.cursor = 'none';
    }

    public resize(width: number, height: number): void {
        this._assetsContainer.scaler.resize(width, height);
        this._resizeScene(width, height);
        this._resizeUI(width, height);

    }

    private _resizeScene(width: number, height: number): void {
        this._showContainer.position.set(width / 2, height / 2);
        const scale = height / this._background.height;
        this._showContainer.scale.set(scale);
    }

    private _resizeUI(width: number, height: number): void {
        this._logo.scaler.resize(width, height);
        this._downloadButton.scaler.resize(width, height);
        this._finalScreen.resize(width, height);
    }
}