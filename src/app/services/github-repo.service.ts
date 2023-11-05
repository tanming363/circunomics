import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GithubRepoService {
  baseUrl = environment.URL;

  constructor(private http: HttpClient) {}

  getLastMonth() {
    const date = new Date();

    const lastMonthYear = date.getFullYear();
    const lastMonthMonth = date.getMonth();
    const lastMonthDay = date.getDate();

    const lastMonthDate = `${lastMonthYear}-${
      lastMonthMonth < 10 ? '0' : ''
    }${lastMonthMonth}-${lastMonthDay < 10 ? '0' : ''}${lastMonthDay}`;

    return lastMonthDate;
  }

  getGitHubData(startDate: string, page: number): Observable<any[]> {
    const url = `${this.baseUrl}?q=created:>${
      startDate ? startDate : this.getLastMonth()
    }&sort=stars&order=desc&page=${page}`;
    return this.http.get<any[]>(url).pipe(
      retry(3),
      map((data: any) => data.items)
    );
  }

  getGitHubUser(id: any): Observable<any> {
    return this.http.get<any>(`https://api.github.com/users/${id}`);
  }
}