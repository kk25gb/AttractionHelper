let db = require('../db/index')

// exports.get10 = (req, res)=>{
//     var sql = 'select * from taiwan_db_coded Limit 10'
//     db.query(sql, (err, data)=>{
//         if(err){
//             return res.send('錯誤: '+ err.errno + err.message)
//         }
//         res.send(data)
//     })
// }

exports.get_fav = (req, res)=>{
    fav = req.query.fav.split(',')
    // console.log('fav list:', fav)
    fav = fav.map(element => `a_id=${Number(element)}`)
    fl = fav.join(" OR ")
    var sql = `select * from taiwan where ${fl}`
    // console.log(sql)
    db.query(sql, (err, data)=>{
        if(err){
            return res.send('錯誤: '+ err.errno + err.message)
        }
        // console.log('fav:',data)
        res.send(data)
    })
}
exports.submit_req = (req, res)=>{
    type = req.query.a_type
    cl = req.query.a_city.map(element => `a_city='${element}'`);
    cli = cl.join(" OR ")
    // console.log(cli)
    var sql = `select * from taiwan where a_popular='Y' and a_type=${type} and (${cli}); select * from taiwan where a_popular='N' and a_type=${type} and (${cli})`
    // console.log(sql)
    db.query(sql, (err, data)=>{
        if(err){
            console.log(err.errno + err.message)
            return res.send('錯誤: '+ err.errno + err.message)
        }
        // console.log(data[0].length)
        // console.log(data[1].length)
        // console.log('data[1]: ',data[1])

        res.send(data)
    })
}