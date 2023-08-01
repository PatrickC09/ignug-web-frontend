import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, MenusHttpService} from "@services/auth";
import {MenuModel} from "@models/auth";

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

  constructor(private menusHttpService: MenusHttpService,
              private authHttpService: AuthHttpService,
              public authService: AuthService,
              private router: Router) {

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

  redirectProfile() {
    this.router.navigateByUrl('/profile');
  }
}
