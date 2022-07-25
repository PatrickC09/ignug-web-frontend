import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UpdateUserDto} from '@models/auth';
import {AuthHttpService, AuthService} from '@services/auth';
import {BreadcrumbService, CataloguesHttpService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {DateFormatPipe} from "@shared/pipes";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit, OnExitInterface {
  dateFormat = new DateFormatPipe();
  id: number = 0;
  emailVerifiedAt: Date | null = null;
  formUser: FormGroup = this.newUserForm;
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
  ) {
    if (this.authService.auth) {
      this.id = this.authService.auth.id;
    }
  }

  async onExit(): Promise<boolean> {
    if (this.formUser.touched || this.formUser.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.getUserInformation();
    } else {
      //Todo: Revisar para el perfil, que mas se puede implementar
    }
  }

  get newUserForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      phone: [null, []],
      // roles: [['admin'], []],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }

  onSubmitUserInformation(): void {
    if (this.formUser.valid) {
      if (this.id > 0) {
        this.updateUserInformation(this.formUser.getRawValue());
      }
    } else {
      this.formUser.markAllAsTouched();
      this.messageService.errorsFields.then();
    }
  }

  getUserInformation(): void {
    this.isLoadingSkeleton = true;
    this.authHttpService.getUserInformation(this.id).subscribe((user) => {
        this.isLoadingSkeleton = false;
        this.formUser.patchValue(user);
        this.emailVerifiedAt = user.emailVerifiedAt;
      }
    );
  }

  updateUserInformation(user: UpdateUserDto): void {
    this.authHttpService.updateUserInformation(this.id, user).subscribe((user) => {
      this.formUser.reset(user);
      this.authService.auth = user;
    });
  }

  get emailField(): AbstractControl {
    return this.formUser.controls['email'];
  }

  get phoneField(): AbstractControl {
    return this.formUser.controls['phone'];
  }

  get usernameField(): AbstractControl {
    return this.formUser.controls['username'];
  }
}
