import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrls: ['./liste-depot.component.css']
})
export class ListeDepotComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onListeReparations(){
    this.router.navigateByUrl('/client/liste-reparations')
  }

}
