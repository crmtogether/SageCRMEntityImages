# SageCRMEntityImages
Improving the user interface in Sage CRM showing company icons and more. 

The system tries to get a company icon from the website (if there is one set in comp_website) and adds that to the library.

Below is how this is rendered in Sage CRM.

Company Icon

<img src="sage crm company 3.png" height="200"  />

Company Initials

<img src="sage crm company.png" height="200" />

Person Icon

<img src="sage crm person2.png" height="200" />

Person Initials

<img src="sage crm person.png" height="200" />

Opportunity

<img src="sage crm opportunity.png" height="200" />

Case

<img src="sage crm case.png" height="200" />

Created by 

CRM Together - https://crmtogether.com

and 

Leading Edge - https://leadingedge.ro

If you have any ideas for improvements or would like to contribute get in touch!

--
10 Feb 2025
-Fix for non jpg images. 
-Improved fetching of websites (added headers to work around some blocks)
-Improved parsing to get the best image
-In the code when you are debugging the code will delete old images (saving you having to manually do this)

28 Jan 2025
- fix for older data that have websites with http://...we now replace this with https:// as most sites have this now
- fix for some missing url encoding which broke some company image urls

27 Jan 2025
-fix for fetching and saving of images to CRM


