/**
 *  Создает файл tmp-package.json,
 *  который используется для установки зависимостей в build-контейнере.
 *
 *  1. Фиксирует версию проекта, чтобы package.json
 *     разных сборок совпадал и докер использовал кэш.
 *  2. Вырезает из package.json все зависимости для тестирования,
 *     они не нужны для сборки, PhantomJS ставится долго.
 */

const fs = require('fs');
let packages = require('./package.json');

function isTestDependency(dependency) {
    return !!dependency.match(/chai|karma|lint|istanbul|mocha/ig);
}

function removeTestDependensies(deps) {
    let result = {};
    Object.keys(deps).forEach((key) => {
        if (!isTestDependency(key)) {
            result[key] = deps[key];
        }
    });

    return result;
}

packages.version = '42.0.0';
packages.dependencies = removeTestDependensies(packages.dependencies);
packages.devDependencies = removeTestDependensies(packages.devDependencies);

fs.writeFileSync('./tmp-package.json', JSON.stringify(packages, null, 4));
