import { validateAllContent } from "../src/lib/content/validator";

console.log("==========================================");
console.log("   ECO PERGOLA — CONTENT VALIDATION CLI  ");
console.log("==========================================\n");

const result = validateAllContent();

if (result.warnings.length > 0) {
  console.log(`⚠️  ${result.warnings.length} Warnings:`);
  for (const w of result.warnings) {
    const loc = w.itemId ? `[${w.collection}:${w.itemId}]` : `[${w.collection}]`;
    const field = w.field ? ` (${w.field})` : "";
    console.log(`   - ${loc}${field}: ${w.message}`);
  }
  console.log();
}

if (result.errors.length > 0) {
  console.error(`❌  ${result.errors.length} Errors:`);
  for (const e of result.errors) {
    const loc = e.itemId ? `[${e.collection}:${e.itemId}]` : `[${e.collection}]`;
    const field = e.field ? ` (${e.field})` : "";
    console.error(`   - ${loc}${field}: ${e.message}`);
  }
  console.log("\n❌ Content validation FAILED. Fix the above errors before deploying.");
  process.exit(1);
}

console.log("✅ All content collections, singletons, media, and cross-relations validated successfully!");
process.exit(0);
