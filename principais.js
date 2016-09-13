function getValorComp(vComponete){
	
/*	var fRetorno = null
	var fComponente = document.getElementById(vComponete);  
	
	
	if(fComponente == null){}
	else{
		fRetorno = String(fComponente.value);
		
	}
		
	return fRetorno;*/
	var fComponentej = "#"+vComponete;
	return $(fComponentej).val();
	
}


function getValorTabela(vComp, vColuna){

	var fRetorno = null;
	
	$('#'+vComp+' tbody').on('click', 'tr', function () {
		var fValor  = $('td', this).eq(vColuna).text();
		
		fRetorno = fValor;		
								
	} );
	
	return fRetorno;
	
}

function divConfirma(vMsg) {
	 bootbox.confirm(vMsg, function(result) {
        return result;
    });
};

function CarregarJS(vURL){
	
	var script = document.createElement('script');
	script.src = vURL;
	document.body.appendChild(script);

}

function fecharForm(){
	window.close();
}

function ocultarComp(vComp){
	$("#"+vComp).hide();
}

function alterarClass(vComp, vClasse){
	document.getElementById(vComp).className = vClasse;
}

function maiuscula(vComp, vVerifica){
	
	if(String(vVerifica)=='T'){
		
		fComp = vComp.value.toUpperCase();
		vComp.value = uCase;
		
	}	
}

function exibirComp(vComp, vVisivel){
	
	if(vComp == null||vVisivel == null){}else{
		
		var fComp = "#"+vComp;
		//Exibir
		if(vVisivel){
			$(fComp).show();
		}
		//Ocultar
		if(vVisivel==false){
			$(fComp).hide();		
		}								
	}	
}

function alterarValorComp(vComp, vValor){ 
	
	if(vComp == null||vValor == null){}else{
		
		if($("#"+vComp)[0].tagName == "TEXTAREA"){
						
			$("#"+vComp).jqteVal(vValor);
		
		}else{
			
			document.getElementById(vComp).value=vValor;	
		
		}
		
	}	
}

function getVisivel(vComp){
	
	var fRetorno = false
    var fComp = "#"+vComp;
	
	if($(fComp).is(':visible')){
		fRetorno = true;
	}
  
	return fRetorno;
}

function princ_focarComp(vComp){
	
	document.getElementById(vComp).focus();
}

function princ_apenasLeitura(vComp, vVerifica){
	
    var fComp = "#"+vComp;
	
    $(fComp).prop('readonly', vVerifica);
}

function princ_ocultarComp(vComp){
	$("#"+vComp).hide();
}

function princ_extraiScript(texto){
	
	var ini = 0;
	while (ini!=-1){

		ini = texto.indexOf('<script', ini);

		if (ini >=0){
			

			ini = texto.indexOf('>', ini) + 1;

			var fim = texto.indexOf('</script>', ini);

			codigo = texto.substring(ini,fim);
			novo = document.createElement("script")
			novo.text = codigo;
			document.body.appendChild(novo)
		}
	}
}

function princ_openAjax() {
	
	var ajax;

	try{
	    ajax = new XMLHttpRequest(); // XMLHttpRequest para Firefox, Safari, dentre outros.
	}catch(ee){
	    try{
	        ajax = new ActiveXObject("Msxml2.XMLHTTP"); // Para o Internet Explorer
	    }catch(e){
	        try{
	            ajax = new ActiveXObject("Microsoft.XMLHTTP"); // Para o Internet Explorer
	        }catch(E){
	            ajax = false;
	        }
	    }
	}
	return ajax;
}

function princ_excAjax(vComp, vUrl){	    					
		var vRenderiza = document.getElementById(vComp);
        var ajax = princ_openAjax(); // Inicia o Ajax.
        ajax.open("GET", vUrl, true);
        ajax.onreadystatechange = function()
        {
            if(ajax.readyState == 1) // Quando estiver carregando, exibe: carregando...
            {
            	vRenderiza.innerHTML = "Atualizando...";
            }
            if(ajax.readyState == 4) // Quando estiver tudo pronto.
            {
                if(ajax.status == 200)
                {                	
                    var resultado = ajax.responseText;                    
                    vRenderiza.innerHTML = resultado;                    
                    princ_extraiScript(resultado);                                     
                }
                  else
                  {
                	  vRenderiza.innerHTML = "Erro Ajax";
                  }
            }
        }
        ajax.send(null); // submete			          			            
}

function princ_obterValorComp(vComp){
	
		var fComponentej = "#"+vComp;
		return $(fComponentej).val();
		
}

function princ_alterarValorComp(vComp, vValor){
	
	var fComp = "#"+vComp;		
	
	if(vComp == null||vValor == null){}else{
		
		if($("#"+vComp)[0].tagName == "TEXTAREA"){
						
			$("#"+vComp).jqteVal(vValor);
		
		}else{
			if($(fComp)[0].tagName == "SELECT"){
				
				$(fComp+" option:selected").removeAttr("selected");
				
				$(fComp+' option[value="' + vValor + '"]').attr({ selected : "selected" });
				
			}else{
				if($(fComp)[0].type == "checkbox"){
					
					if(vValor=="true"){
						$(fComp).attr('checked',true);
						document.getElementById(vComp).value=vValor;
						
					}else{
						$(fComp).removeAttr('checked');
						document.getElementById(vComp).value=vValor;
						
					}
					
				}else{
					document.getElementById(vComp).value=vValor;					
				}
								
			}						
		
		}
		
	}	
}

function princ_desabilitarComp(vComp, vVerifica){
	
	var fComponentej = "#"+vComp;
	if(vVerifica){
		
		$(fComponentej).addClass("disabled");
		
	}else{
		
		$(fComponentej).removeClass("disabled");
	}
	
}

function princ_desabilitarComp_Mate(vComp, vVerifica){
	
	var fComponentej = "#"+vComp;
	if(vVerifica){
		
		$(fComponentej).attr("disabled");
		
	}else{
		
		$(fComponentej).removeAttr("disabled");
	}
	
}

function setCheck(vComp){
	
	var fValor = princ_obterValorComp(vComp);
	
	if(fValor == "true"){

		princ_alterarValorComp(vComp, "false");
		
	}else{
		
		princ_alterarValorComp(vComp, "true");
	
	}
	
}

function princ_ocultarComp2(vComp,vVerifica){
	
	if(vVerifica){
		$("#"+vComp).hide();		
	}else{
		$("#"+vComp).show();
	}
		
}

function princ_confirma(vMsg) {
	 bootbox.confirm(vMsg, function(result) {
       return result;
   });
};

function princ_estaVisivel(vComp){
	
	var fRetorno = false
    var fComp = "#"+vComp;
	
	if($(fComp).is(':visible')){
		fRetorno = true;
	}
  
	return fRetorno;
}

function princ_abrirPopUp(vUrl, vWidth, vHeight){
	
	window.open (vUrl,"mywindow","menubar=1,resizable=1,width="+vWidth+",height="+vHeight);
}

function princ_obterIp(vUrl){
	
	var fUrl = String(vUrl);
	
	var fPosicaoIni = fUrl.indexOf("//");
	fUrl = fUrl.substring((fPosicaoIni + 2), fUrl.length);
	
	var fPosicaoFim = fUrl.indexOf(":");
	var fIp = fUrl.substring(0, fPosicaoFim); 
	
	return fIp;
	
}

function princ_formata_data(vData){
	
	var fData = "";
	
	if(vData==null){}else{
		fData = String ( vData );
		fData = fData.substr(8,2) +"/"+ fData.substr(5,2) + "/" + fData.substr(0,4);	
	}		
	
	return fData;
	
}
function princ_limparSelect(vComp){
	
	document.getElementById(vComp).options.length = 0;		
	
}

function princ_execAjaxJquery(vUrl){
	
	var fRetorno = false;
	
	$.ajax({
	     type: "POST",
	     url: vUrl,	     
	     dataType: "json",
	     success: function(json){
	    	 fRetorno = true;
	     }
	  });
	
	return fRetorno;
}

function princ_execAjaxJqueryRet(vUrl, vComp){
	
	$.ajax({
	     type: "POST",
	     url: vUrl,	     
	     dataType: "html",
	     success: function(dado){
	    	 
	    	 $("#"+vComp).html(dado);
	    	 	    	 	   
	     }
	  });		
}

function princ_limparGrade(vComp){
	
	$("#"+vComp+" tbody tr").remove();

}

function princ_limparDiv(vComp){
	 document.getElementById(vComp).innerHTML=""; 
}

//Máscaras
$(".masc-data").mask("99/99/9999");
$(".masc-cpf").mask("999-999-999-99");

