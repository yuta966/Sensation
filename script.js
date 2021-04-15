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
                clone.querySelector('.icon-text').style.color = setColor($('#subject').val(),i);
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
        }

        if($contentModal) {
            $('.content-modal').addClass('close');
            $('.content-modal').removeClass('open');
            $('.subject-modal').addClass('open');
            $('.subject-modal').removeClass('close');

            //content iconを閉じる
            let clone = document.getElementById('icons');
            clone.innerHTML = '';
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

//ジャンルの配列データ
function contentData(grade, subject) {
    switch(grade) {
        case "小学1年生":
            switch(subject) {
                case "国語":
                    return [
                        "ひらがな・カタカナ",
                        "漢字",
                        "語句",
                        "文章題",
                        "物語",
                        "説明文",
                        "詩"
                    ];
                    break;
                case "算数":
                    return [
                        "10までの数",
                        "10以上の数",
                        "足し算",
                        "引き算",
                        "順序",
                        "時計・時刻",
                        "立体"
                    ];
                    break;
                case "生活":
                    return [
                        "学校と生活",
                        "家庭と生活",
                        "地域と生活",
                        "公共物や公共施設の利用",
                        "季節の変化と生活",
                        "自然や物を使った遊び",
                        "動植物の飼育・栽培",
                        "生活や出来事の伝え合い",
                        "自分の成長"
                    ];
                    break;
                case "音楽":
                    return [
                        "歌",
                        "楽器",
                        "音楽の知識",
                        "リズム遊び"
                    ];
                    break;
                case "図工":
                    return [
                        "造形遊びをする活動",
                        "絵や立体、工作に表す活動",
                        "鑑賞する活動"
                    ];
                    break;
                case "体育":
                    return [
                        "体づくりの運動・遊び",
                        "器械運動",
                        "走・跳の運動",
                        "水遊び",
                        "ゲーム",
                        "表現・リズム遊び"
                    ];
                    break;
                case "書道":
                    return [
                        "姿勢",
                        "筆の持ち方",
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "小学2年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "文章題",
                        "物語",
                        "説明文",
                        "詩"
                    ];
                    break;
                case "算数":
                    return [
                        "表・グラフ",
                        "足し算",
                        "引き算",
                        "ひっ算",
                        "1000までの数",
                        "長さの単位"
                    ];
                    break;
                case "生活":
                    return [
                        "学校と生活",
                        "家庭と生活",
                        "地域と生活",
                        "公共物や公共施設の利用",
                        "季節の変化と生活",
                        "自然や物を使った遊び",
                        "動植物の飼育・栽培","生活や出来事の伝え合い",
                        "自分の成長"
                    ];
                    break;
                case "音楽":
                    return [
                        "歌",
                        "楽器",
                        "音楽の知識",
                        "リズム遊び"
                    ];
                    break;
                case "図工":
                    return [
                        "造形遊びをする活動",
                        "絵や立体、工作に表す活動",
                        "鑑賞する活動"
                    ];
                    break;
                case "体育":
                    return [
                        "体づくりの運動・遊び",
                        "器械運動",
                        "走・跳の運動",
                        "水遊び",
                        "ゲーム",
                        "表現・リズム遊び"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "小学3年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "文章題",
                        "物語",
                        "説明文",
                        "詩"
                    ];
                    break;
                case "算数":
                    return [
                        "水のかさ",
                        "三角形・四角形",
                        "掛け算",
                        "時間の計算",
                        "割り算",
                        "「倍」の概念",
                        "足し算",
                        "引き算",
                        "表・グラフ",
                        "長さの単位、道のり問題",
                        "大きい数",
                        "円と球"];
                    break;
                case "理科":
                    return [
                        "生き物",
                        "植物",
                        "風",
                        "太陽",
                        "光",
                        "音",
                        "重さ"
                    ];
                    break;
                case "社会":
                    return [
                        "わたしたちのまち",
                        "街の仕事",
                        "むかしのくらし",
                        "安心・安全",
                        "みんなのくらし",
                        "地域の人々、ふるさと（※実施地域固有）",
                        "わたしたちの都道府県（※実施地域固有）"
                    ];
                    break;
                case "英語":
                    return [
                        "アルファベット",
                        "英単語",
                        "英語でのあいさつ",
                        "数字",
                        "英語での質問",
                        "英語での言語発表"
                    ];
                    break;
                case "音楽":
                    return [
                        "歌",
                        "楽器",
                        "音楽の知識",
                        "リズム遊び"
                    ];
                    break;
                case "図工":
                    return [
                        "造形遊びをする活動",
                        "絵や立体、工作に表す活動",
                        "鑑賞する活動"
                    ];
                    break;
                case "体育":
                    return [
                        "体つくり運動",
                        "器械運動",
                        "走・跳の運動",
                        "水泳運動",
                        "ゲーム",
                        "表現運動・ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "けんこうな生活",
                        "体の成長"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "小学4年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "文章題",
                        "物語",
                        "説明文",
                        "詩"
                    ];
                    break;
                case "算数":
                    return [
                        "大きい数",
                        "折れ線グラフ",
                        "二桁÷一桁の割り算",
                        "角",
                        "垂直・平行",
                        "二桁同士の割り算",
                        "倍数",
                        "四捨五入",
                        "少数",
                        "カッコのある式",
                        "整数の加減乗除",
                        "面積"];
                    break;
                case "理科":
                    return [
                        "季節",
                        "気温",
                        "体のつくり",
                        "電気",
                        "月の観察",
                        "ものの温度",
                        "水のすがた"
                    ];
                    break;
                case "社会":
                    return [
                        "わたしたちのまち",
                        "街の仕事",
                        "むかしのくらし",
                        "安心・安全",
                        "みんなのくらし",
                        "地域の人々、ふるさと（※実施地域固有）",
                        "わたしたちの都道府県（※実施地域固有）"
                    ];
                    break;
                case "英語":
                    return [
                        "アルファベット",
                        "英単語",
                        "英語でのあいさつ",
                        "数字",
                        "英語での質問",
                        "英語での言語発表"
                    ];
                    break;
                case "音楽":
                    return [
                        "歌",
                        "楽器",
                        "音楽の知識",
                        "リズム遊び"
                    ];
                    break;
                case "図工":
                    return [
                        "造形遊びをする活動",
                        "絵や立体、工作に表す活動",
                        "鑑賞する活動"
                    ];
                    break;
                case "体育":
                    return [
                        "体つくり運動",
                        "器械運動",
                        "走・跳の運動",
                        "水泳運動",
                        "ゲーム",
                        "表現運動・ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "けんこうな生活",
                        "体の成長"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "小学5年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "文章題",
                        "物語",
                        "説明文",
                        "古文",
                        "詩",
                        "言葉のきまり・品詞"
                    ];
                    break;
                case "算数":
                    return [
                        "少数と整数の関係",
                        "合同な図形",
                        "比例",
                        "平均",
                        "単位量当たりの数",
                        "少数の掛け算",
                        "少数の割り算",
                        "図形の内角の和",
                        "公倍数、公約数",
                        "分数の足し算、引き算",
                        "分数の掛け算",
                        "割合"
                    ];
                    break;
                case "理科":
                    return [
                        "天気",
                        "植物",
                        "振り子",
                        "自然災害",
                        "電流",
                        "生命の誕生",
                        "もののとけかた"
                    ];
                    break;
                case "社会":
                    return [
                        "地図からみる日本",
                        "食料とわたしたちのくらし",
                        "工業生産とわたしたちのくらし",
                        "情報、ネットワークとわたしたちのくらし",
                        "自然環境"
                    ];
                    break;
                case "英語":
                    return [
                        "アルファベット",
                        "英単語",
                        "英語でのあいさつ",
                        "数字",
                        "英語での質問",
                        "英語での言語発表"
                    ];
                    break;
                case "家庭":
                    return [
                        "私の生活",
                        "調理の力",
                        "針と糸",
                        "持続可能な暮らしへ 物やお金の使い方",
                        "食事",
                        "物を生かして住みやすく",
                        "家族の時間",
                        "ミシン"
                    ];
                    break;
                case "音楽":
                    return [
                        "歌",
                        "楽器",
                        "音楽の知識",
                        "リズム遊び"
                    ];
                    break;
                case "図工":
                    return [
                        "造形遊びをする活動",
                        "絵や立体、工作に表す活動",
                        "鑑賞する活動"
                    ];
                    break;
                case "体育":
                    return [
                        "体つくり運動",
                        "器械運動",
                        "陸上運動",
                        "水泳運動",
                        "ボール運動",
                        "表現運動・ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "心の健康",
                        "けがの防止",
                        "病気の予防"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "小学6年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "文章題",
                        "物語",
                        "説明文",
                        "古文",
                        "詩",
                        "言葉のきまり・品詞"
                    ];
                    break;
                case "算数":
                    return [
                        "文字と式",
                        "分数と整数の掛け算、割り算",
                        "分数×分数",
                        "分数÷分数",
                        "少数と分数の計算",
                        "点対称、線対称",
                        "円の面積",
                        "立体の体積",
                        "比",
                        "拡大図、縮図",
                        "比例、反比例"
                    ];
                    break;
                case "理科":
                    return [
                        "ものの燃え方",
                        "ヒトや動物の身体",
                        "植物の体",
                        "空気・水",
                        "てこの原理",
                        "土地・地層",
                        "地震・火事などの災害",
                        "月、太陽",
                        "水溶液の性質",
                        "電気の利用"
                    ];
                    break;
                case "社会":
                    return [
                        "国の成り立ち",
                        "くらしと政治",
                        "グローバル化と日本"
                    ];
                    break;
                case "英語":
                    return [
                        "アルファベット",
                        "英単語",
                        "英語でのあいさつ",
                        "数字",
                        "英語での質問",
                        "英語での言語発表"
                    ];
                    break;
                case "家庭":
                    return [
                        "私の生活",
                        "調理の力",
                        "針と糸",
                        "持続可能な暮らしへ 物やお金の使い方",
                        "食事",
                        "物を生かして住みやすく",
                        "家族の時間",
                        "ミシン"
                    ];
                    break;
                case "音楽":
                    return [
                        "歌",
                        "楽器",
                        "音楽の知識",
                        "リズム遊び"
                    ];
                    break;
                case "図工":
                return [
                    "造形遊びをする活動",
                    "絵や立体、工作に表す活動",
                    "鑑賞する活動"
                ];
                break;
                case "体育":
                    return [
                        "体つくり運動",
                        "器械運動",
                        "陸上運動",
                        "水泳運動",
                        "ボール運動",
                        "表現運動・ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "心の健康",
                        "けがの防止",
                        "病気の予防"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "中学1年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "品詞",
                        "文章題",
                        "小論文",
                        "文学作品",
                        "古文",
                        "漢文"
                    ];
                    break;
                case "数学":
                    return [
                        "整数",
                        "文字と式",
                        "一次方程式",
                        "量の変化と比例",
                        "平面図形",
                        "空間図形"
                    ];
                    break;
                case "理科":
                    return [
                        "植物",
                        "動物",
                        "みのまわりの性質",
                        "身の回りの現象",
                        "大地",
                        "器具"
                    ];
                    break;
                case "地理":
                    return [
                        "世界の様々な地域"
                    ];
                    break;
                case "歴史":
                    return [
                        "歴史の移り変わり",
                        "原始・古代の日本と世界",
                        "中世の日本と世界",
                        "近世の日本と世界"
                    ];
                    break;
                case "英語":
                    return [
                        "I am ～. You are ～.",
                        "This is ～. He is ～.",
                        "日時・曜日・天気をきく",
                        "一般動詞",
                        "冠詞、名詞の複数形",
                        "人を表すことば（代名詞）",
                        "三単現のs",
                        "命令文・感嘆文",
                        "疑問詞",
                        "現在進行形",
                        "can：～できる",
                        "前置詞",
                        "過去形（一般動詞）"
                    ];
                    break;
                case "技術":
                    return [
                        "生物育成、栽培",
                        "コンピュータのしくみ",
                        "インターネット、セキュリティ"
                    ];
                    break;
                case "家庭":
                    return [
                        "安全な住まい",
                        "衣服の取り扱い絵表示",
                        "洗濯",
                        "和食",
                        "食生活と栄養",
                        "バランスのとれた食生活",
                        "食品の選び方",
                        "環境に配慮した調理",
                        "健康で快適な室内空間",
                        "生活を豊かにするための工夫",
                        "幼児教育",
                        "限りある資源の有効利用"
                    ];
                    break;
                case "音楽":
                    return [
                        "音楽の基礎知識",
                        "作曲家・音楽家",
                        "合唱",
                        "楽器"
                    ];
                    break;
                case "美術":
                    return [
                        "色",
                        "技法",
                        "作家・流派"
                    ];
                    break;
                case "体育":
                    return [
                        "球技",
                        "水泳",
                        "体操",
                        "卓上",
                        "陸上",
                        "ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "新体力テスト・オリンピック",
                        "飲酒・喫煙・薬物乱用",
                        "感染症・エイズ",
                        "健康と環境",
                        "陸上"
                    ];
                    break;
                case "書道":
                    return [
                        "姿勢",
                        "筆の持ち方",
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "中学2年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "品詞",
                        "文章題",
                        "小論文",
                        "文学作品",
                        "古文",
                        "漢文"
                    ];
                    break;
                case "数学":
                    return [
                        "式と計算",
                        "一次不等式",
                        "連立方程式",
                        "一次関数",
                        "平行と合同",
                        "三角形と四角形",
                        "相似と比",
                        "資料統計"
                    ];
                    break;
                case "理科":
                    return [
                        "化学変化と分子・原子",
                        "植物",
                        "動物",
                        "電気",
                        "器具"
                    ];
                    break;
                case "地理":
                    return [
                        "日本の様々な地域"
                    ];
                    break;
                case "歴史":
                    return [
                        "近代の幕開け",
                        "近代の日本と世界"
                    ];
                    break;
                case "英語":
                    return [
                        "過去形（be動詞）、過去進行形",
                        "未来を表す文",
                        "接続詞",
                        "助動詞",
                        "There is/are ～.",
                        "～すること（動名詞と不定詞）",
                        "不定詞",
                        "比較",
                        "受動態（受け身）"
                    ];
                    break;
                case "技術":
                    return [
                        "生物育成、栽培",
                        "コンピュータのしくみ",
                        "インターネット、セキュリティ"
                    ];
                    break;
                case "家庭":
                    return [
                        "安全な住まい",
                        "衣服の取り扱い絵表示",
                        "洗濯",
                        "和食",
                        "食生活と栄養",
                        "バランスのとれた食生活",
                        "食品の選び方",
                        "環境に配慮した調理",
                        "健康で快適な室内空間",
                        "生活を豊かにするための工夫",
                        "幼児教育",
                        "限りある資源の有効利用"
                    ];
                    break;
                case "音楽":
                    return [
                        "音楽の知識",
                        "作曲家・音楽家",
                        "合唱",
                        "楽器"
                    ];
                    break;
                case "美術":
                    return [
                        "色",
                        "技法",
                        "作家・流派"
                    ];
                    break;
                case "体育":
                    return [
                        "球技",
                        "水泳",
                        "体操",
                        "卓上",
                        "陸上",
                        "ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "新体力テスト・オリンピック",
                        "飲酒・喫煙・薬物乱用",
                        "感染症・エイズ",
                        "健康と環境",
                        "陸上"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "中学3年生":
            switch(subject) {
                case "国語":
                    return [
                        "漢字",
                        "語句",
                        "品詞",
                        "文章題",
                        "小論文",
                        "文学作品",
                        "古文",
                        "漢文"
                    ];
                    break;
                case "数学":
                    return [
                        "項式",
                        "平方根",
                        "数理数と無理数",
                        "二次方程式",
                        "関数",
                        "円",
                        "三平方の定理",
                        "相似",
                        "確率"
                    ];
                    break;
                case "理科":
                    return [
                        "化学変化とイオン",
                        "生命",
                        "運動とエネルギー",
                        "地球と宇宙",
                        "科学技術",
                        "自然",
                        "器具"];
                    break;
                case "歴史":
                    return [
                        "二度の世界大戦と日本",
                        "現代の日本と世界"
                    ];
                    break;
                case "公民":
                    return [
                        "わたしたちのくらしと現代社会",
                        "人間を尊重する日本国憲法",
                        "わたしたちのくらしと民主政治",
                        "わたしたちのくらしと経済",
                        "安心して暮らせる社会",
                        "国際社会に生きる私たち",
                        "わたしたちにできること"
                    ];
                    break;
                case "英語":
                    return [
                        "現在完了",
                        "文型",
                        "いろいろな疑問文",
                        "不定詞の構文",
                        "分詞",
                        "関係代名詞",
                        "仮定法"
                    ];
                    break;
                case "技術":
                    return [
                        "生物育成、栽培",
                        "コンピュータのしくみ",
                        "インターネット、セキュリティ"
                    ];
                    break;
                case "家庭":
                    return [
                        "安全な住まい",
                        "衣服の取り扱い絵表示",
                        "洗濯",
                        "和食",
                        "食生活と栄養",
                        "バランスのとれた食生活",
                        "食品の選び方",
                        "環境に配慮した調理",
                        "健康で快適な室内空間",
                        "生活を豊かにするための工夫",
                        "幼児教育",
                        "限りある資源の有効利用"
                    ];
                    break;
                case "音楽":
                    return [
                        "音楽の知識",
                        "作曲家・音楽家",
                        "合唱",
                        "楽器"
                    ];
                    break;
                case "美術":
                    return [
                        "色",
                        "技法",
                        "作家・流派"
                    ];
                    break;
                case "体育":
                    return [
                        "球技",
                        "水泳",
                        "体操",
                        "卓上",
                        "陸上",
                        "ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "新体力テスト・オリンピック",
                        "飲酒・喫煙・薬物乱用",
                        "感染症・エイズ",
                        "健康と環境",
                        "陸上"
                    ];
                    break;
                case "書道":
                    return [
                        "筆使い",
                        "筆順",
                        "点画の組み立て",
                        "部分の組み立て",
                        "硬筆"
                    ];
                    break;
            }
            break;
        case "高校生":
            switch(subject) {
                case "国語":
                    return [
                        //古文
                        "歴史的かな遣い",
                        "古語",
                        "現代語訳",
                        "品詞",
                        "動詞",
                        "形容詞・形容動詞",
                        "格助詞",
                        "助動詞",
                        "敬語",
                        "読解",
                        //漢文
                        "訓読・書き下し",
                        "再読文字",
                        "否定形",
                        "句法",
                        "疑問形・反語形",
                        "過去形・敬語",
                        "読解",
                        //現代文
                        "小説の読み方",
                        "漢字の勉強方法",
                        "現代文の読み方",
                        "記述問題の解答方法",
                        "評論の読み方",
                        "選択式問題での取捨選択方法"
                    ];
                    break;
                case "数学":
                    return [
                        //数I
                        "数と式",
                        "２次関数",
                        "図形と計量",
                        "形について",
                        "データの分析",
                        //数A
                        "場合の数と確率",
                        "整数の性質",
                        "図形の性質",
                        //数II
                        "式と証明",
                        "複素数と方程式",
                        "図形と方程式",
                        "三角関数",
                        "指数・対数関数",
                        "微分法",
                        "積分法",
                        //数B
                        "平面ベクトル",
                        "空間ベクトル",
                        "数列",
                        "確率分布",
                        //数III
                        "平面上の曲線",
                        "複素数平面",
                        "関数と極限",
                        "微分法(III)",
                        "積分法(III)"
                    ];
                    break;
                case "理科":
                    return [
                        //物理基礎
                        "速度・加速度",
                        "落体の運動",
                        "力の表し方・運動の法則",
                        "様々な力と運動",
                        "仕事と力学的エネルギー",
                        "力学的エネルギー保存の法則",
                        "熱とエネルギー",
                        "波の性質",
                        "音波",
                        "電気・エネルギーとその利用",
                        //物理
                        "平面内の運動と剛体にはたらく力",
                        "運動量",
                        "円運動・慣性力",
                        "単振動・万有引力",
                        "熱と物質の状態",
                        "波の性質・音波",
                        "光波",
                        "電場と電位",
                        "コンデンサー",
                        "電流",
                        "電流と磁場",
                        "電磁誘導・交流と電磁波",
                        "原子",
                        //化学基礎
                        "物質の探究",
                        "物質の構成粒子",
                        "化学結合",
                        "結晶と物質の性質",
                        "物質量",
                        "化学反応式と量的関係",
                        "酸と塩基",
                        "中和反応と塩",
                        "酸化還元反応",
                        "電池と電気分解",
                        //化学
                        "固体の構造と状態変化",
                        "気体の性質",
                        "溶液の性質",
                        "反応熱",
                        "電池と電気分解",
                        "反応速度",
                        "化学平衡",
                        "電離平衡",
                        "非金属元素と化合物の性質",
                        "典型金属元素と化合物の性質",
                        "遷移元素と化合物の性質",
                        "脂肪族化合物の性質",
                        "芳香族化合物の性質",
                        "合成高分子化合物",
                        "天然高分子化合物",
                        //生物基礎
                        "生物の多様性と共通性",
                        "細胞とエネルギー",
                        "DNAと遺伝情報",
                        "タンパク質合成と遺伝子発現",
                        "神経系とホルモン",
                        "免疫",
                        "植生と遷移・生物と光",
                        "気候とバイオーム",
                        "生態系",
                        //生物
                        "生体物質と細胞",
                        "生命現象とタンパク質",
                        "代謝",
                        "遺伝子の発現",
                        "発現調節とバイオテクノロジー",
                        "生殖と減数分裂",
                        "動物の発生",
                        "発生のしくみ・植物の発生",
                        "動物の反応と行動",
                        "植物の環境応答・生物と光",
                        "生物群集と生態系",
                        "生物の変遷・進化",
                        "生物の系統",
                        //地学基礎
                        "地球の概観と構造",
                        "活動する地球",
                        "地球を構成する岩石",
                        "地層",
                        "地球と生命の進化",
                        "大気の構造",
                        "大気・海水の運動",
                        "天気/災害・環境",
                        "太陽と恒星",
                        "太陽の進化と宇宙の姿",
                        //科学と人間生活
                        "動物の反応と行動・生物と光",
                        "植物の環境応答・生物と光",
                        "植生と遷移・生物と光"
                    ];
                    break;
                case "社会":
                    return [
                        //高校社会科目
                        //【地理・歴史】
                        //世界史
                        "先史・古代オリエント・古代地中海世界",
                        "ローマ世界とキリスト教",
                        "古代のアジア",
                        "東アジア世界の形成（魏晋南北朝～五代十国）",
                        "イスラーム世界の形成と発展",
                        "ヨーロッパ世界の形成",
                        "十字軍と教皇権の盛衰",
                        "東アジア世界の発展（宋～元）",
                        "東アジア世界の繁栄",
                        "アジア諸地域の繁栄",
                        "ヨーロッパ世界の拡大",
                        "ヨーロッパ諸国の主権国家体制の形成と海外進出",
                        "市民革命とウィーン体制",
                        "19世紀の近代国民国家の発展",
                        "アジアの植民地化",
                        "帝国主義とアジアの民族運動",
                        "第一次世界大戦とヴェルサイユ体制",
                        "第一次世界大戦前後のアジア",
                        "世界恐慌と第二次世界大戦",
                        "東西冷戦と冷戦後の世界",
                        "ヨーロッパ世界の形成",
                        "イスラーム世界の形成",
                        "ヨーロッパ諸国の主権国家体制と市民革命",
                        "第一次世界大戦とヴェルサイユ体制",
                        "アメリカの繁栄と世界恐慌",
                        "中国国民革命の進展と日中戦争",
                        //日本史
                        "旧石器時代～古墳時代",
                        "飛鳥時代",
                        "奈良時代",
                        "平安時代",
                        "院政～鎌倉時代",
                        "室町時代",
                        "織豊政権",
                        "江戸幕府の成立",
                        "幕藩体制の展開",
                        "幕藩体制の動揺",
                        "開国～明治政府の成立",
                        "立憲国家の成立",
                        "条約改正と日清戦争",
                        "日露戦争と資本主義の発達",
                        "第一次世界大戦と日本",
                        "恐慌の時代",
                        "軍部の台頭と太平洋戦争",
                        "占領下の日本",
                        "独立後の日本",
                        "現代の日本",
                        "古墳時代",
                        "院政期",
                        "鎌倉時代",
                        "江戸時代",
                        "幕末",
                        "明治時代",
                        "昭和時代",
                        //地理
                        "地球，地理情報と地図",
                        "気候",
                        "日本と世界の環境",
                        "産業",
                        "エネルギー・食料問題",
                        "交通・通信，貿易",
                        "人口，村落・都市とその問題",
                        "生活文化，国家の結びつき，民族・領土問題",
                        "東アジア，東南アジア",
                        "南・西・中央アジア，アフリカ",
                        "ヨーロッパ，ロシア連邦と周辺諸国",
                        "南北アメリカ，オセアニア",
                        "気候",
                        "地形図と地域調査，地形",
                        "産業",
                        "交通・通信，貿易",
                        //【公民】
                        //現代社会
                        "私たちの生きる社会／青年期と自己形成",
                        "現代の経済社会①",
                        "現代の経済社会②",
                        "日本経済の歩みと課題",
                        "日本の労働問題と社会保障",
                        "日本国憲法の基本的性格",
                        "国会・内閣・裁判所",
                        "地方自治・政党と選挙",
                        "国際政治の動向",
                        "国際経済の動向と国際協力",
                        "現代国家と民主政治",
                        "裁判所",
                        "資本主義経済と社会主義経済",
                        "財政",
                        "日本経済の発展と産業構造の変化",
                        "地域的経済統合／経済のグローバル化",
                        //倫理
                        "青年期/ギリシャ思想",
                        "キリスト教/イスラーム",
                        "仏教/中国の思想",
                        "日本の風土と伝統思想/日本の仏教",
                        "江戸時代～近現代の日本思想",
                        "人間の尊厳/自然・科学技術と人間",
                        "社会契約説/ドイツ観念論",
                        "功利主義/プラグマティズム/社会主義",
                        "現代の思想",
                        "現代の諸課題と倫理",
                        "中国の思想ＩＩ",
                        "鎌倉時代の仏教",
                        "ドイツ観念論",
                        //現代社会
                        "私たちの生きる社会／青年期と自己形成",
                        "現代の経済社会①",
                        "現代の経済社会②",
                        "日本経済の歩みと課題",
                        "日本の労働問題と社会保障",
                        "日本国憲法の基本的性格",
                        "国会・内閣・裁判所",
                        "地方自治・政党と選挙",
                        "国際政治の動向",
                        "国際経済の動向と国際協力",
                        "現代国家と民主政治",
                        "裁判所",
                        "資本主義経済と社会主義経済",
                        "財政",
                        "日本経済の発展と産業構造の変化",
                        "地域的経済統合／経済のグローバル化"
                    ];
                    break;
                case "英語":
                    return [
                        "文の種類",
                        "文型",
                        "時制",
                        "助動詞",
                        "受動態",
                        "不定詞",
                        "分詞",
                        "動名詞",
                        "関係詞",
                        "比較",
                        "仮定法",
                        "時制の一致",
                        "前置詞",
                        "接続詞",
                        "特殊な構文",
                        "同格のthat",
                        "名詞と冠詞"
                    ];
                    break;
                case "技術":
                    return [
                        //社会と情報
                        "私たちを取り巻く情報",
                        "アナログからデジタルへ",
                        "情報の表現と伝達",
                        "インターネットの利用",
                        //情報の科学
                        "情報とコンピュータ",
                        "ネットワークの仕組みとシステム",
                        "問題解決のためのコンピュータ活用",
                        "ネットワークとデータベースの活用",
                        "情報技術と社会"
                    ];
                    break;
                case "家庭":
                    return [
                        //家庭基礎
                        "人の一生と家族・福祉",
                        "食生活の管理と健康",
                        "衣生活の管理と健康",
                        "住生活の管理と健康",
                        "消費生活と環境",
                        //家庭総合
                        "自分・家族",
                        "子ども",
                        "多様性",
                        "高齢者",
                        "共生",
                        "経済生活・環境",
                        "災害時の生活",
                        "食生活",
                        "衣生活",
                        //生活デザイン
                        "衣生活デザイン",
                        "住生活デザイン",
                        "コミュニケーション",
                        "デジタルコンテンツ",
                        "地域社会",
                        "園芸",
                        "ビジネス"
                    ];
                    break;
                case "音楽":
                    return [
                        "音楽の知識",
                        "合唱",
                        "楽器"
                    ];
                    break;
                case "美術":
                    return [
                        "器具",
                        "表現活動",
                        "工芸",
                        "ものづくり"
                    ];
                    break;
                case "体育":
                    return [
                        "球技",
                        "水泳",
                        "体操",
                        "卓上",
                        "陸上",
                        "ダンス"
                    ];
                    break;
                case "保健":
                    return [
                        "現代社会と健康",
                        "体育理論",
                        "生涯を通じる健康",
                        "社会生活と健康"
                    ];
                    break;
                case "書道":
                    return [
                        "漢字の書",
                        "仮名の書",
                        "漢字仮名交じりの書",
                        "篆刻と刻字"
                    ];
                    break;
        }
        break;
    }
}

function setColor(subject, i) {
    return "rgb(0, 0," + i * 20 + ")";
}

function subjectData(grade) {
    switch(grade) {
        case "小学1年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#算数').removeClass('close');
            $('.subject-modal').find('#生活').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#図工').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "小学2年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#算数').removeClass('close');
            $('.subject-modal').find('#生活').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#図工').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "小学3年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#算数').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#社会').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#図工').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "小学4年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#算数').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#社会').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#図工').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "小学5年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#算数').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#社会').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#家庭').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#図工').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "小学6年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#算数').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#社会').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#家庭').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#図工').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "中学1年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#数学').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#地理').removeClass('close');
            $('.subject-modal').find('#歴史').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#技術').removeClass('close');
            $('.subject-modal').find('#家庭').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#美術').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "中学2年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#数学').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#地理').removeClass('close');
            $('.subject-modal').find('#歴史').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#技術').removeClass('close');
            $('.subject-modal').find('#家庭').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#美術').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "中学3年生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#数学').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#地理').removeClass('close');
            $('.subject-modal').find('#歴史').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#技術').removeClass('close');
            $('.subject-modal').find('#家庭').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#美術').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
        case "高校生":
            $('.subject-modal').find('#国語').removeClass('close');
            $('.subject-modal').find('#数学').removeClass('close');
            $('.subject-modal').find('#理科').removeClass('close');
            $('.subject-modal').find('#社会').removeClass('close');
            $('.subject-modal').find('#英語').removeClass('close');
            $('.subject-modal').find('#技術').removeClass('close');
            $('.subject-modal').find('#家庭').removeClass('close');
            $('.subject-modal').find('#音楽').removeClass('close');
            $('.subject-modal').find('#美術').removeClass('close');
            $('.subject-modal').find('#体育').removeClass('close');
            $('.subject-modal').find('#保健').removeClass('close');
            $('.subject-modal').find('#書道').removeClass('close');
            break;
    }
}
