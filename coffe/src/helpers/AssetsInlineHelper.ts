import '@esotericsoftware/spine-pixi-v8';
// Images
import progressBar from '../assets/sprites/progress_bar.png?url';
import progressBarFill from '../assets/sprites/progress_bar_fill.png?url';
import background from '../assets/sprites/background.webp?url';
import downloadButton from '../assets/sprites/download_button.png?url';
import globe from '../assets/sprites/globe.webp?url';
import hand from '../assets/sprites/hand.png?url';
import logo from '../assets/sprites/logo.webp?url';
import playButton from '../assets/sprites/play_button.png?url';

import hbBottom from '../assets/sprites/hb_bottom.png?url';
import hbTop from '../assets/sprites/hb_top.png?url';
import lettuce from '../assets/sprites/lettuce.png?url';
import meat from '../assets/sprites/meat.png?url';
import chesse from '../assets/sprites/chesse.png?url';
import tray from '../assets/sprites/tray.png?url';
import button1 from '../assets/sprites/button1.webp?url';
import button2 from '../assets/sprites/button2.webp?url';
import button3 from '../assets/sprites/button3.webp?url';

//IMAGES
import conveyor_0 from '../assets/sprites/conveyor_red/ConveyorRed_00000.png?url'
import conveyor_1 from '../assets/sprites/conveyor_red/ConveyorRed_00001.png?url'
import conveyor_2 from '../assets/sprites/conveyor_red/ConveyorRed_00002.png?url'
import conveyor_3 from '../assets/sprites/conveyor_red/ConveyorRed_00003.png?url'
import conveyor_4 from '../assets/sprites/conveyor_red/ConveyorRed_00004.png?url'
import conveyor_5 from '../assets/sprites/conveyor_red/ConveyorRed_00005.png?url'
import conveyor_6 from '../assets/sprites/conveyor_red/ConveyorRed_00006.png?url'
import conveyor_7 from '../assets/sprites/conveyor_red/ConveyorRed_00007.png?url'
import conveyor_8 from '../assets/sprites/conveyor_red/ConveyorRed_00008.png?url'
import conveyor_9 from '../assets/sprites/conveyor_red/ConveyorRed_00009.png?url'
import conveyor_10 from '../assets/sprites/conveyor_red/ConveyorRed_00010.png?url'
import conveyor_11 from '../assets/sprites/conveyor_red/ConveyorRed_00011.png?url'
import conveyor_12 from '../assets/sprites/conveyor_red/ConveyorRed_00012.png?url'
import conveyor_13 from '../assets/sprites/conveyor_red/ConveyorRed_00013.png?url'
import conveyor_14 from '../assets/sprites/conveyor_red/ConveyorRed_00014.png?url'

//upgrade
import conveyorUpgrade_0 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00450.png?url'
import conveyorUpgrade_1 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00451.png?url'
import conveyorUpgrade_2 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00452.png?url'
import conveyorUpgrade_3 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00453.png?url'
import conveyorUpgrade_4 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00454.png?url'
import conveyorUpgrade_5 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00455.png?url'
import conveyorUpgrade_6 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00456.png?url'
import conveyorUpgrade_7 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00457.png?url'
import conveyorUpgrade_8 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00458.png?url'
import conveyorUpgrade_9 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00459.png?url'
import conveyorUpgrade_10 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00460.png?url'
import conveyorUpgrade_11 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00461.png?url'
import conveyorUpgrade_12 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00462.png?url'
import conveyorUpgrade_13 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00463.png?url'
import conveyorUpgrade_14 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00464.png?url'
import conveyorUpgrade_15 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00465.png?url'
import conveyorUpgrade_16 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00466.png?url'
import conveyorUpgrade_17 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00467.png?url'
import conveyorUpgrade_18 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00468.png?url'
import conveyorUpgrade_19 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00469.png?url'
import conveyorUpgrade_20 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00470.png?url'
import conveyorUpgrade_21 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00471.png?url'
import conveyorUpgrade_22 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00472.png?url'
import conveyorUpgrade_23 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00473.png?url'
import conveyorUpgrade_24 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00474.png?url'
import conveyorUpgrade_25 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00475.png?url'
import conveyorUpgrade_26 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00476.png?url'
import conveyorUpgrade_27 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00477.png?url'
import conveyorUpgrade_28 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00478.png?url'
import conveyorUpgrade_29 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00479.png?url'
import conveyorUpgrade_30 from '../assets/sprites/conveyor_upgrade/ConveyorUpgrade_00480.png?url'
// Spines
import chefSkeleton from '../assets/spineAnimations/grandpa/skeleton.json?url';
import chefAtlas from '../assets/spineAnimations/grandpa/skeleton.atlas?url';
import chefTexture from '../assets/spineAnimations/grandpa/skeleton.png?url';

import prettyWoman from '../assets/spineAnimations/PrettyWoman/latina.json?url';
import prettyWomanAtlas from '../assets/spineAnimations/PrettyWoman/latina.atlas?url';
import prettyWomanTexture from '../assets/spineAnimations/PrettyWoman/latina.png?url';

import yogaGirl from '../assets/spineAnimations/YogaGirl/Afro.json?url';
import yogaGirlAtlas from '../assets/spineAnimations/YogaGirl/Afro.atlas?url';
import yogaGirlTexture from '../assets/spineAnimations/YogaGirl/Afro.png?url';

import geek from '../assets/spineAnimations/Geek/European.json?url';
import geekAtlas from '../assets/spineAnimations/Geek/European.atlas?url';
import geekTexture from '../assets/spineAnimations/Geek/European.png?url';

import afroMan from '../assets/spineAnimations/AfroMan/Afro.json?url';
import afroManAtlas from '../assets/spineAnimations/AfroMan/Afro.atlas?url';
import afroManTexture from '../assets/spineAnimations/AfroMan/Afro.png?url';

import uiSkeleton from '../assets/spineAnimations/UI/ui_spine.skel?url';
import uiAtlas from '../assets/spineAnimations/UI/ui_spine.atlas?url';
import uiTexture from '../assets/spineAnimations/UI/ui_spine.png?url';

import { AssetsManifest, Assets } from 'pixi.js';

export default class AssetsInlineHelper {
    private _manifest!: AssetsManifest;

    constructor() {
        this._createManifest();
    }

    private _createManifest(): void {

        this._manifest = {
            bundles: [
                {
                    name: 'load-screen',
                    assets: [
                        {
                            alias: 'progress_bar',
                            src: progressBar,
                        },
                        {
                            alias: 'progress_bar_fill',
                            src: progressBarFill,
                        }
                    ]
                },
                {
                    name: 'game-screen',
                    assets: [
                        {
                            alias: 'background',
                            src: background,
                        },
                        {
                            alias: 'download_button',
                            src: downloadButton,
                        },
                        {
                            alias: 'globe',
                            src: globe,
                        },
                        {
                            alias: 'hand',
                            src: hand,
                        },
                        {
                            alias: 'logo',
                            src: logo,
                        },
                        {
                            alias: 'play_button',
                            src: playButton,
                        },
                        {
                            alias: 'hb_bottom',
                            src: hbBottom,
                        },
                        {
                            alias: 'hb_top',
                            src: hbTop,
                        },
                        {
                            alias: 'lettuce',
                            src: lettuce,
                        },
                        {
                            alias: 'meat',
                            src: meat,
                        },
                        {
                            alias: 'chesse',
                            src: chesse,
                        },
                        {
                            alias: 'tray',
                            src: tray,
                        },
                        {
                            alias: 'button1',
                            src: button1,
                        },
                        {
                            alias: 'button2',
                            src: button2,
                        },
                        {
                            alias: 'button3',
                            src: button3,
                        },
                        {
                            alias: 'conveyor_0',
                            src: conveyor_0
                        },
                        {
                            alias: 'conveyor_1',
                            src: conveyor_1
                        },
                        {
                            alias: 'conveyor_2',
                            src: conveyor_2
                        },
                        {
                            alias: 'conveyor_3',
                            src: conveyor_3
                        },
                        {
                            alias: 'conveyor_4',
                            src: conveyor_4
                        },
                        {
                            alias: 'conveyor_5',
                            src: conveyor_5
                        },
                        {
                            alias: 'conveyor_6',
                            src: conveyor_6
                        },
                        {
                            alias: 'conveyor_7',
                            src: conveyor_7
                        },
                        {
                            alias: 'conveyor_8',
                            src: conveyor_8
                        },
                        {
                            alias: 'conveyor_9',
                            src: conveyor_9
                        },
                        {
                            alias: 'conveyor_10',
                            src: conveyor_10
                        },
                        {
                            alias: 'conveyor_11',
                            src: conveyor_11
                        },
                        {
                            alias: 'conveyor_12',
                            src: conveyor_12
                        },
                        {
                            alias: 'conveyor_13',
                            src: conveyor_13
                        },
                        {
                            alias: 'conveyor_14',
                            src: conveyor_14
                        },
                        { alias: 'conveyorUpgrade_0', src: conveyorUpgrade_0 },
                        { alias: 'conveyorUpgrade_1', src: conveyorUpgrade_1 },
                        { alias: 'conveyorUpgrade_2', src: conveyorUpgrade_2 },
                        { alias: 'conveyorUpgrade_3', src: conveyorUpgrade_3 },
                        { alias: 'conveyorUpgrade_4', src: conveyorUpgrade_4 },
                        { alias: 'conveyorUpgrade_5', src: conveyorUpgrade_5 },
                        { alias: 'conveyorUpgrade_6', src: conveyorUpgrade_6 },
                        { alias: 'conveyorUpgrade_7', src: conveyorUpgrade_7 },
                        { alias: 'conveyorUpgrade_8', src: conveyorUpgrade_8 },
                        { alias: 'conveyorUpgrade_9', src: conveyorUpgrade_9 },
                        { alias: 'conveyorUpgrade_10', src: conveyorUpgrade_10 },
                        { alias: 'conveyorUpgrade_11', src: conveyorUpgrade_11 },
                        { alias: 'conveyorUpgrade_12', src: conveyorUpgrade_12 },
                        { alias: 'conveyorUpgrade_13', src: conveyorUpgrade_13 },
                        { alias: 'conveyorUpgrade_14', src: conveyorUpgrade_14 },
                        { alias: 'conveyorUpgrade_15', src: conveyorUpgrade_15 },
                        { alias: 'conveyorUpgrade_16', src: conveyorUpgrade_16 },
                        { alias: 'conveyorUpgrade_17', src: conveyorUpgrade_17 },
                        { alias: 'conveyorUpgrade_18', src: conveyorUpgrade_18 },
                        { alias: 'conveyorUpgrade_19', src: conveyorUpgrade_19 },
                        { alias: 'conveyorUpgrade_20', src: conveyorUpgrade_20 },
                        { alias: 'conveyorUpgrade_21', src: conveyorUpgrade_21 },
                        { alias: 'conveyorUpgrade_22', src: conveyorUpgrade_22 },
                        { alias: 'conveyorUpgrade_23', src: conveyorUpgrade_23 },
                        { alias: 'conveyorUpgrade_24', src: conveyorUpgrade_24 },
                        { alias: 'conveyorUpgrade_25', src: conveyorUpgrade_25 },
                        { alias: 'conveyorUpgrade_26', src: conveyorUpgrade_26 },
                        { alias: 'conveyorUpgrade_27', src: conveyorUpgrade_27 },
                        { alias: 'conveyorUpgrade_28', src: conveyorUpgrade_28 },
                        { alias: 'conveyorUpgrade_29', src: conveyorUpgrade_29 },
                        { alias: 'conveyorUpgrade_30', src: conveyorUpgrade_30 }
                    ]
                }
            ]
        }
    }



    public get manifest(): AssetsManifest {
        return this._manifest;
    }

    public async loadSpineAssets(): Promise<void> {

        //console.log("Loading spine assets...");
        await this._loadSpineAssets("chef", "skeleton.png", chefAtlas, chefTexture, chefSkeleton, undefined)
        await this._loadSpineAssets("prettyWoman", "Latina.png", prettyWomanAtlas, prettyWomanTexture, prettyWoman, undefined)
        await this._loadSpineAssets("yogaGirl", "Afro.png", yogaGirlAtlas, yogaGirlTexture, yogaGirl, undefined)
        await this._loadSpineAssets("geek", "European.png", geekAtlas, geekTexture, geek, undefined)
        await this._loadSpineAssets("afroMan", "Afro.png", afroManAtlas, afroManTexture, afroMan, undefined)
        await this._loadSpineAssets("ui", "ui_spine.png", uiAtlas, uiTexture, undefined, uiSkeleton);
        //console.log("Spine assets loaded successfully");

    }

    private async _loadSpineAssets(alias: string, imageName: string, atlas: Base64URLString, png: Base64URLString, json?: Base64URLString,
        skeleton?: Base64URLString): Promise<void> {

        //console.log("Loading spine asset: " + alias);
        const textureBase64 = await Assets.load({
            alias: alias + "_texture",
            parser: 'loadTextures',
            src: png,
        })

        Assets.add({
            alias: alias + "_atlas",
            parser: "spineTextureAtlasLoader",
            src: atlas,
            data: { images: { [imageName]: textureBase64.source } }
        })

        if (skeleton) {
            Assets.add({
                alias: alias + "_json",
                parser: "spineSkeletonLoader",
                src: skeleton,
            })
        } else {
            if (json) {
                Assets.add({
                    alias: alias + "_json",
                    parser: "loadJson",
                    src: json,
                })
            }
        }

        //console.log("loading spine asset: " + alias);
        await Assets.load([alias + "_json", alias + "_atlas"]);
    }
}