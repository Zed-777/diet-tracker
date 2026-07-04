# 📋 Agent Practice Standards

## Code Quality

- **Naming:** Clear, descriptive variable and function names
  - Functions: `calculateBMR()`, `getMealCost()`, `renderTodayView()`
  - Variables: `userProfile`, `mealLog`, `isOffline`
  - Constants: `MEALS`, `INGREDIENT_PRICES`, `CALC`

- **Comments:** Self-documenting code with comments for complex logic
  - Explain *why*, not *what*
  - Keep comments concise and accurate
  - Update comments when logic changes

- **Functions:** Single responsibility, <100 lines where possible
  - One function = one purpose
  - Consistent parameter order
  - Handle errors explicitly

- **Error Handling:** Always provide user feedback
  - Catch exceptions gracefully
  - Show meaningful error messages
  - Log to console only for debugging

---

## Documentation

- **README:** Clear, concise, with examples
- **SECURITY.md:** Credential management and deployment instructions
- **MPDP.md:** Active development plan with current status
- **Comments:** Explain non-obvious implementation details
- **Commit messages:** Descriptive, conventional format

---

## Testing & Validation

- **Manual testing:** Verify before commit
  - Core functionality works
  - Error cases handled
  - No console errors
  - Mobile responsive

- **Browser testing:** Chrome, Firefox, Safari, mobile
- **Offline mode:** Verify queue and retry logic
- **Deployment:** Test on Cloudflare Pages before main branch

---

## Performance

- **Load time:** Keep main file under 5000 lines
- **Memory:** Clean up on navigation, prevent leaks
- **Network:** Minimize Supabase calls, batch updates
- **Rendering:** Avoid unnecessary reflows, use CSS for animations

---

## Security

- No hardcoded secrets
- Environment variables for production
- Input validation on all forms
- HTTPS-only communication
- Proper .gitignore usage

---

## Commit Practices

- **Format:** `type: description` (feat, fix, docs, refactor, security)
- **Frequency:** Commit logical units, not entire features
- **Messages:** Imperative tense, lowercase, <50 chars
- **Content:** One feature/fix per commit when possible

---

## Collaboration

- Keep code reviews in mind during development
- Test thoroughly before pushing
- Document edge cases and assumptions
- Communicate changes that affect other areas
- Maintain clean git history (no merge commits when possible)

---

**Last Updated:** June 2026
