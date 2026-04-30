// ═══════════════════════════════════════════════════════════════════════════════
// INGREDIENT PRICING DATABASE - CASTELLÓN, SPAIN
// ═══════════════════════════════════════════════════════════════════════════════
// Last updated: April 2026
// Source: Average prices from major Spanish supermarkets (Mercadona, Consum, Carrefour)
// Prices in EUR (€) per standard unit
// Note: Prices fluctuate seasonally ±10-15%

const INGREDIENT_PRICES = {
  // ===== PROTEINS =====
  'Large eggs': { price: 0.28, unit: 'per egg', category: 'proteins' }, // €3.30/dozen
  'Egg whites': { price: 2.50, unit: 'per 500g', category: 'proteins' },
  'Hard-boiled eggs': { price: 0.28, unit: 'per egg', category: 'proteins' },
  'Chicken breast': { price: 6.50, unit: 'per kg', category: 'proteins' },
  'Lean beef strips': { price: 9.00, unit: 'per kg', category: 'proteins' },
  'Pork tenderloin': { price: 7.50, unit: 'per kg', category: 'proteins' },
  'Turkey sausage': { price: 4.50, unit: 'per 200g pack', category: 'proteins' },
  'Lean turkey mince': { price: 6.00, unit: 'per kg', category: 'proteins' },
  'Salmon fillet': { price: 12.00, unit: 'per kg', category: 'proteins' },
  'Protein powder': { price: 15.00, unit: 'per kg', category: 'proteins' },
  'Canned tuna in water': { price: 1.20, unit: 'per 150g can', category: 'proteins' },
  'Canned tuna': { price: 1.20, unit: 'per 150g can', category: 'proteins' },
  'Shrimp (medium)': { price: 13.00, unit: 'per kg', category: 'proteins' },
  'Cod fillet': { price: 10.00, unit: 'per kg', category: 'proteins' },
  'Sea bass fillet': { price: 11.00, unit: 'per kg', category: 'proteins' },
  'Firm tofu': { price: 2.80, unit: 'per 400g pack', category: 'proteins' },
  'Black beans (canned)': { price: 0.90, unit: 'per 400g can', category: 'proteins' },
  'Turkey mince': { price: 6.00, unit: 'per kg', category: 'proteins' },
  'Beef jerky': { price: 12.00, unit: 'per 100g pack', category: 'proteins' },
  'Smoked salmon': { price: 18.00, unit: 'per 100g pack', category: 'proteins' },
  'Grilled chicken': { price: 7.50, unit: 'per kg', category: 'proteins' },
  'White fish fillet (haddock/cod)': { price: 10.00, unit: 'per kg', category: 'proteins' },

  // ===== BREADS & GRAINS =====
  'Wholegrain bread': { price: 1.80, unit: 'per 500g loaf', category: 'grains' },
  'Whole wheat bread': { price: 1.80, unit: 'per 500g loaf', category: 'grains' },
  'Rolled oats': { price: 1.40, unit: 'per kg', category: 'grains' },
  'oats': { price: 1.40, unit: 'per kg', category: 'grains' },
  'Granola': { price: 4.50, unit: 'per kg', category: 'grains' },
  'Brown rice': { price: 0.60, unit: 'per kg', category: 'grains' },
  'Whole wheat tortilla': { price: 2.20, unit: 'per 6-pack', category: 'grains' },
  'Egg noodles': { price: 1.20, unit: 'per 500g', category: 'grains' },
  'Rice noodles': { price: 1.50, unit: 'per 300g pack', category: 'grains' },
  'Pasta': { price: 0.85, unit: 'per 500g', category: 'grains' },
  'Quinoa': { price: 3.50, unit: 'per 500g', category: 'grains' },
  'Couscous': { price: 1.80, unit: 'per 500g', category: 'grains' },
  'Bagel': { price: 3.00, unit: 'per 4-pack', category: 'grains' },
  'Whole wheat bagel': { price: 3.00, unit: 'per 4-pack', category: 'grains' },
  'Rice cakes': { price: 2.40, unit: 'per 130g pack', category: 'grains' },
  'Oat flour': { price: 2.80, unit: 'per 500g', category: 'grains' },
  'Breadcrumbs': { price: 1.50, unit: 'per 400g', category: 'grains' },
  'Whole wheat pasta': { price: 1.20, unit: 'per 500g', category: 'grains' },
  'Canned chickpeas': { price: 0.95, unit: 'per 400g can', category: 'grains' },
  'Red lentils': { price: 1.80, unit: 'per 500g', category: 'grains' },

  // ===== VEGETABLES & FRUITS =====
  'Avocado': { price: 0.85, unit: 'per unit', category: 'vegetables' },
  'Banana': { price: 0.12, unit: 'per unit', category: 'vegetables' },
  'Frozen banana': { price: 3.20, unit: 'per kg', category: 'vegetables' },
  'Blueberries': { price: 4.50, unit: 'per 200g pack', category: 'vegetables' },
  'Frozen berries': { price: 3.80, unit: 'per kg', category: 'vegetables' },
  'Frozen mixed berries': { price: 3.50, unit: 'per kg', category: 'vegetables' },
  'Mixed berries': { price: 4.80, unit: 'per kg', category: 'vegetables' },
  'Spinach': { price: 1.80, unit: 'per 250g', category: 'vegetables' },
  'Baby spinach': { price: 2.20, unit: 'per 250g', category: 'vegetables' },
  'Red capsicum': { price: 2.50, unit: 'per kg', category: 'vegetables' },
  'Capsicum': { price: 2.50, unit: 'per kg', category: 'vegetables' },
  'Bell pepper': { price: 2.50, unit: 'per kg', category: 'vegetables' },
  'Bell peppers': { price: 2.50, unit: 'per kg', category: 'vegetables' },
  'Broccoli': { price: 2.00, unit: 'per kg', category: 'vegetables' },
  'Asparagus': { price: 3.50, unit: 'per kg', category: 'vegetables' },
  'Carrot': { price: 0.90, unit: 'per kg', category: 'vegetables' },
  'Carrots': { price: 0.90, unit: 'per kg', category: 'vegetables' },
  'Sweet potato': { price: 1.50, unit: 'per kg', category: 'vegetables' },
  'Tomato': { price: 1.80, unit: 'per kg', category: 'vegetables' },
  'Cherry tomatoes': { price: 2.80, unit: 'per kg', category: 'vegetables' },
  'Canned tomatoes': { price: 0.75, unit: 'per 400g can', category: 'vegetables' },
  'Lettuce': { price: 1.20, unit: 'per unit', category: 'vegetables' },
  'Cos lettuce': { price: 1.50, unit: 'per unit', category: 'vegetables' },
  'Mixed salad leaves': { price: 2.20, unit: 'per 200g', category: 'vegetables' },
  'Mixed greens': { price: 2.20, unit: 'per 200g', category: 'vegetables' },
  'Lemon': { price: 0.20, unit: 'per unit', category: 'vegetables' },
  'Garlic': { price: 2.50, unit: 'per kg', category: 'vegetables' },
  'Onion': { price: 0.95, unit: 'per kg', category: 'vegetables' },
  'Red onion': { price: 1.20, unit: 'per kg', category: 'vegetables' },
  'Ginger': { price: 3.50, unit: 'per kg', category: 'vegetables' },
  'Dried apricots': { price: 6.00, unit: 'per kg', category: 'vegetables' },
  'Red grapes': { price: 2.80, unit: 'per kg', category: 'vegetables' },
  'Grapes': { price: 2.80, unit: 'per kg', category: 'vegetables' },
  'Brussels sprouts': { price: 2.80, unit: 'per kg', category: 'vegetables' },
  'fresh berries': { price: 4.50, unit: 'per kg', category: 'vegetables' },
  'Mixed nuts (raw)': { price: 8.50, unit: 'per 500g', category: 'vegetables' },
  'Walnuts': { price: 8.00, unit: 'per 500g', category: 'vegetables' },
  'Peanuts': { price: 5.50, unit: 'per 500g', category: 'vegetables' },
  'Apple': { price: 1.50, unit: 'per kg', category: 'vegetables' },
  'Cucumber': { price: 1.20, unit: 'per kg', category: 'vegetables' },
  'Celery': { price: 1.80, unit: 'per kg', category: 'vegetables' },
  'Zucchini': { price: 1.40, unit: 'per kg', category: 'vegetables' },
  'Green beans': { price: 2.40, unit: 'per kg', category: 'vegetables' },
  'New potatoes': { price: 1.20, unit: 'per kg', category: 'vegetables' },

  // ===== DAIRY & ALTERNATIVES =====
  'Greek yogurt (0% fat)': { price: 3.20, unit: 'per 500g', category: 'dairy' },
  'Plain Greek yogurt': { price: 3.20, unit: 'per 500g', category: 'dairy' },
  'Almond milk': { price: 1.80, unit: 'per liter', category: 'dairy' },
  'Milk (2%)': { price: 0.95, unit: 'per liter', category: 'dairy' },
  'Feta cheese': { price: 8.50, unit: 'per 200g', category: 'dairy' },
  'Cheddar cheese': { price: 9.00, unit: 'per 200g', category: 'dairy' },
  'String cheese': { price: 4.50, unit: 'per 200g pack', category: 'dairy' },
  'Fresh mozzarella': { price: 4.80, unit: 'per 250g', category: 'dairy' },
  'Cream cheese': { price: 3.50, unit: 'per 200g', category: 'dairy' },
  'Parmesan cheese': { price: 11.00, unit: 'per 200g', category: 'dairy' },
  'Light Caesar dressing': { price: 2.80, unit: 'per 250ml', category: 'dairy' },
  'Coconut milk': { price: 2.20, unit: 'per 400ml can', category: 'dairy' },
  'Light coconut milk': { price: 2.20, unit: 'per 400ml can', category: 'dairy' },
  'Greek yogurt': { price: 3.20, unit: 'per 500g', category: 'dairy' },
  'Low-fat cottage cheese': { price: 2.80, unit: 'per 500g', category: 'dairy' },
  'Cottage cheese': { price: 2.80, unit: 'per 500g', category: 'dairy' },

  // ===== PANTRY & SPICES & SEASONINGS =====
  'Honey': { price: 4.50, unit: 'per 500g', category: 'pantry' },
  'Almond butter': { price: 7.50, unit: 'per 500g', category: 'pantry' },
  'Peanut butter': { price: 3.50, unit: 'per 500g', category: 'pantry' },
  'Chia seeds': { price: 8.00, unit: 'per 200g', category: 'pantry' },
  'Cinnamon': { price: 4.50, unit: 'per 50g', category: 'pantry' },
  'Paprika': { price: 3.50, unit: 'per 50g', category: 'pantry' },
  'Salt & black pepper': { price: 1.50, unit: 'per 100g', category: 'pantry' },
  'Salt & pepper': { price: 1.50, unit: 'per 100g', category: 'pantry' },
  'Salt': { price: 0.50, unit: 'per 500g', category: 'pantry' },
  'Pepper': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Black pepper': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Olive oil': { price: 5.50, unit: 'per liter', category: 'pantry' },
  'Extra virgin olive oil': { price: 8.00, unit: 'per liter', category: 'pantry' },
  'Sesame oil': { price: 6.00, unit: 'per 500ml', category: 'pantry' },
  'Soy sauce': { price: 2.50, unit: 'per 500ml', category: 'pantry' },
  'Oyster sauce': { price: 3.20, unit: 'per 250ml', category: 'pantry' },
  'Curry paste (mild)': { price: 3.80, unit: 'per jar', category: 'pantry' },
  'Pad Thai sauce': { price: 2.50, unit: 'per 250ml', category: 'pantry' },
  'Passata tomato sauce': { price: 1.20, unit: 'per 500ml', category: 'pantry' },
  'Butter': { price: 3.50, unit: 'per 250g', category: 'pantry' },
  'Dill': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Dill or herbs': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Italian herbs': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Herbs': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Rosemary': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Basil': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Cilantro': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Parsley': { price: 2.50, unit: 'per bunch', category: 'pantry' },
  'Garlic powder': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Garlic & ginger': { price: 2.50, unit: 'per jar', category: 'pantry' },
  'Cumin & paprika': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Cumin': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Oregano': { price: 3.00, unit: 'per 50g', category: 'pantry' },
  'Lemon juice': { price: 1.80, unit: 'per 250ml', category: 'pantry' },
  'Lime': { price: 0.25, unit: 'per unit', category: 'pantry' },
  'Lime juice': { price: 1.80, unit: 'per 250ml', category: 'pantry' },
  'Lime wedge': { price: 0.25, unit: 'per unit', category: 'pantry' },
  'Lemon & herbs': { price: 2.50, unit: 'per jar', category: 'pantry' },
  'Lemon zest': { price: 0.20, unit: 'per unit', category: 'pantry' },
  'Hummus': { price: 2.80, unit: 'per 200g', category: 'pantry' },
  'Salsa': { price: 2.20, unit: 'per 200g', category: 'pantry' },
  'Coconut flakes': { price: 4.50, unit: 'per 200g', category: 'pantry' },
  'Dark chocolate': { price: 3.50, unit: 'per 100g', category: 'pantry' },
  'Olives (pitted)': { price: 3.50, unit: 'per 250g', category: 'pantry' },
  'Croutons': { price: 2.20, unit: 'per 150g', category: 'pantry' },
  'Vegetable stock': { price: 1.50, unit: 'per liter', category: 'pantry' }
};

// Function to calculate cost per ingredient
function calculateIngredientCost(ingredientName, amount, unit) {
  const ingredientData = INGREDIENT_PRICES[ingredientName];
  
  if (!ingredientData) {
    console.warn(`⚠️ Price not found for: ${ingredientName}`);
    return 0;
  }

  const { price, unit: priceUnit } = ingredientData;
  
  // Convert amount to price unit equivalent
  let costMultiplier = 1;
  
  // Handle common unit conversions
  const conversions = {
    'g': { 'per kg': 0.001, 'per 500g': 0.002, 'per 200g': 0.005, 'per 150g': 0.00667 },
    'ml': { 'per liter': 0.001, 'per 500ml': 0.002, 'per 250ml': 0.004, 'per 400ml': 0.0025 },
    'tbsp': { 'per tbsp': 1, 'per 15ml': 1 }, // 1 tbsp ≈ 15ml
    'tsp': { 'per tsp': 1, 'per 5ml': 1 },   // 1 tsp ≈ 5ml
    'whole': { 'per unit': 1 },
    'cup': { 'per cup': 1 },
    'clove': { 'per unit': 1 },
    'cloves': { 'per kg': 0.001 }, // rough estimate
    'bunch': { 'per bunch': 1 },
    'pack': { 'per pack': 1, 'per 200g pack': 1, 'per 250g': 1 },
    'can': { 'per 150g can': 1, 'per 400g can': 1, 'per 400ml can': 1 },
    'jar': { 'per jar': 1 },
    'loaf': { 'per 500g loaf': 1 },
    'liter': { 'per liter': 1 },
    'kg': { 'per kg': 1 },
    'drained': { 'per 400g can': 1 }, // estimate for drained
  };
  
  if (conversions[unit] && conversions[unit][priceUnit]) {
    costMultiplier = amount * conversions[unit][priceUnit];
  } else if (unit === priceUnit) {
    costMultiplier = amount;
  }
  
  return price * costMultiplier;
}

// Function to format cost as EUR
function formatCost(cost) {
  return cost.toFixed(2) + '€';
}
