const isAdmin = (req, res, next)=>{
    if(req.user.role != "admin"){
        return res.status(400).json({message: "You don't have permission to see all Notes."})
    }
    next()
}

module.exports = isAdmin