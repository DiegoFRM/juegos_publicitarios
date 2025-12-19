
type ButtonsConfig = {
    addButtons: AddButtonConfig[],
    categoryMenuConfig: CategoryMenuConfig,
    assetsMenusConfig: AssetMenuConfig[],
    dayButtonConfig: UIAssetConfig,
    downloadButtonConfig: UIAssetConfig,
}

type UIAssetConfig = {
    portraitPosition: {x: number, y: number},
    portraitSize: {x: number, y: number},
    landscapePosition: {x: number, y: number},
    landscapeSize: {x: number, y: number},
}

type AddButtonConfig = {
    uiAssetConfig: UIAssetConfig,
    objectPosition: {x: number, y: number, z: number},
    buttonTexture: string,
}

type CategoryMenuConfig = {
    categoryButtons: CategoryButtonConfig[],
    uiAssetConfig: UIAssetConfig,
    buttonsData: ButtonsData,
}

type ButtonsData = {
    buttonSpacing: number,
    buttonSize: {x: number, y: number},
}

type CategoryButtonConfig = {
    categoryName: string,
    font: string,
    fontSize: number,
    buttonTexture: string,
}

type AssetMenuConfig = {
    uiAssetConfig: UIAssetConfig,
    buttonsConfig: AssetButtonConfig[],
    buttonsData: ButtonsData,
    tag: string
}

type AssetButtonConfig = {
    textureName: string,
    modelData: ModelData,
}

type ModelData = {
    modelName: string,
    parentName?: string,
    animationName?: string,
    scale: number,
    soundName: string,
}

type WinParticle = {
    id:string,
    speed:number,
    frameId?:string,
    url?:string,
    type:string,
    numberOfParticles: number,
    numberOfFrames?: number,
    ignoreGravity?:boolean,
    frameRate?: number,
    scale:{
        portrait:{
            from:number,
            to:number
        },
        landscape:{
            from:number,
            to:number
        },
    }
    disappearSeconds:{
        min:number,
        max:number
    }
}

export { ButtonsConfig, UIAssetConfig, AddButtonConfig, CategoryMenuConfig, CategoryButtonConfig, AssetMenuConfig, AssetButtonConfig, ModelData, WinParticle };