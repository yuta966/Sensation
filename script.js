$(document).ready(function(){
    //次へボタン
    $('.icon').click(function(){
        let $gradeModal = $('.grade-modal').hasClass('open');
        let $subjectModal = $('.subject-modal').hasClass('open');

        if($gradeModal) {
            $('.grade-modal').addClass('close');
            $('.grade-modal').removeClass('open');
            $('.subject-modal').addClass('open');
            $('.subject-modal').removeClass('close');

            $('#grade').val($(this).attr('id'));

            //subjectを設定
            let grade = $('#grade').val();
            subjectData(grade);
        }

        if($subjectModal) {
            $subject = $(this).attr('id');
            let subject_array = ["国語","社会","算数","数学","理科","音楽","美術","図工","保健","体育","技術","家庭","生活","英語","道徳","特活","総合"];
            let err = true;
            $.each(subject_array, function(index, elem) {
                if($subject == elem) {
                    err = false;
                }
            });
            if(err) {
                return ;
            }

            $('#subject').val($subject);

            $('.subject-modal').addClass('close');
            $('.subject-modal').removeClass('open');
            $('.content-modal').addClass('open');
            $('.content-modal').removeClass('close');

            //contentを設定
            let content = contentData($('#grade').val(),$('#subject').val());
            for(i = 0; i < content.length; i ++) {
                let template = document.getElementById('template');
                let clone = template.content.cloneNode(true);
                clone.querySelector('.icon-text').textContent = content[i];
                clone.querySelector('.icon-text').style.color = setColor($('#subject').val(), content.length, i);
                document.getElementById('icons').appendChild(clone);
            }
        }

        $('html, body').animate({'scrollTop': 0},500);
    });

    $(document).on('click', '.icon' , function() {
        let $contentModal = $('.content-modal').hasClass('open');
        $content = $(this).find('.icon-text').text();

        if($contentModal && $content != "") {
            $('#content').val($content);
        }

        $('.content-modal').find('.icon').each(function(){
            if($(this).find(".icon-text").text() == $content) {
                $(this).addClass("selected");
            } else {
                $(this).removeClass("selected");
            }
        });
    });

    //戻るボタン
    $('.prevButton').click(function(){
        let $subjectModal = $('.subject-modal').hasClass('open');
        let $contentModal = $('.content-modal').hasClass('open');

        if($subjectModal) {
            $('.subject-modal').addClass('close');
            $('.subject-modal').removeClass('open');
            $('.grade-modal').addClass('open');
            $('.grade-modal').removeClass('close');

            //subject iconを閉じる
            $('.subject-modal').find('.icon').each(function(){
                $(this).addClass('close');
            });

            $('#subject').val("");
        }

        if($contentModal) {
            $('.content-modal').addClass('close');
            $('.content-modal').removeClass('open');
            $('.subject-modal').addClass('open');
            $('.subject-modal').removeClass('close');

            //content iconを閉じる
            let clone = document.getElementById('icons');
            clone.innerHTML = '';
            $('#content').val("");
        }

        $('html, body').animate({'scrollTop': 0},500);
    });

    //Goボタン
    $('.goButton').click(function(){
        $('#keyword').val($('.top-content').find('input').val());
        search();
    });
});


function search() {
    //検索機能の実装
    $grade = $('#grade').val();
    $subject = $('#subject').val();
    $content = $('#content').val();
    $keyword = $('#keyword').val();

    //キーワード検索
    if($keyword && $grade && $subject && $content) {
        window.location.href = 'http://www.google.co.jp/search?q=%20&hq=学習指導案%20-amazon%20' + $keyword + '%20' + $grade + '%20' + $subject +'%20' + $content;
    }
    //条件検索
    else if($keyword) {
        window.location.href = 'http://www.google.co.jp/search?q=%20&hq=学習指導案%20-amazon%20' + $keyword;
    }
    else if($grade && $subject && $content) {
        window.location.href = 'http://www.google.co.jp/search?q=%20&hq=学習指導案%20-amazon%20' + $grade + '%20' + $subject +'%20' + $content;
    }
    //エラー
    else {
        console.log("エラーが発生");
    }
}