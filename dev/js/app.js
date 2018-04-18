let content = document.querySelector(".wrapper"),
    botonera = document.querySelector(".botonera"),
    btnAuthor = document.querySelector('.close-author'),
    authorContent = document.querySelector('.author');


btnAuthor.addEventListener("click", () => {
    authorContent.classList.add("close");
})



const getListImage = container => {
    let listImage = [...container.querySelectorAll(".list-img__item")]
    return listImage;
};

const getListInfo = container => {
    let listInfo = [...container.querySelectorAll(".list-description__item")]
    return listInfo;
};


const toNext = (previousElementImg,nextElementImg,previousElementInfo,nextElementInfo,elementImg,elementInfo,i) => {

    elementImg.classList.remove("item-selected")
    elementInfo.classList.remove("item-selected")
    elementImg.classList.add("move")
    elementInfo.classList.add("move")
    nextElementImg.classList.add("item-selected")
    nextElementInfo.classList.add("item-selected")
    elementInfo.classList.add("overflow-hidden");

    elementInfo.addEventListener("transitionend",(e) => {
        elementInfo.classList.remove("overflow-hidden");
    })

};


const toPrev = (previousElementImg,nextElementImg,previousElementInfo,nextElementInfo,elementImg,elementInfo,i) => {

    elementImg.classList.remove("move")
    elementInfo.classList.remove("move")
    elementImg.classList.remove("item-selected")
    elementInfo.classList.remove("item-selected")
    previousElementImg.classList.add("item-selected")
    previousElementInfo.classList.add("item-selected")
    previousElementInfo.classList.add("overflow-hidden");

    elementInfo.addEventListener("transitionend",(e) => {
        previousElementInfo.classList.remove("overflow-hidden");
    })
}


const navigate = (listImg,listInfo,i) => {

    botonera.addEventListener("click", e => {
        e.preventDefault();
        let target = e.target,
            btnPrev = botonera.querySelector('.prev'),
            btnNext = botonera.querySelector('.next'),
            previousElementImg = listImg[i].previousElementSibling,
            nextElementImg = listImg[i].nextElementSibling,
            previousElementInfo = listInfo[i].previousElementSibling,
            nextElementInfo = listInfo[i].nextElementSibling,
            elementImg = listImg[i],
            elementInfo = listInfo[i];
        if(target === btnNext){
            if(i < listImg.length - 1){
                toNext(previousElementImg,nextElementImg,previousElementInfo,nextElementInfo,elementImg,elementInfo,i);

                i++;

                if(i === listImg.length - 1){
                    btnNext.classList.add("disabled");
                }else{
                    btnPrev.classList.remove("disabled");
                }


            }



        }

        else if(target === btnPrev){
            if(i > 0){

                toPrev(previousElementImg,nextElementImg,previousElementInfo,nextElementInfo,elementImg,elementInfo,i);

                i--;

                if(i === 0){
                    btnPrev.classList.add("disabled");
                }else{
                    btnNext.classList.remove("disabled");
                }
            }

            listImg[i].classList.remove("move");
            listInfo[i].classList.remove("move");
        }



    })

}



const getIndex = arr => {
   let itemActive,
        index;
    arr.map(element =>{
       if(element.className.includes("item-selected")){
          itemActive = element;
            index = arr.indexOf(itemActive);
       }
   });
    return index;
}


const initSlide = container => {
    let image = getListImage(container),
        info = getListInfo(container),
        indice = getIndex(image);

    navigate(image,info,indice);
};



initSlide(content);













