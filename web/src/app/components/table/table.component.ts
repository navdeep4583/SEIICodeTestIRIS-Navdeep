import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  IColumnSortDirection,
  SortDirection,
  ITableColumn,
} from "src/app/constants/constants";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent {

  @Input() currentSortColumn: string = ""
  @Input() columns: ITableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() columnSortDirection: IColumnSortDirection = {};

  @Output() onSortOrderChange = new EventEmitter<{
    columnKey: string;
    sortDirection: SortDirection;
  }>();

  onSort(columnKey: string) {
    this.onSortOrderChange.emit({
      columnKey,
      sortDirection: this.columnSortDirection[columnKey],
    });
  }
} 
