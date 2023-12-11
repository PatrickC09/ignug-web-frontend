import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CoreService,
  InstitutionsService,
  RoutesService,
} from '@services/core';
import {
  ClassButtonActionEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  SkeletonEnum,
} from '@shared/enums';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  // Foreign Keys
  id: string | null = null;

  // form
  form: FormGroup;

  constructor(
    public coreService: CoreService,
    private router: Router,
    private routesService: RoutesService,
    private formBuilder: FormBuilder,
    private institutionsService: InstitutionsService
  ) {
    this.form = this.newFormCategory;
  }

  /**
   * get new form
   */
  get newFormCategory(): FormGroup {
    return this.formBuilder.group({
      code: [null, [Validators.required]],
      codeSniese: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      parent: [null, [Validators.required]],
      institution: [
        this.institutionsService.institution,
        [Validators.required],
      ],
    });
  }

  /**
   *function to back
   */
  back(): void {
    this.router.navigate([this.routesService.moodle]);
  }

  /**
   * function to onSubmit
   */
  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  /**
   * forms Getters
   */
  get institutionField(): AbstractControl {
    return this.form.controls['institution'];
  }

  get isEnabledField(): AbstractControl {
    return this.form.controls['isEnabled'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get codeSnieseField(): AbstractControl {
    return this.form.controls['codeSniese'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get shortNameField(): AbstractControl {
    return this.form.controls['shortName'];
  }

  /**
   * icons - buttoms
   */
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
}
