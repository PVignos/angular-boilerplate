const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function extractRoutes(sourceFile) {
  const routes = [];

  function visit(node) {
    if (
      ts.isArrayLiteralExpression(node) &&
      node.parent &&
      ts.isVariableDeclaration(node.parent) &&
      node.parent.name.text === 'routes'
    ) {
      node.elements.forEach((element) => {
        if (ts.isObjectLiteralExpression(element)) {
          const pathProperty = element.properties.find(
            (prop) =>
              ts.isPropertyAssignment(prop) && prop.name.getText() === 'path'
          );
          if (pathProperty && ts.isStringLiteral(pathProperty.initializer)) {
            routes.push('/' + pathProperty.initializer.text);
          }
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return routes;
}

const appRoutesPath = path.join(__dirname, 'src', 'app', 'app.routes.ts');
const sourceFile = ts.createSourceFile(
  appRoutesPath,
  fs.readFileSync(appRoutesPath, 'utf8'),
  ts.ScriptTarget.Latest,
  true
);

const routes = extractRoutes(sourceFile);

if (!routes.includes('/')) {
  routes.unshift('/');
}

fs.writeFileSync('prerender-routes.json', JSON.stringify(routes, null, 2));
console.log('Routes have been written to prerender-routes.json');
