
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;
  username: string = '';
  password: string = '';
  data: string;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {

    this.loginForm = fb.group({
      username : [null, Validators.required],
      password : [null, Validators.required],
    });
  }

  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
     console.log(params);
    });
  }



  login(value) {
    sessionStorage.setItem('currentUser', value);
    window.location.href = '/';
  }

  signup() {

  }

  logout() {
 
  }

  isUserLoggedIn() {
 
  }
}

