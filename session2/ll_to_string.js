// linked list to string

function stringify(list) {
    if (list === null) {
        return "null";
    } else {
        // list is not null
        var node = list;
        var index = 0;
        var stringArray = [];

        while (node !== null) {
            const nodeData = node.data;
            var currentNodeStr = nodeData.toString();
            const nextNode = node.next;
            stringArray[index] = currentNodeStr;
            console.log('combiStringArray position ' + index + ': ' + currentNodeStr);
            node = nextNode;
            index += 1;
        }
        const result = stringArray.join(' -> ') + ' -> null';
        console.log('result: ' + result);
        return result;
    }
}

module.exports = stringify;