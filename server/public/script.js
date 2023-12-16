const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
const inputElement = document.getElementById('file');
const satelliteImageElement = document.getElementById('satelliteImage');

function handleSubmit(event) {
	event.preventDefault();
	
	const form = event.currentTarget;
  const myFile = inputElement.files[0];
	
	var reader = new FileReader();
  reader.onload = () =>
    satelliteImageElement.src = reader.result;

  reader.readAsDataURL(myFile);	
	
	
}