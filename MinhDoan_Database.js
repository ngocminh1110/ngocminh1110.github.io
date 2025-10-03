document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("food-table");
  const searchInput = document.getElementById("search-food");

  const foods = [
    { name: "Apple", unit: "100g", kcal: 52 },
    { name: "Banana", unit: "100g", kcal: 89 },
    { name: "Carrot", unit: "100g", kcal: 41 },
    { name: "Chicken", unit: "100g", kcal: 239 },
    { name: "Beef", unit: "100g", kcal: 250 },
    { name: "Fish", unit: "100g", kcal: 206 },
    { name: "Salt", unit: "1 tsp", kcal: 0 },
    { name: "Sugar", unit: "1 tsp", kcal: 16 },
    { name: "Pepper", unit: "1 tsp", kcal: 6 }
  ];

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

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = foods.filter(food =>
      food.name.toLowerCase().includes(query)
    );
    renderTable(filtered);
  });

  renderTable(foods);
});
