import React from 'react'
import { graphql, useLazyLoadQuery, commitMutation, useRelayEnvironment } from 'react-relay';
import { useParams, Link } from 'react-router-dom';
import BackComponent from './BackComponent';
import CreateLyric from './CreateLyric';
import LyricList from './LyricList';

const query = graphql`
   query SongDetails_Query($id: ID!) {
      song(id: $id) {
         id
         title
         ...LyricList_song
      }
   }
`

const deleteLyricMutation = graphql`
   mutation SongDetails_Mutation($lyricId: ID) {
      deleteLyric(lyricId: $lyricId) {
         id @deleteRecord
      }
   }
`

const Lyric = ({ lyric, songId }) => {
   const env = useRelayEnvironment();
   return (
      <>
         <li className="collection-item" key={lyric.id}>
            {lyric.content}
            <i className="material-icons"
               style={
                  {
                     cursor: "pointer",
                     float: 'right'
                  }
               }
               onClick={() => {
                  commitMutation(env, {
                     mutation: deleteLyricMutation,
                     variables: { lyricId: lyric.id }
                  })
               }}>delete</i>
         </li>
      </>
   )
}

function SongDetails() {
   const { id } = useParams()
   const { song } = useLazyLoadQuery(query, { id });

   // const lyricList = song.lyrics.map(lyric => <Lyric lyric={lyric} songId={song.id} />)
   return (
      <>
         <BackComponent />
         <h2>{song.title}</h2>
         <CreateLyric songId={song.id} />
         <LyricList song={song} />
      </>
   )
}

export default SongDetails;
