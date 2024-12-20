import * as vscode from 'vscode';

export class NexoDiagnosticsProvider {
    private diagnosticCollection: vscode.DiagnosticCollection;

    constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('nexo');
    }

    validateConfig(document: vscode.TextDocument) {
        const diagnostics: vscode.Diagnostic[] = [];

        // Add validation logic for common configuration mistakes
        const text = document.getText();
        if (text.includes('material:') && !text.includes('model:')) {
            const diagnostic = new vscode.Diagnostic(
                new vscode.Range(0, 0, 0, 0),
                'Custom items should have a model number defined',
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }

        this.diagnosticCollection.set(document.uri, diagnostics);
    }
}
