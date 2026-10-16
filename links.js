// 動画と資料のリンク（2026-10-16 にリンクが開けることを確認）
const LINKS = [
  {g: "子どもと見る動画", items: [
    {t: "小学校中学年体育 13 ネット型ゲーム", by: "文部科学省（YouTube 公式）", u: "https://www.youtube.com/watch?v=nt4CnsrHe4I", len: "約8分", who: "kid",
     use: "導入とゲーム前。学習の進め方と動きのポイントの映像です。2013年公開で、いまの学習指導要領の前の時期のものなので、動きのイメージとして使います。"},
    {t: "はりきり体育ノ介「ソフトバレーボールに挑戦だ！」", by: "NHK for School", u: "https://edu.web.nhk/school/watch/bangumi/?das_id=D0005220027_00000", len: "長さは未確認", who: "kid",
     use: "導入。ソフトバレーなので高学年寄りです。見せる前に先生が視聴して、使う場面を決めてください。"},
    {t: "小学校高学年体育 14 ソフトバレーボール", by: "文部科学省（YouTube 公式）", u: "https://www.youtube.com/watch?v=MKXr0GHHyMg", len: "約6分", who: "t",
     use: "5年生からのソフトバレーにつながる姿の確認。4年生には「この先こうなる」の見通しとして。"},
  ]},
  {g: "ルールと作戦の考え方（動画）", items: [
    {t: "ミニテニスの行い方の例", by: "スポーツ庁（YouTube 公式）", u: "https://youtu.be/iF3y1KHS0Q4", len: "約4分", who: "t",
     use: "スポーツ庁の手引は、中学年ネット型を「テニスを基にした易しいゲーム」で作っています。ゲームの進め方の参考に。"},
    {t: "ミニテニスの規則の工夫の例", by: "スポーツ庁（YouTube 公式）", u: "https://youtu.be/L0Z8Lz2QDlw", len: "約2分", who: "t",
     use: "第5時「ルールを変えてみよう」の前に。規則をどう選ばせるかの例です。"},
    {t: "ミニテニスの簡単な作戦の例（ペアの並び方の作戦）", by: "スポーツ庁（YouTube 公式）", u: "https://youtu.be/eWsjpuamvpw", len: "約3分", who: "t",
     use: "第4時の作戦タイムの前に。前後に並ぶか横に並ぶか、という作戦の立て方はキャッチバレーにも使えます。"},
  ]},
  {g: "先生の教材研究（資料）", items: [
    {t: "小学校学習指導要領（平成29年告示）解説 体育編", by: "文部科学省（PDF）", u: "https://www.mext.go.jp/content/20240918-mxt_kyoiku01-100002607.pdf", len: "中学年ネット型は解説97〜98ページ", who: "t",
     use: "例示（ソフトバレー、プレルボール、バドミントンやテニス、天大中小）と、キャッチを認める配慮の例。"},
    {t: "指導の手引 ネット型ゲーム「テニスを基にした易しいゲーム」", by: "スポーツ庁（PDF）", u: "https://www.mext.go.jp/sports/content/20230615-spt_sseisaku02-000022053_23.pdf", len: "8時間の単元", who: "t",
     use: "評価規準、指導と評価の計画、苦手な子への配慮。評価の観点を決めるときに。"},
    {t: "1人1台のICT端末を活用した体育・保健体育授業の事例集", by: "スポーツ庁（PDF・第3章）", u: "https://www.mext.go.jp/sports/content/20220309-spt_sseisaku02-000020993_3.pdf", len: "事例1が4年ネット型", who: "t",
     use: "福岡県行橋市立仲津小学校の4年ネット型（ソフトバレーボール）。映像で課題を見える化、思考ツール、デジタルの学習記録。"},
    {t: "新しい体育の展開 ネット型ゲーム「キャッチバレーボール」", by: "千葉県教育委員会（PDF）", u: "https://www.pref.chiba.lg.jp/kyouiku/taiiku/gakutai/jugyou/tenkai/documents/17game5.pdf", len: "単元例", who: "t",
     use: "キャッチバレーボールの単元の目標と評価規準。同じ中学年の単元例です。"},
    {t: "学校体育実技指導資料 第8集 第3章", by: "文部科学省（PDF）", u: "https://www.mext.go.jp/a_menu/sports/jyujitsu/__icsFiles/afieldfile/2010/07/05/1294600_4_2.pdf", len: "2010年の資料", who: "t",
     use: "中学年ネット型の授業づくりの視点（ラリーを続ける、つなぐ）。いまの学習指導要領の前の資料なので、考え方の確認に。"},
    {t: "授業モデル 中学年 ネット型ゲーム「ミニテニス」", by: "日本テニス協会（PDF）", u: "https://www.jta-tennis.or.jp/Portals/0/resources/fukyu/teniping/school/40.pdf", len: "8ページ", who: "t",
     use: "キャッチバレー以外の選択肢。ボールの大きさで技能をやさしくする工夫。"},
  ]},
];
(function () {
  const el = document.getElementById("linklist");
  if (!el) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  el.innerHTML = LINKS.map(g => `<h3>${esc(g.g)}</h3>` + g.items.map(i =>
    `<div class="lk"><span class="pill ${i.who === "kid" ? "kid" : "t"}">${i.who === "kid" ? "子どもと見る" : "先生向け"}</span>` +
    `<a href="${esc(i.u)}" target="_blank" rel="noopener">${esc(i.t)}</a>` +
    `<p class="meta">${esc(i.by)}　${esc(i.len)}</p><p class="use">${esc(i.use)}</p></div>`).join("")).join("");
})();
