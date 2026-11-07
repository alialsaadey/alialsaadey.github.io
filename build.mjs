// اختياري: يحدّث النسخة الثابتة (للأرشفة وللمتصفحات بدون JavaScript) وبيانات SEO داخل index.html
// التشغيل: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const D = require('./data/content.js');
const R = require('./js/render.js');

const lang = 'ar';
const L = D[lang];
let html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

const app = `<div id="app" data-lang="${lang}" data-sig="${R.sig(D) + lang}"><!--APP:START-->` + R.render(D, lang) + '<!--APP:END--></div>';
html = html.replace(/<div id="app"[\s\S]*?<!--APP:END--><\/div>/, () => app);
html = html.replace(/<!--LD:START-->[\s\S]*?<!--LD:END-->/, () => `<!--LD:START--><script type="application/ld+json">\n${R.jsonLd(D)}\n</script><!--LD:END-->`);
html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${R.esc(L.meta.title)}</title>`);
html = html.replace(/(<meta name="description" content=")[^"]*(")/, (m, a, b) => a + R.esc(L.meta.description) + b);
html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, (m, a, b) => a + R.esc(L.meta.title.split(' — ')[0]) + b);
writeFileSync(new URL('./index.html', import.meta.url), html);
console.log('index.html updated');
