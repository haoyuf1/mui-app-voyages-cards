import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import Grid from '@mui/material/Grid';

export const ElevatedHeaderCardDemo = React.memo(function ElevatedHeaderCard() {
  const [label, setLabel] = useState([]); 
  const [value, setValue] = useState([]); 
  const AUTH_TOKEN = 'Token 77e6b7487f5c3aa4275257eb5f77ad06e8c62a39';

  useEffect(()=>{
        axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu';
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.options('/voyage/?hierarchical=False')
              .then(response => {
                //console.log(response.data);
                setLabel(response.data);
              })
              .catch(function (error) {
                //console.log(error);
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
              // console.log(response.data);
              setValue(response.data);
            })
            .catch(function (error) {
              // console.log(error);
            });
  }, []);

  return (
    <Grid container>
      {
        value.map(table => (
          <div>
          <Grid item>
          <Card sx={{color: 'white'}}>
          <CardHeader
              title={'Voyage: '+table.voyage_id}
              style={{backgroundColor: "darkblue"}}
          />
            <CardContent>
              <Table style={{backgroundColor: "lightblue"}}>
                <TableBody>
                  {
                    Object.keys(table)
                    .filter(k => table[k] !== null && 
                                 table[k].length !== 0)
                    .map(k => {
                      if (typeof table[k] === 'object') {
                        return (
                          <TableRow align="left">
                            <TableCell align="left">{label[k].flatlabel}</TableCell>
                            <TableCell align="left">
                              {Object.values(table[k])
                              .map(val => (<p>{val}</p>))}
                            </TableCell>
                          </TableRow>
                          )}
                      else {
                        return (
                          <TableRow align="left">
                            <TableCell align="left">{label[k].flatlabel} </TableCell>
                            <TableCell align="left">{table[k]}</TableCell>
                          </TableRow>
                          )}
                      })
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          </Grid>
          </div>
    ))}
    </Grid>
    );
});

export default ElevatedHeaderCardDemo;