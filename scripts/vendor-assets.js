const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Vendoring theme assets...\n');

// Asset definitions
const assets = {
  'reveal.js': {
    version: '4.6.1',
    files: [
      {
        url: 'https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/reveal.js',
        path: 'theme/reveal/reveal.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/reveal.css',
        path: 'theme/reveal/reveal.css'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/plugin/notes/notes.js',
        path: 'theme/reveal/notes.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/plugin/highlight/highlight.js',
        path: 'theme/reveal/highlight.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/plugin/zoom/zoom.js',
        path: 'theme/reveal/zoom.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/plugin/menu/menu.js',
        path: 'theme/reveal/menu.js'
      }
    ]
  },
  'prism': {
    version: '1.29.0',
    files: [
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js',
        path: 'theme/prism/prism-core.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup.min.js',
        path: 'theme/prism/prism-markup.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-css.min.js',
        path: 'theme/prism/prism-css.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-clike.min.js',
        path: 'theme/prism/prism-clike.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js',
        path: 'theme/prism/prism-javascript.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js',
        path: 'theme/prism/prism-python.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-r.min.js',
        path: 'theme/prism/prism-r.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-sql.min.js',
        path: 'theme/prism/prism-sql.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css',
        path: 'theme/prism/prism-tomorrow.min.css'
      }
    ]
  },
  'katex': {
    version: '0.16.8',
    files: [
      {
        url: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
        path: 'theme/katex/katex.min.js'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
        path: 'theme/katex/katex.min.css'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/fonts/KaTeX_Main-Regular.woff2',
        path: 'theme/katex/KaTeX_Main-Regular.woff2'
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/fonts/KaTeX_Math-Italic.woff2',
        path: 'theme/katex/KaTeX_Math-Italic.woff2'
      }
    ]
  },
  'mermaid': {
    version: '10.6.1',
    files: [
      {
        url: 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js',
        path: 'theme/mermaid/mermaid.min.js'
      }
    ]
  },
  'inter-font': {
    version: '4.0',
    files: [
      {
        url: 'https://github.com/rsms/inter/raw/v4.0/fonts/Inter-VariableFont_slnt,wght.woff2',
        path: 'theme/inter/Inter-VariableFont_slnt,wght.woff2'
      }
    ]
  }
};

// Download function
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main function
async function vendorAssets() {
  for (const [assetName, assetInfo] of Object.entries(assets)) {
    console.log(`📦 Downloading ${assetName} v${assetInfo.version}...`);
    
    for (const file of assetInfo.files) {
      try {
        // Ensure directory exists
        const dir = path.dirname(file.path);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        console.log(`  📄 ${path.basename(file.path)}`);
        await downloadFile(file.url, file.path);
      } catch (error) {
        console.error(`  ❌ Failed to download ${file.path}: ${error.message}`);
        process.exit(1);
      }
    }
    
    console.log(`  ✅ ${assetName} downloaded successfully\n`);
  }
  
  console.log('🎉 All assets vendored successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the build system: npm run build:all');
  console.log('2. Preview a slide deck locally');
  console.log('3. Commit and push to GitHub');
}

// Run the script
vendorAssets().catch(console.error);
