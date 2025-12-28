import '@esotericsoftware/spine-pixi-v8';
import {AssetsManifest, Assets} from 'pixi.js';
export default class LoadAssets {

    public async loadManifest(manifest: AssetsManifest): Promise<void> {
        return new Promise((resolve, reject) => {
            Assets.init({manifest}).then(() => {
                resolve();
            }).catch((error) => {
                console.error('Error loading manifest:', error);
                reject(error);
            });
        });
    }

    public async loadBundle(bundleName: string, progressCallback?: (progress: number) => void): Promise<void> {
        return new Promise((resolve, reject) => {
            Assets.loadBundle(bundleName, progress => {
                progressCallback && progressCallback(progress);
            }).then(async () => {
                resolve();
            }).catch((error) => {
                console.error(`Error loading bundle:${bundleName}`, error);
                reject(error);
            });
        });
    }
}