import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  isSubmitting: Boolean = false;
  authForm: FormGroup;
  authenticated: Boolean = false;
  userCreated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private  httpClient:  HttpClient,
    private mainRoute: Router
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.authType === 'login' ) {
      this.doLogin();
    } else {
      this.register();
    }
    this.isSubmitting = false;
  }

  private doLogin() {
    const endpoint = 'http://localhost:8080/token/generate-token';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = this.authForm.value;
    this.httpClient.post<LoginResponse>(endpoint, {
      username: credentials.email,
      password: credentials.password
    }).subscribe((response) => {
      if (response.message === 'success') {
        this.authenticated = true;
        localStorage.setItem('token', response.result.token);
        localStorage.setItem('username', response.result.username);
        this.mainRoute.navigate(['home']);
      }
    });
  }

  private register() {
    const endpoint = 'http://localhost:8080/users/signup';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = this.authForm.value;
    this.httpClient.post<LoginResponse>(endpoint, {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    }).subscribe((response) => {
      if (response.status === 200) {
        this.userCreated = true;
        this.mainRoute.navigate(['login']);
      }
    });
  }
}

interface LoginResponse {
  message: String,
  status: number,
  result: {
    token: string;
    username: string;
  };
}
