**

# SQL Query Handler Application

> A single page web application providing a platform for running SQL queries, and displaying the results in readable format to the user. 

The flow of this application can be broken down into following parts:

 1. **Home Page:** User lands on homepage of the application. Here, the main view is divided into two parts, left part being the text area to provide queries and right part to display results of the query. The Navigation Bar on top provides user with ability to switch between day and night themes. 	 
 \
	 ![Homepage](https://raw.githubusercontent.com/TheClassicWizard/sql-query-handler-app/master/screenshots/homePage.PNG)
	 1. *Query Handling Part:* The left part is made of three components. First is a dropdown, from user can select any predefined query. Following that is a resizable textarea which accepts query as user input. The last component is a button which is used to run the query from textarea.
	 2. *Results Display*: The right part is used to display results of queries and errors, if the requests fail.

 2.   **Providing a query:** User can provide query to the application using either the dropdown to select a predefined query, which replicates itself into the textarea as well, or simply writing the query in the textarea itself. Selecting a query from dropdown will return results mapped to the query, and writing a custom query in textarea itself will return different results. Once query value is updated in textarea, by either way, user can run the query to display the results. User cannot run an empty query.
 \
 ![Running Query](https://raw.githubusercontent.com/TheClassicWizard/sql-query-handler-app/master/screenshots/runningQuery.PNG)
 
 3. **Handling the results:** Once a query is run, application will display results in a table if the query is successful. User can expand the table horizontally using the button provided. Running any successive query will overwrite the results.
\
- Normal Preview: 
\
![Normal Previes](https://raw.githubusercontent.com/TheClassicWizard/sql-query-handler-app/master/screenshots/resultsNormal.PNG)
 
 
- Expanded Table Preview
\
![enter image description here](https://raw.githubusercontent.com/TheClassicWizard/sql-query-handler-app/master/screenshots/resultsExpanded.PNG) 

## Tools and Technologies used

 1. **React.js:** React.js framework is used to develop this application.
 2. **Create React App:** Quoting from its official website,

> Create React App is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration.

 3. **MaterialUI:** Material UI is used as a component library to minimize efforts on styling of basic components, and improving readability of code structure.

## Performance Metrics
The following values are calculated using lighthouse reports tool from google chrome.
 - **First Contentful Paint** --  0.3s (First Contentful Paint marks the time at which the first text or image is painted.) 
 - **Time to Interactive** -- 0.4s (Time to interactive is the amount of time it takes for the page to become fully interactive.)

 - **Total Blocking Time** -- 0ms (Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.)
 \
![Lighthouse report](https://raw.githubusercontent.com/TheClassicWizard/sql-query-handler-app/master/screenshots/lighthousereport.PNG)
\
\
The following steps are taken to improve the performance of the application: 
 - Helper functions inside components are defined using useCallback hook so that with each component re-render, the function doesn't get redefined.
 - Components are wrapped with memo method to avoid re-renders if the props are not changed. This function by default uses shallow comparison, but a custom compare function can be provided to further enable deep comparison.

**
