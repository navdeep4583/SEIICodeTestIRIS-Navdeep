export interface ITableColumn {
  dataKey: string;
  header: string;
}

export interface ISubdivision {
  id: number;
  code: string;
  name: string;
  longitude: number;
  latitude: number;
  fieldSurveyTerritoryId: number;
  marketId: number;
  subdivisionStatusId: number;
  surveyMethodId: number;
  activeSections: number;
  futureSections: number;
  builtOutSections: number;
  totalLots: number;
  fieldSurveyTerritoryName: string;
  marketName: string;
  marketAbbreviation: string;
  subdivisionStatusCode: string;
  surveyMethodCode: string;
  county: string;
  community: string | null;
  zoom17Date: string | null;
  zoom18Date: string | null;
  subdivisionGeometryId: number | null;
  subdivisionGeometryBoundingBoxId: number | null;
  subdivisionGeometryBoundaryId: number | null;
  subdivisionGeometryIntelligenceBoundaryId: number | null;
  subdivisionGeometryIntelligenceBoundaryStatusId: number;
  subdivisionGeometryIntelligenceBoundaryStatusCode: string;
  subdivisionGeometryIntelligenceBoundaryStatusChangeDate: string;
  nearMapImageDate: string | null;
  imageBoxId: number;
  mostRecentIPointBatchDate: string | null;
  iPoints: string | null;
  validatediPoints: string | null;
  subdivisionSpecificStatus: string;
}

export interface IColumnSortDirection {
  [key: string]: SortDirection;
}

export enum SubdivisionKeys {
  Name = "name",
  Code = "code",
  SubdivisionStatusCode = "subdivisionStatusCode",
  MarketName = "marketName",
  SurveyMethodCode = "surveyMethodCode",
  NearMapImageDate = "nearMapImageDate",
}

export enum SortDirection {
  Ascending = "asc",
  Descending = "desc",
}

export enum SubdivisionStatusCodes {
  All = "All",
  Active = "Active",
  Future = "Future",
  Builtout = "Builtout",
}

export enum SubdivisionHeaders {
  Name = "Subdivision Name",
  Code = "Code",
  SubdivisionStatusCode = "ISubdivision Status Code",
  MarketName = "Market Name",
  SurveyMethodCode = "Survey Method Code",
  NearMapImageDate = "NearMap Image Date",
}

export const SubdivisionColumns: ITableColumn[] = [
  { dataKey: SubdivisionKeys.Name, header: SubdivisionHeaders.Name },
  { dataKey: SubdivisionKeys.Code, header: SubdivisionHeaders.Code },
  {
    dataKey: SubdivisionKeys.SubdivisionStatusCode,
    header: SubdivisionHeaders.SubdivisionStatusCode,
  },
  {
    dataKey: SubdivisionKeys.MarketName,
    header: SubdivisionHeaders.MarketName,
  },
  {
    dataKey: SubdivisionKeys.SurveyMethodCode,
    header: SubdivisionHeaders.SurveyMethodCode,
  },
  {
    dataKey: SubdivisionKeys.NearMapImageDate,
    header: SubdivisionHeaders.NearMapImageDate,
  },
];
