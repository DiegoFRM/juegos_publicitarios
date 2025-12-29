export { SpineButtonConfig, ButtonsConfig, CharacterConfig, ClientConfig, GameCharactersConfig, BackgroundConfig };
type SpineButtonConfig = {
    tag: string;
    skeleton: string;
    atlas: string;
    showAnimationName: string;
    tapAnimationName: string;
    portraitPosition: { x: number; y: number; };
    landscapePosition: { x: number; y: number; };
    portraitSize: { width: number; height: number; };
    landscapeSize: { width: number; height: number; };
    buttonSize: { width: number; height: number; };
}

type ButtonsConfig = {
    [key: string]: SpineButtonConfig;
}

type CharacterConfig = {
    name: string;
    skeleton: string;
    atlas: string;
    skin: string;
    scale: number;
}

type ClientConfig = {
    correctOption: string;
    characters: CharacterConfig[];
    reactions: {[key: string]: string;};
}

type GameCharactersConfig = {
    clients: ClientConfig[];
    chef: CharacterConfig;
    clientsPosition:{
        y: number;
        offset: {x:number, y:number};
        middle: number;
    }, 
    walkTime: {
        portrait: number;
        landscape: number;
    }
}

type BackgroundConfig = {
    scale: {
        portrait: number;
        landscape: number;
    }
}