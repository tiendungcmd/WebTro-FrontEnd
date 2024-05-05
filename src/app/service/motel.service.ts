import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotelService {
  baseUrl = 'https://localhost:7202/api/';
  constructor(private http: HttpClient) { }

  getMotel() {
    return this.http.get<any>(this.baseUrl + 'motel');
  }
  postMotel(request: any) {
    const formData = new FormData();
    formData.append("name", request.name);
    formData.append('file', request.file, request.file.Name);
    formData.append('acreage', request.acreage);
    formData.append('address', request.address);
    formData.append('city', request.city);
    formData.append('deposit', request.deposit);
    formData.append('descriptions', request.descriptions);
    formData.append('numberBathRoom', request.numberBathRoom);
    formData.append('numberBedRoom', request.numberBedRoom);
    formData.append('status', request.status);
    formData.append('title', request.title);
    formData.append('price', request.price);
    formData.append('rate', request.rate);
    formData.append('userName', request.userName);
    formData.append('reason', request.reason);

    return this.http.post<any>(this.baseUrl + 'motel', formData);
  }

  upLoad(request: any) {
    const formData = new FormData();
    formData.append("Name", request.name);
    formData.append('file', request.File, request.File.Name);

    return this.http.post<any>(this.baseUrl + 'motel/upload', formData);
  }

  approve(id: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'motel/approve?id=' + id, "");
  }

  reject(motelReject: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'motel/reject', motelReject);
  }

  deleteMotel(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'motel?id=' + id);
  }

  getMotelById(id:any){
    return this.http.get<any>(this.baseUrl + 'motel/' + id);
  }

}
