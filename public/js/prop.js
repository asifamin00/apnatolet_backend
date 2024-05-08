//start_property
const propForm = document.getElementById('prop_form');
document.getElementById('preloader').style.display = 'none';
////////////////////////////////
function handleChange(src) {
  if (src === 2) {
    document.querySelector("#otherval").style.display = "none";

  } else {

    document.querySelector("#otherval").style.display = "block";
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

const fileInput = document.getElementById('files');
	
const preview = document.getElementById('preview');


fileInput.addEventListener('change', function() {

  preview.innerHTML = '';
  const files = this.files;
  let lala=[];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    lala=file;
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function() {
        const image = new Image();
        image.src = this.result;

        const previewImage = document.createElement('div');
        previewImage.classList.add('preview-image');
        previewImage.appendChild(image);
        
        preview.appendChild(previewImage);
  
  
      });

      reader.readAsDataURL(file);
    }

  }

 
});



////////////////////////////////




propForm.addEventListener('submit', (e) => {

  e.preventDefault();

 
    document.getElementById('preloader').style.display = 'block';

  
   const prop_kind=document.querySelector('input[name="kind_of_prop"]:checked').value
   const prop_type=document.querySelector('input[name="prop_type"]:checked').value

   const Bedrooms=document.querySelector('input[name="Bedrooms"]:checked').value
   const Bathrooms=document.querySelector('input[name="Bathrooms"]:checked').value
   const Balconies=document.querySelector('input[name="Balconies"]:checked').value
   const Furnishing=document.querySelector('input[name="FullyFurnishrd"]:checked').value
   const Coveredparking=document.querySelector('input[name="Covered_parking"]:checked').value
   const openparking=document.querySelector('input[name="Open_parking"]:checked').value
   const Facing =document.querySelector('input[name="Facing"]:checked').value

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
   const add_info=document.getElementById('otherval').value

   //console.log(prop_kind,prop_type,Bedrooms,Bathrooms,Balconies,Furnishing,Coveredparking,openparking,Facing,House_no,Society,Locality,Pin_code,City,Latitude,Longitude,Total_floor,Property_on_floor,ageBulding,Available,Bult_up_Area)
  
   let furnicheckbox=[]
   let checkbox_furni=document.getElementsByName('furnishing_item[]')
   for (let i = 0; i < checkbox_furni.length; i++) {
    if(checkbox_furni[i].checked){
        furnicheckbox.push(checkbox_furni[i].value)
    }    
   }

   let otherRoom=[]
   let checkbox_otrm=document.getElementsByName('Other_Rooms[]')
   for (let i = 0; i < checkbox_otrm.length; i++) {
    if(checkbox_otrm[i].checked){
        otherRoom.push(checkbox_otrm[i].value)
    }    
   }


   let Willing=[]
   let checkbox_Willing=document.getElementsByName('Willing[]')
   for (let i = 0; i < checkbox_Willing.length; i++) {
    if(checkbox_Willing[i].checked){
        Willing.push(checkbox_Willing[i].value)
    }    
   }

   let amenities=[]
   let checkbox_amenities=document.getElementsByName('amenities[]')
   for (let i = 0; i < checkbox_amenities.length; i++) {
    if(checkbox_amenities[i].checked){
      amenities.push(checkbox_amenities[i].value)
    }    
   }




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
    formData.append("furnicheckbox",furnicheckbox);
    formData.append("otherRoom",otherRoom);
    formData.append("Willing", Willing);
    formData.append("amenities", amenities);
    formData.append("add_info", add_info);

    const files = document.getElementById("files");
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

   
      document.getElementById('preloader').style.display = 'none';
 

    if(res.status == 201){
    
    }

    console.log(res.status)
   })
   
   
  

  
   

});


//end
