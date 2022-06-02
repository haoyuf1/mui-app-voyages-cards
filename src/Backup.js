import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export const ElevatedHeaderCardDemo = React.memo(function ElevatedHeaderCard() {
  const [label, setLabel] = useState([]); 
  const [value, setValue] = useState([]); 
  const AUTH_TOKEN = 'Token 77e6b7487f5c3aa4275257eb5f77ad06e8c62a39';

  // useEffect(()=>{
  //       axios.defaults.baseURL = 'https://voyages3-api.crc.rice.edu';
  //       axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  //       axios.defaults.headers.post['Content-Type'] = 'application/json';

        // axios.options('/voyage/?hierarchical=False')
        //       .then(response => {
        //         console.log(response.data);
        //         setLabel(response.data);
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });
        
  //       var data = new FormData();
  //       data.append('hierarchical', 'False');

  //       const mycardvariables = require('./voyage_export.json');
  //       var arrayLength = mycardvariables.length;
  //       for (var i = 0; i < 10; i++) {
  //         data.append('selected_fields', mycardvariables[i]);
  //       }

  //       axios.post('/voyage/', data)
  //           .then(response => {
  //             console.log(response.data);
  //             setValue(response.data);
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });
  // }, []);

  const test = [{id: 1, voyage_captainconnection__captain__name: [863727, "Dias, Manoel José"], voyage_crew__crew_died_complete_voyage: null},
                {id: 2, voyage_captainconnection__captain__name: [863727, "Dias, Manoel José"]}]
  

  
  return (
    <div>
        {<Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
      >
        <Grid item>
          {.map(table => (
            <Card>
            <CardHeader
              title={'Voyage: '+table.id}
            />
            <CardContent>
              <Table>
                <TableBody>
                  {Object.keys(table).map(k => (
                    <TableRow align="left">
                      <TableCell align="left">{k}</TableCell>
                      <TableCell align="right">{table[k]}</TableCell>
                      {table[k].map(ceil =>(
                        <TableCell align="right">{ceil}</TableCell>
                      ))}
                      {/* <TableCell align="left">{table[k]}</TableCell>
                      {table[k].map(v=>(
                          <TableCell align="left">{v}</TableCell>
                        ))} */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            </Card>))};
        </Grid>
      </Grid>}
    </div>
  );
});

export default ElevatedHeaderCardDemo;