import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoodleModel } from '@models/core/moodle.model';
import { CoreService, RoutesService, MessageService } from '@services/core';
import { MoodleService } from '@services/core/moodle.service';
import {
  BreadcrumbEnum,
  ClassButtonActionEnum,
  IconButtonActionEnum,
  IdButtonActionEnum,
  LabelButtonActionEnum,
} from '@shared/enums';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;
  protected selectedItem!: MoodleModel;
  protected selectedItems: MoodleModel[] = [];
  protected isButtonActions: boolean = false;
  protected buttonActions: MenuItem[] = this.buildButtonActions;

  constructor(
    public readonly coreService: CoreService,
    protected readonly moodleService: MoodleService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    public readonly messageService: MessageService,
  ) {}

  selectItem(item: MoodleModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

  get buildButtonActions() {
    return [
      {
        id: IdButtonActionEnum.UPDATE,
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.SELECT,
        label: 'Seleccionar',
        icon: PrimeIcons.SYNC,
        command: () => {
          if (this.selectedItem?.id) this.change(this.selectedItem);
        },
      },
    ];
  }


  validateButtonActions(item: MoodleModel): void {
    this.buttonActions = this.buildButtonActions;

    if (item.isVisible) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REACTIVATE), 1);
    }

    if (!item.isVisible) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.HIDE), 1);
    }

    if (item.id === this.moodleService.category.id) {
      this.buttonActions.splice(this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.SELECT), 1);
    }
  }

  /** Actions **/
  change(item: MoodleModel) {
    this.moodleService.category = item;
    this.messageService.successCustom('Ha cambiado de Categoria', 'La Categoria seleccionada se configura para todo el sistema');
  }


  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.categories, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.categories, id]);
  }

  redirectSubjects() {
    this.router.navigate([this.routesService.subjects]);
  }

  redirectParallelsCapacity() {
    this.router.navigate([this.routesService.parallelCapacity]);
  }

}
