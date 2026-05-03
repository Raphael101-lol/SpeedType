import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getRandomText(mode: string = 'easy') {
    const skip = Math.floor(Math.random() * 80);
    return this.http.get<any>(`https://dummyjson.com/quotes?limit=20&skip=${skip}`);
  }

  saveScore(data: any) {
    return this.http.post('http://localhost:3000/api/scores', data);
  }

  getLeaderboard() {
    return this.http.get<any>('http://localhost:3000/api/scores');
  }

  deleteScore(id: string) {
    return this.http.delete(`http://localhost:3000/api/scores/${id}`);
  }
}