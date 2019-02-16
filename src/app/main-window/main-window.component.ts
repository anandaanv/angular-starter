import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {

  users: User[] = [];

  constructor(private  httpClient:  HttpClient) { }

  ngOnInit() {
    const endpoint = 'http://localhost:8080/users';
    this.httpClient.get<GetUserResponse>(endpoint).subscribe((response) => {
      this.users = response.result;
    });
  }

  approve(user) {
    user.enabled = true;
    this.updateUserApprovalStatus(user);
  }

  disapprove(user) {
    user.enabled = false;
    this.updateUserApprovalStatus(user);
  }

  private updateUserApprovalStatus(user) {
    const endpoint = 'http://localhost:8080/users/approve';
    this.httpClient.post<ApproveUserResponse>(endpoint, user).subscribe((response) => {
    });
  }

}

interface User {
  name: String;
  email: String;
  enabled: boolean;
}

interface GetUserResponse {
  status: string,
  message: string,
  result: User[]
}

interface ApproveUserResponse {
  status: number,
  message: string,
  result: User
}
