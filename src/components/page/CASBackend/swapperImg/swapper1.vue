<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 门户网站管理</el-breadcrumb-item>
                <el-breadcrumb-item>影像展厅资源配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 影像展厅 -->
        <exhibition-hall></exhibition-hall>
        <!-- 影像 -->
        <Shadow/>
    </div>
</template>

<script>
import ExhibitionHall from './components/ExhibitionHall';
import Shadow from './components/Shadow';

export default {
    name: 'swapper',
    components: {ExhibitionHall, Shadow},
    data() {
        return {

        }
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    //
                    this.$http
                        .get(this.api.api + 'mh/delYxzt', {
                            params: {
                                id: this.idx
                            }
                        })
                        .then((result) => {
                            console.log(result);
                            if (result.data.message == '操作成功！') {
                                this.$message.success('删除成功 ！');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch((err) => {
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
        addContent(e) {
            this.eventTarget = e.srcElement.innerText;
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row, e) {
            this.eventTarget = e.srcElement.innerText;
            this.idx = index;
            this.form = row;
            this.addVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/editYxzt', {
                    params: {
                        PageNum: this.query.pageIndex, //当前页
                        PageSize: this.query.pageSize //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功 ！');
                        this.tableData.push({
                            id: 1,
                            title: this.form.title,
                            thumb: this.form.who,
                            date: '发布时间',
                            date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                        });
                        /*
                         id: 1,
                    title: 'http:192.168.1.1/ssw/wqes',
                    thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
                    date: '2020-02-02',
                    date1: '2020-02-03'*/
                        console.log(new Date().getDate());
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveAdd() {
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/saveYxzt', {
                    params: {
                        PageNum: '', //当前页
                        PageSize: '' //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功 ！');
                        this.tableData.push({
                            id: 1,
                            title: this.form.title,
                            thumb: '缩略图',
                            date: '发布时间',
                            date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveDetail() {
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/editYxzt', {
                    //内容对应的是富文本内容
                    //存数据库的时候直接存html
                    //富文本全都对应 nr
                    params: {
                        xh: '', //序号
                        bt: this.form.title, //标题
                        fbt: '', //副标题
                        tp: '', //图片
                        nr: this.content, //内容
                        fbr: this.form.who, //发布人
                        fbsj: '', //发布时间
                        gxsj: '', //更新时间
                        file: '' //文件
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功 ！');
                        this.tableData.push({
                            id: 1,
                            title: this.form.title,
                            who: this.form.who,
                            state: '成功',
                            date: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleDetail(index, row, e) {
            this.eventTarget = e.srcElement.innerText;
            this.addVisible = true;
            this.idx = index;
            this.form = row;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.$http
                .get(this.api.api + 'mh/quertYxztList', {
                    params: {
                        PageNum: val, //当前页
                        PageSize: this.query.pageSize //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.tableData.length = 0;
                        let resultArr = result.data.result.items;
                        let length = resultArr.length;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i],
                                title: resultArr[i],
                                thumb: resultArr[i],
                                date: '成功',
                                date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //影响展厅导航资源信息配置
        handlePageChangeSource(val) {
            this.$set(this.query, 'pageIndex', val);
            this.$http
                .get(this.api.api + 'mh/ ', {
                    params: {
                        PageNum: val, //当前页
                        PageSize: this.query.pageSize //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.tableData.length = 0;
                        let resultArr = result.data.result.items;
                        let length = resultArr.length;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i].xh,
                                title: resultArr[i].bt,
                                thumb: resultArr[i].fbr,
                                date: '成功',
                                date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>
