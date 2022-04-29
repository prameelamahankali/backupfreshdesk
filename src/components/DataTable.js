
import React, { useState, useEffect } from 'react'
import { DataGrid, gridDateFormatter } from '@mui/x-data-grid'
import pic from "../DNOWLogo.png";
import img from "../statistics.png";
import {  Modal, StepIcon, IconButton, Tab, Tabs } from '@mui/material';
import td from '@mui/x-data-grid';
import HighCharts from './HighCharts';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import ClosedCaptionDisabledOutlinedIcon from '@mui/icons-material/ClosedCaptionDisabledOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';

import TimelineIcon from '@mui/icons-material/Timeline';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
// import Tabs from '@mui/material/Tab';
// import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { fontSize } from '@mui/system';
import axios from 'axios';
// import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import pica from "../leftarrow.png";

import { Box, Button, Grid, Item, Typography } from '@mui/material';
// import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GridPanelHeader } from '@mui/x-data-grid';
// import { useNavigate } from "react-router-dom";
// import { fontSize } from '@mui/system';


// function statusSwitch(el) {
//     switch (el) {

//         case 2:
//             return 'Open';
//         case 3:
//             return 'Pending';
//         case 4:
//             return 'Resolved';
//         case 5:
//             return 'Closed';
//         case 6:
//             return 'Waiting on Customer';
//         case 7:
//             return 'Waiting on Third Party'

//         default:
//             break;
//     }
// }

// function prioritySwitch(el) {
//     switch (el) {
//         case 1:
//             return 'Low';
//         case 2:
//             return 'Medium';
//         case 3:
//             return 'High';
//         case 4:
//             return 'Urgent';
//         default:
//             break;
//     }
// }
// const columns = [
//     { field: 'id', headerName: 'ID', },

//     {field: 'status', headerName: 'STATUS', width: 100,
//         // renderCell: <td>{statusSwitch(el)}</td>
//         // renderCell: <td>{'Open'}</td>
//         renderCell: (params) => (
//             <strong>
//               {statusSwitch(params.value)}
//             </strong>
//           ),
//     },

//     {
//         field: 'priority', headerName: 'PRIORITY', width: 100,
//         renderCell: (params) => (
//             <strong>
//               {prioritySwitch(params.value)}
//             </strong>
//           ),

//     },

//     {
//          field: 'created_at', headerName: 'CREATED AT', width: 200,
//          renderCell: (params) => (
//          <strong>
//           {(new Date(params.value).toLocaleDateString())}
//          </strong>
//       ),
//     },
//     {
//         field: 'subject', headerName: 'SUBJECT', width: 200,


//    },
//    {
//     field: 'requester_id', headerName: 'CREATED BY', width: 200,
//     renderCell: (params) => (
//     <strong>
//      {contacts.get(el.requester_id)(params.value)}
//     </strong>
//  ),
// },



// ]
// CORS(app)

const DataTable = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(false);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({});
    const [opencount, setOpenCount] = useState(0);
    const [closedcount, setClosedCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [contacts, setContacts] = useState(new Map());

    const [conversations, setConversations] = useState(new Map());
    const updateMap = (k, v) => {
        setConversations(new Map(conversations.set(k, v)));
    }
    const [alltick, setAllTick] = useState([])
    // const [optick, setOpTick] = useState([])

    const [rows, setRows] = useState(tableData);
    const [deletedRows, setDeletedRows] = useState([]);
    const [value, setValue] = React.useState('one');
    const [days, setDays] = useState([])
    const [tickets, setTickets] = useState([])
    const [graph, setGraph] = useState(new Map())

    const [optick, setOpTick] = useState([])
    const [todayop, setTodayOp] = useState(0)
    const [opticklastweek, setOpTickLastWeek] = useState(0)
    const [restime, setResTime] = useState(0)
    const [resoltime, setresoltime] = useState(0)
    const [high, sethigh] = useState([])
    const [tableDataa, setTableDataa] = useState([])



    const columns = [
        {
            field: 'id', headerName: 'ID', flex: 0.5,
            renderCell: (params) => (
                <div>
                    {conversations.get(params.value) != null ? <div><a href={conversations.get(params.value)} target="_blank"><span>{params.value}</span></a></div> : <div>{params.value}</div>}

                </div>

            ),
        },

        {
            field: 'status', headerName: 'STATUS', flex: 0.8,
            // renderCell: (params) => (
            //     <strong>
            //       {statusSwitch(params.value)}
            //     </strong>
            //   ),
        },

        {
            field: 'priority', headerName: 'PRIORITY', flex: 1,
            // renderCell: (params) => (
            //     <strong>
            //       {prioritySwitch(params.value)}
            //     </strong>
            // ),

        },

        {
            field: 'subject', headerName: 'SUBJECT', flex: 3, 'filterable': false,
            renderCell: (params) => (
                <div style={{ wordBreak: 'break-all', whiteSpace: 'pre-line', textAlign: 'justify' }}>
                    {params.value}
                </div>
            ),
        },

        {
            field: 'requester.name', headerName: 'CREATED BY', flex: 1, 'filterable': false,
            renderCell: (params) => (
                <div>
                    {/* {contacts.get(params.value)} */}
                    {params.row.requester.name != null ? <td>{params.row.requester.name}</td> : <td>{'DNOW Contact'}</td>}
                </div>
            ),
        },

        {
            field: 'created_at', headerName: 'CREATED DATE', flex: 1,
            'filterable': false,
            renderCell: (params) => (
                <div>
                    {(new Date(params.value).toLocaleDateString('en-US', { timeZone: 'UTC' }))}
                    {/* {(params.value.split('T')[0])} */}

                    {/* {new Date(Date.UTC(params.value.getFullYear(), params.value.getMonth(), params.value.getDate()))}; */}
                </div>
            ),
        },

        {
            field: 'due_by', headerName: 'DUE BY', flex: 1,
            'filterable': false,
            renderCell: (params) => (
                <div>
                    {(new Date(params.value).toLocaleDateString('en-US', { timeZone: 'UTC' }))}
                    {/* {(params.value.split('T')[0])} */}
                </div>
            ),
        },

        {
            field: "stats.resolved_at", headerName: 'CLOSED AT', flex: 1,
            'filterable': false,
            renderCell: (params) => (
                <div>
                    {params.row.stats.resolved_at != null ? (new Date(params.row.stats.resolved_at).toLocaleDateString('en-US', { timeZone: 'UTC' })) : '-'}
                    {/* {params.row.stats.closed_at} */}
                </div>
            ),
        },

        {
            field: 'diff', headerName: 'DURATION (Days)', flex: 1,
            'filterable': false,

        },








    ]

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        };
        // {opentickets}


        // fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="status:2"', {
        //     method: 'GET',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
        //         'soNkJKPVmx1hxcr5Q9QT': 'X'
        //     })
        // })
        //     .then((response) => {
        //         // console.log('response ', response.json());
        //         return response.json();
        //     })
        //     .then((open) => {
        //         // console.log('data1', open); c
        //         // console.log('total tickets', open.total); c
        //         // setData(open.results);

        //         for (let i = 0; i < open.total; i++) {
        //             // console.log('---------------', open.results[i]); c


        //             open.results[i]['diff'] = DayDiff(open.results[i]['created_at'], open.results[i]['updated_at'])

        //             if (open.results[i]['status'] === 2) {
        //                 open.results[i]['status'] = 'Open';
        //             }
        //             if (open.results[i]['status'] === 3) {
        //                 open.results[i]['status'] = 'Pending';
        //             }
        //             if (open.results[i]['status'] === 4) {
        //                 open.results[i]['status'] = 'Resolved';
        //             }
        //             if (open.results[i]['status'] === 5) {
        //                 open.results[i]['status'] = 'Closed';
        //             }
        //             if (open.results[i]['status'] === 6) {
        //                 open.results[i]['status'] = 'Waiting on Customer';
        //             }
        //             if (open.results[i]['status'] === 7) {
        //                 open.results[i]['status'] = 'Waiting on Third Party';
        //             }
        //         }
        //         for (let i = 0; i < open.total; i++) {
        //             // console.log('data0', open.results[i]); c
        //             if (open.results[i]['priority'] === 1) {
        //                 open.results[i]['priority'] = 'Low';
        //             }
        //             if (open.results[i]['priority'] === 2) {
        //                 open.results[i]['priority'] = 'Medium';
        //             }
        //             if (open.results[i]['priority'] === 3) {
        //                 open.results[i]['priority'] = 'High';
        //             }
        //             if (open.results[i]['priority'] === 4) {
        //                 open.results[i]['priority'] = 'Urgrnt';
        //             }
        //         }
        //         setData(open.results);
        //         setOpenCount(open.results.length);


        //     })
        //     .catch((err) => {
        //         console.log('err in api call Main ', err);
        //     })


        // fetch('https://tmsone.freshdesk.com/api/v2/contacts', {
        //     method: 'GET',
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //         'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
        //         'soNkJKPVmx1hxcr5Q9QT': 'X'
        //     })
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((d) => {
        //         // console.log('data2', d); c

        //         // console.log('data 2 total ', d.length); c

        //         const map1 = new Map();
        //         for (let i = 0; i < d.length; i++) {
        //             //  map1.set(d[i].id, d[i].name);
        //             map1.set(d[i].id, d[i].name);
        //         }

        //         // console.log('map ', map1); c
        //         setContacts(map1)
        //     })
        //     .catch((error) => {
        //         console.log('error in contacts', error);
        //     })
    }, [])


    useEffect(() => {
        fetch('https://tmsone.freshdesk.com/api/v2/tickets?include=stats,requester', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((data) => data.json())
            .then((data) => {

                // var open = []
                const map1 = new Map();
                var day = []
                var tick = []
                var closedtickets = []
                let openticketst = []

                var opentickets = []
                var todayopentickets = []
                var openticketslastweek = []
                var responsetime = []
                var resolutiontime = []
                var high = []
                var highprioritylastweek = []
                for (let i = 0; i < data.length; i++) {
                    // console.log('data0', data[i].id);
                    // switch (data[i]['status']) {
                    //     case 2:
                    //         return 'Open';
                    //     case 3:
                    //         return 'Pending';
                    //     case 4:
                    //         return 'Resolved';
                    //     case 5:
                    //         return 'Closed';
                    //     case 6:
                    //         return 'Waiting on Customer';
                    //     case 7:
                    //         return 'Waiting on Third Party'

                    //     default:
                    //         break;
                    //     }

                    // if (data[i].status == 2) {
                    //     // console.log('status', data[i].status); c
                    //     // console.log('open length', open.length) c

                    //     open.push(data[i])

                    // }



                    data[i]['diff'] = DayDiff(data[i]['created_at'], data[i]['stats']['closed_at'])


                    if (data[i]['status'] === 2) {
                        data[i]['status'] = 'Open';
                    }
                    if (data[i]['status'] === 3) {
                        data[i]['status'] = 'Pending';
                    }
                    if (data[i]['status'] === 4) {
                        data[i]['status'] = 'Resolved';
                    }
                    if (data[i]['status'] === 5) {
                        data[i]['status'] = 'Closed';
                    }
                    if (data[i]['status'] === 6) {
                        data[i]['status'] = 'Waiting on Customer';
                    }
                    if (data[i]['status'] === 7) {
                        data[i]['status'] = 'Waiting on Third Party';
                    }
                // }
                // setData(open)
                // setOpenCount(open.length);
                // for (let i = 0; i < data.length; i++) {
                    // console.log('data0', data[i]); c
                    if (data[i]['priority'] === 1) {
                        data[i]['priority'] = 'Low';
                    }
                    if (data[i]['priority'] === 2) {
                        data[i]['priority'] = 'Medium';
                    }
                    if (data[i]['priority'] === 3) {
                        data[i]['priority'] = 'High';
                    }
                    if (data[i]['priority'] === 4) {
                        data[i]['priority'] = 'Urgrnt';
                    }
                // }
                // for (let i = 0; i < data.length; i++) {
                //     console.log('created date', data[i]['created_at']);
                //     console.log('updated date', data[i]['updated_at']);
                // switch (data[i]['updated_at'] - data[i]['created_at']) {

                // }
                // var diff = Math.floor((Date.parse('updated_at') - Date.parse('created_at')) / 86400000);
                // console.log('diffff',diff)

                // function dateDiff( created_at, updated_at ) {
                //     var diff = Date.parse( updated_at ) - Date.parse( created_at ); 
                //     return isNaN( diff ) ? NaN : {
                //         diff : diff,
                //         ms : Math.floor( diff            % 1000 ),
                //         s  : Math.floor( diff /     1000 %   60 ),
                //         m  : Math.floor( diff /    60000 %   60 ),
                //         h  : Math.floor( diff /  3600000 %   24 ),
                //         d  : Math.floor( diff / 86400000        )
                //     };

                // }
                // console.log('diff',dateDiff)
                // }
                
                // var closedtickets = []

                // for (let i = 0; i < data.length; i++) {
                    // console.log('tab     ', data[i]); c
                    if (data[i].status == 'Closed') {
                        // console.log('Closed', data[i].status); c
                        closedtickets.push(data[i])
                    }
                    // console.log('closedtickets', closedtickets, closedtickets.length) c

                // }
                // setClosedCount(closedtickets.length)

                // let openticketst = []

                // for (let i = 0; i < data.length; i++) {
                    // console.log('tab     ', data[i]); c
                    if (data[i].status == 'Open') {
                        // console.log('Open', data[i].status); c
                        openticketst.push(data[i])
                    }
                    // console.log('opentickets', opentickets, opentickets.length) c

                // }

              
                


                // setTableData(optick)
                // setClosedCount(closedtickets)
                // setData(closedtickets)


                // console.log("########################################")

                // setData(openticketst);
                // setOpenCount(openticketst.length)
                // setTableData(data);
                // console.log('open count ',opencount);
                // var d = parseInt(data.length) - parseInt(opencount)
                // console.log('closed',d);
                // setClosedCount(d);

                // setTableData(close)
                // setOpTick(optick)
                // setAllTick(data)

                // console.log('Data', data)

                // console.log('data length', data.length) c
                // for (let i = 0; i < data.length; i++) {
                //     // console.log('fro    ', data[i].id); c
                //     getConversations(data[i].id);

                // }
///////////////////////HIGH CHARTS
                // const map1 = new Map();
                // var day = []
                // var tick = []

                
                // for (let i = 0; i < data.length; i++) {
                    // console.log('id', data[i].id); c


                    data[i]['diff'] = DayDiff(data[i]['created_at'], data[i]['stats']['resolved_at'])

                    tick.push(data[i].id)
                    day.push(DayDiff(data[i]['created_at'], data[i]['stats']['resolved_at']))
                    map1.set(data[i].id, data[i].diff);
                    // console.log('difference', data[i].diff) 

                // }
                //  console.log('map1', map1.keys())  
                // setDays(day)
                // setTickets(tick)
                // setGraph(map1)

                // console.log('data[i].status ',data[i].status , data[i].status == 'Open');

                
                // for (let i = 0; i < data.length; i++) {
                    // console.log('tab     ', data[i]); c
                    if (data[i].status == 'Open') {
                        // console.log('status', data[i].status, new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }) == new Date().toLocaleDateString('en-US', { timeZone: 'UTC' })); 
                        opentickets.push(data[i])
                    
                        // console.log('cretaed', data[i]['created_at'], new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }), new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }))
                        if (new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }) == new Date().toLocaleDateString('en-US', { timeZone: 'UTC' })) {
                            
                            // console.log('opentoday', data[i]['created_at']) 
                            todayopentickets.push(data[i])
                            // if ((new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' })<new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-US', { timeZone: 'UTC' })){
                            //     console.log('cretaed', data[i]['created_at'])

                            // }
                        }
                    }


                        var created = new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var weekAgoDate = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var today = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
                        // console.log('datesss ', created, weekAgoDate, today); c
                        if (created < today && created > weekAgoDate) {
                            // console.log('dates open', created); c
                            openticketslastweek.push(data[i])
                        }
                    // }
                    var created_at = (new Date(data[i]['created_at']).getHours());
                    var created_at = (new Date(data[i]['created_at']).toLocaleTimeString());
                    var first_responded_at = (new Date(data[i]['stats']['first_responded_at']).toLocaleTimeString());
                    // var first_responded_at = (new Date(data[i]['stats']['first_responded_at']).getHours());
                    var closed_at = (new Date(data[i]['stats']['resolved_at']).toLocaleTimeString());
                    // var closed_at = (new Date(data[i]['stats']['resolved_at']).getHours());
                    // console.log('kkkkkkkkkkkk',created_at,first_responded_at,closed_at) c


                    const dateOne = data[i]['created_at'];

                    const dateTwo = data[i]['stats']['first_responded_at'];
                    const dateOneObj = new Date(dateOne);
                    const dateTwoObj = new Date(dateTwo);
                    // console.log('dateone', dateOne, dateTwo, dateOneObj, dateTwoObj) c

                    // const milliseconds = Math.abs(dateTwoObj - dateOneObj);
                    // const hours = milliseconds / 3600;
                    // const respon = hours / 30;
                    if (dateOne != null && dateTwo != null) {
                        // let diffTime = Math.abs(new Date(dateOne) - new Date(dateTwo));
                        // let days = diffTime / (24 * 60 * 60 * 1000);
                        // let hours = (days % 1) * 24;
                        // let minutes = (hours % 1) * 60;
                        // let secs = (minutes % 1) * 60;
                        // [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]

                        // console.log(data[i].id ,'timeeeee'  ,days + 'd', hours + 'h', minutes + 'm', secs + 's');


                        const milliseconds = Math.abs(dateTwoObj - dateOneObj);
                        const hours = Math.round(milliseconds / 36e5);
                        const time =  ((hours / 2));
                        responsetime.push(time)

                        // console.log('hourssss ', milliseconds, hours); c


                    }
                    else {
                        responsetime.push(0)

                    }

                    const dOne = data[i]['created_at'];
                    const dTwo = data[i]['stats']['resolved_at'];
                    // console.log('done',dOne,dTwo)


                    if (dOne != null && dTwo != null) {

                        const dOneObj = new Date(dOne);
                        const dTwoObj = new Date(dTwo);
                        // console.log('done', dOne, dTwo, dOneObj, dTwoObj) c
                        const milliseconds = Math.abs(dTwoObj - dOneObj);
                        const hours = Math.round(milliseconds / 36e5);
                        const time =  Math.round((hours / 24)*8)
                         
                        const minu = Math.round(milliseconds / 60000);

                        resolutiontime.push(time)

                        // console.log('resolhourssss ', hours, minu); c

                    }
                    else {
                        resolutiontime.push(0)
                    }
                    // var high = data[i].priority

                    // console.log('highhhh', high) 
                    // var created = new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' });
                    // var weekAgoDate = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-US', { timeZone: 'UTC' });
                    // var today = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
                    // // console.log('datesss ', created, weekAgoDate, today); c
                    // if (created < today && created > weekAgoDate) {

                    //     // console.log('high priority', data[i].status); c
                    //     openticketslastweek.push(data[i])
                    // }
                    if (data[i].priority == 1 || data[i].priority == 4) {
                        // console.log('status', data[i].priority); c
                        high.push(data[i])
                        // console.log('cretaed', data[i]['created_at'], new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }), new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }))
                        var created = new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var eightweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 56)).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var today = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
                        // console.log('eight week ago')
                        // console.log('datesss ', created, eightweekAgoDate, today);
                        if (created < today && created > eightweekAgoDate) {
                            // console.log('----high created', created); c
                            highprioritylastweek.push(data[i])
                        }

                    }

            
                    // console.log('highprioritylastweek', highprioritylastweek,    highprioritylastweek.length) 
                }

                    // var date1 = new Date(data[i]['created_at']).getTime() / 1000;

                    // var date2 = new Date(data[i]['stats']['first_responded_at']).getTime() / 1000;

                    // var difference = (date2 - date1) / 60 / 60;


                    // var res = difference / 30
                    // console.log(res, 'difference');


                    // console.log('first_responded_at', first_responded_at); c
                    // console.log('created_at', created_at); c
                    // console.log('closed_at', closed_at); c

                

                    // console.log('openticketslastweek', openticketslastweek) 
                    setOpTickLastWeek(openticketslastweek.length)
                    // console.log('todaytopentickets', todayopentickets) 
                    setTodayOp(todayopentickets.length)

                    // console.log('opentickets', opentickets, opentickets.length)
                    // console.log('responsetime', responsetime) 
                    // console.log('resolutiontime', resolutiontime) 
                // }
                setAllTick(data)
                setDays(day)
                setTickets(tick)
                setGraph(map1)
                setData(openticketst);
                setOpenCount(openticketst.length)
                setTableData(data);
                setClosedCount(closedtickets.length)
                setOpTick(opentickets)
                const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                var avg = average(responsetime)
                // console.log('Average response', avg) 
                setResTime(avg)

                const resolvetime = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                var resolve = resolvetime(resolutiontime)
                // console.log('Average resolutiontime', resolve) 
                setresoltime(resolve)
                sethigh(highprioritylastweek.length)

                
                setTableDataa(data)


            
        })
            .catch((err) => {
                console.log('Error in include Stats ', err);
            })

    },[])
    // console.log('ot', data) c

    // console.log('tabledata', tableData); c

    function getConversations(ticketId) {

        if (ticketId != null) {
            fetch(`https://tmsone.freshdesk.com/api/v2/tickets/${ticketId}/conversations`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                    'soNkJKPVmx1hxcr5Q9QT': 'X'
                })
            })
                .then((response) => {
                    return response.json();


                })
                .then((result) => {
                    // console.log('url length', result.length); c
                    // console.log('url data', result); c
                    // console.log(result)
                    const map2 = new Map();
                    var convArr = [];
                    for (let i = 0; i < result.length; i++) {

                        if (result[i].body_text.includes('https://tmsone')) {

                            let value = result[i].body_text.split('https://tmsone')
                            let value1 = value[1].split(" ")
                            let url = 'https://tmsone' + value1[0]
                            // console.log(url, "urlllll")    c         //here I am getting only url
                            // map2.set(ticketId, result[i].body_text);
                            // map2.set(ticketId, url);
                            // conversations.set(ticketId, url);
                            // convArr.push({'ticketId-'+ticketId : url})
                            if (url != null || url != undefined || url != '') {
                                //convArr[ticketId] = url;

                                //map2.set(ticketId, url);
                                //setConversations(new Map(map2));

                                updateMap(ticketId, url);
                            }

                            // console.log('map2 ',convArr);
                        }
                    }

                    // console.log('map2 ',map2);

                    // console.log("convArr   ", convArr); c
                    return convArr;

                })
                .then((conv) => {
                    // console.log('connn ', conv); 
                })
                .catch((error) => {
                    console.log('error in getConversations', error);
                })
        }

    }

    // console.log('conversations ', conversations);

    function opentickets() {
        // fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="status:2"', {
        //     // fetch('https://tmsone.freshdesk.com/api/v2/tickets', {

        //         method: 'GET',
        //         headers: new Headers({
        //             'Content-Type': 'application/json',
        //             'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
        //             'soNkJKPVmx1hxcr5Q9QT': 'X'
        //         })
        //     })
        //         .then((response) => {
        //             // console.log('response ', response.json());
        //             return response.json();
        //         })
        //         .then((data) => {
        //             console.log('data1', data);
        //             console.log('total tickets',data.length);
        // setData(data.results);


        //             for (let i=0; i<data.results.length; i++){
        //                 console.log('data.results0', data.results[i]);


        //                 if (data.results[i]['status'] === 2){
        //                     data.results[i]['status'] = 'Open';
        //                 }
        //                 if (data.results[i]['status'] === 3){
        //                     data.results[i]['status'] = 'Pending';
        //                 }
        //                 if (data.results[i]['status'] === 4){
        //                     data.results[i]['status'] = 'Resolved';
        //                 }
        //                 if (data.results[i]['status'] === 5){
        //                     data.results[i]['status'] = 'Closed';
        //                 }
        //                 if (data.results[i]['status'] === 6){
        //                     data.results[i]['status'] = 'Waiting on Customer';
        //                 }
        //                 if (data.results[i]['status'] === 7){
        //                     data.results[i]['status'] = 'Waiting on Third Party';
        //                 }
        //             }
        //             for (let i=0; i<data.results.length; i++){
        //                 console.log('data.results0', data.results[i]);
        //                 if (data.results[i]['priority'] === 1){
        //                     data.results[i]['priority'] = 'Low';
        //                 }
        //                 if (data.results[i]['priority'] === 2){
        //                     data.results[i]['priority'] = 'Medium';
        //                 }
        //                 if (data.results[i]['priority'] === 3){
        //                     data.results[i]['priority'] = 'High';
        //                 }
        //                 if (data.results[i]['priority'] === 4){
        //                     data.results[i]['priority'] = 'Urgrnt';
        //                 }                   
        //             }

        //             setTableData(data.results)

        //             // console.log('data 1 id',data.results.id);

        //             // for(let i=0; i<data.total; i++) {
        //             //     console.log('fro    ',data.results[i].id);
        //             //     getConversations(data.results[i].id);
        //             // }
        //             // for(let i=0; i<data.results.length; i++) {
        //             //     console.log('fro    ',data.results[i].id);
        //             //     getConversations(data.results[i].id);
        //             // }


        //         })
        //         .catch((err) => {
        //             console.log('err in api call Main ', err);
        //         })
        // .catch((err) => {
        // console.log('err in api call Main ', err);
        // })

        // console.log('openTickets'); c
        var openticketsArr = []

        for (let i = 0; i < tableData.length; i++) {
            // console.log('tab     ', tableData[i]); 
            if (tableData[i].status == 'Open') {
                // console.log('open', tableData[i].status); c
                openticketsArr.push(tableData[i])
            }
            // console.log('opentickets', openticketsArr) 
        }
        // setTableData(optick)
        setData(openticketsArr)
        setOpenCount(openticketsArr.length);
        // console.log('opentickets length', openticketsArr.length) 

    }
    function alltickets() {
        //         console.log('allTickets');
        //         var alltickets = []
        //  console.log(tableData.length,"tableData.length")
        //         for(let i=0; i<tableData.length; i++) {
        //             console.log('tab all    ', tableData[i]);
        //             if(tableData[i].status) {
        //                 console.log('All', tableData[i].status);  
        //                 alltickets.push(tableData[i])
        //             }
        //             console.log('alltickets', alltickets)    
        //         }
        // setAllTick(alltickets)



        //    setTableData(alltickets)

        // window.location.reload();

        setData(alltick)

    }



    // function DayDiff(created_at, updated_at) {
    //     // always round down
    // //   var d = Math.floor((Math.abs(updated_at-created_at))/(1000*60*60*24));
    //   setDays(days)

    function DayDiff(created_at, resolved_at) {
        var diff = Date.parse(resolved_at) - Date.parse(created_at);
        var d = isNaN(diff) ? '--' :
            // diff : diff,
            // ms : Math.floor( diff            % 1000 ),
            // s  : Math.floor( diff /     1000 %   60 ),
            // m  : Math.floor( diff /    60000 %   60 ),
            // h  : Math.floor( diff /  3600000 %   24 ),
            Math.floor(diff / 86400000)
        // console.log('diff', d) c
        return d
    }
    function closedtickets() {

        // console.log('closedTickets'); c
        var closedtickets = []

        for (let i = 0; i < tableData.length; i++) {
            // console.log('tab     ', tableData[i]); c
            if (tableData[i].status == 'Closed') {
                // console.log('Closed', tableData[i].status); c
                closedtickets.push(tableData[i])
            }
            // console.log('closedtickets', closedtickets) c
        }
        // setTableData(optick)
        // setClosedCount(closedtickets)
        setData(closedtickets)
        // setClosedCount(closedtickets.length);
        // console.log('closedtickets length', closedtickets.length) c

    }


    const style = {
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        // width: 700,
        // bgcolor: 'background.paper',
        // border: '2px solid #000',
        // position: 'absolute',
        // boxShadow: 24,
        // p: 4,
        justifyContent: 'right',
        fontSize: 'medium'
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `high`;
        navigate(path,{state:{days: days, tableDataa: tableDataa, graph: graph,todayop: todayop,opticklastweek:opticklastweek,high:high,restime: restime,resoltime: resoltime}});
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        if (data.length > 0) {
            // for (let i = 0; i < data.length; i++) {
            //     getConversations(data[i].id);
            // }
        }

    }, [data])


    useEffect(() => {
        fetch(`https://tmsone.freshdesk.com/api/v2/search/tickets?query="created_at:>%20'2022-01-02'%20AND%20(priority:3%20OR%20priority:4)"`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'headers': 'Link',
                'soNkJKPVmx1hxcr5Q9QT': 'X',
                'Access-Control-Expose-Headers': '*'


            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log('updated', data, data.results.length, data.total)

                var eightweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 56));
                var sevenweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 49));
                var sixthweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 42));
                var fifthweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 35));
                var fourthweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 28));
                var thirdweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 21));
                var secondweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 14));
                var firstweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 7));

                var today = new Date();
                var perweek = []

                var highArr = []
                var eightweek = []
                var seventhweek = []
                var sixthweek = []
                var fifthweek = []
                var fourthweek = []
                var thirdweek = []
                var secondweek = []
                var firstweek = []
               

                for (let i = 0; i < data.results.length; i++) {





                    var created = new Date(data.results[i]['created_at']);



                    if (data.results[i].priority == 3 || data.results[i].priority == 4) {
                        // console.log('status', data.results[i].priority);
                        highArr.push(data.results[i])
                        if (created >= eightweekAgoDate && created <= sevenweekAgoDate) {
                            // console.log('----high created', data.results[i]);
                            eightweek.push(data.results[i])

                            // perweek.push(eightweek.length)

                            // console.log('888'); 
                            // console.log(created,eightweekAgoDate,sevenweekAgoDate,data.results[i].id); 

                        }

                        else if (created >= sevenweekAgoDate && created <= sixthweekAgoDate) {
                            seventhweek.push(data.results[i])

                            // console.log('777'); 
                            // console.log(created,sevenweekAgoDate,sixthweekAgoDate,data.results[i].id); 

                        }
                        else if (created >= sixthweekAgoDate && created <= fifthweekAgoDate) {
                            sixthweek.push(data.results[i])

                            // console.log('666');
                            // console.log(created,sixthweekAgoDate,fifthweekAgoDate,data.results[i].id);

                        }
                        else if (created >= fifthweekAgoDate && created <= fourthweekAgoDate) {
                            fifthweek.push(data.results[i])

                            // console.log('555');
                            // console.log(created,fifthweekAgoDate,fourthweekAgoDate,data.results[i].id);

                        }
                        else if (created >= fourthweekAgoDate && created <= thirdweekAgoDate) {
                            fourthweek.push(data.results[i])

                            // console.log('444');
                            // console.log(created,fourthweekAgoDate,thirdweekAgoDate,data.results[i].id);

                        }
                        else if (created >= thirdweekAgoDate && created <= secondweekAgoDate) {
                            thirdweek.push(data.results[i])

                            // console.log('333');
                            // console.log(created,thirdweekAgoDate,secondweekAgoDate,data.results[i].id);

                        }
                        else if (created >= secondweekAgoDate && created <= firstweekAgoDate) {
                            secondweek.push(data.results[i])

                            // console.log('222');
                            // console.log(created,secondweekAgoDate,firstweekAgoDate,data.results[i].id);

                        }
                        else if (created >= firstweekAgoDate && created <= today) {
                            firstweek.push(data.results[i])

                            // console.log('111');
                            // console.log(created,firstweekAgoDate,today,data.results[i].id);

                        }

                    }

                }
                perweek.push(firstweek.length)
                perweek.push(secondweek.length)
                perweek.push(thirdweek.length)
                perweek.push(fourthweek.length)
                perweek.push(fifthweek.length)
                perweek.push(sixthweek.length)
                perweek.push(seventhweek.length)

                perweek.push(eightweek.length)





                sethigh(perweek)



                // // console.log('Dates', created, eightweekAgoDate, sevenweekAgoDate, sixthweekAgoDate, fifthweekAgoDate, fourthweekAgoDate, thirdweekAgoDate, secondweekAgoDate, firstweekAgoDate, today);
                // console.log('high array', high);
                // // // console.log('highprio array', highprio);
                // console.log('weekly data',perweek);
                // console.log(firstweek.length,secondweek.length,thirdweek.length,fourthweek.length, fifthweek.length,sixthweek.length, seventhweek.length, eightweek.length);

            })









    }, [data])




    return (
        // <div style={{ borderRadius: '0.5rem', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',height: 700, width: '97%',padding:'10px'}}>
        <div style={{ height: 700, padding: '10px' }} >
            {/* // <div style={{borderRadius: '0.5rem', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)', width: '97%', padding: '1rem'}}> */}
            {/* <h1 style={{'textAlign':'right', width: '97%'}}>{tableData.length > 0 ? <div>Tickets : <b>{tableData.length}</b></div> : 'No Records Found'}</h1> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 3rem' }}>
                <img src={pic} alt="DNOW" width="100" height="40" />
                <div>


                    {/* <button class="custButton" onClick={routeChange}> */}

                    {/* </button> */}

                    {/* <Redirect to="/HighCharts" /> */}
                    {/* <AnalyticsIcon onClick={window.Navigator}></AnalyticsIcon> */}
                    {/* <IconButton aria-label="fingerprint" color="secondary">
                        <StepIcon />
                    </IconButton> */}
                    {/* <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <HighCharts />
                        </Box>
                    </Modal> */}

                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                {/* <TimelineRoundedIcon fontSize='large'></TimelineRoundedIcon> */}
                {/* <Button className='one' onClick={routeChange}>Graph</Button>

                <Button  className='two' onClick={opentickets}>Open:  <div> {opencount} </div> </Button>
                <Button  className= 'three' onClick={closedtickets}>Closed:  <div> {closedcount}  </div></Button>
                <Button  className='two' onClick={alltickets}>All:  <div> {tableData.length} </div></Button>  */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"

                // onChange={(event, value) => { handleChange(value) }}
                // indicatorColor="primary"
                // textColor="primary"
                // centered
                >
                    <Tab
                        value='two'
                        onClick={routeChange}
                        label={<img src={img} alt="Graph" width="35" height="30" />}
                    // label = "📈"



                    />
                    <Tab
                        value='one'
                        onClick={opentickets}

                        label={'Open: ' + opencount}


                    />
                    <Tab value='three' label={'Closed: ' + closedcount} onClick={closedtickets} />
                    <Tab value='four' label={'All: ' + tableData.length} onClick={alltickets} />
                </Tabs>
                {/* <h1 style={{'textAlign':'right','fontSize' : 'large'}}>{tableData.length > 0 ? <div>: <b>{tableData.length}</b></div> : 'No Records Found'}</h1> */}
                {/* <h1><div>All Tickets<button><a href={tableData}></a></button></div></h1> */}
            </div>
            {/* <h1 style={{'textAlign':'right','fontSize' : 'large'}}>{tableData.length > 0 ? <div>Tickets: <b>{tableData.length}</b></div> : 'No Records Found'}</h1> */}
            {/* <h1><div>All Tickets<button><a href={tableData}></a></button></div></h1> */}

            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid

                        // {...tableData.length > 0 ? tableData.map((el, idx) => {
                        //     console.log('el ', el.id, idx);

                        //     <td>{statusSwitch(el.status)}</td>

                        // }) : null}

                        rows={data}
                        columns={columns}
                        pageSize={12}
                    // rowsPerPageOptions={[5]}
                    // checkboxSelection
                    // onSelectionModelChange={({ selectionModel }) => {
                    //     const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
                    //     const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
                    //     setDeletedRows(rowsToDelete);
                    //     console.log(deletedRows);
                    // }}
                    />

                </div>
            </div>


        </div>
    )
}

export default DataTable
