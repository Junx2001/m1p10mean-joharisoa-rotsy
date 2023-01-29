import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';

@Component({
  selector: 'app-factures-non-payees',
  templateUrl: './factures-non-payees.component.html',
  styleUrls: ['./factures-non-payees.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacturesNonPayeesComponent implements OnInit {
  unpaidReparations$! : Observable<any>;
  page : number = 1;
  paye : boolean = false;

  constructor(private reparationService : ReparationService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params){
      this.paye = this.route.snapshot.params['paye'];
      setTimeout( () => {
        this.paye = !this.route.snapshot.params['paye'];
      }, 5000);
      
    }
    
    this.unpaidReparations$ = this.reparationService.getAllUnpaidReparations();
  }

}
