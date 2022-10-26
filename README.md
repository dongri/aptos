# Aptos for Developer
https://aptos.dev/

# Install aptos cli
https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli

https://github.com/aptos-labs/aptos-core/releases?q=cli&expanded=true

```
$ mkdir dl && cd dl

$ wget https://github.com/aptos-labs/aptos-core/releases/download/aptos-cli-v1.0.0/aptos-cli-1.0.0-MacOSX-x86_64.zip
unzip aptos-cli-1.0.0-MacOSX-x86_64.zip

$ mkdir ~/bin
$ mv aptos ~/bin

$ vim ~/.zshrc.dev
export PATH="$HOME/bin:$PATH"
$ source ~/.zshrc

$ aptos -V
aptos 1.0.0
```

# VS Code Extension

1. Install move-analyzer
```
$ cargo install --git https://github.com/move-language/move move-analyzer --features "address32"
```
2. Install VS Code Extension
Install mode-analyzer in VS Code Extension

3. Set move-analyzer server path
```
$ ~/.cargo/bin/move-analyzer -V
move-analyzer 1.0.0           
```
/Users/dongri/.cargo/bin/move-analyzer
