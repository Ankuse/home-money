import { Component, OnInit } from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'usr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  date = new Date();
  user: User;
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
