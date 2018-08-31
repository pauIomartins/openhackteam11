const { createDeployment } = require("./createDeployment");
const { expect } = require("chai");

describe("Testing createDeployment function", function() {
  this.timeout(0);

  describe("Testing the creation of the deployent", () => {
    it("Should create the deployment and return the deployment's name", async () => {
      const newDep = await createDeployment(
        new Date().getTime(),
        "testing-deployment-creation",
        "minefile",
      );

      expect(newDep)
        .to.haveOwnProperty("name")
        .and.to.be.a("string");
    });
  });
});
