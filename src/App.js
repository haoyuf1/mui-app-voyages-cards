import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
  const AUTH_TOKEN = 'Token abcd';

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
  
const v =[
   {voyage_id: 1, voyage_captainconnection__captain__name: ["Dias, Manoel José", "Mata, José Maria da"], voyage_dates__first_dis_of_slaves: "01,16,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Rio de Janeiro", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Mozambique"},
   {voyage_id: 2, voyage_captainconnection__captain__name: null, voyage_dates__first_dis_of_slaves: "01,17,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Mozambique"},
   {voyage_id: 3, voyage_captainconnection__captain__name: [], voyage_dates__first_dis_of_slaves: "01,17,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Cabinda"},
   {voyage_id: 4, voyage_captainconnection__captain__name: ["Dias, Domingos Francisco"], voyage_dates__first_dis_of_slaves: "02,27,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Quilimane"},
   {voyage_id: 5, voyage_captainconnection__captain__name: [], voyage_dates__first_dis_of_slaves: "03,14,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Cabinda"},
   {voyage_id: 6, voyage_captainconnection__captain__name: ["Costa, Bento Antônio da", "Lopes, Manoel Francisco"], voyage_dates__first_dis_of_slaves: "03,29,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Mozambique"},
   {voyage_id: 7, voyage_captainconnection__captain__name: ["Viana, Isidoro Antônio"], voyage_dates__first_dis_of_slaves: "04,28,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Malembo"},
   {voyage_id: 8, voyage_captainconnection__captain__name: ["Amorim, José Gomes de"], voyage_dates__first_dis_of_slaves: "05,04,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Pernambuco, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Luanda"},
   {voyage_id: 9, voyage_captainconnection__captain__name: ["Narciso, Antônio"], voyage_dates__first_dis_of_slaves: "03,27,1817", voyage_itinerary__imp_port_voyage_begin__geo_location__name: "Bahia, port unspecified", voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name: "Cabinda"}
  ]

  return (
    <div>{
      v.map(table => (
          <Card>
          <CardHeader
              className={cardHeaderShadowStyles.root}
              title={'Voyage: '+table.voyage_id}
            />
            <CardContent>
              <Table>
                <TableBody>
                  {
                    Object.keys(table)
                    .filter(k => table[k] !== null && table[k].length != 0)
                    .map(k => (
                      <TableRow align="left">
                        <TableCell align="left">{k}</TableCell>
                        <TableCell align="left">{table[k]}</TableCell>
                        {/* <TableCell align="left">
                          {Object.values(table[k])
                            .filter(val => val !== null)
                            .map(val => (<p>{val}</p>))}
                        </TableCell> */}
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </CardContent>
            </Card>))}
    </div>
  );
});

export default ElevatedHeaderCardDemo;