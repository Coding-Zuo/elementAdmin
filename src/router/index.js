import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '数据集合管理' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '管理员管辖数据范围配置' }
                },
                {
                    path: '/table1',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '管理员管辖数据范围配置' }
                },
                {
                    path: '/table4',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '查询权限操作管理' }
                },
                {
                    path: '/table5',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '共享等级管理' }
                },
                {
                    path: '/table6',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '订购操作权限管理' }
                },
                {
                    path: '/table7',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '数据默认业务属性管理' }
                },
                {
                    path: '/table7',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '数据默认业务属性管理' }
                },
                {
                    path: '/table8',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '数据集合管理' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '管理员管辖数据范围配置' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '角色权限管理' }
                },
                {
                    path: '/form1',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '数据存储区' }
                },
                {
                    path: '/form2',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '数据迁移' }
                },
                {
                    path: '/form3',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '数据生命周期' }
                },
                {
                    path: '/form4',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '数据回收站' }
                },
                {
                    path: '/form5',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '数据查询与修改' }
                },
                {
                    // 富文本编辑器组件
                    path: '/dataMigration',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/DataFlow/strategy/dataMigration'),
                    meta: { title: '人工数据迁移' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor1',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '人工数据交汇' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor2',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '人工数据流转' }
                },
                {
                    // 富文本编辑器组件
                    path: '/News',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/Information/News.vue'),
                    meta: { title: '人工数据清理' }
                },
                {
                    // 富文本编辑器组件
                    path: '/Hangye',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/Information/Hangye.vue'),
                    meta: { title: '行业报道发布' }
                },
                {
                    // 富文本编辑器组件
                    path: '/Tongzhi',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/Information/Tongzhi.vue'),
                    meta: { title: '通知公告发布' }
                },
                {
                    // 富文本编辑器组件
                    path: '/Fagui',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/Information/Fagui.vue'),
                    meta: { title: '法规标准发布' }
                },
                {
                    // 富文本编辑器组件
                    path: '/Chanpin',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/Information/Chanpin.vue'),
                    meta: { title: '数据产品发布' }
                },
                {
                    path: '/swapper',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/swapperImg/swapper.vue'),
                    meta: { title: '轮播图静态资源配置' }
                },
                {
                    path: '/swapper1',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/swapperImg/swapper1.vue'),
                    meta: { title: '影响展厅资源配置' }
                },
                {
                    path: '/orders',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/CASBackend/orders/orders.vue'),
                    meta: { title: '订单处理' }
                },
                {
                    path: '/DataOperationAuth',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Auth/DataOperationAuth/DataOperationAuth.vue'),
                    meta: { title: '数据操作权限管理' }
                },
                {
                    path: '/SearchAuthRank',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Auth/DataOperationAuth/SearchAuthRank.vue'),
                    meta: { title: '数据操作权限管理' }
                },
                {
                    path: '/DownLoadAuthRank',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Auth/DataOperationAuth/DownLoadAuthRank.vue'),
                    meta: { title: '数据开放等级设置' }
                },
                {
                    path: '/OrderLoadAuthRank',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Auth/DataOperationAuth/OrderLoadAuthRank.vue'),
                    meta: { title: '数据业务属性设置' }
                },
                {
                    path: '/DefautAttribute',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Auth/DefautAttribute/DefaultAttribute.vue'),
                    meta: { title: '数据默认业务属性管理' }
                },
                {
                    path: '/DataCollection',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/Auth/DataCollection/DataCollection.vue'),
                    meta: { title: '数据集合管理' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown1',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: '待处理任务管理' }
                },
                {
                    // markdown组件
                    path: '/markdown2',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: '在执行任务管理' }
                },
                {
                    // markdown组件
                    path: '/markdown3',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: '待处理任务管理' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: '设备监控' }
                },
                {
                    // vue-schart组件
                    path: '/charts1',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts1.vue'),
                    meta: { title: '日志管理' }
                },
                {
                    // vue-schart组件
                    path: '/charts2',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: '文件名配置' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '订单处理' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/AdminDataScope',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/Auth/AdminDataScope/AdminDataScope.vue'),
                    meta: { title: '管理员管辖数据范围配置' }
                },
                {
                    path: '/Characteristic',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/Auth/Characteristic/Characteristic.vue'),
                    meta: { title: '角色权限管理' }
                },
                {
                    path: '/Users',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/Auth/AdminDataScope/Users.vue'),
                    meta: { title: '用户角色配置' }
                },
                {
                    path: '/Finished',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataArchiving/task/Finished.vue'),
                    meta: { title: '已完成任务' }
                },
                {
                    path: '/Implement',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataArchiving/task/Implement.vue'),
                    meta: { title: '在执行任务' }
                },
                {
                    path: '/Pending',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataArchiving/task/Pending.vue'),
                    meta: { title: '待处理任务' }
                },
                {
                    path: '/DataZip',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataArchiving/datazip/DataZip.vue'),
                    meta: { title: '资源信息配置' }
                },
                {
                    path: '/Service',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataFlow/service/Service.vue'),
                    meta: { title: '数据流转服务策略管理' }
                },
                {
                    path: '/ServiceReceiveAddress',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataFlow/address/ServiceReceiveAddress.vue'),
                    meta: { title: '数据流转服务接收地址管理' }
                },
                {
                    path: '/DataReceiveAddress',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataFlow/address/DataReceiveAddress.vue'),
                    meta: { title: '数据流转服务接收地址管理' }
                },
                {
                    path: '/strategy',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataFlow/strategy/strategy.vue'),
                    meta: { title: '数据汇交策略管理' }
                },
                {
                    path: '/storage',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataSet/storage/Storage.vue'),
                    meta: { title: '存储区维护' }
                },
                {
                    path: '/DataQuery',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataMaintenance/DataQuery/DataQuery.vue'),
                    meta: { title: '数据查询维护' }
                },
                {
                    path: '/qianyi',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataSet/storage/qianyi.vue'),
                    meta: { title: '数据迁移策略管理' }
                },
                {
                    path: '/shengming',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataSet/storage/shengming.vue'),
                    meta: { title: '数据生命周期策略管理' }
                },
                {
                    path: '/huishou',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DataSet/storage/huishou.vue'),
                    meta: { title: '数据回收站' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog1',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '信息发布' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog2',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '轮播图静态资源配置' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '流转地址选择界面', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission1',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '数据汇交策略管理', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission2',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '数据流转服务策略管理', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission3',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '数据流转服务接收地址管理', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission4',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '数据汇交服务接收地址管理', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission5',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '人工交汇服务接收地址管理', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
