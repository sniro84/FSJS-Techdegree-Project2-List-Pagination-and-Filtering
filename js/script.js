/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   

   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const MAX_STUDENTS_PER_PAGE = 10;
const studentsList = document.querySelectorAll('li.student-item');

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page)
{
   const startIndex = MAX_STUDENTS_PER_PAGE * (page - 1);
   const endIndex = MAX_STUDENTS_PER_PAGE * page - 1;

    for(let i=0; i<list.length; i++)
    {
      if (i>=startIndex  &&  i<=endIndex)
            list[i].style.display = '';
      else
            list[i].style.display = 'none';     
    }              
}







/*** 
   Create the `appendPageLinks function` to generate, append, and add 
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
      
      // create 'a' element and adjust its href property and text
      const a = document.createElement('a');
      li.appendChild(a);
      a.href = '#';
      a.text = i;

   }
   
   const firstLink = document.querySelector('div.pagination > ul > li > a');
   firstLink.className = "active";
   
   const anchorTags = document.querySelectorAll('div.pagination > ul > li > a');
   for(let i = 0;  i<=anchorTags;  i++)
   {
         anchorTags[i].addEventListener('click', (event) => {
            showPage(studentsList , i+1);
            setAction(anchorTags, event);
         });
   }

}

// helper function
function getRequiredPages(list)
{
   if (list.length % MAX_STUDENTS_PER_PAGE === 0)
      return list.length / MAX_STUDENTS_PER_PAGE;
   else
      return list.length / MAX_STUDENTS_PER_PAGE + 1;
}

// another hekper function
function setAction(anchors, event)
{
  for(let i=0; i<anchors.length; i++)
      anchors[i].classList.remove('active');
  const currentAnchor = event.target; 
  currentAnchor.classList.add('active');
  
}

showPage(studentsList,1);
appendPageLinks(studentsList);

// Remember to delete the comments that came with this file, and replace them with your own code comments.