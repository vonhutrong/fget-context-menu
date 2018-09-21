function openGetlinkPage(url) {
    var fshareFileId = url.split("fshare.vn/file/")[1].substring(0, 12);
    console.debug("File id", fshareFileId);
    window.open("https://getlinkfshare.com/file/" + fshareFileId, "_blank");
}

function getIcon() {
    var icon = document.createElement("I");
    icon.classList.add("material-icons");
    var iconName = document.createTextNode("all_inclusive");
    icon.appendChild(iconName);
    return icon;
}

function getMenuLabel() {
    return document.createTextNode("\u00A0 Get link");
}

function getMenuItem() {
    var li = document.createElement("LI");
    li.onclick = function () {
        openGetlinkPage(document.querySelectorAll("#download-menu > ul > li")[3].getAttribute("data-clipboard-text"));
    };
    li.classList.add("mdc-list-item");
    li.classList.add("ng-binding");
    li.appendChild(getIcon());
    li.appendChild(getMenuLabel());
    return li;
}

document.querySelector("#download-menu > ul").appendChild(getMenuItem());
