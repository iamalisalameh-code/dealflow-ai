const fs = require('fs');
const path = require('path');

// Add any other files you want to inject the language logic into here
const filesToUpdate = [
  'app/pricing/ClientPage.tsx',
  'app/how-it-works/ClientPage.tsx',
  'app/features/ClientPage.tsx',
  'app/about/ClientPage.tsx',
  'app/contact/ClientPage.tsx'
];

const hookCode = `
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleStorage = () => {
      const saved = localStorage.getItem('marketing_lang') as 'en' | 'ar'
      if (saved) setLang(saved)
    }
    handleStorage()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  if (!mounted) return null

  const isAr = lang === 'ar'
  const tr = t[lang]
`;

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ Skipped (Not found): ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Add Imports (if not already there)
  if (!content.includes("import { t }")) {
    content = content.replace(/'use client'/, `'use client'\nimport { useState, useEffect } from 'react'\nimport { t } from '@/lib/translations'`);
  }

  // 2. Inject the Hooks (Right after the component declaration)
  if (!content.includes('const isAr = lang')) {
    // Finds 'export default function ComponentName() {'
    content = content.replace(/(export default function \w+\([^)]*\)\s*\{)/, `$1\n${hookCode}`);
  }

  // 3. Inject the RTL wrapper to the first outer div (after the return statement)
  if (!content.includes('direction: isAr')) {
    content = content.replace(
      /return\s*\(\s*<div/, 
      `return (\n    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: isAr ? "'Tajawal', 'DM Sans', sans-serif" : "'DM Sans', sans-serif", textAlign: isAr ? 'right' : 'left' }}`
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Injected Language Engine into: ${filePath}`);
});

console.log('\n✨ Bulk plumbing complete! You just need to swap the text now.');