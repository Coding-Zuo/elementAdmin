<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" >
                <el-card shadow="hover" class="orderList" style="height:300px;">
<!--                    <el-col :span="24" class="order">-->
<!--                        <div class="grid-content grid-con-1">-->
<!--                            <i class="el-icon-lx-people grid-con-icon"></i>-->
<!--                            <div class="grid-cont-right">-->
<!--                                <div class="grid-num">1234</div>-->
<!--                                <div>已完成订单数</div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                    <el-col :span="24" class="order">-->
<!--                        <div class="grid-content grid-con-2">-->
<!--                            <i class="el-icon-tickets grid-con-icon"></i>-->
<!--                            <div class="grid-cont-right">-->
<!--                                <div class="grid-num">321</div>-->
<!--                                <div>待审批订单数</div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-col>-->
                    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
                </el-card>


                <el-card shadow="hover" class="orderList" style="height:320px;">
                    <div id="lineChart" :style="{width: '300px', height: '300px'}"></div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card shadow="hover" class="orderList" style="600px">
                    <div id="barChart" :style="{width: '100%', height: '600px'}"></div>
                </el-card>
            </el-col>
<!--            <el-col :span="6">-->
<!--                <el-card shadow="hover" class="orderList" style="height:300px;">-->
<!--                    <el-col v-for="(item,index) in list" :key="index" class="list">-->
<!--                        <span style="margin-right:5px;">{{index+1}}</span>-->
<!--                        <span style="margin-right:5px;">{{item.text}}</span>-->
<!--                        <i v-if="index < 3">-->
<!--                            <img :src="item.img" alt="">-->
<!--                        </i>-->
<!--                    </el-col>-->
<!--                </el-card>-->
<!--                <el-card shadow="hover" class="orderList" style="height:320px;">-->
<!--&lt;!&ndash;                    <div id="lineChart" :style="{width: '300px', height: '300px'}"></div>&ndash;&gt;-->
<!--                </el-card>-->
<!--            </el-col>-->
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                todoList: [
                    {
                        title: '任务1',
                        status: false
                    },
                    {
                        title: '任务1',
                        status: false
                    },
                    {
                        title: '任务1',
                        status: false
                    },
                    {
                        title: '任务1',
                        status: false
                    },
                    {
                        title: '任务1',
                        status: true
                    },
                    {
                        title: '任务1',
                        status: true
                    }
                ],
                list: [
                    {
                        text: 'LC802203820152... (231)',
                        img: require("./../../assets/hot.gif")
                    },
                    {
                        text: 'SC_SPOT6_20000... (201)',
                        img: require("./../../assets/hot.gif")
                    },
                    {
                        text: 'SC_PHR1B_20160...  (131)',
                        img: require("./../../assets/hot.gif")
                    },
                    {
                        text: 'BIG_C_IRSP6_MY...   (31)',
                        img: require("./../../assets/hot.gif")
                    },
                    {
                        text: 'BIG_C_LS7_AAA...    (21)',
                        img: require("./../../assets/hot.gif")
                    },
                ]
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.getPie();
                this.getBar();
                this.getLine();
            });
        },
        methods: {
            getPie() {
                let option = {
                    title: {
                        text: '在线用户统计',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['管理员', '普通用户', '一级会员', '二级会员']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 235, name: '管理员' },
                                { value: 210, name: '普通用户' },
                                { value: 184, name: '一级会员' },
                                { value: 204, name: '二级会员' },
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                myChart.setOption(option);
            },
            getBar() {
                let barChart = this.$echarts.init(document.getElementById('barChart'));
                var data = [
                    [2000, 10000, 6785.71],
                    [2000, 10000, 6825],
                    [2000, 6500, 4463.33],
                    [2000, 5600, 3793.83],
                    [2000, 4000, 3060],
                    [2000, 4000, 3222.33],
                    [2000, 4000, 3133.33],
                    [2000, 4000, 3100],
                    [2000, 3500, 2750],
                    [2000, 3000, 2500],
                    [2000, 3000, 2433.33],
                    [2000, 2700, 2375],
                    [2000, 2800, 2150],
                    [2000, 2300, 2100],
                    [2000, 3500, 2057.14],
                    [2000, 2600, 2037.5],
                    [2000, 2417.54, 1905.85],
                    [2000, 2000, 1775],
                    [2000, 1800, 1650]
                ];
                var cities = [
                    '北京',
                    '国外',
                    '河北',
                    '西藏',
                    '吉林',
                    '山东',
                    '广东',
                    '山西',
                    '陕西',
                    '内蒙古',
                    '重庆',
                    '广西',
                    '福建',
                    '浙江',
                    '江西',
                    '湖北',
                    '湖南',
                    '河南',
                    '辽宁'
                ];
                var barHeight = 50;
                barChart.setOption({
                    title: {
                        text: '卫星数据统计',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['类别1', '类别2']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['卫星1', '卫星2', '卫星3', '卫星4', '卫星5', '卫星6', '卫星7'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '数量',
                            min: 0,
                            max: 250,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                        {
                            type: 'value',
                            name: '数量',
                            min: 0,
                            max: 25,
                            interval: 5,
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '类别1',
                            type: 'bar',
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
                        },
                        {
                            name: '类别2',
                            type: 'bar',
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
                        }
                    ]
                });
            },
            getLine() {
                let option = {
                    title: {
                        text: '24小时卫星数据',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['卫星6', '卫星5', '卫星4', '卫星3', '卫星2', '卫星1']
                    },
                    series: [
                        {
                            name: '类型1',
                            type: 'bar',
                            data: [10, 20, 30, 40, 50, 60]
                        }
                    ]
                };
                let lineChart = this.$echarts.init(document.getElementById('lineChart'));
                lineChart.setOption(option);
            }
        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .orderList {
        margin-bottom: 20px;
    }
    .order {
        margin: 20px 0;
    }
    .list{
        margin: 10px 5px;
        font-size: 18px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
</style>
