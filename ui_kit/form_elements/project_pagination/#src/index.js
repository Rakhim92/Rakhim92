// if you have any suggestion of questions, pleasse feel free to send me an email to chiholiu10@gmail.com

(function() {
    "use strict";

    function Pagination() {
      
       const objJson = [
          { adName: "adName 1"},
          { adName: "adName 2"},
          { adName: "adName 3"},
          { adName: "adName 4"},
          { adName: "adName 5"},
          { adName: "adName 6"},
          { adName: "adName 7"},
          { adName: "adName 8"},
          { adName: "adName 9"},
          { adName: "adName 10"},
          { adName: "adName 11"},
          { adName: "adName 12"},
          { adName: "adName 13"},
          { adName: "adName 14"},
          { adName: "adName 15"}
                   
      ];

      const prevButton = document.getElementById('button_prev');
      const nextButton = document.getElementById('button_next');
      let page_number = document.getElementsByClassName('clickPageNumber');
      
      let current_page = 1;
      let records_per_page = 2;
      let startPage = 1;
       
      this.init = function() {  
          changePage(1);
          pageNumbers();
          addEventListeners();  
     }
      
    let addEventListeners = function() {
        prevButton.addEventListener('click', prevPage);
        nextButton.addEventListener('click', nextPage);
        document.addEventListener('click', selectedPage)   
    }

    //Выделение кружком.clickPageNumber 
    let selectedPage = function(event) {
             
        let target = event.target;
       
        if (target.matches('.clickPageNumber')) {
            
            for (let i = 0; i < 5; i++) {
                page_number[i].classList.remove('selected_page')
            }  
            target.closest('.clickPageNumber').classList.add("selected_page");
            
            let parseNum = Number(target.textContent); 
            changePage(parseNum)    
        }           
    }         

    //Рендер #listingTable
    let changePage = function(page) {
        const listingTable = document.getElementById('listingTable');

        if (page < 1) {
            page = 1;
        } 
        if (page > (numPages() -1)) {
            page = numPages();
        }
    
        listingTable.innerHTML = "";

        for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
            listingTable.innerHTML += "<div class='objectBlock'>" + objJson[i].adName + "</div>";
        }
        checkButtonOpacity();
    //   selectedPage();
    }

    //Создание страничек внизу(.clickPageNumber) внутри(.page_number) из рассчета numPages
    let pageNumbers = function(startPage) {
   
        let pageNumber = document.getElementById('page_number');
            pageNumber.innerHTML = "";
        
            if (current_page < numPages() - 4) {
                for (let i = current_page; i < current_page + 3; i++) {    
                    pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
                    // console.log("No")
                }

                let newElem = document.createElement('span');
                newElem.className = "clickPageNumber";
                newElem.innerHTML = "...";
                pageNumber.append(newElem);

                let newElem1 = document.createElement('span');
                newElem1.className = "clickPageNumber";
                newElem1.innerHTML = numPages();
                pageNumber.append(newElem1);

                page_number[0].classList.add('selected_page');
        
            } else {
                for (let i = numPages() - 4; i < numPages() + 1; i++) {    
                    pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";     
                    // console.log("Yes")
                }
                switch (current_page) {
                    case numPages() - 4:
                        page_number[0].classList.add('selected_page');
                        break;
                    case numPages() - 3:
                        page_number[1].classList.add('selected_page');
                        break;
                    case numPages() - 2:
                        page_number[2].classList.add('selected_page');
                        break;
                    case numPages() - 1:
                        page_number[3].classList.add('selected_page');
                        break;
                    case numPages():
                        page_number[4].classList.add('selected_page');
                        break;
                }      
            }
    }

    //Переключение отображаемой страницы на предыдущую страницу(changePage())
    let prevPage = function() {
        if(current_page > 1) {
            current_page--;
            changePage(current_page);
            
            pageNumbers(startPage);
            startPage--;
        }
    }
    
    //Переключение отображаемой страницы на следующую страницу(changePage())
    let nextPage = function() {
        
        if(current_page < numPages()) {
            current_page++;
            changePage(current_page);
            
            pageNumbers(startPage); 
            startPage++;
        } 
    }
    //Затенение/проявления кнопок Prev, Next
    let checkButtonOpacity = function() {
        current_page == 1 ? prevButton.classList.add('zeroOpacity') : prevButton.classList.remove('zeroOpacity');
        current_page == numPages() ? nextButton.classList.add('halfOpacity') : nextButton.classList.remove('halfOpacity');
    }
 
    //Определяем кол-во отображаемых страниц(numPages) из рассчета массива
    let numPages = function() {
        return Math.ceil(objJson.length / records_per_page);    
    }

}
  let pagination = new Pagination();
  pagination.init();

})();