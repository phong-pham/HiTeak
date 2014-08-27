
function getCookies(application, field)
{
    var i,x,y;
    var documentCookies = document.cookie.split(";");
    for (i=0;i<documentCookies.length;i++)
    {
      x = documentCookies[i].substr(0,documentCookies[i].indexOf("="));
      y = documentCookies[i].substr(documentCookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      var temp = x.split(".");
      if(temp.length == 3)
      {
        if (temp[1] == application && temp[2] == field)
        {
            return unescape(y);
        }
      }
    }
}