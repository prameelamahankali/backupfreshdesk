import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import pic from "../DNOWLogo.png";
import { Button } from '@mui/material';
import td from '@mui/x-data-grid'

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
            field: 'id', headerName: 'ID', flex: 1,
            renderCell: (params) => (
                <div>
                    {conversations.get(params.value) != null ? <div><div><a href={conversations.get(params.value)} target="_blank"><td style={{ width: '5px' }}>{params.value}</td></a></div></div> : <div>{params.value}</div>}

                </div>

            ),
        },

        {
            field: 'status', headerName: 'STATUS', flex: 1,
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
            field: 'subject', headerName: 'SUBJECT', flex: 4, 'filterable': false,
            renderCell: (params) => (
                <div style={{wordBreak:'break-all',whiteSpace:'pre-line'}}>
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
                    {(new Date(params.value).toLocaleDateString())}
                </div>
            ),
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
                    console.log('data0', data[i]);
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
                    console.log('data0', data[i]);
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
                console.log("########################################")
                setTableData(data)
                // setOpTick(optick)
                setAllTick(data)

                console.log('Data', data)
                console.log('data length', data.length)
                for (let i = 0; i < data.length; i++) {
                    console.log('fro    ', data[i].id);
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
                console.log('data2', d);

                console.log('data 2 total ', d.length);

                const map1 = new Map();
                for (let i = 0; i < d.length; i++) {
                    //  map1.set(d[i].id, d[i].name);
                    map1.set(d[i].id, d[i].name);
                }

                console.log('map ', map1);
                setContacts(map1)
            })
            .catch((error) => {
                console.log('error', error);
            })
    }, [])

    console.log('tabledata', tableData);

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
                    console.log('url length', result.length);
                    console.log('url data', result);
                    const map2 = new Map();
                    var convArr = [];
                    for (let i = 0; i < result.length; i++) {

                        if (result[i].body_text.includes('https://tmsone')) {

                            let value = result[i].body_text.split('https://tmsone')
                            let value1 = value[1].split(" ")
                            let url = 'https://tmsone' + value1[0]
                            console.log(url, "urlllll")             //here I am getting only url
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

                    console.log("convArr   ", convArr);
                    return convArr;

                })
                .then((conv) => {
                    console.log('connn ', conv);
                })
                .catch((error) => {
                    console.log('error in getConversations', error);
                })
        }

    }

    console.log('conversations ', conversations);

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
        //     console.log('err in api call Main ', err);
        // })

        console.log('openTickets');
        var opentickets = []

        for (let i = 0; i < tableData.length; i++) {
            console.log('tab     ', tableData[i]);
            if (tableData[i].status == 'Open') {
                console.log('open', tableData[i].status);
                opentickets.push(tableData[i])
            }
            console.log('opentickets', opentickets)
        }
        // setTableData(optick)


        setTableData(opentickets)
        console.log('opentickets length', opentickets.length)

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
        setTableData(alltick)
    }





    return (
        // <div style={{ borderRadius: '0.5rem', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',height: 700, width: '97%',padding:'10px'}}>
        <div style={{ height: 700, padding: '10px' }} >
            {/* // <div style={{borderRadius: '0.5rem', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)', width: '97%', padding: '1rem'}}> */}
            {/* <h1 style={{'textAlign':'right', width: '97%'}}>{tableData.length > 0 ? <div>Tickets : <b>{tableData.length}</b></div> : 'No Records Found'}</h1> */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '1rem 3rem' }}>
                <img src={pic} alt="DNOW" width="100" height="40" />
            </div>
            <div style={{ 'textAlign': 'right' }}>
                <Button onClick={opentickets}>Open Tickets
                    {/* :<div>{opentickets.length}</div> */}
                </Button>
                <Button onClick={alltickets}>All Tickets</Button>
            </div>
            {/* <h1 style={{'textAlign':'right','fontSize' : 'large'}}>{tableData.length > 0 ? <div>Tickets : <b>{tableData.length}</b></div> : 'No Records Found'}</h1> */}
            {/* <h1><div>All Tickets<button><a href={tableData}></a></button></div></h1> */}

            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid

                        // {...tableData.length > 0 ? tableData.map((el, idx) => {
                        //     console.log('el ', el.id, idx);

                        //     <td>{statusSwitch(el.status)}</td>

                        // }) : null}

                        rows={tableData}
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







