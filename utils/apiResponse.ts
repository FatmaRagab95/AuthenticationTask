export interface ApiResponse<T = any> {
  ok: boolean;
  body?: T;
  error?: any;
}

export const okResponse = (body?: any): ApiResponse => {
  return { ok: true, body };
};

export const errorResponse = (error?: any): ApiResponse => {
  if (typeof error === "string") {
    error = { message: error };
  } else if (error instanceof Error) {
    error = { message: error.message };
  } else if (error instanceof Object) {
    error = { error: JSON.stringify(error) };
  }
  return { ok: false, error };
};
