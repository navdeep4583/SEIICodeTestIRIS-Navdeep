import { PaginationComponent } from "./pagination.component";
import { By } from "@angular/platform-browser";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PaginationComponent", () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pageSize = 25;
    component.currentPage = 1
    component.totalPages = 10;
    component.totalRecords = 250;
    component.pageSizeOptions = [25, 50, 100, 150];
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display total number of pages", () => {
    const rows = fixture.debugElement.queryAll(By.css(".row"));
    expect(rows[0].nativeElement.textContent).toContain("Page 1 of 10 page(s)");
  });

  it("should display previous and next buttons", () => {
    const paginationButtons = fixture.debugElement.queryAll(
      By.css(".page-link")
    );
    expect(paginationButtons[0].nativeElement.textContent).toContain(
      "Previous"
    );
    expect(paginationButtons[1].nativeElement.textContent).toContain("Next");
  });

  it("should call handlePage Change when Next is clicked", () => {
    spyOn(component.handlePageChange, "emit");
    const paginationButtons = fixture.nativeElement.querySelectorAll("a");
    /** "Next" button click */
    paginationButtons[1].click();
    fixture.detectChanges();
    expect(component.handlePageChange.emit).toHaveBeenCalledWith('next');
  });

  it("should call handlePage Change when Previous is clicked", () => {
    spyOn(component.handlePageChange, "emit");
    const paginationButtons = fixture.nativeElement.querySelectorAll("a");
    /** "Previous" button click */
    paginationButtons[0].click();
    fixture.detectChanges();
    expect(component.handlePageChange.emit).toHaveBeenCalledWith('previous');
  });

  it("should dispaly 'Records per page' dropdown", () => {
    spyOn(component.handlePageSizeChange, "emit");
    const recordsPerPageDropdown =
      fixture.nativeElement.querySelector("select");
    recordsPerPageDropdown.value = "100";
    const event = new Event("change");
    recordsPerPageDropdown.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.handlePageSizeChange.emit).toHaveBeenCalledWith(100);
  });
});
