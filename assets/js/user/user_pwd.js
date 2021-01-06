$(function () {
let form = layui.form;
//表单的验证
form.verify({
    //密码长度校验 
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    //原密码和新密码的校验
    newPwd: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(value === $(".oldPwd").val()){
            return "原密码和新密码不能一样"
        }
      },
    //新密码和再次确认新密码必须一致
    rePwd: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(value !== $(".newPwd").val()){
            return "两次输入的新密码不一致"
        }
      }
  });
//确认修改
$("#form").on('submit',function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type:"POST",
        url:"/my/updatepwd",
        data,
        success:function (res) {
            // console.log(res);
    if(res.status !== 0){
        return layer.msg(res.message)
    }
    layer.msg(res.message)
    $("#form")[0].reset();
        }
    })
})
})