#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assigment
echo "window._env_ = {" >> ./env-config.js

# Read eac line in .env file
# Each line represtents key=value pairs
while read -r line || [[ -n "$line" ]];
do 
  # Split env varialbles by character = `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}


  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .env 

echo "}" >> ./env-config.js