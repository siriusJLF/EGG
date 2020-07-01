var qudaomb = function() {
	var chart1 = document.getElementById("mb-chart1");
	var chart1Chart = echarts.init(chart1);
	var option = {
		tooltip: {},
		grid:{
			top:'10px',
			left:'10px',
			bottom:'10px',
			right:'10px',
		},
		radar: {
			center: ['50%', '55%'],
			shape:'circle',
			nameGap:10,
			indicator: [{
				name: '宽带到达',
				max: 6500,
				color: 'white'
			}, {
				name: '年累计收入',
				max: 16000,
				color: 'white'
			}, {
				name: '4G用户到达',
				max: 30000,
				color: 'white'
			}, {
				name: '新增用户份额',
				max: 38000,
				color: 'white'
			}, {
				name: '通信用户份额',
				max: 52000,
				color: 'white'
			}, ],
			splitNumber: 4,
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(2,189,209,0.1)', 'rgba(2,189,209,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: '#01d0e3'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#01d0e3'
				}
			}
		},
		series: [{
			name: '考核指标',
			type: 'radar',
			symbol: 'arrow',
			itemStyle: {
				normal: {
					areaStyle: {
						color: 'rgba(206,90,14,1)'
					},
					//					label:{
					//                    		show:true,
					//                    		position:'outside'
					//                   }
				}
			},
			data: [{
				
				value: [3500, 10000, 28000, 20000, 42000]
			}]
		}]
	};
	chart1Chart.setOption(option);
	
	//宽带办理-条形图
	var chart2 = document.getElementById("mb-chart2")
	var chart2Chart = echarts.init(chart2);
	var datalin =[820, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80];
		var sum =0;
		for (var i=0;i<datalin.length;i++) {
			sum+=datalin[i];
		}
		//平均值
	var avr = sum/datalin.length; 
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
			data: ['放号', '增值业务', '基础业务', '缴费', '激励考核', '电子渠道', '终端']
		},
		grid: {
			left: '5px',
			right: '40px',
			bottom: '-10px',
			top: '10px',
			containLabel: true
		},
		textStyle: {
			color: 'white'
		},
		visualMap: {
			type: 'piecewise',
			show: false,
			dimension: 0,
			pieces: [{
				gte: 0,
				lt: avr,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
					color: '#d52d00'
				}, {
					offset: 0.5,
					color: '#b12500'
				}])
			},  
			{
				gt: avr,
//				lte: 10000,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
						color: '#73deff'
					}, {
						offset: 0.5,
						color: '#4fcdf6'
				}])
			}],
			outOfRange: {
				color: '#999'
			}
		},
		xAxis: {
			type: 'value',
			show: false,
			max:1000, //目标值
		},
		yAxis: {
			type: 'category',
			axisTick: {
				inside: true,
			},
			inverse:true,
			data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
		},
		series: {
			type:'bar',
			barMaxWidth:20,
			itemStyle:{
				normal:{
					label:{
						show:true,
						position:'right',
						formatter: function(params) {
							        var max = 1000;//x轴最大值，用于换算百分比
							        var pr = params.value/max *100;
							        pr = parseFloat(pr.toFixed(2));
									return pr + '%'
								},
					}
				}
			},
			data: [820, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80]
		}
	};
	chart2Chart.setOption(option);
	
	//实体渠道业务量目标完成
	var chart3 = document.getElementById("mb-chart3");
    var chart3Chart = echarts.init(chart3);
    var option={
	        tooltip: {
	        	trigger:'axis'
	        },
            grid:{
            	left:"10px",
            	right:"10px",
            	bottom:"40px",
            	top:'0px'
            },
            xAxis: {
            	axisPointer:{
            		show:true,
            		type:'line',
            		label:{
            			show:false
            		}
            	},
                axisLabel:{
                    show:true,
                    formatter:function(val){  
                                        return val.split("").join("\n");  
                    },
               	    textStyle:{
               	  	color:'white',
               	  	fontSize:1,
               	  	fontWeight:100,
               	  }
                },
                boundaryGap:false,
                axisTick:{
                	inside:true,
//                  alignWithLabel:true
                },
                splitLine:{
                	show:false
                },
                axisLine:{
            		show:true
            	},
                data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
            },
               
            yAxis: {
            	show:false,
            	max:50,
            },
            series: [{
//              name: '新增用户份额',
                type:'line',
            	symbol:'none',
            	connectNulls:true,
            	clipOverflow:false,
	            areaStyle:{
			        normal:{
				     color:'rgba(2,189,209,0.5)',
			        }
		        },
		        markLine:{
		        	symbol:'none',
		        	
		        },
		       smooth:'true',
		       itemStyle:{
			        normal:{
			        	color:'#00efff',//折点颜色
			   	        lineStyle:{
			   		         show:false,
	    	                 color:'#00efff',//折线颜色
	                    },
			        }
		        },
                data: [5, 20, 36, 20, 30, 20, 40, 20, 5, 20, 36,23,14,20,14,36,]
                }
            ]
        };
  chart3Chart.setOption(option);
  function autoTipMb1(){
  	var timer = 0;
    var total = option.series[0].data.length;
    var count = 0;
    var tooltip = chart3Chart.tooltip;
    function tip(){
    	 chart3Chart.dispatchAction({type: 'showTip', seriesIndex: '0', dataIndex:'0'});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart3Chart.dispatchAction({type: 'showTip', seriesIndex: 0, dataIndex:curr});
            count += 1;
         }, 4000);
    }
    autoTip();
  }
  autoTipMb1();
  
    
    
	
	//4G终端销售完成-条形图
	var chart4 = document.getElementById("mb-chart4")
	var chart4Chart = echarts.init(chart4);
	var datalin =[1000, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80];
		var sum =0;
		for (var i=0;i<datalin.length;i++) {
			sum+=datalin[i];
		}
		//平均值
	var avr = sum/datalin.length;
//	alert(avr);
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
			data: ['放号', '增值业务', '基础业务', '缴费', '激励考核', '电子渠道', '终端']
		},
		grid: {
			left: '5px',
			right: '40px',
			bottom: '-10px',
			top: '10px',
			containLabel: true
		},
		textStyle: {
			color: 'white'
		},
		visualMap: {
			type: 'piecewise',
			show: false,
			dimension: 0,
			pieces: [{
				gte: 0,
				lt: avr,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
					color: '#d52d00'
				}, {
					offset: 0.5,
					color: '#b12500'
				}])
			},  
			{
				gt: avr,
//				lte: 10000,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
						color: '#73deff'
					}, {
						offset: 0.5,
						color: '#4fcdf6'
				}])
			},
//			{
//				gte: 8,
////				lte: 8,
//				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//					offset: 0.5,
//					color: '#d52d00'
//				}, {
//					offset: 0.5,
//					color: '#b12500'
//				}])
//			}
			],
			outOfRange: {
				color: '#999'
			}
		},
		xAxis: {
			type: 'value',
			show: false,
			max:1000,//目标值
		},
		yAxis: {
			type: 'category',
			axisTick: {
				inside: true,
			},
			inverse:true,
			data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
		},
		series: {
			type:'bar',
			barMaxWidth:20,
			itemStyle:{
				normal:{
					label:{
						show:true,
						position:'right',
						formatter: function(params) {
							        var max = 1000;//x轴最大值，用于换算百分比
							        var pr = params.value/max *100;
							        pr = parseFloat(pr.toFixed(2));
									return pr + '%'
								},
					}
				}
			},
			data: [1000, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80]
		}
	};
	chart4Chart.setOption(option);
	
}

//人员跟踪
var qudaogz = function(){
	//综合完成率-雷达图
	var chart1 = document.getElementById("gz-chart1");
	var chart1Chart = echarts.init(chart1);
	var option = {
		tooltip: {},
		grid:{
			top:'10px',
			left:'10px',
			bottom:'10px',
			right:'10px',
		},
		radar: {
			center: ['50%', '55%'],
			shape:'circle',
			nameGap:10,
			indicator: [{
				name: '宽带到达',
				max: 6500,
				color: 'white'
			}, {
				name: '年累计收入',
				max: 16000,
				color: 'white'
			}, {
				name: '4G用户到达',
				max: 30000,
				color: 'white'
			}, {
				name: '新增用户份额',
				max: 38000,
				color: 'white'
			}, {
				name: '通信用户份额',
				max: 52000,
				color: 'white'
			}, ],
			splitNumber: 4,
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(2,189,209,0.1)', 'rgba(2,189,209,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: '#01d0e3'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#01d0e3'
				}
			}
		},
		series: [{
			name: '考核指标',
			type: 'radar',
			symbol: 'arrow',
			itemStyle: {
				normal: {
					areaStyle: {
						color: 'rgba(206,90,14,1)'
					},
				}
			},
			data: [{
				
				value: [3500, 10000, 28000, 20000, 42000]
			}]
		}]
	};
	chart1Chart.setOption(option);
	
	//倒数TOP14
	var chart2 = document.getElementById("gz-chart2");
	var chart2Chart = echarts.init(chart2);
	var option = {
		tooltip: {},
		grid:{
			top:'10px',
			left:'10px',
			bottom:'10px',
			right:'10px',
		},
		radar: {
			center: ['50%', '55%'],
			shape:'circle',
			nameGap:10,
			indicator: [{
				name: '宽带到达',
				max: 6500,
				color: 'white'
			}, {
				name: '年累计收入',
				max: 16000,
				color: 'white'
			}, {
				name: '4G用户到达',
				max: 30000,
				color: 'white'
			}, {
				name: '新增用户份额',
				max: 38000,
				color: 'white'
			}, {
				name: '通信用户份额',
				max: 52000,
				color: 'white'
			}, ],
			splitNumber: 4,
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(2,189,209,0.1)', 'rgba(2,189,209,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: '#01d0e3'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#01d0e3'
				}
			}
		},
		series: [{
			name: '考核指标',
			type: 'radar',
			symbol: 'arrow',
			itemStyle: {
				normal: {
					areaStyle: {
						color: 'rgba(206,90,14,1)'
					},
					//					label:{
					//                    		show:true,
					//                    		position:'outside'
					//                   }
				}
			},
			data: [
			{
				value: [3500, 10000, 28000, 20000, 42000]
			}
			]
		}]
	};
	chart2Chart.setOption(option);
}

var qudaogzt =function(){
//	alert("hello");
     //综合完成率-雷达图
	var chartqd = document.getElementById("gzqd-chart1");
	var chartqdChart = echarts.init(chartqd);
	var option = {
		tooltip: {},
		grid:{
			top:'10px',
			left:'10px',
			bottom:'10px',
			right:'10px',
		},
		radar: {
			center: ['50%', '55%'],
			shape:'circle',
			nameGap:10,
			indicator: [{
				name: '宽带到达',
				max: 6500,
				color: 'white'
			}, {
				name: '年累计收入',
				max: 16000,
				color: 'white'
			}, {
				name: '4G用户到达',
				max: 30000,
				color: 'white'
			}, {
				name: '新增用户份额',
				max: 38000,
				color: 'white'
			}, {
				name: '通信用户份额',
				max: 52000,
				color: 'white'
			}, ],
			splitNumber: 4,
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(2,189,209,0.1)', 'rgba(2,189,209,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: '#01d0e3'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#01d0e3'
				}
			}
		},
		series: [{
			name: '考核指标',
			type: 'radar',
			symbol: 'arrow',
			itemStyle: {
				normal: {
					areaStyle: {
						color: 'rgba(206,90,14,1)'
					},
				}
			},
			data: [{
				
				value: [3500, 10000, 28000, 20000, 42000]
			}]
		}]
	};
	chartqdChart.setOption(option);
	
	var chartt1 = document.getElementById("gzt-chart1");
	var chartt1Chart = echarts.init(chartt1);
	var option = {
		tooltip: {},
		grid:{
			top:'10px',
			left:'10px',
			bottom:'10px',
			right:'10px',
		},
		radar: {
			center: ['50%', '55%'],
			shape:'circle',
			nameGap:10,
			indicator: [{
				name: '宽带到达',
				max: 6500,
				color: 'white'
			}, {
				name: '年累计收入',
				max: 16000,
				color: 'white'
			}, {
				name: '4G用户到达',
				max: 30000,
				color: 'white'
			}, {
				name: '新增用户份额',
				max: 38000,
				color: 'white'
			}, {
				name: '通信用户份额',
				max: 52000,
				color: 'white'
			}, ],
			splitNumber: 4,
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(2,189,209,0.1)', 'rgba(2,189,209,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: '#01d0e3'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#01d0e3'
				}
			}
		},
		series: [{
			name: '考核指标',
			type: 'radar',
			symbol: 'arrow',
			itemStyle: {
				normal: {
					areaStyle: {
						color: 'rgba(206,90,14,1)'
					},
					//					label:{
					//                    		show:true,
					//                    		position:'outside'
					//                   }
				}
			},
			data: [
			{
				value: [3500, 10000, 28000, 20000, 42000]
			}
			]
		}]
	};
	chartt1Chart.setOption(option);
	
	
	//单厅业务量完成趋势-折线图
	var chartt2 = document.getElementById("gzt-chart2");
	var chartt2Chart = echarts.init(chartt2);
	var option = {
		tooltip: {

		},
		grid: {
			left: "10px",
			right: "10px",
			bottom: "22px",
			top: '30px'
		},
		legend:{
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 5,
			data:['新入网','宽带办理','30元及以上流量套餐办理','4G终端销量','数据业务办理量']
		},
		xAxis: {
			axisPointer: {
				show: true,
				type: 'line',
				label: {
					show: false
				}
			},
			axisLabel: {
				show: true,
				interval: 0,
				textStyle: {
					color: 'white',
					fontWeight: 100,
				}
			},
			boundaryGap: ["10px", "1%"],
			axisTick: {
				inside: true
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			data: ["2月", "3月", "4月", "5月", "6月", "7月"],

		},
		yAxis: {
			type: 'value',
			show: false,

		},
		color:['#ff6600','#1cdef2','#5750d3','#df2759','#1bd04c'],
		series: [{
			name: '新入网',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [320, 360, 100, 210, 200,600]
		}, {
			name: '宽带办理',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [100, 600, 200, 820, 360,100]
		}, {
			name: '30元及以上流量套餐办理',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [300, 400, 200, 500, 300,200]
		}, {
			name: '4G终端销量',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [180, 100, 400, 720, 560,900]
		}, {
			name: '数据业务办理量',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [130, 400, 320, 520, 160,800]
		}
		]

	};
	chartt2Chart.setOption(option);
	
	
	//单厅服务质量-柱状图
	var chartt3 = document.getElementById("gzt-chart3");
	var chartt3Chart = echarts.init(chartt3);
	var option = {
		tooltip: {

		},
		grid: {
			left: "10px",
			right: "10px",
			bottom: "38px",
			top: '5px'
		},
		xAxis: {
			axisPointer: {
				show: true,
				type: 'shadow',
				label: {
					show: false
				}
			},
			axisLabel: {
				show: true,
				interval: 0,
				textStyle: {
					color: 'white',
					fontWeight: 100,
				}
			},
			boundaryGap: ["10px", "1%"],
			axisTick: {
				inside: true
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			data: ["平均等\n待时长", "平均办\n理时长", "取号量", "弃号量", "700参\n与率","700满\n意度"],

		},
		yAxis: {
			type: 'value',
			show: false,

		},
		series: {
			name: '渠道月活跃用户',
			type: 'bar',
			barMaxWidth: 20,
			barCategoryGap: "10%",
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
						offset: 0.5,
						color: '#73deff'
					}, {
						offset: 0.5,
						color: '#4fcdf6'
					}]),
//					label: {
//						show: true,
//						position: 'top',
//						textStyle: {
//							color: "white"
//						}
//					}
				}
			},
			data: [320, 360, 100, 210, 200,600]
		}
	};
	chartt3Chart.setOption(option);
}

//渠道渗透
var qudaost =function(){
	//渠道渗透-实体雷达图
	var chart1 = document.getElementById("st-chart1");
	var chart1Chart = echarts.init(chart1);
	var option = {
		tooltip: {},
		grid:{
			top:'10px',
			left:'10px',
			bottom:'10px',
			right:'10px',
		},
		radar: {
			center: ['50%', '55%'],
			radius:'60%',
			shape:'circle',
			nameGap:10,
			indicator: [
			{  name: '4G终端销售\n渠道渗透率',max:100,color: 'white'},
			{  name: '新入网渠道\n渗透率',max:100,color: 'white'},
			{  name: '数据业务办理\n渠道渗透率',max:100,color: 'white'},
			{  name: '30元及以上流量套餐\n渠道渗透率',max:100,color: 'white'},
			{  name: '宽带业务办理\n渠道渗透率',max:100,color: 'white'},
			],
			splitNumber: 4,
			splitArea: {
				show: true,
				areaStyle: {
					color: ['rgba(2,189,209,0.1)', 'rgba(2,189,209,0.1)']
				}
			},
			splitLine: {
				lineStyle: {
					color: '#01d0e3'
				}
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#01d0e3'
				}
			}
		},
		series: [{
			name: '考核指标',
			type: 'radar',
//			symbol: 'circle',
			itemStyle: {
				normal: {
					areaStyle: {
						color: 'rgba(206,90,14,1)'
					},
				}
			},
			data: [
			{
				name:'上月',
				value: [20, 40, 90, 40, 50],
				itemStyle: {
				    normal: {
					    lineStyle:{
//						    color:'red'
					    },
					    areaStyle: {
						    color: 'rgba(206,90,14,1)'
					    }
				    }
			   },
			},
			{
				name:'当月',
				value: [35, 50, 40, 80, 70],
				itemStyle: {
				    normal: {
					    lineStyle:{
						    color:'rgba(0,239,255,1)'
					    },
					    areaStyle: {
						    color: 'rgba(0,239,255,0.5)'
					    }
				    }
			   },
			   label:{
					normal:{
						show:true,
						color:'white',
						formatter:function(params){
							return params.value + "%";
						}
//						formatter:function(params){
//							 var p = params.value;
//							 var pr = p/50000*100;
//							 pr = parseFloat(pr.toFixed(2));
//							 return pr +'%';
//						}
					}
				}
			}
			]
		}]
	};
	chart1Chart.setOption(option);
	
	
	//新入网chart2-条形图
	var chart2 = document.getElementById("st-chart2")
	var chart2Chart = echarts.init(chart2);
	var datalin =[820, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80];
		var sum =0;
		for (var i=0;i<datalin.length;i++) {
			sum+=datalin[i];
		}
		//平均值
	var avr = sum/datalin.length; 
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
			data: ['放号', '增值业务', '基础业务', '缴费', '激励考核', '电子渠道', '终端']
		},
		grid: {
			left: '5px',
			right: '40px',
			bottom: '-10px',
			top: '10px',
			containLabel: true
		},
		textStyle: {
			color: 'white'
		},
		visualMap: {
			type: 'piecewise',
			show: false,
			dimension: 0,
			pieces: [{
				gte: 0,
				lte: avr,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
					color: '#d52d00'
				}, {
					offset: 0.5,
					color: '#b12500'
				}])
			},  
			{
				gte: avr,
//				lte: 8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
						color: '#73deff'
					}, {
						offset: 0.5,
						color: '#4fcdf6'
				}])
			}],
			outOfRange: {
				color: '#999'
			}
		},
		xAxis: {
			type: 'value',
			show: false,
			max:1000, //目标值
		},
		yAxis: {
			type: 'category',
			axisTick: {
				inside: true,
			},
			inverse:true,
			data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
		},
		series: {
			type:'bar',
			barMaxWidth:20,
			itemStyle:{
				normal:{
					label:{
						show:true,
						position:'right',
						formatter: function(params) {
							        var max = 1000;//x轴最大值，用于换算百分比
							        var pr = params.value/max *100;
							        pr = parseFloat(pr.toFixed(2));
									return pr + '%'
								},
					}
				}
			},
			data: [820, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80]
		}
	};
	chart2Chart.setOption(option);
	
	//分类渠道渗透率-极坐标条形图
var chart3=document.getElementById("st-chart3");
var chart3Chart =echarts.init(chart3);
//option = {
//	tooltip:{
//		 trigger: 'axis',
//      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//      }
//	},
//  angleAxis: {
//  	axisLabel:{
//  		show:false
//  	},
//  	splitLine:{
//  		lineStyle:{
//  			color:'#292f4f'
//  		}
//  	},
//  },
//  color:['#01e3f5','#00d55f','#6e6ee3','#ddcd43','#eb426d'],
//  textStyle:{
//  	color:'white'
//  },
//  radiusAxis: {
//      type: 'category',
//      data: ['一星', '二星', '三星', '四星','五星','自营厅'],
//      z: 10,
//      splitLine:{
//  		show:true,
//  		lineStyle:{
//  			color:'#292f4f',
//  			width:0.5
//  		}
//  	},
//  	axisPointer:{
//  		show:true,
//  		type:'shadow',
//  		label:{
//  			show:false ,	
//  		}
//  	}
//  },
//  polar: {
//  	center:['35%','50%'],
//  	radius:'85%'
//  },
//  series: [
//  {
//      type: 'bar',
//      data: [1, 2, 3, 4,5,6],
//      coordinateSystem: 'polar',
//      name: '宽带办理',
//      stack: 'a',
//      center:['35%','50%']
//  }, {
//      type: 'bar',
//      data: [2, 4, 6, 0,2,1],
//      coordinateSystem: 'polar',
//      name: '新入网',
//      stack: 'a',
//      center:['35%','50%']
//  }, {
//      type: 'bar',
//      data: [1, 2, 3, 4,3,2],
//      coordinateSystem: 'polar',
//      name: '30元及以上\n流量套餐办理',
//      stack: 'a',
//      center:['35%','50%']
//  }, {
//      type: 'bar',
//      data: [2, 4, 6, 0,0,5],
//      coordinateSystem: 'polar',
//      name: '4G终端销售',
//      stack: 'a',
//      center:['35%','50%']
//  }, {
//      type: 'bar',
//      data: [5, 1, 6, 4,6,3],
//      coordinateSystem: 'polar',
//      name: '数据业务办理',
//      stack: 'a',
//      barWidth:12,
//      barCategoryGap:'20%',
//      center:['35%','50%']
//  }],
//  legend: {
//      show: true,
//      orient: 'vertical',
//      right: '2%',
//		top: '10px',
//		textStyle: {
//			color: 'white',
//			fontSize: 12
//		},
//		itemWidth: 10,
//		itemHeight: 10,
//      data: ['宽带办理', '新入网',
//                 {name:'30元及以上\n流量套餐办理',
//                  textStyle:{
//                  	padding:[0,0,0,0],
//                  }
//                 },
//      '4G终端销售','数据业务办理'],
////      formatter:function(name){   //让series 中的文字进行换行  
////                return 'Legend ' + name.split("-").join("\n");
////      },
//  }
//};
var option = {
		tooltip: {
           trigger:'axis'
		},
		grid: {
			left: "10px",
			right: "10px",
			bottom: "22px",
			top: '30px'
		},
		legend:{
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 5,
			data:['新入网','宽带办理','30元及以上流量套餐办理','4G终端销量','数据业务办理量']
		},
		xAxis: {
			axisPointer: {
				show: true,
				type: 'line',
				label: {
					show: false
				}
			},
			axisLabel: {
				show: true,
				interval: 0,
				textStyle: {
					color: 'white',
					fontWeight: 100,
				}
			},
			boundaryGap: ["10px", "1%"],
			axisTick: {
				inside: true
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			data: ["一星", "二星", "三星", "四星", "5星"],

		},
		yAxis: {
			type: 'value',
			show: false,

		},
		color:['#ff6600','#1cdef2','#5750d3','#df2759','#1bd04c'],
		series: [{
			name: '宽带办理',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [320, 360, 100, 210, 200]
		}, {
			name: '新入网',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [100, 600, 200, 820, 360]
		}, {
			name: '30元及以上流量套餐办理',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [300, 400, 200, 500, 300]
		}, {
			name: '4G终端销售',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [180, 100, 400, 720, 560]
		}, {
			name: '数据业务办理',
			type: 'line',
			smooth:true,
			symbol:'circle',
			data: [130, 400, 320, 520, 160]
		}
		],
		legend: {
        show: true,
//      orient: 'vertical',
        left: '0',
		top: '0px',
		textStyle: {
			color: 'white',
			fontSize: 12
		},
		itemWidth: 10,
		itemHeight: 10,
        data: ['宽带办理', '新入网','30元及以上流量套餐办理','4G终端销售','数据业务办理'],
//      formatter:function(name){   //让series 中的文字进行换行  
//                return 'Legend ' + name.split("-").join("\n");
//      },

	},
	};
chart3Chart.setOption(option);
//function autoTipSt1(){
//	var timer = 0;
//  var total = option.series[0].data.length;
//  var count = 0;
//  var tooltip = chart1Chart.tooltip;
//  function tip(){
//  	 chart1Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
//  }
//  tip();
//  function autoTip() {
//      timer = setInterval(function () {
//          var curr = count % total;
////          var currb = count % total-1;
//          chart1Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
////          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
//         
//          count += 1;
//       }, 4000);
//  }
//  autoTip();
//}

function autoTipSt2(){
  	var timer = 0;
    var total = option.series[0].data.length;
    var count = 0;
    var tooltip = chart3Chart.tooltip;
    function tip(){
    	 chart3Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart3Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
//          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
           
            count += 1;
         }, 4000);
    }
    autoTip();
  }
//autoTipSt1();
  autoTipSt2();


//30元及以上流量套餐/宽带渠道渗透率-条形图
	var chart4 = document.getElementById("st-chart4")
	var chart4Chart = echarts.init(chart4);
	var datalin =[820, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80];
		var sum =0;
		for (var i=0;i<datalin.length;i++) {
			sum+=datalin[i];
		}
		//平均值
	var avr = sum/datalin.length; 
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
			data: ['放号', '增值业务', '基础业务', '缴费', '激励考核', '电子渠道', '终端']
		},
		grid: {
			left: '5px',
			right: '40px',
			bottom: '-10px',
			top: '10px',
			containLabel: true
		},
		textStyle: {
			color: 'white'
		},
		visualMap: {
			type: 'piecewise',
			show: false,
			dimension: 0,
			pieces: [{
				gte: 0,
				lte: avr,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
					color: '#d52d00'
				}, {
					offset: 0.5,
					color: '#b12500'
				}])
			},  
			{
				gte: avr,
//				lte: 8,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0.5,
						color: '#73deff'
					}, {
						offset: 0.5,
						color: '#4fcdf6'
				}])
			}
			],
			outOfRange: {
				color: '#999'
			}
		},
		xAxis: {
			type: 'value',
			show: false,
			max:1000, //目标值
		},
		yAxis: {
			type: 'category',
			axisTick: {
				inside: true,
			},
			inverse:true,
			data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
		},
		series: {
			type:'bar',
			barMaxWidth:20,
			itemStyle:{
				normal:{
					label:{
						show:true,
						position:'right',
						formatter: function(params) {
							        var max = 1000;//x轴最大值，用于换算百分比
							        var pr = params.value/max *100;
							        pr = parseFloat(pr.toFixed(2));
									return pr + '%'
								},
					}
				}
			},
			data: [820, 732, 601, 534, 490, 430,380,330,300,280,210,180,160,140,100,80]
		}
	};
	chart4Chart.setOption(option);
	
   
}

//服务类监控
var server = function(){
	//取号量与弃号率
    var chart2 = document.getElementById("fw-chart2");
    var chart2Chart = echarts.init(chart2);
    var option={
	        tooltip: {
	        	trigger:'axis'
	        },
            grid:{
            	left:"10px",
            	right:"10px",
            	bottom:"40px",
            	top:'10px'
            },
            visualMap: {
                type:'piecewise',
                show:false,
                seriesIndex:0,
                dimension:0,
                pieces: [{
                    gte: 9,
                    lte: 20,
                    color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#d52d00'
                           },
                           {
                            offset: 0.5,
                            color: '#b12500'
                        }])
                }, {
                    gte: 0,
                    lte: 8,
                    color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.5,
	                            color: '#00c8e0'
	                        }])
                }],
                outOfRange: {
                color: '#999'
                }
                },
            xAxis: {
            	axisPointer:{
            		show:true,
            		type:'shadow',
            		label:{
            			show:false
            		}
            	},
                axisLabel:{
                    show:true,
                    formatter:function(val){  
                                        return val.split("").join("\n");  
                    }  ,
               	    textStyle:{
               	  	color:'white',
               	  	fontSize:1,
               	  	fontWeight:100,
               	  }
                },
                boundaryGap:["10px","1%"],
                axisTick:{show:false},
                splitLine:{
                	show:false
                },
                axisLine:{
            		show:true
            	},
                data: ["荆州","江汉","黄冈","十堰","武汉","恩施","宜昌","孝感","咸宁","襄阳","荆门","随州","天门","鄂州","潜江","黄石"],
               
            },
            yAxis: {
            	type:'value',
            	show:false,
            	max:50,
            },
            series: [{
                name: '4G净增',
                type: 'bar',
                barMaxWidth:15,
                barCategoryGap:"10%",
                itemStyle:{
                	normal:{
                	    color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#73deff'
                           },
                           {
                            offset: 0.5,
                            color: '#4fcdf6'
                        }])
                    }
                },
                data: [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20]
            }]
        };
    chart2Chart.setOption(option);
    function autoTipServer2(){
  	var timer = 0;
    var total = option.series[0].data.length;
    var count = 0;
    var tooltip = chart2Chart.tooltip;
    function tip(){
    	 chart2Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart2Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
//          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
           
            count += 1;
         }, 4000);
    }
    autoTip();
  }
   autoTipServer2();
    
    
	//700M短信满意度及参与率
	var chart4 = document.getElementById("fw-chart4");
    var chart4Chart = echarts.init(chart4);
    var option={
	        tooltip: {
	        	trigger:'axis'
	        },
            grid:{
            	left:"10px",
            	right:"10px",
            	bottom:"20%",
            	top:'0px'
            },
            xAxis: {
            	axisPointer:{
            		show:true,
            		type:'line',
            		label:{
            			show:false
            		}
            	},
                axisLabel:{
                    show:true,
                    formatter:function(val){  
                                        return val.split("").join("\n");  
                    },
               	    textStyle:{
               	  	color:'white',
               	  	fontSize:1,
               	  	fontWeight:100,
               	  }
                },
                boundaryGap:["10px","1%"],
                axisTick:{inside:true},
                splitLine:{
                	show:false
                },
                axisLine:{
            		show:true
            	},
                data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
            },
               
            yAxis: {
            	show:false,
            	max:50,
            },
            series: [{
                name: '参与率',
                type:'line',
            	symbol:'circle',
	            areaStyle:{
			        normal:{
				     color:'none',
			        }
		        },
		       smooth:'true',
		       itemStyle:{
			        normal:{
			        	color:'#00efff',//折点颜色
			   	        lineStyle:{
			   		         show:false,
	    	                 color:'#00efff',//折线颜色
	                    },
			        }
		        },
                data: [5, 20, 36, 10, 10, 20,30,40,20,10,21,15,16,17,30,20]
            },{
            	//折点图
            	name:'满意度',
            	type:'line',
            	symbol:'circle',
	            areaStyle:{
			        normal:{
				     color:'none',
			        }
		        },
		       smooth:'true',
		       itemStyle:{
			        normal:{
			        	color:'#ff6600',//折点颜色
			   	        lineStyle:{
			   		         show:false,
	    	                 color:'#ff6600',//折线颜色
	                    },
			        }
		        },
	    
	
	    data:[23, 30, 25, 18, 12,40, 9, 12, 10,23, 30, 25, 18, 9, 12, 10]
            }]
        };
    chart4Chart.setOption(option);
    function autoTipServer4(){
  	var timer = 0;
    var total = option.series[0].data.length;
    var count = 0;
    var tooltip = chart4Chart.tooltip;
    function tip(){
    	 chart4Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart4Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
//          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
           
            count += 1;
         }, 4000);
    }
    autoTip();
  }
   autoTipServer4();
    
    
    

    
    //投诉处理及时率&营销活动万投比
    var chart5 = document.getElementById("fw-chart5");
    var chart5Chart = echarts.init(chart5);
    var option={
	        tooltip: {
	        	trigger:'axis'
	        },
            grid:{
            	left:"10px",
            	right:"10px",
            	bottom:"22px",
            	top:'0px'
            },
            xAxis: {
            	axisPointer:{
            		show:true,
            		type:'line',
            		label:{
            			show:false
            		}
            	},
                axisLabel:{
                    show:true,
//                  formatter:function(val){  
//                                      return val.split("").join("\n");  
//                  },
               	    textStyle:{
               	  	color:'white',
               	  	fontSize:1,
               	  	fontWeight:100,
               	  }
                },
                boundaryGap:false,
                axisTick:{
                	inside:true,
//                  alignWithLabel:true
                },
                splitLine:{
                	show:false
                },
                axisLine:{
            		show:true
            	},
                data: ["2月","3月","4月","5月","6月","7月","8月","9月"]
            },
               
            yAxis: {
            	show:false,
            	max:50,
            },
            series: [{
                name: '投诉处理及时率',
                type:'line',
            	symbol:'circle',
            	connectNulls:true,
            	clipOverflow:false,
	            areaStyle:{
			        normal:{
				     color:'rgba(2,189,209,0.5)',
			        }
		        },
		        markLine:{
		        	symbol:'none',
		        	
		        },
		       smooth:'true',
		       itemStyle:{
			        normal:{
			        	color:'#00efff',//折点颜色
			   	        lineStyle:{
			   		         show:false,
	    	                 color:'#00efff',//折线颜色
	                    },
			        }
		        },
                data: [ 
//              {value: 0,symbol:'none',axisPointer:{type:'none'}},
                40, 20, 36, 20, 30, 20,40,20,
//              {value:0,symbol:'none'}
                ]}
            ]
        };
    chart5Chart.setOption(option); 
    function autoTipServer5(){
  	var timer = 0;
    var total = option.series[0].data.length;
    var count = 0;
    var tooltip = chart5Chart.tooltip;
    function tip(){
    	 chart5Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart5Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
//          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
           
            count += 1;
         }, 4000);
    }
    autoTip();
  }
   autoTipServer5();
    
    
    //营业厅排名进度条
    $(function(){
    		var widArr = [];
    		var num = $('.server-jd').find('.progress-text');
    		for (var i = 0; i < num.length; i++) {
                widArr.push(num.eq(i).html());
                $('.server-jd .progress').eq(i).animate({width:widArr[i]},1000);
            }
    		$('.store-name').fadeIn(2000);
    	})
}


//预警与工单
function yj(index){
	var chart0 = document.getElementById("yj-chart0");
	var b = index;
	Datass0=[
	            {value: 0,symbol: 'none'},
				5, 20, 36, 20, 30, 20, 40, 20, 
				{value: 0,symbol: 'none'}
			];
	Datass1=[
	            {value: 0,symbol: 'none'},
				5, 80, 36, 20, 30, 20, 40, 80, 
				{value: 0,symbol: 'none'}
			];
	var chart0Chart = echarts.init(chart0);
	var option0 = {
		tooltip: {
           trigger:'axis'
		},
		grid: {
			left: "10px",
			right: "10px",
			bottom: "14%",
			top: '0px'
		},
		xAxis: {
			axisPointer: {
				show: true,
				type: 'line',
				label: {
					show: false
				}
			},
			axisLabel: {
				show: true,
				//                  formatter:function(val){  
				//                                      return val.split("").join("\n");  
				//                  },
				textStyle: {
					color: 'white',
					fontSize: 1,
					fontWeight: 100,
				}
			},
			boundaryGap: false,
			axisTick: {
				inside: true,
				//                  alignWithLabel:true
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			data: [ "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月"]
		},

		yAxis: {
			show: false,
			max: 50,
		},
		series: [{
			name: '新增用户份额',
			type: 'line',
			symbol: 'circle',
			connectNulls: true,
			clipOverflow: false,
			areaStyle: {
				normal: {
					color: 'rgba(2,189,209,0.5)',
				}
			},
			markLine: {
				symbol: 'none',

			},
			smooth: 'true',
			itemStyle: {
				normal: {
					color: '#00efff', //折点颜色
					lineStyle: {
						show: false,
						color: '#00efff', //折线颜色
					},
				}
			},
			data: Datass0
		}]
	};
	var option1 = {
		tooltip: {
          trigger:'axis'
		},
		grid: {
			left: "10px",
			right: "10px",
			bottom: "14%",
			top: '0px'
		},
		xAxis: {
			axisPointer: {
				show: false,
				type: 'line',
				label: {
					show: false
				}
			},
			axisLabel: {
				show: true,
				//                  formatter:function(val){  
				//                                      return val.split("").join("\n");  
				//                  },
				textStyle: {
					color: 'white',
					fontSize: 1,
					fontWeight: 100,
				}
			},
			boundaryGap: false,
			axisTick: {
				inside: true,
				//                  alignWithLabel:true
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: true
			},
			data: ["", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", ""]
		},

		yAxis: {
			show: false,
			max: 50,
		},
		series: [{
			name: '新增用户份额',
			type: 'line',
			symbol: 'circle',
			connectNulls: true,
			clipOverflow: false,
			areaStyle: {
				normal: {
					color: 'rgba(2,189,209,0.5)',
				}
			},
			markLine: {
				symbol: 'none',

			},
			smooth: 'true',
			itemStyle: {
				normal: {
					color: '#00efff', //折点颜色
					lineStyle: {
						show: false,
						color: '#00efff', //折线颜色
					},
				}
			},
			data: Datass1
		}]
	};
	chart0Chart.setOption(option0);
	function autoTipYJ0(){
  	var timer = 0;
    var total = option1.series[0].data.length;
    var count = 0;
    var tooltip = chart0Chart.tooltip;
    function tip(){
    	 chart0Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart0Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
//          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
           
            count += 1;
         }, 4000);
    }
    autoTip();
  }
   autoTipYJ0();
}

//渠道目标完成-渠道分布
var qudaofb = function(){
	
	
	//各地区星级占比-堆叠条形图
	var chart2 = document.getElementById("fb-chart20")
	var chart2Chart = echarts.init(chart2);
//	var option = {
//		tooltip: {
//			trigger: 'axis',
//			axisPointer: { // 坐标轴指示器，坐标轴触发有效
//				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
//			},
////			formatter: function (params){  
////                 return  params[0].name + '<br/>'  
////                 +params[1].seriesName+':'+params[1].value+'%'+'<br/>'
////                 +params[2].seriesName+':'+params[2].value+'%'+'<br/>'
////                 +params[3].seriesName+':'+params[3].value+'%'+'<br/>'
////                 +params[4].seriesName+':'+params[4].value+'%'+'<br/>'
////                 +params[5].seriesName+':'+params[5].value+'%'+'<br/>'
////                 +params[6].seriesName+':'+params[6].value+'%';
////				}
//		},
//		legend: {
//			orient: 'vertical',
//			right: '2%',
//			top: '10px',
//			textStyle: {
//				color: 'white',
//				fontSize: 12
//			},
//			itemWidth: 10,
//			itemHeight: 10,
//			data: ['5星级', '4星级', '3星级', '2星级', '1星级', '0星级']
//		},
//		grid: {
//			left: '5px',
//			right: '22%',
//			bottom: '-15px',
//			top: '5px',
//			containLabel: true
//		},
//		textStyle: {
//			color: 'white'
//		},
//		xAxis: {
//			type: 'value',
//			show: false,
//			max:100,
//		},
//		yAxis: {
//			type: 'category',
//			inverse:true,
//			axisTick: {
//				inside: true,
//			},
//			data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
//		},
//		series: [
//		{
//			name:'总量',
//			type:'bar',
//			barMaxWidth:20,
//			itemStyle: {
//				normal: {
//					color: 'none',
//					borderColor:'rgba(255,250,250,0.4)',
//					borderWidth:1,
//				}
//			},
//			barGap:'-100%',
//			data: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]
//		},
//		{
//			name: '5星级',
//			type: 'bar',
//			stack: '总量',
//			barMaxWidth: 20,
//			itemStyle: {
//				normal: {
//					color: '#01e3f5'
//				}
//			},
//			data: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
//		}, {
//			name: '4星级',
//			type: 'bar',
//			stack: '总量',
//			barMaxWidth: 20,
//			itemStyle: {
//				normal: {
//					color: '#00d55f'
//				}
//			},
//			data: [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20]
//		}, {
//			name: '3星级',
//			type: 'bar',
//			stack: '总量',
//			barMaxWidth: 20,
//			itemStyle: {
//				normal: {
//					color: '#6e6ee3'
//				}
//			},
//			data: [30,30,30,30,30,30,0,0,30,30,30,30,30,30,30,30]
//		}, {
//			name: '2星级',
//			type: 'bar',
//			stack: '总量',
//			barMaxWidth: 20,
//			itemStyle: {
//				normal: {
//					color: '#ddcd43'
//				}
//			},
//			data: [20,20,20,20,0,20,20,20,20,20,20,20,20,20,20,20]
//		}, {
//			name: '1星级',
//			type: 'bar',
//			stack: '总量',
//			barMaxWidth: 20,
//			itemStyle: {
//				normal: {
//					color: '#eb426d'
//				}
//			},
//			data: [10,10,10,10,00,10,10,10,10,10,10,10,10,10,10,10]
//		}, {
//			name: '0星级',
//			type: 'bar',
//			stack: '总量',
//			barMaxWidth: 20,
//			barCategoryGap:'40%',
//			itemStyle: {
//				normal: {
//					color: '#ff6600'
//				}
//			},
//			data: [00,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
//		}
//		]
//	};
       option = {
		grid:[{
			    left: "10px",
				right: "10px",
				bottom: "50%",
				top: '10px'
		},{
			    left: "10px",
				right: "10px",
				bottom: "0",
				top: '50%'
		}],
		title:{
			top:0,
			text:'武汉',
			textStyle:{
				color:'white',
				fontSize:14,
			}
		},
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
   
    legend: {
    	orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
        data: ['0星级','1星级','2星级','3星级','4星级','5星级']
    },
    calculable: true,
    color: ['#01e3f5', '#6e6ee3', '#d52d00','#ddcd43','#eb426d','#ff6600'],
//  visualMap: {
//              type:'piecewise',
//              show:false,
//              seriesIndex:0,
//              dimension:0,
//              pieces: [{
//                  gte: 0,
//                  lte: 1,
//                  color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
//                          offset: 0.5,
//                          color: '#d52d00'
//                         },
//                         {
//                          offset: 0.5,
//                          color: '#b12500'
//                      }])
//              }, {
//                  gte: 1,
//                  lte: 2,
//                  color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
//	                            offset: 0.5,
//	                            color: '#00efff'
//	                        },
//	                        {
//	                            offset: 0.5,
//	                            color: '#00c8e0'
//	                        }])
//              }],
//              outOfRange: {
//              color: '#999'
//              }
//              },
    series: [
        {   gridIndex: 0,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: 80,
            //x2: 80,
//          bottom: '50%',
            top:'20%',
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'ascending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 40, name: '0星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '1星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '2星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        },
        {   gridIndex: 1,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: '50%',
            //x2: 80,
            bottom: 0,
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
           data: [
                {value: 40, name: '3星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '4星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '5星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        }
    ]
};
	chart2Chart.setOption(option);
	
	var chart21 = document.getElementById("fb-chart21")
	var chart21Chart = echarts.init(chart21);
	option = {
		grid:[{
			    left: "10px",
				right: "10px",
				bottom: "50%",
				top: '10px'
		},{
			    left: "10px",
				right: "10px",
				bottom: "0",
				top: '50%'
		}],
		title:{
			top:0,
			text:'孝感',
			textStyle:{
				color:'white',
				fontSize:14,
			}
		},
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
   
    legend: {
    	orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
        data: ['0星级','1星级','2星级','3星级','4星级','5星级']
    },
    calculable: true,
//  color: ['#01e3f5', '#6e6ee3', '#d52d00','#ddcd43','#eb426d','#ff6600'],

    series: [
        {   gridIndex: 0,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: 80,
            //x2: 80,
//          bottom: '50%',
            top:'20%',
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'ascending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 40, name: '0星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '1星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '2星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        },
        {   gridIndex: 1,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: '50%',
            //x2: 80,
            bottom: 0,
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
           data: [
                {value: 40, name: '3星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '4星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '5星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        }
    ]
};
	chart21Chart.setOption(option);
	
	var chart22 = document.getElementById("fb-chart22")
	var chart22Chart = echarts.init(chart22);
	option = {
		grid:[{
			    left: "10px",
				right: "10px",
				bottom: "50%",
				top: '10px'
		},{
			    left: "10px",
				right: "10px",
				bottom: "0",
				top: '50%'
		}],
		title:{
			top:0,
			text:'宜昌',
			textStyle:{
				color:'white',
				fontSize:14,
			}
		},
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
   
    legend: {
    	orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
        data: ['0星级','1星级','2星级','3星级','4星级','5星级']
    },
    calculable: true,
//  color: ['#01e3f5', '#6e6ee3', '#d52d00','#ddcd43','#eb426d','#ff6600'],

    series: [
        {   gridIndex: 0,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: 80,
            //x2: 80,
//          bottom: '50%',
            top:'20%',
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'ascending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 40, name: '0星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '1星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '2星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        },
        {   gridIndex: 1,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: '50%',
            //x2: 80,
            bottom: 0,
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
           data: [
                {value: 40, name: '3星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '4星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '5星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        }
    ]
};
	chart22Chart.setOption(option);
	
	
	var chart23 = document.getElementById("fb-chart23")
	var chart23Chart = echarts.init(chart23);
	option = {
		grid:[{
			    left: "10px",
				right: "10px",
				bottom: "50%",
				top: '10px'
		},{
			    left: "10px",
				right: "10px",
				bottom: "0",
				top: '50%'
		}],
		title:{
			top:0,
			text:'黄石',
			textStyle:{
				color:'white',
				fontSize:14,
			}
		},
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
   
    legend: {
    	orient: 'vertical',
			right: '2%',
			top: '10px',
			textStyle: {
				color: 'white',
				fontSize: 12
			},
			itemWidth: 10,
			itemHeight: 10,
        data: ['0星级','1星级','2星级','3星级','4星级','5星级']
    },
    calculable: true,
//  color: ['#01e3f5', '#6e6ee3', '#d52d00','#ddcd43','#eb426d','#ff6600'],

    series: [
        {   gridIndex: 0,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: 80,
            //x2: 80,
//          bottom: '50%',
            top:'20%',
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'ascending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
            data: [
                {value: 40, name: '0星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '1星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '2星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        },
        {   gridIndex: 1,
            name:'漏斗图',
            type:'funnel',
            left: '0px',
            top: '50%',
            //x2: 80,
            bottom: 0,
            width: '60%',
            height:'30%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: -2,
            label: {
                normal: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            },
           data: [
                {value: 40, name: '3星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
	                            offset: 0.5,
	                            color: '#00efff'
	                        },
	                        {
	                            offset: 0.4,
	                            color: '#00c8e0'
	                        }])
				}
			},
                },
                {value: 70, name: '4星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                            color: '#ff6600'
                           },
                           {
                            offset: 0.4,
                            color: '#e15a00'
                        }])
				}
				}
                },
                {value: 100, name: '5星级',itemStyle: {
				normal: {
					color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0.5,
                             color: '#00d55f'
                           },
                           {
                            offset: 0.4,
                            color: '#00b350'
                           
                        }])
				}
				}
                },
//              {value: 100, name: '订单',}
                
            ]
        }
    ]
};
	chart23Chart.setOption(option);
	
	//三家渠道占比
	var chart3 = document.getElementById("fb-chart3");
	var chart3Chart = echarts.init(chart3);
	var option = {
		tooltip: {
			trigger: 'none',
			//      formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',

		},
		color: ['#01e3f5', '#6e6ee3', '#d52d00'],
//		'#00d55f','#ddcd43', '#eb426d', '#ff6600',
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['50%', '65%'],
			avoidLabelOverlap: false,
			hoverAnimation: false,
			selectedOffset: 1,
			label: {
				normal: {
					show: true,
					position: 'outside',
					formatter: '{dc|{b}}\n{bc|{d}} %',
					rich: {
						dc: {
							fontSize: 12,
							align: 'center',
							color: 'white',
						},
						bc: {
							fontSize: 16,
							align: 'center',
//							color: 'white',
						}
					}
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '12',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: true
				}
			},
			data: [
			    {value: 50,name: '移动'},
			    {value: 20,name: '电信'}, 
			    {value: 30,name: '联通'},
			    ]
		}, {
			name: 'acll',
			type: 'pie',
			radius: ['74%', '75%'],
			hoverAnimation: false,
			selectedOffset: 1,
			label: {
				normal: {
					show: false,
					position: 'center',
					formatter: '{tc|{c}} \n {tb|{b}}',
					rich: {
						tc: {
							fontSize: 40,
							align: 'center'
						},
						tb: {
							fontSize: 12,
							align: 'center',
							//                  		height:40
						}
					}
				},
				emphasis: {
					show: false,
				}

			},
			itemStyle: {
				normal:{
					aeraStyle: {
					    color: 'red'
				    }
				}
			},
//			color: '#086d82',
			data: [{
				value: 100,
				name: '渠道总数（个）'
			}, ]
		}]
	};
	chart3Chart.setOption(option);
	
	
	//各地市三家渠道占比-堆叠条形图
	var chart4 = document.getElementById("fb-chart4")
	var chart4Chart = echarts.init(chart4);
	var option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			left: '5px',
			right: '20px',
			bottom: '-10px',
			top: '10px',
			containLabel: true
		},
		textStyle: {
			color: 'white'
		},
		xAxis: {
			type: 'value',
			show: false,
			max:100,
		},
		yAxis: {
			type: 'category',
			inverse:true,
			axisTick: {
				inside: true,
			},
			data: ["荆州", "江汉", "黄冈", "十堰", "武汉", "恩施", "宜昌", "孝感", "咸宁", "襄阳", "荆门", "随州", "天门", "鄂州", "潜江", "黄石"]
		},
		color: ['#01e3f5',  '#6e6ee3', '#d52d00'],
		series: [{
			name: '移动',
			type: 'bar',
			stack: '总量',
			barMaxWidth: 20,
			data: [50, 40, 20, 60, 70, 50,40, 40, 40, 40, 40, 40,40, 40, 40, 40]
		}, {
			name: '电信',
			type: 'bar',
			stack: '总量',
			barMaxWidth: 20,
			data: [30, 30, 40, 20, 10, 20,30, 30, 30, 30, 30, 30,30, 30, 30, 30]
		}, {
			name: '联通',
			type: 'bar',
			stack: '总量',
			barMaxWidth: 20,
			barCategoryGap:'40%',
			data: [20, 30, 40, 20, 20, 30,30, 30, 30, 30, 30, 30,30, 30, 30, 30]
		}
		]
	};
	chart4Chart.setOption(option);
	function autoTipFb4(){
  	var timer = 0;
    var total = option.series[0].data.length;
    var count = 0;
    var tooltip = chart4Chart.tooltip;
    function tip(){
    	 chart4Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:0});
    }
    tip();
    function autoTip() {
        timer = setInterval(function () {
            var curr = count % total;
//          var currb = count % total-1;
            chart4Chart.dispatchAction({type: 'showTip', seriesIndex:0, dataIndex:curr});
//          chart3Chart.dispatchAction({type: 'showTip', name:option.series[curr].name});
           
            count += 1;
         }, 4000);
    }
    autoTip();
  }
autoTipFb4();
	
	//渠道星级分布
	 $(function(){
    		var widArr = [];
    		var num = $('.server-jd').find('.progress-text');
    		for (var i = 0; i < num.length; i++) {
                widArr.push(num.eq(i).html());
                $('.server-jd .progress').eq(i).animate({width:widArr[i]},1000);
                $('.progress-c').eq(i).animate({width:widArr[i]},1000);
           };
                $('.progress-text').fadeIn(2000);
    	})
	
}

