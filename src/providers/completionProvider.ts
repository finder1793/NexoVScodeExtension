import * as vscode from 'vscode';

export class NexoCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.CompletionItem[] {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);

        if (linePrefix.endsWith('material: ')) {
            return [
                new vscode.CompletionItem('DIAMOND_SWORD', vscode.CompletionItemKind.Value),
                new vscode.CompletionItem('IRON_SWORD', vscode.CompletionItemKind.Value),
                // Add more materials
            ];
        }

        if (linePrefix.includes('mechanics:')) {
            return [
                new vscode.CompletionItem('damage', vscode.CompletionItemKind.Property),
                new vscode.CompletionItem('durability', vscode.CompletionItemKind.Property),
                // Add more mechanics
            ];
        }

        return [];
    }
}
