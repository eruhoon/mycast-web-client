import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'emoji-attach-view',
    templateUrl: './emoji-attach-view.component.html',
    styleUrls: ['./emoji-attach-view.component.scss','./emoji-attach-view.color.scss'],
})
export class EmojiAttachViewComponent implements OnInit {

    public emojies: string[];

    public constructor() {
        this.emojies =
            '😒 😊 😂 🤣 ❤ 😍 👌 😘 🤷‍♂️ 🤷‍♀️ 🤦‍♂️ 🤦‍♀️ 🙌 👍 😁 💕 ✌ 🤞 😉 😎 🎶 😢 💖 😜 🐱‍🏍 🐱‍👤 🤳 🎂 🎉 🌹 💋 👏 🐱‍💻 🐱‍🐉 🐱‍👓 🐱‍🚀 ✔ 👀 😃 ✨ 😆 🤔 🤢 🎁'.split(' ');
    }

    public ngOnInit(): void { }

    public sendEmoji(text: string): void {

    }
}
