




//end

// const user_table=document.getElementById('user_table')
// const main_menu=document.getElementById('main_menu')
// const propperty_table=document.getElementById('propperty_table')
// const creat_user=document.getElementById('creat_user')
// const user_apv=document.getElementById('user_apv')
// const prop_apv=document.getElementById('prop_apv')

// const Dashboard_d=document.getElementById('Dashboard_d')
// const userinfo=document.getElementById('userinfo')
// const Enter_prop=document.getElementById('prop_form')





// window.addEventListener("load", (event) => {
//   Dashboard_d.style.display = "block"
//   userinfo.style.display = "none"
//   Enter_prop.style.display = "none"

//   prop_apv.style.display = "none"
//   user_apv.style.display = "none"
//   creat_user.style.display = "none"
//   propperty_table.style.display = "block"
//   user_table.style.display = "block"
  

 
 
  
// });

// main_menu.addEventListener("click",()=>{
//   prop_apv.style.display = "none"
//   user_apv.style.display = "none"
//   creat_user.style.display = "none"
//   propperty_table.style.display = "block"
//   user_table.style.display = "block"
//   Dashboard_d.style.display = "block"
//   userinfo.style.display = "none"
//   Enter_prop.style.display = "none"
  
// })

//   user_table.addEventListener("click",()=>{
//     main_menu.style.display = "block"
//     user_apv.style.display = "block"
//     creat_user.style.display = "block"
//     prop_apv.style.display = "none"
//     propperty_table.style.display = "none"
//     Dashboard_d.style.display = "none"
//     userinfo.style.display = "block"
//     Enter_prop.style.display = "none"
//   })


 
// propperty_table.addEventListener("click",()=>{
//   main_menu.style.display = "block"
//   user_apv.style.display = "none"
//   creat_user.style.display = "none"
//   user_table.style.display = "none"
//   prop_apv.style.display = "block"
//   propperty_table.style.display = "block"
//   Enter_prop.style.display = "block"
//   Dashboard_d.style.display = "none"
//   userinfo.style.display = "none"
// })

//Creat user js
const form = document.getElementById('creat_use');

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
function approving_user(uid, cuid) {

  fetch('/approving', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'id': uid,
      'curid': cuid
    })

  }).then((response) => {
    if (response.status == 202) {
      // alert('User Approved!!');
      location.reload();
       
    }

    if (response.status == 400) {
      alert('bad connection');
    }
  })
}

//end
//delete user js
function delete_user(uid) {

  let person = prompt("Please type DELETE for Deleting user premanetly ", "UNDELETE");
  if (person == 'DELETE') {

    fetch('/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'id': uid })
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
