import { analyzeContract } from './src/services/contractSentinel.js';
import { RULES } from './src/services/rulesRegistry.js';
import { SAMPLE_PREDATORY_CONTRACT } from './src/data/samplePredatoryContract.js';
import { SAMPLE_FAIR_CONTRACT } from './src/data/sampleFairContract.js';

console.log('--- COMPREHENSIVE SENTINEL & EDGE CASE VERIFICATION ---');

// Test 1: Predatory Contract
const predResult = analyzeContract(SAMPLE_PREDATORY_CONTRACT);
console.log('Predatory Contract Score:', predResult.healthScore);
console.log('Risk Level:', predResult.riskLevel);
console.log('Flags Caught:', predResult.flaggedClauses.length);

if (predResult.healthScore < 50 && predResult.riskLevel === 'critical' && predResult.flaggedClauses.length >= 4) {
  console.log('✅ TEST 1 PASSED: Predatory contract correctly flagged with critical risk.');
} else {
  console.error('❌ TEST 1 FAILED');
  process.exit(1);
}

// Test 2: Fair Contract State
const fairResult = analyzeContract(SAMPLE_FAIR_CONTRACT);
console.log('\nFair Contract Score:', fairResult.healthScore);
console.log('Risk Level:', fairResult.riskLevel);
console.log('Flags Caught:', fairResult.flaggedClauses.length);

if (fairResult.healthScore >= 90 && fairResult.riskLevel === 'healthy' && fairResult.flaggedClauses.length === 0) {
  console.log('✅ TEST 2 PASSED: Fair contract correctly scored as healthy/balanced.');
} else {
  console.error('❌ TEST 2 FAILED');
  process.exit(1);
}

// Test 3: Diplomatic Pushback & Rule Integrity
console.log('\nChecking Diplomatic Pushback Templates...');
RULES.forEach(rule => {
  if (!rule.counterProposal || rule.counterProposal.length < 20) {
    console.error(`❌ TEST 3 FAILED: Rule ${rule.id} lacks a valid counterProposal!`);
    process.exit(1);
  }
  if (!rule.explanation || !rule.fairStandard) {
    console.error(`❌ TEST 3 FAILED: Rule ${rule.id} lacks explanation or fairStandard!`);
    process.exit(1);
  }
});
console.log(`✅ TEST 3 PASSED: All ${RULES.length} legal rules contain verified diplomatic pushback templates.`);

// Test 4: Edge Case - Empty or whitespace document
console.log('\nChecking Empty & Corrupted Document Handling...');
const emptyResult = analyzeContract('   ');
if (emptyResult.error && typeof emptyResult.error === 'string') {
  console.log('✅ TEST 4 PASSED: Empty input correctly caught and handled with user-friendly error.');
} else {
  console.error('❌ TEST 4 FAILED');
  process.exit(1);
}

console.log('\nALL MECHANICAL TESTS PASSED SUCCESSFULLY! 🚀');
