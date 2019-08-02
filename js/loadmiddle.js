//用户列表模块
function userlist(msg) {
    var title, data_bc;
    var queryId = G.query("queryId", "?" + msg.data_action);
    var state = G.query("state", "?" + msg.data_action);
    var thead = ["<input name='all' type='checkbox'>", "在线"];
    if (queryId == 1) {
        title = "总监";
        //thead = ["<input name='all' type='checkbox'>", "在线", "上级账号", "占成", "总监", "昵称", "限占", "分公司", "股东", "总代理", "代理", "会员", "信用额度", "可用额度", "注冊日期", "補貨", "状态", "功能"];
    } else if (queryId == 2) {
        title = "分公司";
        //thead = ["<input name='all' type='checkbox'>", "在线", "上级账号", "占成", "分公司", "昵称", "限占", "股东", "总代理", "代理", "会员", "信用额度", "可用额度", "注冊日期", "占余归", "总账", "補貨", "状态", "功能"];
    } else if (queryId == 3) {
        title = "股东";
        //thead = ["<input name='all' type='checkbox'>", "在线", "上级账号", "占成", "股东", "昵称", "限占", "总代理", "代理", "会员", "信用额度", "可用额度", "注冊日期", "補貨", "状态", "功能"];
    } else if (queryId == 4) {
        title = "总代";
        //thead = ["<input name='all' type='checkbox'>", "在线", "上级账号", "占成", "总代理", "昵称", "限占", "代理", "会员", "信用额度", "可用额度", "注冊日期", "補貨", "状态", "功能"];
    } else if (queryId == 5) {
        title = "代理";
        //thead = ["<input name='all' type='checkbox'>", "在线", "上级账号", "占成", "代理", "昵称", "限占", "会员", "信用额度", "可用额度", "注冊日期", "補貨", "类型", "状态", "功能"];
    } else if (queryId == 6) {
        title = "会员";
        //thead = ["<input name='all' type='checkbox'>", "在线", "上级账号", "占成", "会员级別", "会员", "昵称", "信用额度", "可用额度", "注冊日期", "盤口", "类型", "状态", "功能"];
    }
    if (queryId != 6) {
        thead.push("上级账号");
        thead.push("占成");
    }
    if (queryId == 6) {
        thead.push("会员级別");
    }
    thead.push(title);
    thead.push("昵称");
    if (queryId < 6) {
        thead.push("限占");
    }


    if (queryId == 6 && __sysinfo.level <= 1){
        thead.push("总监");
    }

    if (queryId <= 1 || queryId == 6 && __sysinfo.level <= 2) {
        thead.push("分公司");
    }
    if (queryId <= 2 || queryId == 6 && __sysinfo.level <= 3) {
        thead.push("股东");
    }
    if (queryId <= 3 || queryId == 6 && __sysinfo.level <= 4) {
        thead.push("总代理");
    }
    if (queryId <= 4 || queryId == 6) {
        thead.push("代理");
    }
    if (queryId <= 5) {
        thead.push("会员");
    }
    thead.push("信用额度");
    thead.push("可用额度");
    thead.push("注冊日期");

    if (queryId == 2) {
        thead.push("占余归");
        thead.push("总账");
    }

    if (queryId >= 2) {
        thead.push("信用/现金");
    }
    if (queryId == 6) {
        thead.push("盈利回收");
    }
    thead.push("状态");
    thead.push("功能");


    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    //chenwei
    var json = $.parseJSON('{"currentPage":1,"totalPage":1,"table":[[{"id":1718},{"out":0},{"shaer":"ttt168"},{"sup":"0%"},{"uName":"aaabbb"},{"fName":"aaabbb"},{"soc":"..."},{"c6":0},{"cds":"1.0"},{"kyr":"1"},{"reg":"2019-08-02"},{"mode":0},{"state":2}]]}');
        G.loadEnd();
        closeMiddleAll();

        $("#navListBox a.onBtn").removeClass("onBtn");
        $("#navListBox a").each(function () {
            if (G.query("queryId", "?" + $(this).attr("data-action")) == queryId) {
                $(this).addClass("onBtn");
                return false;
            }
        });

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var magDelText = __sysinfo.level == 0 ? "<span class='text-btn-s' id='magDel'>刪除</span>" : "";
        var titleNav = "<select id='state'><option value='0'>停用</option><option value='1'>冻结</option><option value='2'>启用</option></select>"
            + "账号：<input type='text' id='seachName' autocomplete='off' maxlength='15' class='text-input sw90' />"
            + "<span class='text-btn-s' id='search'>查询</span>"
            + "<span class='text-btn-s' id='magAdd'>新增</span>" + magDelText;

        //绑定数据
        var table = [];
        if (json.table && json.table.length > 0) {
            var ary = json.table;
            var online, uName, val;
            for (var i = 0; i < ary.length; i++) {
                table.push("<tr>");
                for (var n = 0; n < ary[i].length; n++) {
                    for (var m in ary[i][n]) {
                        if (m == "id") {
                            table.push("<td class='sw30'><input name='" + ary[i][n][m] + "' type='checkbox'></td>");
                        } else if (m == "out") {
                            online = ary[i][n][m] == 1 ? "online" : "offline";
                            table.push("<td class='" + online + " sw50'></td>");
                        } else if (m == "mid") {
                            val = ary[i][n][m];
                            val = val == 2 ? "直属分公司" : val == 3 ? "直属股东" : val == 4 ? "直属总代" : "普通会员";
                            table.push("<td>" + val + "</td>");
                        } else if (m == "uName") {
                            uName = ary[i][n][m];
                            table.push("<td data-name='" + uName + "'>" + uName + "</td>");
                        } else if (m == "c1" || m == "c2" || m == "c3" || m == "c4" || m == "c5" || m == "c6") {
                            if (!G.NumberSign(ary[i][n][m])) {
                                table.push("<td class='w5 txt-right'>" + ary[i][n][m] + "</td>");
                            } else if (ary[i][n][m] == 0) {
                                table.push("<td class='w5'>" + ary[i][n][m] + "</td>");
                            } else {
                                table.push("<td class='w5'><a href='javascript:void(0)' data-name='" + uName + "' data-level='" + m.replace("c", "") + "'>" + ary[i][n][m] + "</a></td>");
                            }
                        } else if (m == "cds" || m == "kyr") {
                            table.push("<td class='txt-right'>" + ary[i][n][m] + "</td>");
                        } else if (m == "brk") {
                            val = ary[i][n][m] == 2 ? "gon" : "gun";
                            table.push("<td><p class='fgs " + val + "'>" + ary[i][n][m] + "</p></td>");
                        } else if (m == "genr") {
                            val = ary[i][n][m] == 1 || ary[i][n][m] == 2 ? "zon" : "zun";
                            table.push("<td><p class='fgs " + val + "'>" + ary[i][n][m] + "</p></td>");
                        } else if (m == "mode") {
                            val = ary[i][n][m] == 0 ? "信用" : "<span class='green'>现金</span>";
                            table.push("<td>" + val + "</td>");
                        } else if (m == "state") {
                            val = ary[i][n][m] == 2 ? "启用" : ary[i][n][m] == 1 ? "冻结" : "停用";
                            table.push("<td><a href='javascript:void(0)' data-state='" + ary[i][n][m] + "' data-name='" + uName + "'>" + val + "</a></td>");
                        } else if (m == "sup") {
                            table.push("<td class='txt-left txt-fhs'>" + ary[i][n][m] + "</td>");
                        } else if (m == "ylhs" && ary[i][n][m] == 0) {
                            table.push("<td><a href='javascript:void(0)' data-type='ylhs' data-name='" + uName + "'>盈利回收</a></td>");
                        }  else if (m == "ylhs" && ary[i][n][m] == 1) {
                            table.push("<td></td>");
                        }else {
                            table.push("<td>" + ary[i][n][m] + "</td>");
                        }
                    }
                }
                table.push("<td class='sw100'><span class='sp s-22' data-rec='userrebate' data-name='" + uName + "'>退水</span><span class='sp s-44' data-up='userupdate' data-name='" + uName + "'>修改</span><span class='sp s-55' data-fid='login' data-name='" + uName + "'>日志</span><span class='sp s-99' data-fid='record' data-name='" + uName + "'>记录</span></td>");
                table.push("</tr>");
            }
        }
        $("#load-middle").html(forceMiddle({ title: title + "管理", thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定事件
        $("#state").val(state).unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "state", val: $(this).val() }) });
        });
        $("#search").unbind("click").click(function () {
            var seachName = $("#seachName").val();
            if (!G.StringSign(seachName)) {
                G.alert({ content: "请输入有效的账号！",
                    ok: function () {
                        $("#seachName").focus();
                        return true;
                    }
                });
            } else {
                middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "seachName", val: seachName }) });
            }
        });
        $("#load-middle thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#load-middle tbody td input[type='checkbox']").attr("checked", checked);
        });
        var data_stop = true;
        $("#magDel").unbind("click").click(function () {
            var idAry = [];
            $("#load-middle tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾选1个需要“刪除”的账号！", ok: function () { return true; } });
            } else {
                G.alert({ content: "警告：账号刪除后不可逆，确定刪除吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax("del_user&data=" + idAry.join(","), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    middleBind({ data_action: msg.data_action });
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
        });
        $("#magAdd").unbind("click").click(function () {
            G.mask();
            var data_json;
            //chenwei
            // G.ajax("adduserQuery&queryId=" + queryId, function (json) {
            var json = $.parseJSON('{"shareRole":"总代理","shareCredits":1999.0,"shareSuperior":20,"shareModeSelection":0,"shareCompId":4,"shareList":[{"ttt168":"1174"}]}');
                G.maskClose();
                data_json = json;
                if (json.result) {
                    G.alert({ content: json.result,
                        ok: function () {
                            return true;
                        },
                        close: function () {
                            return true;
                        }
                    });
                } else {
                    table = [];
                    if (queryId == 6) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>选择上级:</td>");
                        table.push("<td class='txt-left'>");
                        if (__sysinfo.level <= 2) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='2' />分公司</label> "); }
                        if (__sysinfo.level <= 3) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='3' />股东</label> "); }
                        if (__sysinfo.level <= 4) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='4' />总代理</label> "); }
                        if (__sysinfo.level <= 5) { table.push("<label class='label-box'><input type='radio' name='radioshareName' data-value='5' />代理</label>"); }
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>上级<span name='shareRole'></span>:</td>");
                    table.push("<td class='txt-left'><select name='shareName'></select> 余额:<span name='shareCredits'></span></td>");
                    table.push("</tr>");



                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>用戶昵称:</td>");
                    table.push("<td class='txt-left'><input type='text' name='fatherName' autocomplete='off' maxlength='12' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹个漢字2位字符)、字母、数字、下劃线组成，長度不超過12个英文字符或8个漢字！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登录账号:</td>");
                    table.push("<td class='txt-left'><input type='text' name='userName' autocomplete='off' maxlength='12' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z_]{0,12}$/' mesg='“账号”由1-12位英文字母、数字、下劃线组成，且第壹位不能是下劃线！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登录密码:</td>");
                    table.push("<td class='txt-left'><input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密码”必需包含字母、小写字母和数字组成，長度6-20位！' /></td>");
                    table.push("</tr>");


                    if (data_json.shareModeSelection == 0 || __sysinfo.level <= 1 && (data_json.shareModeSelection == 1 || queryId == 6) ) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>信用额度:</td>");
                        table.push("<td class='txt-left'><input type='text' name='credits'  autocomplete='off' maxlength='9' value='0' class='text-input sw90' reg='/^[0-9]{1,9}$/' mesg='“信用额度” 由1-9位正整数组成。' /> <span class='red' id='up-rmb'></span></td>");
                        table.push("</tr>");
                    }

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>信用/现金:</td>");
                    table.push("<td class='txt-left'>");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' checked='checked' data-value='0' />信用</label> ");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' data-value='1' />现金</label> ");
                    table.push("</td>");
                    table.push("</tr>");


                    if (queryId == 2) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>剩余成数:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' checked='checked' data-value='1' />总监</label> ");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' data-value='2' />分公司</label> ");
                        table.push("</td>");
                        table.push("</tr>");

                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>总账报表:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='1' />总账(非明细)</label> ");
                        table.push("<label class='label-box'><input type='radio' name='generalId' data-value='2' />总账(包括明细)</label> ");
                        table.push("<label class='label-box'><input type='radio' name='generalId' checked='checked' data-value='0' />关闭</label> ");
                        table.push("</td>");
                        table.push("</tr>");
                    }

                    if (queryId != 1) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'><span name='shareRole'></span>占成:</td>");
                        table.push("<td class='txt-left'><input type='text' name='superior' autocomplete='off' maxlength='3' value='0' class='text-input sw50' reg='/^[0-9]{1,3}$/' mesg='“上级占成” 由1-3位正整数组成。' /> <span name='shareSuperior'></span>%</td>");
                        table.push("</tr>");

                        // if (queryId != 6) {
                        //     table.push("<tr>");
                        //     table.push("<td class='w25 bc txt-right'>下级限占:</td>");
                        //     table.push("<td class='txt-left'>");
                        //     table.push("<label class='label-box'><input type='radio' name='stintId' checked='checked' data-value='yes' />占余成数下线任占</label> ");
                        //     table.push("<label class='label-box'><input type='radio' name='stintId' data-value='no' />限制下线占成</label> ");
                        //     table.push("<input type='text' name='stint' autocomplete='off' maxlength='3' value='-1' class='text-input sw50 hiden' reg='/^[-]?[0-9]+$/' mesg='“下级限占” 由1-3位正整数组成。' />");
                        //     table.push("</td>");
                        //     table.push("</tr>");
                        // }

                    }

                    var obj, data_stop = true;
                    var role = $("#shell_title").html().replace("管理", "");
                    var content = forceMiddle({ id: "add-user", tbody: table });
                    G.alert({ title: "新增" + role, content: content, width: 450,
                        initialize: function () {
                            obj = $("#add-user");
                            rowdata();
                            obj.find("select[name='shareName'] option").remove();
                            for (var i = 0; i < data_json.shareList.length; i++) {
                                for (var n in data_json.shareList[i]) {
                                    obj.find("select[name='shareName']").append("<option value='" + data_json.shareList[i][n] + "'>" + n + "</option>");
                                }
                            }

                            // obj.find("input[name='stintId']").unbind("change").change(function () {
                            //     if ($(this).attr("data-value") == "yes") {
                            //         obj.find("input[name='stint']").val("-1").hide();
                            //     } else {
                            //         obj.find("input[name='stint']").val("").show().focus();
                            //     }
                            // });

                            // obj.find("select[name='set_water']").unbind("change").change(function () {
                            //     obj.find("input[name='water']").val($(this).val());
                            // });

                            obj.find("input[name='credits']").keyup(function () {
                                $(this).val($(this).val().replace(/[^0-9]/g, ''));
                                $("#up-rmb").html(G.toRmb($(this).val()) || "");
                            });

                            obj.find("select[name='shareName']").unbind("change").change(function () {
                                G.myLayerImg();
                                G.ajax("adduserQuery&queryId=" + queryId + "&shareName=" + $(this).val(), function (myjson) {
                                    G.myLayerImgClose();
                                    data_json = myjson;
                                    rowdata();
                                }, function () { G.myLayerImgClose(); });
                            });

                            obj.find("input[name='radioshareName'][data-value='" + data_json.shareCompId + "']").attr("checked", true);
                            obj.find("input[name='radioshareName']").unbind("change").change(function () {
                                G.myLayerImg();
                                G.ajax("adduserQuery&queryId=" + queryId + "&level=" + $(this).attr("data-value"), function (myjson) {
                                    G.myLayerImgClose();
                                    data_json = myjson;
                                    rowdata(true);
                                }, function () { G.myLayerImgClose(); });
                            });
                            var cheName, mythis;
                            obj.find("input[name='userName']").blur(function () {
                                mythis = $(this);
                                if ($(this).val() != "" && cheName != $(this).val()) {
                                    cheName = $(this).val();
                                    G.ajax("isUserName&name=" + cheName, function (json) {
                                        if (json.result == 1) {
                                            G.myTips({ content: "账号：" + cheName + " 已注冊使用，请更换其他字母组合！", obj: mythis, myclick: true });
                                        }
                                    });
                                }
                            });

                            function rowdata(mycha) {
                                if (data_json.shareModeSelection == 0) {
                                    obj.find("input[name='modeSelection']").attr("disabled", true);
                                    if (queryId > 2) {
                                        obj.find("input[name='modeSelection']").attr("disabled", true);
                                        obj.find("input[name='modeSelection'][data-value='0']").attr("checked", true);
                                    }
                                } else {
                                    obj.find("input[name='modeSelection']").attr("disabled", false);
                                    obj.find("input[name='credits']").attr("disabled", false);

                                    if (queryId > 2) {
                                        obj.find("input[name='modeSelection']").attr("disabled", true);
                                        obj.find("input[name='modeSelection'][data-value='1']").attr("checked", true);
                                    }
                                }
                                for (var i in data_json) {
                                    obj.find("span[name='" + i + "']").html(data_json[i]);
                                }
                                if (mycha) {
                                    obj.find("select[name='shareName'] option").remove();
                                    for (var i = 0; i < data_json.shareList.length; i++) {
                                        for (var n in data_json.shareList[i]) {
                                            obj.find("select[name='shareName']").append("<option value='" + data_json.shareList[i][n] + "'>" + n + "</option>");
                                        }
                                    }
                                }
                            }
                        },
                        ok: function () {
                            var a, reg, mesg, value, data = [];

                            obj.find("input").each(function () {
                                if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                    data.push($(this).attr("name") + ":" + $(this).attr("data-value"));
                                } else if ($(this).attr("type") == "text") {
                                    reg = eval($(this).attr("reg"));
                                    value = $(this).val();
                                    data.push($(this).attr("name") + ":" + value);
                                    if ($(this).attr("name") == "pwd") {
                                        if (!G.safety(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    } else if (data_json.shareModeSelection == 0 && $(this).attr("name") == "credits" && parseInt(value) > data_json.shareCredits) {
                                        G.myTips({ content: "上级可用余额：" + data_json.shareCredits, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if (data_json.shareModeSelection == 0 && $(this).attr("name") == "credits" && parseInt(value) < data_json.maxCredits) {
                                        G.myTips({ content: "可“回收”剩余额度：" + data_json.maxCredits, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "superior" && parseInt(value) > data_json.stintOccupyMax) {
                                        G.myTips({ content: "上级最高可设占成：" + data_json.stintOccupyMax + "%", obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "stint" && value != "-1" && parseInt(value) < data_json.stintOccupyMin) {
                                        G.myTips({ content: "下级已分配占成" + data_json.stintOccupyMin + "，可回收占成不可低于" + data_json.stintOccupyMin, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    }
                                    else if (reg) {
                                        if (!reg.test(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    }
                                }
                            });

                            if (data && data.length > 0 && data_stop) {
                                data_stop = false;
                                var param = data.join(",");
                                param = param.replace(/,/g,"&");
                                param = param.replace(/:/g,"=");
                                G.mask();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax("adduser&queryId=" + queryId + "&shareName=" + obj.find("select[name='shareName']").val() + "&" + param , function (json) {
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({ content: "新增成功。",
                                            ok: function () {
                                                return true;
                                            },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });
                                    } else {
                                        G.alert({ content: json.result, ok: function () { return true; } });
                                    }
                                }, function () { G.maskClose(); });
                            }
                        },
                        cancel: function () { }
                    });
                }
            // }, function () { G.maskClose(); });


        });
        $("#load-middle tbody a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_level = $(this).attr("data-level");
            var data_state = $(this).attr("data-state");
            var data_type = $(this).attr("data-type");
            var data_stop = true;
            if (G.NumberSign(data_level)) { //下级查询
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                var referrer = _a({ data_action: msg.data_action, paramName: "nextName", val: data_name });
                referrer = _a({ data_action: referrer, paramName: "queryId", val: data_level });
                referrer = _a({ data_action: referrer, paramName: "black", val: 1 });
                middleBind({ data_action: referrer });
            } else if (G.NumberSign(data_state)) { //修改状态
                var content = "<div id='mystate'>"
                    + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='2' /> 启用</label>"
                    + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='1' /> 冻结</label>"
                    + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='0' /> 停用</label>"
                    + "</div>";
                G.alert({ title: "账号:" + data_name, content: content,
                    initialize: function () {
                        $("#mystate").find("input[name='state'][value='" + data_state + "']").attr("checked", "checked");
                    },
                    ok: function () {
                        var mystate = $("#mystate").find("input[name='state']:checked").val();
                        if (mystate != data_state && data_stop) {
                            data_stop = false;
                            G.mask();
                            G.ajax("faststate_user&name=" + data_name + "&state=" + mystate + "&queryId=" + queryId, function (json) {
                                G.maskClose();
                                if (json.result == 1) {
                                    $("#load-middle tbody tr td[data-name='" + data_name + "']").parent("tr").html("");
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_type == "ylhs" && data_stop) { //盈利回收
                data_stop = false;
                G.mask();
                S.request = G.ajax("creditschange&name=" + data_name, function (json) {
                    data_stop = true;
                    G.maskClose();
                    var table = [];
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>会员账号: </td>");
                    table.push("<td class='txt-left'>" + json.userName + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>会员昵称: </td>");
                    table.push("<td class='txt-left'>" + json.fatherName + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>信用额度:</td>");
                    table.push("<td class='txt-left'>" + json.credits + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>可用额度:</td>");
                    table.push("<td class='txt-left'>" + json.ky + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>盈利额度:</td>");
                    table.push("<td class='txt-left'>" + json.yl + "</td>");
                    table.push("</tr>");
                    table.push("<tr>");
                    table.push("<td class='w30 bc txt-right'>回收盈利:</td>");
                    table.push("<td class='txt-left'><input type='text' class='text-input sw70' name='yl'></td>");
                    table.push("</tr>");
                    var content = forceMiddle({ id: "credits-change", tbody: table });
                    G.alert({ title: "盈利回收", content: content, width: 280,
                        initialize: function () {
                            $("#credits-change input[name='yl']").keyup(function () {
                                $(this).val($(this).val().replace(/[^0-9]/g, ''));
                            });
                        },
                        ok: function () {
                            var yl = parseInt($("#credits-change input[name='yl']").val());
                            if (G.NumberSign(yl)) {
                                if (yl > parseFloat(json.yl)) {
                                    G.myTips({ content: "回收盈利必须小于盈利额度:" + json.yl, obj: $("#credits-change input[name='yl']"), myclick: true });
                                    return false;
                                } else if (yl <= 0) {
                                    G.myTips({ content: "回收盈利余额必须大于: 0", obj: $("#credits-change input[name='yl']"), myclick: true });
                                    return false;
                                } else if (data_stop) {
                                    G.mask();
                                    data_stop = false;
                                    S.request = G.ajax("creditschange&name=" + data_name + "&data=" + yl, function (json) {
                                        data_stop = true;
                                        G.maskClose();
                                        if (json.result == 1) {
                                            G.alert({ content: "保存成功。",
                                                ok: function () { return true; },
                                                close: function () { middleBind({ data_action: msg.data_action }); }
                                            });
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }
                                    }, function () { data_stop = true; G.maskClose(); });
                                }
                                return true;
                            }
                        },
                        cancel: function () { }
                    });

                }, function () { G.maskClose(); data_stop = true; });
            }
        });
        $("#load-middle tbody span").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_fid = $(this).attr("data-fid");
            var data_rec = $(this).attr("data-rec");
            var data_up = $(this).attr("data-up");
            if (data_fid) { //日志、记录
                G.mask();
                var data_width;
                if (data_fid == "login") data_fid = "loginLog";
                var my_action = data_fid + "&name=" + data_name + "&queryId=" + queryId;
                //chenwei
                // G.ajax(my_action, function (json) {
                if(data_fid=="loginLog"){
                    var json = $.parseJSON('[[136230,"2019-08-02 16:55:03","223.104.64.91",""]]');
                }
                if(data_fid=='record'){
                    var json = $.parseJSON('[[39783,"2019-08-02 16:44:25","新增代理","","賬號:aaabbb\u003cbr\u003e狀態:启用\u003cbr\u003e額度:1.0\u003cbr\u003e上級占成:0%","ttt168","总代理","***",""]]');
                }
                    G.maskClose();
                    if (data_fid == "loginLog") {
                        data_width = 500;
                        title = "登录日志：" + data_name;
                        thead = ["ID", "登录时间", "IP地址", "IP归属"];
                    } else if (data_fid == "record") {
                        data_width = 890;
                        title = "更变记录：" + data_name;
                        thead = ["ID", "操作时间", "更变说明", "原始值", "更变值", "操作者", "级別", "IP地址", "IP归属"];
                    }
                    table = [];
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            for (var n = 0; n < json[i].length; n++) {
                                table.push("<td>" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                    }
                    var content = G.overflowDiv({ id: "data-login", height: 470, content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    G.alert({ title: title, content: content, width: data_width,
                        initialize: function () {
                            $("#data-login #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + my_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                                table.push("<td>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#data-login tbody").append(table.join(""));
                                    } else {
                                        $("#data-login #fondiv").find("a").hide();
                                        $("#data-login #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () {
                            return true;
                        }
                    });
                // }, function () { G.maskClose(); });
            } else if (data_rec) { //修改退水
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                middleBind({ data_action: data_rec + "&name=" + data_name + "&black=1" });
            } else if (data_up) { //修改用户
                G.mask();
                //chenwei

                // G.ajax(data_up + "&name=" + data_name + "&queryId=" + queryId, function (json) {
                var json=$.parseJSON('{"status":2,"fatherName":"aaabbb","credits":"1","modeSelection":0,"breakpoint":1,"generalId":0,"superior":0,"dayDetails":1,"isSuperior":1,"maxCredits":0.0,"stintOccupyMax":20,"shareRole":"总代理","shareName":"ttt168","shareStatus":2,"shareCredits":1999.0,"level":5,"result":1}');
                    G.maskClose();
                    table = [];
                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>上级<span name='shareRole'></span>:</td>");
                    table.push("<td class='txt-left'><span name='shareName'></span> 余额:<span name='shareCredits'></span></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>账号状态:</td>");
                    table.push("<td class='txt-left'>");
                    table.push("<label class='label-box'><input type='radio' name='status' data-value='0' />停用</label> ");
                    table.push("<label class='label-box'><input type='radio' name='status' data-value='1' />冻结</label> ");
                    table.push("<label class='label-box'><input type='radio' name='status' data-value='2' />启用</label>");
                    table.push("</td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>用戶昵称:</td>");
                    table.push("<td class='txt-left'><input type='text' name='fatherName' autocomplete='off' maxlength='12' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹个漢字2位字符)、字母、数字、下劃线组成，長度不超過12个英文字符或8个漢字！' /></td>");
                    table.push("</tr>");

                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>登录密码:</td>");
                    table.push("<td class='txt-left'><input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密码”必需包含字母、和数字组成，長度6-20位！' /></td>");
                    table.push("</tr>");

                    if ( json.modeSelection == 0 || json.modeSelection == 1 && __sysinfo.level == 1 && json.level == 6){
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>信用额度:</td>");
                        table.push("<td class='txt-left'><input type='text' name='credits' autocomplete='off' maxlength='9' class='text-input sw90' reg='/^[0-9]{1,9}$/' mesg='“信用额度” 由1-9位正整数组成。' /> 可“回收”余额:<span name='maxCredits'></span><span>&nbsp;&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;");

                        if (__sysinfo.ChongZhiID == 1 && __sysinfo.ModelID == 1 && json.modeSelection == 0
                            || __sysinfo.ChongZhiID == 1 && __sysinfo.ModelID == 1 && json.modeSelection == 1 && __sysinfo.level == 1 && json.level == 6) {
                            table.push("<a class=\"red\" href=\"javascript:void(0);\" id=\"czbtn\">充值</a>&nbsp;&nbsp;");
                        }
                        if (__sysinfo.TiXianID == 1 && __sysinfo.ModelID == 1 && json.modeSelection == 0
                            || __sysinfo.ChongZhiID == 1 && __sysinfo.ModelID == 1 && json.modeSelection == 1 && __sysinfo.level == 1 && json.level == 6) {
                            table.push("|&nbsp;&nbsp;<a class=\"red\" href=\"javascript:void(0);\" id=\"txbtn\">提现</a>&nbsp;&nbsp;");

                        }

                        if ((__sysinfo.TiXianID == 1 || __sysinfo.ChongZhiID == 1) &&( __sysinfo.ModelID == 1) && ( json.modeSelection == 0 ||  json.modeSelection == 1 && __sysinfo.level == 1 && json.level == 6)) {
                            table.push("<a href=\"javascript:void(0);\" class=\"blue\" id=\"ctbtn\">充提记录</a>");
                        }

                        table.push("&nbsp;&nbsp;]&nbsp;&nbsp;</span></td>");
                        table.push("</tr>");
                    }


                    table.push("<tr style='display:none' id='updateuser_tx'>");
                    table.push("<td class='w25 bc txt-right'>提现:</td>");
                    table.push("<td class='txt-left'><input type='text' id='txt_tixian' name='txt_tixian' autocomplete='off' maxlength='20' class='text-input sw90' /><span><input type=\"button\" class=\"d-button d-state-highlight\" id=\"czsubmit_tixian\" value=\"确认\"></span></td>");
                    table.push("</tr>");

                    table.push("<tr style='display:none' id='updateuser_cz'>");
                    table.push("<td class='w25 bc txt-right'>充值:</td>");
                    table.push("<td class='txt-left'><input type='text' id='txt_chongzhi' name='txt_chongzhi' autocomplete='off' maxlength='20' class='text-input sw90' /><span><input type=\"button\" class=\"d-button d-state-highlight\" id=\"czsubmit_chongzhi\" value=\"确认\"></span></td>");
                    table.push("</tr>");



                    table.push("<tr>");
                    table.push("<td class='w25 bc txt-right'>信用/现金:</td>");
                    table.push("<td class='txt-left'>");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' data-value='0' />信用</label> ");
                    table.push("<label class='label-box'><input type='radio' name='modeSelection' data-value='1' />现金</label> ");
                    table.push("</td>");
                    table.push("</tr>");





                    if (queryId == 2) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'>剩余成数:</td>");
                        table.push("<td class='txt-left'>");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' data-value='1' />总监</label> ");
                        table.push("<label class='label-box'><input type='radio' name='breakpoint' data-value='2' />分公司</label> ");
                        table.push("</td>");
                        table.push("</tr>");

                        // table.push("<tr>");
                        // table.push("<td class='w25 bc txt-right'>开放彩种:</td>");
                        // table.push("<td class='txt-left'>");
                        // table.push("<label class='label-box'><input type='checkbox' name='gameId' data-value='3' />河内5分彩</label> ");
                        // table.push("<label class='label-box'><input type='checkbox' name='gameId' data-value='4' />北京赛车(PK10)</label> ");
                        // table.push("</td>");
                        // table.push("</tr>");

                        // table.push("<tr>");
                        // table.push("<td class='w25 bc txt-right'>总账报表:</td>");
                        // table.push("<td class='txt-left'>");
                        // table.push("<label class='label-box'><input type='radio' name='generalId' data-value='1' />总账(非明细)</label> ");
                        // table.push("<label class='label-box'><input type='radio' name='generalId' data-value='2' />总账(包括明细)</label> ");
                        // table.push("<label class='label-box'><input type='radio' name='generalId' data-value='0' />关闭</label> ");
                        // table.push("</td>");
                        // table.push("</tr>");



                    }

                    if (queryId > 1) {
                        table.push("<tr>");
                        table.push("<td class='w25 bc txt-right'><span name='shareRole'></span>占成:</td>");
                        table.push("<td class='txt-left'><input type='text' name='superior' autocomplete='off' maxlength='3' class='text-input sw50' reg='/^[0-9]{1,3}$/' mesg='“上级占成” 由1-3位正整数组成。' /> <span name='stintOccupyMax'></span>%</td>");
                        table.push("</tr>");

                        // if (queryId < 6) {
                        //     table.push("<tr>");
                        //     table.push("<td class='w25 bc txt-right'>下级限占:</td>");
                        //     table.push("<td class='txt-left'>");
                        //     table.push("<label class='label-box'><input type='radio' name='stintId' data-value='yes' />占余成数下线任占</label> ");
                        //     table.push("<label class='label-box'><input type='radio' name='stintId' data-value='no' />限制下线占成</label> ");
                        //     table.push("<input type='text' name='stint' autocomplete='off' maxlength='3' class='text-input sw50 hiden' reg='/^[-]?[0-9]+$/' mesg='“下级限占” 由1-3位正整数组成。' />");
                        //     table.push("</td>");
                        //     table.push("</tr>");
                        // }
                    }

                    var obj, data_stop = true;
                    var content = forceMiddle({ id: "up-user", tbody: table });
                    G.alert({ title: "修改账戶：" + data_name, content: content, width: 550,
                        initialize: function () {
                            obj = $("#up-user");
                            obj.find("input[name='userName']").val(data_name);
                            obj.find("input[name='credits']").attr("disabled", false);

                            /*if (json.cashCredits < 0 && json.dayDetails == 1) {
                            obj.find("input[name='cashCredits']").attr("disabled", true);
                            }*/
                            for (var i in json) {
                                obj.find("span[name='" + i + "']").html(json[i]);
                                obj.find("input[name='" + i + "'][data-value='" + json[i] + "']").attr("checked", true);
                                obj.find("input[name='" + i + "']").val(json[i]);
                            }

                            if (json.gameId){
                                var gameArr = json.gameId.split(",");
                                if (gameArr[0].split(":")[1] == 1)obj.find("input[name='gameId'][data-value='3']").attr("checked", true);
                                if (gameArr[1].split(":")[1] == 1)obj.find("input[name='gameId'][data-value='4']").attr("checked", true);
                            }

                            if (json.dayDetails == 1) {
                                obj.find("input[name='superior']").attr("disabled", true);
                            }
                            if (json.isSuperior == 1) { //后台允许无限修改占成
                                obj.find("input[name='superior']").attr("disabled", false);
                            }
                            //不允许修改 账户类型，现金或信用
                            obj.find("input[name='modeSelection']").attr("disabled", true);

                            //信用余额回收计算
                            var creditsCount = parseInt(json.maxCredits) > parseInt(json.credits) ? json.credits : parseInt(json.credits) - parseInt(json.maxCredits);
                            obj.find("span[name='maxCredits']").html(creditsCount);
                            // if (json.stint > -1) { //已限占
                            //     obj.find("input[name='stintId'][data-value='no']").attr("checked", true);
                            //     obj.find("input[name='stint']").show();
                            // } else { //下线任占
                            //     obj.find("input[name='stintId'][data-value='yes']").attr("checked", true);
                            //     obj.find("input[name='stint']").hide();
                            // }
                            // obj.find("input[name='stintId']").unbind("change").change(function () {
                            //     if ($(this).attr("data-value") == "yes") {
                            //         obj.find("input[name='stint']").val("-1").hide();
                            //     } else {
                            //         var value = json.stint == -1 ? "" : json.stint;
                            //         obj.find("input[name='stint']").val(value).show().focus();
                            //     }
                            // });

                            obj.find("#czbtn").click(function () {

                                $("#updateuser_tx").hide();
                                $("#updateuser_cz").show();

                            });

                            obj.find("#txbtn").click(function () {

                                $("#updateuser_tx").show();
                                $("#updateuser_cz").hide();

                            });

                            obj.find("#czsubmit_tixian").click(function () {

                                var tixian = $("#txt_tixian");
                                if (tixian.val() == "") {

                                    G.myTips({ content: "请填写提现金额", obj: tixian, myclick: true });
                                    return;

                                }

                                G.mask();
                                var data = [];
                                data.push("username:" + data_name);
                                data.push("jine:" + tixian.val());

                                G.ajax("posttixian&username=" + data_name + "&jine="+ tixian.val() + "&queryId=" + queryId, function (json) {
                                    data_stop = true;
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "提交成功。", ok: function () { return true; },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });

                                    } else {
                                        alert(json.result);
                                    }
                                }, function () {
                                    G.maskClose();
                                });


                            });


                            obj.find("#czsubmit_chongzhi").click(function () {

                                var chongzhi = $("#txt_chongzhi");
                                if (chongzhi.val() == "") {

                                    G.myTips({ content: "请填写充值金额", obj: chongzhi, myclick: true });
                                    return;

                                }

                                G.mask();
                                var data = [];
                                data.push("username:" + data_name);
                                data.push("jine:" + chongzhi.val());
                                data

                                G.ajax("postchongzhi&username=" + data_name + "&jine="+ chongzhi.val() + "&queryId=" + queryId, function (json) {
                                    data_stop = true;
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({
                                            content: "提交成功。", ok: function () { return true; },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });

                                    } else {
                                        alert(json.result);
                                    }
                                }, function () {
                                    G.maskClose();
                                });


                            });


                            obj.find("#ctbtn").click(function () {


                                G.mask();
                                G.ajax("userrechargelog&username="+data_name + "&queryId=" + queryId, function (json) {
                                    G.maskClose();
                                    var data_table2 = ["<div id='result'>"];
                                    data_table2.push("<div class='history_wrap'>");
                                    data_table2.push("<table class='middle-table'>");
                                    data_table2.push("<thead><tr><th>序号</th><th>操作时间</th><th>操作类型</th><th>金额</th><th>金额变更</th><th>操作者</th><th>IP地址</th><th>IP归属</th></tr></thead>");
                                    data_table2.push("<tbody>");
                                    if (json && json.length > 0) {
                                        var txt_right;
                                        for (var i = 0; i < json.length; i++) {
                                            data_table2.push("<tr>");
                                            for (var n = 0; n < json[i].length; n++) {

                                                data_table2.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                                            }
                                            data_table2.push("</tr>");
                                        }
                                    } else {
                                        data_table2.push("<tr><td colspan='8'>無提充记录！</td></tr>");
                                    }
                                    data_table2.push("</tbody>");
                                    data_table2.push("</table>");
                                    data_table2.push("<div id='fondiv' style='text-align:center;padding:1px 0;margin-top:2px;'><a href='javascript:void(0);'>點擊獲取更多...</a><span id='nodataTitle' class='hiden'>無数據加載！</span></div>");
                                    data_table2.push("</div>");
                                    data_table2.push("</div>");
                                    var content = G.overflowDiv({ content: data_table2.join(""), height: 520 });
                                    var generatedCount = 1, my_action;
                                    G.alert({
                                        title: "充提记录", content: content, width: 870,
                                        initialize: function () {
                                            $("#result tbody tr:odd").addClass("bc");
                                            if (json.length == 0) {
                                                $("#result #fondiv").remove();
                                            }
                                            $("#result #fondiv").find("a").unbind("click").click(function () {
                                                generatedCount++;
                                                my_action = G.urlReplace({ url: "?" + "userrechargelog&username="+data_name + "&queryId=" + queryId, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
                                                appendHtm();
                                            });
                                            function appendHtm() {
                                                G.myLayerImg();
                                                G.ajax(my_action, function (json) {
                                                    G.myLayerImgClose();
                                                    if (json && json.length > 0) {
                                                        var table = [], txt_right;
                                                        for (var i = 0; i < json.length; i++) {
                                                            table.push("<tr>");
                                                            for (var n = 0; n < json[i].length; n++) {

                                                                table.push("<td " + txt_right + ">" + json[i][n] + "</td>");
                                                            }
                                                            table.push("</tr>");
                                                        }
                                                        $("#result tbody").append(table.join(""));
                                                        $("#result tbody tr:odd").addClass("bc");
                                                    } else {
                                                        $("#result #fondiv").find("a").hide();
                                                        $("#result #fondiv").find("span").show();
                                                    }
                                                }, function () { G.myLayerImgClose(); });
                                            }
                                        },
                                        ok: function () { return true; }
                                    });
                                }, function () {
                                    G.maskClose();
                                });


                            });
                        },
                        ok: function () {
                            var a, reg, mesg, value, data = [],gameIdArr = [];
                            obj.find("input").each(function () {
                                if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                    data.push($(this).attr("name") + ":" + $(this).attr("data-value"));
                                }else if ($(this).attr("type") == "checkbox"){
                                    var gid = $(this).attr("data-value");
                                    if ($(this).attr("checked")){
                                        gameIdArr.push(gid + ":1");
                                    }else {
                                        gameIdArr.push(gid + ":0");
                                    }
                                }
                                else if ($(this).attr("type") == "text" && $(this).attr("name") != "userName") {
                                    reg = eval($(this).attr("reg"));
                                    value = $(this).val();
                                    data.push($(this).attr("name") + ":" + value);
                                    if ($(this).attr("name") == "pwd") {
                                        if (value != "" && !G.safety(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    }
                                    // else if (json.modeSelection == 0 && $(this).attr("name") == "credits" && parseInt(value) > json.shareCredits && parseInt(value) > json.credits) {
                                    //     G.myTips({ content: "上级可用余额：" + json.shareCredits, obj: $(this), myclick: true });
                                    //     data = false;
                                    //     return false;
                                    // }
                                    // else if (json.modeSelection == 0 && $(this).attr("name") == "credits" && parseInt(value) < json.maxCredits) {
                                    //     G.myTips({ content: "可“回收”剩余额度：" + json.maxCredits, obj: $(this), myclick: true });
                                    //     data = false;
                                    //     return false;
                                    // }
                                    else if ($(this).attr("name") == "superior" && parseInt(value) > json.stintOccupyMax) {
                                        G.myTips({ content: "上级最高可设占成：" + json.stintOccupyMax + "%", obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    } else if ($(this).attr("name") == "stint" && value != "-1" && parseInt(value) < json.stintOccupyMin) {
                                        G.myTips({ content: "下级已分配占成" + json.stintOccupyMin + "，可回收占成不可低于" + json.stintOccupyMin, obj: $(this), myclick: true });
                                        data = false;
                                        return false;
                                    }
                                    else if (reg) {
                                        if (!reg.test(value)) {
                                            mesg = $(this).attr("mesg");
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    }
                                }
                            });

                            if (data && data.length > 0 && data_stop) {
                                data_stop = false;
                                var param = data.join(",");
                                param = param.replace(/,/g,"&");
                                param = param.replace(/:/g,"=");
                                if (queryId == 2) param += "&gameIds=" + gameIdArr.join(",");
                                G.mask();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax(data_up + "&name=" + data_name + "&data=true&" + param + "&queryId=" + queryId, function (json) {
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({ content: "保存成功。",
                                            ok: function () {
                                                return true;
                                            },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });
                                    } else {
                                        alert(json.result);
                                        data_stop = true;
                                        //G.alert({ content: json.result, ok: function () { return true; } });
                                    }
                                }, function () { G.maskClose(); });
                            }
                        },
                        cancel: function () { }
                    });
                // }, function () { G.maskClose(); });
            }
        });

    // }, function () {
    //     G.maskClose();
    //     G.rollBack();
    // });
}
function _a(msg) {
    var page = G.query("page", "?" + msg.data_action);
    var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: page });
    return referrer = G.urlReplace({ url: referrer, paramName: msg.paramName, val: msg.val, pad: true }).replace("?", "");
}


//退水模块
function userrebate(msg) {
    G.scrollLoad({});
    var obj = appendUserrebate(msg);
    G.mouseover(obj.find("tbody tr"), "bc");
    //chenwei

    // S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
    var json = $.parseJSON('{"1":[1.0,1000,10000,9.97,0.0,9.97,0.197,0.001,0.01,0],"15":[1.0,1000,10000,9.97,0.0,9.97,0.197,0.001,0.01,0],"29":[1.0,1000,10000,9.97,0.0,9.97,0.197,0.001,0.01,0],"43":[1.0,1000,10000,9.97,0.0,9.97,0.197,0.001,0.01,0],"57":[1.0,1000,10000,9.97,0.0,9.97,0.197,0.001,0.01,0],"108":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"208":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"308":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"408":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"508":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"608":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"708":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"808":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"908":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"1008":[1.0,1000,5000,99.7,0.0,99.7,0.197,0.001,0.1,0],"1108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"2108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"3108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"4108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"5108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"6108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"7108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"8108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"9108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"10108":[0.1,100,1000,997.0,0.0,997.0,0.197,0.001,1.0,0],"11108":[0.1,10,30,9970.0,0.0,9970.0,0.197,0.001,10.0,0],"21108":[0.1,10,30,9970.0,0.0,9970.0,0.197,0.001,10.0,0],"31108":[0.1,10,30,9970.0,0.0,9970.0,0.197,0.001,10.0,0],"41108":[0.1,10,30,9970.0,0.0,9970.0,0.197,0.001,10.0,0],"51108":[0.1,10,30,9970.0,0.0,9970.0,0.197,0.001,10.0,0]}');
        G.loadEnd();
        if (json.animalrIndex) {
            for (var i = 0; i < json.animalrIndex.length; i++) {
                obj.find("tr[data-animalr='" + i + "']").attr("sort", json.animalrIndex[i]);
            }
        }
        if (json.animalr) {
            obj.find("span[name='animalr']").html(json.animalr);
        }
        for (var i in json) {
            for (var n = 1; n < 5; n++) {
                obj.find("tr[sort='" + i + "'] td").eq(n).html(json[i][n-1]);
            }
            if (json[i].length >= 10) {
                obj.find("tr[sort='" + i + "'] td input[type='text']").val(json[i][9]);
                //obj.find("tr[sort='" + i + "'] td input[type='text']").attr("disabled", "");
            }
            else{
                obj.find("tr[sort='" + i + "'] td input[type='text']").val("");
                //obj.find("tr[sort='" + i + "'] td input[type='text']").attr("disabled","disabled");
            }

            var hsHtml = ["<select data-id='s_huishui'>"],flHtml = ["<select data-id='s_odds'>"];
            var hj = json[i][7] ;
            var fj = json[i][8];
            var maxhb = json[i][6];
            var hb = json[i][4];
            var fl = json[i][5];
            var odds = json[i][3];

            var hbs = "",fls = "";

            for (var k =0 ; k < 500;k++){

                if (hb == maxhb) hbs = "selected";
                if (fl == odds) fls = "selected";

                hsHtml.push("<option  value='"+maxhb+"' "+hbs+">"+maxhb+"</option>");
                flHtml.push("<option  value='"+odds+"' "+fls+">"+odds+"</option>");
                hbs = "";
                fls = "";
                maxhb = floatSubtr(maxhb,hj);
                odds = floatSubtr(odds,fj);
                maxhb = Number(maxhb.toFixed(5)), odds = Number(odds.toFixed(5));
                if (maxhb < 0 || odds < 0) break;
            }
            hsHtml.push("</select>");
            flHtml.push("</select>");
            obj.find("tr[sort='" + i + "'] td").eq(5).html(hsHtml.join(""));
            obj.find("tr[sort='" + i + "'] td").eq(6).html(flHtml.join(""));

        }

        obj.find("select[data-id='s_huishui']").unbind("change").change(function () {
            var selectedIndex = $(this).get(0).selectedIndex;
            var trObj = $(this).parent().parent();
            var sortArr = [];
            if (trObj.attr("sort") == 1){
                sortArr = [1,15,29,43,57];
            }else if (trObj.attr("sort") == 108){
                sortArr = [108,208,308,408,508,608,708,808,908,1008];
            }else if (trObj.attr("sort") == 1108){
                sortArr = [1108,2108,3108,4108,5108,6108,7108,8108,9108,10108];
            }else if (trObj.attr("sort") == 108){
                sortArr = [108,208,308,408,508,608,708,808,908,1008];
            }else if (trObj.attr("sort") == 11108){
                sortArr = [11108,21108,31108,41108,51108];
            }

            if (sortArr.length > 0){
                for (var i = 0; i < sortArr.length;i++){
                    obj.find("tr[sort='"+sortArr[i]+"'] select[data-id='s_huishui']").each(function () {
                        $(this).get(0).selectedIndex = selectedIndex;
                    });
                    obj.find("tr[sort='"+sortArr[i]+"'] select[data-id='s_odds']").each(function () {
                        $(this).get(0).selectedIndex = $(this).get(0).options.length - selectedIndex - 1;
                    });
                }
            }else {
                $(this).parent().parent().find("select[data-id='s_odds']").get(0).selectedIndex = $(this).get(0).options.length - selectedIndex - 1;

            }


        });
        obj.find("select[data-id='s_odds']").unbind("change").change(function () {

            var selectedIndex = $(this).get(0).selectedIndex;
            $(this).parent().parent().find("select[data-id='s_huishui']").get(0).selectedIndex = $(this).get(0).options.length - selectedIndex - 1;

        });

        obj.find("#reset").click();
        obj.find("tbody input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        });
        obj.find("td input[type='checkbox']").unbind("change").change(function () {
            if ($(this).attr("checked")) {
                $(this).parent().parent("tr").addClass("myqhs");
            } else {
                $(this).parent().parent("tr").removeClass("myqhs");
            }
        });
        obj.find("#all").unbind("click").click(function () {
            obj.find("td tbody input[type='checkbox']").attr("checked", true);
            obj.find("tbody tr").addClass("myqhs");
        });


        //数据提交
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var data = [],occupy = [], sort;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                if (sort != undefined) {
                    data.push(sort + ":" +  $(this).find("select[data-id='s_huishui']").val() );
                    occupy.push(sort + ":" +  $(this).find("input[type='text']").val() );
                }
            });
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + data.join("|") + "&occupydata=" + occupy.join("|"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    // }, function () {
    //     G.rollBack();
    // });
}
function appendUserrebate(msg) {
    closeMiddleAll();
    var title = "水位设置 [<span class='blue'>" + __sysinfo.myRoleName + "</span>]";
    $("#shell_title").html(title);
    //绑定titleNav
    var gameIndex = G.query("gameIndex", "?" + msg.data_action);
    if (gameIndex == "" || gameIndex == undefined) gameIndex = 3;
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
    myId = "userrebate-gameIndex-" + gameIndex;
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
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率上限</th><th>赚水</th><th>赔率</th><th>下级拦货金额</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr>",
                "<td class='bc sw120'>一定位</td>",
                "<td colspan='7'></td>",
                "</tr>",
                "<tr sort='1'>",
                "<td class='bc sw120'>第一球</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='15'>",
                "<td class='bc sw120'>第二球</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='29'>",
                "<td class='bc sw120'>第三球</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='43'>",
                "<td class='bc sw120'>第四球</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='57'>",
                "<td class='bc sw120'>第五球</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr>",
                "<td class='bc sw120'>二定位</td>",
                "<td colspan='7'></td>",
                "</tr>",
                "<tr sort='108'>",
                "<td class='bc sw120'>口口XXX</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='208'>",
                "<td class='bc sw120'>口X口XX</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='308'>",
                "<td class='bc sw120'>口XX口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='408'>",
                "<td class='bc sw120'>口XXX口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='508'>",
                "<td class='bc sw120'>X口口XX</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='608'>",
                "<td class='bc sw120'>X口X口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='708'>",
                "<td class='bc sw120'>X口XX口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='808'>",
                "<td class='bc sw120'>XX口口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='908'>",
                "<td class='bc sw120'>XX口X口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='1008'>",
                "<td class='bc sw120'>XXX口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style='float:right;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率上限</th><th>赚水</th><th>赔率</th><th>下级拦货金额</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr>",
                "<td class='bc sw120'>三定位</td>",
                "<td colspan='7'></td>",
                "</tr>",

                "<tr sort='1108'>",
                "<td class='bc sw120'>口口口XX</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='2108'>",
                "<td class='bc sw120'>口口X口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='3108'>",
                "<td class='bc sw120'>口口XX口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='4108'>",
                "<td class='bc sw120'>口X口口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='5108'>",
                "<td class='bc sw120'>口X口X口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='6108'>",
                "<td class='bc sw120'>口XX口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='7108'>",
                "<td class='bc sw120'>X口口口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='8108'>",
                "<td class='bc sw120'>X口口X口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='9108'>",
                "<td class='bc sw120'>X口X口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='10108'>",
                "<td class='bc sw120'>XX口口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr>",
                "<td class='bc sw120'>四定位</td>",
                "<td colspan='7'></td>",
                "</tr>",
                "<tr sort='11108'>",
                "<td class='bc sw120'>口口口口X</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='21108'>",
                "<td class='bc sw120'>口口口X口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='31108'>",
                "<td class='bc sw120'>口口X口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='41108'>",
                "<td class='bc sw120'>口X口口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='51108'>",
                "<td class='bc sw120'>X口口口口</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
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
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span></td></tr>",
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
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率上限</th><th>赚水</th><th>赔率</th><th>下级拦货金额</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr sort='22'>",
                "<td class='bc sw120'>1-10单码</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='36'>",
                "<td class='bc sw120'>1-5龙虎</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='18'>",
                "<td class='bc sw120'>冠亚单</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='19'>",
                "<td class='bc sw120'>冠亚双</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='20'>",
                "<td class='bc sw120'>冠亚大</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='21'>",
                "<td class='bc sw120'>冠亚小</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style='float:right;width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<thead>",
                "<tr><th class='sw120'>交易类型</th><th>单注下限</th><th>单注上限</th><th>单项上限</th><th>赔率上限</th><th>赚水</th><th>赔率</th><th>下级拦货金额</th></tr>",
                "</thead>",
                "<tbody>",
                "<tr sort='1'>",
                "<td class='bc sw120'>冠亚和-3,4,18,19</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='3'>",
                "<td class='bc sw120'>冠亚和-5,6,16,17</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='5'>",
                "<td class='bc sw120'>冠亚和-7,8,14,15</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='7'>",
                "<td class='bc sw120'>冠亚和-9,10,12,13</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
                "</tr>",
                "<tr sort='9'>",
                "<td class='bc sw120'>冠亚和-11</td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><select><option value='0'>0</option></select></td>",
                "<td><input type='text' autocomplete='off' ext=' class='text-input sw35'></td>",
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
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span></td></tr>",
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

//子账户模块
function manager(msg) {
    var title, data_bc;
    var state = G.query("state", "?" + msg.data_action);
    title = "子账管理";
    var thead = ["<input name='all' type='checkbox'>", "在线", "账号", "昵称", "注冊日期", "状态", "功能"];
    G.scrollLoad({});
    //chenwei
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"currentPage":1,"totalPage":0,"table":[]}');
        G.loadEnd();
        closeMiddleAll();

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var magDelText = __sysinfo.level == 0 ? "<span class='text-btn-s' id='magDel'>刪除</span>" : "";
        var titleNav = "<select id='state'><option value='0'>停用</option><option value='1'>冻结</option><option value='2'>启用</option></select>"
            + "账号：<input type='text' id='seachName' autocomplete='off' maxlength='15' class='text-input sw90' />"
            + "<span class='text-btn-s' id='search'>查询</span>"
            + "<span class='text-btn-s' id='magAdd'>新增</span>"
            + "<span class='text-btn-s' id='magDel'>刪除</span>";

        //绑定数据
        var table = [];
        if (json.table && json.table.length > 0) {
            var ary = json.table;
            var online, uName, val, bc;
            for (var i = 0; i < ary.length; i++) {
                bc = i % 2 == 0 ? "" : "bc";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < ary[i].length; n++) {
                    for (var m in ary[i][n]) {
                        if (m == "id") {
                            table.push("<td class='sw30'><input name='" + ary[i][n][m] + "' type='checkbox'></td>");
                        } else if (m == "out") {
                            online = ary[i][n][m] == 1 ? "online" : "offline";
                            table.push("<td class='" + online + " sw50'></td>");
                        } else if (m == "uName") {
                            uName = ary[i][n][m];
                            table.push("<td data-name='" + uName + "'>" + uName + "</td>");
                        } else if (m == "state") {
                            val = ary[i][n][m] == 2 ? "启用" : ary[i][n][m] == 1 ? "冻结" : "停用";
                            table.push("<td class='sw70'><a href='javascript:void(0)' data-state='" + ary[i][n][m] + "' data-name='" + uName + "'>" + val + "</a></td>");
                        }
                        else {
                            table.push("<td>" + ary[i][n][m] + "</td>");
                        }
                    }
                }
                table.push("<td class='w15'><span class='sp s-44' data-up='managerupdate' data-name='" + uName + "'>修改</span><span class='sp s-55' data-fid='login' data-name='" + uName + "'>日志</span></td>");
                table.push("</tr>");
            }
        }
        $("#load-middle").html(forceMiddle({ title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定事件
        $("#state").val(state).unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "state", val: $(this).val() }) });
        });
        $("#search").unbind("click").click(function () {
            var seachName = $("#seachName").val();
            if (!G.StringSign(seachName)) {
                G.alert({ content: "请输入有效的账号！",
                    ok: function () {
                        $("#seachName").focus();
                        return true;
                    }
                });
            } else {
                middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "seachName", val: seachName }) });
            }
        });
        $("#load-middle thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#load-middle tbody td input[type='checkbox']").attr("checked", checked);
        });
        $("#magDel").unbind("click").click(function () {
            var idAry = [];
            $("#load-middle tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾选1个需要“刪除”的账号！", ok: function () { return true; } });
            } else {
                G.alert({ content: "警告：账号刪除后不可逆，确定刪除吗？",
                    ok: function () {
                        G.mask();
                        G.ajax("del_manager&data=" + idAry.join(","), function (json) {
                            G.maskClose();
                            if (json.result == 1) {
                                middleBind({ data_action: msg.data_action });
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); });
                        return true;
                    },
                    cancel: function () { }
                });
            }
        });
        $("#magAdd").unbind("click").click(function () {
            G.mask();
            //chenwei
            // G.ajax("manageradd", function (json) {
            var json = $.parseJSON('{"userManageId":"1","gameInfoId":"1","detailsId":"1","newsInfoId":"1","setOddsId":"1","autoOddsId":"1","onLineId":"1","operatingLogId":"1","openNumberId":"1","reportInfoId":"1","reportInfoAllId":"1","ChongZhiID":"1","TiXianID":"1","GlobalrID":"1","UserRebateID":"1","SetNumberID":"1"}');
                G.maskClose();
                var htm = [];
                htm.push("<div id='manageradd'>");
                htm.push("<table class='middle-table'>");
                htm.push("<tbody>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>账戶状态:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<label class='label-box'><input type='radio' name='state' value='0'>停用</label>");
                htm.push("<label class='label-box'><input type='radio' name='state' value='1'>冻结</label>");
                htm.push("<label class='label-box'><input type='radio' name='state' value='2' checked='checked'>启用</label>");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>用戶昵称:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<input type='text' name='fatherName' autocomplete='off' maxlength='9' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹个漢字2位字符)、字母、数字、下劃线组成，長度不超過12个英文字符或8个漢字！' />");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>登录账号:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<input type='text' name='userName' maxlength='12' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z_]{0,12}$/' mesg='“账号”由1-12位英文字母、数字、下劃线组成，且第壹位不能是下劃线！' />");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("<tr>");
                htm.push("<td class='w25 bc txt-right'>登录密码:</td>");
                htm.push("<td class='txt-left'>");
                htm.push("<input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密码”必需包含字母、和数字组成，長度6-20位！' />");
                htm.push("</td>");
                htm.push("</tr>");

                htm.push("</tbody>");
                htm.push("</table>");
                htm.push("<div class='clear'></div>");
                htm.push("<table class='middle-table'>");
                htm.push("<thead><tr><th colspan='4'>权限设置</th></tr></thead>");
                htm.push("<tbody>");

                htm.push("<tr>");
                htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='userManageId'>账戶管理</label></td>");
                htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='gameInfoId'>即時注单</label></td>");
                htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='detailsId'>报表查询</label></td>");
                htm.push("</tr>");
                if (__sysinfo.level <= 1) {
                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='newsInfoId'>公告管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='setOddsId'>賠率设置</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='autoOddsId'>自动跳水</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='onLineId'>在线查询</label></td>");
                    htm.push("</tr>");



                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoId'>注单管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='GlobalrID'>系统设置</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='UserRebateID'>水位设置</label></td>");
                    // htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='operateOrderID'>操作注单</label></td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='openNumberId'>开奖管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportdownid'>报表下载</label></td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='hotcodeid'>批量添加热码</label></td>");
                    htm.push("<td></td>");
                    htm.push("<td></td>");
                    htm.push("<td></td>");
                    htm.push("</tr>");

                }
                if (__sysinfo.level == 0) {
                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='operatingLogId'>操作日志</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='openNumberId'>开奖管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoId'>注单管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoAllId'>后台设置</label></td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                    htm.push("<td></td>");
                    htm.push("<td></td>");
                    htm.push("</tr>");
                }



                htm.push("</tbody>");
                htm.push("</table>");
                htm.push("</div>");
                var content = htm.join("");
                var obj, data_stop = true;
                G.alert({ title: "新增子账", content: content, width: 450,
                    initialize: function () {
                        obj = $("#manageradd");
                        for (var i in json) {
                            if (json[i] && json[i] == 1) {
                                obj.find("input[name='" + i + "']").attr({ "disabled": false, "checked": true });
                            }
                        }
                        var cheName, mythis;
                        obj.find("input[name='userName']").blur(function () {
                            mythis = $(this);
                            if ($(this).val() != "" && cheName != $(this).val()) {
                                cheName = $(this).val();
                                G.ajax("isUserName&name=" + cheName, function (json) {
                                    if (json.result == 1) {
                                        G.myTips({ content: "账号：" + cheName + " 已注冊使用，请更换其他字母组合！", obj: mythis, myclick: true });
                                    }
                                });
                            }
                        });
                    },
                    ok: function () {
                        var data = [], checked, mesg, reg, value;
                        obj.find("input").each(function () {
                            if ($(this).attr("type") == "text") {
                                value = $(this).val();
                                data.push($(this).attr("name") + ":" + value);
                                reg = eval($(this).attr("reg"));
                                mesg = $(this).attr("mesg");
                                if ($(this).attr("name") == "pwd" && !G.safety(value)) {
                                    if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                    data = false;
                                    return false;
                                } else if (reg && !reg.test(value)) {
                                    if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                    data = false;
                                    return false;
                                }
                            } else if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                data.push($(this).attr("name") + ":" + $(this).val());
                            } else if ($(this).attr("type") == "checkbox") {
                                checked = $(this).attr("checked") ? 1 : 0;
                                data.push($(this).attr("name") + ":" + checked);
                            }
                        });
                        if (data && data.length > 0 && data_stop) {
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            G.mask();
                            var param = data.join(",");
                            param = param.replace(/,/g,"&");
                            param = param.replace(/:/g,"=");
                            S.request = G.ajax("manageradd&data=add&" + param, function (json) {
                                G.maskClose();
                                if (json.result == 1) {
                                    G.alert({ content: "新增成功。",
                                        ok: function () { return true; },
                                        close: function () {
                                            middleBind({ data_action: msg.data_action });
                                        }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); });
                        }
                    },
                    cancel: function () { }
                });
            // }, function () { G.maskClose(); });
        });
        $("#load-middle tbody a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_state = $(this).attr("data-state");
            var data_stop = true;
            var content = "<div id='mystate'>"
                + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='2' /> 启用</label>"
                + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='1' /> 冻结</label>"
                + "<label style='margin:10px;display:inline-block;'><input type='radio' name='state' value='0' /> 停用</label>"
                + "</div>";
            G.alert({ title: "账号:" + data_name, content: content,
                initialize: function () {
                    $("#mystate").find("input[name='state'][value='" + data_state + "']").attr("checked", "checked");
                },
                ok: function () {
                    var mystate = $("#mystate").find("input[name='state']:checked").val();
                    if (mystate != data_state && data_stop) {
                        data_stop = false;
                        G.mask();
                        G.ajax("faststate_manager&name=" + data_name + "&state=" + mystate, function (json) {
                            G.maskClose();
                            if (json.result == 1) {
                                $("#load-middle tbody tr td[data-name='" + data_name + "']").parent("tr").html("");
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); });
                    }
                    return true;
                },
                cancel: function () { }
            });
        });
        $("#load-middle tbody span").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var data_fid = $(this).attr("data-fid");
            var data_up = $(this).attr("data-up");
            if (data_fid) { //日志、记录
                G.mask();

                var data_width;
                if (data_fid == "login") data_fid = "loginLog";
                var my_action = data_fid + "&name=" + data_name + "&ischild=1";
                G.ajax(my_action, function (json) {
                    G.maskClose();
                    if (data_fid == "loginLog") {
                        data_width = 500;
                        title = "登录日志：" + data_name;
                        thead = ["ID编号", "登录时间", "IP地址", "IP归属"];
                    } else if (data_fid == "record") {
                        data_width = 890;
                        title = "更变记录：" + data_name;
                        thead = ["ID", "操作时间", "更变说明", "原始值", "更变值", "操作者", "级別", "IP地址", "IP归属"];
                    }
                    table = [];
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            for (var n = 0; n < json[i].length; n++) {
                                table.push("<td>" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                    }
                    var content = G.overflowDiv({ id: "data-login", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    G.alert({ title: title, content: content, width: data_width,
                        initialize: function () {
                            $("#data-login #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + my_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                                table.push("<td>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#data-login tbody").append(table.join(""));
                                    } else {
                                        $("#data-login #fondiv").find("a").hide();
                                        $("#data-login #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () {
                            return true;
                        }
                    });
                }, function () { G.maskClose(); });
            } else if (data_up) { //修改
                G.mask();
                G.ajax(data_up + "&name=" + data_name, function (json) {
                    G.maskClose();
                    var htm = [];
                    htm.push("<div id='managerupdate'>");
                    htm.push("<table class='middle-table'>");
                    htm.push("<tbody>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>账戶状态:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<label class='label-box'><input type='radio' name='state' value='0'>停用</label>");
                    htm.push("<label class='label-box'><input type='radio' name='state' value='1'>冻结</label>");
                    htm.push("<label class='label-box'><input type='radio' name='state' value='2'>启用</label>");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>用戶昵称:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<input type='text' name='fatherName' autocomplete='off' maxlength='9' class='text-input sw90' reg='/^[a-zA-Z0-9-\u4e00-\u9fa5]{1,12}$/' mesg='“名稱”由漢字的簡繁體(壹个漢字2位字符)、字母、数字、下劃线组成，長度不超過12个英文字符或8个漢字！' />");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>登录账号:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<input type='text' name='userName' disabled='disabled' class='text-input sw90' />");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("<tr>");
                    htm.push("<td class='w25 bc txt-right'>登录密码:</td>");
                    htm.push("<td class='txt-left'>");
                    htm.push("<input type='text' name='pwd' autocomplete='off' maxlength='20' class='text-input sw90' reg='/^[a-z0-9A-Z][a-z0-9A-Z]{6,20}$/' mesg='“密码”必需包含字母、和数字组成，長度6-20位！' />");
                    htm.push("</td>");
                    htm.push("</tr>");

                    htm.push("</tbody>");
                    htm.push("</table>");
                    htm.push("<div class='clear'></div>");
                    htm.push("<table class='middle-table'>");
                    htm.push("<thead><tr><th colspan='4'>权限设置</th></tr></thead>");
                    htm.push("<tbody>");

                    htm.push("<tr>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='userManageId'>账戶管理</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='gameInfoId'>即時注单</label></td>");
                    htm.push("<td><label class='label-box'><input type='checkbox' name='detailsId'>报表查询</label></td>");
                    htm.push("</tr>");
                    if (__sysinfo.level <= 1) {
                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='newsInfoId'>公告管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='setOddsId'>賠率设置</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='autoOddsId'>自动跳水</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='onLineId'>在线查询</label></td>");
                        htm.push("</tr>");



                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportInfoId'>注单管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='GlobalrID'>系统设置</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='UserRebateID'>水位设置</label></td>");
                        // htm.push("<td><label class='label-box'><input type='checkbox' name='operateOrderID'>操作注单</label></td>");
                        htm.push("</tr>");

                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='openNumberId'>开奖管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='reportdownid'>报表下载</label></td>");
                        htm.push("</tr>");

                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='hotcodeid'>批量添加热码</label></td>");
                        htm.push("<td></td>");
                        htm.push("<td></td>");
                        htm.push("<td></td>");
                        htm.push("</tr>");

                    }
                    if (__sysinfo.level == 0) {
                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='operatingLogId'>操作日志</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='openNumberId'>开奖管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='reportInfoId'>注单管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' name='reportInfoAllId'>后台设置</label></td>");
                        htm.push("</tr>");

                        htm.push("<tr>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='ChongZhiID'>充值管理</label></td>");
                        htm.push("<td><label class='label-box'><input type='checkbox' disabled='disabled' name='TiXianID'>提现管理</label></td>");
                        htm.push("<td></td>");
                        htm.push("<td></td>");
                        htm.push("</tr>");
                    }

                    htm.push("</tbody>");
                    htm.push("</table>");
                    htm.push("</div>");
                    var content = htm.join("");
                    var obj, data_stop = true;
                    G.alert({ title: "修改子账：" + data_name, content: content, width: 450,
                        initialize: function () {
                            obj = $("#managerupdate");
                            obj.find("input[name='fatherName']").val(json.fatherName);
                            obj.find("input[name='userName']").val(json.userName);
                            obj.find("input[name='state'][value='" + json.state + "']").attr("checked", "checked");
                            for (var i in json) {
                                if (typeof json[i] == "object") {
                                    obj.find("input[name='" + i + "']").attr({
                                        "checked": json[i][0] == 1 ? true : false,
                                        "disabled": json[i][1] == 0 ? true : false
                                    });
                                }
                            }
                        },
                        ok: function () {
                            var data = [], checked, mesg, reg, value;
                            obj.find("input").each(function () {
                                if ($(this).attr("type") == "text") {
                                    value = $(this).val();
                                    data.push($(this).attr("name") + ":" + value);
                                    reg = eval($(this).attr("reg"));
                                    mesg = $(this).attr("mesg");
                                    if ($(this).attr("name") == "pwd") {
                                        if (value != "" && !G.safety(value)) {
                                            if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                            data = false;
                                            return false;
                                        }
                                    } else if (reg && !reg.test(value)) {
                                        if (mesg) { G.myTips({ content: mesg, obj: $(this), myclick: true }); }
                                        data = false;
                                        return false;
                                    }
                                } else if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                                    data.push($(this).attr("name") + ":" + $(this).val());
                                } else if ($(this).attr("type") == "checkbox") {
                                    checked = $(this).attr("checked") ? 1 : 0;
                                    data.push($(this).attr("name") + ":" + checked);
                                }
                            });
                            if (data && data.length > 0 && data_stop) {
                                data_stop = false;
                                if (S.request) { S.request.abort(); }
                                G.mask();
                                S.request = G.ajax(data_up + "&name=" + data_name + "&data=" + data.join(","), function (json) {
                                    G.maskClose();
                                    if (json.result == 1) {
                                        G.alert({ content: "保存成功。",
                                            ok: function () { return true; },
                                            close: function () {
                                                middleBind({ data_action: msg.data_action });
                                            }
                                        });
                                    } else {
                                        G.alert({ content: json.result, ok: function () { return true; } });
                                    }
                                }, function () { G.maskClose(); });
                            }
                        },
                        cancel: function () { }
                    });

                }, function () { G.maskClose(); });
            }
        });
    // }, function () {
    //     G.maskClose();
    //     G.rollBack();
    // });
}

//历史开奖模块
function result(msg) {
    //加载数据
    G.scrollLoad({});
    if (S.request) { S.request.abort(); }
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"currentPage":1,"totalPage":247,"table":["<tr class=\'\'><td>20190803034<br />08-03 02:50</td><td><i class=\'SSCNo_4\'></i><i class=\'SSCNo_3\'></i><i class=\'SSCNo_3\'></i><i class=\'SSCNo_8\'></i><i class=\'SSCNo_6\'></i></td><td class=\'sw45\'>24</td><td class=\'red sw35\'>大</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803033<br />08-03 02:45</td><td><i class=\'SSCNo_1\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_6\'></i><i class=\'SSCNo_9\'></i><i class=\'SSCNo_2\'></i></td><td class=\'sw45\'>23</td><td class=\'red sw35\'>大</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803032<br />08-03 02:40</td><td><i class=\'SSCNo_1\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_9\'></i><i class=\'SSCNo_4\'></i><i class=\'SSCNo_2\'></i></td><td class=\'sw45\'>21</td><td class=\'sw35\'>小</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803031<br />08-03 02:35</td><td><i class=\'SSCNo_5\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_1\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_1\'></i></td><td class=\'sw45\'>17</td><td class=\'sw35\'>小</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803030<br />08-03 02:30</td><td><i class=\'SSCNo_6\'></i><i class=\'SSCNo_2\'></i><i class=\'SSCNo_2\'></i><i class=\'SSCNo_2\'></i><i class=\'SSCNo_7\'></i></td><td class=\'sw45\'>19</td><td class=\'sw35\'>小</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803029<br />08-03 02:25</td><td><i class=\'SSCNo_9\'></i><i class=\'SSCNo_3\'></i><i class=\'SSCNo_1\'></i><i class=\'SSCNo_1\'></i><i class=\'SSCNo_8\'></i></td><td class=\'sw45\'>22</td><td class=\'sw35\'>小</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803028<br />08-03 02:20</td><td><i class=\'SSCNo_8\'></i><i class=\'SSCNo_2\'></i><i class=\'SSCNo_6\'></i><i class=\'SSCNo_7\'></i><i class=\'SSCNo_9\'></i></td><td class=\'sw45\'>32</td><td class=\'red sw35\'>大</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803027<br />08-03 02:15</td><td><i class=\'SSCNo_3\'></i><i class=\'SSCNo_2\'></i><i class=\'SSCNo_4\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_4\'></i></td><td class=\'sw45\'>18</td><td class=\'sw35\'>小</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803026<br />08-03 02:10</td><td><i class=\'SSCNo_6\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_6\'></i><i class=\'SSCNo_2\'></i></td><td class=\'sw45\'>19</td><td class=\'sw35\'>小</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803025<br />08-03 02:05</td><td><i class=\'SSCNo_5\'></i><i class=\'SSCNo_4\'></i><i class=\'SSCNo_8\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_7\'></i></td><td class=\'sw45\'>29</td><td class=\'red sw35\'>大</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803024<br />08-03 02:00</td><td><i class=\'SSCNo_8\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_9\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_5\'></i></td><td class=\'sw45\'>32</td><td class=\'red sw35\'>大</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803023<br />08-03 01:55</td><td><i class=\'SSCNo_3\'></i><i class=\'SSCNo_7\'></i><i class=\'SSCNo_1\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_6\'></i></td><td class=\'sw45\'>22</td><td class=\'sw35\'>小</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803022<br />08-03 01:50</td><td><i class=\'SSCNo_3\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_4\'></i><i class=\'SSCNo_9\'></i></td><td class=\'sw45\'>16</td><td class=\'sw35\'>小</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803021<br />08-03 01:45</td><td><i class=\'SSCNo_8\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_7\'></i><i class=\'SSCNo_8\'></i></td><td class=\'sw45\'>23</td><td class=\'red sw35\'>大</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803020<br />08-03 01:40</td><td><i class=\'SSCNo_3\'></i><i class=\'SSCNo_7\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_7\'></i><i class=\'SSCNo_5\'></i></td><td class=\'sw45\'>22</td><td class=\'sw35\'>小</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803019<br />08-03 01:35</td><td><i class=\'SSCNo_5\'></i><i class=\'SSCNo_7\'></i><i class=\'SSCNo_6\'></i><i class=\'SSCNo_4\'></i><i class=\'SSCNo_9\'></i></td><td class=\'sw45\'>31</td><td class=\'red sw35\'>大</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803018<br />08-03 01:30</td><td><i class=\'SSCNo_4\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_1\'></i><i class=\'SSCNo_4\'></i><i class=\'SSCNo_0\'></i></td><td class=\'sw45\'>14</td><td class=\'sw35\'>小</td><td class=\'red sw35\'>双</td></tr>","<tr class=\'\'><td>20190803017<br />08-03 01:25</td><td><i class=\'SSCNo_6\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_1\'></i><i class=\'SSCNo_3\'></i><i class=\'SSCNo_8\'></i></td><td class=\'sw45\'>23</td><td class=\'red sw35\'>大</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803016<br />08-03 01:20</td><td><i class=\'SSCNo_9\'></i><i class=\'SSCNo_5\'></i><i class=\'SSCNo_2\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_7\'></i></td><td class=\'sw45\'>23</td><td class=\'red sw35\'>大</td><td class=\'sw35\'>单</td></tr>","<tr class=\'\'><td>20190803015<br />08-03 01:15</td><td><i class=\'SSCNo_4\'></i><i class=\'SSCNo_8\'></i><i class=\'SSCNo_3\'></i><i class=\'SSCNo_0\'></i><i class=\'SSCNo_4\'></i></td><td class=\'sw45\'>19</td><td class=\'sw35\'>小</td><td class=\'sw35\'>单</td></tr>"]}');
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        var title = "历史开奖", data_thead, data_width, data_bc;
        switch (gameIndex) {
            case 1: //香港HK
                data_width = 890;
                data_thead = "<tr><th class='w12'>期数日期</th><th>开奖号码</th><th colspan='3'>总和</th><th>7色波</th><th colspan='6'>特码两面</th></tr>";
                break;
            case 7:
            case 2: //广东快乐十分
                data_width = 690;
                data_thead = "<tr><th class='w15'>期数日期</th><th>开奖号码</th><th colspan='4'>总和</th><th colspan='4'>1-4龍虎</th></tr>";
                break;
            case 3: //重庆时时彩
                data_width = 780;
                data_thead = "<tr><th class='w15'>期数日期</th><th>开奖号码</th><th colspan='3'>总和</th></tr>";
                break;
            case 4: //北京赛车PK10
            case 14: //极速赛车
            case 8:
                data_width = 750;
                data_thead = "<tr><th class='w15'>期数日期</th><th>开奖号码</th><th colspan='3'>冠亞軍和</th><th colspan='5'>1~5龍虎</th></tr>";
                break;
            case 5: //江苏快3
                data_width = 320;
                data_thead = "<tr><th>期数日期</th><th>开奖号码</th><th colspan='2'>总和</th></tr>";
                break;
            case 6: //北京快乐8
                data_width = 930;
                data_thead = "<tr><th class='w10'>期数日期</th><th>开奖号码</th><th colspan='4'>总和</th><th colspan='2'>比数量</th></tr>";
                break;
            case 10: //广西快乐十分
                data_width = 500;
                data_thead = "<tr><th class='w25'>期数日期</th><th>开奖号码</th><th colspan='4'>总和</th><th>龍虎</th></tr>";
                break;
            case 13: //广西快3
                data_width = 320;
                data_thead = "<tr><th>期数日期</th><th>开奖号码</th><th colspan='2'>总和</th></tr>";
                //data_width = 825;
                //data_thead = "<tr><th class='w12'>期数日期</th><th>开奖号码</th><th colspan='2'>千百</th><th colspan='2'>千拾</th><th colspan='2'>千个</th><th colspan='2'>百拾</th><th colspan='2'>百个</th><th colspan='2'>拾个</th></tr>";
                break;
        }

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定titleNav
        var titleNavAry = ["<select data-id='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select>");
        $("#load-middle").html("<div style='margin: 0 auto;width:" + data_width + "px;' id='result'>" + forceMiddle({ title: title, titleNav: titleNavAry.join(""), eachThead: data_thead, tbody: json.table }) + "</div>").show();
        $("#title-nav").addClass("title-nav-right");
        $("select[data-id='gameIndex']").val(gameIndex);
        G.mouseover("#load-middle tbody tr");

        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

    // }, function () {
    //     G.maskClose();
    //     G.rollBack();
    // });
}

//个人登录日志
function mylogin(msg) {
    G.mask();
    if (S.request) { S.request.abort(); }
    var table = [];
    var data_name = $("#myRoleName").html().split(":")[1];
    var title = "登录日志：" + data_name;
    var thead = ["ID编号", "登录时间", "IP地址", "IP归属"];
    msg.data_action = "loginLog&name=" + __sysinfo.myName + "&queryId=" + __sysinfo.level;
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('[[68082,"2019-07-27 01:10:08","119.131.170.163",""],[70365,"2019-07-27 10:05:33","119.131.183.245",""],[118616,"2019-08-01 00:51:07","119.131.180.249",""],[125433,"2019-08-01 17:20:12","113.65.19.13",""],[125538,"2019-08-01 17:30:04","113.65.19.13",""],[129239,"2019-08-01 23:49:26","119.131.180.249",""],[130267,"2019-08-02 01:33:11","119.131.180.249",""],[130285,"2019-08-02 01:36:03","119.131.180.249",""],[130288,"2019-08-02 01:36:22","119.131.180.249",""],[130413,"2019-08-02 01:57:02","119.131.180.249",""]]');
        G.maskClose();
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    table.push("<td>" + json[i][n] + "</td>");
                }
                table.push("</tr>");
            }
        }
        var content = G.overflowDiv({ id: "data-login", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
        var generatedCount = 1;
        G.alert({ title: title, content: content, width: 500,
            initialize: function () {
                $("#data-login #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                    table.push("<td>" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#data-login tbody").append(table.join(""));
                        } else {
                            $("#data-login #fondiv").find("a").hide();
                            $("#data-login #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () {
                return true;
            }
        });
    // }, function () { G.maskClose(); });
}

//修改个人密码
function changepwd(msg) {
    var data_stop = true;
    var content = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tbody>"
        + "<tr>"
        + "<td valign='top'>"
        + "<table id='changepwd'>"
        + "<tbody>"
        + "<tr>"
        + "<td height='30' width='100' align='right'>原始密码&nbsp;</td>"
        + "<td height='30'>&nbsp;<input name='voldpassword' class='text-input sw120' autocomplete='off' type='password'></td>"
        + "</tr>"
        + "<tr>"
        + "<td height='30' align='right'>新设密码&nbsp;</td>"
        + "<td height='30' align='left'>&nbsp;<input name='vnewpassword' autocomplete='off' class='text-input sw120' type='password'></td>"
        + "</tr>"
        + "<tr>"
        + "<td height='30' align='right'>确认密码&nbsp;</td>"
        + "<td height='30' align='left'>&nbsp;<input name='vrenewpassword' autocomplete='off' class='text-input sw120' type='password'></td>"
        + "</tr>"
        + "</tbody>"
        + "</table>"
        + "</td>"
        + "</tr>"
        + "</tbody>"
        + "</table>";
    G.alert({ title: "变更密码", content: content, width: 450, okVal: "确定修改", cancelVal: "重填",
        cancel: function () {
            $("#changepwd input[type='password']").val("");
            return true;
        },
        ok: function () {
            var voldpassword = $("input[name='voldpassword']");
            var vnewpassword = $("input[name='vnewpassword']");
            var vrenewpassword = $("input[name='vrenewpassword']");
            if (voldpassword.val() == "") {
                G.myTips({ content: "请填写原始密码", obj: voldpassword, myclick: true });
            } else if (voldpassword.val().length < 6 || voldpassword.val().length > 20 || !G.StringSign(voldpassword.val())) {
                G.myTips({ content: "密码 6-20位,且必需包含字母、和数字！", obj: voldpassword, myclick: true });
            } else if (vnewpassword.val() == "") {
                G.myTips({ content: "请填写新密码", obj: voldpassword, myclick: true });
            } else if (vnewpassword.val().length < 6 || vnewpassword.val().length > 20 || !G.safety(vnewpassword.val())) {
                G.myTips({ content: "密码 6-20位,且必需包含字母、和数字！", obj: vnewpassword, myclick: true });
            } else if (vnewpassword.val() != vrenewpassword.val()) {
                G.myTips({ content: "两次如数密码不一致，请核实后重新输入！", obj: vrenewpassword, myclick: true });
            } else if (vnewpassword.val() == voldpassword.val()) {
                G.myTips({ content: "旧密码与新密码一致，请更换新密码。", obj: vnewpassword, myclick: true });
            } else if (data_stop) {
                data_stop = false;
                G.mask();
                var data = [];
                data.push("voldpassword:" + voldpassword.val());
                data.push("vnewpassword:" + vnewpassword.val());
                if (S.request) { S.request.abort(); }
                S.request = G.ajax("cheangepwd&voldpassword=" + voldpassword.val() + "&vnewpassword=" + vnewpassword.val(), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "密码更改成功。", ok: function () { return true; } });
                    } else {
                        alert(json.result);
                        data_stop = true;
                    }
                }, function () { G.maskClose(); });
            }
        },
        close: function () { }
    });
}

//个人信息
function myinfo(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"userName":"ttt168","fatherName":"asd","rebateId":1,"state":"启用","credits":2000.0,"yuer":1999.0,"stintOccupy":"Auto","list":[[1,1.0,1000,10000,9.97,0],[15,1.0,1000,10000,9.97,0],[29,1.0,1000,10000,9.97,0],[43,1.0,1000,10000,9.97,0],[57,1.0,1000,10000,9.97,0],[108,1.0,1000,5000,99.7,0],[208,1.0,1000,5000,99.7,0],[308,1.0,1000,5000,99.7,0],[408,1.0,1000,5000,99.7,0],[508,1.0,1000,5000,99.7,0],[608,1.0,1000,5000,99.7,0],[708,1.0,1000,5000,99.7,0],[808,1.0,1000,5000,99.7,0],[908,1.0,1000,5000,99.7,0],[1008,1.0,1000,5000,99.7,0],[1108,0.1,100,1000,997.0,0],[2108,0.1,100,1000,997.0,0],[3108,0.1,100,1000,997.0,0],[4108,0.1,100,1000,997.0,0],[5108,0.1,100,1000,997.0,0],[6108,0.1,100,1000,997.0,0],[7108,0.1,100,1000,997.0,0],[8108,0.1,100,1000,997.0,0],[9108,0.1,100,1000,997.0,0],[10108,0.1,100,1000,997.0,0],[11108,0.1,10,30,9970.0,0],[21108,0.1,10,30,9970.0,0],[31108,0.1,10,30,9970.0,0],[41108,0.1,10,30,9970.0,0],[51108,0.1,10,30,9970.0,0]]}');
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
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
        var table;
        if(gameIndex == 3) {
            table = [
                "<div id='myinfo'>",
                "<table class='middle-table'><thead><tr><th colspan='6'>基本信息</th></tr></thead>",
                "<tbody>",
                "<tr><td class='w25 txt-right bc'>用戶账号:</td><td class='txt-left'>" + json.userName + " (" + json.state + ")</td></tr>",
                "<tr><td class='w25 txt-right bc'>用戶昵称:</td><td class='txt-left'>" + json.fatherName + "</td></tr>",
                "<tr><td class='w25 txt-right bc'>信用额度:</td><td class='txt-left'>" + json.credits + "</td></tr>",
                "<tr><td class='w25 txt-right bc'>可用额度:</td><td class='txt-left'>" + json.yuer + "</td></tr>",
                "<tr><td class='w25 txt-right bc'>占成分配:</td><td class='txt-left'>" + json.stintOccupy + "</td></tr>",
                "</tbody>",
                "</table>",
                "<div class='clear eachWid'></div>",
                "<table border='0'cellpadding='0' cellspacing='0' width='100%' class='eachWid'>",
                "<thead>",
                "<tr>",
                "<td>",
                "<table class='middle-table'><thead><tr><th>" + $("select[data-id='gameIndex']").find("option:selected").text() + "</th></tr></thead></table>",
                "<div style=' float:left; width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<tbody id='info-left'>",
                "<tr class='bc'><td class='w15'>项目</td><td>单注最低</td><td>单注最高</td><td>单项最高</td><td>赔率</td><td>拦货金额</td></tr>",
                "<tr>",
                "<td class='bc sw120'>一定位</td>",
                "<td colspan='5'></td>",
                "</tr>",
                "<tr sort='1'>",
                "<td class='bc sw120'>第一球</td>",

                "</tr>",
                "<tr sort='15'>",
                "<td class='bc sw120'>第二球</td>",

                "</tr>",
                "<tr sort='29'>",
                "<td class='bc sw120'>第三球</td>",

                "</tr>",
                "<tr sort='43'>",
                "<td class='bc sw120'>第四球</td>",

                "</tr>",
                "<tr sort='57'>",
                "<td class='bc sw120'>第五球</td>",

                "</tr>",
                "<tr>",
                "<td class='bc sw120'>二定位</td>",
                "<td colspan='5'></td>",
                "</tr>",
                "<tr sort='108'>",
                "<td class='bc sw120'>万千XXX</td>",

                "</tr>",
                "<tr sort='208'>",
                "<td class='bc sw120'>万X百XX</td>",

                "</tr>",
                "<tr sort='308'>",
                "<td class='bc sw120'>万XX十X</td>",

                "</tr>",
                "<tr sort='408'>",
                "<td class='bc sw120'>万XXX个</td>",

                "</tr>",
                "<tr sort='508'>",
                "<td class='bc sw120'>X千百XX</td>",

                "</tr>",
                "<tr sort='608'>",
                "<td class='bc sw120'>X千X十X</td>",

                "</tr>",
                "<tr sort='708'>",
                "<td class='bc sw120'>X千XX个</td>",

                "</tr>",
                "<tr sort='808'>",
                "<td class='bc sw120'>XX百十X</td>",

                "</tr>",
                "<tr sort='908'>",
                "<td class='bc sw120'>XX百X个</td>",

                "</tr>",
                "<tr sort='1008'>",
                "<td class='bc sw120'>XXX十个</td>",

                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style=' float:right; width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<tbody id='info-right'>",
                "<tr class='bc'><td class='w15'>项目</td><td>单注最低</td><td>单注最高</td><td>单项最高</td><td>赔率</td><td>拦货金额</td></tr>",
                "<tr>",
                "<td class='bc sw120'>三定位</td>",
                "<td colspan='5'></td>",
                "</tr>",

                "<tr sort='1108'>",
                "<td class='bc sw120'>万千百XX</td>",

                "</tr>",
                "<tr sort='2108'>",
                "<td class='bc sw120'>万千X十X</td>",

                "</tr>",
                "<tr sort='3108'>",
                "<td class='bc sw120'>万千XX个</td>",

                "</tr>",
                "<tr sort='4108'>",
                "<td class='bc sw120'>万X百十X</td>",

                "</tr>",
                "<tr sort='5108'>",
                "<td class='bc sw120'>万X百X个</td>",

                "</tr>",
                "<tr sort='6108'>",
                "<td class='bc sw120'>万XX十个</td>",

                "</tr>",
                "<tr sort='7108'>",
                "<td class='bc sw120'>X千百十X</td>",

                "</tr>",
                "<tr sort='8108'>",
                "<td class='bc sw120'>X千百X个</td>",

                "</tr>",
                "<tr sort='9108'>",
                "<td class='bc sw120'>X千X十个</td>",

                "</tr>",
                "<tr sort='10108'>",
                "<td class='bc sw120'>XX百十个</td>",

                "</tr>",
                "<tr>",
                "<td class='bc sw120'>四定位</td>",
                "<td colspan='5'></td>",
                "</tr>",
                "<tr sort='11108'>",
                "<td class='bc sw120'>万千百十X</td>",

                "</tr>",
                "<tr sort='21108'>",
                "<td class='bc sw120'>万千百X个</td>",

                "</tr>",
                "<tr sort='31108'>",
                "<td class='bc sw120'>万千X十个</td>",

                "</tr>",
                "<tr sort='41108'>",
                "<td class='bc sw120'>万X百十个</td>",

                "</tr>",
                "<tr sort='51108'>",
                "<td class='bc sw120'>X口口口口</td>",

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
                "<div >（设置占成，需要在“个人管理”中添加<span style='color: red'>拦货金额</span>才生效）。<span style='color: red'>提示:</span>如果庄家先吃满,则不以所设成数来分配,以实际分配到拦货中金额为准。</div>",
                "</td></tr>",
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span></td></tr>",
                "</tfoot>",
                "</table>",
                "</div>"

            ];
        }else {
            table = [
                "<div id='myinfo'>",
                "<table class='middle-table'><thead><tr><th colspan='6'>基本信息</th></tr></thead>",
                "<tbody>",
                "<tr><td class='w25 txt-right bc'>用戶账号:</td><td class='txt-left'>" + json.userName + " (" + json.state + ")</td></tr>",
                "<tr><td class='w25 txt-right bc'>用戶昵称:</td><td class='txt-left'>" + json.fatherName + "</td></tr>",
                "<tr><td class='w25 txt-right bc'>信用额度:</td><td class='txt-left'>" + json.credits + "</td></tr>",
                "<tr><td class='w25 txt-right bc'>可用额度:</td><td class='txt-left'>" + json.yuer + "</td></tr>",
                "<tr><td class='w25 txt-right bc'>占成分配:</td><td class='txt-left'>" + json.stintOccupy + "</td></tr>",
                "</tbody>",
                "</table>",
                "<div class='clear eachWid'></div>",
                "<table border='0'cellpadding='0' cellspacing='0' width='100%' class='eachWid'>",
                "<thead>",
                "<tr>",
                "<td>",
                "<table class='middle-table'><thead><tr><th>" + $("select[data-id='gameIndex']").find("option:selected").text() + "</th></tr></thead></table>",
                "<div style=' float:left; width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<tbody id='info-left'>",
                "<tr class='bc'><td class='w15'>项目</td><td>单注最低</td><td>单注最高</td><td>单项最高</td><td>赔率</td><td>拦货金额</td></tr>",
                "<tr sort='22'>",
                "<td class='bc sw120'>1-10单码</td>",
                "</tr>",
                "<tr sort='36'>",
                "<td class='bc sw120'>1-5龙虎</td>",
                "</tr>",
                "<tr sort='18'>",
                "<td class='bc sw120'>冠亚单</td>",
                "</tr>",
                "<tr sort='19'>",
                "<td class='bc sw120'>冠亚双</td>",
                "</tr>",
                "<tr sort='20'>",
                "<td class='bc sw120'>冠亚大</td>",
                "</tr>",
                "<tr sort='21'>",
                "<td class='bc sw120'>冠亚小</td>",
                "</tr>",
                "</tbody>",
                "</table>",
                "</div>",
                "<div style=' float:right; width:49.9%'>",
                "<table class='middle-table bor-top'>",
                "<tbody id='info-right'>",
                "<tr class='bc'><td class='w15'>项目</td><td>单注最低</td><td>单注最高</td><td>单项最高</td><td>赔率</td><td>拦货金额</td></tr>",
                "<tr sort='1'>",
                "<td class='bc sw120'>冠亚和-3,4,18,19</td>",
                "</tr>",
                "<tr sort='3'>",
                "<td class='bc sw120'>冠亚和-5,6,16,17</td>",
                "</tr>",
                "<tr sort='5'>",
                "<td class='bc sw120'>冠亚和-7,8,14,15</td>",
                "</tr>",
                "<tr sort='7'>",
                "<td class='bc sw120'>冠亚和-9,10,12,13</td>",
                "</tr>",
                "<tr sort='9'>",
                "<td class='bc sw120'>冠亚和-11</td>",
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
                "<div >（设置占成，需要在“个人管理”中添加<span style='color: red'>拦货金额</span>才生效）。<span style='color: red'>提示:</span>如果庄家先吃满,则不以所设成数来分配,以实际分配到拦货中金额为准。</div>",
                "</td></tr>",
                "<tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span></td></tr>",
                "</tfoot>",
                "</table>",
                "</div>"
            ];
        }
        var content = table.join("");
        $("#load-middle").html(content).show();
        $("#shell_title").html("信用資料");
        if (json.list.length == 0) {
            $("#myinfo").find(".eachWid").hide();
        } else {

            for (var i = 0; i < json.list.length; i++) {
                var leftAry = [];
                leftAry.push("<td>" + json.list[i][1] + "</td>");
                leftAry.push("<td>" + json.list[i][2] + "</td>");
                leftAry.push("<td>" + json.list[i][3] + "</td>");
                leftAry.push("<td>" + json.list[i][4] + "</td>");
                leftAry.push("<td><input type='text' value='"+json.list[i][5]+"' autocomplete='off' ext=' class='text-input sw35'></td>");

                $("#myinfo").find("tr[sort='"+json.list[i][0]+"']").append(leftAry.join(""));

            }
            G.mouseover("#myinfo .eachWid tbody tr");
        }


        //数据提交
        var data_stop = true;
        var obj = $("#myinfo");

        obj.find("input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));

        });

        obj.find("#submit").unbind("click").click(function () {
            var data = [],occupy = [], sort;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                if (sort != undefined) {

                    data.push(sort + ":" +  $(this).find("input[type='text']").val() );
                }
            });
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + data.join("|"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    // }, function () {
    //     G.rollBack();
    // });
}

//自动补货设置
function shipments(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
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

        var table = [
            "<div id='shipments'>",
            "<table border='0'cellpadding='0' cellspacing='0' width='100%'>",
            "<thead>",
            "<tr>",
            "<td>",
            "<table class='middle-table'><thead><tr><th>" + $("select[data-id='gameIndex']").find("option:selected").text() + "</th></tr></thead></table>",
            "<div style=' float:left; width:49.9%'>",
            "<table class='middle-table bor-top'>",
            "<tbody id='info-left'>",
            "<tr class='bc'><td>项目类型</td><td>实占注额</td><td>補貨計算</td><td>起補金额</td><td><select name='data-left'><option value=''>选择</option><option value='1'>启用</option><option value='0'>关闭</option></select></td></tr>",
            "</tbody>",
            "</table>",
            "</div>",
            "<div style=' float:right; width:49.9%'>",
            "<table class='middle-table bor-top'>",
            "<tbody id='info-right'>",
            "<tr class='bc'><td>项目类型</td><td>实占注额</td><td>補貨計算</td><td>起補金额</td><td><select name='data-left'><option value=''>选择</option><option value='1'>启用</option><option value='0'>关闭</option></select></td></tr>",
            "</tbody>",
            "</table>",
            "</div>",
            "<table class='middle-table'><tfoot><tr><td style='padding-top:20px;'><span class='text-btn' id='submit'>确定保存</span></td></tr></tfoot></table>",
            "</td>",
            "</tr>",
            "</thead>",
            "</table>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $("#shell_title").html("自动補貨设定");
        var len = json.list.length % 2 != 0 ? parseInt(json.list.length / 2 + 1) : parseInt(json.list.length / 2);
        if (json.list.length > 0) {
            var leftAry = [];
            var rightAry = [];
            var selected, data_stop = true;
            for (var i = 0; i < len; i++) {
                leftAry.push("<tr data-sort='" + json.list[i][0] + "'>");
                leftAry.push("<td class='bc'>" + FormatTs(gameIndex, json.list[i][0]) + "</td>");
                leftAry.push("<td><input type='text' class='text-input sw70' number='' maxlength='7' value='" + json.list[i][1] + "' /></td>");
                leftAry.push("<td><select><option value='0'>单笔统计</option></select></td>");
                leftAry.push("<td>2</td>");
                selected = ["", ""];
                json.list[i][2] == 0 ? selected[0] = "selected='selected'" : selected[1] = "selected='selected'";
                leftAry.push("<td><select name='select'><option value='0' " + selected[0] + ">关闭</option><option value='1' " + selected[1] + ">启用</option></select></td>");
                leftAry.push("</tr>");

                if (json.list[len + i]) {
                    rightAry.push("<tr data-sort='" + json.list[len + i][0] + "'>");
                    rightAry.push("<td class='bc'>" + FormatTs(gameIndex, json.list[len + i][0]) + "</td>");
                    rightAry.push("<td><input type='text' class='text-input sw70' number='' maxlength='7' value='" + json.list[len + i][1] + "' /></td>");
                    rightAry.push("<td><select><option value='0'>单笔统计</option></select></td>");
                    rightAry.push("<td>2</td>");
                    json.list[len + i][2] == 0 ? selected[0] = "selected='selected'" : selected[1] = "selected='selected'";
                    rightAry.push("<td><select name='select'><option value='0' " + selected[0] + ">关闭</option><option value='1' " + selected[1] + ">启用</option></select></td>");
                    rightAry.push("</tr>");
                }
            }
            $("#shipments").find("#info-left").append(leftAry.join(""));
            $("#shipments").find("#info-right").append(rightAry.join(""));
            G.mouseover("#shipments tbody tr");
            if (json.dayDetails == 1) {
                $("#shipments input").attr("disabled", "disabled");
                $("#shipments select").attr("disabled", "disabled");
            }

            //全选
            $("#shipments select[name='data-right']").unbind("change").change(function () {
                if ($(this).val() != "") {
                    $("#shipments #info-right select").val($(this).val());
                }
            });
            $("#shipments select[name='data-left']").unbind("change").change(function () {
                if ($(this).val() != "") {
                    $("#shipments #info-left select").val($(this).val());
                }
            });
            $("#shipments tbody input[type='text']").focus(function () {
                G.myTips({ content: "自动補貨说明：起補金额必须大于或等于2元，<br />計算方式按单笔注单的“总实際占成”計算。", obj: $(this), myclick: true });
            });
            $("#shipments #submit").unbind("click").click(function () {
                var data = [];
                $("#shipments tbody tr").each(function () {
                    if ($(this).attr("data-sort") && G.NumberSign($(this).attr("data-sort"))) {
                        if (!G.NumberSign($(this).find("input[type='text']").val())) {
                            G.alert({ content: "“補貨金额”由1-9位正整数组成！", ok: function () { return true; } });
                            data = false;
                            return false;
                        } else {
                            data.push($(this).attr("data-sort") + ":" + $(this).find("input[type='text']").val() + ":" + $(this).find("select[name='select']").val());
                        }
                    }
                });
                if (data && data.length > 0 && json.dayDetails == 0 && data_stop) {
                    data_stop = false;
                    G.mask();
                    if (S.request) { S.request.abort(); }
                    S.request = G.ajax(msg.data_action + "&data=" + data.join(","), function (json) {
                        G.maskClose();
                        setTimeout(function () { data_stop = true; }, 3000);
                        if (json.result == 1) {
                            G.alert({ content: "保存成功。", ok: function () { return true; } });
                        } else {
                            G.alert({ content: json.result, ok: function () { return true; } });
                        }
                    }, function () {
                        G.maskClose();
                        setTimeout(function () { data_stop = true; }, 3000);
                    });
                }
            });
        }
    }, function () {
        G.rollBack();
    });
}

//自动补货更改记录
function shipmentslog(msg) {
    G.mask();
    var table = [];
    //var data_name = $("#myRoleName").html().split(":")[1];
    var title = "自动補貨更变记录：";
    var thead = ["ID编号", "操作时间", "更变类型", "更变前值", "更变后值", "操作者", "级別", "IP地址", "IP归属"];
    if (S.request) { S.request.abort(); }
    S.request = G.ajax(msg.data_action, function (json) {
        G.maskClose();
        if (json && json.length > 0) {
            for (var i = 0; i < json.length; i++) {
                table.push("<tr>");
                for (var n = 0; n < json[i].length; n++) {
                    table.push("<td>" + json[i][n] + "</td>");
                }
                table.push("</tr>");
            }
        }
        var content = G.overflowDiv({ id: "data-shipmentslog", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
        var generatedCount = 1;
        G.alert({ title: title, content: content, width: 830,
            initialize: function () {
                $("#data-shipmentslog #fondiv").find("a").unbind("click").click(function () {
                    generatedCount++;
                    my_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                    table.push("<td>" + json[i][n] + "</td>");
                                }
                                table.push("</tr>");
                            }
                            $("#data-shipmentslog tbody").append(table.join(""));
                        } else {
                            $("#data-shipmentslog #fondiv").find("a").hide();
                            $("#data-shipmentslog #fondiv").find("span").show();
                        }
                    }, function () { G.myLayerImgClose(); });
                }
            },
            ok: function () {
                return true;
            }
        });
    }, function () { G.maskClose(); });
}

//报表查询
function reportform(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"beifenid":0,"generalId":0,"myGeneralId":0,"reportDate":["2019-07-27","2019-08-02"],"seachDate":["2019-08-03","2019-08-02","2019-07-29","2019-08-04","2019-07-22","2019-07-28","2019-08-01","2019-08-31","2019-07-01","2019-07-31"]}');
        G.loadEnd();
        closeMiddleAll();
        var detailsTypeAry = [];
        $("#gameList li a").each(function () {
            detailsTypeAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        var beifen = "";
        if (json.beifenid == "1") {
            beifen = "<tr>";
            beifen += "<td class='w25 txt-right bc'>自动备份:</td>";
            beifen += "<td class='txt-left'>";
            beifen += "<a target='_blank' style='color:blue' href='/autobak.rar'>自动备份软件-点击下载</a>";
            beifen += "</td>";
            beifen += "</tr>";
        }
        var table = [
            "<div id='report-form'>",
            "<table class='middle-table reportForm'><thead><tr><th colspan='2'>报表查询</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>彩种类型:</td>",
            "<td class='txt-left'>",
            "<select name='detailsType'>",
            "<option value='-1' selected=''>全部</option>" + detailsTypeAry.join(""),
            "</select>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>选择日期:</td>",
            "<td class='txt-left'>",
            "<input type='text' class='text-input sw70' name='beforeDate' value='" + json.seachDate[0] + "' />&nbsp;—&nbsp<input type='text' class='text-input sw70' name='laterDate' value='" + json.seachDate[0] + "' />",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[0] + "' laterdate='" + json.seachDate[0] + "'>今天</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[1] + "' laterdate='" + json.seachDate[1] + "'>昨天</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[2] + "' laterdate='" + json.seachDate[3] + "'>本星期</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[4] + "' laterdate='" + json.seachDate[5] + "'>上星期</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[6] + "' laterdate='" + json.seachDate[7] + "'>本月</span></span>",
            "<span class='huise-btn re-btn'><span fin='' class='huise-btn' beforedate='" + json.seachDate[8] + "' laterdate='" + json.seachDate[9] + "'>上月</span></span>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>选择期数:</td>",
            "<td class='txt-left'><select name='timesNum'><option value='-1' selected=''>全部</option></select></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>查询账户:</td>",
            "<td class='txt-left'><input class='text-input sw70' name='searchname' type='text'></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>历史报表范围:</td>",
            "<td class='txt-left'><span>" + json.reportDate[0] + "</span> — <span>" + json.reportDate[1] + "</span></td>",
            "</tr>",
            "</tbody>",
            "</table>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding-top:10px;'><span class='text-btn' id='submit'>查 询</span>" +
            ((__sysinfo.level <= 1 && __sysinfo.reportdownid == 1) ?  "<span class='text-btn' id='down' style='display: none'>下 载</span>" : "") +
            "</td></tr></tfoot>",
            "</table>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $("#shell_title").html("报表查询");
        $("#report-form input[name='beforeDate']").datepicker();
        $("#report-form input[name='laterdate']").datepicker();

        if (json.generalId == 0) {
            $("#report-form #generalId").remove();
        } else if (json.generalId == 1) {
            $("#report-form #generalId").show();
        }
        $("#report-form span[fin='']").unbind("click").click(function () {
            var beforedate = $(this).attr("beforedate");
            var laterdate = $(this).attr("laterdate");
            $("#report-form input[name='beforeDate']").val(beforedate);
            $("#report-form input[name='laterDate']").val(laterdate);
        });

        if (__sysinfo.level == 1) $("#down").attr("style","");

        $("#report-form select[name='detailsType']").unbind("change").change(function () {
            var gameIndex = $(this).val();
            if (gameIndex == -1) {
                $("#report-form select[name='timesNum'] option").remove();
                $("#report-form select[name='timesNum']").append("<option value='-1'>全部</option>");
            } else {
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&gameIndex=" + gameIndex, function (json) {
                    $("#report-form select[name='timesNum'] option").remove();
                    $("#report-form select[name='timesNum']").append("<option value='-1'>全部</option>");
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            $("#report-form select[name='timesNum']").append("<option value='" + json[i] + "'>" + json[i] + "期</option>");
                        }
                    }
                });
            }
        });
        $("#report-form #submit").click(function () {
            var detailsType = $("#report-form select[name='detailsType']").val();
            var beforeDate = $("#report-form input[name='beforeDate']").val();
            var laterDate = $("#report-form input[name='laterDate']").val();
            var searchname = $("#report-form input[name='searchname']").val();
            var timesNum = $("#report-form select[name='timesNum']").val();
            var type = $("#report-form input[name='type']:checked").val();
            var settlement = $("#report-form input[name='settlement']:checked").val();
            var settGeneralID = $("#report-form input[name='GeneralID']:checked").val() || 0;
            if (detailsType != "" && beforeDate != "") {
                var hrefAry = [];
                hrefAry.push("detailsType=" + detailsType);
                hrefAry.push("beforeDate=" + beforeDate);
                hrefAry.push("laterDate=" + laterDate);
                hrefAry.push("timesNum=" + timesNum);
                hrefAry.push("type=" + type);
                hrefAry.push("settlement=" + settlement);
                hrefAry.push("settGeneralID=" + settGeneralID);
                hrefAry.push("searchname="+searchname);
                G.mask();
                middleBind({ data_action: "reportlist&" + hrefAry.join("&") });
            }
        });
        $("#report-form #down").click(function () {
            var detailsType = $("#report-form select[name='detailsType']").val();
            var beforeDate = $("#report-form input[name='beforeDate']").val();
            var laterDate = $("#report-form input[name='laterDate']").val();
            if (detailsType != "" && beforeDate != "") {
                var hrefAry = [];
                hrefAry.push("detailsType=" + detailsType);
                hrefAry.push("beforeDate=" + beforeDate);
                hrefAry.push("laterDate=" + laterDate);

                window.location.href = "repotdown?" + hrefAry.join("&") + "&t=" + __sysinfo.autoTid;
            }
        });

    // }, function () { G.rollBack(); });
}

//报表列表
function reportlist(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"data_detailsType":"全部","data_date":"日期范围:2019-08-03~2019-08-03","data_type":"总账","data_role":"总代理","data_yishourole":"代理","data_name":"总代理ttt168","list":[["","合计:","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0"]],"allCount":["0.0","0.0","0.0","0.0"]}');
        G.maskClose();
        G.loadEnd();
        var table = [
            "<div id='report-list'>",
            "<table class='middle-table'>",
            "<thead>",
            "<tr>",
            "<th>" + json.data_yishourole + "</th>",
            "<th><b class='both' title='排序' data-sort='2'></b>笔数</th>",
            "<th>有效金额</th>",
            "<th><b class='both' title='排序' data-sort='4'></b>输贏结果</th>",
            "<th>退水后结果</th>",

            "<th><b class='both' title='排序' data-sort='5'></b>应收下线</th>",
            "<th>占成%</th>",
            "<th>实占注额</th>",
            "<th>占貨比</th>",
            "<th>实占输贏</th>",
            "<th>实占退水</th>",
            "<th>实占结果</th>",
            "<th>賺取退水</th>",
            "<th><b class='both' title='排序' data-sort='13'></b>" + json.data_role + "结果</th>",
            "<th class='my-ea'>贡献上级</th>",
            "<th class='my-ea'>应付上级</th>",
            "</tr>",
            "</thead>",
            "<tbody id='list'>",
            "</tbody>",
            "<tr class='foot bcg' id='listCount'><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td class='my-ea'>-</td><td class='my-ea'>-</td></tr>",
            "</table>",
            // "<div style='width:750px;height:26px;line-height:26px; font-weight:700; text-align:center; margin:0 auto'>",
            // "<span>占成结果：<span class='red'>" + json.allCount[0] + "</span></span>&nbsp;&nbsp;&nbsp;&nbsp;",
            // "<span>賺取退水：<span>" + json.allCount[1] + "</span></span>&nbsp;&nbsp;&nbsp;&nbsp;",
            // "<span>抵扣補貨及賺水后结果：<span class='blue'>" + json.allCount[2] + "</span></span>&nbsp;&nbsp;&nbsp;&nbsp;",
            // "<span class='my-ea'>应付上级：<span class='green'>" + json.allCount[3] + "</span></span>",
            // "</div>",
            "<div id='buhuoList' style='margin-top:10px;'>",
            "<div class='clear'></div>",
            "<table class='middle-table' style='width:550px;margin:0 auto'>",
            "<thead>",
            "<tr>",
            "<th>笔数</th>",
            "<th>補貨金额</th>",
            "<th>補貨输贏</th>",
            "<th>退水</th>",
            "<th>退水后结果</th>",
            "</tr>",
            "</thead>",
            "<tbody>",
            "</tbody>",
            "</table>",
            "</div>",
            "</div>"
        ];
        var content = table.join("");
        $("#load-middle").html(content).show();
        $(".shell-title-icon").css("width", "50%");
        $("#shell_title").html("[<span class='green'>" + json.data_detailsType + "</span>] <span>" + json.data_date + "</span> <span class='blue'>" + json.data_type + ": </span>-&gt; " + json.data_name);
        var jsonCount;
        if (json.list && json.list.length > 0) {
            jsonCount = json.list.pop();
            json.list.sort(function (x, y) {
                return x[0] - y[0];
            });
        }

        var ary = [], up;
        //注单列表
        myappend();
        function myappend() {
            if (json.list && json.list.length > 0) {
                var txt_right, uc, bc, ea;
                ary = [];
                for (var i = 0; i < json.list.length; i++) {
                    ary.push("<tr>");
                    for (var n = 1; n < json.list[i].length; n++) {
                        uc = n == 1 ? "data-uc=''" : "";
                        up = n == 3 ? "data-up=''" : "";
                        bc = n == 5 || n == 13 ? "bc bold" : "";
                        ea = n == 14 || n == 15 ? "my-ea" : "";
                        ea = n == 14 && json.list[i][n] < 0 ? "my-ea red" : "my-ea";
                        txt_right = n == 1 && i < json.list.length ? "txt-left" : n == 2 ? "" : "txt-right";
                        ary.push("<td class='" + ea + " " + bc + " " + txt_right + "' " + uc + " " + up + ">" + json.list[i][n] + "</td>");
                    }
                    ary.push("</tr>");
                }

                var aryCount = [];
                for (var i = 1; i < jsonCount.length; i++) {
                    ea = i == 14 || i == 15 ? "my-ea" : "";
                    txt_right = i != 2 ? "txt-right" : "";
                    aryCount.push("<td class='" + ea + " " + txt_right + "'>" + jsonCount[i] + "</td>");
                }
                $("#report-list #listCount").html(aryCount.join(""));
            } else {
                ary = ["<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td class='my-ea'>-</td><td class='my-ea'>-</td></tr>"];
            }

            $("#report-list #list").html(ary.join(""));
            if (json.data_role == "\u7e3d\u516c\u53f8" || json.data_role == "\u7e3d\u76e3") {
                $("#report-list .my-ea").remove();
            }

            //补货单
            if (json.buList && json.buList.length > 0) {
                ary = [];
                ary.push("<tr>");
                for (var i = 0; i < json.buList.length; i++) {
                    up = i == 1 ? "data-up=''" : "";
                    ary.push("<td " + up + ">" + json.buList[i] + "</td>");
                }
                ary.push("</tr>");
                $("#report-list #buhuoList tbody").html(ary.join(""));
            } else {
                $("#report-list #buhuoList").remove();
            }
            myevent();
        }

        function myevent() {
            G.mouseover("#report-list tbody tr", "myqhs");
            $("#report-list tbody tr").unbind("click").click(function () {
                if (!$(this).hasClass("bc")) {
                    $(this).addClass("bc");
                } else {
                    $(this).removeClass("bc");
                }
            });
            //排序
            $("#report-list thead b.both").unbind("click").click(function () {
                var data_sort = $(this).attr("data-sort"), data_both;
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
            //下级查询
            $("#report-list #list td[data-uc=''] a").unbind("click").click(function () {
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "setUserName", val: $(this).attr("data-name"), pad: true });
                mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
                middleBind({ data_action: mydata_action });
            });
            //查询明细
            $("#report-list tbody td[data-up=''] a").unbind("click").click(function () {
                S.backList.unshift(msg.data_action); //保存前導頁的地址
                var mydata_action = msg.data_action.replace("reportlist", "reportdata") + "&md=0&vtype=" + $(this).attr("data-type");
                mydata_action = G.urlReplace({ url: "?" + mydata_action, paramName: "setUserName", val: $(this).attr("data-name"), pad: true });
                mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
                middleBind({ data_action: mydata_action });
            });
        }

    // }, function () {
    //     G.maskClose();
    //     G.rollBack();
    // });
}

//报表明细
function reportdata(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var title, thead, last, table = [];
        var md = G.query("md", "?" + msg.data_action);
        var beforeDate = G.query("beforeDate", "?" + msg.data_action);
        var laterDate = G.query("laterDate", "?" + msg.data_action); //FormatDetailsType
        if (md == 0) {
            last = 3;
            title = "[<span class='green'>报表明细</span>] 日期范围:" + beforeDate + "~" + laterDate;
            thead = ["日期", "总笔", "有效注额", "输贏结果", "退水", "实際结果"];
        } else if (md == 1) {
            last = 3;
            title = "[<span class='green'>报表明细</span>] 日期:" + beforeDate;
            thead = ["彩种", "总笔", "有效注额", "输贏结果", "退水", "实際结果"];
        }else if (md == 2){
            last = 3;
            title = "[<span class='green'>报表明细</span>] 日期:" + beforeDate;
            thead = ["期数", "总笔", "有效注额", "输贏结果", "退水", "实際结果"];
        } else if (md == 3) {
            last = 0;
            title = "[<span class='green'>报表明细</span>] 日期:" + beforeDate + " <span class='blue'>彩种:</span>" + FormatDetailsType(parseInt(G.query("detailsType", "?" + msg.data_action)));
            thead = ["注单号/时间", "下注账号", "彩种/期数", "玩法明细", "赔率", "下注金额", "输贏结果", "代理"];
            var mylevelAry = [];
            if (__sysinfo.level == 0 || __sysinfo.level == 1) {
                mylevelAry = ["总代理", "股东", "分公司", "总监"];
            } else if (__sysinfo.level == 2) {
                mylevelAry = ["总代理", "股东", "分公司"];
            } else if (__sysinfo.level == 3) {
                mylevelAry = ["总代理", "股东"];
            } else if (__sysinfo.level == 4) {
                mylevelAry = ["总代理"];
            }
            mylevelAry.push("您的结果");
            thead = thead.concat(mylevelAry);
            //绑定分页
            pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
                middleBind({ data_action: myPage });
            });
        }

        if (json.list && json.list.length > 0) {
            var myCount = [0, 0, 0, 0, 0], cursor, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                if (md == 3) {
                    cursor = i % 2 != 0 ? "class='bc'" : "";
                } else {
                    cursor = "class='cursor' data-date='" + json.list[i][6] + "' data-md='" + json.list[i][7] + "' data-gameIndex='" + json.list[i][8] + "'";
                }
                table.push("<tr " + cursor + ">");
                for (var n = 0; n < json.list[i].length - last; n++) {
                    if (json.list[i][n] != "--" && json.list[i][n] != "-") {
                        if (n > 0 && md != 3) {
                            myCount[n - 1] += parseFloat(json.list[i][n]);
                        } else if (n == 5 && md == 3) {
                            myCount[0] += parseFloat(json.list[i][n]);
                        } else if (n == 6 && md == 3) {
                            myCount[1] += parseFloat(json.list[i][n]);
                        } else if (n == json.list[i].length - 1 && md == 3) {
                            myCount[2] += parseFloat(json.list[i][n]);
                        }
                    }
                    txt_right = md == 3 && n >= 5 ? "txt-right" : md == 3 ? "" : "txt-right w15";
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }
                table.push("</tr>");
            }
            if (md != 3){
                table.push("<tr class='foot bcg'><td class='txt-right'>本頁合計:</td><td class='txt-right'>" + myCount[0] + "</td><td class='txt-right'>" + myCount[1] + "</td><td class='txt-right'>" + G.toDecimal(myCount[2], 1) + "</td><td class='txt-right'>" + G.toDecimal(myCount[3], 2) + "</td><td class='txt-right'>" + G.toDecimal(myCount[4], 1) + "</td></tr>");
            }
        }

        //绑定数据
        $("#load-middle").html(forceMiddle({ id: "report-data", title: title, thead: thead, tbody: table })).show();
        $(".shell-title-icon").css("width", "50%");
        G.mouseover("#report-data tbody tr", "myqhs");

        //彩种明细
        $("#report-data tbody tr.cursor").unbind("click").click(function () {
            S.backList.unshift(msg.data_action); //保存前導頁的地址
            var mydate = $(this).attr("data-date");
            var data_md = $(this).attr("data-md");
            var data_gameIndex = $(this).attr("data-gameIndex");
            var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "beforeDate", val: mydate, pad: true });
            if (data_gameIndex && G.NumberSign(data_gameIndex)) {
                mydata_action = G.urlReplace({ url: mydata_action, paramName: "detailsType", val: data_gameIndex, pad: true });
            }
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "laterDate", val: mydate, pad: true });
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "md", val: data_md, pad: true }).replace("?", "");
            middleBind({ data_action: mydata_action });
        });

    }, function () {
        G.rollBack();
    });
}

//期报表
function issueform(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"levelname":"期数","list":[],"heji":[0,"0.0","0.0","0.0","0.0<br>0.0","0.0<br>0.0"]}');
        G.loadEnd();
        closeMiddleAll();
        var title = "期报表";
        var thead = [json.levelname,"笔数", "下注金额", "输贏结果(不含回水)", "会员回水"];
        if (__sysinfo.level == 1){
            thead.push("代理");thead.push("总代理");thead.push("股东");thead.push("分公司");thead.push("总监");
        }else if (__sysinfo.level == 2){
            thead.push("代理");thead.push("总代理");thead.push("股东");thead.push("分公司");
        }if (__sysinfo.level == 3){
            thead.push("代理");thead.push("总代理");thead.push("股东");
        }if (__sysinfo.level == 4){
            thead.push("代理");thead.push("总代理");
        }if (__sysinfo.level == 5){
            thead.push("代理");
        }

        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");
        var titleNav = titleNavAry.join("") + "&nbsp;&nbsp;<label><a href='javascript:void(0);' name='refresh'>刷新</a></label>";

        var table = [];
        var bc;
        if (json.list){

            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    var uc = n == 0 ? "data-uc=''" : "";
                    var data = json.list[i][n];
                    var ea = n == 3 &&  data < 0? "red" : "";

                    table.push("<td "+uc+"><div class='txt-left " + ea +"'>" + data + "</div></td>");
                }
                table.push("</tr>");
            }
        }

        if (json.heji && json.heji.length > 0){
            bc = bc == "bc" ? "" : "bc";
            table.push("<tr class='" + bc + "'>");
            table.push("<td>合计</td>");
            for (var n = 0; n < json.heji.length; n++) {
                table.push("<td style='color: red' class='txt-left'>" + json.heji[n] + "</td>");
            }

            table.push("</tr>");
        }

        $("#load-middle").html(forceMiddle({ id: "issueform", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定默认选中值=彩种
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }

        //select选中获取数据
        $("#title-nav select").unbind("change").change(function () {
            fromMesgAction();
        });

        //下级查询
        $("#issueform td[data-uc=''] a.dl").unbind("click").click(function () {
            S.backList.unshift(msg.data_action); //保存前導頁的地址
            var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "issue", val: $(this).attr("data-issue"), pad: true });
            if(G.StringSign($(this).attr("data-name"))) mydata_action = G.urlReplace({ url: mydata_action, paramName: "username", val: $(this).attr("data-name"), pad: true });
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
            middleBind({ data_action: mydata_action });
        });

        //下级查询
        $("#issueform td a.hy").unbind("click").click(function () {
            S.backList.unshift(msg.data_action); //保存前導頁的地址
            msg.data_action = "frommesg";
            var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "timesNum", val: $(this).attr("data-issue"), pad: true });
            mydata_action = G.urlReplace({ url:  mydata_action, paramName: "gameIndex", val: $(this).attr("data-gameIndex"), pad: true });
            mydata_action = G.urlReplace({ url:  mydata_action, paramName: "beforeDate", val: $(this).attr("beforeDate"), pad: true });

            if(G.StringSign($(this).attr("data-name"))) mydata_action = G.urlReplace({ url: mydata_action, paramName: "searchname", val: $(this).attr("data-name"), pad: true });
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
            middleBind({ data_action: mydata_action });
        });

        $("#issueform tbody td a[data-auto='1']").unbind("click").click(function () {
            var data_stop = true;
            var data_auto = $(this).attr("data-auto");
            var issue = $(this).parents("tr").find("td:eq(0) a").html();

            var content = " 您确定取消期号:"+issue+" 吗？";
            G.alert({content: content,ok:function () {
                    if (data_stop) {
                        data_stop = false;
                        G.mask();
                        if (S.request) {
                            S.request.abort();
                        }
                        S.request = G.ajax(msg.data_action + "&issue=" + issue + "&op=" + data_auto, function (json) {
                            G.maskClose();
                            if (json.result == 1){
                                G.alert({
                                    content: "取消期号:" + issue + "成功。",
                                    ok: function () { return true; },
                                    close: function () { middleBind({ data_action: msg.data_action }); }
                                });
                            }else {
                                G.alert({content: json.result});
                            }
                        }, function () {
                            G.maskClose();
                        });
                    }
                }
            });
        });

        //刷新数据
        $("#title-nav a[name='refresh']").unbind("click").click(function () {
            fromMesgAction();
        });

        function fromMesgAction() {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        }
    // },function () {
    //     G.rollBack();
    // });
}

//期分类表
function issueclass(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"issueAry":[20190803033,20190803032,20190803031,20190803030,20190803029,20190803028,20190803027,20190803026,20190803025,20190803024,20190803023,20190803022,20190803021,20190803020,20190803019,20190803018,20190803017,20190803016,20190803015,20190803014,20190803013,20190803012,20190803011,20190803010,20190803009,20190803008,20190803007,20190803006,20190803005,20190803004,20190803003,20190803002,20190803001,20190802288,20190802287,20190802286,20190802285,20190802284,20190802283,20190802282,20190802281,20190802280,20190802279,20190802278,20190802277,20190802276,20190802275,20190802274,20190802273,20190802272,20190802271,20190802270,20190802269,20190802268,20190802267,20190802266,20190802265,20190802264,20190802263,20190802262,20190802261,20190802260,20190802259,20190802258,20190802257,20190802256,20190802255,20190802254,20190802253,20190802252,20190802251,20190802250,20190802249,20190802248,20190802247,20190802246,20190802245,20190802244,20190802243,20190802242,20190802241,20190802240,20190802239,20190802238,20190802237,20190802236,20190802235,20190802234,20190802233,20190802232,20190802231,20190802230,20190802229,20190802228,20190802227,20190802226,20190802225,20190802224,20190802223,20190802222,20190802221,20190802220,20190802219,20190802218,20190802217,20190802216,20190802215,20190802214,20190802213,20190802212,20190802211,20190802210,20190802209,20190802208,20190802207,20190802206,20190802205,20190802204,20190802203,20190802202,20190802201,20190802200,20190802199,20190802198,20190802197,20190802196,20190802195,20190802194,20190802193,20190802192,20190802191,20190802190,20190802189,20190802188,20190802187,20190802186,20190802185,20190802184,20190802183,20190802182,20190802181,20190802180,20190802179,20190802178,20190802177,20190802176,20190802175,20190802174,20190802173,20190802172,20190802171,20190802170,20190802169,20190802168,20190802167,20190802166,20190802165,20190802164,20190802163,20190802162,20190802161,20190802160,20190802159,20190802158,20190802157,20190802156,20190802155,20190802154,20190802153,20190802152,20190802151,20190802150,20190802149,20190802148,20190802147,20190802146,20190802145,20190802144,20190802143,20190802142,20190802141,20190802140,20190802139,20190802138,20190802137,20190802136,20190802135,20190802134,20190802133,20190802132,20190802131,20190802130,20190802129,20190802128,20190802127,20190802126,20190802125,20190802124,20190802123,20190802122,20190802121,20190802120,20190802119,20190802118,20190802117,20190802116,20190802115,20190802114,20190802113,20190802112,20190802111,20190802110,20190802109,20190802108,20190802107,20190802106,20190802105,20190802104,20190802103,20190802102,20190802101,20190802100,20190802099,20190802098,20190802097,20190802096,20190802095,20190802094,20190802093,20190802092,20190802091,20190802090,20190802089,20190802088,20190802087,20190802086,20190802085,20190802084,20190802083,20190802082,20190802081,20190802080,20190802079,20190802078,20190802077,20190802076,20190802075,20190802074,20190802073,20190802072,20190802071,20190802070,20190802069,20190802068,20190802067,20190802066,20190802065,20190802064,20190802063,20190802062,20190802061,20190802060,20190802059,20190802058,20190802057,20190802056,20190802055,20190802054,20190802053,20190802052,20190802051,20190802050,20190802049,20190802048,20190802047,20190802046,20190802045,20190802044,20190802043,20190802042,20190802041,20190802040,20190802039,20190802038,20190802037,20190802036,20190802035,20190802034,20190802033,20190802032,20190802031,20190802030,20190802029,20190802028,20190802027,20190802026,20190802025,20190802024,20190802023,20190802022,20190802021,20190802020,20190802019,20190802018,20190802017,20190802016,20190802015,20190802014,20190802013,20190802012,20190802011,20190802010,20190802009,20190802008,20190802007,20190802006,20190802005,20190802004,20190802003,20190802002,20190802001],"list":[{"username":"ttt168","zh":true,"childarr":[["第一球","--","--","--","--","--","--"],["第二球","--","--","--","--","--","--"],["第三球","--","--","--","--","--","--"],["第四球","--","--","--","--","--","--"],["第五球","--","--","--","--","--","--"],["万千XXX","--","--","--","--","--","--"],["万X百XX","--","--","--","--","--","--"],["万XX十X","--","--","--","--","--","--"],["万XXX个","--","--","--","--","--","--"],["X千百XX","--","--","--","--","--","--"],["X千X十X","--","--","--","--","--","--"],["X千XX个","--","--","--","--","--","--"],["XX百十X","--","--","--","--","--","--"],["XX百X个","--","--","--","--","--","--"],["XXX十个","--","--","--","--","--","--"],["万千百XX","--","--","--","--","--","--"],["万千X十X","--","--","--","--","--","--"],["万千XX个","--","--","--","--","--","--"],["万X百十X","--","--","--","--","--","--"],["万X百X个","--","--","--","--","--","--"],["万XX十个","--","--","--","--","--","--"],["X千百十X","--","--","--","--","--","--"],["X千百X个","--","--","--","--","--","--"],["X千X十个","--","--","--","--","--","--"],["XX百十个","--","--","--","--","--","--"],["万千百十X","--","--","--","--","--","--"],["万千百X个","--","--","--","--","--","--"],["万千X十个","--","--","--","--","--","--"],["万X百十个","--","--","--","--","--","--"],["X千百十个","--","--","--","--","--","--"]],"hjarr":[0.0,0.0,"--","--","--","--"],"caarr":[["一字定",0.0,0.0,"--","--","--","--"],["二字定",0.0,0.0,"--","--","--","--"],["三字定",0.0,0.0,"--","--","--","--"],["四字定",0.0,0.0,"--","--","--","--"]]},{"username":"ttt168","zh":false,"childarr":[["第一球","--","--","--","--","--","--"],["第二球","--","--","--","--","--","--"],["第三球","--","--","--","--","--","--"],["第四球","--","--","--","--","--","--"],["第五球","--","--","--","--","--","--"],["万千XXX","--","--","--","--","--","--"],["万X百XX","--","--","--","--","--","--"],["万XX十X","--","--","--","--","--","--"],["万XXX个","--","--","--","--","--","--"],["X千百XX","--","--","--","--","--","--"],["X千X十X","--","--","--","--","--","--"],["X千XX个","--","--","--","--","--","--"],["XX百十X","--","--","--","--","--","--"],["XX百X个","--","--","--","--","--","--"],["XXX十个","--","--","--","--","--","--"],["万千百XX","--","--","--","--","--","--"],["万千X十X","--","--","--","--","--","--"],["万千XX个","--","--","--","--","--","--"],["万X百十X","--","--","--","--","--","--"],["万X百X个","--","--","--","--","--","--"],["万XX十个","--","--","--","--","--","--"],["X千百十X","--","--","--","--","--","--"],["X千百X个","--","--","--","--","--","--"],["X千X十个","--","--","--","--","--","--"],["XX百十个","--","--","--","--","--","--"],["万千百十X","--","--","--","--","--","--"],["万千百X个","--","--","--","--","--","--"],["万千X十个","--","--","--","--","--","--"],["万X百十个","--","--","--","--","--","--"],["X千百十个","--","--","--","--","--","--"]],"hjarr":[0.0,0.0,"--","--","--","--"],"caarr":[["一字定",0.0,0.0,"--","--","--","--"],["二字定",0.0,0.0,"--","--","--","--"],["三字定",0.0,0.0,"--","--","--","--"],["四字定",0.0,0.0,"--","--","--","--"]]}],"level":4}');
        G.loadEnd();
        closeMiddleAll();
        var title = "期分类表";
        var levelNames = ["总监","公司","股东","总代理","代理","会员"];

        var thead = [levelNames[json.level - 1],"类别","笔数", "下注金额", "下级回水","自己回水", "中奖","盈亏"];


        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");
        var titleNav = titleNavAry.join("") + "<select name='issue'></select>&nbsp;&nbsp;<label><a href='javascript:void(0);' name='refresh'>刷新</a></label>";
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        var table = [];
        var bc;
        if (json.list){


            for (var i = 0; i < json.list.length; i++) {

                var vo = json.list[i];
                table.push("<tr class='tdwhite'>");
                table.push("<td width='16%'><div style='text-align:left;'>" + vo.username + "</div></td>");
                table.push("<td class='fff' open width='12%'><div style='text-align:left;'><a href='javascript:void(0)' class='blue' name='"+vo.username + i+"'>" + (vo.zh ? "总货合计":"实货合计") + "</a></div></td>");

                for (var n = 0; n < vo.hjarr.length; n++){
                    table.push("<td class='fff' width='12%'><div style='text-align:left;'>" + vo.hjarr[n] + "</div></td>");
                }
                table.push("</tr>");

                table.push("<tr class='hiden' data-name='"+vo.username + i+"'><td colspan='8'>");
                table.push("<table class='middle-table'><tbody>");

                for (var n = 0; n < vo.childarr.length;n++){
                    if (vo.caarr){
                        var caarr;
                        if (n == 0) caarr = vo.caarr[0];
                        if (n == 5) caarr = vo.caarr[1];
                        if (n == 15) caarr = vo.caarr[2];
                        if (n == 25) caarr = vo.caarr[3];

                        if (caarr) {
                            table.push("<tr class='tdwhite'>");
                            table.push("<td class='fff' width='16%'></td>");
                            for (var n1 = 0; n1 < caarr.length; n1++) {
                                table.push("<td class='fff' width='12%'><div class='txt-left' >" + caarr[n1] + "</div></td>");
                            }
                            table.push("</tr>");
                            caarr = null;
                        }

                    }

                    table.push("<tr class='myqhs'>");
                    table.push("<td class='fff' width='16%'><div class='fff'></div></td>");
                    for (var n2 = 0; n2 < vo.childarr[n].length; n2++){
                        table.push("<td class='qhs' width='12%'><div class='txt-left' >" + vo.childarr[n][n2] + "</div></td>");
                    }
                    table.push("</tr>");
                }
                table.push("</tbody></table>");
                table.push("</td></tr>");

            }
        }


        $("#load-middle").html(forceMiddle({ id: "issueclass", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        var issueAry = [];
        for (var i = 0; i < json.issueAry.length;i++){
            issueAry.push("<option value='"+json.issueAry[i]+"'>"+json.issueAry[i]+"</option>");
        }
        $("#title-nav select[name='issue']").html(issueAry.join(""));


        //绑定默认选中值=彩种
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }
        //绑定默认选中值=状态
        var issue = G.query("issue", "?" + msg.data_action);
        if (issue) {
            $("#title-nav select[name='issue']").val(issue);
        }

        //select选中获取数据
        $("#title-nav select").unbind("change").change(function () {
            fromMesgAction();
        });
        $("#issueclass td[open=''] a").unbind("click").click(function () {

            var name = $(this).attr("name");
            var obj = $("#issueclass").find("tr[data-name='"+name+"']");
            if (obj.hasClass("hiden")) obj.removeClass("hiden");
            else obj.addClass("hiden");
        });

        //下级查询
        $("#issueclass td[data-uc=''] a").unbind("click").click(function () {
            S.backList.unshift(msg.data_action); //保存前導頁的地址
            var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "issue", val: $(this).attr("data-issue"), pad: true });
            if(G.StringSign($(this).attr("data-name"))) mydata_action = G.urlReplace({ url: mydata_action, paramName: "username", val: $(this).attr("data-name"), pad: true });
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
            middleBind({ data_action: mydata_action });
        });

        //刷新数据
        $("#title-nav a[name='refresh']").unbind("click").click(function () {
            fromMesgAction();
        });

        function fromMesgAction() {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var issue = $("#title-nav select[name='issue']").val();
            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "issue", val: issue, pad: true });
            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        }
    // },function () {
    //     G.rollBack();
    // });
}

//日分类表
function dayclass(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"issueAry":[20190803033,20190803032,20190803031,20190803030,20190803029,20190803028,20190803027,20190803026,20190803025,20190803024,20190803023,20190803022,20190803021,20190803020,20190803019,20190803018,20190803017,20190803016,20190803015,20190803014,20190803013,20190803012,20190803011,20190803010,20190803009,20190803008,20190803007,20190803006,20190803005,20190803004,20190803003,20190803002,20190803001,20190802288,20190802287,20190802286,20190802285,20190802284,20190802283,20190802282,20190802281,20190802280,20190802279,20190802278,20190802277,20190802276,20190802275,20190802274,20190802273,20190802272,20190802271,20190802270,20190802269,20190802268,20190802267,20190802266,20190802265,20190802264,20190802263,20190802262,20190802261,20190802260,20190802259,20190802258,20190802257,20190802256,20190802255,20190802254,20190802253,20190802252,20190802251,20190802250,20190802249,20190802248,20190802247,20190802246,20190802245,20190802244,20190802243,20190802242,20190802241,20190802240,20190802239,20190802238,20190802237,20190802236,20190802235,20190802234,20190802233,20190802232,20190802231,20190802230,20190802229,20190802228,20190802227,20190802226,20190802225,20190802224,20190802223,20190802222,20190802221,20190802220,20190802219,20190802218,20190802217,20190802216,20190802215,20190802214,20190802213,20190802212,20190802211,20190802210,20190802209,20190802208,20190802207,20190802206,20190802205,20190802204,20190802203,20190802202,20190802201,20190802200,20190802199,20190802198,20190802197,20190802196,20190802195,20190802194,20190802193,20190802192,20190802191,20190802190,20190802189,20190802188,20190802187,20190802186,20190802185,20190802184,20190802183,20190802182,20190802181,20190802180,20190802179,20190802178,20190802177,20190802176,20190802175,20190802174,20190802173,20190802172,20190802171,20190802170,20190802169,20190802168,20190802167,20190802166,20190802165,20190802164,20190802163,20190802162,20190802161,20190802160,20190802159,20190802158,20190802157,20190802156,20190802155,20190802154,20190802153,20190802152,20190802151,20190802150,20190802149,20190802148,20190802147,20190802146,20190802145,20190802144,20190802143,20190802142,20190802141,20190802140,20190802139,20190802138,20190802137,20190802136,20190802135,20190802134,20190802133,20190802132,20190802131,20190802130,20190802129,20190802128,20190802127,20190802126,20190802125,20190802124,20190802123,20190802122,20190802121,20190802120,20190802119,20190802118,20190802117,20190802116,20190802115,20190802114,20190802113,20190802112,20190802111,20190802110,20190802109,20190802108,20190802107,20190802106,20190802105,20190802104,20190802103,20190802102,20190802101,20190802100,20190802099,20190802098,20190802097,20190802096,20190802095,20190802094,20190802093,20190802092,20190802091,20190802090,20190802089,20190802088,20190802087,20190802086,20190802085,20190802084,20190802083,20190802082,20190802081,20190802080,20190802079,20190802078,20190802077,20190802076,20190802075,20190802074,20190802073,20190802072,20190802071,20190802070,20190802069,20190802068,20190802067,20190802066,20190802065,20190802064,20190802063,20190802062,20190802061,20190802060,20190802059,20190802058,20190802057,20190802056,20190802055,20190802054,20190802053,20190802052,20190802051,20190802050,20190802049,20190802048,20190802047,20190802046,20190802045,20190802044,20190802043,20190802042,20190802041,20190802040,20190802039,20190802038,20190802037,20190802036,20190802035,20190802034,20190802033,20190802032,20190802031,20190802030,20190802029,20190802028,20190802027,20190802026,20190802025,20190802024,20190802023,20190802022,20190802021,20190802020,20190802019,20190802018,20190802017,20190802016,20190802015,20190802014,20190802013,20190802012,20190802011,20190802010,20190802009,20190802008,20190802007,20190802006,20190802005,20190802004,20190802003,20190802002,20190802001],"list":[{"username":"ttt168","zh":true,"childarr":[["第一球","--","--","--","--","--","--"],["第二球","--","--","--","--","--","--"],["第三球","--","--","--","--","--","--"],["第四球","--","--","--","--","--","--"],["第五球","--","--","--","--","--","--"],["万千XXX","--","--","--","--","--","--"],["万X百XX","--","--","--","--","--","--"],["万XX十X","--","--","--","--","--","--"],["万XXX个","--","--","--","--","--","--"],["X千百XX","--","--","--","--","--","--"],["X千X十X","--","--","--","--","--","--"],["X千XX个","--","--","--","--","--","--"],["XX百十X","--","--","--","--","--","--"],["XX百X个","--","--","--","--","--","--"],["XXX十个","--","--","--","--","--","--"],["万千百XX","--","--","--","--","--","--"],["万千X十X","--","--","--","--","--","--"],["万千XX个","--","--","--","--","--","--"],["万X百十X","--","--","--","--","--","--"],["万X百X个","--","--","--","--","--","--"],["万XX十个","--","--","--","--","--","--"],["X千百十X","--","--","--","--","--","--"],["X千百X个","--","--","--","--","--","--"],["X千X十个","--","--","--","--","--","--"],["XX百十个","--","--","--","--","--","--"],["万千百十X","--","--","--","--","--","--"],["万千百X个","--","--","--","--","--","--"],["万千X十个","--","--","--","--","--","--"],["万X百十个","--","--","--","--","--","--"],["X千百十个","--","--","--","--","--","--"]],"hjarr":[0.0,0.0,"--","--","--","--"],"caarr":[["一字定",0.0,0.0,"--","--","--","--"],["二字定",0.0,0.0,"--","--","--","--"],["三字定",0.0,0.0,"--","--","--","--"],["四字定",0.0,0.0,"--","--","--","--"]]},{"username":"ttt168","zh":false,"childarr":[["第一球","--","--","--","--","--","--"],["第二球","--","--","--","--","--","--"],["第三球","--","--","--","--","--","--"],["第四球","--","--","--","--","--","--"],["第五球","--","--","--","--","--","--"],["万千XXX","--","--","--","--","--","--"],["万X百XX","--","--","--","--","--","--"],["万XX十X","--","--","--","--","--","--"],["万XXX个","--","--","--","--","--","--"],["X千百XX","--","--","--","--","--","--"],["X千X十X","--","--","--","--","--","--"],["X千XX个","--","--","--","--","--","--"],["XX百十X","--","--","--","--","--","--"],["XX百X个","--","--","--","--","--","--"],["XXX十个","--","--","--","--","--","--"],["万千百XX","--","--","--","--","--","--"],["万千X十X","--","--","--","--","--","--"],["万千XX个","--","--","--","--","--","--"],["万X百十X","--","--","--","--","--","--"],["万X百X个","--","--","--","--","--","--"],["万XX十个","--","--","--","--","--","--"],["X千百十X","--","--","--","--","--","--"],["X千百X个","--","--","--","--","--","--"],["X千X十个","--","--","--","--","--","--"],["XX百十个","--","--","--","--","--","--"],["万千百十X","--","--","--","--","--","--"],["万千百X个","--","--","--","--","--","--"],["万千X十个","--","--","--","--","--","--"],["万X百十个","--","--","--","--","--","--"],["X千百十个","--","--","--","--","--","--"]],"hjarr":[0.0,0.0,"--","--","--","--"],"caarr":[["一字定",0.0,0.0,"--","--","--","--"],["二字定",0.0,0.0,"--","--","--","--"],["三字定",0.0,0.0,"--","--","--","--"],["四字定",0.0,0.0,"--","--","--","--"]]}],"level":4}');
        G.loadEnd();
        closeMiddleAll();
        var title = "日分类表";
        var levelNames = ["总监","公司","股东","总代理","代理","会员"];

        var thead = [levelNames[json.level - 1],"类别","笔数", "下注金额", "下级回水","自己回水", "中奖","盈亏"];


        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");
        var titleNav = titleNavAry.join("") + "&nbsp;&nbsp;<label><a href='javascript:void(0);' name='refresh'>刷新</a></label>";
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        var table = [];
        var bc;
        if (json.list){
            for (var i = 0; i < json.list.length; i++) {

                var vo = json.list[i];
                table.push("<tr class='tdwhite'>");
                table.push("<td width='16%'><div style='text-align:left;'>" + vo.username + "</div></td>");
                table.push("<td class='fff' open width='12%'><div style='text-align:left;'><a href='javascript:void(0)' class='blue' name='"+vo.username + i+"'>" + (vo.zh ? "总货合计":"实货合计") + "</a></div></td>");

                for (var n = 0; n < vo.hjarr.length; n++){
                    table.push("<td class='fff' width='12%'><div style='text-align:left;'>" + vo.hjarr[n] + "</div></td>");
                }
                table.push("</tr>");

                table.push("<tr class='hiden' data-name='"+vo.username + i+"'><td colspan='8'>");
                table.push("<table class='middle-table'><tbody>");

                for (var n = 0; n < vo.childarr.length;n++){
                    if (vo.caarr){
                        var caarr;
                        if (n == 0) caarr = vo.caarr[0];
                        if (n == 5) caarr = vo.caarr[1];
                        if (n == 15) caarr = vo.caarr[2];
                        if (n == 25) caarr = vo.caarr[3];

                        if (caarr) {
                            table.push("<tr class='tdwhite'>");
                            table.push("<td class='fff' width='16%'></td>");
                            for (var n1 = 0; n1 < caarr.length; n1++) {
                                table.push("<td class='fff' width='12%'><div class='txt-left' >" + caarr[n1] + "</div></td>");
                            }
                            table.push("</tr>");
                            caarr = null;
                        }

                    }

                    table.push("<tr class='myqhs'>");
                    table.push("<td class='fff' width='16%'><div class='fff'></div></td>");
                    for (var n2 = 0; n2 < vo.childarr[n].length; n2++){
                        table.push("<td class='qhs' width='12%'><div class='txt-left' >" + vo.childarr[n][n2] + "</div></td>");
                    }
                    table.push("</tr>");
                }
                table.push("</tbody></table>");
                table.push("</td></tr>");

            }
        }


        $("#load-middle").html(forceMiddle({ id: "dayclass", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");



        //绑定默认选中值=彩种
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }


        //select选中获取数据
        $("#title-nav select").unbind("change").change(function () {
            fromMesgAction();
        });
        $("#dayclass td[open=''] a").unbind("click").click(function () {

            var name = $(this).attr("name");
            var obj = $("#dayclass").find("tr[data-name='"+name+"']");
            if (obj.hasClass("hiden")) obj.removeClass("hiden");
            else obj.addClass("hiden");
        });

        //下级查询
        $("#dayclass td[data-uc=''] a").unbind("click").click(function () {
            S.backList.unshift(msg.data_action); //保存前導頁的地址
            var mydata_action = G.urlReplace({ url: "?" + msg.data_action, paramName: "issue", val: $(this).attr("data-issue"), pad: true });
            if(G.StringSign($(this).attr("data-name"))) mydata_action = G.urlReplace({ url: mydata_action, paramName: "username", val: $(this).attr("data-name"), pad: true });
            mydata_action = G.urlReplace({ url: mydata_action, paramName: "black", val: 1, pad: true }).replace("?", "");
            middleBind({ data_action: mydata_action });
        });


        //刷新数据
        $("#title-nav a[name='refresh']").unbind("click").click(function () {
            fromMesgAction();
        });

        function fromMesgAction() {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        }
    // },function () {
    //     G.rollBack();
    // });
}

//--------------后台管理-----------------

//全局设置
function parameter(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var title = "全局參数";
        var table = [
            "<div id='parameter'>",
            "<table class='middle-table'><thead><tr><th colspan='2'>全局參数</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>系统维护时间:</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<input type='text' class='text-input sw70' name='maintain' value='" + json.maintain + "' />&nbsp;&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='30' />30分钟</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='45' />45分钟</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='60' />60分钟</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='90' />90分钟</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='minute' value='180' />180分钟</label>",
            "</td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>(樂透HK)今年生肖:</td>",
            "<td class='txt-left txt-paddin-left'>",
            "<label class='label-box'><input type='radio' name='animals' value='1' />鼠</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='2' />牛</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='3' />虎</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='4' />兔</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='5' />龍</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='6' />蛇</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='7' />馬</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='8' />羊</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='9' />猴</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='10' />雞</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='11' />狗</label>&nbsp;",
            "<label class='label-box'><input type='radio' name='animals' value='12' />猪</label>",
            "</td>",
            "</tr>",
            "</tbody>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
            "</table>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();
        if (json.list && json.list.length > 0) {
            table = [];
            var ckOpen, ckClose, ckDefault;
            for (var i = 0; i < json.list.length; i++) {
                if (json.list[i][2] == 1) {
                    ckOpen = "checked='checked'";
                    ckClose = "";
                } else {
                    ckClose = "checked='checked'";
                    ckOpen = "";
                }
                ckDefault = json.list[i][3] == 1 ? "checked='checked'" : "";
                table.push("<tr data-gameIndex='" + json.list[i][0] + "'>");
                table.push("<td class='w30 bc txt-right'>" + json.list[i][1] + ":</td>");
                table.push("<td class='txt-left'>");
                table.push("<input type='text' class='text-input sw70' name='GameStartTime' value='" + json.list[i][4] + "' />&nbsp;—&nbsp;");
                table.push("<input type='text' class='text-input sw70' name='GameEndTime' value='" + json.list[i][5] + "' />&nbsp;&nbsp;");
                table.push("<label class='label-box'><input type='radio' name='GameClose-" + json.list[i][0] + "' " + ckClose + " value='0' />关闭</label>&nbsp;");
                table.push("<label class='label-box'><input type='radio' name='GameClose-" + json.list[i][0] + "' " + ckOpen + " value='1' />開启</label>&nbsp;");
                table.push("<label class='label-box'><input type='radio' name='GameDefault' " + ckDefault + " value='1' />默认</label>");
                table.push("</td>");
                table.push("</tr>");
            }
            $("#parameter tbody").append(table.join(""));
        }
        $("#parameter input[name='minute'][value='" + json.minute + "']").attr("checked", "checked");
        $("#parameter input[name='animals'][value='" + json.animals + "']").attr("checked", "checked");

        //保存数据
        $("#parameter #submit").unbind("click").click(function () {
            var obj = $("#parameter"), data_stop = true;
            var mydata = [], ary = [], index, time, time2, closer, defaultr;
            var maintain = obj.find("input[name='maintain']").val();
            var minute = obj.find("input[name='minute']:checked").val();
            var animals = obj.find("input[name='animals']:checked").val();
            mydata.push("maintain=" + maintain);
            mydata.push("minute=" + minute);
            mydata.push("animals=" + animals);
            obj.find("tbody tr").each(function () {
                if ($(this).attr("data-gameIndex")) {
                    index = $(this).attr("data-gameIndex");
                    time = $(this).find("input[name='GameStartTime']").val();
                    time2 = $(this).find("input[name='GameEndTime']").val();
                    closer = $(this).find("input[name='GameClose-" + index + "']:checked").val();
                    defaultr = $(this).find("input[name='GameDefault']:checked").val() || 0;
                    ary.push(index + "," + time + "," + closer + "," + defaultr + "," + time2);
                }
            });
            mydata.push("gameAll=" + ary.join("|"));
            if (mydata && mydata.length > 0 & data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&" + mydata.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });
            }

        });

    }, function () {
        G.rollBack();
    });
}


//全局设置
function delreport(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var title = "报表删除";
        var table = [
            "<div id='delreport'>",
            "<table class='middle-table'><thead><tr><th colspan='2'>报表删除</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>开始日期:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opStartDate' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>结束日期:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opEndDate' value=''></td>",
            "</tr>",
            "</tbody>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding-top:15px;'><span class='text-btn' id='submit'>确认删除</span></td></tr></tfoot>",
            "</table>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();

        if (json) {
            for (var i in json) {
                $("#delreport input[name='" + i + "']").val(json[i]);
            }
        }

        //保存数据
        $("#delreport #submit").unbind("click").click(function () {

            if (!confirm("确认要删除报表吗？")) {
                return;
            }

            var mydata = [];
            var obj = $("#delreport"), data_stop = true;
            var opStartDate = obj.find("input[name='opStartDate']").val();
            var opEndDate = obj.find("input[name='opEndDate']").val();
            mydata.push("opStartDate=" + opStartDate);
            mydata.push("opEndDate=" + opEndDate);
            if (mydata && mydata.length > 0 & data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&" + mydata.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });
            }

        });

    }, function () {
        G.rollBack();
    });
}

//全局开盘
function lottery(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
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

        var title = "全局开盘";
        var table = [
            "<div id='lottery'>",
            "<table class='middle-table'><thead><tr><th colspan='2'>" + $("#gameList li a[data-index='" + gameIndex + "']").html() + "</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td class='w25 txt-right bc'>开奖期数:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opNum'></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>开奖日期:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opDate' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>开奖时间:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw90' name='opTime' value=''></td>",
            "</tr>",
            "<tr>",
            "<td class='w25 txt-right bc'>連續開出:</td>",
            "<td class='txt-left txt-paddin-left'><input type='text' class='text-input sw30' name='opCount' value=''>&nbsp;期</td>",
            "</tr>",
            "</tbody>",
            "</table>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding:10px 0 10px 0;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table'><thead><tr><th>序号</th><th>开奖期数</th><th>开奖日期</th><th>开奖时间</th><th>状态</th><th>功能</th></tr></thead>",
            "<tbody id='list'>",
            "</tbody>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();

        table = [];
        if (json) {
            var w;
            for (var i in json) {
                $("#lottery input[name='" + i + "']").val(json[i]);
                if (i == "list") {
                    for (var n = 0; n < json[i].length; n++) {
                        table.push("<tr data-id='" + json[i][n][0] + "'>");
                        for (var m = 0; m < json[i][n].length; m++) {
                            w = m == 0 ? "w10" : "w15";
                            table.push("<td class='" + w + "'>" + json[i][n][m] + "</td>");
                        }
                        table.push("<td class='w10'><a href='javascript:void(0)' data-number='" + json[i][n][1] + "'>设置开盘</a> / <a href='javascript:void(0)' data-id='" + json[i][n][0] + "'>修改开盘</a></td>");
                        table.push("<tr>");
                    }
                }
            }
        }
        $("#lottery #list").html(table.join(""));
        G.mouseover("#lottery #list tr");


        var obj = $("#lottery");
        obj.find("#list a").unbind("click").click(function () {
            var data_stop = true;
            var data_opNum = $(this).attr("data-number");
            var data_id = $(this).attr("data-id");
            if (data_opNum && data_stop) { //设置开盘
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&data=1&opNum=" + data_opNum, function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。",
                            ok: function () {
                                return true;
                            },
                            close: function () {
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });

            } else if (data_id) { //修改
                obj.find("input[name='opCount']").addClass("bold").val("0");
                obj.find("tbody tr[data-id='" + data_id + "'] td").each(function (i) {
                    if (i == 1) {
                        obj.find("input[name='opNum']").addClass("bold").val($(this).html());
                    } else if (i == 2) {
                        obj.find("input[name='opDate']").addClass("bold").val($(this).html());
                    } else if (i == 3) {
                        obj.find("input[name='opTime']").addClass("bold").val($(this).html());
                    }
                });
                setTimeout(function () { obj.find("input").removeClass("bold"); }, 700);
            }
        });

        obj.find("tbody input[type='text']").keydown(function (e) {
            var curKey = e.which;
            if (curKey == 13) {
                obj.find("#submit").click();
                return false;
            }
        });
        obj.find("#submit").unbind("click").click(function () {
            var data_stop = true;
            var opNum = obj.find("input[name='opNum']").val();
            var opDate = obj.find("input[name='opDate']").val() + " " + obj.find("input[name='opTime']").val();
            var opCount = obj.find("input[name='opCount']").val();
            if (!G.NumberSign(opNum)) {
                G.alert({ content: "开盘期数有误！", ok: function () { return true; } });
            } else if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&data=2&opNum=" + opNum + "&opDate=" + opDate + "&opCount=" + opCount, function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。",
                            ok: function () {
                                return true;
                            },
                            close: function () {
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { maskClose(); data_stop = true; });
            }
        });


    }, function () {
        G.rollBack();
    });
}

//全局开奖
function opnum(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
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

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        var txtInput, colspan;
        switch (gameIndex) {
            case 1:
            case 13: colspan = 7;
                txtInput = addInput(7);
                break;
            case 2:
            case 7: colspan = 8;
                txtInput = addInput(8);
                break;
            case 3:
            case 10: colspan = 5;
                txtInput = addInput(5);
                break;
            case 14:
            case 4:
            case 8: colspan = 10;
                txtInput = addInput(10);
                break;
            case 5: colspan = 3;
                txtInput = addInput(3);
                break;
            case 6: colspan = 20;
                txtInput = addInput(20);
                break;
        }

        var title = "全局开奖";
        var table = [
            "<div id='open-num'>",
            "<table class='middle-table'><thead><tr><th>开奖期数</th><th>开奖日期</th><th colspan='" + colspan + "'>开奖号码</th></tr></thead>",
            "<tbody>",
            "<tr>",
            "<td><input type='text' name='opNum' class='text-input sw90' /></td>",
            "<td><input type='text' name='opDate' class='text-input sw120' /></td>",
            "" + txtInput + "",
            "</tr>",
            "</tbody>",
            "</table>",
            "<table border='0' cellpadding='0' cellspacing='0' style='width:100%;text-align:center;'>",
            "<tfoot><tr><td style='padding:10px 0 10px 0;'><span class='text-btn' id='submit'>保存设置</span></td></tr></tfoot>",
            "</table>",
            "<div class='clear'></div>",
            "<table class='middle-table' style='width:730px;margin:0 auto'><thead><tr><th class='w20'>开奖期数</th><th class='w20'>开奖日期</th><th>开奖号码</th><th class='w20'>功能</th></tr></thead>",
            "<tbody id='list'>",

            "</tbody>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();


        console.log(json);
        table = [];
        if (json.list && json.list.length > 0) {
            var bc;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr data-num='" + json.list[i][0] + "' class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td>" + json.list[i][n] + "</td>");
                }
                table.push("<td><a href='javascript:void(0)' data-name='acc'>结算</a> / <a href='javascript:void(0)' data-name='up'>修改</a> / <a href='javascript:void(0)' data-name='del'>刪除</a></td>");
                table.push("</tr>");
            }
        }
        $("#open-num #list").html(table.join(""));
        G.mouseover("#open-num #list tr");

        var data_stop = true;
        $("#open-num #list td a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var mytr = $(this).parents("tr");
            var data_num = mytr.attr("data-num");
            var txt = $(this).html();
            if (data_name == "up") { //修改
                $("#open-num input[name='opNum']").val(mytr.find("td:eq(0)").html());
                $("#open-num input[name='opDate']").val(mytr.find("td:eq(1)").html());
                mytr.find("td:eq(2) i").each(function (i) {
                    $("#open-num input[name='no-" + (i + 1) + "']").val($(this).attr("data-num"));
                });
            } else { //结算、删除
                G.alert({ content: "确定" + txt + "吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&data=" + data_name + "&opNum=" + data_num, function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    G.alert({ content: txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });


        $("#open-num #submit").unbind("click").click(function () {
            var mydata = [], bal = [];
            mydata.push("opNum=" + $("#open-num input[name='opNum']").val());
            mydata.push("opDate=" + $("#open-num input[name='opDate']").val());
            $("#open-num input[num='']").each(function () {
                bal.push($(this).val());
            });
            mydata.push("opBalAry=" + bal.join(","));
            if (S.request) { S.request.abort(); }
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&data=add&" + mydata.join("&"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。",
                            ok: function () { return true; },
                            close: function () { middleBind({ data_action: msg.data_action }); }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
    function addInput(index) {
        var list = [];
        for (var i = 1; i <= index; i++) {
            list.push("<td><input type='text' name='no-" + i + "' class='text-input sw30' num='' /></td>");
        }
        return list.join("");
    }
}

//注单管理
function frommesg(msg) {
    G.scrollLoad({});
    // S.request = G.ajax(msg.data_action, function (json) {
    var json = $.parseJSON('{"dateAry":["2019-08-03","2019-08-02","2019-08-01","2019-07-31","2019-07-30","2019-07-29","2019-07-28"],"numAry":[20190803014,20190803013,20190803012,20190803011,20190803010,20190803009,20190803008,20190803007,20190803006,20190803005,20190803004,20190803003,20190803002,20190803001],"currentPage":1,"totalPage":1,"list":[]}');
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = G.query("gameIndex", "?" + msg.data_action);
        var settlementAry = "";
        var title = "注单管理";
        var thead = ["注单号/日期", "账号", "彩种/期数", "玩法明细", "賠率", "下注金额", "输贏结果"];
        if (gameIndex == 3 || gameIndex == undefined){
            thead.push("路径");
        }
        thead.push("代理");

        if (__sysinfo.level <= 4){
            thead.push("总代理");
        }

        if (__sysinfo.level <= 3){
            thead.push("股东");
        }

        if (__sysinfo.level <= 2){
            thead.push("公司");
        }

        if (__sysinfo.level <= 1){
            thead.push("总监");
        }

        var mysettlement = G.query("settlement", "?" + msg.data_action) || 1;
        if ((mysettlement == 0 || mysettlement == 3 || mysettlement == 1) &&( __sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1))) {
            thead.push("选择");
        }

        if(mysettlement == 4){
            thead = ["号码","号码","号码","号码","号码","号码","号码","号码","号码","号码"];
        }

        var titleNavAry = ["<label>彩种:<select name='gameIndex'>"];
        $("#gameList li a").each(function () {
            titleNavAry.push("<option value='" + $(this).attr("data-index") + "'>" + $(this).html() + "</option>");
        });
        titleNavAry.push("</select></label>");

        var selectType= "";
        if (gameIndex == 3 || gameIndex == undefined){
            selectType = "<label>分类:<select name='category_id'><option value='0' selected='selected'>全部</option><option value='1'>一定位</option><option value='2'>口XXXX</option><option value='3'>X口XXX</option><option value='4'>XX口XX</option><option value='5'>XXX口X</option><option value='6'>XXXX口</option>" +
                "<option value='10'>二定位</option><option value='11'>口口XX</option><option value='12'>口X口X</option><option value='13'>口XX口</option><option value='14'>X口口X</option><option value='15'>X口X口</option><option value='16'>XX口口</option>" +
                "<option value='20'>五位二定</option><option value='21'>口XXX口</option><option value='22'>X口XX口</option><option value='23'>XX口X口</option><option value='24'>XXX口口</option>" +
                "<option value='30'>三定位</option><option value='31'>口口口X</option><option value='32'>口口X口</option><option value='33'>口X口口</option><option value='34'>X口口口</option>" +
                "<option value='40'>五位三定</option><option value='41'>口口XX口</option><option value='42'>口X口X口</option><option value='43'>口XX口口</option><option value='44'>X口口X口</option><option value='45'>X口X口口</option><option value='46'>XX口口口</option>" +
                "<option value='50'>四定位</option><option value='51'>口口口口X</option><option value='52'>口口口X口</option><option value='53'>口口X口口</option><option value='54'>口X口口口</option><option value='55'>X口口口口</option>" +
                "<option value='60'>一定</option><option value='61'>二定</option><option value='62'>快打</option><option value='63'>快选</option><option value='64'>txt导入</option>" +

                "</select></label>";
        }

        var operate = "";
        if ((mysettlement == 0 || mysettlement == 1) && (__sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1))) {
            operate = "&nbsp;&nbsp;<a href='javascript:void(0);' name='del'>删除</a>"
        }else if ((mysettlement == 3 ) && __sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1)) {
            operate = "&nbsp;&nbsp;<a href='javascript:void(0);' name='restore'>恢复</a>"
        }
        if ( __sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1)){
            settlementAry = "<option value='3'>删除</option>";
        }
        //绑定titleNav
        var titleNav = titleNavAry.join("")
            + "<label>状态:<select name='settlement'><option value='0' selected='selected'>全部</option><option  value='1'>中奖</option><option value='2'>退码</option>" + settlementAry + "<option value='4'>归档</option></select></label>"
            + selectType
            + "<label>日期:<select name='beforeDate'></select></label>"
            + "<label>期数:<select name='timesNum'></select></label>"
            + "<label>总监~会员账号：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查询</a>" +
            "&nbsp;&nbsp;<a href='javascript:void(0);' name='refresh'>刷新</a>"+operate+"</label>";

        var table = [];
        if (json.list && mysettlement != 4) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                var isupdate = true;
                for (var n = 0; n < json.list[i].length; n++) {
                    txt_right = n >= 5 && n <= 11 ? "txt-right" : "";
                    if (json.list[i][n].indexOf("×") != -1) {
                        if (json.list[i][n].indexOf("×1注") == -1) {
                            isupdate = false;
                        }
                    }
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }

                if (__sysinfo.level == 0 || (__sysinfo.operateOrderID == 1 && __sysinfo.level == 1)) {
                    if (mysettlement == 0 || mysettlement == 1 || mysettlement == 3) {
                        table.push("<td class='sw120'><input type='checkbox'></td>");
                    }

                }
                table.push("</tr>");
            }
        }else if(json.list){
            var han = json.list.length / 10;
            han = parseInt(han + "");
            if (json.list.length % 10 > 0) han = han + 1;
            for (var i = 0; i < han; i++){
                table.push("<tr>");
                for (var n = 0; n < 10; n++) {
                    if (i * 10 + n < json.list.length) {
                        table.push("<td>" + getNameByType(gameIndex, parseInt(json.list[i * 10 + n].split("=")[0])) + "=" + json.list[i * 10 + n].split("=")[1] + "</td>");
                    }else {
                        table.push("<td></td>");
                    }
                }
                table.push("</tr>");
            }
        }
        $("#load-middle").html(forceMiddle({ id: "frommesg", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //加载日期列表
        if (json.dateAry) {
            for (var i = 0; i < json.dateAry.length; i++) {
                $("#title-nav select[name='beforeDate']").append("<option value='" + json.dateAry[i] + "'>" + json.dateAry[i] + "</option>");
            }
        }
        //加载期数列表
        if (json.numAry) {
            for (var i = 0; i < json.numAry.length; i++) {
                $("#title-nav select[name='timesNum']").append("<option value='" + json.numAry[i] + "'>" + json.numAry[i] + "期</option>");
            }
        }

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        //绑定默认选中值=彩种
        if (gameIndex) {
            $("#title-nav select[name='gameIndex']").val(gameIndex);
        }
        //绑定默认选中值=状态
        var settlement = G.query("settlement", "?" + msg.data_action);
        if (settlement) {
            $("#title-nav select[name='settlement']").val(settlement);
        }

        //绑定默认选中值=分类
        var category_id = G.query("category_id", "?" + msg.data_action);
        if (settlement) {
            $("#title-nav select[name='category_id']").val(category_id);
        }

        //绑定默认选中值=日期
        var beforeDate = G.query("beforeDate", "?" + msg.data_action);
        if (beforeDate) {
            $("#title-nav select[name='beforeDate']").val(beforeDate);
        }

        var searchname = G.query("searchname", "?" + msg.data_action);
        if (searchname) {
            $("#title-nav input[name='searchname']").val(searchname);
        }

        //绑定默认选中值=期数
        var timesNum = G.query("timesNum", "?" + msg.data_action);
        if (timesNum) {
            $("#title-nav select[name='timesNum']").val(timesNum);
        }
        //select选中获取数据
        $("#title-nav select").unbind("change").change(function () {
            fromMesgAction();
        });
        //刷新数据
        $("#title-nav a[name='refresh']").unbind("click").click(function () {
            fromMesgAction();
        });
        //删除
        $("#title-nav a[name='del']").unbind("click").click(function () {
            var data = [];
            $("#frommesg tbody tr ").each(function () {
                if ($(this).find(" input[type='checkbox']").attr("checked") == "checked"){
                    var data_id = $(this).find("td:eq(0) span").attr("data-id");
                    var mid = $(this).find("td:eq(0) span").attr("mid");
                    data.push(mid + ":" + data_id);
                }
            });

            if (data.length == 0){
                G.alert({ content: "请选择要删除的注单", ok: function () { return true; } });
            }else {
                var data_stop = true;
                G.alert({ content: "确定要删除"+data.length+"条注单", ok: function () {

                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) {
                                S.request.abort();
                            }
                            S.request = G.ajax(msg.data_action + "&data=" + data.join(",") + "&auto=3", function (json) {

                                if (json.result == 1){
                                    fromMesgAction();
                                }else {
                                    G.alert({ content: "删除失败", ok: function () { return true; } });
                                }
                                G.maskClose();
                            });
                        }
                        return true;
                    }
                });
            }

        });
        //恢复
        $("#title-nav a[name='restore']").unbind("click").click(function () {
            var data = [];
            $("#frommesg tbody tr ").each(function () {
                if ($(this).find(" input[type='checkbox']").attr("checked") == "checked"){
                    var data_id = $(this).find("td:eq(0) span").attr("data-id");
                    var mid = $(this).find("td:eq(0) span").attr("mid");
                    data.push(mid + ":" + data_id);
                }
            });

            if (data.length == 0){
                G.alert({ content: "请选择要恢复的注单", ok: function () { return true; } });
            }else {
                var data_stop = true;
                G.alert({ content: "确定要恢复"+data.length+"条注单", ok: function () {

                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) {
                                S.request.abort();
                            }
                            S.request = G.ajax(msg.data_action + "&data=" + data.join(",") + "&auto=1", function (json) {

                                if (json.result == 1){
                                    fromMesgAction();
                                }else {
                                    G.alert({ content: "删除失败", ok: function () { return true; } });
                                }
                                G.maskClose();
                            });
                        }
                        return true;
                    }
                });
            }

        });

        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            if (!G.StringSign(searchname)) {
                G.alert({ content: "请“填写”有效的账号！", ok: function () { return true; } });
            } else {
                fromMesgAction();
            }
        });
        //取消、修改、删除
        $("#frommesg tbody td a").unbind("click").click(function () {
            if ($(this).attr("data-auto")) {
                var data_stop = true;
                var data_auto = $(this).attr("data-auto");
                var data_id = $(this).parents("tr").find("td:eq(0) span").html();
                var id = $(this).parents("tr").find("td:eq(0) span").attr("data-id");

                var data_txt = $(this).html();
                if (data_auto == 1 || data_auto == 2 || data_auto == 3) {
                    var content = "注单号#" + data_id + " 您确定 “" + data_txt + "” 吗？";
                    G.alert({ content: content,
                        ok: function () {
                            if (data_stop) {
                                data_stop = false;
                                G.mask();
                                if (S.request) { S.request.abort(); }
                                S.request = G.ajax(msg.data_action + "&id=" + id + "&auto=" + data_auto, function (json) {
                                    G.maskClose();

                                    if (json.result == 1 && data_auto != 2) {
                                        G.alert({
                                            content: "注单号#" + data_id + " " + data_txt + "成功。",
                                            ok: function () { return true; },
                                            close: function () { middleBind({ data_action: msg.data_action }); }
                                        });
                                    } else if (data_auto == 2) {

                                        if (json.danhao != undefined) {
                                            var table = [];
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\"><span name='shareRole'></span>注单号:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>" + json.danhao + "");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">账号:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.zhanghao);
                                            table.push("<div class='user-div hiden'></div>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注类型:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.DetailsType);
                                            table.push("<div class='user-div'></div>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注期数:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.NumberDate);
                                            table.push("<span class='red' id='up-rmb'></span>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注明细:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.Details1 + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注内容:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.optneirong + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">赔率:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push(json.Odds);
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">下注金额:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.Money + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");
                                            table.push("<tr>");
                                            table.push("<td class=\"w25\">输赢结果:</td>");
                                            table.push("<td class='txt-left txt-paddin-left'>");
                                            table.push("<label class=\"label-box\">" + json.DetailsWin + "</label>");
                                            table.push("</td>");
                                            table.push("</tr>");



                                            var content = forceMiddle({ id: "credits-change", tbody: table });
                                            G.alert({
                                                title: "注单修改", content: content, width: 280,
                                                initialize: function () {

                                                },
                                                ok: function () {


                                                    if (json.Details2 == $("#selcheck").val()) {
                                                        G.myTips({ content: "未做任何修改", obj: $("#selcheck"), myclick: true });
                                                        return false;
                                                    }

                                                    S.request = G.ajax(msg.data_action + "&id=" + data_id + "&detail2=" + $("#selcheck").val(), function (json) {
                                                        data_stop = true;
                                                        G.maskClose();
                                                        if (json.result == 1) {
                                                            G.alert({
                                                                content: "保存成功。",
                                                                ok: function () { return true; },
                                                                close: function () { middleBind({ data_action: msg.data_action }); }
                                                            });
                                                        } else {
                                                            G.alert({ content: json.result, ok: function () { return true; } });
                                                        }
                                                    }, function () { data_stop = true; G.maskClose(); });

                                                    return true;

                                                },
                                                cancel: function () { }
                                            });
                                        } else {
                                            G.alert({ content: json.result, ok: function () { return true; } });
                                        }


                                    } else {
                                        G.alert({ content: json.result, ok: function () { return true; } });
                                    }

                                }, function () { G.maskClose(); });
                            }
                            return true;
                        },
                        cancel: function () { }
                    });
                }
            }
        });
        function fromMesgAction() {
            var gameIndex = $("#title-nav select[name='gameIndex']").val();
            var settlement = $("#title-nav select[name='settlement']").val();
            var beforeDate = $("#title-nav select[name='beforeDate']").val();
            var timesNum = $("#title-nav select[name='timesNum']").val();
            var searchname = $("#title-nav input[name='searchname']").val();
            var category_id = $("#title-nav select[name='category_id']").val();

            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "gameIndex", val: gameIndex, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "settlement", val: settlement, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "beforeDate", val: beforeDate, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "timesNum", val: timesNum, pad: true });
            referrer = G.urlReplace({ url: referrer, paramName: "category_id", val: category_id, pad: true });

            if (G.StringSign(searchname))
                referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        }
    // }, function () {
    //     G.rollBack();
    // });
}

//日志管理
//登陆日志
function loglogin(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var settlementAry = "";
        var title = "登陆日志";
        var thead = ["账号","IP","IP地址","级别","日期"];

        var titleNav = "<label>总监~会员账号：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查询</a>&nbsp;&nbsp;</label>";

        var table = [];
        if (json.list) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }
            }

        }

        $("#load-middle").html(forceMiddle({ id: "loglogin", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });


        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            if (!G.StringSign(searchname)) {
                G.alert({ content: "请“填写”有效的账号！", ok: function () { return true; } });
            } else {
                var searchname = $("#title-nav input[name='searchname']").val();
                var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
                if (G.StringSign(searchname))
                    referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
                referrer = referrer.replace("?", "");
                middleBind({ data_action: referrer });
            }
        });

    },function () {
        G.rollBack();
    });

}

//操作日志
function oplog(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var settlementAry = "";
        var title = "登陆日志";
        var thead = ["日期","被操作账号","被操作级别","更变说明","原始值","变更值","操作者","操作者级别","IP地址","IP归属"];

        var titleNav = "<label>总监~会员账号：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查询</a>&nbsp;&nbsp;</label>";

        var table = [];
        if (json.list) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }
            }

        }

        $("#load-middle").html(forceMiddle({ id: "loglogin", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });


        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            if (!G.StringSign(searchname)) {
                G.alert({ content: "请“填写”有效的账号！", ok: function () { return true; } });
            } else {
                var searchname = $("#title-nav input[name='searchname']").val();
                var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
                if (G.StringSign(searchname))
                    referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
                referrer = referrer.replace("?", "");
                middleBind({ data_action: referrer });
            }
        });

    },function () {
        G.rollBack();
    });
}

//快选日志
function kxlog(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var settlementAry = "";
        var title = "快选日志";
        var thead = ["账号","期数","订单号","金额","内容","时间","IP"];

        var titleNav = "<label>会员账号：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查询</a>&nbsp;&nbsp;</label>";

        var table = [];
        if (json.list) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                txt_right = n == 4 ? "style='text-align:left ;'" : "";
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td  " + txt_right + ">" + json.list[i][n] + "</td>");
                }
            }

        }

        $("#load-middle").html(forceMiddle({ id: "kxlog", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });


        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            if (!G.StringSign(searchname)) {
                G.alert({ content: "请“填写”有效的账号！", ok: function () { return true; } });
            } else {
                var searchname = $("#title-nav input[name='searchname']").val();
                var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
                if (G.StringSign(searchname))
                    referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
                referrer = referrer.replace("?", "");
                middleBind({ data_action: referrer });
            }
        });

    },function () {
        G.rollBack();
    });
}

//拦货日志
function bolog(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var settlementAry = "";
        var title = "快选日志";
        var thead = ["操作者","操作者级别","被操作者","被操作者级别","类型","内容","时间","IP"];

        var titleNav = "<label>账号：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查询</a>&nbsp;&nbsp;</label>";

        var table = [];
        if (json.list) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length - 1; n++) {
                    if (n == 5){
                        table.push("<td><span class='pointer blue' data-msg='"+json.list[i][n]+"' data-index='"+json.list[i][8]+"' >查看更多</span></td>");
                    }else{
                        table.push("<td>" + json.list[i][n] + "</td>");
                    }
                }
            }

        }

        $("#load-middle").html(forceMiddle({ id: "bologin", title: "", thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });

        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            if (!G.StringSign(searchname)) {
                G.alert({ content: "请“填写”有效的账号！", ok: function () { return true; } });
            } else {
                var searchname = $("#title-nav input[name='searchname']").val();
                var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
                if (G.StringSign(searchname))
                    referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
                referrer = referrer.replace("?", "");
                middleBind({ data_action: referrer });
            }
        });

        $("#bologin").find("td span.pointer").unbind("click").click(function () {

            var data = $(this).attr("data-msg");
            var index = $(this).attr("data-index");
            var thead = ["类别", "改前", "改后"];
            var dataArr = data.split(",");
            var table = [];
            for (var i = 0; i < dataArr.length; i++){
                table.push("<tr>");
                table.push("<td style='text-align: left'>" + getNameByCategory(index,dataArr[i].split(":")[0] )+ "</td>");
                table.push("<td style='text-align: left'>" + dataArr[i].split(":")[1] + "</td>");
                table.push("<td style='text-align: left'>" + dataArr[i].split(":")[2] + "</td>");
                table.push("</tr>");
            }
            var content = G.overflowDiv({ id: "my-action", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });

            G.alert({ title: "", content: content, width: 580});
        });

    },function () {
        G.rollBack();
    });
}

//登陆日志
function yklog(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var settlementAry = "";
        var title = "盈亏日志";
        var thead = ["日期","账号","输赢","回水","可用余额"];

        var titleNav = "&nbsp;&nbsp;<label>会员账号：<input type='text' class='text-input sw90' name='searchname' />&nbsp;&nbsp;选择日期:<input type='text' class='text-input sw70' name='beforeDate' value='" + json.seachDate + "' />&nbsp;&nbsp;<a href='javascript:void(0);' name='search'>查询</a></label>";

        var table = [];
        if (json.list) {
            var bc, txt_right;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td class='" + txt_right + "'>" + json.list[i][n] + "</td>");
                }
            }

        }

        $("#load-middle").html(forceMiddle({ id: "loglogin", title: title, thead: thead, titleNav: titleNav, tbody: table })).show();
        G.mouseover("#load-middle tbody tr");

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });


        $("#title-nav a[name='search']").unbind("click").click(function () {
            var searchname = $("#title-nav input[name='searchname']").val();
            var beforeDate = $("#title-nav input[name='beforeDate']").val();

            var searchname = $("#title-nav input[name='searchname']").val();
            var referrer = G.urlReplace({ url: "?" + msg.data_action, paramName: "page", pad: false });
            referrer = G.urlReplace({ url: referrer, paramName: "date", val: beforeDate, pad: true });

            if (G.StringSign(searchname))
                referrer = G.urlReplace({ url: referrer, paramName: "searchname", val: searchname, pad: true });
            referrer = referrer.replace("?", "");
            middleBind({ data_action: referrer });
        });

    },function () {
        G.rollBack();
    });
}

//总监参数设置
function datum(msg) {
    if (!msg.action) { //选择总监
        $("#navListBox").hide();
        G.mask();
        if (S.request) { S.request.abort(); }
        S.request = G.ajax("searchdirector", function (json) {
            G.maskClose();
            var table = ["<div id='my-zj' style='margin:10px;'>总监账号：<select id='setName-zj'>"];
            for (var i in json) {
                table.push("<option value='" + json[i] + "'>" + i + "</option>");
            }
            table.push("</select></div>");

            var content = table.join("");
            G.alert({ title: "选择总监", content: content,
                ok: function () {
                    var zjUser = $("#my-zj #setName-zj").val();
                    var zjtxt = $("#my-zj #setName-zj").find("option:selected").text();
                    if (zjUser && zjUser != "") {
                        __sysinfo.myName = zjUser;
                        __sysinfo.myRoleName = zjtxt;
                        $("#navListBox").show();
                        datum({ data_action: msg.data_action, action: true });
                        return true;
                    }
                },
                close: function () { }
            });

        }, function () { G.maskClose(); });
    } else {
        G.scrollLoad({});
        var obj = appenDatum(msg);
        S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
            G.loadEnd();
            for (var i in json) {
                obj.find("input[type='text'][name='" + i + "']").val(json[i]);
                obj.find("input[type='radio'][name='" + i + "'][value='" + json[i] + "']").attr("checked", "checked");
            }
            if (json.ipPort && json.ipPort.length > 0) {
                //for (var i = 0; i < json.ipPort.length; i++) {
                //    obj.find("select[name='ipPort']").append("<option value='" + json.ipPort[i] + "'>" + json.ipPort[i] + "</option>");
                //}
                //obj.find("select[name='ipPort']").val(json.port);
                obj.find("input[type='text'][name='ipPort']").val(json.port);
            }
            //数据提交
            var data_stop = true;
            obj.find("#submit").unbind("click").click(function () {
                var dataAry = [], data = [], ipset = [];
                dataAry.push("maxOnline=" + obj.find("input[name='maxOnline']").val());
                dataAry.push("ipPort=" + obj.find("input[name='ipPort']").val());
                obj.find("#quanx :radio").each(function () {
                    if ($(this).attr("checked"))
                        data.push($(this).attr("name") + ":" + $(this).val());
                });
                dataAry.push("data=" + data.join(","));
                for (var i = 1; i <= 8; i++) {
                    ipset.push(obj.find("#ipset input[name='IP_" + i + "']").val() + "|" + obj.find("#ipset input[name='IP_" + i + "_S']:checked").val());
                }
                dataAry.push("ipset=" + ipset.join(","));
                if (data_stop) {
                    data_stop = false;
                    G.mask();
                    if (S.request) { S.request.abort(); }
                    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&" + dataAry.join("&"), function (json) {
                        G.maskClose();
                        data_stop = true;
                        if (json.result == 1) {
                            G.alert({ content: "保存成功。", ok: function () { return true; } });
                        } else {
                            G.alert({ content: json.result, ok: function () { return true; } });
                        }
                    }, function () { G.maskClose(); data_stop = true; });
                }
            });
            //设置默认赔率
            obj.find("#bakOdds").unbind("click").click(function () {
                G.alert({ content: "將當前总监所有賠率设為新增默认值，确定吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&bakodds=1", function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({ content: "保存成功。", ok: function () { return true; } });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            });

        }, function () {
            G.rollBack();
        });
    }
}

//系统设置
function globalr(msg) {
    G.scrollLoad({});
    var obj = appenGglobalr(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        // for (var i = 0; i < json.opGame.length; i++) {
        //     if (json.opGame[i] == 1) {
        //         obj.find("table[data-index='" + i + "']").show();
        //     } else {
        //         obj.find("table[data-index='" + i + "']").hide();
        //     }
        // }
        for (var i in json) {
            obj.find("input[type='radio'][name='" + i + "'][value='" + json[i] + "']").attr("checked", "checked");
            obj.find("input[type='text'][name='" + i + "']").val(json[i]);
        }
        // obj.find("select[name='clindex']").val(json.IndexCL);
        //
        // obj.find("input[type='text']").focus(function () {
        //     if ($(this).attr("msg")) {
        //         G.myTips({ content: $(this).attr("msg"), obj: $(this), myclick: true });
        //     }
        // });
        //数据提交
        obj.find("#submit").unbind("click").click(function () {
            var dataAry = [], data_stop = true;
            obj.find("input").each(function () {
                if ($(this).attr("type") == "text") {
                    dataAry.push($(this).attr("name") + ":" + $(this).val());
                } else if ($(this).attr("type") == "radio" && $(this).attr("checked")) {
                    dataAry.push($(this).attr("name") + ":" + $(this).val());
                }
            });
            // dataAry.push("clindex:" + obj.find("select[name='clindex']").val());
            // dataAry.push("bankname:" + obj.find("select[name='bankname']").val());

            if (data_stop) {
                data_stop = false;
                G.mask();
                var param = dataAry.join(",");
                param = param.replace(/,/g,"&");
                param = param.replace(/:/g,"=");
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&" + param + "&op=1", function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//赔率设置
function setodds(msg) {
    G.scrollLoad({});
    var obj = appendSetOdds(msg);
    G.mouseover(obj.find("tbody tr"), "bc");
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        if (json.animalrIndex) {
            for (var i = 0; i < json.animalrIndex.length; i++) {
                obj.find("tr[data-animalr='" + i + "']").attr("sort", json.animalrIndex[i]);
            }
        }
        if (json.animalr) {
            obj.find("span[name='animalr']").html(json.animalr);
        }
        for (var i in json) {
            for (var n = 0; n < 5; n++) {
                obj.find("tr[sort='" + i + "'] input[type='text']").eq(n).val(json[i][n]);
            }
        }
        obj.find("#reset").click();
        obj.find("tbody input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        obj.find("td input[type='checkbox']").unbind("change").change(function () {
            if ($(this).attr("checked")) {
                $(this).parent().parent("tr").addClass("myqhs");
            } else {
                $(this).parent().parent("tr").removeClass("myqhs");
            }
        });
        obj.find("#all").unbind("click").click(function () {
            obj.find("td tbody input[type='checkbox']").attr("checked", true);
            obj.find("tbody tr").addClass("myqhs");
        });
        obj.find("#reset").unbind("click").click(function () {
            obj.find("tr.myqhs").removeClass("myqhs");
            obj.find("td input[type='checkbox']").attr("checked", false);
        });
        //数据提交
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var data = [], ary, sort, locks = true;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                if (sort != undefined) {
                    ary = [];
                    $(this).find("input[type='text']").each(function () {
                        if (!G.DecimalSign($(this).val())) {
                            G.alert({
                                content: "请填写有效參数值。", ok: function () {
                                    return true;
                                }
                            });
                            locks = false;
                            return false;
                        } else {
                            ary.push($(this).val());
                        }
                    });
                    data.push(sort + ":" + ary.join(","));
                }
            });
            if (data_stop && locks) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + data.join("|"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//自动跳水
function autoodds(msg) {
    G.scrollLoad({});
    var obj = appendAutoOdds(msg);
    G.mouseover(obj.find("tbody tr"));
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        for (var i in json) {
            for (var n = 0; n < 3; n++) {
                obj.find("tr[sort='" + i + "'] input[type='text']").eq(n).val(json[i][n]);
            }
            obj.find("tr[sort='" + i + "'] select").val(json[i][3]);
        }
        obj.find("input[name='TongLuOdds']").val(json.TongLuOdds);
        obj.find("#all1").unbind("click").click(function () {
            obj.find("select").val("0");
        });
        obj.find("#all2").unbind("click").click(function () {
            obj.find("select").val("1");
        });
        obj.find("input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var data = [], ary, sort, locks = true;
            obj.find("tbody tr").each(function () {
                sort = $(this).attr("sort");
                if (sort != undefined) {
                    ary = [];
                    $(this).find("input[type='text']").each(function () {
                        if (!G.DecimalSign($(this).val())) {
                            G.alert({
                                content: "请填写有效參数值。", ok: function () {
                                    return true;
                                }
                            });
                            locks = false;
                            return false;
                        } else {
                            ary.push($(this).val());
                        }
                    });
                    ary.push($(this).find("select").val());
                    data.push(sort + ":" + ary.join(","));
                }
            });

            var TongLuOdds = parseInt(obj.find("input[name='TongLuOdds']").val()) || 0;
            if (TongLuOdds < 0 || TongLuOdds > 100) {
                G.alert({ content: "两面联动同路号码跳水比例范围为大于等于0小于等于100的整数", ok: function () { return true; } });
                return false;
            }
            if (data_stop && locks) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&TongLuOdds=" + TongLuOdds + "&data=" + data.join("|"), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });
    }, function () {
        G.rollBack();
    });
}

//两面跳水
function lmautoodds(msg) {
    G.scrollLoad({});
    var obj = appendLmAutoOdds(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        obj.find("input[name='TongLuOdds']").val(json.TongLuOdds);
        for (var i in json) {
            if (i != "TongLuOdds") {
                obj.find("input[name='A_" + i + "']").val(json[i][0]);
                obj.find("input[name='B_" + i + "']").val(json[i][1]);
            }
        }
        obj.find("tbody input[type='text']").keyup(function () {
            $(this).val($(this).val().replace(/[^0-9.]/g, ''));
        });
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            var a, b, data = [];
            var tongLuOdds = obj.find("input[name='TongLuOdds']").val();
            if (!G.NumberSign(tongLuOdds) || parseInt(tongLuOdds) < 0 || parseInt(tongLuOdds) > 100) {
                G.alert({ content: "同路“号码”随大路降赔率比例：0-100之间", ok: function () { return true; } });
                return false;
            }
            for (var i = 1; i <= 25; i++) {
                a = obj.find("input[name='A_" + i + "']").val();
                b = obj.find("input[name='B_" + i + "']").val();
                if (parseFloat(a) < 0 || parseFloat(a) > 1 || parseFloat(b) < 0 || parseFloat(b) > 1) {
                    G.alert({ content: "输入数字大于等于0~小于1，允许四位小数", ok: function () { return true; } });
                    return false;
                } else {
                    data.push(i + ":" + a + ":" + b);
                }
            }
            if (data_stop) {
                data_stop = false;
                G.mask();
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&TongLuOdds=" + tongLuOdds + "&data=" + data.join(","), function (json) {
                    data_stop = true;
                    G.maskClose();
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

function issuemanage(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav
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

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });



        var title = "期管理";
        var table = [
            "<div id='open-num'>",

            "<table class='middle-table' ><thead><tr><th class='w12'>期数</th><th class='w12'>笔数</th><th class='w12'>金额</th><th class='w12'>盈亏</th><th class='w12'>占成金额</th><th class='w12'>占成盈亏</th><th class='w12'>花费时间</th><th class='w12'>功能</th></tr></thead>",
            "<tbody id='list'>",

            "</tbody>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();


        table = [];
        if (json.list && json.list.length > 0) {
            var bc;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr data-num='" + json.list[i][0] + "' class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length-1; n++) {
                    table.push("<td>" + json.list[i][n] + "</td>");
                }
                var redeem = json.list[i][json.list[i].length-1];
                var del = redeem == 2 ? "<a href='javascript:void(0)' data-name='restore'>恢复</a>" : "<a href='javascript:void(0)' data-name='del'>取消</a>";
//<a href='javascript:void(0)' data-name='bak'>备份</a> / <a href='javascript:void(0)' data-name='down'>下载</a> /

                table.push("<td> "+del+"</td>");
                table.push("</tr>");
            }
        }
        $("#open-num #list").html(table.join(""));
        G.mouseover("#open-num #list tr");

        var data_stop = true;
        $("#open-num #list td a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var mytr = $(this).parents("tr");
            var data_num = mytr.attr("data-num");
            var txt = $(this).html();
            if (data_name == "up") { //修改
                $("#open-num input[name='opNum']").val(mytr.find("td:eq(0)").html());
                $("#open-num input[name='opDate']").val(mytr.find("td:eq(1)").html());
                mytr.find("td:eq(2) i").each(function (i) {
                    $("#open-num input[name='no-" + (i + 1) + "']").val($(this).attr("data-num"));
                });
            } else { //结算、删除
                G.alert({ content: "确定" + txt + data_num + "吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&op=" + data_name + "&issue=" + data_num, function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    G.alert({ content: txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });

    }, function () {
        G.rollBack();
    });
    function addInput(index) {
        var list = [];
        for (var i = 1; i <= index; i++) {
            list.push("<td><input type='text' name='no-" + i + "' class='text-input sw30' num='' /></td>");
        }
        return list.join("");
    }
}

function nojsuserlist(msg) {
    G.scrollLoad({});
    S.request = G.ajax(msg.data_action, function (json) {
        G.loadEnd();
        closeMiddleAll();
        var gameIndex = parseInt(G.query("gameIndex", "?" + msg.data_action));
        //绑定titleNav

        var titleNav = "<label>会员账号：<input type='text' class='text-input sw90' name='username' />&nbsp;&nbsp;<a href='javascript:void(0);' name='add'>添加</a>&nbsp;&nbsp;</label>";
        ;
        forceMiddle({ titleNav: titleNav});
        $("#title-nav").addClass("title-nav-left");
        $("select[data-id='gameIndex']").val(gameIndex);
        $("select[data-id]").unbind("change").change(function () {
            middleBind({ data_action: _a({ data_action: msg.data_action, paramName: "gameIndex", val: $(this).val() }) });
        });

        //绑定分页
        pageMiddle({ obj: $("#shell_pageControl"), currentPage: json.currentPage, totalPage: json.totalPage, referrer: msg.data_action }, function (myPage) {
            middleBind({ data_action: myPage });
        });



        var title = "非降水会员";
        var table = [
            "<div id='njs-members'>",

            "<table class='middle-table' ><thead><tr><th class='w12'>帐号</th><th class='w12'>日期</th><th class='w12'>操作者</th><th class='w12'>功能</th></tr></thead>",
            "<tbody id='list'>",

            "</tbody>",
            "</table>",
            "</div>"
        ];
        $("#shell_title").html(title);
        $("#load-middle").html(table.join("")).show();


        table = [];
        if (json.list && json.list.length > 0) {
            var bc;
            for (var i = 0; i < json.list.length; i++) {
                bc = i % 2 != 0 ? "bc" : "";
                table.push("<tr data-username='" + json.list[i][0] + "' class='" + bc + "'>");
                for (var n = 0; n < json.list[i].length; n++) {
                    table.push("<td>" + json.list[i][n] + "</td>");
                }
                var del = "<a href='javascript:void(0)' data-name='del'>删除</a>";

                table.push("<td> "+del+"</td>");
                table.push("</tr>");
            }
        }
        $("#njs-members #list").html(table.join(""));
        G.mouseover("#njs-members #list tr");

        $("#title-nav a").unbind("click").click(function () {
            var username = $("#title-nav input[name='username']").val();
            if (username.length == 0) return;
            S.request = G.ajax(msg.data_action + "&op=add&username=" + username, function (json) {
                data_stop = true;
                G.maskClose();
                if (json.result == 1) {
                    G.alert({ content: "成功。",
                        ok: function () { return true; },
                        close: function () { middleBind({ data_action: msg.data_action }); }
                    });
                } else {
                    G.alert({ content: json.result, ok: function () { return true; } });
                }
            }, function () { G.maskClose(); data_stop = true; });
        });

        var data_stop = true;
        $("#njs-members #list td a").unbind("click").click(function () {
            var data_name = $(this).attr("data-name");
            var mytr = $(this).parents("tr");
            var username = mytr.attr("data-username");
            var txt = $(this).html();
            if (data_name == "del") { //删除
                //结算、删除
                G.alert({ content: "确定" + txt + username + "吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&op=" + data_name + "&username=" + username, function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {
                                    G.alert({ content: txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });

    }, function () {
        G.rollBack();
    });
    function addInput(index) {
        var list = [];
        for (var i = 1; i <= index; i++) {
            list.push("<td><input type='text' name='no-" + i + "' class='text-input sw30' num='' /></td>");
        }
        return list.join("");
    }
}


//七星彩开盘
function openingqxc(msg) {
    G.scrollLoad({});
    var obj = appendOpeningQXC(msg);
    obj.find("input[name='stratDate']").val(new Date().Format("yyyy-MM-dd"));
    obj.find("input[name='stratTime']").val("14:00:00");
    obj.find("input[name='endTime']").val("20:30:00");
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        var table = [];
        for (var i = 0; i < json.length; i++) {
            table.push("<tr>");
            for (var n = 0; n < json[i].length; n++) {
                table.push("<td>" + json[i][n] + "</td>");
            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        obj.find("input[name='number']").focus(function () {
            G.myTips({ content: "格式：16001", obj: $(this), myclick: true });
        });
        var data_stop = true;
        obj.find("#list a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).attr("data-id");
            var data_txt = $(this).html();
            if (data_name == "off" || data_name == "del") {
                G.alert({ content: "确定 “" + data_txt + "” 吗？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&auto=" + data_name + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({ content: data_txt + "成功。",
                                        ok: function () { return true; },
                                        close: function () {
                                            middleBind({ data_action: msg.data_action });
                                        }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "up") {
                obj.find("input[name='number']").val($(this).parents("tr").find("td").eq(1).html());
                obj.find("input[name='stratDate']").val($(this).parents("tr").find("td").eq(2).html());
                obj.find("input[name='stratTime']").val($(this).parents("tr").find("td").eq(3).html());
                obj.find("input[name='endTime']").val($(this).parents("tr").find("td").eq(4).html());
                obj.find("input").addClass("bold");
                setTimeout(function () { obj.find("input").removeClass("bold") }, 500);
            }
        });
        obj.find("#submit").unbind("click").click(function () {
            var number = obj.find("input[name='number']");
            if (!G.NumberSign(number.val())) {
                number.focus();
                return false;
            }
            var dataAry = [
                number.val(),
                obj.find("input[name='stratDate']").val(),
                obj.find("input[name='stratTime']").val(),
                obj.find("input[name='endTime']").val()
            ];
            if (data_stop) {
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&auto=up" + "&data=" + dataAry.join(","), function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。",
                            ok: function () { return true; },
                            close: function () {
                                obj.find("input[name='number']").val("");
                                obj.find("input[name='stratDate']").val(new Date().Format("yyyy-MM-dd"));
                                middleBind({ data_action: msg.data_action });
                            }
                        });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//快彩提前封盘设置
function openingkc(msg) {
    G.scrollLoad({});
    var obj = appendOpeningKC(msg);
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        for (var i in json) {
            obj.find("input[name='" + i + "']").val(json[i]);
        }
        var data_stop = true;
        obj.find("#submit").unbind("click").click(function () {
            if (data_stop) {
                var dataAry = [];
                obj.find("input").each(function () {
                    if (G.NumberSign($(this).val())) {
                        dataAry.push($(this).attr("name") + ":" + $(this).val());
                    }
                });
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName + "&data=" + dataAry.join(","), function (json) {
                    G.maskClose();
                    data_stop = true;
                    if (json.result == 1) {
                        G.alert({ content: "保存成功。", ok: function () { return true; } });
                    } else {
                        G.alert({ content: json.result, ok: function () { return true; } });
                    }
                }, function () { G.maskClose(); data_stop = true; });
            }
        });
    }, function () {
        G.rollBack();
    });
}

//公告管理
function newsinfo(msg) {

    console.log(msg);

    G.scrollLoad({});
    var obj = appendNewsInfo(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);
        var table = [], txt_left, txt, bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");
            for (var n = 0; n < json.list[i].length; n++) {
                txt_left = n == 2 ? "txt-left" : "";
                if (n == 4) {
                    txt = json.list[i][n] == 0 ? "全部显示" : json.list[i][n] == 1 ? "后台显示" : "会员显示";
                    table.push("<td data-visible='" + json.list[i][n] + "'>" + txt + "</td>");
                }else if(n == 5) {
                    txt = json.list[i][n] == 0 ? "顶部滚动" : json.list[i][n] == 1 ? "居中弹窗" : "右下角弹窗";
                    table.push("<td data-visible='" + json.list[i][n] + "'>" + txt + "</td>");

                }
                else {
                    table.push("<td style='word-wrap: break-word;word-break:break-all;' class='" + txt_left + "'>" + json.list[i][n] + "</td>");
                }
            }
            table.push("<td><a href='javascript:void(0)' name='up'>修改</a> / <a href='javascript:void(0)' name='del'>删除</a></td>");
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;
        $("#newsAdd").unbind("click").click(function () {
            var content = "<div id='news-add'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='newsContent'></textarea></div><div>可见级别:<select name='visibleId'><option value='0'>全部</option><option value='1'>代理</option><option value='2'>会员</option></select> 公告级别:<select name='levelId'><option value='0'>顶部滚动</option><option value='1'>居中弹窗</option><option value='2'>右下角弹窗</option></select></div></div>";
            G.alert({ title: "新增公告", content: content,
                ok: function () {
                    var newsContent = $("#news-add textarea[name='newsContent']").val();
                    var visibleId = $("#news-add select[name='visibleId']").val();
                    var levelId = $("#news-add select[name='levelId']").val();
                    if (newsContent == "") {
                        alert("请填写公告內容");
                        return false;
                    }

                    if (data_stop) {
                        G.mask();
                        data_stop = false;
                        if (S.request) { S.request.abort(); }
                        S.request = G.ajax(msg.data_action + "&auto=add&newsContent=" + newsContent + "&visibleId=" + visibleId + "&levelId=" + levelId, function (json) {
                            G.maskClose();
                            data_stop = true;
                            if (json.result == 1) {
                                G.alert({ content: "保存成功。",
                                    ok: function () { return true; },
                                    close: function () { middleBind({ data_action: msg.data_action }); }
                                });
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); data_stop = true; });
                    }
                    return true;
                },
                cancel: function () { }
            });
        });
        obj.find("#list tbody td a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).parents("tr").find("td").eq(0).html();
            if (data_name == "del") {
                G.alert({ content: "确定刪除吗？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=del&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({ content: "删除成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "up") {
                var content = "<div id='news-up'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='newsContent'></textarea></div><div>可见级别:<select name='visibleId'><option value='0'>全部</option><option value='1'>代理</option><option value='2'>会员</option></select></div></div>";
                var mythis = $(this), data_id;
                G.alert({ title: "修改公告", content: content,
                    initialize: function () {
                        data_id = mythis.parents("tr").find("td").eq(0).html();
                        var newsContent = mythis.parents("tr").find("td").eq(2).html();
                        var visibleId = mythis.parents("tr").find("td").eq(4).attr("data-visible");
                        $("#news-up textarea[name='newsContent']").val(newsContent);
                        $("#news-up select[name='visibleId']").val(visibleId);
                    },
                    ok: function () {
                        var newsContent = $("#news-up textarea[name='newsContent']").val();
                        var visibleId = $("#news-up select[name='visibleId']").val();
                        if (newsContent == "") {
                            alert("请填写公告內容");
                            return false;
                        }

                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=up&newsContent=" + newsContent + "&visibleId=" + visibleId + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({ content: "保存成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });

    }, function () {
        G.rollBack();
    });
}


//充值管理
function setchongzhi(msg) {
    if (msg.State == undefined) {
        msg.State = 0;
    }
    if (msg.Date == undefined) {
        msg.Date = "";
    }
    if (msg.Key == undefined) {
        msg.Key = "";
    }

    G.scrollLoad({});
    var obj = appendChongZhi(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });

    S.request = G.ajax(msg.data_action+"&state="+msg.State+"&date="+msg.Date+"&key="+msg.Key, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);
        var table = [], txt_left, txt, bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");

            table.push("<td><input type='checkbox' name='" + json.list[i][0] + "' ></td>");

            for (var n = 0; n < json.list[i].length; n++) {

                table.push("<td>" + json.list[i][n] + "</td>");

            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;

        $("#chongzhi_date").datepicker();

        $("#chongzhi_state").change(function () {
            msg.State = $("#chongzhi_state").val();
            setchongzhi(msg);
        });

        $("#chongzhi_search").click(function () {
            msg.State = $("#chongzhi_state").val();
            msg.Date = $("#chongzhi_date").val();
            msg.Key = $("#chongzhi_key").val();
            setchongzhi(msg);
        });


        obj.find("#list tbody td a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).parents("tr").find("td").eq(1).html();
            if (data_name == "up") {
                G.alert({
                    content: "确定通过审核吗？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=up&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "del") {
                var content = "<div id='news-up'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='desc'></textarea></div></div>";
                var mythis = $(this), data_id;
                G.alert({
                    title: "拒绝说明", content: content,
                    initialize: function () {
                        data_id = mythis.parents("tr").find("td").eq(1).html();
                    },
                    ok: function () {
                        var desc = $("#news-up textarea[name='desc']").val();
                        if (desc == "") {
                            alert("请填写拒绝说明");
                            return false;
                        } else if (desc.length > 100) {
                            alert("拒绝说明最高可输入100个字符。");
                            return false;
                        }

                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=del&desc=" + desc + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });

        $("#chongzhi thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#chongzhi tbody td input[type='checkbox']").attr("checked", checked);
        });

        var data_stop = true;
        $("#chongzhi_delete").unbind("click").click(function () {
            var idAry = [];
            $("#chongzhi tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾选1个需要“刪除”的记录！", ok: function () { return true; } });
            } else {
                G.alert({
                    content: "警告：记录刪除后不可逆，确定刪除吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax("del_chongzhi&data=" + idAry.join(","), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {

                                    msg.State = $("#chongzhi_state").val();
                                    msg.Date = $("#chongzhi_date").val();
                                    msg.Key = $("#chongzhi_key").val();

                                    middleBind(msg);
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
        });



    }, function () {
        G.rollBack();
    });
}


//充值管理
function settixian(msg) {
    if (msg.State == undefined) {
        msg.State = 0;
    }
    if (msg.Date == undefined) {
        msg.Date = "";
    }
    if (msg.Key == undefined) {
        msg.Key = "";
    }

    G.scrollLoad({});
    var obj = appendTiXian(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });

    S.request = G.ajax(msg.data_action + "&state=" + msg.State + "&date=" + msg.Date + "&key=" + msg.Key, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);
        var table = [], txt_left, txt, bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");


            table.push("<td><input type='checkbox' name='" + json.list[i][0] + "' ></td>");


            for (var n = 0; n < json.list[i].length; n++) {

                table.push("<td>" + json.list[i][n] + "</td>");

            }
            table.push("</tr>");
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));
        var data_stop = true;

        $("#tixian_date").datepicker();

        $("#tixian_state").change(function () {
            msg.State = $("#tixian_state").val();
            settixian(msg);
        });

        $("#tixian_search").click(function () {
            msg.State = $("#tixian_state").val();
            msg.Date = $("#tixian_date").val();
            msg.Key = $("#tixian_key").val();
            settixian(msg);
        });


        obj.find("#list tbody td a").unbind("click").click(function () {
            var data_name = $(this).attr("name");
            var data_id = $(this).parents("tr").find("td").eq(1).html();
            if (data_name == "up") {
                G.alert({
                    content: "确定通过审核吗？",
                    ok: function () {
                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=up&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
                                } else {
                                    G.alert({ content: json.result, ok: function () { return true; } });
                                }
                            }, function () { G.maskClose(); data_stop = true; });
                        }
                        return true;
                    },
                    cancel: function () { }
                });
            } else if (data_name == "del") {
                var content = "<div id='news-up'><div><textarea style='width:350px;height:120px;margin-bottom:5px;resize:none;border:1px #ccc solid; margin-top:2px;' name='desc'></textarea></div></div>";
                var mythis = $(this), data_id;
                G.alert({
                    title: "拒绝说明", content: content,
                    initialize: function () {
                        data_id = mythis.parents("tr").find("td").eq(1).html();
                    },
                    ok: function () {
                        var desc = $("#news-up textarea[name='desc']").val();
                        if (desc == "") {
                            alert("请填写拒绝说明");
                            return false;
                        } else if (desc.length > 100) {
                            alert("拒绝说明最高可输入100个字符。");
                            return false;
                        }

                        if (data_stop) {
                            G.mask();
                            data_stop = false;
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax(msg.data_action + "&auto=del&desc=" + desc + "&id=" + data_id, function (json) {
                                G.maskClose();
                                data_stop = true;
                                if (json.result == 1) {
                                    G.alert({
                                        content: "操作成功。",
                                        ok: function () { return true; },
                                        close: function () { middleBind({ data_action: msg.data_action }); }
                                    });
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
        });


        $("#tixian thead th input[name='all']").unbind("change").change(function () {
            var checked = $(this).attr("checked") ? true : false;
            $("#tixian tbody td input[type='checkbox']").attr("checked", checked);
        });

        var data_stop = true;
        $("#tixian_delete").unbind("click").click(function () {
            var idAry = [];
            $("#tixian tbody td input[type='checkbox']:checked").each(function () {
                idAry.push($(this).attr("name"));
            });
            if (idAry.length == 0) {
                G.alert({ content: "至少勾选1个需要“刪除”的记录！", ok: function () { return true; } });
            } else {
                G.alert({
                    content: "警告：记录刪除后不可逆，确定刪除吗？",
                    ok: function () {
                        if (data_stop) {
                            data_stop = false;
                            G.mask();
                            if (S.request) { S.request.abort(); }
                            S.request = G.ajax("del_chongzhi&data=" + idAry.join(","), function (json) {
                                data_stop = true;
                                G.maskClose();
                                if (json.result == 1) {

                                    msg.State = $("#tixian_state").val();
                                    msg.Date = $("#tixian_date").val();
                                    msg.Key = $("#tixian_key").val();
                                    settixian(msg);

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
        });


    }, function () {
        G.rollBack();
    });
}


//在线统计
function online(msg) {
    G.scrollLoad({});
    var obj = appendOnline(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);

        var level = G.query("level", "?" + msg.data_action) || 6;
        if (level == 6) {
            obj.find("#list thead th[data-level='6']").show();
        } else {
            obj.find("#list thead th[data-level='6']").hide();
        }

        var table = [], txt_left, txt;
        for (var i = 0; i < json.list.length; i++) {
            table.push("<tr>");
            for (var n = 0; n < json.list[i].length; n++) {
                if (n == 0) {
                    table.push("<td class='online cursor' data-id='" + json.list[i][n] + "'></td>");
                } else {
                    table.push("<td>" + json.list[i][n] + "</td>");
                }
            }
            table.push("</tr>");
        }
        for (var i = 0; i < json.onlineCount.length; i++) {
            obj.find("tbody[data-onlineCount=''] td").eq(i).html(json.onlineCount[i]);
        }
        obj.find("#list tbody").html(table.join(""));
        G.mouseover(obj.find("#list tbody tr"));

        obj.find("tbody[data-onlineCount=''] td.pointer").unbind("click").click(function () {
            var data_level = $(this).attr("data-level");
            middleBind({ data_action: "online&level=" + data_level });
        });
        var data_stop = true;
        obj.find("#list tbody td.online").unbind("click").click(function () {
            var data_id = $(this).attr("data-id");
            G.alert({ content: "确定將此账号踢出系统吗？",
                ok: function () {
                    if (data_stop) {
                        G.mask();
                        data_stop = false;
                        if (S.request) { S.request.abort(); }
                        S.request = G.ajax(msg.data_action + "&id=" + data_id, function (json) {
                            G.maskClose();
                            data_stop = true;
                            if (json.result == 1) {
                                G.alert({ content: "操作成功。",
                                    ok: function () { return true; },
                                    close: function () { middleBind({ data_action: msg.data_action }); }
                                });
                            } else {
                                G.alert({ content: json.result, ok: function () { return true; } });
                            }
                        }, function () { G.maskClose(); data_stop = true; });
                    }
                    return true;
                },
                cancel: function () { }
            });
        });
        obj.find("#list td span.pointer").unbind("click").click(function () {
            if (data_stop) {
                var data_name = $(this).attr("data-name");
                var data_fid = $(this).attr("data-fid");
                G.mask();
                data_stop = false;
                if (S.request) { S.request.abort(); }
                S.request = G.ajax("online&name=" + data_name + "&fid=" + data_fid, function (json) {
                    G.maskClose();
                    data_stop = true;
                    var thead = ["彩种", "明细", "賠率", "金额", "退水", "结果"];
                    var table = [], txt_right;
                    if (json && json.length > 0) {
                        for (var i = 0; i < json.length; i++) {
                            table.push("<tr>");
                            for (var n = 0; n < json[i].length; n++) {
                                txt_right = n >= 3 ? "txt-right w12" : "";
                                table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                            }
                            table.push("</tr>");
                        }
                    }
                    var content = G.overflowDiv({ id: "my-action", content: forceMiddle({ thead: thead, tbody: table, fonDiv: true }) });
                    var generatedCount = 1;
                    var my_action = "online&name=" + data_name + "&fid=" + data_fid;
                    G.alert({ title: "注单明细", content: content, width: 580,
                        initialize: function () {
                            $("#my-action #fondiv").find("a").unbind("click").click(function () {
                                generatedCount++;
                                my_action = G.urlReplace({ url: "?" + my_action, paramName: "page", val: generatedCount, pad: true }).replace("?", "");
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
                                                txt_right = n >= 3 ? "txt-right w12" : "";
                                                table.push("<td class='" + txt_right + "'>" + json[i][n] + "</td>");
                                            }
                                            table.push("</tr>");
                                        }
                                        $("#my-action tbody").append(table.join(""));
                                    } else {
                                        $("#my-action #fondiv").find("a").hide();
                                        $("#my-action #fondiv").find("span").show();
                                    }
                                }, function () { G.myLayerImgClose(); });
                            }
                        },
                        ok: function () { return true; }
                    });
                }, function () { G.maskClose(); data_stop = true; });
            }
        });

    }, function () {
        G.rollBack();
    });
}

//日志查询
function operatinglog(msg) {
    G.scrollLoad({});
    var obj = appendOperatingLog(msg);
    //绑定分页
    pageMiddle({ obj: $("#shell_pageControl"), currentPage: 0, totalPage: 0, referrer: msg.data_action }, function (myPage) {
        middleBind({ data_action: myPage });
    });
    S.request = G.ajax(msg.data_action + "&myName=" + __sysinfo.myName, function (json) {
        G.loadEnd();
        $("#currentPage").html(json.currentPage);
        $("#totalPage").html(json.totalPage);
        var table = [], bc;
        for (var i = 0; i < json.list.length; i++) {
            bc = i % 2 != 0 ? "bc" : "";
            table.push("<tr class='" + bc + "'>");
            for (var n = 0; n < json.list[i].length; n++) {
                table.push("<td>" + json.list[i][n] + "</td>");
            }
            table.push("</tr>");
        }
        obj.find("tbody").html(table.join(""));
        G.mouseover(obj.find("tbody tr"));

    }, function () {
        G.rollBack();
    });
}