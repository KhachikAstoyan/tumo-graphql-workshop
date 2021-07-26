//@ts-check
import React, { useState } from 'react'
import { useFragment, commitMutation, useRelayEnvironment, graphql } from 'react-relay';
import { Link } from 'react-router-dom'
import LyricList from './LyricList';

const deleteMutation = graphql`
   mutation SongList_Mutation($id: ID!) {
      deleteSong(id: $id) {
         id @deleteRecord
      }
   }
`

function Song(props) {
   const [lyricsShown, setLyricsShown] = useState(false);
   const env = useRelayEnvironment();
   const song = useFragment(graphql`
   fragment Song_song on SongType {
      id
      title
      ...LyricList_song
   }`, props.song);

   return (
      <>
         <li className="collection-item" key={song.id}>
            <Link to={`/song/${song.id}`}>{song.title}</Link>
            <div>
               <i className="material-icons"
                  style={
                     {
                        cursor: "pointer",
                        float: 'right'
                     }
                  }
                  onClick={() => {
                     commitMutation(env, {
                        mutation: deleteMutation,
                        variables: { id: song.id },
                        optimisticUpdater: (store) => {
                           store.delete(song.id);
                        }
                     })
                  }}>delete</i>
               <button onClick={() => setLyricsShown(!lyricsShown)}>Show lyrics</button>
            </div>
         </li>
         {lyricsShown && <LyricList song={song} />}
      </>
   )
}

export default Song
