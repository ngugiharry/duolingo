module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === "@expo/metro-config" && pkg.version === "54.0.15") {
        pkg.dependencies = pkg.dependencies || {};
        pkg.dependencies.lightningcss = "1.30.1";
      }
      return pkg;
    },
  },
};
