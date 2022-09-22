# create aptos project
aptos move init --name nft

# init project environment
aptos init

# compile, test
aptos move compile
aptos move test

# faucet token, publish
aptos account fund-with-faucet --account default

aptos move publish

# test
<!-- aprots move run --function-id 0x1::HelloWorld::say_hello --signers 0x5617bc195f6401d527878da3bda835cf644e38f2aa0e710a7ec5f23015cb4591 -->
aptos move run --function-id default::hello::get_message --args string:'hello dongri'
{
  "Error": "API error: Unknown error transaction execution failed: Transaction Executed and Committed with Error INVALID_MAIN_FUNCTION_SIGNATURE"
}
こんなエラーで失敗する


aptos move run --function-id default::message::set_message --args string:'hello dongri jin'
正しくTX発行できる
https://explorer.devnet.aptos.dev/txn/0x623efcc9db20267bf5f106c651c4ef1b5b5ed0c3524efa92a63e93c3c1beef85

aptos move run --function-id default::message::get_message

メッセージの取得はできなかった、 `INVALID_MAIN_FUNCTION_SIGNATURE` このエラーが出る


