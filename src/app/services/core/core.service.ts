import {Injectable} from '@angular/core';
import {PaginatorModel} from "@models/core";
import {CataloguesHttpService} from "@services/core";

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private _isLoading: boolean = false;
  private _isProcessing: boolean = false;

  constructor(private readonly cataloguesHttpService: CataloguesHttpService) {
  }

  updateSystem() {
    this.version = this.newVersion;
    location.reload();
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    setTimeout(() => {
      this._isLoading = value;
    }, 200);
  }

  get isProcessing(): boolean {
    return this._isProcessing;
  }

  set isProcessing(value: boolean) {
    if (this._isProcessing != value) {
      setTimeout(() => {
        this._isProcessing = value;
      }, 1);
    }
  }

  get paginator(): PaginatorModel {
    return {page: 0, limit: 10, totalItems: 0, firstItem: 1, lastPage: 1, lastItem: 1};
  }

  get serviceUnavailable() {
    return JSON.parse(String(sessionStorage.getItem('serviceUnavailable')));
  }

  set serviceUnavailable(value: any) {
    sessionStorage.setItem('serviceUnavailable', JSON.stringify(value));
  }

  get version() {
    return JSON.parse(String(localStorage.getItem('version')));
    // return JSON.parse(String(sessionStorage.getItem('version')));
  }

  set version(value: any) {
    localStorage.setItem('version', JSON.stringify(value));
    // sessionStorage.setItem('version', JSON.stringify(value));
  }

  get newVersion() {
    return JSON.parse(String(localStorage.getItem('newVersion')));
    // return JSON.parse(String(sessionStorage.getItem('newVersion')));
  }

  set newVersion(value: any) {
    localStorage.setItem('newVersion', JSON.stringify(value));
    // sessionStorage.setItem('newVersion', JSON.stringify(value));
  }
}
