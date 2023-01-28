import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationDetailsService } from 'src/app/global/services/reparationDetails.service';
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
  reparationDetails$! : Observable<any>;
  errorMessage! : string;
  showModalDelete : boolean = false;

  reparationDetailsId! : string;

  constructor(private reparationService : ReparationService,
    private route : ActivatedRoute,
    private reparationDetService : ReparationDetailsService) { }

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
    this.showModal = !this.showModal;
    this.showModalDelete = false;
    this.reparationDetails$ = this.reparationDetService.getReparationDetailsById(detailsId);
  }
  onDelete(detailsId : string){
    this.showModal = false;
    this.showModalDelete = !this.showModalDelete;
    this.reparationDetails$ = this.reparationDetService.getReparationDetailsById(detailsId);
  }
  confirmDelete(detailsId: string){
    this.reparationDetService.deleteReparationDetails(detailsId).subscribe(
      (response) =>{ 
        // console.log("response received");
        this.reparation$ = this.reparationService.getReparationDetailsByReparationId(this.reparationId);
        this.showModalDelete = false;
      },
      (error)=>{
        // console.error('request failed with error');
        this.errorMessage = 'La suppression de la réparation a echoué';
      }
    );
  }
  onSubmitForm(form : NgForm):void{
    this.reparationDetService.updateReparationDetails(form.value).subscribe(
      (response) =>{ 
        // console.log("response received");
        this.reparation$ = this.reparationService.getReparationDetailsByReparationId(this.reparationId);
        this.showModal = false;
      },
      (error)=>{
        // console.error(error);
        this.errorMessage = 'La modification des informations a echoué';
      }
    );
  }

  

}
