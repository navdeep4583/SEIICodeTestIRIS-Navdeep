import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { SubDivisionApiService } from "./subdivision.service";
import { ISubdivision } from "../constants/constants";
import { SubdivisionsMockData } from "../mocks/subDivisionsMocks";
import { of } from "rxjs";

describe("SubDivisionApiService", () => {
  let service: SubDivisionApiService;
  let httpMock: HttpTestingController;

  const mockSubdivisions: { subdivisions: ISubdivision[] } =
    SubdivisionsMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubDivisionApiService],
    });

    service = TestBed.inject(SubDivisionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch subdivisions data from subdivisions API", () => {
    service.getSubDivisionsData().subscribe((subdivisions) => {
      expect(subdivisions).toEqual(mockSubdivisions);
    });

    const apiUrl = 'http://localhost:3000/v1/subdivisions';

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubdivisions);
  });

  it("should throw error on API error", () => {
    spyOn(service["http"], 'get').and.returnValue(of(new Error("server error")));
    service.getSubDivisionsData().subscribe((subdivisions: any) => {
      expect(subdivisions).toEqual(new Error("server error"));
    });
  });
});
