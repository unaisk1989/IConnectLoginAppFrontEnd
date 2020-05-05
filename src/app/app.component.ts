import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ANGULARFRONTEND';
  isLoggedIn: boolean = false;

  constructor(private router: Router){

  }

  ngOnInit(){
    if(localStorage.getItem('isLoggedIn')=='true'){
      this.isLoggedIn=true;
    }
  }

}