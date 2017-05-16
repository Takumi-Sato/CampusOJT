$(".main_header .fa-bars").on("click", clicked);

function clicked() {
    $("body").addClass("menu_open");
}


$(".drawer_menu .close_btn .fa-times").on("click", clickedClose);

function clickedClose() {
    $("body").removeClass("menu_open");
}


$(".submit").on("click", doSubmit);

function doSubmit() {
    var comment = $(".input_container input").val();
    if (comment == "") return;
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var dom2 = '<div class="chat_item from_me"><img class="icon" src="img/serina.png" alt=""><div class="talk_box">' + comment + '</div><div class="talk_time">' + AddZero(hour) + ':' + AddZero(minute) + '</div><i class="fa fa-trash" aria-hidden="true"></i><i class="fa fa-pencil" aria-hidden="true"></i></div>';
    $(".chat_container").append(dom2);

    $(".input_container input").val("");
}

$(".clear_talk").on("click", clearTalkClicked)

function clearTalkClicked() {
    $("div.chat_container").empty();
}

function AddZero(num) {
    var result;
    if (num < 10) result = "0" + num;
    else result = "" + num;

    return result;
}



$(document).on("click", ".chat_item .fa-trash", function() {
    if (!confirm('この発言を消去しますか？')) {
        return false;
    } else {
        $(this).parent().remove();
    }
});


$(document).on("click", ".from_me .fa-pencil", editClicked);

function editClicked() {
    /* テキスト入力用のウィンドウを出す */
    $("body").addClass("show_edit");
    var talk_text = $(this).parent().children('.talk_box').text();
    $(".edit_box").val(talk_text);
    $(".edit_confirm").data($(this));
    /* OKならテキストを反映して閉じる */
    /* Cancelならそのまま閉じる */
}

$(document).on("click", ".edit_confirm", editConfirmed);

function editConfirmed() {
    var editted_text = $(".edit_box").val();
    $(this).data().parent().children(".talk_box").text(editted_text);
    /* 修正済みの印を表示したいが, .chat_item に収まらないので一時コメントアウト
    $(this).data().parent().html($(this).data().parent().html() + "<div class=\"editted_mark\">[editted]</div>");
    */
    $("body").removeClass("show_edit");
}

$(document).on("click", ".edit_cancel", editCanceled);

function editCanceled() {
    $("body").removeClass("show_edit");
}



/* ファイルアップローダー */
$(document).on("change", "#files", onUploadFile);

function onUploadFile() {
    var files = $(this)[0].files;
    var reader = new FileReader();
    console.log($(this));
    if ($(this)[0].files[0].type.indexOf("image") != -1) {
        reader.readAsDataURL(files[0]);
        reader.onload = function() {
            console.log(reader.result)
            var comment = reader.result;
            var time = new Date();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var dom2 = '<div class="chat_item from_me"><img class="icon" src="img/serina.png" alt=""><div class="talk_box"><img class="chat_img" src="' + comment + '" alt=""></div><div class="talk_time">' + AddZero(hour) + ':' + AddZero(minute) + '</div><i class="fa fa-trash" aria-hidden="true"></i><i class="fa fa-pencil" aria-hidden="true"></i></div>';
            $(".chat_container").append(dom2);

        }
    } else if ($(this)[0].files[0].type.indexOf("text") != -1) {
        reader.readAsText(files[0]);
        reader.onload = function(e) {
            console.log(reader.result)
            var comment = reader.result;
            var time = new Date();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var dom2 = '<div class="chat_item from_me"><img class="icon" src="img/serina.png" alt=""><div class="talk_box">' + comment + '</div><div class="talk_time">' + AddZero(hour) + ':' + AddZero(minute) + '</div><i class="fa fa-trash" aria-hidden="true"></i><i class="fa fa-pencil" aria-hidden="true"></i></div>';
            $(".chat_container").append(dom2);

        }
    }
}
