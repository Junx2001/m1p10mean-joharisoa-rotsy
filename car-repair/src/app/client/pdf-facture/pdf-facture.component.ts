import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { ReparationService } from 'src/app/global/services/reparation.service';
import { UserService } from 'src/app/global/services/user.service';
import { VoitureService } from 'src/app/global/services/voiture.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf-facture',
  templateUrl: './pdf-facture.component.html',
  styleUrls: ['./pdf-facture.component.css']
})
export class PdfFactureComponent implements OnInit {
  @ViewChild('facture') facture!: ElementRef;
  reparation$! : Observable<any>;
  car$! : Observable<any>;
  date: Date = new Date();
  dateFin! : Date;
  user$ ! : Observable<any>;

  constructor(private route : ActivatedRoute,
    private voitureService : VoitureService,
    private reparationService : ReparationService,
    private userService : UserService) { }

  ngOnInit(): void {
    this.dateFin = new Date();
    this.dateFin.setDate(this.date.getDate()+10);
    this.user$ = this.userService.getCurrentUser();
    
    const immatriculation = this.route.snapshot.params['immatriculation'];
    this.car$ = this.voitureService.getCarByImmatriculation(immatriculation);
    this.reparation$ = this.reparationService.getCarRepairInProcess(immatriculation);
    
    
  }
  onPrint(){
    let DATA: any = document.getElementById('facture');
    DATA.style.display = "block";
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('facture-garage-mean.pdf');
    });
    DATA.style.display = "none"
  }
}
