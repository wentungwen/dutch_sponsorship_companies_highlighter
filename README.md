# LinkedIn Visa Sponsor Highlighter

## About
This Chrome plugin is designed to highlight companies on LinkedIn that are capable of sponsoring visas. 

My motivation behind creating this plugin stems from personal experience. After applying for numerous jobs and successfully passing interviews, I encountered the frustrating situation where companies were unable to offer visa sponsorship. This common issue prompted me to find a solution. Often, I found it time-consuming to manually check government websites to determine which companies could sponsor visas. To streamline this process, I developed a plugin to automatically highlight sponsored companies on LinkedIn, saving both time and frustration.

## Features
- Utilizes a highlight.js file to extract company names from LinkedIn pages.
- Employs a Python script with BeautifulSoup (bs4) to scrape sponsorship information from the Dutch government website ([IND Public Registered Companies](https://ind.nl/en/public-register-recognised-sponsors/public-register-regular-labour-and-highly-skilled-migrants)).
- Organizes the scraped data as a dictionary, using the first letter of each company name as a key for efficient retrieval.

## Optimization
During the development process, I implemented several optimizations to enhance the plugin's performance:
1. **Key Indexing**: Companies are indexed by the first letter of their name, reducing the need to iterate through the entire sponsor list.
2. **Debouncing**: Implemented a debounce function to delay the execution of the highlight function. This prevents excessive page reloading during mutations, improving user experience by reducing delays.

## Usage
To use the plugin, simply download the files and add them to Chrome's developer mode in the extensions page (chrome://extensions/). To highlight content on other webpages, modify the company data, URL, and class name properties accordingly.

Feel free to contribute to the project or suggest improvements! Let's make the job search process smoother for everyone.



# Privacy Policy

This Privacy Policy explains how Sponsored Compoany Highlighter Extension collects, uses, and shares user data in connection with our Chrome extension.

**Information Collection and Use**

Sponsored Compoany Highlighter Extension does NOT collect any personally identifiable information from users. However, we may collect non-personally identifiable information such as browser type, language preference, and usage statistics to improve the functionality and performance of our extension.

**Data Sharing**

We do not share any user data collected by Sponsored Compoany Highlighter Extension with third parties.

**Data Security**

Appropriate measures are taken to protect the security of user data. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.

**Changes to this Privacy Policy**

The right is reserved to update or change our Privacy Policy at any time. Any changes will be effective immediately upon posting the updated Privacy Policy on this page.

**Contact Us**

If you have any questions or concerns about this Privacy Policy, please contact me at wentungwen@gmail.com.

