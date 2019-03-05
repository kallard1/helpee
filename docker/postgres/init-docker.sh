#!/bin/bash
set -e

psql -U postgres -f /tmp/roles.sql

psql -U postgres -d helpee -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
psql -U postgres -d helpee -f /tmp/routines.sql
