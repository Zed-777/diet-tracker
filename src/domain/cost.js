(function attachCost(global) {
  global.COST = {
    getIngredientCost(ingredientName, amount, unit) {
      const priceData = global.INGREDIENT_PRICES?.[ingredientName];
      if (!priceData) return 0;

      const { price, unit: priceUnit } = priceData;
      let multiplier = 1;

      const conversions = {
        'g': {'per kg': 0.001, 'per 500g': 0.002, 'per 250g': 0.004, 'per 200g': 0.005, 'per 150g': 0.00667, 'per 100g': 0.01},
        'ml': {'per liter': 0.001, 'per 500ml': 0.002, 'per 400ml': 0.0025, 'per 250ml': 0.004},
        'tbsp': {'per tbsp': 1}, 'tsp': {'per tsp': 1},
        'whole': {'each': 1, 'per unit': 1}, 'egg': {'per egg': 1}, 'cup': {'per cup': 1},
        'clove': {'per unit': 1}, 'cloves': {'per kg': 0.001},
        'bunch': {'per bunch': 1}, 'pack': {'per pack': 1, 'per 200g': 1, 'per 250g': 1, 'per 300g': 1, 'per 400g': 1, 'per 500g': 1, 'per 6-pack': 0.167, 'per 4-pack': 0.25},
        'can': {'per can': 1, 'per 150g can': 1, 'per 400g can': 1, 'per 400ml can': 1},
        'jar': {'per jar': 1}, 'loaf': {'per loaf': 1}, 'liter': {'per liter': 1}, 'kg': {'per kg': 1},
        'drained': {'per can': 1},
        'each': {'each': 1}
      };

      if (conversions[unit] && conversions[unit][priceUnit]) {
        multiplier = amount * conversions[unit][priceUnit];
      } else if (unit === priceUnit || priceUnit === 'each' && unit === 'whole') {
        multiplier = amount;
      }

      return Math.max(0, price * multiplier);
    },

    getMealCost(mealOrId) {
      let meal;
      if (typeof mealOrId === 'string') {
        meal = Object.values(MEALS).flat().find(m => m.id === mealOrId);
      } else {
        meal = mealOrId;
      }
      if (!meal || !meal.ingredients) return 0;

      return meal.ingredients.reduce((sum, ing) => {
        return sum + this.getIngredientCost(ing.item, ing.amount, ing.unit);
      }, 0);
    },

    getDayCost(dateValue) {
      const log = S.logs[dateValue];
      if (!log || !log.completed) return 0;

      return log.completed.reduce((sum, mealId) => {
        return sum + this.getMealCost(mealId);
      }, 0);
    },

    getWeekCost(startDate) {
      let total = 0;
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        total += this.getDayCost(dateStr(date));
      }
      return total;
    },

    getMonthCost(y, m) {
      let total = 0;
      const days = daysInMonth(y, m);
      for (let day = 1; day <= days; day++) {
        const date = new Date(y, m, day);
        total += this.getDayCost(dateStr(date));
      }
      return total;
    },

    getCostByCategory(ingredientsList) {
      const categoryMap = {'proteins': 0, 'grains': 0, 'vegetables': 0, 'dairy': 0, 'pantry': 0};

      ingredientsList.forEach(ing => {
        const priceData = global.INGREDIENT_PRICES?.[ing.item];
        if (priceData) {
          const cost = this.getIngredientCost(ing.item, ing.amount, ing.unit);

          if (['Large eggs', 'Chicken breast', 'Salmon fillet', 'Beef strips', 'Turkey mince', 'Canned tuna'].some(p => ing.item.includes(p.split(' ')[0]))) categoryMap.proteins += cost;
          else if (['Brown rice', 'Pasta', 'Oats', 'Bread', 'Bagel', 'Rice cakes'].some(p => ing.item.includes(p.split(' ')[0]))) categoryMap.grains += cost;
          else if (['Spinach', 'Broccoli', 'Tomato', 'Carrot', 'Pepper', 'Onion', 'Lemon', 'Banana', 'Berries'].some(p => ing.item.includes(p))) categoryMap.vegetables += cost;
          else if (['Yogurt', 'Milk', 'Cheese', 'Cottage cheese'].some(p => ing.item.includes(p))) categoryMap.dairy += cost;
          else categoryMap.pantry += cost;
        }
      });

      return categoryMap;
    }
  };
})(window);
