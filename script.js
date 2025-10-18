const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=id";

$(document).ready(function () {
  loadNews();

  $("#searchBtn").click(function () {
    const keyword = $("#searchInput").val();
    const category = $("#categoryFilter").val();
    loadNews(keyword, category);
  });

  $("#categoryFilter").change(function () {
    const keyword = $("#searchInput").val();
    const category = $("#categoryFilter").val();
    loadNews(keyword, category);
  });
});

function loadNews(keyword = "", category = "") {
  $("#newsContainer").html(`<div class="text-center"><p>Sedang memuat berita...</p></div>`);

  let url = BASE_URL + `&apiKey=${API_KEY}`;
  if (keyword) url += `&q=${encodeURIComponent(keyword)}`;
  if (category) url += `&category=${category}`;

  $.getJSON(url, function (data) {
    if (data.status === "ok" && data.articles.length > 0) {
      let html = "";
      data.articles.forEach(article => {
        html += `
        <div class="news-card">
          <img src="${article.urlToImage || 'https://via.placeholder.com/800x400'}" alt="Gambar Berita">
          <div class="content">
            <h5>${article.title}</h5>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank" class="btn btn-primary btn-sm">Baca Selengkapnya</a>
          </div>
        </div>
        `;
      });
      $("#newsContainer").html(html);
    } else {
      $("#newsContainer").html(`<div class="text-center"><p>Tidak ada berita ditemukan.</p></div>`);
    }
  }).fail(function () {
    $("#newsContainer").html(`<div class="text-center"><p>Gagal memuat berita. Coba lagi.</p></div>`);
  });
}
