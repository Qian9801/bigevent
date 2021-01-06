let layer = layui.layer;
//点击退出出现询问框
$(".outBtn").on("click",function () {
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem("token");
        location.href = "/home/login.html";
        layer.close(index);
        
      });
})
// getUserInfo 函数可以来获取到用户的头像和昵称
getUserInfo();
function getUserInfo() {
    $.ajax({
        url:"/my/userinfo",
        
        success:function (res) {
            // console.log(res);
if(res.status === 1){
    location.href = "/home/login.html"
    return layer.msg("用户信息失效");

}
            renderUserInfo(res.data)
        }
    })
}

// renderUserInfo 函数可以实现将用户的头像和昵称渲染到页面中
function renderUserInfo(data) {
    //名字优先级
    let name = data.nickname || data.username;
    let first = name[0].toUpperCase();
    // console.log(name,first);
    $('#welcome').text("欢迎 " + name);
    //头像的处理
    if(data.user_pic){
    $('.via').hide();
    $(".layui-nav-img").attr("src", data.user_pic).show();
    }else{
        $('.via').show();
        $(".layui-nav-img").text(first).hide();
    }
}
