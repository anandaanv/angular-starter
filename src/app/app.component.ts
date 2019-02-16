import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angmt01';

  constructor(private route: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.route.navigate(['home']);
    } else {
      this.route.navigate(['login']);
    }
  }
}

