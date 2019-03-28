/*=====================================================================================================*/
/* Giving credit where credit is due, The JS is all built off of my original mod of Twily's homepage. */
/* If there are any similarities left, it's probably because it's based on his code.                 */
/*==================================================================================================*/

var $ = function(id) {
  return document.getElementById(id);
};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY", "SATURDAY"];
/*==============*/
/*== Options ==*/
/*============*/

var CookiePrefix = "jawanet"; //prefix for cookies.
var cmdPrefix = "!"; //prefix for commands.
var ssi = 1; //set default search provider. Use array index of the array below. (Starting with 0)
// Format: [Keyword, Search URL (Search query replaces "{Q}"), "Input placeholder text"]
var searchSources = [
    ["g", "https://www.google.com/search?q={Q}", "Google"],
    ["so", "https://www.stackoverflow.com/search?q={Q}", "Stack Overflow"],
    ["s", "https://www.shodan.io/search?query={Q}", "Shodan"],
    ["d", "https://duckduckgo.com/?q={Q}", "DuckDuckGo"],
    ["q", "https://www.qwant.com/?q={Q}", "Qwant"],
    ["t", "https://torrentz2.me/search?f={Q}", "Torrent"],
    ["f", "https://filepursuit.com/search3/{Q}", "FilePursuit"],
    ["a", "https://www.google.com/search?q=intext:%22{Q}%22+(avi|mkv|mov|mp4|mpg|wmv|ac3|flac|m4a|mp3|ogg|wav|wma)+-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)+-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)+intitle:%22index.of./%22", "Audio/Video"],
    ["sa", "https://www.google.com/search?q=intext:%22{Q}%22+(apk|exe|dmg|iso|tar|7z|bz2|gz|iso|rar|zip)+-inurl:(jsp|pl|php|html|aspx|htm|cf|shtml)+-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|index_of|wallywashis)+intitle:%22index.of./%22", "Software/Archive"]
];

var svgCode    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z\" /></svg>";
var svgGamepad = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z\" /></svg>";
var svgDownloads = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";
var svgReddit = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\"/></svg>";
var svgStream = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19 12c-.341 0-.673-.033-1-.08v1.08h-2v-1.683c-.749-.356-1.427-.837-2-1.422v3.105h-8v-6h6.294c-.19-.634-.294-1.305-.294-2h-12v19h20v-12.08c-.327.047-.659.08-1 .08zm-15 10h-2v-2h2v2zm0-4h-2v-2h2v2zm0-5h-2v-2h2v2zm0-4h-2v-2h2v2zm10 13h-8v-6h8v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm-3.711-14.667c.688-1.941 2.534-3.333 4.711-3.333 2.762 0 5 2.239 5 5 0 .285-.029.562-.074.833h-.635c-.474 0-.55-.211-.806-1.025-.186-.589-.493-1.479-1.171-1.479-.689 0-.957.923-1.205 1.669-.137.405-.217.65-.339.65-.116 0-.171-.245-.308-.65-.258-.759-.551-1.669-1.235-1.669-.711 0-1.016.995-1.22 1.628-.147.46-.194.691-.324.691-.111 0-.146-.187-.275-.56-.293-.85-.386-1.755-1.691-1.755h-.428zm8.941 3.334c-.957 0-1.185-.459-1.543-1.485-.221-.636-.245-.864-.373-.864-.126 0-.161.262-.408.964-.216.615-.514 1.379-1.136 1.379-.693 0-.987-.927-1.243-1.698-.142-.427-.177-.622-.3-.622-.115 0-.146.175-.291.598-.265.781-.559 1.722-1.253 1.722-.687 0-1-.926-1.171-1.479-.252-.818-.297-1.014-.755-1.014h-.684c-.044.27-.073.547-.073.832 0 2.761 2.238 5 5 5 2.177 0 4.022-1.392 4.709-3.333h-.479z\" /></svg>";
var svgMore = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16 6h-8v-6h8v6zm-10 12h-6v6h6v-6zm18 0h-6v6h6v-6zm-11-7v-3h-2v3h-9v5h2v-3h7v3h2v-3h7v3h2v-5h-9zm2 7h-6v6h6v-6z\" /></svg>";

/* Header Format: ["(Label)", "(Accent Color)", "-HEAD-"],
*   - The labels are setup for 24px SVGs. by default they are separated from the linkMenu for readability.
*   - Accent color can be: black, white, blue, green, cyan, red, magenta, and yellow. by default, the accent color is white.
*   - ALL categories need a header to start them. Headers are signified by the -HEAD- in the 3rd position.
* Link Format: ["Name", "URL",""],
*   - Name and URL are pretty self explanitory. 
*   - 3rd position may be used in the future, but right now it's not used and can be left blank.
*/
// Also yes I could totally use a json object to represent the menus, but I didn't feel like reprogramming the whole script. Probably doing that next site, though.
var linkMenu = [
    [svgCode, "red", "-HEAD-"],
    ["GitHub", "https://github.com", ""],
    ["CodePen", "https://codepen.io/pens/", ""],
    ["Hackr", "https://hackr.io", ""],
    ["DevHints", "https://devhints.io", ""],
    ["Paletton", "http://paletton.com", ""],
    ["JSBeautifier", "http://jsbeautifier.org", ""],
    ["Compressor", "https://compressor.io", ""],
    ["BlackHatWorld", "https://www.blackhatworld.com", ""],
    ["ScriptzNull", "https://scriptznull.nl", ""],
    ["Nulled Scripts", "http://www.nulled-scripts.xyz", ""],
    ["FreeTutorials", "https://www.freetutorials.us", ""],
    ["Selfhosted", "https://github.com/Kickball/awesome-selfhosted", ""],
  
  [svgGamepad,                 "magenta",                                     "-HEAD-"], // Gaming
  ["Steam",                    "https://store.steampowered.com/",""],
  ["Humble Bundle",            "https://www.humblebundle.com/",""],
  ["GOG.com",                  "https://www.gog.com/",""],
  ["/r/gaming",                "https://old.reddit.com/r/gaming",""],

    [svgDownloads, "blue", "-HEAD-"],
    ["1337X", "https://1337x.to/home/", ""],
    ["RARBG", "https://rarbg.to/torrents.php", ""],
    ["EZTV", "https://eztv.ag", ""],
    ["BTScene", "https://bt-scene.cc/indexfull/", ""],
    ["Torrentz2", "https://torrentz2.me", ""],
    ["YIFY Movies", "https://yts.am/browse-movies", ""],
    ["AIO Search", "http://www.aiosearch.com", ""],
    ["MagazineLib", "http://magazinelib.com", ""],
    ["Sci-Hub", "https://sci-hub.tw", ""],
    ["LibGen", "http://libgen.io", ""],
    ["B-OK", "http://b-ok.org", ""],
    ["FitGirl Repacks", "http://fitgirl-repacks.site", ""],
    ["Good Old Downloads", "https://goodolddownloads.com", ""],
    ["IGG-Games", "http://igg-games.com", ""],
    ["SoftArchive", "https://sanet.cd/full/", ""],
    ["Fresh Music", "https://freshmusic.download", ""],

    [svgStream, "purple", "-HEAD-"],
    ["SockShare", "https://sockshare.video", ""],
    ["Audio Book Bay", "http://audiobookbay.nl", ""],
    ["YouTubeMP3", "https://youtubemp3.rip", ""],
    ["MusicPleer", "https://musicpleer.bz", ""],
    ["DatMusic", "https://datmusic.xyz", ""],
    ["720pStream", "http://www.720pstream.me", ""],
    ["SportsHD", "http://www.sportshd.me", ""],
    ["NFL Streams", "https://www.reddit.com/r/nflstreams/", ""],
    ["NBA Streams", "https://www.reddit.com/r/nbastreams/", ""],
    ["MLB Streams", "https://www.reddit.com/r/MLBStreams/", ""],
    ["NHL Streams", "https://www.reddit.com/r/NHLStreams/", ""],
    ["MMA Streams", "https://www.reddit.com/r/MMAStreams/", ""],
    ["Soccer Streams", "https://www.reddit.com/r/soccerstreams/", ""],

    [svgReddit, "cyan", "-HEAD-"],
    ["SnoopSnoo", "https://snoopsnoo.com", ""],
    ["/r/Programming", "https://www.reddit.com/r/programming/", ""],
    ["/r/SysAdmin", "https://www.reddit.com/r/sysadmin/", ""],
    ["/r/Linux", "https://www.reddit.com/r/linux/", ""],
    ["/r/NetSec", "https://www.reddit.com/r/netsec/", ""],
    ["/r/WebDev", "https://www.reddit.com/r/webdev/", ""],
    ["/r/BlackHat", "https://www.reddit.com/r/blackhat/", ""],
    ["/r/Hacking", "https://www.reddit.com/r/hacking/", ""],
    ["/r/TechSupport", "https://www.reddit.com/r/techsupport/", ""],
    ["/r/Privacy", "https://www.reddit.com/r/privacy/", ""],
    ["/r/HomeNetworking", "https://www.reddit.com/r/HomeNetworking/", ""],
    ["/r/InternetIsBeautiful", "https://www.reddit.com/r/InternetIsBeautiful/", ""],
    ["/r/HomeLab", "https://www.reddit.com/r/homelab/", ""],

    [svgMore, "pink", "-HEAD-"],
    ["ProtonMail", "https://protonmail.com", ""],
    ["10 Minute Mail", "https://10minutemail.net", ""],
    ["Windy", "https://www.windy.com", ""],
    ["SmallPDF", "https://smallpdf.com", ""],
    ["Anon.to", "https://anon.to", ""],
    ["GhostBin", "https://ghostbin.com", ""],
    ["DNSTrails", "https://dnstrails.com", ""],
    ["Censys", "https://censys.io", ""],
    ["DNSDumpster", "https://dnsdumpster.com", ""],
    ["Privacy Tools", "https://www.privacytools.io", ""],
    ["0Day Today", "https://0day.today", ""],
    ["DarkNet Stats", "https://dnstats.net", ""],
    ["ThatOnePrivacySite", "https://thatoneprivacysite.net", ""],
    ["List of Awesome Lists ", "https://github.com/sindresorhus/awesome", ""],
    ["Awesome Hacking", "https://github.com/Hack-with-Github/Awesome-Hacking/blob/master/README.md", ""],
    ["Awesome Sysadmin", "https://github.com/n1trux/awesome-sysadmin", ""],
    ["Linkbase", "https://link-base.org", ""],
];
// DID I FORGET TO MENTION?! THE DEMO LINKS DO NOTHING!

/*==================*/
/*== Main Script ==*/
/*================*/

//core element vars
var searchInput = $('searchBar');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function init() {
  initSearchBar();
  buildDate();
  buildMenu();
  $('body').style.opacity = 1;
  $('mainContainer').style.opacity = 1;
  $('dateContainer').style.opacity = 1;
  $('notesWidget').style.opacity = 1;
}

function initSearchBar() {
  if (searchSources[ssi] !== undefined)
    searchInput.placeholder = searchSources[ssi][2];
  else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }
  
  document.addEventListener('keydown', function(event) { handleKeydown(event); });
  
  searchInput.value = "";
}

function buildDate() {
  var today = new Date();
  dateDiv.innerHTML = "<font class=\"font-3em\">" +
                      monthNames[today.getMonth()] + 
                      " " + 
                      today.getDate() + 
                      "</font><br><font>" + 
                      dayNames[today.getDay()] + 
                      ", " + 
                      today.getFullYear() +
                      "</font>";
}

function buildMenu() {
  var newMenu = "";
  var accent = "";

  if(linkMenu[0][2] === "-HEAD-") {

    if (linkMenu[0][1] !== "") accent = linkMenu[0][1].toLowerCase();
    else accent = "white";

    newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + accent + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
  } else {
    alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
  }
  for (var i = 1; i < linkMenu.length; i++) {
    if (linkMenu[i][2] === "-HEAD-") {

      if (linkMenu[i][1] !== "") accent = linkMenu[i][1].toLowerCase();
      else accent = "white";

      newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + accent + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
    } else {
      newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
    }
  }
  newMenu +="</ul></div></div></li>";

  rootMenuUL.innerHTML = newMenu;
}

function handleQuery(event, query) {
  var key = event.keyCode || event.which;
  if(query !== "") {
    var qlist;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            break;
          }
        }
        if (qList.length > 1) {
          window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
        } else {
          searchInput.placeholder = searchSources[ssi][2];
          searchInput.value = "";
        }
      } else {
        window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
      }
    } 
  }
  if (key === 27) {
    searchInput.blur();
  }
}

function handleNoteInput(event) {
  var key = event.keyCode || event.which;
  if (key === 27) {
    notesTextarea.blur();
  }
}

var noteText = null;
function handleNotes(event, focus){
  if (focus) {
    if(!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass('notesContainer', "active");
  } else {
    removeClass('notesContainer', "active");
    if(noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}

var ignoredKeys = [9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
function handleKeydown(event) {
  if(notesInput === document.activeElement) return;
  if(searchInput === document.activeElement) return;
  if (ignoredKeys.includes(event.keyCode)) return;
  searchInput.focus();
}

function addClass(elementID, className) {
  $(elementID).classList.add(className);
}
function removeClass(elementID, className) {
  $(elementID).classList.remove(className);
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
      console.log(e);
    }
    return null;
}
function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}
function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}
function DelCookie(name) {
    document.cookie = fr.client.CookieBase + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
