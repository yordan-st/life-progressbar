// fill the screen with as many 10px x 10px squares as possible

document.addEventListener("DOMContentLoaded", () => {
  // create container and give it the same dimensions as the client's
  const container = document.getElementById("dots-container");
  const containerStyle = getComputedStyle(container);
  const padding = parseInt(containerStyle.padding) * 2; // Total padding (left + right or top + bottom)
  const containerWidth = container.clientWidth - padding;
  const containerHeight = container.clientHeight - padding;

  // number of dots should be as much as the container allows
  const dotsHorizontally = Math.floor(containerWidth / 10);
  const dotsVertically = Math.floor(containerHeight / 10);
  const totalDots = dotsHorizontally * dotsVertically;

  // dates and formatting
  const birthDate = new Date("1996-01-12");
  const [year, month, day] = birthDate.toISOString().split("T")[0].split("-");
  const formattedDate = `${day}-${month}-${year}`; // Format: MM-DD-YYYY
  const birthYear = birthDate.getFullYear();
  const lifeExpectation = 75;
  const deathDate = new Date(`${birthYear + lifeExpectation}-01-11`);
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
  const completedTimeDays = Math.ceil(
    completedTimeDifference / (1000 * 3600 * 24)
  );

  //calculate the percentage of completed life
  const percentageCompleted = Math.floor(
    (completedTimeDays / totalLifeDays) * 100
  );
  //calculate the percentage of remaining life
  const percentageRemaining = 100 - percentageCompleted;

  //calculate the number of completed dots
  const completedDots = Math.floor((totalDots / 100) * percentageCompleted);

  console.log(
    `The number of days between ${birthDate.toDateString()} and ${deathDate.toDateString()} is ${totalLifeDays} days.`
  );
  console.log(
    `The number of days between ${birthDate.toDateString()} and ${today.toDateString()} is ${completedTimeDays} days.`
  );

  console.log(`Life ${percentageRemaining}% remaining`);
  console.log(`The current number of dots on the screen are ${totalDots}`);
  console.log(`${completedDots} dots completed`);

  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    container.appendChild(dot);
  }

  let allDots = document.querySelectorAll(".dot");
  let allDotsArray = Array.from(allDots);
  let selectedDots = allDotsArray.slice(0, completedDots);
  selectedDots.forEach((dot) => {
    dot.classList.add("full");
  });

  const percentageEl = document.getElementById("remaining");
  percentageEl.innerText = `You have ${percentageRemaining}% of life remaining,`;
  const expectationEl = document.getElementById("expectation");
  expectationEl.innerText = `if you were to live ${lifeExpectation} years`;
  const birthDateEl = document.getElementById("birth-date");
  birthDateEl.innerText = `and born on ${formattedDate}.`;
});
