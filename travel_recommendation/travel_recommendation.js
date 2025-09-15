function thankyou(){
        alert('Thank you for contacting us!')
    }


const btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener("click",searchLocation);

        function searchLocation() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let results = [];


      data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(input)) {
          results.push({
            name: country.name,
            description: `Country with ${country.cities.length} cities to explore`,
            imageUrl: country.cities[0]?.imageUrl || ""
          });
        }


        country.cities.forEach(city => {
          if (
            city.name.toLowerCase().includes(input) ||
            city.description.toLowerCase().includes(input)
          ) {
            results.push(city);
          }
        });
      });

      data.temples.forEach(temple => {
        if (
          temple.name.toLowerCase().includes(input) ||
          temple.description.toLowerCase().includes(input) ||
          input.includes("temple")
        ) {
          results.push(temple);
        }
      });

      data.beaches.forEach(beach => {
        if (
          beach.name.toLowerCase().includes(input) ||
          beach.description.toLowerCase().includes(input) ||
          input.includes("beach")
        ) {
          results.push(beach);
        }
      });

      if (results.length > 0) {
        results.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('result-item');
          div.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}" style="max-width:200px;">
            <p>${item.description || ''}</p>
          `;
          resultDiv.appendChild(div);
        });
      } else {
        resultDiv.innerHTML = `<p>No results found for "${input}".</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      resultDiv.innerHTML = "<p>There was an error loading results.</p>";
    });
}

const btnReset = document.getElementById('btnReset');
btnReset.addEventListener("click", () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('result').innerHTML = '';
});
