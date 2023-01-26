import { Component, OnInit } from '@angular/core';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  cars : any[];
  success: boolean = false;
  error : boolean = false;

  constructor(private reparationService : ReparationService) { }

  ngOnInit(): void {
    this.reparationService.getNotAffectedReparations().subscribe(
      (response)=>{
        console.log(response);
        
        this.cars = response;
      }
    );
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const reparation = event.previousContainer.data[event.previousIndex];
      this.reparationService.affectReparation(reparation.repair._id).subscribe(
        (response)=>{
          this.reparationService.getNotAffectedReparations().subscribe(
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
