# GymGenie — Personalised Workout Plan Generator

**Live site:** https://dyj135.bitbucket.io
**Repository (source):** https://github.com/Dyj135/gymgenie

---

## Project Brief

GymGenie is a personalised workout-plan generator that turns a few simple answers about a user's goal, training experience, available equipment, weekly schedule and physical limitations into a ready-to-follow, tailored weekly training plan — and explains *why* the plan fits them. Instead of handing every visitor the same generic routine, it selects exercises, builds an appropriate training split, and sets the sets, reps and rest for each move around the individual, so beginners can start training safely and stay consistent. Built in ReactJS as a fully self-contained static web app (a built-in exercise library and demonstration imagery, all state kept in the browser via `localStorage`, no backend), it runs reliably without any server and is deployed on Bitbucket Pages.

---

## One-Page Report

### Purpose of Site Personalisation

The point of personalising the site is that everyone has different goals and situations, so giving everyone the same workouts doesn't really help. Someone with just a pair of dumbbells and 45 minutes a few times a week needs a very different plan from someone in the gym five days a week. By asking a few quick questions first and building the plan from the answers, GymGenie saves the user from guessing what to do, and makes them more likely to actually start and keep going. Personalisation isn't a side feature here — it's basically the whole product.

### The Likely Users (Persona)

**Lin Hao — 25, office worker, beginner.** Lin sits at a desk all day and wants to build some muscle. He's got a pair of dumbbells at home and can train a few times a week, but most online plans feel too vague, and he's not sure which exercises suit his gear or whether he's even doing them right. He just wants clear, relevant guidance instead of a huge list of exercises.

### A User and Their Goals — Assumption & Hypothesis

**Assumption:** Beginners usually know their main goal (build muscle, lose fat) but don't have a plan that fits their own equipment, time and any injuries — so they're not sure where to start and often give up.

**Hypothesis:** If we generate a plan from their goal, equipment, schedule and limits — and explain why it fits — they'll be more likely to start and stick with it than with a generic plan.

Lin's goals: find dumbbell/bodyweight exercises that suit him, learn how to do them safely, get a plan that fits his week, and feel confident he's doing the right thing.

### How the Example Works for the User

1. **Onboarding.** Lin answers five quick questions (goal, experience, equipment, schedule, any limitations) and watches a preview of his plan build up as he picks.
2. **Dashboard.** GymGenie generates a weekly plan from his answers, sets the sets/reps/rest for his goal, shows today's workout, and explains why the plan suits him.
3. **Exercise detail.** He can open any move to see a demo, the steps, the muscles worked and his sets/reps — and add, remove or tick off exercises as he trains.

Everything is saved in the browser, so the app remembers him next time and he can redo the setup whenever he wants.

---

## Tech Stack

- **ReactJS** (Vite) + **react-router-dom** (HashRouter, so deep links and refreshes work on static hosting)
- **Tailwind CSS** for styling, with a dark "athletic" design system (electric-lime accent)
- **localStorage** for all persisted state (single key, no backend)
- Self-contained exercise library — the app does not depend on any runtime API

## Run Locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static files to dist/
npm run preview  # preview the production build
```

## Deploy to Bitbucket Pages

Build the app, then publish the contents of `dist/` to the root of a
`<username>.bitbucket.io` repository (or use a Bitbucket Pipeline to build and
deploy automatically). See `docs/` for details.
