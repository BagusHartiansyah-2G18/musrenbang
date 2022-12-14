// (function(window, document, $, undefined) {
//         "use strict";
//         $(function() {
//                 // if($('#serverstatus01').length){
//                     // var doughnutData = [{
//                     //     value: 70,
//                     //     color: "#FF6B6B"
//                     // },
//                     // {
//                     //     value: 30,
//                     //     color: "#fdfdfd"
//                     // }
//                     // ];
//                     // new Chart(document.getElementById("serverstatus01").getContext("2d")).Doughnut(doughnutData);
//                 // }

//                 if ($('#chartjs_line').length) {
                    // var ctx = document.getElementById('chartjs_line').getContext('2d');

                    // var myChart = new Chart(ctx, {
                    //         type: 'line',

                    //         data: {
                    //             labels: ["PRA MUSREMBANG", "MUSREMBANG KEC", "FORUM OPD", "MUSREMBANG KAB"],
                    //             datasets: [{
                    //                 label: 'Diterima',
                    //                 data: [150,140,120,100],

                    //                 backgroundColor: "rgba(0, 255, 0, 0.5)",
                    //                 borderColor: "rgba(0, 255, 0, 0.5)",
                    //                 borderWidth: 2
                    //             }, {
                    //                 label: 'Ditolak',
                    //                 data: [0,10,20,20],
                    //                 backgroundColor: "red",
                    //                 borderColor: "rgba(255, 0, 0, 0.3)",
                    //                 borderWidth: 2
                    //             }]

                    //         },
                    //         options: {
                    //             legend: {
                    //                 display: true,
                    //                 position: 'bottom',

                    //                 labels: {
                    //                     fontColor: '#71748d',
                    //                     fontFamily: 'Circular Std Book',
                    //                     fontSize: 12,
                    //                 }
                    //             },

                    //             scales: {
                    //                 xAxes: [{
                    //                     ticks: {
                    //                         fontSize: 12,
                    //                         fontFamily: 'Circular Std Book',
                    //                         fontColor: '#71748d',
                    //                     }
                    //                 }],
                    //                 yAxes: [{
                    //                     ticks: {
                    //                         fontSize: 12,
                    //                         fontFamily: 'Circular Std Book',
                    //                         fontColor: '#71748d',
                    //                     }
                    //                 }]
                    //             }
                    //         }
                        


                    // });
//             }


//             if ($('#chartjs_bar').length) {
                // var ctx = document.getElementById("chartjs_bar").getContext('2d');
                // var myChart = new Chart(ctx, {
                //     type: 'bar',
                //     data: {
                //         labels: ["PRA MUSREMBANG", "MUSREMBANG KEC", "FORUM OPD", "MUSREMBANG KAB"],
                //         datasets: [{
                //             label: 'Diterima',
                //             data:[150,140,120,100],
                //            backgroundColor: "green",
                //                     borderColor: "#212121",
                //             borderWidth: 2
                //         }, {
                //             label: 'Ditolak',
                //             data:[0,10,20,20],
                //            backgroundColor: "red",
                //                     borderColor: "#ff6d00",
                //             borderWidth: 2
                //         }]
                //     },
                //     options: {
                //         scales: {
                //             yAxes: [{

                //             }]
                //         },
                //              legend: {
                //         display: true,
                //         position: 'bottom',

                //         labels: {
                //             fontColor: '#71748d',
                //             fontFamily: 'Circular Std Book',
                //             fontSize: 14,
                //         }
                //     },

                //     scales: {
                //         xAxes: [{
                //             ticks: {
                //                 fontSize: 14,
                //                 fontFamily: 'Circular Std Book',
                //                 fontColor: '#71748d',
                //             }
                //         }],
                //         yAxes: [{
                //             ticks: {
                //                 fontSize: 14,
                //                 fontFamily: 'Circular Std Book',
                //                 fontColor: '#71748d',
                //             }
                //         }]
                //     }
                // }

                    
                // });
//             }

//             if ($('#desa').length) {
//                 var ctx = document.getElementById("desa").getContext('2d');
//                 var myChart = new Chart(ctx, {
//                     type: 'bar',
//                     data: {
//                         labels: _namaDesa,
//                         datasets: [{
//                             label: 'Kotak Kosong',
//                             data:_kecamatanKs,
//                            backgroundColor: "rgba(89, 105, 255,0.5)",
//                                     borderColor: "rgba(89, 105, 255,0.7)",
//                             borderWidth: 2
//                         }, {
//                             label: 'F3',
//                             data:_kecamatanF3,
//                            backgroundColor: "rgba(255, 64, 123,0.5)",
//                                     borderColor: "rgba(255, 64, 123,0.7)",
//                             borderWidth: 2
//                         }, {
//                             label: 'Tidak Sah',
//                             data:_kecamatanTs,
//                            backgroundColor: "rgba(65, 64, 123,0.5)",
//                                     borderColor: "rgba(65, 79, 123,0.7)",
//                             borderWidth: 2
//                         }]
//                     },
//                     options: {
//                         scales: {
//                             yAxes: [{

//                             }]
//                         },
//                              legend: {
//                         display: true,
//                         position: 'bottom',

//                         labels: {
//                             fontColor: '#71748d',
//                             fontFamily: 'Circular Std Book',
//                             fontSize: 14,
//                         }
//                     },

//                     scales: {
//                         xAxes: [{
//                             ticks: {
//                                 fontSize: 14,
//                                 fontFamily: 'Circular Std Book',
//                                 fontColor: '#71748d',
//                             }
//                         }],
//                         yAxes: [{
//                             ticks: {
//                                 fontSize: 14,
//                                 fontFamily: 'Circular Std Book',
//                                 fontColor: '#71748d',
//                             }
//                         }]
//                     }
//                 }

                    
//                 });
//             }

//             if ($('#chartjs_radar').length) {
//                 var ctx = document.getElementById("chartjs_radar");
//                 var myChart = new Chart(ctx, {
//                     type: 'radar',
//                     data: {
//                         labels: ["M", "T", "W", "T", "F", "S", "S"],
//                         datasets: [{
//                             label: 'Almonds',
//                            backgroundColor: "rgba(89, 105, 255,0.5)",
//                                     borderColor: "rgba(89, 105, 255,0.7)",
//                             data: [12, 19, 3, 17, 28, 24, 7],
//                             borderWidth: 2
//                         }, {
//                             label: 'Cashew',
//                              backgroundColor: "rgba(255, 64, 123,0.5)",
//                                     borderColor: "rgba(255, 64, 123,0.7)",
//                             data: [30, 29, 5, 5, 20, 3, 10],
//                             borderWidth: 2
//                         }]
//                     },
//                     options: {
                       
//                              legend: {
//                         display: true,
//                         position: 'bottom',

//                         labels: {
//                             fontColor: '#71748d',
//                             fontFamily: 'Circular Std Book',
//                             fontSize: 14,
//                         }
//                     },

                    
//                 }

//                 });
//             }

//             if ($('#chartjs_polar').length) {
//                 var ctx = document.getElementById("chartjs_polar").getContext('2d');
//                 var myChart = new Chart(ctx, {
//                     type: 'polarArea',
//                     data: {
//                         labels: ["kotak Kosong "+_$(_quickCount[0])+" suara ("+_persentase(_totalSuara,_quickCount[0])+"%)", "F3 "+_$(_quickCount[1])+" suara ("+_persentase(_totalSuara,_quickCount[1])+"%)", "Tidak Sah "+_$(_quickCount[2])+" suara ("+_persentase(_totalSuara,_quickCount[2])+"%)"],
//                         datasets: [{
//                             backgroundColor: [
//                                 "#212121",
//                                 "#ff6d00",
//                                 "#25d5f2",
//                             ],
//                             data: _quickCount
//                         }]
//                     },
//                     options: {
                        
//                              legend: {
//                         display: true,
//                         position: 'bottom',

//                         labels: {
//                             fontColor: '#71748d',
//                             fontFamily: 'Circular Std Book',
//                             fontSize: 14,
//                         }
//                     },

                    
//                 }
//                 });
//             }


//             if ($('#chartjs_pie').length) {
//                 var ctx = document.getElementById("chartjs_pie").getContext('2d');
//                 var myChart = new Chart(ctx, {
//                     type: 'pie',
//                     data: {
//                         labels:_namaKeterangan,
//                         datasets: [{
//                             backgroundColor: [
//                                "#5969ff",
//                                 "#ff407b"
//                             ],
//                             data: [_totalMasuk, _totalSisa]
//                         }]
//                     },
//                     options: {
//                            legend: {
//                         display: true,
//                         position: 'bottom',

//                         labels: {
//                             fontColor: '#71748d',
//                             fontFamily: 'Circular Std Book',
//                             fontSize: 14,
//                         }
//                     },

                    
//                 }
//                 });
//             }


//             if ($('#chartjs_doughnut').length) {
//                 var ctx = document.getElementById("chartjs_doughnut").getContext('2d');
//                 var myChart = new Chart(ctx, {
//                     type: 'doughnut',
//                     data: {
//                         labels: ["Kotak Kosong / "+_realCount[0]+" Suara ( "+_persentase(_total,_realCount[0])+"%) ", "F3 / "+_realCount[1]+" Suara ("+_persentase(_total,_realCount[1])+"%)", "Tidak SAH / "+_realCount[2]+" Suara ("+_persentase(_total,_realCount[2])+"%)"],
//                         datasets: [{
//                             backgroundColor: [
//                                 "#212121",
//                                 "#ff6d00",
//                                 "#25d5f2"
//                             ],
//                             data:_realCount,
                            
//                         }]
//                     },
//                     options: {
//                         legend: {
//                             display: true,
//                             position: 'bottom',
//                                 labels: {
//                                     fontColor: '#71748d',
//                                     fontFamily: 'Circular Std Book',
//                                     fontSize: 14,
//                                     text:"saass"
//                                 }
//                         }
//                 }

//                 });
//                 // this.myChart.ctx.fillText("text", "textX", "textY");
//             }


//         });

// })(window, document, window.jQuery);

// function _persentase(total,totalMasuk){
//     return parseFloat((Number(totalMasuk)/Number(total))*100).toFixed(2);
// }

function cdoughnut (v) {
    new Chart(document.getElementById(v.id).getContext("2d")).Doughnut(v.data);
}
function mline(v) {
    var tax_data = [
        {"period": "2011 Q3", "licensed": 3407, "sorned": 660},
        {"period": "2011 Q2", "licensed": 3351, "sorned": 629},
        {"period": "2011 Q1", "licensed": 3269, "sorned": 618},
        {"period": "2010 Q4", "licensed": 3246, "sorned": 661},
        {"period": "2009 Q4", "licensed": 3171, "sorned": 676},
        {"period": "2008 Q4", "licensed": 3155, "sorned": 681},
        {"period": "2007 Q4", "licensed": 3226, "sorned": 620},
        {"period": "2006 Q4", "licensed": 3245, "sorned": null},
        {"period": "2005 Q4", "licensed": 3289, "sorned": null}];
    Morris.Line({
        element: 'hero-graph',
        data: tax_data,
        xkey: 'period',
        ykeys: ['licensed', 'sorned'],
        labels: ['Licensed', 'Off the road'],
        lineColors:['#4ECDC4','#ed5565']
    });
}
function marea(v) {
    Morris.Area({
        element: 'hero-area',
        data: [
        {period: '2010 Q1', iphone: 2666, ipad: null, itouch: 2647},
        {period: '2010 Q2', iphone: 2778, ipad: 2294, itouch: 2441},
        {period: '2010 Q3', iphone: 4912, ipad: 1969, itouch: 2501},
        {period: '2010 Q4', iphone: 3767, ipad: 3597, itouch: 5689},
        {period: '2011 Q1', iphone: 6810, ipad: 1914, itouch: 2293},
        {period: '2011 Q2', iphone: 5670, ipad: 4293, itouch: 1881},
        {period: '2011 Q3', iphone: 4820, ipad: 3795, itouch: 1588},
        {period: '2011 Q4', iphone: 15073, ipad: 5967, itouch: 5175},
        {period: '2012 Q1', iphone: 10687, ipad: 4460, itouch: 2028},
        {period: '2012 Q2', iphone: 8432, ipad: 5713, itouch: 1791}
        ],

        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        hideHover: 'auto',
        lineWidth: 1,
        pointSize: 5,
        lineColors: ['#4a8bc2', '#ff6c60', '#a9d86e'],
        fillOpacity: 0.5,
        smooth: true
    });
}
function mdonut(v) {
    return Morris.Donut({
        element: 'hero-donut',
        data: [
        {label: 'Jam', value: 25 },
        {label: 'Frosted', value: 40 },
        {label: 'Custard', value: 25 },
        {label: 'Sugar', value: 10 }
        ],
        colors: ['#3498db', '#2980b9', '#34495e'],
        formatter: function (y) { return y + "%" }
    });
}
function chart(v) {
    // cbar({
        // id:'chartjs_bar',
        // type:'bar'
    //     fz:14,
    //     fc:'#71748d',
    //     label:["PRA MUSREMBANG", "MUSREMBANG KEC", "FORUM OPD", "MUSREMBANG KAB"],
    //     data :[
    //             {
    //                 label: 'Diterima',
    //                 data:[150,140,120,100],
    //                 backgroundColor: "green",
    //                         borderColor: "#212121",
    //                 borderWidth: 2
    //             }, {
    //                 label: 'Ditolak',
    //                 data:[0,10,20,20],
    //                 backgroundColor: "red",
    //                         borderColor: "#ff6d00",
    //                 borderWidth: 2
    //             }
    //         ]
    // })
    var ctx = document.getElementById(v.id).getContext('2d');
    new Chart(ctx, {
        type: v.type,//'bar'
        data: {
            labels: v.label,
            datasets: v.data
        },
        options: {
            scales: {
                yAxes: [{
                }]
            },
            legend: {
                display: true,
                position: 'bottom',

                labels: {
                    fontColor:v.fc,
                    fontFamily: 'Circular Std Book',
                    fontSize: v.fz,
                }
            },

            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: v.fz,
                        fontFamily: 'Circular Std Book',
                        fontColor: v.fc,
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontSize: v.fz,
                        fontFamily: 'Circular Std Book',
                        fontColor:v.fc,
                    }
                }]
            }
        }
    });
}