import { Injectable } from '@angular/core';
import { MoodleModel } from '@models/core/moodle.model';

@Injectable({
  providedIn: 'root'
})
export class MoodleService {

  constructor() { }

  get category(): MoodleModel{
    return JSON.parse(String(sessionStorage.getItem('category')));
  }

  set category(value: MoodleModel) {
    sessionStorage.setItem('category', JSON.stringify(value));
  }

  get categories(): MoodleModel[] {
    return JSON.parse(String(sessionStorage.getItem('categories')));
  }

  set categories(value: MoodleModel[]) {
    sessionStorage.setItem('categories', JSON.stringify(value));
  }
}
