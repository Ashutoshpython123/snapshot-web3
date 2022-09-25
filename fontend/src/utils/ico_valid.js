export const checkImage = (file) => {
	let err = "";
	if (!file) return (err = "file does not exist");

	if (file.type !== "image/jpeg" && file.type !== "image/png")
		err = "image format is incorrect";
	return err;
};

export const checkPdf = (file) => {
	let err = "";
	if (!file) return (err = "File does not exist.");

	if (file.size > 1024 * 1024)
		err = "The largest image size is 1mb.";

	if (file.type !== "application/pdf") err = "file format must be pdf.";

	return err;
};

export const checkAbi = (file) => {
	let err = "";
	if (!file) return (err = "file does not exist");

	if (file.type !== "application/json")
		err = "file format must be json";
	return err;
};
