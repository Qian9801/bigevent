$(function () {
    //表单验证
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
        // console.log(value);
        if(value.length > 6){
            return "昵称只能填写1~6个字符";
        }}   
      });
      
      getInfo();

      //重置
      $("#resetBtn").on("click",function (e) {
        e.preventDefault();
        getInfo();
      })

      //提交修改
      $('.layui-form').on("submit",function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);
          $.ajax({
              type:"POST",
              url:"/my/userinfo",
              data,
              success:function (res) {
// console.log(res);
                if(res.status === 1){
                  return layer.msg("res.message")
                }
                layer.msg("res.message");
                window.parent.getUserInfo();
              }
            })
          })
          function getInfo() {
            $.ajax({
              url:"/my/userinfo",
              success:function (res) {
                //   console.log(res);
                 //给表单赋值
                form.val("userForm", res.data);
              }
          });
          }
      })

      