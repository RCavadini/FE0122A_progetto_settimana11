import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-primary text-white shadow p-3 mb-5 rounded" *ngIf="isIscritto">
      <div class="container-fluid">
        <div class="collapse navbar-collapse justify-content-between">
          <div class="navbar-nav">
            <div class="nav-item" >
              <a class="nav-link" [routerLink]="['/movies']" routerLinkActive="active" >Ultime uscite</a>
            </div>
            <div class="nav-item me-5" >
              <a class="nav-link" [routerLink]="['/favourites']" routerLinkActive="active" >Profilo</a>
            </div>
          </div>
          <div >
            <h1 class="d-inline username-welc-back">Ciao {{ciaoUser}}!</h1>
          </div>
          <div>
            <button class="btn btn-dark mx-3" (click)="esci()">logout</button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  isIscritto: boolean = false;
  ciaoUser!: string | undefined;

  constructor(private authSrv: AuthService) {}

  esci() {
    this.authSrv.logout();
  }

  ngOnInit(): void {
    this.authSrv.isLoggedIn$.subscribe((isIscritto) => {
      this.isIscritto = isIscritto;
    })

    this.authSrv.user$.subscribe((data) => {
      this.ciaoUser = data?.user.name;
    })
  }
}
