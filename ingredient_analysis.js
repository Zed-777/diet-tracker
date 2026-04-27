// Ingredient Analysis for Diet Tracker
const mealsList = [
  // Breakfast (10 recipes)
  {name: 'b1: Scrambled Eggs & Avocado Toast', ing: ['Large eggs', 'Wholegrain bread', 'Avocado', 'Butter', 'Salt & black pepper']},
  {name: 'b2: Greek Yogurt Parfait', ing: ['Greek yogurt (0% fat)', 'Mixed berries', 'Granola', 'Honey']},
  {name: 'b3: Protein Oatmeal with Banana', ing: ['Rolled oats', 'Protein powder', 'Banana', 'Almond milk', 'Cinnamon']},
  {name: 'b4: Veggie & Feta Omelette', ing: ['Large eggs', 'Spinach', 'Red capsicum', 'Feta cheese', 'Olive oil', 'Salt & pepper']},
  {name: 'b5: Berry Smoothie Bowl', ing: ['Frozen banana', 'Frozen berries', 'Protein powder', 'Almond milk', 'Chia seeds', 'Coconut flakes']},
  {name: 'b6: Overnight Chia Pudding', ing: ['Greek yogurt', 'Chia seeds', 'Almond milk', 'Protein powder', 'Mixed berries', 'Honey']},
  {name: 'b7: Breakfast Burrito', ing: ['Large eggs', 'Turkey sausage', 'Whole wheat tortilla', 'Cheddar cheese', 'Capsicum', 'Avocado', 'Salsa']},
  {name: 'b8: Protein Pancakes', ing: ['Egg whites', 'Rolled oats', 'Protein powder', 'Banana', 'Almond butter', 'Cinnamon']},
  {name: 'b9: Smoked Salmon Bagel', ing: ['Whole wheat bagel', 'Cream cheese', 'Smoked salmon', 'Cucumber', 'Red onion', 'Lemon juice']},
  {name: 'b10: Cottage Cheese & Fruit Bowl', ing: ['Cottage cheese (2%)', 'Blueberries', 'Apple', 'Walnuts', 'Honey']},
  
  // Lunch (11 recipes)
  {name: 'l1: Chicken & Brown Rice Bowl', ing: ['Chicken breast', 'Brown rice', 'Broccoli', 'Soy sauce', 'Sesame oil', 'Garlic']},
  {name: 'l2: Tuna Salad Wrap', ing: ['Canned tuna in water', 'Wholegrain wrap', 'Greek yogurt', 'Mixed salad leaves', 'Cherry tomatoes', 'Cucumber', 'Lemon juice']},
  {name: 'l3: Grilled Salmon Quinoa Salad', ing: ['Salmon fillet', 'Quinoa', 'Baby spinach', 'Cherry tomatoes', 'Cucumber', 'Olive oil', 'Lemon']},
  {name: 'l4: Turkey Stir-Fry Noodles', ing: ['Lean turkey mince', 'Egg noodles', 'Mixed stir-fry veg', 'Soy sauce', 'Oyster sauce', 'Garlic & ginger', 'Sesame oil']},
  {name: 'l5: Red Lentil Soup', ing: ['Red lentils', 'Wholegrain bread', 'Onion', 'Carrot', 'Canned tomatoes', 'Cumin & paprika', 'Vegetable stock']},
  {name: 'l6: Chicken Caesar Salad', ing: ['Chicken breast', 'Cos lettuce', 'Cherry tomatoes', 'Parmesan cheese', 'Croutons', 'Light Caesar dressing']},
  {name: 'l7: Lean Beef & Broccoli Rice', ing: ['Lean beef strips', 'Brown rice', 'Broccoli', 'Soy sauce', 'Garlic', 'Sesame oil']},
  {name: 'l8: Mediterranean Chickpea Salad', ing: ['Canned chickpeas', 'Mixed salad leaves', 'Cherry tomatoes', 'Cucumber', 'Red onion', 'Feta cheese', 'Olive oil']},
  {name: 'l9: Grilled Cod with Couscous', ing: ['Cod fillet', 'Couscous', 'Mixed veg (carrot, zucchini)', 'Olive oil', 'Lemon', 'Herbs (dill/parsley)']},
  {name: 'l10: Caprese Pasta Turkey Meatballs', ing: ['Whole wheat pasta', 'Turkey mince', 'Cherry tomatoes', 'Fresh mozzarella', 'Basil', 'Olive oil & garlic']},
  {name: 'l11: Thai Shrimp Pad Thai', ing: ['Shrimp (medium)', 'Rice noodles', 'Mixed Asian veg', 'Pad Thai sauce', 'Peanuts', 'Lime & cilantro']},
  
  // Dinner (10 recipes)
  {name: 'd1: Grilled Chicken Sweet Potato Broccoli', ing: ['Chicken breast', 'Sweet potato', 'Broccoli', 'Olive oil', 'Garlic powder', 'Paprika']},
  {name: 'd2: Baked Salmon Brown Rice Asparagus', ing: ['Salmon fillet', 'Brown rice', 'Asparagus', 'Lemon', 'Olive oil', 'Dill or herbs']},
  {name: 'd3: Lean Beef Stir-Fry Rice Noodles', ing: ['Lean beef strips', 'Rice noodles', 'Asian mixed veg', 'Oyster sauce', 'Soy sauce', 'Garlic & ginger', 'Sesame oil']},
  {name: 'd4: Turkey Meatballs Zucchini Noodles', ing: ['Lean turkey mince', 'Zucchini', 'Passata tomato sauce', 'Parmesan cheese', 'Egg', 'Breadcrumbs', 'Italian herbs']},
  {name: 'd5: Baked Cod Quinoa Roasted Veg', ing: ['Cod fillet', 'Quinoa', 'Capsicum', 'Zucchini', 'Red onion', 'Olive oil', 'Lemon & herbs']},
  {name: 'd6: Chicken Curry Brown Rice', ing: ['Chicken breast', 'Brown rice', 'Light coconut milk', 'Spinach', 'Canned tomatoes', 'Curry paste (mild)', 'Onion & garlic']},
  {name: 'd7: Grilled Sea Bass Potatoes Green Beans', ing: ['Sea bass fillet', 'New potatoes', 'Green beans', 'Lemon', 'Olive oil', 'Dill']},
  {name: 'd8: Vegetarian Tofu Black Bean Stir-Fry', ing: ['Firm tofu', 'Black beans (canned)', 'Brown rice', 'Mixed veg (peppers, onion, broccoli)', 'Soy sauce', 'Ginger & garlic', 'Sesame oil']},
  {name: 'd9: Pork Tenderloin Roasted Vegetables', ing: ['Pork tenderloin', 'Sweet potato', 'Carrot', 'Brussels sprouts', 'Olive oil', 'Rosemary']},
  {name: 'd10: Greek Baked White Fish Tomato Feta', ing: ['White fish fillet (haddock/cod)', 'Canned tomatoes', 'Olives (pitted)', 'Feta cheese', 'Spinach', 'Garlic & oregano', 'Olive oil']},
  
  // Snacks (11 recipes)
  {name: 's1: Apple & Almond Butter', ing: ['Apple', 'Almond butter']},
  {name: 's2: Protein Shake with Banana', ing: ['Protein powder', 'Milk (2%)', 'Banana']},
  {name: 's3: Cottage Cheese & Berries', ing: ['Low-fat cottage cheese', 'Mixed berries']},
  {name: 's4: Hard-Boiled Eggs Paprika', ing: ['Large eggs', 'Paprika', 'Salt']},
  {name: 's5: Mixed Nuts & Dried Fruit', ing: ['Mixed nuts (raw)', 'Dried apricots']},
  {name: 's6: Rice Cakes Hummus Veggies', ing: ['Rice cakes (plain)', 'Hummus', 'Cucumber slices', 'Cherry tomatoes']},
  {name: 's7: String Cheese & Grapes', ing: ['String cheese', 'Red grapes']},
  {name: 's8: Beef Jerky & Carrot Sticks', ing: ['Lean beef jerky', 'Carrots']},
  {name: 's9: Protein Energy Balls', ing: ['Protein powder', 'Oat flour', 'Peanut butter', 'Honey', 'Dark chocolate']},
  {name: 's10: Greek Yogurt Granola Honey', ing: ['Plain Greek yogurt', 'Granola', 'Honey', 'Blueberries']},
  {name: 's11: Hummus Veggie Platter', ing: ['Hummus', 'Carrot sticks', 'Celery sticks', 'Bell pepper strips', 'Cherry tomatoes']}
];

// Normalize ingredient names
function normalizeIng(ing) {
  return ing.toLowerCase()
    .replace(/^(large |whole |plain |lean |frozen |canned |raw |low-fat |fresh |light |mild )/gi, '')
    .replace(/\s*\(.*?\)/g, '') // Remove parentheses and content
    .replace(/\s*&\s*/g, ' ') // Replace & with space
    .replace(/\s+/g, ' ')
    .trim();
}

// Build ingredient map
const ingredients = {};
const recipesByIng = {};

mealsList.forEach(meal => {
  meal.ing.forEach(ing => {
    const norm = normalizeIng(ing);
    if (!ingredients[norm]) {
      ingredients[norm] = 0;
      recipesByIng[norm] = [];
    }
    ingredients[norm]++;
    recipesByIng[norm].push(meal.name);
  });
});

const uniqueIngredients = Object.keys(ingredients);
const sharedIngredients = uniqueIngredients.filter(ing => ingredients[ing] > 1);
const uniqueToOneRecipe = uniqueIngredients.filter(ing => ingredients[ing] === 1);

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║           DIET TRACKER INGREDIENT ANALYSIS                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log(`📊 OVERVIEW`);
console.log(`───────────────────────────────────────────────────────────`);
console.log(`   Total Recipes:                          42`);
console.log(`   Unique Individual Ingredients:          ${uniqueIngredients.length}`);
console.log(`   Ingredients Shared (2+ recipes):        ${sharedIngredients.length}`);
console.log(`   Ingredients Used in Only 1 Recipe:      ${uniqueToOneRecipe.length}\n`);

console.log(`🔄 TOP 25 MOST SHARED INGREDIENTS`);
console.log(`───────────────────────────────────────────────────────────`);
const sorted = sharedIngredients.sort((a, b) => ingredients[b] - ingredients[a]);
sorted.slice(0, 25).forEach((ing, i) => {
  console.log(`   ${i+1}.  "${ing}" - ${ingredients[ing]} recipes`);
});

console.log(`\n🧅 INGREDIENTS USED IN ONLY 1 RECIPE (${uniqueToOneRecipe.length} total)`);
console.log(`───────────────────────────────────────────────────────────`);
uniqueToOneRecipe.sort().forEach(ing => {
  console.log(`   • "${ing}" - ${recipesByIng[ing][0]}`);
});

console.log(`\n═══════════════════════════════════════════════════════════\n`);
