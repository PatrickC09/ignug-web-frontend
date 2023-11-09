import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {OnExitInterface} from '@shared/interfaces';
import {CatalogueModel, StudentModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService,
} from '@services/core';
import {
  BreadcrumbEnum,
  CatalogueCoreTypeEnum,
  SkeletonEnum,
} from '@shared/enums';

@Component({
  selector: 'app-family-economic-data',
  templateUrl: './family-economic-data.component.html',
  styleUrls: ['./family-economic-data.component.scss']
})
export class FamilyEconomicDataComponent {
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly Validators = Validators;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected yesNo: CatalogueModel[] = [];
  protected houses: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService
  ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
    this.applyValidations()
  }

  ngOnInit(): void {
    this.form.patchValue(this.student);

    this.loadIsDisabilities();
    this.loadDisabilityTypes()
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.update();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  update() {
    this.studentsHttpService.updateFamilyEconomic(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
  }

  validateForm() {
    this.formErrors = [];

    if (this.isFamilyVehicleField.errors) this.formErrors.push('Posee vehiculos');
    if (this.isFamilyPropertiesField.errors) this.formErrors.push('Posee propiedades');
    if (this.familyPropertiesField.errors) this.formErrors.push('Que propiedades');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }


  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.newInformationStudentForm,
    });
  }

  get newInformationStudentForm(): FormGroup {
    return this.formBuilder.group({
      isFamilyVehicle: [null, [Validators.required]],
      isFamilyProperties: [null, [Validators.required]],
      familyProperties: [null],
    });
  }

  loadIsDisabilities(): void {
    this.yesNo = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  loadDisabilityTypes(): void {
    this.houses = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  applyValidations() {
    this.isFamilyPropertiesField.valueChanges.subscribe(value => {
      if (value?.code === '1') {
        this.familyPropertiesField.addValidators(Validators.required);
      } else {
        this.familyPropertiesField.removeValidators(Validators.required);
      }
      this.familyPropertiesField.updateValueAndValidity();
    });
  }

  get informationStudentForm(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get isFamilyVehicleField(): AbstractControl {
    return this.informationStudentForm.controls['isFamilyVehicle'];
  }

  get isFamilyPropertiesField(): AbstractControl {
    return this.informationStudentForm.controls['isFamilyProperties'];
  }

  get familyPropertiesField(): AbstractControl {
    return this.informationStudentForm.controls['familyProperties'];
  }
}