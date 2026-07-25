# KhanaKreation - AI-Powered Recipe Generator 🍳

A modern, responsive web application that uses AI to generate personalized recipe suggestions based on available ingredients. Built with Next.js 16, TypeScript, Tailwind CSS, and OpenAI's GPT-4.

## 🎯 Features

### Core Features

- **AI Recipe Generation** - Input ingredients and get creative recipe suggestions
- **Recipe Images** - AI-generated beautiful food images for each recipe
- **Smart Ingredient Input** - Easy selector with dietary preferences and cuisine options
- **Save Favorites** - Save recipes to view later
- **Recipe Details** - Full recipes with ingredients, instructions, timers, nutrition

### Social Features

- **Rating System** - Rate recipes on a 5-star scale
- **Comments** - Share tips and feedback on recipes

### User Experience

- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion for fluid interactions
- **Loading States** - Clear feedback during generation
- **Error Handling** - Graceful error messages

## 🛠 Tech Stack

- **Frontend**: React 19, Next.js 16 (App Router), TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **AI**: OpenAI (GPT-4 + DALL-E 3)
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API key
- npm or yarn

### Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Create .env.local**

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
OPENAI_API_KEY=your_openai_key
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

3. **Initialize Database**

```bash
$env:DATABASE_URL="file:./prisma/dev.db"
npx prisma migrate dev --name init
```

4. **Start Development Server**

```bash
npx next dev --port 3000
```

5. **Visit** http://localhost:3000

## 📁 Project Structure

```
src/
├── app/
│   ├── api/recipes/          # API endpoints for recipe operations
│   ├── recipes/[id]/         # Recipe detail page
│   ├── saved/                # Saved recipes page
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── IngredientInput.tsx    # Ingredient input form
│   ├── RecipeCard.tsx         # Recipe card component
│   ├── SaveButton.tsx         # Save recipe button
│   ├── RatingComponent.tsx    # Rating system
│   └── CommentSection.tsx     # Comments section
├── lib/
│   ├── recipe-generator.ts    # AI recipe generation
│   └── db.ts                  # Prisma client
prisma/
├── schema.prisma              # Database schema
└── migrations/                # Database migrations
```

## 🔑 Key API Endpoints

**POST /api/recipes/generate**

- Generate recipes from ingredients

**POST /api/recipes/save**

- Save a recipe for later

**GET /api/recipes/saved**

- Get all saved recipes

**POST /api/recipes/[id]/rate**

- Rate a recipe

**GET/POST /api/recipes/[id]/comments**

- Get or post comments

## 🎨 How to Use

1. **Add Ingredients** - Type ingredients and click add
2. **Set Preferences** - Choose dietary restrictions and cuisine
3. **Generate** - Click "Generate Recipes" button
4. **View Recipe** - Click recipe card for full details
5. **Save** - Click heart icon to save to favorites
6. **Rate & Comment** - Leave feedback on recipe pages

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📦 Deployment Options

- **Vercel** (Recommended) - `vercel deploy`
- **Railway** - Connect repo and deploy
- **Netlify** - Connect repo and deploy
- **Docker** - Use provided Dockerfile

## 🌟 Features Highlights

- ✅ Beautiful, modern UI with Tailwind CSS
- ✅ Smooth animations and transitions
- ✅ Mobile-first responsive design
- ✅ AI-powered recipe generation
- ✅ Recipe image generation
- ✅ Save favorites functionality
- ✅ Rating and comment system
- ✅ Nutritional information
- ✅ Scalable ingredient amounts
- ✅ Error handling and loading states

## 🧪 Testing

```bash
npm run lint     # ESLint check
npm run build    # Production build
npm start        # Production server
```

## 📝 Environment Variables

| Variable                   | Required | Description                  |
| -------------------------- | -------- | ---------------------------- |
| NEXT_PUBLIC_OPENAI_API_KEY | Yes      | OpenAI API key (public)      |
| OPENAI_API_KEY             | Yes      | OpenAI API key (server)      |
| DATABASE_URL               | Yes      | SQLite database URL          |
| NEXTAUTH_SECRET            | Yes      | NextAuth secret key          |
| NEXTAUTH_URL               | No       | App URL (default: localhost) |

## 🐛 Troubleshooting

**Recipe generation fails**

- Check OpenAI API key
- Verify API credits available
- Check internet connection

**Database errors**

- Run `npx prisma generate`
- Delete `.next` folder
- Run migrations again

**Styling issues**

- Clear cache: `rm -rf .next node_modules`
- Reinstall: `npm install`

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma](https://www.prisma.io)
- [OpenAI API](https://platform.openai.com/docs)

## 📄 License

MIT License - Free for personal and commercial use

## 👨‍💻 Built By

Created as a full-stack AI recipe generator project with modern web technologies.

---

**Transform your kitchen into a gourmet restaurant with AI! 🚀**
