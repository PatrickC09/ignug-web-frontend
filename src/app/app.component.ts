import {Component, Inject} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {BreadcrumbService, CataloguesHttpService, CoreService} from "@services/core";
import {BreadcrumbEnum, CoreMessageEnum} from "@shared/enums";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected readonly CoreMessageEnum = CoreMessageEnum;

  constructor(@Inject(DOCUMENT) private document: Document, private primengConfig: PrimeNGConfig,
              public coreService: CoreService, private breadcrumbService: BreadcrumbService,
              private cataloguesHttpService: CataloguesHttpService) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.HOME}]);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.findCatalogue();
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (theme)
      themeLink.href = `./assets/themes/${theme}/theme.css`;
  }

  findCatalogue() {
    let catalogues = localStorage.getItem('catalogues');

    if (catalogues === undefined || !catalogues) {
      this.cataloguesHttpService.findCache().subscribe();
    }
  }
}
