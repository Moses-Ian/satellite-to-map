let model;
let canvas = document.getElementById('mapImage');
let satelliteImageElement = document.getElementById('satelliteImage')
const offset = tf.scalar(127.5);
const one = tf.scalar(1.0);


let loadModel = async () => {
	//tf.setBackend('cpu');
	model = await tf.loadLayersModel('./2 rounds cpu/model.json');
	//model = await tf.loadLayersModel('./2 rounds/model.json');
	//model = await tf.loadLayersModel('./2 rounds t4/model.json');
	console.log('done loading');
	console.log(tf.getBackend());
}

let preProcess = () => {
	// turn it into a tensor
	let imageTensor = tf.browser.fromPixels(satelliteImageElement);
	
	// crop it to 255x255
	imageTensor = imageTensor.slice([0, 0, 0], [256, 256, 3]);
	
	// normalize the data
	imageTensor = imageTensor.div(offset).sub(one);
	
	// turn it into a batch
	imageTensor = imageTensor.expandDims(0);
	
	return imageTensor;
}

let predict = async () => {
	// preprocess
	const imageTensor = await preProcess();
	
	// make the prediction
	let output = model.predict(imageTensor)
	output.data()
		.then(d => console.log(d));
	
	output = tf.squeeze(output);
	//console.log(output);
	
	// convert it back to integers
	output = output.add(one).mul(offset).cast('int32');
	
	// paste it onto the canvas
	tf.browser.toPixels(output, canvas);
}

loadModel();


