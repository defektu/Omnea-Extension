if (typeof init === "undefined") {
  var OmneaLink = "https://omnea.xyz";
  function getElementsByText(str, tag = "a") {
    return Array.prototype.slice
      .call(document.getElementsByTagName(tag))
      .filter((el) => el.textContent.trim() === str.trim());
  }
  function getElementsByInnerHTML(str, tag = "a") {
    var array = Array.prototype.slice.call(document.getElementsByTagName(tag));
    var inner = array.filter((el) => {
      if (el.innerHTML.search(str) != -1) return el;
      el.innerHTML.trim() === str.trim();
    });
    return inner;
  }

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  const init = function () {
    var currentLocation = window.location;
    switch (currentLocation.host) {
      case "www.fxhash.xyz":
        fxhash();
        break;
        //   case "opensea.io":
        // opensea();
        break;
      default:
      // code block
    }
  };

  const fxhash = function () {
    var currentLocation = window.location;
    var path = currentLocation.pathname
      .replace("generative/", "")
      .replace("/", "")
      .replaceAll("/", "*");

    var buttons = document.querySelector(
      '[class*="GenerativeArtwork_artwork_buttons"',
    );
    var button = buttons.getElementsByTagName("a");
    var clone = button[0].cloneNode(true);

    var icon = clone.getElementsByTagName("i");

    icon[0].className = "fas fa-cubes";
    clone.innerHTML = clone.innerHTML.replace("open", "view in 3D");
    clone.href = OmneaLink + "/fxhash/" + path;

    insertAfter(button[0], clone);
  };

  const opensea = function (findStr = "Make offer") {
    var currentLocation = window.location;
    var path = currentLocation.pathname;
    path = currentLocation.pathname.replace("assets/ethereum", "opensea");

    var buttonChild = getElementsByInnerHTML(findStr, "button");
    var anchorDiv = document.getElementsByClassName("item--counts");

    const clone = buttonChild[0].cloneNode(true);
    var icon = clone.getElementsByTagName("i");

    icon[0].innerHTML = "token";
    clone.innerHTML = clone.innerHTML.replace(findStr, "View in 3D");
    clone.onclick = function () {
      window.open(OmneaLink + path, "_blank");
    };
    clone.style = "margin: 0px 20px 20px 20px; width: auto;";

    insertAfter(anchorDiv[0], clone);
  };

  init();
}
