import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-activate-user-account',
  templateUrl: './activate-user-account.component.html',
  styleUrls: ['./activate-user-account.component.css']
})
export class ActivateUserAccountComponent implements OnInit {

  constructor(private route : ActivatedRoute,
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    const secretEmailToken = this.route.snapshot.params['secretEmailToken'];
    this.authService.activateAccount(userId, secretEmailToken).subscribe(
      (response) =>{ 
        console.log("response received");
        
        this.router.navigateByUrl(`/login/${1}`);
      },
      (error)=>{        
        console.error('request failed with error');
        this.router.navigateByUrl(`/login/${0}`);
      }
    );
  }

}
