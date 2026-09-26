var current_user = sessionStorage.getItem("user");
if(current_user == null)
{
	window.location.replace("../../../index.html")
}
else{

	// go back to p_page 

	var go_back_btn = document.getElementById("go_b_t_p_page");
	go_back_btn.onclick = function()
	{
		window.location.href = "../../profile.html";
	}


	 // play pause coding


var video = document.getElementById("video_ply");
var play_btn = document.getElementById("play_btn");
play_btn.onclick = function()
{
	if(play_btn.className == "fas fa-play-circle")
	{
		video.play();
		play_btn.className = "fas fa-pause-circle";
	}
	else if(play_btn.className == "fas fa-pause-circle"){
		video.pause();
		play_btn.className = "fas fa-play-circle";
	}
}


video.onclick = function()
{
	play_btn.click();
}

// progress bar coding 

video.ontimeupdate = function()
{
	var t_duration = this.duration;
	var c_duration = this.currentTime;
	var v_timing = document.getElementById("v_timing");
	var sec = c_duration - parseInt(c_duration/60)*60;
	var t_sec = t_duration - parseInt(t_duration/60)*60;

	v_timing.innerHTML = parseInt(c_duration/60)+":"+parseInt(sec) +" / "+ parseInt(t_duration/60)+":"+ parseInt(t_sec);
	var p_bar = document.getElementById("progress_bar");
	var slide_per = parseInt(c_duration*100/t_duration);
	p_bar.style.width = slide_per+"%";

	if(c_duration == t_duration)
	{
		play_btn.className ="fas fa-play-circle";
	}


}


// add video box open & close coding

var add_box_btn_img = document.getElementById("open_video_box_btn");
add_box_btn_img.onclick = function()
{
	if(add_box_btn_img.className == "fas fa-plus-circle")
	{
		var add_video_d_box = document.getElementById("add_video_box");
		add_video_d_box.style.display = "block";
		add_box_btn_img.className ="far fa-times-circle";

	}
	else{
		var add_video_d_box = document.getElementById("add_video_box");
		add_video_d_box.style.display = "none";
		add_box_btn_img.className ="fas fa-plus-circle";
	}
}

//adding video in local storage

var add_btn = document.getElementById("add_video_btn");
add_btn.onclick = function()
{
	var v_name = document.getElementById("video_name");
	var v_link = document.getElementById("video_link");
	if(v_name.value != "" && v_link.value != "")
	{
		var v_obj = {name:v_name.value , link:v_link.value};
		var v_txt = JSON.stringify(v_obj);
		localStorage.setItem(current_user+"video"+v_name.value , v_txt);
	}
}


// fetching videos from local storage

function load_video()
{
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match(current_user+"video"))
		{
			var v_data = localStorage.getItem(all_keys);
			var video_obj = JSON.parse(v_data);

			// creating elements in js

			var div = document.createElement("DIV");
			var p = document.createElement("P");
			var play_btn = document.createElement("BUTTON");
			var delete_btn = document.createElement("BUTTON");

			// bhai mujhe lagt HE me phass ajo ga kyu ke alert nhi o raha

			// append child

			div.appendChild(p);
			div.appendChild(play_btn);
			div.appendChild(delete_btn);

			// setting attributes

			div.setAttribute("id","main_video_box");
			p.setAttribute("id","playlist_video_name");
			p.className = "playlist_video_name";
			play_btn.setAttribute("id","video_play_btn");
			play_btn.setAttribute("type","submit");
			play_btn.setAttribute("url",video_obj.link);
			play_btn.className = "video_play_btn";
			delete_btn.setAttribute("id","video_delete_btn");
			delete_btn.setAttribute("type","button");
			delete_btn.className = "video_delete_btn";

			// inner HTML

			p.innerHTML = video_obj.name;
			play_btn.innerHTML = "Play";
			delete_btn.innerHTML = "Delete";
			

			// sab se bare div me ab set akrna he

			var all_v = document.getElementById("bottom");
			all_v.appendChild(div);




		}

	}
}
load_video();

// play btn onclick wala function()
	function play_video()
	{

		var all_v_play_btn = document.getElementsByClassName("video_play_btn");
		var i;
		for(i=0;i<all_v_play_btn.length;i++)
		{

			all_v_play_btn[i].onclick = function()
			{
				clear();
				var v_url_ply = this.getAttribute("url");

				var src_v_src = document.getElementById("video_src");
				src_v_src.setAttribute("src",v_url_ply);
				video.load();
				video.play();
				play_btn.className = "fas fa-pause-circle";
				this.innerHTML = "Playing...";
			}
		}
	}

	play_video();

	function clear()
	{
		var all_v_play_btn = document.getElementsByClassName("video_play_btn");
		for (var i = 0; i<all_v_play_btn.length; i++)
		{
			all_v_play_btn[i].innerHTML = "Play";
		}
	}

	// next btn coding
	function next_btn(){
		var next_btn = document.getElementById("right_btn");
		next_btn.onclick = function()
		{

			var all_play_btn = document.getElementsByClassName("video_play_btn");
			var i;
			for(i=0;i<all_play_btn.length;i++)
			{

				if(all_play_btn[i].innerHTML == "Playing...")
				{
					var next_sibiling = all_play_btn[i].parentElement.nextSibling;
					
					var next_play_btn = next_sibiling.getElementsByClassName("video_play_btn")[0];
					next_play_btn.click();
					return false;
				}
			}
		}
	}

	next_btn();

	// privious btn coding

	function previous_btn(){
		var previous_btn = document.getElementById("left_btn");
		previous_btn.onclick = function()
		{

			var all_play_btn = document.getElementsByClassName("video_play_btn");
			var i;
			for(i=0;i<all_play_btn.length;i++)
			{

				if(all_play_btn[i].innerHTML == "Playing...")
				{
					var previous_sibiling = all_play_btn[i].parentElement.previousSibling;
					
					var previous_play_btn = previous_sibiling.getElementsByClassName("video_play_btn")[0];
					previous_play_btn.click();
				}
			}
		}
	}

	previous_btn();


	// Delete button coding

	function delete_button()
	{
		var all_del_btn = document.getElementsByClassName("video_delete_btn");
		var i;
		for(i=0;i<all_del_btn.length;i++)
		{
			all_del_btn[i].onclick = function()
			{
				var parent = this.parentElement;
				var video_name = parent.getElementsByTagName("P")[0].innerHTML;
				var removing = localStorage.removeItem(current_user+"video"+video_name);
				parent.remove();

			}
		}
	}

	delete_button();


	function time_ber_open_close()
	{
		var vol_btn_parent = document.getElementById("vol_control");
		var vol_btn = vol_btn_parent.getElementsByTagName("I")[0];

		vol_btn.onclick = function()
		{
			var vol_bar = document.getElementById("vol_ctrl");
			if(vol_bar.style.display == "none")
			{
				vol_bar.style.display = "block";
				vol_bar.oninput = function()
				{
					video.volume = this.value;
				}
			}
			else{
				vol_bar.style.display = "none";
			}
		}
	}

	time_ber_open_close()	

	// video forward backward coding

	let p_box = document.getElementById("progress_box");
	p_box.onclick = function(event)
	{
		let per = event.offsetX/this.offsetWidth;
		video.currentTime = per*video.duration;
	}

	// full screen coding

	let full = document.getElementById("full_screen");
	full.onclick = function()
	{
		video.requestFullscreen();
	}

	// setting coding open and close

	let setting_btn = document.getElementById("setting");
	setting_btn.onclick = function()
	{
		let scroll_bar = document.getElementById("speed_ctrl");
		if(scroll_bar.style.display == "none")
		{
			scroll_bar.style.display = "block";
			// video speed main coding

			scroll_bar.oninput = function()
			{
				video.playbackRate = scroll_bar.value;
			}
			
		}
		else
		{
			scroll_bar.style.display = "none";
		}
	}

	// search videos coding 

	let search_box = document.getElementById("search");
	search_box.oninput = function()
	{
		let video_name = document.getElementsByClassName("playlist_video_name");
		let i;
		for(i=0;i<video_name.length;i++)
		{
			if(video_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase()))
			{
				video_name[i].parentElement.style.display = "block";
			}
			else
			{
				video_name[i].parentElement.style.display = "none";
			}
		}
	}

				// ye jo next line me bracket he wo else ka he	
}	
