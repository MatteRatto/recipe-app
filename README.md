# Recipe App

A modern, interactive recipe search and discovery application built with React. This application allows users to find and explore recipes based on various criteria.

## Live Demo

Check out the live version of this app at: [Recipe App on Netlify](https://imaginative-donut-467db0.netlify.app/)

## Key Features

- **Recipe Search**: Find recipes using keywords, ingredients, or meal types
- **Advanced Filtering**: Filter recipes by cuisine type (Italian, Mexican, Asian, etc.) and dietary preferences (Vegetarian, Vegan, Gluten-Free, etc.)
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices
- **Grid and List Views**: Toggle between different viewing modes for recipes
- **Favorites System**: Save your favorite recipes for quick access later
- **Detailed Recipe View**: Access comprehensive information about each recipe

## Core Components

### RecipeFilterBar

The search component allowing users to:

- Enter search queries
- Select from multiple cuisine types
- Choose dietary preferences
- Initiate searches with a visually appealing button

### RecipeCard

Displays recipe information in two formats:

- **Grid View**: Compact card with image, title, and basic details
- **List View**: Expanded horizontal card with more information

### RecipeDialog

A modal dialog showing complete recipe information:

- High-quality image
- Preparation time and servings
- Dietary information
- Full ingredients list
- Step-by-step cooking instructions

## Technologies Used

- **React**: For building the user interface
- **TypeScript**: For type safety and improved development
- **Lucide React**: For beautiful icons
- **Tailwind CSS**: For styling with utility classes
- **shadcn/ui**: For consistent UI components
- **Netlify**: For hosting and continuous deployment

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/recipe-app.git
cd recipe-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## How to Use

1. Enter search terms in the filter bar
2. Apply cuisine and dietary filters as needed
3. Browse recipes in grid or list view
4. Click on a recipe card to view full details
5. Save favorite recipes by clicking the heart icon
6. Explore ingredients and cooking instructions in the detail view

## API Integration

This application is designed to work with recipe APIs like Spoonacular. To use the app with an API:

- Sign up for an API key at the provider's website

- Create a .env file in the root directory

- Add your API key: REACT_APP_API_KEY=your_api_key_here

## License

This project is licensed under the MIT License.
