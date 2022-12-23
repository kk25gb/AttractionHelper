let db = require('../db/index')

exports.get = (req, res)=>{
    var sql = 'select * from user'
    db.query(sql, (err, data)=>{
        if(err){
            return res.send('錯誤: '+ err.errno + err.message)
        }
        res.send(data)
        // console.log(data)
    })
}

exports.reg = (req, res)=>{
    var sql = 'insert into `user`(id, name, email, password, user_fav) values (?,?,?,?,?)'
    // console.log('註冊:', sql)
    db.query(sql, [req.query.id, req.query.name, req.query.email, req.query.password, req.query.user_fav],(err, data)=>{
        if(err){
            return res.send('錯誤: '+ err.errno + err.message)
        }
        res.send({
            status: 200,
            message: '註冊成功'
        })
    })
}

exports.updfav = (req, res)=>{
    // console.log('id:',req.query.id,'新的fav:',req.query.fav)
    var sql = 'update user set user_fav = ? where id = ?'
    // console.log(sql)
    db.query(sql, [req.query.fav, req.query.id], (err, data)=>{
        if(err){
            return res.send('錯誤: '+ err.errno + err.message)
        }
        res.send({
            status: 200,
            message: '更新成功'
        })
        
    })
}