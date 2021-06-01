import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Book from "./Book";
import Movie from './Movie/index';
import Character from './Character/index';
import Quote from './Quote/index';
import Chapter from './Chapter/index';
import Home from './Home/index';
import NotFoundPage from './NotFoundPage/index';
import QuoteDetail from "./Quote/QuoteDetail";
import MovieDetail from './Movie/MovieDetail';
import ChapterDetail from './Chapter/ChapterDetail';
import BookDetail from './Book/BookDetail';
import CharacterDetail from './Character/CharacterDetail';

export const RouteHandler = <Switch>
    <Route path="/home" component={Home} />

    <Route path="/book/:id/chapter" component={Chapter} />
    <Route path="/book/:id" component={BookDetail} />
    <Route path="/book" component={Book} />
    
    <Route path="/movie/:id/quote" component={Quote} />
    <Route path="/movie/:id" component={MovieDetail} />
    <Route path="/movie" component={Movie} />
    
    <Route path="/character/:id/quote" component={Quote} />
    <Route path="/character/:id" component={CharacterDetail} />
    <Route path="/character" component={Character} />
    
    <Route path="/quote/:id" component={QuoteDetail} />
    <Route path="/quote" component={Quote} />
    
    <Route path="/chapter/:id" component={ChapterDetail} />
    <Route path="/chapter" component={Chapter} />
    <Redirect exact from="/" to="/home" />
    <Route component={NotFoundPage} />
</Switch>;
