let likesButton = document.getElementsByClassName('btnCounter'),
    count = 0;
    
    likesButton.onclick = function () {
      count += 1;
      likesButton.innerHTML = "now " + count;
    };
    