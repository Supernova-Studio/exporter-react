/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction(
  "readableVariableName",
  function (token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    let segments = [...tokenGroup.path, token.name];
    if (prefix && prefix.length > 0) {
      segments.unshift(prefix);
    }

    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = segments.join(" ");

    // Return camelcased string from all segments
    return sentence
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
);

/**
 * Behavior configuration of the exporter
 * Prefixes: Add prefix for each category of the tokens. For example, all colors can start with "color, if needed"
 */
const BEHAVIOR = {
  color: {
    fileName: "colors", // this should be somehow synced with output.json contents
    varName: "Colors",
    themeProperty: "colors",
    tokenPrefix: "",
  },
  border: {
    fileName: "borders", // this should be somehow synced with output.json contents
    varName: "Borders",
    themeProperty: "borders",
    tokenPrefix: "",
  },
  gradient: {
    fileName: "gradients", // this should be somehow synced with output.json contents
    varName: "Gradients",
    themeProperty: "gradients",
    tokenPrefix: "",
  },
  measure: {
    fileName: "measures", // this should be somehow synced with output.json contents
    varName: "Measures",
    themeProperty: "measures",
    tokenPrefix: "",
  },

  shadow: {
    fileName: "shadows", // this should be somehow synced with output.json contents
    varName: "Shadows",
    themeProperty: "shadows",
    tokenPrefix: "",
  },
  typography: {
    fileName: "typography", // this should be somehow synced with output.json contents
    varName: "Typographies",
    themeProperty: "typographies",
    tokenPrefix: "",
  },
};

Pulsar.registerFunction("getBehavior", function (tokenType) {
  const behavior = BEHAVIOR[tokenType.toLowerCase()];
  return (
    behavior || {
      fileName: "uknown",
      varName: "Unknowns",
      themeProperty: "unknowns",
      tokenPrefix: "",
    }
  );
});

Pulsar.registerFunction("buildReferenceMeta", function(tokenType, tokenValue){
  return {
    tokenType,
    referencedToken: tokenValue.referencedToken
  }
})