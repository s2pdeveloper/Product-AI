import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems; 
  params: any;
  userDetails: any = [];
  constructor(
    public authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.userDetails = this.storageService.get('AIuser');
  }

  // viewProfile() {
  //   this.router.navigate(['/profile']);
  // }
  logout() {
    this.authService.logout();
  }

}
