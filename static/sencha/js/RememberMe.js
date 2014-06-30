///////////////// This function set cookies for Email and password , if user selects checkbox remember me , during login /////////////
function fnRemember(UserId)
{  
	var checkStatus ;
	if(document.getElementById('btnRemember').className == "CheckBoxUnCheck")	
		checkStatus=false;
	else
		checkStatus=true;

	if(checkStatus==true)
	{					
		if(UserId=="")
		{
			return false;
		}
		else
		{
			
			set_cookie ( "rememberUserId", UserId );
		}
	}
	else
	{
			delete_cookie("rememberUserId");
	}
}

/////////////////// Function to retrieve cookie value ///////////////////////////////////
function get_cookie( cookie_name )
{
	console.log('get_cookie');
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
//Function to add cookies
function set_cookie( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );

  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}
/////////////////// Function to delete cookie ///////////////////////////////////
function delete_cookie( cookie_name )
{
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}