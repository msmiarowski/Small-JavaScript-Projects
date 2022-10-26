var c = function() {
  return({
      log: function(msg) {
        consoleDiv = document.getElementById('console');
        para = document.createElement('p');
        text = document.createTextNode(msg);
        para.appendChild(text);
        consoleDiv.appendChild(para);
      }
  });
}();

window.onload = function () {
  var toc = "";
  var level = 0;
  var maxLevel = 3;

  document.getElementById("contents").innerHTML =
    document.getElementById("contents").innerHTML.replace(
      /<h([\d])>([^<]+)<\/h([\d])>/gi,
      function (str, openLevel, titleText, closeLevel) {
        // console.log(str, openLevel, titleText, closeLevel);
        if (openLevel != closeLevel) {
          c.log(openLevel)
          return str + ' - ' + openLevel;
        }

        if (openLevel > level) {
          toc += (new Array(openLevel - level + 1)).join("<ol>");
          console.log(toc)
        } else if (openLevel < level) {
          toc += (new Array(level - openLevel + 1)).join("</ol>");
        }

        level = parseInt(openLevel);

        var anchor = titleText.replace(/ /g, "_");
        toc += "<li><a href=\"#" + anchor + "\">" + titleText
            + "</a></li>";

        return "<h" + openLevel + "><a name=\"" + anchor + "\">"
            + titleText + "</a></h" + closeLevel + ">";
      }
    );
  if (level) {
    toc += (new Array(level + 1)).join("</ol>");
  }

  document.getElementById("toc").innerHTML += toc;
};