const selectList = document.querySelectorAll("select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select");

const currencyOne = document.getElementById("currency-one"),
  currencyTwo = document.getElementById("currency-two"),
  amountOne = document.getElementById("amount-one"),
  amountTwo = document.getElementById("amount-two"),
  rateDisplay = document.getElementById("rate"),
  timestamp = document.getElementById("time");

for (let i = 0; i < selectList.length; i++) {
  for (let currency_code in country_list) {
    // setting default as GBP for FROM and NGN for TO
    let selected =
      (i === 0 && currency_code === "GBP") ||
      (i === 1 && currency_code === "NGN")
        ? "selected"
        : "";

    // creating option tag
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // inserting options tag inside select tag
    selectList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  selectList[i].addEventListener("change", (e) => {
    loadFlag(e.target); // calling loadFlag with passing target element as an argument
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      // if currency code of country list is equal to option value
      let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular selectlist
      // passing country code of a selected currency code in a img url
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

//fetch currency rates and update dom
function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(`https://www.floatrates.com/daily/${currency_one}.json#`)
    .then((response) => response.json())
    .then((data) => {
      data = data[currency_two.toLowerCase()];
      console.log(data);

      const rate = data.rate;
      rateDisplay.innerText = `1 ${currency_one} = ${rate.toFixed(
        2
      )} ${currency_two}`;
      timestamp.innerText = data.date;
      amountTwo.value = (parseFloat(amountOne.value) * data.rate).toFixed(2);
    });
}

//adding required event listeners
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);

calculate();
