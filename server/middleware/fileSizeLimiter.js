const MB = 5; // 5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
	const file = req.files.file;
	
	const filesOverLimit = [];
	
	if (file.size > FILE_SIZE_LIMIT) {
		const message = `Upload failed. ${file.name} is over the file size limit of ${MB} MB!`;
		return res.status(413).json({ status: 'error', message });
	}
	
	next();
}

module.exports = fileSizeLimiter;