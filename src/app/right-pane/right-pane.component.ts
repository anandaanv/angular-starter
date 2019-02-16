import {Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-right-pane',
  templateUrl: './right-pane.component.html',
  styleUrls: ['./right-pane.component.scss']
})
export class RightPaneComponent implements OnInit {

  @Input() user: string;

  constructor(private mainRoute: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.mainRoute.navigate(['login']);
  }
}
