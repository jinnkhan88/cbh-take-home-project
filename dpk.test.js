const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

test("deterministicPartitionKey(1) should return 1", () => {
  expect(deterministicPartitionKey(1)).toBe(
    "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa"
  );
});

test("deterministicPartitionKey({partitionKey:'1'}) should return 1", () => {
  expect(deterministicPartitionKey({ partitionKey: "1" })).toBe("1");
});

test("deterministicPartitionKey({partitionKey:'1234'}) should return 1234", () => {
  expect(deterministicPartitionKey({ partitionKey: "1234" })).toBe("1234");
});

test("deterministicPartitionKey() Should return a same hex value for partition key length equal to 256", () => {
  expect(
    deterministicPartitionKey({
      partitionKey:
        "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efaca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa"
    })
  ).toBe(
    "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efaca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa"
  );
});

test("deterministicPartitionKey() Should return a different hex value for partition key greater than 256", () => {
  expect(
    deterministicPartitionKey({
      partitionKey:
        "ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efaca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efaa"
    })
  ).toBe(
    "9f738e7ac8a48855971eb0b710d0806905daabaae7b40a8afb3f2b9101a0b326fbb9348e36bdb3554f42a22c32b904ef51a80a50eb679a341818283fde293d0e"
  );
});
