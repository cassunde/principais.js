var parameters = [];

function getValorComp(vComponete) {

    var fComponentej = "#" + vComponete;
    return $(fComponentej).val();
}

function getValorTabela(vComp, vColuna) {

    var fRetorno = null;

    $('#' + vComp + ' tbody').on('click', 'tr', function() {
        var fValor = $('td', this).eq(vColuna).text();

        fRetorno = fValor;

    });

    return fRetorno;

}

function divConfirma(vMsg) {
    bootbox.confirm(vMsg, function(result) {
        return result;
    });
};

function CarregarJS(vURL) {

    var script = document.createElement('script');
    script.src = vURL;
    document.body.appendChild(script);

}

function fecharForm() {
    window.close();
}

function ocultarComp(vComp) {
    $("#" + vComp).hide();
}

function alterarClass(vComp, vClasse) {
    document.getElementById(vComp).className = vClasse;
}

function maiuscula(vComp, vVerifica) {

    if (String(vVerifica) == 'T') {

        fComp = vComp.value.toUpperCase();
        vComp.value = uCase;

    }
}

function princ_exibirComp(vComp, vVisivel) {
    if (vComp != null || vVisivel != null) {
        if (vVisivel) {
            document.getElementById(vComp).style.display = "inline";
        }
        if (!vVisivel) {
            document.getElementById(vComp).style.display = "none";
        }
    }
}

function alterarValorComp(vComp, vValor) {

    if (vComp != null && vValor != null && vValor != undefined) {

        if (vComp.indexOf(":") != -1) {
            var param = vComp.split(":");
            var form = document.getElementById(param[0]);

            for (var i = 0; i < form.elements.length; i++) {
                if (form.elements[i].id == param[1]) {
                    form.elements[i].value = vValor;
                }
            }

        } else {
            document.getElementById(vComp).value = vValor;
        }

    } else {
        console.log("Component " + vComp + " not foud or value " + vValor + " inálido");
    }
}

function getVisivel(vComp) {

    var fRetorno = false
    var fComp = "#" + vComp;

    if ($(fComp).is(':visible')) {
        fRetorno = true;
    }

    return fRetorno;
}

function princ_focarComp(vComp) {

    document.getElementById(vComp).focus();
}

function princ_apenasLeitura(vComp, vVerifica) {

    var fComp = "#" + vComp;

    $(fComp).prop('readonly', vVerifica);
}

function princ_ocultarComp(vComp) {
    $("#" + vComp).hide();
}

function princ_extraiScript(texto) {

    var ini = 0;
    while (ini != -1) {

        ini = texto.indexOf('<script', ini);

        if (ini >= 0) {


            ini = texto.indexOf('>', ini) + 1;

            var fim = texto.indexOf('</script>', ini);

            codigo = texto.substring(ini, fim);
            novo = document.createElement("script")
            novo.text = codigo;
            document.body.appendChild(novo)
        }
    }
}

function princ_openAjax() {

    var ajax;

    try {
        ajax = new XMLHttpRequest(); // XMLHttpRequest para Firefox, Safari, dentre outros.
    } catch (ee) {
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP"); // Para o Internet Explorer
        } catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP"); // Para o Internet Explorer
            } catch (E) {
                ajax = false;
            }
        }
    }
    return ajax;
}

function princ_excAjax(vComp, vUrl) {
    var vRenderiza = document.getElementById(vComp);
    var ajax = princ_openAjax(); // Inicia o Ajax.
    ajax.open("GET", vUrl, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 1) // Quando estiver carregando, exibe: carregando...
        {
            vRenderiza.innerHTML = "Atualizando...";
        }
        if (ajax.readyState == 4) // Quando estiver tudo pronto.
        {
            if (ajax.status == 200) {
                var resultado = ajax.responseText;
                vRenderiza.innerHTML = resultado;
                var para = vUrl.split("?");
                if (para.length >= 2) {
                    parameters = [];
                    var val = para[1].split("&");
                    for (var i = 0; i < val.length; i++) {
                        parameters.push(JSON.parse('{"pa":"' + val[i].split("=")[0] + '","val":"' + val[i].split("=")[1] + '"}'));
                    };
                }
                princ_extraiScript(resultado);
            } else {
                vRenderiza.innerHTML = "Erro Ajax";
            }
        }
    }
    ajax.send(null); // submete
}

function princ_excAjaxJson(vUrl, funcao) {
    var ajax = princ_openAjax(); // Inicia o Ajax.
    ajax.open("GET", vUrl, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 1) // Quando estiver carregando, exibe: carregando...
        {
            vRenderiza.innerHTML = "Carregando...";
        }
        if (ajax.readyState == 4) // Quando estiver tudo pronto.
        {
            if (ajax.status == 200) {
                funcao(JSON.parse(ajax.responseText));
            } else {
                console.log("erro");
            }
        }
    }
    ajax.send(null); // submete
}

function princ_excAjaxJsonTipo(vUrl, funcao, tipo) {
    princ_exibirComp("loading", true);
    var ajax = princ_openAjax(); // Inicia o Ajax.
    ajax.open(tipo, vUrl, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 1) // Quando estiver carregando, exibe: carregando...
        {
            vRenderiza.innerHTML = "Carregando...";
        }
        if (ajax.readyState == 4) // Quando estiver tudo pronto.
        {
            if (ajax.status == 200) {
                funcao(JSON.parse(ajax.responseText));
                princ_exibirComp("loading", false);
            } else {
                console.log("erro " + ajax.status);
                princ_exibirComp("loading", false);
            }
        }
    }
    ajax.send(null); // submete
}


function princ_obterValorComp(vComp) {
    try {
        if (vComp.indexOf(":") != -1) {
            var param = vComp.split(":");
            var form = document.getElementById(param[0]);
            for (var i = 0; i < form.elements.length; i++) {
                if (form.elements[i].id == param[1]) {
                    return form.elements[i].value;
                }
            }
        } else {
            return document.getElementById(vComp).value;
        }
    } catch (e) {
        console.log("Component not found --> " + vComp);
        console.log(e);
    }
}

function princ_alterarValorComp(vComp, vValor) {

    var fComp = "#" + vComp;

    if (vComp == null || vValor == null) {} else {

        if ($(fComp).tagName == "TEXTAREA") {

            $(fComp).jqteVal(vValor);

        } else {
            if ($(fComp).tagName == "SELECT") {

                $(fComp + " option:selected").removeAttr("selected");

                $(fComp + ' option[value="' + vValor + '"]').attr({ selected: "selected" });

            } else {
                if ($(fComp).type == "checkbox") {

                    if (vValor == "true") {
                        $(fComp).attr('checked', true);
                        document.getElementById(vComp).value = vValor;

                    } else {
                        $(fComp).removeAttr('checked');
                        document.getElementById(vComp).value = vValor;

                    }

                } else {
                    document.getElementById(vComp).value = vValor;
                }

            }

        }

    }
}

function princ_desabilitarComp(vComp, vVerifica) {
    if (vVerifica) {
        document.getElementById(vComp).disabled = true;
    } else {
        document.getElementById(vComp).disabled = false;
    }
}

function princ_desabilitarComp_Mate(vComp, vVerifica) {

    var fComponentej = "#" + vComp;
    if (vVerifica) {

        $(fComponentej).attr("disabled");

    } else {

        $(fComponentej).removeAttr("disabled");
    }

}

function setCheck(vComp) {

    var fValor = princ_obterValorComp(vComp);

    if (fValor == "true") {

        princ_alterarValorComp(vComp, "false");

    } else {

        princ_alterarValorComp(vComp, "true");

    }

}

function princ_ocultarComp2(vComp, vVerifica) {

    if (vVerifica) {
        $("#" + vComp).hide();
    } else {
        $("#" + vComp).show();
    }

}

function princ_confirma(vMsg) {
    bootbox.confirm(vMsg, function(result) {
        return result;
    });
};

function princ_estaVisivel(vComp) {

    var fRetorno = false
    var fComp = "#" + vComp;

    if ($(fComp).is(':visible')) {
        fRetorno = true;
    }

    return fRetorno;
}

function princ_abrirPopUp(vUrl, vWidth, vHeight) {

    window.open(vUrl, "mywindow", "menubar=1,resizable=1,width=" + vWidth + ",height=" + vHeight);
}

function princ_obterIp(vUrl) {

    var fUrl = String(vUrl);

    var fPosicaoIni = fUrl.indexOf("//");
    fUrl = fUrl.substring((fPosicaoIni + 2), fUrl.length);

    var fPosicaoFim = fUrl.indexOf(":");
    var fIp = fUrl.substring(0, fPosicaoFim);

    return fIp;

}

function princ_obterParametroUrl(param) {

    var url = String(location.href).split("?");
    var params = url[1].split("&");

    for (var i = 0; i < params.length; i++) {
        var paramActual = params[i].split("=");
        if (paramActual[0] == param) {
            return paramActual[1];
        }
    }
}


function princ_formata_data(vData, vTipo) {

    var fData = "";

    if (vData != null) {
        var data = new Date(vData);
        var dia = data.getDate();
        if (dia.toString().length == 1)
            dia = "0" + dia;
        var mes = data.getMonth() + 1;
        if (mes.toString().length == 1)
            mes = "0" + mes;
        var ano = data.getFullYear();
        //tempo
        if (vTipo == null || vTipo == 1) {
            var hora = data.getHours();
            var minutos = data.getMinutes();
            if (minutos < 10) {
                minutos = "0" + minutos;
            }
            var segunds = data.getSeconds();
            if (segunds < 10) {
                segunds = "0" + segunds;
            }
            return dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos + ":" + segunds;
        } else if (vTipo == 2) {
            return dia + "/" + mes + "/" + ano;
        } else if (vTipo == 3) {
            var hora = data.getHours();
            var minutos = data.getMinutes();
            if (minutos < 10) {
                minutos = "0" + minutos;
            }
            var segunds = data.getSeconds();
            if (segunds < 10) {
                segunds = "0" + segunds;
            }
            return hora + ":" + minutos + ":" + segunds;
        }

    }

}

function princ_formata_hora(vHora) {

    var hourObj = new Date(vHora);
    var hora = hourObj.getHours();
    var minutos = hourObj.getMinutes();
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    return hora + ":" + minutos;
}

function princ_limparSelect(vComp) {
    document.getElementById(vComp).options.length = 1;
}

function princ_emptySelect(vComp) {
    document.getElementById(vComp).options.length = 0;
}

function princ_execAjaxJquery(vUrl) {

    var fRetorno = false;

    $.ajax({
        type: "POST",
        url: vUrl,
        dataType: "json",
        success: function(json) {
            fRetorno = true;
        }
    });

    return fRetorno;
}

function princ_execAjaxJqueryRet(vUrl, vComp) {

    $.ajax({
        type: "POST",
        url: vUrl,
        dataType: "html",
        success: function(dado) {

            $("#" + vComp).html(dado);

        }
    });
}

function princ_limparGrade(vComp) {

    $("#" + vComp + " tbody tr").remove();

}

function princ_limparDiv(vComp) {
    document.getElementById(vComp).innerHTML = "";
}

function princ_loadJS(url) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
};

function princ_loadSelect(comp, data) {
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].guiche);

            var x = document.getElementById("checkin.fkguiche");
            var c = document.createElement("option");
            c.text = data[i].guiche;
            c.value = data[i].pkguiche;
            x.options.add(c, x.options.length + 1);

        }
    } else {
        console.log("limpar grade");
    }
}

function btnSalvarGeral(urlTest, tipo, values, func) {
    $.ajax({
        type: tipo,
        url: urlTest,
        dataType: "json",
        data: values,
        success: function(data) {
            func(data);
        },
        error: function(data) {
            console.error("ERROR no " + urlTe);
        }
    })
}

function princ_saveForm(comp, func) {
    var idForm = comp.parentElement.parentElement.parentElement.id;
    var actionForm = comp.parentElement.parentElement.parentElement.action;
    var method = comp.parentElement.parentElement.parentElement.method;
    $.ajax({
        url: actionForm,
        type: method,
        data: $("#" + idForm).serialize(),
        success: function(data) {
            func(data);
        },
        error: function(data) {
            msg('danger', data);
        }
    });
}

function princ_saveForm2(comp, func) {
    princ_exibirComp("loading", true);
    var idForm = comp.id;
    var actionForm = comp.action;
    var method = comp.method;
    if (princ_checkForm(idForm)) {
        $.ajax({
            url: actionForm,
            type: method,
            data: $("#" + idForm).serialize() + "&to=" + sessionStorage.getItem("to"),
            success: function(data) {
                func(data);
                princ_exibirComp("loading", false);
            },
            error: function(data) {
                console.log(data);
                func(data);
                princ_exibirComp("loading", false);
            }
        });
    }
}

function princ_saveForm3(comp, func) {
    $('#' + comp).submit(function(event) {
        princ_exibirComp("loading", true);
        $.ajax({
                type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url: this.action, // the url where we want to POST
                data: $("#" + this.id).serialize() + "&to=" + sessionStorage.getItem("to"),
                dataType: 'json', // what type of data do we expect back from the server
                encode: true
            })
            .done(function(data) {
                func(data);
                princ_exibirComp("loading", false);
            })
            .fail(function(data) {
                func(data);

            });
        princ_exibirComp("loading", false);
        event.preventDefault();
    });
}


function princ_cancelForm(form, tab) {
    princ_emptyForm(form);
    if (tab != null) {
        princ_toTab(tab)
    }
}

function princ_emptyForm(form) {
    var form = document.getElementById(form);
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].tagName == 'INPUT' || form.elements[i].tagName == 'SELECT') {
            form.elements[i].value = "";
        }
    }
}

function princ_onlyReadForm(form, check) {
    var form = document.getElementById(form);
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].tagName == 'INPUT' || form.elements[i].tagName == 'SELECT') {
            if (check) {
                form.elements[i].disabled = true;
            } else {
                form.elements[i].disabled = false;
            }

        }
    }
}


function princ_checkForm(form) {
    var form = document.getElementById(form);
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].required && form.elements[i].value == "") {
            console.log(form.elements[i].value);
            form.elements[i].focus();
            msg('warning', ' Existe campo Obrigatório');
            return false;
        }
    }
    return true;
}

function princ_addEvent(comp, ev, func) {
    if (comp != null || ev != null || func != null) {
        try {
            document.getElementById(comp).addEventListener(ev, func);
        } catch (e) {
            console.log("Problema para add no componente " + comp);
            console.log(e);
        }
    }
}

function princ_change_title(title) {
    document.title = title;
    princ_insertHTML("lbTitleForm", title);
}

function princ_toTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}

function princ_insertHTML(comp, valor) {
    document.getElementById(comp).innerHTML = valor;
}

function princ_appendHTML(comp, valor) {
    $("#" + comp).append(valor);
}



function getDayWeek(day) {
    if (day > -1) {
        if (day == 0) {
            return "Domingo"
        }
        if (day == 1) {
            return "Segunda"
        }
        if (day == 2) {
            return "Terça"
        }
        if (day == 3) {
            return "Quarta"
        }
        if (day == 4) {
            return "Quinta"
        }
        if (day == 5) {
            return "Sexta"
        }
        if (day == 6) {
            return "Sábado"
        }
    }
}

function princ_json_to_str(data) {
    if (data != null) {
        return JSON.stringify(data);
    } else {
        console.log('json is null');
    }
}

function princ_str_to_json(str) {
    if (str != null) {
        return JSON.parse(str);
    } else {
        console.log('String is null');
    }

}

function princ_leftZero(value, qnt) {
    var qntActual = value.length;
    if (qnt > qntActual) {
        var zeros = "";
        for (var i = 0; i < (qnt - qntActual); i++) {
            zeros = zeros + "0";
        }
        return zeros + value;
    }
}

function princ_age(birthday) {
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        a = new Date(birthday),
        quantos_anos = ano_atual - a.getFullYear();

    return quantos_anos < 0 ? 0 : quantos_anos;
}

function princ_substring(text, qnt) {
  if(text!=null && qnt != null && parseInt(qnt) > 0){
    return text.substring(0, qnt) + "...";
  }
    return "";
}
