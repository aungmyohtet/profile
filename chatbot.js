function Chatbot(io) {
    if (!(this instanceof Chatbot)) {
        return new Chatbot(io);
    }
    this.io = io;
    this.init();
};

Chatbot.prototype.init = function () {
    var self = this;
    this.io.on('connection', function (socket) {
        self.handleClientSocket(socket);
    });
};

Chatbot.prototype.handleClientSocket = function (socket) {
    this.initHandshake(socket);
    this.handleClientMessage(socket);
};

Chatbot.prototype.initHandshake = function (socket) {
    messages = [{ sender: 'server', content: 'Hello, my name is Aung Myo Htet. And, what is yours?' }];
    input = { type: 'text', question: 'name' };
    socket.emit('message', { messages: messages, input: input });
};

Chatbot.prototype.handleClientMessage = function (socket) {
    var self = this;
    socket.on('message', function (data) {
        switch (data.question) {
            case 'name': self.handleNameAnswer(socket, data);
                break;
            case 'specialization': self.handleSpecializationAnswer(socket, data);
                break;
            case 'hireType': self.handleHireTypeAnswer(socket, data);
                break;
            case 'wantToLeaveMessage': self.handleWantToLeaveMessageAnswer(socket, data);
                break;
            case 'message': self.handleMessageAnswer(socket, data);
                break;
            default: self.handleDefault(socket, data);
        }
    });
};

Chatbot.prototype.handleNameAnswer = function (socket, data) {
    messages = [{ sender: 'client', content: data.answer }];
    messages.push({ sender: 'server', content: 'Hi, ' + data.answer + ' nice to meet you.' });
    messages.push({ sender: 'server', content: 'So, what kind of specialized developers are you looking for?' });
    input = { type: 'select', question: 'specialization', selection: ['Node', 'Java', 'Others'] };
    socket.emit('message', { messages: messages, input: input });
};

Chatbot.prototype.handleSpecializationAnswer = function (socket, data) {
    messages = [{ sender: 'client', content: data.answer }];
    var messageContent = '';
    switch (data.answer) {
        case 'Node': messageContent = 'Great, I have more than two years of experience in Node.<br/>' +
            'And, I am fimiliar with such JS technologies as express, sails, webpack, react etc.';
            break;
        case 'Java': messageContent = 'Good, I have more than three years of experience in Java. <br/>' +
            'And, I am familiar with such Java technologies as Eclipse Plugin Development, Java EE, Spring etc';
            break;
        case 'Others':
        default: messageContent = 'Well, I am a little familiar with such languages as C#, Python, Ruby and C';
    }
    messages.push({ sender: 'server', content: messageContent });
    messages.push({ sender: 'server', content: 'And, how would you like to hire?' });
    input = { type: 'select', question: 'hireType', selection: ['Full Time', 'Part Time'] };
    socket.emit('message', { messages: messages, input: input });
};

Chatbot.prototype.handleHireTypeAnswer = function (socket, data) {
    messages = [{ sender: 'client', content: data.answer }];
    var messageContent = '';
    switch (data.answer) {
        case 'Full Time': messageContent = 'I want salaries between $1500 and $2000.';
            break;
        case 'Part Time':
        default: messageContent = 'I want about $10 per hour.';
    }
    messages.push({ sender: 'server', content: messageContent });
    messages.push({ sender: 'server', content: 'Do you want to leave any message?' });
    input = { type: 'select', question: 'wantToLeaveMessage', selection: ['yes', 'no'] };
    socket.emit('message', { messages: messages, input: input });
};

Chatbot.prototype.handleWantToLeaveMessageAnswer = function (socket, data) {
    messages = [{ sender: 'client', content: data.answer }];
    var messageContent = '';
    var input = { type: null };
    switch (data.answer) {
        case 'yes': input = { type: 'text', question: 'message' };
            break;
        case 'no':
        default: messages.push({ sender: 'server', content: 'bye bye' });
    }
    socket.emit('message', { messages: messages, input: input });
};

Chatbot.prototype.handleMessageAnswer = function (socket, data) {
    messages = [{ sender: 'client', content: data.answer }];
    messages.push({ sender: 'server', content: 'Thanks for your message. I will read it later' });
    input = { type: null };
    socket.emit('message', { messages: messages, input: input });
};

Chatbot.prototype.handleDefault = function (socket, data) {

};

module.exports = Chatbot;