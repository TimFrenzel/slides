const { execSync } = require("node:child_process");
const { globSync } = require("glob");
const path = require("node:path");

console.log("📄 Generating PDFs for all slide decks...\n");

const files = globSync("**/index.html", {
  ignore: ["node_modules/**", "theme/**"]
});

if (files.length === 0) {
  console.log("❌ No index.html files found. Run 'npm run build:all' first to generate HTML files.");
  process.exit(1);
}

console.log(`📚 Found ${files.length} slide deck(s) to convert to PDF:\n`);

for (const f of files) {
  console.log(`📖 Converting: ${f}`);
  
  const dir = path.dirname(f);
  const pdf = path.join(dir, "deck.pdf");
  
  const cmd = `npx decktape --chrome-arg --no-sandbox reveal "${f}" "${pdf}"`;
  
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`✅ Generated: ${f} → ${pdf}\n`);
  } catch (error) {
    console.error(`❌ Failed to generate PDF: ${f}`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log("🎉 All PDFs generated successfully!");
