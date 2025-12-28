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

import charactersConfig from '../data/characters_config.json';
import gameConfig from '../data/game_config.json';
import uiConfig from '../data/ui_config.json';
import sound from '../helpers/Sound';
import eventsSystem from '../helpers/EventsSystem';

export default class MainScene extends Container {
    private _background!: Sprite;
    private _assetsContainer!: ScaledContainer;
    private _table!: Sprite;
    private _basicAnimations: BasicAnimations;
    private _sceneContainer!: Container;
    private _showContainer!: Container;
    private _logo!: ScaledSprite;
    private _downloadButton!: ScaledSprite;
    private _vipButton!: ScaledSpineButton;
    private _singleButton!: ScaledSpineButton;
    private _loveButton!: ScaledSpineButton;
    private _chef!: SpineAnimation;
    private _charactersConfig: GameCharactersConfig = charactersConfig;
    private _currentClient!: ClientConfig
    private _globe!: Globe;
    private _hamburger!: Hamburger;
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

    constructor(app: Application, basicAnimations: BasicAnimations) {
        super();
        app.stage.addChild(this);
        this._basicAnimations = basicAnimations;
        this._setBackgroundScaleValue(uiConfig.background);
        this._addEvents();
        this._create();
        this._createBlurFilter();
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

    private _addEvents(): void {
        eventsSystem.on('pressButton', this._pressButton.bind(this));
    }

    private _pressButton(buttonTag: string, animationDuration: number = 0): void {
        if (this._isActive) {
            this._tutorialTimer && this._tutorialTimer.kill();
            this._tutorialTimer = null;
            if (this._isFirstTime) {
                this._tutorialHand.cancelTutorial();
                this._isFirstTime = false;
            } else {
                this._tutorialHand.running && this._tutorialHand.cancelTutorial();
            }
            this._finishCharacter(buttonTag == this._currentClient.correctOption, buttonTag);
            this._deactivateButtons();
            gsap.delayedCall(animationDuration * 1.5, this._hideButtons.bind(this));
        }
    }

    public get active(): boolean {
        return this._isActive;
    }



    private _create(): void {

        const assetsContainer = new ScaledContainer();
        assetsContainer.scaler.setPortraitScreenPosition(0.5, 0.5);
        assetsContainer.scaler.setPortraitScreenSize(1, 1);
        assetsContainer.scaler.setLandscapeScreenPosition(0.5, 0.7);
        assetsContainer.scaler.setLandscapeScreenSize(1, 1);
        this.addChild(assetsContainer);
        this._assetsContainer = assetsContainer;


        this._background = new Sprite(Assets.get('background'));
        this._background.anchor.set(0.5, 0.5);
        this._background.position.set(0, 0);
        assetsContainer.addChild(this._background);

        this._table = new Sprite(Assets.get('table1'))
        this._table.anchor.set(0.5, 0.4);
        this._table.position.set(0, 0);
        this._table.zIndex = 10;
        assetsContainer.addChild(this._table);

        this._sceneContainer = new Container();
        this.addChild(this._sceneContainer);


        this._showContainer = new Container();
        this._showContainer.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this._showContainer.addChild(this._sceneContainer)
        this.addChild(this._showContainer);


        this._assetsContainer.scaler.setOriginalSize(assetsContainer.width * .4, assetsContainer.height * .4);

        this._createCharacters();
        this._createUI();
        this._createFinalScreen();
        this._createTutorialHand();
        this.resize(document.body.clientWidth, document.body.clientHeight);
        this._setPositionValues();
        this._startGame();
    }

    private _createTutorialHand(): void {
        this._tutorialHand = new TutorialHand('hand');
        this.addChild(this._tutorialHand);
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
        this._assetsContainer.addChild(this._chef);
        //console.log('waiter animations:', this._chef.getAnimations());

        this._globe = new Globe(this._chef.x - 330, this._chef.y - 260);
        this._globe.zIndex = 10;
        this._assetsContainer.addChild(this._globe);

        this._hamburger = new Hamburger(0,170);
        this._hamburger.zIndex = 100;
        this._hamburger.scale.set(0.5);
        this._assetsContainer.addChild(this._hamburger)
        this._hamburger.createHamburger(true,false,false)
        

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
                charactersOffset.y * index );
            character.alpha = 1;
            character.playAnimation('walk_happy', true);
            const middlePosition = index > 0 ? this._characterPositions.middle - charactersOffset.x * 1.7 : this._characterPositions.middle * 3;
            gsap.to(character.position, {
                x: middlePosition,
                duration: this._walkTime,
                delay: 0,
                ease: 'none',
                onComplete: () => {
                    character.playAnimation('happy_idle', true);
                    if (index == 0) {
                        this._showButtons();
                        this._chef.playAnimation('4. Waving', false);
                    }
                }
            });
        });
    }

    private _newHamburger():void{

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

    private _finishCharacter(isCorrect: boolean, optionSelected: string): void {
        let positionTo: number, finishAnimation: string;
        const currentCharacters = this._currentCharacters;
        if (isCorrect) {
            this._chef.playAnimation('2. happy_action', false);
            finishAnimation = 'happy_idle';
        } else {
            this._gamePassed = false;
            finishAnimation = this._currentClient.characters[0].name == 'naomi' ? 'negative' : 'happy_idle';
            this._chef.playAnimation('3. sad_action', false)
            const stringToShow = this._currentClient.reactions.hasOwnProperty(optionSelected) ?
                this._currentClient.reactions[optionSelected] : '';
            this._globe.show(stringToShow);
        }
        const reactionTime = currentCharacters[0].getAnimationDuration(finishAnimation);
        currentCharacters.forEach((character, index) => {
            character.playAnimation(finishAnimation, false);
            if (currentCharacters.length > 1 && index == 0) {
                positionTo = isCorrect ? this._secondCharacterPosition.to : this._characterPositions.from;
            } else {
                positionTo = isCorrect ? this._characterPositions.to : this._characterPositions.from;
            }
            gsap.to(character.position, {
                x: positionTo,
                duration: this._walkTime,
                delay: reactionTime,
                ease: 'none',
                onComplete: () => {
                    character.alpha = 0;
                },
                onStart: () => {
                    if (!isCorrect) {
                        character.scale.x *= -1;
                    }
                    if (finishAnimation === 'negative') {
                        finishAnimation = 'angry';
                    }
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

    private _showButtons(): void {
        const appearButtonsDelay = this._gameButtons.length * 0.2;
        if (this._clientIndex > 0) {
            this._tutorialTimer = gsap.delayedCall(this._tutorialTimerSeconds, () => {
                this._tutorialTimer = null;
                this._tutorialHand.showTutorialObjects(this._gameButtons);
            });
        } else {
            this._tutorialTimer = gsap.delayedCall(appearButtonsDelay + 0.5, () => {
                this._tutorialTimer = null;
                this._tutorialHand.showTutorialObjects(this._gameButtons);
            });
        }
        this._gameButtons.forEach((button, index) => {
            gsap.delayedCall(index * 0.2, button.playShowAnimation.bind(button));
        });

        gsap.delayedCall(appearButtonsDelay, () => {
            this._gameButtons.forEach((button) => {
                button.eventMode = 'static';
            });
        });
    }

    private _hideButtons(): void {
        this._gameButtons.forEach((button) => {
            gsap.to(button, { alpha: 0, duration: 0.5 });
        });
    }

    private _deactivateButtons(): void {
        this._gameButtons.forEach((button) => {
            button.eventMode = 'none';
        });
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

        const buttonsConfig: ButtonsConfig = uiConfig.buttons_config;

        this._loveButton = new ScaledSpineButton(0, 0, buttonsConfig.love_button);
        this.addChild(this._loveButton);
        this._gameButtons.push(this._loveButton);

        this._vipButton = new ScaledSpineButton(0, 0, buttonsConfig.vip_button);
        this.addChild(this._vipButton);
        this._gameButtons.push(this._vipButton);

        this._singleButton = new ScaledSpineButton(0, 0, buttonsConfig.single_button);
        this.addChild(this._singleButton);
        this._gameButtons.push(this._singleButton);

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
        this._vipButton.scaler.resize(width, height);
        this._singleButton.scaler.resize(width, height);
        this._loveButton.scaler.resize(width, height);
        this._finalScreen.resize(width, height);
        this._tutorialHand.resize(width, height);
    }
}