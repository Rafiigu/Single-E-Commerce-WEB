export const constructEndpoint = (endpoint: string) =>
  `${process.env.API_URL}/${endpoint}`;
