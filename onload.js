// run the following code on page load

document.addEventListener("DOMContentLoaded", () => {
  // get the container of the dots,
  // get its computed style and calculate its heigth & width,
  // taking its padding into account
  const container = document.getElementById("dots-container");
  const containerStyle = getComputedStyle(container);
  const padding = parseInt(containerStyle.padding) * 2; // Total padding (left + right or top + bottom)
  const containerWidth = container.clientWidth - padding;
  const containerHeight = container.clientHeight - padding;

  // number of dots should be as much as the container allows
  const dotsHorizontally = Math.floor(containerWidth / 10);
  const dotsVertically = Math.floor(containerHeight / 10);
  const totalDots = dotsHorizontally * dotsVertically;

  // extract saved data from localstorage, convert it to usable format
  const lifeDetails = localStorage.getItem("lifeDetails");
  const parsedDetails = JSON.parse(lifeDetails);

  // create date object from extracted data
  const birthDate = new Date(parsedDetails.birthdateData);
  // formate to EU style date format & default format
  const [year, month, day] = birthDate.toISOString().split("T")[0].split("-");
  const formattedDate = `${day}-${month}-${year}`; // Format: MM-DD-YYYY
  const defaultFormatDate = `${year}-${month}-${day}`; // Format: YYYY-MM--DD
  // calculate the death date based on the birth year and life expectation
  const birthYear = birthDate.getFullYear();
  const lifeExpectancy = parseInt(parsedDetails.expectancyData);
  const deathDate = new Date(`${birthYear + lifeExpectancy}-01-11`);
  const today = new Date();

  // calculate difference between birth & death in days (total life)
  const totalTimeDifference = Math.abs(
    deathDate.getTime() - birthDate.getTime()
  );
  const totalLifeDays = Math.ceil(totalTimeDifference / (1000 * 3600 * 24));
  // calculate difference between birth & now in days (completed life)
  const completedTimeDifference = Math.abs(
    today.getTime() - birthDate.getTime()
  );
  const completedLifeDays = Math.ceil(
    completedTimeDifference / (1000 * 3600 * 24)
  );
  //calculate the percentage of completed life
  const percentageCompleted = Math.floor(
    (completedLifeDays / totalLifeDays) * 100
  );
  //calculate the percentage of remaining life
  const percentageRemaining = 100 - percentageCompleted;
  //calculate the number of completed dots
  const completedDots = Math.floor((totalDots / 100) * percentageCompleted);

  // Console log fun facts
  console.log(
    `The number of days between ${birthDate.toDateString()} and ${deathDate.toDateString()} is ${totalLifeDays} days.`
  );
  console.log(
    `The number of days between ${birthDate.toDateString()} and ${today.toDateString()} is ${completedLifeDays} days.`
  );
  console.log(`Life ${percentageRemaining}% remaining`);
  console.log(`The current number of dots on the screen are ${totalDots}`);
  console.log(`${completedDots} dots completed`);

  // loop trough the total dots,
  // create an element for each of them and append it to the container
  // give each element the 'dot' class
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    container.appendChild(dot);
  }
  // create an array from all dots,
  // identify the selected dots based on the number of completed dots
  // add the class 'full' on all of them
  let allDots = document.querySelectorAll(".dot");
  let allDotsArray = Array.from(allDots);
  let selectedDots = allDotsArray.slice(0, completedDots);
  selectedDots.forEach((dot) => {
    dot.classList.add("full");
  });

  // display remaining life percentage in text
  document.getElementById("remaining").innerText = percentageRemaining;
  // display life expectancy in years in text
  document.getElementById("expectation").innerText = lifeExpectancy;
  // display birth date as text
  document.getElementById("birth-date").innerText = formattedDate;

  // display life expectancy as value in the form field
  document.getElementById("expectancy").value = lifeExpectancy;
  // display birth date as value in the form field
  document.getElementById("birthDate").value = defaultFormatDate;
});
