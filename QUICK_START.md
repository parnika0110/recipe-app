// QUICK_START.md

# KhanaKreation - Quick Start Guide

## 🚀 Start in 5 Minutes

### 1. Setup Environment (.env.local)

```env
NEXT_PUBLIC_OPENAI_API_KEY=sk-YOUR_KEY
OPENAI_API_KEY=sk-YOUR_KEY
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=generate-random-key
NEXTAUTH_URL=http://localhost:3000
```

### 2. Install & Run

```bash
npm install
npx prisma migrate dev --name init
npx next dev --port 3000
```

### 3. Open Browser

Visit: **http://localhost:3000**

---

## 💡 Usage Examples

### Example 1: Generate a Dinner Recipe

1. Add ingredients: "chicken", "rice", "broccoli"
2. Select "Asian" cuisine
3. Click "Generate Recipes"
4. Get a delicious AI-generated recipe!

### Example 2: Vegetarian Option

1. Add: "tofu", "bell pepper", "garlic"
2. Select "Vegetarian" dietary preference
3. Pick "Thai" cuisine
4. Generate and enjoy!

### Example 3: Save & Rate

1. Generate a recipe
2. Click ❤️ heart to save
3. Click ⭐ stars to rate (1-5)
4. Leave a comment
5. View in "Saved" page later

---

## 🎯 Key Routes

| URL                   | Purpose                  |
| --------------------- | ------------------------ |
| /                     | Home - Recipe generation |
| /recipes/[id]         | Recipe details           |
| /saved                | Saved recipes            |
| /api/recipes/generate | Generate recipes         |
| /api/recipes/saved    | Get saved recipes        |

---

## 📦 Important Files

| File                        | Purpose       |
| --------------------------- | ------------- |
| .env.local                  | Configuration |
| src/app/page.tsx            | Home page     |
| src/components/             | UI components |
| src/lib/recipe-generator.ts | AI logic      |
| prisma/schema.prisma        | Database      |

---

## 🛠 Common Commands

```bash
# Development
npx next dev

# Build
npm run build

# Production
npm start

# Check code
npm run lint

# View database
npx prisma studio

# Regenerate migrations
npx prisma generate
```

---

## ⚠️ Troubleshooting

**Recipe generation fails?**

- ✅ Check OpenAI API key
- ✅ Verify internet connection
- ✅ Check .env.local exists

**Database error?**

- ✅ Delete prisma/dev.db
- ✅ Run: `npx prisma migrate dev --name init`

**Port in use?**

- ✅ Use: `npx next dev --port 3001`

---

## 📚 Resources

- README.md - Full documentation
- SETUP.md - Detailed setup
- PROJECT_SUMMARY.md - Completion report
- API Endpoints - In README

---

## 🎊 You're Ready!

Enjoy creating amazing AI-powered recipes! 🍳✨
