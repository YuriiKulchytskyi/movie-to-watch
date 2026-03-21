# 🎬 Movie To Watch

A web application for searching movies and saving them to favorites.

## 🔍 Description

This app allows users to:

* search for movies using TMDB API
* view detailed information about movies
* add or remove movies from favorites
* sign up and log in

## 🚀 Features

* 🔍 Movie search
* 🎞 Movie details page
* ❤️ Add/remove favorites
* 🔐 User authentication
* 📱 Responsive layout with mobile menu

## 🛠 Tech Stack

* React
* TypeScript
* Redux Toolkit
* React Router
* TMDB API

## ⚙️ Getting Started

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

App will be available at:
http://localhost:5173

## 📁 Project Structure

```
src/
 ├── components/   # reusable UI components
 ├── pages/        # application pages (Home, Movie, Favorites)
 ├── redux/        # global state management
 ├── providers/    # app providers (auth, etc.)
 ├── utils/        # helper functions
 ├── types/        # TypeScript types
 ├── assets/       # images and static files
```

## 🔐 Authentication

* Users can sign up and log in
* Authentication state is stored (e.g. localStorage / Firebase — update if needed)
* Only authenticated users can use favorites

## ❤️ Favorites

* Users can add/remove movies to favorites
* Favorites are saved (update where: localStorage or backend)
* Available on a separate page

## 🌐 API

This project uses TMDB API:

* GET /movie/popular
* GET /movie/:id
* GET /search/movie

## 📌 Future Improvements

* ⭐ Movie ratings
* 💬 Comments
* 🔄 Persistent login
* 🌍 Better error handling

## 👨‍💻 Author

Yurii Kulchytskyi
