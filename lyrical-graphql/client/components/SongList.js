import React, { Suspense, useState } from 'react';
import { graphql, useLazyLoadQuery, commitMutation, useRelayEnvironment } from 'react-relay';
import { Link } from 'react-router-dom';
import LyricList from './LyricList';
import Song from './Song';

const query = graphql`
   query SongList_Query {
      songs {
         ...Song_song
      }
   }
`



const SongList = () => {
   const data = useLazyLoadQuery(query);
   const env = useRelayEnvironment();



   const titles = data.songs.map(song => song && <Song song={song} />)

   if (!titles) {
      return (
         <h3>Nothing was found...</h3>
      )
   }

   return (
      <>
         <ul className="collection">
            {titles}
         </ul>
         <Link to="songs/new" className="btn-floating btn-large blue right">
            <i className="material-icons">add</i>
         </Link>
      </>
   )
}

export default SongList
