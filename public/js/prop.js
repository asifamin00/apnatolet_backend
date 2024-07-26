//start_property
function setRadioButtonValue(name,value ) {
  // Get all radio buttons with the given name
  var radios = document.getElementsByName(name);
  
  // Loop through the radio buttons
  for (var i = 0; i < radios.length; i++) {
      if (radios[i].value === value) {
          // Set the checked property to true for the matching value
          radios[i].checked = true;
          break;  // Exit the loop once the value is set
      }
  }
}



const propForm = document.getElementById('prop_form');
document.getElementById('preloader').style.display = 'none';
////////////////////////////////
function handleChange(src) {
  if (src === 2) {
    document.querySelector("#Add_info_text").style.display = "none";

  } else {

    document.querySelector("#Add_info_text").style.display = "block";
  }

  ////////////////////////////////
}

function furwnishing(see) {
  if (see === 2) {
    document.querySelector("#furnishing").style.display = "block";

  } else {

    document.querySelector("#furnishing").style.display = "none";
  }

}

function residential() {
  document.querySelector("#PG_room").style.display = "none";
  document.querySelector("#Hostel").style.display = "none";
  document.querySelector("#Show_room").style.display = "none";
  document.querySelector("#Shop").style.display = "none";
  document.querySelector("#Flat_Apartment").style.display = "block";
  document.querySelector("#Independent_House_Villa").style.display = "block";
  document.querySelector("#Studio_Apartment").style.display = "block";
  document.querySelector("#Serviced_Apartment").style.display = "block";
  document.querySelector("#Tell_us_about_your_property").style.display = "block";
  document.querySelector("#otherRooms").style.display = "block";

  document.querySelector("#Amenities_for_Commercial_ntt").style.display = "none";
  document.querySelector("#Amenities_for_residential_ntt").style.display = "block";
  document.querySelector("#total_property").style.display = "block";
}

function commercial(){
  document.querySelector("#Flat_Apartment").style.display = "none";
  document.querySelector("#Independent_House_Villa").style.display = "none";
  document.querySelector("#Studio_Apartment").style.display = "none";
  document.querySelector("#Serviced_Apartment").style.display = "none";
  document.querySelector("#PG_room").style.display = "block";
  document.querySelector("#Hostel").style.display = "block";
  document.querySelector("#Show_room").style.display = "block";
  document.querySelector("#Shop").style.display = "block";

  document.querySelector("#Tell_us_about_your_property").style.display = "none";
  document.querySelector("#otherRooms").style.display = "none";

  document.querySelector("#Amenities_for_Commercial_ntt").style.display = "block";
  document.querySelector("#Amenities_for_residential_ntt").style.display = "none";
  document.querySelector("#total_property").style.display = "block";


}
////////////////////////////////////
function ageBuld(v){
// Get the current date
const currentDate = new Date();

// Get the input date
const inputDate = new Date(document.getElementById('ageBulding').value);

// Calculate the difference in days
const differenceInDays = Math.ceil((currentDate - inputDate) / (1000 * 60 * 60 * 24 * 365));

// Display the result
if (differenceInDays > 2) {
  document.getElementById('result').innerHTML = (differenceInDays -1) +`Years` ;
  
} else {
  document.getElementById('result').innerHTML = (differenceInDays -1) +`Year` ;
  
}


}

function photodiv(){

photoParh=document.getElementById('photo').value
console.log(photoParh)


}
//////////////////////selected photo display///////////////////////

// const fileInput = document.getElementById('files');
	
// const preview = document.getElementById('preview');


// fileInput.addEventListener('change', function() {

//   preview.innerHTML = '';
//   const files = this.files;
//   let lala=[];

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     lala=file;
//     if (file) {
//       const reader = new FileReader();

//       reader.addEventListener('load', function() {
//         const image = new Image();
//         image.src = this.result;

//         const previewImage = document.createElement('div');
//         previewImage.classList.add('preview-image');
//         previewImage.appendChild(image);
        
//         preview.appendChild(previewImage);
  
  
//       });

//       reader.readAsDataURL(file);
//     }

//   }

 
// });



////////////////////////////////




propForm.addEventListener('submit', (e) => {

  e.preventDefault();

 
    document.getElementById('preloader').style.display = 'block';

  
   const prop_kind=document.querySelector('input[name="kind_of_prop"]:checked').value
   
   const prop_type=document.querySelector('input[name="prop_type"]:checked').value

   const Add_info_radio=document.querySelector('input[name="Add_info_radio"]:checked').value
   const Add_info_text=document.getElementById('Add_info_text').value
   const deposit=document.getElementById('deposit').value

   if(prop_type === 'prop_none'){
    alert('Property Type must be Selected')
    document.getElementById('preloader').style.display = 'none';
    // window.location.replace("/prop_con");
    return
   }

   

  //  const City=document.querySelector('input[name="City"]:selected').value

   const Bedrooms=document.querySelector('input[name="Bedrooms"]:checked').value
   const Bathrooms=document.querySelector('input[name="Bathrooms"]:checked').value
   const Balconies=document.querySelector('input[name="Balconies"]:checked').value
   const Furnishing=document.querySelector('input[name="FullyFurnishrd"]:checked').value
   const Coveredparking=document.querySelector('input[name="Covered_parking"]:checked').value
   const openparking=document.querySelector('input[name="Open_parking"]:checked').value
   const Facing =document.querySelector('input[name="Facing"]:checked').value
   const user_id=document.getElementById('user_id').value
   const House_no=document.getElementById('House_no').value
   const Society=document.getElementById('Society').value
   const Locality=document.getElementById('Locality').value
   const Pin_code=document.getElementById('Pin_code').value
  const City=document.getElementById('City').value
   const Latitude=document.getElementById('Latitude').value
   const Longitude=document.getElementById('Longitude').value
   const Bult_up_Area=document.getElementById('Bult_up_Area').value
   const Total_floor=document.getElementById('Total_floor').value
   const Property_on_floor=document.getElementById('Property_on_floor').value
   const ageBulding=document.getElementById('ageBulding').value
   const Available=document.getElementById('Available').value 
  //  const add_info=document.getElementById('otherval').value
   const rent=document.getElementById('rent').value

   //console.log(prop_kind,prop_type,Bedrooms,Bathrooms,Balconies,Furnishing,Coveredparking,openparking,Facing,House_no,Society,Locality,Pin_code,City,Latitude,Longitude,Total_floor,Property_on_floor,ageBulding,Available,Bult_up_Area)
  
   let furnicheckbox=[]
   let checkbox_furni=document.getElementsByName('furnishing_item[]')
   for (let i = 0; i < checkbox_furni.length; i++) {
    if(checkbox_furni[i].checked){
        furnicheckbox.push(checkbox_furni[i].value)
    }    
   }
let furnicheckbox1=JSON.stringify(furnicheckbox)
   let otherRoom=[]
   let checkbox_otrm=document.getElementsByName('Other_Rooms[]')
   for (let i = 0; i < checkbox_otrm.length; i++) {
    if(checkbox_otrm[i].checked){
        otherRoom.push(checkbox_otrm[i].value)
    }    
   }
let otherRoom1=JSON.stringify(otherRoom)

   let Willing=[]
   let checkbox_Willing=document.getElementsByName('Willing[]')
   for (let i = 0; i < checkbox_Willing.length; i++) {
    if(checkbox_Willing[i].checked){
        Willing.push(checkbox_Willing[i].value)
    }    
   }
    let Willing1=JSON.stringify(Willing)

   let amenities=[]
   let checkbox_amenities=document.getElementsByName('amenities[]')
   for (let i = 0; i < checkbox_amenities.length; i++) {
    if(checkbox_amenities[i].checked){
      amenities.push(checkbox_amenities[i].value)
    }    
   }
let amenities1=JSON.stringify(amenities)



    const formData = new FormData();
    
    formData.append("prop_kind", prop_kind);
   formData.append("prop_type", prop_type);
   formData.append("Bedrooms", Bedrooms);
   formData.append("Bathrooms", Bathrooms);
   formData.append("Balconies", Balconies);
   formData.append("Furnishing", Furnishing);
   formData.append("Coveredparking", Coveredparking);
   formData.append("openparking", openparking);
   formData.append("Facing", Facing);
    formData.append("House_no", House_no);
   formData.append("Society", Society);
   formData.append("Locality", Locality);
   formData.append("Pin_code", Pin_code);
   formData.append("City", City);
   formData.append("Latitude", Latitude);
   formData.append("Longitude", Longitude);
   formData.append("Bult_up_Area", Bult_up_Area);
   formData.append("Total_floor", Total_floor);
   formData.append("Property_on_floor", Property_on_floor);
   formData.append("ageBulding",ageBulding);
    formData.append("Available",Available);
    formData.append("furnicheckbox",furnicheckbox1);
    formData.append("otherRoom",otherRoom1);
    formData.append("Willing", Willing1);
    formData.append("amenities", amenities1);
    // formData.append("add_info", add_info);
    formData.append("rent", rent);
    formData.append("user_id", user_id);

    formData.append("Add_info_radio", Add_info_radio);
    formData.append("Add_info_text", Add_info_text);
    formData.append("deposit", deposit);

    const files = document.getElementById("file-input");
    // const formData = new FormData();
    // // Creates empty formData object
    //
    // Appends value of text input
    for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }
  const data = Object.fromEntries(formData)

   fetch('/newprop', {
    //headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
    body: formData
   }).then((res) => {

   
     
 

    if(res.status == 201){
    alert('created sussesfully')
    document.getElementById('preloader').style.display = 'none';
    window.location.replace("/prop_con");
    }

    console.log(res.status)
   })

   
   
  

  
   

});

function Prop_apprv_pending(_id){

alert(_id)
}

document.getElementById('file-input').addEventListener('change', function(event) {
  const fileList = document.getElementById('file-list');
  fileList.innerHTML = '';
  
  Array.from(event.target.files).forEach((file, index) => {
      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');
      
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = file.name;
      img.id = 'hhjh';
      
      const fileName = document.createElement('span');
      fileName.textContent = file.name;
      
      const removeButton = document.createElement('button');
      removeButton.textContent = 'X';
      removeButton.classList.add('remove-btn');
      removeButton.addEventListener('click', () => {
          removeFile(index);
      });
      
      fileItem.appendChild(img);
      // fileItem.appendChild(fileName);
      fileItem.appendChild(removeButton);
      fileList.appendChild(fileItem);
  });
});

function removeFile(index) {
  const fileInput = document.getElementById('file-input');
  const dt = new DataTransfer();
  
  Array.from(fileInput.files).forEach((file, i) => {
      if (index !== i) {
          dt.items.add(file);
      }
  });
  
  fileInput.files = dt.files;
  document.getElementById('file-input').dispatchEvent(new Event('change'));
}






//end
