import { HttpClient, HttpParams } from '@angular/common/http';
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
        return this.http.get<any>(`${this.apiUrl}/reparations/findByCar/${imm}`);
    }
    getCarRepairInProcess(imm: string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/actual/${imm}`);
    }
    getAllReparationsWithDetails():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/details`);
    }
    getUnpaidReparationsByUser():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/unpaid`);
    }
    getNotAffectedReparations():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/notAffected`);
    }
    getRecuperableReparationsNotRecovered():Observable<any>{
        return this.getAffectedReparations(null).pipe(
            map(value=>value.filter(rep => rep.valide == 1))
        );
    }
   
    affectReparation(reparationId: string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/reparations/allocate/${reparationId}`,null);
    }
    validateReparation(reparationId: string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/reparations/validate/${reparationId}`,null);
    }
   
    getAffectedReparations(formValue:{immatriculation: string, marque: string, modele:string ,  client:string,dateDepot: string}): Observable<any>{
        let params = new HttpParams();
        if (formValue != null){
            if (formValue.immatriculation != null) {
                params = params.set('immatriculation', formValue.immatriculation);
            }
            if (formValue.marque != null) {
                params = params.set('marque', formValue.marque);
            }
            if (formValue.modele != null) {
                params = params.set('modele', formValue.modele);
            }
            if (formValue.client != null) {
                params = params.set('client', formValue.client);
            }
            if (formValue.dateDepot != null) {
                console.log(formValue.dateDepot);
                
                params = params.set('dateDepot', formValue.dateDepot);
            }
        }
        
        return this.http.get<any>(`${this.apiUrl}/reparations/affected`,{params: params});
    }
    getReparationDetailsByReparationId(reparationId: string): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/${reparationId}`);
    }
    getReparationsDetailsByUser():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations`);
    }

    getUnpaidReparationsById(reparationId: string):Observable<any>{
        return this.getUnpaidReparationsByUser().pipe(
            map(value=>value.arrayFinal.filter(rep => rep.repair._id === reparationId))
        );
    }
}