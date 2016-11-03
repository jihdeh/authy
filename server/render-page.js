export default function renderPage(title, appMarkup, appSrc) {
	if (!appSrc) throw new Error("missing appSrc");
	
  return `<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
			  <meta http-equiv="X-UA-Compatible" content="IE=edge">
			  <meta name="viewport" content="width=device-width, initial-scale=1">
			  <meta name="description" content="">
			  <meta name="author" content="">
			  <title>${title || "JadoPado"}</title>
			  <!-- Custom Fonts -->
			      <link href="https://www.authy.com/form.authy.min.css" 
        media="screen" rel="stylesheet" type="text/css">
    <script src="https://www.authy.com/form.authy.min.js" 
        type="text/javascript"></script>
			  <style>

					.hint {
					  margin: 15px 0;
					  font-style: italic;
					  color: #999;
					}
					.react-tel-input {
					  position: relative;
					  width: 200px;
					}
					.react-tel-input .ad {
					  background-position: -16px 0;
					}
					.react-tel-input .ae {
					  background-position: -32px 0;
					}
					.react-tel-input .af {
					  background-position: -48px 0;
					}
					.react-tel-input .ag {
					  background-position: -64px 0;
					}
					.react-tel-input .ai {
					  background-position: -80px 0;
					}
					.react-tel-input .al {
					  background-position: -96px 0;
					}
					.react-tel-input .am {
					  background-position: -112px 0;
					}
					.react-tel-input .ao {
					  background-position: -128px 0;
					}
					.react-tel-input .ar {
					  background-position: -144px 0;
					}
					.react-tel-input .as {
					  background-position: -160px 0;
					}
					.react-tel-input .at {
					  background-position: -176px 0;
					}
					.react-tel-input .au {
					  background-position: -192px 0;
					}
					.react-tel-input .aw {
					  background-position: -208px 0;
					}
					.react-tel-input .az {
					  background-position: -224px 0;
					}
					.react-tel-input .ba {
					  background-position: -240px 0;
					}
					.react-tel-input .bb {
					  background-position: 0 -11px;
					}
					.react-tel-input .bd {
					  background-position: -16px -11px;
					}
					.react-tel-input .be {
					  background-position: -32px -11px;
					}
					.react-tel-input .bf {
					  background-position: -48px -11px;
					}
					.react-tel-input .bg {
					  background-position: -64px -11px;
					}
					.react-tel-input .bh {
					  background-position: -80px -11px;
					}
					.react-tel-input .bi {
					  background-position: -96px -11px;
					}
					.react-tel-input .bj {
					  background-position: -112px -11px;
					}
					.react-tel-input .bm {
					  background-position: -128px -11px;
					}
					.react-tel-input .bn {
					  background-position: -144px -11px;
					}
					.react-tel-input .bo {
					  background-position: -160px -11px;
					}
					.react-tel-input .br {
					  background-position: -176px -11px;
					}
					.react-tel-input .bs {
					  background-position: -192px -11px;
					}
					.react-tel-input .bt {
					  background-position: -208px -11px;
					}
					.react-tel-input .bw {
					  background-position: -224px -11px;
					}
					.react-tel-input .by {
					  background-position: -240px -11px;
					}
					.react-tel-input .bz {
					  background-position: 0 -22px;
					}
					.react-tel-input .ca {
					  background-position: -16px -22px;
					}
					.react-tel-input .cd {
					  background-position: -32px -22px;
					}
					.react-tel-input .cf {
					  background-position: -48px -22px;
					}
					.react-tel-input .cg {
					  background-position: -64px -22px;
					}
					.react-tel-input .ch {
					  background-position: -80px -22px;
					}
					.react-tel-input .ci {
					  background-position: -96px -22px;
					}
					.react-tel-input .ck {
					  background-position: -112px -22px;
					}
					.react-tel-input .cl {
					  background-position: -128px -22px;
					}
					.react-tel-input .cm {
					  background-position: -144px -22px;
					}
					.react-tel-input .cn {
					  background-position: -160px -22px;
					}
					.react-tel-input .co {
					  background-position: -176px -22px;
					}
					.react-tel-input .cr {
					  background-position: -192px -22px;
					}
					.react-tel-input .cu {
					  background-position: -208px -22px;
					}
					.react-tel-input .cv {
					  background-position: -224px -22px;
					}
					.react-tel-input .cw {
					  background-position: -240px -22px;
					}
					.react-tel-input .cy {
					  background-position: 0 -33px;
					}
					.react-tel-input .cz {
					  background-position: -16px -33px;
					}
					.react-tel-input .de {
					  background-position: -32px -33px;
					}
					.react-tel-input .dj {
					  background-position: -48px -33px;
					}
					.react-tel-input .dk {
					  background-position: -64px -33px;
					}
					.react-tel-input .dm {
					  background-position: -80px -33px;
					}
					.react-tel-input .do {
					  background-position: -96px -33px;
					}
					.react-tel-input .dz {
					  background-position: -112px -33px;
					}
					.react-tel-input .ec {
					  background-position: -128px -33px;
					}
					.react-tel-input .ee {
					  background-position: -144px -33px;
					}
					.react-tel-input .eg {
					  background-position: -160px -33px;
					}
					.react-tel-input .er {
					  background-position: -176px -33px;
					}
					.react-tel-input .es {
					  background-position: -192px -33px;
					}
					.react-tel-input .et {
					  background-position: -208px -33px;
					}
					.react-tel-input .fi {
					  background-position: -224px -33px;
					}
					.react-tel-input .fj {
					  background-position: -240px -33px;
					}
					.react-tel-input .fk {
					  background-position: 0 -44px;
					}
					.react-tel-input .fm {
					  background-position: -16px -44px;
					}
					.react-tel-input .fo {
					  background-position: -32px -44px;
					}
					.react-tel-input .fr,
					.react-tel-input .bl,
					.react-tel-input .mf {
					  background-position: -48px -44px;
					}
					.react-tel-input .ga {
					  background-position: -64px -44px;
					}
					.react-tel-input .gb {
					  background-position: -80px -44px;
					}
					.react-tel-input .gd {
					  background-position: -96px -44px;
					}
					.react-tel-input .ge {
					  background-position: -112px -44px;
					}
					.react-tel-input .gf {
					  background-position: -128px -44px;
					}
					.react-tel-input .gh {
					  background-position: -144px -44px;
					}
					.react-tel-input .gi {
					  background-position: -160px -44px;
					}
					.react-tel-input .gl {
					  background-position: -176px -44px;
					}
					.react-tel-input .gm {
					  background-position: -192px -44px;
					}
					.react-tel-input .gn {
					  background-position: -208px -44px;
					}
					.react-tel-input .gp {
					  background-position: -224px -44px;
					}
					.react-tel-input .gq {
					  background-position: -240px -44px;
					}
					.react-tel-input .gr {
					  background-position: 0 -55px;
					}
					.react-tel-input .gt {
					  background-position: -16px -55px;
					}
					.react-tel-input .gu {
					  background-position: -32px -55px;
					}
					.react-tel-input .gw {
					  background-position: -48px -55px;
					}
					.react-tel-input .gy {
					  background-position: -64px -55px;
					}
					.react-tel-input .hk {
					  background-position: -80px -55px;
					}
					.react-tel-input .hn {
					  background-position: -96px -55px;
					}
					.react-tel-input .hr {
					  background-position: -112px -55px;
					}
					.react-tel-input .ht {
					  background-position: -128px -55px;
					}
					.react-tel-input .hu {
					  background-position: -144px -55px;
					}
					.react-tel-input .id {
					  background-position: -160px -55px;
					}
					.react-tel-input .ie {
					  background-position: -176px -55px;
					}
					.react-tel-input .il {
					  background-position: -192px -55px;
					}
					.react-tel-input .in {
					  background-position: -208px -55px;
					}
					.react-tel-input .io {
					  background-position: -224px -55px;
					}
					.react-tel-input .iq {
					  background-position: -240px -55px;
					}
					.react-tel-input .ir {
					  background-position: 0 -66px;
					}
					.react-tel-input .is {
					  background-position: -16px -66px;
					}
					.react-tel-input .it {
					  background-position: -32px -66px;
					}
					.react-tel-input .jm {
					  background-position: -48px -66px;
					}
					.react-tel-input .jo {
					  background-position: -64px -66px;
					}
					.react-tel-input .jp {
					  background-position: -80px -66px;
					}
					.react-tel-input .ke {
					  background-position: -96px -66px;
					}
					.react-tel-input .kg {
					  background-position: -112px -66px;
					}
					.react-tel-input .kh {
					  background-position: -128px -66px;
					}
					.react-tel-input .ki {
					  background-position: -144px -66px;
					}
					.react-tel-input .km {
					  background-position: -160px -66px;
					}
					.react-tel-input .kn {
					  background-position: -176px -66px;
					}
					.react-tel-input .kp {
					  background-position: -192px -66px;
					}
					.react-tel-input .kr {
					  background-position: -208px -66px;
					}
					.react-tel-input .kw {
					  background-position: -224px -66px;
					}
					.react-tel-input .ky {
					  background-position: -240px -66px;
					}
					.react-tel-input .kz {
					  background-position: 0 -77px;
					}
					.react-tel-input .la {
					  background-position: -16px -77px;
					}
					.react-tel-input .lb {
					  background-position: -32px -77px;
					}
					.react-tel-input .lc {
					  background-position: -48px -77px;
					}
					.react-tel-input .li {
					  background-position: -64px -77px;
					}
					.react-tel-input .lk {
					  background-position: -80px -77px;
					}
					.react-tel-input .lr {
					  background-position: -96px -77px;
					}
					.react-tel-input .ls {
					  background-position: -112px -77px;
					}
					.react-tel-input .lt {
					  background-position: -128px -77px;
					}
					.react-tel-input .lu {
					  background-position: -144px -77px;
					}
					.react-tel-input .lv {
					  background-position: -160px -77px;
					}
					.react-tel-input .ly {
					  background-position: -176px -77px;
					}
					.react-tel-input .ma {
					  background-position: -192px -77px;
					}
					.react-tel-input .mc {
					  background-position: -208px -77px;
					}
					.react-tel-input .md {
					  background-position: -224px -77px;
					}
					.react-tel-input .me {
					  background-position: -112px -154px;
					  height: 12px;
					}
					.react-tel-input .mg {
					  background-position: 0 -88px;
					}
					.react-tel-input .mh {
					  background-position: -16px -88px;
					}
					.react-tel-input .mk {
					  background-position: -32px -88px;
					}
					.react-tel-input .ml {
					  background-position: -48px -88px;
					}
					.react-tel-input .mm {
					  background-position: -64px -88px;
					}
					.react-tel-input .mn {
					  background-position: -80px -88px;
					}
					.react-tel-input .mo {
					  background-position: -96px -88px;
					}
					.react-tel-input .mp {
					  background-position: -112px -88px;
					}
					.react-tel-input .mq {
					  background-position: -128px -88px;
					}
					.react-tel-input .mr {
					  background-position: -144px -88px;
					}
					.react-tel-input .ms {
					  background-position: -160px -88px;
					}
					.react-tel-input .mt {
					  background-position: -176px -88px;
					}
					.react-tel-input .mu {
					  background-position: -192px -88px;
					}
					.react-tel-input .mv {
					  background-position: -208px -88px;
					}
					.react-tel-input .mw {
					  background-position: -224px -88px;
					}
					.react-tel-input .mx {
					  background-position: -240px -88px;
					}
					.react-tel-input .my {
					  background-position: 0 -99px;
					}
					.react-tel-input .mz {
					  background-position: -16px -99px;
					}
					.react-tel-input .na {
					  background-position: -32px -99px;
					}
					.react-tel-input .nc {
					  background-position: -48px -99px;
					}
					.react-tel-input .ne {
					  background-position: -64px -99px;
					}
					.react-tel-input .nf {
					  background-position: -80px -99px;
					}
					.react-tel-input .ng {
					  background-position: -96px -99px;
					}
					.react-tel-input .ni {
					  background-position: -112px -99px;
					}
					.react-tel-input .nl,
					.react-tel-input .bq {
					  background-position: -128px -99px;
					}
					.react-tel-input .no {
					  background-position: -144px -99px;
					}
					.react-tel-input .np {
					  background-position: -160px -99px;
					}
					.react-tel-input .nr {
					  background-position: -176px -99px;
					}
					.react-tel-input .nu {
					  background-position: -192px -99px;
					}
					.react-tel-input .nz {
					  background-position: -208px -99px;
					}
					.react-tel-input .om {
					  background-position: -224px -99px;
					}
					.react-tel-input .pa {
					  background-position: -240px -99px;
					}
					.react-tel-input .pe {
					  background-position: 0 -110px;
					}
					.react-tel-input .pf {
					  background-position: -16px -110px;
					}
					.react-tel-input .pg {
					  background-position: -32px -110px;
					}
					.react-tel-input .ph {
					  background-position: -48px -110px;
					}
					.react-tel-input .pk {
					  background-position: -64px -110px;
					}
					.react-tel-input .pl {
					  background-position: -80px -110px;
					}
					.react-tel-input .pm {
					  background-position: -96px -110px;
					}
					.react-tel-input .pr {
					  background-position: -112px -110px;
					}
					.react-tel-input .ps {
					  background-position: -128px -110px;
					}
					.react-tel-input .pt {
					  background-position: -144px -110px;
					}
					.react-tel-input .pw {
					  background-position: -160px -110px;
					}
					.react-tel-input .py {
					  background-position: -176px -110px;
					}
					.react-tel-input .qa {
					  background-position: -192px -110px;
					}
					.react-tel-input .re {
					  background-position: -208px -110px;
					}
					.react-tel-input .ro {
					  background-position: -224px -110px;
					}
					.react-tel-input .rs {
					  background-position: -240px -110px;
					}
					.react-tel-input .ru {
					  background-position: 0 -121px;
					}
					.react-tel-input .rw {
					  background-position: -16px -121px;
					}
					.react-tel-input .sa {
					  background-position: -32px -121px;
					}
					.react-tel-input .sb {
					  background-position: -48px -121px;
					}
					.react-tel-input .sc {
					  background-position: -64px -121px;
					}
					.react-tel-input .sd {
					  background-position: -80px -121px;
					}
					.react-tel-input .se {
					  background-position: -96px -121px;
					}
					.react-tel-input .sg {
					  background-position: -112px -121px;
					}
					.react-tel-input .sh {
					  background-position: -128px -121px;
					}
					.react-tel-input .si {
					  background-position: -144px -121px;
					}
					.react-tel-input .sk {
					  background-position: -160px -121px;
					}
					.react-tel-input .sl {
					  background-position: -176px -121px;
					}
					.react-tel-input .sm {
					  background-position: -192px -121px;
					}
					.react-tel-input .sn {
					  background-position: -208px -121px;
					}
					.react-tel-input .so {
					  background-position: -224px -121px;
					}
					.react-tel-input .sr {
					  background-position: -240px -121px;
					}
					.react-tel-input .ss {
					  background-position: 0 -132px;
					}
					.react-tel-input .st {
					  background-position: -16px -132px;
					}
					.react-tel-input .sv {
					  background-position: -32px -132px;
					}
					.react-tel-input .sx {
					  background-position: -48px -132px;
					}
					.react-tel-input .sy {
					  background-position: -64px -132px;
					}
					.react-tel-input .sz {
					  background-position: -80px -132px;
					}
					.react-tel-input .tc {
					  background-position: -96px -132px;
					}
					.react-tel-input .td {
					  background-position: -112px -132px;
					}
					.react-tel-input .tg {
					  background-position: -128px -132px;
					}
					.react-tel-input .th {
					  background-position: -144px -132px;
					}
					.react-tel-input .tj {
					  background-position: -160px -132px;
					}
					.react-tel-input .tk {
					  background-position: -176px -132px;
					}
					.react-tel-input .tl {
					  background-position: -192px -132px;
					}
					.react-tel-input .tm {
					  background-position: -208px -132px;
					}
					.react-tel-input .tn {
					  background-position: -224px -132px;
					}
					.react-tel-input .to {
					  background-position: -240px -132px;
					}
					.react-tel-input .tr {
					  background-position: 0 -143px;
					}
					.react-tel-input .tt {
					  background-position: -16px -143px;
					}
					.react-tel-input .tv {
					  background-position: -32px -143px;
					}
					.react-tel-input .tw {
					  background-position: -48px -143px;
					}
					.react-tel-input .tz {
					  background-position: -64px -143px;
					}
					.react-tel-input .ua {
					  background-position: -80px -143px;
					}
					.react-tel-input .ug {
					  background-position: -96px -143px;
					}
					.react-tel-input .us {
					  background-position: -112px -143px;
					}
					.react-tel-input .uy {
					  background-position: -128px -143px;
					}
					.react-tel-input .uz {
					  background-position: -144px -143px;
					}
					.react-tel-input .va {
					  background-position: -160px -143px;
					}
					.react-tel-input .vc {
					  background-position: -176px -143px;
					}
					.react-tel-input .ve {
					  background-position: -192px -143px;
					}
					.react-tel-input .vg {
					  background-position: -208px -143px;
					}
					.react-tel-input .vi {
					  background-position: -224px -143px;
					}
					.react-tel-input .vn {
					  background-position: -240px -143px;
					}
					.react-tel-input .vu {
					  background-position: 0 -154px;
					}
					.react-tel-input .wf {
					  background-position: -16px -154px;
					}
					.react-tel-input .ws {
					  background-position: -32px -154px;
					}
					.react-tel-input .ye {
					  background-position: -48px -154px;
					}
					.react-tel-input .za {
					  background-position: -64px -154px;
					}
					.react-tel-input .zm {
					  background-position: -80px -154px;
					}
					.react-tel-input .zw {
					  background-position: -96px -154px;
					}
					.react-tel-input * {
					  box-sizing: border-box;
					  -moz-box-sizing: border-box;
					}
					.react-tel-input .hide {
					  display: none;
					}
					.react-tel-input .v-hide {
					  visibility: hidden;
					}
					.react-tel-input input[type=text],
					.react-tel-input input[type=tel] {
					  position: relative;
					  z-index: 0;
					  margin-top: 0 !important;
					  margin-bottom: 0 !important;
					  padding-left: 44px;
					  margin-left: 0;
					  background: #FFFFFF;
					  border: 1px solid #CACACA;
					  border-radius: 3px;
					  box-shadow: 0 1px 2px #E3E3E3 inset;
					  line-height: 25px;
					  height: 28px;
					  width: 100%;
					}
					.react-tel-input input[type=text]:focus,
					.react-tel-input input[type=tel]:focus {
					  border-color: #42bdff;
					  border-left-color: #cacaca;
					}
					.react-tel-input input[type=text].invalid-number,
					.react-tel-input input[type=tel].invalid-number {
					  border: 1px solid #d79f9f;
					  background-color: #FAF0F0;
					  border-left-color: #cacaca;
					}
					.react-tel-input input[type=text].invalid-number:focus,
					.react-tel-input input[type=tel].invalid-number:focus {
					  border: 1px solid #d79f9f;
					  border-left-color: #cacaca;
					  background-color: #FAF0F0;
					}
					.react-tel-input .flag-dropdown {
					  position: absolute;
					  bottom: 0;
					  padding: 0;
					  background-color: #eaeaea;
					  border: 1px solid #cacaca;
					  border-radius: 3px 0 0 3px;
					}
					.react-tel-input .flag-dropdown.open-dropdown {
					  background: #fff;
					  border-bottom: 0;
					  border-radius: 3px 0 0 0;
					}
					.react-tel-input .flag-dropdown.open-dropdown .selected-flag {
					  background: #fff;
					  border-radius: 3px 0 0 0;
					}
					.react-tel-input .flag-dropdown:hover {
					  cursor: pointer;
					}
					.react-tel-input .flag-dropdown:hover .selected-flag {
					  background-color: #fff;
					}
					.react-tel-input input[disabled] + .flag-dropdown:hover {
					  cursor: default;
					}
					.react-tel-input input[disabled] + .flag-dropdown:hover .selected-flag {
					  background-color: transparent;
					}
					.react-tel-input .selected-flag {
					  z-index: 13;
					  position: relative;
					  width: 38px;
					  height: 26px;
					  padding: 0 0 0 8px;
					  border-radius: 3px 0 0 3px;
					}
					.react-tel-input .selected-flag .flag {
					  position: absolute;
					  top: 50%;
					  margin-top: -5px;
					}
					.react-tel-input .selected-flag .arrow {
					  position: relative;
					  top: 50%;
					  margin-top: -2px;
					  left: 20px;
					  width: 0;
					  height: 0;
					  border-left: 3px solid transparent;
					  border-right: 3px solid transparent;
					  border-top: 4px solid #555;
					}
					.react-tel-input .selected-flag .arrow.up {
					  border-top: none;
					  border-bottom: 4px solid #555;
					}
					.react-tel-input .country-list {
					  list-style: none;
					  position: absolute;
					  z-index: 2;
					  padding: 0;
					  margin: -1px 0 0 -1px;
					  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
					  background-color: white;
					  border: 1px solid #ccc;
					  width: 400px;
					  max-height: 200px;
					  overflow-y: scroll;
					  border-radius: 0 0 3px 3px;
					  top: 26px;
					}
					.react-tel-input .country-list .flag {
					  display: inline-block;
					}
					.react-tel-input .country-list .divider {
					  padding-bottom: 5px;
					  margin-bottom: 5px;
					  border-bottom: 1px solid #ccc;
					}
					.react-tel-input .country-list .country {
					  padding: 5px 10px;
					}
					.react-tel-input .country-list .country .dial-code {
					  color: #999;
					}
					.react-tel-input .country-list .country:hover {
					  background-color: #e8f7fe;
					}
					.react-tel-input .country-list .country.highlight {
					  background-color: #c7e2f1;
					}
					.react-tel-input .country-list .flag {
					  margin-right: 6px;
					  margin-top: 2px;
					}
					.react-tel-input .country-list .country-name {
					  margin-right: 6px;
					}
					.react-tel-input input[type=text], .react-tel-input input[type=tel] {
					    box-shadow: none;
					}
			  	</style>
			  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
			</head>
			<body>
				<div id="root">${appMarkup || ""}</div>
				<script type="text/javascript">
					function downloadJSAtOnload() {
						const element = document.createElement("script");
						element.src = "${appSrc}";
						document.body.appendChild(element);
					}
					if (window.addEventListener) {
						window.addEventListener("load", downloadJSAtOnload, false);
					}	else if (window.attachEvent) {
						window.attachEvent("onload", downloadJSAtOnload);
					} else {
						window.onload = downloadJSAtOnload;
					}
				</script>
			  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
			</body>
		</html>`;
}