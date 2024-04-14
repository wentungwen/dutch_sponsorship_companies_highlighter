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