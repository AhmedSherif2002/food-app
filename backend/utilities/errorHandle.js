const errorMsgs = {
    SUCCESS:"success",
    FAILED:"failed",
    ERROR:"error"
}

const errorHandler = (res, err)=>{
    let result;
    if(err){
        result = err;
    }

    res.status(401).json({
        status:"failed",
        data: result
    })
}

module.exports = {
    errorHandler,
    errorMsgs

}
