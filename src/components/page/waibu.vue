<template>
    <div class="iframeBox">
        <iframe src="https://pan.baidu.com/" id="iframe" scrolling="yes" frameborder="0" width="100%" ></iframe>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        // components: { $ },
        data () {
            return {
            }
        },
        mounted(){
            /** * iframe-高自适应显示 */
            function changeMobsfIframe(){
                const iframe = document.getElementById('iframe');
                const deviceHeight = document.body.clientHeight;
                iframe.style.height = (Number(deviceHeight) - 86) + 'px';
            }
            changeMobsfIframe();
            $(function(){
                // alert($(window).height())
            });

            /** * 使用JQ优化后iframe-高自适应显示 */
            $(function(){
                var autoHeight = $(window).height() - 86
                $('#iframe').height(autoHeight)

                $(window).resize(function() {
                    var autoHeight = $(window).height() - 86
                    $('#iframe').height(autoHeight)
                })
            });
        }
    }
</script>


<style scoped>
    .iframeBox{position:absolute;width: 100%; top:0px;left: 0px;}
</style>
