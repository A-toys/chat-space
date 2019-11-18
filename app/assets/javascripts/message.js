$(function() {

  function buildMessage(message) {
    var image_view = message.image !== null ? 
                     `<img src="${message.image}", class="lower-message__image" >` : "";

    var html = `<div class="message">
                  <div class="message__info">
                    <div class="message__info__writer">
                    ${message.user}
                    </div>
                    <div class="message__info__post-day">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="message__text">
                      ${message.content}
                    </p>
                    ${image_view}
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
      var html = buildMessage(message);
      $('.main-content').append(html);
      $('.main-content').animate({scrollTop : $('.main-content')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
})