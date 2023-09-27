import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, MenusHttpService} from "@services/auth";
import {MenuModel} from "@models/auth";
import {MessageService} from "@services/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected menus: MenuModel[] = [];
  protected showedMenu: boolean = false;
  protected closed: boolean = true;
  protected closedLock: boolean | null = null;

  constructor(private readonly menusHttpService: MenusHttpService,
              private readonly authHttpService: AuthHttpService,
              public readonly authService: AuthService,
              public readonly messageService: MessageService,
              private readonly router: Router) {

  }

  ngOnInit(): void {
    this.getMenus();
  }

  showSubMenu(id: number = 0) {
    this.showedMenu = !this.showedMenu;
    if (id > 0) {
      document.getElementById(id?.toString())!.className = this.showedMenu ? 'showMenu' : '';
    }
  }

  getMenus() {
    this.menusHttpService.getMenusByRole(this.authService.role.id!).subscribe(
      menus => {
        this.menus = menus;
      }
    )
  }

  // lockMenu() {
  //   if (this.closedLock === 'lock') {
  //     this.closedLock = 'lock'
  //   } else {
  //     this.closedLock = 'lock'
  //   }
  //
  // }

  showCloseMenu() {
    if (!this.closedLock) {
      this.closed = !this.closed;
    }
  }

  closeMenu() {
    if (!this.closedLock) {
      this.closed = true;
    }
  }

  signOut() {
    this.authHttpService.signOut();
  }

  version() {
    this.messageService.successCustom('Acerca de','Versión 1.2.3');
  }

  redirectProfile() {
    this.router.navigateByUrl('/profile');
  }
}
