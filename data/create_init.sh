#!/bin/bash

# Get the directory of the root of repo and get ENV file
ROOT_DIR="$(dirname "$(dirname "$(realpath "$0")")")"

ENV_FILE="$ROOT_DIR/.env"

# Load the .env file if it exists
if [ -f "$ENV_FILE" ]; then
  source "$ENV_FILE"
else
  echo ".env file not found in $SCRIPT_DIR"
  exit 1
fi

output_file="$ROOT_DIR/data/init_db.sql"

# Start the file by writing multiple lines at once to clear database
cat <<EOF > "$output_file"
DROP SCHEMA $PGUSER CASCADE;
CREATE SCHEMA $PGUSER;

EOF

# Loop through all .sql files and append \i commands to the output file
for sql_file in "$ROOT_DIR/data/"*.sql; do
  # Skip the output file itself
  if [[ "$sql_file" != "$output_file" ]]; then
    echo "\i '$sql_file'" >> "$output_file"
  fi
done

echo "Created $output_file to import all SQL files."
