
if(sessionStorage.getItem("user")== null)
{
	window.location.replace("../../../index.html")
}
else{

	var current_user = sessionStorage.getItem("user");

	// go back to p_page 

	var go_back_btn = document.getElementById("go_b_t_p_page");
	go_back_btn.onclick = function()
	{
		window.location.href = "../../profile.html";
	}
	
	// profile pic/img coding start 

	var profile_pic = document.getElementById("profile_pic");
	var url = localStorage.getItem(current_user+"image");
	profile_pic.style.backgroundImage = "url("+url+")";
	profile_pic.style.backgroundSize = "cover";
	profile_pic.style.backgroundPosition = "center";

	// add contact icon coding start (10:36)

	var add_icon = document.getElementById("new_contact");
	add_icon.onclick = function() 
	{
	var add_contact_bg = document.getElementById("profile_bg");
	add_contact_bg.style.display = "block";


	// close btn coding start (10:51)

	var close_btn = document.getElementById("close");
	close_btn.onclick = function()
	{
	add_contact_bg.style.display = "none";
	}

	} 

	// ADD CONTACT CODING START

	var add_btn = document.getElementById("add");
	add_btn.onclick = function()
	{
		var c_name = document.getElementById("c_name");
		var c_num = document.getElementById("c_num");
		if(c_num.value != "" && c_name.value != "")
		{
			var new_contact = {name : c_name.value, number : c_num.value};
			var json_text = JSON.stringify(new_contact);
			localStorage.setItem(current_user+"_contact"+c_name.value,json_text);
		}
		else{
			c_name.style.border = "1px solid red";
			c_num.style.border = "1px solid red";
			c_name.style.borderLeft = "5px solid red";
			c_num.style.borderLeft = "5px solid red";
			var new_contact_alert = document.getElementById("new_contact_alert");
			new_contact_alert.style.display = "block";
			


			return false;
		}

	}// ye add btn wala bracket he

	function allcontacts() {
		var i;
		for(i=0;i<localStorage.length;i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match(sessionStorage.getItem("user")+"_contact"))
			{
				var json_text = localStorage.getItem(all_keys);
				var obj = JSON.parse(json_text);

				// making elements in js
				var contact_box = document.createElement("DIV");
				var name_p = document.createElement("P");
				var name_i = document.createElement("I");
				var tool = document.createElement("DIV");
				var edit_i = document.createElement("I");
				var del_i = document.createElement("I");
				var line = document.createElement("HR");
				var num_p = document.createElement("P");
				var num_i = document.createElement("I");

				// setting attributes in elements
				contact_box.setAttribute("id","contact");
				name_i.setAttribute("class","fas fa-user");
				tool.setAttribute("id","tool");
				edit_i.setAttribute("class","fas fa-edit edit");
				del_i.setAttribute("class","fas fa-trash del");
				num_i.setAttribute("class","fas fa-mobile-alt");
				line.setAttribute("width","75%")
				line.setAttribute("color","purple");
				line.setAttribute("size","1");
				name_p.setAttribute("class","contact_name");
				num_p.setAttribute("class","contact_num");
				

				// contact box name joining

				name_p.appendChild(name_i);
				name_p.innerHTML += obj.name;

				tool.appendChild(edit_i);
				tool.appendChild(del_i);

				// contact box number joining

				num_p.appendChild(num_i);
				num_p.innerHTML += obj.number;

				// contact box append child coding

				contact_box.appendChild(name_p);
				contact_box.appendChild(tool);
				contact_box.appendChild(line);
				contact_box.appendChild(num_p);
				
				// all contact box stores append child contact box 				
				var all_contacts_box = document.getElementById("all_contacts_box");
				all_contacts_box.appendChild(contact_box);


			}	
		}
	}

	allcontacts();

	// search box ccodig start form here

	var search = document.getElementById("search");
	search.oninput = function()
	{
		var all_contacts_name = document.getElementsByClassName("contact_name");
		var i;
		for(i=0;i<all_contacts_name.length;i++)
		{
			if(all_contacts_name[i].innerHTML.match(search.value))
			{
				all_contacts_name[i].parentElement.style.display = "block";
			}
			else{
				all_contacts_name[i].parentElement.style.display = "none";
			}

		}

	}
				
	// delete contact coding start
function del_con_btn(){
			var del = document.getElementsByClassName("del");
	var i;
	for(i=0;i<del.length;i++)
	{
		del[i].onclick = function()
		{
			var parent = this.parentElement.parentElement;
			var p_ele = parent.getElementsByClassName("contact_name")[0];
			var username = p_ele.innerHTML.replace('<i class="fas fa-user"></i>','');
			localStorage.removeItem(current_user+"_contact"+username);
			parent.className = "animate__animated animate__bounceOut"
			
			setTimeout(function()
			{
				parent.remove();
			},1000)
			

		}
	}

}
	// edit function coding start(ye me apni tarf se kar raha hu)
	// me is ko work karne ki puri koshish karun ga
	// me next day pe hu aur amit ne bhi yahi methd mere wala use kiya he 

	function edit_btn()
	{
			var edit = document.getElementsByClassName("edit");
	var z;
	for(z=0;z<edit.length;z++)
	{
		edit[z].onclick = function()
		{	
			var con_div_box = this.parentElement.parentElement;

			var contact_profile_bg = document.getElementById("profile_bg");
			contact_profile_bg.style.display = "block";
			var name_value =  con_div_box.getElementsByClassName("contact_name")[0];
			var username_val = name_value.innerHTML.replace('<i class="fas fa-user"></i>' , '');
			var obj_data_div = localStorage.getItem(current_user+"_contact"+username_val);
			var json_txt = JSON.parse(obj_data_div);
			// yaha pe ab me pur koshish karun ga new 
		   // contact ki value me name aur number likhu

			var name_input_box = document.getElementById("c_name");
			name_input_box.value = json_txt.name;

			var number_input_box = document.getElementById("c_num");
			number_input_box.value = json_txt.number;

			 
			// yaha pe ab new contact ka h1 change karein ge

			var change_txt = document.getElementById("new_contact_p_h1");
			change_txt.innerHTML = "Edit your contact";

			var add_button = document.getElementById("add");
			add_button.innerHTML = "Update";
			
				// ab hum yaha par puri koshish krein ge 
			//us purane div ko delete karne ki
			
			con_div_box.remove();




		}
	}
	}

	// bahi yaha p me ne thora sa dimag lagatya he aur function me edit aur del ko lock kar dya he aur function ko yaha pe unloack kar raha hu jis ki wajha se ram me space 90% bache gi
	edit_btn();			// edit btn wala function
	del_con_btn();		//delete wala function 
				
	
	// ye jon sa next line me cursen d bracket he ye else ka he
		
			
}




