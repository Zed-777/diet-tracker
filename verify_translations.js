// Load the HTML file and verify all meal names have translations
const fs = require('fs');

const html = fs.readFileSync('diet-tracker.html', 'utf-8');

// Extract MEALS object by parsing JavaScript
const mealsMatch = html.match(/const MEALS = \{([\s\S]*?)\};\s*\/\/ Spanish translations/);
if (!mealsMatch) {
  console.error('❌ Could not find MEALS object');
  process.exit(1);
}

// Extract MEAL_TRANSLATIONS object
const translationsMatch = html.match(/const MEAL_TRANSLATIONS = \{([\s\S]*?)\};[\s\n]*function getMealInSpanish/);
if (!translationsMatch) {
  console.error('❌ Could not find MEAL_TRANSLATIONS object');
  process.exit(1);
}

// Parse meal names from MEALS using regex
const mealNames = new Set();
const nameRegex = /name:'([^']+)'/g;
let match;
while ((match = nameRegex.exec(mealsMatch[0])) !== null) {
  mealNames.add(match[1]);
}

// Parse translation keys from MEAL_TRANSLATIONS
const translationKeys = new Set();
const transRegex = /'([^']+)':\s*'[^']+'/g;
while ((match = transRegex.exec(translationsMatch[0])) !== null) {
  translationKeys.add(match[1]);
}

// Check for missing translations
const missingTranslations = [];
const foundTranslations = [];

for (const mealName of mealNames) {
  if (translationKeys.has(mealName)) {
    foundTranslations.push(mealName);
  } else {
    missingTranslations.push(mealName);
  }
}

// Report
console.log('\n╔════════════════════════════════════════════════════╗');
console.log('║         MEAL NAME TRANSLATION VERIFICATION        ║');
console.log('╚════════════════════════════════════════════════════╝\n');

console.log(`📊 STATISTICS:`);
console.log(`   Total unique meal names: ${mealNames.size}`);
console.log(`   Translated: ${foundTranslations.length}`);
console.log(`   Missing: ${missingTranslations.length}`);

if (missingTranslations.length === 0) {
  console.log('\n✅ ALL MEAL NAMES HAVE SPANISH TRANSLATIONS!');
} else {
  console.log('\n⚠️  MISSING TRANSLATIONS:');
  missingTranslations.forEach(name => {
    console.log(`   - "${name}"`);
  });
}

// Check ingredient translations
console.log('\n' + '═'.repeat(52));
console.log('         INGREDIENT TRANSLATION CHECK');
console.log('═'.repeat(52));

const ingredientRegex = /\{item:'([^']+)',/g;
const ingredients = new Set();
while ((match = ingredientRegex.exec(html)) !== null) {
  ingredients.add(match[1]);
}

const missingIngredientTranslations = [];
const foundIngredientTranslations = [];

for (const ingredient of ingredients) {
  if (translationKeys.has(ingredient)) {
    foundIngredientTranslations.push(ingredient);
  } else {
    missingIngredientTranslations.push(ingredient);
  }
}

console.log(`\n📊 STATISTICS:`);
console.log(`   Total unique ingredients: ${ingredients.size}`);
console.log(`   Translated: ${foundIngredientTranslations.length}`);
console.log(`   Missing: ${missingIngredientTranslations.length}`);

if (missingIngredientTranslations.length === 0) {
  console.log('\n✅ ALL INGREDIENTS HAVE SPANISH TRANSLATIONS!');
} else {
  console.log('\n⚠️  MISSING INGREDIENT TRANSLATIONS:');
  missingIngredientTranslations.forEach(ing => {
    console.log(`   - "${ing}"`);
  });
}

console.log('\n' + '═'.repeat(52) + '\n');

// Exit with error if translations missing
if (missingTranslations.length > 0 || missingIngredientTranslations.length > 0) {
  process.exit(1);
}
