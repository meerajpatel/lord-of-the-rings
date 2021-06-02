# lord-of-the-rings
A WIZARD IS NEVER LATE, NOR IS HE EARLY. HE ARRIVES PRECISELY WHEN HE MEANS TO - GANDALF

### Problem Statement

Assignment
Your task is to make a small web application that visualises the Lord of The Rings API. You are free to
decide how you want to approach this. Design is not the most important thing as that will mostly be taken
care of by a designer. Code structure and state management is more important. Merely visualising a list of
data won't be enough, we expect you to add some extra functionality like filtering, sorting, search,... or
anything else you deem worthy.
You are free to use whatever framework you want, however React is preferred. Our codebase heavily
relies on React.
LOTR API: https://the-one-api.herokuapp.com/

### Solution Live Url
https://lotr-ecto.herokuapp.com/home

### How to run in local machine

1. Clone the project or download the project from https://github.com/meerajpatel2011/lord-of-the-rings.git
2. Install dependencies using npm or yarn -> npm install or yarn install
3. To run in development mode -> npm start or yarn start
4. To run in production mode -> npm build or yarn build, then npx serve -s build

### Dependencies Added

1. Antd: Design Framework for creation of table, nav bars, etc.
2. axios: For API calls to LOTR API
3. query-string: For matching the filters with params in the url
4. react-router: For handling the routes

### Steps taken

1. Created a basic react app using create react app
2. Created a DOC with main API endpoints and the API contracts (Request + Response) : https://docs.google.com/document/d/1EyGi9EY3z7eLWGlHwabTAmDEa7slq5zXgStGYhW0HII/edit?usp=sharing
2. Using the above sheet, Main routes can be decided
3.  Created Route Handler to handle all the routes in the application
4.  Created a Utils folder with common Axios Config and Common Axios Fetcher method. This can be resused anywhere
5.  Created main components and its internal components to handle details, as well as fetching quotes for particular Movie etc.
6.  There are **16 Routes** in this Application.

### Outputs and few assumptions

1. Characters page -> gender filter -> use text box with ignore case and string match, instead of dropdown as data is corrupted. There is "Male" as well as "male"
2. Tried to use as few modules and dependencies.
3. For StateManagement, I could have used Redux, context API or even localstorage. But I have tried to handle all those without using any of the mentioned modules.
4. Quotes Page -> Need to get data related to movies and character through API. So for simplicity I am using ID's only.
5. On clicking on any link either the Detail page will open or Url passed will open in new tab.
6. Havent introduced sort filter in quotes and character page. But you can still access the sorting through url. For eg: https://lotr-ecto.herokuapp.com/character?limit=10&page=1&sort=name:desc
7. Detail page can be directly opened if you know the movieid, quoteid, bookid, characterid, chapterid.
8. All the chapters related to a particular book can be opened after opening bookdetail page
9. All the quotes related to movie and character can be opened by opening moviedetail or characterdetail page. 
For eg: characterquotes for a character from :https://lotr-ecto.herokuapp.com/character/5cd99d4bde30eff6ebccfe9e
10. Added multiple filters to support filtering functionalites on each page.

### Improvements

1. Can introduce Redux to handle State. For eg: Movies and Books can be prefetched and can be stored into redux. We can skip unnecessary API hits by using this. Even on quotes page movie id can be linked with movies prefetched in the state, and can be shown on the page. However that page wont be able to filter movies just based on name, we have to pass filter param as ID. So some work can be done around that area.
2. Haven't introduced sort in quotes and character page. It can be introduced by adding new filter or table level sorting. Can include more filters.
3. For any detail page (book-detail, movie-detail, quote-detail, character-detail, chapter-detail), instead of hitting an api we can use the values from the previous page table.
4. Can improve on bundle sizes as well by introducing webpack optimizations.
5. Can introduce Styled Components to handle css. Instead of using Inline CSS.

