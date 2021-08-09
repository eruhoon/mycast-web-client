import { Md5 } from 'ts-md5';

import { Toast } from './Toast';

export abstract class BaseToast implements Toast {
  #hash: string;

  constructor() {
    this.#hash = BaseToast.generateHash();
  }

  getHash(): string {
    return this.#hash;
  }

  abstract getText(): string;

  private static generateHash(): string {
    const key = `vega-toast-${new Date().getTime()}`;
    return Md5.hashStr(key).toString();
  }
}
