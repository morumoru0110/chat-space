$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="MessageField__MessageBox" data-message-id=${message.id}>
          <div class="MessageField__MessageInfo">
            <div class="MessageField__MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="MessageField__MessageInfo__Date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__Content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="MessageField__MessageBox" data-message-id=${message.id}>
          <div class="MessageField__MessageInfo">
            <div class="MessageField__MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="MessageField__MessageInfo__Date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__Content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.MessageField__MessageBox:last').data("message-id");
    if(! last_message_id){
      last_message_id = 0 ;
    }
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MainChat__MessageField').append(insertHTML);
        $('.MainChat__MessageField').animate({ scrollTop: $('.MainChat__MessageField')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});