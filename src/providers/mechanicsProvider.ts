import * as vscode from 'vscode';
export class MechanicsCompletionProvider implements vscode.CompletionItemProvider {
    private mechanicsData = {
        // Custom Food
        'food': {
            description: 'Creates custom food items',
            example: 'food:\n  hunger: 10\n  saturation: 10\n  replacement:\n    nexo_item: any_nexo_itemid\n  effect_probability: 0.35\n  effects:\n    hunger:\n      amplifier: 1\n      duration: 20\n      is_ambient: true'
        },

        // Backpack
        'backpack': {
            description: 'Creates storage items',
            example: 'backpack:\n  size: 27\n  title: "Custom Storage"'
        },

        // Combat Mechanics
        'thor': {
            description: 'Summons lightning on hit',
            example: 'thor:\n  damage: 10\n  cooldown: 20'
        },
        'lifesteal': {
            description: 'Heals player on hit',
            example: 'lifesteal:\n  amount: 2\n  cooldown: 10'
        },
        'energyblast': {
            description: 'Shoots energy projectile',
            example: 'energyblast:\n  damage: 5\n  speed: 1.5\n  range: 30'
        },
        'witherskull': {
            description: 'Shoots wither skull',
            example: 'witherskull:\n  damage: 8\n  charged: true'
        },

        // Farming Mechanics
        'harvesting': {
            description: 'Auto-harvests crops',
            example: 'harvesting:\n  radius: 3\n  replant: true'
        },
        'smelting': {
            description: 'Auto-smelts items',
            example: 'smelting:\n  enabled: true\n  exp_multiplier: 1.5'
        },

        // Armor Effects
        'armor_effects': {
            description: 'Applies effects when wearing armor',
            example: 'armor_effects:\n  SPEED:\n    amplifier: 1\n    ambient: true'
        },

        // Soulbound
        'soulbound': {
            description: 'Keeps item on death',
            example: 'soulbound:\n  level: 1\n  keep_on_death: true'
        },

        // Furniture Mechanics
        'furniture': {
            description: 'Creates placeable furniture items',
            example: 'furniture:\n  block_sounds:\n    place_sound: block.stone.place\n    break_sound: block.stone.break\n    hit_sound: my.custom.hitsound\n    step_sound: my.custom.stepsound\n    fall_sound: my.custom.fallsound\n  hitbox:\n    barriers:\n      - 0,0,0\n  drop:\n    silktouch: false\n    loots:\n      - { nexo_item: table, probability: 1.0 }'
        },

        'furniture_position': {
            description: 'Controls furniture placement position',
            example: 'furniture_position:\n  x: 0\n  y: 0\n  z: 0\n  yaw: 0'
        },

        'furniture_rotation': {
            description: 'Controls furniture rotation settings',
            example: 'furniture_rotation:\n  enabled: true\n  restrict: false\n  angles: [0, 90, 180, 270]'
        },

        'furniture_storage': {
            description: 'Adds storage capability to furniture',
            example: 'furniture_storage:\n  size: 27\n  title: "Storage Furniture"\n  locked: false'
        },

        'furniture_light': {
            description: 'Adds light emission to furniture',
            example: 'furniture_light:\n  level: 15\n  dynamic: true'
        },

        'furniture_seat': {
            description: 'Makes furniture sittable',
            example: 'furniture_seat:\n  height: 0.5\n  max_players: 1'
        },

        'furniture_blocklocker': {
            description: 'Adds protection to furniture',
            example: 'furniture_blocklocker:\n  enabled: true\n  private: true\n  type: CONTAINER'
        },

        // NoteBlock Mechanics
        'noteblock': {
            description: 'Creates custom 1x1x1 blocks using NoteBlock',
            example: 'noteblock:\n  material: NOTE_BLOCK\n  model: 1\n  directional: true\n  sounds:\n    break_sound: block.stone.break\n    place_sound: block.stone.place\n    hit_sound: block.stone.hit\n  drop:\n    silktouch: false\n    loots:\n      - { nexo_item: custom_block, probability: 1.0 }'
        },

        'noteblock_directional': {
            description: 'Makes NoteBlock face different directions',
            example: 'noteblock_directional:\n  enabled: true\n  faces: [north, south, east, west, up, down]'
        },

        'noteblock_stripped': {
            description: 'Adds stripped log functionality to NoteBlock',
            example: 'noteblock_stripped:\n  enabled: true\n  stripped_variant: stripped_custom_log'
        },

        // StringBlock Mechanics
        'stringblock': {
            description: 'Creates custom decoration blocks using TripWire',
            example: 'stringblock:\n  material: STRING\n  model: 1\n  collision: false\n  sounds:\n    break_sound: block.grass.break\n    place_sound: block.grass.place\n  light_level: 15'
        },

        'stringblock_collision': {
            description: 'Controls StringBlock collision settings',
            example: 'stringblock_collision:\n  enabled: false\n  hitbox: true'
        },

        // ClickAction Mechanics
        'clickActions': {
            description: 'Executes actions when player clicks block or furniture',
            example: 'clickActions:\n  - conditions:\n    - \'#player.hasPermission("test.permission")\'\n    actions:\n      - \'[console] say <player> hello <player>!\'\n      - \'[message] &aHello <player>!\'\n      - \'[sound] BLOCK_NOTE_BLOCK_PLING 1.0 1.0\'\n      - \'[title] &6Welcome!|&eEnjoy your stay|20|40|20\''
        },

        'clickAction_condition': {
            description: 'Condition checks for clickActions',
            example: 'conditions:\n  - \'#player.hasPermission("permission")\'\n  - \'#player.getHealth() > 10\'\n  - \'#player.getLevel() >= 30\''
        },

        'clickAction_action': {
            description: 'Available actions for clickActions',
            example: 'actions:\n  - \'[console] command\'\n  - \'[player] command\'\n  - \'[message] text\'\n  - \'[sound] SOUND_NAME volume pitch\'\n  - \'[title] title|subtitle|fadeIn|stay|fadeOut\'\n  - \'[actionbar] message\''
        }
    };
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        const items: vscode.CompletionItem[] = [];

        if (linePrefix.trim().startsWith('-') || linePrefix.trim().endsWith(':')) {
            for (const [mechanic, data] of Object.entries(this.mechanicsData)) {
                const item = new vscode.CompletionItem(mechanic, vscode.CompletionItemKind.Property);
                item.documentation = new vscode.MarkdownString()
                    .appendMarkdown(`**${mechanic} Mechanic**\n\n`)
                    .appendMarkdown(`${data.description}\n\n`)
                    .appendCodeblock(data.example, 'yaml');
                item.insertText = new vscode.SnippetString(data.example);
                items.push(item);
            }
        }

        return items;
    }
}