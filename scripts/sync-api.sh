# https://github.com/ferdikoomen/openapi-typescript-codegen

cd scripts || exit 1

rm -rf ../src/generated

awk '
/^\s+\/external\// { skip = 1; next; }
/^\s+\/internal\// { skip = 0; }
{ if (!skip) print $0; }
' openapi.yaml > openapi.generated.yaml

#awk -i inplace '
#/  - url: https:\/\/api.lindauerai.com/ { skip = 1; next; }
#{ if (!skip) print $0; }
#{ skip = 0; }
#' openapi.generated.yaml

echo >> openapi.generated.yaml

sed -n '/components:/,$p' common-definitions.yaml >> openapi.generated.yaml

sed -i -r \
  -e 's@^(\s+)-\s+url:\s+(\S*)@\1- url: \2/internal@g' \
  -e 's@-(\s+)internal/@-\1@g' \
  -e 's@common-definitions.yaml@@g' \
  -e 's@^(\s+)/internal/@\1/@g' \
  openapi.generated.yaml

bunx openapi \
  -i ./openapi.generated.yaml \
  -o ../src/generated \
  --useUnionTypes \
  --exportCore true \
  --exportServices true \
  --exportModels true \
  --postfixServices API \
  --postfixModels DTO \
  --indent 2 \
#  --exportSchemas true

rm openapi.generated.yaml
