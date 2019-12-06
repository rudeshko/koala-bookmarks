$(document).ready(function() {
  //Get bookmarks
  chrome.storage.sync.get('bookmarks', function(obj) {
    var bookmarks = obj.bookmarks;

    if (!bookmarks) {
      var emptyBookmark = {
        name: '',
        url: ''
      };

      bookmarks = new Array();
      for (var i = 0; i < 16; i++) {
        bookmarks.push(emptyBookmark);
      }
    }

    var row,
      i,
      count = 0,
      rowAdd;
    for (row = 0; row < 4; row++) {
      rowAdd = "<div class='row'>";
      for (i = count; i < count + 4; i++) {
        if (bookmarks[i]['url'] !== '' && bookmarks[i]['name'] !== '') {
          var add = '';
          add += "<div class='cell'>";
          add +=
            "<a class='dummy' href='" +
            bookmarks[i]['url'] +
            "' target='_blank'>";
          add += "<div class='link'></div>";

          add += "<div class='circle'>";
          add += "<div class='icon'>";
          add +=
            "<img src='http://www.google.com/s2/favicons?domain=" +
            bookmarks[i]['url'] +
            "' />";
          add += '</div>';
          add += '</div>';

          add += "<div class='title'>";
          add += bookmarks[i]['name'];
          add += '</div>';
          add += '</a>';
          add += '</div>';
          rowAdd += add;
        } else {
          rowAdd +=
            "<div class='cell'><a href='./options.html#" +
            (i + 1) +
            "' target='_blank'><div class='circle add'>+</div></a></div>";
        }
      }
      rowAdd += '</div>';
      count += 4;
      $('body').append(rowAdd);
    }
  });
});

setTimeout(function() {
  $(document).on('keyup', 'body', function(e) {
    var key = parseInt(String.fromCharCode(e.keyCode));
    if (key >= 1 && key <= 9) {
      var $tab = $('div.cell')
        .eq(key - 1)
        .children('a')[0];
      if ($tab !== undefined) {
        $tab.click();
      }
    }
  });
}, 500);
