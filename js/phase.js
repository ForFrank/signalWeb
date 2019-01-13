/*$.ajax({
    type:"get",
    url:"data/list.json",
    dataType:"json",
    success:function(data){
        console.log(data);
        // var test1 = data.returnJson[0].list_1[0]; //循环遍历品牌表数据并赋给input
        $.each(data,function(key,item){
            $("#"+key).val(item||""); //返回结果为null时，转换成空字符串
        })
    },
    error:function(){
        alert("加载资源失败");
    }
})
function mysubmmit(){
    $.ajax({
        type: "POST",
        url: "http://localhost:3003/test",
        contentType: 'application/json',
        dataType: "json",
        data: $('#form1').serialize(),
        async: false,
        success: function(databack){
            console.log(databack);
            alert("修改成功");
        },
        error: function(request){
            console.log("修改成功");
        }
    });
};*/
/* //设置行，列
        var cols=11; //11列
        var rows=16; //16行
        var htmlstr="<tr>";
        for(i=1;i<=rows;i++){
            htmlstr+="<td class='col-sm-1'>"+i+"</td>";
            if (i<10) {
                i = "0" +i;
            };
            for(j=1;j<=cols;j++){
                if (j<10) {
                    j = "0" +j;
                };
                htmlstr+="<td class='col-sm-1'><input class='form-control' type='text' name="+"P"+i+j+" id="+"P"+i+j+"></td>";
            }
            htmlstr+="</tr>";
        }
        document.getElementById('phase1').innerHTML = htmlstr;
        $.ajax({
            type:"get",
            url:"data/list.json",
            dataType:"json",
            success:function(data){
                console.log(data);
                // var test1 = data.returnJson[0].list_1[0]; //循环遍历品牌表数据并赋给input
                $.each(data,function(key,item){
                    $("#"+key).val(item); //返回结果为null时，转换成空字符串
                })
            },
            error:function(){
                alert("加载资源失败");
            }
        });
        function mysubmmit(){
            $.ajax({
                type: "POST",
                url: "http://localhost:3003/test",
                contentType: 'application/json',
                dataType: "json",
                data: $('#form1').serialize(),
                async: false,
                success: function(databack){
                    console.log(databack);
                    alert("修改成功");
                },
                error: function(request){
                    console.log("修改成功");
                }
            });
        };
*/