import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  styles: [`:host {
    display: flex;
    align-items: center;
    justify-content: center;
  }`]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
