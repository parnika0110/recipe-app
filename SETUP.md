// SETUP.md - KhanaKreation Setup Guide

# KhanaKreation - Complete Setup Guide

## Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api/keys
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the key (you won't see it again!)
5. Keep it safe - treat it like a password

## Step 2: Install Node.js

- Download from https://nodejs.org/
- Install Node.js 18 or higher
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

## Step 3: Navigate to Project

```bash
cd C:\Users\your_username\OneDrive\Desktop\recipe-app
```

## Step 4: Install Dependencies

```bash
npm install
```

This will install all required packages:

- next.js (web framework)
- react (UI library)
- tailwindcss (styling)
- prisma (database)
- openai (AI integration)
- framer-motion (animations)
- lucide-react (icons)

## Step 5: Setup Environment Variables

Create a file named `.env.local` in the project root:

```bash
# Windows PowerShell
New-Item -Path .env.local -ItemType File

# Or create manually in VS Code
```

Add these variables:

```env
# OpenAI Configuration
NEXT_PUBLIC_OPENAI_API_KEY=sk-xxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# Database
DATABASE_URL=file:./prisma/dev.db

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# App Config
NEXT_PUBLIC_APP_NAME=KhanaKreation
NEXT_PUBLIC_APP_DESCRIPTION=AI-Powered Recipe Generator
```

### Generate NEXTAUTH_SECRET

```bash
# In PowerShell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Or use an online generator: https://generate-secret.vercel.app/

## Step 6: Initialize Database

```bash
# Set environment variable
$env:DATABASE_URL="file:./prisma/dev.db"

# Run migration
npx prisma migrate dev --name init
```

This creates your local SQLite database with all tables.

## Step 7: Start Development Server

```bash
npx next dev --port 3000
```

You should see:

```
✓ Ready in X seconds
- Local:         http://localhost:3000
- Network:       http://XXX.XXX.X.XX:3000
```

## Step 8: Open in Browser

Visit: http://localhost:3000

## 🎉 You're Ready!

Try these:

1. Type some ingredients (e.g., "chicken", "tomato", "garlic")
2. Click "Add" to add ingredients
3. Select dietary preferences (optional)
4. Select cuisine type (optional)
5. Click "Generate Recipes"
6. Watch as AI creates a recipe!

## Troubleshooting

### "Invalid API Key"

- Check your OpenAI key is copied correctly
- Make sure it starts with `sk-`
- Verify key hasn't expired

### "Cannot find module"

- Run `npm install` again
- Delete `node_modules` folder
- Run `npm install` fresh

### Database errors

- Delete `prisma/dev.db`
- Run `npx prisma migrate dev --name init`

### Port 3000 already in use

```bash
npx next dev --port 3001
```

Then visit http://localhost:3001

## Project Commands

```bash
# Development
npx next dev

# Build for production
npm run build

# Start production server
npm start

# Check code style
npm run lint

# Check database
npx prisma studio
```

## Key Features to Try

✅ **Generate Recipes** - Add ingredients and watch AI create recipes
✅ **Save Favorites** - Click heart icon to save recipes
✅ **View Saved** - Click "Saved" in navbar
✅ **Rate Recipes** - Give 5-star ratings
✅ **Leave Comments** - Share your thoughts
✅ **Scale Servings** - Adjust ingredient amounts
✅ **View Nutrition** - See nutritional breakdowns

## File Locations

- **Components**: `src/components/`
- **Pages**: `src/app/`
- **API Routes**: `src/app/api/`
- **Database**: `prisma/schema.prisma`
- **Styles**: `src/app/globals.css`
- **Config**: `tailwind.config.ts`

## Next Steps

1. **Customize Theme**

   - Edit `tailwind.config.ts` for colors
   - Modify `src/app/globals.css` for fonts

2. **Add More Features**

   - PDF export for recipes
   - Social sharing buttons
   - User authentication
   - Recipe search

3. **Deploy**
   - Push to GitHub
   - Deploy on Vercel, Railway, or Netlify

## Support

If you encounter issues:

1. Check `.env.local` is in root directory
2. Verify all variables are set
3. Check internet connection
4. Try clearing cache: `rm -r .next`

## Resources

- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Prisma: https://www.prisma.io/docs
- OpenAI: https://platform.openai.com/docs/api-reference

Enjoy creating amazing recipes! 🍳✨
