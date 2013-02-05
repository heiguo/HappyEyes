var MAGIC_TEXT_LENGTH = 50;

// util function: get font size of an element
function getElemWidth(elem) {
  if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(elem, null).getPropertyValue("width");
  } else {
    return elem.style["width"];
  }
};


function reStyle(elem) {
  // elem.style.fontFamily = "Corbel, Georgia, 'Microsoft Yahei'";
  // elem.style.textAlign = 'justify';
  
  // fuck helvetica
  if ($(elem).css('font-family').toLowerCase().indexOf('arial') == 0 ||
    $(elem).css('font-family').toLowerCase().indexOf('helvetica') == 0) {
    $(elem).css('font-family', "Lucida Grande");
  }
  elem.style.fontSize = '18px';
  elem.style.lineHeight = '175%';
  var width = parseFloat(getElemWidth(elem));
  if (width > 600) {
    elem.style.width = '600px';
  }
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
    if (blocks[i].textContent.length <= MAGIC_TEXT_LENGTH)
      continue;

    var text = getTextNodes(blocks[i]);
    if (text.length > MAGIC_TEXT_LENGTH) {
      reStyle(blocks[i]);
    }
  }  
}

function processSnippets(snippets) {
  for (var i = 0; i < snippets.length; i++) {
    var text = snippets[i].textContent;
    if (text.length > MAGIC_TEXT_LENGTH) {
      reStyle(snippets[i]);
    }
  }  
}

function processLists(lists) {
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];

    //check if it's valid list
    var lis = list.getElementsByTagName("li");
    for (var j = 0; j < lis.length; j++) {
      if (lis[j].textContent.length <= MAGIC_TEXT_LENGTH)
        continue;

      var text = getTextNodes(lis[j]);
      if (text.length > MAGIC_TEXT_LENGTH) {
        reStyleList(list);
        break;
      }
    }
  }
}

var getTextNodes = function(el) {
  return $(el).contents().filter(function() {
    return this.nodeType === Node.TEXT_NODE;
  }).text().trim();
};

function processDocument(doc) {
  if (!doc)
    return;

  var blocks = doc.querySelectorAll("body, div, p, span, strong");
  processBlocks(blocks);

  var snippets = doc.querySelectorAll("pre");
  processSnippets(snippets);

  var lists = doc.querySelectorAll("ol, ul");
  processLists(lists);
}

function process() {
  var start = new Date().getTime();

  processDocument(document);

  var iframes = document.querySelectorAll("iframe");
  for (var i = 0; i < iframes.length; i++) {
    processDocument(iframes[i].contentDocument);
  }

  var end = new Date().getTime();
  var time = end - start;
  alert('Execution time: ' + time);
}

process();