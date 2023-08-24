import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  GradeModel,
  SelectGradeDto,
  EnrollmentDetailModel
} from '@models/core';
import {
  BreadcrumbService,
  CoreService, EventsService,
  MessageService,
  RoutesService,
  TeacherChargeHttpService,
} from '@services/core';
import {ActionButtonsEnum, BreadcrumbEnum} from "@shared/enums";
import { SelectEnrollmentDetailDto } from '../../../../models/core/enrollment-Detail.modet';


@Component({
  selector: 'app-consolidated-notes-list',
  templateUrl: './consolidated-notes-list.component.html',
  styleUrls: ['./consolidated-notes-list.component.scss']
})
export class ConsolidatedNotesListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectEnrollmentDetailDto = {};
  protected selectedItems: EnrollmentDetailModel[] = [];
  protected items: GradeModel[] = [];
  protected gradePartial1:any;
  protected gradePartial2:any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private teacherChargeService: TeacherChargeHttpService,
    private eventsService: EventsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_CHARGE},
    ]);

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findAll();
      }
    });
  }

  ngOnInit() {
    this.partials()
    this.findAll();
  }

  /** Load Data **/
  findAll(page: number = 0) {
    this.teacherChargeService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
        console.log(this.items);
      });
  }
  partials(){
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      { field: 'identification', header: 'Cedula' },
      { field: 'name', header: 'Estudiante' },
      { field: 'number', header: 'N° matricula' },
      { field: 'value', header: 'Calificacion P|' },
      { field: 'partial1', header: 'Asistencia P|' },
      { field: 'grade2', header: 'Calificacion P||' },
      { field: 'partial', header: 'Asistencia P||' },
      { field: 'finalGrade', header: 'Calificacion Final' },
      { field: '', header: 'Asistencia Final' },
      { field: 'academicState', header: 'Estado Academico' },
    ];
  }

  buildActionButtons(): void {
    this.actionButtons = [];


    this.actionButtons.push(
      {
        id: ActionButtonsEnum.DELETE,
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedItem?.id) this.remove(this.selectedItem.id);
        },
      });
  }

  /** Actions **/
  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.teacherChargeService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }


  /** Select & Paginate **/
  selectItem(item: GradeModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
   // this.teacherDistributivesService.teacherDistributive = item;
    this.buildActionButtons();
  }

  paginate(event: any) {
    this.findAll(event.page);
  }


  export(){
    this.teacherChargeService.export().subscribe((response)=>{
      console.log(response);

    });
  }

}
