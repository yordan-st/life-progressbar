const btnChange = document.getElementById("btn-change");
const btnCancel = document.getElementById("btn-cancel");
const btnSave = document.getElementById("btn-save");
const hiddenEls = document.querySelectorAll(".invisible");
const visibleEls = document.querySelectorAll(".visible");

const expectancyInput = document.getElementById("expectancy");
const birthDateInput = document.getElementById("birthDate");

btnChange.onclick = function () {
  hiddenEls.forEach((hiddenEl) => {
    hiddenEl.classList.replace("invisible", "visible");
  });
  visibleEls.forEach((hiddenEl) => {
    hiddenEl.classList.replace("visible", "invisible");
  });
};
btnCancel.onclick = function () {
  hiddenEls.forEach((hiddenEl) => {
    hiddenEl.classList.replace("visible", "invisible");
  });
  visibleEls.forEach((hiddenEl) => {
    hiddenEl.classList.replace("invisible", "visible");
  });
};
btnSave.onclick = function () {
  const lifeDetails = {
    expectancyData: expectancyInput.value,
    birthdateData: birthDateInput.value,
  };
  localStorage.setItem("lifeDetails", JSON.stringify(lifeDetails));
  console.log("Saved data:", lifeDetails);
  location.reload();
};
