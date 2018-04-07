let utils={

    toZero(data){
        if(data<10){
            return '0'+data
        }
        return data.toString()
    },

    timeFormait(data){
        if(!data){
            return 
        }
        let date = new Date(+data);
        return [
            data.getFullYear(),
            utils.toZero(data.getMonth()+1),
            utils.toZero(data.getDate()),
        ].join('-')+'~'+[
            utils.toZero(data.getHours()),
            utils.toZero(data.getMinutes()),
            utils.toZero(data.getSeconds())
        ].join(':')
    }
}