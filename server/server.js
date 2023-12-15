const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cropImage = require('./cropImage');
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

// make the server
const app = express();
const PORT = process.env.PORT || 3001;
const FIVE_MINUTES = 5 * 60 * 1000;

// helpful methods
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

// the model
const handler = tfn.io.fileSystem("./path/to/your/model.json");
const model = tf.loadLayersModel(handler);





app.post('/upload', 
	fileUpload({ createParentPath: true }),
	filePayloadExists,
	fileExtLimiter,
	fileSizeLimiter,
	(req, res) => {
		console.log('upload');
		// get the file object
		const file = req.files.file;
		
		// save it the folder
		const filepath = path.join(__dirname, 'public/uploads', file.name);
		file.mv(path.join(__dirname, 'public/uploads', 'image.png'))
			.then(() => cropImage())
			//.then(() => predict())
			.then(() => console.log('got here'));
		
		console.log(model.summary());
		
		return;
	}
);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`),
);