# Succinct Snake Game 🐍  

This is a classic "Snake" game with WebAssembly (WASM) verification and Zero-Knowledge Proofs (ZKPs) using SP1.  

## Features  
✅ Play the game in your browser  
✅ Score validation using a custom WebAssembly module  
✅ Zero-Knowledge Proofs (ZKP) integration with SP1  

## How to Play  
1. Use arrow keys to control the snake.  
2. Eat the red food to increase your score.  
3. Avoid crashing into walls or yourself.  

## Setup  
Clone the repository:  
```sh
git clone https://github.com/Baryzhyk/succinct-snake-game.git
cd succinct-snake-game
Install dependencies for SP1:
npm install @succinctlabs/sp1

Run a local server (optional):
npx http-server

How it Works
game.js controls the game logic.
score_verifier.wasm checks if the final score is valid.
sp1_proof.js generates ZK proofs using SP1.
Deployment
To deploy on GitHub Pages:

Push your code to the main branch.
Go to "Settings" → "Pages" and set the source to main.
The game will be available at https://Baryzhyk.github.io/succinct-snake-game/.
