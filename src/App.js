import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';

export const ElevatedHeaderCardDemo = React.memo(function ElevatedHeaderCard() {
  const [label, setLabel] = useState([]); 
  const [value, setValue] = useState([]); 
  const AUTH_TOKEN = 'Token 77e6b7487f5c3aa4275257eb5f77ad06e8c62a39';

  const cardHeaderShadowStyles = useFadedShadowStyles();

  useEffect(()=>{
        axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu';
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.options('/voyage/?hierarchical=False')
              .then(response => {
                // console.log(response.data);
                setLabel(response.data);
              })
              .catch(function (error) {
                // console.log(error);
              });
        
        var data = new FormData();
        data.append('hierarchical', 'False');

        const mycardvariables = require('./default_cols.json');
        var arrayLength = mycardvariables.length;
        for (var i = 0; i < arrayLength; i++) {
          data.append('selected_fields', mycardvariables[i]);
        }

        axios.post('/voyage/', data)
            .then(response => {
              console.log(response.data);
              setValue(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
  }, []);
  
  // const test = [{id: 1, voyage_captainconnection__captain__name: ["Dias, Manoel José", "Dias, Manoel José"]},
  // {id: 2, voyage_captainconnection__captain__name: [863727, "Dias, Manoel José"]},
  // {id: 3, voyage_captainconnection__captain__name: [863727, "Dias, Manoel José"]}]

  return (
    <div>{
      value.map(table => (
          <Card>
          <CardHeader
              className={cardHeaderShadowStyles.root}
              title={'Voyage: '+table.id}
            />
            <CardContent>
              <Table>
                <TableBody>
                  {Object.keys(table).map(k => (
                    <TableRow align="left">
                      <TableCell align="left">{k}</TableCell>
                      <TableCell align="left">{table[k]}</TableCell>
                      {/* {Object.values(table[k]).map(ceil =>(
                        <TableCell align="left">{ceil}</TableCell>
                      ))} */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            </Card>))}
    </div>
  );
});

export default ElevatedHeaderCardDemo;