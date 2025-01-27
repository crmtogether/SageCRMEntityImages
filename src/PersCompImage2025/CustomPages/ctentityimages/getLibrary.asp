<% @LANGUAGE=JScript %>
<!-- #include file ="sagecrmNoHist.js" -->
<%

var DEBUG=false;
if (!DEBUG)
	Response.ContentType = "application/json";

var Key0=Request.QueryString('Key0');
var pictureURL='';
var SID = Request.QueryString('SID');
var images = {
    companyImageUrl:'',
    compName:'',
    personImageUrl:'',
    persName:'',
    useRef: '',
    crmVersion: ''
};

if (Key0==1) {
    var myRecord = eWare.FindRecord("company, vsummaryCompany", "comp_companyid="+ eWare.GetContextInfo('company','comp_companyid'));    
    images.companyImageUrl = getCompanyImage(myRecord);
    images.compName=myRecord("comp_name");
    if (myRecord("pers_personid") != null) {
        images.personImageUrl= getPersonImage(myRecord("pers_personid"));
        images.persName=myRecord("pers_fullname");
    }
} else if (Key0==2) {

    var myRecord =  eWare.FindRecord("Person, vSummaryPerson", "pers_personid="+ eWare.GetContextInfo("person","pers_personid"));

    images.personImageUrl = getPersonImage(myRecord.RecordId); 
    images.persName=myRecord("pers_fullname") || "";
    if (myRecord("Comp_CompanyId") != null) {
        images.companyImageUrl =  getCompanyImage(myRecord);
        images.compName=myRecord('comp_name');
    }
} else if (Key0==8) {
    var myRecord =  eWare.FindRecord("Cases, vSummaryCase", "case_caseid="+ eWare.GetContextInfo("Cases","case_caseid"));
    images.useRef = CRM.GetTrans("Case_stage",myRecord("Case_stage"));
    log(myRecord("Case_PrimaryPersonId"))
    if (Defined(myRecord("Case_PrimaryPersonId"))) {
        var persRecord =  eWare.FindRecord("Person, vSummaryPerson", "pers_personid="+ myRecord("Case_PrimaryPersonId"));
        if (!persRecord.eof) {
            images.personImageUrl = getPersonImage(persRecord("pers_personid")); 
            images.persName=persRecord("pers_fullname") || "";
        }
    }

    if (myRecord("Case_PrimaryCompanyId") != null) {
        var compRecord = eWare.FindRecord("Company", "comp_companyid=" + myRecord("Case_PrimaryCompanyId"));
        if (!compRecord.eof) {
            images.companyImageUrl =  getCompanyImage(compRecord);
            images.compName=compRecord("comp_name");
        }
    }

} else if (Key0==7) {
    var myRecord =  eWare.FindRecord("Opportunity, vSummaryOpportunity", "oppo_opportunityid="+ eWare.GetContextInfo("Opportunity","oppo_opportunityid"));
    images.useRef = CRM.GetTrans("oppo_Stage",myRecord("oppo_Stage"));
    if (Defined(myRecord("oppo_PrimaryPersonId"))) {
        var persRecord =  eWare.FindRecord("Person, vSummaryPerson", "pers_personid="+ myRecord("oppo_PrimaryPersonId"));
        if (!persRecord.eof) {
            images.personImageUrl = getPersonImage(persRecord("pers_personid")); 
            images.persName=persRecord("pers_fullname") || "";
        }
    }

    if (myRecord("Oppo_PrimaryCompanyId") != null) {
        var compRecord = eWare.FindRecord("Company", "comp_companyid=" + myRecord("Oppo_PrimaryCompanyId"));
        if (!compRecord.eof) {
            images.companyImageUrl =  getCompanyImage(compRecord);
            images.compName=compRecord("comp_name");
        }
    }

} else if (Key0==71) {
    var myRecord =  eWare.FindRecord("Orders, vSummaryOrder", "orde_orderquoteid="+ eWare.GetContextInfo("Orders","orde_orderquoteid"));
    images.useRef = CRM.GetTrans("orde_stage",myRecord("orde_stage"));

    oppoRecord = eWare.FindRecord("Opportunity", "oppo_quoteorderid=" + myRecord("orde_orderquoteid"))

    if (Defined(myRecord("oppo_PrimaryPersonId"))) {
        var persRecord =  eWare.FindRecord("Person, vSummaryPerson", "pers_personid="+ myRecord("oppo_PrimaryPersonId"));
        if (!persRecord.eof) {
            images.personImageUrl = getPersonImage(persRecord("pers_personid")); 
            images.persName=persRecord("pers_fullname") || "";
        }
    }

    if (myRecord("Oppo_PrimaryCompanyId") != null) {
        var compRecord = eWare.FindRecord("Company", "comp_companyid=" + myRecord("Oppo_PrimaryCompanyId"));
        if (!compRecord.eof) {
            images.companyImageUrl =  getCompanyImage(compRecord);
            images.compName=compRecord("comp_name");
        }
    }

} else if (Key0==86) {

    var myRecord =  eWare.FindRecord("Quotes, vSummaryQuote", "quot_orderquoteid="+ eWare.GetContextInfo("Quotes","quot_orderquoteid"));
    images.useRef = CRM.GetTrans("quot_status",myRecord("quot_status"));


    oppoRecord = eWare.FindRecord("Opportunity", "oppo_quoteorderid=" + myRecord("quot_orderquoteid"))

    if (Defined(myRecord("oppo_PrimaryPersonId"))) {
        var persRecord =  eWare.FindRecord("Person, vSummaryPerson", "pers_personid="+ myRecord("oppo_PrimaryPersonId"));
        if (!persRecord.eof) {
            images.personImageUrl = getPersonImage(persRecord("pers_personid")); 
            images.persName=persRecord("pers_fullname") || "";
        }
    }

    if (myRecord("Oppo_PrimaryCompanyId") != null) {
        var compRecord = eWare.FindRecord("Company", "comp_companyid=" + myRecord("Oppo_PrimaryCompanyId"));
        if (!compRecord.eof) {
            images.companyImageUrl =  getCompanyImage(compRecord);
            images.compName=compRecord("comp_name");
        }
    }
} else if (Key0==44) {
    var myRecord =  eWare.FindRecord("Lead, vSummaryLead", "lead_leadid="+ eWare.GetContextInfo("Lead","lead_leadid"));
    images.useRef =  CRM.GetTrans("lead_stage",myRecord("lead_stage"));
    
    if (Defined(myRecord("lead_primarypersonid"))) {
        var persRecord =  eWare.FindRecord("Person, vSummaryPerson", "pers_personid="+ myRecord("lead_primarypersonid"));
        if (!persRecord.eof) {
            images.personImageUrl = getPersonImage(persRecord("pers_personid")); 
            images.persName=persRecord("pers_fullname") || "";
        } else {

            images.persName=myRecord("lead_personfirstname") || "" + " " + myRecord("lead_personlastname") || "";
        }
    }

    if (myRecord("lead_primarycompanyid") != null) {
        var compRecord = eWare.FindRecord("Company", "comp_companyid=" + myRecord("lead_primarycompanyid"));
        if (!compRecord.eof) {
            images.companyImageUrl =  getCompanyImage(compRecord);
            images.compName=compRecord("comp_name");
        }
    } else {
        images.compName=myRecord("lead_companyname") || "";
    }
}

var param = eWare.FindRecord("Custom_SysParams", "parm_name= 'version'");
version = parseInt(param("parm_value"));

if(!DEBUG)
    Response.Clear();

Response.Write('{"crmVersion":"'+version+'","companyImageUrl": "'+images.companyImageUrl+'","compName":"'+myEscape(images.compName)+'" ,"personImageUrl":"'+images.personImageUrl+'","persName":"'+images.persName+'", "useRef":"'+images.useRef+'"}');
Response.End();

//------------------

function log(m) {
    if (DEBUG)
        Response.Write(m +'<br/>')
}

function getCompanyImage(companyRecord) {
    var pictureURL='';
    var myRecord = eWare.FindRecord('library',"libr_type='CompanyImage' and libr_companyid ="+companyRecord("Comp_CompanyId"));
    myRecord.OrderBy='libr_updateddate DESC';

    if (!myRecord.eof)
    {
        pictureURL = '/'+sInstallName + '/eware.dll/Do?SID='+SID+'&Act=1282&Mode=0&FileName=' + myEscape(myRecord.Libr_FilePath) + "\\\\" + myEscape(myRecord.Libr_FileName);
    } else if (companyRecord("comp_website") != null && companyRecord("comp_website") !="") {
        var website = companyRecord("comp_website");
        
        if (website.indexOf('https://')==-1 && website.indexOf('http://')==-1) 
            website = 'https://' + website;

        pictureURL = getFaviconUrl(website,companyRecord);
        
    }

    return pictureURL;
}

function getPersonImage(myRecordId) {
    var pictureURL='';
    var myRecord = eWare.FindRecord('library',"libr_type='Image' and libr_personid ="+myRecordId);
    myRecord.OrderBy='libr_updateddate DESC';
    if (!myRecord.eof)
    {
        pictureURL = '/'+sInstallName + '/eware.dll/Do?SID='+SID+'&Act=1282&Mode=0&FileName=' + myEscape(myRecord.Libr_FilePath) + "\\\\"  + myEscape(myRecord.Libr_FileName);
    } 

    return pictureURL;
}

function myEscape(input) {
    if (!input) return "";

    var str = input.toString();
    str = str.replace(/\\/g, '\\\\');         
    
    return str; 
}


function getFaviconUrl(targetUrl, companyRecord) {    
    var libr_companyid = companyRecord("comp_companyid");
    var comp_librarydir= companyRecord("comp_librarydir");
	 log("getFaviconUrl comp_librarydir:"+comp_librarydir);
	 if (!Defined(comp_librarydir))
	    comp_librarydir="";
    var xmlhttp = Server.CreateObject("Msxml2.XMLHTTP.6.0");//Msxml2.ServerXMLHTTP.6.0
    //xmlhttp.setTimeouts(5000,5000,5000,5000);
    xmlhttp.open("GET", targetUrl, false);
    log("URL:"+targetUrl);

    try {
        xmlhttp.send();
    } catch(e) {
        Response.Write("error" + targetUrl + ">>>"+e.message)
        return "";
    }

    if (xmlhttp.status == 200) {
        var responseText = xmlhttp.responseText;
        //log(responseText);
        // Use a Regular Expression to find the <link rel="icon"> tag
        var regex = /<link[^>]+rel=["']?icon["']?[^>]*>/i;
        var match = responseText.match(regex);
        
        if (match) {
			log("match found");
            // Extract the href attribute from the matched tag
            var hrefRegex = /href=["']([^"']+)["']/i;
            var hrefMatch = match[0].match(hrefRegex);
            
            if (hrefMatch && hrefMatch[1]) {
                var iconPath = hrefMatch[1];
                
                // If the iconPath is relative, make it absolute
                if (!iconPath.indexOf("http")==0) {
                    var baseUrl = targetUrl.split("/").slice(0, 3).join("/");
                    iconPath = baseUrl + "/"+ iconPath;
                }
                
                
                log("found icon path:"+iconPath);
			
                var xmlHttp = Server.CreateObject("Msxml2.XMLHTTP.6.0");                
                xmlHttp.open("GET", iconPath, false);

                try {
                    xmlHttp.send();
                } catch(e) {
                    log(e.message);
                    return "";
                }
                
                log("status:" + xmlHttp.Status)
              
                if (xmlHttp.Status == 200) {
				
					log("comp_librarydir:"+comp_librarydir);
					if (comp_librarydir.indexOf('\\') == -1) {
					
						comp_librarydir = companyRecord("comp_name").substr(0,1) + "\\" + companyRecord("comp_name");
					}
					
					var fso = Server.CreateObject("Scripting.FileSystemObject");
                    var Libr_FilePath = comp_librarydir;
                    var libr_filename = libr_companyid + "_favicon.jpg";
                    var localPath = Server.MapPath("../../../library/"+ Libr_FilePath + "/"+ libr_filename);
					log("localPath");
					log(localPath);
					if (!fso.FolderExists(Server.MapPath("../../../library/"+ Libr_FilePath))) {
						log("create folder");
						fso.CreateFolder(Server.MapPath("../../../library/"+ Libr_FilePath));
					};

                    var imageData = xmlHttp.responseBody;
						var objADOStream = Server.CreateObject("ADODB.Stream")
						objADOStream.open();
						objADOStream.Type = 1; 
						objADOStream.Write(imageData);
						objADOStream.Position = 0;
						
						objADOStream.saveToFile(localPath);
						objADOStream.close();
						objADOStream = null;
						fso=null;

						var newLib = eWare.CreateRecord("library");
						newLib.libr_filename=libr_filename;
						newLib.Libr_FilePath=Libr_FilePath;
						newLib.libr_companyid=libr_companyid;
						newLib.libr_type='CompanyImage';
						newLib.SaveChanges();
						xmlHttp=null;
                    return  '/'+sInstallName + '/eware.dll/Do?SID='+SID+'&Act=1282&Mode=0&FileName=' + myEscape(Libr_FilePath) + "\\\\" + myEscape(libr_filename);
                } else {
                    log(xmlHttp.Status);
					xmlHttp=null;
                    return "";
                }

            }
        } else {
            log('no match') 
        }//end match
    } else {
        log("status:" + xmlhttp.status);
    }
	xmlHttp=null;
    return "";
}

%>