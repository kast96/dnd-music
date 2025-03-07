export const getFileNameFromPath = (path: string) => {
	var matchFileName = path.match(/([^\/\\]+)(?=\.\w+$)/);
	return decodeURIComponent(matchFileName ? matchFileName[0] : '<Без названия>')
}