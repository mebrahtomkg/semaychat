const { PUBLIC_PATH, API_URL } = require('./constants');

module.exports = (
  /**@type {{
   *  jsFiles: string[],
   *  serviceWorkerFile: string
   * }} */
  { jsFiles, serviceWorkerFile },
) => {
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
          window.SERVICE_WORKER_URL = '${PUBLIC_PATH}${serviceWorkerFile}';
       </script>

       ${jsFiles.map((jsFile) => `<script src="${PUBLIC_PATH}${jsFile}"></script>`).join('\n')}
   </head>
   <body>
      <div id="root"></div>
   </body>
</html>
`;
};
