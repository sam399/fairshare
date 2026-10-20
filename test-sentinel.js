import { analyzeContract } from './src/services/contractSentinel.js';
import { SAMPLE_PREDATORY_CONTRACT } from './src/data/samplePredatoryContract.js';
import { SAMPLE_FAIR_CONTRACT } from './src/data/sampleFairContract.js';

console.log('--- TESTING CONTRACT SENTINEL ENGINE ---');

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

// Test 2: Fair Contract
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

console.log('\nALL MECHANICAL TESTS PASSED SUCCESSFULLY! 🚀');
