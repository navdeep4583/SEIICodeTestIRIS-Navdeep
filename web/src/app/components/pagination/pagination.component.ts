import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent {

  @Input() pageSize: number = 0;
  @Input() totalRecords: number = 0;
  @Input() pageSizeOptions: Array<number> = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;

  @Output() handlePageSizeChange = new EventEmitter<number>();
  @Output() handlePageChange = new EventEmitter<string>();

  onPageSizeChange(event: any): void {
    this.handlePageSizeChange.emit(+event.target.value);
  }

  onPageChange(paginationAction: string): void {
    this.handlePageChange.emit(paginationAction);

  }
}
