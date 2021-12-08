const MyMinter = artifacts.require("MyMinter");

contract('MyMinter', (accounts) => {
    it("Mint new token and check status of tx.", async () => {
        const instance = await MyMinter.new();
        const result = await instance.mintToken("MyToken", "MKTN", "1000000000000000000000000000", {from: accounts[0]});
        assert.equal(result.receipt.status, true);
    })
})