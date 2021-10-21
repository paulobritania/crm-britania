export interface QueryResponse {
  totalRecords: number;
  totalPages: number;
  page: number;
  limit: number;
  data: Array<any>;
}

export interface QueryRequest {
  q?: string;
  select?: string;
  orderBy?: string;
  page?: number;
  attributes?: Array<string>;
  where?: string;
  order?: string;
  offset?: number;
  limit?: number;
}
