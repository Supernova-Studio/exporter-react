/**
 * Convert group name, token name and possible prefix into camelCased string, joining everything together
 */
Pulsar.registerFunction(
  "readableVariableName",
  function (token, tokenGroup, prefix) {
    // Create array with all path segments and token name at the end
    const segments = [...tokenGroup.path];
    if (!tokenGroup.isRoot) {
      segments.push(tokenGroup.name)
    }
    segments.push(token.name);

    if (prefix && prefix.length > 0) {
      segments.unshift(prefix);
    }

    // Create "sentence" separated by spaces so we can camelcase it all
    let sentence = segments.join(" ");

    // Return camelcased string from all segments
    sentence = sentence
      .toLowerCase()
      .replace(/[^a-zA-Z0-9_]+(.)/g, (m, chr) => chr.toUpperCase());

    // if string was started with special character that was cut then turn first char to lowercase
    sentence = sentence.charAt(0).toLowerCase() + sentence.slice(1);

    // only allow letters, digits, underscore
    sentence = sentence.replace(/[^a-zA-Z0-9_]/g, '_')

    // prepend underscore if it starts with digit 
    if (/^\d/.test(sentence)) {
      sentence = '_' + sentence;
    }
    
    return sentence;
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
  radius: {
    fileName: "radii", // this should be somehow synced with output.json contents
    varName: "Radii",
    themeProperty: "radii",
    tokenPrefix: "",
  },
  unknown: {
    fileName: "unknown",
    varName: "Unknowns",
    themeProperty: "unknowns",
    tokenPrefix: "",
  }
};

Pulsar.registerFunction("getBehavior", function (tokenType) {
  return BEHAVIOR[tokenType.toLowerCase()] || BEHAVIOR['unknown'];
});

Pulsar.registerFunction("buildReferenceMeta", function(tokenType, tokenValue){
  return {
    tokenType,
    referencedToken: tokenValue.referencedToken
  }
})