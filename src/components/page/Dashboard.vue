<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover" class="orderList" style="height: 300px;">
                    <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
                </el-card>
                <el-card shadow="hover" class="orderList" style="height: 320px;">
                    <div id="lineChart" :style="{ width: '300px', height: '300px' }"></div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card shadow="hover" class="orderList" style="600px">
                    <div id="barChart" :style="{ width: '100%', height: '600px' }"></div>
                </el-card>
            </el-col>
        </el-row>
        <span style="margin-right: 20px;">请选择时间类型</span>
        <el-select v-model="sjlx" @change="choiceSJLX()"
            ><!-- 选择时间类型 -->
            <el-option label="最近一天" value="1"></el-option>
            <el-option label="最近一周" value="7"></el-option>
            <el-option label="最近一月" value="30"></el-option>
        </el-select>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'dashboard',
    data() {
        return {
            sjlx: 24,
            name: localStorage.getItem('ms_username'),
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
        choiceSJLX() {
            this.getLine();
        },
        //左上饼状图
        getPie() {
            let option = {
                title: {
                    text: '在线用户统计',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: [],
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{ value: '', name: '' }],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            };
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            this.$api.XTSY.queryUserRole()
                .then(res => {
                    // console.log(res);
                    let data = res.data;
                    if (res.code == 1) {
                        for (let i = 0; i < data.length; i++) {
                            option.series[0].data.push({
                                name: data[i].roleName,
                                value: data[i].proportion,
                            });
                            option.legend.data.push(data[i].roleName);
                        }
                        myChart.setOption(option);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //横向柱状图
        getBar() {
            let barChart = this.$echarts.init(document.getElementById('barChart'));
            let option = {
                title: {
                    text: '卫星数据统计',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999',
                        },
                    },
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true },
                    },
                },
                legend: {
                    data: ['数据量', '数据总量'],
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: 80000,
                        interval: 4000,
                        axisLabel: {
                            formatter: '{value} ',
                        },
                    },
                    {
                        type: 'value',
                        name: '数量',
                        min: 0,
                        max: 80000,
                        interval: 4000,
                        axisLabel: {
                            formatter: '{value} ',
                        },
                    },
                ],
                series: [
                    {
                        name: '数据量',
                        type: 'bar',
                        data: [],
                    },
                    {
                        name: '数据总量',
                        type: 'bar',
                        data: [],
                    },
                ],
            };
            this.$api.XTSY.querySjzl({})
                .then(res => {
                    // console.log(res);
                    if (res.code == 1) {
                        let data = res.data.tjSjzls;
                        let length = data.length;
                        option.xAxis[0].data.length = 0;
                        option.series[0].data.length = 0;
                        for (let i = 0; i < length; i++) {
                            option.xAxis[0].data.push(data[i].wxbh); //横向卫星坐标轴
                            option.series[0].data.push(data[i].sjl); //数据量
                            option.series[1].data.push(data[i].sum); //数据量
                        }
                        barChart.setOption(option);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            //
        },
        //纵向柱状图
        getLine() {
            let option = {
                title: {
                    text: '24小时卫星数据',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                },
                yAxis: {
                    type: 'category',
                    data: ['卫星6', '卫星5', '卫星4', '卫星3', '卫星2', '卫星1'],
                },
                series: [
                    {
                        name: '类型1',
                        type: 'bar',
                        data: [10, 20, 30, 40, 50, 60],
                    },
                ],
            };
            let lineChart = this.$echarts.init(document.getElementById('lineChart'));

            this.$api.XTSY.querySjHourzl({
                hour: parseInt(this.sjlx, 10),
            })
                .then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        let data = res.data.tjSjzls;
                        let length = data.length;
                        option.series[0].data.lenght = 0;
                        for (let i = 0; i < length; i++) {
                            option.yAxis.data.push(data[i].wxbh); //横向卫星坐标轴
                            option.series[0].data.push(data[i].sjl); //数据量
                            option.series[1].data.push(data[i].sum); //总数据量
                        }
                        lineChart.setOption(option);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
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
.list {
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
