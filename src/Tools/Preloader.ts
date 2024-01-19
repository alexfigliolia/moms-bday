import { Screen } from "State/Screen";
import BackgroundSmall from "Images/background-small.webp";
import BackgroundLarge from "Images/background-large.webp";

export class Preloader {
  public static initialize() {
    const loadFNs: Promise<any>[] = [];
    const loaded: HTMLImageElement[] = [];
    const imgs =
      Screen.getState().width >= 670 ? this.largeImages : this.smallImages;
    for (let i = 0; i < imgs.length; i++) {
      const img = new Image();
      loadFNs[i] = this.promisify(img);
      img.src = imgs[i];
      loaded[i] = img;
    }
    return Promise.all(loadFNs);
  }

  public static loadBackground() {
    const img = new Image();
    const loader = this.promisify(img);
    img.src = this.background;
    return loader;
  }

  private static promisify(image: HTMLImageElement) {
    return new Promise(resolve => {
      image.onload = resolve;
      image.onerror = resolve;
    });
  }

  private static get background() {
    return window.innerWidth >= 670 ? BackgroundLarge : BackgroundSmall;
  }

  private static readonly smallImages = [];

  private static readonly largeImages = [];
}
