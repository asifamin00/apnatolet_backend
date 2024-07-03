




document.getElementById('preloader').style.display = 'none';
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
function ageBuld(v) {
  // Get the current date
  const currentDate = new Date();

  // Get the input date
  const inputDate = new Date(document.getElementById('ageBulding').value);

  // Calculate the difference in days
  const differenceInDays = Math.ceil((currentDate - inputDate) / (1000 * 60 * 60 * 24 * 365));

  // Display the result
  if (differenceInDays > 2) {
    document.getElementById('result').innerHTML = (differenceInDays - 1) + `Years`;

  } else {
    document.getElementById('result').innerHTML = (differenceInDays - 1) + `Year`;

  }


}


//////////////////////selected photo display///////////////////////

// const fileInput = document.getElementById('files');

// const preview = document.getElementById('preview');


// fileInput.addEventListener('change', function () {

//   preview.innerHTML = '';
//   const files = this.files;
//   let lala = [];

//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     lala = file;
//     if (file) {
//       const reader = new FileReader();

//       reader.addEventListener('load', function () {
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

document.getElementById('file-input').addEventListener('change', function(event) {
  const fileList = document.getElementById('file-list');
  const sss=document.getElementById('file-input')
  fileList.innerHTML = '';

  let spl=fileList
  let rrr=document.getElementById('file-input')
 console.log(rrr.files.length)
  
  
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
      removeButton.textContent = 'x';
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



