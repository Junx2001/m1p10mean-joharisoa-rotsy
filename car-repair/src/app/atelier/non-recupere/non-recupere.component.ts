import { Component, OnInit } from '@angular/core';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-non-recupere',
  templateUrl: './non-recupere.component.html',
  styleUrls: ['./non-recupere.component.css']
})
export class NonRecupereComponent implements OnInit {
  cars$ : Observable<any>;
  success: boolean = false;
  error : boolean = false;

  constructor(private reparationService : ReparationService) { }

  ngOnInit(): void {
    this.cars$ = this.reparationService.getRecuperableReparationsNotRecovered();
  }

}
