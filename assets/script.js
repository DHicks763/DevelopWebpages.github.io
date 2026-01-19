// Small script to support Copy and Copy Link actions
document.addEventListener('click', (e) => {
  const copyBtn = e.target.closest('.copy-btn');
  const copyLinkBtn = e.target.closest('.copy-link-btn');
  const copyPalette = e.target.closest('.copy-palette-btn');

  if (copyBtn) {
    const selector = copyBtn.getAttribute('data-target');
    const codeEl = document.querySelector(selector);
    if (!codeEl) return;
    const text = codeEl.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    }).catch(()=> alert('Copy failed — try selecting manually.'));
  }

  if (copyLinkBtn) {
    const slug = copyLinkBtn.getAttribute('data-slug');
    const url = new URL(window.location.href);
    url.hash = slug;
    navigator.clipboard.writeText(url.toString()).then(()=>{
      copyLinkBtn.textContent = 'Link Copied ✓';
      setTimeout(()=> copyLinkBtn.textContent = 'Copy Link', 1500);
    });
  }

  if (copyPalette) {
    const palette = copyPalette.getAttribute('data-palette'); // csv of hex
    navigator.clipboard.writeText(palette).then(()=>{
      copyPalette.textContent = 'Palette Copied ✓';
      setTimeout(()=> copyPalette.textContent = 'Copy Palette', 1500);
    });
  }
});

// On load, if there's a hash, scroll to the first card that matches data-slug
window.addEventListener('load', () => {
  const slug = location.hash ? location.hash.replace('#','') : '';
  if (!slug) return;
  const target = document.querySelector(`[data-slug="${slug}"]`);
  if (target) target.scrollIntoView({behavior:'smooth', block:'center'});
});
