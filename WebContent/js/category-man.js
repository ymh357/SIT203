

function Product(FPicture,BPicture,price,brand,name)
{
	this.FPicture=FPicture;
	this.BPicture=BPicture;
	this.price=price;
	this.brand=brand;
	this.name=name;
}

function getProductNumber(){
	/*
		Get total number of products in numArray[0].
		Get men products number in numArray[1].
		Get ladies products number in numArray[2].
		Return numArray.
	*/
	var numArray=new Array(3);
	numArray[0]=0;
	numArray[1]=0;
	numArray[2]=0;
	allSexTags=xmlhttp.responseXML.documentElement.getElementsByTagName("sex");
	numArray[0]=allSexTags.length;
	for(var i=0;i<allSexTags.length;i++){
		if(allSexTags.item(i).childNodes[0].nodeValue=="men"){
			numArray[1]++;
		}else{
			numArray[2]++;
		}
	}
	return numArray;
}


function showItems(items){
	/*
		Parameter: Array of products.
		function: Show products in division 'products'.
	*/
	
	document.getElementById("products").innerHTML="";
	if(items==null || items.length==0){
		return;
	}		
	
	for(var i=0;i<items.length;i++){			
		document.getElementById("products").innerHTML += ('<div class="col-md-4 col-sm-6"><div class="product"><div class="flip-container"><div class="flipper"><div class="front"><a href="detail.html#'+items[i].name+'"><img src="' 
				+ items[i].FPicture
				+ '" alt="" class="img-responsive"></a></div><div class="back"><a href="detail.html#'+items[i].name+'"><img src="'
				+ items[i].BPicture
				+ '" alt="" class="img-responsive"></a></div></div></div><a href="detail.html#'+items[i].name+'" class="invisible"><img src="img/product1.jpg" alt="" class="img-responsive"></a><div class="text"><h3><a href="detail.html#'+items[i].name+'">'
				+ items[i].name
				+ '</a></h3><p class="price">'
				+ 'AU$' + items[i].price
				+ '</p><p class="buttons"><a href="detail.html#'+items[i].name+'" class="btn btn-default">View detail</a><a href="basket.html" class="btn btn-primary"><i class="fa fa-shopping-cart"></i>Add to cart</a></p></div></div></div>');
	}  	
}

function getItems(category){

	/*
		This function is to get products of the specific category in xml.
	*/			
	
	
	var itemCategory="menAll";
	var itemSex="men";
	
	switch(category){
	case "menTShirt":
		itemCategory="T-shirt";
		itemSex="men";
		break;
	case "menShirt":
		itemCategory="shirt";
		itemSex="men";
		break;
	case "menPants":
		itemCategory="pants";
		itemSex="men";
		break;
	case "menAccessory":
		itemCategory="accessory";
		itemSex="men";
		break;
	case "ladyTShirt":
		itemCategory="T-shirt";
		itemSex="ladies";
		break;
	case "ladyShirt":
		itemCategory="shirt";
		itemSex="ladies";
		break;
	case "ladyPants":
		itemCategory="pants";
		itemSex="ladies";
		break;
	case "ladyAccessory":
		itemCategory="accessory";
		itemSex="ladies";
		break;
	case "ladyBag":
		itemCategory="accessory";
		itemSex="ladies";
		break;
	case "ladyBelt":
		itemCategory="accessory";
		itemSex="ladies";
		break;
	case "menBag":
		itemCategory="accessory";
		itemSex="men";
		break;
	case "menBelt":
		itemCategory="accessory";
		itemSex="men";
		break;
	}
		
	var items=new Array();
	
	if(!!itemCategory.match("All")){
		
		for(var i=0;i<Total;i++){
			var sex=xmlhttp.responseXML.documentElement.getElementsByTagName("sex")
					.item(i).childNodes[0].nodeValue;
			if(sex==itemSex){					
				var item=new Product(xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2).childNodes[0].nodeValue,
						xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2+1).childNodes[0].nodeValue,
						xmlhttp.responseXML.documentElement.getElementsByTagName("price").item(i).childNodes[0].nodeValue,
						xmlhttp.responseXML.documentElement.getElementsByTagName("brand").item(i).childNodes[0].nodeValue,
						xmlhttp.responseXML.documentElement.getElementsByTagName("name").item(i).childNodes[0].nodeValue);
				items.push(item);
			}
		}
		
		return items;
	}
	
	if(category=="menBelt" || category=="menBag" || category=="ladyBag" || category=="ladyBelt"){
		for(var i=0;i<Total;i++){
			var cat=xmlhttp.responseXML.documentElement.getElementsByTagName("category")
						.item(i).childNodes[0].nodeValue;
			var sex=xmlhttp.responseXML.documentElement.getElementsByTagName("sex")
					.item(i).childNodes[0].nodeValue;
			if("accessory"==cat && sex==itemSex){
				var name=xmlhttp.responseXML.documentElement.getElementsByTagName("name")
							.item(i).childNodes[0].nodeValue;
				if(((!!name.match("Bag"))&&(!!category.match("Bag"))) ||
					((!!name.match("[Bb]elt"))&&(!!category.match("Belt")))	){
					var item=new Product(xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2).childNodes[0].nodeValue,
											xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2+1).childNodes[0].nodeValue,
											xmlhttp.responseXML.documentElement.getElementsByTagName("price").item(i).childNodes[0].nodeValue,
											xmlhttp.responseXML.documentElement.getElementsByTagName("brand").item(i).childNodes[0].nodeValue,
											name);
					items.push(item);
				}
			}
		}
		return items;
	}
		
	for(var i=0;i<Total;i++){
		var cat=xmlhttp.responseXML.documentElement.getElementsByTagName("category")
				.item(i).childNodes[0].nodeValue;
		var sex=xmlhttp.responseXML.documentElement.getElementsByTagName("sex")
				.item(i).childNodes[0].nodeValue;
		
		if(itemCategory==cat && itemSex==sex){				
			var item=new Product(xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2).childNodes[0].nodeValue,
									xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2+1).childNodes[0].nodeValue,
									xmlhttp.responseXML.documentElement.getElementsByTagName("price").item(i).childNodes[0].nodeValue,
									xmlhttp.responseXML.documentElement.getElementsByTagName("brand").item(i).childNodes[0].nodeValue,
									xmlhttp.responseXML.documentElement.getElementsByTagName("name").item(i).childNodes[0].nodeValue);
			items.push(item);			
		}
	}
	
		return items;
}		
	
	function quickSort(products,seq) {
		/*
			Copyright Declare:
				Reference http://www.jianshu.com/p/e0597e82a2e0,
				Maing some modifications based on that link.
		*/
		
		if (products.length <= 1){
			return products; 
		}
		var pivotIndex = Math.floor(products.length / 2);
		var pivot = products.splice(pivotIndex, 1)[0];		// Choose the middle one as pivot.
		var left = new Array();
		var right = new Array();
		if(seq=="low-high"){				
			for (var i = 0; i < products.length; i++){
				if(products[i].price - pivot.price < 0){
					left.push(products[i]);
				}else{
					right.push(products[i]);
				}
			}
			return quickSort(left,seq).concat([pivot], quickSort(right,seq));
		}else if(seq=="high-low"){
			for (var i = 0; i < products.length; i++){
				if(products[i].price - pivot.price > 0){
					left.push(products[i]);
				}else{
					right.push(products[i]);
				}
			}
			return quickSort(left,seq).concat([pivot], quickSort(right,seq));
		}
	}
	
	function Branded(brands,items){
		/*
			Return branded items array.
		*/
		var outputItems=new Array();
		for(var i=0;i<items.length;i++){	
			// To see if the brand of current product in items is in Array brands. 
			// If not, delete it from items.
			if(isInArray(items[i].brand,brands)){	
				outputItems.push(items[i]);
			}
				
		}
		// Now all products meet the brand demands are in outputItems.
		return outputItems;
	}
	
	function isInArray(a,arr){
		/*
			To see if a is in Array arr.
		*/
		if(!arr){
			return false;
		}
		
		for(var e=0;e<arr.length;e++){
			if(a==arr[e]){
				return true;
			}
		}
		return false;
	}		
	
	function getBrandNum(brandName){
		/*
			Get number of products of brandName.
		*/
		var count=0;
		for(var i=0;i<Total;i++){
			var nodeValue=xmlhttp.responseXML.documentElement.getElementsByTagName("brand").item(i).childNodes[0].nodeValue;
			if(nodeValue==brandName){
				count++;
			}
		}
		return count;
	}

	$(document).ready(function(){
		
		category=document.location.hash.split("#")[1];
		// Category is string after "#" in current url; using it to decide what category of products to display.
		
		beforeDevidedItems=null;	// Products before devided into apges. Each element with certain sequence.
		currentDisplayedItems=null;	// Products currently shown in div. Each element with certain sequence.
		groupItems=null;			// Products of chosen group of number. 
		beforeBrandedItems=null;	// Products before branded. Using it to prevent errors from changing select options of brands.
		
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			 if ( xmlhttp.readyState == 4 && 
		        	xmlhttp.status == 200 &&  xmlhttp.responseXML ){
				 
				 Total = getProductNumber()[0];
				 
				 
				 // Set men products and lady products number.
				 $("#menNum").html(getProductNumber()[1]);
				 $("#ladyNum").html(getProductNumber()[2]);

				 document.getElementById('ArmaniLabel').innerHTML='<input type="checkbox" id="Armani" checked="checked">Armani  ('+ getBrandNum("Armani") +')';
				 document.getElementById('VersaceLabel').innerHTML='<input type="checkbox" id="Versace" checked="checked">Versace  ('+ getBrandNum('Versace') +')';
				 document.getElementById('CarloBruniLabel').innerHTML='<input type="checkbox" id="CarloBruni" checked="checked">Carlo Bruni  ('+ getBrandNum('Carlo Bruni') +')';
				 document.getElementById('JackHoneyLabel').innerHTML='<input type="checkbox" id="JackHoney" checked="checked">Jack Honey  ('+ getBrandNum('Jack Honey') +')';
				 
				 // When open category-man.html.
				 if(!category){
					 category="men";
				 }
				 
				 var items=getItems(category);
					showItems(items);
					
					document.getElementById("belongto").innerHTML = '<li><a href="index.html">Home</a></li>';
					if(!!category.match("men")){
						// Men.
						
						document.getElementById("belongto").innerHTML += '<li>men</li>';
					}else{
						// Ladies.
						
						document.getElementById("belongto").innerHTML += '<li>ladies</li>';
					}
					$("#"+category).addClass("btn default");
					
					// Make the category in left to be shown as currently chosen. 
					beforeDevidedItems=items;
					currentDisplayedItems=items;
					beforeDevidedItems;
					beforeBrandedItems=items;
			 }
		}
		xmlhttp.open("GET","products.xml",true);
		xmlhttp.send(); 
		
		$("#applyBtn").click(function(){
			/*
				1. Brand beforeBrandedItems.
				2. To see if any sequence has been chosen. If yes, sort branded products.
				3. Show sortedBrandedItems or non-sequence branded items.
				4. Change currentDisplayedItems and beforeBrandedItems.
				5. Trigger $("#allProducts").
			*/
			var brands=new Array();
			if($("#Armani").prop("checked")){
				brands.push("Armani");
			}
			if($("#Versace").prop("checked")){
				brands.push("Versace");
			}
			if($("#CarloBruni").prop("checked")){
				brands.push("Carlo Bruni");
			}
			if($("#JackHoney").prop("checked")){
				brands.push("Jack Honey");
			}
			// To see if there is any checkbox chosen, and put the brand into Array brands.

			// Branded products that shown in the div and show after that.
			var brandedItems=Branded(brands, beforeBrandedItems);
							
			// To make brandedItems to display as chosen sequence.
			
			var sortedBrandedItems=null;
			var seq=$("#sort-by").val();
			
			// If seq has not been chosen.
			if(seq==null){
				sortedBrandedItems=brandedItems;
			}else{
				sortedBrandedItems=quickSort(brandedItems, seq);
			}			
			showItems(sortedBrandedItems);
			// Change currentDisplayedItems and beforeDevidedItems.
			currentDisplayedItems=sortedBrandedItems;
			beforeDevidedItems=sortedBrandedItems;
			
			$("#allProducts").trigger("click");
		}); 
		
		$("#menShirt").click(function(){
			
			// Anchor towards content inside current page will not reload the page; So reload the page manually.  
			category=$("#menShirt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#menTShirt").click(function(){
			category=$("#menTShirt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#menPants").click(function(){
			category=$("#menPants").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#menAccessory").click(function(){
			category=$("#menAccessory").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#topMenShirt").click(function(){
			category=$("#topMenShirt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#topMenTShirt").click(function(){
			category=$("#topMenTShirt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#topMenPants").click(function(){
			category=$("#topMenPants").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#bottomMenShirt").click(function(){
			category=$("#bottomMenShirt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#bottomMenTShirt").click(function(){
			category=$("#bottomMenTShirt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#bottomMenPants").click(function(){
			category=$("#bottomMenPants").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#menBag").click(function(){
			category=$("#menBag").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		$("#menBelt").click(function(){
			category=$("#menBelt").attr("href").split("#")[1];
			document.location.replace("category-man.html#"+category);
			location.reload();
			return false;
		});
		
		$("#sort-by").change(function(){
			/*
				1. Sort what are beforeDevidedItems.
				2. Display sorted products.
				3. Change currentDisplayedItems and beforeDevidedItems.
				4. trigger $("#allProducts").
			*/
			var seq=$("#sort-by").val();
			var sortedItems=null;
			var sacrifice = new Array();
			for(var i=0;i<beforeDevidedItems.length;i++){
				sacrifice[i]=beforeDevidedItems[i];
			}
			sortedItems=quickSort(sacrifice,seq);
			showItems(sortedItems);
			// Change the current displayed products and beforeDevidedItems.
			currentDisplayedItems=sortedItems;
			beforeDevidedItems=sortedItems;
			
			$("#allProducts").trigger("click");
		});
		
		$("#clearBrands").click(function(){
			$("#Armani").prop("checked",false);
			$("#Versace").prop("checked",false);
			$("#CarloBruni").prop("checked",false);
			$("#JackHoney").prop("checked",false);
		})
		
		$("#6Products").click(function(){
			/*
				1. Make it primary and disabled. Release others.
				2. Trigger $("#page1").
			*/
			
			$("#6Products").attr({"disabled":"disabled"});
			$("#12Products").removeAttr("disabled");
			$("#allProducts").removeAttr("disabled");
			
			$("#6Products").addClass("btn-primary");
			$("#12Products").removeClass("btn-primary");
			$("#allProducts").removeClass("btn-primary");
			
			/* if(currentDisplayedItems.length>6){
				var sixItems=new Array();
				for(var i=0;i<6;i++){
					sixItems[i]=currentDisplayedItems[i];
				}
				showItems(sixItems);
				groupItems=sixItems;
			} */
			$("#page1").trigger("click");
			/* $("#applyBtn").trigger("click");
			if($("#sort-by").val()!=""){
				$("#sort-by").trigger("change");
			}  */
		});
		$("#12Products").click(function(){
			
			
			$("#12Products").attr({"disabled":"disabled"});
			$("#6Products").removeAttr("disabled");
			$("#allProducts").removeAttr("disabled");
			
			$("#12Products").addClass("btn-primary");
			$("#6Products").removeClass("btn-primary");
			$("#allProducts").removeClass("btn-primary");
			
			$("#page1").trigger("click");
		});
		$("#allProducts").click(function(){	
			
			
			$("#allProducts").attr({"disabled":"disabled"});
			$("#6Products").removeAttr("disabled");
			$("#12Products").removeAttr("disabled");
			
			$("#allProducts").addClass("btn-primary");
			$("#6Products").removeClass("btn-primary");
			$("#12Products").removeClass("btn-primary");
			
			$("#page1").trigger("click");
		});
		
		$("#page1").click(function(){
			$("#page1").attr({"disabled":"disabled"});
			$("#backwardPage").attr({"disabled":"disabled"});
			$("#page2").removeAttr("disabled");
			$("#page3").removeAttr("disabled");
			$("#page4").removeAttr("disabled");
			$("#page5").removeAttr("disabled");
			
			$("#page1").addClass("active");
			$("#page2").removeClass("active");
			$("#page3").removeClass("active");
			$("#page4").removeClass("active");
			$("#page5").removeClass("active");
			
			if(!!$("#6Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=6){
					var sixItems=new Array();
					for(var i=0;i<6;i++){
						sixItems[i-0]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else if(beforeDevidedItems.length>0 && beforeDevidedItems.length<6){
					var sixItems=new Array();
					for(var i=0;i<beforeDevidedItems.length;i++){
						sixItems[i-0]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}
			}else if(!!$("#12Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=12){
					var tlvItems=new Array();
					for(var i=0;i<12;i++){
						tlvItems[i-0]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else if(0<beforeDevidedItems.length && beforeDevidedItems.length<12){
					var tlvItems=new Array();
					for(var i=0;i<beforeDevidedItems.length;i++){
						tlvItems[i-0]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#allProducts").attr("class").match("btn-primary")){
				showItems(beforeDevidedItems);
				currentDisplayedItems=beforeDevidedItems;
				
			}else{
				// If all 3 is not selected.
				// Impossible.
			}
			
		});
		$("#page2").click(function(){
			$("#page2").addClass("active");
			$("#page3").removeClass("active");
			$("#page4").removeClass("active");
			$("#page5").removeClass("active");
			$("#page1").removeClass("active");
			
			$("#page2").attr({"disabled":"disabled"});
			$("#page1").removeAttr("disabled");
			$("#page3").removeAttr("disabled");
			$("#page4").removeAttr("disabled");
			$("#page5").removeAttr("disabled");
			if(!!$("#6Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=12){
					var sixItems=new Array();
					for(var i=6;i<12;i++){
						sixItems[i-6]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else if(6<beforeDevidedItems.length && beforeDevidedItems.length<12){
					var sixItems=new Array();
					for(var i=6;i<beforeDevidedItems.length;i++){
						sixItems[i-6]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#12Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=24){
					var tlvItems=new Array();
					for(var i=12;i<24;i++){
						tlvItems[i-12]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else if(12<beforeDevidedItems.length&&beforeDevidedItems.length<24){
					var tlvItems=new Array();
					for(var i=12;i<beforeDevidedItems.length;i++){
						tlvItems[i-12]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#allProducts").attr("class").match("btn-primary")){
				showItems(null);
				currentDisplayedItems=null;
			}else{
				// If all 3 is not selected.
				// Impossible.
			}

		});
		$("#page3").click(function(){
			$("#page3").addClass("active");
			$("#page1").removeClass("active");
			$("#page2").removeClass("active");
			$("#page5").removeClass("active");
			$("#page4").removeClass("active");
			
			$("#page3").attr({"disabled":"disabled"});
			$("#page2").removeAttr("disabled");
			$("#page1").removeAttr("disabled");
			$("#page4").removeAttr("disabled");
			$("#page5").removeAttr("disabled");
			
			if(!!$("#6Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=18){
					var sixItems=new Array();
					for(var i=12;i<18;i++){
						sixItems[i-12]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else if(12<beforeDevidedItems.length && beforeDevidedItems.length<18){
					var sixItems=new Array();
					for(var i=12;i<beforeDevidedItems.length;i++){
						sixItems[i-12]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#12Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=36){
					var tlvItems=new Array();
					for(var i=24;i<36;i++){
						tlvItems[i-24]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else if(24<beforeDevidedItems.length&&beforeDevidedItems.length<36){
					var tlvItems=new Array();
					for(var i=24;i<beforeDevidedItems.length;i++){
						tlvItems[i-24]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else{
					showItems(null);
				}
			}else if(!!$("#allProducts").attr("class").match("btn-primary")){
				showItems(null);
			}else{
				// If all 3 is not selected.
				// Impossible.
			}
		});
		$("#page4").click(function(){
			$("#page4").addClass("active");
			$("#page1").removeClass("active");
			$("#page2").removeClass("active");
			$("#page3").removeClass("active");
			$("#page5").removeClass("active");
			
			$("#page4").attr({"disabled":"disabled"});
			$("#page2").removeAttr("disabled");
			$("#page3").removeAttr("disabled");
			$("#page1").removeAttr("disabled");
			$("#page5").removeAttr("disabled");
			
			if(!!$("#6Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=24){
					var sixItems=new Array();
					for(var i=18;i<24;i++){
						sixItems[i-18]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else if(18<beforeDevidedItems.length && beforeDevidedItems.length<24){
					var sixItems=new Array();
					for(var i=18;i<beforeDevidedItems.length;i++){
						sixItems[i-18]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#12Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=48){
					var tlvItems=new Array();
					for(var i=36;i<48;i++){
						tlvItems[i-36]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else if(36<beforeDevidedItems.length&&beforeDevidedItems.length<48){
					var tlvItems=new Array();
					for(var i=36;i<beforeDevidedItems.length;i++){
						tlvItems[i-36]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#allProducts").attr("class").match("btn-primary")){
				showItems(null);
				currentDisplayedItems=null;
			}else{
				// If all 3 is not selected.
				// Impossible.
			}
		});
		$("#page5").click(function(){
			$("#page5").addClass("active");
			$("#page1").removeClass("active");
			$("#page2").removeClass("active");
			$("#page3").removeClass("active");
			$("#page4").removeClass("active");
			
			$("#page5").attr({"disabled":"disabled"});
			$("#forwardPage").attr({"disabled":"disabled"});
			$("#page2").removeAttr("disabled");
			$("#page3").removeAttr("disabled");
			$("#page4").removeAttr("disabled");
			$("#page1").removeAttr("disabled");
			
			if(!!$("#6Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=30){
					var sixItems=new Array();
					for(var i=24;i<30;i++){
						sixItems[i-24]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else if(24<beforeDevidedItems.length && beforeDevidedItems.length<30){
					var sixItems=new Array();
					for(var i=24;i<beforeDevidedItems.length;i++){
						sixItems[i-24]=beforeDevidedItems[i];
					}
					showItems(sixItems);
					currentDisplayedItems=sixItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#12Products").attr("class").match("btn-primary")){
				if(beforeDevidedItems.length>=60){
					var tlvItems=new Array();
					for(var i=48;i<60;i++){
						tlvItems[i-48]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else if(48<beforeDevidedItems.length&&beforeDevidedItems.length<60){
					var tlvItems=new Array();
					for(var i=48;i<beforeDevidedItems.length;i++){
						tlvItems[i-48]=beforeDevidedItems[i];
					}
					showItems(tlvItems);
					currentDisplayedItems=tlvItems;
				}else{
					showItems(null);
					currentDisplayedItems=null;
				}
			}else if(!!$("#allProducts").attr("class").match("btn-primary")){
				showItems(null);
				currentDisplayedItems=null;
			}else{
				// If all 3 is not selected.
				// Impossible.
			}
		});
		$("#backwardPage").click(function(){
			for(var i=1;i<=5;i++){
				if($("#page"+i).attr("disabled")=="disabled"){
					$("#page"+(i-1)).trigger("click");
					break;
				}	
			}
		});
		
		$("#forwardPage").click(function(){
			for(var i=1;i<=5;i++){
				if($("#page"+i).attr("disabled")=="disabled"){
					$("#page"+(i+1)).trigger("click");
					break;
				}	
			}
		});
	});