import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMenuData } from 'src/app/interfaces/coffeemenu.interface';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { CoffeeMenuService } from 'src/app/services/coffeeMenu/coffee-menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  private token: string | null = null;
  @Input() isAuthenticated = this.authService.isAuthenticated;
  displayedColumns: string[] = ['item_name', 'item_price', 'item_type'];
  dataSource: MatTableDataSource<IMenuData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSizeOptions = [4, 6, 8];
  pageSize = 4;

  constructor(
    private authService: AuthServiceService,
    private coffeeMenuService: CoffeeMenuService
  ) {}
  ngOnInit() {
    // Fetch coffee menu data when the component initializes
    this.fetchCoffeeMenuData(1, this.pageSize);

    // Retrieve the token from localStorage
    this.token = localStorage.getItem('token');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchCoffeeMenuData(page: number = 1, pageSize: number = 5) {
    this.token = localStorage.getItem('token');

    if (!this.token) {
      console.error('Token is missing!');
      return;
    }

    this.coffeeMenuService.getCoffeeMenu(page, pageSize).subscribe(
      (data: IMenuData[]) => {
        this.dataSource = new MatTableDataSource(data);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching coffee menu data:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.fetchCoffeeMenuData(event.pageIndex + 1, event.pageSize);
  }
}
