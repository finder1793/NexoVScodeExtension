import * as vscode from 'vscode';
import { NexoCompletionProvider } from './providers/completionProvider';
import { NexoHoverProvider } from './providers/hoverProvider';
import { NexoDiagnosticsProvider } from './providers/diagnosticsProvider';
import { NexoCodeActionProvider } from './providers/codeActionProvider';
import { ModelPreviewProvider } from './providers/previewProvider';
import { MechanicsCompletionProvider } from './providers/mechanicsProvider';

export function activate(context: vscode.ExtensionContext) {
    // Register providers
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider('yaml', new NexoCompletionProvider()),
        vscode.languages.registerHoverProvider('yaml', new NexoHoverProvider()),
        vscode.languages.registerCodeActionsProvider('yaml', new NexoCodeActionProvider()),
        vscode.window.registerWebviewViewProvider('nexoModelPreview', new ModelPreviewProvider())
    );

    // Initialize diagnostics
    const diagnosticsProvider = new NexoDiagnosticsProvider();
}

export function deactivate() {}}