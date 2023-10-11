import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDialogComponent } from './signup-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserApiService } from 'src/app/services/users/user-api.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupDialogComponent', () => {
  let component: SignupDialogComponent;
  let fixture: ComponentFixture<SignupDialogComponent>;


  let apiService: UserApiService
  let customSnackbar: SnackbarService

  const matDialogMock = {
    close: () => {}
  };


  class MockUserApiService {
    login() {
      return {
          email: "w@w.com",
          firstName: "w",
          id: 40,
          lastName: "w"
      }
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupDialogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: UserApiService,
          useValue: MockUserApiService
        },
        {
          provide: SnackbarService,
          useValue: ''
        },
        { provide: MatDialogRef, useValue: matDialogMock },
      ]
    });
    fixture = TestBed.createComponent(SignupDialogComponent);
    apiService = TestBed.inject(UserApiService);
    customSnackbar = TestBed.inject(SnackbarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
