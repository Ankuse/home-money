import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe( (params: Params) => {
      if ( params['nowCanLogin']) {
        this.showMessage({
          text: 'Теперь вы можете зайти в систему',
          type: 'success'
        });
      }
    } );

    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  private showMessage (message: Message) {
    this.message = message;
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
              this.showMessage({
                text: 'Правильный пароль',
                type: 'info'
              });
            } else {
              this.showMessage({
                text: 'Введите правильный пароль',
                type: 'danger'
              });
            }
          } else {
            this.showMessage({
                text: 'Такого пользователя не существует',
                type: 'danger'
            });
          }
        });
  }

}

