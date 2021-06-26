function getDropdown() {
  const btn = document.querySelector(".dropdown__btn"),
      originalMenu = document.getElementById("originalMenu"),
      contentMenu = document.getElementsByClassName("dropdown__contentMenu"),
      container = document.querySelector(".dropdown__container"),     
      plusAll = document.getElementsByClassName("dropdown__plus"),
      minusAll = document.getElementsByClassName("dropdown__minus"),
      displayCountAll = document.getElementsByClassName("dropdown__number"),
      cleanBtn = document.querySelector(".dropdown__clean"),
      useBtn = document.querySelector(".dropdown__use");

// Переключение меню с открытого на закрытое
btn.addEventListener('click', ()=> {
    contentMenu[0].classList.toggle("dropdown__show")
})

// Закрытие меню при клике вовне
document.addEventListener("click", function(event) {
  if (!container.contains(event.target)) {
    for(i = 0; i < contentMenu.length; i++) {
      let openContent = contentMenu[0];
      if (openContent.classList.contains('dropdown__show')) {
        openContent.classList.remove('dropdown__show')
      }
    }
  }
})

// Работа плюсов и минусов
function clickCounter(i) {
  let count = 0;    
      plusAll[i].onclick = function(){
        count++;
        displayCountAll[i].textContent = count;   
      }  
      minusAll[i].onclick = function(){
        count--;
        if(count < 0) {count = 0}
        displayCountAll[i].textContent = count;       
      }    
}
clickCounter(0);
clickCounter(1);
clickCounter(2);

// Очистка значений плюсов и минусов
cleanBtn.addEventListener('click', ()=> {
  clickCounter(0)// Обнуление count при нажатии кнопки "сбросить"
  clickCounter(1)
  clickCounter(2)
  displayCountAll[0].textContent = "0";// Обнуление счетчика
  displayCountAll[1].textContent = "0";
  displayCountAll[2].textContent = "0";
  btn.value = "";// Очистка инпута
})
 
// Вывод полученной информации в инпут
function renderInput() {
  for(let i=0; i < displayCountAll.length; i++) {
    let numGuests = Number(displayCountAll[0].textContent) + 
    Number(displayCountAll[1].textContent) + 
    Number(displayCountAll[2].textContent); 
    if (numGuests == 1) {
      btn.value = numGuests + " гость"
    } else {
      btn.value = numGuests + " гостей"
    }   
  }     
}

// Появление кнопки "сбросить" при изменении значения инпута
function hideCleanbtn() {
  if (btn.value == '' || btn.value == '0 гостей') {
    cleanBtn.style.opacity = "0";
  } else {cleanBtn.style.opacity = "1"}
}

// Изменение прозрачности минуса в зависимости от значения дисплея
function minusOpacity(i) {
  let x = Number(displayCountAll[i].textContent)
    if (x !== 0) {     
      minusAll[i].style.setProperty('--pseudo-opacity', '1')      
    } else {
      minusAll[i].style.setProperty('--pseudo-opacity', '0.3')  
    }
}

document.addEventListener('click', ()=> {
  minusOpacity(0);
  minusOpacity(1);
  minusOpacity(2);
  renderInput();
  hideCleanbtn();
})
};
getDropdown();

function getSlider() {
  const slider1 = document.getElementById("range-slider__upper"),
    slider2 = document.getElementById("range-slider__lower"),
    output1 = document.getElementById("range-slider__display1"),
    output2 = document.getElementById("range-slider__display2"),
    lowerSlider = document.querySelector('#range-slider__lower'),
    upperSlider = document.querySelector('#range-slider__upper'),
    multiRange = document.querySelector('.range-slider__multi-range');
   
    
   let display1 = 0;
   let display2 = 0;

   slider1.oninput = function() {
      display1 = parseInt(slider1.value);    
  }
    
  slider2.oninput = function() {
      display2 = parseInt(slider2.value);    
  }

  document.addEventListener('click', function() {

  // Большее число всегда будет справа, а меньшее слева
    if (display2 > display1) {
        output1.innerHTML = display1 + " рублей";
        output2.innerHTML = display2 + " рублей";   
    } else {
        output1.innerHTML = display2 + " рублей";
        output2.innerHTML = display1 + " рублей"; 
    }

  })

  // Собсвенно сам range-slider в действии
  multiRange.addEventListener('click', function() {
    let startPoint,
        endPoint; 
        display2 > display1 ? (startPoint = display1 * 10) + (endPoint = display2 * 10) : 
    (startPoint = display2 * 10) + (endPoint = display1 * 10);
    slider1.style.background = 'linear-gradient(to right, white 0%, white ' + startPoint + '%, green ' + startPoint + '%, green ' + endPoint + '%, white ' + endPoint + '%, white 100% )'
  })
};
getSlider();

function getRenderHeart() {
  const hearts = document.querySelectorAll('.like-buttons__heart');
  let counters = document.querySelectorAll('.like-buttons__counter');
  
  for(let i=0; i<2; i++){
      hearts[i].addEventListener('click', ()=>{
  
          hearts[i].classList.toggle('like-buttons__heart_active');
          if(hearts[i].classList.contains('like-buttons__heart_active')){
              counters[i].textContent = 1;
      
          } else{
              counters[i].textContent = 0;
          }    
      })
  }

};
getRenderHeart();


function getPagination() {
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

};
getPagination();