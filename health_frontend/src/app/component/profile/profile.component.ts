import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editProfile = false;
  userId = '';
  userDetails = new Users();

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.editProfileForm = this.fb.group({
      username: [''],
      mobile: [''],
      email: [''],
      location: ['']
    });
  }

  ngOnInit() {
    this.editProfileForm = new FormGroup({
      userName: new FormControl(
        { value: '', disabled: true },
      ),
      mobile: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      location: new FormControl(
        '',
        [
          Validators.required,
        ])
    });

    this.userId = this.dataService.getUserId();
    if (this.userId) {
      this.getProfileDetails();
    }
  }

  changeMyProfile() {
    if (this.editProfileForm.valid) {
      this.userDetails = {
        userId: this.userDetails.user_name,
        user_name: this.userDetails.user_name,
        user_mobile: this.editProfileForm.get('mobile')?.value,
        user_email: this.editProfileForm.get('email')?.value,
        location: this.editProfileForm.get('location')?.value
      };
      console.log("Updating user:", this.userDetails);

      this.dataService.updateProfile(this.userDetails).subscribe(success => {
        if (success) {
          this.editProfile = false;
        } else {
          alert('Profile update failed!');
        }
      });

    } else {
      this.editProfileForm.markAllAsTouched();
    }
  }

  editMyProfile() {
    this.editProfile = true;
  }

  discardEdit() {
    this.editProfile = false;
    this.editProfileForm.reset({
      userName: this.userDetails.user_name,
      mobile: this.userDetails.user_mobile,
      email: this.userDetails.user_email,
      location: this.userDetails.location
    });
  }

  getProfileDetails() {
    this.dataService.getUserDetails(this.userId).subscribe({
      next: (user: Users) => {
        this.userDetails = user;
        this.editProfileForm.patchValue({
          userName: this.userDetails.user_name,
          mobile: this.userDetails.user_mobile,
          email: this.userDetails.user_email,
          location: this.userDetails.location
        });
      },
      error: () => {
        alert('Failed to load profile details');
      }
    });
  }

}

