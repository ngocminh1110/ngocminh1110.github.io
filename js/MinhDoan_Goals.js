document.addEventListener("DOMContentLoaded", () => {
  const goalInput = document.getElementById("goal");
  const saveGoalBtn = document.getElementById("save-goal");
  const progressBar = document.getElementById("progress-bar");
  const dailyLog = document.getElementById("daily-log");

  let goal = 0;
  let totalCalories = 0;

  saveGoalBtn.addEventListener("click", () => {
    goal = parseInt(goalInput.value, 10);
    if (isNaN(goal) || goal <= 0) {
      alert("Please enter a valid goal.");
      return;
    }
    updateProgress();
  });

  // For demo: add fake daily log
  const logItems = [
    { name: "Apple", kcal: 95 },
    { name: "Chicken", kcal: 350 },
    { name: "Rice", kcal: 200 }
  ];

  logItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.kcal} kcal`;
    dailyLog.appendChild(li);
    totalCalories += item.kcal;
  });

  function updateProgress() {
    if (goal <= 0) return;
    let percent = Math.min((totalCalories / goal) * 100, 100);
    progressBar.style.width = percent + "%";
    progressBar.textContent = Math.round(percent) + "%";
  }

  updateProgress();
});

