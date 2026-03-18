const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");
const tilDateInput = document.querySelector("#til-date");
const tilTitleInput = document.querySelector("#til-title");
const tilContentInput = document.querySelector("#til-content");

tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = tilDateInput.value;
  const title = tilTitleInput.value;
  const content = tilContentInput.value;

  const tilItem = document.createElement("article");
  tilItem.className = "til-item";

  tilItem.innerHTML = `
    <time>${date}</time>
    <h3>${title}</h3>
    <p>${content}</p>
  `;

  tilList.prepend(tilItem);
  tilForm.reset();
});