
const ON_HEROKU_WEB_ENDPOINT = "https://on-heroku.herokuapp.com/";

function domainFromURL(url) { return url ? url.replace(/^https?:\/\//, '').replace(/[:\/].*/, '') : null }

function isDomainOnHeroku(domain) {
  if (!domain) return false;
  var req = new XMLHttpRequest();
  req.open("GET", ON_HEROKU_WEB_ENDPOINT + domain, false);
  req.send();
  if (req.status != 200) return false;
  var response = JSON.parse(req.responseText);
  return response['on-heroku'];
}

function updateOnHerokuDisplay(tabId, changeInfo, tab) {
  if (!changeInfo.url) return;
  var domain = domainFromURL(changeInfo.url);
  var isOn = isDomainOnHeroku(domain);
  if(isOn){
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
}
chrome.tabs.onUpdated.addListener(updateOnHerokuDisplay);