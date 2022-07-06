import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CreateUserDto, UpdateUserDto} from '@models/auth';
import {UsersHttpService} from '@services/auth';
import {CataloguesHttpService, CoreService} from '@services/core';
import {CatalogueModel} from '@models/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  id: number = 0;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  bloodTypes: CatalogueModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private usersHttpService: UsersHttpService,
              private cataloguesHttpService: CataloguesHttpService,
              private formBuilder: FormBuilder,
              private coreService: CoreService) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadBloodTypes();
    if (this.id > 0) {
      this.getUser();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      bloodType: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      email: [null, [Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Valid');
      if (this.id > 0) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      console.log('Invalid');
      this.form.markAllAsTouched();
    }
  }

  create(user: CreateUserDto) {
    this.usersHttpService.create(user).subscribe(user => {
      console.log(user);
    });
  }

  getUser() {
    this.usersHttpService.findOne(this.id).subscribe(user => {
        this.form.reset(user);
      }
    );
  }

  isRequire(control: AbstractControl): boolean {
    return control.hasValidator(Validators.required);
  }

  loadBloodTypes() {
    this.cataloguesHttpService.findAll().subscribe(bloodTypes => {
        console.log(bloodTypes);
        this.bloodTypes = bloodTypes;
      }
    );
  }

  update(user: UpdateUserDto) {
    this.usersHttpService.update(this.id, user).subscribe(user => {
      console.log(user);
    });
  }

  get bloodTypeField() {
    return this.form.controls['bloodType'];
  }

  get birthdateField() {
    return this.form.controls['birthdate'];
  }

  get emailField() {
    return this.form.controls['email'];
  }

  get lastnameField() {
    return this.form.controls['lastname'];
  }

  get nameField() {
    return this.form.controls['name'];
  }

  get passwordField() {
    return this.form.controls['password'];
  }

  get usernameField() {
    return this.form.controls['username'];
  }
}

