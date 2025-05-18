const apiKey = "57c18d7d"; // Ganti dengan API key kamu

function searchMovie() {
  const title = document.getElementById("searchInput").value;
  const resultDiv = document.getElementById("result");

  if (!title) {
    resultDiv.innerHTML = "<p>Please enter a movie title.</p>";
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        resultDiv.innerHTML = `
          <div class="movie-card">
            <h2>${data.Title}</h2>
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
            <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200x300?text=No+Image"}" alt="Poster">
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<p>Movie not found!</p>`;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error fetching data. Please try again.</p>`;
      console.error(error);
    });
}
