import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MessageSnackbarComponent } from 'src/app/components/messagesnackbar/messagesnackbar.component';
import { SaveUserAction } from 'src/app/data/store/actions/auth.action';
import { UserState } from 'src/app/data/store/reducers/user.reducer';
import { authFS, userStateFS } from 'src/app/data/store/selectors/all.selector';
import { State } from 'src/app/data/store/store';
import { Users } from 'src/app/data/_DATA';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
  // properties
  signupForm!: FormGroup;
  isDisabled: boolean = false;
  avatar: string = '../../../assets/photos/default.png';
  users: Users = {};
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(
    private store: Store<State>,
    private router: Router,
    public snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private loadingBar: LoadingBarService
  ) {
    // subscribe to authentication store
    this.store.select(authFS).subscribe((auth) => {
      // check if already logged in
      if (auth != null && router.url == '/signup') {
        this.router.navigate(['home']);
      }
    });

    // subscribe to users store
    this.store.select(userStateFS).subscribe((userState: UserState) => {
      if (userState != undefined && userState.users != undefined) {
        // set users
        this.users = userState.users;
      }
    });
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

  /* initializeeactive form */
  reactiveForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatarURL: ['', Validators.required],
    });
  }

  // note: I know here we need to upload image by api, but based on project set up I saved image64
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0] && this.fileInput) {
      // disable button
      this.isDisabled = false;

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.avatar = e.target.result;
          this.signupForm.value.avatarURL = e.target.result;
        };

        if (image.complete || image.complete === undefined) {
          // enable button
          this.isDisabled = true;
        }
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    }
  }

  submit(): void {
    // check filling required data
    if (!this.signupForm.valid) {
      // create snack bar message
      let message = 'Please Make sure that all inputs filled correctly';

      // open snack bar
      this.snackBar.openFromComponent(MessageSnackbarComponent, {
        data: { message },
        verticalPosition: 'top',
        panelClass: ['failedsnackBar'],
        duration: 3000,
      });
    } else {
      // create user id
      var UserId = this.signupForm.value.name.toLowerCase().replace(/\s/g, '');

      // check if the user already exists
      if (this.users[UserId] != null) {
        // create snack bar message
        let message = 'User name already exists !';

        // open snack bar
        this.snackBar.openFromComponent(MessageSnackbarComponent, {
          data: { message },
          verticalPosition: 'top',
          panelClass: ['failedsnackBar'],
          duration: 3000,
        });
      } else {
        // define user data
        let user: any = {
          ...this.signupForm.value,
        };

        // start loading bar
        this.loadingBar.start();

        // disable button
        this.isDisabled = true;

        // dispatch save user action
        this.store.dispatch(new SaveUserAction(user));
      }
    }
  }
}
