export const parseInttoStr = (num: string) => {
	return num == null ? "0" : parseInt(num).toLocaleString();
};

export const getLocationPath = (request?: Request) => {
	const basepath = import.meta.env.BASE_URL;
	// console.log(basepath);
	const path = request ? new URL(request.url).pathname : location.pathname;
	// console.log(path);
	// pathからbasepathを取り除く 先頭に/を付ける
	return path.replace(basepath, "/");
};
