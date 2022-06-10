import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';

import { AppContext } from "./App";

const myCardVars = 
[
    "voyage_id",
    "voyage_captainconnection__captain__name",
    "voyage_dates__first_dis_of_slaves",
    "voyage_itinerary__imp_port_voyage_begin__geo_location__name",
    "voyage_itinerary__imp_principal_place_of_slave_purchase__geo_location__name",
    "voyage_itinerary__imp_principal_port_slave_dis__geo_location__name",
    "voyage_dates__imp_arrival_at_port_of_dis_yyyy",
    "voyage_slaves_numbers__imp_total_num_slaves_embarked",
    "voyage_slaves_numbers__imp_total_num_slaves_disembarked",
    "voyage_slaves_numbers__imp_mortality_during_voyage",
    "voyage_ship__imputed_nationality__name",
    "voyage_dates__length_middle_passage_days",
    "voyage_ship__nationality_ship",
    "voyage_outcome__outcome_owner__name",
    "voyage_outcome__vessel_captured_outcome__name",
    "voyage_outcome__outcome_slaves__name",
    "voyage_shipownerconnection__owner__name",
    "voyage_outcome__resistance__name",
    "voyage_ship__ship_name",
    "voyage_sourceconnection__source__full_ref"
];

function Cards() {
    // UseContext Var
    const {label} = React.useContext(AppContext);
    console.log('Options Requested Label from API', label);
    // Env Var
    axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
    axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_AUTHTOKEN;
    // Local Var
    const [value, setValue] = useState([]);
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    var data = new FormData();
    data.append('hierarchical', 'False');
    for (var i = 0; i < myCardVars.length; i++) {
        data.append('selected_fields', myCardVars[i]);
    }
    
    useEffect(() => {
        axios.post('/voyage/', data)
            .then(response => {
                console.log(response.data);
                setValue(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },[]);
    return (
        <Grid container>
            {
                value.map(table => (
                    <div>
                        <Grid item xs={6} margin={2}>
                            <Card sx={{width: 300, color: 'white'}}>
                                <CardHeader
                                    style={{backgroundColor:'darkblue'}}
                                    title={'Voyage: ' + table.voyage_id}
                                />
                                <CardContent style={{backgroundColor:'lightblue'}}>
                                    <Table>
                                        <TableBody>
                                            {
                                                Object.keys(table)
                                                    .filter(k => table[k] !== null &&
                                                        table[k].length !== 0)
                                                    .map(k => {
                                                        if (typeof table[k] === 'object') {
                                                            return (
                                                                <TableRow align="left">
                                                                    <TableCell align="left">
                                                                        {label[k].flatlabel}
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        {Object.values(table[k])
                                                                            .map(val => (<p>{val}</p>))}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableRow align="left">
                                                                    <TableCell align="left">
                                                                        {label[k].flatlabel}
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        {table[k]}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                    })
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card></Grid></div>
                ))
            }
            </Grid>
        );
};

export default Cards;