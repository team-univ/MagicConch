let answerBtnWithCnt = $('.answerBtn');
let answerCnt = 0;

$(document).ready(function (){
    answerCnt = parseInt($('.answerBtn').val());
    isQuestionLike = $('#isQuestionLike').text();
    if(isQuestionLike === 'true'){
        $('#like').hide();
        $('#no-like').show();
    }else{
        $('#like').show();
        $('#no-like').hide();
    }
})

function clickLike(click, questionId){
    if(click == 'like'){
        $('#like').hide();
        $('#no-like').show();
        $.ajax({
            url: '/questionLike',
            type: 'DELETE',
            data: {'questionId' : questionId},
            dataType: 'json',
            success: function (data) {
                console.log('성공');
            }, error: function (xhr) {
            }
        })

    }
    else if(click == 'noLike'){
        $('#like').show();
        $('#no-like').hide();
        $.ajax({
            url: '/questionLike',
            type: 'POST',
            data: {'questionId' : questionId},
            dataType: 'json',
            success: function (data) {
                console.log('성공');
            }, error: function (xhr) {
            }
        })
    }
}

function clickUpdate(){
    location.href = '/question/' + window.location.href.split('/')[4] + '/modify';
}

function clickDelete(){
    $.ajax({
        url: '/question/' + window.location.href.split('/')[4],
        type: 'DELETE',
        dataType: 'text',
        success: function (data) {
            if(data === 'success') {
                location.href = '/question/list';
            }
        }, error: function (xhr) {
        }
    })
}

function clickAnswer(){
    let commentBtn = document.getElementsByClassName('answerBtn').item(0);
    let comments = document.getElementsByClassName('answer-wrapper').item(0);
    if ($('.answerBtn').hasClass('active')){
        commentBtn.classList.remove('active');
        comments.classList.remove('active');
    }else{
        commentBtn.classList.add('active');
        comments.classList.add('active');
    }
}

function clickUpdateAnswer(id){
    let beforeText = $('#' + id +'  > div > div:nth-child(2) > div:nth-child(1)').text();
    $('#' + id).children().remove();
    $('#' + id).html(
        "<div class=\"text-end mt-4\">\n" +
        "    <div class=\"form-outline\">\n" +
        "        <textarea class=\"form-control\" id=\"answerUpdateContent\" rows=\"4\" name=\"content\"> " + beforeText + " </textarea>\n" +
        "        <label class=\"form-label\" for=\"answerUpdateContent\">답변 내용</label>\n" +
        "    </div>\n" +
        "    <button type=\"button\" class=\"mt-2 mb-2 btn btn-outline-primary\" onclick=\"clickUpdateAnswerBtn(" + id + ")\">작성</button>\n" +
        "</div>"
    )
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).init();
    });
    let offset = $('#' + id).offset();
    $('html').animate({scrollTop : offset.top}, 10);
}

function clickDeleteAnswer(id){
    $.ajax({
        url: '/answer',
        type: 'DELETE',
        data: {'answerId' : id},
        dataType: 'text',
        success: function (data) {
            answerCnt -= 1;
            answerBtnWithCnt.text('댓글 보기(' + answerCnt + ')');
            $('#' + id).remove();
        }, error: function (xhr) {
        }
    })
}

function clickAdoptAnswer(questionId, answerId){
    const answerInner = document.getElementById(answerId + '_inner');
    const answerDropBtn = $('#' + answerId + '_dropBtn');
    $.ajax({
        url: '/answer/adopt',
        type: 'POST',
        data: {'questionId' : questionId, 'answerId' : answerId},
        dataType: 'text',
        success: function (data) {
            if (data === "success"){
                alert("채택에 성공하였습니다.");
                answerInner.style = "border: 1px solid #BBDEFB; border-radius: 10px; padding: 10px";
                answerDropBtn.empty();
                answerDropBtn.html('<i class="fas fa-thumbs-up fa-2x" style="color: dodgerblue; padding: 10px 24px"></i>');
            }else{
                alert("채택에 실패하였습니다.");
            }
        }, error: function (xhr) {
        }
    })
}

function clickAnswerBtn(){
    let question = $('#question').text();
    let user = $('#user').text();
    let content = $('#answerContent');
    let answerWrapper = document.getElementsByClassName('answer-wrapper').item(0);

    $.ajax({
        url: '/answer',
        type: 'POST',
        data: {'questionId': question,  'username': user, 'content': content.val()},
        dataType: 'json',
        success: function (data) {
            answerCnt += 1
            answerBtnWithCnt.text('댓글 보기(' + answerCnt + ')');
            answerWrapper.innerHTML +=
                "<div class='scroll' id= " + data.answerId + ">\n" +
                "    <hr>\n" +
                "    <div style='background-color: #efefef; border-radius: 10px; padding: 10px' class=\"d-flex align-items-center\">\n" +
                "        <div class=\"d-flex flex-column ps-2\">\n" +
                "            <img src =" + data.profileImg + "\n" +
                "                 class=\"rounded-circle\"\n" +
                "                 height=\"35px\"\n" +
                "                 width=\"35px\">\n" +
                "            <div class=\"text-center\"> " + data.username + "</div>\n" +
                "        </div>\n" +
                "        <div class=\"d-flex flex-column\">" +
                "            <div class=\"ps-3\" style=\"word-break:break-all\" >" + data.content + "</div>\n" +
                "            <div class=\"ps-3\" style=\"font-size: 10px\">" + data.createTime + "</div>" +
                "        </div>\n" +
                "        <div class=\"btn-group shadow-0 ms-auto\">\n" +
                "            <button\n" +
                "                    type=\"button\"\n" +
                "                    class=\"btn btn-link dropdown-toggle\"\n" +
                "                    data-mdb-toggle=\"dropdown\"\n" +
                "                    aria-expanded=\"false\"\n" +
                "                    style=\"color: lightgray\"\n" +
                "            >\n" +
                "                <i class=\"fas fa-ellipsis-v\"></i>\n" +
                "            </button>\n" +
                "            <ul class=\"dropdown-menu\">\n" +
                "                <li><a class=\"dropdown-item\" onclick=clickUpdateAnswer(" + data.answerId + ")>수정</a></li>\n" +
                "                <li><a class=\"dropdown-item\" onclick=clickDeleteAnswer(" + data.answerId + ")>삭제</a></li>\n" +
                "            </ul>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>\n";
            let offset = $('#' + data.answerId).offset();
            $('html').animate({scrollTop : offset.top}, 10);
        }, error: function (xhr) {
            alert('글 작성에 실패하였습니다.');
        }
    })

    content.val('');

    if(!$('.answerBtn').hasClass('active')) {

        let commentBtn = document.getElementsByClassName('answerBtn').item(0);
        let comments = document.getElementsByClassName('answer-wrapper').item(0);

        commentBtn.classList.add('active');
        comments.classList.add('active');
    }

}

function clickUpdateAnswerBtn(id){
    $.ajax({
        url: '/answer',
        type: 'PUT',
        data: {'answerId': id,  'content': $('#answerUpdateContent').val()},
        dataType: 'json',
        success: function (data) {
            $('#' + id).children().remove();
            $('#' + id).html(
                "    <hr>\n" +
                "    <div style='background-color: #efefef' class=\"d-flex align-items-center\">\n" +
                "        <div class=\"d-flex flex-column ps-2\">\n" +
                "            <img src =" + data.profileImg + "\n" +
                "                 class=\"rounded-circle\"\n" +
                "                 height=\"35px\"\n" +
                "                 width=\"35px\">\n" +
                "            <div class=\"text-center\"> " + data.username + "</div>\n" +
                "        </div>\n" +
                "        <div class=\"d-flex flex-column\">" +
                "            <div class=\"ps-3\" style=\"word-break:break-all\" >" + data.content + "</div>\n" +
                "            <div class=\"ps-3\" style=\"font-size: 10px\">" + data.createTime + "</div>" +
                "        </div>\n" +
                "        <div class=\"btn-group shadow-0 ms-auto\">\n" +
                "            <button\n" +
                "                    type=\"button\"\n" +
                "                    class=\"btn btn-link dropdown-toggle\"\n" +
                "                    data-mdb-toggle=\"dropdown\"\n" +
                "                    aria-expanded=\"false\"\n" +
                "                    style=\"color: lightgray\"\n" +
                "            >\n" +
                "                <i class=\"fas fa-ellipsis-v\"></i>\n" +
                "            </button>\n" +
                "            <ul class=\"dropdown-menu\">\n" +
                "                <li><a class=\"dropdown-item\" onclick=clickUpdateAnswer(" + data.answerId + ")>수정</a></li>\n" +
                "                <li><a class=\"dropdown-item\" onclick=clickDeleteAnswer(" + data.answerId + ")>삭제</a></li>\n" +
                "            </ul>\n" +
                "        </div>\n" +
                "    </div>\n"
        )
        }, error: function (xhr) {
        }
    })
}