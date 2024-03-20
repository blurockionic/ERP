import { PythonShell } from 'python-shell';


export const whatsappBot = async () => {

  // Specify the path to your Python script
  const scriptPath = "../utils/whatsappbot.py";

  console.log("woking")

  // Options to pass to PythonShell
  let options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: 'path',
    args: ['arg1', 'arg2']
};

PythonShell.run('scraper.py', options, function(err, results) {
    if (err) console.log(err);
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
});
};
