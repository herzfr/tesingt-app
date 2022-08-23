import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { MENU } from './general-value';
import { RouteMenu } from './menu.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  menuItems: any[] = [];
  isCollapsed = false;
  id: any;
  counter: any = 0;
  timerSubcriber: any;
  display = 'TEST APP';

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(
      () =>
        observer.next(
          new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
        ),
      1000
    );
  });

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMenuData(MENU);
  }

  ngAfterViewInit(): void {
    this.observer.observe('(max-width: 700px)').subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges();
  }

  setMenuData(menuValues: RouteMenu[]) {
    this.menuItems = menuValues.filter((menuItem) => menuItem);
  }

  check(data: any) {
    console.log(data);
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }
}
