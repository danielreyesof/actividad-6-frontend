import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User, UserInfo } from '../../interfaces/authForms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input('mode') mode: 'DARK' | 'LIGHT' = 'DARK';

  showName: boolean = false;
  userData: any;

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit(): void {}

  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  myFunction() {
    let x: any = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  async getUserData<T>() {
    await this.authService.verifyToken().then(({ user }: any) => {
      this.userData = user;
      this.showName = true;
    });
  }

  async logout() {
    await this.authService.logOut().then((res) => {
      this.router.navigate(['sign-in']);
    });
  }
}
