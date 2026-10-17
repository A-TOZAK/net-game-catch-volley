/**
 * キャッチバレー とくてん板（GASウェブアプリ）
 * 記録係がタブレットで点数とラリーを数え、試合の終わりに1回だけ、このスプレッドシートへ送る。
 * シート「記録」に1試合1行でたまる。シート「チーム」でチーム名を変えられる。
 * 子どもの名前は扱わない（チーム名・点数・ラリーだけ）。
 * © School Stock
 */

const SHEET_LOG = '記録';
const SHEET_TEAM = 'チーム';
const HEAD = ['送った日時', '日にち', '時間目', 'コート', 'チーム1', '点数1', 'チーム2', '点数2', 'いちばん長いラリー', '送信ID'];
const DEFAULT_TEAMS = ['Aチーム', 'Bチーム', 'Cチーム', 'Dチーム', 'Eチーム', 'Fチーム', 'Gチーム', 'Hチーム'];

function doGet() {
  setup_();
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle('キャッチバレー とくてん板')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** シートがなければ作る（最初の1回だけ） */
function setup_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let log = ss.getSheetByName(SHEET_LOG);
  if (!log) {
    log = ss.insertSheet(SHEET_LOG);
    log.getRange(1, 1, 1, HEAD.length).setValues([HEAD]).setFontWeight('bold').setBackground('#1d1d1f').setFontColor('#ffffff');
    log.setFrozenRows(1);
    log.getRange('B:B').setNumberFormat('yyyy/mm/dd');
  }
  let team = ss.getSheetByName(SHEET_TEAM);
  if (!team) {
    team = ss.insertSheet(SHEET_TEAM);
    team.getRange(1, 1, 1, 2).setValues([['チーム名', 'メモ']]).setFontWeight('bold');
    team.getRange(2, 1, DEFAULT_TEAMS.length, 1).setValues(DEFAULT_TEAMS.map(t => [t]));
    team.getRange(1, 2).setNote('チーム名は自由に書きかえてください（赤チーム、ひまわり など）。行を足せばチームがふえます。');
  }
}

/** 画面に渡す：チームの一覧 */
function getTeams() {
  setup_();
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_TEAM);
  const n = sh.getLastRow() - 1;
  if (n < 1) return DEFAULT_TEAMS;
  return sh.getRange(2, 1, n, 1).getValues().map(r => String(r[0]).trim()).filter(Boolean);
}

/** 試合を1行足す。同じ送信IDが2回来ても1行だけにする（送り直し対策） */
function saveGame(g) {
  if (!g || !g.id || !g.team1 || !g.team2) throw new Error('記録の中身が足りません');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    setup_();
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_LOG);
    const last = sh.getLastRow();
    if (last > 1) {
      const ids = sh.getRange(2, 10, last - 1, 1).getValues().map(r => r[0]);
      if (ids.indexOf(g.id) >= 0) return { ok: true, dup: true };
    }
    const d = g.date ? new Date(g.date + 'T00:00:00') : new Date();
    sh.appendRow([new Date(), d, Number(g.period) || '', g.court || '', g.team1, Number(g.score1) || 0,
                  g.team2, Number(g.score2) || 0, Number(g.best) || 0, g.id]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}

/** 記録をぜんぶ返す（画面でチームごとに集計する） */
function getGames() {
  setup_();
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_LOG);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const tz = Session.getScriptTimeZone();
  return sh.getRange(2, 1, last - 1, 9).getValues().map(r => ({
    date: r[1] instanceof Date ? Utilities.formatDate(r[1], tz, 'M/d') : String(r[1]),
    period: r[2], court: r[3], team1: r[4], score1: r[5], team2: r[6], score2: r[7], best: r[8]
  }));
}

function include_(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}
