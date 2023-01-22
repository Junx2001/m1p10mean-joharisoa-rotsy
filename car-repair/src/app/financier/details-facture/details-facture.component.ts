import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.css']
})
export class DetailsFactureComponent implements OnInit {
  reparation$ : Observable<any>;
  constructor(private route: ActivatedRoute,
    private reparationService : ReparationService) { }

  ngOnInit(): void {
    const reparationId = this.route.snapshot.params['reparationId'];
    this.reparation$ = this.reparationService.getUnpaidReparationsById(reparationId);
    this.reparation$.subscribe(v=>console.log(v));
    
  }

}
