document.addEventListener("DOMContentLoaded", function () {
  const currencyForm = document.getElementById("currencyForm");
  currencyForm.addEventListener("submit", convertCurrency);
});

function convertCurrency(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const currency = formData.get("currency");
  const amount = formData.get("amount");
  const resultElement = document.getElementById("result");

  if (amount <= 0) {
    resultElement.innerHTML =
      '<div class="alert alert-danger" role="alert" style="max-width: 300px;">Podaj kwotę większą od zera.</div>';
    return;
  }
  resultElement.innerHTML =
    "<p><strong>Pobieranie kursu waluty z NBP...</strong></p>";

  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data?.rates?.[0]?.mid;
      if (!rate) {
        resultElement.innerHTML =
          '<div class="alert alert-danger" role="alert" style="max-width: 300px;">Błędne dane z API.</div>';
        return;
      }
      const result = amount * rate;
      resultElement.innerHTML = `<p class="mt-3 font-weight-bold" style="font-size: 1.4em;">${amount} ${currency} = ${result.toFixed(
        2
      )} PLN</p>`;
    })
    .catch((error) => {
      console.error("Wystąpił błąd podczas pobierania kursu waluty:", error);
      resultElement.innerText = "Wystąpił błąd. Spróbuj ponownie później.";
    });
}
