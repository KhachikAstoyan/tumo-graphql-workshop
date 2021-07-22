//@ts-check
import React from "react";
import ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/environment";

import App from './App';

const Root = () => {
   return (
      <RelayEnvironmentProvider environment={environment}>
         <App />
      </RelayEnvironmentProvider>
   );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
