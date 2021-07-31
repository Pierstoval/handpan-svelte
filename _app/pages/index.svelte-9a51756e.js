import{S as t,i as e,s,e as n,t as l,k as o,c as a,a as r,g as i,n as c,d as h,b as f,f as u,H as p,I as g,J as v,K as m,L as d,h as _,M as E,N,O as $,P as y,l as b,j as D,m as T,o as B,x as A,u as I,v as C,r as k,Q as w,w as M,R as O,T as V,U as G,V as F,C as P,A as S}from"../chunks/vendor-a96d677c.js";var x,z,L,H;(z=x||(x={})).left="left",z.right="right",(H=L||(L={})).A="A",H.B="B",H.C="C",H.D="D",H.E="E",H.F="F",H.G="G";const U=["Cb2","C2","C#2","Db2","D2","D#2","Eb2","A#5","B1","Bb5","B5","B#5","C6"],j=[2,3,4,5],X={C:24,D:26,E:28,F:29,G:31,A:33,B:35};var R,q,J,K,Q,W;(q=R||(R={})).none="",q.sharp="#",q.flat="b",(K=J||(J={})).topNote="topNote",K.bottomNote="bottomNote",K.ding="ding",(W=Q||(Q={})).note="note",W.slap="slap",W.ghost="ghost",W.none="none";class Y{get octave(){return this._octave}set octave(t){this._octave=t,this.refresh()}get alteration(){return this._alteration}set alteration(t){this._alteration=t,this.refresh()}get note(){return this._note}set note(t){this._note=t,this.refresh()}get type(){return this._type}get position(){return this._position}get fullName(){return this._note+this._alteration+this._octave}get fullDetailedName(){return this._position+" - "+this.fullName+(this.isDing?" (ding)":"")+(this.isBottom?" (bottom)":"")}get isTop(){return this._type===J.topNote}get isDing(){return this._type===J.ding}get isBottom(){return this._type===J.bottomNote}get midiNumber(){let t=X[this._note.toString()]+12*(this._octave-1);return this._alteration===R.sharp?t++:this._alteration===R.flat&&t--,t}constructor(t,e,s,n,l){if(this._note=t,this._alteration=e,this._octave=s,this._type=n,this._position=l,l<0)throw new Error("Note position must be a non-negative integer.");this.refresh()}refresh(){const t={"B#":[L.C,R.none,1],"E#":[L.F,R.none,0],Ab:[L.G,R.sharp,0],Bb:[L.A,R.sharp,0],Cb:[L.B,R.none,-1],Db:[L.C,R.none,0],Eb:[L.D,R.sharp,0],Fb:[L.E,R.none,0],Gb:[L.F,R.sharp,0]}[this._note+this._alteration];if(!t)return;let e;e&&(this._octave+e<Math.min(...j)||this._octave+e<Math.max(...j))||([this._note,this._alteration,e]=t,e&&(this._octave+=e))}}const Z={clac:"clac/clac.flac",gu:"gu/D2.flac",notes:{E2:"shellopan/E2.flac",F2:"shellopan/F2.flac","F#2":"shellopan/Fs2.flac",G2:"shellopan/G2.flac","G#2":"shellopan/Gs2.flac",A2:"shellopan/A2.flac","A#2":"shellopan/As2.flac",B2:"shellopan/B2.flac",C3:"shellopan/C3.flac","C#3":"shellopan/Cs3.flac",D3:"shellopan/D3.flac","D#3":"shellopan/Ds3.flac",E3:"shellopan/E3.flac",F3:"shellopan/F3.flac","F#3":"shellopan/Fs3.flac",G3:"shellopan/G3.flac","G#3":"shellopan/Gs3.flac",A3:"shellopan/A3.flac","A#3":"shellopan/As3.flac",B3:"shellopan/B3.flac",C4:"shellopan/C4.flac","C#4":"shellopan/Cs4.flac",D4:"shellopan/D4.flac","D#4":"shellopan/Ds4.flac",E4:"shellopan/E4.flac",F4:"shellopan/F4.flac","F#4":"shellopan/Fs4.flac",G4:"shellopan/G4.flac","G#4":"shellopan/Gs4.flac",A4:"shellopan/A4.flac","A#4":"shellopan/As4.flac",B4:"shellopan/B4.flac",C5:"shellopan/C5.flac","C#5":"shellopan/Cs5.flac",D5:"shellopan/D5.flac","D#5":"shellopan/Ds5.flac",E5:"shellopan/E5.flac",F5:"shellopan/F5.flac","F#5":"shellopan/Fs5.flac",G5:"shellopan/G5.flac","G#5":"shellopan/Gs5.flac",A5:"shellopan/A5.flac"}},tt=class{static loadSounds(){this.load("clac",Z.clac),this.load("gu",Z.gu);for(const t in Z.notes)this.load(t,Z.notes[t])}static playTrack(t,e){this.clearTimeouts();const s=this.getMsPerBeat(t.bpm,t.beat);this.isPlayingTrack=!0;const n=Object.assign([],t.notes);this.playSequence([...n],s),e&&this.playingTimeouts.push(setTimeout(e,s*(n.length+1)))}static getMsPerBeat(t,e){return 6e4/t/e}static stop(){this.clearTimeouts()}static playNoteByType(t,e=1,s=null){if(!this.loadedAudio[t])return void console.error(`Sound type "${t}" s not loaded or does not exist.`);const n=this.loadedAudio[t].cloneNode();if(n.volume=e,n.play(),s){const t=isNaN(n.duration)?this.DEFAULT_AUDIO_DURATION:n.duration;this.playingTimeouts.push(setTimeout(s,t))}}static playNote(t){switch(t.setPlaying(),this.playingNotes.push(t),!0){case t.isSlap:case t.isGhost:this.playNoteByType("clac",1,(()=>this.stopNote(t)));break;case t.isNone:break;default:this.playNoteByType(t.playerName,1,(()=>this.stopNote(t)))}}static playSequence(t,e){if(!1===this.isPlayingTrack)return;const s=t.shift();if(this.playNote(s),t.length>0){const s=setTimeout((()=>{tt.playSequence(t,e)}),e);this.playingTimeouts.push(s)}}static clearTimeouts(){for(;this.playingTimeouts.length;)clearTimeout(this.playingTimeouts.shift());for(;this.playingNotes.length;)this.stopNote(this.playingNotes.shift());this.isPlayingTrack=!1}static stopNote(t){t.stopPlaying(),this.playingNotes=this.playingNotes.filter((e=>e!==t))}static load(t,e){const s=new Audio;s.src=e,s.preload="auto",s.volume=1,s.addEventListener("canplaythrough",(()=>this.loadedAudio[t]=s))}};let et=tt;et.DEFAULT_AUDIO_DURATION=1e3,et.loadedAudio={},et.isPlayingTrack=!1,et.playingTimeouts=[],et.playingNotes=[];function st(t,e,s){const n=t.slice();return n[11]=e[s],n}function nt(t,e,s){const n=t.slice();return n[11]=e[s],n}function lt(t,e,s){const n=t.slice();return n[16]=e[s],n}function ot(t){let e,s,v,m,d=t[16]+"";return{c(){e=n("option"),s=l(d),v=o(),this.h()},l(t){e=a(t,"OPTION",{class:!0});var n=r(e);s=i(n,d),v=c(n),n.forEach(h),this.h()},h(){e.__value=m=t[16],e.value=e.__value,f(e,"class","svelte-tsg8rn")},m(t,n){u(t,e,n),p(e,s),p(e,v)},p:g,d(t){t&&h(e)}}}function at(t){let e,s,v,m,d=t[11]+"";return{c(){e=n("option"),s=l(d),v=o(),this.h()},l(t){e=a(t,"OPTION",{class:!0});var n=r(e);s=i(n,d),v=c(n),n.forEach(h),this.h()},h(){e.__value=m=t[11],e.value=e.__value,f(e,"class","svelte-tsg8rn")},m(t,n){u(t,e,n),p(e,s),p(e,v)},p:g,d(t){t&&h(e)}}}function rt(t){let e,s,v,m,d=t[11]+"";return{c(){e=n("option"),s=l(d),v=o(),this.h()},l(t){e=a(t,"OPTION",{class:!0});var n=r(e);s=i(n,d),v=c(n),n.forEach(h),this.h()},h(){e.__value=m=t[11],e.value=e.__value,f(e,"class","svelte-tsg8rn")},m(t,n){u(t,e,n),p(e,s),p(e,v)},p:g,d(t){t&&h(e)}}}function it(t){let e,s,$,y,b,D,T,B,A,I,C,k,w,M,O,V,G,F,P,S,x,z,L,H,U,j,X,R,q,J,K,Q,W,Y,Z,tt,et,it,ct=t[0].fullName+"",ht=t[0].midiNumber+"",ft=t[2],ut=[];for(let n=0;n<ft.length;n+=1)ut[n]=ot(lt(t,ft,n));let pt=t[3],gt=[];for(let n=0;n<pt.length;n+=1)gt[n]=at(nt(t,pt,n));let vt=t[4],mt=[];for(let n=0;n<vt.length;n+=1)mt[n]=rt(st(t,vt,n));return{c(){e=n("div"),s=n("div"),$=n("div"),y=l(ct),b=o(),D=n("div"),T=n("div"),B=n("h3"),A=l("Note"),I=o(),C=n("div"),k=n("select");for(let t=0;t<ut.length;t+=1)ut[t].c();w=o(),M=n("div"),O=n("h3"),V=l("Octave"),G=o(),F=n("div"),P=n("select");for(let t=0;t<gt.length;t+=1)gt[t].c();S=o(),x=n("div"),z=n("h3"),L=l("Alteration"),H=o(),U=n("div"),j=n("select");for(let t=0;t<mt.length;t+=1)mt[t].c();X=o(),R=n("div"),q=n("h4"),J=l("Info"),K=o(),Q=n("ul"),W=n("li"),Y=l("Midi: "),Z=l(ht),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=r(e);s=a(n,"DIV",{class:!0});var l=r(s);$=a(l,"DIV",{class:!0});var o=r($);y=i(o,ct),o.forEach(h),b=c(l),D=a(l,"DIV",{class:!0});var f=r(D);T=a(f,"DIV",{class:!0});var u=r(T);B=a(u,"H3",{});var p=r(B);A=i(p,"Note"),p.forEach(h),I=c(u),C=a(u,"DIV",{class:!0});var g=r(C);k=a(g,"SELECT",{size:!0,class:!0});var v=r(k);for(let e=0;e<ut.length;e+=1)ut[e].l(v);v.forEach(h),g.forEach(h),u.forEach(h),w=c(f),M=a(f,"DIV",{class:!0});var m=r(M);O=a(m,"H3",{});var d=r(O);V=i(d,"Octave"),d.forEach(h),G=c(m),F=a(m,"DIV",{class:!0});var _=r(F);P=a(_,"SELECT",{size:!0,class:!0});var E=r(P);for(let e=0;e<gt.length;e+=1)gt[e].l(E);E.forEach(h),_.forEach(h),m.forEach(h),S=c(f),x=a(f,"DIV",{class:!0});var N=r(x);z=a(N,"H3",{});var tt=r(z);L=i(tt,"Alteration"),tt.forEach(h),H=c(N),U=a(N,"DIV",{class:!0});var et=r(U);j=a(et,"SELECT",{size:!0,class:!0});var st=r(j);for(let e=0;e<mt.length;e+=1)mt[e].l(st);st.forEach(h),et.forEach(h),N.forEach(h),X=c(f),R=a(f,"DIV",{});var nt=r(R);q=a(nt,"H4",{});var lt=r(q);J=i(lt,"Info"),lt.forEach(h),K=c(nt),Q=a(nt,"UL",{});var ot=r(Q);W=a(ot,"LI",{});var at=r(W);Y=i(at,"Midi: "),Z=i(at,ht),at.forEach(h),ot.forEach(h),nt.forEach(h),f.forEach(h),l.forEach(h),n.forEach(h),this.h()},h(){f($,"class","note-name svelte-tsg8rn"),f(k,"size",t[2].length),f(k,"class","svelte-tsg8rn"),void 0===t[0].note&&v((()=>t[6].call(k))),f(C,"class","select_container svelte-tsg8rn"),f(T,"class","inputs_container svelte-tsg8rn"),f(P,"size",t[3].length),f(P,"class","svelte-tsg8rn"),void 0===t[0].octave&&v((()=>t[7].call(P))),f(F,"class","select_container svelte-tsg8rn"),f(M,"class","inputs_container svelte-tsg8rn"),f(j,"size",t[4].length),f(j,"class","svelte-tsg8rn"),void 0===t[0].alteration&&v((()=>t[8].call(j))),f(U,"class","select_container svelte-tsg8rn"),f(x,"class","inputs_container svelte-tsg8rn"),f(D,"class",tt="note-menu "+(t[1]?"active":"")+" svelte-tsg8rn"),f(s,"class","note svelte-tsg8rn"),f(e,"class","note-container svelte-tsg8rn")},m(n,l){u(n,e,l),p(e,s),p(s,$),p($,y),p(s,b),p(s,D),p(D,T),p(T,B),p(B,A),p(T,I),p(T,C),p(C,k);for(let t=0;t<ut.length;t+=1)ut[t].m(k,null);m(k,t[0].note),p(D,w),p(D,M),p(M,O),p(O,V),p(M,G),p(M,F),p(F,P);for(let t=0;t<gt.length;t+=1)gt[t].m(P,null);m(P,t[0].octave),p(D,S),p(D,x),p(x,z),p(z,L),p(x,H),p(x,U),p(U,j);for(let t=0;t<mt.length;t+=1)mt[t].m(j,null);m(j,t[0].alteration),p(D,X),p(D,R),p(R,q),p(q,J),p(R,K),p(R,Q),p(Q,W),p(W,Y),p(W,Z),t[9](e),et||(it=[d(k,"change",t[6]),d(k,"change",t[5]),d(P,"change",t[7]),d(P,"change",t[5]),d(j,"change",t[8]),d(j,"change",t[5])],et=!0)},p(t,[e]){if(1&e&&ct!==(ct=t[0].fullName+"")&&_(y,ct),4&e){let s;for(ft=t[2],s=0;s<ft.length;s+=1){const n=lt(t,ft,s);ut[s]?ut[s].p(n,e):(ut[s]=ot(n),ut[s].c(),ut[s].m(k,null))}for(;s<ut.length;s+=1)ut[s].d(1);ut.length=ft.length}if(5&e&&m(k,t[0].note),8&e){let s;for(pt=t[3],s=0;s<pt.length;s+=1){const n=nt(t,pt,s);gt[s]?gt[s].p(n,e):(gt[s]=at(n),gt[s].c(),gt[s].m(P,null))}for(;s<gt.length;s+=1)gt[s].d(1);gt.length=pt.length}if(5&e&&m(P,t[0].octave),16&e){let s;for(vt=t[4],s=0;s<vt.length;s+=1){const n=st(t,vt,s);mt[s]?mt[s].p(n,e):(mt[s]=rt(n),mt[s].c(),mt[s].m(j,null))}for(;s<mt.length;s+=1)mt[s].d(1);mt.length=vt.length}5&e&&m(j,t[0].alteration),1&e&&ht!==(ht=t[0].midiNumber+"")&&_(Z,ht),2&e&&tt!==(tt="note-menu "+(t[1]?"active":"")+" svelte-tsg8rn")&&f(D,"class",tt)},i:g,o:g,d(s){s&&h(e),E(ut,s),E(gt,s),E(mt,s),t[9](null),et=!1,N(it)}}}function ct(t,e,s){let{note:n}=e;const l=Object.values(L),o=Object.values(R);return t.$$set=t=>{"note"in t&&s(0,n=t.note)},[n,!1,l,[1,2,3,4,5],o,function(){et.playNoteByType(n.fullName)},function(){n.note=$(this),s(0,n),s(2,l)},function(){n.octave=$(this),s(0,n),s(2,l)},function(){n.alteration=$(this),s(0,n),s(2,l)},function(t){y[t?"unshift":"push"]((()=>{n.htmlElement=t,s(0,n),s(2,l)}))}]}class ht extends t{constructor(t){super(),e(this,t,ct,it,s,{note:0})}}function ft(t,e,s){const n=t.slice();return n[1]=e[s],n[3]=s,n}function ut(t,e,s){const n=t.slice();return n[1]=e[s],n[3]=s,n}function pt(t,e,s){const n=t.slice();return n[1]=e[s],n[3]=s,n}function gt(t,e){let s,n,l;return n=new ht({props:{note:e[1]}}),{key:t,first:null,c(){s=b(),D(n.$$.fragment),this.h()},l(t){s=b(),T(n.$$.fragment,t),this.h()},h(){this.first=s},m(t,e){u(t,s,e),B(n,t,e),l=!0},p(t,s){e=t;const l={};1&s&&(l.note=e[1]),n.$set(l)},i(t){l||(A(n.$$.fragment,t),l=!0)},o(t){I(n.$$.fragment,t),l=!1},d(t){t&&h(s),C(n,t)}}}function vt(t,e){let s,n,l;return n=new ht({props:{note:e[1]}}),{key:t,first:null,c(){s=b(),D(n.$$.fragment),this.h()},l(t){s=b(),T(n.$$.fragment,t),this.h()},h(){this.first=s},m(t,e){u(t,s,e),B(n,t,e),l=!0},p(t,s){e=t;const l={};1&s&&(l.note=e[1]),n.$set(l)},i(t){l||(A(n.$$.fragment,t),l=!0)},o(t){I(n.$$.fragment,t),l=!1},d(t){t&&h(s),C(n,t)}}}function mt(t,e){let s,n,l;return n=new ht({props:{note:e[1]}}),{key:t,first:null,c(){s=b(),D(n.$$.fragment),this.h()},l(t){s=b(),T(n.$$.fragment,t),this.h()},h(){this.first=s},m(t,e){u(t,s,e),B(n,t,e),l=!0},p(t,s){e=t;const l={};1&s&&(l.note=e[1]),n.$set(l)},i(t){l||(A(n.$$.fragment,t),l=!0)},o(t){I(n.$$.fragment,t),l=!1},d(t){t&&h(s),C(n,t)}}}function dt(t){let e,s,g,v,m,d,_,E,N,$,y,b,D,T,B,C,V,G,F=[],P=new Map,S=[],x=new Map,z=[],L=new Map,H=t[0].topNotes;const U=t=>t[1];for(let n=0;n<H.length;n+=1){let e=pt(t,H,n),s=U(e);P.set(s,F[n]=gt(s,e))}let j=t[0].dings;const X=t=>t[1];for(let n=0;n<j.length;n+=1){let e=ut(t,j,n),s=X(e);x.set(s,S[n]=vt(s,e))}let R=t[0].bottomNotes;const q=t=>t[1];for(let n=0;n<R.length;n+=1){let e=ft(t,R,n),s=q(e);L.set(s,z[n]=mt(s,e))}return{c(){e=n("h2"),s=l("Tune"),g=o(),v=n("h3"),m=l("Top notes:"),d=o(),_=n("div");for(let t=0;t<F.length;t+=1)F[t].c();E=o(),N=n("h3"),$=l("Dings:"),y=o(),b=n("div");for(let t=0;t<S.length;t+=1)S[t].c();D=o(),T=n("h3"),B=l("Bottom notes:"),C=o(),V=n("div");for(let t=0;t<z.length;t+=1)z[t].c();this.h()},l(t){e=a(t,"H2",{});var n=r(e);s=i(n,"Tune"),n.forEach(h),g=c(t),v=a(t,"H3",{});var l=r(v);m=i(l,"Top notes:"),l.forEach(h),d=c(t),_=a(t,"DIV",{class:!0});var o=r(_);for(let e=0;e<F.length;e+=1)F[e].l(o);o.forEach(h),E=c(t),N=a(t,"H3",{});var f=r(N);$=i(f,"Dings:"),f.forEach(h),y=c(t),b=a(t,"DIV",{class:!0});var u=r(b);for(let e=0;e<S.length;e+=1)S[e].l(u);u.forEach(h),D=c(t),T=a(t,"H3",{});var p=r(T);B=i(p,"Bottom notes:"),p.forEach(h),C=c(t),V=a(t,"DIV",{class:!0});var A=r(V);for(let e=0;e<z.length;e+=1)z[e].l(A);A.forEach(h),this.h()},h(){f(_,"class","notes-list"),f(b,"class","notes-list"),f(V,"class","notes-list")},m(t,n){u(t,e,n),p(e,s),u(t,g,n),u(t,v,n),p(v,m),u(t,d,n),u(t,_,n);for(let e=0;e<F.length;e+=1)F[e].m(_,null);u(t,E,n),u(t,N,n),p(N,$),u(t,y,n),u(t,b,n);for(let e=0;e<S.length;e+=1)S[e].m(b,null);u(t,D,n),u(t,T,n),p(T,B),u(t,C,n),u(t,V,n);for(let e=0;e<z.length;e+=1)z[e].m(V,null);G=!0},p(t,[e]){1&e&&(H=t[0].topNotes,k(),F=w(F,e,U,1,t,H,P,_,O,gt,null,pt),M()),1&e&&(j=t[0].dings,k(),S=w(S,e,X,1,t,j,x,b,O,vt,null,ut),M()),1&e&&(R=t[0].bottomNotes,k(),z=w(z,e,q,1,t,R,L,V,O,mt,null,ft),M())},i(t){if(!G){for(let t=0;t<H.length;t+=1)A(F[t]);for(let t=0;t<j.length;t+=1)A(S[t]);for(let t=0;t<R.length;t+=1)A(z[t]);G=!0}},o(t){for(let e=0;e<F.length;e+=1)I(F[e]);for(let e=0;e<S.length;e+=1)I(S[e]);for(let e=0;e<z.length;e+=1)I(z[e]);G=!1},d(t){t&&h(e),t&&h(g),t&&h(v),t&&h(d),t&&h(_);for(let e=0;e<F.length;e+=1)F[e].d();t&&h(E),t&&h(N),t&&h(y),t&&h(b);for(let e=0;e<S.length;e+=1)S[e].d();t&&h(D),t&&h(T),t&&h(C),t&&h(V);for(let e=0;e<z.length;e+=1)z[e].d()}}}function _t(t,e,s){let{tune:n}=e;return t.$$set=t=>{"tune"in t&&s(0,n=t.tune)},[n]}class Et extends t{constructor(t){super(),e(this,t,_t,dt,s,{tune:0})}}const Nt=class{constructor(){this._bpm=120,this._beat=4,this._notes=[]}get bpm(){return this._bpm}set bpm(t){t<=0&&(t=1),t>Nt.MAX_BPM&&(t=Nt.MAX_BPM),this._bpm=t}get beat(){return this._beat}set beat(t){t<Nt.MIN_BEAT&&(t=Nt.MIN_BEAT),t>Nt.MAX_BEAT&&(t=Nt.MAX_BEAT),this._beat=t}get notes(){return this._notes}addNote(t){this._notes.push(t)}};let $t=Nt;$t.MIN_BPM=50,$t.MAX_BPM=200,$t.MIN_BEAT=2,$t.MAX_BEAT=8;class yt{get fullName(){var t,e;switch(!0){case this.isSlap:return"×";case this.isGhost:return"👻";case this.isNone:return"—";default:return null!=(e=null==(t=this.note)?void 0:t.fullName)?e:"-"}}get playerName(){if(!this.isNote)throw new Error(`Note name for the music player can only be retrieved on notes. Current note is "${this.type}".`);return this.note.fullName}get isNote(){return this.type===Q.note}get isSlap(){return this.type===Q.slap}get isGhost(){return this.type===Q.ghost}get isNone(){return this.type===Q.none}constructor(t,e){this.note=t,this.type=e}setPlaying(){this._initialColor||(this._initialColor=this.htmlElement.style.borderColor),this.htmlElement.firstElementChild.classList.add("playing")}stopPlaying(){this.htmlElement.firstElementChild.classList.remove("playing")}}function bt(t,e,s){const n=t.slice();return n[8]=e[s],n}function Dt(t,e,s){const n=t.slice();return n[11]=e[s],n}function Tt(t){let e,s,v,m,d=t[11]+"";return{c(){e=n("option"),s=l(d),v=o(),this.h()},l(t){e=a(t,"OPTION",{class:!0});var n=r(e);s=i(n,d),v=c(n),n.forEach(h),this.h()},h(){e.__value=m=t[11],e.value=e.__value,f(e,"class","svelte-vioaat")},m(t,n){u(t,e,n),p(e,s),p(e,v)},p:g,d(t){t&&h(e)}}}function Bt(t){let e,s,g,_,$,y,b,D,T,B=t[1].notes,A=[];for(let n=0;n<B.length;n+=1)A[n]=At(bt(t,B,n));return{c(){e=n("div"),s=n("h3"),g=l("Note"),_=o(),$=n("div"),y=n("select");for(let t=0;t<A.length;t+=1)A[t].c();this.h()},l(t){e=a(t,"DIV",{class:!0});var n=r(e);s=a(n,"H3",{});var l=r(s);g=i(l,"Note"),l.forEach(h),_=c(n),$=a(n,"DIV",{class:!0});var o=r($);y=a(o,"SELECT",{size:!0,class:!0});var f=r(y);for(let e=0;e<A.length;e+=1)A[e].l(f);f.forEach(h),o.forEach(h),n.forEach(h),this.h()},h(){f(y,"size",b=t[1].notes.length),f(y,"class","svelte-vioaat"),void 0===t[0].note&&v((()=>t[6].call(y))),f($,"class","track_select_container svelte-vioaat"),f(e,"class","track_inputs_container svelte-vioaat")},m(n,l){u(n,e,l),p(e,s),p(s,g),p(e,_),p(e,$),p($,y);for(let t=0;t<A.length;t+=1)A[t].m(y,null);m(y,t[0].note),D||(T=[d(y,"change",t[6]),d(y,"change",t[4])],D=!0)},p(t,e){if(2&e){let s;for(B=t[1].notes,s=0;s<B.length;s+=1){const n=bt(t,B,s);A[s]?A[s].p(n,e):(A[s]=At(n),A[s].c(),A[s].m(y,null))}for(;s<A.length;s+=1)A[s].d(1);A.length=B.length}2&e&&b!==(b=t[1].notes.length)&&f(y,"size",b),9&e&&m(y,t[0].note)},d(t){t&&h(e),E(A,t),D=!1,N(T)}}}function At(t){let e,s,g,v,m=t[8].fullDetailedName+"";return{c(){e=n("option"),s=l(m),g=o(),this.h()},l(t){e=a(t,"OPTION",{class:!0});var n=r(e);s=i(n,m),g=c(n),n.forEach(h),this.h()},h(){e.__value=v=t[8],e.value=e.__value,f(e,"class","svelte-vioaat")},m(t,n){u(t,e,n),p(e,s),p(e,g)},p(t,n){2&n&&m!==(m=t[8].fullDetailedName+"")&&_(s,m),2&n&&v!==(v=t[8])&&(e.__value=v,e.value=e.__value)},d(t){t&&h(e)}}}function It(t){let e,s,N,$,y,b,D,T,B,A,I,C,k,w,M,O,V=t[0].fullName+"",G=t[3],F=[];for(let n=0;n<G.length;n+=1)F[n]=Tt(Dt(t,G,n));let P=!0===t[2]&&Bt(t);return{c(){e=n("div"),s=n("div"),N=n("div"),$=l(V),y=o(),b=n("div"),D=n("div"),T=n("h3"),B=l("Type"),A=o(),I=n("div"),C=n("select");for(let t=0;t<F.length;t+=1)F[t].c();k=o(),P&&P.c(),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=r(e);s=a(n,"DIV",{class:!0});var l=r(s);N=a(l,"DIV",{class:!0});var o=r(N);$=i(o,V),o.forEach(h),y=c(l),b=a(l,"DIV",{class:!0});var f=r(b);D=a(f,"DIV",{class:!0});var u=r(D);T=a(u,"H3",{});var p=r(T);B=i(p,"Type"),p.forEach(h),A=c(u),I=a(u,"DIV",{class:!0});var g=r(I);C=a(g,"SELECT",{size:!0,class:!0});var v=r(C);for(let e=0;e<F.length;e+=1)F[e].l(v);v.forEach(h),g.forEach(h),u.forEach(h),k=c(f),P&&P.l(f),f.forEach(h),l.forEach(h),n.forEach(h),this.h()},h(){f(N,"class","note-name svelte-vioaat"),f(C,"size",t[3].length),f(C,"class","svelte-vioaat"),void 0===t[0].type&&v((()=>t[5].call(C))),f(I,"class","track_select_container svelte-vioaat"),f(D,"class","track_inputs_container svelte-vioaat"),f(b,"class","track-note-menu svelte-vioaat"),f(s,"class",w="track-note type-"+t[0].type+" svelte-vioaat"),f(e,"class","track-note-container svelte-vioaat")},m(n,l){u(n,e,l),p(e,s),p(s,N),p(N,$),p(s,y),p(s,b),p(b,D),p(D,T),p(T,B),p(D,A),p(D,I),p(I,C);for(let t=0;t<F.length;t+=1)F[t].m(C,null);m(C,t[0].type),p(b,k),P&&P.m(b,null),t[7](e),M||(O=d(C,"change",t[5]),M=!0)},p(t,[e]){if(1&e&&V!==(V=t[0].fullName+"")&&_($,V),8&e){let s;for(G=t[3],s=0;s<G.length;s+=1){const n=Dt(t,G,s);F[s]?F[s].p(n,e):(F[s]=Tt(n),F[s].c(),F[s].m(C,null))}for(;s<F.length;s+=1)F[s].d(1);F.length=G.length}9&e&&m(C,t[0].type),!0===t[2]?P?P.p(t,e):(P=Bt(t),P.c(),P.m(b,null)):P&&(P.d(1),P=null),9&e&&w!==(w="track-note type-"+t[0].type+" svelte-vioaat")&&f(s,"class",w)},i:g,o:g,d(s){s&&h(e),E(F,s),P&&P.d(),t[7](null),M=!1,O()}}}function Ct(t,e,s){let n,{note:l}=e,{tune:o}=e;const a=Object.values(Q);return t.$$set=t=>{"note"in t&&s(0,l=t.note),"tune"in t&&s(1,o=t.tune)},t.$$.update=()=>{1&t.$$.dirty&&s(2,n=l.isNote)},[l,o,n,a,function(){et.playNoteByType(l.fullName)},function(){l.type=$(this),s(0,l),s(3,a)},function(){l.note=$(this),s(0,l),s(3,a)},function(t){y[t?"unshift":"push"]((()=>{l.htmlElement=t,s(0,l),s(3,a)}))}]}class kt extends t{constructor(t){super(),e(this,t,Ct,It,s,{note:0,tune:1})}}function wt(t,e,s){const n=t.slice();return n[10]=e[s],n}function Mt(t){let e,s,o,c;return{c(){e=n("button"),s=l("⏯"),this.h()},l(t){e=a(t,"BUTTON",{type:!0,class:!0});var n=r(e);s=i(n,"⏯"),n.forEach(h),this.h()},h(){f(e,"type","button"),f(e,"class","track-control svelte-xkzjba")},m(n,l){u(n,e,l),p(e,s),o||(c=d(e,"click",t[5]),o=!0)},p:g,d(t){t&&h(e),o=!1,c()}}}function Ot(t){let e,s,o,c;return{c(){e=n("button"),s=l("⏸"),this.h()},l(t){e=a(t,"BUTTON",{type:!0,class:!0});var n=r(e);s=i(n,"⏸"),n.forEach(h),this.h()},h(){f(e,"type","button"),f(e,"class","track-control svelte-xkzjba")},m(n,l){u(n,e,l),p(e,s),o||(c=d(e,"click",t[6]),o=!0)},p:g,d(t){t&&h(e),o=!1,c()}}}function Vt(t){let e,s;return e=new kt({props:{note:t[10],tune:t[1]}}),{c(){D(e.$$.fragment)},l(t){T(e.$$.fragment,t)},m(t,n){B(e,t,n),s=!0},p(t,s){const n={};1&s&&(n.note=t[10]),2&s&&(n.tune=t[1]),e.$set(n)},i(t){s||(A(e.$$.fragment,t),s=!0)},o(t){I(e.$$.fragment,t),s=!1},d(t){C(e,t)}}}function Gt(t){let e,s,g,v,m,d,N,$,b,w,O,P,S,x,z,L,H,U,j,X=t[0].bpm+"";function R(e){t[8](e)}let q={id:"range-beat",min:$t.MIN_BEAT,max:$t.MAX_BEAT,float:!0,pips:!0,all:"label",springValues:t[7]};function J(e){t[9](e)}void 0!==t[3]&&(q.values=t[3]),d=new V({props:q}),y.push((()=>G(d,"values",R)));let K={id:"range-bpm",min:$t.MIN_BPM,max:$t.MAX_BPM,step:"5",float:!0,pips:!0,pipstep:"2",all:"label",springValues:t[7]};function Q(t,e){return t[4]?Ot:Mt}void 0!==t[2]&&(K.values=t[2]),x=new V({props:K}),y.push((()=>G(x,"values",J)));let W=Q(t),Y=W(t),Z=t[0].notes,tt=[];for(let n=0;n<Z.length;n+=1)tt[n]=Vt(wt(t,Z,n));const et=t=>I(tt[t],1,1,(()=>{tt[t]=null}));return{c(){e=n("h2"),s=l("Track"),g=o(),v=n("div"),m=l("Beat:\n    "),D(d.$$.fragment),$=o(),b=n("div"),w=l("Speed (bpm): "),O=n("strong"),P=l(X),S=o(),D(x.$$.fragment),L=o(),Y.c(),H=o(),U=n("div");for(let t=0;t<tt.length;t+=1)tt[t].c();this.h()},l(t){e=a(t,"H2",{});var n=r(e);s=i(n,"Track"),n.forEach(h),g=c(t),v=a(t,"DIV",{});var l=r(v);m=i(l,"Beat:\n    "),T(d.$$.fragment,l),l.forEach(h),$=c(t),b=a(t,"DIV",{});var o=r(b);w=i(o,"Speed (bpm): "),O=a(o,"STRONG",{});var f=r(O);P=i(f,X),f.forEach(h),S=c(o),T(x.$$.fragment,o),o.forEach(h),L=c(t),Y.l(t),H=c(t),U=a(t,"DIV",{class:!0});var u=r(U);for(let e=0;e<tt.length;e+=1)tt[e].l(u);u.forEach(h),this.h()},h(){f(U,"class","notes svelte-xkzjba")},m(t,n){u(t,e,n),p(e,s),u(t,g,n),u(t,v,n),p(v,m),B(d,v,null),u(t,$,n),u(t,b,n),p(b,w),p(b,O),p(O,P),p(b,S),B(x,b,null),u(t,L,n),Y.m(t,n),u(t,H,n),u(t,U,n);for(let e=0;e<tt.length;e+=1)tt[e].m(U,null);j=!0},p(t,[e]){const s={};!N&&8&e&&(N=!0,s.values=t[3],F((()=>N=!1))),d.$set(s),(!j||1&e)&&X!==(X=t[0].bpm+"")&&_(P,X);const n={};if(!z&&4&e&&(z=!0,n.values=t[2],F((()=>z=!1))),x.$set(n),W===(W=Q(t))&&Y?Y.p(t,e):(Y.d(1),Y=W(t),Y&&(Y.c(),Y.m(H.parentNode,H))),3&e){let s;for(Z=t[0].notes,s=0;s<Z.length;s+=1){const n=wt(t,Z,s);tt[s]?(tt[s].p(n,e),A(tt[s],1)):(tt[s]=Vt(n),tt[s].c(),A(tt[s],1),tt[s].m(U,null))}for(k(),s=Z.length;s<tt.length;s+=1)et(s);M()}},i(t){if(!j){A(d.$$.fragment,t),A(x.$$.fragment,t);for(let t=0;t<Z.length;t+=1)A(tt[t]);j=!0}},o(t){I(d.$$.fragment,t),I(x.$$.fragment,t),tt=tt.filter(Boolean);for(let e=0;e<tt.length;e+=1)I(tt[e]);j=!1},d(t){t&&h(e),t&&h(g),t&&h(v),C(d),t&&h($),t&&h(b),C(x),t&&h(L),Y.d(t),t&&h(H),t&&h(U),E(tt,t)}}}function Ft(t,e,s){let{track:n}=e,{tune:l}=e,o=!1;let a=[120],r=[4];return t.$$set=t=>{"track"in t&&s(0,n=t.track),"tune"in t&&s(1,l=t.tune)},t.$$.update=()=>{4&t.$$.dirty&&s(0,n.bpm=a[0],n),8&t.$$.dirty&&s(0,n.beat=r[0],n)},[n,l,a,r,o,function(){s(4,o=!0),et.playTrack(n,(()=>s(4,o=!1)))},function(){et.stop(),s(4,o=!1)},{stiffness:.15,damping:.4},function(t){r=t,s(3,r)},function(t){a=t,s(2,a)}]}class Pt extends t{constructor(t){super(),e(this,t,Ft,Gt,s,{track:0,tune:1})}}const St=new class{constructor(t){this._notes=t}get dings(){return this._notes.filter((t=>t.isDing))}get topNotes(){return this._notes.filter((t=>t.isTop))}get bottomNotes(){return this._notes.filter((t=>t.isBottom))}get notes(){return this._notes}getTopNoteByPosition(t){for(const e of this._notes)if(e.isTop&&e.position===t)return e;return null}getBottomNoteByPosition(t){for(const e of this._notes)if(e.isBottom&&e.position===t)return e;return null}getDingByPosition(t){for(const e of this._notes)if(e.isDing&&e.position===t)return e;return null}numberOfDings(){let t=0;for(const e of this._notes)e.position<=0&&t++;return t}numberOfNotes(){return this.notes.length-this.numberOfDings()}}([new Y(L.C,R.sharp,3,J.bottomNote,0),new Y(L.G,R.none,3,J.ding,0),new Y(L.A,R.none,3,J.topNote,0),new Y(L.B,R.none,3,J.topNote,1),new Y(L.C,R.sharp,4,J.topNote,2),new Y(L.D,R.sharp,4,J.topNote,3),new Y(L.E,R.none,4,J.topNote,4),new Y(L.F,R.sharp,4,J.topNote,5),new Y(L.G,R.sharp,4,J.topNote,6)]);const xt=function(){const{subscribe:t,set:e,update:s}=P(St);return{subscribe:t}}(),zt=new $t;const Lt=function(){const{subscribe:t,set:e,update:s}=P(zt);return{setDefault:function(t){e(function(t,e){let s=0;const n={};j.forEach((t=>{[L.C,L.D,L.E,L.F,L.G,L.A,L.B].forEach((e=>{[R.flat,R.none,R.sharp].forEach((l=>{const o=new Y(e,l,t,J.topNote,s++);if(U.includes(o.fullName))return;const a=new yt(o,Q.note);n[a.fullName]=a}))}))}));for(let l in n){const t=n[l];e.addNote(t)}return e}(0,zt))},subscribe:t}}();function Ht(t){let e,s,l,i,g,v,m;return l=new Et({props:{tune:t[0]}}),v=new Pt({props:{track:t[1],tune:t[0]}}),{c(){e=n("div"),s=n("section"),D(l.$$.fragment),i=o(),g=n("section"),D(v.$$.fragment),this.h()},l(t){e=a(t,"DIV",{class:!0});var n=r(e);s=a(n,"SECTION",{});var o=r(s);T(l.$$.fragment,o),o.forEach(h),i=c(n),g=a(n,"SECTION",{id:!0,class:!0});var f=r(g);T(v.$$.fragment,f),f.forEach(h),n.forEach(h),this.h()},h(){f(g,"id","track"),f(g,"class","svelte-gg9dru"),f(e,"class","container svelte-gg9dru")},m(t,n){u(t,e,n),p(e,s),B(l,s,null),p(e,i),p(e,g),B(v,g,null),m=!0},p(t,[e]){const s={};1&e&&(s.tune=t[0]),l.$set(s);const n={};2&e&&(n.track=t[1]),1&e&&(n.tune=t[0]),v.$set(n)},i(t){m||(A(l.$$.fragment,t),A(v.$$.fragment,t),m=!0)},o(t){I(l.$$.fragment,t),I(v.$$.fragment,t),m=!1},d(t){t&&h(e),C(l),C(v)}}}function Ut(t,e,s){let n,l;return xt.subscribe((t=>s(0,n=t))),Lt.subscribe((t=>s(1,l=t))),S((()=>{et.loadSounds(),l.notes.length||Lt.setDefault(n)})),[n,l]}class jt extends t{constructor(t){super(),e(this,t,Ut,Ht,s,{})}}export{jt as default};
