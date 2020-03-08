import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  title = 'pokemon world';

  constructor(private router: Router) {
   
 }
  ngOnInit(){}

  onClickVersionOne() {
    this.router.navigate(['versionOne']);
    
  }

  onClickVersionTwo() {
    this.router.navigate(['versionTwo']);
    
  }

  

}
