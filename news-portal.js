console.log('news portal connected');

//1. category data load
fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data => displayNewsData(data.data.news_category))

//5.functionality for spinner/loadeing animation
function toggleSpinner(isLoading) {
  const spinnerField = document.getElementById('loader');
  if (isLoading) {
    spinnerField.classList.remove('d-none');
  }
  else {
    spinnerField.classList.add('d-none');
  }
}

// 6.load more more details with modal
function loadMoreDetails(id) {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => displayMoreMoreData(data.data[0]))
}

// 7.display more more data
function displayMoreMoreData(moreNews) {
  console.log(moreNews)
  // add modal tittle
  const titleField = document.getElementById('title');
  titleField.innerHTML = '';
  const h1 = document.createElement('h1');
  h1.classList.add('modal-title', 'fs-5');
  h1.setAttribute('id', 'exampleModalLabel');
  h1.innerText = moreNews.title;
  titleField.appendChild(h1);

  //  add a moodal thumb
  const thumbField = document.getElementById('modal-thumb');
  thumbField.innerHTML = ''; // Clear previous content
  const img = document.createElement('img');
  img.src = moreNews.thumbnail_url;
  img.classList.add('img-fluid'); // Add a class to make the image responsive
  thumbField.appendChild(img);

  // add modal description
  const descriptionField = document.getElementById('modal-des');
  descriptionField.innerHTML = '';
  const p = document.createElement('p');
  p.classList.add('fs-4')
  p.innerText = moreNews.details;
  descriptionField.appendChild(p);

}

//4.details data load using category
function diplayDetailsData(details) {
  const detailNewsContainer = document.getElementById('detail-container');
  detailNewsContainer.innerHTML = ``;
  // no news found message method
  const noNewsMessageField = document.getElementById('no-news');
  if (details.length === 0) {
    noNewsMessageField.classList.remove('d-none')
  }
  else {
    noNewsMessageField.classList.add('d-none')
    for (const detail of details) {
      const detailNewsDiv = document.createElement('div');
      detailNewsDiv.innerHTML = `
    <div class="card mb-3 my-4 w-100">
    <div class="d-flex flex-row">
      <div class="col-md-2 p-2">
        <img src="${detail.thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div>
        <div class="card-body">
          <h3 class="card-title">${detail.title}</h3>
          <p class="card-text">${detail.details.slice(0, 500)} <a class="link-primary" src=" " onclick="loadMoreDetails('${detail._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</a></p>
          <p class="card-text"><small class="text-muted">Total View: ${detail.total_view}</small></p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
    `
      detailNewsContainer.appendChild(detailNewsDiv);
    }
  }
  // stoping spinner here
  toggleSpinner(false);
}


// 3. load news details
function loadDetailNews(id) {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => diplayDetailsData(data.data))
  //staring spinner here
  toggleSpinner(true);

}

//2. display News Data category on top under navbar
function displayNewsData(newses) {
  const newsContainerDiv = document.getElementById('news-container');
  for (news of newses) {
    console.log(news);
    const newsDiv = document.createElement('li');
    newsDiv.classList.add('nav-item');
    newsDiv.innerHTML = `
    <a id="link" class="nav-link link-dark fs-5" aria-current="page" href="#" onclick="loadDetailNews('${news.category_id}')" style="text-decoration: none; color: black;" onmouseover="this.style.color='blue'; this.style.textDecoration='underline';" onmouseout="this.style.color='black'; this.style.textDecoration='none';">${news.category_name}</a>

    `
    newsContainerDiv.appendChild(newsDiv);
  }
}

loadDetailNews('01');