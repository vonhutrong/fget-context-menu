var fshareFileLinkPrefix = "fshare.vn/file/";
var fshareFileIdLength = 12;
var menuTitle = "Get link";

function getDecodedURLRecursively(url) {
    if (url.indexOf('%') != -1) {
        return getDecodedURLRecursively(decodeURIComponent(url));
    }
    return url;
}

function notify(title, message) {
    var opt = {
        type: "basic",
        title: title,
        message: message,
        iconUrl: "/images/cloud.png"
    };
    chrome.notifications.create(opt);
}

function getFshareLink(decodedLink) {
    return decodedLink.split(fshareFileLinkPrefix)[1];
}

function getFshareFileId(decodedLink) {
    return getFshareLink(decodedLink).substring(0, fshareFileIdLength);
}

function isRightClickOnFshareFileLink(info, decodedLink) {
    return info.menuItemId === getLinkContexMenuId && decodedLink.includes(fshareFileLinkPrefix);
}

function genericOnClick(info, tab) {
    console.debug("item was clicked", info.menuItemId);
    console.debug("info", JSON.stringify(info));
    console.debug("tab", JSON.stringify(tab));

    var decodedLink = getDecodedURLRecursively(info.linkUrl);

    if (isRightClickOnFshareFileLink(info, decodedLink)) {

        console.debug("User has right clicked on a fshare link");

        var fshareFileId = getFshareFileId(decodedLink);
        console.debug("File id", fshareFileId);

        var link = "https://getlinkfshare.com/file/" + fshareFileId;
        window.open(link, '_blank');
        console.info("Opened page", link);
    } else {
        notify("Unsupported link", "You must choose a fshare link of a file");
    }
}

var getLinkContexMenuId = chrome.contextMenus.create({
    "title": menuTitle,
    "contexts": ["link"],
    "onclick": genericOnClick
});
console.debug("Created menu item with id: " + getLinkContexMenuId);