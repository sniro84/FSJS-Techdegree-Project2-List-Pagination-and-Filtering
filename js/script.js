/******************************************
Treehouse FSJS Techdegree:
Project 2 - List Filter and Pagination
Name: Snir Holland
Date: 15/07/2019
******************************************/


// number of maximum items on each page
const MAX_ITEMS_PER_PAGE = 10;

// a list of students  
const studentsList = document.querySelectorAll('li.student-item');

/*** 
   This function recieves a list and a page number
   and shows all of the items that belong to the page.
***/
function showPage(list, page)
{
   const startIndex = MAX_ITEMS_PER_PAGE * (page - 1);  // index of first element.
   const endIndex = MAX_ITEMS_PER_PAGE * page - 1;      // index of last element.

    for(let i=0; i<list.length; i++)
    {
      if (i>=startIndex  &&  i<=endIndex)      // item belongs to the page --> show it .
            list[i].style.display = '';    
      else                                     // item doesn't belong to the page --> hide it.
            list[i].style.display = 'none';     
    }              
}

/*** 
   This function recieves a list and adds  
   functionality to the pagination buttons.
***/
function appendPageLinks(list)
{
   // get the required number of pages for the list items
   const requiredPages = getRequiredPages(list);
   
   // create a new container div element with class "pagination"
   const containerDiv = document.createElement('div');
   containerDiv.className = "pagination";

   // append the container div element to its parent div element with class "page"
   const pageDiv = document.querySelector('div.page');
   pageDiv.appendChild(containerDiv);
   
   // create unordered list item and append it to the container div element
   const ul = document.createElement('ul');
   containerDiv.appendChild(ul);

   // add 'li' element and tags for every page
   for(let i = 1;  i<=requiredPages;  i++)
   {
      // create 'li' element (one for each page)
      const li = document.createElement('li');
      ul.appendChild(li);
      
      // create a link 
      const link = document.createElement('a');
      li.appendChild(link);
      link.href = '#';
      link.text = i;
   }
   
   // make the first link active
   const firstLink = document.querySelector('div.pagination > ul > li > a');
   firstLink.className = "active";
   
   // add event listeners to all links 
   const links = document.querySelectorAll('div.pagination > ul > li > a');
   for(let i = 0;  i<links.length;  i++)
   {
         links[i].addEventListener('click', (event) => {
            showPage(list , i+1);       // show the items that belong to the page.
            const targetLink = event.target; 
            activateLink(links, targetLink);    // activate target link and deactivate the rest of them.
         });
   }
}

/*** 
   This function searches for string in a list of items and returns the
   number of matches found on the list. The function recieves an input
   text field with a string to search for and the list of items to search in. 
***/
function searchForItem(searchInput, items)
{
   // container for items that matches the input 
   const matchItems = [];  

   for(let i=0; i<items.length; i++)
   {
      // turn text from the input text field to lowercase. 
      const inputString = searchInput.value.toLowerCase();

      // extract ONLY the name of the item 
      const h3 = items[i].querySelector('div > h3');
      const itemNameString = h3.innerText.toLowerCase(); 
      
      // a boolean variable that equals true if text field is empty.
      const emptyString = (searchInput.value.length === 0);
      
      // a boolean variable that equals true if at least one match has been found. 
      const containsInput = (itemNameString.search(inputString) !== -1);    

      // if matches were found, insert matched item to container.
      if (!emptyString && containsInput)
         matchItems.push(items[i]);                
   }

   // paginate results for matched items results. 
   refreshPage();   
   if (matchItems.length !== 0)
   {
      showPage(matchItems,1);
      appendPageLinks(matchItems);
   }
   
   // return the number of results found.
   return matchItems.length;
}

/*** 
   This helper function recieves a list and returns  
   the number of the pages that are going to be required
   in order to display all of the elements in that list.
***/
function getRequiredPages(list)
{
   // assume by default that the list length divided by the max items per page has no remainder. 
   let result = list.length / MAX_ITEMS_PER_PAGE;

   // in case the list length divided by the max items per page HAS a remainder.   
   if (list.length % MAX_ITEMS_PER_PAGE !== 0)
      result = parseInt(Math.ceil(result));         // result needs to be updated.

   // result now stores the correct value.   
   return result;   
}

/*** 
   This helper function recieves an array of links and a target link.
   the function activates the target link and deactivates the rest
   of the links in the array.  
***/
function activateLink(links, targetLink)
{
  // deactivation of all the links. 
  for(let i=0; i<links.length; i++)
      links[i].classList.remove('active');

  // activation of target link.    
  targetLink.classList.add('active');
}

/*** 
   This helper function dynamically adds a search button and a text field to the screen.  
***/
function appendSearchElements()
{
   // create search div element and give it a class name.
   const searchDiv = document.createElement('div');
   searchDiv.className = "student-search";
   
   // select header and its parent div
   const pageHeaderDiv = document.querySelector('div.page-header');
   const h2 = document.querySelector('div.page-header > h2');

   // insert the search div element.
   pageHeaderDiv.insertBefore(searchDiv,h2);

   // create text field and add it to the search div
   const input = document.createElement('input');
   input.placeholder = "Search for students...";
   searchDiv.appendChild(input);

   // create search button and add it to the search div
   const searchButton = document.createElement('button');
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchButton);

   // create a header to contain the message for the user
   const messageHeader = document.createElement('h3');
   searchDiv.appendChild(messageHeader);  
   messageHeader.innerText = "";

   // add event listeners
   searchButton.addEventListener('click', (event) => {
      handleEvent(input,messageHeader);      
   });
   input.addEventListener('keyup', (event) => { 
      handleEvent(input,messageHeader);
   });
}

/*** 
   This helper function handles user experience.  
***/
function handleEvent(input, messageHeader)
{
   event.preventDefault();

   // initialize results counter.
   let results = 0;  
   
   // input text field contains at least one character.
   if (input.value.length !== 0)  
      results = searchForItem(input, studentsList);   // search the item
   
   // sends results to the user     
   if (results === 0)
      messageHeader.innerText =  "No results were found.";
   else if (results === 1)
      messageHeader.innerText = "" + results + " result was found.";
   else
      messageHeader.innerText = "" + results + " results were found.";

   // text has been deleted from the input text field --> show original list.  
   if (input.value === "")
   {
      messageHeader.innerText = "";  // clear text field
      refreshPage();
      showPage(studentsList,1);
      appendPageLinks(studentsList);
   }       
}

/*** 
   This helper function hides all of the students on the list.  
***/
function hideStudents()
{
   for(let i=0; i<studentsList.length; i++)
      studentsList[i].style.display = 'none';
}

/*** 
   This helper function deletes the links which are currently displayed.  
***/
function hideLinks()
{
   const containerDiv = document.querySelector('div.pagination');
   containerDiv.remove();
}

/*** 
   This helper function refreshes the page.  
***/
function refreshPage()
{
   hideStudents();

   // trying to access links (page numbers) that doesn't exist.
   // It happend because the last search resulted in 0 matches. 
   try
   {
      hideLinks();  // if no results found, an error might be thrown (access to null).
   }
   catch(error) 
   {
       console.log("no links to hide"); 
   }
}

// show original list by default.
showPage(studentsList,1);
appendPageLinks(studentsList);

// add search elements.
appendSearchElements();
