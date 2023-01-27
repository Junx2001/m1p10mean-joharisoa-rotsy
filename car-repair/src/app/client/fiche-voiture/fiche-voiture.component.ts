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
  file ! : any;
  message : boolean = false;
  

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
    this.updateForm.patchValue({
      image: this.file
    });
    this.updateForm.get('image').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.file)
  }

  onUpdateCar(){
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
