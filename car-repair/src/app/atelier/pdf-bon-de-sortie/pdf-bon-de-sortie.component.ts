import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReparationDetailsService } from 'src/app/global/services/reparationDetails.service';
import { ReparationService } from 'src/app/global/services/reparation.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserService } from 'src/app/global/services/user.service';
@Component({
  selector: 'app-pdf-bon-de-sortie',
  templateUrl: './pdf-bon-de-sortie.component.html',
  styleUrls: ['./pdf-bon-de-sortie.component.css']
})
export class PdfBonDeSortieComponent implements OnInit {
  reparation$! : Observable<any>;
  reparationId! : string;
  recup : boolean = false;
  user$! : Observable<any>;
  date: Date = new Date();

  @ViewChild('facture') facture!: ElementRef;
  constructor(private reparationService : ReparationService,
    private route : ActivatedRoute,
    private userService : UserService) { }

  ngOnInit(): void {
    this.reparationId = this.route.snapshot.params['reparationId'];
    this.user$ = this.userService.getCurrentUser();
    this.reparation$ = this.reparationService.getReparationDetailsByReparationId(this.reparationId);
    this.reparation$.subscribe(
      response =>{
        if (response.repair.valide == 1 ){
          this.recup = true;
        }
      }
    );
  }
  onValidateReparation(){
    this.reparationService.validateReparation(this.reparationId).subscribe(
      (response)=>{
        this.recup = true;
        let DATA: any = document.getElementById('facture');
        DATA.style.display = "block";
        html2canvas(DATA).then((canvas) => {
          let fileWidth = 208;
          let fileHeight = (canvas.height * fileWidth) / canvas.width;
          const FILEURI = canvas.toDataURL('image/png');
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
          PDF.save(`bon-de-sortie-garage-mean-${this.date.toLocaleDateString()}-${this.date.toLocaleTimeString()}.pdf`);
        });
        // DATA.style.display = "none"
      }
    );

  }

}
