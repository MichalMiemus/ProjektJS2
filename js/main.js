function convertCurrency() {
  const currency = document.getElementById("currency").value;
  const amount = document.getElementById("amount").value;

  document.getElementById("result").innerHTML =
    '<p class="mt-3 font-weight-bold" style="font-size: 1.4em;">Pobieranie kursu waluty z NBP...</p>';

  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length <= 0) {
        alert("Błedne dane z API");
        return;
      }
      const rate = data.rates[0].mid;
      if (amount <= 0) {
        alert("Podaj kwotę większą od zera");
        return;
      }
      const result = amount * rate;
      document.getElementById(
        "result"
      ).innerHTML = `<p class="mt-3 font-weight-bold" style="font-size: 1.4em;"><span class="text-secondary">${amount} ${currency}</span> = ${result.toFixed(
        2
      )} PLN</p>`;
    })
    .catch((error) => {
      console.error("Wystąpił błąd podczas pobierania kursu waluty:", error);
      document.getElementById("result").innerText =
        "Wystąpił błąd. Spróbuj ponownie później.";
    });
}
