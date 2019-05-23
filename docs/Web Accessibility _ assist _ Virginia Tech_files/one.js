/* JS by
Jason Lockhart
Erik Miller */

//global variables
var accessDOM = {},
		// accessProps = {},
		resourceInputs = {},
		breadcrumbInputs = {},
		subnavInputs = {},
		navInputs = {},
		accessInputs = {},
		pageScrollLoc = {};

// accessProps.navWasOpen = 0;

//get cookie value function
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

//universal access mode
function accessMode() {
	//if window width <768
	if (window.innerWidth < 768 && $(".vt-one-preHeader > .vt-universal-access").length > 0) {
		accessDOM = $(".vt-universal-access").detach();
		$(".header").prepend(accessDOM);
		$(".vt-universal-access").addClass("mobile");
	} else if (window.innerWidth >= 768 && $(".vt-one-preHeader > .vt-universal-access").length == 0) {
		$(".header").remove("> .vt-universal-access");
		$(".vt-one-preHeader").prepend(accessDOM);
		$(".vt-universal-access").removeClass("mobile");
	}
}

//universal access toggle
function accessToggle() {
	if($(".vt-access-dialog-wrapper").is( ":hidden" )) {
		// if ($(".vt-nav-toggle").attr("aria-expanded") === "true") {
		// 	accessProps.navWasOpen = 1;
		// 	navToggle();
		// }
		// var elScroll = document.getElementById("vt_access_dialog");
		/*pageScrollLoc.position = window.pageYOffset;
		$(document).scrollTop(0);
		$(".vt-universal-access, .vt-access-dialog-wrapper").addClass("open");*/
		$("#vt_access_dialog").attr("aria-hidden", "false");
		$("html").addClass("vt-bodyNoScroll");
		disableBodyScroll(true, '#vt_access_dialog');
		$("#vt_access_dialog").css("-webkit-overflow-scrolling", "touch");
		$("#vt_access_dialog a, #vt_access_dialog button").removeAttr("tabindex");
		$(".vt-access-dialog-close").focus();
		accessInputs = $("#vt_access_dialog.open").find('a, button').filter(':visible');
	}	else {
		window.scrollTo(0, pageScrollLoc.position);
		$(".vt-universal-access, .vt-access-dialog-wrapper").removeClass("open");
		$("#vt_access_dialog").attr("aria-hidden", "true");
		$("#vt_access_dialog a, #vt_access_dialog button").attr("tabindex", "-1");
		$("html").removeClass("vt-bodyNoScroll");
		$("#vt_offcanvas_nav").css("-webkit-overflow-scrolling", "auto");
		$(".vt-access-toggle").focus();
		disableBodyScroll(false);
		// if(accessProps.navWasOpen > 0) {
		// 	navToggle();
		// 	accessProps.navWasOpen = 0;
		// }
	}
}

//resources for toggle
function resourcesToggle() {
	if($(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded") === "false" && $("#vt_offcanvas_nav .vt-resources-for-wrapper").is(":visible") === false) {
		$(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded","true");
		$("#vt_header_resources_options").attr("aria-hidden","false");
		$(".vt-one-preHeader .vt-resources-options").removeClass("closed").addClass("open");
		resourceInputs = $(".vt-one-preHeader .vt-resources-options").find('a').filter(':visible');
		$(resourceInputs.first()).focus();
	} else {
		$(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded","false");
		$("#vt_header_resources_options").attr("aria-hidden","true");
		$(".vt-one-preHeader .vt-resources-options").removeClass("open").addClass("closed");
		$(".vt-one-preHeader .vt-resources-toggle").focus();
	}

	if($("#vt_offcanvas_nav .vt-resources-toggle").attr("aria-expanded") === "false" && $(".vt-one-preHeader").is(":visible") === false) {
		$("#vt_offcanvas_nav .vt-resources-toggle").attr("aria-expanded","true");
		$("#vt_nav_resources_options a").removeAttr("tabindex");
		$("#vt_offcanvas_nav .vt-resources-toggle .fa-times").removeClass("rotate");
		$("#vt_nav_resources_options").attr("aria-hidden","false");
		$("#vt_offcanvas_nav .vt-resources-options").removeClass("closed").addClass("open");
		navInputs = $("#vt_offcanvas_nav.open").find('a, button').filter(':visible');
	} else if($("#vt_offcanvas_nav .vt-resources-toggle").attr("aria-expanded") === "true" && $(".vt-one-preHeader").is(":visible") === false) {
		$("#vt_offcanvas_nav .vt-resources-toggle").attr("aria-expanded","false");
		$("#vt_nav_resources_options a").attr("tabindex", "-1");
		$("#vt_offcanvas_nav .vt-resources-toggle .fa-times").addClass("rotate");
		$("#vt_nav_resources_options").attr("aria-hidden","true");
		$("#vt_offcanvas_nav .vt-resources-options").removeClass("open").addClass("closed");
		navInputs = $("#vt_offcanvas_nav.open").find('a, button').filter(':visible');
console.log(navInputs.last());
	}
}

//nav toggle
function navToggle() {
	if ($(".vt-nav-toggle").attr("aria-expanded") === "false") {

		if($( ".vt-search-wrapper" ).is( ":visible" )) {
			setTimeout(function() {
			}, 200);
			$(document).scrollTop(0);
			searchToggle();
		}

		$(document).scrollTop(0);
		$( "main, footer, .vt-page-path" ).animate({
			"left" : "-=320px"
	  },200);
		$(".vt-nav-toggle").attr("aria-expanded", "true");
		$(".vt-nav-toggle .menu-open").addClass("d-none");
		$(".vt-nav-toggle .menu-close").removeClass("d-none");
		$(".vt-universal-access, .vt-access-dialog-wrapper").addClass("menuOpen");
		$(".vt-nav-toggle, #vt_offcanvas_nav, #vt_nav").addClass("open");
		$("html").addClass("vt-bodyNoScroll");
		$('.vt-page-path > .gateway, .vt-page-path > .vt-subnav, main > div[class*="-content"], main > .row, footer > .row').attr("aria-hidden", "true");
		$("#vt_offcanvas_nav").attr("aria-hidden", "false");
		$("#vt_offcanvas_nav").show();
		navInputs = $("#vt_offcanvas_nav.open").find('a, button').filter(':visible');
		$("#vt_offcanvas_nav, #vt_offcanvas_nav a:not('.vt-option-link'), #vt_offcanvas_nav button").removeAttr("tabindex");
		disableBodyScroll(true, '#vt_offcanvas_nav');
		$("#vt_offcanvas_nav").css("-webkit-overflow-scrolling", "touch");
		$(".vt-nav-toggle").focus();
		$(".vt-page-path").append('<section class="vt-pageContext-modal" aria-label="Disabled Main Content"><button class="vt-modal-close" aria-controls="menuDrawer searchDrawer" onclick="javascript:modalToggle();">Close Menu or Search drawer to access content</button></section>');
		$("main").append('<section class="vt-body-modal" aria-label="Disabled Main Content"><button class="vt-modal-close" aria-controls="menuDrawer searchDrawer" onclick="javascript:modalToggle();">Close Menu or Search drawer to access content</button></section>');
		$("footer").append('<section class="vt-footer-modal" aria-label="Disabled Footer Content"><button class="vt-modal-close" aria-controls="menuDrawer searchDrawer" onclick="javascript:modalToggle();">Close Menu or Search drawer to access content</button></section>');
	} else {
		$(".vt-nav-toggle, .fold-icon").attr("aria-expanded", "false");
		$(".vt-nav-toggle .menu-open").removeClass("d-none");
		$(".vt-nav-toggle .menu-close").addClass("d-none");
		$("#vt_offcanvas_nav, #vt_offcanvas_nav a, #vt_offcanvas_nav button").attr("tabindex", "-1");
		$('.vt-page-path > .gateway, .vt-page-path > .vt-subnav, main > div[class*="-content"], main > .row, footer > .row').removeAttr("aria-hidden");
		$("html").removeClass("vt-bodyNoScroll");
		$(".vt-universal-access, .vt-access-dialog-wrapper").removeClass("menuOpen");
		$("#vt_offcanvas_nav, .vt-nav-toggle, #vt_nav").removeClass("open");
		$("#vt_offcanvas_nav").attr("aria-hidden", "true");
		$( "main, footer, .vt-page-path" ).animate({
			"left" : "+=320px"
	  }, 200, function() {
	    $("#vt_offcanvas_nav").hide();
	  });
		$(".vt-body-modal, .vt-footer-modal, .vt-pageContext-modal").remove();
		$(".has-submenu .link-wrapper").removeClass("active");
		disableBodyScroll(false);
		$("#vt_offcanvas_nav").css("-webkit-overflow-scrolling", "auto");
		$(".vt-nav-toggle").focus();
	}
}

//nav fold-icon toggle
function foldAction(clicked) {
	if ($(clicked).attr("aria-expanded") === "true") {
		$(clicked).attr("aria-expanded", "false");
		$(clicked).parent().removeClass("active");
		navInputs = $("#vt_offcanvas_nav.open").find('a, button').filter(':visible');
	} else {
		$("#vt_main_nav .fold-icon").attr("aria-expanded", "false");
		$(".link-wrapper").removeClass("active");
		$(clicked).attr("aria-expanded", "true");
		$(clicked).parent().addClass("active");
		navInputs = $("#vt_offcanvas_nav.open").find('a, button').filter(':visible');
	}
}

//search toggle
function searchToggle() {

	if ($(".vt-nav-toggle").attr("aria-expanded") === "true") {
		$(document).scrollTop(0);
		navToggle();
	}

	if ( $( "#vt_header_search_form" ).is( ":hidden" ) ) {
		$(".vt-search-toggle").attr("aria-expanded", "true");
		$("#vt_header_search").addClass("open");
		$( ".vt-search-wrapper" ).slideDown( "fast" );
		$(".vt-search-toggle .search-open").addClass("d-none");
		$(".vt-search-toggle .search-close").removeClass("d-none");
		$("html").addClass("vt-bodyNoScroll");
		$('.vt-page-path > .gateway, .vt-page-path > .vt-subnav, main > div[class*="-content"], main > .row, footer > .row').attr("aria-hidden", "true");
		$(".vt-page-path").append('<section class="vt-pageContext-modal" aria-label="Disabled Main Content"><button class="vt-modal-close" aria-controls="menuDrawer searchDrawer" onclick="javascript:modalToggle();">Close Menu or Search drawer to access content</button></section>');
		$("main").append('<section class="vt-body-modal" aria-label="Disabled Main Content"><button class="vt-modal-close" aria-controls="menuDrawer searchDrawer" onclick="javascript:modalToggle();">Close Menu or Search drawer to access content</button></section>');
		$("footer").append('<section class="vt-footer-modal" aria-label="Disabled Footer Content"><button class="vt-modal-close" aria-controls="menuDrawer searchDrawer" onclick="javascript:modalToggle();">Close Menu or Search drawer to access content</button></section>');
		$(".vt-page-path, main, footer").addClass("vt-searchOpen");
		$("#vt_search_box").focus();
		setTimeout(function() {
		}, 600);
	} else {
		setTimeout(function() {
		}, 200);
		$(".vt-search-toggle").attr("aria-expanded", "false");
		$( ".vt-search-wrapper" ).slideUp("fast");
		$("#vt_header_search").removeClass("open");
		$(".vt-search-toggle .search-close").addClass("d-none");
		$(".vt-search-toggle .search-open").removeClass("d-none");
		$(".vt-body-modal, .vt-footer-modal, .vt-pageContext-modal").remove();
		$('.vt-page-path > .gateway, .vt-page-path > .vt-subnav, main > div[class*="-content"], main > .row, footer > .row').removeAttr("aria-hidden");
		$("html").removeClass("vt-bodyNoScroll");
		$(".vt-page-path, main, footer").removeClass("vt-searchOpen");
		$(".vt-search-toggle").focus();
	}
}

//modal click to close nav or search
function modalToggle() {

	if ($(".vt-nav-toggle").attr("aria-expanded") === "true") {
		$(document).scrollTop(0);
		navToggle();
	}

	if($( ".vt-search-wrapper" ).is( ":visible" )) {
		setTimeout(function() {
		}, 200);
		$(document).scrollTop(0);
		searchToggle();
	}

}

function breadcrumbMode() {
	//if window width <768
	if (window.innerWidth < 768 && $(".vt-breadcrumbs-mobileToggle").length == 0) {
		$(".gateway").append('<button class="vt-breadcrumbs-mobileToggle" aria-controls="vt_navtrail" aria-expanded="false" onclick="javascript:breadcrumbToggle();" aria-label="Breadcrumb toggle"> <span class="vt-breadcrumbs-toggleLabel sr-only">Breadcrumb toggle</span> <span class="vt-breadcrumbs-open" aria-hidden="true" focusable="false" role="img">&#183;&#183;&#183;</span> <span class="vt-breadcrumbs-close d-none" aria-hidden="true" focusable="false" role="img">X</span></button>');
		$("#vt_navtrail a").attr("tabindex", "-1");
		$("#vt_navtrail .vt-breadcrumbs-item:last-of-type .vt-breadcrumbs-link").removeAttr("tabindex");
	} else if (window.innerWidth >= 768){
		$(".vt-breadcrumbs-mobileToggle").remove();
		$("#vt_navtrail a").removeAttr("tabindex");
	}
}

function breadcrumbToggle() {
	if ($(".vt-breadcrumbs-mobileToggle").attr("aria-expanded") === "false") {

	  $(".vt-breadcrumbs-mobileToggle").attr("aria-expanded", "true");
	  $(".vt-breadcrumbs-mobileToggle .vt-breadcrumbs-open").addClass("d-none");
	  $(".vt-breadcrumbs-mobileToggle .vt-breadcrumbs-close").removeClass("d-none");
	  $("#vt_navtrail").addClass("open");
	  $("#vt_navtrail a").removeAttr("tabindex");
		breadcrumbInputs = $(".gateway").find('a, button').filter(':visible');
	  $(".vt-breadcrumbs-mobileToggle").focus();

	} else {

	  $(".vt-breadcrumbs-mobileToggle").attr("aria-expanded", "false");
	  $(".vt-breadcrumbs-mobileToggle .vt-breadcrumbs-close").addClass("d-none");
	  $(".vt-breadcrumbs-mobileToggle .vt-breadcrumbs-open").removeClass("d-none");
	  $("#vt_navtrail").removeClass("open");
	  $("#vt_navtrail a").attr("tabindex", "-1");
		$("#vt_navtrail .vt-breadcrumbs-item:last-of-type .vt-breadcrumbs-link").removeAttr("tabindex");
	  $(".vt-breadcrumbs-mobileToggle").focus();

	}
}

function subnavToggle() {
	var elArr = [".vt-subnav", ".vt-subnav-droplist-title", ".vt-subnav-droplist-control", ".vt-subnav-droplist, .vt-subnav-symbol-container, .vt-subnav-page-title"];

	if(!$(".vt-subnav-droplist-control").hasClass("open")) {
		addClassNameToSet(elArr, "open");
		$(".vt-subnav-droplist-control").attr("aria-expanded", true);
		subnavInputs = $("#vt_subnav.open").find('a, button').filter(':visible');
	} else {
		removeClassNameFromSet(elArr, "open");
		$(".vt-subnav-droplist-control").attr("aria-expanded", false);
	}
}

//check table that will be used for sorter or data table and format correctly - make tables responsive
function checkTable() {

    $("table").not(".vt-list table").each(function() {

			//new class addition to parent parbase element
			if ($(this).hasClass("table") === "true") {
				$(this).parents(".parbase").addClass("vt-table-margin");
			} else {
				$(this).addClass("table");
				$(this).parents(".parbase").addClass("vt-table-margin");
			}

        if ($(this).parent().hasClass("vt-datatable")) { //check if there is a datatable on the page
            var tdtables = $(".vt-datatable > table");
            var tdList = new Array(); //this is used to store each datatable
            var tdRow = new Array(); //this is used to store each table row in a datatable

            //make an array entry for each datatable
            $(tdtables).children("tbody").each(function() {
                tdList.push(
                $(this).children("tr").each(function() {
                    //put each row from a datatable into the table array
                    tdRow.push($(this).children("td"));
                }));
            });


            //remove the current datatable body sections
            $(tdtables).children("tbody").remove();

            //repopulate datatable
            var tdcounter = 0;
            $(tdtables).each(function(){
                if (tdcounter < tdList.length){
                    $(this).append("<thead></thead>");
                    $(this).append("<tbody></tbody>");

                    for (j = 0; j < tdList[tdcounter].length; j++) { //loop through the rows
                        if (j == 0){
                            //put the first row in as th in the thead of the current datatable
                            var headerTemp = tdList[tdcounter][j];
                            var pattern01 = /td/g;
                            var pattern02 = /\/td/g;
                            headerText = String(headerTemp.innerHTML);

                            if (headerText.match(/<th>/g)) {
                                var mushText = headerText.replace(/<th>/g,'');
                                mushText = mushText.replace(/\r?\n|\r/g,'');
                                headerNames = mushText.split(/<\/th>/g);
                            } else {
                                var mushText = headerText.replace(/<td>/g,'');
                                mushText = mushText.replace(/\r?\n|\r/g,'');
                                headerNames = mushText.split(/<\/td>/g);
                            }
                            $(this).children("thead").append("<tr>" + headerText + "</tr>");
                        }else{
                            //put remaining rows into tbody
                            var rowTemp = tdList[tdcounter][j];
                            rowTemp = String(rowTemp.innerHTML);

                            //add data-labels to each td
                            rowTemp = rowTemp.replace(/<td>/g,'');
                            rowTemp = rowTemp.replace(/\r?\n|\r/g,'');
                            var rowTempSplit = rowTemp.split(/<\/td>/g);

                            for (k = 0; k < rowTempSplit.length - 1; k++) {
                                //merge the split table row with the header names in data labels
                                if ($(".vt-text table thead").css("display") == "none") {
                                    rowTempSplit[k] = "<td data-label=\""+headerNames[k]+"\"><br>"+rowTempSplit[k]+"</td>";
                                } else {
                                    rowTempSplit[k] = "<td data-label=\""+headerNames[k]+"\">"+rowTempSplit[k]+"</td>";
                                }
                            }

                            $(this).children("tbody").append("<tr>" + rowTempSplit.toString() + "</tr>");
                        }
                    }
                    tdcounter++;
                }else{
                    return false;
                }
            });

	    } else if ($(this).parent().hasClass("vt-tablesorter")) { //check if there is a sortable table on the page

	        var tstables = $(".vt-tablesorter > table");
	        var tsList = new Array(); //this is used to store each sorted table
	        var tsRow = new Array(); //this is used to store each table row in a sorted table

	        //make an array entry for each sortable table
	        $(".vt-tablesorter > table").children("tbody").each(function() {
	            tsList.push(
	            $(this).children("tr").each(function(){
	                //put each row from a sorable table into the table array
	                tsRow.push($(this).children("td"));
	            }));
	        });

	        //remove the current sortable table body sections
	        $(".vt-tablesorter > table").children("tbody").remove();

	        //repopulate sortable table
	        var tscounter = 0;
	        $(".vt-tablesorter > table").each(function(){
              if (tscounter < tsList.length){
                  $(this).append("<thead></thead>");
                  $(this).append("<tbody></tbody>");

                  for (j = 0; j < tsList[tscounter].length; j++) { //loop through the rows
                      if (j == 0){
                          //put the first row in as th in the thead of the current datatable
                          var headerTemp = tsList[tscounter][j];
                          var pattern01 = /td/g;
                          var pattern02 = /\/td/g;
                          headerText = String(headerTemp.innerHTML);

                          if (headerText.match(/<th>/g)) {
                              var mushText = headerText.replace(/<th>/g,'');
                              mushText = mushText.replace(/\r?\n|\r/g,'');
                              headerNames = mushText.split(/<\/th>/g);
                          } else {
                              var mushText = headerText.replace(/<td>/g,'');
                              mushText = mushText.replace(/\r?\n|\r/g,'');
                              headerNames = mushText.split(/<\/td>/g);
                          }
                          $(this).children("thead").append("<tr>" + headerText + "</tr>");
                      }else{
                          //put remaining rows into tbody
                          var rowTemp = tsList[tscounter][j];
                          rowTemp = String(rowTemp.innerHTML);

                          //add data-labels to each td
                          rowTemp = rowTemp.replace(/<td>/g,'');
                          rowTemp = rowTemp.replace(/\r?\n|\r/g,'');
                          var rowTempSplit = rowTemp.split(/<\/td>/g);

                          for (k = 0; k < rowTempSplit.length - 1; k++) {
                              //merge the split table row with the header names in data labels
                              if ($(".vt-text table thead").css("display") == "none") {
                                  rowTempSplit[k] = "<td data-label=\""+headerNames[k]+"\"><br>"+rowTempSplit[k]+"</td>";
                              } else {
                                  rowTempSplit[k] = "<td data-label=\""+headerNames[k]+"\">"+rowTempSplit[k]+"</td>";
                              }
                          }

                          $(this).children("tbody").append("<tr>" + rowTempSplit.toString() + "</tr>");
                      }
                  }
                  tscounter++;
              }else{
                  return false;

              }
	        });
	    } else {
	        if (!$(this).parent().hasClass("vt-c-table-noPostProcess")) {
	            $(this).attr("width", "100%");

	            var pageTables = $(this),
	                pageTableList = new Array(),
	                pageTableRow = new Array();

	            $(pageTables).children("tbody").each(function() { //make an array entry for each datatable
	                pageTableList.push(
	                $(this).children("tr").each(function(){ //put each row from a datatable into the table array
	                    pageTableRow.push($(this).children("td"));
	                }));
	            });


	            //remove the current table body sections
	            $(pageTables).children("tbody").remove();

	            //repopulate datatable
	            var tableCounter = 0;
	            var tableListLength = pageTableList.length;
	            $(pageTables).each(function() {
                  if (tableCounter < tableListLength){
                      $(this).append("<thead></thead>");
                      $(this).append("<tbody></tbody>");

                      for (j = 0; j < pageTableList[tableCounter].length; j++) { //loop through the rows
                          if (j == 0){
                              //put the first row in as th in the thead of the current datatable
                              var headerTemp = pageTableList[tableCounter][j];
                              var pattern01 = /td/g;
                              var pattern02 = /\/td/g;
                              var headerNames = new Array();
                              //capture the header names to an array for data-labels and put the th tags on each item
                              headerText = String(headerTemp.innerHTML);
                              if (headerText.match(/<th>/g)) {
                                  var mushText = headerText.replace(/<th>/g,'');
                                  mushText = mushText.replace(/\r?\n|\r/g,'');
                                  headerNames = mushText.split(/<\/th>/g);
                              } else {
                                  var mushText = headerText.replace(/<td>/g,'');
                                  mushText = mushText.replace(/\r?\n|\r/g,'');
                                  headerNames = mushText.split(/<\/td>/g);
                              }

                              headerText = headerText.replace(pattern01,"th");
                              headerText = headerText.replace(pattern02,"/th");

                              $(this).children("thead").append("<tr>" + headerText + "</tr>");
                          }else{
                              //put remaining rows into tbody
                              var rowTemp = pageTableList[tableCounter][j];
                              var rowColWidth = "";
                              rowTemp = String(rowTemp.innerHTML);

                              //add data-labels to each td
                              rowTemp = rowTemp.replace(/<td>/g,'');
                              rowTemp = rowTemp.replace(/\r?\n|\r/g,'');
                              var rowTempSplit = rowTemp.split(/<\/td>/g);

                              for (k = 0; k < rowTempSplit.length - 1; k++) {
                                  //merge the split table row with the header names in data labels
                                  if ($(".vt-text table thead").css("display") == "none") {
                                      rowTempSplit[k] = "<td data-label=\""+headerNames[k]+"\"><br>"+rowTempSplit[k]+"</td>";
                                  } else {
                                      rowTempSplit[k] = "<td data-label=\""+headerNames[k]+"\">"+rowTempSplit[k]+"</td>";
                                  }
                              }

                              $(this).children("tbody").append("<tr>" + rowTempSplit.toString() + "</tr>");
                          }
                      }
                      tableCounter++;
                  }else{
                      return false;
                  }
	            });
	        }
	    }
    });
}

//end checkTable

function accordionTabs() {

	/*function to add turndown glyphs to accordion components*/
	$(".vtAccordion .panel-heading, .vtTab .panel-heading").each(function(){
	    var myParent = $(this).get(0).parentNode;

	    if ($(myParent).attr('class').indexOf('vtAccordion') > -1) {

	        var nextPleatId = $(this).next("div").attr("id"),
	            pleatName = $(this).find("h4").find("a").text(),
	            whatToAppend = '<a class="toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#' + nextPleatId + '" aria-expanded="'+ $(this).next('.panel-collapse').attr('aria-expanded') +'" aria-controls="' + nextPleatId + '" role="button"><span class="far fa-times" focusable="false"></span><span class="sr-only">'+ pleatName +' toggle</span></a>';
	        $(this).append(whatToAppend);

	    } else {

	        var nextPleatId = $(this).find('a').attr("href"),
	            pleatName = $(this).find("a").text(),
	            myData = $(this).find('a').data('parent'),
	            whatToAppend = '<a class="toggle collapsed" data-toggle="collapse" data-parent="' + myData + '" href="' + nextPleatId + '" aria-expanded="'+ $(this).next('.panel-collapse').attr('aria-expanded') +'" aria-controls="' + nextPleatId + '" role="button"><span class="far fa-times" focusable="false"></span><span class="sr-only">'+ pleatName +' toggle</span></a>';
	        $(this).append(whatToAppend);

	    }

	});

	/* Link to specific tab and accordion pleats.
	*  #select=[tab number]
	* */
	$.fx.off = true;
	// Setup for tabs and accordion
	// prevent scrolling if already clicked on
	var accordionOrTabClicked = false;
	if (jQuery.isFunction(jQuery.fn.accordion)){
			$(".vtAccordion").accordion({heightStyle: "content", collapsible: true, activate: function(evt, ui) {
					// enable default browser behavior
					//runEqualHeights();  - Not used in Moss template
					if (!accordionOrTabClicked) {
							$.fx.off = true;
							if (ui.newHeader.get(0)) {
									ui.newHeader.get(0).scrollIntoView(true);
							}
							$.fx.off = false;
					}
			}});
			$('.vtAccordion.vtAccordion_closed').accordion({active: false});
	}
	if (jQuery.isFunction(jQuery.fn.tabs)){
			$(".vtTab").tabs({activate: function(evt, ui) {
					// enable default browser behavior
					if (!accordionOrTabClicked) {
							if (ui.newTab.get(0)) {
									ui.newTab.get(0).scrollIntoView(true);
							}
					}
			}});
	}
	// add links to anchors similar to tabs
	$(".vtAccordion h4 > a[href='#']").each(function(i, elem) {
			$(elem).attr("href", "#pleat-" + (i + 1));
			$(elem).click(function() {
					accordionOrTabClicked = true;
			});
	});
	$(".vtTab ul.tab-list li").each(function(i, elem) {
			$(elem).mousedown(function(evt) {
					accordionOrTabClicked = true;
			});
	});
	// end setup

	$(window).bind('hashchange', function(){
			var hash = window.location.hash;
			if (!accordionOrTabClicked) {
					$(".vtTab a[href^='"+hash+"']").click();
					$(".vtAccordion h4[aria-selected='false'] > a[href='"+hash+"']").click();

					// enable select=
					// note: "#select=" is 8 characters
					if ("select=" === hash.slice(1,8)) {
							var itemToSelect = parseInt(hash.substring(8), 10);

							if (itemToSelect > 0 ) {
									$(".vtTab ul.tab-list > li > a, .vtAccordion h4 > a").each(function(i, elem) {
											if (i === (itemToSelect - 1)) {
													//check for IE11 or earlier and hide the offcanvas nav panel
													$(".offcanvas").css("display", "none");
													elem.scrollIntoView(true);

													// now account for fixed header
													var scrolledY = window.pageYOffset;

													if (scrolledY){
														window.scroll(0, scrolledY - 120);
													}

													// check for open accordion pleat
													if ($(elem).parent().attr("aria-selected") !== 'true') {
															$(elem).click();

													}
											}
									});
							}

					}
			}
			accordionOrTabClicked = false;
	});
	// run once for page load
	$(window).trigger( 'hashchange' );
	$.fx.off = false;
	$(".offcanvas").css("display", "block");


	//default accordion fold and tab opener
	if ($('div[class*="vt-c-mta-select-"]').length > 0) {

			//execute a click on accordion fold
			if ($('.vtAccordion').length > 0) {
					$('.vtAccordion').each(function() {
							//get the number of the fold to open from the class
							if ($(this).parents('div[class*="vt-c-mta-select-"]').length > 0) {
									var openNum = Number($(this).parents('div[class*="vt-c-mta-select-"]').attr("class").replace( /^\D+/g, '')),
											openSelector = ".vt-c-mta-select-"+openNum;
									$(openSelector+" .panel-heading .toggle").eq(openNum - 1).trigger("click");
							}
					});
			}

			//execute click on tab
			if ($('.vtTab').length > 0) {
					$('.vtTab').each(function() {
							//get the number of the fold to open from the class
							if ($(this).parents('div[class*="vt-c-mta-select-"]').length > 0) {
									var openNum = Number($(this).parents('div[class*="vt-c-mta-select-"]').attr("class").replace( /^\D+/g, '')),
											openSelector = ".vt-c-mta-select-"+openNum;
									$(openSelector+" .tab-list li a").eq(openNum - 1).trigger("click");
							}
					});
			}
	}

}

//evaluate text component to determine whether it has only a heading in it and add a class to change text component margins on pages w/o right col
function checkHeaderOnly() {
	$(':not(".rightcol") #vt_body_col .parbase.text').each(function(index) {
		if ($(this).find(".vt-text").children("h1, h2, h3, h4, h5, h6").length == 1 && $(this).find(".vt-text").children(":not('h1, h2, h3, h4, h5, h6')").length == 0) {
			$(this).addClass("vt-heading-only");
		}
	});
}

//check inherited footer for content and hide if none
function checkFooter() {
	if ($(".vt-footer-inPage-items > .parbase").children(':not(".vt-footer-hide")').length > 0 || ($(".footer-briefs").children().length > 0 && $(".footer-briefs > div").children(':not(".vt-footer-hide")').length > 0) && (window.location.href.indexOf("wcmmode=disabled") > 0 || getCookie('cq-editor-layer') !== "Edit")) {
		$("footer > .row:nth-child(1), .footer-content").addClass("active");
	} else {
		$("footer > .row:nth-child(1), .footer-content").removeClass("active");
	}
}

//disable runEqualHeights function
function runEqualHeights() {}

//because Safari is non-standard with focus
$(function() {
	$(this).focus(function() {
		$(this).addClass("vt-hasFocus");
	})
});

$(document).ready(function() {

	/* universal access mobile check */
	accessMode();

	/* breadcrumb mobile check */
	breadcrumbMode();

	/* find header element only text components */
	checkHeaderOnly();

	/* check for visible inherited footer content */
	checkFooter();

	/* check for jwPlayer and deactivate the bootstrap padding for video */
	$(".jwplayer").each(function() {
		$(this).parent().addClass("vt-jwPlayer-noPseudo");
	});

	/* vt-embed-map */
	//customization location via sitePrefs
	if(typeof(sitePrefs) !== 'undefined') {
	  var vtLocation = "Virginia+Tech,Blacksburg+VA";

	  if(sitePrefs.location !== "" && typeof(sitePrefs.location) !== 'undefined') {
	    vtLocation = sitePrefs.location.replace(/ /g, "+");
	  }

	  $(".vt-embed-map").removeClass("default-map");
	  $(".vt-embed-map").prepend('<iframe class="vt-google-map" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApzqbJUklqJtvkSmC4qCNHicj2-NJPuEg&q='+vtLocation+'" allowfullscreen></iframe>');
	} else {
	  $(".vt-embed-map").addClass("default-map");
	}

	/* remove inherited right column div if nothing inherited */
	if($(".nav-briefs").children().length > 0 || $(".vt-nav-briefs > .parbase").length > 0) {
		$("#vt_right_col .vt-nav-briefs").addClass("active");
	} else {
		$("#vt_right_col .vt-nav-briefs").remove();
	}

	/* turn off other right column if empty	*/
	if($(".vt-rightcol-content").children().length == 0 && (window.location.href.indexOf("wcmmode=disabled") > 0 || getCookie('cq-editor-layer') !== "Edit")) {
		$("#vt_right_col .vt-rightcol-content").remove();
	}

	/* remove shadow if right column completely empty */
	if($(".nav-briefs").children().length == 0 && $(".vt-nav-briefs > .parbase").length == 0 && $(".vt-rightcol-content").children().length == 0 && $("#vt_right_col .vt-programStudy-contact").length == 0) {
		$("#vt_right_col").addClass("vt-noContent");
	} else {
		$("#vt_right_col").removeClass("vt-noContent");
	}

	/* show hide alerts */
  if ($('#vt_alert_wrapper').length > 0){
      $('#vt_alert_wrapper').append('<button id="vt_alert_hide_show" type="button"><span>Close</span></button>');
      $('#vt_alert_wrapper').prepend('<span class="fal fa-exclamation-triangle"></span>');
      $('#vt_alert_hide_show').click(function(){
          $('#vt_alert_wrapper').toggleClass("vt-close-alert");
          $(this).html(function(i, v){
              return v === '<span>Open</span>' ? '<span>Close</span>' : '<span>Open</span>'
          })
      });
  }

	//universal access keyboard nav
	$(".vt-access-dialog-close").on("keydown", function (e) {
		var i = $(":focus").get(0);
		var j = accessInputs.index(i);

		// if ($(".vt-access-dialog-wrapper").attr("aria-hidden") === "false") {
		if ($(".vt-access-dialog-wrapper").hasClass("open")) {
			if ((e.which === 9 && e.shiftKey))  {
				e.preventDefault();
				$(accessInputs.last()).focus();
			}
		}
	});

	$(".vt-access-options").on("keydown", function (e) {
		var i = $(":focus").get(0);
		var j = accessInputs.index(i);

		if ($(".vt-access-dialog-wrapper").hasClass("open")) {
			if ((e.which === 9 && !e.shiftKey) && j === (accessInputs.length - 1))  {
				e.preventDefault();
				$(accessInputs.first()).focus();
			}
		}
	});

	//resources for keyboard nav
	$(".vt-one-preHeader .vt-resources-toggle").on('keydown', function(e) {
		if (e.which === 40 || e.which === 32 || e.which === 13) {
			e.stopPropagation();
			e.preventDefault();
			resourcesToggle();
			$(resourceInputs.first()).focus();
		}

		if (e.which === 38) {
			e.stopPropagation();
			e.preventDefault();
			resourcesToggle();
			$(resourceInputs.last()).focus();
		}
	});

	$(".vt-one-preHeader .vt-resources-options").on('keydown', function(e) {
		var i = $(":focus").get(0);
		var j = resourceInputs.index(i);

		if ($(".vt-one-preHeader .vt-resources-options").attr("aria-hidden") === "false") {

			//up arrow
			if (e.which === 38 && resourceInputs.index(j) !== resourceInputs.first())  {
				e.stopPropagation();
				e.preventDefault();
				$(resourceInputs.eq(j - 1)).focus();
			} else if(e.which === 38 && resourceInputs.first()) {
				e.stopPropagation();
				e.preventDefault();
				$(resourceInputs.last()).focus();
			}

			//down arrow
			if (e.which === 40 && j < (resourceInputs.length - 1))  {
				e.stopPropagation();
				e.preventDefault();
				$(resourceInputs.eq(j + 1)).focus();
			} else if (e.which === 40 && j === (resourceInputs.length - 1)) {
				e.stopPropagation();
				e.preventDefault();
				$(resourceInputs.first()).focus();
			}

			//home
			if (e.which === 36) {
				e.stopPropagation();
				e.preventDefault();
				$(resourceInputs.first()).focus();
			}

			//end
			if(e.which === 35) {
				e.stopPropagation();
				e.preventDefault();
				$(resourceInputs.last()).focus();
			}

			if ($(resourceInputs.first()) && (e.which === 9 && e.shiftKey))  {
				resourcesToggle();
			}

			if ($(resourceInputs.last()) && (e.which === 9 && !e.shiftKey))  {
				resourcesToggle();
			}

		}
	});


	$('.vt-resources-toggle').click(function(event){
	    event.stopPropagation();
			resourcesToggle();
	});

	//trap the keyboard navigation inside the nav container
	$(".vt-nav-toggle").on('keydown', function(e) {
		if ($(".vt-nav-toggle").attr("aria-expanded") === "true") {
			if ((e.which === 9 && e.shiftKey))  {
				e.preventDefault();
				$(navInputs.last()).focus();
			}
		}
	});

	$("#vt_offcanvas_nav").on('keydown', function (e) {
			var i = $(":focus").get(0);
			var j = navInputs.index(i);

		if ((e.which === 9 && !e.shiftKey) && j === (navInputs.length - 1))  {
			e.preventDefault();
			$(".vt-nav-toggle").focus();
		}
	});

	//header search keyboard nav
	$(".vt-search-toggle").on("keydown", function (e) {
		if ($(".vt-search-toggle").attr("aria-expanded") === "true") {
			if ((e.which === 9 && e.shiftKey))  {
				e.preventDefault();
				$(".vt-search-button").focus();
			}
		}
	});

	$(".vt-search-button").on("keydown", function (e) {
		if ($(".vt-search-toggle").attr("aria-expanded") === "true") {
			if ((e.which === 9 && !e.shiftKey))  {
				e.preventDefault();
				$(".vt-search-toggle").focus();
			}
		}
	});

	//mobile breadcrumb tab order
	$(".gateway").on("keydown", function (e) {

		if ($("#vt_navtrail").hasClass("open")) {
			var i = $(":focus").get(0);
			var j = breadcrumbInputs.index(i);

			if ((e.which === 9 && !e.shiftKey) && j === (breadcrumbInputs.length - 1))  {
				e.preventDefault();
				breadcrumbInputs.eq(0).focus();
			} else if ((e.which === 9 && e.shiftKey) && j === (breadcrumbInputs.length - 1))  {
				breadcrumbToggle();
			}

			if ((e.which === 9 && !e.shiftKey) && j === (breadcrumbInputs.length - 2))  {
				breadcrumbToggle();
			}

			if ((e.which === 9 && e.shiftKey) && j == 0)  {
				e.preventDefault();
				breadcrumbInputs.last().focus();
			}
		}
	});

	//escape key behaviors
	$(window).on("keydown", function (e) {

		if(e.which === 27) {
			if ($(".vt-nav-toggle").attr("aria-expanded") === "true") {
				navToggle();
			}

			if ($(".vt-search-toggle").attr("aria-expanded") === "true") {
				searchToggle();
			}

			if($(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded") === "true") {
				resourcesToggle();
			}

			if($("#vt_access_dialog").is(":visible")) {
				accessToggle();
			}

			if($(".vt-subnav-droplist-control").attr("aria-expanded") === "true") {
				subnavToggle();
			}
		}
	});

	//fix for !important on media component jwplayer default aspect
	if ($(".jw-aspect.jw-reset").attr("style") == "padding-top: 56.25%;") {
	  $(".jw-aspect.jw-reset").attr({style: "padding-top: 56.25%!important;"})
	}

	//search box scripts
	$("#vt_header_search_form").on("submit", function() {

		if($(".vt-search-scopeSelect option:selected").val() === "search-site") {
			var siteURL = $("div[data-name='siteURL']").attr("data-value"),
					siteSearch = "site:" + siteURL + " " + $(".vt-search-box").val();
			$(".vt-search-box").val(siteSearch);
		}

		return true;
	});

	//responsive and data - sortable tables
	checkTable();

	//accordion and tabs functions
	if ($(".vtmultitab").length > 0) {
		accordionTabs();
	}

	//move active state on <li> elements along with link
	$(".vtTab .nav-link").on('click', function() {
		var tabID = $(this).parents(".vtTab").attr("id"),
				tabIDSelector = "#"+tabID;
		setTimeout(function() {
			$(tabIDSelector).find(".nav-item").removeClass("active");
			$(tabIDSelector).find(".nav-link.active").parent().addClass("active");
		}, 200);
	});

	//Trigger dataTable on a table with class .vt-datatable (table must have thead and tbody defined) ***SHOULD BE IN LOCAL ASSETS
	var o_vt_dataTable = null;
	if ($(".vt-datatable >table, .vt-datatable-formatted >table").length > 0) {

		// loading necessary javascript files for validation, wysiwyg editor, datepicker
		if (!(jQuery.isFunction(jQuery.fn.dataTable))){
			$('head').prepend('<script type="text/javascript" src="/global_assets/js/datatables/jquery.dataTables.min.js"></script>');
		}
				$(".vt-datatable >table, .vt-datatable-formatted >table").each(function() {
						o_vt_dataTable = $('.vt-datatable >table, .vt-datatable-formatted >table').dataTable( {
								"bJQueryUI": true,
								"aLengthMenu":[[25, 50, 100, -1],[25, 50, 100, "All"]],
								"sPaginationType": "full_numbers",
								"aaSorting":[[0,'asc']],
								"iDisplayLength": 25,
								"oSearch": {"sSearch": "", "bRegex":false, "bSmart": false}
						});
				});
				$(".vt-datatable >table, .vt-datatable-formatted >table").attr("summary","This is a searchable and sortable table. Click a heading title to change sort column and sort order.");
	}

	if ($(".vt-datatable").length > 0) {
			$(".vt-datatable").each(function() {
					$(".dataTables_filter input").addClass("form-control");
			});
	}

	// Include necessary code for table sorting
	if ($(".vt-tablesorter >table, .vt-tablesorter-formatted >table").length > 0) {
	if (!(jQuery.isFunction(jQuery.fn.tablesorter))) {
		$('head').prepend('<script type="text/javascript" src="/global_assets/js/tablesort/jquery.tablesorter.js"></script>');
		$('head').prepend('<link rel="stylesheet" type="text/css" href="/global_assets/js/tablesort/vt_tablesorter.css"/>');
			}
			$(".vt-tablesorter-formatted >table").each(function() {
					$(".vt-tablesorter-formatted >table").tablesorter( {sortList: [[0,0]]} ); //sorts based on first column only by default
					$(".vt-tablesorter-formatted >table").attr("summary","This is a sortable table. Click a heading title to change sort column and sort order.");
			});
			$(".vt-tablesorter >table").each(function() {
					$(".vt-tablesorter >table").tablesorter( {sortList: [[0,0]]} ); //sorts based on first column only by default
					$(".vt-tablesorter >table").attr("summary","This is a sortable table. Click a heading title to change sort column and sort order.");
			});
	}

	// Change chevron icons to arrow icons
	if($(".vt-carousel-control-belowImage, .vt-carousel-control-default").length > 0){
		$(".vt-carousel-control-belowImage .carousel-control, .vt-carousel-control-default .carousel-control").each(function(){
			$(this).children(".glyphicon").remove();
			if($(this).hasClass("left")){
				$(this).prepend(
					'<i class="far fa-arrow-left" focusable="false">&nbsp;</i>'
				);
			}
			else{
				if($(this).hasClass('right')){
					$(this).prepend(
						'<i class="far fa-arrow-right" focusable="false">&nbsp;</i>'
					);
				}

			}
		});
	}

	// 1. Force display of the carousel to 16:9 aspect ratio
	// 2. Set the top position of the controls to near the top of the image
	// 3. Listen for the BS "slid" event and update the position of the indicators so that it is always at the bottom of the image
	if($(".vt-carousel").length > 0){

		$(".vt-carousel").each(function(){
			var firstItem = $(".carousel-item:eq(0) .item-image");

			// 1
			$(".carousel-item").each(function(){
				var itemImage = $(this).children(".item-image");
				itemImage.css({
					"height": "0",
					"padding-bottom": "56.25%"
				});

				// force the carousel to be as tall as the tallest carousel-item
				var items = $(".carousel").find(".carousel-item");
				var maxHeight = 0;
				items.each(function(){
					maxHeight = ($(this).innerHeight() >= maxHeight) ? $(this).innerHeight() : maxHeight;
				});
				$(".carousel-inner").height(maxHeight);

				// Position the controls at the bottom of the image
				$(".vt-carousel-control-belowImage").each(function(){
					var height = 0;
					if($(firstItem).innerHeight() <= 0){
						height = firstItem.width() * 0.5625;
					}
					else{
						height = $(firstItem).innerHeight();
					}
					$(this).css({
						"top": (height - $(this).innerHeight())
					})
				});

			});

			// position the left and right controls in the middle of the image
			$(".vt-carousel-control-belowImage").find(".carousel-control").each(function(){
				$(this).css({
					"height": (firstItem.innerHeight()),
					"top": -(firstItem.innerHeight() - 50)
				})
			});

			// Listen for the BS "slid" event and update the position of the indicators so that it is always at the bottom of the image
			// equal height code makes this unnecessary
			// $('.carousel').on('slid.bs.carousel', function(){
			// 	var captionHeight = $(".carousel-item.active > .carousel-caption").height();
			// 	console.log(captionHeight);
			// 	$(".vt-carousel-control-belowImage").css({
			// 		"bottom": captionHeight
			// 	});
			// });

			// apply bootstrap carousel-fade class
			if($(".vt-carousel-fade").length > 0){
				$(".vt-carousel-fade").find(".carousel").addClass("carousel-fade");
			}


		});
	}

	// vt-list
	// change the default bootstrap grid classes
	if($(".vt-list").length > 0){
		$(".vt-list").find(".item").each(function(){
			// Add extra markup for tags so that we can do the rounded edges with pseudo elements
			var tags = $(this).find(".vt-list-tags a");
			tags.each(function(){
				var text = $(this).text();
				$(this).text("");
				$(this).append("<span>" + text + "</span>");
			})
		});
		// replace grid for default, right aligned images
		if($(".vt-list").find(".image-format-positionRight")){
			$(".vt-list").find(".image-format-positionRight").each(function(){
				$(this).find(".item").each(function(){
					$(this).find("> .row > li:first-child").removeClass("col-sm-8").addClass("col-sm-7");
					$(this).find("> .row > li:last-child").removeClass("col-sm-4").addClass("col-sm-5");
				})
			})
		}
		// replace grid for hidden images
		if($(".vt-list").find(".image-format-hide")){
			$(".vt-list").find(".image-format-hide").each(function(){
				$(this).find(".item").each(function(){
					$(this).find("> .row > li:first-child").removeClass("col-sm-12").addClass("col-sm-7 col-md-8");
				})
			})
		}
		// check for two-col
		if($(".vt-list").find(".vt-num-col-2").find(".image-format-positionLeft")){
			listColFullWidth($(".vt-list").find(".vt-num-col-2").find(".image-format-positionLeft"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-2").find(".image-format-positionRight")){
			listColFullWidth($(".vt-list").find(".vt-num-col-2").find(".image-format-positionRight"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-2").find(".image-format-hide")){
			listColFullWidth($(".vt-list").find(".vt-num-col-2").find(".image-format-hide"), ["col-sm-12"]);
		}
		// check for three-col
		if($(".vt-list").find(".vt-num-col-3").find(".image-format-positionLeft")){
			listColFullWidth($(".vt-list").find(".vt-num-col-3").find(".image-format-positionLeft"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-3").find(".image-format-positionRight")){
			listColFullWidth($(".vt-list").find(".vt-num-col-3").find(".image-format-positionRight"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-3").find(".image-format-hide")){
			listColFullWidth($(".vt-list").find(".vt-num-col-3").find(".image-format-hide"), ["col-sm-12"]);
		}
		// check for four-col
		if($(".vt-list").find(".vt-num-col-4").find(".image-format-positionLeft")){
			listColFullWidth($(".vt-list").find(".vt-num-col-4").find(".image-format-positionLeft"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-4").find(".image-format-positionRight")){
			listColFullWidth($(".vt-list").find(".vt-num-col-4").find(".image-format-positionRight"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-4").find(".image-format-hide")){
			listColFullWidth($(".vt-list").find(".vt-num-col-4").find(".image-format-hide"), ["col-sm-12"]);
		}
		// check for six-col
		if($(".vt-list").find(".vt-num-col-6").find(".image-format-positionLeft")){
			listColFullWidth($(".vt-list").find(".vt-num-col-6").find(".image-format-positionLeft"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-6").find(".image-format-positionRight")){
			listColFullWidth($(".vt-list").find(".vt-num-col-6").find(".image-format-positionRight"), ["col-sm-12"]);
		}
		if($(".vt-list").find(".vt-num-col-6").find(".image-format-hide")){
			listColFullWidth($(".vt-list").find(".vt-num-col-6").find(".image-format-hide"), ["col-sm-12"]);
		}

		// replace grid for default, left aligned images
		if($(".vt-list").find(".image-format-positionLeft")){
			$(".vt-list").find(".image-format-positionLeft").each(function(){
				$(this).find(".item").each(function(){
					$(this).find("> .row > li:first-child").removeClass("col-sm-4").addClass("col-sm-5");
					$(this).find("> .row > li:last-child").removeClass("col-sm-8").addClass("col-sm-7");
					var lastChild = $(this).find("> .row > li:last-child");
					if(lastChild[0].innerHTML.trim() === ""){
						lastChild.remove();
						$(this).find("> .row > li:first-child").removeClass().addClass("col-sm-12 list-no-text");
					}
				})
			})
		}

		if($(".vt-list").hasClass("vt-list-listOfLinks")){
			if(
				$(".vt-list-listOfLinks").hasClass("block-dividers") ||
				$(".vt-list-listOfLinks").hasClass("little-dividers") ||
				$(".vt-list-listOfLinks").hasClass("button-dividers")
			){
				$(".vt-list-listOfLinks.block-dividers").each(function(){
					$(this).find(".item").each(function(){
						$(this).find("> .row > li:first-child").removeClass().addClass("col-sm-12");
					})
				})
				$(".vt-list-listOfLinks.little-dividers").each(function(){
					$(this).find(".item").each(function(){
						$(this).find("> .row > li:first-child").removeClass().addClass("col-sm-12");
					})
				})
				$(".vt-list-listOfLinks.button-dividers").each(function(){
					$(this).find(".item").each(function(){
						$(this).find("> .row > li:first-child").removeClass().addClass("col-sm-12");
					})
				})
			}
		}

		// if not positionTop or positionBottom, remove the layout from the image's containing column if there is no page image
		if($(".vt-list").find(".vt-list-item-no-image")){
			$(".vt-list").find(".vt-list-item-no-image").each(function(){
				if($(this).parents(".image-format-positionTop").length === 0 && $(this).parents(".image-format-positionBottom").length === 0){
					$(this).parent("li").siblings("li").removeClass().addClass("col-sm-7 col-md-8");
					$(this).parent("[class*='col']").css({
						"width" : "0",
						"height" : "0",
						"position" : "absolute"
					})
				}
			})
		}

		// go find all the figures and set the bg images to enforce the image aspect ratio
		if($(".vt-list").find(".image-format-positionTop")){
			var figure = $(".vt-list").find(".image-format-positionTop .item figure");
			listTopAlignBGImage(figure);
		}

		if($(".vt-llist").find(".image-format-positionBottom")){
			var figure = $(".vt-list").find(".image-format-positionBottom .item figure");
			listTopAlignBGImage(figure);
		}

		if($(".vt-list").find(".image-format-positionLeft")){
			var figures = $(".vt-list").find(".image-format-positionLeft .item .vt-list-item-img figure");
			listTopAlignBGImage(figures);
		}

		if($(".vt-list").find(".image-format-positionLeftMedium")){
			var figures = $(".vt-list").find(".image-format-positionLeftMedium .item .vt-list-item-img figure");
			listTopAlignBGImage(figures);
		}

		if($(".vt-list").find(".image-format-positionLeftLarge")){
			var figures = $(".vt-list").find(".image-format-positionLeftLarge .item .vt-list-item-img figure");
			listTopAlignBGImage(figures);
		}

		if($(".vt-list").find(".image-format-positionRight")){
			var figures = $(".vt-list").find(".image-format-positionRight .item .vt-list-item-img figure");
			listTopAlignBGImage(figures);
		}

		if($(".vt-list").find(".image-format-positionRightMedium")){
			var figures = $(".vt-list").find(".image-format-positionRightMedium .item .vt-list-item-img figure");
			listTopAlignBGImage(figures);
		}

		if($(".vt-list").find(".image-format-positionRightLarge")){
			var figures = $(".vt-list").find(".image-format-positionRightLarge .item .vt-list-item-img figure");
			listTopAlignBGImage(figures);
		}
		//

		if($(".vt-list").hasClass("vt-contentList")){
			$(".vt-contentList").each(function(){
				if(
					$(this).find(".image-format-positionLeft").length > 0 ||
					$(this).find(".image-format-positionTop").length > 0  ||
					$(this).find(".image-format-positionLeftMedium").length > 0  ||
					$(this).find(".image-format-positionLeftLarge").length > 0
				)
				{
					$(this).find(".item [class*='col']:first-child")
					.removeClass()
					.addClass("col-sm-12")

					$(this).find(".item [class*='col']:last-child")
					.removeClass()
					.addClass("col-xl-8 col-sm-12")
				}
				if($(this).find(".image-format-positionRight").length > 0 || $(this).find(".image-format-positionBottom").length > 0)
				{
					$(this).find(".item [class*='col']:last-child")
					.removeClass()
					.addClass("col-sm-12")

					$(this).find(".item [class*='col']:first-child")
					.removeClass()
					.addClass("col-xl-8 col-sm-12")
				}
			})
		}
	// vt-list

	// vt-feedreader
	if($(".vt-feedreader").length > 0) {
		$(".vt-feedreader").find(".vt_feed_items li").each(function() {
			var html = $(this).html();
			$(this).html("<div class='col-sm-8'>" + html + "</div>")
		});
	}
	// vt-feedreader

	}

	// vt-subnav
	if($(".vt-subnav").length > 0) {
		$(".vt-subnav-droplist-control").click(function () {
			subnavToggle();
		});
	}

	$(".vt-subnav").on("keydown", function (e) {

		if ($(".vt-subnav-droplist-control").hasClass("open")) {
			var i = $(":focus").get(0);
			var j = subnavInputs.index(i);

			if ((e.which === 9 && e.shiftKey) && j == 0)  {
				subnavToggle();
			}

			if ((e.which === 9 && !e.shiftKey) && j === (subnavInputs.length - 1))  {
				subnavToggle();
			}
		}
	});

	// vt-subnav

	// vt-callToAction
	// if($(".vt-callToAction").length > 0){

		// var callToAction = $(".vt-callToAction");

		// $(".vt-callToAction").remove();

		// $("#vt_main").prepend(callToAction);

		// $(".vt-callToAction").each(function(){
		// 	$(this).find("> .row > [class*='col']:first-child").removeClass().addClass("col-12 col-md-6 col-lg-6 vt-callToAction-message");
		// 	$(this).find("> .row > [class*='col']:last-child").removeClass().addClass("col-12 col-md-6 vt-callToAction-supplement");
		// });

        // var supplement = $(".vt-callToAction-supplement");

        // var imgSrc = $(supplement).find("img").attr("src");

		// var imgSrcSet = $(supplement).find("img").attr("srcset");

		// var bgImage = $("<div class='vt-callToAction-supplement-fig' aria-hidden='true'></div>").css({
		// 	"background-image": "url(" + findImgSize(imgSrcSet) + ")"
		// });

		// supplement.prepend(bgImage);

		// grab and store header
		// var $header = $(".vt-callToAction-message-heading > h3");
		// set display to none
		// $header.hide();

		// var headerText =
		// 	fragmentHTML($header.html().trim(), {
		// 		tagName: "span",
		// 		attributes: {
		// 			class: "vt-callToAction-message-header-fragment"
		// 		}
		// 	});

		// $header.html(
		// 	"<h3>" + headerText.join(" ") + "</h3>"
		// );

		// $header.show();

		// var $links = $(".vt-callToAction-message-secondary-link a");
		// $links.each(function(){
		// 	$(this).append("<span class='fas fa-arrow-right'></span>");
		// });

	// 	$(".vt-callToAction-message .vt-col > div:last-child").addClass("vt-callToAction-message-secondary-container");

    // $(".vt-callToAction-supplement figure").addClass("vt-callToAction-supplement-image");

//   }
	// vt-callToAction

	// vt-listStripe
	if($(".vt-listStripe").length > 0){
		$(".vt-listStripe").each(function(){
			$(".vt-listStripe-button a").append("<span class='far fa-arrow-right'></span>");
		});
	}
	// vt-listStripe

	// vt-upcomingEvents
	if($(".vt-upcomingEvents").length > 0){
		var upcomingEvents = $(".vt-upcomingEvents");
		upcomingEvents.each(function(){
			$(this).find(".vt_feed_items").children("li").each(function(){
				$(this).addClass("vt-upcomingEvents-event");
				var $date = $(this).find(".vt_feed_iDate");
				$date.html(
					fragmentHTML($date.html(), {})
				);
				$(this).prepend("<div class='col-sm-3 vt-upcomingEvents-event-date'>" + $date[0].outerHTML + "</div>");
				$date.remove();
			});

			// find cTitle link
			var $cTitle = $(this).find(".vt_feed_cTitle").parent();
			// grab its href
			var cTitleHref = $cTitle.attr("href");
			// hide it
			$cTitle.remove();
			// insert a new link with new class and href
			$(this).append(
				"<a href='" + cTitleHref + "' class='vt-upcomingEvents-viewMore'>" +
					"<span class='vt-upcomingEvents-viewMore-icon'><span class='fas fa-arrow-right'></span></span>" +
					"<span class='vt-upcomingEvents-viewMore-text'>View More</span>" +
				"</a>"
			);

			// get multicolumn
			var $multicolumn = $(this).find(".vt-multicolumn");
			// update the classes
			$multicolumn.find(".row  > [class*='col']:first-child").removeClass().addClass("col-12 col-xl-2");
			$multicolumn.find(".row  > [class*='col']:last-child").removeClass().addClass("col-12 col-lg-11 col-xl-9");

		});
	}
	// vt-upcomingEvents

	//featured video overlay click toggle
	if($(".vt-featured-media").length > 0) {
		$(".vt-featured-media").each(function() {
			var tempID = $(".vt-featured-media").find(".vt-video > div[id*=vt_video]").attr("id"),
					tempTitle = $(".vt-featured-media").find(".vt-featured-media-title p").text();
			jwplayer(tempID).setControls(false);

			$(".vt-featured-media > .vt-vtcontainer-content").append('<button class="vt-featured-media-play">Play the ' + tempTitle + ' video</button>');
		});
	}

	$(".vt-featured-media-title, vt-featured-media-info, .vt-featured-media-play").on('click', function() {
		var tempID = $(this).closest(".vt-vtcontainer-content").find(".vt-video > div[id*=vt_video]").attr("id");

		$(".vt-featured-media-title, .vt-featured-media-info, .vt-featured-media-play").hide();
		$(".vt-featured-media-action").addClass("open");
		$(".vt-featured-media-assets").addClass("open");
		$(".vt-featured-media-collapse").show();

		$(this).closest(".vt-vtcontainer-content").find(".jw-aspect").addClass("active");

		if(jwplayer(tempID).getState() === "idle" || jwplayer(tempID).getState() === "paused") {
			jwplayer(tempID).play();
		}
	});

	$(".vt-featured-media-collapse").on('click', function() {
		var tempID = $(this).closest(".vt-vtcontainer-content").find(".vt-video > div[id*=vt_video]").attr("id");

		$(".vt-featured-media-title, .vt-featured-media-info, .vt-featured-media-play").show();
		$(".vt-featured-media-action").removeClass("open");
		$(".vt-featured-media-assets").removeClass("open");
		$(".vt-featured-media-collapse").hide();

		$(this).closest(".vt-vtcontainer-content").find(".jw-aspect").removeClass("active");

		if(jwplayer(tempID).getState() === "playing") {
			jwplayer(tempID).pause();
		}
	});

	//Our Vision link wrap script
	$(".vt-our-vison-link a").each(function() {
		var visionLink = $(this).get(0),
				visionLinkTitle = $(this).closest(".vt-vtcontainer-content").find(".vt-our-vision-articleTitle").text();

		$(this).addClass("vt-vision-link");

		$(this).closest(".vt-vtcontainer-content").find(".vt-our-vision-2col > .row").wrap(visionLink);

		$(this).closest(".vt-vtcontainer-content").find(".vt-our-vision-2col").append('<span class="sr-only">Read more about ' + visionLinkTitle + '</span>');

		$(this).remove();

	})

	/* begin feature grid scripts */

  $(".vt-feature-grid").parent().addClass("vt-nomargin-bottom");

  $(".fg-big-2x2, .fg-mixed-2x2, .fg-mixed-3x2, .fg-mixed-5x2, .fg-wide-2x1, .fg-wide-2x1-holder, .fg-tall-1x2, .fg-grid-item-image, .fg-grid-item-info").each(function() {

    if($(this).hasClass("fg-big-2x2")) {
      $(this).removeClass("fg-big-2x2");
      $(this).parent().addClass("fg-big-2x2");
    }

    if($(this).hasClass("fg-mixed-2x2")) {
      $(this).removeClass("fg-mixed-2x2");
      $(this).parent().addClass("fg-mixed-2x2");
    }

    if($(this).hasClass("fg-mixed-3x2")) {
      $(this).removeClass("fg-mixed-3x2");
      $(this).parent().addClass("fg-mixed-3x2");
    }

		if($(this).hasClass("fg-mixed-5x2")) {
      $(this).removeClass("fg-mixed-5x2");
      $(this).parent().addClass("fg-mixed-5x2");
    }

    if($(this).hasClass("fg-wide-2x1")) {
      $(this).removeClass("fg-wide-2x1");
      $(this).parent().addClass("fg-wide-2x1");
    }

    if($(this).hasClass("fg-wide-2x1-holder")) {
      $(this).removeClass("fg-wide-2x1-holder");
      $(this).parent().addClass("fg-wide-2x1-holder");
    }

    if($(this).hasClass("fg-tall-1x2")) {
      $(this).removeClass("fg-tall-1x2");
      $(this).parent().addClass("fg-tall-1x2");
    }

    if($(this).hasClass("fg-grid-item-image")) {
      $(this).removeClass("fg-grid-item-image");
      $(this).parent().addClass("fg-grid-item-image");
    }

    if($(this).hasClass("fg-grid-item-info")) {
      $(this).removeClass("fg-grid-item-info");
      $(this).parent().addClass("fg-grid-item-info");
    }
  });

  $(".fg-mixed-2x2-row .fg-grid-item, .fg-mixed-3x2-row .fg-grid-item, .fg-mixed-5x2-row .fg-grid-item").each(function() {
    $(this).removeClass("fg-grid-item");
    $(this).parent().addClass("fg-grid-item");
  });

  $(".fg-mixed-2x2-row .fg-grid-item-center, .fg-mixed-3x2-row .fg-grid-item-center, .fg-mixed-5x2-row .fg-grid-item-center").each(function() {
    $(this).removeClass("fg-grid-item-center");
    $(this).parent().addClass("fg-grid-item-center");
  });

	$(".fg-grid-item .fg-grid-item-info .vt-text.instagram p:nth-child(2)").append('<span class="fab fa-instagram social-icon"></span>');

  $(".vt-feature-grid").show();

  /* end feature grid scripts */

}); /* end document.ready */


/**
 * Takes a string of html, splits it on the spaces, and wraps a dom element
 * around each word. Applies any extra attributes that exist in the options object
 * @param {string} text
 * @param {obj} options
 * @return array of strings
 */
function fragmentHTML(text, options){

	text = (text && (text !== " ")) ? text : "";
	// parse and split html by spaces
	var htmlArray = text.split(" ").map(function(val, i, text){
		// wrap each word in span or otherwise specified in config
		var tagName = (options.tagName) ? options.tagName : "span";

		return "<" + tagName + ">" + val + "</" + tagName + ">";
	});

	// apply any attrs in config
	var headerText = htmlArray.map(function(val, i, htmlArray){
		if(options.attributes){
			for(var prop in options.attributes){
				val = $(val).attr(prop, options.attributes[prop]);
			}
		}
		return val[0].outerHTML || val;
	});

	return headerText;
}

/**
 * Takes the image srcset attribute and determines the image to display based on the browser width. To be used when
 * you need to put a background image on something via JS.
 * @param {string} imgSrcSet - the srcset attribute of the img element
 */
function findImgSize(imgSrcSet){
	// split the string on the comma
	var imgSources = imgSrcSet.split(",").map(function(sourceStr, i, imgSources){
		// split those strings on the space
		return sourceStr.trim().split(" ");
	});

	// poll the window width
	var windowWidth = window.innerWidth;

	// if window size is gte src size, use that one
	return imgSources.reduce(function(src, curr, i, imgSources){
		// parse and store the int
		var imgWidth = parseInt(curr[1], 10);
		if(imgWidth >= windowWidth){
			src = curr;
		}

		return src;

	})[0];
}


/**
 * Takes an array of selectors and adds the specified class name
 * @param {*} elArr
 * @param {*} className
 */
function addClassNameToSet(elArr, className){
	$(elArr).each(function(i){
		$(elArr[i]).addClass(className);
	})
}

/**
 * Takes an array of selectors and removes the specified class name
 * @param {*} elArr
 * @param {*} className
 */
function removeClassNameFromSet(elArr, className){
	$(elArr).each(function(i){
		$(elArr[i]).removeClass(className);
	})
}

/**
 * Takes a set of figures from a list component and sets a bg image
 * in css to be the the img src from its img child. This is needed
 * to enforce the aspect ratio.
 * @param figures - a set of figures in a list item - jquery obj
 */
function listTopAlignBGImage(figures){
	figures.each(function(){
		var img = $(this).find("img");
		$(this).css({
			"background-image": "url(" + img.attr("src") + ")"
		})
	})
}

/**
 * Takes a set of list items and replaces the grid classes with the specified class
 * @param columns - a set of columns - jquery obj
 * @param addClass - the class(es) to add - array
*/
function listColFullWidth(columns, addClass){
	columns.find(".item").each(function(i){
		var cols = $(this).find("> .row > li");
		cols.each(function(i){
			var newCol = addClass[i] || addClass[0];
			$(this).removeClass().addClass(newCol);
		})
	})
}

$(window).click(function() {
	//hide resources for on click off of it
		if($(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded") === "true" && $(".vt-nav-toggle").attr("aria-expanded") === "false") {
			resourcesToggle();
		}
});

$(window).on('load', function() {

	/* search page relevance tab index & role */
	if ($("body.vt-search .gsc-selected-option-container").length > 0) {
		$(".gsc-selected-option-container").attr({
			"tabindex" : "0",
			"role" : "button"
		})
	}

	//begin image class script
	$(".vt-image img, .vt-list-item-img figure img").each(function() {

		if($(this).closest(".vt-callToAction-supplement").length <= 0){

			if (this.height === this.width && $(this).parents(".vt-transparent-bg").length === 0) {

					//begin image component portrait treatment

					$(this).parents(".vt-list-item-img, .vt-image").addClass("vt-square");

					$(this).parents("figure").addClass("vt-image-portraitFigure");
					$(this).parents("picture").addClass("vt-image-portraitPicture");
					$(this).addClass("vt-image-portraitImage");

					$(this).parents("picture").prepend('<svg preserveAspectRatio="xMinYMin meet" class="vt-image-blurHolder" viewBox="0 '+$(this).height()+' '+$(this).parents("figure").width()+' '+(($(this).parents("figure").width() * this.naturalHeight) / this.naturalWidth )+'"><defs><filter id="blur"><feGaussianBlur stdDeviation="20" /></filter></defs><g opacity="0.8"><image class="blur-image" xlink:href="'+$(this).attr("src")+'" width="250%" height="250%" filter="url(#blur)"></image></g></svg>');

					$(this).width( ((this.naturalWidth / this.naturalHeight) * this.height) + "px");

				//end image component square treatment
			} else if (this.height > this.width && $(this).parents(".vt-transparent-bg").length === 0) {

				//begin image component portrait treatment

					$(this).parents(".vt-image, .vt-list-item-img").addClass("vt-portrait");

					$(this).parents("figure").addClass("vt-image-portraitFigure");
					$(this).parents("picture").addClass("vt-image-portraitPicture");
					$(this).addClass("vt-image-portraitImage");

					$(this).parents("picture").prepend('<svg preserveAspectRatio="xMinYMin meet" class="vt-image-blurHolder" viewBox="0 '+$(this).height()+' '+$(this).parents("figure").width()+' '+(($(this).parents("figure").width() * this.naturalHeight) / this.naturalWidth )+'"><defs><filter id="blur"><feGaussianBlur stdDeviation="20" /></filter></defs><g opacity="0.8"><image class="blur-image" xlink:href="'+$(this).attr("src")+'" width="250%" height="250%" filter="url(#blur)"></image></g></svg>');

					$(this).width( ((this.naturalWidth / this.naturalHeight) * this.height) + "px");

				//end image component portrait treatment

			} else if($(this).parents(".vt-transparent-bg").length === 0) {
					$(this).parents(".vt-list-item-img, .vt-image").addClass("vt-landscape");
			}
		}

	});
	//end image class script

	$(".vt-callToAction .vt-image-portraitFigure").removeClass("vt-image-portraitFigure");
	$(".vt-callToAction .vt-image-portraitPicture").removeClass("vt-image-portraitPicture");

});

$(window).resize(function() {

	/* universal access mobile check */
	accessMode();

	//breadcrumb toggle
	breadcrumbMode();

	//update nav item list
	navInputs = $("#vt_offcanvas_nav.open").find('a, button').filter(':visible');

	//portrait image scaling
	$(".vt-image-portraitImage").each(function() {
		$(this).width( ((this.naturalWidth / this.naturalHeight) * this.height) + "px");
	});

	//hide resources for on resize
	if($(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded") === "true" && $(".vt-one-preHeader .vt-nav-toggle").attr("aria-expanded") === "false") {
		resourcesToggle();
	}

	if($(".vt-carousel").length > 0){

		$(".vt-carousel").each(function(){
			var firstItem = $(".carousel-item:eq(0) .item-image");

			// 1
			$(".carousel-item").each(function(){
				var itemImage = $(this).children(".item-image");
				itemImage.css({
					"height": "0",
					"padding-bottom": "56.25%"
				});

				// force the carousel to be as tall as the tallest carousel-item
				var items = $(".carousel").find(".carousel-item");
				var maxHeight = 0;
				items.each(function(){
					maxHeight = ($(this).innerHeight() >= maxHeight) ? $(this).innerHeight() : maxHeight;
				});
				$(".carousel-inner").height(maxHeight);

				// Position the controls at the bottom of the image
				$(".vt-carousel-control-belowImage").each(function(){
					var height = 0;
					if($(firstItem).innerHeight() <= 0){
						height = firstItem.width() * 0.5625;
					}
					else{
						height = $(firstItem).innerHeight();
					}
					$(this).css({
						"top": (height - $(this).innerHeight())
					})
				});

			});

			// position the left and right controls in the middle of the image
			$(".vt-carousel-control-belowImage").find(".carousel-control").each(function(){
				$(this).css({
					"height": (firstItem.innerHeight()),
					"top": -(firstItem.innerHeight() - 50)
				})
			});
		});
	}
});

$(window).on('scroll', function() {

	//hide resources for on scroll
		if($(".vt-one-preHeader .vt-resources-toggle").attr("aria-expanded") === "true" && $(".vt-one-preHeader .vt-nav-toggle").attr("aria-expanded") === "false") {
			resourcesToggle();
		}

});

/**
 * Prevent body scroll and overscroll.
 * Tested on mac, iOS chrome / Safari, Android Chrome.
 *
 * Based on: https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
 *           https://stackoverflow.com/a/41601290
 *
 * Use in combination with:
 * html, body {overflow: hidden;}
 *
 * and: -webkit-overflow-scrolling: touch; for the element that should scroll.
 *
 * disableBodyScroll(true, '.i-can-scroll');
 */
var disableBodyScroll = (function () {

    /**
     * Private variables
     */
    var _selector = false,
        _element = false,
        _clientY;

    /**
     * Polyfills for Element.matches and Element.closest
     */
    if (!Element.prototype.matches)
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

    if (!Element.prototype.closest)
        Element.prototype.closest = function (s) {
            var ancestor = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (ancestor.matches(s)) return ancestor;
                ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return el;
        };

    /**
     * Prevent default unless within _selector
     *
     * @param  event object event
     * @return void
     */
    var preventBodyScroll = function (event) {
        if (false === _element || !event.target.closest(_selector)) {
            event.preventDefault();
        }
    };

    /**
     * Cache the clientY co-ordinates for
     * comparison
     *
     * @param  event object event
     * @return void
     */
    var captureClientY = function (event) {
        // only respond to a single touch
        if (event.targetTouches.length === 1) {
            _clientY = event.targetTouches[0].clientY;
        }
    };

    /**
     * Detect whether the element is at the top
     * or the bottom of their scroll and prevent
     * the user from scrolling beyond
     *
     * @param  event object event
     * @return void
     */
    var preventOverscroll = function (event) {
        // only respond to a single touch
	    if (event.targetTouches.length !== 1) {
	    	return;
	    }

	    var clientY = event.targetTouches[0].clientY - _clientY;

	    // The element at the top of its scroll,
	    // and the user scrolls down
	    if (_element.scrollTop === 0 && clientY > 0) {
	        event.preventDefault();
	    }

	    // The element at the bottom of its scroll,
	    // and the user scrolls up
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
		if ((_element.scrollHeight - _element.scrollTop <= _element.clientHeight) && clientY < 0) {
	        event.preventDefault();
	    }

    };

    /**
     * Disable body scroll. Scrolling with the selector is
     * allowed if a selector is porvided.
     *
     * @param  boolean allow
     * @param  string selector Selector to element to change scroll permission
     * @return void
     */
    return function (allow, selector) {
    	if (typeof selector !== "undefined") {
	        _selector = selector;
	        _element = document.querySelector(selector);
    	}

        if (true === allow) {
        	if (false !== _element) {
	            _element.addEventListener('touchstart', captureClientY, false);
	            _element.addEventListener('touchmove', preventOverscroll, false);
        	}
            document.body.addEventListener("touchmove", preventBodyScroll, false);
        } else {
        	if (false !== _element) {
	            _element.removeEventListener('touchstart', captureClientY, false);
	            _element.removeEventListener('touchmove', preventOverscroll, false);
	        }
            document.body.removeEventListener("touchmove", preventBodyScroll, false);
        }
    };
}());
