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
                <el-button type="primary" icon="el-icon-add" @click="dataVisible = true">接收地址管理</el-button>
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
                <el-table-column prop="name3" label="策略状态" align="center"></el-table-column>
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
                            停用
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
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="数据汇交策略新增" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
<!--                    <div class="data-title">卫星选择</div>-->
<!--                    <div class="">-->
<!--                        <el-row style="padding-bottom:20px;padding-top:20px;">-->
<!--                            <el-radio v-model="satellite" label="1">gas小卫星</el-radio>-->
<!--                        </el-row>-->
<!--                    </div>-->
<!--                    <div class="data-title">数据级别选择</div>-->
<!--                    <div class="">-->
<!--                        <el-row style="padding-bottom:20px;padding-top:20px;">-->
<!--                            <el-radio v-model="dataSelect" label="1">级别1</el-radio>-->
<!--                            <el-radio v-model="dataSelect" label="2">级别2</el-radio>-->
<!--                            <el-radio v-model="dataSelect" label="3">级别3</el-radio>-->
<!--                        </el-row>-->
<!--                    </div>-->
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.strategyName"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom:20px;padding-top:20px;">
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
                            <el-row style="padding-bottom:20px;">
                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                <el-col :span="12"
                                    ><el-button style="float:right;" @click="dataVisible1 = true">汇交地址</el-button></el-col
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
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑 -->
<!--        <el-dialog :visible.sync="editAddress" width="50%" title="数据汇交地址编辑">-->
<!--            <el-form :model="form" label-width="130px">-->
<!--                <div class="data-title">汇交方式选择</div>-->
<!--                <div class="data-content">-->
<!--                    <div class="content">-->
<!--                        &lt;!&ndash; 共享项目路径 &ndash;&gt;-->
<!--                        <el-row style="padding-bottom:20px;">-->
<!--                            <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>-->
<!--                            <el-col :span="12"><el-button style="float:right;" @click="dataVisible1 = true">汇交地址</el-button></el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        &lt;!&ndash; ftp &ndash;&gt;-->
<!--                        <el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="端口:"><el-input v-model="form.port=21" disabled></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
        <!-- 汇交地址 -->
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
                        <el-row style="padding-bottom:20px;">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="locationVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="addAddress" width="50%" title="数据汇交接收地址添加">
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
                        <el-row style="padding-bottom:20px;">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="locationVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

<!--        <el-dialog :visible.sync="addAddress" width="50%" title="数据汇交地址添加">-->
<!--            <el-form :model="form" label-width="130px">-->
<!--                <div class="data-content">-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="编号:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="卫星名称:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="ip地址:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="入库时间:"><el-input v-model="form.fileName" type="date"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                </div>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="addAddress = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
<!--        <el-dialog :visible.sync="editAddress" width="50%" title="数据汇交地址编辑">-->
<!--            <el-form :model="form" label-width="130px">-->
<!--                <div class="data-content">-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="编号:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="卫星名称:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="ip地址:"><el-input v-model="form.path"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-col :span="12">-->
<!--                                <el-form-item label="入库时间:"><el-input v-model="form.fileName" type="date"></el-input></el-form-item>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                </div>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="editAddress = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->
        <el-dialog :visible.sync="dataVisible" width="50%" title="数据汇交地址管理">
            <el-row>
                <el-col :span="12">
                    <el-col :span="5"><el-input placeholder="名称"></el-input></el-col>
                    <el-col :span="5" :offset="1"><el-input placeholder="ip地址"></el-input></el-col>
                    <el-col :span="7" :offset="1">
                        <!--                        <el-select v-model="inTime" placeholder="请选择">-->
                        <!--                            <el-option v-for="item in inTimeList" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                        <!--                        </el-select>-->
                        <el-date-picker
                            v-model="value1"
                            type="datetime"
                            format="yyyy-MM-dd hh:mm"
                            value-format="yyyy-MM-dd hh:mm"
                            placeholder="选择入库时间"
                            style="width: 150px"
                        >
                        </el-date-picker>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="7" :offset="1"><el-button @click="addAddress = true">添加</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>查询</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>删除</el-button></el-col>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-table
                    ref="Table"
                    @selection-change="handleSelectionChange1"
                    :data="locationData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :border="true"
                >
                    <el-table-column type="selection" @current-change="currentChange"></el-table-column>
                    <el-table-column label="编号" prop="num" width="50"></el-table-column>
                    <el-table-column prop="name" label="名称" width="100px"></el-table-column>
                    <el-table-column prop="time" label="入库时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" @click="handleDetail2(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top:20px;" type="flex" justify="end">
                <el-col>
                    <el-pagination :page-sizes="[5, 10, 15]" :page-size="100" layout="sizes, prev, pager, next" :total="5"> </el-pagination>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog :visible.sync="detailVisible" width="40%" title="数据汇交策略详情">
            <div class="detailTable">
                <!--                <el-table :data="tableData2" stripe style="width: 100%">-->
                <!--                    <el-table-column prop="idNum" label="地址编号" width="80"> </el-table-column>-->
                <!--                    <el-table-column prop="acceptType" label="接受类型" width="80"> </el-table-column>-->
                <!--                    <el-table-column prop="dataPath" label="数据路径" width="80"> </el-table-column>-->
                <!--                    <el-table-column prop="addreName" label="地址名称" width="80"> </el-table-column>-->
                <!--                    <el-table-column prop="ipName" label="ip地址" width="80"> </el-table-column>-->
                <!--                    <el-table-column prop="storeTime" label="入库时间" width="80"> </el-table-column>-->
                <!--                </el-table>-->
                <table id="t1" style="text-align: center;position: relative;left: 50%;transform: translateX(-50%)">
                    <tr>
                        <td>策略编号</td>
                        <td></td>
                        <td>策略名称</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>卫星代号</td>
                        <td></td>
                        <td>数据级别</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>策略状态</td>
                        <td></td>
                        <td>策略入库时间</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>策略更新时间</td>
                        <td></td>
                        <td>策略启用时间</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dizhixiangqing" width="40%" title="接收地址详情">
            <div class="detailTable">
                <table id="t1" style="text-align: center;position: relative;left: 50%;transform: translateX(-50%)">
                    <tr>
                        <td>地址编号</td>
                        <td></td>
                        <td>地址名称</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>接收地址类型</td>
                        <td></td>
                        <td>ip地址</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>数据路径</td>
                        <td></td>
                        <td>入库时间</td>
                        <td></td>
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
        <!-- 数据汇交策略管理 -->
        <el-dialog :visible.sync="strategicManagement" width="50%" title="数据汇交策略管理">
            <el-row>
                <el-col :span="16">
                    <el-col :span="5">
                        <el-select placeholder="数据级别"> </el-select>
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
                    <el-col :span="7" :offset="1"><el-button>查询</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>删除</el-button></el-col>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-table ref="multipleTable2" :data="locationData" tooltip-effect="dark" style="width: 100%" :border="true">
                    <el-table-column type="selection"></el-table-column>
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
            <el-row style="margin-top:20px;" type="flex" justify="end">
                <el-col>
                    <el-pagination :page-sizes="[5, 10, 15]" :page-size="100" layout="sizes, prev, pager, next" :total="5"> </el-pagination>
                </el-col>
            </el-row>
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
                        <el-row style="padding-bottom:20px;padding-top:20px;">
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
                                    <!-- <el-form-item label="端口:"><el-input v-model="(form.port = 21)" disabled></el-input></el-form-item> -->
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
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../../api/index';
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
                },
                {
                    id: 2,
                    name1: '1级策略',
                    name2: '1级产品数据',
                    name3: '已生效',
                    name4: 'CASEarth'
                },
                {
                    id: 3,
                    name1: '1级策略更新版',
                    name2: '2级数据产品',
                    name3: '已生效',
                    name4: 'CASEarth'
                },
                {
                    id: 4,
                    name1: '4级策略',
                    name2: '4级产品数据',
                    name3: '未生效',
                    name4: 'CASEarth'
                },
                {
                    id: 5,
                    name1: '4级策略最新',
                    name2: '高级产品数据',
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
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editAddress:false,
            addAddress:false,
            editVisible: false,
            editVisible1: false,
            detailVisible: false,
            dizhixiangqing:false,
            locationVisible: false,
            dataVisible: false,
            dataVisible1: false,
            getLoctaionVisible: false,
            strategicManagement: false,
            editType: '', //弹出框类型 0添加 1编辑 2详情
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '新闻动态发布请输入...'
            },
            inTime: '',
            inTimeList: [{ value: 1, label: '入库时间' }],
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
            multipleSelection2: []
        };
    },
    created() {
        // this.getData();
    },
    components: {
        quillEditor
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        handleSelectionChange1(val) {
            if (val.length > 1) {
                this.$refs.Table.clearSelection();
                this.$refs.Table.toggleRowSelection(val.pop());
            } else {
            }
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$refs.Table.toggleRowSelection(currentRow);
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要停用吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('停用成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //接收地址管理
        handleAdd() {},

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
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        //详情
        handleDetail(index, row) {
            this.detailVisible = true;
        },
        saveAdd() {},
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleEdit2() {
            this.editAddress = true;
        },
        handleDetail2() {
            this.dizhixiangqing = true;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
