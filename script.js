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
  // state: selection per slot and ingredient counts
  const selections = {}; // key: slotId (Day-Type) -> mealName
  const ingredientCounts = {}; // ingredient -> count

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

      // identify this slot
      const slotId = `${dayName}-${type}`;
      selections[slotId] = '';
      select.dataset.slotId = slotId;

      // when the selection changes, update ingredient counts and shopping list
      select.addEventListener('change', (e) => {
        const prev = selections[slotId] || '';
        const next = e.target.value || '';
        if (prev === next) return;
        // decrement ingredients from previous selection
        if (prev) {
          const prevIng = ingredientMap[prev] || [];
          prevIng.forEach(i => {
            ingredientCounts[i] = (ingredientCounts[i] || 0) - 1;
            if (ingredientCounts[i] <= 0) delete ingredientCounts[i];
          });
        }
        // increment ingredients for new selection
        if (next) {
          const nextIng = ingredientMap[next] || [];
          nextIng.forEach(i => {
            ingredientCounts[i] = (ingredientCounts[i] || 0) + 1;
          });
        }
        selections[slotId] = next;
        renderShopping();
      });
    });
  });

  // initial render to show placeholder rows when empty
  renderShopping();

  // Ingredient map for each meal name
  const ingredientMap = {
    'Greek yogurt & berries': ['Greek yogurt','Berries','Honey'],
    'Avocado toast': ['Bread','Avocado','Lemon'],
    'Banana pancakes': ['Bananas','Flour','Eggs','Milk'],
    'Berry smoothie bowl': ['Berries','Banana','Yogurt'],
    'Oat porridge with almonds': ['Oats','Almonds','Milk'],
    'Eggs benedict': ['Eggs','English muffin','Ham','Hollandaise'],
    'French toast': ['Bread','Eggs','Milk','Cinnamon'],

    'Chicken Caesar wrap': ['Chicken','Lettuce','Tortilla','Parmesan'],
    'Mediterranean grain bowl': ['Quinoa','Cucumber','Tomato','Feta'],
    'Tomato soup & grilled cheese': ['Tomato','Bread','Cheese','Butter'],
    'Quinoa salad': ['Quinoa','Cucumber','Tomato','Olive oil'],
    'Sushi rolls': ['Sushi rice','Nori','Fish/vegetables'],
    'BLT sandwich': ['Bread','Bacon','Lettuce','Tomato'],
    'Roast chicken & veg': ['Whole chicken','Potatoes','Carrots'],

    'Salmon, rice & greens': ['Salmon','Rice','Greens'],
    'Stir-fry tofu & veg': ['Tofu','Mixed vegetables','Soy sauce'],
    'Spaghetti bolognese': ['Spaghetti','Minced beef','Tomato sauce'],
    'Chicken fajitas': ['Chicken','Tortillas','Peppers','Onion'],
    'Pizza night (margherita)': ['Pizza dough','Tomato','Mozzarella','Basil'],
    'BBQ veggies & halloumi': ['Halloumi','Mixed vegetables','BBQ sauce'],
    'Leftover buffet': []
  };

  // render shopping list into the sidebar
  function renderShopping(){
    const listEl = document.getElementById('shopping-list');
    listEl.innerHTML = '';
    const items = Object.keys(ingredientCounts).sort();
    if (items.length === 0){
      // show a set of empty placeholder rows so faint rule lines are visible
      const hint = document.createElement('li');
      hint.className = 'hint';
      hint.textContent = 'No items — select meals to build your list';
      listEl.appendChild(hint);
      const placeholderCount = 12;
      for (let i=0;i<placeholderCount;i++){
        const li = document.createElement('li');
        li.className = 'placeholder';
        li.innerHTML = '&nbsp;';
        listEl.appendChild(li);
      }
      return;
    }
    items.forEach(name => {
      const li = document.createElement('li');
      const spanName = document.createElement('span');
      spanName.textContent = name;
      const spanCount = document.createElement('span');
      spanCount.className = 'count';
      const c = ingredientCounts[name];
      spanCount.textContent = c > 1 ? `×${c}` : '';
      li.appendChild(spanName);
      li.appendChild(spanCount);
      listEl.appendChild(li);
    });
  }
});
