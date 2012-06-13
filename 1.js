var MAGIC_TEXT_LENGTH = 30;

// util function: get font size of an element
function getElemWidth(elem) {
  if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(elem, null).getPropertyValue("width");
  } else {
    return elem.style["width"];
  }
};


function reStyle(elem) {
  //elem.style.fontFamily = "Corbel, Georgia, 'Microsoft Yahei'";
  elem.style.fontSize = '18px';
  elem.style.lineHeight = '175%';
  var width = parseFloat(getElemWidth(elem));
  if (width > 600) {
    elem.style.width = '600px';
  }
//  elem.style.textAlign = 'justify';
}

function reStyleList(listElem) {
  var lis = listElem.getElementsByTagName("li");;
  if (lis != null) {
    for (var i = 0; i < lis.length; i++) {
      reStyle(lis[i]);
    }
  }
}

function processBlocks(blocks) {
  for (var i = 0; i < blocks.length; i++) {
    var text = blocks[i].textContent;
    if (text.length > MAGIC_TEXT_LENGTH) {
      reStyle(blocks[i]);
    }
  }  
}

function processLists(lists) {
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];

    //check if it's valid list
    var lis = list.getElementsByTagName("li");
    for (var j = 0; j < lis.length; j++) {
      if (lis[j].textContent.length > MAGIC_TEXT_LENGTH) {
        console.log(lis[j].textContent);
        reStyleList(list);
        break;
      }
    }
  }
}

function process() {
  var blocks = document.querySelectorAll("p, pre");
  processBlocks(blocks);

  var lists = document.querySelectorAll("ol, ul");
  processLists(lists);

  var iframes = document.querySelectorAll("iframe");
  for (var i = 0; i < iframes.length; i++) {
    var blocks = iframes[i].contentDocument.querySelectorAll("p, pre");
    processBlocks(blocks);
    
    var lists = iframes[i].contentDocument.querySelectorAll("ol, ul");
    processLists(lists);
  }
}

process();