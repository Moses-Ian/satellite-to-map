const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
	const form = event.currentTarget;
  const url = new URL(form.action);
	const myFile = document.getElementById('file').files[0];
	let formData = new FormData(form);
	formData.append(myFile.name, myFile);
	
  fetch(url, {
		method: "post",
		body: formData
	});
	
	event.preventDefault();
	setTimeout(() => {
		window.location.href = '/';
	}, 1000);
}