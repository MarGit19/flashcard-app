import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "../Parts/Home";
import Deck from "../Parts/Deck";
import CreateDeck from "../Parts/CreateDeck";
import EditDeck from "../Parts/EditDeck";
import Study from "../Parts/Study";
import AddCard from "../Parts/AddCard";
import EditCard from "../Parts/EditCard";



function Layout() {
  return (
    <>
      <Header />
      <div className="container card">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId" exact>
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>

      </div>
    </>
  );
}

export default Layout;