const {createService} = require("./createService");
const {expect} = require("chai");

describe("Testing the createService function", function() {
  this.timeout(0);

  describe("Testing the creation of a service", () => {
    it("Should create a new service", async () => {
      const newService = await createService(new Date().getTime());

      expect(newService).to.haveOwnProperty("name");
      expect(newService).to.haveOwnProperty("endpoints");
    });

    it("Should return an object with a endpoints", async () => {
      const newService = await createService(new Date().getTime());

      expect(newService)
        .to.haveOwnProperty("endpoints")
        .and.to.be.a("object")
        .and.haveOwnProperty("minecraft")
        .and.be.a("string");

      expect(newService)
        .to.haveOwnProperty("endpoints")
        .and.to.be.a("object")
        .and.haveOwnProperty("rcon")
        .and.be.a("string");
    });
  });
});
