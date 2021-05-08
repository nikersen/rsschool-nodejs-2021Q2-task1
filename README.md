# Coder CLI tool

**Implement CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool should accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

#### Get started
**Encode text**
``` Bash 
node coder-cli --shift 2 --action encode --input './input.txt' --output './output.txt'
```
**Decode text**
``` Bash 
node coder-cli --shift 2 --action decode --input './input.txt' --output './output.txt'
```

#### Run without i/o files
**Encode text**
``` Bash 
node coder-cli --shift 2 --action encode
```
**Decode text**
``` Bash 
node coder-cli --shift 2 --action decode
```