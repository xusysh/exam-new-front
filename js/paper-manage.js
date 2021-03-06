
var vm = new Vue({
  el:'#app',
  data:{
    paperlist : [],
    judge_mode: false
  },
  methods:{
    control:function(action, paperid){
      postdata = {
        paperid: paperid,
        action: action
      };
      console.log(postdata);
      this.$http.post(backend_server + 'paper-manage/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('开启/关闭试题成功，试卷编号：' + dataret.paperid );
          location.reload();
        }
        else
        {
          alert('开启/关闭试题失败（1）');
          //location.reload();
        }
      },function(res){
        console.log(res.status);
        alert('开启/关闭试题失败（2）');
        //location.reload();
      });
    },
    remove:function(paperid){
      // remove paper from paper list
      postdata = {
        paperid: paperid,
        action: 'delete'
      };
      this.$http.post(backend_server + 'paper-manage/', postdata, {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          alert('删除试题成功，试卷编号：' + dataret.paperid );
          location.reload();
        }
        else
        {
          alert('删除试题失败（1）');
          //location.reload();
        }
      },function(res){
        console.log(res.status);
        alert('删除试题失败（2）');
        //location.reload();
      });
      //
    },
    detail:function(paperid){
      // redirect to show detail
      window.location.href = "paper-detail.html?paperid=" + paperid;
    },
    problem:function(paperid){
      window.location.href = "paper-problem.html?paperid=" + paperid;
    },
    judge:function(paperid){
      window.location.href = "paper-answers.html?paperid=" + paperid;
    },
    get_test_list:function(){
      this.$http.get(backend_server + 'paper-get-list-tea/', {credentials: true})
      .then(function(res){
        console.log(res.bodyText);
        var dataret = JSON.parse(res.bodyText);
        if (dataret.code == 200)
        {
          this.paperlist = dataret.list;
          console.log(this.paperlist);
        }
        else
        {
          alert('获取试题列表失败(1)');
        }
      },function(res){
        console.log(res.status);
        alert('获取试题列表失败(2)');
      });
    }
  },
  created:function(){
    this.get_test_list();
    mode = getQueryString('mode');
    if (mode == 'judge')
    {
      this.judge_mode = true;
    }
  }
})
