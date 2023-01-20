import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'src/app/global/services/voiture.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recuperation-voiture',
  templateUrl: './recuperation-voiture.component.html',
  styleUrls: ['./recuperation-voiture.component.css']
})
export class RecuperationVoitureComponent implements OnInit {
  cars : any[];
  constructor(private voitureService : VoitureService) { }

  ngOnInit(): void {
    this.voitureService.getRecoverableCars().subscribe(
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
      const immatriculation = car.immatriculation;
      this.voitureService.recoverCar(immatriculation).subscribe(
        (response)=>{
          this.voitureService.getRecoverableCars().subscribe(
            (response)=>{
              this.cars = response;
            }
          )
        }
      );
    }
  }

}
