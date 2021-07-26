import React from 'react'
import { graphql, useFragment, commitMutation, useRelayEnvironment } from 'react-relay';

const fragment = graphql`
   fragment LyricList_song on SongType {
      lyrics {
         id
         content
         likes
      }
   }
`

const likeMutation = graphql`
   mutation LyricList_Mutation($id: ID) {
      likeLyric(id: $id) {
         id
         content
         likes
      }
   }
`



function LyricList(props) {
   const { lyrics } = useFragment(fragment, props.song);
   const env = useRelayEnvironment();

   const onLike = (id, likes) => {
      console.log(id);

      const data = commitMutation(env, {
         mutation: likeMutation,
         variables: { id },
         optimisticResponse: {
            likeLyric: {
               id,
               likes: likes + 1
            }
         }
      })

      console.log(data);
   }

   const items = lyrics.map(lyric => {
      return <li key={lyric.id} className="collection-item">
         {lyric.content}
         <div className="vote-box">
            <b>{lyric.likes}</b>
            <i
               className="material-icons"
               style={{ cursor: "pointer" }}
               onClick={() => {
                  onLike(lyric.id, lyric.likes)
               }}
            >
               thumb_up
            </i>
         </div>
      </li>
   })

   return (
      <ul className="collection">{items}</ul>
   )
}

export default LyricList
