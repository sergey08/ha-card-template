/* Home Assistant Lovelace card starter — replace example logic for your project. */
const I18N={
 en:{title:"Example card",state:"State",missing:"Select an entity in the visual editor",unavailable:"Unavailable",entity:"Entity",accent:"Accent color",showName:"Show entity name"},
 es:{title:"Tarjeta de ejemplo",state:"Estado",missing:"Selecciona una entidad en el editor visual",unavailable:"No disponible",entity:"Entidad",accent:"Color de acento",showName:"Mostrar nombre de entidad"},
 pt:{title:"Cartão de exemplo",state:"Estado",missing:"Selecione uma entidade no editor visual",unavailable:"Indisponível",entity:"Entidade",accent:"Cor de destaque",showName:"Mostrar nome da entidade"},
 fr:{title:"Carte exemple",state:"État",missing:"Sélectionnez une entité dans l'éditeur visuel",unavailable:"Indisponible",entity:"Entité",accent:"Couleur d'accent",showName:"Afficher le nom de l'entité"},
 de:{title:"Beispielkarte",state:"Status",missing:"Entität im visuellen Editor auswählen",unavailable:"Nicht verfügbar",entity:"Entität",accent:"Akzentfarbe",showName:"Entitätsname anzeigen"},
 it:{title:"Scheda di esempio",state:"Stato",missing:"Seleziona un'entità nell'editor visuale",unavailable:"Non disponibile",entity:"Entità",accent:"Colore principale",showName:"Mostra nome entità"},
 nl:{title:"Voorbeeldkaart",state:"Status",missing:"Selecteer een entiteit in de visuele editor",unavailable:"Niet beschikbaar",entity:"Entiteit",accent:"Accentkleur",showName:"Entiteitsnaam tonen"}
};
const DEFAULTS={type:"custom:ha-card-template",entity:"",accent:"#00a6d6",show_name:true};
function langOf(hass){const l=String(hass?.locale?.language||hass?.language||"en").split("-")[0].toLowerCase();return I18N[l]?l:"en";}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function accentOf(v){return /^#[0-9a-fA-F]{6}$/.test(v)?v:DEFAULTS.accent;}
class HACardTemplate extends HTMLElement{
 constructor(){super();this.attachShadow({mode:"open"});this._config={...DEFAULTS};}
 setConfig(config){if(!config||typeof config!=="object")throw Error("Invalid configuration");this._config={...DEFAULTS,...config};this.render();}
 set hass(hass){this._hass=hass;this.render();}
 getCardSize(){return 2;}
 static getConfigElement(){return document.createElement("ha-card-template-editor");}
 static getStubConfig(){return {...DEFAULTS};}
 render(){
  if(!this.shadowRoot)return;
  const c=this._config,h=this._hass,t=I18N[langOf(h)],e=h?.states?.[c.entity];
  const state=!c.entity?t.missing:!e||["unknown","unavailable"].includes(e.state)?t.unavailable:e.state;
  const name=c.show_name&&e?e.attributes?.friendly_name||c.entity:t.title;
  this.shadowRoot.innerHTML=`<style>:host{display:block}ha-card{display:block;padding:18px;border-radius:var(--ha-card-border-radius,12px);background:var(--ha-card-background,var(--card-background-color,#fff));color:var(--primary-text-color,#222);box-shadow:var(--ha-card-box-shadow,none)}.bar{border-left:4px solid var(--accent);padding-left:12px}.name{font-weight:600;font-size:1.05rem}.state{margin-top:8px;color:var(--secondary-text-color,#777);overflow-wrap:anywhere}</style><ha-card style="--accent:${accentOf(c.accent)}"><div class="bar"><div class="name">${esc(name)}</div><div class="state">${esc(t.state)}: ${esc(state)}</div></div></ha-card>`;
 }
}
class HACardTemplateEditor extends HTMLElement{
 constructor(){super();this.attachShadow({mode:"open"});this._config={...DEFAULTS};}
 setConfig(c){this._config={...DEFAULTS,...c};this.render();}
 set hass(h){this._hass=h;this.render();}
 update(key,value){this._config={...this._config,[key]:value};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:true,composed:true}));}
 render(){
  const t=I18N[langOf(this._hass)],c=this._config;
  this.shadowRoot.innerHTML=`<style>:host{display:block}.field{display:flex;flex-direction:column;gap:5px;margin:10px 0}input{padding:9px;border:1px solid var(--divider-color,#aaa);border-radius:6px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222)}</style><div class="field"><label for="entity">${esc(t.entity)}</label><input id="entity" list="entities" value="${esc(c.entity)}"><datalist id="entities"></datalist></div><div class="field"><label for="accent">${esc(t.accent)}</label><input id="accent" type="color" value="${accentOf(c.accent)}"></div><label><input id="showName" type="checkbox" ${c.show_name?"checked":""}> ${esc(t.showName)}</label>`;
  const list=this.shadowRoot.querySelector("#entities");
  for(const id of Object.keys(this._hass?.states||{}).sort()){const option=document.createElement("option");option.value=id;list.append(option);}
  this.shadowRoot.querySelector("#entity").addEventListener("change",e=>this.update("entity",e.target.value.trim()));
  this.shadowRoot.querySelector("#accent").addEventListener("change",e=>this.update("accent",e.target.value));
  this.shadowRoot.querySelector("#showName").addEventListener("change",e=>this.update("show_name",e.target.checked));
 }
}
if(!customElements.get("ha-card-template"))customElements.define("ha-card-template",HACardTemplate);
if(!customElements.get("ha-card-template-editor"))customElements.define("ha-card-template-editor",HACardTemplateEditor);
window.customCards=window.customCards||[];
if(!window.customCards.some(c=>c.type==="ha-card-template"))window.customCards.push({type:"ha-card-template",name:"HA Card Template",description:"Starter example: replace before publishing a new card."});
