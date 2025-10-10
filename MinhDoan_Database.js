document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("food-table");
  const searchInput = document.getElementById("search-food");
  const foodSection = document.getElementById("food-section");
  const categoryTitle = document.getElementById("category-title");
  const backButton = document.getElementById("back-button");

  // Main data
  const foods = {
    vegetables: [
      { name: "Carrot", unit: "100g", kcal: 41 },
      { name: "Broccoli", unit: "100g", kcal: 34 },
      { name: "Spinach", unit: "100g", kcal: 23 },
      { name: "Tomato", unit: "100g", kcal: 18 },
      { name: "Cucumber", unit: "100g", kcal: 16 }
    ],
    spices: [
      { name: "Salt", unit: "1 tsp", kcal: 0 },
      { name: "Sugar", unit: "1 tsp", kcal: 16 },
      { name: "Pepper", unit: "1 tsp", kcal: 6 },
      { name: "Garlic Powder", unit: "1 tsp", kcal: 10 },
      { name: "Curry Powder", unit: "1 tsp", kcal: 8 }
    ],
    meat: [
      { name: "Pork Shoulder", unit: "100g", kcal: 250 },
      { name: "Pork Tenderloin", unit: "100g", kcal: 170 },
      { name: "Pork Thigh", unit: "100g", kcal: 210 },
      { name: "Chicken Breast", unit: "100g", kcal: 165 },
      { name: "Beef Sirloin", unit: "100g", kcal: 240 }
    ],
    starch: [
      { name: "Rice", unit: "100g (cooked)", kcal: 130 },
      { name: "Noodles", unit: "100g (cooked)", kcal: 138 },
      { name: "Bread", unit: "1 slice (40g)", kcal: 110 },
      { name: "Potato", unit: "100g", kcal: 77 },
      { name: "Sweet Potato", unit: "100g", kcal: 86 },
      { name: "Pho Noodles", unit: "100g (cooked)", kcal: 120 }
    ],
    fat: [
      { name: "Olive Oil", unit: "1 tbsp", kcal: 119 },
      { name: "Butter", unit: "1 tbsp", kcal: 102 },
      { name: "Pork Fat", unit: "1 tbsp", kcal: 115 },
      { name: "Vegetable Oil", unit: "1 tbsp", kcal: 120 },
      { name: "Margarine", unit: "1 tbsp", kcal: 100 }
    ],
    dairy: [
      { name: "Whole Milk", unit: "100ml", kcal: 61 },
      { name: "Low-fat Milk", unit: "100ml", kcal: 44 },
      { name: "Cheddar Cheese", unit: "100g", kcal: 402 },
      { name: "Yogurt (plain)", unit: "100g", kcal: 59 },
      { name: "Butter", unit: "10g", kcal: 72 }
    ],
    fruits: [
      { name: "Apple", unit: "100g", kcal: 52 },
      { name: "Banana", unit: "100g", kcal: 89 },
      { name: "Mango", unit: "100g", kcal: 60 },
      { name: "Orange", unit: "100g", kcal: 47 },
      { name: "Watermelon", unit: "100g", kcal: 30 }
    ],
    drinks: [
      { name: "Black Coffee", unit: "100ml", kcal: 2 },
      { name: "Orange Juice", unit: "100ml", kcal: 45 },
      { name: "Milk Tea", unit: "100ml", kcal: 80 },
      { name: "Green Tea", unit: "100ml", kcal: 1 },
      { name: "Coca-Cola", unit: "100ml", kcal: 42 }
    ]
  };

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(food => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${food.name}</td>
        <td>${food.unit}</td>
        <td>${food.kcal}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  document.querySelectorAll(".category").forEach(cat => {
    cat.addEventListener("click", () => {
      const selected = cat.dataset.category;
      categoryTitle.textContent = selected.charAt(0).toUpperCase() + selected.slice(1);
      foodSection.style.display = "block";
      document.querySelector(".category-container").style.display = "none";
      renderTable(foods[selected]);


      searchInput.value = "";
      searchInput.oninput = () => {
        const query = searchInput.value.toLowerCase();
        const filtered = foods[selected].filter(food =>
          food.name.toLowerCase().includes(query)
        );
        renderTable(filtered);
      };
    });
  });

  // Back
  backButton.addEventListener("click", () => {
    foodSection.style.display = "none";
    document.querySelector(".category-container").style.display = "flex";
  });

  // ----- NAVBAR MOBILE -----
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
