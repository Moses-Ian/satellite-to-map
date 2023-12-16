const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const inputElement = document.getElementById('file');
const uploadImageElement = document.getElementById('satelliteImage');

function handleSubmit(event) {
	event.preventDefault();
	
	const form = event.currentTarget;
  const myFile = inputElement.files[0];
	
	var reader = new FileReader();
  reader.onload = () =>
    uploadImageElement.src = reader.result;

  reader.readAsDataURL(myFile);	
	
	setTimeout(predict, 1000);
}