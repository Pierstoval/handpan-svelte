import{S as De,i as Ae,s as we,e as v,t as X,k as P,c as N,a as b,g as R,n as I,d as c,b as y,f as w,H as u,I as te,J as je,K as me,L as ue,h as ze,M as Be,N as Ze,A as qe,z as dt,O as Ve,C as mt,l as He,j as ae,m as ie,o as re,P as Fe,x as Q,u as Z,v as he,r as Ke,Q as xe,w as Je,R as Me,T as Oe,U as et,V as gt}from"../chunks/vendor-fe108c8f.js";var vt;(function(t){t.left="left",t.right="right"})(vt||(vt={}));var W;(function(t){t.A="A",t.B="B",t.C="C",t.D="D",t.E="E",t.F="F",t.G="G"})(W||(W={}));const qt=["Cb2","C2","C#2","Db2","D2","D#2","Eb2","A#5","B1","Bb5","B5","B#5","C6"],tt=[2,3,4,5],Kt={C:24,D:26,E:28,F:29,G:31,A:33,B:35};var q;(function(t){t.none="",t.sharp="#",t.flat="b"})(q||(q={}));var x;(function(t){t.topNote="topNote",t.bottomNote="bottomNote",t.ding="ding"})(x||(x={}));var le;(function(t){t.note="note",t.slap="slap",t.ghost="ghost",t.none="none"})(le||(le={}));class Ee{constructor(e,n,s,l,r){if(this._isPlaying=!1,this._note=e,this._alteration=n,this._octave=s,this._type=l,this._position=r,r<=0)throw new Error("Note position must be a non-negative and non-zero integer.");this.refresh(),this.refreshHtmlElement()}get htmlElement(){return this._htmlElement}set htmlElement(e){if(!e){console.warn("Tried to set empty html element to handpan note.");return}this._htmlElement=e}get octave(){return this._octave}set octave(e){this._octave=e,this.refresh()}get alteration(){return this._alteration}set alteration(e){this._alteration=e,this.refresh()}get note(){return this._note}set note(e){this._note=e,this.refresh()}get type(){return this._type}get position(){return this._position}get fullName(){return this._note+this._alteration+this._octave}get isPlaying(){return this._isPlaying}get fullDetailedName(){return this._position+" - "+this.fullName+(this.isDing?" (ding)":"")+(this.isBottom?" (bottom)":"")}get isTop(){return this._type===x.topNote}get isDing(){return this._type===x.ding}get isBottom(){return this._type===x.bottomNote}get midiNumber(){let e=Kt[this._note.toString()]+(this._octave-1)*12;return this._alteration===q.sharp?e++:this._alteration===q.flat&&e--,e}forcePosition(e){this._position=e}setPlaying(){if(!this._htmlElement){console.warn("Playing note is not attached to any HTML element. The issue might be that this not is not in your current handpan tune.");return}this._isPlaying=!0,this._htmlElement.classList.add("playing"),this._htmlElement.firstElementChild.classList.add("playing")}stopPlaying(){!this._htmlElement||(this._isPlaying=!1,this._htmlElement.classList.remove("playing"),this._htmlElement.firstElementChild.classList.remove("playing"))}refreshHtmlElement(){if(typeof document=="undefined")return;const e=document.querySelector(`[data-handpan-note="${this.fullName}"]`);e&&(this.htmlElement=e)}refresh(){const e={"B#":[W.C,q.none,1],"E#":[W.F,q.none,0],Ab:[W.G,q.sharp,0],Bb:[W.A,q.sharp,0],Cb:[W.B,q.none,-1],Db:[W.C,q.none,0],Eb:[W.D,q.sharp,0],Fb:[W.E,q.none,0],Gb:[W.F,q.sharp,0]},n=this._note+this._alteration,s=e[n];if(!s)return;let l;l&&(this._octave+l<Math.min(...tt)||this._octave+l<Math.max(...tt))||([this._note,this._alteration,l]=s,l&&(this._octave+=l))}}const Qe={clac:"clac/clac.flac",gu:"gu/D2.flac",notes:{E2:"shellopan/E2.flac",F2:"shellopan/F2.flac","F#2":"shellopan/Fs2.flac",G2:"shellopan/G2.flac","G#2":"shellopan/Gs2.flac",A2:"shellopan/A2.flac","A#2":"shellopan/As2.flac",B2:"shellopan/B2.flac",C3:"shellopan/C3.flac","C#3":"shellopan/Cs3.flac",D3:"shellopan/D3.flac","D#3":"shellopan/Ds3.flac",E3:"shellopan/E3.flac",F3:"shellopan/F3.flac","F#3":"shellopan/Fs3.flac",G3:"shellopan/G3.flac","G#3":"shellopan/Gs3.flac",A3:"shellopan/A3.flac","A#3":"shellopan/As3.flac",B3:"shellopan/B3.flac",C4:"shellopan/C4.flac","C#4":"shellopan/Cs4.flac",D4:"shellopan/D4.flac","D#4":"shellopan/Ds4.flac",E4:"shellopan/E4.flac",F4:"shellopan/F4.flac","F#4":"shellopan/Fs4.flac",G4:"shellopan/G4.flac","G#4":"shellopan/Gs4.flac",A4:"shellopan/A4.flac","A#4":"shellopan/As4.flac",B4:"shellopan/B4.flac",C5:"shellopan/C5.flac","C#5":"shellopan/Cs5.flac",D5:"shellopan/D5.flac","D#5":"shellopan/Ds5.flac",E5:"shellopan/E5.flac",F5:"shellopan/F5.flac","F#5":"shellopan/Fs5.flac",G5:"shellopan/G5.flac","G#5":"shellopan/Gs5.flac",A5:"shellopan/A5.flac"}},Nt=class{static get isPlaying(){return this._isPlaying}static loadAudioFiles(){this.loadAudioFile("clac",Qe.clac),this.loadAudioFile("gu",Qe.gu);for(const t in Qe.notes)this.loadAudioFile(t,Qe.notes[t])}static playTrack(t,e){this.stop(),this._isPlaying=!0;const n=this.getMsPerBeat(t.bpm,t.beat);let s=n;t.notes.forEach(l=>{this.addPlayingTimeout(()=>Nt.playNote(l),s),s+=n}),e&&this.addPlayingTimeout(e,s),this.addPlayingTimeout(()=>this.stop(),s)}static stop(){for(;this.playingTimeouts.length;)clearTimeout(this.playingTimeouts.shift());for(;this.playingNotes.length;)this.playingNotes.shift().stopPlaying();this.playingTimeouts=[],this.playingNotes=[],this._isPlaying=!1}static playNoteByType(t,e=1,n=null){if(!this.loadedAudio[t]){console.error(`Sound type "${t}" s not loaded or does not exist.`);return}const s=this.loadedAudio[t].cloneNode();if(s.volume=e,s.play(),n){const l=isNaN(s.duration)?this.DEFAULT_AUDIO_DURATION:s.duration;this.addPlayingTimeout(n,l)}}static playNote(t){switch(t.setPlaying(),this.playingNotes.push(t),!0){case t.isSlap:this.playNoteByType("clac",1,()=>this.stopNote(t));break;case t.isGhost:this.playNoteByType("clac",1,()=>this.stopNote(t));break;case t.isNone:break;default:this.playNoteByType(t.displayName,1,()=>this.stopNote(t));break}}static stopNote(t){t.stopPlaying(),this.playingNotes=this.playingNotes.filter(e=>e!==t)}static getMsPerBeat(t,e){return 1e3*60/t/e}static addPlayingTimeout(t,e){this.playingTimeouts.push(setTimeout(t,e))}static loadAudioFile(t,e){const n=new Audio;n.src=e,n.preload="auto",n.volume=1,n.addEventListener("canplaythrough",()=>this.loadedAudio[t]=n)}};let ye=Nt;ye.DEFAULT_AUDIO_DURATION=300;ye._isPlaying=!1;ye.loadedAudio={};ye.playingTimeouts=[];ye.playingNotes=[];function bt(t,e,n){const s=t.slice();return s[9]=e[n],s}function Et(t,e,n){const s=t.slice();return s[9]=e[n],s}function yt(t,e,n){const s=t.slice();return s[14]=e[n],s}function kt(t){let e,n=t[14]+"",s,l,r;return{c(){e=v("option"),s=X(n),l=P(),this.h()},l(a){e=N(a,"OPTION",{class:!0});var o=b(e);s=R(o,n),l=I(o),o.forEach(c),this.h()},h(){e.__value=r=t[14],e.value=e.__value,y(e,"class","svelte-1jj1888")},m(a,o){w(a,e,o),u(e,s),u(e,l)},p:te,d(a){a&&c(e)}}}function $t(t){let e,n=t[9]+"",s,l,r;return{c(){e=v("option"),s=X(n),l=P(),this.h()},l(a){e=N(a,"OPTION",{class:!0});var o=b(e);s=R(o,n),l=I(o),o.forEach(c),this.h()},h(){e.__value=r=t[9],e.value=e.__value,y(e,"class","svelte-1jj1888")},m(a,o){w(a,e,o),u(e,s),u(e,l)},p:te,d(a){a&&c(e)}}}function Tt(t){let e,n=t[9]+"",s,l,r;return{c(){e=v("option"),s=X(n),l=P(),this.h()},l(a){e=N(a,"OPTION",{class:!0});var o=b(e);s=R(o,n),l=I(o),o.forEach(c),this.h()},h(){e.__value=r=t[9],e.value=e.__value,y(e,"class","svelte-1jj1888")},m(a,o){w(a,e,o),u(e,s),u(e,l)},p:te,d(a){a&&c(e)}}}function Jt(t){let e,n,s,l=t[0].fullName+"",r,a,o,h,_,i,d,p,g,$,V,B,M,_e,H,C,L,D,K,F,J,O,G,A,fe,E,j,Y,ne,S,oe,de=t[0].midiNumber+"",f,m,z,$e,Le,ge=t[1],ee=[];for(let T=0;T<ge.length;T+=1)ee[T]=kt(yt(t,ge,T));let ve=t[2],U=[];for(let T=0;T<ve.length;T+=1)U[T]=$t(Et(t,ve,T));let Ce=t[3],ce=[];for(let T=0;T<Ce.length;T+=1)ce[T]=Tt(bt(t,Ce,T));return{c(){e=v("div"),n=v("div"),s=v("div"),r=X(l),a=P(),o=v("div"),h=v("div"),_=v("h3"),i=X("Note"),d=P(),p=v("div"),g=v("select");for(let T=0;T<ee.length;T+=1)ee[T].c();$=P(),V=v("div"),B=v("h3"),M=X("Octave"),_e=P(),H=v("div"),C=v("select");for(let T=0;T<U.length;T+=1)U[T].c();L=P(),D=v("div"),K=v("h3"),F=X("Alteration"),J=P(),O=v("div"),G=v("select");for(let T=0;T<ce.length;T+=1)ce[T].c();A=P(),fe=v("div"),E=v("h4"),j=X("Info"),Y=P(),ne=v("ul"),S=v("li"),oe=X("Midi: "),f=X(de),this.h()},l(T){e=N(T,"DIV",{class:!0,"data-handpan-note":!0});var se=b(e);n=N(se,"DIV",{class:!0});var k=b(n);s=N(k,"DIV",{class:!0});var Ne=b(s);r=R(Ne,l),Ne.forEach(c),a=I(k),o=N(k,"DIV",{class:!0});var Te=b(o);h=N(Te,"DIV",{class:!0});var Ue=b(h);_=N(Ue,"H3",{});var lt=b(_);i=R(lt,"Note"),lt.forEach(c),d=I(Ue),p=N(Ue,"DIV",{class:!0});var ot=b(p);g=N(ot,"SELECT",{size:!0,class:!0});var at=b(g);for(let be=0;be<ee.length;be+=1)ee[be].l(at);at.forEach(c),ot.forEach(c),Ue.forEach(c),$=I(Te),V=N(Te,"DIV",{class:!0});var Xe=b(V);B=N(Xe,"H3",{});var it=b(B);M=R(it,"Octave"),it.forEach(c),_e=I(Xe),H=N(Xe,"DIV",{class:!0});var rt=b(H);C=N(rt,"SELECT",{size:!0,class:!0});var ht=b(C);for(let be=0;be<U.length;be+=1)U[be].l(ht);ht.forEach(c),rt.forEach(c),Xe.forEach(c),L=I(Te),D=N(Te,"DIV",{class:!0});var Re=b(D);K=N(Re,"H3",{});var ct=b(K);F=R(ct,"Alteration"),ct.forEach(c),J=I(Re),O=N(Re,"DIV",{class:!0});var ft=b(O);G=N(ft,"SELECT",{size:!0,class:!0});var ut=b(G);for(let be=0;be<ce.length;be+=1)ce[be].l(ut);ut.forEach(c),ft.forEach(c),Re.forEach(c),A=I(Te),fe=N(Te,"DIV",{});var We=b(fe);E=N(We,"H4",{});var _t=b(E);j=R(_t,"Info"),_t.forEach(c),Y=I(We),ne=N(We,"UL",{});var pt=b(ne);S=N(pt,"LI",{});var Ye=b(S);oe=R(Ye,"Midi: "),f=R(Ye,de),Ye.forEach(c),pt.forEach(c),We.forEach(c),Te.forEach(c),k.forEach(c),se.forEach(c),this.h()},h(){y(s,"class","note-name svelte-1jj1888"),y(g,"size",t[1].length),y(g,"class","svelte-1jj1888"),t[0].note===void 0&&je(()=>t[6].call(g)),y(p,"class","select_container svelte-1jj1888"),y(h,"class","inputs_container svelte-1jj1888"),y(C,"size",t[2].length),y(C,"class","svelte-1jj1888"),t[0].octave===void 0&&je(()=>t[7].call(C)),y(H,"class","select_container svelte-1jj1888"),y(V,"class","inputs_container svelte-1jj1888"),y(G,"size",t[3].length),y(G,"class","svelte-1jj1888"),t[0].alteration===void 0&&je(()=>t[8].call(G)),y(O,"class","select_container svelte-1jj1888"),y(D,"class","inputs_container svelte-1jj1888"),y(o,"class","note-menu  svelte-1jj1888"),y(n,"class",m="note "+(t[0].isPlaying?"playing":"")+" svelte-1jj1888"),y(e,"class","note-container svelte-1jj1888"),y(e,"data-handpan-note",z=t[0].fullName)},m(T,se){w(T,e,se),u(e,n),u(n,s),u(s,r),u(n,a),u(n,o),u(o,h),u(h,_),u(_,i),u(h,d),u(h,p),u(p,g);for(let k=0;k<ee.length;k+=1)ee[k].m(g,null);me(g,t[0].note),u(o,$),u(o,V),u(V,B),u(B,M),u(V,_e),u(V,H),u(H,C);for(let k=0;k<U.length;k+=1)U[k].m(C,null);me(C,t[0].octave),u(o,L),u(o,D),u(D,K),u(K,F),u(D,J),u(D,O),u(O,G);for(let k=0;k<ce.length;k+=1)ce[k].m(G,null);me(G,t[0].alteration),u(o,A),u(o,fe),u(fe,E),u(E,j),u(fe,Y),u(fe,ne),u(ne,S),u(S,oe),u(S,f),$e||(Le=[ue(g,"change",t[6]),ue(g,"change",t[4]),ue(C,"change",t[7]),ue(C,"change",t[4]),ue(G,"change",t[8]),ue(G,"change",t[4])],$e=!0)},p(T,[se]){if(se&1&&l!==(l=T[0].fullName+"")&&ze(r,l),se&2){ge=T[1];let k;for(k=0;k<ge.length;k+=1){const Ne=yt(T,ge,k);ee[k]?ee[k].p(Ne,se):(ee[k]=kt(Ne),ee[k].c(),ee[k].m(g,null))}for(;k<ee.length;k+=1)ee[k].d(1);ee.length=ge.length}if(se&3&&me(g,T[0].note),se&4){ve=T[2];let k;for(k=0;k<ve.length;k+=1){const Ne=Et(T,ve,k);U[k]?U[k].p(Ne,se):(U[k]=$t(Ne),U[k].c(),U[k].m(C,null))}for(;k<U.length;k+=1)U[k].d(1);U.length=ve.length}if(se&3&&me(C,T[0].octave),se&8){Ce=T[3];let k;for(k=0;k<Ce.length;k+=1){const Ne=bt(T,Ce,k);ce[k]?ce[k].p(Ne,se):(ce[k]=Tt(Ne),ce[k].c(),ce[k].m(G,null))}for(;k<ce.length;k+=1)ce[k].d(1);ce.length=Ce.length}se&3&&me(G,T[0].alteration),se&1&&de!==(de=T[0].midiNumber+"")&&ze(f,de),se&3&&m!==(m="note "+(T[0].isPlaying?"playing":"")+" svelte-1jj1888")&&y(n,"class",m),se&3&&z!==(z=T[0].fullName)&&y(e,"data-handpan-note",z)},i:te,o:te,d(T){T&&c(e),Be(ee,T),Be(U,T),Be(ce,T),$e=!1,Ze(Le)}}}function Qt(t,e,n){let{note:s}=e,{onChange:l}=e;const r=Object.values(W),a=[1,2,3,4,5],o=Object.values(q);function h(){l&&l(s),ye.playNoteByType(s.fullName)}qe(()=>s.refreshHtmlElement()),dt(()=>s.refreshHtmlElement());function _(){s.note=Ve(this),n(0,s),n(1,r)}function i(){s.octave=Ve(this),n(0,s),n(1,r)}function d(){s.alteration=Ve(this),n(0,s),n(1,r)}return t.$$set=p=>{"note"in p&&n(0,s=p.note),"onChange"in p&&n(5,l=p.onChange)},[s,r,a,o,h,l,_,i,d]}class nt extends De{constructor(e){super();Ae(this,e,Qt,Jt,we,{note:0,onChange:5})}}class Yt{constructor(e){this._topNotes=[],this._dings=[],this._bottomNotes=[],e.forEach(n=>this.addNote(n)),this.refresh()}get dings(){return this._dings}get topNotes(){return this._topNotes}get bottomNotes(){return this._bottomNotes}get numberOfNotes(){return this._topNotes.length+this._dings.length+this._bottomNotes.length}get notes(){return this._notes||[]}addNote(e){e.isTop?(this._topNotes.push(e),e.forcePosition(this._topNotes.length)):e.isDing?(this._dings.push(e),e.forcePosition(this._dings.length)):e.isBottom&&(this._bottomNotes.push(e),e.forcePosition(this._topNotes.length))}addNoteAt(e,n){console.info("OK");debugger}getTopNoteByPosition(e){for(const n of this._topNotes)if(n.position===e)return n;return null}getBottomNoteByPosition(e){for(const n of this._bottomNotes)if(n.position===e)return n;return null}getDingByPosition(e){for(const n of this._dings)if(n.position===e)return n;return null}getSameNote(e){if(!e)debugger;switch(!0){case e.isTop:return this.getTopNoteByPosition(e.position);case e.isDing:return this.getDingByPosition(e.position);case e.isBottom:return this.getBottomNoteByPosition(e.position);default:throw new Error("Expected note to be either top, ding or bottom, and found an unsupported value.")}}refresh(){const e=(n,s)=>{const l=n.position,r=s.position;switch(!0){case l<r:return-1;case l===r:throw new Error("Two notes cannot have the same position!");case l>r:return 1}};this._topNotes.sort(e),this._dings.sort(e),this._bottomNotes.sort(e)}}const{subscribe:Zt,set:Dt,update:An}=mt(At());function At(){return en()}function xt(){Dt(At())}function en(){return new Yt([new Ee(W.C,q.sharp,3,x.bottomNote,1),new Ee(W.G,q.none,3,x.ding,1),new Ee(W.A,q.none,3,x.topNote,1),new Ee(W.B,q.none,3,x.topNote,2),new Ee(W.C,q.sharp,4,x.topNote,3),new Ee(W.D,q.sharp,4,x.topNote,4),new Ee(W.E,q.none,4,x.topNote,5),new Ee(W.F,q.sharp,4,x.topNote,6),new Ee(W.G,q.sharp,4,x.topNote,7)])}const Ge={setDefault:xt,subscribe:Zt,set:Dt};function tn(t){let e,n,s,l,r;return{c(){e=v("div"),n=v("div"),s=X("+"),this.h()},l(a){e=N(a,"DIV",{class:!0});var o=b(e);n=N(o,"DIV",{class:!0});var h=b(n);s=R(h,"+"),h.forEach(c),o.forEach(c),this.h()},h(){y(n,"class","handpan-note svelte-117otwt"),y(e,"class","handpan-note-container svelte-117otwt")},m(a,o){w(a,e,o),u(e,n),u(n,s),l||(r=ue(n,"click",t[0]),l=!0)},p:te,i:te,o:te,d(a){a&&c(e),l=!1,r()}}}function nn(t,e,n){let{position:s}=e,{type:l}=e,{tune:r}=e;Ge.subscribe(o=>n(1,r=o||r));function a(){r.addNoteAt(s,l),Ge.set(r)}return t.$$set=o=>{"position"in o&&n(2,s=o.position),"type"in o&&n(3,l=o.type),"tune"in o&&n(1,r=o.tune)},[a,r,s,l]}class Se extends De{constructor(e){super();Ae(this,e,nn,tn,we,{position:2,type:3,tune:1})}}function wt(t,e,n){const s=t.slice();return s[4]=e[n],s[5]=e,s[6]=n,s}function Bt(t,e,n){const s=t.slice();return s[4]=e[n],s[7]=e,s[6]=n,s}function Pt(t,e,n){const s=t.slice();return s[4]=e[n],s[8]=e,s[6]=n,s}function It(t,e){let n,s,l,r,a,o;function h(i){e[1](i,e[4],e[8],e[6])}let _={onChange:st};return e[4]!==void 0&&(_.note=e[4]),s=new nt({props:_}),Me.push(()=>Oe(s,"note",h)),a=new Se({props:{position:e[6],type:x.topNote}}),{key:t,first:null,c(){n=He(),ae(s.$$.fragment),r=P(),ae(a.$$.fragment),this.h()},l(i){n=He(),ie(s.$$.fragment,i),r=I(i),ie(a.$$.fragment,i),this.h()},h(){this.first=n},m(i,d){w(i,n,d),re(s,i,d),w(i,r,d),re(a,i,d),o=!0},p(i,d){e=i;const p={};!l&&d&1&&(l=!0,p.note=e[4],Fe(()=>l=!1)),s.$set(p);const g={};d&1&&(g.position=e[6]),a.$set(g)},i(i){o||(Q(s.$$.fragment,i),Q(a.$$.fragment,i),o=!0)},o(i){Z(s.$$.fragment,i),Z(a.$$.fragment,i),o=!1},d(i){i&&c(n),he(s,i),i&&c(r),he(a,i)}}}function Ct(t,e){let n,s,l,r,a,o;function h(i){e[2](i,e[4],e[7],e[6])}let _={onChange:st};return e[4]!==void 0&&(_.note=e[4]),s=new nt({props:_}),Me.push(()=>Oe(s,"note",h)),a=new Se({props:{position:e[6],type:x.ding}}),{key:t,first:null,c(){n=He(),ae(s.$$.fragment),r=P(),ae(a.$$.fragment),this.h()},l(i){n=He(),ie(s.$$.fragment,i),r=I(i),ie(a.$$.fragment,i),this.h()},h(){this.first=n},m(i,d){w(i,n,d),re(s,i,d),w(i,r,d),re(a,i,d),o=!0},p(i,d){e=i;const p={};!l&&d&1&&(l=!0,p.note=e[4],Fe(()=>l=!1)),s.$set(p);const g={};d&1&&(g.position=e[6]),a.$set(g)},i(i){o||(Q(s.$$.fragment,i),Q(a.$$.fragment,i),o=!0)},o(i){Z(s.$$.fragment,i),Z(a.$$.fragment,i),o=!1},d(i){i&&c(n),he(s,i),i&&c(r),he(a,i)}}}function jt(t,e){let n,s,l,r,a,o;function h(i){e[3](i,e[4],e[5],e[6])}let _={onChange:st};return e[4]!==void 0&&(_.note=e[4]),s=new nt({props:_}),Me.push(()=>Oe(s,"note",h)),a=new Se({props:{position:e[6],type:x.bottomNote}}),{key:t,first:null,c(){n=He(),ae(s.$$.fragment),r=P(),ae(a.$$.fragment),this.h()},l(i){n=He(),ie(s.$$.fragment,i),r=I(i),ie(a.$$.fragment,i),this.h()},h(){this.first=n},m(i,d){w(i,n,d),re(s,i,d),w(i,r,d),re(a,i,d),o=!0},p(i,d){e=i;const p={};!l&&d&1&&(l=!0,p.note=e[4],Fe(()=>l=!1)),s.$set(p);const g={};d&1&&(g.position=e[6]),a.$set(g)},i(i){o||(Q(s.$$.fragment,i),Q(a.$$.fragment,i),o=!0)},o(i){Z(s.$$.fragment,i),Z(a.$$.fragment,i),o=!1},d(i){i&&c(n),he(s,i),i&&c(r),he(a,i)}}}function sn(t){let e,n,s,l,r,a,o,h,_,i=[],d=new Map,p,g,$,V,B,M,_e,H=[],C=new Map,L,D,K,F,J,O,G,A=[],fe=new Map,E;h=new Se({props:{position:"0",type:x.topNote}});let j=t[0].topNotes;const Y=f=>f[4];for(let f=0;f<j.length;f+=1){let m=Pt(t,j,f),z=Y(m);d.set(z,i[f]=It(z,m))}M=new Se({props:{position:"0",type:x.ding}});let ne=t[0].dings;const S=f=>f[4];for(let f=0;f<ne.length;f+=1){let m=Bt(t,ne,f),z=S(m);C.set(z,H[f]=Ct(z,m))}O=new Se({props:{position:"0",type:x.bottomNote}});let oe=t[0].bottomNotes;const de=f=>f[4];for(let f=0;f<oe.length;f+=1){let m=wt(t,oe,f),z=de(m);fe.set(z,A[f]=jt(z,m))}return{c(){e=v("h2"),n=X("Tune"),s=P(),l=v("h3"),r=X("Top notes:"),a=P(),o=v("div"),ae(h.$$.fragment),_=P();for(let f=0;f<i.length;f+=1)i[f].c();p=P(),g=v("h3"),$=X("Dings:"),V=P(),B=v("div"),ae(M.$$.fragment),_e=P();for(let f=0;f<H.length;f+=1)H[f].c();L=P(),D=v("h3"),K=X("Bottom notes:"),F=P(),J=v("div"),ae(O.$$.fragment),G=P();for(let f=0;f<A.length;f+=1)A[f].c();this.h()},l(f){e=N(f,"H2",{});var m=b(e);n=R(m,"Tune"),m.forEach(c),s=I(f),l=N(f,"H3",{});var z=b(l);r=R(z,"Top notes:"),z.forEach(c),a=I(f),o=N(f,"DIV",{class:!0});var $e=b(o);ie(h.$$.fragment,$e),_=I($e);for(let U=0;U<i.length;U+=1)i[U].l($e);$e.forEach(c),p=I(f),g=N(f,"H3",{});var Le=b(g);$=R(Le,"Dings:"),Le.forEach(c),V=I(f),B=N(f,"DIV",{class:!0});var ge=b(B);ie(M.$$.fragment,ge),_e=I(ge);for(let U=0;U<H.length;U+=1)H[U].l(ge);ge.forEach(c),L=I(f),D=N(f,"H3",{});var ee=b(D);K=R(ee,"Bottom notes:"),ee.forEach(c),F=I(f),J=N(f,"DIV",{class:!0});var ve=b(J);ie(O.$$.fragment,ve),G=I(ve);for(let U=0;U<A.length;U+=1)A[U].l(ve);ve.forEach(c),this.h()},h(){y(o,"class","notes-list"),y(B,"class","notes-list"),y(J,"class","notes-list")},m(f,m){w(f,e,m),u(e,n),w(f,s,m),w(f,l,m),u(l,r),w(f,a,m),w(f,o,m),re(h,o,null),u(o,_);for(let z=0;z<i.length;z+=1)i[z].m(o,null);w(f,p,m),w(f,g,m),u(g,$),w(f,V,m),w(f,B,m),re(M,B,null),u(B,_e);for(let z=0;z<H.length;z+=1)H[z].m(B,null);w(f,L,m),w(f,D,m),u(D,K),w(f,F,m),w(f,J,m),re(O,J,null),u(J,G);for(let z=0;z<A.length;z+=1)A[z].m(J,null);E=!0},p(f,[m]){m&1&&(j=f[0].topNotes,Ke(),i=xe(i,m,Y,1,f,j,d,o,et,It,null,Pt),Je()),m&1&&(ne=f[0].dings,Ke(),H=xe(H,m,S,1,f,ne,C,B,et,Ct,null,Bt),Je()),m&1&&(oe=f[0].bottomNotes,Ke(),A=xe(A,m,de,1,f,oe,fe,J,et,jt,null,wt),Je())},i(f){if(!E){Q(h.$$.fragment,f);for(let m=0;m<j.length;m+=1)Q(i[m]);Q(M.$$.fragment,f);for(let m=0;m<ne.length;m+=1)Q(H[m]);Q(O.$$.fragment,f);for(let m=0;m<oe.length;m+=1)Q(A[m]);E=!0}},o(f){Z(h.$$.fragment,f);for(let m=0;m<i.length;m+=1)Z(i[m]);Z(M.$$.fragment,f);for(let m=0;m<H.length;m+=1)Z(H[m]);Z(O.$$.fragment,f);for(let m=0;m<A.length;m+=1)Z(A[m]);E=!1},d(f){f&&c(e),f&&c(s),f&&c(l),f&&c(a),f&&c(o),he(h);for(let m=0;m<i.length;m+=1)i[m].d();f&&c(p),f&&c(g),f&&c(V),f&&c(B),he(M);for(let m=0;m<H.length;m+=1)H[m].d();f&&c(L),f&&c(D),f&&c(F),f&&c(J),he(O);for(let m=0;m<A.length;m+=1)A[m].d()}}}function st(t){console.info("change note",t)}function ln(t,e,n){let s;Ge.subscribe(o=>n(0,s=o||s));function l(o,h,_,i){_[i]=o,n(0,s)}function r(o,h,_,i){_[i]=o,n(0,s)}function a(o,h,_,i){_[i]=o,n(0,s)}return[s,l,r,a]}class on extends De{constructor(e){super();Ae(this,e,ln,sn,we,{})}}class pe{get htmlElement(){return this._htmlElement}set htmlElement(e){if(!e){console.error("Tried to set empty html element to track note.");return}this._htmlElement=e}get fullName(){var e,n;switch(!0){case this.isSlap:return"\xD7";case this.isGhost:return"\u{1F47B}";case this.isNone:return"\u2014";default:return(n=(e=this.note)==null?void 0:e.fullName)!=null?n:"-"}}get displayName(){if(!this.isNote)throw new Error(`Note name for the music player can only be retrieved on notes. Current note is "${this.type}".`);return this.note.fullName}get isNote(){return this.type===le.note}get isSlap(){return this.type===le.slap}get isGhost(){return this.type===le.ghost}get isNone(){return this.type===le.none}constructor(e,n){if(!e&&pe.typeNeedsHandpanNote(n))throw`Tried to create track note of type "${n}" with no HandpanNote, but this type needs one.`;this.note=e,this.type=n,this.refreshHtmlElement()}static createGhost(){return new pe(null,le.ghost)}setPlaying(){if(!this._htmlElement){console.error(`Cannot highlight note ${this.fullName} because it does not have an HTML Element associated to it.`);return}this._htmlElement.firstElementChild.classList.add("playing"),this.note&&this.note.setPlaying()}stopPlaying(){if(!this._htmlElement){console.error(`Cannot disable highlight for note ${this.fullName} because it does not have an HTML Element associated to it.`);return}this._htmlElement.firstElementChild.classList.remove("playing"),this.note&&this.note.stopPlaying()}syncWithTuneNote(e){this.refreshHtmlElement(),this.note=e,e.refreshHtmlElement()}refreshHtmlElement(){if(typeof document=="undefined")return;const e=document.querySelector(`[data-track-note="${this.fullName}"]`);e&&(this.htmlElement=e)}static typeNeedsHandpanNote(e){return e===le.note}}const Pe=class{constructor(t){this._bpm=120,this._beat=4,this._notes=[],this._name=t}get name(){return this._name}get notes(){return this._notes}get bpm(){return this._bpm}set bpm(t){t<=0&&(t=1),t>Pe.MAX_BPM&&(t=Pe.MAX_BPM),this._bpm=t}get beat(){return this._beat}set beat(t){t<Pe.MIN_BEAT&&(t=Pe.MIN_BEAT),t>Pe.MAX_BEAT&&(t=Pe.MAX_BEAT),this._beat=t}addNoteAt(t){const e=pe.createGhost();this._notes.splice(t,0,e)}addNote(t){this._notes.push(t)}syncWithTune(t){this._notes.forEach(e=>{if(!e.isNote)return;const n=t.getSameNote(e.note);if(!n){console.warn(`Note ${e.fullName} is in the current track but was not found in the handpan tune.`);return}e.syncWithTuneNote(n)})}};let ke=Pe;ke.MIN_BPM=50;ke.MAX_BPM=200;ke.MIN_BEAT=2;ke.MAX_BEAT=8;const{subscribe:an,set:Vt,update:wn}=mt(Ht());function rn(t){return t?[Ft(),cn(t)]:[]}function hn(){Vt(Ht())}function Ht(){return Ft()}function cn(t){const e=new ke("Demo");debugger;return e.addNote(new pe(t.getDingByPosition(1),le.note)),e.addNote(new pe(t.getTopNoteByPosition(2),le.note)),e.addNote(new pe(null,le.slap)),e.addNote(new pe(t.getTopNoteByPosition(4),le.note)),e.addNote(new pe(t.getDingByPosition(1),le.note)),e.addNote(new pe(t.getTopNoteByPosition(3),le.note)),e.addNote(new pe(null,le.slap)),e.addNote(new pe(t.getTopNoteByPosition(5),le.note)),e}function Ft(){let t=1;const e={},n=new ke("All notes");n.bpm=180,tt.forEach(s=>{[W.C,W.D,W.E,W.F,W.G,W.A,W.B].forEach(r=>{[q.flat,q.none,q.sharp].forEach(o=>{const h=new Ee(r,o,s,x.topNote,t++);if(qt.includes(h.fullName))return;const _=new pe(h,le.note);e[_.fullName]=_})})});for(const s in e){const l=e[s];n.addNote(l)}return n}const Ie={list:rn,setDefault:hn,subscribe:an,set:Vt};function Mt(t,e,n){const s=t.slice();return s[6]=e[n],s}function Ot(t,e,n){const s=t.slice();return s[9]=e[n],s}function Gt(t){let e,n=t[9]+"",s,l,r;return{c(){e=v("option"),s=X(n),l=P(),this.h()},l(a){e=N(a,"OPTION",{class:!0});var o=b(e);s=R(o,n),l=I(o),o.forEach(c),this.h()},h(){e.__value=r=t[9],e.value=e.__value,y(e,"class","svelte-16amr53")},m(a,o){w(a,e,o),u(e,s),u(e,l)},p:te,d(a){a&&c(e)}}}function St(t){let e,n,s,l,r,a,o,h,_,i=t[1].notes,d=[];for(let p=0;p<i.length;p+=1)d[p]=Lt(Mt(t,i,p));return{c(){e=v("div"),n=v("h3"),s=X("Note"),l=P(),r=v("div"),a=v("select");for(let p=0;p<d.length;p+=1)d[p].c();this.h()},l(p){e=N(p,"DIV",{class:!0});var g=b(e);n=N(g,"H3",{});var $=b(n);s=R($,"Note"),$.forEach(c),l=I(g),r=N(g,"DIV",{class:!0});var V=b(r);a=N(V,"SELECT",{size:!0,class:!0});var B=b(a);for(let M=0;M<d.length;M+=1)d[M].l(B);B.forEach(c),V.forEach(c),g.forEach(c),this.h()},h(){y(a,"size",o=t[1].numberOfNotes),y(a,"class","svelte-16amr53"),t[0].note===void 0&&je(()=>t[5].call(a)),y(r,"class","track_select_container svelte-16amr53"),y(e,"class","track_inputs_container svelte-16amr53")},m(p,g){w(p,e,g),u(e,n),u(n,s),u(e,l),u(e,r),u(r,a);for(let $=0;$<d.length;$+=1)d[$].m(a,null);me(a,t[0].note),h||(_=[ue(a,"change",t[5]),ue(a,"change",t[3])],h=!0)},p(p,g){if(g&2){i=p[1].notes;let $;for($=0;$<i.length;$+=1){const V=Mt(p,i,$);d[$]?d[$].p(V,g):(d[$]=Lt(V),d[$].c(),d[$].m(a,null))}for(;$<d.length;$+=1)d[$].d(1);d.length=i.length}g&2&&o!==(o=p[1].numberOfNotes)&&y(a,"size",o),g&5&&me(a,p[0].note)},d(p){p&&c(e),Be(d,p),h=!1,Ze(_)}}}function Lt(t){let e,n=t[6].fullDetailedName+"",s,l,r;return{c(){e=v("option"),s=X(n),l=P(),this.h()},l(a){e=N(a,"OPTION",{class:!0});var o=b(e);s=R(o,n),l=I(o),o.forEach(c),this.h()},h(){e.__value=r=t[6],e.value=e.__value,y(e,"class","svelte-16amr53")},m(a,o){w(a,e,o),u(e,s),u(e,l)},p(a,o){o&2&&n!==(n=a[6].fullDetailedName+"")&&ze(s,n),o&2&&r!==(r=a[6])&&(e.__value=r,e.value=e.__value)},d(a){a&&c(e)}}}function fn(t){let e,n,s,l=t[0].fullName+"",r,a,o,h,_,i,d,p,g,$,V,B,M,_e,H=t[2],C=[];for(let D=0;D<H.length;D+=1)C[D]=Gt(Ot(t,H,D));let L=t[0]&&t[1]&&t[0].isNote&&St(t);return{c(){e=v("div"),n=v("div"),s=v("div"),r=X(l),a=P(),o=v("div"),h=v("div"),_=v("h3"),i=X("Type"),d=P(),p=v("div"),g=v("select");for(let D=0;D<C.length;D+=1)C[D].c();$=P(),L&&L.c(),this.h()},l(D){e=N(D,"DIV",{class:!0,"data-track-note":!0});var K=b(e);n=N(K,"DIV",{class:!0});var F=b(n);s=N(F,"DIV",{class:!0});var J=b(s);r=R(J,l),J.forEach(c),a=I(F),o=N(F,"DIV",{class:!0});var O=b(o);h=N(O,"DIV",{class:!0});var G=b(h);_=N(G,"H3",{});var A=b(_);i=R(A,"Type"),A.forEach(c),d=I(G),p=N(G,"DIV",{class:!0});var fe=b(p);g=N(fe,"SELECT",{size:!0,class:!0});var E=b(g);for(let j=0;j<C.length;j+=1)C[j].l(E);E.forEach(c),fe.forEach(c),G.forEach(c),$=I(O),L&&L.l(O),O.forEach(c),F.forEach(c),K.forEach(c),this.h()},h(){y(s,"class","note-name svelte-16amr53"),y(g,"size",t[2].length),y(g,"class","svelte-16amr53"),t[0].type===void 0&&je(()=>t[4].call(g)),y(p,"class","track_select_container svelte-16amr53"),y(h,"class","track_inputs_container svelte-16amr53"),y(o,"class","track-note-menu svelte-16amr53"),y(n,"class",V="track-note type-"+t[0].type+" svelte-16amr53"),y(e,"class","track-note-container svelte-16amr53"),y(e,"data-track-note",B=t[0].fullName)},m(D,K){w(D,e,K),u(e,n),u(n,s),u(s,r),u(n,a),u(n,o),u(o,h),u(h,_),u(_,i),u(h,d),u(h,p),u(p,g);for(let F=0;F<C.length;F+=1)C[F].m(g,null);me(g,t[0].type),u(o,$),L&&L.m(o,null),M||(_e=ue(g,"change",t[4]),M=!0)},p(D,[K]){if(K&1&&l!==(l=D[0].fullName+"")&&ze(r,l),K&4){H=D[2];let F;for(F=0;F<H.length;F+=1){const J=Ot(D,H,F);C[F]?C[F].p(J,K):(C[F]=Gt(J),C[F].c(),C[F].m(g,null))}for(;F<C.length;F+=1)C[F].d(1);C.length=H.length}K&5&&me(g,D[0].type),D[0]&&D[1]&&D[0].isNote?L?L.p(D,K):(L=St(D),L.c(),L.m(o,null)):L&&(L.d(1),L=null),K&5&&V!==(V="track-note type-"+D[0].type+" svelte-16amr53")&&y(n,"class",V),K&5&&B!==(B=D[0].fullName)&&y(e,"data-track-note",B)},i:te,o:te,d(D){D&&c(e),Be(C,D),L&&L.d(),M=!1,_e()}}}function un(t,e,n){let{trackNote:s}=e,l;const r=Object.values(le);Ie.subscribe(_=>{_&&s.refreshHtmlElement()}),Ge.subscribe(_=>{n(1,l=_)});function a(){ye.playNote(s)}qe(()=>s.refreshHtmlElement()),dt(()=>s.refreshHtmlElement());function o(){s.type=Ve(this),n(0,s),n(2,r)}function h(){s.note=Ve(this),n(0,s),n(2,r)}return t.$$set=_=>{"trackNote"in _&&n(0,s=_.trackNote)},[s,l,r,a,o,h]}class _n extends De{constructor(e){super();Ae(this,e,un,fn,we,{trackNote:0})}}function pn(t){let e,n,s,l,r;return{c(){e=v("div"),n=v("div"),s=X("+"),this.h()},l(a){e=N(a,"DIV",{class:!0});var o=b(e);n=N(o,"DIV",{class:!0});var h=b(n);s=R(h,"+"),h.forEach(c),o.forEach(c),this.h()},h(){y(n,"class","track-note svelte-g8snzt"),y(e,"class","track-note-container svelte-g8snzt")},m(a,o){w(a,e,o),u(e,n),u(n,s),l||(r=ue(n,"click",t[0]),l=!0)},p:te,i:te,o:te,d(a){a&&c(e),l=!1,r()}}}function dn(t,e,n){let{position:s}=e,l;Ie.subscribe(a=>l=a||l);function r(){l.addNoteAt(s),Ie.set(l)}return t.$$set=a=>{"position"in a&&n(1,s=a.position)},[r,s]}class zt extends De{constructor(e){super();Ae(this,e,dn,pn,we,{position:1})}}function Ut(t,e,n){const s=t.slice();return s[11]=e[n],s[12]=e,s[13]=n,s}function mn(t){let e,n,s,l;return{c(){e=v("button"),n=X("\u23EF"),this.h()},l(r){e=N(r,"BUTTON",{type:!0,class:!0});var a=b(e);n=R(a,"\u23EF"),a.forEach(c),this.h()},h(){y(e,"type","button"),y(e,"class","track-control svelte-zgc0o4")},m(r,a){w(r,e,a),u(e,n),s||(l=ue(e,"click",t[4]),s=!0)},p:te,d(r){r&&c(e),s=!1,l()}}}function gn(t){let e,n,s,l;return{c(){e=v("button"),n=X("\u23F8"),this.h()},l(r){e=N(r,"BUTTON",{type:!0,class:!0});var a=b(e);n=R(a,"\u23F8"),a.forEach(c),this.h()},h(){y(e,"type","button"),y(e,"class","track-control svelte-zgc0o4")},m(r,a){w(r,e,a),u(e,n),s||(l=ue(e,"click",t[5]),s=!0)},p:te,d(r){r&&c(e),s=!1,l()}}}function Xt(t){let e,n,s,l,r;function a(h){t[9](h,t[11],t[12],t[13])}let o={};return t[11]!==void 0&&(o.trackNote=t[11]),e=new _n({props:o}),Me.push(()=>Oe(e,"trackNote",a)),l=new zt({props:{position:t[13]}}),{c(){ae(e.$$.fragment),s=P(),ae(l.$$.fragment)},l(h){ie(e.$$.fragment,h),s=I(h),ie(l.$$.fragment,h)},m(h,_){re(e,h,_),w(h,s,_),re(l,h,_),r=!0},p(h,_){t=h;const i={};!n&&_&4&&(n=!0,i.trackNote=t[11],Fe(()=>n=!1)),e.$set(i)},i(h){r||(Q(e.$$.fragment,h),Q(l.$$.fragment,h),r=!0)},o(h){Z(e.$$.fragment,h),Z(l.$$.fragment,h),r=!1},d(h){he(e,h),h&&c(s),he(l,h)}}}function vn(t){let e,n,s,l,r,a,o,h,_,i,d,p,g,$,V,B,M,_e,H;function C(E){t[7](E)}let L={min:ke.MIN_BEAT,max:ke.MAX_BEAT,float:!0,pips:!0,all:"label",springValues:t[6]};t[1]!==void 0&&(L.values=t[1]),o=new gt({props:L}),Me.push(()=>Oe(o,"values",C));function D(E){t[8](E)}let K={min:ke.MIN_BPM,max:ke.MAX_BPM,step:5,float:!0,pips:!0,pipstep:2,all:"label",springValues:t[6]};t[0]!==void 0&&(K.values=t[0]),p=new gt({props:K}),Me.push(()=>Oe(p,"values",D));function F(E,j){return E[3]?gn:mn}let J=F(t),O=J(t);M=new zt({props:{position:0}});let G=t[2].notes,A=[];for(let E=0;E<G.length;E+=1)A[E]=Xt(Ut(t,G,E));const fe=E=>Z(A[E],1,1,()=>{A[E]=null});return{c(){e=v("h2"),n=X("Track"),s=P(),l=v("section"),r=v("div"),a=X(`Beat:
		`),ae(o.$$.fragment),_=P(),i=v("div"),d=X(`Speed (bpm):
		`),ae(p.$$.fragment),$=P(),O.c(),V=P(),B=v("div"),ae(M.$$.fragment),_e=P();for(let E=0;E<A.length;E+=1)A[E].c();this.h()},l(E){e=N(E,"H2",{});var j=b(e);n=R(j,"Track"),j.forEach(c),s=I(E),l=N(E,"SECTION",{class:!0});var Y=b(l);r=N(Y,"DIV",{});var ne=b(r);a=R(ne,`Beat:
		`),ie(o.$$.fragment,ne),ne.forEach(c),_=I(Y),i=N(Y,"DIV",{});var S=b(i);d=R(S,`Speed (bpm):
		`),ie(p.$$.fragment,S),S.forEach(c),$=I(Y),O.l(Y),V=I(Y),B=N(Y,"DIV",{class:!0});var oe=b(B);ie(M.$$.fragment,oe),_e=I(oe);for(let de=0;de<A.length;de+=1)A[de].l(oe);oe.forEach(c),Y.forEach(c),this.h()},h(){y(B,"class","notes svelte-zgc0o4"),y(l,"class","svelte-zgc0o4")},m(E,j){w(E,e,j),u(e,n),w(E,s,j),w(E,l,j),u(l,r),u(r,a),re(o,r,null),u(l,_),u(l,i),u(i,d),re(p,i,null),u(l,$),O.m(l,null),u(l,V),u(l,B),re(M,B,null),u(B,_e);for(let Y=0;Y<A.length;Y+=1)A[Y].m(B,null);H=!0},p(E,[j]){const Y={};!h&&j&2&&(h=!0,Y.values=E[1],Fe(()=>h=!1)),o.$set(Y);const ne={};if(!g&&j&1&&(g=!0,ne.values=E[0],Fe(()=>g=!1)),p.$set(ne),J===(J=F(E))&&O?O.p(E,j):(O.d(1),O=J(E),O&&(O.c(),O.m(l,V))),j&4){G=E[2].notes;let S;for(S=0;S<G.length;S+=1){const oe=Ut(E,G,S);A[S]?(A[S].p(oe,j),Q(A[S],1)):(A[S]=Xt(oe),A[S].c(),Q(A[S],1),A[S].m(B,null))}for(Ke(),S=G.length;S<A.length;S+=1)fe(S);Je()}},i(E){if(!H){Q(o.$$.fragment,E),Q(p.$$.fragment,E),Q(M.$$.fragment,E);for(let j=0;j<G.length;j+=1)Q(A[j]);H=!0}},o(E){Z(o.$$.fragment,E),Z(p.$$.fragment,E),Z(M.$$.fragment,E),A=A.filter(Boolean);for(let j=0;j<A.length;j+=1)Z(A[j]);H=!1},d(E){E&&c(e),E&&c(s),E&&c(l),he(o),he(p),O.d(),he(M),Be(A,E)}}}function Nn(t,e,n){let s,l,r=[120],a=[4],o=!1;Ie.subscribe($=>{n(2,l=$||l),n(0,r=[l.bpm]),n(1,a=[l.beat]),s&&l.syncWithTune(s)}),Ge.subscribe($=>{s=$||s,l&&l.syncWithTune(s)});function h(){n(3,o=!0),ye.playTrack(l,()=>_())}function _(){n(3,o=!1),ye.stop()}const i={stiffness:.15,damping:.8};function d($){a=$,n(1,a)}function p($){r=$,n(0,r)}function g($,V,B,M){B[M]=$,n(2,l),n(0,r),n(1,a)}return t.$$.update=()=>{t.$$.dirty&3&&(n(2,l.bpm=r[0],l),n(2,l.beat=a[0],l))},[r,a,l,o,h,_,i,d,p,g]}class bn extends De{constructor(e){super();Ae(this,e,Nn,vn,we,{})}}function Rt(t,e,n){const s=t.slice();return s[5]=e[n],s}function Wt(t){let e,n=t[5].name+"",s,l,r;return{c(){e=v("option"),s=X(n),l=P(),this.h()},l(a){e=N(a,"OPTION",{});var o=b(e);s=R(o,n),l=I(o),o.forEach(c),this.h()},h(){e.__value=r=t[5],e.value=e.__value},m(a,o){w(a,e,o),u(e,s),u(e,l)},p(a,o){o&2&&n!==(n=a[5].name+"")&&ze(s,n),o&2&&r!==(r=a[5])&&(e.__value=r,e.value=e.__value)},d(a){a&&c(e)}}}function En(t){let e,n,s,l,r,a,o=t[1],h=[];for(let _=0;_<o.length;_+=1)h[_]=Wt(Rt(t,o,_));return{c(){e=v("h2"),n=X("Track list"),s=P(),l=v("select");for(let _=0;_<h.length;_+=1)h[_].c();this.h()},l(_){e=N(_,"H2",{});var i=b(e);n=R(i,"Track list"),i.forEach(c),s=I(_),l=N(_,"SELECT",{name:!0,id:!0,class:!0});var d=b(l);for(let p=0;p<h.length;p+=1)h[p].l(d);d.forEach(c),this.h()},h(){y(l,"name","tracks_list"),y(l,"id","tracks_list"),y(l,"class","svelte-81oup7"),t[0]===void 0&&je(()=>t[3].call(l))},m(_,i){w(_,e,i),u(e,n),w(_,s,i),w(_,l,i);for(let d=0;d<h.length;d+=1)h[d].m(l,null);me(l,t[0]),r||(a=[ue(l,"change",t[3]),ue(l,"change",t[2])],r=!0)},p(_,[i]){if(i&2){o=_[1];let d;for(d=0;d<o.length;d+=1){const p=Rt(_,o,d);h[d]?h[d].p(p,i):(h[d]=Wt(p),h[d].c(),h[d].m(l,null))}for(;d<h.length;d+=1)h[d].d(1);h.length=o.length}i&3&&me(l,_[0])},i:te,o:te,d(_){_&&c(e),_&&c(s),_&&c(l),Be(h,_),r=!1,Ze(a)}}}function yn(t,e,n){let s,l,r=[];Ge.subscribe(h=>{s=h||s}),Ie.subscribe(h=>n(0,l=h||l));function a(){Ie.set(l),l.syncWithTune(s)}qe(()=>{n(1,r=Ie.list(s))});function o(){l=Ve(this),n(0,l),n(1,r)}return[l,r,a,o]}class kn extends De{constructor(e){super();Ae(this,e,yn,En,we,{})}}function $n(t){let e,n,s,l,r,a,o,h,_,i,d;return l=new kn({}),o=new on({}),i=new bn({}),{c(){e=v("div"),n=v("aside"),s=v("section"),ae(l.$$.fragment),r=P(),a=v("section"),ae(o.$$.fragment),h=P(),_=v("aside"),ae(i.$$.fragment),this.h()},l(p){e=N(p,"DIV",{class:!0});var g=b(e);n=N(g,"ASIDE",{});var $=b(n);s=N($,"SECTION",{});var V=b(s);ie(l.$$.fragment,V),V.forEach(c),r=I($),a=N($,"SECTION",{});var B=b(a);ie(o.$$.fragment,B),B.forEach(c),$.forEach(c),h=I(g),_=N(g,"ASIDE",{id:!0,class:!0});var M=b(_);ie(i.$$.fragment,M),M.forEach(c),g.forEach(c),this.h()},h(){y(_,"id","track"),y(_,"class","svelte-1x7zd4i"),y(e,"class","container svelte-1x7zd4i")},m(p,g){w(p,e,g),u(e,n),u(n,s),re(l,s,null),u(n,r),u(n,a),re(o,a,null),u(e,h),u(e,_),re(i,_,null),d=!0},p:te,i(p){d||(Q(l.$$.fragment,p),Q(o.$$.fragment,p),Q(i.$$.fragment,p),d=!0)},o(p){Z(l.$$.fragment,p),Z(o.$$.fragment,p),Z(i.$$.fragment,p),d=!1},d(p){p&&c(e),he(l),he(o),he(i)}}}function Tn(t){return qe(()=>{ye.loadAudioFiles()}),[]}class Bn extends De{constructor(e){super();Ae(this,e,Tn,$n,we,{})}}export{Bn as default};