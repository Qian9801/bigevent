$.ajaxPrefilter(function (options){
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    //判断是否有/my
    if(options.url.indexOf("/my") !== -1){
      options.headers = {
        Authorization: localStorage.getItem("token"),
      };
    }

    //验证身份
    options.complete = function (xhr) {
      // console.log(xhr);
  if(xhr.responseJSON.status === 1 && xhr.responseJSON.message === "获取用户基本信息成功！"){
  localStorage.removeItem("token");
  location.href = "/home/login.html"
}
    }
  })