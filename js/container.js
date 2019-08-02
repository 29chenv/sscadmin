//------------appenDatum-------------------
function appenDatum(msg) {
    closeMiddleAll();
    var title = "总监参数设置 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);
    var myId = msg.data_action.replace("&", "-").replace("=", "-");
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table' id='jiben'><thead><tr><th colspan='2'>基本信息</th></tr></thead>",
            "<tbody>",
            "<td class='w25 txt-right bc'>限制在线会员:</td><td class='txt-left txt-paddin-left'><input type='text' name='maxOnline' class='text-input sw90' maxlength='8' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>验证IP端口:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='ipPort' /></td>",
            "</tr>",
            "</tbody>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table' id='quanx'><thead><tr><th colspan='2'>权限控制</th></tr></thead>",
            "<tbody>",

            "<tr>",
            "<td class='w25 txt-right bc'>赔率设置:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='SetOddsID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='SetOddsID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>自动跳水:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='AutoOddsID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='AutoOddsID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>关盘设置:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='SetNumberID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='SetNumberID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>注单管理:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='ReportInfoID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='ReportInfoID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>公告管理:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='NewsInfoID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='NewsInfoID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>在线查询:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='OnLineID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='OnLineID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>日志查询:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='OperatingLogID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='OperatingLogID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>删改管理:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='OperateOrderID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='OperateOrderID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>充值管理:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='ChongZhiID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='ChongZhiID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>提现管理:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='TiXianID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='TiXianID' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>自动备份:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='BeiFenID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='BeiFenID' value='1' />启用</label></td>",
            "</tr>",

            "<tr>",
            "<td class='w25 txt-right bc'>模式:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='ModelID' value='0' />信用</label> <label class='label-box'><input type='radio' name='ModelID' value='1' />现金</label></td>",
            "</tr>",

            "<tr>",
            "<td class='w25 txt-right bc'>版面切换:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='BanMianID' value='0' />禁用</label> <label class='label-box'><input type='radio' name='BanMianID' value='1' />启用</label></td>",
            "</tr>",

            "</tbody>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table' id='ipset'><thead><tr><th colspan='4'>线路分配</th></tr></thead>",
            "<tbody>",
            "<tr><td colspan='2' class='bold bc'>主线路(域名：xx.xx.com 或 IP地址)</td><td colspan='2' class='bold bc'>备用线路(域名：xx.xx.com 或 IP地址)</td></tr>",
            "<tr>",
            "<td class='w20 txt-right bc'>主线路一:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_1' value=''> <label class='label-box'><input type='radio' name='IP_1_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_1_S' value='1' />启用</label></td>",
            "<td class='w20 txt-right bc'>备用线路一:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_5' value=''> <label class='label-box'><input type='radio' name='IP_5_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_5_S' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w20 txt-right bc'>主线路二:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_2' value=''> <label class='label-box'><input type='radio' name='IP_2_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_2_S' value='1' />启用</label></td>",
            "<td class='w20 txt-right bc'>备用线路二:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_6' value=''> <label class='label-box'><input type='radio' name='IP_6_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_6_S' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w20 txt-right bc'>主线路三:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_3' value=''> <label class='label-box'><input type='radio' name='IP_3_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_3_S' value='1' />启用</label></td>",
            "<td class='w20 txt-right bc'>备用线路三:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_7' value=''> <label class='label-box'><input type='radio' name='IP_7_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_7_S' value='1' />启用</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w20 txt-right bc'>主线路四:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_4' value=''> <label class='label-box'><input type='radio' name='IP_4_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_4_S' value='1' />启用</label></td>",
            "<td class='w20 txt-right bc'>备用线路四:</td><td class='txt-left txt-paddin-left'><input type='text' class='text-input w50' name='IP_8' value=''> <label class='label-box'><input type='radio' name='IP_8_S' value='0' />停用</label><label class='label-box'><input type='radio' name='IP_8_S' value='1' />启用</label></td>",
            "</tr>",
            "</tbody>",
            "<tfoot><tr><td colspan='4' style='padding-top:20px;'><span class='text-btn' id='submit'>保存设置</span><span class='text-btn' id='bakOdds'>默認赔率</span></td></tr></tfoot>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}

//------------appenGglobalr-------------------
function appenGglobalr(msg) {
    closeMiddleAll();
    var title = "系统设置 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);
    var myId = msg.data_action.replace("&", "-").replace("=", "-");
    if ($("#middleContent #" + myId).length == 0) {

        var table;
        if (__sysinfo.ModelID == 1) {
            table = [
                "<table class='middle-table' id='jiben'><thead><tr><th colspan='2'>全局设置</th></tr></thead>",
                "<tbody>",
                "<tr>",
                "<td class='w25 txt-right bc'>系统标题:</td><td class='txt-left txt-paddin-left'><input type='text' name='WebTitle' class='text-input sw90' maxlength='4' value='' msg='2-4位中文或數字或字母。'></td>",
                "</tr>",
                "<tr>",
                // "<td class='w25 txt-right bc'>导航验证码:</td><td class='txt-left txt-paddin-left'><input type='text' name='WebCode' class='text-input sw90' maxlength='8' value='' msg='4-8位純數字組成。'></td>",
                // "</tr>",
                // "<tr>",
                "<td class='w25 txt-right bc'>下级占成修改:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='IsSuperior' value='0' />禁用</label> <label class='label-box'><input type='radio' name='IsSuperior' value='1' />启用</label> <span class='red'> 說明：启用后下级会员有下註依然可修改占成。</span></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>赔率变色(降):</td><td class='txt-left txt-paddin-left'>一定(pk10):<input type='text' name='yiding' class='text-input sw90'>二定:<input type='text' name='erding' class='text-input sw90'>三定:<input type='text' name='sanding' class='text-input sw90'>四定:<input type='text' name='siding' class='text-input sw90'></td>",
                "</tr>",


                // "<tr>",
                // "<td class='w25 txt-right bc'>下级及会员账单下载:</td>",
                // "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='detailsBak' value='0' />禁用</label> <label class='label-box'><input type='radio' name='detailsBak' value='1' />启用</label></td>",
                // "</tr>",


                "</tbody>",
                "</table>",
                "<div id='all'>",
                "<div class='clear'></div>",

                "<div class='clear'></div>",
                "<table class='middle-table hiden' data-index='2'><thead><tr><th colspan='14'>快彩</th></tr></thead>",
                "<tbody gameIndex='klc'>",
                // "<tr>",
                //     "<td class='txt-right bc w7'>重庆时时彩:</td>",
                // "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='SSC' value='0' />关闭</label> <label class='label-box'><input type='radio' name='SSC' value='1' />開启</label></td>",
                // "<td class='txt-right bc w7'>北京赛车(PK10):</td>",
                // "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='PK' value='0' />关闭</label> <label class='label-box'><input type='radio' name='PK' value='1' />開启</label></td>",
                //   "</tr>",


                "<tr>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
                "<tfoot><tr><td style='padding-top:20px;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
                "</table>"
            ];
        } else {

            table = [
                "<table class='middle-table' id='jiben'><thead><tr><th colspan='2'>全局设置</th></tr></thead>",
                "<tbody>",
                "<tr>",
                "<td class='w25 txt-right bc'>系统标题:</td><td class='txt-left txt-paddin-left'><input type='text' name='WebTitle' class='text-input sw90' maxlength='4' value='' msg='2-4位中文或數字或字母。'></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>导航验证码:</td><td class='txt-left txt-paddin-left'><input type='text' name='WebCode' class='text-input sw90' maxlength='8' value='' msg='4-8位純數字組成。'></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>下级占成修改:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='IsSuperior' value='0' />禁用</label> <label class='label-box'><input type='radio' name='IsSuperior' value='1' />启用</label> <span class='red'> 說明：启用后下级会员有下註依然可修改占成。</span></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>下级自动補貨修改:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='IsAutoShipments' value='0' />禁用</label> <label class='label-box'><input type='radio' name='IsAutoShipments' value='1' />启用</label> <span class='red'> 說明：启用后下级会员有下註依然可修改自动補貨。</span></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>下级及会员账单下载:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='detailsBak' value='0' />禁用</label> <label class='label-box'><input type='radio' name='detailsBak' value='1' />启用</label></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>两面长龙排行:</td>",
                "<td class='txt-left txt-paddin-left'><select name='clindex'><option value='0'>关闭</option><option value='2'>2期</option><option value='3'>3期</option><option value='4'>4期</option><option value='5'>5期</option><option value='6'>6期</option><option value='7'>7期</option><option value='8'>8期</option><option value='9'>9期</option><option value='10'>10期</option></select></td>",
                "</tr>",
                "<tr>",
                "<td class='w25 txt-right bc'>单注最高派彩:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' number='' name='MaxPayout' class='text-input sw70' value='' maxlength='9' msg='1-9位純數字組成。'></td>",
                "</tr>",



                (__sysinfo.level != 0 ? "" : "<tr><td class='w25 txt-right bc'>系统版面:</td><td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='PageType' value='0' />1.现金迪士尼</label> <label class='label-box'><input type='radio' name='PageType' value='1' />2.现金双赢</label> <label class='label-box'><input type='radio' name='PageType' value='2' />3.现金66彩票</label> <label class='label-box'><input type='radio' name='PageType' value='3' />4.信用蓝色</label> <label class='label-box'><input type='radio' name='PageType' value='4' />5.信用绿色</label> <label class='label-box'><input type='radio' name='PageType' value='5' />6.现金绿色</label></td></tr>"),


                "</tbody>",
                "</table>",
                "<div id='all'>",
                "<div class='clear'></div>",
                "<table class='middle-table hiden' data-index='0'><thead><tr><th colspan='14'>香港樂透HK</th></tr></thead>",
                "<tbody>",
                "<tr>",
                "<td class='txt-right bc w7'>特码A:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK1' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK1' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>特码B:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK2' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK2' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>色波:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK3' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK3' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>特肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK4' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK4' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>2肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK5' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK5' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>3肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK6' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK6' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>4肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK7' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK7' value='1' />開启</label></td>",
                "</tr>",
                "<tr>",
                "<td class='txt-right bc w7'>5肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK8' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK8' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>6肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK9' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK9' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>頭數:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK10' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK10' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>尾數:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK11' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK11' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>正码总和:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK12' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK12' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>正码特:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK13' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK13' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>平特一肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK14' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK14' value='1' />開启</label></td>",
                "</tr>",
                "<tr>",
                "<td class='txt-right bc w7'>平特尾數:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK15' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK15' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>正肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK16' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK16' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>7色波:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK17' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK17' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>总肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK18' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK18' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>五行:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK19' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK19' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>連肖:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK20' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK20' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>連尾:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK21' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK21' value='1' />開启</label></td>",
                "</tr>",
                "<tr>",
                "<td class='txt-right bc w7'>連码:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK22' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK22' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>5不中:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK23' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK23' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>6不中:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK24' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK24' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>7不中:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK25' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK25' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>8不中:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK26' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK26' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>9不中:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK27' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK27' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>10不中:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='HK28' value='0' />关闭</label> <label class='label-box'><input type='radio' name='HK28' value='1' />開启</label></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "<div class='clear'></div>",
                "<table class='middle-table hiden' data-index='2'><thead><tr><th colspan='14'>快彩</th></tr></thead>",
                "<tbody gameIndex='klc'>",
                "<tr>",
                "<td class='txt-right bc w7'>廣東快樂十分:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='KLC' value='0' />关闭</label> <label class='label-box'><input type='radio' name='KLC' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>河内5分彩:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='SSC' value='0' />关闭</label> <label class='label-box'><input type='radio' name='SSC' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>北京赛车(PK10):</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='PK' value='0' />关闭</label> <label class='label-box'><input type='radio' name='PK' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>江蘇骰寶(快3):</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='KS' value='0' />关闭</label> <label class='label-box'><input type='radio' name='KS' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>北京快樂8:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='KLB' value='0' />关闭</label> <label class='label-box'><input type='radio' name='KLB' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>重慶幸運農場:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='NC' value='0' />关闭</label> <label class='label-box'><input type='radio' name='NC' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>廣西快樂十分:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='GX' value='0' />关闭</label> <label class='label-box'><input type='radio' name='GX' value='1' />開启</label></td>",
                "</tr>",
                "<td class='txt-right bc w7'>幸運飛艇:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='FT' value='0' />关闭</label> <label class='label-box'><input type='radio' name='FT' value='1' />開启</label></td>",
                "<td class='txt-right bc w7'>广西快3:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='GXKS' value='0' />关闭</label> <label class='label-box'><input type='radio' name='GXKS' value='1' />開启</label></td>",

                "<td class='txt-right bc w7'>极速赛车:</td>",
                "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='radio' name='PKJS' value='0' />关闭</label> <label class='label-box'><input type='radio' name='PKJS' value='1' />開启</label></td>",


                "<tr>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
                "<tfoot><tr><td style='padding-top:20px;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
                "</table>"
            ];
        }
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}

//------------appendSetOdds-------------------
function appendSetOdds(msg) {
    closeMiddleAll();
    var title = "赔率设置 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);

    //绑定titleNav
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var titleNavAry = ["<select data-id='gameIndex'>"];
    $("#gameList li a").each(function () {
        titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
    });
    titleNavAry.push("</select>");
    forceMiddle({ titleNav: titleNavAry.join("") });
    $("#title-nav").addClass("title-nav-right");
    $("select[data-id='gameIndex']").val(gameIndex);
    $("select[data-id]").unbind("change").change(function () {
        middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
    });

    var myId = msg.data_action.replace("&", "-").replace("=", "-");
    if ($("#middleContent #" + myId).length == 0) {
        var table, gameIndexTxt = $("#gameList a[data-index='" + gameIndex + "']").html();
        if (gameIndex == 3) {
            table = [
                "<table class='middle-table'>",
                "<thead>",
                "<tr><th>" + gameIndexTxt + "</th></tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' width='100%'>",
                "<thead>",
                "<tr>",
                "<td>",
                "<div style='float:left;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率</th><th>最高赔率</th><th>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr>",
                "<td class='bc sw120'>一定位</td>",
                "<td colspan='6'></td>",
                "</tr>",
                "<tr sort='1'>",
                "<td class='bc sw120'>第一球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='15'>",
                "<td class='bc sw120'>第二球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='29'>",
                "<td class='bc sw120'>第三球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='43'>",
                "<td class='bc sw120'>第四球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='57'>",
                "<td class='bc sw120'>第五球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr>",
                "<td class='bc sw120'>二定位</td>",
                "<td colspan='6'></td>",
                "</tr>",
                "<tr sort='108'>",
                "<td class='bc sw120'>万千XXX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='208'>",
                "<td class='bc sw120'>万X百XX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='308'>",
                "<td class='bc sw120'>万XX十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='408'>",
                "<td class='bc sw120'>万XXX个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='508'>",
                "<td class='bc sw120'>X千百XX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='608'>",
                "<td class='bc sw120'>X千X十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='708'>",
                "<td class='bc sw120'>X千XX个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='808'>",
                "<td class='bc sw120'>XX百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='908'>",
                "<td class='bc sw120'>XX百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='1008'>",
                "<td class='bc sw120'>XXX十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style='float:right;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率</th><th>最高赔率</th><th>选择</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr>",
                "<td class='bc sw120'>三定位</td>",
                "<td colspan='6'></td>",
                "</tr>",

                "<tr sort='1108'>",
                "<td class='bc sw120'>万千百XX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='2108'>",
                "<td class='bc sw120'>万千X十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='3108'>",
                "<td class='bc sw120'>万千XX个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='4108'>",
                "<td class='bc sw120'>万X百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='5108'>",
                "<td class='bc sw120'>万X百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='6108'>",
                "<td class='bc sw120'>万XX十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='7108'>",
                "<td class='bc sw120'>X千百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='8108'>",
                "<td class='bc sw120'>X千百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='9108'>",
                "<td class='bc sw120'>X千X十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='10108'>",
                "<td class='bc sw120'>XX百十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr>",
                "<td class='bc sw120'>四定位</td>",
                "<td colspan='6'></td>",
                "</tr>",
                "<tr sort='11108'>",
                "<td class='bc sw120'>万千百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='21108'>",
                "<td class='bc sw120'>万千百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='31108'>",
                "<td class='bc sw120'>万千X十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='41108'>",
                "<td class='bc sw120'>万X百十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='51108'>",
                "<td class='bc sw120'>X千百十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "</td>",
                "</tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
                "<tfoot>",
                "<tr><td style='padding-top:10px;' id='od-set'>",

                "</td></tr>",
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span><span class='text-btn' id='reset'>重置选项</span></td></tr>",
                "</tfoot>",
                "</table>"
            ];
        } else if (gameIndex == 4) {
            table = [
                "<table class='middle-table'>",
                "<thead>",
                "<tr><th>" + gameIndexTxt + "</th></tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' width='100%'>",
                "<thead>",
                "<tr>",
                "<td>",
                "<div style='float:left;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率</th><th>最高赔率</th><th>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr sort='22'>",
                "<td class='bc sw120'>1-10单码</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='36'>",
                "<td class='bc sw120'>1-5龙虎</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='18'>",
                "<td class='bc sw120'>冠亚单</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='19'>",
                "<td class='bc sw120'>冠亚双</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='20'>",
                "<td class='bc sw120'>冠亚大</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='21'>",
                "<td class='bc sw120'>冠亚小</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style='float:right;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率</th><th>最高赔率</th><th>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr sort='1'>",
                "<td class='bc sw120'>冠亚和-3,4,18,19</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='3'>",
                "<td class='bc sw120'>冠亚和-5,6,16,17</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='5'>",
                "<td class='bc sw120'>冠亚和-7,8,14,15</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='7'>",
                "<td class='bc sw120'>冠亚和-9,10,12,13</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "<tr sort='9'>",
                "<td class='bc sw120'>冠亚和-11</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='checkbox' /></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "</td>",
                "</tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
                "<tfoot>",
                "<tr><td style='padding-top:10px;' id='od-set'>",

                "</td></tr>",
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span><span class='text-btn' id='reset'>重置选项</span></td></tr>",
                "</tfoot>",
                "</table>"
            ];
        }
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}

//------------appendAutoOdds-------------------
function appendAutoOdds(msg) {
    closeMiddleAll();
    var title = "自动跳水 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);

    //绑定titleNav
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var titleNavAry = ["<select data-id='gameIndex'>"];
    $("#gameList li a").each(function () {
        titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
    });
    titleNavAry.push("</select>");
    forceMiddle({ titleNav: titleNavAry.join("") });
    $("#title-nav").addClass("title-nav-right");
    $("select[data-id='gameIndex']").val(gameIndex);
    $("select[data-id]").unbind("change").change(function () {
        middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
    });

    var myId = msg.data_action.replace("&", "-").replace("=", "-");
    if ($("#middleContent #" + myId).length == 0) {
        var table, gameIndexTxt = $("#gameList a[data-index='" + gameIndex + "']").html();
        if (gameIndex == 3) {
            table = [
                "<table class='middle-table'>",
                "<thead>",
                "<tr><th>" + gameIndexTxt + "</th></tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' width='100%'>",
                "<thead>",
                "<tr>",
                "<td>",
                "<div style='float:left;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>下调赔率</th><th>累计额度</th><th>最低赔率</th><th class='w20'>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr>",
                "<td >一字定</td>",
                "<td colspan='4'></td>",
                "</tr>",
                "<tr sort='1'>",
                "<td class='bc'>第一球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='15'>",
                "<td class='bc'>第二球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='29'>",
                "<td class='bc'>第三球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='43'>",
                "<td class='bc'>第四球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='57'>",
                "<td class='bc'>第五球</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr>",
                "<td >二字定</td>",
                "<td colspan='4'></td>",
                "</tr>",
                "<tr sort='108'>",
                "<td class='bc sw120'>万千XXX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='208'>",
                "<td class='bc sw120'>万X百XX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='308'>",
                "<td class='bc sw120'>万XX十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='408'>",
                "<td class='bc sw120'>万XXX个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='508'>",
                "<td class='bc sw120'>X千百XX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='608'>",
                "<td class='bc sw120'>X千X十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='708'>",
                "<td class='bc sw120'>X千XX个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='808'>",
                "<td class='bc sw120'>XX百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='908'>",
                "<td class='bc sw120'>XX百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='1008'>",
                "<td class='bc sw120'>XXX十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style='float:right;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>下调赔率</th><th>累计额度</th><th>最低赔率</th><th class='w20'>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr>",
                "<td >三字定</td>",
                "<td colspan='4'></td>",
                "</tr>",
                "<tr sort='1108'>",
                "<td class='bc sw120'>万千百XX</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='2108'>",
                "<td class='bc sw120'>万千X十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='3108'>",
                "<td class='bc sw120'>万千XX个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='4108'>",
                "<td class='bc sw120'>万X百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='5108'>",
                "<td class='bc sw120'>万X百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='6108'>",
                "<td class='bc sw120'>万XX十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='7108'>",
                "<td class='bc sw120'>X千百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='8108'>",
                "<td class='bc sw120'>X千百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='9108'>",
                "<td class='bc sw120'>X千X十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='10108'>",
                "<td class='bc sw120'>XX百十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<td >四字定</td>",
                "<td colspan='4'></td>",
                "</tr>",
                "<tr sort='11108'>",
                "<td class='bc sw120'>万千百十X</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='21108'>",
                "<td class='bc sw120'>万千百X个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='31108'>",
                "<td class='bc sw120'>万千X十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='41108'>",
                "<td class='bc sw120'>万X百十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='51108'>",
                "<td class='bc sw120'>X千百十个</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "</td>",
                "</tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
                "<tfoot>",
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span><span class='text-btn' id='all1'>按占成</span><span class='text-btn' id='all2'>按單筆</span></td></tr>",
                "</tfoot>",
                "</table>"
            ];
        } else if (gameIndex == 4 || gameIndex == 8) {
            table = [
                "<table class='middle-table'>",
                "<thead>",
                "<tr><th>" + gameIndexTxt + "</th></tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' width='100%'>",
                "<thead>",
                "<tr>",
                "<td>",
                "<div style='float:left;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>下调赔率</th><th>累计额度</th><th>最低赔率</th><th class='w20'>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr sort='22'>",
                "<td class='bc'>1-10單码</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='32'>",
                "<td class='bc'>1-10單雙</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='34'>",
                "<td class='bc'>1-10大小</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='36'>",
                "<td class='bc'>1-5龍虎</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='18'>",
                "<td class='bc'>冠亞單</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='19'>",
                "<td class='bc'>冠亞雙</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='20'>",
                "<td class='bc'>冠亞大</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='21'>",
                "<td class='bc'>冠亞小</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style='float:right;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>下调赔率</th><th>累计额度</th><th>最低赔率</th><th class='w20'>选项</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr sort='1'>",
                "<td class='bc'>冠亞和-3,4,18,19</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='3'>",
                "<td class='bc'>冠亞和-5,6,16,17</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='5'>",
                "<td class='bc'>冠亞和-7,8,14,15</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='7'>",
                "<td class='bc'>冠亞和-9,10,12,13</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "<tr sort='9'>",
                "<td class='bc'>冠亞和-11</td>",
                "<td><input type='text' autocomplete='off' ext='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><input type='text' autocomplete='off' exts='' class='text-input sw70' /></td>",
                "<td><select><option value='0'>累计占成</option><option value='1'>单笔注额</option></select></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "</td>",
                "</tr>",
                "</thead>",
                "</table>",
                "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
                "<tfoot>",
                "<tr><td class='txt-left txt-paddin-left' style='height:30px; line-height:30px;'>&nbsp;两面联动同路号码跳水比例:<input type='text' class='text-input sw50' name='TongLuOdds' number='' maxlength='3' value='' />&nbsp;注：增大两面同路号码跳水比例可能会出现同路号码赔率偏小情况，请慎重修改！</td></tr>",
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span><span class='text-btn' id='all1'>按占成</span><span class='text-btn' id='all2'>按單筆</span></td></tr>",
                "</tfoot>",
                "</table>"
            ];
        }

        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}

//------------appendLmAutoOdds-------------------
function appendLmAutoOdds(msg) {
    closeMiddleAll();
    var title = "两面跳水 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);

    //绑定titleNav
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    var titleNavAry = ["<select data-id='gameIndex'>"];
    $("#gameList li a").each(function () {
        if ($(this).attr("data-index") != 5) {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        }
    });
    titleNavAry.push("</select>");
    forceMiddle({ titleNav: titleNavAry.join("") });
    $("#title-nav").addClass("title-nav-right");
    $("select[data-id='gameIndex']").val(gameIndex);
    $("select[data-id]").unbind("change").change(function () {
        middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
    });

    var myId = msg.data_action.replace("&", "-").replace("=", "-");
    if ($("#middleContent #" + myId).length == 0) {
        var table, gameIndexTxt = $("#gameList a[data-index='" + gameIndex + "']").html();
        table = [
            "<table class='middle-table'>",
            "<thead>",
            "<tr><th>" + gameIndexTxt + "</th></tr>",
            "</thead>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table'>",
            "<tbody>",
            "<tr>",
            "<td class='w20 bc'>两面自动跳水</td>",
            "<td class='txt-left'>",
            "<p>",
            "<span>同路“号码”随大路降赔率比例 <input value='' name='TongLuOdds' class='text-input sw30' maxlength='3'> (0为不随降)</span>",
            "<ul style='float:left; width:290px;line-height:20px; margin-top:5px; margin-bottom:5px;'>",
            "<li>&nbsp;&nbsp;1期没出降<input value='' name='A_1' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_1' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;2期没出降<input value='' name='A_2' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_2' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;3期没出降<input value='' name='A_3' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_3' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;4期没出降<input value='' name='A_4' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_4' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;5期没出降<input value='' name='A_5' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_5' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;6期没出降<input value='' name='A_6' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_6' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;7期没出降<input value='' name='A_7' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_7' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;8期没出降<input value='' name='A_8' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_8' maxlength='6'  class='text-input sw70'></li>",
            "<li>&nbsp;&nbsp;9期没出降<input value='' name='A_9' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_9' maxlength='6'  class='text-input sw70'></li>",
            "<li>10期没出降<input value='' name='A_10' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_10' maxlength='6'  class='text-input sw70'></li>",
            "<li>11期没出降<input value='' name='A_11' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_11' maxlength='6'  class='text-input sw70'></li>",
            "<li>12期没出降<input value='' name='A_12' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_12' maxlength='6'  class='text-input sw70'></li>",
            "<li>13期没出降<input value='' name='A_13' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_13' maxlength='6'  class='text-input sw70'></li>",
            "</ul>",
            "<ul style='float:left;width:260px;line-height:20px; margin-top:5px; margin-bottom:5px;'>",
            "<li>14期没出降<input value='' name='A_14' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_14' maxlength='6'  class='text-input sw70'></li>",
            "<li>15期没出降<input value='' name='A_15' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_15' maxlength='6'  class='text-input sw70'></li>",
            "<li>16期没出降<input value='' name='A_16' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_16' maxlength='6'  class='text-input sw70'></li>",
            "<li>17期没出降<input value='' name='A_17' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_17' maxlength='6'  class='text-input sw70'></li>",
            "<li>18期没出降<input value='' name='A_18' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_18' maxlength='6'  class='text-input sw70'></li>",
            "<li>19期没出降<input value='' name='A_19' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_19' maxlength='6'  class='text-input sw70'></li>",
            "<li>20期没出降<input value='' name='A_20' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_20' maxlength='6'  class='text-input sw70'></li>",
            "<li>21期没出降<input value='' name='A_21' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_21' maxlength='6'  class='text-input sw70'></li>",
            "<li>22期没出降<input value='' name='A_22' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_22' maxlength='6'  class='text-input sw70'></li>",
            "<li>23期没出降<input value='' name='A_23' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_23' maxlength='6'  class='text-input sw70'></li>",
            "<li>24期没出降<input value='' name='A_24' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_24' maxlength='6'  class='text-input sw70'></li>",
            "<li>25期没出降<input value='' name='A_25' maxlength='6'  class='text-input sw70'>&nbsp;&nbsp;連出降<input value='' name='B_25' maxlength='6'  class='text-input sw70'></li>",
            "<li>超过25期，按照25期降</li>",
            "</ul>",
            "<p class='red clear'><span>注：1.增大同路“号码”倍数可能会出现同路号码赔率小于2情况，请慎重修改！<br>",
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.本动作必须在官网出上期结果后执行， 如官网结果延迟将导致本动作延迟或失败</span>",
            "</p>",
            "</p>",
            "</td>",
            "</tr>",
            "</tbody>",
            "<tfoot><tr><td colspan='2' style='padding-top:20px;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}



//------------appendOpeningKC-------------------
function appendOpeningKC(msg) {
    closeMiddleAll();
    var title = "快彩封盤设置 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);
    var myId = msg.data_action.replace("&", "-").replace("=", "-");
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table'>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>廣東快樂十分(提前):</td>",
            "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' name='klc_endtime' class='text-input sw50' value=''>秒</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>河内5分彩(提前):</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<label class='label-box'><input type='text' name='ssc_endtime' class='text-input sw50' value=''>秒</label>",
            "<label class='label-box'>&nbsp;&nbsp;&nbsp;夜場:<input type='text' name='ssc_endtime2' class='text-input sw50' value=''>秒</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>北京赛车PK10(提前):</td>",
            "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' name='pk_endtime' class='text-input sw50' value=''>秒</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>江蘇骰寶(提前):</td>",
            "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' name='ks_endtime' class='text-input sw50' value=''>秒</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>北京快樂8(提前):</td>",
            "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' name='klb_endtime' class='text-input sw50' value=''>秒</label></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>重慶幸運農場(提前):</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<label class='label-box'><input type='text' name='nc_endtime' class='text-input sw50' value=''>秒</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>幸運飛艇(提前):</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<label class='label-box'><input type='text' name='ft_endtime' class='text-input sw50' value=''>秒</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>廣西快樂十分(提前):</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<label class='label-box'><input type='text' name='gx_endtime' class='text-input sw50' value=''>秒</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>广西快3(提前):</td>",
            "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' name='gxks_endtime' class='text-input sw50' value=''>秒</label></td>",
            "</tr>",

            "<tr>",
            "<td class='w25 txt-right bc'>极速赛车(提前):</td>",
            "<td class='txt-left txt-paddin-left'><label class='label-box'><input type='text' name='pkjs_endtime' class='text-input sw50' value=''>秒</label></td>",
            "</tr>",

            "</tbody>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding:10px 0;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}

//------------appendNewsInfo-------------------
function appendNewsInfo(msg) {
    closeMiddleAll(true);
    var title = " 公告管理 [<a href='javascript:void(0)' id='newsAdd' class='blue'>新增</a>]";
    $("#shell_title").html(title);
    var myId = "newsinfo";
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table' id='list'><thead><tr><th class='w3'>ID编号</th><th class='w10'>新增日期</th><th>新增内容</th><th class='w10'>操作者</th><th class='w5'>状态</th><th class='w5'>级别</th><th class='w10'>功能</th></tr></thead>",
            "<tbody>",
            "</tbody>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}


function appendChongZhi(msg) {
    closeMiddleAll(true);
    var title = " 充值记录 <select name='chongzhi_state' id='chongzhi_state' class='input'>";
    title += "<option " + (msg.State == 0 ? "selected='selected'" : "") + " value='0'>待审核充值</option>";
    title += "<option " + (msg.State == 1 ? "selected='selected'" : "") + "  value='1'>已审核充值</option>";
    title += "<option " + (msg.State == -1 ? "selected='selected'" : "") + "  value='-1'>全部充值记录</option>";

    title += "</select>  充值日期：<input id='chongzhi_date' value='" + msg.Date + "' name='chongzhi_date' class='text-input' type='text'>  关键字：<input id='chongzhi_key' name='chongzhi_key' value='" + msg.Key + "' class='text-input' type='text'>  <a href='javascript:void(0)' id='chongzhi_search' class='blue'>查询</a>   <a href='javascript:void(0)' id='chongzhi_delete' class='red'>删除</a>";
    $("#shell_title").html(title);
    var myId = "chongzhi";
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table' id='list'><thead><tr><th><input type='checkbox' name='all' ></th><th class='w5'>ID</th><th class='w10'>用户</th><th>转账金额</th><th class='w10'>转账银行</th><th class='w10'>转账时间</th><th class='w10'>转账方式</th><th class='w10'>汇款地点/支付账号</th><th class='w10'>提交时间</th><th class='w10'>审批时间</th><th class='w10'>状态</th><th class='w10'>操作</th></tr></thead>",
            "<tbody>",
            "</tbody>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);

}


function appendTiXian(msg) {
    closeMiddleAll(true);
    var title = " 提现记录 <select name='tixian_state' id='tixian_state' class='input'>";
    title += "<option " + (msg.State == 0 ? "selected='selected'" : "") + " value='0'>待审核提现</option>";
    title += "<option " + (msg.State == 1 ? "selected='selected'" : "") + "  value='1'>已审核提现</option>";
    title += "<option " + (msg.State == -1 ? "selected='selected'" : "") + "  value='-1'>全部提现记录</option>";

    title += "</select>  提现日期：<input id='tixian_date' value='" + msg.Date + "' name='tixian_date' class='text-input' type='text'>  关键字：<input id='tixian_key' name='tixian_key' value='" + msg.Key + "' class='text-input' type='text'>  <a href='javascript:void(0)' id='tixian_search' class='blue'>查询</a>   <a href='javascript:void(0)' id='tixian_delete' class='red'>删除</a>";
    $("#shell_title").html(title);
    var myId = "tixian";
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table' id='list'><thead><tr><th><input type='checkbox' name='all' ></th><th class='w5'>ID</th><th class='w10'>用户</th><th>提交单号</th><th class='w5'>省份</th><th class='w5'>城市</th><th class='w10'>银行名称</th><th class='w10'>网点</th><th class='w10'>账户</th><th class='w5'>姓名</th><th class='w5'>金额</th><th class='w10'>手机号码</th><th class='w10'>提交时间</th><th class='w10'>审批时间</th><th class='w5'>状态</th><th class='w10'>操作</th></tr></thead>",
            "<tbody>",
            "</tbody>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);

}



//------------appendNewsInfo-------------------
function appendOnline(msg) {
    closeMiddleAll(true);
    var title = "在线查询";
    $("#shell_title").html(title);
    var myId = "online-list";
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table'><thead><tr><th class='w15'>总监</th><th class='w15'>分公司</th><th class='w15'>股東</th><th class='w15'>总代理</th><th class='w15'>代理</th><th class='w15'>会员</th></tr></thead>",
            "<tbody data-onlineCount=''>",
            "<tr><td class='w15 pointer' data-level='1'>0</td><td class='w15 pointer' data-level='2'>0</td><td class='w15 pointer' data-level='3'>0</td><td class='w15 pointer' data-level='4'>0</td><td class='w15 pointer' data-level='5'>0</td><td class='w15 pointer' data-level='6'>0</td></tr>",
            "</tbody>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table' id='list'><thead><tr><th class='w7'>在线</th><th class='w15'>账号</th><th class='w15'>级別</th><th data-level='6'>余额</th><th data-level='6'>未结</th><th data-level='6'>盈亏</th><th>活跃时间</th><th>登录IP</th><th>IP归属地</th></tr></thead>",
            "<tbody>",
            "</tbody>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}

//------------appendOperatingLog-------------------
function appendOperatingLog(msg) {
    closeMiddleAll(true);
    var title = "日志查询";
    $("#shell_title").html(title);

    //绑定titleNav
    var logIndex = G.query("logIndex", "?" + msg.data_action) || 2;
    var titleNavAry = ["<select data-id='logIndex'>"];
    if (__sysinfo.level == 0) {
        titleNavAry.push("<option value='1'>参数设置</option>");
    }
    titleNavAry.push("<option value='4'>系统设置</option>");
    titleNavAry.push("<option value='2'>赔率设置</option>");
    titleNavAry.push("<option value='3'>自动跳水</option>");
    titleNavAry.push("<option value='5'>关盘设置</option>");
    titleNavAry.push("</select>");
    forceMiddle({ titleNav: titleNavAry.join("") });
    $("#title-nav").addClass("title-nav-right");
    $("select[data-id='logIndex']").val(logIndex);
    $("select[data-id]").unbind("change").change(function () {
        middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "logIndex", val: $(this).val() }) });
    });

    var myId = "operating-log";
    if ($("#middleContent #" + myId).length == 0) {
        var table = [
            "<table class='middle-table'><thead><tr><th>ID编号</th><th>操作日期</th><th>操作类型</th><th>更变前值</th><th>更变后值</th><th>操作者</th><th>IP地址</th><th>IP归属地</th></tr></thead>",
            "<tbody>",
            "</tbody>",
            "</table>"
        ];
        table = "<div id='" + myId + "' class='acion'>" + table.join("") + "</div>";
        $("#middleContent").append(table).show();
    } else {
        $("#middleContent #" + myId).show();
    }
    return $("#" + myId);
}