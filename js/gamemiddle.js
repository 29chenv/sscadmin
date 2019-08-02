var O = {
    sort: null,
    type: null,
    name: null,
    num: null,
    numClass: null,
    title: null
};

//--------------六合彩-------------


//--------------重庆时时彩-------------
function game_3_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:100%;' id='game-row'>");

    //-------------75-------------
    table.push("<div style='float:left;width:100%;'>");

    //-------------33-------------
    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第一球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 1; i <= 10; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0%'>&nbsp;</div>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第二球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 15; i <= 24; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0%'>&nbsp;</div>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 29; i <= 38; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 43; i <= 52; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0%'>&nbsp;</div>");

    table.push("<div style='float:left;width:20%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五球</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 57; i <= 66; i++) {
        O.sort = i;
        O.type = _sscnum1(O.sort);
        O.name = _sscnum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0%'>&nbsp;</div>");



    table.push("</div>");
    //-------------end 75-------------


    // //-------------6.8-------------
    // table.push("<div style='float:right;width:6.8%;'>");
    // table.push(rightObj.cl);
    // table.push("</div>");
    // //-------------end 6.8-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

//萬千XXX
function game_3_2(){

    return game_3_dw(2);
}

//萬X百XX
function game_3_3(){
    return game_3_dw(3);
}

//萬XX十X
function game_3_4(){
    return game_3_dw(4);
}

//萬XXX个
function game_3_5(){
    return game_3_dw(5);
}

//X千百XX
function game_3_6(){
    return game_3_dw(6);
}

//X千X十X
function game_3_7(){
    return game_3_dw(7);
}

//X千XX个
function game_3_8(){
    return game_3_dw(8);
}

//XX百十X
function game_3_9(){
    return game_3_dw(9);
}

//XX百X个
function game_3_10(){
    return game_3_dw(10);
}

//XXX十个
function game_3_11(){
    return game_3_dw(11);
}

function game_3_12(){
    return game_3_dw(12);
}
function game_3_13(){
    return game_3_dw(13);
}
function game_3_14(){
    return game_3_dw(14);
}
function game_3_15(){
    return game_3_dw(15);
}
function game_3_16(){
    return game_3_dw(16);
}
function game_3_17(){
    return game_3_dw(17);
}
function game_3_18(){
    return game_3_dw(18);
}
function game_3_19(){
    return game_3_dw(19);
}
function game_3_20(){
    return game_3_dw(20);
}
function game_3_21(){
    return game_3_dw(21);
}
function game_3_22(){
    return game_3_dw(22);
}
function game_3_23(){
    return game_3_dw(23);
}
function game_3_24(){
    return game_3_dw(24);
}
function game_3_25(){
    return game_3_dw(25);
}
function game_3_26(){
    return game_3_dw(26);
}
function game_3_27(){
    return game_3_dw(27);
}
function game_3_28(){
    return game_3_dw(28);
}
function game_3_29(){
    return game_3_dw(29);
}

function game_3_dw(type) {
    var start_sort = 100000;
    var rightObj = new klchtmlAll({clList: [], clwidth: 100});
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------93-------------
    table.push("<div style='float:left;width:100%;' id='game-row'>");

    //-------------75-------------
    table.push("<div style='float:left;width:100%;'>");

    //-------------33-------------

    var index = 0;
    for (var q = 0; q < 4; q++) {
        table.push("<div style='float:left;width:25%;' name='game-row'>");
        table.push("<table class='middle-table'><thead><tr><th colspan='4'></th></tr></thead>");
        table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");


        for (var i = 0; i <= 24; i++) {
            O.sort = start_sort + index;
            O.type = "定位";
            O.name = "";
            O.numClass = G.NumberSign(O.name) ? "bold" : "";
            table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
            table.push("<td class='bc " + O.numClass + "'>" + O.name + "</td>");
            table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
            table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
            table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
            table.push("</tr>");
            index++;
        }

        table.push("</tbody></table>");
        table.push("</div>");
        table.push("<div style='float:left;width:0%'>&nbsp;</div>");
    }

    table.push("</div>");
    //-------------end 25-------------

    table.push("</div>");

    //-------------end 93-------------

    // //-------------6.8-------------
    // table.push("<div style='float:right;width:6.8%;'>");
    // table.push(rightObj.cl);
    // table.push("</div>");
    // //-------------end 6.8-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}



//--------------北京赛车PK10-------------
function game_4_1() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亚军和指定</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 1; i <= 17; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc bold'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠、亚军和两面</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 18; i <= 21; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push(rightObj.zttj);
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠军</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 22; i <= 37; i++) {
        if (i >= 32 && i <= 35) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亚军</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 38; i <= 53; i++) {
        if (i >= 48 && i <= 51) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");

    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_4_2() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 54; i <= 69; i++) {
        if (i >= 64 && i <= 67) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 70; i <= 85; i++) {
        if (i >= 80 && i <= 83) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 86; i <= 101; i++) {
        if (i >= 96 && i <= 99) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 102; i <= 115; i++) {
        if (i >= 112 && i <= 115) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_4_3() {
    var rightObj = new klchtmlAll({ clList: [], clwidth: 49 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------85-------------
    table.push("<div style='float:left;width:85%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 118; i <= 127; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 134; i <= 143; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 150; i <= 159; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.2%'>&nbsp;</div>");

    table.push("<div style='float:left;width:24.8%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w15 bc'>号码</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 166; i <= 175; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    //-------------end 33.3-------------

    table.push("</div>");
    //-------------end 85-------------

    //-------------15-------------
    table.push("<div style='float:right;width:15%;'>");
    table.push(rightObj.pktongji);
    table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 15-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}
function game_4_4() {
    var rightObj = new klchtmlAll({ clList: [], pklen: 100 });
    var table = ["<div id='game-data'><table style='width:100%;' border='0' cellpadding='0' cellspacing='0'><thead><tr><td>"];
    //-------------92-------------
    table.push("<div style='float:left;width:92%;' id='game-row'>");

    //-------------33.3-------------
    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>冠军</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 22; i <= 37; i++) {
        if (i >= 32 && i <= 35) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 21) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第六名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 102; i <= 111; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 101) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>亚军</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 38; i <= 53; i++) {
        if (i >= 48 && i <= 51) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 37) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第七名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 118; i <= 127; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 117) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第三名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 54; i <= 69; i++) {
        if (i >= 64 && i <= 67) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 53) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第八名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 134; i <= 143; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 133) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第四名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 70; i <= 85; i++) {
        if (i >= 80 && i <= 83) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 69) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第九名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 150; i <= 159; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 149) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");

    table.push("<div style='float:left;width:19.9%;' name='game-row'>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第五名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w35 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 86; i <= 101; i++) {
        if (i >= 96 && i <= 99) continue;
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 85) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("<div class='clear'></div>");
    table.push("<table class='middle-table'><thead><tr><th colspan='4'>第十名</th></tr></thead>");
    table.push("<tbody><tr><td class='w10 bc'>號</td><td class='w30 bc'>赔率</td><td class='w20 bc'>注额</td><td class='w20 bc'>盈亏</td></tr>");
    for (var i = 166; i <= 175; i++) {
        O.sort = i;
        O.type = _pknum1(O.sort);
        O.name = _pknum2(O.sort);
        O.numClass = G.NumberSign(O.name) ? "bold" : "";
        table.push("<tr data-sort='" + O.sort + "' data-type='" + O.type + "' data-name='" + O.name + "'>");
        table.push("<td class='bc " + O.numClass + " F_Ball_" + (i - 165) + "'>" + O.name + "</td>");
        table.push("<td><span name='up' class='odd_set up fl cursor hidden'></span><span name='down' class='odd_set down fr cursor hidden'></span><a class='line1 sup-line'>-</a></td>");
        table.push("<td><a class='line2 sup-line cursor'>-</a></td>");
        table.push("<td><a class='line3 sup-line cursor'>-</a></td>");
        table.push("</tr>");
    }
    table.push("</tbody></table>");
    table.push("</div>");
    table.push("<div style='float:left;width:0.1%'>&nbsp;</div>");
    //-------------end 33.3-------------
    table.push("</div>");
    //-------------end 90-------------

    //-------------10-------------
    table.push("<div style='float:right;width:8%;'>");
    table.push(rightObj.pktongji);
    //table.push(rightObj.cl);
    table.push("</div>");
    //-------------end 10-------------

    table.push("</td></tr></thead></table></div>");
    return table;
}

function getNameByType(gameIndex,type) {
    if (gameIndex == 3){
        if (type >= 1 && type <= 10){
            return (type-1) + "XXXX";
        }else if (type >= 15 && type <= 24){
            return "X" + (type-15) + "XXX";
        }else if (type >= 29 && type <= 38){
            return "XX" + (type - 29) + "XX";
        }else if (type >= 43 && type <= 52){
            return "XXX" + (type - 43) + "X";
        }else if (type >= 57 && type <= 66){
            return "XXXX" + (type - 57);
        }else if (type >= 108){
            return getDwNameByType(type);
        }
    }else if (gameIndex == 4){
        if (type >= 22 && type <= 31){
            return "冠军:" + (type - 21);
        }
        if (type == 36) return "冠军:龙";
        if (type == 37) return "冠军:虎";

        if (type >= 38 && type <= 53){
            return "亚军:" + (type - 37);
        }
        if (type == 52) return "亚军:龙";
        if (type == 53) return "亚军:虎";

        if (type >= 54 && type <= 69){
            return "第三名:" + (type - 53);
        }
        if (type == 68) return "第三名:龙";
        if (type == 69) return "第三名:虎";

        if (type >= 70 && type <= 85){
            return "第四名:" + (type - 69);
        }
        if (type == 84) return "第四名:龙";
        if (type == 85) return "第四名:虎";

        if (type >= 86 && type <= 101){
            return "第五名:" + (type - 85);
        }
        if (type == 100) return "第五名:龙";
        if (type == 101) return "第五名:虎";

        if (type >= 102 && type <= 111){
            return "第六名:" + (type - 101);
        }

        if (type >= 118 && type <= 127){
            return "第七名:" + (type - 117);
        }

        if (type >= 134 && type <= 143){
            return "第八名:" + (type - 133);
        }

        if (type >= 150 && type <= 159){
            return "第九名:" + (type - 149);
        }
        if (type >= 166 && type <= 175){
            return "第十名:" + (type - 165);
        }
        if (type >= 1 && type <= 17){
            return "冠亚和:" + (type + 2);
        }

        if (type == 18) return "冠亚:单";
        if (type == 19) return "冠亚:双";
        if (type == 20) return "冠亚:大";
        if (type == 21) return "冠亚:小";

    }
    return "";
}

function getDwNameByType(type) {
    if (type < 208){//萬千XXX
        type -= 108;
        return Math.floor(type / 10).toString() + (type % 10).toString() + "XXX";
    }else if (type < 308){//萬X百XX
        type -= 208;
        return Math.floor(type / 10 ) + "X" + (type % 10 ) + "XX";

    }else if (type < 408){//萬XX十X
        type -= 308;
        return Math.floor(type / 10 ) + "XX" + type % 10 + "X";

    }else if (type < 508){ //萬XXX个
        type -= 408;
        return Math.floor(type / 10 ) + "XXX" + (type % 10 );

    }else if (type < 608){//X千百XX
        type -= 508;
        return  "X" + Math.floor(type / 10 ).toString() + (type % 10 ).toString() + "XX";

    }else if (type < 708){//X千X十X
        type -= 608;
        return "X" +Math.floor(type / 10 ) + "X" + (type % 10 ) + "X";

    }else if (type < 808){//X千XX个
        type -= 708;
        return  "X" + Math.floor(type / 10 ) + "XX" + (type % 10 );

    }else if (type < 908){//XX百十X
        type -= 808;
        return "XX" + Math.floor(type / 10 ).toString() + (type % 10 ) + "X";

    }else if (type < 1008){// XX百X个
        type -= 908;
        return "XX" + Math.floor(type / 10 )+ "X"  +(type % 10 ) ;

    }else if (type < 1108){//XXX十个
        type -= 1008;
        return "XXX" + Math.floor(type / 10 ).toString() +(type % 10 );

    }
    else if (type < 2108){//万千百XX
        type -= 1108;
        return Math.floor(type / 100 ).toString() + Math.floor(type % 100 / 10 ).toString() + (type % 100 % 10 ) + "XX";
    }else if (type < 3108){//万千X十X
        type -= 2108;
        return Math.floor(type / 100 ).toString() + Math.floor(type % 100 / 10 ) + "X" +(type % 100 % 10 ) + "X";
    }else if (type < 4108){//万千XX个
        type -= 3108;
        return Math.floor(type / 100 ).toString() + Math.floor(type % 100 / 10 ) + "XX" + (type % 100 % 10 );
    }else if (type < 5108){//万X百十X
        type -= 4108;
        return Math.floor(type / 100 ) + "X" + Math.floor(type % 100 / 10 ).toString()  + (type % 100 % 10 ) + "X";
    }else if (type < 6108){//万X百X个
        type -= 5108;
        return Math.floor(type / 100 ) + "X" + Math.floor(type % 100 / 10 ) + "X" + (type % 100 % 10 );
    }else if (type < 7108){//万XX十个
        type -= 6108;
        return Math.floor(type / 100 ) + "XX" + Math.floor(type % 100 / 10 ).toString() + (type % 100 % 10 );
    }else if (type < 8108){//X千百十X
        type -= 7108;
        return "X" + Math.floor(type / 100 )  + Math.floor(type % 100 / 10 ).toString() + (type % 100 % 10 ) + "X";
    }else if (type < 9108){//X千百X个
        type -= 8108;
        return "X" + Math.floor(type / 100 ).toString()  + Math.floor(type % 100 / 10 )+ "X" + (type % 100 % 10 ) ;
    }else if (type < 10108){//X千X十个
        type -= 9108;
        return "X" + Math.floor(type / 100 )+ "X"  + Math.floor(type % 100 / 10 ) + (type % 100 % 10 ) ;
    }else if (type < 11108){//XX百十个
        type -= 10108;
        return "XX" + Math.floor(type / 100 )  + Math.floor(type % 100 / 10 ).toString() + (type % 100 % 10 ) ;
    }else if (type < 21108){//万千百十X
        type -= 11108;
        return  Math.floor(type / 1000 )  + Math.floor(type % 1000 / 100 ).toString() + Math.floor(type % 1000 % 100 /10 ).toString() + (type % 1000 % 100 %10 ) + "X";
    }else if (type < 31108){//万千百X个
        type -= 21108;
        return  Math.floor(type / 1000 )  + Math.floor(type % 1000 / 100 ).toString() +Math.floor(type % 1000 % 100 /10 )+ "X" + (type % 1000 % 100 %10 ) ;

    }else if (type < 41108){//万千X十个
        type -= 31108;
        return  Math.floor(type / 1000 ).toString()  + Math.floor(type % 1000 / 100 ) + "X" + Math.floor(type % 1000 % 100 /10 ).toString() + (type % 1000 % 100 %10 ) ;

    }else if (type < 51108){//万X百十个
        type -= 41108;
        return  Math.floor(type / 1000 ) + "X" + Math.floor(type % 1000 / 100 ) + Math.floor(type % 1000 % 100 /10 ).toString() + (type % 1000 % 100 %10 ) ;

    }else if (type < 61108){//X千百十个
        type -= 51108;
        return   "X" + Math.floor(type / 1000 )  + Math.floor(type % 1000 / 100 ).toString() + Math.floor(type % 1000 % 100 /10 ).toString() + (type % 1000 % 100 %10 );

    }
}



