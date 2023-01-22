import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, startWith } from 'rxjs/operators';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.css']
})
export class DepotVoitureComponent implements OnInit {
  cars$! : Observable<any>;
  cars ! : any[];
  success: boolean = false;
  error : boolean = false;

  constructor(private voitureService : VoitureService) { }

  ngOnInit(): void {
    this.cars$ = this.voitureService.filterDepositCarsByUser(0);
    this.cars$.subscribe(
      (response)=>{
        this.cars = response;
      }
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const car = event.previousContainer.data[event.previousIndex];
      const immatriculation = car.car.immatriculation;
      this.voitureService.depositCar(immatriculation).subscribe(
        (response)=>{
          this.voitureService.filterDepositCarsByUser(0).subscribe(
            (response)=>{
              this.cars = response;
            }
          );
          this.success = true;
        },
        (error)=>{
          console.error('request failed with error ');
          console.error(error);
          this.error = true;
        }
      );
    }
  }

}
