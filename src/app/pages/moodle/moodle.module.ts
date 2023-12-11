import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { MoodleRoutingModule } from './moodle-routing.module';

/**
 * PrimeNg Modules
 */
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';

/**
 * components
 */
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryFormComponent, CategoryListComponent],
  imports: [
    NgCommonModule,
    MoodleRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    MessageModule,
    ToolbarModule,
    PaginatorModule,
    TableModule,
    TagModule,
    SplitButtonModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    CheckboxModule,
    DividerModule,
    InputSwitchModule,
    KeyFilterModule,
    MultiSelectModule,
    PanelModule,
    SharedModule,
    CalendarModule,
    OverlayPanelModule,
  ],
})
export class MoodleModule {}
