$(function () {
let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //fileIpt

    $('#chooseImage').click(function () {
        $('#fileIpt').click();
    });

    // --------------  更换剪裁区的图片 ---------------
    // 当文件域的内容改变的时候，更换图片
    $('#fileIpt').change(function () {
        // console.log(111);
        // 1. 找到选择的图片（文件对象）
        // console.dir(this);
        let fileObj = this.files[0]; // 我们选择的图片的文件对象
        //判断
        if(!fileObj){
            return
        }
        // 2. 根据文件对象，生成一个临时的url，用于访问被选择的图片
        let url = URL.createObjectURL(fileObj);
        // console.log(url);
    
        // 3. 更换剪裁区的图片的src属性
        // - 销毁原理的剪裁区
        // - 更换图片
        // - 重新创建剪裁区
        $image.cropper('destroy').attr('src', url).cropper(options);
    });
    // ---------------  点击 确定 的时候，剪裁图片，转成base64格式，提交字符串到接口 ----------
    $('#sure').click(function () {
    // 剪裁得到一张图片（canvas图片）
    let i = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
    });
    // 把图片转成base64格式
    let str = i.toDataURL(); // 把canvas图片转成base64格式

    $.ajax({
        type:"POST",
        url:"/my/update/avatar",
        data:{
            avatar:str
        },
        success:function (res) {
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            window.parent.getUserInfo();
        }
    })

    })
    
})