/*------------------------------------------------------------------
* Bootstrap Responsive Web Application Template
* Email: heyalexluna@gmail.com
* Version: 1.1
* Last change: 2020-03-02
* Author: Alexis Luna
* Copyright 2019 Alexis Luna
* Website: https://github.com/mralexisluna/bootstrap-responsive-web-application-template
-------------------------------------------------------------------*/
// Nvd3 JavaScripts

(function ($) {
	'use strict';

	var primary = '#7774e7',
		success = '#37c936',
		info = '#0f9aee',
		warning = '#ffcc00',
		danger = '#ff3c7e',
		primaryInverse = 'rgba(119, 116, 231, 0.1)',
		successInverse = 'rgba(55, 201, 54, 0.1)',
		infoInverse = 'rgba(15, 154, 238, 0.1)',
		warningInverse = 'rgba(255, 204, 0, 0.1)',
		dangerInverse = 'rgba(255, 60, 126, 0.1)',
		gray = '#f6f7fb',
		white = '#fff',
		dark = '#515365'

	//Simple Line Chart
	nv.addGraph(function() {
	    var chart = nv.models.lineChart()
	        .showLegend(true)       
	        .showYAxis(true)        
	        .showXAxis(true);

	    chart.xAxis    
	        .axisLabel('Time (ms)')
	        .tickFormat(d3.format(',r'));

	    chart.yAxis    
	        .axisLabel('Voltage (v)')
	        .tickFormat(d3.format('.02f'));

	    var myData = simpleLineChartData();   

	    d3.select('#line-chart svg')      
	        .datum(myData)        
	        .call(chart);     

	    nv.utils.windowResize(function() { chart.update() });
	    return chart;
	});
	
	//Simple Line Chart Data Generator
	function simpleLineChartData() {
	    var sin = [],sin2 = [],cos = [];

	    for (var i = 0; i < 100; i++) {
		    sin.push({x: i, y: Math.sin(i/10)});
		    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
		    cos.push({x: i, y: .5 * Math.cos(i/10)});
	    }

	    return [
	        {
		        values: sin,     
		        key: 'Sine Wave', 
		        color: success 
	        },
	        {
		        values: cos,
		        key: 'Cosine Wave',
		        color: danger
	        },
	        {
		        values: sin2,
		        key: 'Another sine wave',
		        color: info,
		        area: true     
	        }
	    ];
	}

	//Discrete Bar Chart
	nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .color([danger, success])
            .staggerLabels(true)
            .showValues(true)
            .duration(250);
       	    d3.select('#discrete-bar-chart svg')
            .datum(historicalBarChart)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

	//Discrete Bar Chart Data
    var historicalBarChart = [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label" : "A" ,
                    "value" : 29
                } ,
                {
                    "label" : "B" ,
                    "value" : 12
                } ,
                {
                    "label" : "C" ,
                    "value" : 32
                } ,
                {
                    "label" : "D" ,
                    "value" : 196
                } ,
                {
                    "label" : "E" ,
                    "value" : 35
                } ,
                {
                    "label" : "F" ,
                    "value" : 98
                } ,
                {
                    "label" : "G" ,
                    "value" : 13
                } ,
                {
                    "label" : "H" ,
                    "value" : 5.1387322875705
                }
            ]
        }
    ];
    
    // Stacked Area Chart
    nv.addGraph(function() {
        var chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .color([success, warning, primary])
            .controlLabels({stacked: "Stacked"})
            .duration(300);
	        chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
	        chart.yAxis.tickFormat(d3.format(',.4f'));
        	d3.select('#stacked-area-chart svg')
            .datum(histcatexplong)
            .transition().duration(1000)
            .call(chart)
            .each('start', function() {
                setTimeout(function() {
                    d3.selectAll('#stacked-area-chart svg *').each(function() {
                        if(this.__transition__)
                            this.__transition__.duration = 1;
                    })
                }, 0)
            });
        nv.utils.windowResize(chart.update);
        return chart;
    });

    // Stacked Area Chart Data
    var histcatexplong = [
        {
            "key" : "Health Care" ,
            "values" : [ [ 1138683600000 , 14.212410956029] , [ 1141102800000 , 13.973193618249] , [ 1143781200000 , 15.218233920665] , [ 1146369600000 , 14.38210972745] , [ 1149048000000 , 13.894310878491] , [ 1151640000000 , 15.593086090032] , [ 1154318400000 , 16.244839695188] , [ 1156996800000 , 16.017088850646] , [ 1159588800000 , 14.183951830055] , [ 1162270800000 , 14.148523245697] , [ 1164862800000 , 13.424326059972] , [ 1167541200000 , 12.974450435753] , [ 1170219600000 , 13.23247041802] , [ 1172638800000 , 13.318762655574] , [ 1175313600000 , 15.961407746104] , [ 1177905600000 , 16.287714639805] , [ 1180584000000 , 16.246590583889] , [ 1183176000000 , 17.564505594809] , [ 1185854400000 , 17.872725373165] , [ 1188532800000 , 18.018998508757] , [ 1191124800000 , 15.584518016603] , [ 1193803200000 , 15.480850647181] , [ 1196398800000 , 15.699120036984] , [ 1199077200000 , 19.184281817226] , [ 1201755600000 , 19.691226605207] , [ 1204261200000 , 18.982314051295] , [ 1206936000000 , 18.707820309008] , [ 1209528000000 , 17.459630929761] , [ 1212206400000 , 16.500616076782] , [ 1214798400000 , 18.086324003979] , [ 1217476800000 , 18.929464156258] , [ 1220155200000 , 18.233728682084] , [ 1222747200000 , 16.315776297325] , [ 1225425600000 , 14.63289219025] , [ 1228021200000 , 14.667835024478] , [ 1230699600000 , 13.946993947308] , [ 1233378000000 , 14.394304684397] , [ 1235797200000 , 13.724462792967] , [ 1238472000000 , 10.930879035806] , [ 1241064000000 , 9.8339915513708] , [ 1243742400000 , 10.053858541872] , [ 1246334400000 , 11.786998438287] , [ 1249012800000 , 11.780994901769] , [ 1251691200000 , 11.305889670276] , [ 1254283200000 , 10.918452290083] , [ 1256961600000 , 9.6811395055706] , [ 1259557200000 , 10.971529744038] , [ 1262235600000 , 13.330210480209] , [ 1264914000000 , 14.592637568961] , [ 1267333200000 , 14.605329141157] , [ 1270008000000 , 13.936853794037] , [ 1272600000000 , 12.189480759072] , [ 1275278400000 , 11.676151385046] , [ 1277870400000 , 13.058852800017] , [ 1280548800000 , 13.62891543203] , [ 1283227200000 , 13.811107569918] , [ 1285819200000 , 13.786494560787] , [ 1288497600000 , 14.04516285753] , [ 1291093200000 , 13.697412447288] , [ 1293771600000 , 13.677681376221] , [ 1296450000000 , 19.961511864531] , [ 1298869200000 , 21.049198298158] , [ 1301544000000 , 22.687631094008] , [ 1304136000000 , 25.469010617433] , [ 1306814400000 , 24.883799437121] , [ 1309406400000 , 24.203843814248] , [ 1312084800000 , 22.138760964038] , [ 1314763200000 , 16.034636966228] , [ 1317355200000 , 15.394958944556] , [ 1320033600000 , 12.625642461969] , [ 1322629200000 , 12.973735699739] , [ 1325307600000 , 15.786018336149] , [ 1327986000000 , 15.227368020134] , [ 1330491600000 , 15.899752650734] , [ 1333166400000 , 18.994731295388] , [ 1335758400000 , 18.450055817702] , [ 1338436800000 , 17.863719889669]]
        } ,
        {
            "key" : "Industrials" ,
            "values" : [ [ 1138683600000 , 7.1590087090398] , [ 1141102800000 , 7.1297210970108] , [ 1143781200000 , 5.5774588290586] , [ 1146369600000 , 5.4977254491156] , [ 1149048000000 , 5.5138153113634] , [ 1151640000000 , 4.3198084032122] , [ 1154318400000 , 3.9179295839125] , [ 1156996800000 , 3.8110093051479] , [ 1159588800000 , 5.5629020916939] , [ 1162270800000 , 5.7241673711336] , [ 1164862800000 , 5.4715049695004] , [ 1167541200000 , 4.9193763571618] , [ 1170219600000 , 5.136053947247] , [ 1172638800000 , 5.1327258759766] , [ 1175313600000 , 5.1888943925082] , [ 1177905600000 , 5.5191481293345] , [ 1180584000000 , 5.6093625614921] , [ 1183176000000 , 4.2706312987397] , [ 1185854400000 , 4.4453235132117] , [ 1188532800000 , 4.6228003109761] , [ 1191124800000 , 5.0645764756954] , [ 1193803200000 , 5.0723447230959] , [ 1196398800000 , 5.1457765818846] , [ 1199077200000 , 5.4067851597282] , [ 1201755600000 , 5.472241916816] , [ 1204261200000 , 5.3742740389688] , [ 1206936000000 , 6.251751933664] , [ 1209528000000 , 6.1406852153472] , [ 1212206400000 , 5.8164385627465] , [ 1214798400000 , 5.4255846656171] , [ 1217476800000 , 5.3738499417204] , [ 1220155200000 , 5.1815627753979] , [ 1222747200000 , 5.0305983235349] , [ 1225425600000 , 4.6823058607165] , [ 1228021200000 , 4.5941481589093] , [ 1230699600000 , 5.4669598474575] , [ 1233378000000 , 5.1249037357] , [ 1235797200000 , 4.3504421250742] , [ 1238472000000 , 4.6260881026002] , [ 1241064000000 , 5.0140402458946] , [ 1243742400000 , 4.7458462454774] , [ 1246334400000 , 6.0437019654564] , [ 1249012800000 , 6.4595216249754] , [ 1251691200000 , 6.6420468254155] , [ 1254283200000 , 5.8927271960913] , [ 1256961600000 , 5.4712108838003] , [ 1259557200000 , 6.1220254207747] , [ 1262235600000 , 5.5385935169255] , [ 1264914000000 , 5.7383377612639] , [ 1267333200000 , 6.1715976730415] , [ 1270008000000 , 4.0102262681174] , [ 1272600000000 , 3.769389679692] , [ 1275278400000 , 3.5301571031152] , [ 1277870400000 , 2.7660252652526] , [ 1280548800000 , 3.1409983385775] , [ 1283227200000 , 3.0528024863055] , [ 1285819200000 , 4.3126123157971] , [ 1288497600000 , 4.594654041683] , [ 1291093200000 , 4.5424126126793] , [ 1293771600000 , 4.7790043987302] , [ 1296450000000 , 7.4969154058289] , [ 1298869200000 , 7.9424751557821] , [ 1301544000000 , 7.1560736250547] , [ 1304136000000 , 7.9478117337855] , [ 1306814400000 , 7.4109214848895] , [ 1309406400000 , 7.5966457641101] , [ 1312084800000 , 7.165754444071] , [ 1314763200000 , 5.4816702524302] , [ 1317355200000 , 4.9893656089584] , [ 1320033600000 , 4.498385105327] , [ 1322629200000 , 4.6776090358151] , [ 1325307600000 , 8.1350814368063] , [ 1327986000000 , 8.0732769990652] , [ 1330491600000 , 8.5602340387277] , [ 1333166400000 , 5.1293714074325] , [ 1335758400000 , 5.2586794619016] , [ 1338436800000 , 5.1100853569977]]
        } ,
        {
            "key" : "Information Technology" ,
            "values" : [ [ 1138683600000 , 13.242301508051] , [ 1141102800000 , 12.863536342042] , [ 1143781200000 , 21.034044171629] , [ 1146369600000 , 21.419084618803] , [ 1149048000000 , 21.142678863691] , [ 1151640000000 , 26.568489677529] , [ 1154318400000 , 24.839144939905] , [ 1156996800000 , 25.456187462167] , [ 1159588800000 , 26.350164502826] , [ 1162270800000 , 26.47833320519] , [ 1164862800000 , 26.425979547847] , [ 1167541200000 , 28.191461582256] , [ 1170219600000 , 28.930307448808] , [ 1172638800000 , 29.521413891117] , [ 1175313600000 , 28.188285966466] , [ 1177905600000 , 27.704619625832] , [ 1180584000000 , 27.490862424829] , [ 1183176000000 , 28.770679721286] , [ 1185854400000 , 29.060480671449] , [ 1188532800000 , 28.240998844973] , [ 1191124800000 , 33.004893194127] , [ 1193803200000 , 34.075180359928] , [ 1196398800000 , 32.548560664833] , [ 1199077200000 , 30.629727432728] , [ 1201755600000 , 28.642858788159] , [ 1204261200000 , 27.973575227842] , [ 1206936000000 , 27.393351882726] , [ 1209528000000 , 28.476095288523] , [ 1212206400000 , 29.29667866426] , [ 1214798400000 , 29.222333802896] , [ 1217476800000 , 28.092966093843] , [ 1220155200000 , 28.107159262922] , [ 1222747200000 , 25.482974832098] , [ 1225425600000 , 21.208115993834] , [ 1228021200000 , 20.295043095268] , [ 1230699600000 , 15.925754618401] , [ 1233378000000 , 17.162864628346] , [ 1235797200000 , 17.084345773174] , [ 1238472000000 , 22.246007102281] , [ 1241064000000 , 24.530543998509] , [ 1243742400000 , 25.084184918242] , [ 1246334400000 , 16.606166527358] , [ 1249012800000 , 17.239620011628] , [ 1251691200000 , 17.336739127379] , [ 1254283200000 , 25.478492475753] , [ 1256961600000 , 23.017152085245] , [ 1259557200000 , 25.617745423683] , [ 1262235600000 , 24.061133998642] , [ 1264914000000 , 23.223933318644] , [ 1267333200000 , 24.425887263937] , [ 1270008000000 , 35.501471156693] , [ 1272600000000 , 33.775013878676] , [ 1275278400000 , 30.417993630285] , [ 1277870400000 , 30.023598978467] , [ 1280548800000 , 33.327519522436] , [ 1283227200000 , 31.963388450371] , [ 1285819200000 , 30.498967232092] , [ 1288497600000 , 32.403696817912] , [ 1291093200000 , 31.47736071922] , [ 1293771600000 , 31.53259666241] , [ 1296450000000 , 41.760282761548] , [ 1298869200000 , 45.605771243237] , [ 1301544000000 , 39.986557966215] , [ 1304136000000 , 43.846330510051] , [ 1306814400000 , 39.857316881857] , [ 1309406400000 , 37.675127768208] , [ 1312084800000 , 35.775077970313] , [ 1314763200000 , 48.631009702577] , [ 1317355200000 , 42.830831754505] , [ 1320033600000 , 35.611502589362] , [ 1322629200000 , 35.320136981738] , [ 1325307600000 , 31.564136901516] , [ 1327986000000 , 32.074407502433] , [ 1330491600000 , 35.053013769976] , [ 1333166400000 , 26.434568573937] , [ 1335758400000 , 25.305617871002] , [ 1338436800000 , 24.520919418236]]
        } 
    ];


    var pieAndDonutdata = [
        {key: "FireFox", y: 5},
        {key: "IE", y: 2},
        {key: "Chrome", y: 9}
    ];

    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
            .color([info, danger, success])
            .showTooltipPercent(true);
             d3.select("#pie-chart svg")
            .datum(pieAndDonutdata)
            .transition().duration(1200)
            .call(chart);
        return chart;
    });

    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
            .color([warning, success, primary])
            .donut(true)
            .titleOffset(-30)
        	d3.select("#donut-chart svg")
            .datum(pieAndDonutdata)
            .transition().duration(1200)
            .call(chart);
        return chart;
    });

})(jQuery);