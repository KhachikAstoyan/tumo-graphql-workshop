import SongList from "./components/SongList";
import CreateSong from "./components/CreateSong";
import React, { Suspense } from 'react';
import './style/style.css'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
   return (
      <>
         <Suspense fallback={<div>Loading...</div>}>
            <div className="container">
               <Router>
                  <Switch>
                     <Route path="/" exact={true}>
                        <SongList />
                     </Route>

                     <Route path="/songs/new" exact={true}>
                        <CreateSong />
                     </Route>

                  </Switch>
               </Router>
            </div>
         </Suspense>
      </>
   )
}