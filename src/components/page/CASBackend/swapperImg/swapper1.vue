<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 门户网站管理</el-breadcrumb-item>
                <el-breadcrumb-item>影像展厅资源配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 影像展厅 -->
        <exhibition-hall @handleShadow="handleShadow"></exhibition-hall>
        <!-- 影像 -->
        <Shadow ref="Shadow"></Shadow>
    </div>
</template>

<script>
import ExhibitionHall from './components/ExhibitionHall';
import Shadow from './components/Shadow';

export default {
    name: 'swapper',
    components: { ExhibitionHall, Shadow },
    methods: {
        // 操作影像
        handleShadow() {
            this.$refs.Shadow.handleShadow();
        }
    }
};
</script>
