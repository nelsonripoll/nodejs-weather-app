document.querySelector('#weatherForm').addEventListener('submit', (e) => {
  e.preventDefault();

  var loc = document.querySelector('#location');

  fetch('/weather?location=' + loc.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.querySelector('#output').textContent = data.error;
      } else {
        document.querySelector('#output').textContent = data.location + "\n" + data.weather.description;
      }
    });
  });
});
