<%

	// This is the Sage CRM standard include file for javascript based asp pages
	// using the Sage CRM business object.

	// Please consult the Sage CRM documentation for more information.
	
	// Pages expire right away

	Response.Expires=-1;

	// Sage CRM mode constants

	var View=0, Edit=1, Save=2, PreDelete=3, PostDelete=4, Clear=6;

	// Sage CRM button position constants

	var Bottom=0, Left=1, Right=2, Top=3;

	// Sage CRM caption location constants

	var CapDefault=0, CapTop=1, CapLeft=2, CapLeftAligned=3, CapRight=4, CapRightAligned=5, CapLeftAlignedRight=6;
	
	// determine is this is a wap page
	
	var Accept=new String(Request.ServerVariables("HTTP_ACCEPT"));

	var Button_Default="1", Button_Delete="2", Button_Continue="4";

        var iKey_CustomEntity = 58;

	// create and initialise the Sage CRM object

        var sInstallName = getInstallName(Request.ServerVariables("URL"));
        var ClassName = "eWare."+sInstallName;

	CRM = eWare = Server.CreateObject(ClassName);
	var bidName ="BID" + getQueryStringValue(Request.Querystring+"","SID");
	var bidQueryParam = "&" + bidName + "=" + Request.Cookies(bidName);

	eMsg = CRM.Init(
		Request.Querystring + bidQueryParam,
		Request.Form,
		Request.ServerVariables("HTTPS"),
		Request.ServerVariables("SERVER_NAME"),
		true,
		Request.ServerVariables("HTTP_USER_AGENT"),
		Accept);
		
	// check for errors
		
	if (eMsg!="")
	{
		Response.Write(eMsg);
		Response.End;
	}
	
	// start the page

	var Head,Body,EndBody;
	
	Head="<HTML><HEAD><LINK REL=\"stylesheet\" HREF=\"/"+sInstallName+"\/Themes\/"+CRM.UserOption("PreferredCSSTheme")+".css\"><META http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";
	Body="<BODY>";
	EndBody="</BODY></HTML>";
	
	// this function is quite useful
	
	function Defined(Arg)
	{
		return (Arg+""!="undefined");
	}

	function getInstallName(sPath) {
		//Parse the install name out of the path
		var Path = new String(sPath);
		var InstallName = '';
		var iEndChar=0;iStartChar=0;

		Path = Path.toLowerCase();
		iEndChar = Path.indexOf('/custompages');
		if (iEndChar != -1) {
			//find the first '/' before this
			iStartChar = Path.substr(0,iEndChar).lastIndexOf('/');
			iStartChar++
			InstallName = Path.substring(iStartChar,iEndChar); 
		}
		return InstallName;

	}
	
	function getQueryStringValue(queryString,item){
		var strVar = queryString.replace('?','&');
		var arr = strVar.split('&');
		for (var i=0;i<arr.length;i++){
			var index = arr[i].indexOf('=');
			if (item.toLowerCase() === arr[i].substring(0,index).toLowerCase()){
				return arr[i].substring(index+1);
			}
		}
		return "";
	}	

%>
