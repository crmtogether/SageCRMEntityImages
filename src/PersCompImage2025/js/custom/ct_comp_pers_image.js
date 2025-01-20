
const avatarColors = {
    K2 : "#34AADC",
    K1: "#FF9500",    
    K8: "#FF9500",
    K7: "#4CD964",
    K71: "#E8403B",
    K86: "#E8403B",
    K44: "#5856D6",
}
let crmVersion = '';
let defaultAvatarColor = "#00A159";//if 2024 all colors sage green

crm.ready(function() {

    const T = crm.getArg('T');
    const Act = crm.getArg('Act');
    const Key0=crm.getArg('Key0');
    const RecentValue = crm.getArg('RecentValue');
    let personContext = T == 'Person' || RecentValue.indexOf('220')==0 || Act == 220 || Act == 222||Key0==2;
    let companyContext = T == 'Company' || RecentValue.indexOf('200') == 0 || Act == 200 || Act == 201||Key0==1;
    let caseContext = T == "Case" || RecentValue.indexOf('281') == 0 || Act == 281 || Act == 284||Key0==8;
    let oppoContext = T == "Opportunity" || RecentValue.indexOf('260') == 0 || Act == 260 || Act == 263||Key0==7;
    let ordeContext = T == "Order" || RecentValue.indexOf('1463') == 0 || Act == 1463 || Act == 1468||Key0==71;
    let quoteContext = T == "Quote" || RecentValue.indexOf('1469') == 0 || Act == 1469 || Act == 1451||Key0==86;
    let leadContext = T == "Lead" || RecentValue.indexOf('192') == 0 || Act == 192 || Act == 1451||Key0==44;

    

    if (personContext || companyContext || caseContext || oppoContext || ordeContext || quoteContext || leadContext) {
        const TOPHEADING=document.querySelector('td.TOPHEADING');
        if (!TOPHEADING) return;
        jQuery.ajax({
            url: crm.url('/getLibrary.asp'),
            success: function (imagesObj) {   
                crmVersion = parseInt(imagesObj.crmVersion);
                if (crmVersion>=2024) {
                    Object.assign(avatarColors, {
                        K2 : defaultAvatarColor,
                        K1: defaultAvatarColor,    
                        K8: defaultAvatarColor,
                        K7: defaultAvatarColor,
                        K71: defaultAvatarColor,
                        K86: defaultAvatarColor,
                        K44: defaultAvatarColor
                    })                    
                }

                if (companyContext) {
                    const txtC = getInitials(imagesObj.compName);
                    
                    if (imagesObj.companyImageUrl.indexOf("favicon.jpg") > -1) {
                        checkImage(imagesObj.companyImageUrl, function(ev) {   
                            const actualW = ev.target.width;
                            if (actualW < 32) return;
                            if ( actualW < 40 ) {                                
                                TOPHEADING.appendChild(ev.target);
                                ev.target.style.width=actualW+'px';
                                ev.target.style.height='auto !important';
                                ev.target.style.left='10px';
                                ev.target.style.top='-20px';
                                
                            } else {                        
                                setMainImage(TOPHEADING,imagesObj.companyImageUrl,txtC)
                            }
                        });
                    } else {             
                        setMainImage(TOPHEADING,imagesObj.companyImageUrl,txtC)
                    }
        
                } else if (personContext) {        
                
                    if (imagesObj.persName == "") 
                        setMainImage(TOPHEADING,imagesObj.personImageUrl,"");
                    else 
                        setMainImage(TOPHEADING,imagesObj.personImageUrl,getInitials(imagesObj.persName));


                    if (imagesObj.companyImageUrl!="") {
                        
                        var img = new Image();
                        img.src = imagesObj.companyImageUrl;                      
                        img.onload=function() {
                            
                            Object.assign(img.style, {
                                position:'relative',
                                right:"-20px",
                                top:"-20px",
                                width:"30px",
								height:'auto',
                                borderRadius:'4px',
                                backgroundColor: "#fff"
                            });
							
                            TOPHEADING.appendChild(img);
                        }
                    }
                } else if (caseContext|| oppoContext || ordeContext || quoteContext || leadContext) {
                    const badgeEl = document.createElement("div");
                    badgeEl.innerText=imagesObj.useRef;
                    Object.assign(badgeEl.style, {
                        position:'relative',
                        right:"-20px",
                        top:"-40px",
                        color:"#fff",
                        borderRadius:'4px',
                        backgroundColor: "#ED1C5F",
                        fontSize:'10px',
                        fontWeight:'bold'
                    });
                    TOPHEADING.appendChild(badgeEl);
                    createAvatarGroup(TOPHEADING, [imagesObj.companyImageUrl, imagesObj.personImageUrl], 
                        [imagesObj.compName, imagesObj.persName]);
                    

                } // end case context
            },
            error: function(error) {
                console.error(error);
            },
            
            cache: false
        });
    }
});

function checkImage(imageSrc, imageLoaded) {
    var img = new Image();
    img.src = imageSrc;
    img.onload = imageLoaded;    
    Object.assign(img.style, {
        position:'relative',
        left:"10px",
        top:"10px",
        backgroundColor: "#fff"    
    });    
}


function getInitials(companyName) {
    const words = companyName.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/); 
    const stopwords = ["and", "&", "of", "the", "at", "for", "in"];
    const filteredWords = words.filter(word => 
        word.length > 0 && !stopwords.includes(word.toLowerCase())
    );
	//console.log(filteredWords);
	
	let initials=''
	if (filteredWords.length ==1) {
		initials=filteredWords[0].substring(0,3).toUpperCase();
        return initials;
	} else {
		initials = filteredWords.map(word => {
			if (word.length==2) 
				return word.toUpperCase()
			else
				return word[0].toUpperCase()
		});
        return initials.join("");
	}
    
}


function getInitialsA(txt){
    let txtC = txt.substring(0,2);
    if (namesArr.length == 2) {
        txtC = namesArr[0].substring(0,1)+namesArr[1].substring(0,1);
    } else if (namesArr.length >= 3) {
        txtC = namesArr[0].substring(0,1)+namesArr[1].substring(0,1) + namesArr[2].substring(0,1);
    }    
    return txtC; 
}

function setMainImage(container, imageUrl, text) { 
    
    if(imageUrl=='' && text == '') return;
    let fc = container.firstChild;
	
	if(imageUrl=='' && text != '') {
        fc.remove();
        createAvatar(container,text);
        return;
    };
	
	if (fc.nodeName== 'A') {
		targetImgEl = document.createElement('img');
		targetImgEl.src=imageUrl;
		Object.assign(targetImgEl.style, {
			width:'40px',
			height:'40px',
			borderRadius:'8px',
			objectFit:'contain'
		});
		container.appendChild(targetImgEl);
		fc.remove();
	} else if(fc.nodeName== 'IMG') {
		targetImgEl=container.firstChild;
		targetImgEl.src=imageUrl;
		Object.assign(targetImgEl.style, {
			width:'40px',
			height:'40px',
			borderRadius:'8px',
			objectFit:'contain'
		});
		//container.appendChild(targetImgEl);
		//fc.remove();
	}	
	else {
		targetImgEl = container.firstChild;
	}    
}

function createAvatar(container, initials) {
    const avatar = document.createElement('div');    
    avatar.textContent = initials; 
    avatar.style.backgroundColor = avatarColors[`K${crm.getArg("Key0")}`] ||  "#00A65C";
    const fontSize = initials.length == 2 ? '30px': '26px'; 
    Object.assign(avatar.style, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `60px`,           
        height: `60px`,          
        borderRadius: '50%',          
        fontSize: fontSize,  
        fontWeight: 'bold',           
        textTransform: 'uppercase',          
        color: 'white'
    });
    container.appendChild(avatar);
}

function createImageAvatar(src, zIndex) {
    var avatar = document.createElement("img");
    avatar.src = src;
    avatar.style.width = "30px"; 
    avatar.style.height = "30px";
    avatar.style.borderRadius = "50%"; 
    avatar.style.border = "2px solid #fff"; 
    avatar.style.objectFit = "cover"; 
    avatar.style.position = "relative";
    avatar.style.marginLeft = "-10px";
    avatar.style.zIndex = zIndex; 
    return avatar;
}


function createTextAvatar(name,zIndex,defaultColor='') {
    const initials = getInitials(name);
    const avatar = document.createElement('div');   
    avatar.title = name;
    avatar.textContent = initials; 
    avatar.style.backgroundColor = defaultColor==''? avatarColors[`K${crm.getArg("Key0")}`] ||  "#00A65C" : defaultColor;
    const fontSize = '12px'; 
    Object.assign(avatar.style, {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `30px`,           
        height: `30px`,          
        borderRadius: '50%',          
        fontSize: fontSize,  
        fontWeight: 'bold',      
        border : "2px solid #fff",
        textTransform: 'uppercase',  
        marginLeft : "-10px",       
        color: 'white',
        zIndex : zIndex
    });
    return avatar;
}

function createAvatarGroup(container,imagesArr,namesArr) {
    var avatarGroup = document.createElement("div");
    avatarGroup.style.display = "flex";
    avatarGroup.style.position = "relative";
    avatarGroup.style.gap = "0";
    avatarGroup.style.left = "20px";
    avatarGroup.style.top = "-20px";
    for(var i=0;i<imagesArr.length;i++) {
        if (imagesArr[i]!="")
            avatarGroup.appendChild(createImageAvatar(imagesArr[i], i+1));
        else {
            avatarGroup.appendChild(createTextAvatar(namesArr[i], i+1, (i==0)? avatarColors["K1"]: avatarColors["K2"]));
        }
    }

    container.appendChild(avatarGroup)
}