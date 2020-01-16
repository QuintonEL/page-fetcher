const request = require('request');
const fs = require('fs');
const args = process.argv.splice(2);

fs.stat(args[1], (err) => {
  if (!err) {
    console.log('file or directory exists');
  } else if (err.code === 'ENOENT') {
    console.log('file or directory does not exist');
    request(args[0], (error, response, body) => {
      console.log('error:', error); // Print the error if one occurred
      if (error) return;
      // Check if the file is readable.
      fs.access(args[1], fs.constants.R_OK, (err) => {
        console.log(`${args[1]} ${err ? 'does not exist' : 'exists'}`);
      });
      // write the file
      fs.writeFile(args[1], body, (err) => {
        // get file size  
        fs.stat(args[1], function(err, stats) {
          console.log(`Downloaded and saved ${stats['size']} bytes to ${args[1]}`)  
        })
      });
    });
  }
});