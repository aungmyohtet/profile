function SocketApp(io) {
    this.io = io;
    this.init();
}

SocketApp.prototype.init = function () {
    var self = this;
    this.io.on('connection', function (socket) {
        console.log('cliet connected me');
        socket.emit('message', { sender: 'me', content: "Hello, my name is Aung Myo Htet." });
        socket.emit('message', { sender: 'me', content: "And, what is yours?" });
        socket.emit('input', { type: 'text'});
        socket.on('message', function (data) {
            socket.emit('message', { sender: 'other', content: data.content });
            socket.emit('message', self.processMessageForResponse(data));
            socket.emit('input', { type: 'select', data: ["NodeJs", "Java"] });
        });
    });
};

SocketApp.prototype.processMessageForResponse = function (data) {
    if (data.type === 'text' && data.question === 'name') {
        return { sender: 'me', content: "Hello " + data.content + ", nice to meet you." };
    }
    else if(data.type === 'select' && data.question === 'programming language' && data.content === 'NodeJS') {
        return {sender: 'me', content: "Good! I have two years of experiences in NodeJS"};
    }
    else {
        return { sender: 'me', content: "I am sorry, I do not understand" };
    }
}

module.exports = SocketApp;