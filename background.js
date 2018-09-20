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

function log(info, tab) {
    console.debug("info", JSON.stringify(info));
    console.debug("tab", JSON.stringify(tab));
}

function genericOnClick(info, tab) {
    log(info, tab);

    var decodedLink = getDecodedURLRecursively(info.linkUrl);

    if (decodedLink.includes(fshareFileLinkPrefix)) {
        openGetlinkPage(decodedLink);
    } else {
        notify("Unsupported link", "You must choose a fshare link of a file");
    }
}

function genericOnClickOnFsharePage(info, tab) {
    log(info, tab);

    openGetlinkPage(info.pageUrl);
}

function openGetlinkPage(url) {
    var fshareFileId = getDecodedURLRecursively(url).split(fshareFileLinkPrefix)[1].substring(0, fshareFileIdLength);
    console.debug("File id", fshareFileId);
    window.open("https://getlinkfshare.com/file/" + fshareFileId, "_blank");
}

var getLinkContexMenuId = chrome.contextMenus.create({
    "title": menuTitle,
    "contexts": ["link"],
    "onclick": genericOnClick
});
console.debug("Created menu item with id: " + getLinkContexMenuId);

var getLinkContextMenuOnFsharePageID = chrome.contextMenus.create({
    "title": menuTitle,
    "contexts": ["page"],
    "onclick": genericOnClickOnFsharePage,
    "documentUrlPatterns": ["https://www.fshare.vn/file/*"]
});
console.debug("Created menu item on Fshare page with id: " + getLinkContextMenuOnFsharePageID);