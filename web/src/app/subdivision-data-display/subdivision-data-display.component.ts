import { Component, OnInit } from "@angular/core";

import { SubDivisionApiService } from "../services/subdivision.service";
import {
  SortDirection,
  ISubdivision,
  SubdivisionStatusCodes,
  SubdivisionKeys,
  ITableColumn,
  SubdivisionColumns,
  IColumnSortDirection,
} from "src/app/constants/constants";
import { Subscription } from "rxjs";

@Component({
  selector: "app-subdivision-data-display",
  templateUrl: "./subdivision-data-display.component.html",
  styleUrls: ["./subdivision-data-display.component.css"],
})
export class SubdivisionDataDisplayComponent implements OnInit {
  public filterBy: string = "";
  public filteredSubdivisions: ISubdivision[] = [];
  public paginatedSubdivisions: ISubdivision[] = [];
  public subDivisionColumns: ITableColumn[] = SubdivisionColumns;
  public subDivisionStatusCodes: SubdivisionStatusCodes[] = [
    SubdivisionStatusCodes.All,
    SubdivisionStatusCodes.Active,
    SubdivisionStatusCodes.Builtout,
    SubdivisionStatusCodes.Future,
  ];
  public columnSortDirection: IColumnSortDirection = {
    name: SortDirection.Ascending,
    nearMapImageDate: SortDirection.Ascending,
  };
  public currentSortColumn: string = SubdivisionKeys.Name;
  public subDivisions: ISubdivision[] = [];
  private subDivsionsSubscription!: Subscription;

  public pageSizeOptions: Array<number> = [25, 50, 100, 150];
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public totalPages: number = 0;
  public pageSize: number = 25;

  constructor(private subDivisionApiService: SubDivisionApiService) {}

  ngOnInit(): void {
    this.subDivsionsSubscription = this.subDivisionApiService
      .getSubDivisionsData()
      .subscribe((response: { subdivisions: ISubdivision[] }) => {
        if (response?.subdivisions) {
          this.subDivisions = response.subdivisions;
          this.filteredSubdivisions = [...this.subDivisions];
          this.handleSortOrderChange({
            columnKey: SubdivisionKeys.Name,
            sortDirection: SortDirection.Ascending,
          });
          this.totalRecords = this.filteredSubdivisions.length;
          this.currentPage = 1;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          if (this.totalRecords && !this.totalPages) {
            this.totalPages = 1;
          }
        }
      });
  }

  filterBySubdivisionStatus(event: any) {
    this.filterBy = event.target.value;

    if (this.filterBy === SubdivisionStatusCodes.All) {
      this.filteredSubdivisions = [...this.subDivisions];
    } else {
      this.filteredSubdivisions = this.subDivisions.filter(
        (subdivision) => subdivision.subdivisionStatusCode === this.filterBy
      );
    }
    this.paginatedSubdivisions = this.filteredSubdivisions.slice(
      0,
      this.pageSize
    );

    this.totalRecords = this.filteredSubdivisions.length;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    if (this.totalRecords && !this.totalPages) {
      this.totalPages = 1;
    }
  }

  handleSortOrderChange(event: {
    columnKey: string;
    sortDirection: SortDirection;
  }) {
    this.filteredSubdivisions.sort((a: ISubdivision, b: ISubdivision) => {
      const valueA = a[event.columnKey as keyof ISubdivision] || "";
      const valueB = b[event.columnKey as keyof ISubdivision] || "";

      if (event.columnKey === SubdivisionKeys.NearMapImageDate) {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return event.sortDirection === SortDirection.Ascending
          ? dateA - dateB
          : dateB - dateA;
      }

      if (event.sortDirection === SortDirection.Ascending) {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSubdivisions = this.filteredSubdivisions.slice(
      startIndex,
      endIndex
    );
    this.columnSortDirection[event.columnKey] =
      this.columnSortDirection[event.columnKey] === SortDirection.Ascending
        ? SortDirection.Descending
        : SortDirection.Ascending;
    this.currentSortColumn = event.columnKey;
  }

  handlePageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.paginatedSubdivisions = [
      ...this.filteredSubdivisions.slice(0, this.pageSize),
    ];
  }

  handlePageChange(action: string) {
    if (action === "next" && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (action === "previous" && this.currentPage > 1) {
      this.currentPage--;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSubdivisions = this.filteredSubdivisions.slice(
      startIndex,
      endIndex
    );
  }

  ngOnDestroy(): void {
    if (this.subDivsionsSubscription) {
      this.subDivsionsSubscription.unsubscribe();
    }
  }
}
