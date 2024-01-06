```bash
# Install dependencies
bun i # or npm i

# Run the app
bun dev # or npm run dev

# Try using the API (uses httpie)
# bun try <endpoint> # where endpoint is the resource locator after /internal/
# Dummy authorization built in
bun try gyro/conversations

# Specifying method
# M=<method> bun try <endpoint>
M=GET bun try gyro/conversations

# You can pass in any httpie options as well
# bun try <endpoint> <httpie options>
bun try gyro/conversations -b

# OpenAPI codegen
# Copy updated OpenAPI spec to ./scripts/openapi.yaml
# Copy defs to ./scripts/common-definitions.yaml
bun sync
```
