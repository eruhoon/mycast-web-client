import { Md5 } from 'ts-md5/dist/md5';

import { NotificationChannelHash } from './NotificationChannel';
import { VegaNotification } from './VegaNotification';

export class MutableNotification implements VegaNotification {
  private mHash: string;
  private mIcon: string;
  private mTitle: string;
  private mBody: string;
  private mTimeStamp: number;
  private mRead: boolean;
  private mMute: boolean;
  private mChannel: NotificationChannelHash;

  public constructor() {
    this.mHash = MutableNotification.generateHash();
    this.mIcon = '';
    this.mTitle = '';
    this.mBody = '';
    this.mTimeStamp = new Date().getTime();
    this.mRead = false;
    this.mMute = false;
    this.mChannel = NotificationChannelHash.DEFAULT;
  }

  public setHash(hash: string): void {
    this.mHash = hash;
  }

  public getHash(): string {
    return this.mHash;
  }

  public setIcon(icon: string): void {
    this.mIcon = icon;
  }

  public getIcon(): string {
    return this.mIcon;
  }

  public setTitle(title: string): void {
    this.mTitle = title;
  }

  public getTitle(): string {
    return this.mTitle;
  }

  public setBody(body: string): void {
    this.mBody = body;
  }

  public getBody(): string {
    return this.mBody;
  }

  public setTimeStamp(timeStamp: number): void {
    this.mTimeStamp = timeStamp;
  }

  public getTimeStamp(): number {
    return this.mTimeStamp;
  }

  public isRead(): boolean {
    return this.mRead;
  }

  public setRead(read: boolean): void {
    this.mRead = read;
  }

  public read(): void {
    this.mRead = true;
  }

  public isMute(): boolean {
    return this.mMute;
  }

  public setMute(mute: boolean): void {
    this.mMute = mute;
  }

  public getChannel(): NotificationChannelHash {
    return this.mChannel;
  }

  public setChannel(channel: NotificationChannelHash): void {
    this.mChannel = channel;
  }

  public static clone(notification: VegaNotification): MutableNotification {
    const newNotification = new MutableNotification();
    newNotification.setHash(notification.getHash());
    newNotification.setIcon(notification.getIcon());
    newNotification.setTitle(notification.getTitle());
    newNotification.setBody(notification.getBody());
    newNotification.setTimeStamp(notification.getTimeStamp());
    newNotification.setRead(notification.isRead());
    newNotification.setMute(notification.isMute());
    newNotification.setChannel(notification.getChannel());
    return newNotification;
  }

  private static generateHash(): string {
    const key = `vega-noti-${new Date().getTime()}`;
    return Md5.hashStr(key).toString();
  }
}
