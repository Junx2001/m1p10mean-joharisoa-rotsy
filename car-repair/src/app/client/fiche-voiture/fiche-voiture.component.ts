import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'src/app/global/services/voiture.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fiche-voiture',
  templateUrl: './fiche-voiture.component.html',
  styleUrls: ['./fiche-voiture.component.css']
})
export class FicheVoitureComponent implements OnInit {
  car! : Observable<any>;
  updateForm! : FormGroup;
  successMessage :string; 
  errorMessage :string;
  imageURL! : string;
  file ! : File;
  message : boolean = false;
  errorFile! : string;
  
  constructor(private route : ActivatedRoute,
    private voitureService : VoitureService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    
    this.updateForm = this.formBuilder.group({
      immatriculation : [null],
      marque : [null],
      modele : [null],
      image : [null],
    });

    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.voitureService.getCarByImmatriculation(immatriculation).subscribe(
      (response)=>{
        this.car = response;
        this.updateForm.patchValue({
          immatriculation : this.car[0].car.immatriculation,
          marque : this.car[0].car.marque,
          modele : this.car[0].car.modele,
        });
        this.imageURL = this.car[0].car.imageUrl;
      }
    );
  }

  showPreview(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.message = false;
    
    // if size greater the 1MB
    if (this.file.size >= 1000000) {
      this.errorFile = "L'image importée doit être inférieur à 1MB.";
      this.message = true;
    } 
    
    this.updateForm.patchValue({
      image: this.file
    });
    this.updateForm.get('image').updateValueAndValidity()
    var fileName = this.file['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onUpdateCar(){
    if (this.updateForm.value.image.size >= 1000000) {
      const num = this.updateForm.value.image.size / 1000 / 1000;
      const mb = (Math.round(num * 100) / 100).toFixed(3);
      this.errorMessage = `Votre image est de ${mb} MB. L'image importée doit être inférieur à 1MB`;
      this.message = true;
    } else{
      this.voitureService.uploadCarImage(this.updateForm.value, this.car[0].car._id).subscribe(
          (response) =>{ 
            console.log("response received");
            this.voitureService.getCarByImmatriculation(this.car[0].car.immatriculation).subscribe(
              (response)=>{
                this.car = response;
                this.updateForm.patchValue({
                  immatriculation : this.car[0].car.immatriculation,
                  marque : this.car[0].car.marque,
                  modele : this.car[0].car.modele,
                });
                this.imageURL = this.car[0].car.imageUrl;
              }
            );
            
            this.successMessage = "Les informations ont été modifiées avec succes";
            this.message = true;
          },
          (error)=>{
            console.error('request failed with error');
              this.errorMessage = error.message;
              this.message = true;
          }
        )
    }
    
    
  }

}
