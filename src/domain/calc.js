(function attachCalc(global) {
  global.CALC = {
    bmr(gender, weight, height, age) {
      const base = (10 * weight) + (6.25 * height) - (5 * age);
      return gender === 'male' ? base + 5 : base - 161;
    },
    tdee(bmr, activity) {
      return Math.round(bmr * parseFloat(activity));
    },
    goalCalories(tdee, goal) {
      const adj = { lose: -500, build: 300, definition: -250, maintenance: 0 };
      return Math.max(1200, tdee + (adj[goal] || 0));
    },
    macros(calories, goal) {
      const splits = {
        lose: { p: 0.35, c: 0.35, f: 0.30 },
        build: { p: 0.30, c: 0.45, f: 0.25 },
        definition: { p: 0.40, c: 0.35, f: 0.25 },
        maintenance: { p: 0.30, c: 0.40, f: 0.30 }
      };
      const split = splits[goal] || splits.maintenance;
      return {
        protein: Math.round((calories * split.p) / 4),
        carbs: Math.round((calories * split.c) / 4),
        fat: Math.round((calories * split.f) / 9)
      };
    },
    bmi(weight, height) {
      const normalizedHeight = height / 100;
      return (weight / (normalizedHeight * normalizedHeight)).toFixed(1);
    },
    bmiLabel(bmi) {
      const parsedBmi = parseFloat(bmi);
      if (parsedBmi < 18.5) return 'Underweight';
      if (parsedBmi < 25) return 'Healthy';
      if (parsedBmi < 30) return 'Overweight';
      return 'Obese';
    },
    waterTarget(weight) {
      return Math.round(weight * 0.033 * 10) / 10;
    }
  };
})(window);