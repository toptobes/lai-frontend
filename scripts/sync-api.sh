# https://github.com/ferdikoomen/openapi-typescript-codegen

cd scripts || exit 1

#bunx @openapitools/openapi-generator-cli generate -c openapi-generator-config.yaml
#
#cd ../src || exit 2
#
#rm -rf generated
#mkdir generated && cd generated || exit 3
#
#mv ../../scripts/openapi-temp/*.ts .
#rm -rf ../../scripts/openapi-temp

bunx openapi \
  -i ./openapi.yaml \
  -o ../src/generated \
  --useUnionTypes \
  --exportCore true \
  --exportModels true \
  --exportServices true \
  --exportSchemas true \
  --postfixServices API \
  --postfixModels DTO \
  --indent 2
