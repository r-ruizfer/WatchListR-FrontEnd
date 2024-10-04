# WatchListR

## [See the App!] (https://watchlistrih.netlify.app/)

![App Logo](https://github.com/r-ruizfer/WatchListR-FrontEnd/blob/main/src/assets/logo.png)

## Description

**NOTE -** WatchListR is a Website to keep track of the series you want to watch, that you are watching, and the ones you already watched

#### [Client Repo here](https://github.com/r-ruizfer/WatchListR-FrontEnd)

#### [Server Repo here](https://github.com/r-ruizfer/WatchListR-BackEnd)

## Technologies, Libraries & APIs used

HTML, CSS, Javascript, React, axios, Bootstrap

## Backlog Functionalities

Fav lists, Graphs, random series...

# Client Structure

## User Stories

- **404** - If you go to a page that doesnt exist, you will get a very sad looking computer mouse that is lost and cant find its way home
- **500** - If something goes wrong in the page and it was because the devs are still figuring it out, the same computer mouse will also appear sad because you had to see our shortcomings
- **homepage** - The homepage welcomes you to our page and tells you what you can do in it. It will also direct you to some of our pages
- **Series List** - Here you can browse all of the most popular series
  **Search Results** - You can use the searchbar to search for a series which will redirect you to a page with all the results matching you query
- **Series Details** - if you see a Series that catches your eye, you can click on it and it will take you to a page that shoes you some interesting info about it, like its genres, number of episodes/seasons, if it is still airing or if its finished, etc. there will also be a button that allows you to add a Series to one of you watchlists
- **Add to list/ Update Modal** - when you first click the add button, you get a form with the name and image of the list that you chose, along with a form allowing you to add the series to one of your three watchlists, and also give it a rating if you are currently watching, or have already finished it. if the Series was already in one of your watchlists, you can update the list and its rating if you change your opinion.
- **My List** - When you add a series to a watchlist, it gets added to "my lists" page, whe you can browse all of the series in your lists, and filter them on genre and watchlist.
- **About page** - Here you can meet the devs of this website and see their GitHubs and LinkedIns

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)

| Path                           | Page          | Components            | Behavior                                               |
| ------------------------------ | ------------- | --------------------- | ------------------------------------------------------ |
| `/`                            | Home          | myCarousel            | Home page                                              |
| `/series`                      | SeriesList    | SeriesCard            | List of Series                                         |
| `/series/:seriesId`            | SeriesDetails | AddToListForm, Rating | Button opens Modal with add/update form                |
| `/about`                       | About         | TeamInfo              | Buttons redirect to external websites                  |
| `/series/searchResults/:query` | SeriesCard    | SeriesCard            | List of Series filtered by search Query                |
| `/mylist`                      | myList        | SeriesCard, SideBar   | Shows all Series in Lists and a sidebar to filter them |

## Other Components

- Navbar
- Search

## Links

### Collaborators

[Enrique Paez](https://github.com/enriquepaez)

[Ruben Ruiz](https://github.com/r-ruizfer)

### Project

[Repository Link Client](https://github.com/r-ruizfer/WatchListR-FrontEnd)

[Repository Link Server](https://github.com/r-ruizfer/WatchListR-BackEnd)

[Deploy Link](https://watchlistrih.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1scOEHRTyLoO-AQEKXj7lb90xm0zJ2DyGXGN3HxBtHzs/edit#slide=id.g308410ea4d3_0_29)
