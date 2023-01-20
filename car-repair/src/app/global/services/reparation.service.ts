import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReparationService {
   
    private apiUrl = 'http://localhost:3000';

    constructor ( private http : HttpClient){}

    getCarReparationsByImmatriculation(imm : string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/${imm}`);
    }
    getCarRepairInProcess(imm: string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/actual/${imm}`);

    }
    getAllReparationsWithDetails():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/details`);
    }
    getDetailsByReparation(reparationId : string): Observable<any>{
        return this.getAllReparationsWithDetails().pipe(
            map(values=>values.arrayFinal.filter(object=>object.repair._id===reparationId))
        );
    }
    getUnpaidReparations():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/unpaid`);
    }

}