import { Prover } from "@succinctlabs/sp1";

async function generateZKProof() {
    const prover = new Prover();
    const proof = await prover.generateProof({ input: score });
    console.log("Generated ZK Proof:", proof);
    return proof;
}

async function verifyZKProof(proof) {
    const prover = new Prover();
    const isValid = await prover.verifyProof(proof);
    console.log("Proof is valid:", isValid);
}
