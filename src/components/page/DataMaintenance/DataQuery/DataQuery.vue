<template>
    <div class="dataMigration">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据维护管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据查询维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 搜索start -->
            <div class="search">
                <el-form ref="form" label-width="100px" label-position="left" style="height: 260px;">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="产品类型" :required="true">
                                <el-select v-model="dataCollectition" placeholder="请选择">
                                    <el-option v-for="item in dataCollectitionList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="卫星名称:">
                                <el-select v-model="satelliteName" multiple :disabled="WXMC" placeholder="请选择">
                                    <el-option v-for="item in satelliteList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="传感器:">
                                <el-select v-model="sensorName" placeholder="请选择">
                                    <el-option v-for="item in sensorList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="入库开始时间:" style="width: 160px !important;">
                                <el-date-picker v-model="date" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                            </el-form-item>
                            <el-form-item label="入库结束时间:">
                                <el-date-picker v-model="date" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="分辨率:">
                                <el-select v-model="dpi" placeholder="请选择">
                                    <el-option v-for="item in dpiList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="数据业务属性:">
                                <el-select v-model="dataBusiness" placeholder="请选择">
                                    <el-option v-for="item in dataBusinessList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据共享级别:">
                                <el-select v-model="dataShare" placeholder="请选择">
                                    <el-option v-for="item in dataShareList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据存储区:">
                                <el-select v-model="dataShare" placeholder="请选择">
                                    <el-option v-for="item in dataShareList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="medium" @click="handleSearch()">查询</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-tabs type="border-card">
                                <el-tab-pane label="数据区域">
                                    <el-form-item label="左上经度:">
                                        <el-select v-model="leftTop1" placeholder="请选择">
                                            <el-option v-for="item in leftTop1List" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="左上纬度:">
                                        <el-select v-model="leftTop2" placeholder="请选择">
                                            <el-option v-for="item in leftTop2List" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="右下经度:">
                                        <el-select v-model="rightBottom1" placeholder="请选择">
                                            <el-option v-for="item in rightBottom1List" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="右下纬度:">
                                        <el-select v-model="rightBottom2" placeholder="请选择">
                                            <el-option v-for="item in rightBottom2List" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-tab-pane>
                                <el-tab-pane label="行政区域">
                                    <el-form-item label="省、直辖市:">
                                        <el-select v-model="leftTop3" placeholder="请选择" @change="getProvince()">
                                            <el-option v-for="province in provinceList" :key="province" :label="province" :value="province"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="市:">
                                        <el-select v-model="leftTop4" placeholder="请选择" @change="getCity()">
                                            <el-option v-for="city in cityList" :key="city.id" :label="city" :value="city"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="县、区:">
                                        <el-select v-model="leftTop5" placeholder="请选择" @change="getCounty()">
                                            <el-option v-for="county in countyList" :key="county.id" :label="county" :value="county"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-tab-pane>
                                <el-tab-pane label="SHAPE文件导入">
                                    SHAPE文件导入
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                </el-form>

                <div style="margin-top: 20px;">
                    <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="goqianyi">人工数据迁移 </el-button>
                    <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="gojiaohui">人工数据汇交 </el-button>
                    <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="goliuzhuan">人工数据流转 </el-button>
                    <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="goqingli">人工数据清理 </el-button>
                    <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="YeWuShuXing">业务属性批量设置 </el-button>
                    <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="GongXiangJiBie">共享级别批量设置 </el-button>
                    <!-- <el-button type="primary" size="medium" @click="handleSearch()">查询</el-button> -->
                    <div class="clearfix"></div>
                </div>
            </div>
            <div>
                <!-- todo -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    :border="true"
                    style="width: 100%; margin-top: 10px;"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column align="center" type="selection"> </el-table-column>
                    <el-table-column align="center" label="数据ID" prop="id"> </el-table-column>
                    <el-table-column align="center" prop="name" label="卫星名称"> </el-table-column>
                    <el-table-column align="center" prop="address" label="传感器" show-overflow-tooltip> </el-table-column>
                    <el-table-column align="center" prop="date" label="入库时间" show-overflow-tooltip> </el-table-column>
                    <!-- <el-table-column align="center" label="修改业务属性" show-overflow-tooltip> </el-table-column>
                    <el-table-column align="center" label="修改共享级别" show-overflow-tooltip> </el-table-column> -->
                    <el-table-column align="center" prop="date" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-info" @click="seeDetailsFun(scope.$index, scope.row, $event)">详情</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="handleDataEditFun(scope.$index, scope.row, $event)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog title="人工数据迁移" :visible.sync="rengon" width="30%">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="迁移目的存储区:" label-width="120px">
                        <el-select v-model="migration" placeholder="请选择">
                            <el-option v-for="item in migrationList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="rengon = false">取 消</el-button>
                    <el-button type="primary" @click="submitQainYi()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog :visible.sync="dataVisible2" width="50%" title="选择数据汇交地址">
                <el-row style="margin-top: 20px;">
                    <el-table
                        ref="Table"
                        :data="locationDataHuiJiao"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange1"
                        highlight-current-row
                        :border="true"
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
                            <el-row style="padding-bottom: 20px;"> </el-row>
                            <el-row>
                                <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
                            </el-row>
                            <!-- ftp -->
                            <el-row style="padding-bottom: 20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                            <el-row>
                                <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                <el-form-item label="端口:"><el-input v-model="form.port" disabled></el-input></el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
                                <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
                            </el-row>
                        </div>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="jiaohui = false">取 消</el-button>
                    <el-button type="primary" @click="submitHuiJiao">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 流转地址 -->
            <el-dialog :visible.sync="dataVisible1" width="50%" title="选择数据流转地址">
                <el-row style="margin-top: 20px;">
                    <el-table
                        ref="Table"
                        :data="locationDataLiuZhuan"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange1"
                        highlight-current-row
                        :border="true"
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
                    <el-button @click="dataVisible1 = false">取 消</el-button>
                    <!-- <el-button type="primary" @click="saveAdd">确 定</el-button> -->
                    <el-button type="primary" @click="dataVisible1 = false">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="人工数据流转" :visible.sync="liuzhuan" width="50%">
                <el-form ref="form" :model="form" label-width="130px">
                    <el-row>
                        <div class="data-title">流转方式选择</div>
                        <div class="data-content">
                            <div class="content">
                                <!-- 共享项目路径 -->
                                <el-row style="padding-bottom: 20px;">
                                    <el-button style="float: right;" @click="dataVisible1 = true">流转地址</el-button>
                                </el-row>
                                <el-row>
                                    <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
                                </el-row>
                                <!-- ftp -->
                                <el-row style="padding-bottom: 20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                                <el-row>
                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                    <el-form-item label="端口:"><el-input v-model="form.portnum" disabled></el-input></el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
                                    <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
                                </el-row>
                            </div>
                        </div>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="liuzhuan = false">取 消</el-button>
                    <el-button type="primary" @click="SubLiuZhuan">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog :visible.sync="dataDetails" width="50%" title="数据详情">
                <el-row style="margin-top: 20px;">
                    <el-table
                        ref="Table"
                        :data="dataDetail"
                        tooltip-effect="dark"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange1"
                        highlight-current-row
                        :border="true"
                    >
                        <el-table-column label="编号" prop="num" width="50"></el-table-column>
                        <el-table-column prop="cloumn1" label="名称"></el-table-column>
                        <el-table-column prop="cloumn2" label="入库时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cloumn3 " label="IP地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cloumn4 " label="文件目录" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cloumn5 " label="共享类型" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dataDetails = false">取 消</el-button>
                    <el-button type="primary" @click="dataDetails = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改 -->
            <el-dialog title="详情" :visible.sync="seeDetails">
                <div>
                    查看详情
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dataDetails = false">关闭</el-button>
                </span>
            </el-dialog>
            <el-dialog title="编辑" :visible.sync="handleDataEdit">
                <div>编辑处理</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dataDetails = false">取 消</el-button>
                    <el-button type="primary" @click="dataDetails = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改 -->
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    name: 'dataMigration',
    data() {
        return {
            provinceList: [],
            cityList: [],
            countyList: [],
            radio: 1,
            seeDetails: false,
            handleDataEdit: false,
            dataDetails: false,
            rengon: false,
            qingli: false,
            liuzhuan: false,
            dataVisible1: false,
            WXMC: false, //选择专题产品时，卫星名称不可选
            dataVisible2: false,
            jiaohui: false,
            product: false, //产品数据集
            oasear: false, //oasear数据集
            date: [new Date(), new Date()], //选中日期
            dataCollectition: '',
            dataCollectitionList: [
                { value: '01', label: '数据集合1' },
                { value: '02', label: '数据集合1' },
                { value: '03', label: '数据集合1 ' },
            ],
            satelliteName: '', //选中卫星名称
            satelliteList: [
                //卫星列表
                { value: '01', label: '卫星一' },
                { value: '02', label: '卫星二' },
                { value: '03', label: '卫星三' },
            ],
            sensorName: '', //传感器名称
            sensorList: [
                //传感器列表
                { value: '01', label: 'KBCK' },
                { value: '02', label: 'KBCJ' },
                { value: '03', label: 'HBUD' },
            ],
            dataBusiness: '', //数据业务属性
            dataBusinessList: [
                //数据业务属性列表
                { value: '01', label: '共享' },
                { value: '02', label: '独享' },
            ],
            dataShare: '', //数据共享
            dataShareList: [
                //数据共享列表
                { value: '01', label: '共享级别1' },
                { value: '02', label: '共享级别2' },
            ],
            dpi: '', //分辨率
            dpiList: [
                //分辨率列表
                { value: '01', label: '1024' },
                { value: '02', label: '1920' },
            ],
            migration: '', //迁移目的存储地
            migrationList: [
                //迁移目标列表
                { value: '01', label: '存储区A' },
                { value: '02', label: '存储区B' },
            ],
            leftTop1: '',
            leftTop1List: [
                { value: '01', label: '114.1' },
                { value: '02', label: '108.6' },
            ],
            leftTop2: '',
            leftTop2List: [
                { value: '01', label: '45' },
                { value: '02', label: '63' },
            ],
            rightBottom1: '',
            rightBottom1List: [
                { value: '01', label: '114.1' },
                { value: '02', label: '108.6' },
            ],
            rightBottom2: '',
            rightBottom2List: [
                { value: '01', label: '45' },
                { value: '02', label: '63' },
            ],
            dataDetail: [
                {
                    cgqdh: '123',
                    fbl: '30米',
                    sjgxjb: '用户级',
                    sjid: '3',
                    sjlx: '非临时区策略',
                    sjywsx: '业务属性',
                    wxdh: 'casEarth卫星',
                    数据区域: '数据区域',
                    迁移目的存储区: '存储区1',
                },
            ],
            leftTop3: '',
            leftTop4: '',
            leftTop5: '',
            locationDataHuiJiao: [
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                },
            ],
            locationDataLiuZhuan: [
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                },
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                },
            ],
            zeonInfo: '', //地区信息
            tableData: [
                {
                    id: 1,
                    date: '2016-05-03',
                    name: '高分1号',
                    address: 'PMS',
                },
            ],
            form: {
                Sjbh: '',
                jslx: '',
                name: '',
                Gxmllj: '',
                Ccwjjlj: '',
                IP: '',
                portnum: 21,
                dataurl: '',
                UserName: '',
            },
            multipleSelection: [],
            options: [
                {
                    value: '选项5',
                    label: '产品数据集3',
                },
            ],
            value5: [],
        };
    },
    mounted() {
        this.handleSearch({
            rksjkssj: this.date[0],
            rksjjssj: this.date[1],
            wxmc: this.satelliteName,
            cgqdh: this.sensorName,
            sjywsx: this.dataBusiness,
            sjgxjb: this.dataShare,
            fbl: this.dpi,
            qymdccq: this.migration,
            sjqy: this.leftTop1 + this.leftTop2 + this.rightBottom1 + this.rightBottom2,
        });
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
        //
        seeDetailsFun() {
            console.log('details');
        },
        handleDataEditFun() {
            console.log(' edit');
        },
        YeWuShuXing() {
            console.log('业务属性');
        },
        GongXiangJiBie() {
            console.log('共享级别');
        },
        //
        handleSearch() {
            this.$api.SJWHGL.queryData({
                rksjkssj: this.date[0],
                rksjjssj: this.date[1],
                wxmc: this.satelliteName,
                cgqdh: this.sensorName,
                sjywsx: this.dataBusiness,
                sjgxjb: this.dataShare,
                fbl: this.dpi,
                qymdccq: this.migration,
                sjqy: this.leftTop1 + this.leftTop2 + this.rightBottom1 + this.rightBottom2,
            })
                .then(result => {
                    console.log(result);
                    if (result.msg == 'OK') {
                        let resultArr = result.data.data;
                        let length = resultArr.length;
                        this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: 1,
                                date: '2016-05-03',
                                name: resultArr[i].wxdh,
                                address: 'PMS',
                            });
                        }
                    }
                    //    this.satelliteList=
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        handleSelectionChange1(val) {
            if (val.length > 1) {
                this.$refs.Table.clearSelection();
                this.$refs.Table.toggleRowSelection(val.pop());
            } else {
            }
        },

        handleDetail(index, row, e) {
            this.dataDetails = true;
        },

        submitQainYi() {
            this.rengon = false;
            let arr = [];
            console.log(this.multipleSelection);
            for (let i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].id);
            }
            console.log(arr);
            this.multipleSelection;
            this.$api.SJWHGL.dataMigrate({
                sjid: arr.join(','), //参数
                sjlx: '', //todo  数据类型从哪里来?
            })
                .then(result => {
                    console.log(result);
                    if (result.msg == 'OK') {
                        this.$message.success('操作成功');
                    }
                })
                .catch(err => {});
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$refs.Table.toggleRowSelection(currentRow);
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
        valueChange: function () {
            console.log(this.value5);
        },
        submitHuiJiao() {
            let arr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].id);
            }
            arr = arr.join(',');
            this.jiaohui = false;
            this.$api.SJWHGL.sjhjRgtask({
                type: '',
                Sjbh: arr,
                jslx: this.jieshou,
                name: this.form.dizhi,
                Gxmllj: this.form.path,
                Ccwjjlj: this.form.fileName2,
                IP: this.form.ip,
                portnum: this.form.port,
                dataurl: this.form.UserName,
                UserName: this.form.password,
            })
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        SubLiuZhuan() {
            let arr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].id);
            }
            arr = arr.join(',');
            this.liuzhuan = false;
            this.$api.SJWHGL.sjlzRgtask({
                Sjbh: arr,
                jslx: this.jieshou,
                name: this.form.dizhi,
                Gxmllj: this.form.path,
                Ccwjjlj: this.form.fileName2,
                IP: this.form.ip,
                portnum: this.form.port,
                dataurl: this.form.UserName,
                UserName: this.form.password,
            })
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goqingli(index, row) {
            let arr = []; //获得参数
            console.log(this.multipleSelection);
            for (let i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].id);
            }
            let temp = []; //获得tableData里所有的id
            for (let i = 0; i < this.tableData.length; i++) {
                temp.push(this.tableData[i].id);
            }
            // 二次确认删除
            this.$confirm('确定要清理吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$api.SJWHGL.dataMigrate({
                        sjid: arr.join(','), //参数
                        sjlx: '', //todo  数据类型从哪里来?
                    })
                        .then(res => {
                            console.log(res);
                            if (res.msg == 'OK') {
                                this.$message.success('清理成功');
                                //批量删除
                                for (let i = 0; i < this.multipleSelection.length; i++) {
                                    let index = temp.indexOf(this.multipleSelection[i].id);
                                    console.log(index);
                                    this.tableData.splice(index, 1);
                                }
                                //批量删除
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        saveAdd() {},
    },
};
</script>

<style>
.data-title {
    background: #ebeef5;
    padding: 5px;
}

.data-content {
    padding: 20px 0;
    /* overflow: auto; */
}
.el-date-editor.el-input {
    width: 205px;
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
