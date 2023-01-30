import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VoitureService } from 'src/app/global/services/voiture.service';

@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css']
})
export class AjoutVoitureComponent implements OnInit {
  depotForm! : FormGroup;
  successMessage :string; 
  errorMessage :string;
  imageURL! : string;
  file ! : File;
  message : boolean = false;
  errorFile! : string;

  constructor(private formBuilder : FormBuilder,
    private voitureService : VoitureService,
    private router : Router) { }

  ngOnInit(): void {
    this.depotForm = this.formBuilder.group({
      immatriculation : [null, Validators.required],
      marque :[null, Validators.required],
      modele : [null, Validators.required],
      image : [null]
    })
  }
  showPreview(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.message = false;
    this.successMessage = null; 
    this.errorMessage = null;
     // if size greater the 1MB
     if (this.file.size >= 1000000) {
      this.errorFile = "L'image importée doit être inférieur à 1MB.";
      this.message = true;
    } 

    var extension = this.file.type.split('/').pop();
    if (['jpg', 'jpeg'].indexOf(extension) <= -1) {
      this.errorFile = "L'image importée doit être en format 'jpeg' ou 'jpg'.";
      this.message = true;
    } 

    this.depotForm.patchValue({
      image: this.file
    });
    this.depotForm.get('image').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }

  onAddNewCar(){
    let countError = 0;
    if (this.depotForm.value.image != null){
      var extension = this.file.type.split('/').pop();
      if (['jpg', 'jpeg'].indexOf(extension) <= -1) {
        this.errorMessage = "L'image importée doit être en format 'jpeg' ou 'jpg'.";
        this.message = true;
        countError ++ ; 
      } 
      if (this.depotForm.value.image.size >= 1000000){
        const num = this.depotForm.value.image.size / 1000 / 1000;
        const mb = (Math.round(num * 100) / 100).toFixed(3);
        this.errorMessage = `Votre image est de ${mb} MB. L'image importée doit être inférieur à 1MB`;
        this.message = true;
        countError ++ ;
      }
    } 
    
    if (countError == 0 ){
      this.voitureService.addCar(this.depotForm.value).subscribe(
        (response) =>{ 
          // console.log("response received");
          this.successMessage = "La voiture a été ajouté à la collection.";
            this.message = true;
        },
        (error)=>{
          // console.error('request failed with error');
          this.errorMessage = error.message;
          if (error.status == 409){
            this.errorMessage = "Une voiture de même immatriculation existe déjà";
          }
         
            this.message = true;
        }
      )
    }
  }

}
