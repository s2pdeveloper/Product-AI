import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {ValidationService} from "../../core/components";
import {AuthService} from "../../services/auth/auth.service";
@Component({
    selector: "app-dashboard",
    templateUrl: "register.component.html",
    styleUrls: ["register.component.scss"],
})
export class RegisterComponent {
    submitted = false;

    registerForm = this.formBuilder.group(
        {
            userName: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required, this.validationService.emailValidator]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [Validators.required]),
            role: new FormControl("ADMIN", [Validators.required]),
        },
        {
            validator: this.validationService.MustMatch("password", "confirmPassword"),
        }
    );

    constructor(
        private router: Router,
        private spinner: NgxSpinnerService,
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private validationService: ValidationService,
        private toastService: ToastrService
    ) {}

    navigateTo(page: string) {
        this.router.navigate([`${page}`]);
    }

    register() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        } else {
            this.spinner.show();
            this.authService.createUser(this.registerForm.value).subscribe(
                success => {
                    
                    this.toastService.success("Registration done  Successfully");
                    this.router.navigate(["/login"]);
                    this.spinner.hide();
                }
            );
        }
    }
    get form() {
        return this.registerForm.controls;
    }
}
