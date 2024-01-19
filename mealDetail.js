document.addEventListener("DOMContentLoaded", () => {
  const mealDetail = document.getElementById("mealDetail");
  const params = new URLSearchParams(window.location.search);
  const mealId = params.get("idMeal");

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals && data.meals[0];

      if (mealDetail) {
        // Create elements for meal details
        const mealImage = document.createElement("img");
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealImage.className = "meal-image";

        const mealTitle = document.createElement("h2");
        mealTitle.textContent = meal.strMeal;
        mealTitle.className = "meal-title";

        const mealInstructions = document.createElement("p");
        mealInstructions.textContent = meal.strInstructions;

        // Append the meal details to the mealDetail div
        mealDetail.appendChild(mealImage);
        mealDetail.appendChild(mealTitle);
        mealDetail.appendChild(mealInstructions);
      } else {
        const noMealMessage = document.createElement("p");
        noMealMessage.textContent = "No details found for this meal.";
        mealDetail.appendChild(noMealMessage);
      }
    })
    .catch((error) => console.log(error));
});
