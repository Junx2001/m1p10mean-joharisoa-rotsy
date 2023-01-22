import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReparationDetailsService {
   
    private apiUrl = 'https://m1p10mean-joharisoa-rotsyapi-production.up.railway.app';

    constructor ( private http : HttpClient){}

   
    addReparationDetails (formValue:{intitule: string,montant:string }, reparationId){
        const body = {
            "reparation":reparationId,
            "intitule": formValue.intitule,
            "montant": formValue.montant,
        }
        return this.http.post<any>(`${this.apiUrl}/reparationDetails/add`, body );
    }
    getReparationDetailsById(reparationDetId: string): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/reparationDetails/${reparationDetId}`);
    }
    updateReparationDetails(formValue:{id: string, intitule: string,avancement:number , dateFin: string, dateDebut: string, montant:number}){
        const body = {
            "intitule": formValue.intitule,
            "avancement": formValue.avancement,
            "montant": formValue.montant,
            "dateDebut": formValue.dateDebut,
            "dateFin": formValue.dateFin,
        }
        return this.http.put<any>(`${this.apiUrl}/reparationDetails/${formValue.id}`, body );
    }
    deleteReparationDetails(repDetId : string){
        return this.http.delete<any>(`${this.apiUrl}/reparationDetails/${repDetId}`, null );
    }

}