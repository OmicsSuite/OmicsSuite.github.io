import{ah as c,o as O,c as E,V as e,O as z,P as o,T as r,ax as $,ay as A,a as t,at as F}from"./@vue-248d724b.js";import{c as V,a as H}from"./vue-router-401d444e.js";import{i as G}from"./element-plus-bab1278a.js";import{Q as L}from"./@element-plus-0de4ac96.js";import{e as N}from"./echarts-9ae96183.js";import"./lodash-es-21c98b27.js";import"./@vueuse-89fc2c2e.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-5c34775c.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-64fe8e16.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-72671fae.js";import"./zrender-e9104294.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))f(d);new MutationObserver(d=>{for(const n of d)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&f(a)}).observe(document,{childList:!0,subtree:!0});function p(d){const n={};return d.integrity&&(n.integrity=d.integrity),d.referrerPolicy&&(n.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?n.credentials="include":d.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function f(d){if(d.ep)return;d.ep=!0;const n=p(d);fetch(d.href,n)}})();const C=(l,u)=>{const p=l.__vccOpts||l;for(const[f,d]of u)p[f]=d;return p},q={name:"app"},U={id:"app"};function W(l,u,p,f,d,n){const a=c("RouterView");return O(),E("div",U,[e(a)])}const j=C(q,[["render",W]]),X="modulepreload",Y=function(l,u){return new URL(l,u).href},P={},S=function(u,p,f){if(!p||p.length===0)return u();const d=document.getElementsByTagName("link");return Promise.all(p.map(n=>{if(n=Y(n,f),n in P)return;P[n]=!0;const a=n.endsWith(".css"),y=a?'[rel="stylesheet"]':"";if(!!f)for(let b=d.length-1;b>=0;b--){const h=d[b];if(h.href===n&&(!a||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${y}`))return;const g=document.createElement("link");if(g.rel=a?"stylesheet":X,a||(g.as="script",g.crossOrigin=""),g.href=n,document.head.appendChild(g),a)return new Promise((b,h)=>{g.addEventListener("load",b),g.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>u()).catch(n=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n})},T=""+new URL("logo.svg",import.meta.url).href;const Q={},k=l=>($("data-v-5aec12fb"),l=l(),A(),l),K=k(()=>t("img",{style:{width:"3em","aspect-ratio":"true"},src:T},null,-1)),Z=k(()=>t("span",{style:{"margin-left":"10px","font-size":"1.2em","font-weight":"bold"}}," OmicsSuite ",-1)),J=k(()=>t("div",{class:"flex-grow"},null,-1));function tt(l,u,p,f,d,n){const a=c("el-menu-item"),y=c("DataLine"),i=c("el-icon"),g=c("Guide"),b=c("Suitcase"),h=c("BrushFilled"),m=c("Connection"),w=c("OfficeBuilding"),x=c("el-menu");return O(),z(x,{"default-active":l.activeIndex,mode:"horizontal",ellipsis:"true","menu-trigger":"hover","collapse-transition":"true",router:""},{default:o(()=>[e(a,{index:"/"},{default:o(()=>[K,Z]),_:1}),J,e(a,{index:"/"},{default:o(()=>[e(i,null,{default:o(()=>[e(y)]),_:1}),r(" Home ")]),_:1}),e(a,{index:"/publish"},{default:o(()=>[e(i,null,{default:o(()=>[e(g)]),_:1}),r(" Publish ")]),_:1}),e(a,{index:"/downloads"},{default:o(()=>[e(i,null,{default:o(()=>[e(b)]),_:1}),r(" Downloads ")]),_:1}),e(a,{index:"/design"},{default:o(()=>[e(i,null,{default:o(()=>[e(h)]),_:1}),r(" Design ")]),_:1}),e(a,{index:"/friends"},{default:o(()=>[e(i,null,{default:o(()=>[e(m)]),_:1}),r(" Friends ")]),_:1}),e(a,{index:"/about"},{default:o(()=>[e(i,null,{default:o(()=>[e(w)]),_:1}),r(" About ")]),_:1})]),_:1},8,["default-active"])}const et=C(Q,[["render",tt],["__scopeId","data-v-5aec12fb"]]);const ot={},_=l=>($("data-v-05b8e7f0"),l=l(),A(),l),st=_(()=>t("img",{src:T,style:{width:"100px","aspect-ratio":"true"}},null,-1)),it=_(()=>t("p",{style:{"font-weight":"bold","font-size":"1.3em"}},"OmicsSuite",-1)),nt=_(()=>t("p",{style:{"font-weight":"bold"}},"Copyright © 2022-2023 OmicsSuite. All Rights Reserved.",-1)),at=_(()=>t("p",{style:{"font-weight":"bold"}},"OmicsSuite: OmicsSuite: a customized and pipelined suite for analysis and visualization of multi-omics big data.",-1)),lt=_(()=>t("p",{style:{"font-weight":"bold","font-size":"0.8em"}},"Citation: Ben-ben Miao, Wei Dong, Yi-xin Gu, Zhao-fang Han, Xuan Luo, Cai-huan Ke, Wei-wei You, OmicsSuite: a customized and pipelined suite for analysis and visualization of multi-omics big data, Horticulture Research, 2023;, uhad195, https://doi.org/10.1093/hr/uhad195.",-1)),ct=_(()=>t("br",null,null,-1)),rt={style:{"font-weight":"bold"}},dt=_(()=>t("a",{href:"https://github.com/benben-miao/",target:"_blank",style:{color:"#ffffff"}},"https://github.com/benben-miao/",-1)),ut={style:{"font-weight":"bold"}},mt=_(()=>t("a",{href:"benben.miao@outlook.com",target:"_blank",style:{color:"#ffffff"}},"benben.miao@outlook.com",-1)),_t={style:{"font-weight":"bold"}},pt=_(()=>t("a",{href:"https://www.xmu.edu.cn",target:"_blank",style:{color:"#ffffff"}},"https://www.xmu.edu.cn",-1)),ht={style:{"font-weight":"bold"}},ft=_(()=>t("a",{href:"https://omicssuite.github.io",target:"_blank",style:{color:"#ffffff"}},"https://omicssuite.github.io",-1)),gt={style:{"font-weight":"bold"}},bt=_(()=>t("a",{href:"https://github.com/OmicsSuite/",target:"_blank",style:{color:"#ffffff"}},"https://github.com/OmicsSuite/",-1)),yt={style:{"font-weight":"bold"}},vt=_(()=>t("a",{href:"https://space.bilibili.com/34105515/",target:"_blank",style:{color:"#ffffff"}},"https://space.bilibili.com/34105515/",-1)),wt=_(()=>t("br",null,null,-1)),St={style:{"font-weight":"bold"}},xt=_(()=>t("a",{href:"https://hiplot.org",target:"_blank",style:{color:"#ffffff"}},"https://hiplot.org",-1)),Ot={style:{"font-weight":"bold"}},Ct=_(()=>t("a",{href:"https://github.com/hiplot/",target:"_blank",style:{color:"#ffffff"}},"https://github.com/hiplot/",-1)),$t=_(()=>t("br",null,null,-1)),At={style:{"font-weight":"bold"}},kt=_(()=>t("a",{href:"https://github.com/benben-miao/TOmicsVis/",target:"_blank",style:{color:"#ffffff"}},"https://github.com/benben-miao/TOmicsVis/",-1)),Pt={style:{"font-weight":"bold"}},Et=_(()=>t("a",{href:"https://benben-miao.github.io/TOmicsVis/",target:"_blank",style:{color:"#ffffff"}},"https://benben-miao.github.io/TOmicsVis/",-1));function zt(l,u,p,f,d,n){const a=c("el-col"),y=c("UserFilled"),i=c("el-icon"),g=c("Message"),b=c("School"),h=c("Compass"),m=c("Connection"),w=c("el-row");return O(),z(w,{gutter:0},{default:o(()=>[e(a,{span:24,sm:4,lg:4},{default:o(()=>[st,it]),_:1}),e(a,{span:24,sm:10,lg:10},{default:o(()=>[nt,at,lt,ct,t("p",rt,[e(i,null,{default:o(()=>[e(y)]),_:1}),r(" Author: benben-miao "),dt]),t("p",ut,[e(i,null,{default:o(()=>[e(g)]),_:1}),r(" Contact Email: "),mt]),t("p",_t,[e(i,null,{default:o(()=>[e(b)]),_:1}),r(" Institution: Xiamen University "),pt])]),_:1}),e(a,{span:24,sm:10,lg:10},{default:o(()=>[t("p",ht,[e(i,null,{default:o(()=>[e(h)]),_:1}),r(" OmicsSuite Website: "),ft]),t("p",gt,[e(i,null,{default:o(()=>[e(h)]),_:1}),r(" OmicsSuite GitHub: "),bt]),t("p",yt,[e(i,null,{default:o(()=>[e(h)]),_:1}),r(" OmicsSuite Tutorials: "),vt]),wt,t("p",St,[e(i,null,{default:o(()=>[e(m)]),_:1}),r(" Hiplot Bioinformatics Cloud: "),xt]),t("p",Ot,[e(i,null,{default:o(()=>[e(m)]),_:1}),r(" Hiplot GitHub: "),Ct]),$t,t("p",At,[e(i,null,{default:o(()=>[e(m)]),_:1}),r(" TOmicsVis R Package: "),kt]),t("p",Pt,[e(i,null,{default:o(()=>[e(m)]),_:1}),r(" TOmicsVis API Docs: "),Et])]),_:1})]),_:1})}const Tt=C(ot,[["render",zt],["__scopeId","data-v-05b8e7f0"]]);const Mt={components:{AppHeader:et,AppFooter:Tt},data(){return{}},mounted(){this.chart1(),this.animation()},methods:{downloadOmicsSuite(){const l="https://sourceforge.net/projects/omicssuite-github-io/files/latest/download";window.open(l,"_blank")},chinaDownloadOmicsSuite(){const l="https://www.aliyundrive.com/s/Defuhf7FVGw";window.open(l,"_blank")},chart1(){var l=this.$echarts.init(document.getElementById("chart1")),u={title:{text:"OmicsSuite Categories and Apps (175)",subtext:"The Count of Applications!",left:"center"},legend:{bottom:"bottom"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)",backgroundColor:"#000000cd",padding:15,borderRadius:10,textStyle:{color:"#ffffff"}},series:[{name:"Charts",type:"pie",radius:[10,180],center:["50%","50%"],roseType:"area",itemStyle:{borderRadius:50,shadowColor:"#cdcdcd",shadowBlur:50},label:{show:!0,fontSize:13,fontWeight:"bolder"},data:[{value:20,name:"1. Sequence"},{value:16,name:"2. Statistics"},{value:24,name:"3. Algorithm"},{value:21,name:"4. Genomics"},{value:14,name:"5. Transcriptomics"},{value:11,name:"6. Enrichment"},{value:5,name:"7. Proteomics"},{value:18,name:"8. Metabolomics"},{value:7,name:"9. Clinical"},{value:8,name:"10. MicroOrganisms"},{value:22,name:"11. SingleCell"},{value:4,name:"12. Mathematics"},{value:5,name:"13. TableOperation"}]}],color:["#DC143C","#FF5555","#FF8C00","#F4A460","#228B22","#3CB371","#008B8B","#20B2AA","#4169E1","#1E90FF","#800080","#9932CC","#FFD700"]};l.setOption(u)},animation(){function p(n,a){return Math.random()*(a-n)+n}class f{constructor(a){this.el=a;const y=this.el.getBoundingClientRect();this.size=y.width,this.initialX=p(0,window.innerWidth-this.size),this.initialY=p(0,window.innerHeight-this.size),this.el.style.top=`${this.initialY}px`,this.el.style.left=`${this.initialX}px`,this.vx=p(.5,2)*(Math.random()>.5?1:-1),this.vy=p(.5,2)*(Math.random()>.5?1:-1),this.x=this.initialX,this.y=this.initialY}update(){this.x+=this.vx,this.y+=this.vy,this.x>=window.innerWidth-this.size&&(this.x=window.innerWidth-this.size,this.vx*=-1),this.y>=window.innerHeight-this.size&&(this.y=window.innerHeight-this.size,this.vy*=-1),this.x<=0&&(this.x=0,this.vx*=-1),this.y<=0&&(this.y=0,this.vy*=-1)}move(){this.el.style.transform=`translate(${this.x-this.initialX}px, ${this.y-this.initialY}px)`}}function d(){const n=document.querySelectorAll(".bouncing-blob"),a=Array.from(n).map(i=>new f(i));function y(){requestAnimationFrame(y),a.forEach(i=>{i.update(),i.move()})}requestAnimationFrame(y)}d()}}},s=l=>($("data-v-90290fc2"),l=l(),A(),l),Dt={class:"common-layout"},Rt={class:"page"},Bt=s(()=>t("div",null,[t("div",{class:"bouncing-blobs-container"},[t("div",{class:"bouncing-blobs-glass"}),t("div",{class:"bouncing-blobs"},[t("div",{class:"bouncing-blob bouncing-blob--blue"}),t("div",{class:"bouncing-blob bouncing-blob--white"}),t("div",{class:"bouncing-blob bouncing-blob--purple"}),t("div",{class:"bouncing-blob bouncing-blob--pink"})])])],-1)),It=s(()=>t("p",{style:{"font-size":"2em","font-weight":"bold",color:"#000000"}}," OmicsSuite ",-1)),Ft=s(()=>t("br",null,null,-1)),Vt=s(()=>t("p",{style:{"font-size":"1.3em","font-weight":"bold",color:"#008888","text-align":"justify"}}," OmicsSuite: a customized and pipelined suite for analysis and visualization of multi-omics big data. ",-1)),Ht=s(()=>t("br",null,null,-1)),Gt=s(()=>t("div",{class:"image-text-card"},[t("p",{style:{"font-size":"1.2em","text-align":"justify","line-height":"2em"}},[t("span",{style:{"font-weight":"bold"}},"OmicsSuite"),r(" ("),t("a",{href:"https://github.com/OmicsSuite/",target:"_blank",style:{color:"#008888"}},"https://github.com/OmicsSuite/"),r("), original name "),t("span",{style:{"font-weight":"bold"}},"BioSciTools"),r(", a desktop program developed based on "),t("span",{style:{"font-weight":"bold"}},"Java-v11.0.0 and R-v4.2.2"),r(", aims to make new exploration and contribution to the development of bioinformatics, and realize data analysis and visualization in the fields of "),t("span",{style:{"font-weight":"bold"}},"statistics, algorithm,"),r(" sequence analysis, "),t("span",{style:{"font-weight":"bold"}},"multi-omics (transcriptomics, genomics, proteomics, metabolomics, single cell),"),r(" microbiology, clinical, etc. ")])],-1)),Lt=s(()=>t("br",null,null,-1)),Nt={class:"image-text-card"},qt=s(()=>t("iframe",{src:"https://my.spline.design/cristmastree-f643d5f2a54193f7df9453cd82e4212f/",style:{width:"100%",height:"450px","border-width":"0px","border-radius":"10px"}},null,-1)),Ut=s(()=>t("br",null,null,-1)),Wt=s(()=>t("p",{class:"card-title"},"Christmas Tree",-1)),jt=s(()=>t("br",null,null,-1)),Xt=s(()=>t("span",{style:{"font-size":"1.2em","font-weight":"bold"}},"Christmas Tree",-1)),Yt=s(()=>t("br",null,null,-1)),Qt=s(()=>t("br",null,null,-1)),Kt=s(()=>t("p",{class:"card-content"},[r(" Merry Christmas! "),t("br"),r(" 圣诞节快乐，平平安安！ ")],-1)),Zt=s(()=>t("br",null,null,-1)),Jt=s(()=>t("p",{style:{"font-size":"1.2em","font-weight":"bold","text-align":"justify"}},[r("Ben-ben Miao, Wei Dong, Yi-xin Gu, Zhao-fang Han, Xuan Luo, Cai-huan Ke, Wei-wei You, OmicsSuite: a customized and pipelined suite for analysis and visualization of multi-omics big data, "),t("i",null,"Horticulture Research"),r(", 2023;, uhad195, "),t("a",{href:"https://doi.org/10.1093/hr/uhad195",target:"_blank",style:{color:"#008888"}},"https://doi.org/10.1093/hr/uhad195"),r(". ")],-1)),te=s(()=>t("br",null,null,-1)),ee=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Home.png",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),oe=s(()=>t("p",{style:{"font-size":"2em","font-weight":"bold"}},"User Interface",-1)),se=s(()=>t("br",null,null,-1)),ie=s(()=>t("p",{class:"card-title"},[r(" OmicsSuite GitHub: "),t("br"),t("a",{href:"https://github.com/OmicsSuite/",target:"_blank",style:{color:"#008888"}},"https://github.com/OmicsSuite/")],-1)),ne=s(()=>t("br",null,null,-1)),ae=s(()=>t("p",{class:"card-title"},[r(" OmicsSuite Courses: "),t("br"),t("a",{href:"https://space.bilibili.com/34105515",target:"_blank",style:{color:"#008888"}},"https://space.bilibili.com/34105515")],-1)),le=s(()=>t("br",null,null,-1)),ce=s(()=>t("p",{class:"card-title"},[r(" OmicsSuite Article: "),t("br"),t("a",{href:"https://doi.org/10.1093/hr/uhad195",target:"_blank",style:{color:"#008888"}},"https://doi.org/10.1093/hr/uhad195")],-1)),re=s(()=>t("br",null,null,-1)),de=s(()=>t("span",{style:{"font-size":"1.2em","font-weight":"bold"}},"OmicsSuite Win (全球)",-1)),ue=s(()=>t("br",null,null,-1)),me=s(()=>t("span",{style:{"font-size":"1.2em","font-weight":"bold"}},"OmicsSuite Win (中国)",-1)),_e=s(()=>t("br",null,null,-1)),pe=s(()=>t("hr",null,null,-1)),he=s(()=>t("br",null,null,-1)),fe=s(()=>t("p",{style:{"font-size":"2em","font-weight":"bold",color:"#000000"}}," Presentation ",-1)),ge=s(()=>t("div",{class:"image-text-card"},[t("div",{id:"chart1",style:{width:"100%","min-height":"520px"}})],-1)),be=s(()=>t("br",null,null,-1)),ye={class:"image-text-card"},ve=s(()=>t("p",{class:"card-title"},"1. Sequence Editor:",-1)),we=s(()=>t("p",{class:"card-content"}," Sequence category in OmicsSuite includes a variety of sub-applications for querying or editing sequences, such as SeqsGC is used for sequences GC content statistics; RevCom performs reverse complement of DNA/RNA sequences, and SeqsTranslate realizes the translation of DNA sequences into amino acids (providing genetic codes such as Standard, Vertebrate Mitochondria, and Yeast Mitochondria). ",-1)),Se=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Sequence.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),xe=s(()=>t("br",null,null,-1)),Oe={class:"image-text-card"},Ce=s(()=>t("p",{class:"card-title"},"2. Statistics visualization:",-1)),$e=s(()=>t("p",{class:"card-content"}," OmicsSuite comprehensively refers to the advantages of Excel (Microsoft, Redmond, WA, USA), SPSS (Statistical Package for the Social Sciences) (IBM, Armonk, NY, USA), and Prism (GraphPad, San Diego, CA, USA) to develop a customized statistical results and visualization system. The Statistics category includes 15 distinct basic statistical visualization sub-applications. These include ScatterPlot, PieStat, BarStat, BoxStat, PairsCorrelation, RadarStat, DensityNormal, ViolinStat (combined names), etc. ",-1)),Ae=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Statistics.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),ke=s(()=>t("br",null,null,-1)),Pe={class:"image-text-card"},Ee=s(()=>t("p",{class:"card-title"},"3. Algorithm visualization:",-1)),ze=s(()=>t("p",{class:"card-content"}," Algorithm category integrates algorithms and implements visualization methods such as dimensionality reduction and clustering analyses. We have developed corresponding sub-applications for the dimensionality reduction algorithms PCA (Principal Components Analysis), PCoA (Principal Coordinates Analysis), tSNE (t-distributed Stochastic Neighbor Embedding), UMAP (Uniform Manifold Approximation and Projection), NMDS (Non-metric Multi-Dimensional Scaling) and RDA (Redundancy analysis), respectively. ",-1)),Te=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Algorithm.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),Me=s(()=>t("br",null,null,-1)),De={class:"image-text-card"},Re=s(()=>t("p",{class:"card-title"},"4. Omics Genomics:",-1)),Be=s(()=>t("p",{class:"card-content"}," OmicsSuite has developed four types of genome circle maps based on the Rcircos and chloroplot packages to assist users in visualizing the genome. MitoGenome (Mitochondrial Genome) can parse GenBank-formatted mitochondrial genome information and display the GC content of each gene and of pseudogene markers. ChloroplastGenome (Chloroplast Genome) provides support for displaying the GC content of inverted repeat sequences (IRA/IRB), GC content of genes, pseudogene markers, and InDel information. ",-1)),Ie=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Genomics.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),Fe=s(()=>t("br",null,null,-1)),Ve={class:"image-text-card"},He=s(()=>t("p",{class:"card-title"},"5. Omics Transcriptomics:",-1)),Ge=s(()=>t("p",{class:"card-content"}," VolcanoPlot and MversusA (MAplot) (combined names) can intuitively display the differentially expressed genes between paired groups. ExpressionTrends (Expression Trends) can display the linear trajectories of all genes in multiple groups, making it convenient to observe the expression trends of genes with traits. Similarly, WGCNA performs a weighted gene co-expression network analysis, taking multiple-group gene expression data as input. ",-1)),Le=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Transcriptomics.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),Ne=s(()=>t("br",null,null,-1)),qe={class:"image-text-card"},Ue=s(()=>t("p",{class:"card-title"},"6. Omics Metabolomics:",-1)),We=s(()=>t("p",{class:"card-content"}," To integrate the functions provided by MetaboAnalystR and ropls packages, 18 sub-applications have been developed for metabolomics, including exploration of mass spectrometry raw mzML data (from UPLC-QE, HPLC-Q/TOF, HPLC-Ion_Trap, HPLC-Orbitrap, and other platforms) to downstream multivariate analysis. Sample MzML data are filtered based on QCs and then analyzed. ",-1)),je=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Metabolomics.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),Xe=s(()=>t("br",null,null,-1)),Ye={class:"image-text-card"},Qe=s(()=>t("p",{class:"card-title"},"7. Omics Microbe:",-1)),Ke=s(()=>t("p",{class:"card-content"}," The OTUtree (Operational Taxonomic Unit evolutionary Tree) in OmicsSuite uses the OTU table to construct a microbial phylogenetic tree, and the results are displayed as circle graphs. For microbial diversity analysis, TernaryDiagram (Ternary Diagram) can analyze the relative abundances of species in different groups. The coordinate axes represent three experimental groups and the dots represent taxonomic units (e.g., Genus). ",-1)),Ze=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-Microbe.png",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),Je=s(()=>t("br",null,null,-1)),to={class:"image-text-card"},eo=s(()=>t("p",{class:"card-title"},"8. Omics SingleCell:",-1)),oo=s(()=>t("p",{class:"card-content"}," OmicsSuite has developed a pipeline and interactive suite of 22 sub-applications for single-cell transcriptomics based on packages such as Seurat v4 and Monocle2 that provide interfaces for almost all parameters. The 10X Genomics raw data is output in Matrix format after being processed by Chromium, and the results can be read by all sub-applications and entered into the corresponding analysis steps. ",-1)),so=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-SingleCell.jpg",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),io=s(()=>t("br",null,null,-1)),no={class:"image-text-card"},ao=s(()=>t("p",{class:"card-title"},"9. Omics AppUI:",-1)),lo=s(()=>t("p",{class:"card-content"}," The parameter component section includes both fixed and variable parameter components. The fixed components Progress, Demo, Clear, and Submit are part of the task management components used to display the current status, run example data, clear the current task, and submit a new task respectively. Other common components such as Themes, Colors, Fonts, Figure Width, Figure Height, and Figure DPI belong to the parameter specification components. ",-1)),co=s(()=>t("img",{src:"https://benben-miao.gitee.io/image-cloud/OmicsSuite/OmicsSuite-App.png",style:{width:"100%","aspect-ratio":"true","border-radius":"10px"}},null,-1)),ro=s(()=>t("br",null,null,-1));function uo(l,u,p,f,d,n){const a=c("AppHeader"),y=c("el-header"),i=c("el-col"),g=c("Compass"),b=c("el-icon"),h=c("el-button"),m=c("el-row"),w=c("el-alert"),x=c("Download"),M=c("el-main"),D=c("AppFooter"),R=c("el-footer"),B=c("el-container"),I=c("el-backtop");return O(),E("div",Dt,[e(B,null,{default:o(()=>[e(y,null,{default:o(()=>[e(a)]),_:1}),e(M,null,{default:o(()=>[t("div",Rt,[t("div",null,[Bt,It,Ft,Vt,Ht,Gt,Lt,t("div",Nt,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:16,lg:16},{default:o(()=>[qt]),_:1}),e(i,{span:24,sm:8,lg:8},{default:o(()=>[Ut,Wt,jt,e(h,{tag:"a",href:"https://my.spline.design/cristmastree-f643d5f2a54193f7df9453cd82e4212f/",target:"_blank",rel:"noopener noreferrer",style:{"background-color":"#ff2040",color:"#ffffff",height:"45px"}},{default:o(()=>[e(b,{style:{"font-size":"1.5em"}},{default:o(()=>[e(g)]),_:1}),Xt]),_:1}),Yt,Qt,Kt]),_:1})]),_:1})]),Zt,e(w,{title:"Citation: OmicsSuite",type:"warning",closable:!1},{default:o(()=>[Jt]),_:1}),te,e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:24,lg:16},{default:o(()=>[ee]),_:1}),e(i,{span:24,sm:24,lg:8},{default:o(()=>[oe,se,ie,ne,ae,le,ce,re,e(h,{onClick:n.downloadOmicsSuite,style:{"background-color":"#ff2040",color:"#ffffff",height:"45px"}},{default:o(()=>[e(b,{style:{"font-size":"1.2em"}},{default:o(()=>[e(x)]),_:1}),de]),_:1},8,["onClick"]),ue,e(h,{onClick:n.chinaDownloadOmicsSuite,style:{"background-color":"#ff2040",color:"#ffffff",height:"45px"}},{default:o(()=>[e(b,{style:{"font-size":"1.2em"}},{default:o(()=>[e(x)]),_:1}),me]),_:1},8,["onClick"])]),_:1})]),_:1})]),_e,pe,t("div",null,[he,fe,ge,be,t("div",ye,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[ve,we]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[Se]),_:1})]),_:1})]),xe,t("div",Oe,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[Ce,$e]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[Ae]),_:1})]),_:1})]),ke,t("div",Pe,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[Ee,ze]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[Te]),_:1})]),_:1})]),Me,t("div",De,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[Re,Be]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[Ie]),_:1})]),_:1})]),Fe,t("div",Ve,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[He,Ge]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[Le]),_:1})]),_:1})]),Ne,t("div",qe,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[Ue,We]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[je]),_:1})]),_:1})]),Xe,t("div",Ye,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[Qe,Ke]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[Ze]),_:1})]),_:1})]),Je,t("div",to,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[eo,oo]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[so]),_:1})]),_:1})]),io,t("div",no,[e(m,{gutter:20},{default:o(()=>[e(i,{span:24,sm:8,lg:8},{default:o(()=>[ao,lo]),_:1}),e(i,{span:24,sm:16,lg:16},{default:o(()=>[co]),_:1})]),_:1})]),ro])])]),_:1}),e(R,null,{default:o(()=>[e(D)]),_:1})]),_:1}),e(I,{right:50,bottom:100})])}const mo=C(Mt,[["render",uo],["__scopeId","data-v-90290fc2"]]),_o=()=>S(()=>import("./AboutView-1e9ffb77.js"),["./AboutView-1e9ffb77.js","./@vue-248d724b.js","./vue-router-401d444e.js","./element-plus-bab1278a.js","./lodash-es-21c98b27.js","./@vueuse-89fc2c2e.js","./@element-plus-0de4ac96.js","./@popperjs-c75af06c.js","./@ctrl-f8748455.js","./dayjs-5c34775c.js","./async-validator-dee29e8b.js","./memoize-one-297ddbcb.js","./escape-html-64fe8e16.js","./normalize-wheel-es-ed76fb12.js","./@floating-ui-72671fae.js","./element-plus.css","./echarts-9ae96183.js","./zrender-e9104294.js","./AboutView.css"],import.meta.url),po=()=>S(()=>import("./PublishView-9b4f9140.js"),["./PublishView-9b4f9140.js","./@vue-248d724b.js","./vue-router-401d444e.js","./element-plus-bab1278a.js","./lodash-es-21c98b27.js","./@vueuse-89fc2c2e.js","./@element-plus-0de4ac96.js","./@popperjs-c75af06c.js","./@ctrl-f8748455.js","./dayjs-5c34775c.js","./async-validator-dee29e8b.js","./memoize-one-297ddbcb.js","./escape-html-64fe8e16.js","./normalize-wheel-es-ed76fb12.js","./@floating-ui-72671fae.js","./element-plus.css","./echarts-9ae96183.js","./zrender-e9104294.js","./PublishView.css"],import.meta.url),ho=()=>S(()=>import("./DownloadView-1025566f.js"),["./DownloadView-1025566f.js","./@vue-248d724b.js","./vue-router-401d444e.js","./element-plus-bab1278a.js","./lodash-es-21c98b27.js","./@vueuse-89fc2c2e.js","./@element-plus-0de4ac96.js","./@popperjs-c75af06c.js","./@ctrl-f8748455.js","./dayjs-5c34775c.js","./async-validator-dee29e8b.js","./memoize-one-297ddbcb.js","./escape-html-64fe8e16.js","./normalize-wheel-es-ed76fb12.js","./@floating-ui-72671fae.js","./element-plus.css","./echarts-9ae96183.js","./zrender-e9104294.js","./DownloadView.css"],import.meta.url),fo=()=>S(()=>import("./DesignView-8978a26c.js"),["./DesignView-8978a26c.js","./@vue-248d724b.js","./vue-router-401d444e.js","./element-plus-bab1278a.js","./lodash-es-21c98b27.js","./@vueuse-89fc2c2e.js","./@element-plus-0de4ac96.js","./@popperjs-c75af06c.js","./@ctrl-f8748455.js","./dayjs-5c34775c.js","./async-validator-dee29e8b.js","./memoize-one-297ddbcb.js","./escape-html-64fe8e16.js","./normalize-wheel-es-ed76fb12.js","./@floating-ui-72671fae.js","./element-plus.css","./echarts-9ae96183.js","./zrender-e9104294.js","./DesignView.css"],import.meta.url),go=()=>S(()=>import("./FriendsView-fb001f9e.js"),["./FriendsView-fb001f9e.js","./@vue-248d724b.js","./vue-router-401d444e.js","./element-plus-bab1278a.js","./lodash-es-21c98b27.js","./@vueuse-89fc2c2e.js","./@element-plus-0de4ac96.js","./@popperjs-c75af06c.js","./@ctrl-f8748455.js","./dayjs-5c34775c.js","./async-validator-dee29e8b.js","./memoize-one-297ddbcb.js","./escape-html-64fe8e16.js","./normalize-wheel-es-ed76fb12.js","./@floating-ui-72671fae.js","./element-plus.css","./echarts-9ae96183.js","./zrender-e9104294.js","./FriendsView.css"],import.meta.url),bo=V({history:H(),routes:[{path:"/",name:"home",component:mo},{path:"/publish",name:"publish",component:po},{path:"/downloads",name:"downloads",component:ho},{path:"/design",name:"design",component:fo},{path:"/friends",name:"friends",component:go},{path:"/about",name:"about",component:_o},{path:"/404",name:"404",redirect:"/"},{path:"/:pathMatch(.*)",redirect:"/"}]}),v=F(j);v.use(bo);v.use(G);for(const[l,u]of Object.entries(L))v.component(l,u);v.config.globalProperties.$echarts=N;v.config.globalProperties.$appName="OmicsSuite";v.config.globalProperties.$serverHostPort="http://127.0.0.1:5000/";v.config.warnHandler=()=>null;v.mount("#app");export{et as A,C as _,Tt as a,T as b};
