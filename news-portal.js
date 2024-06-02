console.log('news portal connected');

//category data load
fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data => displayNewsData(data.data.news_category))



//details data load using category
function diplayDetailsData(details) {
  for (detail of details) {
    console.log(detail);
    const detailNewsContainer = document.getElementById('detail-container');
  detailNewsContainer.innerHTML = ``;
  for(const detail of details){
    const detailNewsDiv = document.createElement('div');
    detailNewsDiv.innerHTML = `
    <div class="card mb-3 my-4 w-100">
    <div class="d-flex flex-row">
      <div class="col-md-2 p-2">
        <img src="${detail.thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="ms-4">
        <div class="card-body">
          <h3 class="card-title">${detail.title}</h3>
          <p class="card-text">${detail.details.slice(0,500)} ...</p>
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
}

// load news details
function loadDetailNews(id) {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => diplayDetailsData(data.data))
}

// display News Data category on top under navbar
function displayNewsData(newses) {
  const newsContainerDiv = document.getElementById('news-container');
  for (news of newses) {
    console.log(news);
    const newsDiv = document.createElement('li');
    newsDiv.classList.add('nav-item');
    newsDiv.innerHTML = `
        <a class="nav-link link-dark fs-5" aria-current="page" href="#" onclick="loadDetailNews('${news.category_id}')">${news.category_name}</a>
        `
    newsContainerDiv.appendChild(newsDiv);
  }
}



