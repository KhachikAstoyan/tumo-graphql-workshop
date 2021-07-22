import React, { Suspense } from 'react';
import { graphql, useLazyLoadQuery, commitMutation, useRelayEnvironment } from 'react-relay';
import { Link } from 'react-router-dom';

const query = graphql`
   query SongList_Query {
      songs {
         id
         title
      }
   }
`

const deleteMutation = graphql`
   mutation SongList_Mutation($id: ID!) {
      deleteSong(id: $id) {
         id @deleteRecord
      }
   }
`

const SongList = () => {
   const data = useLazyLoadQuery(query);
   const env = useRelayEnvironment();


   const titles = data.songs.map(song => song && (
      <li className="collection-item" key={song.id}>
         {song.title}
         <i className="collection-item"
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
      </li>
   ))

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
