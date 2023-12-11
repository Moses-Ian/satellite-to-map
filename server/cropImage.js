const sharp = require('sharp')

// this is now a promise
const cropImage = async () => {
	await sharp('./public/uploads/image.png')
    .extract({ left: 0, top: 0, width: 255, height: 255 })
    .toFile('./public/uploads/image2.png', function (err) {
        if (err) console.log(err);
    });
}

module.exports = cropImage;