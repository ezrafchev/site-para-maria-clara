#!/bin/bash

# Script para empurrar todas as alterações e hospedar imediatamente
# Script to push all changes and host immediately

set -e

echo "🚀 Iniciando processo de deploy imediato..."
echo "🚀 Starting immediate deployment process..."

# Check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Commitando alterações pendentes..."
    echo "📝 Committing pending changes..."
    
    git add .
    git commit -m "Deploy imediato: $(date '+%Y-%m-%d %H:%M:%S')"
    
    echo "✅ Alterações commitadas!"
    echo "✅ Changes committed!"
else
    echo "ℹ️  Nenhuma alteração pendente encontrada."
    echo "ℹ️  No pending changes found."
fi

# Push changes
echo "📤 Empurrando alterações para o repositório remoto..."
echo "📤 Pushing changes to remote repository..."

git push origin $(git branch --show-current)

echo "✅ Alterações empurradas!"
echo "✅ Changes pushed!"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

echo "🌐 Instruções para hospedagem imediata:"
echo "🌐 Instructions for immediate hosting:"
echo ""
echo "1. Se estiver na branch 'main', o deploy será automático em alguns minutos."
echo "1. If on 'main' branch, deployment will be automatic in a few minutes."
echo ""
echo "2. Para deploy imediato de qualquer branch, acesse:"
echo "2. For immediate deployment from any branch, go to:"
echo "   https://github.com/ezrafchev/site-para-maria-clara/actions/workflows/deploy-immediate.yml"
echo ""
echo "3. Clique em 'Run workflow' e selecione a branch: $CURRENT_BRANCH"
echo "3. Click 'Run workflow' and select branch: $CURRENT_BRANCH"
echo ""
echo "4. Site será hospedado em: https://ezrafchev.github.io/site-para-maria-clara/"
echo "4. Site will be hosted at: https://ezrafchev.github.io/site-para-maria-clara/"
echo ""

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "🎉 Você está na branch main! Deploy automático iniciado."
    echo "🎉 You're on main branch! Automatic deployment started."
    echo "⏱️  O site estará disponível em ~2-3 minutos."
    echo "⏱️  Site will be available in ~2-3 minutes."
else
    echo "ℹ️  Branch atual: $CURRENT_BRANCH"
    echo "ℹ️  Current branch: $CURRENT_BRANCH"
    echo "💡 Para merge automático com main, crie um Pull Request."
    echo "💡 For automatic merge with main, create a Pull Request."
fi

echo ""
echo "✨ Processo concluído!"
echo "✨ Process completed!"