import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';

@Component({
  selector: 'app-reparation-details',
  templateUrl: './reparation-details.component.html',
  styleUrls: ['./reparation-details.component.css']
})
export class ReparationDetailsComponent implements OnInit {
  reparations$! : Observable<any>;
  reparationId! : string;
  recup : boolean = false;

  constructor(private reparationService : ReparationService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.reparationId = this.route.snapshot.params['reparationId'];
    this.reparations$ = this.reparationService.getReparationDetailsByReparationId(this.reparationId);
  }

  onValidateReparation(){
    // this.reparationService.validateReparation(this.reparationId).subscribe(
    //   (response)=>{
        this.recup = true;
    //   }
    // );

  }

}
