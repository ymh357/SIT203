
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
	// Category is string after "#" in current url; using it to decide what category of products to display.
	encodedStr=document.location.hash.split("#")[1];
	productName=decodeURIComponent(encodedStr);	
	var product=null;

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
			 
			function Product(sex,category,name,price,FPicture,BPicture,brand,detail,material,care,size,fit){
				this.sex=sex;
				this.category=category;
				this.name=name;
				this.price=price;
				this.FPicture=FPicture;
				this.BPicture=BPicture;
				this.brand=brand;
				this.detail=detail;
				this.material=material;
				this.care=care;
				this.size=size;
				this.fit=fit;
			}
			for(var i=0;i<Total;i++){
				if(xmlhttp.responseXML.documentElement.getElementsByTagName("name").item(i).childNodes[0].nodeValue==productName){
					product=new Product(xmlhttp.responseXML.documentElement.getElementsByTagName("sex").item(i).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("category").item(i).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("name").item(i).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("price").item(i).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("picture").item(i*2+1).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("brand").item(i).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("detail").item(i).childNodes[0].nodeValue,
							xmlhttp.responseXML.documentElement.getElementsByTagName("material").item(i).childNodes[0].nodeValue,
							(!!xmlhttp.responseXML.documentElement.getElementsByTagName("care").item(i).childNodes[0]) ? xmlhttp.responseXML.documentElement.getElementsByTagName("care").item(i).childNodes[0].nodeValue:null,
							(!!xmlhttp.responseXML.documentElement.getElementsByTagName("size").item(i).childNodes[0])?xmlhttp.responseXML.documentElement.getElementsByTagName("size").item(i).childNodes[0].nodeValue:null,
							(!!xmlhttp.responseXML.documentElement.getElementsByTagName("fit").item(i).childNodes[0])?xmlhttp.responseXML.documentElement.getElementsByTagName("fit").item(i).childNodes[0].nodeValue:null);
						
					document.getElementById("mainImage").innerHTML='<img src='+ product.BPicture+' alt="" class="img-responsive">';
					document.getElementById("briefBox").innerHTML='<div class="box"><h1 class="text-center">'+product.name+'</h1><p class="goToDescription"><a href="#details" class="scroll-to">Scroll to product details, material & care and sizing</a></p><p class="price">$'+product.price+'</p><p class="text-center buttons"><a href="basket.html" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> Add to cart</a><a href="basket.html" class="btn btn-default"><i class="fa fa-heart"></i> Add to wishlist</a></p></div>';
					document.getElementById("details").innerHTML='<p><h4>Product details</h4><p>'+product.detail+'</p><h4>Material & care</h4><ul><li>'+product.material+'</li><li>'+product.care+'</li></ul><h4>Size & Fit</h4><ul><li>'+product.fit+'</li><li>'+product.size+'</li></ul><hr>'
					// <blockquote><p><em>Define style this season with Armani\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p></blockquote>
					
					var sex="";
					var category="";
					if(product.sex=="men"){
						sex="men";
						
						$("#menBar").addClass("active");
						document.getElementById("breadcrumb").innerHTML += '<li><a href="category-man.html">men</a></li>';
					}else{
						sex="lady";
						$("#ladiesBar").addClass("active");
						document.getElementById("breadcrumb").innerHTML += '<li><a href="category-lady.html">ladies</a></li>';
					}
					for(var e=0;e<product.category.length;e++){
						category+=product.category[e];
						if(e==0){
							category=category.toUpperCase();		
							// For example: T-shirt.
						}
					}
					
					// Make the category in left to be shown as currently chosen.  
					$("#"+sex+category).addClass("btn default");

					document.getElementById("breadcrumb").innerHTML += '<li>'+product.name+'</li>';
					
					break;
				}						
			}
			if(!product){
				$("#ladiesBar").addClass("active");
				document.getElementById("breadcrumb").innerHTML += '<li><a href="category-lady.html">Ladies</a></li>';
			}
		 }
	}
	xmlhttp.open("GET","products.xml",true);
	xmlhttp.send();			
 });