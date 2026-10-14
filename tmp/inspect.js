const fs = require('fs');
const crypto = require('crypto');

const raw = fs.readFileSync('/tmp/meng-to-sketchbook.html', 'utf8');
const urls = raw.match(/https:\/\/ublctyddhtbgaersvxxb\.supabase\.co[^\s"'\)]+/g);
console.log('Count:', urls ? urls.length : 0);
if (urls) {
  const unique = [...new Set(urls)];
  console.log('Unique Supabase URLs:', unique);
}
