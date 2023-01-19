import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, startWith, tap } from 'rxjs/operators';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.css']
})
export class DepotVoitureComponent implements OnInit {
  cars$! : Observable<any>;
  constructor(private voitureService : VoitureService) { }

  ngOnInit(): void {
    this.cars$ = this.voitureService.filterDepositCarsByUser(0);
  }
  onDeposit(immatriculation:string){
    this.cars$ = this.voitureService.depositCar(immatriculation).pipe(
      startWith(''),
      concatMap(()=> {
        return this.voitureService.filterDepositCarsByUser(0); 
      })
    );
  }
}
