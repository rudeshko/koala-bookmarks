function updateBookmarks(bookmarks) {
  //Display bookmarks
  for (var i = 0; i < 16; i++) {
    if (bookmarks[i]['url']) {
      $('div.selection-row[data-id=' + (i + 1) + ']')
        .css(
          'background-image',
          "url('http://www.google.com/s2/favicons?domain=" +
            bookmarks[i]['url'] +
            "')"
        )
        .attr('data-name', bookmarks[i]['name'])
        .attr('data-url', bookmarks[i]['url']);
    } else {
      $('div.selection-row[data-id=' + (i + 1) + ']').css(
        'background-image',
        ''
      );
    }
  }
}

$(document).ready(function() {
  chrome.storage.sync.get('bookmarks', function(obj) {
    var bookmarks;
    if (!obj.bookmarks) {
      var emptyBookmark = {
        name: '',
        url: ''
      };

      bookmarks = new Array();
      for (var i = 0; i < 16; i++) {
        bookmarks.push(emptyBookmark);
      }
    } else {
      bookmarks = obj.bookmarks;
    }

    updateBookmarks(bookmarks);

    $('div.selection-row').click(function() {
      $('div.selection-row').removeClass('selected');
      $(this).addClass('selected');
      $('input[name=position]').val($(this).attr('data-id'));

      $('input[name=name]')
        .val($(this).attr('data-name'))
        .focus();
      $('input[name=url]').val($(this).attr('data-url'));
    });

    var addIndex = parseInt(window.location.hash.substr(1));
    if (addIndex > 0 && addIndex <= 16) {
      $('div.selection-row[data-id=' + addIndex + ']').trigger('click');
    }

    $('form#createBookmark').submit(function(event) {
      if (!confirm('Add/Change the bookmark?')) {
        event.preventDefault();
        return;
      }

      var name = $('input[name=name]').val();
      var url = $('input[name=url]').val();
      var position = $('input[name=position]').val() - 1;

      if (position < 0) {
        event.preventDefault();
        return;
      }

      if (!url) {
        var url = '';
      } else {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }
      }

      if (!name) {
        var name = url.toLowerCase().replace(/(http:\/\/|https:\/\/)+/g, '');
      }

      var newBookmark = {
        name: name,
        url: url
      };
      bookmarks[position] = newBookmark;

      //Using Chrome storage sync set method
      chrome.storage.sync.set({ bookmarks: bookmarks }, function() {
        $('input[type=text], input[type=hidden]').val('');
        $('div.selection-row').removeClass('selected');
        updateBookmarks(bookmarks);
        window.location.hash = '';
        alert('New bookmark has been set');
      });

      event.preventDefault();
    });
  });
});
