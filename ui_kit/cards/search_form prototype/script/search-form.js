const bigDownButton = document.querySelector('.button');
bigDownButton.addEventListener('click', ()=>{
    console.log("Подобрать номер");
});


const openCalendar = document.querySelectorAll('.workfield')[0];
console.log(openCalendar );

openCalendar.addEventListener('click', ()=>{
    console.log("gfg");
});





















/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// const showNumberOfGuests = document.querySelector('.bottom');
// showNumberOfGuests.addEventListener('click', ()=>{
//     console.log("works");
//     document.getElementById("myDropdown").classList.toggle("show");
// })


// Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.contains('.bottom')) {
//   console.log("Мимо");
//     }
//   }