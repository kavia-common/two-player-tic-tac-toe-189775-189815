#!/bin/bash
cd /home/kavia/workspace/code-generation/two-player-tic-tac-toe-189775-189815/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

