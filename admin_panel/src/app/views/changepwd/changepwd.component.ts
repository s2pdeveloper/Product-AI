import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {ValidationService} from "../../core/components";
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: "app-changepwd",
    templateUrl: "./changepwd.component.html",
    styleUrls: ["./changepwd.component.scss"],
})
export class ChangepwdComponent implements OnInit {
    message = "Please enter valid Password";
    public changePasswordForm: FormGroup;
    setPasswordForm: FormGroup;
    Show: string = "password";
    show: string = "password";
    visible: string = "password";
    submitted = false;
    user: any;
    changePassword: boolean = false;
    fieldTextType: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private validationService: ValidationService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.sub && params.pin && params.role) {
                this.changePassword = true;
                this.user = params;
            }
        });
        this.changePwdForm();
        this.setPwdForm();
    }
    get f() {
        return this.changePasswordForm.controls;
    }
    get fs() {
        return this.setPasswordForm.controls;
    }

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    changePwdForm(): void {
        this.changePasswordForm = this.formBuilder.group(
            {
                id: new FormControl(null),
                email: new FormControl(null),
                newPassword: new FormControl("", [
                    Validators.required,
                    // Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,25})$"),
                ]),
                confirmPassword: new FormControl("", [Validators.required]),
                oldPassword: new FormControl("", [
                    Validators.required,
                    // Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,25})$"),
                ]),
            },
            {
                validator: this.validationService.MustMatch("newPassword", "confirmPassword"),
            }
        );
    }
    setPwdForm(): void {
        this.setPasswordForm = this.formBuilder.group(
            {
                id: new FormControl(null),
                resetPin: new FormControl(null),
                password: new FormControl("", [
                    Validators.required,
                    // Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,25})$"),
                ]),
                confirmPassword: new FormControl("", [Validators.required]),
            },
            {
                validator: this.validationService.MustMatch("password", "confirmPassword"),
            }
        );
    }
    password_show() {
        this.Show = "text";
    }
    password_hide() {
        this.Show = "password";
    }
    password_display() {
        this.show = "text";
    }
    password_hiden() {
        this.show = "password";
    }
    password_visible() {
        this.visible = "text";
    }
    password_disable() {
        this.visible = "password";
    }
    changePass() {
        this.changePasswordForm.controls.id.setValue(this.user.id);
        this.changePasswordForm.controls.email.setValue(this.user.email);
        this.submitted = true;
        if (this.changePasswordForm.invalid) {
            this.toastr.info("Please enter all required field !");
            return;
        }
        this.spinner.show();
        this.authService.resetPass(this.changePasswordForm.value).subscribe((success: any) => {
            this.toastr.success("User password-change successfully");

            this.submitted = false;
            this.spinner.hide();
            this.router.navigate(["./auth/home"]);
        });
    }
    setPass() {
        this.setPasswordForm.controls.id.setValue(this.user.sub);
        this.setPasswordForm.controls.resetPin.setValue(parseInt(this.user.pin));

        this.submitted = true;
        if (this.setPasswordForm.invalid) {
            this.toastr.info("Please enter all required field !");
            return;
        }
        this.spinner.show();
        this.authService.setPass(this.setPasswordForm.value,).subscribe(
            (success: any) => {
                this.toastr.success(success.result.message);
                
                this.submitted = false;
                this.spinner.hide();
                if (this.user.role == "SUPER ADMIN" || "ADMIN") {
                    this.router.navigate(["/login"]);
                }
                if (this.user.role == "collegeDetails") {
                    this.router.navigate(["/college-login"]);
                }
                if (this.user.role == "company") {
                    this.router.navigate(["/company-login"]);
                }
            }
        );
    }
}
