import '@esotericsoftware/spine-pixi-v8';
// Images
import progressBar from '../assets/sprites/progress_bar.png?url';
import progressBarFill from '../assets/sprites/progress_bar_fill.png?url';
import background from '../assets/sprites/background.webp?url';
import table1 from '../assets/sprites/table1.webp?url';
import downloadButton from '../assets/sprites/download_button.png?url';
import globe from '../assets/sprites/globe.png?url';
import hand from '../assets/sprites/hand.png?url';
import logo from '../assets/sprites/logo.webp?url';
import playButton from '../assets/sprites/play_button.png?url';

import hbBottom from '../assets/sprites/hb_bottom.png?url';
import hbTop from '../assets/sprites/hb_top.png?url';
import lettuce from '../assets/sprites/lettuce.png?url';
import meat from '../assets/sprites/meat.png?url';
import chesse from '../assets/sprites/chesse.png?url';

// Spines
import chefSkeleton from '../assets/spineAnimations/grandpa/skeleton.json?url';
import chefAtlas from '../assets/spineAnimations/grandpa/1/skeleton.atlas?url';
import chefTexture from '../assets/spineAnimations/grandpa/1/skeleton.png?url';

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

import schoolGirlSkeleton from '../assets/spineAnimations/SchoolGirl/European.skel?url';
import schoolGirlAtlas from '../assets/spineAnimations/SchoolGirl/European.atlas?url';
import schoolGirlTexture from '../assets/spineAnimations/SchoolGirl/European.png?url';

import waiterSkeleton from '../assets/spineAnimations/MrWolf/mr_wolf.skel?url';
import waiterAtlas from '../assets/spineAnimations/MrWolf/Mr_Wolf_playable.atlas?url';
import waiterTexture from '../assets/spineAnimations/MrWolf/Mr_Wolf_playable.png?url';

import businessManSkel from '../assets/spineAnimations/BusinessMan/Afro.skel?url';
import businessManAtlas from '../assets/spineAnimations/BusinessMan/Afro.atlas?url';
import businessManTexture from '../assets/spineAnimations/BusinessMan/Afro.png?url';

import businessWomanSkeleton from '../assets/spineAnimations/BusinessWoman/European.skel?url';
import businessWomanAtlas from '../assets/spineAnimations/BusinessWoman/European.atlas?url';
import businessWomanTexture from '../assets/spineAnimations/BusinessWoman/European.png?url';

import naomiSkeleton from '../assets/spineAnimations/Naomi/Naomi.skel?url';
import naomiAtlas from '../assets/spineAnimations/Naomi/Naomi.atlas?url';
import naomiTexture from '../assets/spineAnimations/Naomi/Naomi.png?url';

import uiSkeleton from '../assets/spineAnimations/UI/ui_spine.skel?url';
import uiAtlas from '../assets/spineAnimations/UI/ui_spine.atlas?url';
import uiTexture from '../assets/spineAnimations/UI/ui_spine.png?url';

import {AssetsManifest, Assets} from 'pixi.js';

export default class AssetsInlineHelper {
    private _manifest!: AssetsManifest;

    constructor(){
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
                            alias: 'table1',
                            src: table1
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
                        }
                    ]
                }
            ]
        }
    }

    

    public get manifest() : AssetsManifest {
        return this._manifest;
    }

    public async loadSpineAssets(): Promise<void> {

        //console.log("Loading spine assets...");
        await this._loadSpineAssets("chef","skeleton.png",chefAtlas,chefTexture,chefSkeleton,undefined)
        await this._loadSpineAssets("prettyWoman","Latina.png",prettyWomanAtlas,prettyWomanTexture,prettyWoman,undefined)
        await this._loadSpineAssets("yogaGirl","Afro.png",yogaGirlAtlas,yogaGirlTexture,yogaGirl,undefined)
        await this._loadSpineAssets("geek","European.png",geekAtlas,geekTexture,geek,undefined)
        await this._loadSpineAssets("afroMan","Afro.png",afroManAtlas,afroManTexture,afroMan,undefined)


        await this._loadSpineAssets("schoolgirl", "European.png", schoolGirlAtlas, schoolGirlTexture, undefined, schoolGirlSkeleton);
        await this._loadSpineAssets("waiter", "Mr_Wolf_playable.png", waiterAtlas, waiterTexture, undefined, waiterSkeleton);
        await this._loadSpineAssets("businessman", "Afro.png", businessManAtlas, businessManTexture, undefined, businessManSkel);
        await this._loadSpineAssets("businesswoman", "European.png", businessWomanAtlas, businessWomanTexture, undefined, businessWomanSkeleton);
        await this._loadSpineAssets("naomi", "Naomi.png", naomiAtlas, naomiTexture, undefined, naomiSkeleton);
        await this._loadSpineAssets("ui", "ui_spine.png", uiAtlas, uiTexture, undefined, uiSkeleton);
        //console.log("Spine assets loaded successfully");

    }

    private async _loadSpineAssets(alias: string, imageName: string,  atlas: Base64URLString, png: Base64URLString, json?: Base64URLString, 
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