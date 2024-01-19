document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("mobile-menu-btn")
    .addEventListener("click", function () {
      document.getElementById("mobile-menu").classList.toggle("hidden");
    });

  const categoryDetail = document.getElementById("categoryDetail");
  const params = new URLSearchParams(window.location.search);
  const categoryInfo = JSON.parse(decodeURIComponent(params.get("category")));

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryInfo.strCategory}`
  )
    .then((res) => res.json())
    .then((data) => {
      const meals = data.meals;

      if (meals) {
        const mealList = document.createElement("div");
        mealList.className = "meal-list";

        meals.forEach((meal) => {
          const mealCard = document.createElement("button");
          mealCard.className = "meal-card";

          const mealImage = document.createElement("img");
          mealImage.src = meal.strMealThumb;
          mealImage.alt = meal.strMeal;
          mealImage.className = "meal-image";

          const mealTitle = document.createElement("h2");
          mealTitle.textContent = meal.strMeal;
          mealTitle.className = "meal-title";

          mealCard.appendChild(mealImage);
          mealCard.appendChild(mealTitle);

          mealCard.addEventListener("click", () => {
            // Navigate to mealDetail page with the meal information
            window.location.href = `mealDetail.html?meal=${encodeURIComponent(
              JSON.stringify(meal)
            )}`;
          });

          mealList.appendChild(mealCard);
        });

        categoryDetail.appendChild(mealList);
      } else {
        const noMealsMessage = document.createElement("p");
        noMealsMessage.textContent = "No meals found for this category.";
        categoryDetail.appendChild(noMealsMessage);
      }
    })
    .catch((error) => console.log(error));

  const categoryName = document.getElementById("category");
  categoryName.textContent = categoryInfo.strCategory;

  categoryDetail.appendChild(categoryName);
});
