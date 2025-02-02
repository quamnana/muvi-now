# Muvi Now

Muvi Now is a movie search and trending application built with React and Vite. It allows users to search for movies, view trending movies, and see detailed information about each movie. The application leverages the TMDB API for movie data and Appwrite for backend services.

Visit Application [Here](https://muvi-now.vercel.app/)

## Features

- **Search Movies**: Users can search for movies by title.
- **Trending Movies**: Displays a list of trending movies based on search counts.
- **Movie Details**: View detailed information about each movie, including title, rating, language, and release date.
- **Responsive Design**: The application is fully responsive and works on various screen sizes.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Appwrite
- **Build Tool**: Vite
- **Linting**: ESLint

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:
VITE_TMBD_ACCESS_TOKEN=<your_tmdb_access_token>
VITE_APPWRITE_PROJECT_ID=<your_appwrite_project_id>
VITE_APPWRITE_DATABASE_ID=<your_appwrite_database_id>
VITE_APPWRITE_COLLECTION_ID=<your_appwrite_collection_id>

## Installation

1. Clone the repository:

```sh
git clone <repository_url>
cd muvi-now
```

2. Install dependencies:
   npm install

## Running the Project

To start the development server, run:

```sh
npm run dev
```

This will start the Vite development server and open the application in your default browser.

## Building the Project

To build the project for production, run:

```sh
npm run build
```

The built files will be output to the dist directory.

## Previewing the Build

To preview the built project, run:

```sh
npm run preview
```

This will start a local server to preview the production build.

## Linting

To lint the project, run:

```sh
npm run lint
```

This will run ESLint on the project files and display any linting errors or warnings.

## Conclusion

Muvi Now is a simple yet powerful movie search and trending application. With its clean and responsive design, users can easily find and explore movies. The integration with TMDB and Appwrite ensures that the application is both feature-rich and scalable.
