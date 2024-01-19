document.addEventListener("DOMContentLoaded", () => {
  const categorySection = document.getElementById("categorySection");

  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;

      categories.forEach((category) => {
        const categoryCard = document.createElement("button");
        categoryCard.className = "category-card";

        const imageCard = document.createElement("img");
        imageCard.src = category.strCategoryThumb;
        imageCard.alt = category.strCategory;
        imageCard.className = "image";

        const categoryName = document.createElement("h1");
        categoryName.textContent = category.strCategory;
        categoryName.className = "title";

        categoryCard.appendChild(imageCard);
        categoryCard.appendChild(categoryName);

        categoryCard.addEventListener("click", () => {
          const selectedCategory = categories.find(
            (cat) => cat.strCategory === category.strCategory
          );
          window.location.href = `detail.html?category=${encodeURIComponent(
            JSON.stringify(selectedCategory)
          )}`;
        });

        categorySection.appendChild(categoryCard);
      });
    })
    .catch((error) => console.log(error));
});
