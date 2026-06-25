import registerHero from "../assets/optimized/Register-hero.png";
import profileAvatar from "../assets/optimized/ProfileAvatar.png";
import newsEverest from "../assets/optimized/Want to climb Mount Everest.png";

import action from "../assets/optimized/Action.png";
import comedy from "../assets/optimized/Fiction.png";
import drama from "../assets/optimized/Drama.png";
import romance from "../assets/optimized/Romance.png";
import thriller from "../assets/optimized/Thriller.png";
import sports from "../assets/optimized/Western.png";
import fantasy from "../assets/optimized/Fantasy.png";
import music from "../assets/optimized/Misic.png";

import action1 from "../assets/optimized/Action1.png";
import action2 from "../assets/optimized/Action2.png";
import action3 from "../assets/optimized/Action3.png";
import action4 from "../assets/optimized/Action4.png";
import thriller1 from "../assets/optimized/Thriller1.png";
import thriller2 from "../assets/optimized/Thriller2.png";
import thriller3 from "../assets/optimized/Thriller3.png";
import thriller4 from "../assets/optimized/Thriller4.png";

export const heroAssets = {
  registerHero,
  profileAvatar,
  newsEverest,
};

export const categories = [
  { name: "Action", image: action, color: "#ff531f", query: "action" },
  { name: "Comedy", image: comedy, color: "#f4b400", query: "comedy" },
  { name: "Drama", image: drama, color: "#c88cff", query: "drama" },
  { name: "Music", image: music, color: "#e81635", query: "music" },
  { name: "Sports", image: sports, color: "#2ea44f", query: "sports" },
  { name: "Thriller", image: thriller, color: "#7dbff4", query: "thriller" },
  { name: "Fantasy", image: fantasy, color: "#f63ec8", query: "fantasy" },
  { name: "Romance", image: romance, color: "#159b17", query: "romance" },
];

export const fallbackMovies = {
  Action: [
    movie("tt6443346", "Black Adam", "2022", action1, "Action, Adventure, Fantasy"),
    movie("tt9032400", "Eternals", "2021", action2, "Action, Adventure, Fantasy"),
    movie("tt1745960", "Top Gun: Maverick", "2022", action3, "Action, Drama"),
    movie("tt6723592", "Tenet", "2020", action4, "Action, Sci-Fi, Thriller"),
  ],
  Thriller: [
    movie("tt6341832", "Oxygen", "2021", thriller1, "Drama, Fantasy, Sci-Fi"),
    movie("tt15474916", "Smile", "2022", thriller2, "Horror, Mystery, Thriller"),
    movie("tt1649418", "The Gray Man", "2022", thriller3, "Action, Thriller"),
    movie("tt9764362", "The Menu", "2022", thriller4, "Comedy, Horror, Thriller"),
  ],
  Comedy: [
    movie("tt1041829", "The Proposal", "2009", comedy, "Comedy, Romance"),
    movie("tt3783958", "La La Land", "2016", music, "Comedy, Drama, Music"),
    movie("tt0107048", "Groundhog Day", "1993", comedy, "Comedy, Fantasy, Romance"),
    movie("tt0109830", "Forrest Gump", "1994", drama, "Drama, Romance"),
  ],
  Sports: [
    movie("tt1745960", "Top Gun: Maverick", "2022", action3, "Action, Drama"),
    movie("tt1291584", "Warrior", "2011", sports, "Action, Drama, Sport"),
    movie("tt1024648", "Argo", "2012", action4, "Biography, Drama, Thriller"),
    movie("tt0114709", "Remember the Titans", "2000", sports, "Biography, Drama, Sport"),
  ],
};

export const localMoviePool = {
  ...fallbackMovies,
  Drama: [
    movie("tt0108052", "Schindler's List", "1993", drama, "Biography, Drama, History"),
    movie("tt0111161", "The Shawshank Redemption", "1994", drama, "Drama"),
    movie("tt2582802", "Whiplash", "2014", music, "Drama, Music"),
    movie("tt0120338", "Titanic", "1997", romance, "Drama, Romance"),
  ],
  Romance: [
    movie("tt0120338", "Titanic", "1997", romance, "Drama, Romance"),
    movie("tt0332280", "The Notebook", "2004", romance, "Drama, Romance"),
    movie("tt0112471", "Before Sunrise", "1995", romance, "Drama, Romance"),
    movie("tt1041829", "The Proposal", "2009", comedy, "Comedy, Romance"),
  ],
  Fantasy: [
    movie("tt0241527", "Harry Potter and the Sorcerer's Stone", "2001", fantasy, "Adventure, Family, Fantasy"),
    movie("tt0120737", "The Lord of the Rings", "2001", fantasy, "Adventure, Drama, Fantasy"),
    movie("tt0457430", "Pan's Labyrinth", "2006", fantasy, "Drama, Fantasy, War"),
    movie("tt0363771", "The Chronicles of Narnia", "2005", fantasy, "Adventure, Family, Fantasy"),
  ],
  Music: [
    movie("tt2582802", "Whiplash", "2014", music, "Drama, Music"),
    movie("tt1727824", "Bohemian Rhapsody", "2018", music, "Biography, Drama, Music"),
    movie("tt3783958", "La La Land", "2016", music, "Comedy, Drama, Music"),
    movie("tt1517451", "A Star Is Born", "2018", music, "Drama, Music, Romance"),
  ],
};

function movie(imdbID, Title, Year, Poster, Genre) {
  return {
    imdbID,
    Title,
    Year,
    Poster,
    Genre,
    Runtime: "120 min",
    imdbRating: "7.8",
    Plot:
      "A striking story shaped by memorable characters, high stakes, and a cinematic world that fits this category.",
    Actors: "Featured cast",
  };
}
