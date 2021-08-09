import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'emoji-attach-view',
  templateUrl: './emoji-attach-view.component.html',
  styleUrls: [
    './emoji-attach-view.component.scss',
    './emoji-attach-view.color.scss',
  ],
})
export class EmojiAttachViewComponent implements OnInit {
  emojies: string[];
  #chatService: ChatService;
  #mainService: MainService;

  constructor(chatService: ChatService, mainService: MainService) {
    this.emojies = '😒 😊 😂 🤣 ❤ 😍 👌 😘 🤷‍♂️ 🤷‍♀️ 🤦‍♂️ 🤦‍♀️ 🙌 👍 😁 💕 ✌ 🤞 😉 😎 🎶 😢 💖 😜 🤳 🎂 🎉 🌹 💋 👏 ✔ 👀 😃 ✨ 😆 🤔 🤢 🎁'.split(
      ' '
    );
    this.#chatService = chatService;
    this.#mainService = mainService;
  }

  ngOnInit(): void {}

  sendEmoji(text: string): void {
    this.#mainService.chat(text);
    this.#chatService.toggleEmojiAttachView();
  }
}
