import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
    

    constructor (private http : HttpClient){}
        

    getCarsByUser(): Observable<any>{
        // headers is already set in auth.interceptors
        return this.http.get<any>(`${apiUrl.key}/cars`);
    }
    getDepositCarsByUser(): Observable<any>{
        // headers is already set in auth.interceptors
        return this.http.get<any>(`${apiUrl.key}/cars/deposit`);
    }
    getCarByImmatriculation(imm : string): Observable<any>{
        const params = {
            "immatriculation": imm
        }
        return this.http.get<any>(`${apiUrl.key}/cars/search`,{params:params});
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
        return this.http.get<any>(`${apiUrl.key}/cars/search`,{params: params});
    }

    recoverCar(immatriculation : string): Observable<any>{
        return this.http.post<any>(`${apiUrl.key}/cars/recover/${immatriculation}`,null );
    }
    depositCar(immatriculation : string): Observable<any>{
        return this.http.post<any>(`${apiUrl.key}/cars/deposit/${immatriculation}`,null );
    }
    
    getRecoverableCars(): Observable<any>{
        return this.http.get<any>(`${apiUrl.key}/cars/recoverable`);
    }
    getAllCars(): Observable<any>{
        return this.http.get<any>(`${apiUrl.key}/cars/all`);
    }
    
    
    addCar (formValue:{immatriculation: string,marque:string, modele:string, image: File }): Observable<any>{
        var formData : any = new FormData();
        formData.append("immatriculation", formValue.immatriculation);
        formData.append("marque", formValue.marque);
        formData.append("modele", formValue.modele);
        formData.append("file", formValue.image);
        return this.http.post<any>(`${apiUrl.key}/cars/add`, formData );
    }
    updateCar (formValue:{immatriculation: string,marque:string, modele:string, image: File }, id): Observable<any>{
        var formData : any = new FormData();
        if (formValue.immatriculation!=null && formValue.immatriculation!=''){
            formData.append("immatriculation", formValue.immatriculation);
        }
        if (formValue.marque!=null && formValue.marque!=''){
            formData.append("marque", formValue.marque);
        }
        if (formValue.modele!=null && formValue.modele!=''){
            formData.append("modele", formValue.modele);
        }
        if (formValue.image!=null){
            formData.append("file", formValue.image);
        }
        
        return this.http.put<any>(`${apiUrl.key}/cars/${id}`, formData );
    }
}