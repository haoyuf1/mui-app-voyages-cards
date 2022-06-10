import React, { useState, useContext } from "react";
import Cards from './Cards';
import axios from 'axios';

export const AppContext = React.createContext(null);
function App() {
  // Env Var
  axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
  axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_AUTHTOKEN;
  // Local Var
  const [label, setLabel] = useState([]);
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.options('/voyage/?hierarchical=False')
    .then(response => {
        console.log(response.data);
        setLabel(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });

  return (
    <AppContext.Provider value={{label}}>
        <Cards />
    </AppContext.Provider>
  )
};
export default App;