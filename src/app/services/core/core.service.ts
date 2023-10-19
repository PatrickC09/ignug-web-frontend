import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaginatorModel, SelectCareerDto} from "@models/core";

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private _isLoading: boolean = false;
  private _isProcessing: boolean = false;

  constructor() {
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
}
