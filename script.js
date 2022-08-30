document.addEventListener("DOMContentLoaded", async function () {
  showLoading();
  setTimeout(async () => {
    const data = await getStreetData();
    clearPage();
    buildPage(data);
  }, 1000);

  //   const data = await getStreetData();

  //   clearPage();
  //   buildPage(data);

  const refreshButton = document.querySelector("p");
  refreshButton.addEventListener("click", async function () {
    clearPage();
    showLoading();

    setTimeout(async () => {
      const data = await getStreetData();
      clearPage();
      buildPage(data);
    }, 1000);
  });
});

const showLoading = () => {
  const streetContainer = document.querySelector(".streets");
  const loading = document.createElement("article");
  loading.innerHTML = `
    <progress></progress>
    `;
  streetContainer.appendChild(loading);
};

const getStreetData = async () => {
  const url = "https://smart-street-lighting.herokuapp.com/api/streets/";
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const buildPage = (data) => {
  const streetContainer = document.querySelector(".streets");
  data.forEach((street) => {
    const streetElement = document.createElement("details");
    streetElement.innerHTML = `
        <summary>${street.id} - ${street.name}</summary>
        <div class="grid">
        ${street.lamps
          .map((lamp) => {
            return `
            <article>
            <h3>ID: ${lamp.id}</h3>
            <p>
                Status: <strong>${
                  lamp.status === "on"
                    ? "<mark>" + lamp.status + "</mark>"
                    : lamp.status
                }</strong>
            </p>
            <footer>
                <p>Brightness: <strong>${lamp.brightness}</strong></p>
                <progress value="${lamp.brightness}" max="100" %>></progress>
            </footer>
            </article>
        `;
          })
          .join("")}
        </div>
        `;
    streetContainer.appendChild(streetElement);
  });
};

const clearPage = () => {
  const streetContainer = document.querySelector(".streets");
  streetContainer.innerHTML = "";
};
