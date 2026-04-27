// Export CONSOLIDATED_MEALS as JSON for Python injection
const CONSOLIDATED_MEALS = require('./CONSOLIDATED_MEALS.js');
console.log(JSON.stringify(CONSOLIDATED_MEALS, null, 0));
