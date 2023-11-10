import chokidar from 'chokidar';
import { exec } from 'child_process';
import { createServer } from 'http-server';

const directoryToWatch = 'src';
const commandToRun = 'npm run build';

// Create a file watcher instance
const watcher = chokidar.watch(directoryToWatch, {
  ignored: [
    'build/**',
    'node_modules/**'
  ],
  persistent: true
});

watcher.on('change', (filePath) => {
  console.log(`File ${filePath} has changed. Running command: ${commandToRun}`);

  exec(commandToRun, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    console.log(`Command output:\n${stdout}`);
  });
});

// Create an HTTP server using http-server
const server = createServer({ root: './' });

// Start the HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
