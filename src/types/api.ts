export interface ApiResponse {
  success: boolean;
  data?: unknown;
  code?: string;
  messages: string[];
}

export interface ErrorResponse extends ApiResponse {
  success: false;
  code: string;
  messages: string[];
}

export interface SuccessResponse extends ApiResponse {
  success: true;
  data: unknown;
  messages: string[];
}
