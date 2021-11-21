# StegnoText

StegnoText is a node.js application server that provides a simple way to hide text in text. To hide secrets inside text by compressing and encrypting the secret before cloaking it with special unicode invisible characters. It can be used to safely watermark strings, invisible scripts on webpages, texts on social media or for any other covert communication.

## Installation

Use the package manager npm.

```bash
npm install
```

## Usage

Two essential methods are provided:

- `hideSecret`: hides a secret in a text. It returns a new text with the secret hidden. 
    - @params: secretMsg - the secret message to hide
    - @params: password - the password to encrypt the secret
    - @params: coverMsg - the text to hide the secret in

- `revealSecret`: reveals a secret in a text. It returns a new text with the secret revealed.
    - @params: password - the password to decrypt the secret
    - @params: coverMsg - the text to reveal the secret in.
 


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)