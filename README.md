# KhanaKreation

KhanaKreation is a full-stack recipe application that helps users discover personalized recipes based on the ingredients they have available.

Built with Next.js and React, the application combines recipe generation with authentication, persistent data storage, saved recipes, ratings, and comments in a complete full-stack experience.

## Features

### Recipe Generation
- Generate personalized recipes from available ingredients
- Set dietary and cuisine preferences
- View detailed ingredients and cooking instructions
- Access preparation and cooking information
- View nutritional information when available

### User Authentication
- User registration and sign-in
- Secure password hashing using bcrypt
- Session management with NextAuth
- User-specific recipe interactions

### Recipe Management
- View detailed recipe pages
- Save favorite recipes
- Access previously saved recipes
- Store recipe and ingredient information
- Maintain user-specific saved recipe collections

### Ratings and Comments
- Rate recipes on a 5-star scale
- Add comments to recipes
- Store ratings and comments for individual users

### User Experience
- Responsive interface
- Smooth animations using Framer Motion
- Loading and error states
- Component-based user interface

## Tech Stack

### Frontend
- Next.js 16
- React 19
- JavaScript / JSX
- Tailwind CSS
- Framer Motion

### Backend
- Next.js API Routes
- NextAuth
- bcrypt.js

### Database
- SQLite
- Prisma ORM

### Additional Technologies
- Generative AI APIs
- Axios
- Zod
- Lucide React
- jsPDF
- html2canvas

## Project Structure

```text
recipe-app/
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── recipes/
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── recipes/
│   │   ├── saved/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── components/
│   │   ├── CommentSection.jsx
│   │   ├── IngredientInput.jsx
│   │   ├── Navbar.jsx
│   │   ├── RatingComponent.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── SaveButton.jsx
│   │   └── SessionWrapper.jsx
│   │
│   └── lib/
│       ├── db.js
│       └── recipe-generator.js
│
├── package.json
└── README.md
```

## API Routes

The application uses Next.js API routes for authentication and recipe operations.

```text
POST   /api/auth/signup
       /api/auth/[...nextauth]

POST   /api/recipes/generate
POST   /api/recipes/save
GET    /api/recipes/saved
POST   /api/recipes/[id]/rate
GET    /api/recipes/[id]/comments
POST   /api/recipes/[id]/comments
```

## Database Design

The application uses Prisma ORM with SQLite for persistent data storage.

The database contains models for:

- User
- Recipe
- Ingredient
- SavedRecipe
- Rating
- Comment

Relationships between these models allow users to maintain their own saved recipes, ratings, and comments.

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/parnika0110/recipe-app.git
cd recipe-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and configure the required environment variables for:

- Database connection
- Authentication
- Recipe generation service

Sensitive credentials and API keys should never be committed to version control.

### 4. Initialize Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the Application

```bash
npm run dev
```

Open the local URL displayed by Next.js in your browser.

## Security

- Environment variables are excluded from version control
- Passwords are hashed before storage
- Authentication is handled using NextAuth
- User-specific operations are associated with authenticated accounts
- Sensitive credentials are kept outside the source code

## Future Improvements

- Advanced recipe search and filtering
- More dietary and cuisine preferences
- Improved recipe personalization
- Enhanced user profiles
- Improved mobile experience
- Public deployment

## Project Status

Actively being improved and maintained.

## Developed By

Parnika S M
