(()=>{var e={738:(e,r,t)=>{const n=t(147),o=t(17),s=t(37),i=t(113),a=t(968).version,c=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function d(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function l(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function u(e,r){let t;try{t=new URL(r)}catch(e){if("ERR_INVALID_URL"===e.code)throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");throw e}const n=t.password;if(!n)throw new Error("INVALID_DOTENV_KEY: Missing key part");const o=t.searchParams.get("environment");if(!o)throw new Error("INVALID_DOTENV_KEY: Missing environment part");const s=`DOTENV_VAULT_${o.toUpperCase()}`,i=e.parsed[s];if(!i)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);return{ciphertext:i,key:n}}function p(e){let r=o.resolve(process.cwd(),".env");return e&&e.path&&e.path.length>0&&(r=e.path),r.endsWith(".vault")?r:`${r}.vault`}const f={configDotenv:function(e){let r=o.resolve(process.cwd(),".env"),t="utf8";const i=Boolean(e&&e.debug);var a;e&&(null!=e.path&&(r="~"===(a=e.path)[0]?o.join(s.homedir(),a.slice(1)):a),null!=e.encoding&&(t=e.encoding));try{const o=f.parse(n.readFileSync(r,{encoding:t}));let s=process.env;return e&&null!=e.processEnv&&(s=e.processEnv),f.populate(s,o,e),{parsed:o}}catch(e){return i&&d(`Failed to load ${r} ${e.message}`),{error:e}}},_configVault:function(e){console.log(`[dotenv@${a}][INFO] Loading env from encrypted .env.vault`);const r=f._parseVault(e);let t=process.env;return e&&null!=e.processEnv&&(t=e.processEnv),f.populate(t,r,e),{parsed:r}},_parseVault:function(e){const r=p(e),t=f.configDotenv({path:r});if(!t.parsed)throw new Error(`MISSING_DATA: Cannot parse ${r} for an unknown reason`);const n=l(e).split(","),o=n.length;let s;for(let e=0;e<o;e++)try{const r=u(t,n[e].trim());s=f.decrypt(r.ciphertext,r.key);break}catch(r){if(e+1>=o)throw r}return f.parse(s)},config:function(e){const r=p(e);return 0===l(e).length?f.configDotenv(e):n.existsSync(r)?f._configVault(e):(t=`You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${t}`),f.configDotenv(e));var t},decrypt:function(e,r){const t=Buffer.from(r.slice(-64),"hex");let n=Buffer.from(e,"base64");const o=n.slice(0,12),s=n.slice(-16);n=n.slice(12,-16);try{const e=i.createDecipheriv("aes-256-gcm",t,o);return e.setAuthTag(s),`${e.update(n)}${e.final()}`}catch(e){const r=e instanceof RangeError,t="Invalid key length"===e.message,n="Unsupported state or unable to authenticate data"===e.message;if(r||t)throw new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");if(n)throw new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw console.error("Error: ",e.code),console.error("Error: ",e.message),e}},parse:function(e){const r={};let t,n=e.toString();for(n=n.replace(/\r\n?/gm,"\n");null!=(t=c.exec(n));){const e=t[1];let n=t[2]||"";n=n.trim();const o=n[0];n=n.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===o&&(n=n.replace(/\\n/g,"\n"),n=n.replace(/\\r/g,"\r")),r[e]=n}return r},populate:function(e,r,t={}){const n=Boolean(t&&t.debug),o=Boolean(t&&t.override);if("object"!=typeof r)throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(const t of Object.keys(r))Object.prototype.hasOwnProperty.call(e,t)?(!0===o&&(e[t]=r[t]),n&&d(!0===o?`"${t}" is already defined and WAS overwritten`:`"${t}" is already defined and was NOT overwritten`)):e[t]=r[t]}};e.exports.configDotenv=f.configDotenv,e.exports._configVault=f._configVault,e.exports._parseVault=f._parseVault,e.exports.config=f.config,e.exports.decrypt=f.decrypt,e.exports.parse=f.parse,e.exports.populate=f.populate,e.exports=f},684:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t);var o=Object.getOwnPropertyDescriptor(r,t);o&&!("get"in o?!r.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return r[t]}}),Object.defineProperty(e,n,o)}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),o=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return o(r,e),r};Object.defineProperty(r,"__esModule",{value:!0}),r.deleteUser=r.updateUser=r.createUser=r.getUserById=r.getUsers=void 0;const i=t(600),a=s(t(928)),c=s(t(136)),d=[];r.getUsers=(e,r)=>{r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(d))},r.getUserById=(e,r)=>{var t;const n=null===(t=e.url)||void 0===t?void 0:t.split("/")[3];if(console.log(n,"12345"),!n||!a.isUUID(n))return r.writeHead(c.invalidUserIdError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.invalidUserIdError.message}));const o=d.find((e=>e.id===n));if(!o)return r.writeHead(c.userNotFoundError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.userNotFoundError.message}));r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(o))},r.createUser=(e,r)=>{let t="";e.on("data",(e=>{t+=e.toString()})),e.on("end",(()=>{const{username:e,age:n,hobbies:o}=JSON.parse(t);if(!e||!n||!o)return r.writeHead(c.missingFieldsError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.missingFieldsError.message}));const s={id:(0,i.v4)(),username:e,age:n,hobbies:o};d.push(s),r.writeHead(201,{"Content-Type":"application/json"}),r.end(JSON.stringify(s))}))},r.updateUser=(e,r)=>{var t;const n=null===(t=e.url)||void 0===t?void 0:t.split("/")[3];if(!n||!a.isUUID(n))return r.writeHead(c.invalidUserIdError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.invalidUserIdError.message}));const o=d.findIndex((e=>e.id===n));if(-1===o)return r.writeHead(c.userNotFoundError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.userNotFoundError.message}));let s="";e.on("data",(e=>{s+=e.toString()})),e.on("end",(()=>{const{username:e,age:t,hobbies:i}=JSON.parse(s);if(!e||!t)return r.writeHead(c.missingFieldsError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.missingFieldsError.message}));d[o]={id:n,username:e,age:t,hobbies:i},r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(d[o]))}))},r.deleteUser=(e,r)=>{var t;const n=null===(t=e.url)||void 0===t?void 0:t.split("/")[3];if(!n||!a.isUUID(n))return r.writeHead(c.invalidUserIdError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.invalidUserIdError.message}));const o=d.findIndex((e=>e.id===n));if(-1===o)return r.writeHead(c.userNotFoundError.statusCode,{"Content-Type":"application/json"}),void r.end(JSON.stringify({error:c.userNotFoundError.message}));d.splice(o,1),r.writeHead(204),r.end()}},136:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.missingFieldsError=r.userNotFoundError=r.invalidUserIdError=r.notFoundError=r.createError=void 0,r.createError=(e,r)=>({statusCode:e,message:r}),r.notFoundError=(0,r.createError)(404,"Not Found"),r.invalidUserIdError=(0,r.createError)(400,"Invalid userId"),r.userNotFoundError=(0,r.createError)(404,"User not found"),r.missingFieldsError=(0,r.createError)(400,"Please fill required fields")},566:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t);var o=Object.getOwnPropertyDescriptor(r,t);o&&!("get"in o?!r.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return r[t]}}),Object.defineProperty(e,n,o)}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),o=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return o(r,e),r};Object.defineProperty(r,"__esModule",{value:!0}),r.handleUserRoutes=void 0;const i=s(t(684)),a=s(t(136));r.handleUserRoutes=(e,r)=>{var t,n,o;"/api/users"===e.url&&"GET"===e.method?i.getUsers(e,r):(null===(t=e.url)||void 0===t?void 0:t.match(/\/api\/users\/[a-zA-Z0-9-]+/))&&"GET"===e.method?i.getUserById(e,r):"/api/users"===e.url&&"POST"===e.method?i.createUser(e,r):(null===(n=e.url)||void 0===n?void 0:n.match(/\/api\/users\/[a-zA-Z0-9-]+/))&&"PUT"===e.method?i.updateUser(e,r):(null===(o=e.url)||void 0===o?void 0:o.match(/\/api\/users\/[a-zA-Z0-9-]+/))&&"DELETE"===e.method?i.deleteUser(e,r):(r.writeHead(a.notFoundError.statusCode,{"Content-Type":"application/json"}),r.end(JSON.stringify({error:a.notFoundError.message})))}},728:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t);var o=Object.getOwnPropertyDescriptor(r,t);o&&!("get"in o?!r.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return r[t]}}),Object.defineProperty(e,n,o)}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),o=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return o(r,e),r};Object.defineProperty(r,"__esModule",{value:!0});const i=s(t(685)),a=t(738),c=t(566);(0,a.config)();const d=i.createServer(((e,r)=>{(0,c.handleUserRoutes)(e,r)})),l=process.env.PORT||4e3;d.listen(l,(()=>{console.log(`Server is listening on port ${l}`)}))},928:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isUUID=void 0,r.isUUID=e=>/^[a-f\d]{8}-[a-f\d]{4}-[1-5][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(e)},600:(e,r,t)=>{"use strict";t.r(r),t.d(r,{NIL:()=>U,parse:()=>h,stringify:()=>p,v1:()=>m,v3:()=>b,v4:()=>O,v5:()=>w,validate:()=>d,version:()=>j});var n=t(113),o=t.n(n);const s=new Uint8Array(256);let i=s.length;function a(){return i>s.length-16&&(o().randomFillSync(s),i=0),s.slice(i,i+=16)}const c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,d=function(e){return"string"==typeof e&&c.test(e)},l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));function u(e,r=0){return l[e[r+0]]+l[e[r+1]]+l[e[r+2]]+l[e[r+3]]+"-"+l[e[r+4]]+l[e[r+5]]+"-"+l[e[r+6]]+l[e[r+7]]+"-"+l[e[r+8]]+l[e[r+9]]+"-"+l[e[r+10]]+l[e[r+11]]+l[e[r+12]]+l[e[r+13]]+l[e[r+14]]+l[e[r+15]]}const p=function(e,r=0){const t=u(e,r);if(!d(t))throw TypeError("Stringified UUID is invalid");return t};let f,v,g=0,y=0;const m=function(e,r,t){let n=r&&t||0;const o=r||new Array(16);let s=(e=e||{}).node||f,i=void 0!==e.clockseq?e.clockseq:v;if(null==s||null==i){const r=e.random||(e.rng||a)();null==s&&(s=f=[1|r[0],r[1],r[2],r[3],r[4],r[5]]),null==i&&(i=v=16383&(r[6]<<8|r[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),d=void 0!==e.nsecs?e.nsecs:y+1;const l=c-g+(d-y)/1e4;if(l<0&&void 0===e.clockseq&&(i=i+1&16383),(l<0||c>g)&&void 0===e.nsecs&&(d=0),d>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=c,y=d,v=i,c+=122192928e5;const p=(1e4*(268435455&c)+d)%4294967296;o[n++]=p>>>24&255,o[n++]=p>>>16&255,o[n++]=p>>>8&255,o[n++]=255&p;const m=c/4294967296*1e4&268435455;o[n++]=m>>>8&255,o[n++]=255&m,o[n++]=m>>>24&15|16,o[n++]=m>>>16&255,o[n++]=i>>>8|128,o[n++]=255&i;for(let e=0;e<6;++e)o[n+e]=s[e];return r||u(o)},h=function(e){if(!d(e))throw TypeError("Invalid UUID");let r;const t=new Uint8Array(16);return t[0]=(r=parseInt(e.slice(0,8),16))>>>24,t[1]=r>>>16&255,t[2]=r>>>8&255,t[3]=255&r,t[4]=(r=parseInt(e.slice(9,13),16))>>>8,t[5]=255&r,t[6]=(r=parseInt(e.slice(14,18),16))>>>8,t[7]=255&r,t[8]=(r=parseInt(e.slice(19,23),16))>>>8,t[9]=255&r,t[10]=(r=parseInt(e.slice(24,36),16))/1099511627776&255,t[11]=r/4294967296&255,t[12]=r>>>24&255,t[13]=r>>>16&255,t[14]=r>>>8&255,t[15]=255&r,t};function E(e,r,t){function n(e,n,o,s){var i;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const r=[];for(let t=0;t<e.length;++t)r.push(e.charCodeAt(t));return r}(e)),"string"==typeof n&&(n=h(n)),16!==(null===(i=n)||void 0===i?void 0:i.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(n),a.set(e,n.length),a=t(a),a[6]=15&a[6]|r,a[8]=63&a[8]|128,o){s=s||0;for(let e=0;e<16;++e)o[s+e]=a[e];return o}return u(a)}try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}const b=E("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),o().createHash("md5").update(e).digest()})),_={randomUUID:o().randomUUID},O=function(e,r,t){if(_.randomUUID&&!r&&!e)return _.randomUUID();const n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,r){t=t||0;for(let e=0;e<16;++e)r[t+e]=n[e];return r}return u(n)},w=E("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),o().createHash("sha1").update(e).digest()})),U="00000000-0000-0000-0000-000000000000",j=function(e){if(!d(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},113:e=>{"use strict";e.exports=require("crypto")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.3.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://github.com/motdotla/dotenv?sponsor=1","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var s=r[n]={exports:{}};return e[n].call(s.exports,s,s.exports,t),s.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(728)})();