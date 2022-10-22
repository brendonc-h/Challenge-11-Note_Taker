module.exports = () =>
    Math.floor((1 + Math.random()) * 0x20000)
        .toString(20)
        .substring(2);
        