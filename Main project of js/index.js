	// ---------login to sign up ---------------------
        var par = document.getElementById("l_s");
        par.onclick = function() {
           var sign = document.getElementById("frm_2");
           sign.style.display = "block";
           var log = document.getElementById("frm");
           log.style.display = "none";
        }

        // -------------sign up to login--------------
        var parr = document.getElementById("s_l");
        parr.onclick = function()
        {
           var sign = document.getElementById("frm_2");
           sign.style.display = "none";
           var log = document.getElementById("frm");
           log.style.display = "block"; 
        }

        //----sign up to login login to sign up closed-----------------

        //------------------- sign up code key----------------------

        // selection of elements

        var signup_btn = document.getElementById("img_sl");
        signup_btn.onclick = function()
        {
            var name = btoa(document.getElementById("username").value);
            var email = btoa(document.getElementById("email2").value);
            var phone = btoa(document.getElementById("number").value);
            var pass = btoa(document.getElementById("pass2").value);
            var suc_img = document.getElementById("img_s_s");
            var sign_i = document.getElementById("img_s");
            var frm = document.getElementById("frm_2");

         // joining of elements

            var user_data = {username:name,email:email,phoneNo:phone,password:pass};
            var user_text_data = JSON.stringify(user_data);

         //condition


         if(name != "" && email != "" && phone != "" && pass != "")
         {
            localStorage.setItem(email,user_text_data);
            suc_img.style.display = "block";
            sign_i.style.display = "none";
            setTimeout(function(){
               suc_img.style.display  ="none";
               sign_i.style.display = "block";
               frm.reset();

            },3000)
         }
         }
         // email condition
         var email_e = document.getElementById("email2");
         email_e.onchange = function()
         {
            var s_l = document.getElementById("img_sl");
            var email_ew = btoa(document.getElementById("email2").value);
            var warning = document.getElementById("war_e2");
            if(localStorage.getItem(email_ew) != null)
            {
               warning.style.display = "block";
               img_sl.disabled = true;
               img_sl.style.backgroundColor = "#ccc";
            }
            else
            {
                warning.style.display = "none";
                img_sl.disabled = false;
               
            }
         }
        
/* end coding of sign up validation */

// start coding of login form

// ----------------------function 

      var submit__sub = document.getElementById("login_sub");
      submit__sub.onclick = function()
      {
         // ------------------- selection of value of inputs -----------------

         var email = document.getElementById("email");
         var password = document.getElementById("pass");
         var email_c_i_f = document.getElementById("email_not_a_s_e");
         var pass_c_i_f = document.getElementById("pass_not_a_s_e");


         if(localStorage.getItem(btoa(email.value)) == null)
         {
            email_c_i_f.style.display = "block";

            // function 

            email.onclick = function()
            {
               email.value = "";
               email_c_i_f.style.display = "none";
            }
         }
         else
         {
            email_c_i_f.style.display = "none";
            var text_data = localStorage.getItem(btoa(email.value));
            var obj_data = JSON.parse(text_data);
            var correct_email = obj_data.email;
            var correct_pass = obj_data.password;
            var email_c_i_f = document.getElementById("email_not_a_s_e");
            var pass_c_i_f = document.getElementById("pass_not_a_s_e");

            // condition to final login

            if(btoa(email.value) == correct_email)
            {
               if(btoa(password.value) == correct_pass)
               {
                  sessionStorage.setItem("user" , btoa(email.value) );
                  window.location.replace("profile/profile.html")
               }
               else
               {
                  pass_c_i_f.style.display = "block";

                   // function 

            password.onclick = function()
            {
               password.value = "";
               pass_c_i_f.style.display = "none";
            }
               }
            }
         }
      } 
