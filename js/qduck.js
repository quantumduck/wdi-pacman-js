$(document).ready(function() {
  var title = document.getElementById('title');
  var color = 'red';

  function changeColor() {
    switch(color) {
      case 'red':
        color = 'green';
        break;
      case 'green':
        color = 'blue';
        break;
      case 'blue':
        color = 'red';
        break;
    }
    title.style.color = color;
    window.setTimeout(changeColor, 100);
  }

  window.setTimeout(changeColor, 100);

});
