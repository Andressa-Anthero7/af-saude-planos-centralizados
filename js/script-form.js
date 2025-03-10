// quando estiver pronto
$(document).ready(function(){
	// pegar o valor e length do campos nome e whatsapp
	
	
	$(document).on('keyup','.form input', function(){
		var nome = $('#nome').val();
		var whatsapp = $('#whatsapp').val().replace(/\D/g, "");// remove nao numericos e espaços vazios
		if(nome.length <= 3){
			$('#msg-erro-nome').show().html('Nome precisa ter pelo menos 3 caracteres')
		}else{
			$('#msg-erro-nome').hide();
		}

		if(whatsapp.length == 2){
			whatsapp = whatsapp.slice(0,2)
			whatsapp = whatsapp.replace(/^(\d{2})/, "($1)")
			//alert(whatsapp)
			$('#whatsapp').val(whatsapp);
			//$('#msg-erro-whatsapp').show().html('Digite somente números"')
		}else{

		}
	})

	$(document).on('blur', '.form input', function () {
		//alert('blur')
		var nome = $('#nome').val();
	    let whatsapp = $(this).val().replace(/\D/g, ""); // Remove tudo que não for número
	    if (whatsapp.length >= 10 && whatsapp.length <= 11) {
	        // Mantém o DDD e formata corretamente para fixo ou celular
	        whatsapp = whatsapp.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
	        $(this).val(whatsapp);
	        $('#msg-erro-whatsapp').hide();
	    }
	    if (whatsapp.length < 11 && nome.length > 3){
	    	$('#aceito-termos').removeAttr('disabled')
	    }
	});

})



