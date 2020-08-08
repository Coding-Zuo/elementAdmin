<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    数据策略管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据流转服务策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.Level" placeholder="数据级别" class="handle-select mr10">
                    <el-option v-for="j in LevelList" :key="j" :label="j" :value="j"></el-option>
                </el-select>
                <el-select v-model="query.State" placeholder="策略状态" class="handle-select mr10">
                    <el-option label="启用" value="start"></el-option>
                    <el-option label="停用" value="stop"></el-option>
                </el-select>
                <el-select v-model="query.Satelliteid" placeholder="卫星代号" class="handle-select mr10">
                    <el-option v-for="j in WXlist" :key="j" :label="j" :value="j"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-add" @click="dataLocalManage()">接收地址管理</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
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
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" :selectable="isDisabled" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="编号" align="center"></el-table-column>
                <el-table-column prop="name1" label="策略名称" align="center"></el-table-column>
                <el-table-column prop="name2" label="数据级别" align="center"></el-table-column>
                <el-table-column prop="name3" label="策略状态" align="center"></el-table-column>
                <el-table-column prop="name4" label="卫星代号" align="center"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" :disabled="scope.row.name3 == 'start'" @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                        <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        <el-button
                            class="red"
                            @click="handleUse(scope.$index, scope.row)"
                            :type="scope.row.name3 === 'stop' ? (scope.row.state = '启用') : (scope.row.state = '停用')"
                        >
                            {{ scope.row.state }}
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
        <el-dialog title="数据流转策略新增" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.name"></el-input></el-col>
                    </div>
                    <div class="data-title">卫星代号</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.satelliteid"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom: 20px; padding-top: 20px;">
                            <el-col :span="12">
                                <el-select v-model="dataMap" placeholder="请选择">
                                    <el-option v-for="item in dataMapList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="集合内容:"><el-input v-model="form.Level"></el-input></el-form-item>
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
                                    <el-button style="float: right;" @click="dataVisible1 = true">接收地址</el-button>
                                </el-col>
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
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="数据流转策略编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.name"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom: 20px; padding-top: 20px;">
                            <el-col :span="12">
                                <el-select v-model="form.Level" placeholder="请选择">
                                    <el-option v-for="item in dataMapList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 流转地址 -->
        <el-dialog :visible.sync="dataVisible1" width="50%" title="选择数据流转地址">
            <el-row style="margin-top: 20px;">
                <el-table
                    ref="Table"
                    :data="locationData"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    @selection-change="handle_LZDZ_SelectionChange"
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
        <el-dialog :visible.sync="dataVisible" width="55%" title="数据流转地址">
            <el-row>
                <el-col :span="12">
                    <el-col :span="5"><el-input v-model="query.name" placeholder="名称"></el-input></el-col>
                    <el-col :span="5" :offset="1"><el-input v-model="query.Ip" placeholder="ip地址"></el-input></el-col>
                    <el-col :span="7" :offset="1">
                        <el-date-picker
                            v-model="query.rksj"
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
                    <el-col :span="7" :offset="1"><el-button @click="chaxunAdress">查询</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button @click="delDataAddress()">删除</el-button></el-col>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
                <el-table
                    ref="Table"
                    @selection-change="handle_LZDZ_SelectionChange"
                    :data="locationData"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    :border="true"
                >
                    <el-table-column type="selection" @current-change="currentChange"></el-table-column>
                    <el-table-column label="编号" prop="num" width="100px"></el-table-column>
                    <el-table-column prop="name" label="名称" width="50px"></el-table-column>
                    <el-table-column prop="time" label="入库时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" @click="querySjlzjsdzDetails(scope.$index, scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top: 20px;" type="flex" justify="end">
                <el-col>
                    <el-pagination
                        :page-sizes="[5, 10, 15]"
                        @size-change="LZDZsize_change"
                        @current-change="LZDZhandlePageChange"
                        layout="sizes, prev, pager, next"
                        :total="LZDZtotal"
                    >
                    </el-pagination>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="数据流转地址详情" :visible.sync="SJLZDZDetails" class="SJLZDZDetails">
            <table>
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

            <span slot="footer" class="dialog-footer">
                <el-button @click="SJLZDZDetails = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog :visible.sync="detailVisible" width="40%" title="数据流转策略详情">
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
        <!-- 流转地址管理 -->
        <el-dialog :visible.sync="getLoctaionVisible" width="30%" title="流转地址管理">
            <el-button type="primary" @click="strategicManagement = true"><i icon="el-icon-seeting"></i>数据流转策略管理</el-button>
            <el-button type="primary" @click="dataVisible = true"><i icon="el-icon-seeting"></i>数据流转地址管理</el-button>
        </el-dialog>
        <el-dialog :visible.sync="receiveAddDetails" width="45%" title="接收地址详情">
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
        <el-dialog :visible.sync="editAddress" width="50%" title="数据流转接收地址编辑">
            <!-- 此处需要读取后台的数据详情，后台提供接口 -->
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.name"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom: 20px; padding-top: 20px;">
                            <el-col :span="12">
                                <el-select v-model="form.Level" placeholder="请选择">
                                    <el-option v-for="item in dataMapList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="locationVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEditaddress">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="addAddress" width="50%" title="数据流转接收地址添加">
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
                <el-button @click="addAddress = false">取 消</el-button>
                <el-button type="primary" @click="saveAddjieshouAdd">确 定</el-button>
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
            pageNum: 1,
            pageSize: 5,
            query: {
                rksj: '',
                name: '',
                Level: '',
                jsdzid: '',
                Gxmllj: '',
                Ccwjjlj: '',
                Ip: '',
                State: '',
                Portnum: '',
                Username: '',
                Password: '',
                type: '',
            },
            LZDZtotal: 1,
            WXlist: [],
            LevelList: [],
            radio: 2, //共享目录单选框
            addVisible: false,
            editAddress: false,
            addAddress: false,
            editVisible: false,
            detailVisible: false,
            locationVisible: false,
            dataVisible: false,
            dataVisible1: false,
            receiveAddDetails: false,
            getLoctaionVisible: false,
            strategicManagement: false,
            //数据流转地址详情
            SJLZDZDetails: false,
            isShoweditSJLZDZDetails: false,
            isShowaddSJLZDZDetails: false,
            tableData: [
                {
                    id: 1,
                    name1: '0级策略',
                    name2: '0级编目数据',
                    name3: '未生效',
                    name4: 'CASEarth',
                },
            ],
            tableData2: [
                {
                    idNum: 'xxx',
                    acceptType: 'xxx',
                    dataPath: 'xxx',
                    addreName: 'xxx',
                    ipName: 'xxx',
                    storeTime: 'xxx',
                },
            ],
            multipleSelection: [],
            delList: [],
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
                dzbh: '',
                dzmc: '',
                jsdzlx: '',
                path: '',
                rksj: '',
                updateTime: '',
                startTime: '',
                clzt: '',
                bh: '',
            },
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '新闻动态发布请输入...',
            },
            dataMap: '',
            dataMapList: [
                { value: 1, label: '数据1' },
                { value: 2, label: '数据2' },
            ],
            locationData: [
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                    file: 'c:/localhost',
                    type: '共享',
                },
            ],
            multipleSelection2: [],
        };
    },
    mounted() {
        this.handleSearch({
            pageNum: this.pageNum, //must
            pageSize: this.pageSize, //must
        });
        //获取卫星列表的下拉菜单
        this.$api.SJCLGL.getWxlist()
            .then(result => {
                console.log(result);
                this.WXlist = result.result;
            })
            .catch(err => {});
        //获取数据级别下拉菜单的内容
        this.$api.SJCLGL.getLevellist()
            .then(result => {
                console.log(result);
                this.LevelList = result.result;
            })
            .catch(err => {});
    },
    components: {
        quillEditor,
    },
    methods: {
        // 触发搜索按钮
        handleSearch(pageSize, pageNum) {
            this.$api.SJCLGL.querySjlzcl({
                Level: this.query.Level,
                State: this.query.State,
                Satelliteid: this.query.Satelliteid,
                Name: this.query.name,
                pageNum: this.pageNum, //must
                pageSize: this.pageSize, //must
                Itemid: this.query.id,
            })
                .then(result => {
                    console.log(result);
                    if (result.message == '操作成功！') {
                        this.tableData.length = 0;
                        let resultArr = result.result.items;
                        let length = resultArr.length;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                // name: resultArr[i].addtime,
                                // name: resultArr[i].gxdate,
                                // name: resultArr[i].gxsj,
                                id: resultArr[i].id,
                                name2: resultArr[i].level,
                                name1: resultArr[i].name,
                                // name: resultArr[i].qydate,
                                // name: resultArr[i].qysj,
                                // name: resultArr[i].rkdate,
                                name4: resultArr[i].satelliteid,
                                // name: resultArr[i].sjjg,
                                name3: resultArr[i].state,
                            });
                        }
                        this.pageTotal = result.result.totalNum;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 删除流转策略操作
        handleDelete(index, row) {
            console.log(row);
            // 二次确认删除;
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$api.SJCLGL.deleteSjlzcl({
                        Itemids: row.id,
                    })
                        .then(result => {
                            console.log({
                                Itemids: row.id,
                            });
                            console.log(result);
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        // 多选流转策略操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit2(index, row) {
            console.log(row);
            this.idx = index;
            //数据流转接收地址编辑
            this.form.location = row.name;
            this.form.ip = row.ip;
            console.log(this.form.name);
            // this.form.name=row.name;
            this.editAddress = true;
            this.$api.SJCLGL.querySjlzjsdzDetails({
                id: row.num,
            })
                .then(result => {
                    console.log(result);
                    if (result.message == '操作成功！') {
                        let res = result.result;
                        this.form.name = res.name;
                        this.form.radio = res.type;
                        this.form.Gxmllj = res.dataurl;
                        this.form.Ccwjjlj = res.dataurl;
                        this.form.rksj = res.rksj;
                        this.form.Portnum = res.portnum;
                        this.form.Ip = res.ip;
                        this.Username = res.username;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //数据流转策略单条数据的停用，启用
        handleUse(index, row) {
            console.log(row);
            let params;
            if (row.state == '启用') {
                params = 'start';
            } else if (row.state == '停用') {
                params = 'stop';
            }
            // 二次确认删除;
            this.$confirm('确定要操作吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$api.SJCLGL.updateSjlzcl({
                        //该接口尚未调试
                        Itemid: row.id,
                        State: params,
                    })
                        .then(result => {
                            this.tableData[index].name3 = params;
                            console.log(result);
                            this.$message.success('操作成功');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        dataLocalManage() {
            this.dataVisible = true;
            this.chaxunAdress({
                Ip: this.query.Ip,
                Addtime: this.query.rksj,
                Name: this.query.name,
                pageNum: 1, //must
                pageSize: 10, //must
                Itemid: '',
            });
        },
        chaxunAdress(pageSize, pageNum) {
            pageSize = this.pageSize;
            pageNum = this.pageNum;
            this.$api.SJCLGL.querySjlzjsdz({
                //todo  此处的参数
                Ip: this.query.Ip,
                Addtime: this.query.rksj,
                Name: this.query.name,
                pageNum: pageNum, //must
                pageSize: pageSize, //must
                Itemid: '',
            })
                .then(result => {
                    if (result.message == '操作成功！') {
                        console.log(result);
                        let resultArr = result.result.items;
                        let length = resultArr.length;
                        this.locationData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.locationData.push({
                                time: resultArr[i].rksj,
                                name: resultArr[i].name,
                                num: resultArr[i].id,
                                ip: resultArr[i].ip,
                            });
                        }
                        this.LZDZtotal = result.result.totalNum;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        LZDZsize_change(pageSize) {
            console.log(pageSize);
            this.pageSize = pageSize;
            this.chaxunAdress(this.pageSize, this.pageNum);
        },
        LZDZhandlePageChange(pageNum) {
            this.pageNum = pageNum;
            this.chaxunAdress(this.pageSize, this.pageNum);
        },
        //批量删除数据接收地址操作
        delDataAddress() {
            let arr = []; //获得参数
            console.log(this.multipleSelection2);
            for (let i = 0; i < this.multipleSelection2.length; i++) {
                arr.push(this.multipleSelection2[i].num);
            }
            let temp = []; //获得tableData里所有的id
            for (let i = 0; i < this.locationData.length; i++) {
                temp.push(this.locationData[i].id);
            }
            console.log(arr.join(','));
            // 二次确认删除
            this.$api.SJCLGL.deleteSjlzjsdz({
                Itemids: arr.join(','), //参数
            })
                .then(res => {
                    console.log(res);
                    // if (res.message == 'OK') {
                    // this.$message.success('清理成功');
                    //批量删除
                    for (let i = 0; i < this.multipleSelection2.length; i++) {
                        let index = temp.indexOf(this.multipleSelection2[i].id);
                        this.locationData.splice(index, 1);
                        // this.$set(this.locationData, this.locationData);
                    }
                    //批量删除
                    // }
                })
                .catch(err => {
                    console.log(err);
                });

            /////////////////////////////////////////////////////////
        },
        saveEditaddress() {
            this.$api.SJCLGL.editSjlzjsdz({
                dataurl: this.form.Username, //此处是查看了所提供的接口文档 【非密】数据交换服务软件前后端接口示例文档.docx
                name: this.form.name,
                Gxmllj: this.form.Gxmllj,
                Ccwjjlj: this.form.Ccwjjlj,
                Ip: this.form.Ip,
                Portnum: this.form.Portnum,
                Username: this.form.Username,
                type: this.radio, //共享目录   或者  ftp
            })
                .then(result => {
                    console.log(result);
                    this.editAddress = false;
                    if (result.message == '操作成功！') {
                        this.$message.success('操作成功');
                    } else {
                        this.$message({
                            type: 'info',
                            message: result.result,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handle_LZDZ_SelectionChange(val) {
            // if (val.length > 1) {
            //     this.$refs.Table.clearSelection();
            //     this.$refs.Table.toggleRowSelection(val.pop());
            //     this.multipleSelection2 = val;
            // } else {
            this.multipleSelection2 = val;
            // }
            // console.log(val);
        },
        currentChange(currentRow, oldCurrentRow) {
            this.$refs.Table.toggleRowSelection(currentRow);
        },
        //批量删除策略
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            let arr = []; //获得参数
            for (let i = 0; i < length; i++) {
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
                    this.$api.SJCLGL.deleteSjlzcl({
                        Itemids: arr.join(','), //参数
                    })
                        .then(res => {
                            console.log(res);
                            if (res.message == '操作成功！') {
                                this.$message.success('清理成功');
                                //批量删除
                                for (let i = 0; i < this.multipleSelection.length; i++) {
                                    let index = temp.indexOf(this.multipleSelection[i].id);
                                    console.log(index);
                                    this.tableData.splice(index, 1);
                                    this.$message.success(`删除了${str}`);
                                    this.multipleSelection = [];
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
        addContent() {
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.$api.SJCLGL.querySjlzclDetails({
                id: row.id,
            }).then(result => {
                console.log(result);
                if (result.message == '操作成功！') {
                    console.log(1);
                    let res = result.result;
                    this.form.name = res.name;
                    this.form.radio = res.type;
                    this.form.Gxmllj = res.dataurl;
                    this.form.Ccwjjlj = res.dataurl;
                    this.form.Level = res.evel;
                    this.form.Portnum = res.portnum;
                    this.form.Ip = res.ip;
                    this.Username = res.username;
                }
            });
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$api.SJCLGL.editSjlzcl({
                satelliteid: this.form.satelliteid,
                name: this.form.name,
                Level: this.form.Level,
                jsdzid: this.form.jsdzid,
                Gxmllj: this.form.Gxmllj,
                Ccwjjlj: this.form.Ccwjjlj,
                Ip: this.form.Ip,
                Portnum: this.form.Portnum,
                Username: this.form.Username,
                Password: this.form.Password,
                type: this.form.type,
                id: this.form.id,
            })
                .then(result => {
                    console.log(result);
                    if (result.message == '操作成功！') {
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //数据流转策略详情
        handleDetail(index, row) {
            this.detailVisible = true;
            this.$api.SJCLGL.querySjlzclDetails({
                id: row.id,
            })
                .then(result => {
                    console.log(result);
                    let res = result.result;
                    this.form.bh = res.id;
                    this.form.name = res.name;
                    this.form.satelliteid = res.satelliteid;
                    this.form.Level = res.level;
                    this.form.clzt = res.state;
                    this.form.rksj = res.rkdate;
                    this.form.updateTime = res.gxdate;
                    this.form.startTime = res.qydate;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //数据流转接收地址查看详情
        querySjlzjsdzDetails(index, row) {
            console.log(row);
            this.SJLZDZDetails = true;
            this.$api.SJCLGL.querySjlzjsdzDetails({
                id: row.num,
            })
                .then(result => {
                    console.log(result);
                    if (result.message == '操作成功！') {
                        console.log(1);
                        let res = result.result;
                        this.form.dzbh = res.id;
                        this.form.dzmc = res.mane;
                        this.form.jsdzlx = res.type;
                        this.form.path = res.dataurl;
                        this.form.rksj = res.rksj;
                        this.form.ip = res.ip;
                        this.form.dzbh = res.id;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        saveAdd() {
            this.$api.SJCLGL.insertSJLZFWCL({
                //must
                satelliteid: this.form.satelliteid,
                // name: this.form.name,
                name: this.form.name,
                Level: this.form.Level,
                jsdzid: this.form.jsdzid, //接收地址编号
                Gxmllj: this.form.Gxmllj,
                Ccwjjlj: this.form.Ccwjjlj,
                Ip: this.form.Ip,
                Portnum: this.form.Portnum,
                Username: this.form.Username,
                Password: this.form.Password,
                type: this.form.type,
            })
                .then(result => {
                    console.log(result);
                    let message = result.message;
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: message,
                        });
                        this.tableData.push({
                            name1: this.form.name,
                            name2: this.form.Level,
                            name3: 'stop', //策略状态
                            name4: this.form.satelliteid,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        saveAddjieshouAdd() {
            this.$api.SJCLGL.insertSJLZFWJSDZ({
                //must
                Type: this.radio,
                name: this.form.name,
                Gxmllj: this.form.Gxmllj,
                Ccwjjlj: this.form.Ccwjjlj,
                IP: this.form.Ip,
                portnum: this.form.Portnum,
                dataurl: this.form.Username,
                UserName: this.form.Password,
            })
                .then(result => {
                    console.log(result);
                    this.addAddress = false;
                    if (result.result == '操作成功') {
                        this.$message({
                            type: 'success',
                            message: '添加成功',
                        });
                        this.tableData.push({
                            id: this.form.name,
                            name: this.form.address,
                        });
                    } else {
                        this.$message({
                            type: 'info',
                            message: result.result,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        // 分页导航
        handlePageChange(val) {
            this.pageNum = val;
            this.handleSearch({
                pageSize: this.pageSize, //must
                pageNum: this.pageNum, //must
            });
        },
        //禁用数据列表 策略状态为 启用 的单条数据的 选择 操作
        isDisabled(row, index) {
            if (row.name3 == 'start') {
                return false;
            } else {
                return true;
            }
        },
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
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
.SJLZDZDetails {
    width: 80%;
    margin: auto;
}
.SJLZDZDetails table {
    width: 80%;
    margin: auto;
}
.SJLZDZDetails td {
    padding: 0 1em;
    text-align: center !important;
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
