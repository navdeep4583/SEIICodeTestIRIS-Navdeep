import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SubdivisionDataDisplayComponent } from "./subdivision-data-display.component";
import { of } from "rxjs";
import { SubDivisionApiService } from "../services/subdivision.service";
import { SubdivisionsMockData } from "../mocks/subDivisionsMocks";
import {
  ISubdivision,
  SortDirection,
  SubdivisionKeys,
  SubdivisionStatusCodes,
} from "../constants/constants";
import { TableComponent } from "../components/table/table.component";

describe("SubdivisionDataDisplayComponent", () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let subDivisionApiService: jasmine.SpyObj<SubDivisionApiService>;
  const mockSubdivisions: { subdivisions: ISubdivision[] } =
    SubdivisionsMockData;

  beforeEach(async () => {
    const subdivisionApiServiceSpy = jasmine.createSpyObj(
      "SubDivisionApiService",
      ["getSubDivisionsData"]
    );
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubdivisionDataDisplayComponent, TableComponent],
      providers: [
        { provide: SubDivisionApiService, useValue: subdivisionApiServiceSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    subDivisionApiService = TestBed.inject(
      SubDivisionApiService
    ) as jasmine.SpyObj<SubDivisionApiService>;
    subDivisionApiService.getSubDivisionsData.and.returnValue(
      of(mockSubdivisions)
    );
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch records on component initialization", () => {
    spyOn(component, "handleSortOrderChange");
    component.ngOnInit();
    expect(component.subDivisions.length).toEqual(66);
    expect(component.handleSortOrderChange).toHaveBeenCalledTimes(1);
    expect(component.totalRecords).toEqual(66);
    expect(component.totalPages).toEqual(3);
  });

  it("should apply filteration when filter value is changed", () => {
    component.filterBySubdivisionStatus({
      target: { value: SubdivisionStatusCodes.Future },
    });
    expect(component.filteredSubdivisions.length).toBe(22);
    expect(component.paginatedSubdivisions[0].id).toEqual(26951);
    // Change filter value
    component.filterBySubdivisionStatus({
      target: { value: SubdivisionStatusCodes.Active },
    });
    expect(component.filteredSubdivisions.length).toBe(22);
    expect(component.paginatedSubdivisions[0].id).toEqual(26952);
  });

  it("should display filtered records when selected value is 'All'", () => {
    component.filterBySubdivisionStatus({
      target: { value: SubdivisionStatusCodes.All },
    });
    expect(component.filteredSubdivisions.length).toBe(66);
    expect(component.paginatedSubdivisions[0].id).toEqual(26951);
  });

  it("should sort the data in ascending order", () => {
    component.currentPage = 1;
    component.pageSize = 25;
    component.handleSortOrderChange({
      columnKey: SubdivisionKeys.Name,
      sortDirection: SortDirection.Ascending,
    });

    expect(component.paginatedSubdivisions[0].id).toEqual(26951);
    expect(component.currentSortColumn).toEqual(SubdivisionKeys.Name);
  });

  it("should sort the data in descending order", () => {
    component.currentPage = 1;
    component.pageSize = 25;
    component.handleSortOrderChange({
      columnKey: SubdivisionKeys.Name,
      sortDirection: SortDirection.Descending,
    });

    expect(component.paginatedSubdivisions[0].id).toEqual(26952);
    expect(component.currentSortColumn).toEqual(SubdivisionKeys.Name);
  });

  it("should sort the data in ascending order for nearMapImageDate", () => {
    component.currentPage = 1;
    component.pageSize = 25;
    component.handleSortOrderChange({
      columnKey: SubdivisionKeys.NearMapImageDate,
      sortDirection: SortDirection.Ascending,
    });

    expect(component.paginatedSubdivisions[0].nearMapImageDate).toEqual(
      "2000-06-17T18:02:42.000Z"
    );
    expect(component.currentSortColumn).toEqual(
      SubdivisionKeys.NearMapImageDate
    );
  });

  it("should sort the data in descending order for nearMapImageDate", () => {
    component.currentPage = 1;
    component.pageSize = 25;
    component.handleSortOrderChange({
      columnKey: SubdivisionKeys.NearMapImageDate,
      sortDirection: SortDirection.Descending,
    });

    expect(component.paginatedSubdivisions[0].nearMapImageDate).toEqual(
      "2023-06-17T18:02:42.000Z"
    );
    expect(component.currentSortColumn).toEqual(
      SubdivisionKeys.NearMapImageDate
    );
  });

  it("should update pagination values on page size change", () => {
    component.totalRecords = mockSubdivisions.subdivisions.length;
    component.handlePageSizeChange(10);

    expect(component.currentPage).toEqual(1);
    expect(component.pageSize).toEqual(10);
    expect(component.totalPages).toEqual(7);
    expect(component.paginatedSubdivisions.length).toEqual(10);
  });

  it("should update pagination values on click of Next button", () => {
    component.totalRecords = mockSubdivisions.subdivisions.length;
    component.currentPage = 1;
    component.totalPages = 10;
    component.pageSize = 10;
    component.handlePageChange("next");

    expect(component.currentPage).toEqual(2);
    expect(component.paginatedSubdivisions.length).toEqual(10);
  });

  it("should update pagination values on click of Previous button", () => {
    component.totalRecords = mockSubdivisions.subdivisions.length;
    component.currentPage = 2;
    component.totalPages = 10;
    component.pageSize = 10;
    component.handlePageChange("previous");

    expect(component.currentPage).toEqual(1);
    expect(component.paginatedSubdivisions.length).toEqual(10);
  });
});
