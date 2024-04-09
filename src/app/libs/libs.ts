const basepath = import.meta.env.BASE_URL;

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
