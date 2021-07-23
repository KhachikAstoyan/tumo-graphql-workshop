import React, { useState } from 'react'
import { graphql, commitMutation, useRelayEnvironment } from 'react-relay'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import BackComponent from './BackComponent';

const mutation = graphql`
   mutation CreateSong_Query($title: String) {
      addSong(title: $title) {
         id
         title
      }
   }
`

function CreateSong() {
   const history = useHistory();
   const [songName, setSongName] = useState("");
   const env = useRelayEnvironment();

   const handleSubmit = e => {
      e.preventDefault();

      if (e.target.value === '') return

      commitMutation(env, {
         mutation,
         variables: { title: songName },
         onCompleted: (response) => {
            history.push('/');
         }
      });

   }

   return (
      <>
         <BackComponent />
         <h3>Create a new song</h3>
         <form onSubmit={handleSubmit}>
            <input type="text" autoFocus={true} value={songName} onChange={(e) => setSongName(e.target.value)} />

            <button type="submit" className="btn-large blue">Add</button>
         </form>

      </>
   )
}

export default CreateSong
