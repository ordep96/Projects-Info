"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var content = document.querySelector(".wrapper"),
    botonera = document.querySelector(".botonera"),
    btnAuthor = document.querySelector('.close-author'),
    authorContent = document.querySelector('.author');

btnAuthor.addEventListener("click", function () {
    authorContent.classList.add("close");
});

var getListImage = function getListImage(container) {
    var listImage = [].concat(_toConsumableArray(container.querySelectorAll(".list-img__item")));
    return listImage;
};

var getListInfo = function getListInfo(container) {
    var listInfo = [].concat(_toConsumableArray(container.querySelectorAll(".list-description__item")));
    return listInfo;
};

var toNext = function toNext(previousElementImg, nextElementImg, previousElementInfo, nextElementInfo, elementImg, elementInfo, i) {

    elementImg.classList.remove("item-selected");
    elementInfo.classList.remove("item-selected");
    elementImg.classList.add("move");
    elementInfo.classList.add("move");
    nextElementImg.classList.add("item-selected");
    nextElementInfo.classList.add("item-selected");
    elementInfo.classList.add("overflow-hidden");

    elementInfo.addEventListener("transitionend", function (e) {
        elementInfo.classList.remove("overflow-hidden");
    });
};

var toPrev = function toPrev(previousElementImg, nextElementImg, previousElementInfo, nextElementInfo, elementImg, elementInfo, i) {

    elementImg.classList.remove("move");
    elementInfo.classList.remove("move");
    elementImg.classList.remove("item-selected");
    elementInfo.classList.remove("item-selected");
    previousElementImg.classList.add("item-selected");
    previousElementInfo.classList.add("item-selected");
    previousElementInfo.classList.add("overflow-hidden");

    elementInfo.addEventListener("transitionend", function (e) {
        previousElementInfo.classList.remove("overflow-hidden");
    });
};

var navigate = function navigate(listImg, listInfo, i) {

    botonera.addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target,
            btnPrev = botonera.querySelector('.prev'),
            btnNext = botonera.querySelector('.next'),
            previousElementImg = listImg[i].previousElementSibling,
            nextElementImg = listImg[i].nextElementSibling,
            previousElementInfo = listInfo[i].previousElementSibling,
            nextElementInfo = listInfo[i].nextElementSibling,
            elementImg = listImg[i],
            elementInfo = listInfo[i];
        if (target === btnNext) {
            if (i < listImg.length - 1) {
                toNext(previousElementImg, nextElementImg, previousElementInfo, nextElementInfo, elementImg, elementInfo, i);

                i++;

                if (i === listImg.length - 1) {
                    btnNext.classList.add("disabled");
                } else {
                    btnPrev.classList.remove("disabled");
                }
            }
        } else if (target === btnPrev) {
            if (i > 0) {

                toPrev(previousElementImg, nextElementImg, previousElementInfo, nextElementInfo, elementImg, elementInfo, i);

                i--;

                if (i === 0) {
                    btnPrev.classList.add("disabled");
                } else {
                    btnNext.classList.remove("disabled");
                }
            }

            listImg[i].classList.remove("move");
            listInfo[i].classList.remove("move");
        }
    });
};

var getIndex = function getIndex(arr) {
    var itemActive = void 0,
        index = void 0;
    arr.map(function (element) {
        if (element.className.includes("item-selected")) {
            itemActive = element;
            index = arr.indexOf(itemActive);
        }
    });
    return index;
};

var initSlide = function initSlide(container) {
    var image = getListImage(container),
        info = getListInfo(container),
        indice = getIndex(image);

    navigate(image, info, indice);
};

initSlide(content);