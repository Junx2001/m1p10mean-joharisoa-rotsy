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
        return this.http.get<any>(`${this.apiUrl}/reparations/${imm}`);
    }
    getCarRepairInProcess(imm: string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/actual/${imm}`);

    }
    getAllReparationsWithDetails():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/details`);
    }
    getUnpaidReparations():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/unpaid`);
    }
    getNotAffectedReparations():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparations/notAffected`);
    }
    searchNotAffectedReparations(formValue:{immatriculation: string, marque: string, modele:string ,  client:string,dateDepot: string}): Observable<any>{
        let params = new HttpParams();
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
            params = params.set('dateDepot', formValue.dateDepot);
        }
        return this.http.get<any>(`${this.apiUrl}/reparations/notAffected`,{params: params});
    }
    affectReparation(reparationId: string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/reparations/allocate/${reparationId}`,null);
    }
    addReparationDetails (formValue:{intitule: string,montant:string }, reparationId){
        const body = {
            "reparation":reparationId,
            "intitule": formValue.intitule,
            "montant": formValue.montant,
        }
        console.log(body);
        // return this.http.post<any>(`${this.apiUrl}/cars/add`, body );
    }

}