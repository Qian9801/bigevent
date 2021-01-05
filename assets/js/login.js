$(function(){
    
    $('#gotoRegister').on('click',function(){
        //登录隐藏
        $('.login').hide();
        //注册显示
        $('.register').show();
    })
    $('#gotoLogin').on('click',function(){
        //注册隐藏
        $('.register').hide();
        //登录显示
        $('.login').show();
        })
        //表单校验
        let form = layui.form;
        form.verify({
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            pass: [
              /^[\S]{6,12}$/
              ,'密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value,item){ //value：表单的值、item：表单的DOM对象
                let pwd = $(".register [name=password]").val();
                if(value !== pwd){
                    return '两次输入的密码不一致'
                }
            }
          });
          // =============点击注册===============
          let layer = layui.layer;
          
          $('#registerForm').on('submit',function(e){
                e.preventDefault();
                let data = $(this).serialize();
                console.log(data);
                $.ajax({
                    type: 'POST',
                    url:"/api/reguser",
                    data,
                    success: function(res){
                        // console.log(res);
                        if(res.status !== 0){
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        $('#gotoLogin').click();
                      
                    }
                })
          })
          //===========点击登录===================
          $('#loginForm').on('submit',function(e){
              e.preventDefault();
              let data = $(this).serialize();
              $.ajax({
                  type:'POST',
                  url:'/api/login',
                  data,
                  success:function(res){
                    //   console.log(res);
                      localStorage.setItem("data",res.token);
                      if(res.status == 1){
                          return layer.msg(res.message);
                      }
                      layer.msg(res.message, function(){
                        location.href = "/home/index.html"
                      });
                  }
              })
          })
});