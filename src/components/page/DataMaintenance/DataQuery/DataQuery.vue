<template>
    <div class='dataMigration'>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据维护管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据查询维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <!-- 搜索start -->
            <div class='search'>
                <el-col :span='6'>
                    <div class='data-select'>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>数据集选择</span>
                            </div>
                            <div class="text item">
                                <el-select
                                        @change="valueChange"
                                        v-model="value5" multiple placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span='18'>
                    <el-form ref="form" label-width="120px" style='padding: 0 20px;'>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="数据入库时间:">
                                    <el-date-picker
                                            v-model="date"
                                            type="datetimerange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="卫星名称:">
                                    <el-select v-model="satelliteName" placeholder="请选择">
                                        <el-option
                                                v-for="item in satelliteList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="传感器:">
                                    <el-select v-model="sensorName" placeholder="请选择">
                                        <el-option
                                                v-for="item in sensorList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="数据业务属性:">
                                    <el-select v-model="dataBusiness" placeholder="请选择">
                                        <el-option
                                                v-for="item in dataBusinessList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>

                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="数据共享级别:">
                                    <el-select v-model="dataShare" placeholder="请选择">
                                        <el-option
                                                v-for="item in dataShareList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="分辨率:">
                                    <el-select v-model="dpi" placeholder="请选择">
                                        <el-option
                                                v-for="item in dpiList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--                            <el-col :span='12'>-->
                            <!--                                <el-form-item label="迁移目的存储区:">-->
                            <!--                                    <el-select v-model="migration" placeholder="请选择">-->
                            <!--                                        <el-option-->
                            <!--                                                v-for="item in migrationList"-->
                            <!--                                                :key="item.value"-->
                            <!--                                                :label="item.label"-->
                            <!--                                                :value="item.value">-->
                            <!--                                        </el-option>-->
                            <!--                                    </el-select>-->
                            <!--                                </el-form-item>-->
                            <!--                            </el-col>-->
                        </el-row>
                        <el-row class='data-map'>
                            <el-col :span='20'>
                                <el-tabs type="border-card">
                                    <el-tab-pane label="数据区域">
                                        <el-row>
                                            <el-col :span='12'>
                                                <el-form-item label="左上经度:">
                                                    <el-select v-model="leftTop1" placeholder="请选择">
                                                        <el-option
                                                                v-for="item in leftTop1List"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span='12'>
                                                <el-form-item label="左上纬度:">
                                                    <el-select v-model="leftTop2" placeholder="请选择">
                                                        <el-option
                                                                v-for="item in leftTop2List"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span='12'>
                                                <el-form-item label="右下经度:">
                                                    <el-select v-model="rightBottom1" placeholder="请选择">
                                                        <el-option
                                                                v-for="item in rightBottom1List"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span='12'>
                                                <el-form-item label="右下纬度:">
                                                    <el-select v-model="rightBottom2" placeholder="请选择">
                                                        <el-option
                                                                v-for="item in rightBottom2List"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="行政区域">
                                        <el-row>
                                            <el-col :span='12'>
                                                <el-form-item label="省、直辖市:">
                                                    <el-select v-model="leftTop3" placeholder="请选择">
                                                        <el-option key="1" label="北京" value="北京"></el-option>
                                                        <el-option key="2" label="河北省" value="河北省"></el-option>
                                                        <el-option key="3" label="天津" value="天津"></el-option>
                                                        <el-option key="4" label="湖南省" value="湖南省"></el-option>
                                                        <el-option key="5" label="湖南省" value="湖南省"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span='12'>
                                                <el-form-item label="市:">
                                                    <el-select v-model="leftTop4" placeholder="请选择">
                                                        <el-option key="1" label="石家庄市" value="石家庄市"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span='12'>
                                                <el-form-item label="县、区:">
                                                    <el-select v-model="leftTop5" placeholder="请选择">
<!--                                                        <el-option-->
<!--                                                                v-for="item in leftTop2List"-->
<!--                                                                :key="item.value"-->
<!--                                                                :label="item.label"-->
<!--                                                                :value="item.value">-->
<!--                                                        </el-option>-->
                                                        <el-option key="1" label="朝阳区" value="朝阳区"></el-option>
                                                        <el-option key="2" label="昌平区" value="昌平区"></el-option>
                                                        <el-option key="3" label="海淀区" value="海淀区"></el-option>
                                                        <el-option key="4" label="房山区" value="房山区"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-tab-pane>
                                    <el-tab-pane label="SHAPE文件导入">
                                        SHAPE文件导入
                                    </el-tab-pane>
                                </el-tabs>
                            </el-col>
                            <el-col :span='4' class='search-btn'>
                                <el-button
                                        type="primary"
                                        size="medium"
                                        style='margin-left:10px;'
                                >
                                    查询
                                </el-button>
                                <!--                                <el-button-->
                                <!--                                        type="primary"-->
                                <!--                                        size="medium"-->
                                <!--                                        style='margin-left:10px;margin-top:10px;'-->
                                <!--                                >-->
                                <!--                                    数据迁移-->
                                <!--                                </el-button>-->
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
                <div style="margin-top: 20px;float: right;margin-right: 200px">
                    <el-button
                            type="primary"
                            icon="el-icon-setting"
                            class="handle-del mr10"
                            @click="goqianyi"
                    >人工数据迁移
                    </el-button>
                    <el-button
                            type="primary"
                            icon="el-icon-setting"
                            class="handle-del mr10"
                            @click="gojiaohui"
                    >人工数据汇交
                    </el-button>
                    <el-button
                            type="primary"
                            icon="el-icon-setting"
                            class="handle-del mr10"
                            @click="goliuzhuan"
                    >人工数据流转
                    </el-button>
                    <el-button
                            type="primary"
                            icon="el-icon-setting"
                            class="handle-del mr10"
                            @click="goqingli"
                    >人工数据清理
                    </el-button>
                </div>
            </div>
            <!-- 搜索end -->
            <div class='partition'></div>
            <!-- 表格seart -->
            <!-- 表格end -->
            <div>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        border=true
                        style="width: 100%;margin-top: 10px;"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                    >
                    </el-table-column>
                    <el-table-column
                            label="数据ID"
                            prop='id'
                    >

                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="卫星名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="传感器"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="入库时间"
                            show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="人工数据迁移" :visible.sync="rengon" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="迁移目的存储区:" label-width="120px">
                        <el-select v-model="migration" placeholder="请选择">
                            <el-option
                                    v-for="item in migrationList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="rengon = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
            </el-dialog>

            <el-dialog :visible.sync="dataVisible2" width="50%" title="选择数据汇交地址">
                <el-row style="margin-top:20px;">
                    <el-table
                            ref="Table"
                            :data="locationData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange1"
                            highlight-current-row
                            border="true"
                    >
                        <el-table-column type="selection" @current-change="currentChange"></el-table-column>
                        <el-table-column label="编号" prop="num" width="50"></el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="time" label="入库时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="file" label="文件目录" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="共享类型" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-row>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="dataVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveAdd">确 定</el-button>
                        </span>
            </el-dialog>

            <el-dialog title="人工数据汇交" :visible.sync="jiaohui" width="50%">
                <el-form :model="form" label-width="130px">
                    <div class="data-title">汇交方式选择</div>
                    <div class="data-content">
                        <div class="content">
                            <!-- 共享项目路径 -->
                            <el-row style="padding-bottom:20px;">
                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                <el-col :span="12"><el-button style="float:right;" @click="dataVisible2 = true">汇交地址</el-button></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <!-- ftp -->
                            <el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="端口:"><el-input v-model="form.port"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="jiaohui = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 流转地址 -->
            <el-dialog :visible.sync="dataVisible1" width="50%" title="选择数据流转地址">
                <el-row style="margin-top:20px;">
                    <el-table
                            ref="Table"
                            :data="locationData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange1"
                            highlight-current-row
                            border="true"
                    >
                        <el-table-column type="selection" @current-change="currentChange"></el-table-column>
                        <el-table-column label="编号" prop="num" width="50"></el-table-column>
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop="time" label="入库时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="file" label="文件目录" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="共享类型" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-row>
                <span slot="footer" class="dialog-footer">
                            <el-button @click="dataVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveAdd">确 定</el-button>
                        </span>
            </el-dialog>
            <el-dialog title="人工数据流转" :visible.sync="liuzhuan" width="50%">
                            <el-form ref="form" :model="form" label-width="130px">
                                <el-row>
                                    <div class="data-title">流转方式选择</div>
                                    <div class="data-content">
                                        <div class="content">
                                            <!-- 共享项目路径 -->
                                            <el-row style="padding-bottom:20px;">
                                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                                <el-col :span="12">
                                                    <el-button style="float:right;" @click="dataVisible1 = true">流转地址</el-button>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
                                                </el-col>
                                            </el-row>
                                            <!-- ftp -->
                                            <el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item label="端口:"><el-input v-model="form.port=21" disabled></el-input></el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </el-row>
                            </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="liuzhuan = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { fetchData } from '../../../../api/index';
    import { quillEditor } from 'vue-quill-editor';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        name: 'dataMigration',
        data() {
            return {
                form: {},
                rengon: false,
                qingli: false,
                liuzhuan: false,
                dataVisible1: false,
                dataVisible2: false,
                jiaohui: false,
                product: false, //产品数据集
                oasear: false, //oasear数据集
                date: [new Date(), new Date()], //选中日期
                satelliteName: '', //选中卫星名称
                locationData: [
                    {
                        time: '2016-05-03',
                        name: '卫星1',
                        num: '1518',
                        ip: '127.0.0.1'
                    },
                    {
                        time: '2016-05-03',
                        name: '卫星1',
                        num: '1518',
                        ip: '127.0.0.1'
                    },
                    {
                        time: '2016-05-03',
                        name: '卫星1',
                        num: '1518',
                        ip: '127.0.0.1'
                    },
                    {
                        time: '2016-05-03',
                        name: '卫星1',
                        num: '1518',
                        ip: '127.0.0.1'
                    }
                ],
                satelliteList: [ //卫星列表
                    { value: '01', label: '卫星一' },
                    { value: '02', label: '卫星二' },
                    { value: '03', label: '卫星三' }
                ],
                sensorName: '', //传感器名称
                sensorList: [ //传感器列表
                    { value: '01', label: 'KBCK' },
                    { value: '02', label: 'KBCJ' },
                    { value: '03', label: 'HBUD' }
                ],
                dataBusiness: '', //数据业务属性
                dataBusinessList: [ //数据业务属性列表
                    { value: '01', label: '共享' },
                    { value: '02', label: '独享' }
                ],
                dataShare: '', //数据共享
                dataShareList: [ //数据共享列表
                    { value: '01', label: '共享级别1' },
                    { value: '02', label: '共享级别2' }
                ],
                dpi: '', //分辨率
                dpiList: [ //分辨率列表
                    { value: '01', label: '1024' },
                    { value: '02', label: '1920' }
                ],
                migration: '', //迁移目的存储地
                migrationList: [ //迁移目标列表
                    { value: '01', label: '存储区A' },
                    { value: '02', label: '存储区B' }
                ],
                leftTop1: '',
                leftTop1List: [
                    { value: '01', label: '114.1' },
                    { value: '02', label: '108.6' }
                ],
                leftTop2: '',
                leftTop2List: [
                    { value: '01', label: '45' },
                    { value: '02', label: '63' }
                ],
                rightBottom1: '',
                rightBottom1List: [
                    { value: '01', label: '114.1' },
                    { value: '02', label: '108.6' }
                ],
                rightBottom2: '',
                rightBottom2List: [
                    { value: '01', label: '45' },
                    { value: '02', label: '63' }
                ],
                leftTop3: '',
                leftTop4: '',
                leftTop5: '',
                tableData: [{
                    id: 1,
                    date: '2016-05-03',
                    name: '高分1号',
                    address: 'PMS'
                }, {
                    id: 2,
                    date: '2016-05-02',
                    name: '高分2号',
                    address: 'PMS'
                }, {
                    id: 3,
                    date: '2016-05-04',
                    name: '高分3号',
                    address: 'SAR'
                }, {
                    id: 4,
                    date: '2016-05-01',
                    name: '高分4号',
                    address: 'PMS'
                }, {
                    id: 5,
                    date: '2016-05-08',
                    name: '高分5号',
                    address: 'PMS'
                }, {
                    id: 6,
                    date: '2016-05-06',
                    name: '高分6号',
                    address: 'PMS'
                }, {
                    id: 7,
                    date: '2016-05-07',
                    name: '高分7号',
                    address: 'PMS'
                }],
                multipleSelection: [],
                options: [{
                    value: '选项1',
                    label: '产品数据集'
                }, {
                    value: '选项2',
                    label: 'CASEarth数据'
                }, {
                    value: '选项3',
                    label: '产品数据集1'
                }, {
                    value: '选项4',
                    label: '产品数据集2'
                }, {
                    value: '选项5',
                    label: '产品数据集3'
                }],
                value5: [],
            };
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            goqianyi() {
                //通过push进行跳转
                this.rengon = true;
            },
            gojiaohui() {
                //通过push进行跳转
                this.jiaohui = true;
            },
            goliuzhuan() {
                //通过push进行跳转
                this.liuzhuan = true;
            },
            valueChange:function(){
                console.log(this.value5)
            },
            goqingli(index, row) {
                // 二次确认删除
                this.$confirm('确定要清理吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('清理成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {
                    });
            }
        }
    };
</script>

<style>
    .container {
        overflow: auto;
    }
    .data-title {
        background: #ebeef5;
        padding: 5px;
    }

    .data-content {
        padding: 20px 0;
        overflow: auto;
    }
    .search {
        overflow: auto;
    }

    .data-map {
        position: relative;
    }

    .data-map .search-btn {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .partition {
        margin-top: 10px;
        height: 10px;
        background: #eee;
    }
</style>
