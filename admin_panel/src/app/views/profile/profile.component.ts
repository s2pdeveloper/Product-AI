import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  params: any;
  userDetails: any = [];

  constructor(
    private storageService: StorageService,
    private location: Location,
    private router: ActivatedRoute,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.storageService.get('AIuser');
  }

  edit() {
    this.route.navigate(['companies/company-form'], {
      queryParams: {
        id: this.userDetails.id,
      },
    });
  }


  goBack() {
    this.location.back();
  }
}
