$(document).ready(function(){
    //次へボタン
    $('.icon').click(function(){
        console.log("clicked");
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
            let subject_array = ["国語","社会","算数","数学","理科","音楽","美術","図工","保健",
                                 "体育","技術","家庭","生活","英語","道徳","特活","総合","化学","化学基礎","家庭基礎",
                                 "家庭総合","漢文","現代社会","現代文","古文","公民","社会と情報","書道","情報の科学",
                                 "数学１","数学２","数学３","数学A","数学B","世界史","生活デザイン","生物",
                                 "生物基礎","地学","地学基礎","地理","日本史","物理","物理基礎","倫理","歴史"
                                ];
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
                clone.querySelector('.icon-text').style.color = "white";
                clone.querySelector('.icon').style.backgroundColor = "rgba(0,0,0,0)";
                clone.querySelector('.icon-color').style.backgroundColor = setColor($('#subject').val(), content.length, i);
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
        $('#keyword').val($('.top-content').find('.searchForm').find('input').val());
        search();
    });
});


function search() {
    //検索機能の実装
    $grade = $('#grade').val();
    $subject = $('#subject').val();
    $content = $('#content').val();
    $keyword = $('#keyword').val();

    //除外ワード
    let excludedWords = ["amazon","楽天"];

    let url = 'http://www.google.co.jp/search?q=%20&hq=学習指導案%20';

    for(let word of excludedWords) {
        url += '-' + word + '%20';
    }

    //キーワード検索
    if($keyword) { url += $keyword + '%20' }
    if($grade) { url += $grade + '%20' }
    if($subject) { url += $subject + '%20' }
    if($content) { url += $content + '%20' }

    window.open(url);
}