import { Component, Injector, OnInit } from '@angular/core';

import { ChatPack } from '../ChatPack';

@Component({
  selector: 'text-pack',
  templateUrl: './text-pack.component.html',
  styleUrls: ['./text-pack.component.scss']
})
export class TextPackComponent extends ChatPack implements OnInit {

  public text: string;
  public mEmoji: boolean;

  public constructor(injector: Injector) {
    super(injector);
    this.text = '';
    this.mEmoji = false;
  }

  public ngOnInit(): void {
    const text = this.message.getMessage();
    this.text = text;
    this.mEmoji = TextPackComponent.isEmoji(text);
  }

  public isEmoji(): boolean {
    return this.mEmoji;
  }

  private static isEmoji(text: string): boolean {
    const regex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;
    return regex.test(text) && this.fancyCount(text) === 1;
  }

  private static fancyCount(text: string): number {
    const joiner = '\u{200D}';
    const split = text.split(joiner);
    let count = 0;

    for (const s of split) {
      const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join('')).length;
      count += num;
    }
    return count / split.length;
  }
}
