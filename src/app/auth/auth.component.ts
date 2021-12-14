import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  userForm : FormGroup;
  userSub : Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
      private authservice: AuthService,
      private router: Router) {
    this.userForm = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmitForm(){
    const user: User = { name: this.userForm.value['name'], password: this.userForm.value['password'] };
    
    // inscription
    //this.userSub = this.authservice.signUp(user).subscribe();

    // connexion
    this.userSub = this.authservice.signIn(user).subscribe(res => {
      localStorage.setItem('token', res['token']);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe();
  }

}
