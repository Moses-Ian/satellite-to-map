const path = require('path');

const fileExtLimiter = (req, res, next) => {
		const file = req.files.file;
		const fileExtension = path.extname(file.name);
		
		if (fileExtension != '.png') {
			const message = `Upload failed. ${file.name} must have the correct extension! Only .png is allowed.`;
			return res.status(422).json({ status: 'error', message });
		}
		
		next();
	}

module.exports = fileExtLimiter;