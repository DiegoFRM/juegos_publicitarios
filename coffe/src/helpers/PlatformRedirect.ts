import mRaid from './mRaid';

declare global {
    interface Window {
        FbPlayableAd?: { onCTAClick: () => void };
        ExitApi?: { exit: () => void };
        install?: () => void;
    }
}

export default class PlatformRedirect {
    private _ioslink: string;
    private _androidLink: string;
    private _defaultLink: string;
    private _mRaid: mRaid = new mRaid();

    constructor(ioslink: string, androidLink: string, defaultLink: string) {
        this._ioslink = ioslink;
        this._androidLink = androidLink;
        this._defaultLink = defaultLink;
    }

    private getPlatform(): "iOS" | "Android" | "Other" {
        const ua = navigator.userAgent || (window as any).opera;

        if (/iPad|iPhone|iPod/.test(ua)) {
            return "iOS";
        }

        if (/android/i.test(ua)) {
            return "Android";
        }

        return "Other";
    }

    private _getStoreLink(): string {
        const platform = this.getPlatform();
        if (platform === "iOS") {
            return this._ioslink;
        } else if (platform === "Android") {
            return this._androidLink;
        } else {
            return this._defaultLink;
        }
    }

    public redirect(): void {
        window.parent && window.parent.postMessage && window.parent.postMessage('download', '*');
        if (this._mRaid.isAvailable) {
            if (this._mRaid.mRaidReady) {
                console.log("Using mRaid to open store link.");
                if (this._mRaid.mraid?.openStoreUrl) {
                    this._mRaid.mraid.openStoreUrl();
                } else if (this._mRaid.mraid?.open) {
                    this._mRaid.mraid.open(this._getStoreLink());
                }
            } else {
                console.warn("mRaid is not ready yet.");
            }
        } else if (window.ExitApi) {
            console.log("Using ExitApi to exit.");
            window.ExitApi.exit();
        } else if(window.FbPlayableAd) {
            console.log("Using Facebook Playable Ad CTA.");
            window.FbPlayableAd.onCTAClick();
        }else if (window.install) {
            console.log("Using custom install function.");
            window.install();
        } else {
            console.warn("No ad platform detected, redirecting based on user agent.");
            //window.location.href = this._getStoreLink();
        }
    }
}