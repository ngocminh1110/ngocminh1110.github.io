document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  root.innerHTML = `
    <h1>🫑🥩 Food Calculator 🍰🍏</h1>
    <form id="food-form">
      <select id="food-name" required>
        <option value="" disabled selected>Select food</option>
        <!-- Vegetables -->
        <optgroup label="Vegetables">
          <option value="broccoli">Broccoli</option>
          <option value="spinach">Spinach</option>
          <option value="carrot">Carrot</option>
          <option value="tomato">Tomato</option>
          <option value="cucumber">Cucumber</option>
        </optgroup>

        <!-- Meat -->
        <optgroup label="Meat">
          <option value="chicken_breast">Chicken Breast</option>
          <option value="pork_thigh">Pork Thigh</option>
          <option value="beef_tenderloin">Beef Tenderloin</option>
          <option value="fish">Fish</option>
        </optgroup>

        <!-- Starch -->
        <optgroup label="Starch">
          <option value="rice">Rice</option>
          <option value="noodles">Noodles</option>
          <option value="bread">Bread</option>
          <option value="potato">Potato</option>
          <option value="sweet_potato">Sweet Potato</option>
        </optgroup>

        <!-- Fat -->
        <optgroup label="Fat">
          <option value="olive_oil">Olive Oil</option>
          <option value="butter">Butter</option>
          <option value="lard">Lard</option>
        </optgroup>

        <!-- Dairy -->
        <optgroup label="Dairy">
          <option value="milk">Milk</option>
          <option value="cheese">Cheese</option>
          <option value="yogurt">Yogurt</option>
        </optgroup>

        <!-- Fruit -->
        <optgroup label="Fruit">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="blueberry">Blueberry</option>
        </optgroup>

        <!-- Spices -->
        <optgroup label="Spices">
          <option value="salt">Salt</option>
          <option value="sugar">Sugar</option>
          <option value="pepper">Pepper</option>
        </optgroup>

        <!-- Drinks -->
        <optgroup label="Drinks">
          <option value="coffee">Coffee</option>
          <option value="juice">Juice</option>
          <option value="milk_tea">Milk Tea</option>
        </optgroup>
      </select>

      <input type="number" id="food-amount" placeholder="Amount" required min="1">
      <select id="food-unit" required>
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="tsp">tsp</option>
        <option value="slice">slice</option>
        <option value="cup">cup</option>
      </select>
      <button type="submit">Add</button>
    </form>

    <ul id="food-list"></ul>
    <button id="calculate-btn">Calculate Total</button>
    <div id="summary">Total: 0 kcal</div>
  `;

  // ✅ Dữ liệu thực phẩm mở rộng
  const foodData = {
    // Vegetables (per 100g)
    broccoli: { unit: "g", kcal: 34 },
    spinach: { unit: "g", kcal: 23 },
    carrot: { unit: "g", kcal: 41 },
    tomato: { unit: "g", kcal: 18 },
    cucumber: { unit: "g", kcal: 16 },

    // Meat (per 100g)
    chicken_breast: { unit: "g", kcal: 165 },
    pork_thigh: { unit: "g", kcal: 242 },
    beef_tenderloin: { unit: "g", kcal: 250 },
    fish: { unit: "g", kcal: 206 },

    // Starch (per 100g)
    rice: { unit: "g", kcal: 130 },
    noodles: { unit: "g", kcal: 138 },
    bread: { unit: "slice", kcal: 80 },
    potato: { unit: "g", kcal: 77 },
    sweet_potato: { unit: "g", kcal: 86 },

    // Fat (per 1 tsp or per 100g)
    olive_oil: { unit: "tsp", kcal: 40 },
    butter: { unit: "g", kcal: 717 },
    lard: { unit: "g", kcal: 900 },

    // Dairy (per 100ml or 100g)
    milk: { unit: "ml", kcal: 42 },
    cheese: { unit: "g", kcal: 402 },
    yogurt: { unit: "g", kcal: 59 },

    // Fruit (per 100g)
    apple: { unit: "g", kcal: 52 },
    banana: { unit: "g", kcal: 89 },
    blueberry: { unit: "g", kcal: 57 },

    // Spices (per 1 tsp)
    salt: { unit: "tsp", kcal: 0 },
    sugar: { unit: "tsp", kcal: 16 },
    pepper: { unit: "tsp", kcal: 6 },

    // Drinks (per 100ml)
    coffee: { unit: "ml", kcal: 2 },
    juice: { unit: "ml", kcal: 45 },
    milk_tea: { unit: "ml", kcal: 60 }
  };

  const form = document.getElementById("food-form");
  const foodList = document.getElementById("food-list");
  const summary = document.getElementById("summary");
  const calcBtn = document.getElementById("calculate-btn");

  let items = [];

  // ✅ Thêm món ăn
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const foodName = document.getElementById("food-name").value;
    const amount = parseFloat(document.getElementById("food-amount").value);
    const unit = document.getElementById("food-unit").value;

    if (!foodName || isNaN(amount)) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${foodName.replace(/_/g, " ")} - ${amount} ${unit}</span>
      <button class="delete-btn">X</button>
    `;
    foodList.appendChild(li);

    items.push({ foodName, amount, unit });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      foodList.removeChild(li);
      items = items.filter(
        i =>
          i !== items.find(
            x =>
              x.foodName === foodName &&
              x.amount === amount &&
              x.unit === unit
          )
      );
    });

    form.reset();
  });

  // ✅ Tính tổng kcal
  calcBtn.addEventListener("click", () => {
    let totalCalories = 0;

    items.forEach(item => {
      const food = foodData[item.foodName];
      if (!food) return;

      if (food.unit === "g" && item.unit === "g") {
        totalCalories += (food.kcal / 100) * item.amount;
      } else if (food.unit === "ml" && item.unit === "ml") {
        totalCalories += (food.kcal / 100) * item.amount;
      } else if (food.unit === "tsp" && item.unit === "tsp") {
        totalCalories += food.kcal * item.amount;
      } else if (food.unit === "slice" && item.unit === "slice") {
        totalCalories += food.kcal * item.amount;
      } else {
        alert(`Please use correct unit for ${item.foodName.replace(/_/g, " ")} (${food.unit}).`);
      }
    });

    summary.textContent = `Total: ${totalCalories.toFixed(1)} kcal`;
  });

  // ✅ Menu toggle
  const toggleButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
