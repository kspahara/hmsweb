const basepath = import.meta.env.BASE_URL;

export const formatDate = (date: string, div: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return year + div + month + div + day;
};

/**
 * parseInttoStr
 * @param num
 * @returns
 */
export const parseInttoStr = (num: string): string => {
  return num == null ? "0" : parseInt(num).toLocaleString();
};

/**
 * getLocationPath
 * @param request
 * @returns
 */
export const getLocationPath = (request?: Request): string => {
  // requestがあればrequest.urlからpathを取得、なければlocation.pathnameを取得
  const path = request ? new URL(request.url).pathname : location.pathname;
  // pathからbasepathを取り除く 先頭に/を付ける
  return path.replace(basepath, "/");
};

/**
 *
 * @param params
 * @returns
 */
export const createQueryParams = async (params: Record<string, string>): Promise<string> => {
  return Object.entries(params)
    .filter(([key, value]) => key && value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
};

/**
 *
 * @param response
 * @returns
 */
export const handleResponse = async (response: Response) => {
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  if (!data) throw new Error("Not Found");

  return data;
};
