import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/global/services/user.service';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.css']
})
export class DepotVoitureComponent implements OnInit {
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
  onSubmitDepotVoiture(){
    const values = this.depotForm.value;
    values['id']=3;
    const user=this.userService.getUserByToken(localStorage.getItem("token"));
    values['clientId'] = user.id;
    this.voitureService.depotVoiture(values);
  }
  onClickListeDepots(){
    this.router.navigateByUrl('/liste-voitures-deposees');
  }
}
