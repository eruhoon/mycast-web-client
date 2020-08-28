import { Component, OnInit } from '@angular/core';
import { ChatCommand } from 'src/app/models/network/ChatCommand';
import { MainService } from 'src/app/services/main/main.service';
import { ChatListService } from '../chat-list/chat-list.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'emoji-attach-view',
  templateUrl: './emoji-attach-view.component.html',
  styleUrls: [
    './emoji-attach-view.component.scss',
    './emoji-attach-view.color.scss',
  ],
})
export class EmojiAttachViewComponent implements OnInit {
  public emojies: string[];
  private mChatCommand: ChatCommand;

  public constructor(
    private mChatSrv: ChatService,
    mainSrv: MainService,
    chatListSrv: ChatListService
  ) {
    this.emojies = '😒 😊 😂 🤣 ❤ 😍 👌 😘 🤷‍♂️ 🤷‍♀️ 🤦‍♂️ 🤦‍♀️ 🙌 👍 😁 💕 ✌ 🤞 😉 😎 🎶 😢 💖 😜 🤳 🎂 🎉 🌹 💋 👏 ✔ 👀 😃 ✨ 😆 🤔 🤢 🎁'.split(
      ' '
    );
    this.mChatCommand = new ChatCommand(chatListSrv, mainSrv.getChatNework());
  }

  public ngOnInit(): void {}

  public sendEmoji(text: string): void {
    this.mChatCommand.execute(text);
    this.mChatSrv.toggleEmojiAttachView();
  }
}
