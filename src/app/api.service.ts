import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getRandomText(mode: string) {
    const skip = Math.floor(Math.random() * 80);
    return this.http.get<any>(`https://dummyjson.com/quotes?limit=20&skip=${skip}`);
  }

  saveScore(data: any) {
    return this.http.post(`${this.apiUrl}/scores`, data);
  }

  getLeaderboard() {
    return this.http.get<any>(`${this.apiUrl}/scores`);
  }

  deleteScore(id: string) {
    return this.http.delete(`${this.apiUrl}/scores/${id}`);
  }
}