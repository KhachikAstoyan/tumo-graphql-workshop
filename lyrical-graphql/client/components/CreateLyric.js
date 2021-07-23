import React, { useState } from 'react'
import { graphql, commitMutation, useRelayEnvironment } from 'react-relay';

const mutation = graphql`
   mutation CreateLyric_Mutation($songId: ID, $content: String) {
      addLyricToSong(content: $content, songId: $songId) {
         id
         lyrics {
            content
         }
      }
   }
`

function CreateLyric({ songId }) {
   const [lyric, setLyric] = useState("");
   const env = useRelayEnvironment();

   const handleSubmit = e => {
      e.preventDefault();
      commitMutation(env, {
         mutation,
         variables: { songId, content: lyric }
      })
      setLyric('');
   }

   return (
      <form onSubmit={handleSubmit}>
         <label>Add a lyric</label>
         <input
            type="text"
            value={lyric}
            onChange={(e) => setLyric(e.target.value)}
         />
      </form>
   )
}

export default CreateLyric
