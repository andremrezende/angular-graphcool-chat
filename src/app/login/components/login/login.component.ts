import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account'
  };

  private nameControl = new FormControl(
    '', [Validators.required, Validators.minLength(5)]
  );

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm():void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit():void {
    console.log(this.loginForm.value);

    const operation = (this.configs.isLogin) ? 
                      this.authService.signinUser(this.loginForm.value) :
                      this.authService.signinUser(this.loginForm.value);
    
    operation.subscribe(res=> {
      console.log('redirecting....', res);
    });                      
  }

  changeAction(): void{  
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = this.configs.isLogin ? 'SignUp' : 'SignIn';
    this.configs.buttonActionText = this.configs.isLogin ? 'Already have account' : 'Create account';
    !this.configs.isLogin ? this.loginForm.addControl('name', this.nameControl) : this.loginForm.removeControl('name');
  }

  get email(): FormControl {return <FormControl>this.loginForm.get('email');}
  get password(): FormControl {return <FormControl>this.loginForm.get('password');}
  get name(): FormControl {return <FormControl>this.loginForm.get('name');}
}
