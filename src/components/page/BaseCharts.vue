<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 系统监控 /设备监控
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="schart-box">
<!--                <div class="content-title">服务器统计</div>-->
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
            <div class="schart-box">
<!--                <div class="content-title">数据库表统计</div>-->
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
<!--            <div class="schart-box">-->
<!--&lt;!&ndash;                <div class="content-title">用户量统计</div>&ndash;&gt;-->
<!--                <schart class="schart" canvasId="pie" :options="options3"></schart>-->
<!--            </div>-->
<!--            <div class="schart-box">-->
<!--&lt;!&ndash;                <div class="content-title">运维记录</div>&ndash;&gt;-->
<!--                <schart class="schart" canvasId="ring" :options="options4"></schart>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
export default {
    name: 'basecharts',
    components: {
        Schart
    },
    data() {
        return {
            options1: {
                type: 'bar',
                title: {
                    text: '服务器统计'
                },
                bgColor: '#fbfbfb',
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '服务器1',
                        fillColor: 'rgba(241, 49, 74, 0.5)',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '服务器2',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '服务器3',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '运维统计'
                },
                bgColor: '#fbfbfb',
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '数据库1',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '数据库2',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '数据库3',
                        data: [114, 138, 200, 235, 190]
                    }
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '数据库表占比'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['table1', 'table2', 'table3', 'table4', 'table5', 'table6', 'table7'],
                datasets: [
                    {
                        data: [334, 278, 190, 235, 260, 200, 141]
                    }
                ]
            },
            options4: {
                type: 'ring',
                title: {
                    text: '测试统计'
                },
                showValue: false,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['测试1', '测试2', '测试3'],
                datasets: [
                    {
                        data: [500, 500, 500]
                    }
                ]
            }
        };
    }
};
</script>

<style scoped>
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>