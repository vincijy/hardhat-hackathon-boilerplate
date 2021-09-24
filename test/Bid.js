// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");
// const { isTypedArray } = require("util/types");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Bid contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Bid;
  let hardhatBid;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Bid = await ethers.getContractFactory("Bid");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    hardhatBid = await Bid.deploy(1, 1632452041396);
    await hardhatBid.deployed();

    // We can interact with the contract by calling `hardhatBid.method()`
    await hardhatBid.deployed();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an assertion objet. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await hardhatBid.owner()).to.equal(owner.address);
    });
  });


  describe("Bid", function () {
    it("Should store the max bid price", async function () {
      await hardhatBid.bid(50);
      let price = await hardhatBid.maxBidPrice();
      expect(price).to.equal(50);

      await hardhatBid.bid(60);
      price = await hardhatBid.maxBidPrice();
      expect(price).to.equal(60);

      await hardhatBid.bid(40);
      price = await hardhatBid.maxBidPrice();
      expect(price).to.equal(60);
    });

    it("Should fail if sender did not time not expired yet", async function () {
      await hardhatBid.buy();
    });

    // TODO add more test
  });
});
