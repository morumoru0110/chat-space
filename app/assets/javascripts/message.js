$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="MessageField__MessageBox">
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
        `<div class="MessageField__MessageBox">
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


  $('.Form__Contents').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MainChat__MessageField').append(html);
      $('.MainChat__MessageField').animate({ scrollTop: $('.MainChat__MessageField')[0].scrollHeight});
      $('form')[0].reset();
      $('.Form__SendBtn').attr('disabled', false);
    })
    .fail(function(){
          alert("メッセージ送信に失敗しました");
    });
  });
});