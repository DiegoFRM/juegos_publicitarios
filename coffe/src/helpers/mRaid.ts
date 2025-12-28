
interface MRAID {
    getState(): 'loading' | 'default' | 'expanded' | 'hidden';
    addEventListener(event: 'ready', listener: () => void): void;
    openStoreUrl?(): void;
    open(url: string): void;
}

declare global {
    interface Window {
        mraid?: MRAID;
    }
}

export default class mRaid {
    private _mRaidReady: boolean = false;

    constructor() {
        if (window.mraid) {
            if (window.mraid.getState() === 'loading') {
                window.mraid.addEventListener('ready', this._onMRaidReady.bind(this));
            } else {
                this._onMRaidReady();
            }
        } else {
            console.warn('mraid is not available.');
        }
    }

    public get mraid(): MRAID | undefined {
        return window.mraid;
    }

    public get isAvailable(): boolean {
        return !!window.mraid;
    }

    private _onMRaidReady(): void {
        this._mRaidReady = true;
    }

    public get mRaidReady(): boolean {
        return this._mRaidReady;
    }
}