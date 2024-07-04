import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  constructor(
    private router:Router,
    private toastService: ToastrService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  forgetPasswordFrom= new FormGroup({
    EMAIL : new FormControl ('',[Validators.required, Validators.email])
  });

  sendMail() {
    let obj = {
        email: this.forgetPasswordFrom.value.EMAIL,
    }
    this.auth.forgetPassword(obj).subscribe(success => {
      
      this.router.navigate(["/login"]);
        this.toastService.success("Please check your email to reset password");
    });
}

}
