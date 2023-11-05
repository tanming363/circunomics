import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private dateSubject = new BehaviorSubject<string>('');
  public ratingSubject$ = new BehaviorSubject<number>(0);

  date$ = this.dateSubject.asObservable();

  updateDate(newDate: string) {
    this.dateSubject.next(newDate);
  }
}
