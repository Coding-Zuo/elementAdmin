<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    权限管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleRoleAdd">新增角色</el-button>
                <el-button :disabled="deleteDisabled" type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-input v-model="queryParams.roleName" placeholder="请输入待查询角色" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="150" align="center"></el-table-column>
                <el-table-column label="详情" min-width="60" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleRoleEdit(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="角色权限设置" min-width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleQuanxian(scope.$index, scope.row)">数据操作权限设置</el-button>
                        <el-button type="text" @click="gongnegn(scope.$index, scope.row)">功能权限设置</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleRoleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.roleId])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-size="queryParams.pageSize"
                    :current-page="queryParams.pageIndex"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 角色添加编辑 -->
        <el-dialog :title="addOrEditTitle ? '新增角色' : '编辑角色'" :visible.sync="addOrEditVisible" width="50%">
            <el-form ref="addOrEditForm" :model="roleParamsForm" label-width="70px">
                <el-form-item prop="roleId" label="id"  style="display: none;"><el-input v-model="roleParamsForm.roleId"></el-input></el-form-item>
                <el-form-item prop="roleName" label="角色名称(必填)"><el-input v-model="roleParamsForm.roleName"></el-input></el-form-item>
                <el-form-item prop="roleDescription" label="角色描述(必填)"><el-input type="textarea" v-model="roleParamsForm.roleDescription"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditSubmit()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 数据操作权限设置 -->
        <el-dialog :title="'数据操作权限设置>>' + form.name" :visible.sync="dataQuanXianVisible" width="80%" style="padding-bottom: 20px;">
            <table class="operateMenu">
                <tr>
                    <td>查询</td>
                    <td @click="isShownOperate()">设置卫星范围</td>
                </tr>
                <tr>
                    <td>迁移</td>
                    <td @click="isShownOperate()">设置卫星范围</td>
                </tr>
                <tr>
                    <td>删除</td>
                    <td @click="isShownOperate()">设置卫星范围</td>
                </tr>
            </table>

            <div class="OperateState" v-show="isShownOperateState">
                <div style="border: 1px solid #ececec; padding: 15px;">
                    <el-row><div style="margin-bottom: 20px;">卫星名称</div></el-row>
                    <el-row>
                        <el-col :span="6"><el-input placeholder="请输入要查询卫星名称"></el-input></el-col>
                        <el-col :span="6"><el-button style="margin-left: 10px;" type="primary">查询</el-button></el-col>
                        <el-col :span="6"><div>可访问卫星列表</div></el-col>
                    </el-row>
                    <el-row style="margin-top: 20px;"><el-transfer v-model="value" :data="WXdata"></el-transfer></el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShownOperateState = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditFanWei()">确 定</el-button>
                </span>
            </div>
        </el-dialog>

        <!-- 功能权限设置 -->
        <el-dialog :title="'功能权限设置>>' + form.name" :visible.sync="gongnengVisible" width="40%">
            <div>
                <el-tree
                    expond
                    :data="functionList"
                    ref="elTree"
                    show-checkbox
                    node-key="label"
                    @check-change="handleCheckChange($event)"
                ></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="gongnengVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTree">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="数据迁移策略管理" :visible.sync="QianyiPupup">
            <table id="table" border="1" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="tableTitle">查询</td>
                    <td class="treeNode">
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox" v-show="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="tableTitle">迁移</td>
                    <td class="treeNode">
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox" v-show="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="tableTitle">删除</td>
                    <td class="treeNode">
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox" v-show="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="gongnengVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTree">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="数据生命周期策略管理" :visible.sync="ShengMingPupup">
            <table id="table" border="1" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="tableTitle">查询</td>
                    <td class="treeNode">
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox" v-show="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="tableTitle">迁移</td>
                    <td class="treeNode">
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox" v-show="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="tableTitle">删除</td>
                    <td class="treeNode">
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox" v-show="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div>
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                                >全选</el-checkbox
                            >
                            &nbsp;&nbsp;
                            <span>0级数据产品目录</span>
                            <div style="margin: 15px 0;"></div>
                            <div class="checkBox">
                                <el-checkbox-group v-model="checkedWeiXing" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in WeiXingList" :label="item" :key="item">{{ item }}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="gongnengVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTree">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 数据权限设置 -->
        <el-dialog :title="'数据权限设置>>' + form.name" :visible.sync="DatagongnengVisible1" width="60%">
            <div class="search-table">
                <div class="search-item">
                    <div style="flex: 1; border-left: 1px solid gray; text-align: center; line-height: 30px;">查询</div>
                    <div style="flex: 5; border-left: 1px solid gray; line-height: 30px;">
                        <el-checkbox v-model="checked">备选项1</el-checkbox>
                        <el-checkbox v-model="checked">备选项2</el-checkbox>
                    </div>
                    <div
                        style="
                            flex: 1;
                            border-left: 1px solid gray;
                            text-align: center;
                            line-height: 30px;
                            color: #409eff;
                            border-right: 1px solid gray;
                        "
                        @click="quanXianVisible = true"
                    >
                        设置卫星范围
                    </div>
                </div>
                <div class="search-item">
                    <div style="flex: 1; border-left: 1px solid gray; text-align: center; line-height: 30px;">下载</div>
                    <div style="flex: 5; border-left: 1px solid gray; line-height: 30px;">
                        <el-checkbox v-model="checked">备选项1</el-checkbox>
                        <el-checkbox v-model="checked">备选项2</el-checkbox>
                    </div>
                    <div
                        style="
                            flex: 1;
                            border-left: 1px solid gray;
                            text-align: center;
                            line-height: 30px;
                            color: #409eff;
                            border-right: 1px solid gray;
                        "
                        @click="quanXianVisible = true"
                    >
                        设置卫星范围
                    </div>
                </div>
                <div class="search-item">
                    <div style="flex: 1; border-left: 1px solid gray; text-align: center; line-height: 30px;">订购</div>
                    <div style="flex: 5; border-left: 1px solid gray; line-height: 30px;">
                        <el-checkbox v-model="checked">备选项1</el-checkbox>
                        <el-checkbox v-model="checked">备选项2</el-checkbox>
                    </div>
                    <div
                        style="
                            flex: 1;
                            border-left: 1px solid gray;
                            text-align: center;
                            line-height: 30px;
                            color: #409eff;
                            border-right: 1px solid gray;
                        "
                        @click="quanXianVisible = true"
                    >
                        设置卫星范围
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            // --------- 表格相关 ----------
            queryParams: {
                roleName: '',
                pageIndex: 1,
                pageSize: 10
            }, // 查询参数
            pageTotal: 100,
            deleteDisabled: true,
            tableData: [
                {
                    "id": 3,
                    "roleId": 10002,
                    "roleName": "管理员11",
                    "roleDescription": "123132",
                    "lastModifiedTime": 1593796015400
                }, {
                    "id": 4,
                    "roleId": 10004,
                    "roleName": "管理员12",
                    "roleDescription": "123132",
                    "lastModifiedTime": 1593796015400
                }
            ],
            // 新增、编辑角色数据参数
            roleParamsForm: {
                roleId: '', // 新增的时候删除roleId
                roleName: '',
                roleDescription: ''
            },
            addOrEditVisible: false, // 新增或编辑对话框
            addOrEditTitle: true, // 新增true、编辑false对话框标题
            // ---------- 数据操作权限设置 --------
            // ---------- 功能权限设置 -------
            //修改的显隐控制
            checkAll: false,
            checkBox: false,
            checkedWeiXing: [],
            WeiXingList: ['卫星1', '卫星2', '卫星3', '卫星4', '卫星5', '卫星6', '卫星7', '卫星8', '卫星9', '卫星10', '卫星11', '卫星12'],
            isIndeterminate: true,
            //
            roleName: '',
            QianyiPupup: false,
            ShengMingPupup: false,
            // roleName:this.$store.state.roleName,
            clickPupup: false,
            chickQianyi: '',
            props: {
                label: 'name',
                children: 'zones'
            },
            count: 1,
            roleId: '', //修改用户权限的接口
            isShownOperateState: false,
            checked: '',
            addForm: {
                name: '',
                address: ''
            },
            editForm: {
                name: '',
                address: ''
            },
            form: {
                name: '一级管理员'
            },
            index: '',
            row: '',
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            dataQuanXianVisible: false,
            DatagongnengVisible1: false,
            gongnengVisible: false,
            form: {},
            idx: -1,
            id: -1,
            tree: [
                {
                    id: 1,
                    label: 'CASEarth卫星',
                    children: [
                        {
                            id: 4,
                            label: '1级数据',
                            children: [
                                {
                                    id: 9,
                                    label: '1级产品'
                                },
                                {
                                    id: 10,
                                    label: '1级编目'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '2级数据',
                    children: [
                        {
                            id: 5,
                            label: '2级产品'
                        },
                        {
                            id: 6,
                            label: '2级编目'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '高级产品',
                    children: []
                },
                {
                    id: 4,
                    label: '专题产品',
                    children: []
                }
            ],
            WXdata: [],
            value: [],
            functionList: [
                //功能层级选择
                {
                    id: 1,
                    label: 'CASEarth小卫星数据管理与交换服务分系统定制软件',
                    children: [
                        {
                            id: 1,
                            label: '系统监控',
                            children: [
                                {
                                    id: 1,
                                    label: '设备监控'
                                },
                                {
                                    id: 2,
                                    label: '日志'
                                }
                            ]
                        },
                        {
                            id: 2,
                            label: '数据归档',
                            children: [
                                {
                                    id: 1,
                                    label: '已完成任务管理'
                                },
                                {
                                    id: 2,
                                    label: '在执行任务管理'
                                },
                                {
                                    id: 3,
                                    label: '待处理任务管理'
                                },
                                {
                                    id: 4,
                                    label: '资源信息配置'
                                }
                            ]
                        },
                        {
                            id: 3,
                            label: '数据维护管理',
                            children: [
                                {
                                    id: 1,
                                    label: '数据查询维护'
                                },
                                {
                                    id: 2,
                                    label: '存储区维护'
                                },
                                {
                                    id: 3,
                                    label: '数据回收站'
                                }
                            ]
                        },
                        {
                            id: 4,
                            label: '数据策略管理',
                            children: [
                                {
                                    id: 1,
                                    label: '数据流转服务策略管理'
                                },
                                {
                                    id: 2,
                                    label: '数据汇交策略管理'
                                },
                                {
                                    id: 3,
                                    label: '数据迁移策略管理'
                                },
                                {
                                    id: 4,
                                    label: '数据生命周期策略管理'
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: '门户网站管理',
                            children: [
                                {
                                    id: 1,
                                    label: '信息发布',
                                    children: [
                                        {
                                            id: 1,
                                            label: '新闻动态发布'
                                        },
                                        {
                                            id: 2,
                                            label: '通知公告发布'
                                        },
                                        {
                                            id: 3,
                                            label: '卫星介绍发布'
                                        }
                                    ]
                                },
                                {
                                    id: 2,
                                    label: '影像展厅资源配置'
                                },
                                {
                                    id: 3,
                                    label: '轮播图静态资源配置'
                                }
                            ]
                        },
                        {
                            id: 6,
                            label: '管理员权限管理',
                            children: [
                                {
                                    id: 1,
                                    label: '数据默认业务属性管理'
                                },
                                {
                                    id: 2,
                                    label: '数据操作权限管理'
                                },
                                {
                                    id: 3,
                                    label: '数据集合管理'
                                },
                                {
                                    id: 4,
                                    label: '管理员管辖数据范围配置'
                                },
                                {
                                    id: 5,
                                    label: '角色权限管理'
                                },
                                {
                                    id: 6,
                                    label: '用户角色配置'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    created() {
        this.handleSearch()
    },
    mounted() {
        this.$http
            .get(this.api.api + 'wzyhqxgl/querySearchLevel', {
                params: {
                    roleName: this.roleName
                }
            })
            .then((result) => {
                console.log(result);
                if (result.data.msg == 'OK') {
                    let resultArr = result.data.data.rows;
                    let length = resultArr.length;
                    for (let i = 1; i < length; i++) {
                        this.tableData.push({
                            id: resultArr[i].id,
                            name: resultArr[i].roleName
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        // 触发搜索角色按钮
        handleSearch() {
            this.$api.GLYQXGL.queryRole(this.queryParams).then(res => {
                if (res.code == 1) {
                    this.tableData = res.data.rows
                    this.pageTotal = res.data.Total
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 角色查询分页导航
        handlePageChange(val) {
            this.queryParams.pageIndex = val
            this.handleSearch()
        },
        // 角色多选操作
        handleSelectionChange(val) {
            this.deleteDisabled = val.length > 0 ? false : true
            this.multipleSelection = []
            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].roleId)
            }
        },
        // 批量删除角色
        delAllSelection() {
            this.handleDelete(this.multipleSelection)
        },
        // 删除角色操作
        handleDelete(ids) {
            console.log(ids);
            var that = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                that.$api.GLYQXGL.deleteRole(ids).then(res => {
                    if (res.code == 1) {
                        that.handleSearch()
                        that.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(() => {});
        },
        // 新增角色按钮
        handleRoleAdd () {
            this.addOrEditVisible = true
            this.addOrEditTitle = true
            // 新增提交需要删除id属性
            delete this.roleParamsForm.roleId
            for (let key in this.roleParamsForm) {
                this.roleParamsForm[key] = ''
            }
        },
        // 编辑角色按钮
        handleRoleEdit (row) {
            this.addOrEditVisible = true
            this.addOrEditTitle = false
            this.roleParamsForm.roleId = '' // 编辑需要加上id属性
            for (let key in this.roleParamsForm) {
                this.roleParamsForm[key] = row[key]
            }
        },
        // 新增、编辑角色信息保存提交
        addOrEditSubmit () {
            console.log(this.roleParamsForm)
            // 新增提交
            if (this.addOrEditTitle) {
                this.$api.GLYQXGL.insertRole(this.roleParamsForm).then(res => {
                    if (res.code == 1) {
                        this.handleSearch()
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.addOrEditVisible = false
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }

            // 编辑提交
            if (!this.addOrEditTitle) {
                this.$api.GLYQXGL.updateRole(this.roleParamsForm).then(res => {
                    if (res.code == 1) {
                        this.handleSearch()
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.addOrEditVisible = false
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        // ----------------以下未改-----------------
        handleCheckAllChange(val) {
            this.checkedWeiXing = val ? this.WeiXingList : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        saveEditFanWei() {
            this.isShownOperateState = false;
            this.$http
                //http://localhost:8080/?#/Characteristic   数据操作权限设置
                .post(this.api.api + 'glyqxgl/saveDataOpPrivilege', {
                    params: {
                        deleteSatelliteRange: 'WX-1 WX-2',
                        relocateSatelliteRange: 'WX-1 WX-2',
                        roleId: this.roleId,
                        searchSatelliteRange: 'WX-1 WX-2'
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }
                    //    this.satelliteList=
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        handleQuanxian() {
            this.dataQuanXianVisible = true;
            //h获取卫星列表
            this.$http
                //查询参数名称
                .get(this.api.api + 'glyqxgl/querySatelliteName', {
                    params: {
                        satelliteName: this.form.name
                    }
                })
                .then((result) => {
                    if (result.data.msg == 'OK') {
                        this.WXdata.length = 0;
                        let length = result.data.data.length;
                        let resultArr = result.data.data;
                        for (let i = 0; i < length; i++) {
                            console.log(this.WXdata);
                            this.WXdata.push({ key: i, label: resultArr[i], disabled: false });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            this.$http
                .get(this.api.api + 'glyqxgl/queryDataOpPrivilege', {
                    params: {
                        roleId: this.roleId
                    }
                })
                .then((result) => {
                    if (result.data.msg == 'OK') {
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        
        saveTree() {
            this.gongnengVisible = false;
            ///* 权限树结构数据 */
            this.$http
                //TODO wzyhqxgl/saveFuncPrivilege  post请求    该链接是一般管理员提交的链接地址，下方地址为超级管理员提交的地址；
                .post(this.api.api + 'glyqxgl/saveFuncPrivilege', {
                    params: {
                        roleId: this.roleId
                    }
                })
                .then((res) => {
                    this.$message.success(`修改权限成功`);
                    this.$set(this.tableData, this.idx, this.form);
                    console.log(/* 权限树结构数据 */ res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //功能权限设置
        gongnegn(index, row) {
            this.idx = index;
            this.form = row;
            this.gongnengVisible = true;
            this.$http
                //TODO 此处需要树形图
                // wzyhqxgl/queryFuncPrivilege    网站用户权限管理
                .get(this.api.api + 'glyqxgl/queryFuncPrivilege', {
                    params: {
                        roleId: this.roleId
                    }
                })
                .then((res) => {
                    console.log(res);
                    if ((res, data.msg == 'OK')) {
                        this.tree = res.data;
                    }
                })
                .catch((err) => {});
        },
        // 控制修改弹出层的框是否显示
        isShownOperate() {
            this.isShownOperateState = !this.isShownOperateState;
        }
    }
};
</script>

<style >
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
    text-align: center;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
    text-align: center;
}

/* .search-table {
} */

.search-item {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    height: 30px;
}
/* 自定义 */
.OperateState {
    position: absolute;
    box-shadow: 0.9em 0.9em 0.9em rgba(60, 60, 60, 0.5);
    z-index: 1;
    width: 90%;
    height: 27em;
    padding-bottom: 5em;
    border: 0.2em solid #ccc;
    background: #fefefe;
}
.OperateState > div {
    border: none !important;
}
.operateMenu {
    user-select: none;
    width: 100%;
}
.operateMenu tr {
    line-height: 2em;
    display: flex;
    justify-content: space-evenly;
}
.operateMenu tr td:nth-child(2) {
    cursor: pointer;
    color: #69a1fd;
    transition: all 0.2s;
}
.treeNode {
    display: block;
    overflow-y: scroll;
    height: 10em;
    width: 31.4em;
}
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
.treeNode .el-checkbox__label {
    width: 6em;
}
.tableTitle {
    width: 10em;
    text-align: center;
}
.checkBox {
    display: flex;
    flex-direction: column;
    width: auto;
}
.operateMenu tr td:nth-child(2):hover {
    border-bottom: 0.1em solid #69a1fd;
    line-height: 1.9em;
}
/* 覆盖原生样式 */
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
</style>
