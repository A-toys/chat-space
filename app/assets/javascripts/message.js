$(function() {

  function buildMessageHTML(message) {
    var lower_message = ''
    if (message.content && message.image.url) {
      lower_message = `<p class="message__text">
                         ${message.content} 
                       </p>
                       <img src="${message.image.url}" class="lower-message__image" >`
    } else if (message.content) {
      lower_message = `<p class="message__text">
                         ${message.content}
                       </p>`
    } else if (message.image.url) {
      lower_message = `<img src="${message.image.url}" class="lower-message__image" >`
    };
    var html = `<div class="message" data-id=${message.id}>
                <div class="message__info">
                  <div class="message__info__writer">
                    ${message.user_name}
                  </div>
                  <div class="message__info__post-day">
                  ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  ${lower_message}
                </div>
              </div>`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessageHTML(message);
      $('.main-content').append(html);
      $('.main-content').animate({scrollTop : $('.main-content')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('id');
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        var insertHTML = '';

        messages.forEach(function(message) {
          insertHTML = buildMessageHTML(message);
          $('.main-content').append(insertHTML);
        })
        $('.main-content').animate({scrollTop : $('.main-content')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      })
    }
  }
  setInterval(reloadMessages, 7000);
})