import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';

@Component({
  selector: 'app-reparation-details',
  templateUrl: './reparation-details.component.html',
  styleUrls: ['./reparation-details.component.css']
})
export class ReparationDetailsComponent implements OnInit {
  reparation$! : Observable<any>;
  reparationId! : string;
  recup : boolean = false;
  showModal = false;

  reparationDetailsId! : string;

  constructor(private reparationService : ReparationService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.reparationId = this.route.snapshot.params['reparationId'];
    this.reparation$ = this.reparationService.getReparationDetailsByReparationId(this.reparationId);
    this.reparation$.subscribe(
      response =>{
        if (response.repair.valide == 1 ){
          this.recup = true;
        }
      }
    );
  }
  onUpdate(detailsId : string){
    console.log(detailsId);
    this.showModal = !this.showModal;
    this.reparationDetailsId = detailsId;
  }
  onValidateReparation(){
    
    // this.reparationService.validateReparation(this.reparationId).subscribe(
    //   (response)=>{
        this.recup = true;
    //   }
    // );

  }

}
