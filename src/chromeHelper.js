/* global chrome */

export const getStoredBookmarks = () => {
  if (process.env.NODE_ENV === "development") {
    return new Promise((resolve, reject) => {
      resolve([
        { name: "", url: "" },
        { name: "Facebook", url: "https://www.facebook.com/?sk=h_chr" },
        { name: "Clockify", url: "https://clockify.me/tracker" },
        { name: "Youtube", url: "http://www.youtube.com/feed/subscriptions" },
        { name: "", url: "" },
        { name: "Speedtest", url: "http://www.speedtest.net/" },
        { name: "", url: "" },
        { name: "", url: "" },
        { name: "Amazon", url: "http://www.amazon.ca/" },
        { name: "", url: "" },
        { name: "Todoist", url: "https://todoist.com/app" },
        { name: "Play Music", url: "https://play.google.com/music/listen" },
        { name: "Dima Rudeshko", url: "https://rudeshko.net/" },
        { name: "WhatsApp", url: "https://web.whatsapp.com/" },
        { name: "", url: "" },
        { name: "LinkedIn", url: "https://linkedin.com/" }
      ]);
    });
  } else {
    chrome.storage.sync.get("bookmarks", function(obj) {
      console.log("Got local storage bookmarks:", obj.bookmarks);
      return obj.bookmarks;
    });
  }
};

export default {};
