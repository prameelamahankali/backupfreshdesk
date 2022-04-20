import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import pic from "../DNOWLogo.png";
import { Button, Modal, Box, StepIcon, IconButton } from '@mui/material';
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
    const [optick, setOpTick] = useState([])

    const [rows, setRows] = useState(tableData);
    const [deletedRows, setDeletedRows] = useState([]);


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
    //             el = 'Low';
    //         case 2:
    //             el = 'Medium';
    //         case 3:
    //             el = 'High';
    //         case 4:
    //             el = 'Urgent';
    //         default:
    //             break;
    //     }
    // }


    const columns = [
        {
            field: 'id', headerName: 'ID', flex: 0.5,
            renderCell: (params) => (
                <div>
                    {conversations.get(params.value) != null ? <div><div><a href={conversations.get(params.value)} target="_blank"><td style={{ width: '5px' }}>{params.value}</td></a></div></div> : <div>{params.value}</div>}

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
            field: 'requester_id', headerName: 'CREATED BY', flex: 1, 'filterable': false,
            renderCell: (params) => (
                <div>
                    {/* {contacts.get(params.value)} */}
                    {contacts.get(params.value) != null ? <td>{contacts.get(params.value)}</td> : <td>{'DNOW Contact'}</td>}
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
            field: 'updated_at', headerName: 'LAST UPDATED', flex: 1,
            'filterable': false,
            renderCell: (params) => (
                <div>
                    {(new Date(params.value).toLocaleDateString('en-US', { timeZone: 'UTC' }))}
                    {/* {(params.value.split('T')[0])} */}
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


        fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="status:2"', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((response) => {
                // console.log('response ', response.json());
                return response.json();
            })
            .then((open) => {
                // console.log('data1', open); c
                // console.log('total tickets', open.total); c
                // setData(open.results);

                for (let i = 0; i < open.total; i++) {
                    // console.log('---------------', open.results[i]); c


                    open.results[i]['diff'] = DayDiff(open.results[i]['created_at'], open.results[i]['updated_at'])

                    if (open.results[i]['status'] === 2) {
                        open.results[i]['status'] = 'Open';
                    }
                    if (open.results[i]['status'] === 3) {
                        open.results[i]['status'] = 'Pending';
                    }
                    if (open.results[i]['status'] === 4) {
                        open.results[i]['status'] = 'Resolved';
                    }
                    if (open.results[i]['status'] === 5) {
                        open.results[i]['status'] = 'Closed';
                    }
                    if (open.results[i]['status'] === 6) {
                        open.results[i]['status'] = 'Waiting on Customer';
                    }
                    if (open.results[i]['status'] === 7) {
                        open.results[i]['status'] = 'Waiting on Third Party';
                    }
                }
                for (let i = 0; i < open.total; i++) {
                    // console.log('data0', open.results[i]); c
                    if (open.results[i]['priority'] === 1) {
                        open.results[i]['priority'] = 'Low';
                    }
                    if (open.results[i]['priority'] === 2) {
                        open.results[i]['priority'] = 'Medium';
                    }
                    if (open.results[i]['priority'] === 3) {
                        open.results[i]['priority'] = 'High';
                    }
                    if (open.results[i]['priority'] === 4) {
                        open.results[i]['priority'] = 'Urgrnt';
                    }
                }
                setData(open.results);
                setOpenCount(open.results.length);


            })
            .catch((err) => {
                console.log('err in api call Main ', err);
            })


        fetch('https://tmsone.freshdesk.com/api/v2/tickets', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((data) => data.json())
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    // console.log('data0', data[i]); c
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

                    data[i]['diff'] = DayDiff(data[i]['created_at'], data[i]['updated_at'])


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
                }
                for (let i = 0; i < data.length; i++) {
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
                }
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
                var closedtickets = []

                for (let i = 0; i < data.length; i++) {
                    // console.log('tab     ', data[i]); c
                    if (data[i].status == 'Closed') {
                        // console.log('Closed', data[i].status); c
                        closedtickets.push(data[i])
                    }
                    // console.log('closedtickets', closedtickets, closedtickets.length) c

                }
                setClosedCount(closedtickets.length)

                var opentickets = []

                for (let i = 0; i < data.length; i++) {
                    // console.log('tab     ', data[i]); c
                    if (data[i].status == 'Open') {
                        // console.log('Open', data[i].status); c
                        opentickets.push(data[i])
                    }
                    // console.log('opentickets', opentickets, opentickets.length) c

                }


                // setTableData(optick)
                // setClosedCount(closedtickets)
                // setData(closedtickets)


                // console.log("########################################")

                setTableData(data)
                // console.log('open count ',opencount);
                // var d = parseInt(data.length) - parseInt(opencount)
                // console.log('closed',d);
                // setClosedCount(d);

                // setTableData(close)
                // setOpTick(optick)
                setAllTick(data)

                // console.log('Data', data) c
                // console.log('data length', data.length) c
                for (let i = 0; i < data.length; i++) {
                    // console.log('fro    ', data[i].id); c
                    getConversations(data[i].id);

                }

            })

        fetch('https://tmsone.freshdesk.com/api/v2/contacts', {
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
            .then((d) => {
                // console.log('data2', d); c

                // console.log('data 2 total ', d.length); c

                const map1 = new Map();
                for (let i = 0; i < d.length; i++) {
                    //  map1.set(d[i].id, d[i].name);
                    map1.set(d[i].id, d[i].name);
                }

                // console.log('map ', map1); c
                setContacts(map1)
            })
            .catch((error) => {
                console.log('error', error);
            })
    }, [])
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
                    // console.log('connn ', conv); c
                })
                .catch((error) => {
                    console.log('error in getConversations', error);
                })
        }

    }

    // console.log('conversations ', conversations); c

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
        //             // setData(data.results);


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
        var opentickets = []

        for (let i = 0; i < tableData.length; i++) {
            // console.log('tab     ', tableData[i]); c
            if (tableData[i].status == 'Open') {
                // console.log('open', tableData[i].status); c
                opentickets.push(tableData[i])
            }
            // console.log('opentickets', opentickets) c
        }
        // setTableData(optick)
        setData(opentickets)
        setOpenCount(opentickets.length);
        // console.log('opentickets length', opentickets.length) c

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

    function DayDiff(created_at, updated_at) {
        var diff = Date.parse(updated_at) - Date.parse(created_at);
        var d = isNaN(diff) ? NaN :
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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `high`;
        navigate(path);
    }

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
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <HighCharts />
                        </Box>
                    </Modal>

                </div>
            </div>
            <div style={{ 'textAlign': 'right' }}>
                {/* <TimelineRoundedIcon fontSize='large'></TimelineRoundedIcon> */}
                <Button onClick={routeChange}>Graph</Button>

                <Button onClick={opentickets}>Open : <div> {opencount} </div></Button>
                <Button onClick={closedtickets}>Closed : <div>{closedcount}</div></Button>
                <Button onClick={alltickets}>All : <div>{tableData.length}</div></Button>
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