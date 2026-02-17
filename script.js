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

  const dayEls = document.querySelectorAll('.day');
  dayEls.forEach(dayEl => {
    const day = dayEl.dataset.day;
    const plan = meals[day] || {breakfast:'—', lunch:'—', dinner:'—'};
    const slots = dayEl.querySelectorAll('.meal-slot');
    slots.forEach(slot => {
      const mealType = slot.dataset.meal;
      const nameEl = slot.querySelector('.meal-name');
      nameEl.textContent = plan[mealType] || '—';
    })
  });
});
