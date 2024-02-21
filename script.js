async function init() {
  await includeHTML();
  initPageData();
  renderStandardPortion();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

let LahmacunPortion = [
  0.125, 0.5, 0.38, 0.25, 0.125, 0.25, 0.125, 0.25, 0.5, 0.38,
];
let LahmacunIngredients = [
  "kg Hackfleisch",
  "Tomate(n)",
  "Zwiebel(n)",
  "Zehe/n Knoblauch",
  "Bund Petersilie",
  "Paprika rote",
  "EL Margarine",
  "EL Paprikamark",
  "TL Salz",
  "TL Pfeffer",
];
let OfenhaehnchenPortion = [
  1, 1, 0.5, 0.5, 200, 0.5, 0.5, 1, 37.5, 0.25, 25, 50, 0.25,
];
let OfenhaehnchenIngredients = [
  "Hähnchenschenkel",
  "EL Olivenöl",
  "rote Zwiebeln",
  "kleine Knoblauchzehe(n)",
  "Kartoffeln",
  "Zucchini",
  "Paprikaschote(n), rot",
  "Möhre(n)",
  "g Kirschtomaten",
  "Zitronen, bio",
  " ml Weißwein",
  "ml Gemüsebrühe",
  "TL Paprikapulver",
];
let mangoPortion = [0.5, 1, 125, 75];
let mangoIngredient = [
  "Mango",
  "EL Zitronensaft",
  "g Naturjoghurt",
  "ml Milch",
];

let cevapciciPortion = [
  125, 62.5, 0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.25, 12.5,
];
let cevapciciIngredient = [
  "g Rinderhackfleisch",
  "g Lammhackfleisch",
  "mittelgroße Zwiebeln",
  "Knoblauchzehe(n)",
  "TL Paprikapulver",
  "TL Kreuzkümmel",
  "TL Salz",
  "TL Pfeffer",
  "TL Backpulver",
  "ml Wasser",
];
let portions = [];
let ingredients = [];

function initPageData() {
  const pageName = window.location.pathname.split("/").pop(); // Filtert den Namen der Seite

  if (pageName === "ofenh%C3%A4hnchen2.html") {
    portions = [...OfenhaehnchenPortion];
    ingredients = [...OfenhaehnchenIngredients];
  } else if (pageName === "rezept.html") {
    portions = [...LahmacunPortion];
    ingredients = [...LahmacunIngredients];
  } else if (pageName === "mangolassi2.html") {
    portions = [...mangoPortion];
    ingredients = [...mangoIngredient];
  } else if (pageName === "cevapcici.html") {
    portions = [...cevapciciPortion];
    ingredients = [...cevapciciIngredient];
  }
}

function calcPortions() {
  let amount = document.getElementById("amount").value;
  let content = document.getElementById("ingredients");
  content.innerHTML = "";
  if (amount <= 0 || amount > 20) {
    alert("Bitte gebe als Anzahl mindestens 1 oder maximal 20 Portionen an");
    document.getElementById("amount").value = 4;
    renderStandardPortion();
  } else {
    for (let i = 0; i < portions.length; i++) {
      const portion = portions[i];
      const ingredient = ingredients[i];
      const sum = (amount * portion).toFixed(2).replace(".", ",");
      if (i % 2 == 0) {
        content.innerHTML += `<span class="colored-bgr"> ${sum} ${ingredient} </span>`;
      } else {
        content.innerHTML += `<span class="uncolored-bgr"> ${sum} ${ingredient} </span>`;
      }
    }
  }
}

function renderStandardPortion() {
  let amount = document.getElementById("amount");
  let content = document.getElementById("ingredients");
  amount.value = 4;
  for (let i = 0; i < portions.length; i++) {
    const portion = portions[i];
    const ingredient = ingredients[i];
    amount = 4;
    const sum = (amount * portion).toFixed(2).replace(".", ",");
    if (i % 2 == 0) {
      content.innerHTML += `<span class="colored-bgr"> ${sum} ${ingredient} </span>`;
    } else {
      content.innerHTML += `<span class="uncolored-bgr"> ${sum} ${ingredient} </span>`;
    }
  }
}

function sendMail(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("https://formspree.io/f/xzbnrgbz", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      Accept: "application/json",
    },
  })
    .then(() => {
      window.location.href = "./send_mail.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

function toggleNavbar() {
  document.getElementById("navbar").classList.toggle("show-overlay-menu");
  navbar.style.display = navbar.classList.contains("show-overlay-menu") ? "flex" : "none";
}