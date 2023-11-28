export const isUUID = (str: string): boolean => {
  const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-[1-5][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
  return uuidRegex.test(str);
};