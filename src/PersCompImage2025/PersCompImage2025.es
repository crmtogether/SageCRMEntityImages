FamilyType='Choices';
Family='Libr_Type';
Code='Image';
CaptOrder=5;
Captions['US']='Image';
AddCaption();

FamilyType='Choices';
Family='Libr_Type';
Code='CompanyImage';
CaptOrder=18;
Captions['US']='Company Image';
Captions['UK']='Company Image';
Captions['DE']='Company Image';
AddCaption();

CopyAspTo('js\\custom\\ct_comp_pers_image.js','js\\custom\\ct_comp_pers_image.js');
CopyAspTo('custompages\\getLibrary.asp','custompages\\getLibrary.asp');
CopyAspTo('custompages\\ewareNoHist.js','custompages\\ewareNoHist.js');