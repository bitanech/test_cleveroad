let xhr = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();

// Location

let longitude, latitude;

function initMap() {
  var myLatLng = {lat: latitude, lng: longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
    });
}

function changeLocation(data) {
  let date = new Date(data.timestamp);

  document.querySelector('.coordinates-data').textContent = `longitude: ${data.iss_position.longitude}, latitude: ${data.iss_position.latitude}`;
  document.querySelector('.date-time').children[0].textContent = `${date.getUTCHours()}:${date.getUTCMinutes()}`;
  document.querySelector('.date-day').textContent = `${String(date).slice(0, 3)}, ${String(date).slice(3, -37)}`;

}

function getCoords() {
  let data;
  xhr.open('GET', 'http://api.open-notify.org/iss-now.json', false);
  xhr.send();

  if(xhr.status !== 200) {
    console.log(`${xhr.status}:${xhr.statusText}`);
  } else {
    data = JSON.parse(xhr.responseText);
    changeLocation(data);
  }

  longitude = parseFloat(data.iss_position.longitude);
  latitude = parseFloat(data.iss_position.latitude);
}


getCoords();

// Crew

function changeCrew(data) {
  document.querySelector('.people-amount').textContent = `Total amount: ${data.number} people on ISS`;
  let crewList = document.querySelector('.crew-list');
  crewList.innerHTML = '';
  data.people.forEach((value) => {
    let li = document.createElement('li');
    li.classList.add('list-item');
    let div = document.createElement('div');
    div.classList.add('icon');
    let img = document.createElement('img');
    img.src = 'img/avatar.png';
    img.alt = 'Аватарка';
    let p = document.createElement('p');
    p.textContent = `${value.name}`;
    p.classList.add('name');
    div.appendChild(img);
    li.appendChild(div);
    li.appendChild(p);
    crewList.appendChild(li);
  });
}

function getCrew() {
  let data;
  xhr2.open('GET', 'http://api.open-notify.org/astros.json', false);
  xhr2.send();

  if(xhr2.status !== 200) {
    console.log(`${xhr2.status}:${xhr.statusText}`);
  } else {
    data = JSON.parse(xhr2.responseText);
    changeCrew(data);
  }
}

getCrew();

// Interval

setInterval(() => {
  getCoords();
  getCrew();
  initMap();
}, 5000);
