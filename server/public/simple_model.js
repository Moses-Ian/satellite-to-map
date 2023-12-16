let model;
let canvas = document.getElementById('mapImage');

let loadModel = async () => {
	model = await tf.loadLayersModel('./2 rounds/model.json');
}

let preProcess = () => {
	// get the image
	const image = document.getElementById('image');
	
	// turn it into a tensor
	let imageTensor = tf.browser.fromPixels(image);
	
	// crop it to 255x255
	//imageTensor = imageTensor.slice([0, 0, 0], [256, 256, 3]);
	imageTensor = imageTensor.slice([0, 0, 0], [128, 128, 3]);
	
	// normalize the data
	const offset = tf.scalar(127.5);
	const one = tf.scalar(1);
	imageTensor = imageTensor.div(offset).sub(one);
	
	// turn it into a batch
	imageTensor = imageTensor.expandDims(0);
	
	return imageTensor;
}

loadModel()
	.then(() => {
		const imageTensor = preProcess();
		
		let result = model.predict(imageTensor);
		result = tf.squeeze(result);

		tf.browser.toPixels(result, canvas);
	});