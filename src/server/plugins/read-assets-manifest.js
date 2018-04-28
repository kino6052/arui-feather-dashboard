import path from 'path';
import fs from 'fs';

export default function readAssetsManifest() {
    const manifestPath = path.join(process.cwd(), '.build/webpack-assets.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const js = [];
    const css = [];
    ['vendor', 'main'].forEach((key) => {
        if (!manifest[key]) {
            return;
        }
        if (manifest[key].js) {
            js.push(manifest[key].js);
        }
        if (manifest[key].css) {
            css.push(manifest[key].css);
        }
    });

    return {
        js, css
    };
}
