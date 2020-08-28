import { OnLoadCallback } from '../loader/AsyncLoader';
import { MutableStream } from './MutableStream';
import { Stream } from './Stream';
import { StreamListLoader } from './StreamListLoader';

export class MockStreamListLoader implements StreamListLoader {
  public load(callback: OnLoadCallback<Stream[]>): void {
    const streams: Stream[] = [];

    const shiguruna = new MutableStream();
    shiguruna.setIcon('https://i.imgur.com/tXiHAIc.gif');
    shiguruna.setThumbnail('https://i.imgur.com/5ndSAT7.jpg');
    shiguruna.setTitle('시구르나');
    shiguruna.setKeyId('tjdwhd613');
    shiguruna.setUrl('http://mycast.xyz/home/stream/local/9');
    shiguruna.setViewer(1);
    streams.push(shiguruna);

    const megumin = new MutableStream();
    megumin.setIcon('https://i.imgur.com/KUbNw6O.gif');
    megumin.setThumbnail('https://i.imgur.com/5hgzZcl.gif');
    megumin.setOnAir(true);
    megumin.setKeyId('gksmf1677');
    megumin.setTitle('ᎷᏋᎶᏬᎷᎥᏁ');
    megumin.setDescription('ᎷᏋᎶᏬᎷᎥᏁ의 방송 [공용채널]');
    megumin.setViewer(5);
    streams.push(megumin);

    const hojinLee = new MutableStream();
    hojinLee.setKeyId('eruhoon');
    hojinLee.setIcon('http://stimg.afreeca.com/LOGO/ho/horidda/horidda.jpg');
    streams.push(hojinLee);

    callback(streams);
  }
}
