var fshareLinkPrefix = "fshare.vn/file/";
var menuTitle = "Get link";

function getDecodedURLRecursively(url) {
    if(url.indexOf('%') != -1) {
        return getDecodedURLRecursively(decodeURIComponent(url));
    }
    return url;
}

function genericOnClick(info, tab) {
  console.debug("item was clicked", info.menuItemId);
  console.debug("info",JSON.stringify(info));
  console.debug("tab", JSON.stringify(tab));

  var decodedLink = getDecodedURLRecursively(info.linkUrl);

  if (info.menuItemId === getLinkContexMenuId && decodedLink.includes(fshareLinkPrefix)) {

      console.debug("User has right clicked on a fshare link");

      var fshareFileId = decodedLink.split(fshareLinkPrefix)[1];
      console.debug("File id", fshareFileId);

      var link = "https://getlinkfshare.com/file/" + fshareFileId;
      window.open(link, '_blank');
      console.info("Opened page", link);
  }
}

var getLinkContexMenuId = chrome.contextMenus.create({
    "title": menuTitle,
    "contexts": ["link"],
    "onclick": genericOnClick
});
console.debug("Created menu item with id: " + getLinkContexMenuId);
