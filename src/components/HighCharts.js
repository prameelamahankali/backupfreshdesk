import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

import { Box, Button, Grid, Item, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GridPanelHeader } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";


const HighCharts = () => {
    const [tableData, setTableData] = useState([])
    const [graph, setGraph] = useState(new Map())
    // const [highgraph, setHighGraph] = useState([])

    const [days, setDays] = useState([])
    const [tickets, setTickets] = useState([])
    const [optick, setOpTick] = useState([])
    const [todayop, setTodayOp] = useState(0)
    const [opticklastweek, setOpTickLastWeek] = useState(0)
    const [restime, setResTime] = useState(0)
    const [resoltime, setresoltime] = useState(0)
    const [high, sethigh] = useState([])


    // const options = {
    //     chart: {
    //         type: 'spline'
    //     },
    //     title: {
    //         text: 'Duration to close a ticket'
    //     },
    //     xAxis: {
    //         categories: Array.from(graph.keys()),
    //         name: 'Tickets',
    //         // type: "category",
    //         // labels: {
    //         //     "format": "{value}"
    //         // }
    //     },
    //     yAxis: {
    //         title: false
    //     },
    //     series: [
    //         {
    //             data: Array.from(graph.values()),
    //             name: 'Days'
    //         }
    //     ]
    // };

    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Duration to close a ticket'
        },
        xAxis: {
            categories:  Array.from(graph.keys()),
            name: 'Tickets'
        },
        yAxis: {
            title: false
        },
        series: [
            {
                data: days,
                name: 'Days'
            }
        ]
    };



    // const highprio = {
    //     chart: {
    //         type: 'spline'
    //     },
    //     title: {
    //         text: 'High priority (Last week)'
    //     },
    //     xAxis: {
    //         categories: tickets,
    //         // name: 'Tickets',
    //         // type: "category",
    //         // labels: {
    //         //     "format": "{value}"
    //         // }
    //     },
    //     yAxis: {
    //         title: false
    //     },
    //     series: [
    //         {
    //             data: high,
    //             name: 'high and urgent'
    //         }
    //     ]
    // };



    useEffect(() => {
        const options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        };


        fetch('https://tmsone.freshdesk.com/api/v2/tickets?include=stats', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((data) => data.json())
            .then((data) => {

                const map1 = new Map();
                var day = []
                var tick = []

                // var z = DayDiff("2022-03-24T11:58:57Z", "2022-03-24T13:12:17Z");

                // console.log('zzzzzzz ', z);

                for (let i = 0; i < data.length; i++) {
                    // console.log('id', data[i].id); c


                    data[i]['diff'] = DayDiff(data[i]['created_at'], data[i]['stats']['closed_at'])

                    tick.push(data[i].id)
                    day.push(DayDiff(data[i]['created_at'], data[i]['stats']['closed_at']))
                    map1.set(data[i].id, data[i].diff);
                    console.log('difference', data[i].diff) 


                }
                console.log('map1', map1.keys()) 
                setDays(day)
                setTickets(tick)
                setGraph(map1)

                var opentickets = []
                var todayopentickets = []
                var openticketslastweek = []
                var responsetime = []
                var resolutiontime = []
                var high = []
                var highprioritylastweek = []

                for (let i = 0; i < data.length; i++) {
                    // console.log('tab     ', data[i]); c
                    if (data[i].status == 2) {
                        // console.log('status', data[i].status); c
                        opentickets.push(data[i])
                        // console.log('cretaed', data[i]['created_at'], new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }), new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }))
                        if (new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }) == new Date().toLocaleDateString('en-US', { timeZone: 'UTC' })) {
                            // console.log('cretaed', data[i]['created_at']) c
                            todayopentickets.push(data[i])
                            // if ((new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' })<new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-US', { timeZone: 'UTC' })){
                            //     console.log('cretaed', data[i]['created_at'])

                            // }
                        }


                        var created = new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var weekAgoDate = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var today = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
                        // console.log('datesss ', created, weekAgoDate, today); c
                        if (created < today && created > weekAgoDate) {
                            // console.log('dates open', created); c
                            openticketslastweek.push(data[i])
                        }
                    }
                    var created_at = (new Date(data[i]['created_at']).getHours());
                    var created_at = (new Date(data[i]['created_at']).toLocaleTimeString());
                    var first_responded_at = (new Date(data[i]['stats']['first_responded_at']).toLocaleTimeString());
                    // var first_responded_at = (new Date(data[i]['stats']['first_responded_at']).getHours());
                    var closed_at = (new Date(data[i]['stats']['closed_at']).toLocaleTimeString());
                    // var closed_at = (new Date(data[i]['stats']['closed_at']).getHours());
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
                        responsetime.push(hours)

                        // console.log('hourssss ', milliseconds, hours); c


                    }
                    else {
                        responsetime.push(0)

                    }

                    const dOne = data[i]['created_at'];
                    const dTwo = data[i]['stats']['closed_at'];
                    // console.log('done',dOne,dTwo)


                    if (dOne != null && dTwo != null) {

                        const dOneObj = new Date(dOne);
                        const dTwoObj = new Date(dTwo);
                        // console.log('done', dOne, dTwo, dOneObj, dTwoObj) c
                        const milliseconds = Math.abs(dTwoObj - dOneObj);
                        const hours = Math.round(milliseconds / 36e5);
                        const minu = Math.round(milliseconds / 60000);

                        resolutiontime.push(hours)

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
                    if (data[i].priority == 3 || data[i].priority == 4) {
                        // console.log('status', data[i].priority); c
                        high.push(data[i])
                        // console.log('cretaed', data[i]['created_at'], new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' }), new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }))
                        var created = new Date(data[i]['created_at']).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var eightweekAgoDate = new Date(new Date().setDate(new Date().getDate() - 56)).toLocaleDateString('en-US', { timeZone: 'UTC' });
                        var today = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
                        // console.log('eight week ago')
                        // console.log('datesss ', created, eightweekAgoDate, today);
                        if (created < today && created > eightweekAgoDate) {
                            console.log('----high created', created);
                            highprioritylastweek.push(data[i])
                        }

                    }
                    // console.log('highprioritylastweek', highprioritylastweek.length) c









                    // var date1 = new Date(data[i]['created_at']).getTime() / 1000;

                    // var date2 = new Date(data[i]['stats']['first_responded_at']).getTime() / 1000;

                    // var difference = (date2 - date1) / 60 / 60;


                    // var res = difference / 30
                    // console.log(res, 'difference');


                    // console.log('first_responded_at', first_responded_at); c
                    // console.log('created_at', created_at); c
                    // console.log('closed_at', closed_at); c



                    // console.log('openticketslastweek', openticketslastweek) c
                    setOpTickLastWeek(openticketslastweek.length)
                    // console.log('todaytopentickets', todayopentickets) c
                    setTodayOp(todayopentickets.length)

                    // console.log('opentickets', opentickets, opentickets.length) c
                    // console.log('responsetime', responsetime) c
                    // console.log('resolutiontime', resolutiontime) c
                }
                setOpTick(opentickets)
                const average = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                var avg = average(responsetime)
                // console.log('Average response', avg) c
                setResTime(avg)

                const resolvetime = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                var resolve = resolvetime(resolutiontime)
                // console.log('Average resolutiontime', resolve) c
                setresoltime(resolve)
                sethigh(highprioritylastweek.length)












                // var date = new Date();
                // date.setDate(date.getDate() - 7);

                // console.log(date);

                // var currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'UTC' });
                // console.log("The current Date=" + currentDate);
                // var before7Daysdate = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString('en-US', { timeZone: 'UTC' });
                // console.log("The One week ago date=" + before7Daysdate);




                setTableData(data)

                console.log('HighCharts', data)

                // console.log('daysdiff', tickets, days) c
            })

        fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="created_at:>%272021-02-25%27%20AND%20created_at:<%272022-04-21%27"', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((priority) => priority.json())
            .then((priority) => {
                // console.log('priority', priority) c
            })






    }, [])

    function DayDiff(created_at, closed_at) {
        var diff = Date.parse(closed_at) - Date.parse(created_at);
        var d = isNaN(diff) ? NaN :
            // diff : diff,
            // ms : Math.floor( diff            % 1000 ),
            // s  : Math.floor( diff /     1000 %   60 ),
            // m  : Math.floor( diff /    60000 %   60 ),
            // h  : Math.floor( diff /  3600000 %   24 ),
            Math.floor(diff / 86400000)
        // console.log('diff', d)
        return d
    }




    // const options = {
    //     chart: {
    //         type: 'spline'
    //     },
    //     title: {
    //         text: 'My chart'
    //     },
    //     series: [
    //         {
    //             data: [1, 2, 1, 4, 3, 6]
    //         }
    //     ]
    // };

    // export default function ReChart() {
    //     return (
    //         <>

    //             <div>
    //                 <HighchartsReact highcharts={Highcharts} options={options} />
    //             </div>


    //         </>
    //     );
    // }






    //??????????????????????????????????????????????????????????????????????????????????????????????????????


    // import React from 'react';
    // import { render } from 'react-dom';
    // import Highcharts from 'highcharts/highstock';
    // import HighchartsReact from 'highcharts-react-official';


    // const options = {
    //     title: {
    //         text: 'My stock chart'
    //     },
    //     series: [
    //         {
    //             data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9]
    //         }
    //     ]
    // };

    // export default function ReChart() {
    //     return (
    //         <>

    //             <div>
    //                 <HighchartsReact
    //                     highcharts={Highcharts}
    //                     constructorType={'stockChart'}
    //                     options={options}
    //                 />
    //             </div>


    //         </>
    //     );
    // }



    // --------------------

    // const options = {
    //     title: {
    //         text: 'High chart'
    //     },
    //     series: [{
    //         data: [1, 2, 3]
    //     }]
    // }



    // export default function ReChart() {
    //     return (
    //         <>

    //             <div>
    //                 <HighchartsReact
    //                     highcharts={Highcharts}
    //                     options={options}
    //                 />
    //             </div>


    //         </>
    //     );
    // }


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <><Button style={{ display: 'flex' }} onClick={routeChange}>Back</Button>
            <div style={{ margin: '2rem' }}>

                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>
                    </Grid>
                    <Grid item xs={8} md={6}>
                        <div>
                            {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {todayop}

                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Open Tickets (Today)
                                    </Typography>
                                </CardContent>

                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {opticklastweek}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Open Tickets (Last Week)
                                    </Typography>

                                </CardContent>

                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {restime.toFixed(2)} <AccessTimeIcon></AccessTimeIcon>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Average Response Time (Hour)
                                    </Typography>
                                </CardContent>

                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {resoltime.toFixed(2)} <AccessTimeIcon></AccessTimeIcon>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Average Resolution Time (Hour)
                                    </Typography>
                                </CardContent>

                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div >
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                       {high} 
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        High and Urgent Tickets (4 Weeks)
                                    </Typography>
                                </CardContent>

                            </Card>
                        </div>
                    </Grid>

                    <Grid xs={12} md={12}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* <HighchartsReact highcharts={Highcharts} options={highprio} /> */}
                        </div>
                    </Grid>
                </Grid>
            </div>



        </>
    )

}

export default HighCharts