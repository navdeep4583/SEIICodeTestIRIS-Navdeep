import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";
import { TableComponent } from "./table.component";
import { SortDirection } from "src/app/constants/constants";

describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.rows = [
      { name: "abc", id: 1, county: "clark" },
      { name: "dec", id: 2, county: "butler" },
      { name: "xyz", id: 3, county: "mason" },
      { name: "cda", id: 4, county: "clark" },
      { name: "jkl", id: 5, county: "clark" },
    ];
    component.currentSortColumn = "name";
    component.columnSortDirection = { name: SortDirection.Ascending };
    component.columns = [
      { dataKey: "name", header: "Name" },
      { dataKey: "id", header: "ID" },
      { dataKey: "county", header: "County" },
    ];
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display rows", () => {
    expect(component.rows.length).toBe(5);
    const tableBody = fixture.debugElement.query(By.css("tbody"));
    const rows = tableBody.queryAll(By.css("tr"));
    expect(rows.length).toBe(5);
  });

  it("should trigger sort event with name column", () => {
    spyOn(component.onSortOrderChange, "emit");
    component.onSort("name");
    expect(component.onSortOrderChange.emit).toHaveBeenCalledWith({
      columnKey: "name",
      sortDirection: SortDirection.Ascending,
    });
  });

  it("should trigger sort event with name column in descending order", () => {
    spyOn(component.onSortOrderChange, "emit");
    component.columnSortDirection = { name: SortDirection.Descending };
    component.onSort("name");
    expect(component.onSortOrderChange.emit).toHaveBeenCalledWith({
      columnKey: "name",
      sortDirection: SortDirection.Descending,
    });
  });
});
