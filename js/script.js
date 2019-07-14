/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
const MAX_ITEMS_PER_PAGE = 10;
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

function clearPage()
{
   for(let i=0; i<studentsList.length; i++)
      studentsList[i].style.display = 'none';
}

function deletePageLinks()
{
   const containerDiv = document.querySelector('div.pagination');
   containerDiv.remove();
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

function appendSearch()
{
   const ul = document.querySelector('ul.student-list');
   const parentDiv = ul.parentNode;
   const searchDiv = document.createElement('div');
   searchDiv.className = "page-header";
   searchDiv.className = "student-search";
   parentDiv.insertBefore(searchDiv, ul);

   const input = document.createElement('input');
   input.placeholder = "Search for students...";
   searchDiv.appendChild(input);

   const searchButton = document.createElement('button');
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchButton);

   searchDiv.align = "right";

   const h5 = document.createElement('h5');
      searchDiv.appendChild(h5);  
      let messageToUser = "";
      h5.innerText = messageToUser;

   searchButton.addEventListener('click', (event) => {
      event.preventDefault();
   
      let results = 0;
      
      if (input.value.length !== 0)
         results = searchForItem(input, studentsList);
      
      if (results === 0)
      {
         messageToUser = "No results were found.";
         h5.innerText = messageToUser;
      }
      else
      {
         messageToUser = "" + results + " results were found";
         h5.innerText = messageToUser;
      }
            
 
    });
  
}

function searchForItem(searchInput, items)
{
   const matchItems = [];
   for(let i=0; i<items.length; i++)
   {

      const inputString = searchInput.value.toLowerCase();

      const h3 = items[i].querySelector('div.student-details > h3');
      const itemNameString = h3.innerText.toLowerCase(); 
      
      const emptyString = (searchInput.value.length === 0);
      
      const containsInput = (itemNameString.search(inputString) !== -1);    


      if (!emptyString && containsInput)
      {
         matchItems.push(items[i]);
         console.log("found a match" + "in name : " + itemNameString);
      }
                
   }
   console.log(matchItems);

   try
   {
      clearPage();
      deletePageLinks();
   }
   catch(error) 
   {
       console.log("trying to delete links (page numbers) that doesn't exist." + 
                    "It happend because the last search resulted in 0 matches"); 
   } 
   

   if (matchItems.length !== 0)
   {
      showPage(matchItems,1);
      appendPageLinks(matchItems);
   }
   
   return matchItems.length;
}



function deletePageLinks() 
{
   const ul = document.querySelector('div.pagination');
      ul.remove();
}


// show first page by default.
showPage(studentsList,1);

// append the page links to the screen.
appendPageLinks(studentsList);


appendSearch();