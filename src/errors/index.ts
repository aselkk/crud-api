export const createError = (statusCode: number, message: string) => ({
  statusCode,
  message,
});

export const notFoundError = createError(404, 'Not Found');
export const invalidUserIdError = createError(400, 'Invalid userId');
export const userNotFoundError = createError(404, 'User not found');
export const missingFieldsError = createError(400, 'Please fill required fields');
