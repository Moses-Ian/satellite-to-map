const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cropImage = require('./cropImage');
const app = express();
const PORT = process.env.PORT || 3001;
const FIVE_MINUTES = 5 * 60 * 1000;

const handleError = (err, res) => {
	console.log(err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const deleteFiles = () => {
	fs.unlink(path.join(__dirname, 'public/uploads', 'image.png'), () => {});
	fs.unlink(path.join(__dirname, 'public/uploads', 'image2.png'), () => {});
}

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// custom middleware
const filePayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

app.post('/upload', 
	fileUpload({ createParentPath: true }),
	filePayloadExists,
	fileExtLimiter,
	fileSizeLimiter,
	(req, res) => {
		// get the file object
		const file = req.files.file;
		
		// save it the folder
		const filepath = path.join(__dirname, 'public/uploads', file.name);
		file.mv(path.join(__dirname, 'public/uploads', 'image.png'), err => {
			if (err) 
				return res.status(500).json({ status: 'error', message: err });
			cropImage();
			setTimeout(deleteFiles, FIVE_MINUTES);
		})
		
		return;
		//return res.json({ status: 'success', message: file.name });
	}
);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`),
);