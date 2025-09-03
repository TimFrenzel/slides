const { execSync } = require("node:child_process");
const { globSync } = require("glob");

console.log("🔨 Building all slide decks...\n");

const files = globSync("**/slides.md", { ignore: ["node_modules/**"] });

if (files.length === 0) {
  console.log("❌ No slides.md files found. Make sure you have slides.md files in your course directories.");
  process.exit(1);
}

console.log(`📚 Found ${files.length} slide deck(s) to build:\n`);

for (const f of files) {
  console.log(`📖 Building: ${f}`);
  
  const out = f.replace(/slides\.md$/, "");
  
  const cmd = [
    "npx reveal-md",
    f,
    "--theme ./theme/tim.css",
    `--static ${out}`
  ].join(" ");
  
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`✅ Built: ${f} → ${out}index.html\n`);
  } catch (error) {
    console.error(`❌ Failed to build: ${f}`);
    console.error(error.message);
    process.exit(1);
  }
}

console.log("🎉 All slide decks built successfully!");
