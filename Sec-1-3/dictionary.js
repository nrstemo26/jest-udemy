function splitString(string){
    return string.match(/[^ ]+/g);
}

module.exports = function dictionary(words){
    return (splitString(words) || []).reduce((current, next)=>{
        current[next] = current[next] +1 || 1;
        return current;
    }, {});
    
    // const wordList = splitString(words) || [];
    // const result = {};
    // wordList.forEach(word=>{
    //     result[word] = result[word] +1 || 1;
    // })
    // return result;
}
