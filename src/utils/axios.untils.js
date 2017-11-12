

var a = function(option){
   
    axios.get(option.url)
    .then(function(response){
        option.obj.$store.commit(option.fn,{response,name:option.name});

    })
}

export default a;

