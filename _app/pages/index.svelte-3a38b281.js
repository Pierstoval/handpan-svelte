import{S as De,i as Ae,s as Be,e as v,t as z,k as w,c as N,a as b,g as U,n as P,d as h,b as k,f as B,H as u,I as ne,J as Oe,K as pe,L as _e,h as ze,M as Ce,N as Ze,A as qe,z as dt,O as He,C as gt,l as Ge,j as le,m as oe,o as ae,P as we,x as Y,u as Z,v as ie,r as Ke,Q as xe,w as Je,R as Pe,T as Ie,U as et,V as mt}from"../chunks/vendor-94ddff04.js";var vt;(function(t){t.left="left",t.right="right"})(vt||(vt={}));var X;(function(t){t.A="A",t.B="B",t.C="C",t.D="D",t.E="E",t.F="F",t.G="G"})(X||(X={}));const qt=["Cb2","C2","C#2","Db2","D2","D#2","Eb2","A#5","B1","Bb5","B5","B#5","C6"],tt=[2,3,4,5],Kt={C:24,D:26,E:28,F:29,G:31,A:33,B:35};var R;(function(t){t.none="",t.sharp="#",t.flat="b"})(R||(R={}));var ee;(function(t){t.topNote="topNote",t.bottomNote="bottomNote",t.ding="ding"})(ee||(ee={}));var re;(function(t){t.note="note",t.slap="slap",t.ghost="ghost",t.none="none"})(re||(re={}));class be{constructor(e,n,s,l,r){if(this._isPlaying=!1,this._note=e,this._alteration=n,this._octave=s,this._type=l,this._position=r,r<0)throw new Error("Note position must be a non-negative integer.");this.refresh(),this.refreshHtmlElement()}get htmlElement(){return this._htmlElement}set htmlElement(e){if(!e){console.warn("Tried to set empty html element to handpan note.");return}this._htmlElement=e}get octave(){return this._octave}set octave(e){this._octave=e,this.refresh()}get alteration(){return this._alteration}set alteration(e){this._alteration=e,this.refresh()}get note(){return this._note}set note(e){this._note=e,this.refresh()}get type(){return this._type}get position(){return this._position}get fullName(){return this._note+this._alteration+this._octave}get isPlaying(){return this._isPlaying}get fullDetailedName(){return this._position+" - "+this.fullName+(this.isDing?" (ding)":"")+(this.isBottom?" (bottom)":"")}get isTop(){return this._type===ee.topNote}get isDing(){return this._type===ee.ding}get isBottom(){return this._type===ee.bottomNote}get midiNumber(){let e=Kt[this._note.toString()]+(this._octave-1)*12;return this._alteration===R.sharp?e++:this._alteration===R.flat&&e--,e}forcePosition(e){this._position=e}setPlaying(){if(!this._htmlElement){console.warn("Playing note is not attached to any HTML element. The issue might be that this not is not in your current handpan tune.");return}this._isPlaying=!0,this._htmlElement.classList.add("playing"),this._htmlElement.firstElementChild.classList.add("playing")}stopPlaying(){!this._htmlElement||(this._isPlaying=!1,this._htmlElement.classList.remove("playing"),this._htmlElement.firstElementChild.classList.remove("playing"))}refreshHtmlElement(){if(typeof document=="undefined")return;const e=document.querySelector(`[data-handpan-note="${this.fullName}"]`);e&&(this.htmlElement=e)}refresh(){const e={"B#":[X.C,R.none,1],"E#":[X.F,R.none,0],Ab:[X.G,R.sharp,0],Bb:[X.A,R.sharp,0],Cb:[X.B,R.none,-1],Db:[X.C,R.none,0],Eb:[X.D,R.sharp,0],Fb:[X.E,R.none,0],Gb:[X.F,R.sharp,0]},n=this._note+this._alteration,s=e[n];if(!s)return;let l;l&&(this._octave+l<Math.min(...tt)||this._octave+l<Math.max(...tt))||([this._note,this._alteration,l]=s,l&&(this._octave+=l))}}const Qe={clac:"clac/clac.flac",gu:"gu/D2.flac",notes:{E2:"shellopan/E2.flac",F2:"shellopan/F2.flac","F#2":"shellopan/Fs2.flac",G2:"shellopan/G2.flac","G#2":"shellopan/Gs2.flac",A2:"shellopan/A2.flac","A#2":"shellopan/As2.flac",B2:"shellopan/B2.flac",C3:"shellopan/C3.flac","C#3":"shellopan/Cs3.flac",D3:"shellopan/D3.flac","D#3":"shellopan/Ds3.flac",E3:"shellopan/E3.flac",F3:"shellopan/F3.flac","F#3":"shellopan/Fs3.flac",G3:"shellopan/G3.flac","G#3":"shellopan/Gs3.flac",A3:"shellopan/A3.flac","A#3":"shellopan/As3.flac",B3:"shellopan/B3.flac",C4:"shellopan/C4.flac","C#4":"shellopan/Cs4.flac",D4:"shellopan/D4.flac","D#4":"shellopan/Ds4.flac",E4:"shellopan/E4.flac",F4:"shellopan/F4.flac","F#4":"shellopan/Fs4.flac",G4:"shellopan/G4.flac","G#4":"shellopan/Gs4.flac",A4:"shellopan/A4.flac","A#4":"shellopan/As4.flac",B4:"shellopan/B4.flac",C5:"shellopan/C5.flac","C#5":"shellopan/Cs5.flac",D5:"shellopan/D5.flac","D#5":"shellopan/Ds5.flac",E5:"shellopan/E5.flac",F5:"shellopan/F5.flac","F#5":"shellopan/Fs5.flac",G5:"shellopan/G5.flac","G#5":"shellopan/Gs5.flac",A5:"shellopan/A5.flac"}},Nt=class{static get isPlaying(){return this._isPlaying}static loadAudioFiles(){this.loadAudioFile("clac",Qe.clac),this.loadAudioFile("gu",Qe.gu);for(const t in Qe.notes)this.loadAudioFile(t,Qe.notes[t])}static playTrack(t,e){this.stop(),this._isPlaying=!0;const n=this.getMsPerBeat(t.bpm,t.beat);let s=n;t.notes.forEach(l=>{this.addPlayingTimeout(()=>Nt.playNote(l),s),s+=n}),e&&this.addPlayingTimeout(e,s),this.addPlayingTimeout(()=>this.stop(),s)}static stop(){for(;this.playingTimeouts.length;)clearTimeout(this.playingTimeouts.shift());for(;this.playingNotes.length;)this.playingNotes.shift().stopPlaying();this.playingTimeouts=[],this.playingNotes=[],this._isPlaying=!1}static playNoteByType(t,e=1,n=null){if(!this.loadedAudio[t]){console.error(`Sound type "${t}" s not loaded or does not exist.`);return}const s=this.loadedAudio[t].cloneNode();if(s.volume=e,s.play(),n){const l=isNaN(s.duration)?this.DEFAULT_AUDIO_DURATION:s.duration;this.addPlayingTimeout(n,l)}}static playNote(t){switch(t.setPlaying(),this.playingNotes.push(t),!0){case t.isSlap:this.playNoteByType("clac",1,()=>this.stopNote(t));break;case t.isGhost:this.playNoteByType("clac",1,()=>this.stopNote(t));break;case t.isNone:break;default:this.playNoteByType(t.displayName,1,()=>this.stopNote(t));break}}static stopNote(t){t.stopPlaying(),this.playingNotes=this.playingNotes.filter(e=>e!==t)}static getMsPerBeat(t,e){return 1e3*60/t/e}static addPlayingTimeout(t,e){this.playingTimeouts.push(setTimeout(t,e))}static loadAudioFile(t,e){const n=new Audio;n.src=e,n.preload="auto",n.volume=1,n.addEventListener("canplaythrough",()=>this.loadedAudio[t]=n)}};let Ee=Nt;Ee.DEFAULT_AUDIO_DURATION=300;Ee._isPlaying=!1;Ee.loadedAudio={};Ee.playingTimeouts=[];Ee.playingNotes=[];function bt(t,e,n){const s=t.slice();return s[9]=e[n],s}function Et(t,e,n){const s=t.slice();return s[9]=e[n],s}function kt(t,e,n){const s=t.slice();return s[14]=e[n],s}function yt(t){let e,n=t[14]+"",s,l,r;return{c(){e=v("option"),s=z(n),l=w(),this.h()},l(o){e=N(o,"OPTION",{class:!0});var a=b(e);s=U(a,n),l=P(a),a.forEach(h),this.h()},h(){e.__value=r=t[14],e.value=e.__value,k(e,"class","svelte-k6ts2a")},m(o,a){B(o,e,a),u(e,s),u(e,l)},p:ne,d(o){o&&h(e)}}}function $t(t){let e,n=t[9]+"",s,l,r;return{c(){e=v("option"),s=z(n),l=w(),this.h()},l(o){e=N(o,"OPTION",{class:!0});var a=b(e);s=U(a,n),l=P(a),a.forEach(h),this.h()},h(){e.__value=r=t[9],e.value=e.__value,k(e,"class","svelte-k6ts2a")},m(o,a){B(o,e,a),u(e,s),u(e,l)},p:ne,d(o){o&&h(e)}}}function Tt(t){let e,n=t[9]+"",s,l,r;return{c(){e=v("option"),s=z(n),l=w(),this.h()},l(o){e=N(o,"OPTION",{class:!0});var a=b(e);s=U(a,n),l=P(a),a.forEach(h),this.h()},h(){e.__value=r=t[9],e.value=e.__value,k(e,"class","svelte-k6ts2a")},m(o,a){B(o,e,a),u(e,s),u(e,l)},p:ne,d(o){o&&h(e)}}}function Jt(t){let e,n,s,l=t[0].fullName+"",r,o,a,g,p,i,_,d,m,A,F,$,H,he,M,I,j,D,q,G,J,K,O,Q,ce,x,C,ye,E,S,W,ue=t[0].midiNumber+"",c,f,V,$e,Le,ge=t[1],te=[];for(let T=0;T<ge.length;T+=1)te[T]=yt(kt(t,ge,T));let me=t[2],L=[];for(let T=0;T<me.length;T+=1)L[T]=$t(Et(t,me,T));let Me=t[3],fe=[];for(let T=0;T<Me.length;T+=1)fe[T]=Tt(bt(t,Me,T));return{c(){e=v("div"),n=v("div"),s=v("div"),r=z(l),o=w(),a=v("div"),g=v("div"),p=v("h3"),i=z("Note"),_=w(),d=v("div"),m=v("select");for(let T=0;T<te.length;T+=1)te[T].c();A=w(),F=v("div"),$=v("h3"),H=z("Octave"),he=w(),M=v("div"),I=v("select");for(let T=0;T<L.length;T+=1)L[T].c();j=w(),D=v("div"),q=v("h3"),G=z("Alteration"),J=w(),K=v("div"),O=v("select");for(let T=0;T<fe.length;T+=1)fe[T].c();Q=w(),ce=v("div"),x=v("h4"),C=z("Info"),ye=w(),E=v("ul"),S=v("li"),W=z("Midi: "),c=z(ue),this.h()},l(T){e=N(T,"DIV",{class:!0,"data-handpan-note":!0});var se=b(e);n=N(se,"DIV",{class:!0});var y=b(n);s=N(y,"DIV",{class:!0});var ve=b(s);r=U(ve,l),ve.forEach(h),o=P(y),a=N(y,"DIV",{class:!0});var Te=b(a);g=N(Te,"DIV",{class:!0});var Xe=b(g);p=N(Xe,"H3",{});var lt=b(p);i=U(lt,"Note"),lt.forEach(h),_=P(Xe),d=N(Xe,"DIV",{class:!0});var ot=b(d);m=N(ot,"SELECT",{size:!0,class:!0});var at=b(m);for(let Ne=0;Ne<te.length;Ne+=1)te[Ne].l(at);at.forEach(h),ot.forEach(h),Xe.forEach(h),A=P(Te),F=N(Te,"DIV",{class:!0});var je=b(F);$=N(je,"H3",{});var it=b($);H=U(it,"Octave"),it.forEach(h),he=P(je),M=N(je,"DIV",{class:!0});var rt=b(M);I=N(rt,"SELECT",{size:!0,class:!0});var ht=b(I);for(let Ne=0;Ne<L.length;Ne+=1)L[Ne].l(ht);ht.forEach(h),rt.forEach(h),je.forEach(h),j=P(Te),D=N(Te,"DIV",{class:!0});var Re=b(D);q=N(Re,"H3",{});var ct=b(q);G=U(ct,"Alteration"),ct.forEach(h),J=P(Re),K=N(Re,"DIV",{class:!0});var ft=b(K);O=N(ft,"SELECT",{size:!0,class:!0});var ut=b(O);for(let Ne=0;Ne<fe.length;Ne+=1)fe[Ne].l(ut);ut.forEach(h),ft.forEach(h),Re.forEach(h),Q=P(Te),ce=N(Te,"DIV",{});var We=b(ce);x=N(We,"H4",{});var _t=b(x);C=U(_t,"Info"),_t.forEach(h),ye=P(We),E=N(We,"UL",{});var pt=b(E);S=N(pt,"LI",{});var Ye=b(S);W=U(Ye,"Midi: "),c=U(Ye,ue),Ye.forEach(h),pt.forEach(h),We.forEach(h),Te.forEach(h),y.forEach(h),se.forEach(h),this.h()},h(){k(s,"class","note-name svelte-k6ts2a"),k(m,"size",t[1].length),k(m,"class","svelte-k6ts2a"),t[0].note===void 0&&Oe(()=>t[6].call(m)),k(d,"class","select_container svelte-k6ts2a"),k(g,"class","inputs_container svelte-k6ts2a"),k(I,"size",t[2].length),k(I,"class","svelte-k6ts2a"),t[0].octave===void 0&&Oe(()=>t[7].call(I)),k(M,"class","select_container svelte-k6ts2a"),k(F,"class","inputs_container svelte-k6ts2a"),k(O,"size",t[3].length),k(O,"class","svelte-k6ts2a"),t[0].alteration===void 0&&Oe(()=>t[8].call(O)),k(K,"class","select_container svelte-k6ts2a"),k(D,"class","inputs_container svelte-k6ts2a"),k(a,"class","note-menu  svelte-k6ts2a"),k(n,"class",f="note "+(t[0].isPlaying?"playing":"")+" svelte-k6ts2a"),k(e,"class","note-container svelte-k6ts2a"),k(e,"data-handpan-note",V=t[0].fullName)},m(T,se){B(T,e,se),u(e,n),u(n,s),u(s,r),u(n,o),u(n,a),u(a,g),u(g,p),u(p,i),u(g,_),u(g,d),u(d,m);for(let y=0;y<te.length;y+=1)te[y].m(m,null);pe(m,t[0].note),u(a,A),u(a,F),u(F,$),u($,H),u(F,he),u(F,M),u(M,I);for(let y=0;y<L.length;y+=1)L[y].m(I,null);pe(I,t[0].octave),u(a,j),u(a,D),u(D,q),u(q,G),u(D,J),u(D,K),u(K,O);for(let y=0;y<fe.length;y+=1)fe[y].m(O,null);pe(O,t[0].alteration),u(a,Q),u(a,ce),u(ce,x),u(x,C),u(ce,ye),u(ce,E),u(E,S),u(S,W),u(S,c),$e||(Le=[_e(m,"change",t[6]),_e(m,"change",t[4]),_e(I,"change",t[7]),_e(I,"change",t[4]),_e(O,"change",t[8]),_e(O,"change",t[4])],$e=!0)},p(T,[se]){if(se&1&&l!==(l=T[0].fullName+"")&&ze(r,l),se&2){ge=T[1];let y;for(y=0;y<ge.length;y+=1){const ve=kt(T,ge,y);te[y]?te[y].p(ve,se):(te[y]=yt(ve),te[y].c(),te[y].m(m,null))}for(;y<te.length;y+=1)te[y].d(1);te.length=ge.length}if(se&3&&pe(m,T[0].note),se&4){me=T[2];let y;for(y=0;y<me.length;y+=1){const ve=Et(T,me,y);L[y]?L[y].p(ve,se):(L[y]=$t(ve),L[y].c(),L[y].m(I,null))}for(;y<L.length;y+=1)L[y].d(1);L.length=me.length}if(se&3&&pe(I,T[0].octave),se&8){Me=T[3];let y;for(y=0;y<Me.length;y+=1){const ve=bt(T,Me,y);fe[y]?fe[y].p(ve,se):(fe[y]=Tt(ve),fe[y].c(),fe[y].m(O,null))}for(;y<fe.length;y+=1)fe[y].d(1);fe.length=Me.length}se&3&&pe(O,T[0].alteration),se&1&&ue!==(ue=T[0].midiNumber+"")&&ze(c,ue),se&3&&f!==(f="note "+(T[0].isPlaying?"playing":"")+" svelte-k6ts2a")&&k(n,"class",f),se&3&&V!==(V=T[0].fullName)&&k(e,"data-handpan-note",V)},i:ne,o:ne,d(T){T&&h(e),Ce(te,T),Ce(L,T),Ce(fe,T),$e=!1,Ze(Le)}}}function Qt(t,e,n){let{note:s}=e,{onChange:l}=e;const r=Object.values(X),o=[1,2,3,4,5],a=Object.values(R);function g(){l&&l(s),Ee.playNoteByType(s.fullName)}qe(()=>s.refreshHtmlElement()),dt(()=>s.refreshHtmlElement());function p(){s.note=He(this),n(0,s),n(1,r)}function i(){s.octave=He(this),n(0,s),n(1,r)}function _(){s.alteration=He(this),n(0,s),n(1,r)}return t.$$set=d=>{"note"in d&&n(0,s=d.note),"onChange"in d&&n(5,l=d.onChange)},[s,r,o,a,g,l,p,i,_]}class nt extends De{constructor(e){super();Ae(this,e,Qt,Jt,Be,{note:0,onChange:5})}}class Yt{constructor(e){this._topNotes=[],this._dings=[],this._bottomNotes=[],e.forEach(n=>this.addNote(n)),this.refresh()}get dings(){return this._dings}get topNotes(){return this._topNotes}get bottomNotes(){return this._bottomNotes}get numberOfNotes(){return this._topNotes.length+this._dings.length+this._bottomNotes.length}get notes(){return this._notes||[]}addNote(e){e.isTop?(this._topNotes.push(e),e.forcePosition(this._topNotes.length)):e.isDing?(this._dings.push(e),e.forcePosition(this._dings.length)):e.isBottom&&(this._bottomNotes.push(e),e.forcePosition(this._topNotes.length))}addNoteAt(e,n){console.info("OK");debugger}getTopNoteByPosition(e){for(const n of this._topNotes)if(n.position===e)return n;return null}getBottomNoteByPosition(e){for(const n of this._bottomNotes)if(n.position===e)return n;return null}getDingByPosition(e){for(const n of this._dings)if(n.position===e)return n;return null}getSameNote(e){let n=null;switch(!0){case e.isTop:n=this.getTopNoteByPosition(e.position);break;case e.isDing:n=this.getDingByPosition(e.position);break;case e.isBottom:n=this.getBottomNoteByPosition(e.position);break;default:throw new Error("Expected note to be either top, ding or bottom, and found an unsupported value.")}return n}refresh(){const e=(n,s)=>{const l=n.position,r=s.position;switch(!0){case l<r:return-1;case l===r:throw new Error("Two notes cannot have the same position!");case l>r:return 1}};this._topNotes.sort(e),this._dings.sort(e),this._bottomNotes.sort(e)}}const{subscribe:Zt,set:Dt,update:An}=gt(At());function At(){return en()}function xt(){Dt(At())}function en(){return new Yt([new be(X.C,R.sharp,3,ee.bottomNote,0),new be(X.G,R.none,3,ee.ding,0),new be(X.A,R.none,3,ee.topNote,0),new be(X.B,R.none,3,ee.topNote,1),new be(X.C,R.sharp,4,ee.topNote,2),new be(X.D,R.sharp,4,ee.topNote,3),new be(X.E,R.none,4,ee.topNote,4),new be(X.F,R.sharp,4,ee.topNote,5),new be(X.G,R.sharp,4,ee.topNote,6)])}const Ue={setDefault:xt,subscribe:Zt,set:Dt};function tn(t){let e,n,s,l,r;return{c(){e=v("div"),n=v("div"),s=z("+"),this.h()},l(o){e=N(o,"DIV",{class:!0});var a=b(e);n=N(a,"DIV",{class:!0});var g=b(n);s=U(g,"+"),g.forEach(h),a.forEach(h),this.h()},h(){k(n,"class","handpan-note svelte-4kftzj"),k(e,"class","handpan-note-container svelte-4kftzj")},m(o,a){B(o,e,a),u(e,n),u(n,s),l||(r=_e(n,"click",t[0]),l=!0)},p:ne,i:ne,o:ne,d(o){o&&h(e),l=!1,r()}}}function nn(t,e,n){let{position:s}=e,{type:l}=e,{tune:r}=e;Ue.subscribe(a=>n(1,r=a||r));function o(){r.addNoteAt(s,l),Ue.set(r)}return t.$$set=a=>{"position"in a&&n(2,s=a.position),"type"in a&&n(3,l=a.type),"tune"in a&&n(1,r=a.tune)},[o,r,s,l]}class Se extends De{constructor(e){super();Ae(this,e,nn,tn,Be,{position:2,type:3,tune:1})}}function Bt(t,e,n){const s=t.slice();return s[4]=e[n],s[5]=e,s[6]=n,s}function wt(t,e,n){const s=t.slice();return s[4]=e[n],s[7]=e,s[6]=n,s}function Pt(t,e,n){const s=t.slice();return s[4]=e[n],s[8]=e,s[6]=n,s}function It(t,e){let n,s,l,r,o,a;function g(i){e[1](i,e[4],e[8],e[6])}let p={onChange:st};return e[4]!==void 0&&(p.note=e[4]),s=new nt({props:p}),Pe.push(()=>Ie(s,"note",g)),o=new Se({props:{position:e[6],type:ee.topNote}}),{key:t,first:null,c(){n=Ge(),le(s.$$.fragment),r=w(),le(o.$$.fragment),this.h()},l(i){n=Ge(),oe(s.$$.fragment,i),r=P(i),oe(o.$$.fragment,i),this.h()},h(){this.first=n},m(i,_){B(i,n,_),ae(s,i,_),B(i,r,_),ae(o,i,_),a=!0},p(i,_){e=i;const d={};!l&&_&1&&(l=!0,d.note=e[4],we(()=>l=!1)),s.$set(d);const m={};_&1&&(m.position=e[6]),o.$set(m)},i(i){a||(Y(s.$$.fragment,i),Y(o.$$.fragment,i),a=!0)},o(i){Z(s.$$.fragment,i),Z(o.$$.fragment,i),a=!1},d(i){i&&h(n),ie(s,i),i&&h(r),ie(o,i)}}}function Ct(t,e){let n,s,l,r,o,a;function g(i){e[2](i,e[4],e[7],e[6])}let p={onChange:st};return e[4]!==void 0&&(p.note=e[4]),s=new nt({props:p}),Pe.push(()=>Ie(s,"note",g)),o=new Se({props:{position:e[6],type:ee.ding}}),{key:t,first:null,c(){n=Ge(),le(s.$$.fragment),r=w(),le(o.$$.fragment),this.h()},l(i){n=Ge(),oe(s.$$.fragment,i),r=P(i),oe(o.$$.fragment,i),this.h()},h(){this.first=n},m(i,_){B(i,n,_),ae(s,i,_),B(i,r,_),ae(o,i,_),a=!0},p(i,_){e=i;const d={};!l&&_&1&&(l=!0,d.note=e[4],we(()=>l=!1)),s.$set(d);const m={};_&1&&(m.position=e[6]),o.$set(m)},i(i){a||(Y(s.$$.fragment,i),Y(o.$$.fragment,i),a=!0)},o(i){Z(s.$$.fragment,i),Z(o.$$.fragment,i),a=!1},d(i){i&&h(n),ie(s,i),i&&h(r),ie(o,i)}}}function Vt(t,e){let n,s,l,r,o,a;function g(i){e[3](i,e[4],e[5],e[6])}let p={onChange:st};return e[4]!==void 0&&(p.note=e[4]),s=new nt({props:p}),Pe.push(()=>Ie(s,"note",g)),o=new Se({props:{position:e[6],type:ee.bottomNote}}),{key:t,first:null,c(){n=Ge(),le(s.$$.fragment),r=w(),le(o.$$.fragment),this.h()},l(i){n=Ge(),oe(s.$$.fragment,i),r=P(i),oe(o.$$.fragment,i),this.h()},h(){this.first=n},m(i,_){B(i,n,_),ae(s,i,_),B(i,r,_),ae(o,i,_),a=!0},p(i,_){e=i;const d={};!l&&_&1&&(l=!0,d.note=e[4],we(()=>l=!1)),s.$set(d);const m={};_&1&&(m.position=e[6]),o.$set(m)},i(i){a||(Y(s.$$.fragment,i),Y(o.$$.fragment,i),a=!0)},o(i){Z(s.$$.fragment,i),Z(o.$$.fragment,i),a=!1},d(i){i&&h(n),ie(s,i),i&&h(r),ie(o,i)}}}function sn(t){let e,n,s,l,r,o,a,g,p,i=[],_=new Map,d,m,A,F,$,H,he,M=[],I=new Map,j,D,q,G,J,K,O,Q=[],ce=new Map,x;g=new Se({props:{position:"0",type:ee.topNote}});let C=t[0].topNotes;const ye=c=>c[4];for(let c=0;c<C.length;c+=1){let f=Pt(t,C,c),V=ye(f);_.set(V,i[c]=It(V,f))}H=new Se({props:{position:"0",type:ee.ding}});let E=t[0].dings;const S=c=>c[4];for(let c=0;c<E.length;c+=1){let f=wt(t,E,c),V=S(f);I.set(V,M[c]=Ct(V,f))}K=new Se({props:{position:"0",type:ee.bottomNote}});let W=t[0].bottomNotes;const ue=c=>c[4];for(let c=0;c<W.length;c+=1){let f=Bt(t,W,c),V=ue(f);ce.set(V,Q[c]=Vt(V,f))}return{c(){e=v("h2"),n=z("Tune"),s=w(),l=v("h3"),r=z("Top notes:"),o=w(),a=v("div"),le(g.$$.fragment),p=w();for(let c=0;c<i.length;c+=1)i[c].c();d=w(),m=v("h3"),A=z("Dings:"),F=w(),$=v("div"),le(H.$$.fragment),he=w();for(let c=0;c<M.length;c+=1)M[c].c();j=w(),D=v("h3"),q=z("Bottom notes:"),G=w(),J=v("div"),le(K.$$.fragment),O=w();for(let c=0;c<Q.length;c+=1)Q[c].c();this.h()},l(c){e=N(c,"H2",{});var f=b(e);n=U(f,"Tune"),f.forEach(h),s=P(c),l=N(c,"H3",{});var V=b(l);r=U(V,"Top notes:"),V.forEach(h),o=P(c),a=N(c,"DIV",{class:!0});var $e=b(a);oe(g.$$.fragment,$e),p=P($e);for(let L=0;L<i.length;L+=1)i[L].l($e);$e.forEach(h),d=P(c),m=N(c,"H3",{});var Le=b(m);A=U(Le,"Dings:"),Le.forEach(h),F=P(c),$=N(c,"DIV",{class:!0});var ge=b($);oe(H.$$.fragment,ge),he=P(ge);for(let L=0;L<M.length;L+=1)M[L].l(ge);ge.forEach(h),j=P(c),D=N(c,"H3",{});var te=b(D);q=U(te,"Bottom notes:"),te.forEach(h),G=P(c),J=N(c,"DIV",{class:!0});var me=b(J);oe(K.$$.fragment,me),O=P(me);for(let L=0;L<Q.length;L+=1)Q[L].l(me);me.forEach(h),this.h()},h(){k(a,"class","notes-list"),k($,"class","notes-list"),k(J,"class","notes-list")},m(c,f){B(c,e,f),u(e,n),B(c,s,f),B(c,l,f),u(l,r),B(c,o,f),B(c,a,f),ae(g,a,null),u(a,p);for(let V=0;V<i.length;V+=1)i[V].m(a,null);B(c,d,f),B(c,m,f),u(m,A),B(c,F,f),B(c,$,f),ae(H,$,null),u($,he);for(let V=0;V<M.length;V+=1)M[V].m($,null);B(c,j,f),B(c,D,f),u(D,q),B(c,G,f),B(c,J,f),ae(K,J,null),u(J,O);for(let V=0;V<Q.length;V+=1)Q[V].m(J,null);x=!0},p(c,[f]){f&1&&(C=c[0].topNotes,Ke(),i=xe(i,f,ye,1,c,C,_,a,et,It,null,Pt),Je()),f&1&&(E=c[0].dings,Ke(),M=xe(M,f,S,1,c,E,I,$,et,Ct,null,wt),Je()),f&1&&(W=c[0].bottomNotes,Ke(),Q=xe(Q,f,ue,1,c,W,ce,J,et,Vt,null,Bt),Je())},i(c){if(!x){Y(g.$$.fragment,c);for(let f=0;f<C.length;f+=1)Y(i[f]);Y(H.$$.fragment,c);for(let f=0;f<E.length;f+=1)Y(M[f]);Y(K.$$.fragment,c);for(let f=0;f<W.length;f+=1)Y(Q[f]);x=!0}},o(c){Z(g.$$.fragment,c);for(let f=0;f<i.length;f+=1)Z(i[f]);Z(H.$$.fragment,c);for(let f=0;f<M.length;f+=1)Z(M[f]);Z(K.$$.fragment,c);for(let f=0;f<Q.length;f+=1)Z(Q[f]);x=!1},d(c){c&&h(e),c&&h(s),c&&h(l),c&&h(o),c&&h(a),ie(g);for(let f=0;f<i.length;f+=1)i[f].d();c&&h(d),c&&h(m),c&&h(F),c&&h($),ie(H);for(let f=0;f<M.length;f+=1)M[f].d();c&&h(j),c&&h(D),c&&h(G),c&&h(J),ie(K);for(let f=0;f<Q.length;f+=1)Q[f].d()}}}function st(t){console.info("change note",t)}function ln(t,e,n){let s;Ue.subscribe(a=>n(0,s=a||s));function l(a,g,p,i){p[i]=a,n(0,s)}function r(a,g,p,i){p[i]=a,n(0,s)}function o(a,g,p,i){p[i]=a,n(0,s)}return[s,l,r,o]}class on extends De{constructor(e){super();Ae(this,e,ln,sn,Be,{})}}class de{get htmlElement(){return this._htmlElement}set htmlElement(e){if(!e){console.error("Tried to set empty html element to track note.");return}this._htmlElement=e}get fullName(){var e,n;switch(!0){case this.isSlap:return"\xD7";case this.isGhost:return"\u{1F47B}";case this.isNone:return"\u2014";default:return(n=(e=this.note)==null?void 0:e.fullName)!=null?n:"-"}}get displayName(){if(!this.isNote)throw new Error(`Note name for the music player can only be retrieved on notes. Current note is "${this.type}".`);return this.note.fullName}get isNote(){return this.type===re.note}get isSlap(){return this.type===re.slap}get isGhost(){return this.type===re.ghost}get isNone(){return this.type===re.none}constructor(e,n){this.note=e,this.type=n,this.refreshHtmlElement()}static createGhost(){return new de(null,re.ghost)}setPlaying(){if(!this._htmlElement){console.error(`Cannot highlight note ${this.fullName} because it does not have an HTML Element associated to it.`);return}this._htmlElement.firstElementChild.classList.add("playing"),this.note&&this.note.setPlaying()}stopPlaying(){if(!this._htmlElement){console.error(`Cannot disable highlight for note ${this.fullName} because it does not have an HTML Element associated to it.`);return}this._htmlElement.firstElementChild.classList.remove("playing"),this.note&&this.note.stopPlaying()}syncWithTuneNote(e){this.refreshHtmlElement(),!!e&&(this.note=e,e.refreshHtmlElement())}refreshHtmlElement(){if(typeof document=="undefined")return;const e=document.querySelector(`[data-track-note="${this.fullName}"]`);e&&(this.htmlElement=e)}}const Ve=class{constructor(t){this._bpm=120,this._beat=4,this._notes=[],this._name=t}get name(){return this._name}get notes(){return this._notes}get bpm(){return this._bpm}set bpm(t){t<=0&&(t=1),t>Ve.MAX_BPM&&(t=Ve.MAX_BPM),this._bpm=t}get beat(){return this._beat}set beat(t){t<Ve.MIN_BEAT&&(t=Ve.MIN_BEAT),t>Ve.MAX_BEAT&&(t=Ve.MAX_BEAT),this._beat=t}addNoteAt(t){const e=de.createGhost();this._notes.splice(t,0,e)}addNote(t){this._notes.push(t)}syncWithTune(t){this._notes.forEach(e=>{e.syncWithTuneNote(t.getSameNote(e.note))})}};let ke=Ve;ke.MIN_BPM=50;ke.MAX_BPM=200;ke.MIN_BEAT=2;ke.MAX_BEAT=8;const{subscribe:an,set:Ft,update:Bn}=gt(Mt());function rn(t){return t?[Ot(),cn(t)]:[]}function hn(){Ft(Mt())}function Mt(){return Ot()}function cn(t){const e=new ke("Demo");return e.addNote(new de(t.getDingByPosition(0),re.note)),e.addNote(new de(t.getTopNoteByPosition(2),re.note)),e.addNote(new de(null,re.slap)),e.addNote(new de(t.getTopNoteByPosition(4),re.note)),e.addNote(new de(t.getDingByPosition(0),re.note)),e.addNote(new de(t.getTopNoteByPosition(3),re.note)),e.addNote(new de(null,re.slap)),e.addNote(new de(t.getTopNoteByPosition(5),re.note)),e}function Ot(){let t=0;const e={},n=new ke("All notes");n.bpm=180,tt.forEach(s=>{[X.C,X.D,X.E,X.F,X.G,X.A,X.B].forEach(r=>{[R.flat,R.none,R.sharp].forEach(a=>{const g=new be(r,a,s,ee.topNote,t++);if(qt.includes(g.fullName))return;const p=new de(g,re.note);e[p.fullName]=p})})});for(let s in e){const l=e[s];n.addNote(l)}return n}const Fe={list:rn,setDefault:hn,subscribe:an,set:Ft};function Ht(t,e,n){const s=t.slice();return s[6]=e[n],s}function Gt(t,e,n){const s=t.slice();return s[9]=e[n],s}function St(t){let e,n=t[9]+"",s,l,r;return{c(){e=v("option"),s=z(n),l=w(),this.h()},l(o){e=N(o,"OPTION",{class:!0});var a=b(e);s=U(a,n),l=P(a),a.forEach(h),this.h()},h(){e.__value=r=t[9],e.value=e.__value,k(e,"class","svelte-fx1r0p")},m(o,a){B(o,e,a),u(e,s),u(e,l)},p:ne,d(o){o&&h(e)}}}function Lt(t){let e,n,s,l,r,o,a,g,p,i=t[1].notes,_=[];for(let d=0;d<i.length;d+=1)_[d]=zt(Ht(t,i,d));return{c(){e=v("div"),n=v("h3"),s=z("Note"),l=w(),r=v("div"),o=v("select");for(let d=0;d<_.length;d+=1)_[d].c();this.h()},l(d){e=N(d,"DIV",{class:!0});var m=b(e);n=N(m,"H3",{});var A=b(n);s=U(A,"Note"),A.forEach(h),l=P(m),r=N(m,"DIV",{class:!0});var F=b(r);o=N(F,"SELECT",{size:!0,class:!0});var $=b(o);for(let H=0;H<_.length;H+=1)_[H].l($);$.forEach(h),F.forEach(h),m.forEach(h),this.h()},h(){k(o,"size",a=t[1].numberOfNotes),k(o,"class","svelte-fx1r0p"),t[0].note===void 0&&Oe(()=>t[5].call(o)),k(r,"class","track_select_container svelte-fx1r0p"),k(e,"class","track_inputs_container svelte-fx1r0p")},m(d,m){B(d,e,m),u(e,n),u(n,s),u(e,l),u(e,r),u(r,o);for(let A=0;A<_.length;A+=1)_[A].m(o,null);pe(o,t[0].note),g||(p=[_e(o,"change",t[5]),_e(o,"change",t[3])],g=!0)},p(d,m){if(m&2){i=d[1].notes;let A;for(A=0;A<i.length;A+=1){const F=Ht(d,i,A);_[A]?_[A].p(F,m):(_[A]=zt(F),_[A].c(),_[A].m(o,null))}for(;A<_.length;A+=1)_[A].d(1);_.length=i.length}m&2&&a!==(a=d[1].numberOfNotes)&&k(o,"size",a),m&5&&pe(o,d[0].note)},d(d){d&&h(e),Ce(_,d),g=!1,Ze(p)}}}function zt(t){let e,n=t[6].fullDetailedName+"",s,l,r;return{c(){e=v("option"),s=z(n),l=w(),this.h()},l(o){e=N(o,"OPTION",{class:!0});var a=b(e);s=U(a,n),l=P(a),a.forEach(h),this.h()},h(){e.__value=r=t[6],e.value=e.__value,k(e,"class","svelte-fx1r0p")},m(o,a){B(o,e,a),u(e,s),u(e,l)},p(o,a){a&2&&n!==(n=o[6].fullDetailedName+"")&&ze(s,n),a&2&&r!==(r=o[6])&&(e.__value=r,e.value=e.__value)},d(o){o&&h(e)}}}function fn(t){let e,n,s,l=t[0].fullName+"",r,o,a,g,p,i,_,d,m,A,F,$,H,he,M=t[2],I=[];for(let D=0;D<M.length;D+=1)I[D]=St(Gt(t,M,D));let j=t[0]&&t[1]&&t[0].isNote&&Lt(t);return{c(){e=v("div"),n=v("div"),s=v("div"),r=z(l),o=w(),a=v("div"),g=v("div"),p=v("h3"),i=z("Type"),_=w(),d=v("div"),m=v("select");for(let D=0;D<I.length;D+=1)I[D].c();A=w(),j&&j.c(),this.h()},l(D){e=N(D,"DIV",{class:!0,"data-track-note":!0});var q=b(e);n=N(q,"DIV",{class:!0});var G=b(n);s=N(G,"DIV",{class:!0});var J=b(s);r=U(J,l),J.forEach(h),o=P(G),a=N(G,"DIV",{class:!0});var K=b(a);g=N(K,"DIV",{class:!0});var O=b(g);p=N(O,"H3",{});var Q=b(p);i=U(Q,"Type"),Q.forEach(h),_=P(O),d=N(O,"DIV",{class:!0});var ce=b(d);m=N(ce,"SELECT",{size:!0,class:!0});var x=b(m);for(let C=0;C<I.length;C+=1)I[C].l(x);x.forEach(h),ce.forEach(h),O.forEach(h),A=P(K),j&&j.l(K),K.forEach(h),G.forEach(h),q.forEach(h),this.h()},h(){k(s,"class","note-name svelte-fx1r0p"),k(m,"size",t[2].length),k(m,"class","svelte-fx1r0p"),t[0].type===void 0&&Oe(()=>t[4].call(m)),k(d,"class","track_select_container svelte-fx1r0p"),k(g,"class","track_inputs_container svelte-fx1r0p"),k(a,"class","track-note-menu svelte-fx1r0p"),k(n,"class",F="track-note type-"+t[0].type+" svelte-fx1r0p"),k(e,"class","track-note-container svelte-fx1r0p"),k(e,"data-track-note",$=t[0].fullName)},m(D,q){B(D,e,q),u(e,n),u(n,s),u(s,r),u(n,o),u(n,a),u(a,g),u(g,p),u(p,i),u(g,_),u(g,d),u(d,m);for(let G=0;G<I.length;G+=1)I[G].m(m,null);pe(m,t[0].type),u(a,A),j&&j.m(a,null),H||(he=_e(m,"change",t[4]),H=!0)},p(D,[q]){if(q&1&&l!==(l=D[0].fullName+"")&&ze(r,l),q&4){M=D[2];let G;for(G=0;G<M.length;G+=1){const J=Gt(D,M,G);I[G]?I[G].p(J,q):(I[G]=St(J),I[G].c(),I[G].m(m,null))}for(;G<I.length;G+=1)I[G].d(1);I.length=M.length}q&5&&pe(m,D[0].type),D[0]&&D[1]&&D[0].isNote?j?j.p(D,q):(j=Lt(D),j.c(),j.m(a,null)):j&&(j.d(1),j=null),q&5&&F!==(F="track-note type-"+D[0].type+" svelte-fx1r0p")&&k(n,"class",F),q&5&&$!==($=D[0].fullName)&&k(e,"data-track-note",$)},i:ne,o:ne,d(D){D&&h(e),Ce(I,D),j&&j.d(),H=!1,he()}}}function un(t,e,n){let{trackNote:s}=e,{tune:l}=e;const r=Object.values(re);Fe.subscribe(p=>{p&&s.refreshHtmlElement()});function o(){Ee.playNote(s)}qe(()=>s.refreshHtmlElement()),dt(()=>s.refreshHtmlElement());function a(){s.type=He(this),n(0,s),n(2,r)}function g(){s.note=He(this),n(0,s),n(2,r)}return t.$$set=p=>{"trackNote"in p&&n(0,s=p.trackNote),"tune"in p&&n(1,l=p.tune)},[s,l,r,o,a,g]}class _n extends De{constructor(e){super();Ae(this,e,un,fn,Be,{trackNote:0,tune:1})}}function pn(t){let e,n,s,l,r;return{c(){e=v("div"),n=v("div"),s=z("+"),this.h()},l(o){e=N(o,"DIV",{class:!0});var a=b(e);n=N(a,"DIV",{class:!0});var g=b(n);s=U(g,"+"),g.forEach(h),a.forEach(h),this.h()},h(){k(n,"class","track-note svelte-1fwam0t"),k(e,"class","track-note-container svelte-1fwam0t")},m(o,a){B(o,e,a),u(e,n),u(n,s),l||(r=_e(n,"click",t[0]),l=!0)},p:ne,i:ne,o:ne,d(o){o&&h(e),l=!1,r()}}}function dn(t,e,n){let{position:s}=e,{track:l}=e;Fe.subscribe(o=>n(1,l=o||l));function r(){l.addNoteAt(s),Fe.set(l)}return t.$$set=o=>{"position"in o&&n(2,s=o.position),"track"in o&&n(1,l=o.track)},[r,l,s]}class Ut extends De{constructor(e){super();Ae(this,e,dn,pn,Be,{position:2,track:1})}}function Xt(t,e,n){const s=t.slice();return s[13]=e[n],s[14]=e,s[15]=n,s}function gn(t){let e,n,s,l;return{c(){e=v("button"),n=z("\u23EF"),this.h()},l(r){e=N(r,"BUTTON",{type:!0,class:!0});var o=b(e);n=U(o,"\u23EF"),o.forEach(h),this.h()},h(){k(e,"type","button"),k(e,"class","track-control svelte-13661rk")},m(r,o){B(r,e,o),u(e,n),s||(l=_e(e,"click",t[5]),s=!0)},p:ne,d(r){r&&h(e),s=!1,l()}}}function mn(t){let e,n,s,l;return{c(){e=v("button"),n=z("\u23F8"),this.h()},l(r){e=N(r,"BUTTON",{type:!0,class:!0});var o=b(e);n=U(o,"\u23F8"),o.forEach(h),this.h()},h(){k(e,"type","button"),k(e,"class","track-control svelte-13661rk")},m(r,o){B(r,e,o),u(e,n),s||(l=_e(e,"click",t[6]),s=!0)},p:ne,d(r){r&&h(e),s=!1,l()}}}function jt(t){let e,n,s,l,r,o;function a(i){t[11](i,t[13],t[14],t[15])}function g(i){t[12](i)}let p={};return t[13]!==void 0&&(p.trackNote=t[13]),t[2]!==void 0&&(p.tune=t[2]),e=new _n({props:p}),Pe.push(()=>Ie(e,"trackNote",a)),Pe.push(()=>Ie(e,"tune",g)),r=new Ut({props:{position:t[15]}}),{c(){le(e.$$.fragment),l=w(),le(r.$$.fragment)},l(i){oe(e.$$.fragment,i),l=P(i),oe(r.$$.fragment,i)},m(i,_){ae(e,i,_),B(i,l,_),ae(r,i,_),o=!0},p(i,_){t=i;const d={};!n&&_&8&&(n=!0,d.trackNote=t[13],we(()=>n=!1)),!s&&_&4&&(s=!0,d.tune=t[2],we(()=>s=!1)),e.$set(d)},i(i){o||(Y(e.$$.fragment,i),Y(r.$$.fragment,i),o=!0)},o(i){Z(e.$$.fragment,i),Z(r.$$.fragment,i),o=!1},d(i){ie(e,i),i&&h(l),ie(r,i)}}}function vn(t){let e,n,s,l,r,o,a,g,p,i,_,d,m,A,F,$,H,he,M,I;function j(E){t[8](E)}let D={min:ke.MIN_BEAT,max:ke.MAX_BEAT,float:!0,pips:!0,all:"label",springValues:t[7]};t[1]!==void 0&&(D.values=t[1]),a=new mt({props:D}),Pe.push(()=>Ie(a,"values",j));function q(E){t[9](E)}let G={min:ke.MIN_BPM,max:ke.MAX_BPM,step:5,float:!0,pips:!0,pipstep:2,all:"label",springValues:t[7]};t[0]!==void 0&&(G.values=t[0]),d=new mt({props:G}),Pe.push(()=>Ie(d,"values",q));function J(E,S){return E[4]?mn:gn}let K=J(t),O=K(t);function Q(E){t[10](E)}let ce={};t[2]!==void 0&&(ce.tune=t[2]),H=new Ut({props:ce}),Pe.push(()=>Ie(H,"tune",Q));let x=t[3].notes,C=[];for(let E=0;E<x.length;E+=1)C[E]=jt(Xt(t,x,E));const ye=E=>Z(C[E],1,1,()=>{C[E]=null});return{c(){e=v("h2"),n=z("Track"),s=w(),l=v("section"),r=v("div"),o=z(`Beat:
		`),le(a.$$.fragment),p=w(),i=v("div"),_=z(`Speed (bpm):
		`),le(d.$$.fragment),A=w(),O.c(),F=w(),$=v("div"),le(H.$$.fragment),M=w();for(let E=0;E<C.length;E+=1)C[E].c();this.h()},l(E){e=N(E,"H2",{});var S=b(e);n=U(S,"Track"),S.forEach(h),s=P(E),l=N(E,"SECTION",{class:!0});var W=b(l);r=N(W,"DIV",{});var ue=b(r);o=U(ue,`Beat:
		`),oe(a.$$.fragment,ue),ue.forEach(h),p=P(W),i=N(W,"DIV",{});var c=b(i);_=U(c,`Speed (bpm):
		`),oe(d.$$.fragment,c),c.forEach(h),A=P(W),O.l(W),F=P(W),$=N(W,"DIV",{class:!0});var f=b($);oe(H.$$.fragment,f),M=P(f);for(let V=0;V<C.length;V+=1)C[V].l(f);f.forEach(h),W.forEach(h),this.h()},h(){k($,"class","notes svelte-13661rk"),k(l,"class","svelte-13661rk")},m(E,S){B(E,e,S),u(e,n),B(E,s,S),B(E,l,S),u(l,r),u(r,o),ae(a,r,null),u(l,p),u(l,i),u(i,_),ae(d,i,null),u(l,A),O.m(l,null),u(l,F),u(l,$),ae(H,$,null),u($,M);for(let W=0;W<C.length;W+=1)C[W].m($,null);I=!0},p(E,[S]){const W={};!g&&S&2&&(g=!0,W.values=E[1],we(()=>g=!1)),a.$set(W);const ue={};!m&&S&1&&(m=!0,ue.values=E[0],we(()=>m=!1)),d.$set(ue),K===(K=J(E))&&O?O.p(E,S):(O.d(1),O=K(E),O&&(O.c(),O.m(l,F)));const c={};if(!he&&S&4&&(he=!0,c.tune=E[2],we(()=>he=!1)),H.$set(c),S&12){x=E[3].notes;let f;for(f=0;f<x.length;f+=1){const V=Xt(E,x,f);C[f]?(C[f].p(V,S),Y(C[f],1)):(C[f]=jt(V),C[f].c(),Y(C[f],1),C[f].m($,null))}for(Ke(),f=x.length;f<C.length;f+=1)ye(f);Je()}},i(E){if(!I){Y(a.$$.fragment,E),Y(d.$$.fragment,E),Y(H.$$.fragment,E);for(let S=0;S<x.length;S+=1)Y(C[S]);I=!0}},o(E){Z(a.$$.fragment,E),Z(d.$$.fragment,E),Z(H.$$.fragment,E),C=C.filter(Boolean);for(let S=0;S<C.length;S+=1)Z(C[S]);I=!1},d(E){E&&h(e),E&&h(s),E&&h(l),ie(a),ie(d),O.d(),ie(H),Ce(C,E)}}}function Nn(t,e,n){let s,l,r=[120],o=[4],a=!1;Fe.subscribe($=>{n(3,l=$||l),n(0,r=[l.bpm]),n(1,o=[l.beat]),s&&l.syncWithTune(s)}),Ue.subscribe($=>n(2,s=$||s));function g(){n(4,a=!0),Ee.playTrack(l,()=>p())}function p(){n(4,a=!1),Ee.stop()}const i={stiffness:.15,damping:.8};function _($){o=$,n(1,o)}function d($){r=$,n(0,r)}function m($){s=$,n(2,s)}function A($,H,he,M){he[M]=$,n(3,l),n(0,r),n(1,o)}function F($){s=$,n(2,s)}return t.$$.update=()=>{t.$$.dirty&3&&(n(3,l.bpm=r[0],l),n(3,l.beat=o[0],l))},[r,o,s,l,a,g,p,i,_,d,m,A,F]}class bn extends De{constructor(e){super();Ae(this,e,Nn,vn,Be,{})}}function Rt(t,e,n){const s=t.slice();return s[5]=e[n],s}function Wt(t){let e,n=t[5].name+"",s,l,r;return{c(){e=v("option"),s=z(n),l=w(),this.h()},l(o){e=N(o,"OPTION",{});var a=b(e);s=U(a,n),l=P(a),a.forEach(h),this.h()},h(){e.__value=r=t[5],e.value=e.__value},m(o,a){B(o,e,a),u(e,s),u(e,l)},p(o,a){a&2&&n!==(n=o[5].name+"")&&ze(s,n),a&2&&r!==(r=o[5])&&(e.__value=r,e.value=e.__value)},d(o){o&&h(e)}}}function En(t){let e,n,s,l,r,o,a=t[1],g=[];for(let p=0;p<a.length;p+=1)g[p]=Wt(Rt(t,a,p));return{c(){e=v("h2"),n=z("Track list"),s=w(),l=v("select");for(let p=0;p<g.length;p+=1)g[p].c();this.h()},l(p){e=N(p,"H2",{});var i=b(e);n=U(i,"Track list"),i.forEach(h),s=P(p),l=N(p,"SELECT",{name:!0,id:!0,class:!0});var _=b(l);for(let d=0;d<g.length;d+=1)g[d].l(_);_.forEach(h),this.h()},h(){k(l,"name","tracks_list"),k(l,"id","tracks_list"),k(l,"class","svelte-1nba3pp"),t[0]===void 0&&Oe(()=>t[3].call(l))},m(p,i){B(p,e,i),u(e,n),B(p,s,i),B(p,l,i);for(let _=0;_<g.length;_+=1)g[_].m(l,null);pe(l,t[0]),r||(o=[_e(l,"change",t[3]),_e(l,"change",t[2])],r=!0)},p(p,[i]){if(i&2){a=p[1];let _;for(_=0;_<a.length;_+=1){const d=Rt(p,a,_);g[_]?g[_].p(d,i):(g[_]=Wt(d),g[_].c(),g[_].m(l,null))}for(;_<g.length;_+=1)g[_].d(1);g.length=a.length}i&3&&pe(l,p[0])},i:ne,o:ne,d(p){p&&h(e),p&&h(s),p&&h(l),Ce(g,p),r=!1,Ze(o)}}}function kn(t,e,n){let s,l,r=[];Ue.subscribe(g=>{s=g||s}),Fe.subscribe(g=>n(0,l=g||l));function o(){Fe.set(l),l.syncWithTune(s)}qe(()=>{n(1,r=Fe.list(s))});function a(){l=He(this),n(0,l),n(1,r)}return[l,r,o,a]}class yn extends De{constructor(e){super();Ae(this,e,kn,En,Be,{})}}function $n(t){let e,n,s,l,r,o,a,g,p,i,_;return l=new yn({}),a=new on({}),i=new bn({}),{c(){e=v("div"),n=v("aside"),s=v("section"),le(l.$$.fragment),r=w(),o=v("section"),le(a.$$.fragment),g=w(),p=v("aside"),le(i.$$.fragment),this.h()},l(d){e=N(d,"DIV",{class:!0});var m=b(e);n=N(m,"ASIDE",{});var A=b(n);s=N(A,"SECTION",{});var F=b(s);oe(l.$$.fragment,F),F.forEach(h),r=P(A),o=N(A,"SECTION",{});var $=b(o);oe(a.$$.fragment,$),$.forEach(h),A.forEach(h),g=P(m),p=N(m,"ASIDE",{id:!0,class:!0});var H=b(p);oe(i.$$.fragment,H),H.forEach(h),m.forEach(h),this.h()},h(){k(p,"id","track"),k(p,"class","svelte-gg9dru"),k(e,"class","container svelte-gg9dru")},m(d,m){B(d,e,m),u(e,n),u(n,s),ae(l,s,null),u(n,r),u(n,o),ae(a,o,null),u(e,g),u(e,p),ae(i,p,null),_=!0},p:ne,i(d){_||(Y(l.$$.fragment,d),Y(a.$$.fragment,d),Y(i.$$.fragment,d),_=!0)},o(d){Z(l.$$.fragment,d),Z(a.$$.fragment,d),Z(i.$$.fragment,d),_=!1},d(d){d&&h(e),ie(l),ie(a),ie(i)}}}function Tn(t){return qe(()=>{Ee.loadAudioFiles()}),[]}class wn extends De{constructor(e){super();Ae(this,e,Tn,$n,Be,{})}}export{wn as default};
