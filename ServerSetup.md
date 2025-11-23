## Creating second user other than root

#### SSH into your server as root
`ssh root@your_server_ip`

#### Create new user (replace 'username' with your desired username)
`adduser username`

#### Add user to sudo group
`usermod -aG sudo username`

#### Test sudo access (switch to new user)
`su - username`

`sudo whoami # Should output "root"`

## Setup ssh for that user

```
# Login to your server with newly created user
ssh username@your_server_ip

# Create .ssh directory
mkdir -p ~/.ssh

# Set proper permissions (very important!)
chmod 700 ~/.ssh

# Create authorized_keys file

touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

nano ~/.ssh/authorized_keys

# Copy your local ssh public key to this "authorized_keys"
```

## Install Java

`sudo apt install openjdk-17-jdk -y`

`java -version`

## Install postgresql

`sudo apt install postgresql postgresql-contrib`

`sudo systemctl start postgresql.service`

`sudo -i -u postgres`

`psql` -> It will open the postgresql terminal

`\q`

### Now create a user and role in postgres

`sudo -u postgres createuser --interactive`

```
OutputEnter name of role to add: deploy
Shall the new role be a superuser? (y/n) y
```

`sudo -u postgres psql`

`ALTER ROLE deploy WITH PASSWORD 'password';
`

`ALTER ROLE deploy WITH LOGIN;
`

`sudo -u postgres psql -c "CREATE DATABASE deploy OWNER deploy;"
`

`sudo -u deploy psql
`

`GRANT ALL PRIVILEGES ON DATABASE deploy TO deploy;`

## Clone the git repository

`mkdir apps`

`git clone https://url`

## Maven clean packages

`./mvnw clean package`

## Install nginx

`sudo apt install nginx -y`

create a system d service file

`sudo nano /etc/systemd/system/health-app.service`

add service config there

```
[Unit]
Description=Healthcare Application
After=syslog.target network.target

[Service]
User=deploy
Type=simple
WorkingDirectory=/home/deploy/apps/HealthCare/health_backend
ExecStart=/usr/bin/java -jar /home/deploy/apps/HealthCare/health_backend/target/health-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=health-app

[Install]
WantedBy=multi-user.target
```

then reload the daemon and start the service

```
sudo systemctl daemon-reload
sudo systemctl enable health-app
sudo systemctl start health-app
```

check status

`sudo systemctl status health-app`

Then configure nginx reverse proxy

`sudo nano /etc/nginx/sites-available/health-app`

add config to the reverse proxy

```
server {
    listen 80;
    server_name 192.46.214.185;  # or your_server_ip

    location / {
        proxy_pass http://localhost:5000;  # Changed from 8080 to 5000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (if needed)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts for API requests
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable the site

`sudo ln -s /etc/nginx/sites-available/health-app /etc/nginx/sites-enabled/`

`sudo nginx -t`

`sudo systemctl restart nginx`


## Error handling

Check nginx config

`sudo systemctl status health-app`

`sudo netstat -tulpn | grep 5000 (your port number)`

`sudo systemctl status nginx`

`sudo netstat -tulpn | grep :80`

If the app enabled or not

`ls -la /etc/nginx/sites-enabled/ | grep health-app`

List all enabled sites in nginx

`ls -la /etc/nginx/sites-enabled/`

If 'default' exists, remove it

`sudo rm /etc/nginx/sites-enabled/default`

`sudo systemctl restart nginx`

Try with curl

```bash
curl -X POST https://healthcareapi.duckdns.org/register \
  -H "Content-Type: application/json" \
  -d '{
    "user_name": "testuser",
    "password": "Test123!",
    "user_email": "test@example.com"
  }'
```

## Test the apis with the bash script

```bash
#!/bin/bash

BASE_URL="https://healthcareapi.duckdns.org"
USERNAME="test_$(date +%s)"
PASSWORD="Test123!"
EMAIL="${USERNAME}@example.com"

echo "=== Testing Health API ==="
echo ""

# 1. Register
echo "1. Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST ${BASE_URL}/register \
  -H "Content-Type: application/json" \
  -d "{
    \"user_name\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\",
    \"user_email\": \"${EMAIL}\"
  }")
echo "Response: $REGISTER_RESPONSE"
echo ""

# 2. Login
echo "2. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST ${BASE_URL}/api/auth/server/ \
  -H "Content-Type: application/json" \
  -d "{
    \"user_name\": \"${USERNAME}\",
    \"password\": \"${PASSWORD}\"
  }")
echo "Response: $LOGIN_RESPONSE"
echo ""

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "Token: $TOKEN"
echo ""

# 3. Get User Profile
echo "3. Testing Get User Profile..."
PROFILE_RESPONSE=$(curl -s -X GET ${BASE_URL}/api/users/${USERNAME} \
  -H "Authorization: Bearer ${TOKEN}")
echo "Response: $PROFILE_RESPONSE"
echo ""

# 4. Update Profile
echo "4. Testing Update Profile..."
UPDATE_RESPONSE=$(curl -s -X PUT ${BASE_URL}/api/users/${USERNAME} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d "{
    \"user_name\": \"${USERNAME}\",
    \"user_email\": \"updated_${EMAIL}\",
    \"password\": \"${PASSWORD}\"
  }")
echo "Response: $UPDATE_RESPONSE"
echo ""

echo "=== Tests Complete ==="

```
