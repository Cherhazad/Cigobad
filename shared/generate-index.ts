import * as fs from 'fs';
import * as path from 'path';

function generateIndex(dir: string): void {
    const files = fs.readdirSync(dir);
    const exports: string[] = [];

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            generateIndex(fullPath);
            exports.push(`export * from './${file}';`);
        } else if (file.endsWith('.ts') && file !== 'index.ts') {
            const content = fs.readFileSync(fullPath, 'utf-8').trim();
            if (content.length > 0) {
                exports.push(`export * from './${file.replace('.ts', '')}';`);
            }
        }
    }

    const indexPath = path.join(dir, 'index.ts');
    fs.writeFileSync(
        indexPath,
        '/**\n * Auto-generated - do not edit manually\n */\n\n' + exports.join('\n') + '\n'
    );
    console.log(`✅ Generated ${indexPath}`);
}

generateIndex(path.join(__dirname, 'src'));