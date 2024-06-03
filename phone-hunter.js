console.log('phone hunter js connected')

function loadPhoneHunter(inputText, dataLimit) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    .then(res => res.json())
    .then(data => displayPhoneHunter(data.data, dataLimit))
}

function displayPhoneHunter(data, dataLimit) {
  const phoneConatiner = document.getElementById('phone-container');
  phoneConatiner.textContent = '';
  //display 10 phones
  const showMoreField = document.getElementById('show-more');
  if(dataLimit && data.length > 10){
    data = data.slice(0, 10);
    showMoreField.classList.remove('d-none');
  }
  else{
    showMoreField.classList.add('d-none');
  }

  //if no phone found
  const noPhoneMessageField = document.getElementById('no-phone');
  if (data.length === 0) {
    noPhoneMessageField.classList.remove('d-none');
  }
  else {
    noPhoneMessageField.classList.add('d-none');
  }

  //display all phones
  for (phone of data) {
    // console.log(phone)
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="card">
      <img src="${phone.image}" class="card-img-top w-50 p-3 " alt="...">
      <div class="card-body">
        <h5 class="card-title">Brand: ${phone.brand}</h5>
        <p class="card-text">phone_name: ${phone.phone_name}</p>
        <p class="card-text">slug: ${phone.slug}</p>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadButtonDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDatailsModal">Datails</button>
      </div>
    </div>
    `
    phoneConatiner.appendChild(phoneDiv);
  }
  toggleSpinner(false);
}

function processSearch(dataLimit){
  toggleSpinner(true);
  const inputField = document.getElementById('search-field');
  const inputText = inputField.value;
  loadPhoneHunter(inputText, dataLimit);
}

// handle serach button
document.getElementById('btn-search').addEventListener('click', function () {
  //start loader
  processSearch(10);

})

// enter key serach handler
document.getElementById('search-field').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    console.log('Enter key pressed!');
    processSearch(10);
  }
});


// spinner/ loading icon showing method
function toggleSpinner(isLoading) {
  const loaderField = document.getElementById('loader');
  if (isLoading) {
    loaderField.classList.remove('d-none')
  }
  else {
    loaderField.classList.add('d-none')
  }
}

document.getElementById('show-more-btn').addEventListener('click',function(){
  processSearch();
})

// loadPhoneHunter();

// function for loadButtonDetails
function loadButtonDetails(id){
   fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   .then(res => res.json())
   .then(data => dispalyPhoneDetails(data.data))
}

function dispalyPhoneDetails(phone){
  console.log(phone)
  const modalTittle = document.getElementById('phoneDatailsModalLabel');
  modalTittle.innerText = phone.name;
  const modalRelease = document.getElementById('releaseDate');
  modalRelease.innerText = phone.releaseDate;
  const modalmainFeatures  = document.getElementById('mainFeatures');
  modalmainFeatures.innerText = phone.mainFeatures.chipSet;
}
