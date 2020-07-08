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
                <el-input v-model="query.who" placeholder="原信息名称" class="handle-input mr10"></el-input>
                <el-input v-model="query.who" placeholder="命名标识" class="handle-input mr10"></el-input>
                <el-select v-model="query.title" placeholder="资源类型" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-select v-model="query.title" placeholder="配置类型" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
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
                <!--                <el-table-column label="账户余额">-->
                <!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="头像(查看大图)" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-image-->
                <!--                            class="table-td-thumb"-->
                <!--                            :src="scope.row.thumb"-->
                <!--                            :preview-src-list="[scope.row.thumb]"-->
                <!--                        ></el-image>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="归档资源信息编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题"><el-input v-model="form.title"></el-input></el-form-item>
                <el-form-item label="作者"><el-input v-model="form.who"></el-input></el-form-item>
                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
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
                        <el-form-item label="元信息名称"><el-input v-model="form.infoName"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="命名标识"><el-input v-model="form.nameType"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资源类型">
                            <el-select v-model="infoType" placeholder="请选择">
                                <el-option
                                    v-for="item in infoTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据库表"><el-input v-model="form.dataList"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="配置类型">
                            <el-select v-model="setType" placeholder="请选择" @change="setTypeVal($event)">
                                <el-option
                                    v-for="item in setTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数据来源"><el-input v-model="form.dataIn"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资源描述">
                            <el-input v-model="form.fileWrite" style="height:100px;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="4">
                        <div
                            @click="showPeizhi()"
                            style="width: 150px;height:35px;background:#409EFF;line-height:35px;text-align:center;color:#fff;"
                        >
                            资源信息配置
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>添加</el-button>
                    <el-table :data="tableData" border style="width: 100%;margin-top:15px;">
                        <el-table-column prop="file" label="监控目录"> </el-table-column>
                        <el-table-column prop="isTrue" label="是否启用"> </el-table-column>
                        <el-table-column prop="set" label="操作"> </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 配置资源信息对话框 -->
        <el-dialog title="配置资源信息" :visible.sync="isShowHandleResInfo" width="70%">
            <div class="ResInfo">
                <!-- 配置资源信息具体内容 -->
                <h4 @click="handleTable()">文件名配置信息</h4>
                <div class="btnFun">
                    <el-form style="margin:1em 0;" :inline="inline" v-model="handleForm" class="demo-form-inline">
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
                    <div
                        v-for="(item, index) in DataArr"
                        :key="index"
                        style="display: flex;flex-direction: column;justify-content: space-evenly;"
                    >
                        <el-form style="margin-bottom:0.6em" :inline="inline" v-model="DataArr[index]" class="demo-form-inline">
                            <el-radio-group v-model="radioGroup">
                                <el-radio style="margin-bottom:0.6em" :label="index" @change="radio(index)">
                                    {{ DataArr[index].strName }}</el-radio
                                ></el-radio-group
                            >
                            <el-input style="margin-bottom:0.6em" placeholder="数据库字段" v-model="handleForm.eleDB"></el-input>
                            <el-input style="margin-bottom:0.6em" placeholder="字段类型" v-model="handleForm.eleName"></el-input>
                            <el-input placeholder="元素所在位置" v-model="handleForm.eleIndex"></el-input>
                        </el-form>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer" id="handelBtn">
                <el-button @click="isShowHandleResInfo = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- XML信息配置 -->
        <div id="XMLhandle">
            <el-dialog class="diaLog" title="XML信息配置" :visible.sync="isshowXMLoperate" width="70%">
                <div class="XMLoperate">
                    <el-row style="positio:relative; ">
                        <span id="filepath">{{ filePath }}</span>
                        <input
                            @change="choiceFile($event)"
                            id="file"
                            type="file"
                            style=" width: 0.1px; height: 0.1px; opacity: 0; overflow: hidden;position: absolute; z-index: -1;"
                        />
                        <label for="file">打开</label>
                        <!-- <el-button size="mini" type="primary">选择文件</el-button> -->
                        <el-button style="margin-right:1em" size="small">上传</el-button>
                        <el-select style="margin-right:1em" v-model="eleInfoName" multiple placeholder="请选择元素信息名称">
                            <el-option value="1" label="name1"> </el-option>
                        </el-select>
                        <el-button size="small">复制</el-button>
                    </el-row>
                    <div class="XMLTable">
                        <div style="width:25%;overflow-x:scroll;display:flex;">
                            <div style="width:auto;height:20em">
                                <p style="width:100%;line-height:3em;text-align:center">XML元素标识</p>
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
                                        <span v-else v-text="data.apiGroupName"></span>
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
                            <li class="XMLContent" v-for="(item, index) in data" :key="index">
                                <div>{{ data[index].apiGroupName }}</div>
                                <div>
                                    <el-select v-model="value" placeholder="请选择">
                                        <el-option value="1" label="选择1">
                                            <span style="float: left"></span>
                                            <span style="float: right; color: #8492a6; font-size: 13px"> </span>
                                        </el-option>
                                    </el-select>
                                </div>
                                <div>字段类型</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isshowXMLoperate = false">取 消</el-button>
                    <el-button type="primary" @click="isshowXMLoperate = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
//ztree
import { fetchData } from '../../../../api/index';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'News',
    data() {
        return {
            data: [
                {
                    apiGroupName: 'metadata1',
                    children: [
                        {
                            apiGroupName: 'metadata11',
                            children: [
                                {
                                    apiGroupName: 'metadata111',
                                    label: '三级 1-1-1'
                                },
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    apiGroupName: 'metadata2',
                    children: [
                        {
                            apiGroupName: 'metadata21',
                            children: [
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-1'
                                },
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    apiGroupName: 'metadata3',
                    children: [
                        {
                            apiGroupName: 'metadata31',
                            children: [
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-1'
                                },
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    apiGroupName: 'metadata4',
                    children: [
                        {
                            apiGroupName: 'metadata41',
                            children: [
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-1'
                                },
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    apiGroupName: 'metadata5',
                    children: [
                        {
                            apiGroupName: 'metadata51',
                            children: [
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-1'
                                },
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    apiGroupName: 'metadata6',
                    children: [
                        {
                            apiGroupName: 'metadata61',
                            children: [
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-1'
                                },
                                {
                                    apiGroupName: 'metadata',
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                }
            ],
            // newApiGroupName: '',
            // data: [],
            newApiGroupName: '',
            defaultProps: {
                children: 'children',
                apiGroupName: 'apiGroupName'
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
                    strIndex: '1'
                },
                {
                    strName: '卫星标识1',
                    strValue: '',
                    strType: 'String',
                    strIndex: '1'
                },
                {
                    strName: '卫星标识1',
                    strValue: '',
                    strType: 'String',
                    strIndex: '1'
                },
                {
                    strName: '卫星标识1',
                    strValue: '',
                    strType: 'String',
                    strIndex: '1'
                },
                {
                    strName: '卫星标识1',
                    strValue: '',
                    strType: 'String',
                    strIndex: '1'
                },
                {
                    strName: '卫星标识1',
                    strValue: '',
                    strType: 'String',
                    strIndex: '1'
                }
            ],
            //操作行内表单
            handleForm: {
                tempEleName: '',
                eleName: '',
                eleChara: '',
                eleIndex: '',
                eleDB: ''
            },
            query: {
                who: '',
                title: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    name: 'LANDSAT8标准产品',
                    name1: 'LANDSAT8',
                    name2: '标准产品',
                    name3: 'mssjzy_qxwxcpb',
                    name4: '历史存档数据',
                    name5: '',
                    name6: 'xml'
                },
                {
                    name: 'SPOT-6标准产品',
                    name1: 'SPOT-6',
                    name2: '标准产品',
                    name3: 'jksjzy_qxwxcpb',
                    name4: '历史存档数据',
                    name5: '',
                    name6: '文件名'
                }
            ],
            multipleSelection: [],
            delList: [],
            //控制弹窗的显影
            isshowXMLoperate: false,
            editVisible: false, //
            addVisible: false,
            isShowHandleResInfo: false, //
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '新闻动态发布请输入...'
            },
            infoType: '',
            infoTypeList: [
                { value: 1, label: 'xml' },
                { value: 2, label: '文件名' }
            ],
            setType: '',
            setTypeList: [
                { value: 1, label: 'xml' },
                { value: 2, label: '文件名' }
            ]
        };
        // //ztree 配置结束
    },
    created() {
        // this.getData();
    },
    components: {
        quillEditor
    },
    methods: {
        //el-tree
        handleDragStart(node, ev) {
            console.log('drag start', node.data.apiGroupName);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.data.apiGroupName);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.data.apiGroupName);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.data.apiGroupName);
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
            console.log('tree drag end: ', dropNode && dropNode.data.apiGroupName, dropType);
            // 调后端更新
            // this.updateApiGroup(this.data);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.data.apiGroupName, dropType);
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
            // return draggingNode.data.apiGroupName.indexOf('三级 3-2-2') === -1
        },

        append(node, data) {
            // var pid = data.parentApiGroupId + ':' + data.id
            var timestamp = new Date().getTime();
            const newChild = {
                id: timestamp,
                isEdit: 0,
                apiGroupName: 'T' + timestamp,
                children: []
            };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
            // this.updateApiGroup(this.data);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            // this.updateApiGroup(this.data);
        },

        edit(node, data) {
            console.log(
                'before:',
                data.id,
                // data.parentApiGroupId,
                data.apiGroupName,
                data.isEdit
            );
            this.$set(data, 'isEdit', 1);
            this.newApiGroupName = data.apiGroupName;
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
            console.log('after:', data.id, data.apiGroupName, data.isEdit);
        },

        submitEdit(node, data) {
            // console.log('点击了保存按钮')
            if (data.apiGroupName == this.newApiGroupName) {
                console.log('没有修改');
                this.newApiGroupName = '';
                this.$set(data, 'isEdit', 0);
            } else {
                this.$set(data, 'apiGroupName', this.newApiGroupName);
                this.newApiGroupName = '';
                this.$set(data, 'isEdit', 0);
                // console.log('after:', data.id, data.apiGroupName)
                // console.log(this.data)
                // this.updateApiGroup(this.data);
            }
        },

        cancelEdit(node, data) {
            // console.log('放弃编辑')
            // console.log(data.id, data.apiGroupName)
            this.newApiGroupName = '';
            this.$set(data, 'isEdit', 0);
        },

        nodeclick(node, data, obj) {
            console.log('点击了：', node.id, node.apiGroupName);
            // this.$store.dispatch('appium/changeApiGroupId', node.id);
            // console.log(this.$store.getters.apiGroupId);
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                // console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
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
        addContent() {
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
            // console.log(row);
            if (row.name6 == 'xml') {
                this.setType == 'xml';
                this.isshowXMLoperate = true;
            } else if (row.name6 == '文件名') {
                this.setType == '文件名';
                this.isShowHandleResInfo = true;
            }
            //this.addVisible = true;
            // this.editVisible = true;
            // this.idx = index;
            // this.form = row;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        saveAdd() {},
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //操作行内表单
        addItme() {
            var itemObj = {
                strName: this.handleForm.tempEleName,
                // strValue: this.item.strValue,
                // strType: this.item.strType,
                strIndex: this.DataArr.length + 1
            };
            this.$message({
                type: 'success',
                message: `添加成功！`
            });
            this.DataArr.push(itemObj);
            this.handleForm.tempEleName = '';
        },
        DelItme() {
            if (typeof this.radioIndex == 'string') {
                this.$message({
                    type: 'info',
                    message: `请选择一项，在进行删除操作 ！`
                });
                return;
            } else {
                this.$message({
                    type: 'success',
                    message: `删除${this.radioIndex}项成功 ！`
                });
                this.DataArr.splice(this.radioIndex, 1);
            }
        },
        //
        radio(e) {
            this.radioIndex = e;
        },
        setTypeVal(parms) {
            if (parms == 1) {
                this.setType = 'xml';
            } else {
                this.setType = '文件名';
            }
        },
        showPeizhi() {
            // if (this.setType == 'xml') {
            //     this.editVisible = true;
            // } else if (this.setType == '文件名') {
            //     this.isShowHandleResInfo = true;
            // }
        },
        choiceFile(e) {
            let srcElement = e.srcElement.value.length;
            let fileName = e.srcElement.value.substr(12, srcElement);
            this.filePath = fileName;
        }
    }
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
    color: #333;
    z-index: 999;
    background: #ececec;
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
