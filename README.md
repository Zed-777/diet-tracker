# Diet Tracker

A personalized diet and meal tracking application. Track daily meals, water intake, weight progress, and generate grocery lists based on your custom meal plan.

## Features

- **Personalized profiles** with BMR, TDEE, and macro calculations
- **AI-generated meal plans** for breakfast, lunch, dinner, and snacks
- **Daily tracking** — mark completed meals, log water, track progress
- **Weekly/monthly views** with adherence stats and streaks
- **Weight logging** with trend visualization
- **Grocery list** aggregated from weekly meals
- **Meal swapping** — replace meals while keeping nutrition targets
- **Favourite meals** for quick access
- **Three themes** — dark, light, and pink
- **Responsive UI** — works on mobile and desktop

---

## Quick Start

### 1. Set Up Supabase Backend

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and create the table:

```sql
create table diet_data (
  id text primary key,
  data jsonb not null,
  created_at timestamptz default now()
);
alter table diet_data enable row level security;

-- IMPORTANT: Add proper RLS policies for production
create policy "Allow public access" on diet_data
  for all using (true) with check (true);
```

1. Get your project credentials from **Settings → API**:
   - Project URL
   - Anon Public Key

### 2. Configure App Credentials

Edit `diet-tracker.html` and update these constants:

```javascript
const SB_URL = 'your-supabase-project-url';
const SB_KEY = 'your-supabase-anon-key';
```

> ⚠️ **Security Note:** These credentials are exposed in client-side code. For production:
>
> - Implement Supabase Auth + user-specific RLS policies
> - Restrict the anon role to minimal permissions
> - Never share this repo publicly with exposed credentials

### 3. Deploy on Netlify

#### Option A: Connect GitHub repo

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) and click **"New site from Git"**
3. Select your GitHub repo (`Zed-777/diet-tracker`)
4. Netlify auto-detects the `netlify.toml` config
5. Deploy ✓

#### Option B: Deploy directly

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

---

## File Structure

```
diet-tracker/
├── diet-tracker.html      # Main app (UI + logic + styles)
├── index.html             # Redirect to diet-tracker.html
├── netlify.toml           # Netlify config with SPA routing
├── .gitignore
└── README.md
```

---

## Architecture

### Frontend

- **Single-page app** (SPA) in `diet-tracker.html`
- Pure HTML/CSS/JavaScript — no build step required
- Responsive design, mobile-first UI
- Three built-in themes

### Backend

- **Supabase PostgreSQL** for data persistence
- REST API endpoints via `SB_URL`
- Table: `diet_data` with JSON blob storage
- Data keys:
  - `profile` — user goals, macros, BMI
  - `weights` — weight log entries
  - `log_YYYY-MM-DD` — daily completion + swaps
  - `grocery_YYYY-MM-DD` — shopping checklist

### Persistence

- Auto-saves on every action (meals, water, weight, grocery)
- Loads all data on app startup
- localStorage for theme preference only

---

## Customization

### Change Default Theme

Edit the `init()` function:

```javascript
applyTheme(localStorage.getItem('dt-theme') || 'pink');  // or 'dark', 'light'
```

### Modify Meal Database

Edit the `MEALS` object in `diet-tracker.html` to add/remove meals. Each meal needs:

- `id`, `name`, `cal`, `protein`, `carbs`, `fat`, `prepTime`
- `goals` — array of applicable goals: `['lose','build','definition','maintenance']`
- `ingredients` — list with `item`, `amount`, `unit`, `cat` (category)
- `recipe` — array of step strings

### Adjust Macro Splits

Edit the `CALC.macros()` function to change protein/carb/fat ratios per goal.

---

## Troubleshooting

### "Page not found" on Netlify

- Ensure `netlify.toml` contains the SPA redirect rule
- Clear browser cache and refresh

### "No repositories found" in Netlify

- Reconnect GitHub auth in Netlify: User → Applications → GitHub → Reconnect
- Make sure the repo is public or Netlify has access

### Supabase connection errors

- Check internet connection
- Verify `SB_URL` and `SB_KEY` are correct
- Confirm `diet_data` table exists and RLS policy allows access
- Check browser console for detailed error messages

### Theme changes don't persist

- Clear browser localStorage for the app domain
- Or check browser privacy/tracking settings

---

## Security Considerations

⚠️ **Important for production:**

1. **Don't expose credentials** — Current setup exposes Supabase anon key in client code
   - Implement [Supabase Auth](https://supabase.com/docs/guides/auth) for user-specific data
   - Use JWT tokens and user-scoped RLS policies

2. **Enable Row-Level Security (RLS)**

   ```sql
   create policy "Users can only read/write their own data" on diet_data
     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
   ```

3. **Restrict Anon Role**
   - Limit to read-only or disable entirely
   - Use authenticated users only

4. **Environment variables**
   - Store Supabase credentials in Netlify environment variables
   - Load dynamically at runtime (requires backend or middleware)

5. **Data privacy**
   - This app stores personal health data (weight, goals, macros)
   - Ensure compliance with GDPR, CCPA, etc.
   - Never share repos with embedded credentials

---

## Development

### Local testing

Simply open `diet-tracker.html` in a browser. No server required.

### Separating files (future)

To improve maintainability:

- Move CSS to `styles.css`
- Move JS to `app.js`
- Update `diet-tracker.html` to import them

### Contributing

Pull requests welcome! Areas for improvement:

- Better error handling and user feedback
- Offline-first with service workers
- Export meal plan as PDF
- Integration with fitness trackers

---

## License

MIT — Feel free to fork, modify, and deploy.

---

## Support

For issues or questions:

1. Check the **Troubleshooting** section above
2. Verify Supabase setup (SQL, RLS, credentials)
3. Open an issue on GitHub
