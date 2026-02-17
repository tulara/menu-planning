document.addEventListener('DOMContentLoaded', ()=>{
  const meals = {
    Monday:    {breakfast: 'Greek yogurt & berries', lunch: 'Chicken Caesar wrap', dinner: 'Salmon, rice & greens'},
    Tuesday:   {breakfast: 'Avocado toast', lunch: 'Mediterranean grain bowl', dinner: 'Stir-fry tofu & veg'},
    Wednesday: {breakfast: 'Banana pancakes', lunch: 'Tomato soup & grilled cheese', dinner: 'Spaghetti bolognese'},
    Thursday:  {breakfast: 'Berry smoothie bowl', lunch: 'Quinoa salad', dinner: 'Chicken fajitas'},
    Friday:    {breakfast: 'Oat porridge with almonds', lunch: 'Sushi rolls', dinner: 'Pizza night (margherita)'},
    Saturday:  {breakfast: 'Eggs benedict', lunch: 'BLT sandwich', dinner: 'BBQ veggies & halloumi'},
    Sunday:    {breakfast: 'French toast', lunch: 'Roast chicken & veg', dinner: 'Leftover buffet'}
  };

  // Unique list of available meal names
  const availableMeals = Array.from(new Set(Object.values(meals).flatMap(d => Object.values(d))));

  // For each slot, replace the meal-name element with a persistent <select>
  const dayEls = document.querySelectorAll('.day');
  dayEls.forEach(dayEl => {
    const slots = dayEl.querySelectorAll('.meal-slot');
    slots.forEach(slot => {
      const mealNameEl = slot.querySelector('.meal-name');

      const select = document.createElement('select');
      select.className = 'meal-select';

      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = '—';
      select.appendChild(emptyOpt);

      availableMeals.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = m;
        select.appendChild(opt);
      });

      // Replace the static meal-name element with the select so dropdowns are visible by default
      mealNameEl.replaceWith(select);

      // Optionally, you could pre-select a suggested meal per day/slot here.
      select.addEventListener('change', () => {
        // keep behavior minimal: the select shows the chosen meal
      });
    });
  });
});
