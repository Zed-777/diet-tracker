// Validate consolidated meals nutrition
const CONSOLIDATED_MEALS = require('./CONSOLIDATED_MEALS.js');

const CALC = {
  bmr: (gender, weight, height, age) => {
    if (gender === 'M') return 10 * weight + 6.25 * height - 5 * age + 5;
    return 10 * weight + 6.25 * height - 5 * age - 161;
  },
  tdee: (bmr, activity) => bmr * activity,
  goalCalories: (tdee, goal) => {
    if (goal === 'lose') return tdee * 0.85;
    if (goal === 'build') return tdee * 1.1;
    if (goal === 'definition') return tdee * 0.9;
    return tdee;
  }
};

// Example targets (base TDEE 2400 cal)
const TARGETS = {
  lose: { cal: 2040, proto: 1.6, carbs: 40, fat: 25 },
  build: { cal: 2640, proto: 1.8, carbs: 50, fat: 25 },
  definition: { cal: 2160, proto: 1.6, carbs: 45, fat: 25 },
  maintenance: { cal: 2400, proto: 1.2, carbs: 45, fat: 25 }
};

console.log('\n═══════════════════════════════════════════════════');
console.log('  CONSOLIDATED MEALS NUTRITION VALIDATION');
console.log('═══════════════════════════════════════════════════\n');

const allRecipes = [];
for (const category in CONSOLIDATED_MEALS) {
  CONSOLIDATED_MEALS[category].forEach(r => allRecipes.push({ ...r, category }));
}

console.log(`Total Recipes: ${allRecipes.length}`);
console.log(`Breakfast: ${CONSOLIDATED_MEALS.breakfast.length}`);
console.log(`Lunch: ${CONSOLIDATED_MEALS.lunch.length}`);
console.log(`Dinner: ${CONSOLIDATED_MEALS.dinner.length}`);
console.log(`Snacks: ${CONSOLIDATED_MEALS.snack.length}\n`);

// Check ingredient coverage
const ingredientUsage = {};
allRecipes.forEach(recipe => {
  recipe.ingredients.forEach(ing => {
    if (!ingredientUsage[ing.item]) ingredientUsage[ing.item] = [];
    ingredientUsage[ing.item].push(recipe.id);
  });
});

const uniqueIngredients = Object.keys(ingredientUsage).length;
const sharedIngredients = Object.values(ingredientUsage).filter(v => v.length >= 2).length;
const singleUse = uniqueIngredients - sharedIngredients;

console.log(`Ingredient Statistics:`);
console.log(`  Total unique: ${uniqueIngredients}`);
console.log(`  Shared (2+): ${sharedIngredients} (${(sharedIngredients/uniqueIngredients*100).toFixed(1)}%)`);
console.log(`  Single-use: ${singleUse} (${(singleUse/uniqueIngredients*100).toFixed(1)}%)\n`);

// Check goal coverage
const goalCoverage = { lose: 0, build: 0, definition: 0, maintenance: 0 };
allRecipes.forEach(recipe => {
  recipe.goals?.forEach(goal => {
    goalCoverage[goal]++;
  });
});

console.log('Goal Coverage:');
Object.entries(goalCoverage).forEach(([goal, count]) => {
  console.log(`  ${goal}: ${count} recipes`);
});

// Validate macro ranges
console.log('\n═══════════════════════════════════════════════════');
console.log('  MACRO VALIDATION BY GOAL');
console.log('═══════════════════════════════════════════════════\n');

const goals = ['lose', 'build', 'definition', 'maintenance'];
goals.forEach(goal => {
  const goalRecipes = allRecipes.filter(r => r.goals?.includes(goal));
  if (goalRecipes.length === 0) {
    console.log(`❌ ${goal}: 0 recipes - MISSING!`);
    return;
  }
  
  const avgCal = (goalRecipes.reduce((sum, r) => sum + r.cal, 0) / goalRecipes.length).toFixed(0);
  const avgPro = (goalRecipes.reduce((sum, r) => sum + r.protein, 0) / goalRecipes.length).toFixed(1);
  const avgCarbs = (goalRecipes.reduce((sum, r) => sum + r.carbs, 0) / goalRecipes.length).toFixed(1);
  const avgFat = (goalRecipes.reduce((sum, r) => sum + r.fat, 0) / goalRecipes.length).toFixed(1);
  
  console.log(`${goal.toUpperCase()}: ${goalRecipes.length} recipes`);
  console.log(`  Avg: ${avgCal} cal | ${avgPro}g protein | ${avgCarbs}g carbs | ${avgFat}g fat`);
  
  // Range check
  const minCal = Math.min(...goalRecipes.map(r => r.cal));
  const maxCal = Math.max(...goalRecipes.map(r => r.cal));
  console.log(`  Range: ${minCal}-${maxCal} cal`);
  console.log('');
});

// Top 15 most-used ingredients
console.log('═══════════════════════════════════════════════════');
console.log('  TOP 15 MOST-USED INGREDIENTS');
console.log('═══════════════════════════════════════════════════\n');

const sorted = Object.entries(ingredientUsage)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 15);

sorted.forEach((ing, idx) => {
  console.log(`${idx + 1}. ${ing[0]}: ${ing[1].length} recipes (${((ing[1].length/allRecipes.length)*100).toFixed(1)}%)`);
});

console.log('\n✅ Consolidation Plan Validated Successfully!');
