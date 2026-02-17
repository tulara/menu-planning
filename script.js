document.addEventListener('DOMContentLoaded', ()=>{
  // no per-day suggestions by default; slots start blank until the user selects

  // Master meal list with tags for each meal time
  const masterMeals = [
    {name: 'Greek yogurt & berries', tags: ['breakfast']},
    {name: 'Avocado toast', tags: ['breakfast']},
    {name: 'Banana pancakes', tags: ['breakfast']},
    {name: 'Berry smoothie bowl', tags: ['breakfast']},
    {name: 'Oat porridge with almonds', tags: ['breakfast']},
    {name: 'Eggs benedict', tags: ['breakfast']},
    {name: 'French toast', tags: ['breakfast']},

    {name: 'Chicken Caesar wrap', tags: ['lunch']},
    {name: 'Mediterranean grain bowl', tags: ['lunch']},
    {name: 'Tomato soup & grilled cheese', tags: ['lunch']},
    {name: 'Quinoa salad', tags: ['lunch', 'dinner']},
    {name: 'Sushi rolls', tags: ['lunch', 'dinner']},
    {name: 'BLT sandwich', tags: ['lunch']},
    {name: 'Roast chicken & veg', tags: ['lunch', 'dinner']},

    {name: 'Salmon, rice & greens', tags: ['dinner']},
    {name: 'Stir-fry tofu & veg', tags: ['dinner']},
    {name: 'Spaghetti bolognese', tags: ['dinner']},
    {name: 'Chicken fajitas', tags: ['dinner']},
    {name: 'Pizza night (margherita)', tags: ['dinner']},
    {name: 'BBQ veggies & halloumi', tags: ['dinner']},
    {name: 'Leftover buffet', tags: ['dinner']}
  ];

  // Build index by meal time for quick lookup
  const mealsByType = {breakfast: [], lunch: [], dinner: []};
  masterMeals.forEach(m => {
    m.tags.forEach(t => {
      if (mealsByType[t]) mealsByType[t].push(m.name);
    });
  });

  // For each slot, replace the meal-name element with a persistent <select> showing only relevant meals
  const dayEls = document.querySelectorAll('.day');
  dayEls.forEach(dayEl => {
    const slots = dayEl.querySelectorAll('.meal-slot');
    const dayName = dayEl.dataset.day;
    slots.forEach(slot => {
      const mealNameEl = slot.querySelector('.meal-name');
      const type = slot.dataset.meal; // 'breakfast'|'lunch'|'dinner'

      const select = document.createElement('select');
      select.className = 'meal-select';

      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = '—';
      select.appendChild(emptyOpt);

      // populate only meals relevant to this slot's type
      const choices = mealsByType[type] || [];
      choices.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        select.appendChild(opt);
      });

      // start blank by default (user chooses from the dropdown)

      // Replace the static meal-name element with the select so dropdowns are visible by default
      mealNameEl.replaceWith(select);

      // keep behavior minimal; select's visible value is the chosen meal
      select.addEventListener('change', () => {});
    });
  });
});
