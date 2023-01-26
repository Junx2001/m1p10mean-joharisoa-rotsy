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
  successMessage : boolean = false; 
  errorMessage : boolean = false;
  imageURL! : string;
  file ! : any;

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
    this.voitureService.addCar(this.depotForm.value).subscribe(
      (response) =>{ 
        console.log("response received");
        this.successMessage = true;
      },
      (error)=>{
        console.error('request failed with error');
        if (error.status === 409){
          this.errorMessage = true;
        }
      }
    )

    // console.log(this.depotForm.value);
    // this.fileUploadService.upload(this.file).subscribe(
    //   (event: any) => {
    //     if (typeof (event) === 'object') {

    //           // Short link via api response
    //           console.log(event.link);
 
    //       }
    //   }
    // )
    
  }
  onViewCars(){
    this.router.navigateByUrl('/liste-voitures-deposees');
  }

}
