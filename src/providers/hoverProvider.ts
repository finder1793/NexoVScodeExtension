import * as vscode from 'vscode';

export class NexoHoverProvider implements vscode.HoverProvider {
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position
    ): vscode.Hover | undefined {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        if (word === 'mechanics') {
            return new vscode.Hover(`
# Mechanics Example
mechanics:
  - damage: 10
  - durability: 100
            `);
        }

        return undefined;
    }
}
