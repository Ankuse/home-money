import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'usr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showMessage (text: string, type: string = 'danger' ) {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 2000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
        .subscribe(( user: User ) => {
          console.log(user);
          if (user) {
            if ( user.password === formData.password) {
              this.message.text = '';
              window.localStorage.setItem('user', JSON.stringify(user));
              this.authService.login();
             // this.router.navigate(['']);
              this.showMessage('Правильный пароль', 'info');
            } else {
              this.showMessage('Введите правильный пароль');
            }
          } else {
            this.showMessage('Такого пользователя не существует');
          }
        });
  }

}

