

//Creat user js
const form = document.getElementById('userinfo');

// Add an event listener to the form for the submit event
form.addEventListener('submit', async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();


  // Serialize the form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData)


  fetch('/creatuser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)

  }).then((response) => {
    if (response.status == 400) {
      alert('User already exists:');
    }
    if (response.status == 201) {
      alert('New user created ');
    }
    if (response.status == 403) {
      alert('Wrong data entry, Phone no must be 10 digit and no space');
    }
  })

});

//end
