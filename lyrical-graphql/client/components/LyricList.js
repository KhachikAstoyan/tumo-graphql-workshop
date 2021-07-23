import React from 'react'
import { graphql, useFragment } from 'react-relay';

const fragment = graphql`
   fragment LyricList_song on SongType {
      lyrics {
         id
         content
         likes
      }
   }
`



function LyricList(props) {
   const { lyrics } = useFragment(fragment, props.song);

   const items = lyrics.map(lyric => {
      return <li key={lyric.id} className="collection-item">{lyric.content}</li>
   })

   return (
      <ul className="collection">{items}</ul>
   )
}

export default LyricList
