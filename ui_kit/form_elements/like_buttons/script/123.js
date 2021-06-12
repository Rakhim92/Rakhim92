
function getRenderHeart(){
    const hearts = document.querySelectorAll('.heart');
    let counters = document.querySelectorAll('.counter');
    
    for(let i=0; i<2; i++){
        hearts[i].addEventListener('click', ()=>{
    
            hearts[i].classList.toggle('active');
            if(hearts[i].classList.contains('active')){
                counters[i].textContent = 1;
        
            } else{
                counters[i].textContent = 0;
            }    
        })
    }
  
};
getRenderHeart();


