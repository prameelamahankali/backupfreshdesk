import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import pic from "../leftarrow.png";

import { Box, Button, Grid, Item, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GridPanelHeader } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { fontSize } from '@mui/system';


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
    const [high, sethigh] = useState(0)


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
            categories: Array.from(graph.keys()),
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



    const highprio = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'High Priority Tickets (Per Week)'
        },
        xAxis: {
            categories: [1,2,3,4,5,6,7,8],
            // categories:high.length
            // name: 'Tickets',
            // type: "category",
            // labels: {
            //     "format": "{value}"
            // }
        },
        yAxis: {
            title: false
        },
        series: [
            {
                data: high,
                name: 'High and Urgent'
            }
        ]
    };



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
                // console.log('dataaaa',data) c
                // var z = DayDiff("2022-03-24T11:58:57Z", "2022-03-24T13:12:17Z");

                // console.log('zzzzzzz ', z);

                for (let i = 0; i < data.length; i++) {
                    // console.log('id', data[i].id); c


                    data[i]['diff'] = DayDiff(data[i]['created_at'], data[i]['stats']['resolved_at'])

                    tick.push(data[i].id)
                    day.push(DayDiff(data[i]['created_at'], data[i]['stats']['resolved_at']))
                    map1.set(data[i].id, data[i].diff);
                    // console.log('difference', data[i].diff) c


                }
                // console.log('map1', map1.keys())  c
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
                        responsetime.push(hours)

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

                // console.log('HighCharts', data) c

                // console.log('daysdiff', tickets, days) c
            })

        fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="created_at:>%272021-02-25%27%20AND%20created_at:<%272022-04-21%27"', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X',
                'Access-Control-Expose-Headers': '*'
            })
        })
            .then((response) => {
                // console.log('priority', response.headers )

                return response.json()
            })
            .then((priority) => {
                // console.log('priooo',priority)
            })






    }, [])

    function DayDiff(created_at, resolved_at) {
        var diff = Date.parse(resolved_at) - Date.parse(created_at);
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

    useEffect(() => {
        fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="priority:1%20AND%20created_at:>%272022-01-01%27"', {
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

                var high = []
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
                        high.push(data.results[i])
                        if (created >= eightweekAgoDate && created <= sevenweekAgoDate) {
                            // console.log('----high created', data.results[i]);
                            eightweek.push(data.results[i])
                            
                            // perweek.push(eightweek.length)

                            // console.log('888'); c
                            // console.log(created,eightweekAgoDate,sevenweekAgoDate,data.results[i].id); c

                        }

                        else if (created >= sevenweekAgoDate && created <= sixthweekAgoDate) {
                            seventhweek.push(data.results[i])
                            
                            // console.log('777'); c
                            // console.log(created,sevenweekAgoDate,sixthweekAgoDate,data.results[i].id); c

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
                        else if(created >= firstweekAgoDate && created <= today) {
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
            
            
            


            



}, [])


return (
    <><Button style={{ display: 'flex',fontSize:'xx-large'}} onClick={routeChange}>{<img src={pic} alt="BACK" width="45" height="45" />}</Button>
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
                {/* <Grid item xs={12} md={6}>
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
                </Grid> */}
                

                <Grid xs={12} md={12}>
                    <div style={{ display: 'flex', justifyContent: 'center' ,padding: '20px'}}>
                        <HighchartsReact highcharts={Highcharts} options={highprio} />
                    </div>
                </Grid>
            </Grid>
        </div>



    </>
)

}

export default HighCharts