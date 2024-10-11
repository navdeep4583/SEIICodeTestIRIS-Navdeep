import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { ISubdivision } from "src/app/constants/constants";

@Injectable({
  providedIn: "root",
})
export class SubDivisionApiService {
  private baseUrl: string = `http://localhost:3000/v1`;

  constructor(private http: HttpClient) {}

  getSubDivisionsData(): Observable<{ subdivisions: ISubdivision[] }> {
    return this.http.get<{ subdivisions: ISubdivision[] }>(
      `${this.baseUrl}/subdivisions`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(`Error while fetching data for sub divisions: ${error.message}`));
      })
    );
  }
}
