document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  // Gán nội dung cho phần calculator
  root.innerHTML = `
    <h1>🫑🥩 Food Calculator🍰🍏</h1>
    <form id="food-form">
      <select id="food-name" required>
        <option value="" disabled selected>Select food</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="carrot">Carrot</option>
        <option value="chicken">Chicken</option>
        <option value="beef">Beef</option>
        <option value="fish">Fish</option>
        <option value="salt">Salt</option>
        <option value="sugar">Sugar</option>
        <option value="pepper">Pepper</option>
      </select>
      <input type="number" id="food-amount" placeholder="Amount" required min="1">
      <select id="food-unit" required>
        <option value="g">g</option>
        <option value="tsp">tsp</option>
      </select>
      <button type="submit">Add</button>
    </form>
    <ul id="food-list"></ul>
    <button id="calculate-btn">Calculate Total</button>
    <div id="summary">Total: 0 kcal</div>
  `;

  // Dữ liệu thực phẩm
  const foodData = {
    apple: { unit: "g", kcal: 52 },
    banana: { unit: "g", kcal: 89 },
    carrot: { unit: "g", kcal: 41 },
    chicken: { unit: "g", kcal: 239 },
    beef: { unit: "g", kcal: 250 },
    fish: { unit: "g", kcal: 206 },
    salt: { unit: "tsp", kcal: 0 },
    sugar: { unit: "tsp", kcal: 16 },
    pepper: { unit: "tsp", kcal: 6 }
  };

  const form = document.getElementById("food-form");
  const foodList = document.getElementById("food-list");
  const summary = document.getElementById("summary");
  const calcBtn = document.getElementById("calculate-btn");

  let items = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const foodName = document.getElementById("food-name").value;
    const amount = parseFloat(document.getElementById("food-amount").value);
    const unit = document.getElementById("food-unit").value;

    if (!foodName || isNaN(amount)) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${foodName} - ${amount} ${unit}</span>
      <button class="delete-btn">X</button>
    `;
    foodList.appendChild(li);

    items.push({ foodName, amount, unit });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      foodList.removeChild(li);
      items = items.filter(i => i !== items.find(x => x.foodName === foodName && x.amount === amount && x.unit === unit));
    });

    form.reset();
  });

  calcBtn.addEventListener("click", () => {
    let totalCalories = 0;

    items.forEach(item => {
      const food = foodData[item.foodName];
      if (!food) return;

      if (food.unit === "g" && item.unit === "g") {
        totalCalories += (food.kcal / 100) * item.amount;
      } else if (food.unit === "tsp" && item.unit === "tsp") {
        totalCalories += food.kcal * item.amount;
      } else {
        alert(`Please use correct unit for ${item.foodName} (${food.unit}).`);
      }
    });

    summary.textContent = `Total: ${totalCalories.toFixed(1)} kcal`;
  });

  // ✅ Xử lý menu toggle — nằm ngoài root.innerHTML
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
