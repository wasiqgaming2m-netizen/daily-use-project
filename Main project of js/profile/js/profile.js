window.onload = function()
{
	if(sessionStorage.getItem("user") == null)
	{
		window.location.replace("../index.html");
	}
	else{
		// player btn cding

		var player_div = document.getElementById("player");
		player_div.onclick = function(){
			window.location.href = "apps/Video Player/player.html";
		}

		// logout coding -------------------------------------

		var logout = document.getElementById("logout");
		logout.onclick = function()
		{
			sessionStorage.clear();
			var logout_text = document.getElementById("logout_text").innerHTML = "Please Wait..";
			setTimeout(function(){window.location = "../index.html";} , 2000);
		}


		var user_email = sessionStorage.getItem("user");
		var JSON_text = localStorage.getItem(user_email);
		var obj_text_data = JSON.parse(JSON_text);
		var result_of_name_of_user = document.getElementById("user_profile_data_name");
		result_of_name_of_user.innerHTML = atob(obj_text_data.username);
		var profile_username = document.getElementById("profile_username");
		profile_username.innerHTML = atob(obj_text_data.username);

		// PROFILE PICTURE CODING -------------------------------

		var img_url = localStorage.getItem(user_email+"image");
		var profile_picture = document.getElementById("profile_picture");
		profile_picture.style.backgroundImage = "url("+img_url+")";
		profile_picture.style.backgroundSize = "cover";
		profile_picture.style.backgroundPosition = "center";

		//
		if(localStorage.getItem(user_email + "image") != null)
		{
			var page_cover = document.getElementById("container");
			page_cover.style.display = "none";
		}
		//

		var profile_pic_data = document.getElementById("profile_pic_data");
		//
		profile_pic_data.onchange = function()
		{
			var reader = new FileReader();
		reader.readAsDataURL(profile_pic_data.files[0]);
		reader.onload = function()
		{
			var file_name = reader.result;
			var profile_pic = document.getElementById("profile_pic");
			var user_fafa_icon = document.getElementById("user_fafa_icon");
			profile_pic.style.backgroundImage = "url("+file_name+")";
			profile_pic.style.backgroundSize = "cover";
			profile_pic.style.backgroundPosition = "center";
			user_fafa_icon.style.display = "none";

			var profile_picture = document.getElementById("profile_picture");

			profile_picture.style.backgroundImage = "url("+file_name+")";
			profile_picture.style.backgroundSize = "cover";
			profile_picture.style.backgroundPosition = "center";

			var next_btn_p = document.getElementById("profile_pic_next_btn");
			next_btn_p.style.display = "block";
			next_btn_p.onclick = function()
			{
				localStorage.setItem(user_email +"image",file_name);
				var page_cover = document.getElementById("container");
				page_cover.style.display = "none";
				window.location = location.href;
				
			}
		}
		}

		// bbb

		var contact_btn = document.getElementById("contact");
		contact_btn.onclick = function()
		{
			window.location.href = "apps/contacts/contacts.html"
		}
		
	}
}