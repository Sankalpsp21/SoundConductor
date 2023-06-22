exports.validateSchema = (obj, schema) => {
  return (
    obj &&
    Object.keys(schema).every((field) => !schema[field].required || obj[field])
  );
};
