import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Voiture } from '../models/voiture.model';
import { ReparationService } from './reparation.service';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
    voitures : Voiture[] = [
        {
            clientId: 2,
            id: 1,
            immatriculation: "TAB1254",
            marque: "Hyundai",
            modele: "Starex"
        },
        {
            clientId: 2,
            id: 2,
            immatriculation: "4567TVE",​​
            marque: "Hyundai",​​
            modele: "Santa Fe"
        },
        {
            clientId: 2,
            id: 3,
            immatriculation: "TAL1115",​​
            marque: "Toyota",​​
            modele: "Corolla"
        }
    ];
    private apiUrl = 'http://localhost:3000';

    constructor (private reparationService : ReparationService,
        private http : HttpClient){}
        

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
    
    searchCar(formValue:{immatriculation: string, marque: string, modele:string , depot: Date}): Observable<any>{
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
            params = params.set('dateDepot', formValue.depot.toISOString());
        }
        return this.http.get<any>(`${this.apiUrl}/cars/search`,{params: params});
    }

    recoverCar(immatriculation : string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/cars/recover/${immatriculation}`,null );
    }
    depositCar(immatriculation : string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/cars/deposit/${immatriculation}`,null );
    }
    getVoitures(): Voiture[] {
        return this.voitures;
    }
    getVoituresDepot(): Voiture[] {
        return this.voitures;
    }
    
    depotVoiture(formValue:{id : number,immatriculation: string, clientId: number,marque:string, modele:string }): Voiture{
        this.voitures.push(formValue);
        // insert into reparation
        this.reparationService.addVoitureReparation(formValue);
        return formValue;
    }
    getVoitureByImmatriculation(immatriculation : string): Voiture{
        return this.voitures.find(voiture => voiture.immatriculation === immatriculation);
    }
    searchVoiture(formValue:{immatriculation: string, marque: string, modele:string , depot: Date}): Voiture[]{
        return this.voitures.filter(car =>  car.marque.toLowerCase() === formValue.marque.toLowerCase());
    }
}