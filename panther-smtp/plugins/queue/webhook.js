// queue/webhook

// documentation via: haraka -c /Users/theikkila/code/hacks/smtp-webhook/panther-smtp -h plugins/queue/webhook

// Put your plugin code here
// type: `haraka -h Plugins` for documentation on how to create a plugin

var request = require('request');
var fs = require('fs');

exports.register = function () {
    this.register_hook('queue','ws');
}

exports.hook_data = function (next, connection) {
	connection.transaction.parse_body = true;
	connection.transaction.attachment_hooks(function (content_type, filename, body, stream) {
		attachment_hook(connection, content_type, filename, body, stream);
	});
	next();
};

function attachment_hook (connection, content_type, filename, body, stream) {
	connection.loginfo("Got attachment: " + filename);
	connection.transaction.notes.attachment_count++;
	var ws = fs.createWriteStream(filename);
    stream.pipe(ws);
}

exports.ws = function(next, connection) {
    this.loginfo("Queued:"+ connection.transaction.uuid);
    var content = connection.transaction.body;
    delete content.buf
    request.post({url: 'http://localhost:8080/webhook', json: true, body: content});
    return next(OK);
}