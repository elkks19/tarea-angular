import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl: string = 'https://picsum.photos/v2/list'; 

  constructor(private http: HttpClient) { }

  getImages(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}`);
  }

  getImageDetails(id: string): Observable<any> {
    return this.http.get(`https://picsum.photos/id/${id}/info`);
  }
}
