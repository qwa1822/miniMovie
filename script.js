function target(e) {
  return document.querySelector(e);
}
function Alltarget(e) {
  return document.querySelectorAll(e);
}

const container = target(".container");
const seats = Alltarget(".row .seat:not(.occupied)");

const count = target("#count");
const total = target("#total");
const movieSelect = target("#movie");

popularUI();

let ticketprice = +movieSelect.value;

// save Selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update total and count

function updateSelectedCont() {
  const selectedSeat = Alltarget(".row .seat.selected");

  // Copy Selected seats into arr
  // map through array
  // return a new Array indexs
  const seatsIndex = [...selectedSeat].map(item => [...seats].indexOf(item));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeat.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketprice;
}

// Get Data from localstorage and popuylate UI
function popularUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((item, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        item.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", e => {
  ticketprice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCont();
});

// seat Click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCont();
  }
});
