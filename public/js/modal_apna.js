


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
      window.location.reload()
    }
    if (response.status == 403) {
      alert('Wrong data entry, Phone no must be 10 digit and no space');
    }
  })
  
});

//end
//approve user js
function approving_user(uid,cuid){
  
  fetch('/approving', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       'id': uid,
       'curid':cuid
    }) 

  }).then((response) => {
    if (response.status == 202) {
      alert('User Approved!!');
      location.reload();
    }
    
    if (response.status == 400) {
      alert('bad connection');
    }
  })
}

//end
//delete user js
function delete_user(uid)
  {
  
    let person = prompt("Please type DELETE for Deleting user premanetly ","UNDELETE");
    if (person == 'DELETE' ) {

      fetch('/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'id': uid  })
      }).then((response) => {
          if (response.status == 202) {
            alert('User Deleted!!')
            location.reload();
          }
        })
      
     
    
    } else {

    alert('Cancel')
      
    }

  }
//end

//start_property
function Property_butten(uid)
  {
  alert(uid)
    
    } 

  
  //end