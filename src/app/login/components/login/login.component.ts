import { AuthService } from "./../../../core/services/auth.service";
import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { takeWhile } from "rxjs/operators";
import { ErrorService } from "../../../core/services/error.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  configs = {
    isLogin: true,
    actionText: "SignIn",
    buttonActionText: "Create account",
    isLoading: false
  };

  private nameControl = new FormControl("", [
    Validators.required,
    Validators.minLength(5)
  ]);

  private alive = true;

  @HostBinding("class.app-login-spinner")
  private appltSpinnerClass = true;

  constructor(
    public authService: AuthService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();

    const userData = this.authService.getRememberMe();
    if(userData) {
      this.email.setValue(userData.email);
      this.password.setValue(userData.password);
    }
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);

    this.configs.isLoading = true;

    const operation = this.configs.isLogin
      ? this.authService.signinUser(this.loginForm.value)
      : this.authService.signinUser(this.loginForm.value);

    operation.pipe(takeWhile(() => this.alive)).subscribe(
      res => {
        console.log("redirecting....", res);
        this.authService.setRememberMe(this.loginForm.value);
        const redirect: string = this.authService.retirectURL || "//dashboard";
        this.authService.retirectURL = null;
        console.log("route to redirect", redirect);
        this.configs.isLoading = false;
      },
      err => {
        console.log(this.errorService.getErrorMessage(err));
        this.configs.isLoading = false;
        this.snackBar.open(this.errorService.getErrorMessage(err), "Done", {
          duration: 5000,
          verticalPosition: "top"
        });
      },
      () => console.log("Observable completed!")
    );
  }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = this.configs.isLogin ? "SignUp" : "SignIn";
    this.configs.buttonActionText = this.configs.isLogin
      ? "Already have account"
      : "Create account";
    !this.configs.isLogin
      ? this.loginForm.addControl("name", this.nameControl)
      : this.loginForm.removeControl("name");
  }

  get email(): FormControl {
    return <FormControl>this.loginForm.get("email");
  }
  get password(): FormControl {
    return <FormControl>this.loginForm.get("password");
  }
  get name(): FormControl {
    return <FormControl>this.loginForm.get("name");
  }

  onKeepsigned(): void {
    this.authService.toggleKeepSigner();
  }

  onRememberMe(): void {
     this.authService.toggleRememberMe();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
