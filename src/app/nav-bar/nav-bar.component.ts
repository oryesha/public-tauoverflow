import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  @Input() isSignUp: boolean;

  ngOnInit() {
  }

  logout() {
    this.authService.doLogout().then( () => this.router.navigate(['']));
  }

}
