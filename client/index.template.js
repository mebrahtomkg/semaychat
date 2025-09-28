const { PUBLIC_PATH, API_URL } = require('./constants');

module.exports = ({ htmlRspackPlugin }) => {
  const jsFiles = htmlRspackPlugin.files.js;
  const scripts = [];

  for (const jsFile of jsFiles) {
    if (
      !jsFile.startsWith(`${PUBLIC_PATH}service-worker`) &&
      !scripts.includes(jsFile)
    ) {
      scripts.push(jsFile);
    }
  }

  return `
<!doctype html>
<html>
   <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>SemayChat</title>
       <style>
          body {
             background: #1b1d23;
          }
       </style>
      
       <script>
          window.API_URL = '${API_URL}';
       </script>

       ${scripts.map((script) => `<script src="${script}"></script>`).join('\n')}
   </head>
   <body>
      <div id="root"></div>
   </body>
</html>
`;
};
