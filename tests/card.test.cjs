const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const source=fs.readFileSync('ha-card-template.js','utf8');
const hacs=JSON.parse(fs.readFileSync('hacs.json','utf8'));
test('HACS filename',()=>assert.equal(hacs.filename,'ha-card-template.js'));
test('seven languages',()=>{for(const l of ['en','es','pt','fr','de','it','nl'])assert.match(source,new RegExp('\\b'+l+':\\{'));});
test('registers card and editor',()=>{
 const registry=new Map(),cards=[];
 class Element{attachShadow(){return {innerHTML:'',querySelector(){return null;}};}}
 const ctx={HTMLElement:Element,customElements:{get:n=>registry.get(n),define:(n,v)=>registry.set(n,v)},window:{customCards:cards},CustomEvent:class{}};
 vm.runInNewContext(source,ctx);
 assert(registry.has('ha-card-template'));assert(registry.has('ha-card-template-editor'));assert.equal(cards.length,1);
});
test('escapes untrusted state',()=>assert.match(source,/function esc\(/));
test('does not contain personal entities',()=>assert.doesNotMatch(source,/sensor\.xpeng|switch\.impresora3d/));
