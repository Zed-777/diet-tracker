#!/usr/bin/env python3
"""
Inject consolidated meals into diet-tracker.html
"""
import re

# Read the consolidated meals file
exec(open('CONSOLIDATED_MEALS.js').read().replace('const CONSOLIDATED_MEALS =', 'MEALS =').replace('if (typeof module', '# if (typeof module'))

# Read the HTML file
with open('diet-tracker.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Convert MEALS to JavaScript string format
def meals_to_js(meals_dict):
    """Convert Python dict to JavaScript object notation"""
    output = "  breakfast: [\n"
    
    for meal in meals_dict['breakfast']:
        output += f"    {{\n"
        output += f"      id:'{meal['id']}', name:'{meal['name'].replace(chr(39), chr(92)+chr(39))}',\n"
        output += f"      cal:{meal['cal']}, protein:{meal['protein']}, carbs:{meal['carbs']}, fat:{meal['fat']}, prepTime:{meal['prepTime']},\n"
        output += f"      goals:{str(meal['goals']).replace(chr(39), chr(34))},\n"
        output += f"      ingredients:[\n"
        for ing in meal['ingredients']:
            output += f"        {{item:'{ing['item'].replace(chr(39), chr(92)+chr(39))}',amount:{ing['amount']},unit:'{ing['unit']}',cat:'{ing['cat']}'}},\n"
        output += f"      ],\n"
        output += f"      recipe:[\n"
        for step in meal['recipe']:
            output += f"        '{step.replace(chr(39), chr(92)+chr(39))}',\n"
        output += f"      ]\n"
        output += f"    }},\n"
    
    output += "  ],\n"
    
    # Same for lunch, dinner, snacks...
    for section in ['lunch', 'dinner', 'snack']:
        output += f"  {section}: [\n"
        for meal in meals_dict[section]:
            output += f"    {{\n"
            output += f"      id:'{meal['id']}', name:'{meal['name'].replace(chr(39), chr(92)+chr(39))}',\n"
            output += f"      cal:{meal['cal']}, protein:{meal['protein']}, carbs:{meal['carbs']}, fat:{meal['fat']}, prepTime:{meal['prepTime']},\n"
            output += f"      goals:{str(meal['goals']).replace(chr(39), chr(34))},\n"
            output += f"      ingredients:[\n"
            for ing in meal['ingredients']:
                output += f"        {{item:'{ing['item'].replace(chr(39), chr(92)+chr(39))}',amount:{ing['amount']},unit:'{ing['unit']}',cat:'{ing['cat']}'}},\n"
            output += f"      ],\n"
            output += f"      recipe:[\n"
            for step in meal['recipe']:
                output += f"        '{step.replace(chr(39), chr(92)+chr(39))}',\n"
            output += f"      ]\n"
            output += f"    }},\n"
        output += f"  ],\n"
    
    return output

js_content = meals_to_js(MEALS)

# Find and replace the MEALS object
# Match from "breakfast: [" to "];" before the MEAL_TRANSLATIONS comment
pattern = r'(const MEALS = \{\n)(.*?)(\n\};)'
replacement = r'\1' + js_content + r'\3'

new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)

# Write back
with open('diet-tracker.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("✅ Consolidated meals injected into diet-tracker.html")
print(f"   Breakfast: {len(MEALS['breakfast'])} recipes")
print(f"   Lunch: {len(MEALS['lunch'])} recipes")
print(f"   Dinner: {len(MEALS['dinner'])} recipes")
print(f"   Snacks: {len(MEALS['snack'])} recipes")
