import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private reparationService : ReparationService) { }

  ngOnInit(): void {
    this.unpaidReparations$ = this.reparationService.getAllUnpaidReparations();
  }

}
