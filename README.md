# Panther SMTP-gateway POC


# 1. Run webhook-server (panther-mock)
```
cd webhook-server
npm install
node app.js
```

Now you should have webhook-server running on `http://localhost:8080`

# 2. Install Haraka

`npm install -g Haraka`

# 3. Run panter-smtp

```
cd panther-smtp && npm install && cd ..
haraka -c panther-smtp
```

Wait ~15 seconds after `[NOTICE] [-] [core] Listening on :::2525` and you should have SMTP-server running on localhost:2525

# 4. Send email
You need swaks (`brew install swaks`)

Send just plaintext email:
```
# Plaintext message
swaks -h domain.com -t aspa@lassin-pantteri.fi -f nisse.the.hater@example.com -s localhost -p 2525

# Attachment
swaks -h domain.com -t aspa@lassin-pantteri.fi -f nisse.the.hater@example.com -s localhost -p 2525 --attach fluffy.jpg

```


You should see the JSON from webhook in webhook-server stdout
Attachments are saved by Haraka into this working directory.
