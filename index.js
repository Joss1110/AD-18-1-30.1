
const itemsContainer = document.querySelector("#list-items");


function addItem(item) {
  const colourCard = document.createElement("section");
  colourCard.className = "card w-75";
  itemsContainer.append(colourCard);

  const colourCardBody = document.createElement("article");
  colourCardBody.className = "card-body";
  colourCard.append(colourCardBody);

  const colourCardTitle = document.createElement("h5");
  colourCardTitle.className = "card-title";
  colourCardTitle.innerText = item.name;
  colourCardBody.append(colourCardTitle);

  const colourCardText = document.createElement("p");
  colourCardText.className = "card-text";
  colourCardText.innerText = item.pantone_value;
  colourCardBody.append(colourCardText);

  const colourCardColour = document.createElement("figure");
  colourCardColour.style = "background-color: " + item.color + ";";
  colourCardColour.innerText = item.color;
  colourCardBody.append(colourCardColour);

  const colourCardBreak = document.createElement("br");
  itemsContainer.append(colourCardBreak);
}

//  lista de colores de la API 
async function fetchColorsList() {
  try {
    const response = await fetch("https://reqres.in/api/unknown");
    const data = await response.json();

    
    const colors = data.data;

    // Conectar con addItem 
    colors.forEach(color => addItem(color));

    // Guardar en localStorage
    localStorage.setItem("colorsList", JSON.stringify(colors));
    console.log("Colores guardados en localStorage ");

  } catch (error) {
    console.error("Error al obtener colores:", error);
  }
}

//  colores desde localStorage
function loadColorsFromStorage() {
  const storedColors = localStorage.getItem("colorsList");

  if (storedColors) {
    const colors = JSON.parse(storedColors);
    colors.forEach(color => addItem(color));
    console.log("Colores cargados desde localStorage ");
  } else {
    console.log("No hay datos guardados en localStorage ");
  }
}


loadColorsFromStorage();

fetchColorsList();
