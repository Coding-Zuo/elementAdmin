<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    数据策略管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据汇交策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.title" placeholder="数据级别" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-select v-model="query.title" placeholder="策略状态" class="handle-select mr10">
                    <el-option key="1" label="已生效" value="已生效"></el-option>
                    <el-option key="2" label="未生效" value="未生效"></el-option>
                </el-select>
                <el-select v-model="query.title" placeholder="卫星代号" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-input v-model="query.who" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-add" @click="dataLocalManage">接收地址管理</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                row-key=""
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" :selectable="isDisabled" align="center"></el-table-column>
                <el-table-column prop="id" label="编号" align="center"></el-table-column>
                <el-table-column prop="name1" label="策略名称" align="center"></el-table-column>
                <el-table-column prop="name2" label="数据级别" align="center"></el-table-column>
                <el-table-column prop="name3" label="策略状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.name3"
                            :active-value="'start'"
                            :inactive-value="'stop'"
                            @change="changeSwitch(scope.row, $event)"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="name4" label="卫星代号" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            :disabled="scope.row.name3 == '已生效'"
                            @click="handleEdit(scope.$index, scope.row)"
                            >修改</el-button
                        >
                        <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="数据汇交策略新增" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.strategyName"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom: 20px; padding-top: 20px;">
                            <el-col :span="12">
                                <el-select v-model="dataMap" placeholder="请选择">
                                    <el-option
                                        v-for="item in dataMapList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="集合内容:"><el-input v-model="form.mapValue"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="data-title">汇交方式选择</div>
                    <div class="data-content">
                        <div class="content">
                            <!-- 共享项目路径 -->
                            <el-row style="padding-bottom: 20px;">
                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                <el-col :span="12"
                                    ><el-button style="float: right;" @click="dataVisible1 = true">汇交地址</el-button></el-col
                                >
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
                            <el-row style="padding-bottom: 20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="端口:"><el-input v-model="form.port" disabled></el-input></el-form-item>
                                    <!-- <el-form-item label="端口:"><el-input v-model="(form.port = 21)" disabled></el-input></el-form-item> -->
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
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="editAddress" width="50%" title="数据汇交接收地址编辑">
            <el-form :model="form" label-width="130px">
                <div class="data-title">接收地址配置</div>
                <div class="data-content">
                    <el-col :span="12">
                        <el-form-item label="地址名称:"><el-input v-model="form.location"></el-input></el-form-item>
                    </el-col>
                </div>
                <div class="data-title">汇交方式选择</div>
                <div class="data-content">
                    <div class="content">
                        <!-- 共享项目路径 -->
                        <el-row style="padding-bottom: 20px;">
                            <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
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
                        <el-row style="padding-bottom: 20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <!-- <el-form-item label="端口:"><el-input v-model="(form.port = 21)" disabled></el-input></el-form-item> -->
                                <el-form-item label="端口:"><el-input v-model="form.port" disabled></el-input></el-form-item>
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
                <el-button @click="locationVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditaddress">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="addAddress" width="50%" title="数据汇交接收地址添加">
            <el-form :model="form" label-width="130px">
                <div class="data-title">接收地址配置</div>
                <div class="data-content">
                    <el-col :span="12">
                        <el-form-item label="地址名称:"><el-input v-model="form.name"></el-input></el-form-item>
                    </el-col>
                </div>
                <div class="data-title">汇交方式选择</div>
                <div class="data-content">
                    <div class="content">
                        <!-- 共享项目路径 -->
                        <el-row style="padding-bottom: 20px;">
                            <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="共享目录路径:"><el-input v-model="form.Gxmllj"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="存储文件夹名称:"><el-input v-model="form.Ccwjjlj"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                        <!-- ftp -->
                        <el-row style="padding-bottom: 20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="ip地址:"><el-input v-model="form.Ip"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="端口:"><el-input v-model="form.Portnum"></el-input></el-form-item>
                                <!-- <el-form-item label="端口:"><el-input v-model="(form.port = 21)" disabled></el-input></el-form-item> -->
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="存储文件夹名称:"><el-input v-model="form.Ccwjjlj"></el-input></el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="密码:"><el-input v-model="form.Password"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="用户名:"><el-input v-model="form.Username"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="locationVisible = false">取 消</el-button>
                <el-button type="primary" @click="plusAddress">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dataVisible" width="52.2%" title="数据汇交地址管理">
            <el-row>
                <el-col :span="12">
                    <el-col :span="5"><el-input placeholder="名称" v-model="form.name"></el-input></el-col>
                    <el-col :span="5" :offset="1"><el-input v-model="form.Ip" placeholder="ip地址"></el-input></el-col>
                    <el-col :span="7" :offset="1">
                        <el-date-picker
                            v-model="form.rksj"
                            type="datetime"
                            format="yyyy-MM-dd hh:mm"
                            value-format="yyyy-MM-dd hh:mm"
                            placeholder="选择入库时间"
                            style="width: 150px;"
                        >
                        </el-date-picker>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="7" :offset="1"><el-button @click="addAddress = true">添加</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>查询</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button @click="delDataAddress()">删除</el-button></el-col>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-table
                    ref="Table"
                    @selection-change="handleSelectionChange1"
                    :data="locationData"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    :border="true"
                >
                    <el-table-column type="selection" @current-change="currentChange"></el-table-column>
                    <el-table-column prop="num" label="编号" width="130px"></el-table-column>
                    <el-table-column prop="name" label="名称" width="50px"></el-table-column>
                    <el-table-column prop="time" label="入库时间" width="100px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="IP地址" width="100px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="200px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" @click="handleDetail2(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- <el-row style="margin-top: 20px;" type="flex" justify="end">
                <el-col>
                    <el-pagination :page-sizes="[5, 10, 15]" :page-size="100" layout="sizes, prev, pager, next" :total="5"> </el-pagination>
                </el-col>
            </el-row> -->
        </el-dialog>
        <el-dialog :visible.sync="detailVisible" width="40%" title="数据汇交策略详情">
            <div class="detailTable">
                <table id="t1" style="text-align: center; position: relative; left: 50%; transform: translateX(-50%);">
                    <tr>
                        <td>策略编号</td>
                        <td>{{ form.bh }}</td>
                        <td>策略名称</td>
                        <td>{{ form.name }}</td>
                    </tr>
                    <tr>
                        <td>卫星代号</td>
                        <td>{{ form.satelliteid }}</td>
                        <td>数据级别</td>
                        <td>{{ form.Level }}</td>
                    </tr>
                    <tr>
                        <td>策略状态</td>
                        <td>{{ form.clzt }}</td>
                        <td>策略入库时间</td>
                        <td>{{ form.rksj }}</td>
                    </tr>
                    <tr>
                        <td>策略更新时间</td>
                        <td>{{ form.updateTime }}</td>
                        <td>策略启用时间</td>
                        <td>{{ form.startTime }}</td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dizhixiangqing" width="40%" title="接收地址详情">
            <div class="detailTable">
                <table id="t1" style="text-align: center; position: relative; left: 50%; transform: translateX(-50%);">
                    <tr>
                        <td>地址编号</td>
                        <td>{{ form.dzbh }}</td>
                        <td>地址名称</td>
                        <td>{{ form.dzmc }}</td>
                    </tr>
                    <tr>
                        <td>接收地址类型</td>
                        <td>{{ form.jsdzlx }}</td>
                        <td>ip地址</td>
                        <td>{{ form.ip }}</td>
                    </tr>
                    <tr>
                        <td>数据路径</td>
                        <td>{{ form.path }}</td>
                        <td>入库时间</td>
                        <td>{{ form.rksj }}</td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <!-- 接收地址管理 -->
        <el-dialog :visible.sync="getLoctaionVisible" width="30%" title="接收汇交地址管理">
            <el-button type="primary" @click="strategicManagement = true"><i icon="el-icon-seeting"></i>数据汇交策略管理</el-button>
            <el-button type="primary" @click="dataVisible = true"><i icon="el-icon-seeting"></i>数据汇交接收地址管理</el-button>
        </el-dialog>

        <el-dialog :visible.sync="dataVisible1" width="50%" title="选择数据汇交地址">
            <el-row style="margin-top: 20px;">
                <el-table
                    ref="Table"
                    :data="locationData"
                    tooltip-effect="dark"
                    style="width: 100%;"
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
        <!-- 数据汇交策略管理 -->
        <el-dialog :visible.sync="strategicManagement" width="50%" title="数据汇交策略管理">
            <el-row>
                <el-col :span="16">
                    <el-col :span="5">
                        <el-select placeholder="数据级别">
                            <el-option v-for="j in 4" :key="j" :label="j" :value="j"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-select placeholder="策略状态"> </el-select>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-select placeholder="卫星代号"> </el-select>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-input placeholder="策略名称"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="7" :offset="1"><el-button @click="addVisible = true">添加</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>详情</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button @click="delDataAddress()">删除</el-button></el-col>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-table ref="multipleTable2" :data="locationData" tooltip-effect="dark" style="width: 100%;" :border="true">
                    <el-table-column type="selection" @selection-change="handleSelectionChange"></el-table-column>
                    <el-table-column prop="num" label="编号" width="50"></el-table-column>
                    <el-table-column prop="name" label="策略名称" width="100px"></el-table-column>
                    <el-table-column prop="time" label="数据级别" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="策略状态" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="卫星代号" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" @click="handleDetail2(scope.$index, scope.row)">详情</el-button>
                            <el-button size="mini" @click="handleStart(scope.$index, scope.row)">启用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!-- <el-row style="margin-top: 20px;" type="flex" justify="end">
                <el-col>
                    <el-pagination :page-sizes="[5, 10, 15]" :page-size="100" layout="sizes, prev, pager, next" :total="5"> </el-pagination>
                </el-col>
            </el-row> -->
        </el-dialog>

        <el-dialog title="数据汇交策略编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.strategyName"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom: 20px; padding-top: 20px;">
                            <el-col :span="12">
                                <el-select v-model="dataMap" placeholder="请选择">
                                    <el-option
                                        v-for="item in dataMapList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="集合内容:"><el-input v-model="form.mapValue"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="data-title">流转方式选择</div>
                    <div class="data-content">
                        <div class="content">
                            <!-- 共享项目路径 -->
                            <el-row style="padding-bottom: 20px;">
                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                <el-col :span="12">
                                    <el-button style="float: right;" @click="dataVisible1 = true">流转地址</el-button>
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
                            <el-row style="padding-bottom: 20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <!-- <el-form-item label="端口:"><el-input v-model="(form.port = 21)" disabled></el-input></el-form-item> -->
                                    <el-form-item label="端口:"><el-input v-model="form.port" disabled></el-input></el-form-item>
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
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'News',
    data() {
        return {
            query: {
                who: '',
                title: '',
                pageIndex: 1,
                pageSize: 10
            },
            radio: false, //共享目录单选框
            satellite: false, //卫星选择
            dataSelect: false, //数据级别选择
            tableData: [
                {
                    id: 1,
                    name1: '0级策略',
                    name2: '0级编目数据',
                    name3: '未生效',
                    name4: 'CASEarth'
                }
            ],
            tableData2: [
                {
                    idNum: '012',
                    acceptType: 'xxx',
                    dataPath: 'xxx',
                    addreName: 'xxx',
                    ipName: 'xxx',
                    storeTime: 'xxx'
                }
            ],
            value1: '',
            dataMap: '',
            dataMapList: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editAddress: false,
            addAddress: false,
            editVisible: false,
            editVisible1: false,
            detailVisible: false,
            dizhixiangqing: false,
            locationVisible: false,
            dataVisible: false,
            dataVisible1: false,
            getLoctaionVisible: false,
            strategicManagement: false,
            editType: '', //弹出框类型 0添加 1编辑 2详情
            pageTotal: 0,
            form: {
                satelliteid: '',
                name: '',
                Level: '',
                jsdzid: '',
                Gxmllj: '',
                Ccwjjlj: '',
                Ip: '',
                Portnum: '',
                Username: '',
                Password: '',
                type: '',
                olddzid: '',
                dzmc: '',
                jsdzlx: '',
                path: '',
                rksj: '',
                updateTime: '',
                startTime: '',
                clzt: '',
                bh: ''
            },
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '新闻动态发布请输入...'
            },
            inTime: '',
            inTimeList: [{ value: 1, label: '入库时间' }],
            locationData: []
        };
    },
    created() {
        this.handleSearch();
    },
    components: {
        quillEditor
    },
    methods: {
        handleSelectionChange1(val) {
            if (val.length > 1) {
                this.$refs.Table.clearSelection();
                this.$refs.Table.toggleRowSelection(val.pop());
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            } else {
            }
        },
        plusAddress() {
            this.addAddress = false;
            this.$api.SJCLGL.insertSJHJJSDZ({
                Type: this.form.type,
                name: this.form.name,
                Gxmllj: this.form.Gxmllj,
                Ccwjjlj: this.form.Ccwjjlj,
                IP: this.form.Ip,
                portnum: this.form.Portnum,
                dataurl: this.form.Username,
                UserName: this.form.Password
            })
                .then((result) => {
                    console.log(result);
                    // if (result.data.msg == 'OK') {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.locationData.push({
                        ip: this.form.ip, //ip 地址
                        time: '入库时间', //入库时间
                        name: this.form.location, //名称
                        num: this.form.fileName //编号
                    });
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$refs.Table.toggleRowSelection(currentRow);
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$api.SJCLGL.querySjhjcl({
                shareLevel: this.shareLevel
            })
                .then((result) => {
                    console.log(result);
                    this.tableData.length = 0;
                    let resultArr = result.data.result.items;
                    let length = resultArr.length;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            id: resultArr[i].id,
                            name1: resultArr[i].name,
                            name2: resultArr[i].level,
                            name3: resultArr[i].state == 'true' ? true : false,
                            name4: resultArr[i].satelliteid
                        });
                        console.log(this.tableData);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.SJCLGL.deleteSjhjcl({
                        Itemids: row.id
                    })
                        .then((result) => {
                            console.log(result);
                            if (result.data.message == '操作成功！') {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        dataLocalManage() {
            this.dataVisible = true;
            this.$api.SJCLGL.querySjhjjsdz({
                //todo  此处的参数
                Ip: '',
                Addtime: '',
                Name: '',
                pageNum: '',
                pageSize: '',
                Itemid: ''
            })
                .then((result) => {
                    // if (result.data.message == '操作成功！') {
                    let resultArr = result.data.result.items;
                    let length = resultArr.length;
                    this.locationData.length = 0;
                    for (let i = 0; i < length; i++) {
                        this.locationData.push({
                            time: resultArr[i].rksj,
                            name: resultArr[i].name,
                            num: resultArr[i].addtime,
                            ip: resultArr[i].ip
                        });
                    }
                    // }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        delDataAddress() {
            let arr = []; //获得参数
            console.log(this.multipleSelection);
            for (let i = 0; i < this.multipleSelection.length; i++) {
                arr.push(this.multipleSelection[i].id);
            }
            let temp = []; //获得tableData里所有的id
            for (let i = 0; i < this.locationData.length; i++) {
                temp.push(this.locationData[i].id);
            }
            // 二次确认删除

            this.$api.SJCLGL.deleteSjhjjsdz({
                sjid: arr.join(','), //参数
                sjlx: '' //todo  数据类型从哪里来?
            })
                .then((res) => {
                    console.log(res);
                    // if (res.data.msg == 'OK') {
                    this.$message.success('清理成功');
                    //批量删除
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        let index = temp.indexOf(this.multipleSelection[i].id);
                        console.log(index);
                        this.locationData.splice(index, 1);
                        console.log(this.locationData);
                        // this.$set(this.locationData, this.locationData);
                    }
                    //批量删除
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //接收地址管理
        changeSwitch(row, e) {
            this.$confirm('确定要操作吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.SJCLGL.updateSjhjcl({
                        Itemid: row.id,
                        State: e
                    })
                        .then((result) => {
                            console.log(result);
                            if (result.data.message == '操作成功！') {
                                this.$message.success('操作成功 ！');
                            } else {
                                this.$message.error('操作失败 ！');
                                row.name3 == 'stop' ? '' : (row.name3 = 'start');
                            }
                        })
                        .catch((err) => {
                            row.name3 == 'stop' ? (row.name3 = 'stop') : (row.name3 = 'start');
                            console.log(err);
                        });
                })
                .catch(() => {
                    row.name3 == 'stop' ? (row.name3 = 'stop') : (row.name3 = 'start');
                });
        },

        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        addContent() {
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.editType = '1';
            console.log(row);
            this.idx = index;
            this.form.id = row.id;
            this.form.strategyName = row.name2;
            this.form.jsdzbh = row.name4;
            this.form.jsdzbh = row.name5;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$api.SJCLGL.editSjhjcl({
                satelliteid: this.form.id,
                name: this.form.strategyName,
                Level: this.form.Level, //任务状态
                jsdzid: this.form.jsdzbh,
                Gxmllj: this.form.path,
                Ccwjjlj: this.form.fileName,
                Ip: this.form.ip,
                Portnum: this.form.port,
                Username: this.form.username,
                Password: this.form.password,
                type: this.form.type,
                olddzid: this.form.id
            })
                .then((result) => {
                    console.log(result);
                    // if (result.data.msg == 'OK') {
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    this.$set(this.tableData, this.idx, this.form);
                    this.tableData[this.idx] = {
                        id: 1,
                        name1: this.form.strategyName,
                        name2: this.form.strategyName,
                        name3: this.form.strategyName,
                        name4: this.form.strategyName
                    }; // }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveEditaddress() {
            this.$api.SJCLGL.editSjhjjsdz({
                name: this.form.strategyName,
                Gxmllj: this.form.path,
                Ccwjjlj: this.form.fileName,
                Ip: this.form.ip,
                Portnum: this.form.port,
                Username: this.form.username,
                type: this.form
            })
                .then((result) => {
                    console.log(result);
                    this.editAddress = false;
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //详情
        handleDetail(index, row) {
            this.detailVisible = true;
            console.log('此处详情接口地址未修正');
            this.$api.SJCLGL.TODOxiangqing({})
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveAdd() {
            this.addVisible = false;
            this.$api.SJCLGL.insertSJHJCL({
                satelliteid: this.form,
                name: this.form.strategyName,
                Level: this.form, //任务状态
                jsdzid: this.form.jsdzbh,
                Gxmllj: this.form.path,
                Ccwjjlj: this.form.fileName,
                Ip: this.form.ip,
                Portnum: this.form.port,
                Username: this.form.username,
                Password: this.form.password,
                type: this.form
            })
                .then((result) => {
                    console.log(result);
                    // if (result.data.msg == 'OK') {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.tableData.push({
                        id: 1,
                        name1: this.form.strategyName,
                        name2: this.form.strategyName,
                        name3: this.form.strategyName,
                        name4: this.form.strategyName
                    });
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleEdit2(index, row) {
            console.log(row);
            this.idx = index;
            //数据汇交接收地址编辑
            this.form.location = row.name;
            this.form.ip = row.ip;
            console.log(this.form.name);
            // this.form.name=row.name;
            this.editAddress = true;
        },
        handleDetail2(index, row) {
            console.log(row);
            this.dizhixiangqing = true;
            this.$api.SJCLGL.querySJIzjsdzDetails({
                id: row.num
            })
                .then((result) => {
                    let res = result.data.result.items[0];
                    this.form.dzbh = res.id;
                    this.form.dzmc = res.mane;
                    this.form.jsdzlx = res.type;
                    this.form.path = res.dataurl;
                    this.form.rksj = res.rksj;
                    this.form.ip = res.ip;
                    this.form.dzbh = res.id;
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            // this.$set(this.query, 'pageIndex', val);
            // this.$http
            //     .get(this.api.api + 'mh/quertYxztList', {
            //         params: {
            //             PageNum: val, //当前页
            //             PageSize: this.query.pageSize //当前页大小
            //         }
            //     })
            //     .then((result) => {
            //         console.log(result);
            //         if (result.data.message == '操作成功！') {
            //             this.tableData.length = 0;
            //             let resultArr = result.data.result.items;
            //             let length = resultArr.length;
            //             for (let i = 0; i < length; i++) {
            //                 this.tableData.push({
            //                     id: resultArr[i],
            //                     title: resultArr[i],
            //                     thumb: resultArr[i],
            //                     date: '成功',
            //                     date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
            //                 });
            //             }
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        },
        isDisabled(row, index) {
            if (row.name3 == '已生效') {
                return false;
            } else {
                return true;
            }
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.overflow-auto {
    overflow: auto;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}

.data-title {
    background: #ebeef5;
    padding: 5px;
}

.data-content {
    padding: 20px 0;
    overflow: auto;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.content {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 20px 0;
    overflow: auto;
}

.detailTable {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
}

.table-item {
    width: 20%;
    height: 40px;
    border-left: 1px solid gray;
    border-top: 1px solid gray;
    float: left;
    line-height: 40px;
    text-align: center;
}

.border-right {
    border-right: 1px solid gray;
}

.border-bottom {
    border-bottom: 1px solid gray;
}

.bg-blue {
    background: #409eff;
}

table {
    border-collapse: collapse;
}

table,
tr,
td {
    border: 1px solid rgb(217, 217, 217);
}

td {
    width: 100px; /*这里需要自己调整，根据自己的需求调整宽度*/
    height: 50px; /*这里需要自己调整，根据自己的需求调整高度*/
    position: relative;
}

td[class='first']:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 114px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: rgb(217, 217, 217);
    display: block;
    transform: rotate(-63deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
}

.lineUnder {
    width: 70px;
    height: 5px;
    background-color: rgb(117, 195, 223);
    position: relative;
    left: 20px;
    top: -25px;
    z-index: 1;
}
</style>
