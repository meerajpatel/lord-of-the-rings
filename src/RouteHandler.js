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

export const RouteHandler = <Switch>
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/book">
    <Book />
  </Route>
  <Route path="/movie">
    <Movie />
  </Route>
  <Route path="/character">
    <Character />
  </Route>
  <Route path="/quote">
    <Quote />
  </Route>
  <Route path="/chapter">
    <Chapter />
  </Route>
  <Redirect exact from="/" to="/home" />
  <Route component={NotFoundPage} />
</Switch>;
