
function init(){
	
	document.getElementById("removeItem").addEventListener("click", removeItem);
	document.getElementById("addItem").addEventListener("click", addItem);
	document.getElementById("toggleHighlight").addEventListener("click", toogleHighLight);
	document.getElementById("sortItems").addEventListener("click", sortItems);
}

let highlighted = "yellow";
let items = [];
function addItem(){
	
	let x = document.getElementById("fname").value;
	
	if(x.length == 0){
		alert("The item name should be entered");
	}

	if(!isDuplicate(x)){
		let item = {name:x, checked:false, highlighted:false, order:items.length};
		items.push(item);
		displayItem();

	}
	
	else{
		alert("The item name is duplicated");
	}
}

function removeItem(){
	let newItems = [];
	items.forEach(elem =>{
		if(!elem.checked){
			newItems.push(elem);
		}
	});
	items = newItems;
	displayItem();
}

function toogleHighLight(){
	items.forEach(elem =>{
		if(elem.checked){
			elem.highlighted =  !elem.highlighted;
		}
	});
	displayItem();
}

function isDuplicate(itemName){
	for (let i = 0; i < items.length; i++){
		if(items[i].name === itemName){
			return true;
		}
	}
	return false;
}

function sortItems(){
	items.sort(function(a,b){
		if(a.name < b.name){
			return -1;
		}else if(a.name > b.name){
			return 1;
		}else{
			return 0;
		}
	});
	displayItem();
	
}

function toggleCheck(){
	let itemName = this.value;
	items.forEach(elem =>{
		if(elem.name === itemName){
			elem.checked = !elem.checked;
			displayItem();
			return;
		}
	});
}




function displayItem(){
	let highlightColor = "yellow";

	let newList = document.createElement("div");
	newList.id = "list";
	
	items.forEach(elem =>{
	    let newDiv = document.createElement("div");
	    if(elem.highlighted){
		    newDiv.style.backgroundColor = highlightColor;
	    }
	    
	    let newItem = document.createElement("input");
	    newItem.type = "checkbox";
	    newItem.value = elem.name;
	    newItem.id = elem.name;
	    newItem.checked = elem.checked;
	    newItem.onclick = toggleCheck;
	    newDiv.appendChild(newItem);
	
	    let text = document.createTextNode(elem.name);
	    newDiv.appendChild(text);
	
	    newList.appendChild(newDiv);
	});

	let originList = document.getElementById("list");
	originList.parentNode.replaceChild(newList, originList);

}

