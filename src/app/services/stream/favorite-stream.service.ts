import { Injectable } from '@angular/core';
import { FavoriteStream } from 'src/app/models/stream/favorite/FavoriteStream';
import { LocalStorage } from 'src/app/models/storage/LocalStorage';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStreamService {

  private mFavorites: FavoriteStream[];

  public constructor() {
    this.mFavorites = [];
    this.loadFavorites();
  }

  public getFavorites(): FavoriteStream[] {
    return this.mFavorites;
  }

  public isFavorite(platform: string, keyId: string): boolean {
    return this.mFavorites.some(favorite =>
      favorite.getPlatform() === platform && favorite.getKeyId() === keyId);
  }

  public addFavorite(platform: string, keyId: string): void {
    if (this.isFavorite(platform, keyId)) {
      console.warn('duplicated favorite');
      return;
    }
    const newFavorite = new FavoriteStream(platform, keyId);
    this.mFavorites.push(newFavorite);
    this.saveFavorites();
  }

  public removeFavorite(platform: string, keyId: string): void {
    this.mFavorites = this.mFavorites.filter(favorite =>
      favorite.getPlatform() !== platform || favorite.getKeyId() !== keyId);
    this.saveFavorites();
  }

  private loadFavorites() {
    const raw = LocalStorage.getInstance().getFavorites();
    const favorites: FavoriteStream[] = [];
    raw.split('|').forEach(opt => {
      const favorite = FavoriteStream.fromOption(opt);
      if (favorite !== null) {
        favorites.push(favorite);
      }
    });
    this.mFavorites = favorites;
  }

  private saveFavorites() {
    const favoritesString = this.mFavorites.map(f => f.toOption()).join('|');
    LocalStorage.getInstance().setFavorites(favoritesString);
  }
}
