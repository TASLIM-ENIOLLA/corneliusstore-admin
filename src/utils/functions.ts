export function concatURL(relativeUrl: string, baseUrl?: string): string {
  const actualBaseURL = baseUrl || process.env.DOMAIN;

  const baseURL = new URL(actualBaseURL);
  const combinedURL = new URL(relativeUrl, baseURL);

  return combinedURL.href;
}

type ConcatURLType = (relativeURL: string, baseURL?: string) => string