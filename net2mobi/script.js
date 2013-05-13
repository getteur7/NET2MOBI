 //Creation d'une page par defaut
function rafraichirJScroll()
{
	//Integration DATABASE 28/10/11 : pour rafraichir le scroll personnalis�
	/*var element = $('#scroll').jScrollPane();
	var api = element.data('jsp');
	api.reinitialise();*/
}


function rgb2hex(rgb) {
	var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function deposerComposant(type, obj)
{
	var composant = new Composant(type, site.nbComposantSite('get'));
	site.pages[site.activePage].corps.push(composant);
				
	obj.html(site.pages[site.activePage].corps[site.pages[site.activePage].staticCompteurComposant('get') - 1].code());	
	
	//edition background nouveaux composants pour page type bloc
	if(site.apparence == siteBloc && composant.type != separateur)
	{
		obj.css("background", $("#couleurBloc").val());
		obj.find(".composant").css({"padding-left":site.espacementInterneBloc, "padding-right":site.espacementInterneBloc})
	}
	
	if(composant.type != separateur)
	{
		obj.find(".composant").css("padding-bottom", site.espacementCompo);
	}
	
	rafraichirJScroll(); //Integration MI 28/10/11
	
	$("#scroll").trigger('change');
}

function updatePageListe()
{
	$("#scrollPageListe table").html('');


$('#listePageCible option').remove();
	for(var i = 0; i < site.pages.length; i++)
	{
		var titre = site.nom + '.net2.mobi/' + site.pages[i].name + '.mobi';
		$("#scrollPageListe table").append("<tr class='" + ((site.activePage == i)? "selectedPage" : "") + "'><td class='tdLienPage'><span class='lienPage' title='" + titre + "'><span>" + site.nom + ".net2.mobi/</span><span class='nomPage'>" + site.pages[i].name + "</span><span class='indexPage' style='display:none'>" + i + "</span><input class='inputRenommerPage' type='text' style='display:none' value='" + site.pages[i].name + "'/></span><button class='validerRenommerPage' style='display:none'>Valider</button></td><td><div class='renommerPage'></div></td><td><div class='radioBoutonAccueil'><img class='declencheurRadioPageAccueil' src='img/icone/" + ((site.pages[i].accueil)? "radio_plein" : "radio_vide") + ".png'/></div><div class='iconeAccueil'></div></td><td><div class='supprimerPage'></div></td></tr>");
		
		$('#listePageCible').append("<option " + ((site.pages[i].accueil)?"selected":"") + ">" + site.pages[i].name + "</option>");
	}
	
	//$("#scrollPageListe").trigger('change');
}

function updateNbPage()
{
	$('#nombrePage').html(site.pages.length);
}

/*	0:	composant
	1:	editeur
	2:	ctyleCommun
	3:	partage*/
	

function getIdActiveTab()
{
	switch(animation)
	{
		case 0: 
			return "#composant";
			break;
		case 1: 
			return "#editerAnimation";
			break;
		case 2: 
			return "#styleCommuns";
			break;
		case 3: 
			return "#partage";
			break;
	}
}

/*function afficherEditer()
{ 
	var id = getIdActiveTab();
	if(animation != 1)
	{
		animation = 1;		
		$(id).animate({height : '0px'}, 600, function(){$(id).hide();});
		$("#editerAnimation").show();
		$("#editerAnimation").animate({height : '320px'}, 600, function(){});
	}	
}	*/

				
function afficherComposant()
{ 
	var id = getIdActiveTab();
	if(animation != 0)
	{
		animation = 0;		
		$(id).animate({height : '0px'}, 600, function(){$(id).hide();});
		$("#composant").show();
		$("#composant").animate({height : '320px'}, 600, function(){});
	}	
}

function afficherStylesCommuns()
{ 
	var id = getIdActiveTab();
	if(animation != 2)
	{
		animation = 2;		
		$(id).animate({height : '0px'}, 600, function(){$(id).hide();});
		$("#styleCommuns").show();
		$("#styleCommuns").animate({height : '320px'}, 600, function(){});
	}
}

function afficherPartage()
{ 
var id = getIdActiveTab();
	if(animation != 3)
	{
		animation = 3;		
		$(id).animate({height : '0px'}, 600, function(){$(id).hide();});
		$("#partage").show();
		$("#partage").animate({height : '320px'}, 600, function(){});
	}
}

function refreshImage(filename, res, id)
{	
	if(res == "res_error")
	{
		//$("#uploadStatus").html("Erreur de t�l�chargement");
	}
	else if(res == "res_success") {
		//$("#uploadStatus").html("Fichier t�l�charg�");
		if(id == 'upload_icone')
		{
			if($(".ico").find('img').length == 0)
				$('.ico').append("<img class='imageIcone' alt='ico' />")
			
			$(".ico").find('img').attr("src", filename);
			site.icoSrc = filename;
		}
		else if(id == 'upload_image_menu')
		{
			$("#image_menu").attr("src", filename);
			$("#" + $(".edition_id").val() + " .thumbnail").attr("src", filename);
			site.pages[site.activePage].getComposantById($(".edition_id").val()).thumbnail = true;
			site.pages[site.activePage].getComposantById($(".edition_id").val()).attributs.src = filename;
		}
		else if(id == 'paraEditeur')
		{
			tinyMCE.get('paraEditeur').selection.setContent("<img src='" + filename + "' style='width:" + $('input[type=radio][name=selectTailleUpload]:checked').val() + ";" + $("#selectAlignementUpload option:selected").attr("class") + ":" + $("#selectAlignementUpload option:selected").val() + ";" + $('input[type=radio][name=selectFormeUpload]:checked').val() + "'/>");
		}
		else
		{
			$("#" + id + " .imageCompo").attr("src", filename);
			site.pages[site.activePage].getComposantById(id).attributs.src = filename;
			//alert(site.pages[site.activePage].getComposantById(id).attributs.src);
		}
	}
}

/*function fbs_click()
							{
								u="www.monsite.mobi";
								t="gfgdfg";
								window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
								return false;
							}*/
							
function degradeGen(c1, c2)
{
	if(navigateur == NAV_CHROME)
		return '-webkit-gradient(linear, center top, center bottom, from(' + c1 + '), to(' + c2 + '))';
	else if(navigateur == NAV_FIREFOX)
		return '-moz-linear-gradient(center top , ' + c1 + ', ' + c2 + ' 90%)';
	else
		return c1;
}

$(function()
{
	site.newPage(true);
	envoi('', 'navigateur.php', 'detectNav');
	updatePageListe();
	$('#varNomPage').html(site.pages[site.activePage].name);
	updateNbPage();
	
	$("img").mousedown(function(){
    	return false;
	});
	
	//gestion apercu tri et deposer
	$("#elements").sortable
	({
            
                containment: '#elements',
		axis : 'y',
		placeholder: 'placeholder2',
		//items: "li:not(.placeholder, .notSortable, .sepaFixe)",
		disabled: false,		
		forcePlaceholderSize: true,
		
		stop : function(event, ui)
		{
			ui.item.removeClass('outil ui-draggable');
			if(ui.item.find('div').hasClass('element_textbox')) //Ajout d'un element textbox
			{	
				deposerComposant(textbox, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_bouton')) //Ajout d'un element bouton
			{	
				deposerComposant(button, ui.item);		
			}
			else if(ui.item.find('div').hasClass('element_listederoulante')) //Ajout d'un element combobox
			{
				deposerComposant(combobox, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_insererimage')) //Ajout d'un element image
			{
				deposerComposant(image, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_menu')) //Ajout d'un element menu
			{
				deposerComposant(menu, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_paragraphe')) //Ajout d'un element paragraphe
			{
				deposerComposant(paragraphe, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_actualite')) //Ajout d'un element actualite
			{
				deposerComposant(actualite, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_titre')) //Ajout d'un element titre
			{
				deposerComposant(titre, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_checkbox')) //Ajout d'un element checkbox
			{
				deposerComposant(checkbox, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_radiobutton')) //Ajout d'un element radiobutton
			{
				deposerComposant(radiobutton, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_separateur')) //Ajout d'un element separateur
			{
				deposerComposant(separateur, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_video')) //Ajout d'un element video
			{
				deposerComposant(video, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_contact')) //Ajout d'un element contact
			{
				deposerComposant(contact, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_paypal')) //Ajout d'un element payement
			{
				deposerComposant(payement, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_partage')) //Ajout d'un element partage
			{
				deposerComposant(partage, ui.item);	
			}
			else if(ui.item.find('div').hasClass('element_rating')) //Ajout d'un element rating
			{
				deposerComposant(rating, ui.item);	
			}
			
			/*console.log("first " + ui.item.index() + "  " + $("#elements li").length);
			if(ui.item.index() == $("#elements li").length - 1)
				ui.item.insertBefore($('.sepaBas'));
			console.log("second " + ui.item.index() + "  " + $("#elements li").length);*/

			posStop = ui.item.index() - 1;
			if(posStop > posStart)
				site.pages[site.activePage].descendre(posStart, posStop);
			else if(posStop < posStart)
				site.pages[site.activePage].monter(posStart, posStop);


		},
		start : function(event, ui)
		{
			
			posStart = ui.item.index() - 1;
			
		},
		receive : function(event, ui)
		{
					
			site.pages[site.activePage].staticCompteurComposant('increment');
			site.nbComposantSite('increment');
			
			$(this).find('.placeholder').hide();
		}
		
	})/*.droppable({
		hoverClass : "dropover",
                containment: '#elements',
		drop: function( event, ui )
		{
			
			site.pages[site.activePage].staticCompteurComposant('increment');
			site.nbComposantSite('increment');
			elementli = $( "<li></li>" ).appendTo(this);
			//elementli = $( "<li></li>" ).insertBefore($(".sepaBas"));
			if(ui.draggable.find('div').hasClass('element_textbox')) //Ajout d'un element textbox
			{
				deposerComposant(textbox, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_bouton')) //Ajout d'un element bouton
			{
				deposerComposant(button, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_listederoulante')) //Ajout d'un element combobox
			{
				deposerComposant(combobox, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_insererimage')) //Ajout d'un element image
			{
				deposerComposant(image, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_menu')) //Ajout d'un element menu
			{
				deposerComposant(menu, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_paragraphe')) //Ajout d'un element paragraphe
			{
				deposerComposant(paragraphe, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_actualite')) //Ajout d'un element actualite
			{
				deposerComposant(actualite, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_titre')) //Ajout d'un element titre
			{
				deposerComposant(titre, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_checkbox')) //Ajout d'un element checkbox
			{
				deposerComposant(checkbox, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_radiobutton')) //Ajout d'un element radiobutton
			{
				deposerComposant(radiobutton, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_separateur')) //Ajout d'un element separateur
			{
				deposerComposant(separateur, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_video')) //Ajout d'un element video
			{
				deposerComposant(video, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_contact')) //Ajout d'un element contact
			{
				deposerComposant(contact, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_paypal')) //Ajout d'un element payement
			{
				deposerComposant(payement, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_partage')) //Ajout d'un element partage
			{
				deposerComposant(partage, elementli);
			}
			else if(ui.draggable.find('div').hasClass('element_rating')) //Ajout d'un element rating
			{
				deposerComposant(rating, elementli);
			}
			else
			{
				$( "<li></li>" ).html(ui.draggable.html()).appendTo(this);
				//$( "<li></li>" ).html(ui.draggable.html()).insertBefore($(".sepaBas"));
			}

			$("#elements").droppable("option", "disabled", true);
			$("#elements").sortable("option", "disabled", false);
			$(this).find('.placeholder').hide();
		}
	})*/;
	//gestion palette glisser, connexion avec apercu
	$(".bloccomposant li").draggable
	({
	 	revert : 'invalid',
	 	helper : 'clone',
		opacity : 0.5,
		connectToSortable : "#elements"
	});
	
	//script suppression element
	$('.bouton_supprimer').live("click", function()
	{
		options = { };

		$(this).parent(".composant").animate({"opacity":"0"}, 300, suppr($(this)) );
		
		function suppr(elt)
		{
			
			/*setTimeout
			(function() {*/
				$("#scroll").trigger('change');
				var index = site.pages[site.activePage].getIndexById(elt.parent().parent().attr('id'));
				if(site.selectedElement == site.pages[site.activePage].corps[index].num)
				{
					site.selectedElement = -1;
					editor.hide();
					afficherComposant();
				}
				
				site.pages[site.activePage].supprimer(index);

				elt.parent().parent().parent().remove();
				
				if(site.pages[site.activePage].staticCompteurComposant('decrement') == 0)
				{
					$("#elements").droppable("option", "disabled", false);
					$("#elements").sortable("option", "disabled", true);
					
					$( "#elements").find('.placeholder').removeAttr( "style" ).hide().fadeIn();
				}
				
				
			/*}, 500);*/
		}
		
		rafraichirJScroll(); //Integration MI 28/10/11
	});
	//Gestion selection
	$('.composant').live("click", function(e)
	{
		var composant = site.pages[site.activePage].getComposantById($(this).attr('id'));
		if(composant.num == site.selectedElement)
			return;
		/*if($(e.currentTarget).hasClass('boutons'))
		{
			return;
		}*/
		//console.log('fffdfg');
		
		if(composant.num != site.selectedElement)
		{
			if(site.selectedElement != -1)
			{
				var str = '#' + site.pages[site.activePage].getComposantByNum(site.selectedElement).attributs.id;
				$(str).removeClass('selected');
				$(str).find('.boutons').hide('fade', 300);
			}
			
			$(this).addClass('selected');
			$(this).find('.boutons').show('fade', 300);
			site.selectedElement = composant.num;
			
			reinitEditeur();
			$("#chargement").show();
			
			setTimeout
			(function() {
				if(composant.type == textbox)
				{
					editor = new textboxEditor(composant);
					$('#essai').html('sdfdfsdf');
					editor.show();
				}
				else if(composant.type == button)
				{
					editor = new buttonEditor(composant);
					editor.show();
				}
				else if(composant.type == combobox)
				{
					editor = new comboboxEditor(composant);
					editor.show();
				}
				else if(composant.type == image)
				{
					editor = new imageEditor(composant);
					editor.show();
				}
				else if(composant.type == menu)
				{
					editor = new menuEditor(composant);
					editor.show();
				}
				else if(composant.type == actualite)
				{
					editor = new actuEditor(composant);
					editor.show();
				}
				else if(composant.type == paragraphe)
				{
					editor = new paragrapheEditor(composant);
					editor.show();
				}
				else if(composant.type == separateur)
				{
					editor = new separateurEditor(composant);
					editor.show();
				}
				else if(composant.type == checkbox || composant.type == radiobutton)
				{
					editor = new checkboxEditor(composant);
					editor.show();
				}
				else if(composant.type == video)
				{
					editeurVideo(composant);
				}
				else if(composant.type == contact)
				{
					editeurContact(composant);
				}
				else if(composant.type == payement)
				{
					editeurPayement(composant);
				}
				else if(composant.type == partage)
				{
					editeurPartage(composant);
				}
				else if(composant.type == rating)
				{
					editeurRating(composant);
				}
				
			}, 300);
		}
		
	});
	
	$('.composant').live("dblclick", function(e)
	{

		afficherEditer();

		/*setTimeout(function(){
			$(this).trigger('click');
		}, 2000);*/

		
		
	});
	//Sauvegarde nom du site
	$('#domain_name').keyup(function()
	{
		site.nom = $(this).val();
	});
	//Animation bouton supprimer
	/*$('.composant').live('mouseover', function()
	{
		if(timerSupprimer[1] == $(this).attr('id'))
		{
			clearTimeout(timerSupprimer[0]);
			timerSupprimer[1] = "";
		}
		else
		{
			$('.composant').children('.boutons').hide('fade', 300);
			$(this).children('.boutons').show('fade', 300);
		}
	});
	$('.composant').live('mouseout', function(e)
	{
		elemToSuppr = '#' + $(this).attr('id');
		timerSupprimer[0] = setTimeout(function(){$(elemToSuppr).children('.boutons').hide('fade', 300); timerSupprimer[1] = "";},"200");
		timerSupprimer[1] = $(this).attr('id');
	});*/
	
	$(document).ready(function()
	{
		/*envoi("", "CmdLoadAllSites.php", 'loadNomSite');*/
	});
	//creation et sauvegarde site
	$('#btn_validate').click(function()
	{
		site.nom = $('.inputUrl').val();
		site.type = 'site';
		
		var divTemp = $('<div></div>');
		divTemp.html($('#elements').html());
		divTemp.find('.boutons').hide();
		divTemp.find('.composant').removeClass('selected');
		site.pages[site.activePage].htmlApercu = divTemp.html()/*$('#elements').html()*/;
		site.selectedElement = -1;

		var reg=new RegExp("(&)", "g");
		temp = $.toJSON(site);
		temp = temp.replace(reg, "%26");
		envoi(temp, "generate.php", 'generate');
		
	
	});
	
	$('#btn_validateTheme').click(function()
	{
		site.nom = $('.inputUrl').val();
		site.type = 'theme';
		
		var divTemp = $('<div></div>');
		divTemp.html($('#elements').html());
		divTemp.find('.boutons').hide();
		divTemp.find('.composant').removeClass('selected');
		site.pages[site.activePage].htmlApercu = divTemp.html()/*$('#elements').html()*/;
		site.selectedElement = -1;

		var reg=new RegExp("(&)", "g");
		temp = $.toJSON(site);
		temp = temp.replace(reg, "%26");
		envoi(temp, "index.php/db_manager/save", 'save');
		
	
	});
	
	$('.btnOk2').live('click', function()
	{
		showModalDialog('dialog_box_loading', 'dialog-overlay');
		envoi($('.' + $('#listeOngletTheme .titreActif').attr('id') + ' .themeActuel').attr("id"), "index.php/db_manager/load", 'loadTheme');
	});
	
	/*$('#charger').click(function()
	{
		envoi($("#listeSite").val(), "chargement.php", 'load');
		$('#domain_name').attr('value', site.nom);
	});*/
	/*$('#supprSite').click(function()
	{
		envoi($("#listeSite").val(), "CmdDeleteSiteByName.php", 'suppr');
		$("#listeSite option[value=" + $("#listeSite").val() + "]").remove();
	});*/
	$('#supprAll').click(function()
	{
		envoi("", "CmdDeleteAllSites.php", 'supprAll');
		$("#listeSite option").remove();
	});
	
	
	$('input[type=radio][name=fond]').change(function()
	{
		if($('input[type=radio][name=fond]:checked').attr('value') == 'unie')
		{
			site.backgroundType = unie;
			$('#ecran').css({'background': '-moz-linear-gradient(center top , ' + site.backgroundColor + ', '+site.backgroundColor+') repeat scroll 0 0 transparent'});
			$('#ecran1').css({'background': '-webkit-gradient(linear, center top , center bottom, from('+site.backgroundColor+'), to('+site.backgroundColor+'))'});
		}
		else if($('input[type=radio][name=fond]:checked').attr('value') == 'degrade')
		{
			site.backgroundType = degrade;
			$('#ecran').css({'background': '-moz-linear-gradient(center top , ' + site.backgroundColor1 + ', '+site.backgroundColor2+') repeat scroll 0 0 transparent'});
			$('#ecran1').css({'background': '-webkit-gradient(linear, center top , center bottom, from('+site.backgroundColor1+'), to('+site.backgroundColor2+'))'});
		}
		else if($('input[type=radio][name=fond]:checked').attr('value') == 'texture')
		{
			site.backgroundType = texture;
		}
		
		$('#para').html($(this).attr('value'));
		$('#para').html($('#para').html() + site.backgroundType);
	});															
	
	/*$('#colorSelectorFond').ColorPicker
	({
		color: site.backgroundColor,
		onShow: function (colpkr)
		{
			if($('input[type=radio][name=fond]:checked').attr('value') == 'unie')
				$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			site.backgroundColor = '#' + hex;
			$('#colorSelectorFond').css('backgroundColor', site.backgroundColor);
			$('#ecran').css({'background': '-moz-linear-gradient(center top , ' + site.backgroundColor + ', '+site.backgroundColor+') repeat scroll 0 0 transparent'});
			$('#ecran1').css({'background': '-webkit-gradient(linear, center top , center bottom, from('+site.backgroundColor+'), to('+site.backgroundColor+'))'});
		}
	});*/
	
	/*$('#colorSelectorFond1').ColorPicker
	({
		color: site.backgroundColor1,
		onShow: function (colpkr) {
			if($('input[type=radio][name=fond]:checked').attr('value') == 'degrade')
				$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			site.backgroundColor1 = '#' + hex;
			$('#colorSelectorFond1').css('backgroundColor', site.backgroundColor1);
			$('#ecran').css({'background': '-moz-linear-gradient(center top , ' + site.backgroundColor1 + ', '+site.backgroundColor2+') repeat scroll 0 0 transparent'});
			$('#ecran1').css({'background': '-webkit-gradient(linear, center top , center bottom, from('+site.backgroundColor1+'), to('+site.backgroundColor2+'))'});
			
		}
	});*/
	
	/*$('#colorSelectorFond2').ColorPicker
	({
		color: site.backgroundColor2,
		onShow: function (colpkr) {
			if($('input[type=radio][name=fond]:checked').attr('value') == 'degrade')
				$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			site.backgroundColor2 = '#' + hex;
			$('#colorSelectorFond2').css('backgroundColor', site.backgroundColor2);
			$('#ecran').css({'background': '-moz-linear-gradient(center top , ' + site.backgroundColor1 + ', '+site.backgroundColor2+') repeat scroll 0 0 transparent'});
			$('#ecran1').css({'background': '-webkit-gradient(linear, center top , center bottom, from('+site.backgroundColor1+'), to('+site.backgroundColor2+'))'});
		}
	});*/
	
	
	$('#ajouter_num').live('click', function()
	{
		
		$('#ajouter_num').remove();
		$('#listNum').append('<div><input type="text" class="num inputNum" value="" /><span class="supprimer_num" style="float:right;display:inline-block;padding-top:4px"><img src="images/supprimer.png" /></span></div><div id="ajouter_num">ajouter numero...</div>');
		
		
	});
	$('#ajouter_email').live('click', function()
	{
		
		$('#ajouter_email').remove();
		$('#listEmail').append('<div><input type="text" class="inputEmail" value="" /><span class="supprimer_num" style="float:right;display:inline-block;padding-top:4px"><img src="images/supprimer.png" /></span></div><div id="ajouter_email">ajouter email...</div>');
		
		
	});
	
	$('.supprimer_num').live('click', function()
	{
		$(this).parent().remove();
	});
	
	$('#partage_sms').live('click', function()
	{
		var text = '';
		for(i = 0; i < $('.inputNum').length; i++)
		{
			text += $('.inputNum').eq(i).val();
			if(i != $('.inputNum').length - 1)
				text += '|';
		}
		var msgPerso = $("#msgperso").val();
		
		var json = '{"to":"' + text + '", "msgperso":"' + msgPerso + '", "expediteur":"' + $("#expediteur").val() + '", "msg":"De la part de net2mobi"}';
		$("#resultat").html(json);
		envoi(json, "partageSms.php", 'partage_sms');
	});
	
	
	$('#partagefb').live('mousedown', function()
	{
		$('#partagefb').attr("href", "http://www.facebook.com/sharer.php?u=www." + site.nom + ".com");
		$("#resultat").html('ggdsgsd');
	});
	
	$('#partagetw').live('mousedown', function()
	{
		site.nom = $(".inputUrl").val();
		$('#partagetw').attr("data-url", "http://www." + site.nom + "net2.mobi");
		$('#partagetw').attr("data-via", "http://www." + site.nom + "net2.mobi");
		//$("#resultat").html('ggdsgsd');
	});
	
	$("img[class^='declencheurRadio']").live("click", function()
	{
		radioChanged = false;
		if($(this).attr("src") == "img/icone/radio_vide.png" && $(this).attr("id") != "sepaType1")
		{
			
			$('#pointille').removeClass();
			$('#pointille').addClass($(this).attr("id"));
			radioChanged = true;
			$('.' + $(this).attr("class")).attr("src", "img/icone/radio_vide.png");
			$(this).attr("src", "img/icone/radio_plein.png");
		}
	});
	
	$('#destroy').live('click', function()
			{
				//('newediteur').remove();
        		//tinyMCE.get('newediteur').remove();
			});
			
	$('.editeur').live('DOMNodeRemoved', function()
			{
        		tinyMCE.get($(this).attr('id')).remove();
			});
	
	//$("#myform").toggleCheckboxes();
	
	/*$("input[type='checkbox']").checkToggle({
			on_label	: 'On',
			on_bg_color	: '#8FE38D', 
			off_label	: 'Off',
			off_bg_color: '#F8837C',
			skin_dir	: "script/skin/",
			bypass_skin : false})*/
			
	$(window).scroll(function() {
  		if($(this).scrollTop()>188)
		{
			if(!apercuFixed)
			{
				apercuFixed = true;
				$('#url').css({position:'fixed', top:'-5px'}, 50);
				$('#apercu').css({position:'fixed', top:'35px'});
				$('.pageListe').css({'margin-top':'33px'});
				$('#barreOutils').css({'margin-top':'-333px'});
			}
		}
		else if($(this).scrollTop()<188)
		{
			if(apercuFixed)
			{
				apercuFixed = false;
				$('#url').css({"position":"relative", 'top':'auto'});
				$('#apercu').css({"position":"relative", 'top':'auto'});
				$('.pageListe').css({'margin-top':'-12px'});
				$('#barreOutils').css({'margin-top':'-475px'});
			}
		}
		
	});
	
	$('#scroll').dynamicScroll();
	$('#scrollPageListe').dynamicScroll();
	
	/*$.fn.disableSelection = function() {
		$(window).ctrl(['a','s','c']);
		return this.each(function() {           
			$(this).attr('unselectable', 'on')
				   .css({'-moz-user-select':'none',
						'-o-user-select':'none',
						'-khtml-user-select':'none',
						'-webkit-user-select':'none',
						'-ms-user-select':'none',
						'user-select':'none'})
				   .each(function() {
						$(this).attr('unselectable','on')
						.bind('selectstart',function(){ return false; });
				   });
		});
	};*/
	
	/*$('#listephoneCombo').ready(function(){
		//$("#listephoneCombo").attr("selectedIndex", 0).trigger('change');
		
		setTimeout
			(function() {
				$('#listephoneCombo')[0].selectedIndex=0;
				$('#listephoneCombo').trigger('change');
			}, 800);
	});*/
	
	$(document).bind("selectstart", function(){
		return false;
	});
	
	$('#nouveauPage').dblclick(function(){
		$('#ecran1').animate({"margin-left" : 215 +'px'}, 500);	
		$('#ecran1').animate({"margin-left" : -215 +'px'}, 0);	
		setTimeout
			(function() {
				site.newPage(false);				
				$('#ecran1').animate({"margin-left" : 0 + 'px'},500);
				updateNbPage();
			},500);
		
	});
	
	$('.nouveau').click(function(){						
		$('#ecran1').animate({"margin-left" : 215 +'px'}, 500);
		$('#ecran1').animate({"margin-left" : -215 +'px'}, 0);		
		setTimeout
			(function() {
				site.newPage(false);				
				$('#ecran1').animate({"margin-left" : 0 + 'px'},500);
				updateNbPage();
			},500);
	});
	
	$('.suppr').click(function(){
		if(site.pages.length > 1)
		{
			site.supprimerPage(site.activePage);
			updatePageListe();
			$('#scrollPageListe').trigger('change');
			updateNbPage();
		}
		else
			alert("Vous ne pouvez pas supprimer l'unique page de votre site");
	});
	
	$('.supprimerPage').live('click', function(){
		site.supprimerPage(parseInt($(this).parent().parent().find('.indexPage').html()));

		$(this).parent().parent().find('td').hide('fade', 500, function(){
			$(this).parent().remove();
			updatePageListe();
			$('#scrollPageListe').trigger('change');
		});
		updateNbPage();
	});
	
	
	$('.tdLienPage').live('click', function(){
		
		site.chargerPage(parseInt($(this).find('.indexPage').html()));
		$(this).parent().parent().find('tr').removeClass('selectedPage');
		$(this).parent().addClass('selectedPage');
	});
	
	$('#annulerPageListe').live('click', function(){
		/*ajout par mihaja*/
			$("#cache1").hide('fade',1500);
			$('.suppr_url, .accueil_url, .question_url').animate({"opacity":"1"},500);
		/*fin mihaja*/
		site.chargerPage(site.lastActivePage);
		$(this).parent().parent().parent().find('tr').removeClass('selectedPage');
		$(this).parent().parent().parent().find('tr').eq(site.activePage).addClass('selectedPage');
		$(".pageListe").hide('fade',500,function(){$("#barreOutils").show('fade',500)});
		$(".barre_gris:not(#barre_grisRecherche)").show('fade',500); //ajout par Mihaja :not(#barre_grisRecherche)
		$(".liste_url").css('background', "");
	});
	
	$('.declencheurRadioPageAccueil').live('click', function(){
		
		site.setAccueil(parseInt($(this).parent().parent().parent().find('.indexPage').html()));
	});
	
	$('.renommerPage').live('click', function(){
		if(!renommerPageActive)
		{
			renommerPageActive = true;
			//$(this).parent().parent().find('.nomPage').hide();
			$(this).parent().parent().find('.inputRenommerPage').show().focus();
			$(this).parent().parent().find('.validerRenommerPage').show();
		}
		else
		{
			alert('Veuillez valider votre derni�re action de renommage');
		}
		
	});
	
	$('.validerRenommerPage').live('click', function(){
		if(site.validerNomPage($(this).parent().find('.inputRenommerPage').val(), parseInt($(this).parent().find('.indexPage').html())))
		{
			renommerPageActive = false;
			$(this).parent().find('.nomPage').html($(this).parent().find('.inputRenommerPage').val());
			//$(this).parent().find('.nomPage').show();
			$(this).parent().find('.inputRenommerPage').hide();
			$(this).parent().find('.validerRenommerPage').hide();	
		}
		else
		{
			alert('Une page ayant ce nom existe deja, veuillez corriger');
		}
	
	});
	
	$('.inputRenommerPage').live('keyup', function(ev){
		if(ev.keyCode == 13)
		{
			if(site.validerNomPage($(this).parent().parent().find('.inputRenommerPage').val(), parseInt($(this).parent().parent().find('.indexPage').html())))
			{
				renommerPageActive = false;
				$(this).parent().parent().find('.nomPage').html($(this).parent().parent().find('.inputRenommerPage').val());
				//$(this).parent().parent().find('.nomPage').show();
				$(this).parent().parent().find('.inputRenommerPage').hide();
				$(this).parent().parent().find('.validerRenommerPage').hide();	
			}
			else
			{
				alert('Une page ayant ce nom existe deja, veuillez corriger');
			}
		}
		else if(ev.keyCode == 27)
		{
			renommerPageActive = false;
			$(this).val($(this).parent().parent().find('.nomPage').html());
			$(this).parent().parent().find('.inputRenommerPage').hide();
			$(this).parent().parent().find('.validerRenommerPage').hide();	
		}
	});
	
	$('#menuComposant').hide();
	
	$('.outil').bind("contextmenu",function(e){ 
		$('#menuComposant').hide();	
		$('#menuComposant').show();
		$('#menuComposant').offset({ top: e.pageY, left: e.pageX });
		
		return false;  
	});
	
	$(document).click(function(e){
		if($(e.target).attr('id') != 'menuComposant')
			$('#menuComposant').hide();
		if($(e.target).attr('id') != 'selectionTel' && !$(e.target).hasClass('menuflecheBleu'))
			$('#selectionTel').hide();
	});
	
	
	$('.cl_Edition, .cl_Visualisation').click(function()
	{
		if($(this).hasClass('EV_desactive') && $(this).hasClass('cl_Edition'))
		{
			$('.cl_Edition').removeClass('EV_desactive');
			$('.cl_Edition').addClass('EV_active');
			$('.cl_Visualisation').removeClass('EV_active');
			$('.cl_Visualisation').addClass('EV_desactive');
		}
		else if($(this).hasClass('EV_desactive') && $(this).hasClass('cl_Visualisation'))
		{
			$('.cl_Edition').removeClass('EV_active');
			$('.cl_Edition').addClass('EV_desactive');
			$('.cl_Visualisation').removeClass('EV_desactive');
			$('.cl_Visualisation').addClass('EV_active');
		}
	});
	
	$('.inputNum').live('keyup', function(e)
	{
		if(e.keyCode == 13)
			$('.inputNum').eq($('.inputNum').index(this) + 1).focus();
	});
	$('.option').live('keyup', function(e)
	{
		if(e.keyCode == 13)
			$('.option').eq($('.option').index(this) + 1).focus();
	});
	
	$('.icone_url').click(function()
	{
		$('#chargerIcone').trigger('click');
	});
	
	
	
});

function pageListe(){
	if($(".pageParametre:visible").length != 0){
		$(".pageParametre").hide('fade',500,function(){$(".pageListe").show('fade',500);$(".liste_url").css('background', "#555")});
		$(".parametre_url").css('background', "");
		
		
	}else if($(".pageListe:visible").length != 0){
		$(".pageListe").hide('fade',500,function(){$("#barreOutils").show('fade',500)});
		$(".barre_gris").show('fade',500);
		$(".liste_url").css('background', "");
	}else{
		$(".barre_gris").hide('fade',500);
		$("#barreOutils").hide('fade',500,function(){$(".pageListe").fadeIn(500, function(){$('#scrollPageListe').trigger('resize');});$(".liste_url").css('background', "#555");});
		
	}
}

//*******************************************************************
//**************************CHARGEMENT SITE**************************
//*******************************************************************

function loadStylesCommuns()
{
	$("#espacementEntreCompo").val(site.espacementCompo);
	if(site.apparence == siteSimple)
	{
		var espaceInterne = site.espacementInterne;
		$("input[value=typePageSimple]").click();
		$("#espacementInterne").val(espaceInterne).change();
	}
	else
	{
		var espaceGaucheDroite = site.espacementInterneBloc;
		var espaceInterne = site.espacementInterne;
		
		$("input[value=typePageBloc]").click();
		$("#espacementInterneBloc").val(espaceGaucheDroite).change();
		$("#espacementInterne").val(espaceInterne).change();
	}
	
	if(site.backgroundType == fondCouleur)
	{
		$("#degradeFond").val((site.degrade)? '1' : '0');
		$("#couleurCommunUnie").val(site.style.background).change();
	}
	else
	{
		
	}
}

function loadTheme(obj)
{
	var siteTemp = new Site();
	var styleTemp;
	
	for(i = 0; i < obj.pages.length; i++)
	{
		var pageTemp = new Page("");
		
		for(j = 0; j < obj.pages[i].corps.length; j++)
		{
			var composantTemp = new Composant(0, 0);
			
			var attributsTemp = new Attributs();
			
			styleTemp = new Style();
			
			$.extend(styleTemp, obj.pages[i].corps[j].attributs.style);
			obj.pages[i].corps[j].attributs.style = styleTemp;
			
			$.extend(attributsTemp, obj.pages[i].corps[j].attributs);
			obj.pages[i].corps[j].attributs = attributsTemp;
			
			for(k = 0; k < obj.pages[i].corps[j].elements.length; k++)
			{
				var elementTemp = new Element(composantTemp);
				
				$.extend(elementTemp, obj.pages[i].corps[j].elements[k]);
				obj.pages[i].corps[j].elements[k] = elementTemp;
			}
			
			var labelTemp = new Label(composantTemp);
			
			attributsTemp = new Attributs();
			
			styleTemp = new Style();
			
			$.extend(styleTemp, obj.pages[i].corps[j].label.attributs.style);
			obj.pages[i].corps[j].label.attributs.style = styleTemp;
			
			$.extend(attributsTemp, obj.pages[i].corps[j].label.attributs);
			obj.pages[i].corps[j].label.attributs = attributsTemp;
			
			$.extend(labelTemp, obj.pages[i].corps[j].label);
			obj.pages[i].corps[j].label = labelTemp;
			
			$.extend(composantTemp, obj.pages[i].corps[j]);
			obj.pages[i].corps[j] = composantTemp;
			
		}
		
		$.extend(pageTemp, obj.pages[i]);
		obj.pages[i] = pageTemp;
		
	//$.extend(site, obj);
	
	
		/*console.log(obj);
		console.log(site);*/
	}
	
	styleTemp = new Style();		
	$.extend(styleTemp, obj.style);
	obj.style = styleTemp;
	
	$.extend(siteTemp, obj);
	
	site = siteTemp;
	
	
	site.type = "site";
	site.activePage = site.pageAccueil;
	//$('#varNomPage').html(site.pages[site.activePage].name);
	$('#elements').html(site.pages[site.activePage].htmlApercu);
	
	loadStylesCommuns();
	
	$('.inputUrl').val(site.nom);
	
	$('#scroll').trigger('change');
	updatePageListe();
	$('#scrollPageListe').trigger('change');
	updateNbPage();
	
	$("#elements").droppable("option", "disabled", true);
	$("#elements").sortable("option", "disabled", false);
	
	$('.loading2').hide();
	$("#successMessage").html("Chargement r&eacute;ussi");
	$('#sauvegardeReussie').show();
					
	console.log(obj);
	console.log(site);
}


