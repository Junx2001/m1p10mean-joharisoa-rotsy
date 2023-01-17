import { Injectable } from '@angular/core';
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
            immatriculation: "TBG1325",​​
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
    constructor (private reparationService : ReparationService){}
    
    getVoitures(): Voiture[] {
        return this.voitures;
    }
    getVoituresDepot(): Voiture[] {
        return this.voitures;
    }
    addCar (formValue:{id : number,immatriculation: string, clientId: number,marque:string, modele:string }): void{
        this.voitures.push(formValue);
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