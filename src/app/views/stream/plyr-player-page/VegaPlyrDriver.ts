import {
  PlyrDriver,
  PlyrDriverCreateParams,
  PlyrDriverDestroyParams,
  PlyrDriverUpdateSourceParams,
} from 'ngx-plyr';
import * as Plyr from 'plyr';

declare var flvjs: any;

export class VegaPlyrDriver implements PlyrDriver {
  private mUrl: string;

  public constructor(url: string) {
    this.mUrl = url;
  }

  create(params: PlyrDriverCreateParams) {
    if (flvjs.isSupported()) {
      const player = flvjs.createPlayer({
        enableWorker: false,
        lazyLoadMaxDuration: 3 * 60,
        type: 'flv',
        isLive: true,
        url: this.mUrl,
      });
      player.attachMediaElement(params.videoElement);
      player.load();
      player.play();
    }
    return new Plyr(params.videoElement, params.options);
  }

  updateSource(params: PlyrDriverUpdateSourceParams) {
    params.plyr.source = params.source;
  }

  destroy(params: PlyrDriverDestroyParams) {
    params.plyr.destroy();
  }
}
