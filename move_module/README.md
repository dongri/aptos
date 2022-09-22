# create aptos project
aptos move init --name message

# init project environment
aptos init

```
Configuring for profile default
Enter your rest endpoint [Current: None | No input: https://fullnode.devnet.aptoslabs.com/v1]

No rest url given, using https://fullnode.devnet.aptoslabs.com/v1...
Enter your faucet endpoint [Current: None | No input: https://faucet.devnet.aptoslabs.com | 'skip' to not use a faucet]

No faucet url given, using https://faucet.devnet.aptoslabs.com...
Enter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]

No key given, generating key...

Account 5e42db81d911f5162aeccf9f6db112fcfa2096d59b037f40add98b75d492b1dc doesn't exist, creating it and funding it with 10000 coins
Aptos is now set up for account 5e42db81d911f5162aeccf9f6db112fcfa2096d59b037f40add98b75d492b1dc!  Run `aptos help` for more information about commands
{
  "Result": "Success"
}
```
copy address to Move.toml
```
[addresses]
Sender = "0x5e42db81d911f5162aeccf9f6db112fcfa2096d59b037f40add98b75d492b1dc"
```

# compile, test
aptos move compile
aptos move test

# faucet token, publish
aptos account fund-with-faucet --account default

aptos move publish

# test
aptos move run --function-id default::message::set_message --args string:'hello aptos'
正しくTX発行できる
https://explorer.devnet.aptos.dev/txn/0x064f95f8d04b22db98f5ec546c72d6dada5fad47cd7944704935dce546d4af04

Payload
```
{
  "function": "0x5e42db81d911f5162aeccf9f6db112fcfa2096d59b037f40add98b75d492b1dc::message::set_message",
  "type_arguments": [],
  "arguments": [
    "hello aptos"
  ],
  "type": "entry_function_payload"
}
```

===
aptos move run --function-id default::message::get_message

メッセージの取得はできなかった、 `INVALID_MAIN_FUNCTION_SIGNATURE` このエラーが出る

INVALID_MAIN_FUNCTION_SIGNATURE は任意の値を返す関数ではそんなエラーが出るらしい

LINKER_ERROR も出てたがそれはfunction名の大文字小文字の違いが原因だった
