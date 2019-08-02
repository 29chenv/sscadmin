//账单备份
function gamebak(msg) {
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var href = "../gamebak.aspx?t=" + __sysinfo.autoTid + "&gameIndex=" + gameIndex;
    $("body").append("<a href='" + href + "' class='hidden' id='myBak-a'><span></span></a>");
    $("#myBak-a span").click();
    $("#myBak-a").remove();
}

//热码批量操作
function hotop(category) {
    closeMiddleAll();
    $("#middleContent #hotop").remove();
    if ($("#middleContent #hotop").length == 0){


        var htmlData = ["<div id='hotop' class='acion'>"];
        // htmlData.push("<div style='float: left;width:50%; height: 800px;background: white'></div>");
        // htmlData.push("<div style='float: right;width:50%; height: 800px;background: white'></div>");

        htmlData.push("<table valign='top' class='middle-table'><thead><tr><th colspan=\"2\">批量添加热码</th></tr></thead>");
        htmlData.push("<tbody><tr><td width='50%' valign='top' style='height: 500px;text-align: left'><div id='kxnumbers' style='height: 500px;overflow-y: auto; overflow-x:hidden;'></div></td><td width='50%' valign='top' style='text-align: left' ><div id='kx_content'></div></td></tr></tbody></table>");
        htmlData.push("</div>");

        $("#middleContent").append(htmlData.join("")).show();

        var re = /^[0-9]*[1-9][0-9]*$/;
        if (!re.test(category))category = 2;

        var wz = category == 2 ? "二" : category == 3 ? "三" : "四";


        var htmlData = ["<table style='width: 100%;bottom: auto;position: inherit;border-collapse: collapse'><tbody>"];
        htmlData.push("<tr><td colspan='5'><div id='kuaixianList'>&nbsp;&nbsp;<a href='javascript:void(0)'  "+(category == 2 ? "style='color: red' class='active'" : "")+" data-action='2'>二字定</a>&nbsp;&nbsp;<a href='javascript:void(0)' "+(category == 3 ? "style='color: red' class='active'" : "")+" data-action='3'>三字定</a>&nbsp;&nbsp;<a href='javascript:void(0)' "+(category == 4 ? "style='color: red' class='active'" : "")+" data-action='4'>四字定</a></div></td></tr>");

        htmlData.push("<tr class='position-filter' >" +
            " <td  colspan='2' > " +
            "<strong class='red2'>定位置</strong> <label><input type='checkbox' positiontype='0' positionfilter='1' >除</label> <label><input type='checkbox' positiontype='0' positionfilter='0'  checked='checked'>取</label> </td> " +
            "<td  colspan='3' >" +
            " <strong class='red2'>配数全转</strong> <label><input positiontype='1' positionfilter='1' type='checkbox' >除</label> <label><input positiontype='1' positionfilter='0' type='checkbox' >取</label> </td> </tr>");

        htmlData.push("<tr><td colspan='5'>");
        if (category == 2)htmlData.push(" <input name='dw5zi' type='checkbox'> 五位二定 ");
        else if (category == 3 )htmlData.push(" <input name='dw5zi' type='checkbox'> 五位三定 ");
        else {
            htmlData.push(" <input name='dw5zi' data-index='5' type='checkbox' checked> 一五四定 ");
            htmlData.push(" <input name='dw5zi' data-index='4' type='checkbox'> 二五四定 ");
            htmlData.push(" <input name='dw5zi' data-index='3' type='checkbox'> 三五四定 ");
            htmlData.push(" <input name='dw5zi' data-index='2' type='checkbox'> 四五四定 ");
            htmlData.push(" <input name='dw5zi' data-index='1' type='checkbox'> 五五四定 ");

        }
        htmlData.push("</tr></td>");
        //定位
        htmlData.push("<tr class='fixed-input'>");
        htmlData.push("<td width='20%'>千</td>");
        htmlData.push("<td width='20%'>百</td>");
        htmlData.push("<td width='20%'>十</td>");
        htmlData.push("<td width='20%'>个</td>");
        htmlData.push("<td width='20%'>尾</td>");
        htmlData.push("</tr>");
        htmlData.push("<tr class='fixed-input'>");
        htmlData.push("<td><input name='wan' autocomplete='off' class='input input2'  type='text'></td>");
        htmlData.push("<td><input name='qian' autocomplete='off' class='input input2' type='text'></td>");
        htmlData.push("<td><input name='bai' autocomplete='off' class='input input2'  type='text'></td>");
        htmlData.push("<td><input name='shi' autocomplete='off' class='input input2'  type='text'></td>");
        htmlData.push("<td><input name='ge' autocomplete='off' class='input input2'  type='text'></td>");
        htmlData.push("</tr>");

        //配
        htmlData.push("<tr class='match-input' style='display: none'>");
        htmlData.push("<td colspan='5'>");
        htmlData.push(" <input name='pei1' autocomplete='off' class='input input2'  type='text'> 配 <input name='pei2' autocomplete='off' class='input input2'  type='text'>");

        if (category >= 3) htmlData.push(" 配 <input name='pei3' autocomplete='off' class='input input2'  type='text'>");
        if (category == 4) htmlData.push(" 配 <input name='pei4' autocomplete='off' class='input input2'  type='text'>");
        htmlData.push("</td>");
        htmlData.push("</tr>");

        htmlData.push("<tr class='hefen-filter'> <td colspan='5'> <strong class='red2'>合</strong>&nbsp;&nbsp; <strong class='red2'>分</strong> <label><input type='checkbox' hefentype='1'>除</label> <label><input type='checkbox' hefentype='0'  checked='checked'>取</label> </td> </tr>");
        htmlData.push("<tr>");
        htmlData.push("<td class='hefen-filter-item'> 1. <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <br> <input type='text' class='input input2'  maxlength='10'> </td>");
        htmlData.push("<td class='hefen-filter-item'> 2. <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <br> <input type='text' class='input input2'  maxlength='10'> </td>");
        htmlData.push("<td class='hefen-filter-item'> 3. <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <br> <input type='text' class='input input2'  maxlength='10'> </td>");
        htmlData.push("<td class='hefen-filter-item'> 4. <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <br> <input type='text' class='input input2'  maxlength='10'> </td>");
        htmlData.push("<td class='hefen-filter-item'> 5. <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <input type='checkbox'> <br> <input type='text' class='input input2'  maxlength='10'> </td>");
        htmlData.push("</tr>");

        var colspan = 5;
        if (category == 4) colspan = 2;
        //不定位合分
        htmlData.push("<tr>");
        htmlData.push("<td class='budinghe-filter' style='text-align: left' colspan='"+colspan+"' ><strong class='red2'>不定位合分</strong> <label><input type='checkbox' budinghetype='2' >两数合</label> ");
        if (category == 3 || category == 4){
            htmlData.push("<label><input type='checkbox' budinghetype='3'  >三数合</label>");
        }
        htmlData.push("&nbsp;&nbsp; <input type='text' class='input input2' maxlength='10'>");
        if (category == 4){
            htmlData.push("<td class='zhi-filter-range' colspan='3'>");
            htmlData.push("<strong class='red2'>值 范 围</strong> 从 ");
            htmlData.push("<input type='text' class='input input2' name='zhifanwei1'  maxlength='10'> 值 至 ");
            htmlData.push("<input type='text' class='input input2' name='zhifanwei2'  maxlength='10'>");

            htmlData.push("</td>");
        }
        htmlData.push("</tr>");

        //全转 上奖 排除 乘号位置
        htmlData.push("<tr>");
        htmlData.push("<td colspan='5' style='text-align: left'>");
        htmlData.push("<strong class='red2'>全转</strong> <input type='text' class='input input2' name='quanzhuan' maxlength=\"10\">");
        htmlData.push("&nbsp;<strong class='red2'>上奖</strong> <input type='text' class='input input2' name='shangjiang' maxlength=\"10\">");
        htmlData.push("&nbsp;<strong class='red2'>排除</strong> <input type='text' class='input input2' name='paichu' maxlength=\"10\">");
        if (category != 4)htmlData.push("&nbsp;<strong class='red2'>乘号位置</strong><input type='checkbox' class='symbol-filter-item' name='0'>&nbsp;<input type='checkbox' class='symbol-filter-item' name='1'>&nbsp;<input type='checkbox' class='symbol-filter-item' name='2'>&nbsp;<input type='checkbox' class='symbol-filter-item' name='3'>&nbsp;<input type='checkbox' class='symbol-filter-item' name='4'>");
        htmlData.push("</td>");
        htmlData.push("</tr>");


        //含 复式
        htmlData.push("<tr>");
        htmlData.push("<td colspan='5' class='contain-filter' style='text-align: left'>");
        htmlData.push("<label><input type='checkbox' containfilter='1' >&nbsp;除</label>");
        htmlData.push("&nbsp;<label><input type='checkbox' containfilter='0' >&nbsp;取</label>");
        htmlData.push(" "+wz+"字定含 <input type='text' class='input input2' name='han' maxlength='10'>");
        htmlData.push(" "+wz+"字定复式 <input type='text' class='input input2' name='fushi' maxlength='10'>");
        htmlData.push("</td>");
        htmlData.push("</tr>");

        //双重
        htmlData.push("<tr>");
        htmlData.push("<td colspan='5' style='text-align: left'>");
        htmlData.push("<label><input type='checkbox' class='repeat-two-words-filter' repeatwordsfilter='1' >&nbsp;除</label>");
        htmlData.push("&nbsp;<label><input type='checkbox' class='repeat-two-words-filter' repeatwordsfilter='0'>&nbsp;取</label>");
        htmlData.push("(<strong class='red2'>双重</strong>)");

        if (category == 4){
            htmlData.push("&nbsp;&nbsp;<label><input type='checkbox' class='repeat-double-words-filter' repeatwordsfilter='1' >&nbsp;除</label>");
            htmlData.push("&nbsp;<label><input type='checkbox' class='repeat-double-words-filter' repeatwordsfilter='0' >&nbsp;取</label>");
            htmlData.push("(<strong class='red2'>双双重</strong>)");
        }

        if (category >= 3){
            htmlData.push("&nbsp;&nbsp;<label><input type='checkbox' class='repeat-three-words-filter' repeatwordsfilter='1'>&nbsp;除</label>");
            htmlData.push("&nbsp;<label><input type='checkbox' class='repeat-three-words-filter' repeatwordsfilter='0'>&nbsp;取</label>");
            htmlData.push("(<strong class='red2'>三重</strong>)");
        }

        if (category == 4){
            htmlData.push("&nbsp;&nbsp;<label><input type='checkbox' class='repeat-four-words-filter' repeatwordsfilter='1'>&nbsp;除</label>");
            htmlData.push("&nbsp;<label><input type='checkbox' class='repeat-four-words-filter' repeatwordsfilter='0'>&nbsp;取</label>");
            htmlData.push("(<strong class='red2'>四重</strong>)");
        }

        htmlData.push("</td>");
        htmlData.push("</tr>");

        //兄弟
        htmlData.push("<tr>");
        htmlData.push("<td colspan='5' style='text-align: left'>");
        htmlData.push("<label><input class='two-brother-filter' brotherfilter='1' type='checkbox' >&nbsp;除</label>");
        htmlData.push("&nbsp;<label><input class='two-brother-filter' brotherfilter='0' type='checkbox' >&nbsp;取</label>");
        htmlData.push("(<strong class='red2'>二兄弟</strong>)");

        if (category >= 3 ){
            htmlData.push("&nbsp;&nbsp;<label><input class='three-brother-filter' brotherfilter='1' type='checkbox' >&nbsp;除</label>");
            htmlData.push("&nbsp;<label><input class='three-brother-filter' brotherfilter='0' type='checkbox' >&nbsp;取</label>");
            htmlData.push("(<strong class='red2'>三兄弟</strong>)");
        }

        if (category == 4){
            htmlData.push("&nbsp;&nbsp;<label><input class='four-brother-filter' brotherfilter='1' type='checkbox' >&nbsp;除</label>");
            htmlData.push("&nbsp;<label><input class='four-brother-filter' brotherfilter='0' type='checkbox' >&nbsp;取</label>");
            htmlData.push("(<strong class='red2'>四兄弟</strong>)");
        }

        htmlData.push("</td>");
        htmlData.push("</tr>");

        //对数
        htmlData.push("<tr>");
        htmlData.push("<td colspan='5' style='text-align: left'>");
        htmlData.push("<label><input class='logarithm-number-filter' logarithmnumberfilter='1' type='checkbox' >&nbsp;除</label>");
        htmlData.push("&nbsp;<label><input class='logarithm-number-filter' logarithmnumberfilter='0' type='checkbox' >&nbsp;取</label>");
        htmlData.push("(<strong class='red2'>对数</strong>)");
        htmlData.push("&nbsp;<input type='text' class='input input2' name='duishu1'  maxlength='2'>");
        htmlData.push("&nbsp;<input type='text' class='input input2' name='duishu2'  maxlength='2'>");
        htmlData.push("&nbsp;<input type='text' class='input input2' name='duishu3'  maxlength='2'>");
        htmlData.push("</td>");
        htmlData.push("</tr>");

        //单双
        htmlData.push("<tr>");
        htmlData.push("<td colspan='5' style='text-align: left'>");
        htmlData.push("<label><input type='checkbox' class='odd-number-filter' oddnumberfilter='1'>&nbsp;除</label>");
        htmlData.push("&nbsp;<label><input type='checkbox' class='odd-number-filter' oddnumberfilter='0'>&nbsp;取</label>");
        htmlData.push("(<strong class='red2'>单</strong>)");
        htmlData.push("&nbsp;<input type='checkbox' class='odd-number-item'>&nbsp;<input type='checkbox' class='odd-number-item'>&nbsp;<input type='checkbox' class='odd-number-item'>&nbsp;<input type='checkbox' class='odd-number-item'>&nbsp;<input type='checkbox' class='odd-number-item'>");

        htmlData.push(" &nbsp;&nbsp;&nbsp;&nbsp;<label><input class='even-number-filter' evennumberfilter='1' type='checkbox' >&nbsp;除</label>");
        htmlData.push("&nbsp;<label><input type='checkbox' class='even-number-filter' evennumberfilter='0'>&nbsp;取</label>");
        htmlData.push("(<strong class='red2'>双</strong>)");
        htmlData.push("&nbsp;<input type='checkbox' class='even-number-item'>&nbsp;<input type='checkbox' class='even-number-item'>&nbsp;<input type='checkbox' class='even-number-item'>&nbsp;<input type='checkbox' class='even-number-item'>&nbsp;<input type='checkbox' class='even-number-item'>");

        htmlData.push("</td>");
        htmlData.push("</tr>");

        htmlData.push("<tr><td colspan='5'>");
        htmlData.push("<input name='create-number' class='btn hotBtn disSubmit' type='button' value='生成'>")
        htmlData.push("&nbsp;&nbsp;<input name='reset-number' class='btn grayBtn' type='button' value='重置'>");
        htmlData.push("&nbsp;&nbsp;<input name='submit-number' class='btn grayBtn' type='button' value='提交'>");
        htmlData.push("&nbsp;&nbsp;<input name='rainfall' type='number' value=''>");
        htmlData.push("&nbsp;&nbsp;笔数：<span id='number-size'></span>");
        htmlData.push("&nbsp;&nbsp;会员帐号：<input name='username' type='text' value=''>");
        htmlData.push("</td></tr>");

        htmlData.push("<tbody></table>");


        $("#kx_content").html(htmlData.join(""));

    }else {
        $("#middleContent #hotop").show();
    }

    kuaiXuanClick();
}
function kuaiXuanClick() {

    $("#kx_content input[type='text']").keyup(function () {
        if ($(this).attr("name") != "username")
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });

    $("#kx_content tr.position-filter input").unbind("change").change(function () {
        var positiontype = $(this).attr("positiontype");
        var positionfilter = $(this).attr("positionfilter");
        $("#kx_content tr.position-filter input").attr("checked",false);
        $(this).attr("checked","checked");

        if (positiontype == 0){
            $("#kx_content tr.fixed-input").attr("style","");
            $("#kx_content tr.match-input").attr("style","display: none");
            $("#kx_content tr.match-input input[type='text']").val('');
        }else {
            $("#kx_content tr.fixed-input").attr("style","display: none");
            $("#kx_content tr.match-input").attr("style","");
            $("#kx_content tr.fixed-input input[type='text']").val('');

        }
    });


    $("#kx_content tr.hefen-filter input").unbind("change").change(function () {
        $("#kx_content tr.hefen-filter input").attr("checked",false);
        $(this).attr("checked","checked");
    });

    $("#kx_content td.budinghe-filter input[type='checkbox']").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content td.budinghe-filter input[type='checkbox']").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    //contain-filter
    $("#kx_content td.contain-filter input[type='checkbox']").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content td.contain-filter input[type='checkbox']").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content  input.repeat-two-words-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.repeat-two-words-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.repeat-three-words-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.repeat-three-words-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.repeat-four-words-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.repeat-four-words-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.repeat-double-words-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.repeat-double-words-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });


    $("#kx_content input.two-brother-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.two-brother-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.three-brother-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.three-brother-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.four-brother-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.four-brother-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.logarithm-number-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.logarithm-number-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.odd-number-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.odd-number-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input.even-number-filter").unbind("change").change(function () {

        if ($(this).attr("checked") == "checked"){
            $("#kx_content input.even-number-filter").attr("checked",false);
            $(this).attr("checked","checked");
        }
    });


    $("#kuaixianList a[data-action]").unbind("click").click(function () {

        var dataAction = $(this).attr("data-action");

        $("#kuaixianList a.active").removeClass("active");
        $("#kuaixianList a").attr("style","");

        $(this).addClass("active");
        $(this).attr("style","color:red");

        hotop(dataAction);

    });
    $("#kx_content input[name='reset-number']").unbind("click").click(function () {

        var category = $("#kuaixianList a.active ").attr("data-action");
        hotop(category);
    });

    $("#kx_content input[name='submit-number']").unbind("click").click(function () {

        var rainfall =  $("#kx_content input[name='rainfall']").val();
        if (rainfall.length == 0 && parseFloat(rainfall) <= 0){
            G.alert({ content: "请输入降水值", ok: function () { return true; } });
            return;
        }

        var numberArr = [];
        $("#kxnumbers").find("td").each(function () {
            var number = $(this).html();
            var type = getDWTypeByName(number);
            if (type > 0)numberArr.push( type);
        });

        if (numberArr.length == 0){
            G.alert({ content: "请输入号码", ok: function () { return true; } });

            return;
        }

        var username = $("#kx_content input[name='username']").val();

        G.mask();
        G.ajax("hotop&data=" + numberArr.join(",") + "&rainfall=" + rainfall + "&username=" + username,function (json) {
            G.maskClose();
            if (json.result == 1){
                G.alert({ content: "提交成功", ok: function () { return true; } });
                $("#kxnumbers").html("");
            }else {
                G.alert({ content: "提交失败", ok: function () { return true; } });

            }

        },function () {
            G.maskClose();
        });


    });

    $("#kx_content input[name='dw5zi']").unbind("click").click(function () {

        if ($("#kuaixianList  a.active").attr("data-action") == 4){
            var checks = document.getElementsByName("dw5zi");

            for( var i=0;i<checks.length;i++){
                checks[i].checked=false;
            }
            $(this).attr("checked","checked");
        }
    });

    $("#kx_content input[name='create-number']").unbind("click").click(function () {
        var positiontype = $("#kx_content tr.position-filter input:checked").attr("positiontype");
        var positionfilter = $("#kx_content tr.position-filter input:checked").attr("positionfilter");
        var category = $("#kuaixianList a.active").attr("data-action");

        //五位
        var dw5zi = 0;
        if (category == 4){
            var obj = $("#kx_content input[name='dw5zi']:checked");
            if (obj) dw5zi = obj.attr("data-index");

        } else dw5zi =  $("#kx_content input[name='dw5zi']").attr("checked") == "checked" ? 1 : 0;

        //生成号码数字
        var createNumberArr = [];
        //是否有输入条件
        var inputCondition = false;
        //全部号码
        var allNumberArr = [];
        //定位置
        if (positiontype == 0){

            var wan = $("#kx_content tr.fixed-input input[name='wan']").val();
            var qian = $("#kx_content tr.fixed-input input[name='qian']").val();
            var bai = $("#kx_content tr.fixed-input input[name='bai']").val();
            var shi = $("#kx_content tr.fixed-input input[name='shi']").val();
            var ge = $("#kx_content tr.fixed-input input[name='ge']").val();



            var posNumArr = [wan,qian,bai,shi,ge];
            //填写号码的位置
            var numPos = [];
            wan.length > 0 ? numPos.push(0) : "";
            qian.length > 0 ? numPos.push(1) : "";
            bai.length > 0 ? numPos.push(2) : "";
            shi.length > 0 ? numPos.push(3) : "";
            ge.length > 0 ? numPos.push(4) : "";

            if (numPos.length > 0) inputCondition = true;


            if ( category == numPos.length){
                createNumberArr = dwcreatenumber(category,posNumArr,numPos);

                //除
                if (positionfilter == 1){
                    var tmpPosNumArr = ["","","","",""];
                    for (var n = 0; n < numPos.length; n++){
                        tmpPosNumArr[numPos[n]] = "0123456789";
                    }
                    allNumberArr = dwcreatenumber(category,tmpPosNumArr,numPos);
                }
            }else if (numPos.length > 0 && numPos.length < category){
                var numPosArr;
                if (category == 2){
                    if (dw5zi == 0) numPosArr = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
                    else numPosArr = [[0,4],[1,4],[2,4],[3,4]];
                }else if (category == 3){
                    if (dw5zi == 0) numPosArr = [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];
                    else numPosArr = [[0,1,4],[0,2,4],[0,3,4],[1,2,4],[1,3,4],[2,3,4]];
                }else if (category == 4){

                    numPosArr = [[0, 1, 2, 3], [0, 1, 2, 4], [0, 1, 3, 4], [0, 2, 3, 4], [1, 2, 3, 4]];
                    var index = [4,3, 2, 1, 0];
                    numPosArr = [numPosArr[index[dw5zi-1]]];
                }

                for (var i = 0; i < numPosArr.length; i++){
                    tmpPosNumArr = posNumArr;
                    var posArr = numPosArr[i];

                    var c = false;
                    for (var n = 0; n < numPos.length;n++){
                        if (posArr.indexOf(numPos[n]) == -1) {
                            c = true;
                            break;
                        }
                    }
                    if (c) continue;

                    var tmpPosNumArr2 = ["","","","",""];
                    for (var n = 0; n < posArr.length;n++){
                        if (tmpPosNumArr[posArr[n]].length == 0) tmpPosNumArr[posArr[n]] = "0123456789";

                        if (positionfilter == 1){
                            tmpPosNumArr2[posArr[n]] = "0123456789";
                        }
                    }

                    createNumberArr = createNumberArr.concat(dwcreatenumber(category, tmpPosNumArr, posArr));
                    if (positionfilter == 1)allNumberArr = allNumberArr.concat(dwcreatenumber(category,tmpPosNumArr2,posArr));
                }
            }

        }else {
            var peiNumArr = [];
            var peiNumArr2 = [];
            for (var i = 1; i <= category;i++){
                var psn = $("#kx_content tr.match-input input[name='pei"+i+"']").val();
                if (psn.length > 0) {
                    inputCondition = true;
                    peiNumArr2.push(psn);
                }
                peiNumArr.push(psn.length == 0 ? "0123456789" : psn);
            }

            if (inputCondition) {
                if (positionfilter == 1)allNumberArr = getNumbersByCategory(category,dw5zi);
                createNumberArr = peishuquanzhuan(category,peiNumArr,dw5zi,false);

                // for (var n = 0; n < allNumberArr.length; n++){
                //     var number = allNumberArr[n];
                //     var pos = [];
                //     var pos2 = [];
                //     for (var n2 = 0;n2 < number.length; n2++){
                //         for (var n3 = 0; n3 < peiNumArr2.length; n3++){
                //             if (peiNumArr2[n3].indexOf(number[n2]) != -1){
                //                 if (pos2.indexOf(n3 + "-" + peiNumArr2[n3]) == -1){
                //                     pos.push(n3);
                //                     pos2.push(n3 + "-" + peiNumArr2[n3]);
                //                     break;
                //                 }
                //             }
                //         }
                //     }
                //     pos = pos.uniquelize();
                //     if (pos.length >= peiNumArr2.length) createNumberArr.push(number);
                // }

            }
        }

        if (positionfilter == 1){
            var newNumberArr = [];
            for (var n = 0; n < allNumberArr.length; n++){
                if (createNumberArr.indexOf(allNumberArr[n]) == -1) newNumberArr.push(allNumberArr[n]);
            }
            createNumberArr = newNumberArr;
        }

        //全转
        var quanzhaun = $("#kx_content input[name='quanzhuan']").val();
        if (quanzhaun.length > 0){
            tmpNumArr = [];
            if ( quanzhaun.length >= category){

                var quanzhaunArr = [];
                for (var i = 0; i < category; i++){
                    quanzhaunArr.push(quanzhaun);
                }
                tmpNumArr = peishuquanzhuan(category,quanzhaunArr,dw5zi,true);

            }
            if (createNumberArr.length == 0 && inputCondition){
                createNumberArr = [];
            }else if (createNumberArr.length == 0) createNumberArr = tmpNumArr;
            else {
                var tmpNumArr2 = [];
                for (var i = 0; i < tmpNumArr.length; i++){
                    if (createNumberArr.indexOf(tmpNumArr[i]) != -1){
                        tmpNumArr2.push(tmpNumArr[i]);
                    }
                }
                createNumberArr = tmpNumArr2;
            }
            inputCondition = true;
        }

        //上将
        var shangjiang = $("#kx_content input[name='shangjiang']").val();
        if (shangjiang.length > 0){
            allNumberArr = getNumbersByCategory(category,dw5zi);
            var tmpNumArr = [];
            for (var n = 0; n < allNumberArr.length; n++){
                var number = allNumberArr[n];
                var pos = [];
                for (var n2 = 0;n2 < number.length; n2++){
                    for (var n3 = 0; n3 < shangjiang.length; n3++){
                        if (number[n2] == shangjiang[n3] && pos.indexOf(n3) == -1){
                            pos.push(n3);
                            break;
                        }
                    }

                }
                pos = pos.uniquelize();

                if (pos.length == shangjiang.length || pos.length == category) tmpNumArr.push(number);
            }

            if (!inputCondition && quanzhaun.length == 0){
                createNumberArr = tmpNumArr;
            }else if (createNumberArr.length > 0){
                if (tmpNumArr.length == 0) createNumberArr = [];
                else createNumberArr = Array.intersect(createNumberArr,tmpNumArr);
            }

            inputCondition = true;
        }


        //值范围
        if (category == 4){
            var zhifanwei1 = $("#kx_content td.zhi-filter-range input[name='zhifanwei1']").val();
            var zhifanwei2 = $("#kx_content td.zhi-filter-range input[name='zhifanwei2']").val();
            if (zhifanwei1.length > 0 && zhifanwei2.length > 0){
                tmpNumArr = [];


                if (!inputCondition && quanzhaun.length == 0 && shangjiang.length == 0){
                    allNumberArr = getNumbersByCategory(category,dw5zi);
                    for (var i = 0; i< allNumberArr.length; i++){
                        var number = allNumberArr[i];
                        number = number.replace(/X/g,'');
                        var he = parseInt(number[0]) + parseInt(number[1]) + parseInt(number[2]) + parseInt(number[3]);
                        if ( he >= parseInt(zhifanwei1) && he <= parseInt(zhifanwei2) ) tmpNumArr.push(allNumberArr[i]);
                    }
                    createNumberArr = tmpNumArr;
                }else if (createNumberArr.length > 0){
                    for (var i = 0; i< createNumberArr.length; i++){
                        var number = createNumberArr[i];
                        number = number.replace(/X/g,'');
                        var he = parseInt(number[0]) + parseInt(number[1]) + parseInt(number[2]) + parseInt(number[3]);
                        if ( he >= parseInt(zhifanwei1) && he <= parseInt(zhifanwei2) ) tmpNumArr.push(createNumberArr[i]);
                    }
                    createNumberArr = tmpNumArr;
                }

                inputCondition = true;
            }
        }


        //合分
        var hefentype = $("#kx_content tr.hefen-filter input:checked").attr("hefentype");

        var hefenInfo = [];
        $("#kx_content td.hefen-filter-item").each(function () {
            var hf = $(this).find("input[type='text']").val();
            if (hf == "") return true;
            var i = 0;
            var pos = [];
            $(this).find("input[type='checkbox']").each(function () {
                if ( $(this).attr("checked")){
                    pos.push(i);
                }
                i++;
            });

            if (pos.length > 0){
                hefenInfo.push(pos.join(":") + "-" + hf);
            }
        });
        var tmpNumArr = [];
        if (hefenInfo.length > 0){

            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            for (var i = 0; i < createNumberArr.length; i++){
                var count = 0;
                for (var n = 0; n < hefenInfo.length; n++){

                    var hf =  hefenInfo[n].split("-")[1];
                    var hfpos = hefenInfo[n].split("-")[0].split(":");
                    var hf2 = 0;
                    for (var n2 = 0; n2 < hfpos.length; n2++){
                        if (createNumberArr[i][hfpos[n2]] == "X"){
                            hf2 = -1;
                            break;
                        }
                        hf2 += parseInt(createNumberArr[i][hfpos[n2]]);
                    }
                    if (hf2 < 0) continue;

                    for (var n3 = 0; n3 < hf.length; n3++){
                        if (  hf2 % 10 == hf[n3]) {
                            count++;
                            break;
                        }
                    }
                }
                if (count == hefenInfo.length && hefentype == 0|| count != hefenInfo.length  && hefentype == 1) tmpNumArr.push(createNumberArr[i]);

            }
            createNumberArr = tmpNumArr;
            inputCondition = true;
        }

        //不定位合分
        var budinghetype = $("#kx_content td.budinghe-filter input[type=checkbox]:checked").attr("budinghetype");
        var budinghe = $("#kx_content td.budinghe-filter input[type='text']").val();

        if ((budinghetype == 2 || budinghetype == 3 ) && budinghe.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);

            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length; i++){
                var number = createNumberArr[i];
                number = number.replace("/X/g","");
                var ext = false;
                for (var n = 0; n < number.length; n++){
                    for (var n2 = n + 1; n2 < number.length; n2++){
                        if (budinghetype == 2 ){
                            var value = (parseInt(number[n]) + parseInt(number[n2])) % 10;
                            if (budinghe.indexOf(value) != -1){tmpNumArr.push(createNumberArr[i]);ext = true;break;}
                        }else {
                            for (var n3 = n2 + 1; n3 < number.length; n3++){
                                var value = (parseInt(number[n]) + parseInt(number[n2]) + parseInt(number[n3])) % 10;
                                if (budinghe.indexOf(value) != -1){tmpNumArr.push(createNumberArr[i]);ext = true; break;}

                            }
                        }
                        if (ext) break;

                    }
                    if (ext) break;
                }
            }

            createNumberArr = tmpNumArr;
            inputCondition = true;
        }



        //排除
        var paichu = $("#kx_content input[name='paichu']").val();
        if (paichu.length > 0){

            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++) {
                var number = createNumberArr[i];

                var b = false;
                for (var n = 0; n < paichu.length; n++) {
                    if (number.indexOf(paichu[n]) != -1) {
                        b = true;
                        break
                    }
                }
                if (!b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
            inputCondition = true;
        }

        //乘号位置
        var chhaoArr = [];
        $("#kx_content input.symbol-filter-item:checked").each(function () {
            chhaoArr.push($(this).attr("name"));
        });
        if (chhaoArr.length > 0 && category != 4){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++) {
                var number = createNumberArr[i];
                b = true;
                for (var n = 0; n < chhaoArr.length; n++) {
                    if (number[chhaoArr[n]] != "X") {
                        b = false;
                        break
                    }
                }
                if (b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
            inputCondition = true;
        }
        //含数复数
        var containfilter = $("#kx_content td.contain-filter input[type='checkbox']:checked").attr("containfilter");
        var han = $("#kx_content td.contain-filter input[name='han']").val();
        var fushi = $("#kx_content td.contain-filter input[name='fushi']").val();
        if (containfilter >= 0 && han.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++) {
                var number = createNumberArr[i];
                b = false;
                for (var n = 0; n < han.length; n++) {
                    if (number.indexOf(han[n]) != -1) {
                        b = true;
                        break
                    }
                }
                if (containfilter == 0 && b) tmpNumArr.push(number);
                else if (containfilter == 1 && !b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
            inputCondition = true;
        }else if (containfilter >= 0 && fushi.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++) {
                var number = createNumberArr[i];
                b = true;
                for (var n = 0; n < number.length; n++) {
                    if (number[n] != 'X' && fushi.indexOf(number[n]) == -1) {
                        b = false;
                        break
                    }
                }
                if (containfilter == 0 && b) tmpNumArr.push(number);
                else if (containfilter == 1 && !b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
            inputCondition = true;
        }

        //重
        var chongname = ["two","three","four","double"];
        var len = category < 4 ? category -1 : category;
        var chongArr = [];
        for (var n = 0; n < len; n++){
            var repeatwordsfilter = $("#kx_content  input[class='repeat-"+ chongname[n] +"-words-filter']:checked").attr("repeatwordsfilter");
            if (repeatwordsfilter >= 0){
                chongArr.push(n + ":" + repeatwordsfilter);
            }
        }
        if (chongArr.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            inputCondition =  true;
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++) {
                var number = createNumberArr[i];
                var b = true;

                for (var n = 0; n < chongArr.length; n++){
                    var chcondition = chongArr[n];

                    var index = parseInt(chcondition.split(":")[0]);
                    var qu = parseInt(chcondition.split(":")[1]);
                    var count = chong(number);

                    //双重
                    if (index == 0 && qu == 0 && count < 2) b = false;
                    if (index == 0 && qu == 1 && count >= 2) b = false;
                    if (index == 0 && qu >= 0 && !b) break;

                    //三重
                    if (category >= 3) {

                        if (index == 1 && qu == 0 && !(count >= 3 && count <= 4)) b = false;
                        if (index == 1 && qu == 1 && (count >= 3 && count <= 4)) b = false;
                        if (index == 1 && qu >= 0 && !b) break;

                    }

                    if (category == 4) {

                        //双双重
                        if (index == 3 && qu == 0 && !(count >= 4 && count <= 5)) b = false;
                        if (index == 3 && qu == 1 && (count >= 4 && count <= 5)) b = false;
                        if (index == 3 && qu >= 0 && !b) break;

                        //四重
                        if (index == 2 && qu == 0 && !(count == 4)) b = false;
                        if (index == 2 && qu == 1 && (count == 4)) b = false;
                        if (index == 2 && qu >= 0 && !b) break;
                    }
                }

                if (b)tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
        }

        //对数
        var logarithmnumberfilter = $("#kx_content input[class='logarithm-number-filter']:checked").attr("logarithmnumberfilter");
        var duishuiArr = [];
        for (var n = 1; n <= 3;n++){
            var ds = $("#kx_content input[name='duishu"+n+"'] ").val();
            if (ds.length == 2 && (ds[0] - ds[1] == 5 || (ds[0] - ds[1] == -5))){
                duishuiArr.push(ds);
            }else if (ds.length > 0 ){
                G.myTips({ content: "请输入差值为5的数", obj: $("#kx_content input[name='duishu"+n+"'] "), myclick: true });
                return;
            }
        }
        if (logarithmnumberfilter >= 0 && duishuiArr.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            inputCondition = true;
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++){
                number = createNumberArr[i];
                b = false;
                for (var n = 0; n < duishuiArr.length; n++){
                    if (number.indexOf(duishuiArr[n][0]) != -1 && number.indexOf(duishuiArr[n][1]) != -1){
                        b = true;
                        break;
                    }
                }

                if (logarithmnumberfilter == 1) b = !b;

                if (b)tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
        } else if (logarithmnumberfilter >= 0 && duishuiArr.length == 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            inputCondition = true;
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++){
                number = createNumberArr[i];
                number = number.replace(/X/g,'');
                b = false;
                for (var n = 0; n < number.length-1; n++){
                    for (var n2 = n +1; n2 < number.length;n2++ )
                        if (number[n] - number[n2] == 5 || number[n] - number[n2] == -5){
                            b = true;
                            break;
                        }
                }


                if (logarithmnumberfilter == 1) b = !b;

                if (b)tmpNumArr.push(createNumberArr[i]);
            }
            createNumberArr = tmpNumArr;
        }


        var brotherClass = ["two","three","four"];
        var brotherArr = [];
        for (var n = 0; n < category - 1; n++){
            var brotherfilter = $("#kx_content input[class='"+ brotherClass[n] +"-brother-filter']:checked").attr("brotherfilter");
            if (brotherfilter >= 0){
                brotherArr.push(n + ":" + brotherfilter);
            }
        }
        if (brotherArr.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            inputCondition = true;

            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++) {
                var number = createNumberArr[i];
                var b = true;
                for (var k = 0; k < brotherArr.length; k++){

                    var index = brotherArr[k].split(":")[0];
                    var qu = brotherArr[k].split(":")[1];

                    if (index == 0 && qu == 0 && brother(number) < 2 ) b = false;
                    if (index == 0 && qu == 1 && brother(number) >= 2) b = false;

                    if (index == 1 && qu == 0 && brother(number) < 3) b = false;
                    if (index == 1 && qu == 1 && brother(number) >= 3) b = false;

                    if (index == 2 && qu == 0 && brother(number) != 4) b = false;
                    if (index == 2 && qu == 1 && brother(number) == 4) b = false;

                    if (!b) break;
                }
                if (b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;

        }

        var oddnumberfilter =  $("#kx_content input[class='odd-number-filter']:checked").attr("oddnumberfilter");
        var evennumberfilter = $("#kx_content input[class='even-number-filter']:checked").attr("evennumberfilter");
        var oddnumberArr = [];
        var evennumberArr = [];

        var depos = 0;
        $("#kx_content input[class='odd-number-item']").each(function () {
            if ($(this).attr("checked")) oddnumberArr.push(depos);
            depos++;
        });

        if (oddnumberfilter >= 0 && oddnumberArr.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            inputCondition = true;
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++){
                var number = createNumberArr[i];
                var b = true;
                for (var n = 0; n < oddnumberArr.length; n++){
                    if (number[oddnumberArr[n]] == "X" || parseInt(number[oddnumberArr[n]]) % 2 == 0) {
                        b = false;
                        break;
                    }
                }

                if (oddnumberfilter == 1) b = !b;
                if (b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
        }

        depos = 0;
        $("#kx_content input[class='even-number-item']").each(function () {
            if ($(this).attr("checked")) evennumberArr.push(depos);
            depos++;
        });

        if (evennumberfilter >= 0 && evennumberArr.length > 0){
            if (!inputCondition) createNumberArr = getNumbersByCategory(category,dw5zi);
            inputCondition = true;
            tmpNumArr = [];
            for (var i = 0; i < createNumberArr.length;i++){
                var number = createNumberArr[i];
                var b = true;
                for (var n = 0; n < evennumberArr.length; n++){
                    if (number[evennumberArr[n]] == "X" || parseInt(number[evennumberArr[n]]) % 2 != 0) {
                        b = false;
                        break;
                    }
                }

                if (evennumberfilter == 1) b = !b;
                if (b) tmpNumArr.push(number);
            }
            createNumberArr = tmpNumArr;
        }

        if (!inputCondition){
            G.alert({ content: "请选择或填写条件生成！。", ok: function () { return true; } });
            return;
        }

        console.log(createNumberArr);
        //kxnumbers
        if (createNumberArr.length == 0){
            $("#kxnumbers").html("没有这样的号码");
        }else {
            createNumberArr = createNumberArr.sort();
            var row = parseInt(createNumberArr.length / 10);
            if (createNumberArr.length % 10 > 0) row += 1;
            var htmlData = [];
            htmlData.push("<table style='width: 100%;bottom: auto;position: inherit;border-collapse: collapse'>");
            htmlData.push("<tbody >");


            for (var n = 0; n < row; n++){
                htmlData.push("<tr>");
                for (var n2 = 0; n2 < 10;n2++){
                    if (n * 10 + n2 < createNumberArr.length){
                        var num = createNumberArr[n * 10 + n2];
                        htmlData.push("<td width='10%'>"+ (num[4] == 'X' ? num.substring(0,num.lastIndexOf('X')) : num) +"</td>");
                    }else {
                        htmlData.push("<td width='10%'>--</td>");
                    }
                }
                htmlData.push("</tr>");
            }

            htmlData.push("</tbody>");
            htmlData.push("</table>");
            $("#kxnumbers").html(htmlData.join(""));
            $("#number-size").html(createNumberArr.length);
        }

    });
}

//
function moniLogin(msg) {


    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    if (!gameIndex){
        gameIndex = $("#gameDefault").attr("data-text");
        msg.data_action += "&gameIndex=" + gameIndex;
    }

    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        if (!gameIndex) gameIndex = $("#gameDefault").attr("data-text");

        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");



        var titleNav = titleNavAry.join("") ;
        titleNav += "&nbsp;&nbsp;<a href='javascript:void(0);' name='del'>全部删除</a>";

        var thead = ["帐号", "<b>今日</b><b class='both' title='排序' data-sort='1' data-name='desc'>","昨日<b class='both' title='排序' data-sort='3' data-name='desc'>", "帐号", "今日<b class='both' title='排序' data-sort='2' data-name='desc'>","昨日<b class='both' title='排序' data-sort='4' data-name='desc'>","帐号", "今日","昨日","帐号", "今日","昨日","帐号", "今日","昨日"];

        var jsonCount;
        if (json.list && json.list.length > 0) {
            jsonCount = json.list.pop();
            json.list.sort(function (x, y) {
                return y[1] - x[1];
            });
        }

        if (jsonCount) titleNav += "&nbsp;&nbsp;&nbsp;&nbsp;今日：下" + jsonCount[0] + "&nbsp;盈亏" + jsonCount[1] + "&nbsp;&nbsp;昨日：下" + jsonCount[2] + "&nbsp;盈亏" + jsonCount[3];

        var table = [];
        myappend()
        function myappend() {
            table = [];
            var array = json.list;
            var han = parseInt(array.length / 5);
            if (array.length % 5 > 0) han +=1;
            for (var n =0; n < han;n++){
                table.push("<tr>");
                for (var i = 0; i < 5; i++){

                    if (array.length -1 >= n * 5 + i){

                        var to = "";
                        var yes = "";
                        if (array[n*5 + i][2] < 0) to = "red";
                        if (array[n*5 + i][4] < 0) yes = "red";
                        table.push("<td width='6%' class='bc bold txt-left '>"+array[n*5 + i][0]+"</td>");
                        table.push("<td width='7%' class='txt-left'>"+array[n*5 + i][1] + "<br><div class='"+to+"'>" + array[n*5 + i][2]+"</div></td>");
                        table.push("<td width='7%' class='txt-left'>"+array[n*5 + i][3] + "<br><div class='"+yes+"'>" + array[n*5 + i][4]+"</div></td>");

                    }else {
                        table.push("<td width='6%'></td><td width='7%'></td><td width='7%'></td>");
                    }
                }
                table.push("</tr>");
            }
            $("#moniLogin tbody").html(table.join(""));
        }

        function myevent() {

            //排序
            $("#moniLogin thead b.both").unbind("click").click(function () {
                var data_sort = $(this).attr("data-sort"), data_both;
                console.log(data_sort);
                if (data_sort && json.list) {
                    if ($(this).attr("data-name") == "desc") {
                        data_both = "asc";
                    } else {
                        data_both = "desc";
                    }
                    $(this).attr("data-name", data_both);
                    json.list.sort(function (x, y) {
                        return data_both == "asc" ? x[data_sort] - y[data_sort] : y[data_sort] - x[data_sort];
                    });
                    myappend();
                }
            });

        }


        $("#load-middle").html(forceMiddle({ id: "moniLogin", title: "模拟登陆", thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");
        myevent();

        //绑定默认选中值=彩种
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }


        $("#title-nav a[name='del']").unbind("click").click(function () {
            G.alert({ content: "确定要删除吗。", ok: function () {

                    var gameIndex = $("#title-nav select[name='gameIndex']").val();


                    var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
                    referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
                    referrer = G.urlReplace({ url: referrer, paramName: "op", val: 'del', pad: true });

                    referrer = referrer.replace("?", "");
                    middleBind({ data_action: referrer });
                    return true;
                }

            });
        });


    },function () {
        G.rollBack();
    });
}

function myLogin(msg) {


    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    if (!gameIndex){
        gameIndex = $("#gameDefault").attr("data-text");
        msg.data_action += "&gameIndex=" + gameIndex;
    }

    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        if (!gameIndex) gameIndex = $("#gameDefault").attr("data-text");

        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");



        var titleNav = titleNavAry.join("") ;

        var thead = ["帐号", "<b>今日</b><b class='both' title='排序' data-sort='1' data-name='desc'>","昨日<b class='both' title='排序' data-sort='3' data-name='desc'>", "帐号", "今日<b class='both' title='排序' data-sort='2' data-name='desc'>","昨日<b class='both' title='排序' data-sort='4' data-name='desc'>","帐号", "今日","昨日","帐号", "今日","昨日","帐号", "今日","昨日"];

        var jsonCount;
        if (json.list && json.list.length > 0) {
            jsonCount = json.list.pop();
            json.list.sort(function (x, y) {
                return y[1] - x[1];
            });
        }

        if (jsonCount) titleNav += "&nbsp;&nbsp;&nbsp;&nbsp;今日：下" + jsonCount[0] + "&nbsp;盈亏" + jsonCount[1] + "&nbsp;&nbsp;昨日：下" + jsonCount[2] + "&nbsp;盈亏" + jsonCount[3];

        var table = [];
        myappend();
        function myappend() {
            table = [];
            var array = json.list;
            var han = parseInt(array.length / 5);
            if (array.length % 5 > 0) han +=1;
            for (var n =0; n < han;n++){
                table.push("<tr>");
                for (var i = 0; i < 5; i++){

                    if (array.length -1 >= n * 5 + i){

                        var to = "";
                        var yes = "";
                        if (array[n*5 + i][2] < 0) to = "red";
                        if (array[n*5 + i][4] < 0) yes = "red";
                        table.push("<td width='6%' class='bc bold txt-left '>"+array[n*5 + i][0]+"</td>");
                        table.push("<td width='7%' class='txt-left'>"+array[n*5 + i][1] + "<br><div class='"+to+"'>" + array[n*5 + i][2]+"</div></td>");
                        table.push("<td width='7%' class='txt-left'>"+array[n*5 + i][3] + "<br><div class='"+yes+"'>" + array[n*5 + i][4]+"</div></td>");

                    }else {
                        table.push("<td width='6%'></td><td width='7%'></td><td width='7%'></td>");
                    }
                }
                table.push("</tr>");
            }
            $("#moniLogin tbody").html(table.join(""));
        }

        function myevent() {

            //排序
            $("#moniLogin thead b.both").unbind("click").click(function () {
                var data_sort = $(this).attr("data-sort"), data_both;
                console.log(data_sort);
                if (data_sort && json.list) {
                    if ($(this).attr("data-name") == "desc") {
                        data_both = "asc";
                    } else {
                        data_both = "desc";
                    }
                    $(this).attr("data-name", data_both);
                    json.list.sort(function (x, y) {
                        return data_both == "asc" ? x[data_sort] - y[data_sort] : y[data_sort] - x[data_sort];
                    });
                    myappend();
                }
            });

        }


        $("#load-middle").html(forceMiddle({ id: "myLogin", title: "模拟登陆", thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");
        myevent();

        //绑定默认选中值=彩种
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }

    },function () {
        G.rollBack();
    });
}


//热码
function hotcode(msg) {


    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    if (!gameIndex){
        gameIndex = $("#gameDefault").attr("data-text");
        msg.data_action += "&gameIndex=" + gameIndex;
    }

    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        if (!gameIndex) gameIndex = $("#gameDefault").attr("data-text");

        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");
        var selectType= "";
        if (gameIndex == 3 || gameIndex == undefined){
            selectType = "<label>分类:<select name='type'><option value='1'>一定位</option><option value='2'>二定位</option><option value='3'>三定位</option><option value='4'>四定位</option></select></label>";
        }
        selectType += "<label>会员帐号：<select name='username'><option value='后台'>后台</option>";
        for (var n = 0; n < json.memberList.length; n++){
            selectType += "<option value='"+json.memberList[n]+"'>"+json.memberList[n]+"</option>";
        }
        selectType += "</select>";

        var titleNav = titleNavAry.join("") + selectType + "<input type='text' class='text-input sw90' name='searchname' >";
        titleNav += "&nbsp;&nbsp;<a href='javascript:void(0);' name='refresh'>查询</a>";
        if (__sysinfo.level <= 1 && __sysinfo.hotcodeid == 1){
            titleNav += "&nbsp;&nbsp;<a href='javascript:void(0);' name='del'>全部删除</a>";
        }
        var thead = ["号码", "赔率","号码", "赔率","号码", "赔率","号码", "赔率","号码", "赔率"];

        var table = [];
        var array = json.oddsList;
        // console.log(json.oddsList[0].length);
        var han = parseInt(array.length / 5);
        if (array.length % 5 > 0) han +=1;
        for (var n =0; n < han;n++){
            table.push("<tr>");
            for (var i = 0; i < 5; i++){

                if (array.length -1 >= n * 5 + i){

                    table.push("<td width='10%' class='bc bold'>"+getNameByType(gameIndex,array[n*5 + i][0])+"</td>");
                    table.push("<td width='10%'>"+array[n*5 + i][1]+"</td>");

                }else {
                    table.push("<td width='10%'></td><td width='10%'></td>");
                }
            }
            table.push("</tr>");
        }



        $("#load-middle").html(forceMiddle({ id: "hotcode", title: "热码", thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定默认选中值=彩种
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }

        var username = G.query("username", "?" + msg.data_action);
        if (username) {
            $("#title-nav select[name='username']").val(username);
        }

        var searchname = G.query("searchname", "?" + msg.data_action);
        if (searchname) {
            $("#title-nav input[name='searchname']").val(searchname);
        }

        //绑定默认选中值=状态
        var type = G.query("type", "?" + msg.data_action);
        if (type) {
            $("#title-nav select[name='type']").val(type);
        }

        //select选中获取数据
        $("#title-nav select").unbind("change").change(function () {
            fromMesgAction();
        });

        $("#title-nav a[name='del']").unbind("click").click(function () {
            G.alert({ content: "确定要删除吗。", ok: function () {

                    var gameIndex = $("#title-nav select[name='gameIndex']").val();
                    var type = $("#title-nav select[name='type']").val();
                    var username = $("#title-nav select[name='username']").val();


                    var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
                    referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
                    referrer = G.urlReplace({ url: referrer, paramName: "type", val: type, pad: true });
                    referrer = G.urlReplace({ url: referrer, paramName: "username", val: username, pad: true });
                    referrer = G.urlReplace({ url: referrer, paramName: "op", val: 'del', pad: true });

                    referrer = referrer.replace("?", "");
                    middleBind({ data_action: referrer });
                    return true;
                }

            });
        });

        $("#title-nav a[name='refresh']").unbind("click").click(function () {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var type = $("#title-nav select[name='type']").val();
            var username = $("#title-nav select[name='username']").val();
            var searchname = $("#title-nav input[name='searchname']").val();


            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "type", val: type, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "username", val: username, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "op", val: 'refresh', pad: true });

            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        });

        function fromMesgAction() {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var type = $("#title-nav select[name='type']").val();
            var username = $("#title-nav select[name='username']").val();
            var searchname = $("#title-nav input[name='searchname']").val();


            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "type", val: type, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "username", val: username, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });

            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        }
    },function () {
        G.rollBack();
    });
}

var checkgamedatatime;

//即时盘口
function gamedata(msg) {
    clearTimeout(checkgamedatatime);

    var shell = $("#shell_top");
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var type = G.query("type", "?" + msg.data_action);
    var isCl = G.query("isCl", "?" + msg.data_action);
    var timeValue = G.query("timeValue", "?" + msg.data_action) || 20;
    var huoStatus = G.query("huoStatus", "?" + msg.data_action) || 1;
    var rebate = G.query("rebate", "?" + msg.data_action) || 0;
    var reload = G.query("reload", "?" + msg.data_action);
    var sortId = G.query("sortId", "?" + msg.data_action);
    var obj = appenGameData({ gameIndex: gameIndex, type: type, reload: reload });
    var autoType = type;

    $("#navListBox a").removeClass("onBtn");
    $("#navListBox a[data-action='gamedata&gameIndex=" + gameIndex + "&type=" + autoType + "']").addClass("onBtn");

    //设定表格样式
    obj.addClass("game-heiht");

    //绑定选项参数
    shell.find("#timeValue").val(timeValue);
    shell.find("#huoStatus").val(huoStatus);
    shell.find("#rebate").val(rebate);
    shell.find("#type").val(type);
    //赔率调整可见
    if (__sysinfo.level == 1 && __sysinfo.setodds == 1) {
        $("#setAll-game").removeClass("hidden");
        $("div[name='game-row'] .odd_set").removeClass("hidden");
        $("div[name='game-row'] a.line1").addClass("cursor");
    }
    //六合彩-盈亏排列控件
    if (gameIndex == 1 && (type == 1 || type == 2 || type == 3 || type == 8 || type == 88 || type == 808 || type >= 10 && type <= 15 || type == 1828)) {
        shell.find("#myGameSort").show();
    } else {
        shell.find("#myGameSort").hide();
    }
    if (gameIndex == 1 && !reload && type != 6 && __sysinfo.shipments == 1 && __sysinfo.level != 0) {
        //平均亏损:<input type='text' id='data-average' class='text-input sw90' value='10000000'><span class='text-span' id='data-sum'>計算補貨</span>
        $("#shell_pageControl").html("<div id='data-page' class='fast-buhuo'><span class='text-span' id='fast-buhuo'>快速補貨</span></div>");
    } else if ((gameIndex == 4 || gameIndex == 3) && !reload && __sysinfo.shipments == 1 && __sysinfo.level != 0) {
        $("#shell_pageControl").html("<div id='data-page' class='fast-buhuo'><span class='text-span' id='fast-buhuo'>快速補貨</span></div>");
    }

    if (__sysinfo.level == 0) {
        shell.find("#huoStatus").hide();
    }

    if (isCl == null) { G.scrollLoad({}); }
    // S.request = G.ajax(msg.data_action, function (json) {
    //chenwei
    //type不同 值不同
        console.log(msg);
    if(type==1){
        var json = $.parseJSON('{"win":0.0,"openDateList":{"number":20190802221,"endTime":23,"lotteryTime":43,"nextNumber":1},"openNumList":{"newnumber":20190802220,"numList":[2,9,1,7,0]},"oddsList":{"1":9.77,"2":9.57,"3":9.77,"4":9.57,"5":9.77,"6":9.97,"7":9.97,"8":9.97,"9":9.97,"10":9.77,"15":9.97,"16":9.97,"17":9.97,"18":9.97,"19":9.97,"20":9.97,"21":9.97,"22":9.97,"23":9.97,"24":9.97,"29":9.97,"30":9.97,"31":9.97,"32":9.97,"33":9.97,"34":9.97,"35":9.97,"36":9.97,"37":9.97,"38":9.97,"43":9.97,"44":9.97,"45":9.97,"46":9.97,"47":9.97,"48":9.97,"49":9.97,"50":9.97,"51":9.97,"52":9.97,"57":9.97,"58":9.77,"59":9.97,"60":9.77,"61":9.97,"62":9.77,"63":9.97,"64":9.77,"65":9.97,"66":9.77},"detailsList":{"1":[0,0.0],"2":[0,0.0],"3":[0,0.0],"4":[0,0.0],"5":[0,0.0],"6":[0,0.0],"7":[0,0.0],"8":[0,0.0],"9":[0,0.0],"10":[0,0.0],"15":[0,0.0],"16":[0,0.0],"17":[0,0.0],"18":[0,0.0],"19":[0,0.0],"20":[0,0.0],"21":[0,0.0],"22":[0,0.0],"23":[0,0.0],"24":[0,0.0],"29":[0,0.0],"30":[0,0.0],"31":[0,0.0],"32":[0,0.0],"33":[0,0.0],"34":[0,0.0],"35":[0,0.0],"36":[0,0.0],"37":[0,0.0],"38":[0,0.0],"43":[0,0.0],"44":[0,0.0],"45":[0,0.0],"46":[0,0.0],"47":[0,0.0],"48":[0,0.0],"49":[0,0.0],"50":[0,0.0],"51":[0,0.0],"52":[0,0.0],"57":[0,0.0],"58":[0,0.0],"59":[0,0.0],"60":[0,0.0],"61":[0,0.0],"62":[0,0.0],"63":[0,0.0],"64":[0,0.0],"65":[0,0.0],"66":[0,0.0]},"order":[1,2,3,4,5,6,7,8,9,10,15,16,17,18,19,20,21,22,23,24,29,30,31,32,33,34,35,36,37,38,43,44,45,46,47,48,49,50,51,52,57,58,59,60,61,62,63,64,65,66],"currentPage":1,"totalPage":0,"clList":["第三球 單:3","第五球 雙:4","第五球 小:4"]}');
    }
    if(type==12){
        var json = $.parseJSON('{"win":0.0,"openDateList":{"number":20190802228,"endTime":198,"lotteryTime":218,"nextNumber":1},"openNumList":{"newnumber":20190802227,"numList":[0,9,8,0,8]},"oddsList":{"108":99.7,"109":99.7,"110":99.7,"111":99.7,"112":99.7,"113":99.7,"114":99.7,"115":99.7,"116":99.7,"117":99.7,"118":99.7,"119":99.7,"120":99.7,"121":99.7,"122":99.7,"123":99.7,"124":99.7,"125":99.7,"126":99.7,"127":99.7,"128":99.7,"129":99.7,"130":99.7,"131":99.7,"132":99.7,"133":99.7,"134":99.7,"135":99.7,"136":99.7,"137":99.7,"138":99.7,"139":99.7,"140":99.7,"141":99.7,"142":99.7,"143":99.7,"144":99.7,"145":99.7,"146":99.7,"147":99.7,"148":99.7,"149":99.7,"150":99.7,"151":99.7,"152":99.7,"153":99.7,"154":99.7,"155":99.7,"156":99.7,"157":99.7,"158":99.7,"159":99.7,"160":99.7,"161":99.7,"162":99.7,"163":99.7,"164":99.7,"165":99.7,"166":99.7,"167":99.7,"168":99.7,"169":99.7,"170":99.7,"171":99.7,"172":99.7,"173":99.7,"174":99.7,"175":99.7,"176":99.7,"177":99.7,"178":99.7,"179":99.7,"180":99.7,"181":99.7,"182":99.7,"183":99.7,"184":99.7,"185":99.7,"186":99.7,"187":99.7,"188":99.7,"189":99.7,"190":99.7,"191":99.7,"192":99.7,"193":99.7,"194":99.7,"195":99.7,"196":99.7,"197":99.7,"198":99.7,"199":99.7,"200":99.7,"201":99.7,"202":99.7,"203":99.7,"204":99.7,"205":99.7,"206":99.7,"207":99.7},"detailsList":{"108":[0,0.0],"109":[0,0.0],"110":[0,0.0],"111":[0,0.0],"112":[0,0.0],"113":[0,0.0],"114":[0,0.0],"115":[0,0.0],"116":[0,0.0],"117":[0,0.0],"118":[0,0.0],"119":[0,0.0],"120":[0,0.0],"121":[0,0.0],"122":[0,0.0],"123":[0,0.0],"124":[0,0.0],"125":[0,0.0],"126":[0,0.0],"127":[0,0.0],"128":[0,0.0],"129":[0,0.0],"130":[0,0.0],"131":[0,0.0],"132":[0,0.0],"133":[0,0.0],"134":[0,0.0],"135":[0,0.0],"136":[0,0.0],"137":[0,0.0],"138":[0,0.0],"139":[0,0.0],"140":[0,0.0],"141":[0,0.0],"142":[0,0.0],"143":[0,0.0],"144":[0,0.0],"145":[0,0.0],"146":[0,0.0],"147":[0,0.0],"148":[0,0.0],"149":[0,0.0],"150":[0,0.0],"151":[0,0.0],"152":[0,0.0],"153":[0,0.0],"154":[0,0.0],"155":[0,0.0],"156":[0,0.0],"157":[0,0.0],"158":[0,0.0],"159":[0,0.0],"160":[0,0.0],"161":[0,0.0],"162":[0,0.0],"163":[0,0.0],"164":[0,0.0],"165":[0,0.0],"166":[0,0.0],"167":[0,0.0],"168":[0,0.0],"169":[0,0.0],"170":[0,0.0],"171":[0,0.0],"172":[0,0.0],"173":[0,0.0],"174":[0,0.0],"175":[0,0.0],"176":[0,0.0],"177":[0,0.0],"178":[0,0.0],"179":[0,0.0],"180":[0,0.0],"181":[0,0.0],"182":[0,0.0],"183":[0,0.0],"184":[0,0.0],"185":[0,0.0],"186":[0,0.0],"187":[0,0.0],"188":[0,0.0],"189":[0,0.0],"190":[0,0.0],"191":[0,0.0],"192":[0,0.0],"193":[0,0.0],"194":[0,0.0],"195":[0,0.0],"196":[0,0.0],"197":[0,0.0],"198":[0,0.0],"199":[0,0.0],"200":[0,0.0],"201":[0,0.0],"202":[0,0.0],"203":[0,0.0],"204":[0,0.0],"205":[0,0.0],"206":[0,0.0],"207":[0,0.0]},"order":[108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207],"currentPage":1,"totalPage":10,"clList":["第二球 單:3","第四球 雙:6","第五球 雙:5"]}');
    }
    if(type==23){
        var json = $.parseJSON('{"win":0.0,"openDateList":{"number":20190802228,"endTime":186,"lotteryTime":206,"nextNumber":1},"openNumList":{"newnumber":20190802227,"numList":[0,9,8,0,8]},"oddsList":{"1108":997.0,"1109":997.0,"1110":997.0,"1111":997.0,"1112":997.0,"1113":997.0,"1114":997.0,"1115":997.0,"1116":997.0,"1117":997.0,"1118":997.0,"1119":997.0,"1120":997.0,"1121":997.0,"1122":997.0,"1123":997.0,"1124":997.0,"1125":997.0,"1126":997.0,"1127":997.0,"1128":997.0,"1129":997.0,"1130":997.0,"1131":997.0,"1132":997.0,"1133":997.0,"1134":997.0,"1135":997.0,"1136":997.0,"1137":997.0,"1138":997.0,"1139":997.0,"1140":997.0,"1141":997.0,"1142":997.0,"1143":997.0,"1144":997.0,"1145":997.0,"1146":997.0,"1147":997.0,"1148":997.0,"1149":997.0,"1150":997.0,"1151":997.0,"1152":997.0,"1153":997.0,"1154":997.0,"1155":997.0,"1156":997.0,"1157":997.0,"1158":997.0,"1159":997.0,"1160":997.0,"1161":997.0,"1162":997.0,"1163":997.0,"1164":997.0,"1165":997.0,"1166":997.0,"1167":997.0,"1168":997.0,"1169":997.0,"1170":997.0,"1171":997.0,"1172":997.0,"1173":997.0,"1174":997.0,"1175":997.0,"1176":997.0,"1177":997.0,"1178":997.0,"1179":997.0,"1180":997.0,"1181":997.0,"1182":997.0,"1183":997.0,"1184":997.0,"1185":997.0,"1186":997.0,"1187":997.0,"1188":997.0,"1189":997.0,"1190":997.0,"1191":997.0,"1192":997.0,"1193":997.0,"1194":997.0,"1195":997.0,"1196":997.0,"1197":997.0,"1198":997.0,"1199":997.0,"1200":997.0,"1201":997.0,"1202":997.0,"1203":997.0,"1204":997.0,"1205":997.0,"1206":997.0,"1207":997.0},"detailsList":{"1108":[0,0.0],"1109":[0,0.0],"1110":[0,0.0],"1111":[0,0.0],"1112":[0,0.0],"1113":[0,0.0],"1114":[0,0.0],"1115":[0,0.0],"1116":[0,0.0],"1117":[0,0.0],"1118":[0,0.0],"1119":[0,0.0],"1120":[0,0.0],"1121":[0,0.0],"1122":[0,0.0],"1123":[0,0.0],"1124":[0,0.0],"1125":[0,0.0],"1126":[0,0.0],"1127":[0,0.0],"1128":[0,0.0],"1129":[0,0.0],"1130":[0,0.0],"1131":[0,0.0],"1132":[0,0.0],"1133":[0,0.0],"1134":[0,0.0],"1135":[0,0.0],"1136":[0,0.0],"1137":[0,0.0],"1138":[0,0.0],"1139":[0,0.0],"1140":[0,0.0],"1141":[0,0.0],"1142":[0,0.0],"1143":[0,0.0],"1144":[0,0.0],"1145":[0,0.0],"1146":[0,0.0],"1147":[0,0.0],"1148":[0,0.0],"1149":[0,0.0],"1150":[0,0.0],"1151":[0,0.0],"1152":[0,0.0],"1153":[0,0.0],"1154":[0,0.0],"1155":[0,0.0],"1156":[0,0.0],"1157":[0,0.0],"1158":[0,0.0],"1159":[0,0.0],"1160":[0,0.0],"1161":[0,0.0],"1162":[0,0.0],"1163":[0,0.0],"1164":[0,0.0],"1165":[0,0.0],"1166":[0,0.0],"1167":[0,0.0],"1168":[0,0.0],"1169":[0,0.0],"1170":[0,0.0],"1171":[0,0.0],"1172":[0,0.0],"1173":[0,0.0],"1174":[0,0.0],"1175":[0,0.0],"1176":[0,0.0],"1177":[0,0.0],"1178":[0,0.0],"1179":[0,0.0],"1180":[0,0.0],"1181":[0,0.0],"1182":[0,0.0],"1183":[0,0.0],"1184":[0,0.0],"1185":[0,0.0],"1186":[0,0.0],"1187":[0,0.0],"1188":[0,0.0],"1189":[0,0.0],"1190":[0,0.0],"1191":[0,0.0],"1192":[0,0.0],"1193":[0,0.0],"1194":[0,0.0],"1195":[0,0.0],"1196":[0,0.0],"1197":[0,0.0],"1198":[0,0.0],"1199":[0,0.0],"1200":[0,0.0],"1201":[0,0.0],"1202":[0,0.0],"1203":[0,0.0],"1204":[0,0.0],"1205":[0,0.0],"1206":[0,0.0],"1207":[0,0.0]},"order":[1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207],"currentPage":1,"totalPage":100,"clList":["第二球 單:3","第四球 雙:6","第五球 雙:5"]}');
    }
    if(type==29){
        var json = $.parseJSON('{"win":0.0,"openDateList":{"number":20190802228,"endTime":176,"lotteryTime":196,"nextNumber":1},"openNumList":{"newnumber":20190802227,"numList":[0,9,8,0,8]},"oddsList":{"11108":9970.0,"11109":9970.0,"11110":9970.0,"11111":9970.0,"11112":9970.0,"11113":9970.0,"11114":9970.0,"11115":9970.0,"11116":9970.0,"11117":9970.0,"11118":9970.0,"11119":9970.0,"11120":9970.0,"11121":9970.0,"11122":9970.0,"11123":9970.0,"11124":9970.0,"11125":9970.0,"11126":9970.0,"11127":9970.0,"11128":9970.0,"11129":9970.0,"11130":9970.0,"11131":9970.0,"11132":9970.0,"11133":9970.0,"11134":9970.0,"11135":9970.0,"11136":9970.0,"11137":9970.0,"11138":9970.0,"11139":9970.0,"11140":9970.0,"11141":9970.0,"11142":9970.0,"11143":9970.0,"11144":9970.0,"11145":9970.0,"11146":9970.0,"11147":9970.0,"11148":9970.0,"11149":9970.0,"11150":9970.0,"11151":9970.0,"11152":9970.0,"11153":9970.0,"11154":9970.0,"11155":9970.0,"11156":9970.0,"11157":9970.0,"11158":9970.0,"11159":9970.0,"11160":9970.0,"11161":9970.0,"11162":9970.0,"11163":9970.0,"11164":9970.0,"11165":9970.0,"11166":9970.0,"11167":9970.0,"11168":9970.0,"11169":9970.0,"11170":9970.0,"11171":9970.0,"11172":9970.0,"11173":9970.0,"11174":9970.0,"11175":9970.0,"11176":9970.0,"11177":9970.0,"11178":9970.0,"11179":9970.0,"11180":9970.0,"11181":9970.0,"11182":9970.0,"11183":9970.0,"11184":9970.0,"11185":9970.0,"11186":9970.0,"11187":9970.0,"11188":9970.0,"11189":9970.0,"11190":9970.0,"11191":9970.0,"11192":9970.0,"11193":9970.0,"11194":9970.0,"11195":9970.0,"11196":9970.0,"11197":9970.0,"11198":9970.0,"11199":9970.0,"11200":9970.0,"11201":9970.0,"11202":9970.0,"11203":9970.0,"11204":9970.0,"11205":9970.0,"11206":9970.0,"11207":9970.0},"detailsList":{"11108":[0,0.0],"11109":[0,0.0],"11110":[0,0.0],"11111":[0,0.0],"11112":[0,0.0],"11113":[0,0.0],"11114":[0,0.0],"11115":[0,0.0],"11116":[0,0.0],"11117":[0,0.0],"11118":[0,0.0],"11119":[0,0.0],"11120":[0,0.0],"11121":[0,0.0],"11122":[0,0.0],"11123":[0,0.0],"11124":[0,0.0],"11125":[0,0.0],"11126":[0,0.0],"11127":[0,0.0],"11128":[0,0.0],"11129":[0,0.0],"11130":[0,0.0],"11131":[0,0.0],"11132":[0,0.0],"11133":[0,0.0],"11134":[0,0.0],"11135":[0,0.0],"11136":[0,0.0],"11137":[0,0.0],"11138":[0,0.0],"11139":[0,0.0],"11140":[0,0.0],"11141":[0,0.0],"11142":[0,0.0],"11143":[0,0.0],"11144":[0,0.0],"11145":[0,0.0],"11146":[0,0.0],"11147":[0,0.0],"11148":[0,0.0],"11149":[0,0.0],"11150":[0,0.0],"11151":[0,0.0],"11152":[0,0.0],"11153":[0,0.0],"11154":[0,0.0],"11155":[0,0.0],"11156":[0,0.0],"11157":[0,0.0],"11158":[0,0.0],"11159":[0,0.0],"11160":[0,0.0],"11161":[0,0.0],"11162":[0,0.0],"11163":[0,0.0],"11164":[0,0.0],"11165":[0,0.0],"11166":[0,0.0],"11167":[0,0.0],"11168":[0,0.0],"11169":[0,0.0],"11170":[0,0.0],"11171":[0,0.0],"11172":[0,0.0],"11173":[0,0.0],"11174":[0,0.0],"11175":[0,0.0],"11176":[0,0.0],"11177":[0,0.0],"11178":[0,0.0],"11179":[0,0.0],"11180":[0,0.0],"11181":[0,0.0],"11182":[0,0.0],"11183":[0,0.0],"11184":[0,0.0],"11185":[0,0.0],"11186":[0,0.0],"11187":[0,0.0],"11188":[0,0.0],"11189":[0,0.0],"11190":[0,0.0],"11191":[0,0.0],"11192":[0,0.0],"11193":[0,0.0],"11194":[0,0.0],"11195":[0,0.0],"11196":[0,0.0],"11197":[0,0.0],"11198":[0,0.0],"11199":[0,0.0],"11200":[0,0.0],"11201":[0,0.0],"11202":[0,0.0],"11203":[0,0.0],"11204":[0,0.0],"11205":[0,0.0],"11206":[0,0.0],"11207":[0,0.0]},"order":[11108,11109,11110,11111,11112,11113,11114,11115,11116,11117,11118,11119,11120,11121,11122,11123,11124,11125,11126,11127,11128,11129,11130,11131,11132,11133,11134,11135,11136,11137,11138,11139,11140,11141,11142,11143,11144,11145,11146,11147,11148,11149,11150,11151,11152,11153,11154,11155,11156,11157,11158,11159,11160,11161,11162,11163,11164,11165,11166,11167,11168,11169,11170,11171,11172,11173,11174,11175,11176,11177,11178,11179,11180,11181,11182,11183,11184,11185,11186,11187,11188,11189,11190,11191,11192,11193,11194,11195,11196,11197,11198,11199,11200,11201,11202,11203,11204,11205,11206,11207],"currentPage":1,"totalPage":100,"clList":["第二球 單:3","第四球 雙:6","第五球 雙:5"]}');
    }

        if (isCl == null) { G.loadEnd(); }

        //今天输赢
        shell.find("span[name='win']").html(json.win);

        //开盘信息、开盘期数、封盘时间、开奖时间
        var opNum = json.openDateList.number || "NO";
        var endTime = parseInt(json.openDateList.endTime) || 0;
        var lotteryTime = parseInt(json.openDateList.lotteryTime) || 0;
        shell.find("span[name='number']").html(opNum);

        var closeTime = endTime > 0 ? endTime : lotteryTime;
        var closeTime_txt;
        if (endTime > 0 || endTime == 0 && lotteryTime == 0) {
            closeTime_txt = "距封盘：";
            shell.find("span[name='closeTime']").removeClass("red");
        } else {
            closeTime_txt = "距开奖：";
            shell.find("span[name='closeTime']").addClass("red");
        }
        shell.find("span[name='closeTime-txt']").html(closeTime_txt);
        shell.find("span[name='closeTime']").html(G.settimes(closeTime));

        //开奖信息
        var newnumber = json.openNumList.newnumber || "on";
        shell.find("span[name='newnumber']").html(newnumber);
        var numList = json.openNumList.numList || [];
        var mc = gameIndex == 1 ? "HKNo_" : gameIndex == 2 ? "KLCNo_" : gameIndex == 3 ? "SSCNo_" : gameIndex == 4 || gameIndex == 8 || gameIndex == 14 ? "PKNo_" : gameIndex == 5 ? "KSNo_" : gameIndex == 6 ? "KLBNo_" : gameIndex == 7 ? "NCNo_" : gameIndex == 10 ? "GXNo_" : gameIndex == 13 ? "KSNo_" : "";
        for (var i = 0; i < numList.length; i++) {
            numList[i] = "<i class='" + mc + numList[i] + "'></i>";
        }
        shell.find("span[name='numList']").html(numList.join(""));
        //O.title = $("#shell_title").html();


        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //赔率、注额、盈亏（包括总投）
        var line1, line2, line3, line1_1,i;
        var data_count = [0, 0, 0], tjlen = obj.find("#total_tongji").length, my_count = [0, 0, 0, 0, 0, 0, 0, 0];
        var index = 100000;
        obj.find("[data-type='定位']").each(function () {
            //console.log($(this).attr("data-sort"));
            $(this).attr("data-sort",index);
            $(this).find("a.line1").html("");
            $(this).find("a.line2").html("");
            $(this).find("a.line3").html("");
            index++;
        });
        index = 100000;

        for (var k = 0 ; k <  json.order.length;k++) {
            i = json.order[k];
            if (!(gameIndex == 3 && type >= 2)){
                index = i;
            }

            line2 = obj.find("[data-sort='" + index + "'] a.line2");
            line3 = obj.find("[data-sort='" + index + "'] a.line3");

            line1 = obj.find("[data-sort='" + index + "'] a.line1");
            if (line1.html() != json.oddsList[i]) {
                line1.html(json.oddsList[i]);
            }

            if (json.detailsList && json.detailsList[i][1] == 0 && json.detailsList[i][0] == 0) {
                json.detailsList[i][1] = "-";
            }
            if (json.detailsList && json.detailsList[i][0] == 0 && (json.detailsList[i][1] >= 0 || json.detailsList[i][1] == "-")) {
                json.detailsList[i][0] = "-";
            }
            if (json.detailsList && line2.html() != json.detailsList[i][0]) { //注额
                line2.html(json.detailsList[i][0]);
            }
            if (json.detailsList && line3.html() != json.detailsList[i][1]) { //盈亏
                if (G.NumberSignt(json.detailsList[i][1]) && json.detailsList[i][1] > 0) {
                    line3.addClass("red");
                } else {
                    line3.removeClass("red");
                }
                line3.html(json.detailsList[i][1]);
                if (gameIndex == 5 && parseInt(i) >= 3 && parseInt(i) <= 8) {
                    if (json.detailsList[i][0] > 0 && json.detailsList[i][1] < 0) {
                        obj.find("tr[data-sort='" + index + "']").find("a.to2").html(parseInt(json.detailsList[i][1]) * 2);
                        obj.find("tr[data-sort='" + index + "']").find("a.to3").html(parseInt(json.detailsList[i][1]) * 3);
                    }
                }
            }
            if ((gameIndex == 3 && type >= 2)){
                obj.find("tr[data-sort='" + index + "'] td.bc").html(getDwNameByType(parseInt(i)));
                obj.find("tr[data-sort='" + index + "']").attr("data-sort",i);

            }

            index++;
            if (tjlen > 0 && json.detailsList) {
                if (G.NumberSign(json.detailsList[i][0])) {
                    data_count[0] += parseInt(json.detailsList[i][0]);
                    if (gameIndex == 1 && type == 1828) {
                        if (parseInt(i) >= 50 && parseInt(i) <= 65) {
                            my_count[0] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 115 && parseInt(i) <= 123) {
                            my_count[1] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 124 && parseInt(i) <= 132) {
                            my_count[2] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 133 && parseInt(i) <= 141) {
                            my_count[3] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 142 && parseInt(i) <= 153) {
                            my_count[4] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 155 && parseInt(i) <= 159) {
                            my_count[5] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 160 && parseInt(i) <= 169) {
                            my_count[6] += parseInt(json.detailsList[i][0]);
                        } else if (parseInt(i) >= 741 && parseInt(i) <= 745) {
                            my_count[7] += parseInt(json.detailsList[i][0]);
                        }
                    }
                }
                if (G.NumberSignt(json.detailsList[i][1])) {
                    if (json.detailsList[i][1] < data_count[1]) {
                        data_count[1] = json.detailsList[i][1];
                    }
                    if (json.detailsList[i][1] > data_count[2]) {
                        data_count[2] = json.detailsList[i][1];
                    }
                }
            }
        }
        if (tjlen > 0) {
            obj.find("#total_tongji p").each(function (i) {
                $(this).find("b").html(data_count[i]);
            });
        }
        if (gameIndex == 1 && type == 1828) {
            for (var i = 0; i < my_count.length; i++) {
                obj.find("span[sort-tb='" + (i + 1) + "']").html(my_count[i]);
            }
        }

        //负值排列
        if (obj.find("#fz-sort").length > 0) {
            var mySort = [], dow, num;
            obj.find("#fz-sort tbody tr").each(function () {
                dow = $(this).find("td").eq(3).find("a").html();
                if (G.NumberSignt(dow)) {
                    mySort.push(dow + "|<tr data-sort='" + $(this).attr("data-sort") + "' data-type='" + $(this).attr("data-type") + "' data-name='" + $(this).attr("data-name") + "'>" + $(this).html() + "</tr>");
                } else {
                    num = $(this).find("td").eq(0).html();
                    mySort.push(num + "|<tr data-sort='" + $(this).attr("data-sort") + "' data-type='" + $(this).attr("data-type") + "' data-name='" + $(this).attr("data-name") + "'>" + $(this).html() + "</tr>");
                }
            });
            mySort.sort(function (a, b) {
                var _a = a.split("|")[0], _b = b.split("|")[0];
                return parseInt(_a) - parseInt(_b);
            });
            for (var i = 0; i < mySort.length; i++) {
                mySort[i] = mySort[i].split("|")[1];
            }
            if (mySort.length > 0) {
                obj.find("#fz-sort tbody").html(mySort.join(""));
            }
        }

        if (json.zhuCount) {
            for (var i in json.zhuCount) {
                obj.find("[name='game-count'] tbody a[data-index='" + i + "']").html(json.zhuCount[i][0]);
            }
        }

        //单组明细列表
        if (json.rowList) {
            var table = [], data_bc;
            if (json.rowList.length == 0) {
                table.push("<tr>");
                table.push("<td colspan='4'>暂无数据...</td>");
                table.push("</tr>");
            } else {
                json.rowList.sort(function (x, y) { return x[0].length - y[0].length; });
                for (var i = 0; i < json.rowList.length; i++) {
                    data_bc = i % 2 != 0 ? "bc" : "";
                    table.push("<tr class='" + data_bc + "'>");
                    table.push("<td>" + (i + 1) + "</td>");
                    table.push("<td>" + json.rowList[i][0] + "</td>");
                    table.push("<td>" + json.rowList[i][1] + "</td>");
                    table.push("<td class='red'>-" + json.rowList[i][2] + "</td>");
                    table.push("</tr>");
                }
            }
            obj.find("[name='lm-sortNum'] tbody").html(table.join(""));
            G.mouseover(obj.find("[name='lm-sortNum'] tbody tr"));
        }


        //总额显示
        if (json.countList && json.countList.length > 0) {
            data_count = 0;
            if (gameIndex == 1) {
                for (var i = 0; i < json.countList.length; i++) {
                    data_count += parseInt(json.countList[i]);
                    obj.find("#count-ary tr td[sort-tb='" + i + "']").find("span").html(json.countList[i]);
                }
            } else {
                for (var i = 0; i < json.countList.length; i++) {
                    data_count += parseInt(json.countList[i]);
                    obj.find("#count-ary tr").eq(i).find("span").html(json.countList[i]);
                }
            }
            obj.find("#count-bt").html(data_count);
            obj.find("#count-ary tr td").unbind("click").click(function () {
                var data_type = $(this).attr("my-type");
                msg.data_action = ["gamedata", "gameIndex=" + gameIndex, "type=" + data_type].join("&");
                middleBind({ data_action: msg.data_action });
            });
        }




        //绑定选项事件
        shell.find("#selcheng select").unbind("change").change(function () {
            var myId = $(this).attr("id");
            if (myId != "type" && myId != "myGameSort") {
                reloadData();
            } else if (myId == "type") {
                var mytype = $(this).val();
                middleBind({ data_action: "gamedata&gameIndex=" + gameIndex + "&type=" + mytype });
            } else if (myId == "myGameSort") {
                reloadData();
            }
        });

        shell.find("select[id='odds_k']").unbind("change").change(function () {
            if (endTime > 0) {

                var num = parseInt($(this).val());
                obj.find("tr[style='background: none repeat scroll 0% 0% rgb(255, 0, 0)']").attr("style", "");

                var n = 0;
                obj.find("tr[data-sort]").each(function () {
                    if (n >= num) return false;
                    $(this).attr("style", "background: none repeat scroll 0% 0% rgb(255, 165, 0)");
                    n++;
                })
            }
        });

        obj.find("div[id='game-row'] tr[data-sort]").unbind("click").click(function () {
            if (endTime > 0) {
                if ($(this).attr("style") == "background: none repeat scroll 0% 0% rgb(255, 165, 0)"){
                    $(this).attr("style","");
                }else if ($(this).attr("style") == "" || $(this).attr("style") == undefined){
                    $(this).attr("style","background: none repeat scroll 0% 0% rgb(255, 165, 0)");
                }
            }
        });

        var data_stop = true;
        //允许修改赔率、封盘
        if (__sysinfo.level == 1 && __sysinfo.setodds == 1) {
            shell.find("#setAll-game input[type='button']").unbind("click").click(function () {
                var data_name = $(this).attr("name");
                var name_txt = $(this).attr("value").replace("快速", "").replace("赔", "");
                var data_upOdds = parseFloat(shell.find("#upodds").val());
                var data_oddsk = shell.find("#odds_k").val();
                var oddsk_txt = shell.find("#odds_k").find("option:selected").text();
                var type_txt = shell.find("#type").find("option:selected").text();
                var rebate = shell.find("#rebate").val();
                var data_sort = [], data_action, content;
                if (data_name == "up" || data_name == "down") {
                    content = "【" + type_txt + " " + oddsk_txt + "】 <span class='blue'>" + name_txt + data_upOdds + "</span> 确定操作吗？";
                } else if (data_name == "open" || data_name == "close") {
                    if (endTime < 0) {
                        G.alert({ content: "后台尚未开盘，请在开盘后操作！", ok: function () { return true; } });
                        return false;
                    } else {
                        content = "【" + type_txt + " " + oddsk_txt + "】 <span class='blue'>" + name_txt + "</span> 确定操作吗？";
                    }
                }
                if (data_oddsk >= 0) {
                    obj.find("div[name='game-row'] tr[style='background: none repeat scroll 0% 0% rgb(255, 165, 0)']").each(function () {
                        data_sort.push($(this).attr("data-sort"));
                    });
                } else { //部分索引
                    var myanimalsAry = __sysinfo.animalsAry[data_oddsk].split(",");
                    var mynum;
                    for (var i = 0; i < myanimalsAry.length; i++) {
                        mynum = myanimalsAry[i].length == 1 ? "0" + myanimalsAry[i] : myanimalsAry[i];
                        data_sort.push(obj.find("div[name='game-row'] tr[data-name='" + mynum + "']").attr("data-sort"));
                    }
                }
                if (data_stop) {
                    data_stop = false;
                    data_action = ["gamedata", "rebate=" + rebate, "gameIndex=" + gameIndex, "type=" + type, "auto=" + data_name, "upodds=" + data_upOdds, "data=" + data_sort.join(",")];
                    G.alert({ content: content,
                        ok: function () {
                            G.mask();
                            G.ajax(data_action.join("&"), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    reloadData();
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                            return true;
                        },
                        cancel: function () { },
                        close: function () { data_stop = true; }
                    });
                }
            });
            obj.find("div[name='game-row'] span.odd_set").unbind("click").click(function () {
                var data_name = $(this).attr("name");
                var data_upOdds = parseFloat(shell.find("#upodds").val());
                var data_sort = $(this).siblings("a").attr("data-sort") || $(this).parents("tr").attr("data-sort");
                var rebate = shell.find("#rebate").val();
                var data_action = ["gamedata", "rebate=" + rebate, "gameIndex=" + gameIndex, "type=" + type, "auto=" + data_name, "upodds=" + data_upOdds, "data=" + data_sort];
                if (data_stop) {
                    data_stop = false;
                    G.mask();
                    G.ajax(data_action.join("&"), function (json) {
                        data_stop = true;
                        G.maskClose();
                        if (G.DecimalSign(json.result)) {
                            if (gameIndex == 1 && (type == 30 || type == 31)) {
                                obj.find("a[data-sort='" + data_sort + "']").html(G.forDight(json.result, 4));
                            } else {
                                obj.find("tr[data-sort='" + data_sort + "'] a.line1").html(G.forDight(json.result, 4));
                            }
                        } else {
                            G.alert({ content: json.result, ok: function () { return true; } });
                        }
                    }, function () { G.maskClose(); data_stop = true; });
                }
            });
            obj.find("div[name='game-row'] a.line1").unbind("click").click(function () {
                var data_type = $(this).parents("tr").attr("data-type");
                var data_name = $(this).parents("tr").attr("data-name");
                var data_sort = $(this).attr("data-sort") || $(this).parents("tr").attr("data-sort");
                var data_odds = $(this).html();
                var rebate = shell.find("#rebate").val();
                if (G.DecimalSign(data_odds)) {
                    if (gameIndex == 1 && (type == 3 || type == 6 || type == 808)) {

                    } else if (gameIndex == 1 && type == 1828 && data_sort <= 49) {

                    } else {
                        var content = "<div class='bold' style='margin:5px 5px;'>" + data_type + "[<span class='blue'>" + data_name + "</span>] <span class='red'>" + data_odds + "</span></div>";
                        content += "<div style='margin:3px 5px;'>赔率设置：<input type='text' id='auto-set-odds' class='text-input sw70' value='" + data_odds + "'></div>";
                        G.alert({ title: "赔率设定", content: content, obj: $(this),
                            ok: function () {
                                var data_upOdds = $("#auto-set-odds").val();
                                if (G.DecimalSign(data_upOdds) && data_upOdds != data_odds && data_stop) {
                                    var data_action = ["gamedata", "rebate=" + rebate, "gameIndex=" + gameIndex, "type=" + type, "auto=auto", "upodds=" + data_upOdds, "data=" + data_sort];
                                    data_stop = false;
                                    G.mask();
                                    G.ajax(data_action.join("&"), function (json) {
                                        data_stop = true;
                                        G.maskClose();
                                        if (G.DecimalSign(json.result)) {
                                            if (gameIndex == 1 && (type == 30 || type == 31)) {
                                                obj.find("a[data-sort='" + data_sort + "']").html(G.forDight(json.result, 4));
                                            } else {
                                                obj.find("tr[data-sort='" + data_sort + "'] a.line1").html(G.forDight(json.result, 4));
                                            }
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }
                                    }, function () { G.maskClose(); data_stop = true; });
                                }
                                return true;
                            },
                            cancel: function () { }
                        });
                    }
                }
            });
        }

        //注单明细
        obj.find("#game-row a.line2").unbind("click").click(function () {
            if (json.openDateList.number && data_stop) {
                G.mask();
                data_stop = false;
                var data_sort = $(this).parents("tr").attr("data-sort");
                var data_rebate = shell.find("#rebate").val();
                var data_action = ["daydetails", "gameIndex=" + gameIndex, "type=" + type, "number=" + json.openDateList.number, "sortId=" + data_sort, "rebate=" + data_rebate];
                // G.ajax(data_action.join("&"), function (json) {
                //     json = $.parseJSON('[]');
                    data_stop = true;
                    G.maskClose();
                    var thead = ["注单号", "下注会员", "玩法", "赔率", "下注金额", "退水"];
                    if (__sysinfo.level <= 5) { thead.push("代理"); }
                    if (__sysinfo.level <= 4) { thead.push("总代理"); }
                    if (__sysinfo.level <= 3) { thead.push("股东"); }
                    if (__sysinfo.level <= 2) { thead.push("分公司"); }
                    if (__sysinfo.level <= 1) { thead.push("总监"); }
                    //thead.push("占成收入");
                    var table = [], txt_right;
                    for (var i = 0; i < json.length; i++) {
                        table.push("<tr>");
                        for (var n = 0; n < json[i].length; n++) {
                            txt_right = n >= 4 ? "txt-right" : "";
                            table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                        }
                        table.push("</tr>");
                    }
                    var content = G.overflowDiv({ id: "day-details", height: 570, content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    G.alert({ title: "注单明细", content: content, width: 930,
                        initialize: function () {
                            $("#day-details #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + data_action.join("&"), paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                                appendHtm();
                            });
                            function appendHtm() {
                                G.myLayerImg();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax(my_action, function (json) {
                                    G.myLayerImgClose();
                                    if (json && json.length > 0) {
                                        table = [];
                                        for (var i = 0; i < json.length; i++) {
                                            table.push("<tr>");
                                            for (var n = 0; n < json[i].length; n++) {
                                                txt_right = n >= 4 ? "txt-right" : "";
                                                table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#day-details tbody").append(table.join(""));
                                    } else {
                                        $("#day-details #fondiv").find("a").hide();
                                        $("#day-details #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () {

                            return true;
                        }
                    });
                // }, function () { G.maskClose(); data_stop = true; });
            }
        });

        //全部封盘状态
        G.mouseover(obj.find("div[name='game-row'] tbody tr"));
        if (!G.NumberSign(endTime) && !G.NumberSign(lotteryTime) || (endTime == 0 && lotteryTime == 0)) {
            obj.find("#game-row tbody tr").attr("style", "background: none repeat scroll 0% 0% rgb(230, 230, 230)");
            $("#autoRefresh").html(timeValue + "秒");

            checkgamedatatime = setTimeout(function () { reloadData(); }, 10000);

            return false;
        } else if (endTime <= 0) {
            shell.find("span[name='endTime']").html("00:00");
            obj.find("#game-row tbody tr").attr("style", "background: none repeat scroll 0% 0% rgb(230, 230, 230)");
        } else {
            obj.find("#game-row tbody tr").removeAttr("style");
        }

        //倒计时函数
        S.intervalTime = setInterval(function () {
            if (closeTime > 0) {
                closeTime--;
                shell.find("span[name='closeTime']").html(G.settimes(closeTime));
            } else {
                shell.find("span[name='closeTime']").html("加載中...");
                timeValue = 0;
            }

            timeValue--;
            if (timeValue <= 0) {
                O.title = $("#shell_title").html();
                $("#autoRefresh").html("load...");
                clearInterval(S.intervalTime);
                setTimeout(function () { reloadData(); }, 1000);
            } else {
                $("#autoRefresh").html(timeValue + "秒");
            }
        }, 1000);

        obj.find("tr[data-sort] input[type='radio']").unbind("click").click(function () {
            reloadData();
        });

        //重新加载数据
        function reloadData() {
            var action = [
                "gamedata",
                "gameIndex=" + gameIndex,
                "type=" + shell.find("#type").val(),
                "timeValue=" + shell.find("#timeValue").val(),
                "huoStatus=" + shell.find("#huoStatus").val(),
                "rebate=" + shell.find("#rebate").val(),
                "page=" + $("#currentPage").html(),
                "isCL=1",
                "reload=true"
            ];

            middleBind({ data_action: action.join("&") });
        }

    // }, function () {
    //     if (isCl == null) { G.rollBack(); }
    // });
}

function appenGameData(msg) {

    var gameIndex = msg.gameIndex;
    var type = msg.type;
    var reload = msg.reload;

    var myId = ["game", gameIndex, type].join("_");
    if (!reload) {
        var table = eval(myId + '()');
        closeMiddleAll(null, true);
        var shell = $("#shell_top");
        shell.addClass("shell-top-game");
        shell.find(".shell-top-left").addClass("shell-top-left-game");
        shell.find(".shell-top-right").addClass("shell-top-right-game");
        shell.find(".shell-title-icon").addClass("shell-title-icon-game");
        //右侧条件选择，包括总监赔率调整选择
        var myobj = gettype(gameIndex, type);
        shell.append("<div id='game-seet'>" + gameTitle(myobj.op, myobj.vtype) + "</div>");
        var mytitle = "<table style='width:100%;' border='0' cellpadding='0' cellspacing='0'>"
            + "<tr>"
            + "<td style='width:370px;height:15px;'><span class='bold' id='mytype'></span> 【第<span class='bold green' name='number'></span>期】</td>"
            + "<td>第<span class='bold blue' name='newnumber'></span>期赛果:</td>"
            + "</tr>"
            + "<tr>"
            + "<td style='height:35px;'><span name='closeTime-txt'>距封盘：</span><span class='bold' name='closeTime'>00:00</span>&nbsp;&nbsp;&nbsp;&nbsp;今天输贏：<span class='bold red' name='win'>0</span></td>"
            + "<td><span name='numList' style='height:30px;overflow:hidden;display:inline-block;'></span></td>"
            + "</tr>"
            + "</table>";
        $("#shell_title").html(mytitle);
        $("#mytype").html(myobj.type);
        if ($("#middleContent #" + myId).length == 0) {
            table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
            $("#middleContent").append(table).show();
        } else {
            $("#middleContent #" + myId).show();
        }
    }
    return $("#" + myId);
}
function gameTitle(optAry, vtype) {
    var op = optAry.join("");
    var _vtype = vtype;
    var title = "<table style='width:100%;' border='0' cellpadding='0' cellspacing='0'>"
        + "<tr>"
        + "<td style='height:15px;' id='selcheng'>"
        + "更新：<select id='timeValue'><option value='10'>10秒</option><option value='20'>20秒</option><option value='30' selected=''>30秒</option></select>"
        + "<select id='myGameSort' class='hiden'><option value='0'>按亏损排列</option><option value='1'>按球号排列</option></select>"
        + "<select id='type'>" + _vtype + "</select>"
        + "<select id='huoStatus'><option value='1' selected=''>实占</option><option value='0'>虚货</option></select>"
        + "&nbsp;<span><span id='autoRefresh'>20秒</span>后更新数据</span>"
        + "</td>"
        + "</tr>"
        + "<tr id='setAll-game' class='hidden'>"
        + "<td style='height:30px;'>"
        + "<select id='upodds'><option value='0.001'>0.001</option><option value='0.003'>0.003</option><option value='0.005'>0.005</option><option value='0.01' selected=''>0.01</option><option value='0.03'>0.03</option><option value='0.05'>0.05</option><option value='0.1'>0.1</option><option value='0.3'>0.3</option><option value='0.5'>0.5</option><option value='1'>1</option><option value='3'>3</option><option value='5'>5</option></select>"
        + "<select id='odds_k'><option value='0'>0</option><option value='10'>10</option><option value='20'>20</option>" +
        "<option value='30'>30</option><option value='40'>40</option><option value='50'>50</option><option value='60'>60</option><option value='70'>70</option><option value='80'>80</option><option value='90'>90</option><option value='100'>100</option></select>"
        + "&nbsp;<input type='button' name='up' value='升赔'>"
        + "&nbsp;<input type='button' name='down' value='降赔'>"
        + "&nbsp;<input type='button' name='close' value='快速封盘'>"
        + "&nbsp;<input type='button' name='open' value='快速开盘'>"
        + "</td>"
        + "</tr>"
        + "</table>";
    return title;
}
function gettype(gameIndex, typeid) {
    if (gameIndex == "3") {
        if (typeid == 1){
            return {
                type: "单码",
                vtype: "<option value='1' selected=''>单码</option>",
                op: []
            };
        }else if (typeid >= 2 && typeid <= 12){
            return {
                type: "二字定",
                vtype: "<option value='12' selected=''>全部</option>" +
                    "<option value='2' selected=''>万千XXX</option>" +
                    "<option value='3' selected=''>万X百XX</option>" +
                    "<option value='4' selected=''>万XX十X</option>" +
                    "<option value='5' selected=''>万XXX个</option>" +
                    "<option value='6' selected=''>X千百XX</option>" +
                    "<option value='7' selected=''>X千X十X</option>" +
                    "<option value='8' selected=''>X千XX个</option>" +
                    "<option value='9' selected=''>XX百十X</option>" +
                    "<option value='10' selected=''>XX百X个</option>" +
                    "<option value='11' selected=''>XXX十个</option>",
                op: []
            };
        }else if (typeid >= 13 && typeid <= 23){
            return {
                type: "三字定",
                vtype: "<option value='23' selected=''>全部</option>" +
                    "<option value='13' selected=''>万千百XX</option>" +
                    "<option value='14' selected=''>万千X十X</option>" +
                    "<option value='15' selected=''>万千XX个</option>" +
                    "<option value='16' selected=''>万X百十X</option>" +
                    "<option value='17' selected=''>万X百X个</option>" +
                    "<option value='18' selected=''>万XX十个</option>" +
                    "<option value='19' selected=''>X千百十X</option>" +
                    "<option value='20' selected=''>X千百X个</option>" +
                    "<option value='21' selected=''>X千X十个</option>" +
                    "<option value='22' selected=''>XX百十个</option>",
                op: []
            };
        }else if (typeid >= 24 && typeid <= 29){
            return {
                type: "四字定",
                vtype: "<option value='29' selected=''>全部</option>" +
                    "<option value='24' selected=''>万千百十X</option>" +
                    "<option value='25' selected=''>万千百X个</option>" +
                    "<option value='26' selected=''>万千X十个</option>" +
                    "<option value='27' selected=''>万X百十个</option>" +
                    "<option value='28' selected=''>X千百十个</option>",
                op: []
            };
        }

    } else if (gameIndex == "4" ) {
        if (typeid == 1) {
            return {
                type: "冠、亚军 组合",
                vtype: "<option value='1' selected=''>冠、亚军 组合</option>",
                op: []
            };
        } else if (typeid == 2) {
            return {
                type: "三、四、五、六名",
                vtype: "<option value='2' selected=''>三、四、五、六名</option>",
                op: []
            };
        } else if (typeid == 3) {
            return {
                type: "七、八、九、十名",
                vtype: "<option value='3' selected=''>七、八、九、十名</option>",
                op: []
            };
        } else if (typeid == 4) {
            return {
                type: "1~10名总匯",
                vtype: "<option value='4' selected=''>全部</option>",
                op: []
            };
        }

    }
}
function getop() {
    return [
        "<optgroup label='生肖'>",
        "<option value='1'>鼠</option>",
        "<option value='2'>牛</option>",
        "<option value='3'>虎</option>",
        "<option value='4'>兔</option>",
        "<option value='5'>龍</option>",
        "<option value='6'>蛇</option>",
        "<option value='7'>馬</option>",
        "<option value='8'>羊</option>",
        "<option value='9'>猴</option>",
        "<option value='10'>雞</option>",
        "<option value='11'>狗</option>",
        "<option value='12'>猪</option>",
        "</optgroup>",
        "<optgroup label='色波'>",
        "<option value='13' style='color:red'>紅波</option>",
        "<option value='22' style='color:blue'>藍波</option>",
        "<option value='31' style='color:green'>綠波</option>",
        "</optgroup>",
        "<optgroup label='半波'>",
        "<option value='14' style='color:red'>紅单</option>",
        "<option value='15' style='color:red'>紅雙</option>",
        "<option value='16' style='color:red'>紅大</option>",
        "<option value='17' style='color:red'>紅小</option>",
        "<option value='23' style='color:blue'>藍单</option>",
        "<option value='24' style='color:blue'>藍雙</option>",
        "<option value='25' style='color:blue'>藍大</option>",
        "<option value='26' style='color:blue'>藍小</option>",
        "<option value='32' style='color:green'>綠单</option>",
        "<option value='33' style='color:green'>綠雙</option>",
        "<option value='34' style='color:green'>綠大</option>",
        "<option value='35' style='color:green'>綠小</option>",
        "</optgroup>",
        "<optgroup label='半半波'>",
        "<option value='18' style='color:red'>紅大单</option>",
        "<option value='19' style='color:red'>紅大雙</option>",
        "<option value='20' style='color:red'>紅小单</option>",
        "<option value='21' style='color:red'>紅小雙</option>",
        "<option value='27' style='color:blue'>藍大单</option>",
        "<option value='28' style='color:blue'>藍大雙</option>",
        "<option value='29' style='color:blue'>藍小雙</option>",
        "<option value='30' style='color:blue'>藍小单</option>",
        "<option value='36' style='color:green'>綠大单</option>",
        "<option value='37' style='color:green'>綠大雙</option>",
        "<option value='38' style='color:green'>綠小单</option>",
        "<option value='39' style='color:green'>綠小雙</option>",
        "</optgroup>",
        "<optgroup label='頭數'>",
        "<option value='49'>0頭</option>",
        "<option value='50'>1頭</option>",
        "<option value='51'>2頭</option>",
        "<option value='52'>3頭</option>",
        "<option value='53'>4頭</option>",
        "</optgroup>",
        "<optgroup label='尾數'>",
        "<option value='54'>0尾</option>",
        "<option value='55'>1尾</option>",
        "<option value='56'>2尾</option>",
        "<option value='57'>3尾</option>",
        "<option value='58'>4尾</option>",
        "<option value='59'>5尾</option>",
        "<option value='60'>6尾</option>",
        "<option value='61'>7尾</option>",
        "<option value='62'>8尾</option>",
        "<option value='63'>9尾</option>",
        "</optgroup>"
    ];
}

