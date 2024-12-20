import * as vscode from 'vscode';

export class NexoCodeActionProvider implements vscode.CodeActionProvider {
    provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range
    ): vscode.CodeAction[] {
        const actions: vscode.CodeAction[] = [];

        // Add quick fix for common patterns
        const text = document.getText(range);
        if (text.includes('material:')) {
            const action = new vscode.CodeAction(
                'Add basic mechanics',
                vscode.CodeActionKind.QuickFix
            );
            action.edit = new vscode.WorkspaceEdit();
            action.edit.insert(
                document.uri,
                range.end,
                '\n  mechanics:\n    - durability: 100\n    - cooldown: 20'
            );
            actions.push(action);
        }

        return actions;
    }
}
