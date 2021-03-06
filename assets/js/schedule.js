const initTable = function(){
  var stage1 = document.querySelector("#stage1");
  var stage2 = document.querySelector("#stage2");
  var stage3 = document.querySelector("#stage3");

  var stage1Table = document.querySelector(".stage1-table");
  var stage2Table = document.querySelector(".stage2-table");
  var stage3Table = document.querySelector(".stage3-table");

  stage1.addEventListener("click", function(){
    stage1.classList.add('active-stage');
    stage2.classList.remove('active-stage');
    stage3.classList.remove('active-stage');
    showTable(stage1Table);
    hideTable(stage2Table);
    hideTable(stage3Table);
  });
  stage2.addEventListener("click", function(){
    stage2.classList.add('active-stage');
    stage1.classList.remove('active-stage');
    stage3.classList.remove('active-stage');
    showTable(stage2Table);
    hideTable(stage1Table);
    hideTable(stage3Table);
  });
  stage3.addEventListener("click", function(){
    stage3.classList.add('active-stage');
    stage2.classList.remove('active-stage');
    stage1.classList.remove('active-stage');
    showTable(stage3Table);
    hideTable(stage2Table);
    hideTable(stage1Table);
  });
};

/**
* Shows table by removing specific class
* @param {string} table class name of table you want to hide
*/
const showTable = function(table){
  table.classList.remove('hide-table');
}

/**
* Hides table by removing specific class
* @param {string} table class name of table you want to show
*/
const hideTable = function(table){
  table.classList.add('hide-table');
}

initTable();
