import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/global/services/user.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css']
})
export class AjoutVoitureComponent implements OnInit {
  depotForm! : FormGroup;
  constructor(private formBuilder : FormBuilder,
    private voitureService : VoitureService,
    private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
    this.depotForm = this.formBuilder.group({
      immatriculation : [null, Validators.required],
      marque :[null, Validators.required],
      modele : [null, Validators.required],
    })
  }
  onAddNewCar(){
    const values = this.depotForm.value;
    values['id']=3;
    const user=this.userService.getUserByToken(localStorage.getItem("token"));
    values['clientId'] = user.id;
    this.voitureService.addCar(values);
  }
  onViewCars(){
    this.router.navigateByUrl('/liste-voitures-deposees');
  }

}
