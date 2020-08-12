<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    数据归档
                </el-breadcrumb-item>
                <el-breadcrumb-item>资源信息配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.yxxmc" placeholder="原信息名称" class="handle-input mr10"></el-input>
                <el-input v-model="query.mmbs" placeholder="命名标识" class="handle-input mr10"></el-input>
                <el-select v-model="query.zylx" placeholder="资源类型" class="handle-select mr10">
                    <el-option v-for="(item, j) in infoTypeList" :key="j" :label="item.zylx" :value="item.sjkb"></el-option>
                </el-select>
                <el-select v-model="query.pzlx" placeholder="配置类型" class="handle-select mr10">
                    <el-option key="1" label="xml" value="xml"></el-option>
                    <el-option key="2" label="文件名" value="文件名"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent($event)">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="name" label="原信息名称" align="center"></el-table-column>
                <el-table-column prop="name1" label="命名标识" align="center"></el-table-column>
                <el-table-column prop="name2" label="资源类型" align="center"></el-table-column>
                <el-table-column prop="name3" label="数据库表" align="center"></el-table-column>
                <el-table-column prop="name4" label="数据来源" align="center"></el-table-column>
                <el-table-column prop="name5" label="资源描述" align="center"></el-table-column>
                <el-table-column prop="name6" label="配置类型" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row, $event)">编辑</el-button>
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
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="归档资源信息编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="元信息名称"><el-input v-model="form.yxxmc"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="命名标识"><el-input v-model="form.mmbs"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资源类型">
                            <el-select v-model="form.zylx" placeholder="请选择">
                                <el-option v-for="(item, j) in infoTypeList" :key="j" :label="item.zylx" :value="item.sjkb"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据库表"><el-input v-model="form.sjkb"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="配置类型">
                            <el-select v-model="form.pzlx" placeholder="请选择" @change="setTypeVal($event)">
                                <el-option v-for="item in setTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据来源"><el-input v-model="form.sjly"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资源描述">
                            <el-input v-model="form.zyms" style="height: 100px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="4">
                        <div @click="showPeizhi()" style="width: 150px; height: 35px; background: #409eff; line-height: 35px; text-align: center; color: #fff;">
                            资源信息配置
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="handleaAdFile($event)"><i class="el-icon-upload el-icon--right"></i>添加</el-button>
                    <el-table :data="watchList" border style="width: 100%; margin-top: 15px;">
                        <el-table-column prop="file" label="监控目录" align="center"> </el-table-column>
                        <el-table-column label="是否启用" align="center">
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="scope.row.isTrue"
                                    :active-value="true"
                                    :inactive-value="false"
                                    @change="changeFileSwitch(scope.row, $event)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="set" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleFileEdit(scope.$index, scope.row, $event)">编辑</el-button>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="handleFileDelete(scope.$index, scope.row)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="归档资源信息添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="元信息名称"><el-input v-model="form.yxxmc"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="命名标识"><el-input v-model="form.mmbs"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资源类型">
                            <el-select v-model="form.zylx" placeholder="请选择">
                                <el-option v-for="(item, j) in infoTypeList" :key="j" :label="item.zylx" :value="item.sjkb"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据库表"><el-input v-model="form.sjkb"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="配置类型">
                            <el-select v-model="form.pzlx" placeholder="请选择" @change="setTypeVal($event)">
                                <el-option v-for="(item, j) in setTypeList" :key="j" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据来源"><el-input v-model="form.sjly"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资源描述">
                            <el-input v-model="form.zyms" style="height: 100px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="4">
                        <div @click="showPeizhi()" style="width: 150px; height: 35px; background: #409eff; line-height: 35px; text-align: center; color: #fff;">
                            资源信息配置
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="handleaAdFile($event)"><i class="el-icon-upload el-icon--right"></i>添加</el-button>
                    <el-table :data="watchList" border style="width: 100%; margin-top: 15px;">
                        <el-table-column prop="file" label="监控目录" align="center"> </el-table-column>
                        <el-table-column label="是否启用" align="center">
                            <template slot-scope="scope">
                                <el-switch
                                    v-model="scope.row.isTrue"
                                    :active-value="true"
                                    :inactive-value="false"
                                    @change="changeFileSwitch(scope.row, $event)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="set" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleFileEdit(scope.$index, scope.row, $event)">编辑</el-button>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="handleFileDelete(scope.$index, scope.row)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加文件扫描路径 -->
        <el-dialog title="添加扫描文件路径" :visible.sync="showJKML">
            <div>
                <el-input v-model="jkml"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button v-show="eventTarget == '添加'" type="primary" @click="addScanFile()">确 定</el-button>
                <el-button v-show="eventTarget == '编辑'" type="primary" @click="EditscanFile()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 配置资源信息对话框 -->
        <el-dialog title="配置资源信息" :visible.sync="isShowHandleResInfo" width="70%">
            <div class="ResInfo">
                <!-- 配置资源信息具体内容 -->
                <h4>文件名配置信息</h4>
                <div class="btnFun">
                    <el-form style="margin: 1em 0;" :inline="inline" v-model="handleForm" class="demo-form-inline">
                        <el-form-item label="元素名称" required>
                            <el-input placeholder="元素名称" v-model="handleForm.tempEleName"></el-input>
                        </el-form-item>
                        <el-form-item label="元素间隔符" required>
                            <el-select v-model="handleForm.eleChara" placeholder="元素间隔符">
                                <el-option label="-" value="-"></el-option>
                                <el-option label="_" value="_"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-button @click="addItme()" size="small" type="primary">添加项</el-button>
                        <el-button @click="DelItme()" size="small" type="primary">删除项</el-button>
                    </el-form>
                </div>
                <div class="tableHeader">
                    <span>元素名称</span>
                    <span>数据库字段 </span>
                    <span>字段类型</span>
                    <span>元素所在位置 </span>
                </div>
                <div class="ResInfoTable" id="ResInfoTable">
                    <div></div>
                    <div v-for="(item, index) in DataArr" :key="index" style="display: flex; flex-direction: column; justify-content: space-evenly;">
                        <el-form style="margin-bottom: 0.6em;" :inline="inline" v-model="DataArr[index]" class="demo-form-inline">
                            <el-radio-group v-model="radioGroup">
                                <el-radio style="margin-bottom: 0.6em;" :label="index" @change="radio(index)">
                                    {{ DataArr[index].strName }}</el-radio
                                ></el-radio-group
                            >
                            <el-input style="margin-bottom: 0.6em;" placeholder="数据库字段" v-model="handleForm.eleDB"></el-input>
                            <el-input style="margin-bottom: 0.6em;" placeholder="字段类型" v-model="handleForm.eleName"></el-input>
                            <el-input placeholder="元素所在位置" v-model="handleForm.eleIndex"></el-input>
                        </el-form>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer" id="handelBtn">
                <el-button @click="isShowHandleResInfo = false">取 消</el-button>
                <el-button type="primary" @click="AddfileInfo()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- XML信息配置 -->
        <div id="XMLhandle">
            <el-dialog class="diaLog" title="XML信息配置" :visible.sync="isshowXMLoperate" width="70%">
                <div class="XMLoperate">
                    <el-row style="positio: relative;">
                        <span id="filepath">{{ filePath }}</span>
                        <input
                            @change="choiceFile($event)"
                            id="file"
                            type="file"
                            accept=".xml"
                            style="width: 0.1px; height: 0.1px; opacity: 0; overflow: hidden; position: absolute; z-index: -1;"
                        />
                        <label for="file">打开</label>
                        <!-- <el-button size="mini" type="primary">选择文件</el-button> -->
                        <el-button style="margin-right: 1em;" size="small" @click="dealWithXml">上传</el-button>
                        <el-select style="margin-right: 1em;" v-model="eleInfoName" placeholder="请选择元素信息名称">
                            <el-option value="1" label="name1"> </el-option>
                        </el-select>
                        <el-button size="small">复制</el-button>
                    </el-row>
                    <div class="XMLTable">
                        <div style="width: 25%; overflow-x: scroll; display: flex;">
                            <div style="width: auto; height: 20em;">
                                <p style="width: 100%; line-height: 3em; text-align: center;">XML元素标识</p>
                                <el-tree
                                    :data="data"
                                    node-key="id"
                                    :default-expand-all="true"
                                    :expand-on-click-node="false"
                                    @node-click="nodeclick"
                                    @node-drag-start="handleDragStart"
                                    @node-drag-enter="handleDragEnter"
                                    @node-drag-leave="handleDragLeave"
                                    @node-drag-over="handleDragOver"
                                    @node-drag-end="handleDragEnd"
                                    @node-drop="handleDrop"
                                    draggable
                                    :allow-drop="allowDrop"
                                    :allow-drag="allowDrag"
                                >
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <!-- 如果是编辑状态 -->
                                        <template v-if="data.isEdit == 1">
                                            <el-input
                                                ref="input"
                                                @blur="() => submitEdit(node, data)"
                                                v-model="newApiGroupName"
                                                style="height:20px line-height:20px"
                                            ></el-input>
                                        </template>
                                        <!-- 如果不是编辑状态 -->
                                        <span v-else v-text="data.name"></span>
                                        <span>
                                            <el-button v-if="data.id != 1" type="text" size="mini" @click="() => edit(node, data)">
                                                编辑
                                            </el-button>
                                            <el-button type="text" size="mini" @click="() => append(node, data)">
                                                添加
                                            </el-button>
                                            <el-button v-if="data.id != 1" type="text" size="mini" @click="() => remove(node, data)">
                                                删除
                                            </el-button>
                                        </span>
                                    </span>
                                </el-tree>
                            </div>
                        </div>
                        <ul class="right">
                            <li class="XMLHeader">
                                <span>中文含义</span>
                                <span>数据库字段</span>
                                <span>添加项</span>
                            </li>
                            <li class="XMLContent" v-for="(item, index) in data" :key="item.name">
                                <div>{{ data[index].name }}</div>
                                <div>
                                    <el-select v-model="value" placeholder="请选择字段类型">
                                        <el-option v-for="item in zdlxList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                                    </el-select>
                                </div>
                                <div><el-input></el-input></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isshowXMLoperate = false">取 消</el-button>
                    <el-button type="primary" @click="AddXMLInfo">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
//ztree
import SJGD from '@/api/api.js';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import $ from 'jquery';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'News',
    data() {
        return {
            showJKML: false,
            fileIndex: '',
            jkml: '',
            eventTarget: '',
            watchList: [
                {
                    file: '监控列表文件1',
                    isTrue: true,
                },
                {
                    file: '监控列表文件1',
                    isTrue: true,
                },
                {
                    file: '监控列表文件1',
                    isTrue: true,
                },
            ], //监控列表
            data: [
                {
                    name: 'metadata1',
                    children: [
                        {
                            name: 'metadata11',
                            children: [
                                {
                                    name: 'metadata111',
                                    label: '三级 1-1-1',
                                },
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'metadata2',
                    children: [
                        {
                            name: 'metadata21',
                            children: [
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-1',
                                },
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'metadata3',
                    children: [
                        {
                            name: 'metadata31',
                            children: [
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-1',
                                },
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'metadata4',
                    children: [
                        {
                            name: 'metadata41',
                            children: [
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-1',
                                },
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'metadata5',
                    children: [
                        {
                            name: 'metadata51',
                            children: [
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-1',
                                },
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'metadata6',
                    children: [
                        {
                            name: 'metadata61',
                            children: [
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-1',
                                },
                                {
                                    name: 'metadata',
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
            ],
            // newApiGroupName: '',
            // data: [],
            newApiGroupName: '',
            defaultProps: {
                children: 'children',
                name: 'name',
            },
            //固定数据
            radioGroup: '1',
            inline: true,
            //行内表单数据
            setType: '',
            //文件路径
            filePath: '',
            value: '',
            //文件类型
            eleInfoName: '',
            //临时数据
            radioIndex: '',
            DataArr: [
                {
                    strName: '卫星标识1',
                    strValue: ' ',
                    strType: 'String',
                    strIndex: '1',
                },
            ],
            zdlxList: [
                {
                    label: '字段类型1',
                    value: '字段类型1',
                },
                {
                    label: '字段类型2',
                    value: '字段类型2',
                },
                {
                    label: '字段类型3',
                    value: '字段类型3',
                },
            ],
            //操作行内表单
            handleForm: {
                tempEleName: '',
                eleName: '',
                eleChara: '',
                eleIndex: '',
                eleDB: '',
            },
            query: {
                yxxmc: '',
                mmbs: '',
                zylx: '',
                pzlx: '',
                pageIndex: 1,
                pageSize: 5,
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            //控制弹窗的显影
            isshowXMLoperate: true,
            editVisible: false, //
            addVisible: false,
            isShowHandleResInfo: false, //
            pageTotal: 10,
            form: {
                sjly: '',
                pzlx: '',
                sjkb: '',
                zzlx: '',
                mmbs: '',
                yxxmc: '',
                zyms: '',
                zylx: '',
                list: {
                    yxxmc: '',
                    jsml: '',
                    sfqy: '',
                    sffin: '',
                },
            },
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '新闻动态发布请输入...',
            },
            xmlFile: {},
            infoType: '',
            infoTypeList: [],
            setType: '',
            setTypeList: [
                { value: 'xml', label: 'xml' },
                { value: '文件名', label: '文件名' },
            ],
        };
        // //ztree 配置结束
    },
    components: {
        quillEditor,
    },
    mounted() {
        this.handleSearch();
    },
    methods: {
        //el-tree
        handleDragStart(node, ev) {
            console.log('drag start', node.data.name);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.data.name);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.data.name);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.data.name);
        },
        //接口数据
        // updateApiGroup(data) {
        // console.log(data);
        // updateApiGroup(1, data)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // },
        //接口数据  end
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.data.name, dropType);
            // 调后端更新
            // this.updateApiGroup(this.data);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.data.name, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.id === 1) {
                return false;
            } else {
                return true;
            }
        },
        allowDrag(draggingNode) {
            // 顶层默认分组不允许拖拽
            if (draggingNode.data.id === 1) {
                return false;
            } else {
                return true;
            }
            // return draggingNode.data.name.indexOf('三级 3-2-2') === -1
        },
        jsonToTree(jsonData) {
            let treeArr = [];
            const temp = [];
            //获取xml所有的直接属性名，并收集在数组里；
            for (const iterator of jsonData) {
                temp.push(iterator);
            }
            console.log(temp);
            for (let i = 0; i < temp.length; i++) {
                treeArr.push({});
            }
        },
        choiceFile(e) {
            console.log(e);
            this.filePath = e.srcElement.value;
            this.xmlFile = e.srcElement.files['0'];
            console.dir(this.xmlFile);
        },
        dealWithXml() {
            let file = this.xmlFile;
            let params = new FormData(); //创建formData对象；
            params.append('file', file); //向formData对象添加数据；
            // console.log(params.get('file')); //FormData私有类对象，访问不到，通过判断get值是否传进去
            this.$api.SJGD.dealWithXml(params)
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        AddXMLInfo() {
            this.isshowXMLoperate = false;
            let handleMethod;
            if (this.eventTarget == '添加') {
                handleMethod = this.$api.SJGD.insertXMLPzxx;
            } else if (this.eventTarget == '编辑') {
                handleMethod = this.$api.SJGD.editXmlPzxx;
            }
            handleMethod({
                //参数有疑问
                yxxmc: this.query,
                yszwhy: this.query,
                ysmc: this.query,
                sjkb: this.query,
                sjkzd: this.query,
                zdlx: this.query,
                yswzlj: this.query,
                ysxh: this.query,
                ysfjdxh: this.query,
            })
                .then(result => {
                    console.log(result);
                    if (result.msg == '成功') {
                        this.$message.success('XML信息' + this.eventTarget + '成功 ！');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleaAdFile(e) {
            this.eventTarget = e.srcElement.innerText;
            this.showJKML = true;
        },
        addScanFile() {
            this.showJKML = false;
            this.$http
                .post(this.api.api + 'zyxxpz/insertSMWJLJ', {
                    params: {
                        smwjlj: this.jkml,
                    },
                })
                .then(result => {
                    if (result.msg == '成功') {
                        this.watchList.push({
                            file: this.jkml,
                            isTrue: true,
                        });
                        console.log(result);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //提价修改
        EditscanFile() {
            this.showJKML = false;
            console.log(this.fileIndex);
            this.$http
                .post(this.api.api + 'zyxxpz/updateSMWJLJ', {
                    params: {
                        smwjlj: this.jkml,
                    },
                })
                .then(result => {
                    console.log(result);
                    if (result.msg == '成功') {
                        this.$message.success('编辑扫描文件路径成功！');

                        this.watchList[this.fileIndex].file = this.jkml;
                        this.watchList[this.fileIndex].isTrue = true;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        AddfileInfo() {
            this.isshowXMLoperate = false;
            let url;
            if (this.eventTarget == '添加') {
                url = 'zyxxpz/insertWJJPzxx';
            } else if (this.eventTarget == '编辑') {
                url = 'zyxxpz/editWJJPzxx';
            }
            this.$http
                //这块功能需求不太明白
                .post(this.api.api + url, {
                    params: {
                        yxxmc: '', //参数有疑问
                        ysxmgf: this.handleForm.eleChara,
                        ysxwzxh: this.handleForm.eleIndex,
                        ysmc: this.handleForm.tempEleName,
                        sjkb: this.handleForm, //参数有疑问,
                        sjkzd: this.handleForm.eleDB,
                        zdlx: this.handleForm.eleName,
                        zddyz: this.handleForm, //参数有疑问
                    },
                })
                .then(result => {
                    console.log(result);
                    if (result.msg == '成功') {
                        this.$message.success('XML信息添加成功 ！');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        append(node, data) {
            // var pid = data.parentApiGroupId + ':' + data.id
            var timestamp = new Date().getTime();
            const newChild = {
                id: timestamp,
                isEdit: 0,
                name: 'T' + timestamp,
                children: [],
            };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        edit(node, data) {
            console.log(
                'before:',
                data.id,
                // data.parentApiGroupId,
                data.name,
                data.isEdit
            );
            this.$set(data, 'isEdit', 1);
            this.newApiGroupName = data.name;
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
            console.log('after:', data.id, data.name, data.isEdit);
        },

        submitEdit(node, data) {
            // console.log('点击了保存按钮')
            if (data.name == this.newApiGroupName) {
                console.log('没有修改');
                this.newApiGroupName = '';
                this.$set(data, 'isEdit', 0);
            } else {
                this.$set(data, 'name', this.newApiGroupName);
                this.newApiGroupName = '';
                this.$set(data, 'isEdit', 0);
                // console.log('after:', data.id, data.name)
                // console.log(this.data)
                // this.updateApiGroup(this.data);
            }
        },

        cancelEdit(node, data) {
            // console.log('放弃编辑')
            // console.log(data.id, data.name)
            this.newApiGroupName = '';
            this.$set(data, 'isEdit', 0);
        },

        nodeclick(node, data, obj) {
            console.log('点击了：', node.id, node.name);
            // this.$store.dispatch('appium/changeApiGroupId', node.id);
            // console.log(this.$store.getters.apiGroupId);
        },
        // 触发搜索按钮
        handleSearch() {
            this.$api.SJGD.queryJobList({
                yxxmc: this.query.yxxmc,
                mmbs: this.query.mmbs,
                zylx: this.query.zylx,
                pzlx: this.query.pzlx,
                pageNo: this.query.pageIndex,
                pageSize: this.query.pageSize,
            }).then(res => {
                console.log(res);
                if (res.msg == '成功') {
                    console.log(res);
                    this.tableData.length = 0;
                    let resultArr = res.data.items;
                    let length = resultArr.length;
                    console.log(length);
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            name: resultArr[i].yxxmc,
                            name1: resultArr[i].mmbs,
                            name2: resultArr[i].zylx,
                            name3: resultArr[i].sjkb,
                            name4: resultArr[i].sjly,
                            name5: resultArr[i].zyms,
                            name6: resultArr[i].pzlx,
                        });
                    }
                }
            });
            //此处添加表单校验
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    //
                    this.$api.SJGD.deleteZYPZXX({
                        xh: 179, //TODO 这个参数是哪里来的？？
                        yxxmc: row.name,
                        pzlx: row.name6,
                    })
                        .then(result => {
                            console.log(result);
                            if (result.msg == '成功') {
                                this.$message.success('删除成功 ！');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    //
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        getSjkb() {
            this.$api.SJGD.getSjkb()
                .then(result => {
                    this.infoTypeList = result.data;
                    console.log(this.infoTypeList);
                })
                .catch(err => {});
        },
        addContent(e) {
            this.eventTarget = e.srcElement.innerText;
            this.getSjkb();
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row, e) {
            this.$api.SJGD.getSjkb()
                .then(result => {
                    this.infoTypeList = result.data.data;
                    console.log(this.infoTypeList);
                })
                .catch(err => {});
            this.eventTarget = e.srcElement.innerText;
            this.editVisible = true;
            this.idx = index;
            this.form.sjly = row.name4;
            this.form.pzlx = row.name6;
            this.form.sjkb = row.name3;
            this.form.zzlx = row.name2;
            this.form.mmbs = row.name1;
            this.form.yxxmc = row.name;
            this.form.zylx = row.name5;
            console.log(this.form);
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        saveAdd() {
            // onEditorChange({ editor, html, text }) {
            //     this.content = html;
            this.$api.SJGD.insertZYPZXX({
                yxxmc: this.form.yxxmc,
                mmbs: this.form.mmbs,
                zylx: this.form.zylx,
                sjkb: this.form.sjkb,
                pzlx: this.form.pzlx,
                zyms: this.form.zyms,
                sjly: this.form.sjly,
                list: this.form.list,
            })
                .then(result => {
                    console.log(result);
                    this.addVisible = false;
                    if (result.msg == '成功') {
                        this.$message({
                            type: 'success',
                            message: '添加成功',
                        });
                        this.tableData.push({
                            name: this.form.yxxmc,
                            name1: this.form.mmbs,
                            name2: this.form.zylx,
                            name3: this.form.sjkb,
                            name5: this.form.zyms,
                            name4: this.form.sjly,
                            name6: this.form.pzlx,
                        });
                        console.log(this.tableData);
                        /*
                         name: 'LANDSAT8标准产品',
                    name1: 'LANDSAT8',
                    name2: '标准产品',
                    name3: 'mssjzy_qxwxcpb',
                    name4: '历史存档数据',
                    name5: '',
                    name6: 'xml'
                        */
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.$api.SJGD.queryZYPZXXList({
                // yxxmc: this.query.yxxmc,
                // mmbs: this.query.mmbs,
                // zylx: this.query.zylx,
                // pzlx: this.query.pzlx,
                pageNo: val,
                pageSize: this.query.pageSize,
            }).then(res => {
                console.log(res);
                if (res.msg == '成功') {
                    // console.log(res);
                    let resultArr = res.data.items;
                    console.log(res.data.items);
                    let length = resultArr.length;
                    this.tableData.length = 0;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            name: resultArr[i].yxxmc,
                            name1: resultArr[i].mmbs,
                            name2: resultArr[i].zylx,
                            name3: resultArr[i].sjkb,
                            name4: resultArr[i].sjly,
                            name5: resultArr[i].zyms,
                            name5: resultArr[i].pzlx,
                        });
                    }
                }
            });
        },
        //操作行内表单
        addItme() {
            var itemObj = {
                strName: this.handleForm.tempEleName,
                // strValue: this.item.strValue,
                // strType: this.item.strType,
                strIndex: this.DataArr.length + 1,
            };
            this.$message({
                type: 'success',
                message: `添加成功！`,
            });
            this.DataArr.push(itemObj);
            this.handleForm.tempEleName = '';
        },
        handleFileEdit(index, row, e) {
            this.fileIndex = index;
            this.eventTarget = e.srcElement.innerText;
            this.showJKML = true;
            this.jkml = row.file;
        },
        handleFileDelete(index, row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    this.$http
                        .post(this.api.api + 'zyxxpz/deleteSMWJLJ', {
                            params: {
                                id: '文件id', //TODO此处的文件id是指哪个字段
                            },
                        })
                        .then(result => {
                            if (result.msg == '成功') {
                                this.$message.success('删除成功');
                                this.watchList.splice(index, 1);
                            }
                        })
                        .catch(err => {});
                })
                .catch(err => {});
        },
        DelItme() {
            if (typeof this.radioIndex == 'string') {
                this.$message({
                    type: 'info',
                    message: `请选择一项，在进行删除操作 ！`,
                });
                return;
            } else {
                this.$message({
                    type: 'success',
                    message: `删除${this.radioIndex}项成功 ！`,
                });
                this.DataArr.splice(this.radioIndex, 1);
            }
        },
        //
        radio(e) {
            this.radioIndex = e;
        },
        setTypeVal(parms) {
            switch (parms) {
                case 'xml':
                    this.setType = 'xml';
                    break;
                case '文件名':
                    this.setType = '文件名';
                    break;

                default:
                    break;
            }
        },
        showPeizhi() {
            console.log(this.setType);
            switch (this.form.pzlx) {
                case 'xml':
                    this.isshowXMLoperate = true;
                    break;

                case '文件名':
                    this.isShowHandleResInfo = true;
                    break;

                default:
                    break;
            }
        },
    },
    mounted: function () {
        this.$api.SJGD.queryZYPZXXList().then(res => {
            console.log(res);
            if (res.msg == '成功') {
                let resultArr = res.data.items;
                let length = resultArr.length;
                for (let i = 0; i < length; i++) {
                    this.tableData.push({
                        name: resultArr[i].yxxmc,
                        name1: resultArr[i].mmbs,
                        name2: resultArr[i].zylx,
                        name3: resultArr[i].sjkb,
                        name4: resultArr[i].sjly,
                        name5: resultArr[i].zyms,
                        name6: resultArr[i].pzlx,
                    });
                }
                this.pageTotal = res.data.totalNum;
            }
        });
        this.getSjkb();
    },
};
</script>
<style >
* {
    user-select: none;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 160px;
}

.handle-input {
    width: 160px;
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
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
/* 添加的样式 */
.ResInfo .optionBtn {
    border: #ccc;
    background: #ececec;
    padding: 0 0.5em;
}

.ResInfo {
    position: relative;
    width: 100%;
}
.ResInfo .tableHeader {
    text-align: center;
    color: #fff;
    z-index: 999;
    border-radius: 0.2em;
    background: #69a1fd;
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 30%;
    height: 234%;
    justify-content: space-evenly;
}
.ResInfo .tableHeader span {
    line-height: 2em;
}
/* #handelBtn {
    text-align: center;
    display: block !important;
    margin: auto !important;
    width: 50%;
    justify-content: space-between;
} */
#handelBtn button {
    margin-top: 2em;
}
.ResInfo > .ResInfoTable > div p {
    line-height: 1em;
}
.ResInfo > .ResInfoTable > div {
    height: 8.8em;
    /*表单的每一列 */
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 1em 0.5em;
    min-width: 30%;
}
.ResInfo > .ResInfoTable > div p {
    background: #ccc;
}
.ResInfoTable {
    width: 100%;
    display: flex;
    float: right; /* 使其脱离文档流 宽度为所有字元素的和 */
    /* overflow-y: hidden; */
    overflow-x: scroll;
    position: relative;
}
.ResInfoTable article {
    position: fixed;
    top: 0;
    left: 0;
}
.ResInfo > div p {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    flex: 2;
}
.ResInfo .el-form-item,
.ResInfo .el-form-item--small {
    margin-bottom: 0 !important;
}
#XMLhandle .el-dialog__body {
    position: relative;
    height: 24em;
}
#XMLhandle .XMLTable {
    width: 100%;
    position: relative;
}
#XMLhandle #treeDemo {
    list-style: none;
    background: seagreen;
    text-align: center;
    width: 25%;
    position: absolute;
    left: 0;
    top: 0;
}
#XMLhandle #treeDemo li {
    line-height: 3em;
}
#XMLhandle .right {
    width: 75%;
    position: absolute;
    right: 0;
    top: 0;
}
#XMLhandle .right li {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
#XMLhandle .XMLHeader {
    line-height: 3em;
    justify-content: space-around !important;
    display: flex;
}
#XMLhandle .XMLHeader span {
    text-align: center;
    display: block;
}
#XMLhandle .XMLContent {
    line-height: 3em;
    display: flex;
}
#XMLhandle .opreate {
    line-height: 3em;
    position: absolute;
    bottom: 0;
}
#XMLhandle .XMLContent > div {
    display: flex;
    justify-content: center;
    flex: 1;
}
#XMLhandle label {
    border-radius: 0.2em;
    margin-right: 1em;
    font-size: 1em;
    color: white;
    background-color: black;
    display: inline-block;
    width: 6em;
    line-height: 2.2em;
    text-align: center;
    background: #83b3fd;
}
#filepath {
    width: 7em;
    color: red;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    margin-right: 1em;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 20px;
}

/* 修改el-input高度，方案一： */
/* 某些预处理器(sass)无法识别>>>，建议使用方案二 */
/* >>> .el-input__inner {
  height: 20px;
} */
/* 修改el-input高度，方案二： */
.XMLTable .el-tree .el-input__inner {
    height: 20px;
}
.el-tree-node {
    display: block;
    line-height: 3em !important ;
}
</style>
