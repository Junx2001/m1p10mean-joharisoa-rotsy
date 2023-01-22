import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
    
    private apiUrl = 'https://m1p10mean-joharisoa-rotsyapi-production.up.railway.app';

    constructor (private http : HttpClient){}
        

    getCarsByUser(): Observable<any>{
        // headers is already set in auth.interceptors
        return this.http.get<any>(`${this.apiUrl}/cars`);
    }
    getDepositCarsByUser(): Observable<any>{
        // headers is already set in auth.interceptors
        return this.http.get<any>(`${this.apiUrl}/cars/deposit`);
    }
    getCarByImmatriculation(imm : string): Observable<any>{
        const params = {
            "immatriculation": imm
        }
        return this.http.get<any>(`${this.apiUrl}/cars/search`,{params:params});
    }
    getRecuperableCarsByUser(): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/cars/deposit`);
    }

    filterDepositCarsByUser(depot : number):Observable<any>{
        let retour : Observable<any>;
        if (depot==1){
        retour = this.getCarsByUser().pipe(
            map(cars => cars.filter(car => car.state === 'INSIDE GARAGE'))
        );
        }else if(depot == 0){
        retour = this.getCarsByUser().pipe(
            map(cars => cars.filter(car => car.state === 'OUT OF GARAGE'))
        );
        }else{
        retour = this.getCarsByUser();
        }
        return retour;
    }
    
    addCar (formValue:{immatriculation: string,marque:string, modele:string }): Observable<any>{
        const body = {
            "immatriculation": formValue.immatriculation,
            "marque": formValue.marque,
            "modele": formValue.modele
        }
        return this.http.post<any>(`${this.apiUrl}/cars/add`, body );
    }
    
    searchCar(formValue:{immatriculation: string, marque: string, modele:string , depot: string}): Observable<any>{
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
        if (formValue.depot != null) {
            params = params.set('dateDepot', formValue.depot);
        }
        return this.http.get<any>(`${this.apiUrl}/cars/search`,{params: params});
    }

    recoverCar(immatriculation : string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/cars/recover/${immatriculation}`,null );
    }
    depositCar(immatriculation : string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/cars/deposit/${immatriculation}`,null );
    }
    
    getRecoverableCars(): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/cars/recoverable`);
    }

    
}