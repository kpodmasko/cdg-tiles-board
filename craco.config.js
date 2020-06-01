const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options",
                baseUrl: "./src",
                aliases: {
                    "@components": "/components",
                    "@utils": "./utils",
                    "@constants": "./utils/constants",
                    "@helpers": "./utils/helpers"
                }
            }
        }
    ]
};