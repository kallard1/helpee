psql --username "$POSTGRES_USER" -f /tmp/roles.sql

psql -d helpee -c 'CREATE EXTENSION "uuid-ossp";'