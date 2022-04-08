

const express = require('express');

const app = express();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

app.all('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // res.setHeader("Content-Type", "application/json;charset=utf-8");

    next();
})
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
    next()
})
const jwt = require('express-jwt');
app.use(jwt({ secret: 'abc_dx_1008', algorithms: ['HS256'] }).unless({ path: ['/login'] }))

// 导入 mysql 连接池
const db = require('./DB/index.js');
//const { log } = require('console');


app.get('/', function (req, res) {
    res.send('欢迎访问~！')
});

//登录接口
app.post('/login', function (req, res) {
    const usrData = req.body

    db.query('select * from studentinfo where stunum=? and upwd=?', [usrData.stunum, usrData.upwd], (err, results) => {

        if (err) {
            console.log(err);
            return console.log('登录出错啦！')
        }
        if (results.length > 0) {
            const usrData = results[0]
            const jwt = require('jsonwebtoken');
            const usr2 = { ...usrData, upwd: null }
            const token = jwt.sign({ data: usr2 }, 'abc_dx_1008', { expiresIn: 60 * 10 })
            res.send({
                msg: '登录成功~！',
                statuscode: 0,
                token
            })
        }
        else {
            res.send({
                msg: '登录失败~！',
                statuscode: 1
            })
        }
    })
})
//查找学生信息列表
app.get('/list', function (req, res) {
    const usrData = req.body
    console.log(usrData);
    db.query('select * from studentinfo where ? = "?"', [usrData.key, usrData.value], (err, results) => {
        if (err) return console.log('出错啦~')
        let data = {
            msg: '获取学生列表成功',
            statuscode: 0,
            list: results
        }
        res.send(data);
    })
});


app.get('/dog', function (req, res) {

    db.query('select * from dogs where id = ?', req.query.id, (err, results) => {
        if (err) return console.log('新增出错啦~')
        if (results.length > 0) {
            res.send({
                msg: '查询狗狗成功~',
                statuscode: 0,
                dog: results[0]
            })
        } else {
            res.send({
                msg: '未找到想要的狗狗~！',
                statuscode: 1
            })
        }
    })
});

// 3.新增接口-----------------------------
app.post('/adddog', function (req, res) {
    let data = req.body
    console.log(data)

    db.query('insert into dogs set ?', data, (err, results) => {
        if (err) {
            console.log('新增出错了~！')
            return console.log(err)
        }
        if (results.affectedRows > 0) {
            res.send({
                msg: '新增狗狗成功~！',
                statuscode: 0,
                newId: results.insertId
            });
        } else {
            res.send({
                msg: '新增狗狗失败~！',
                statuscode: 2
            });
        }
    })
})

// 4.更新接口-----------------------------
app.post('/modifydog', function (req, res) {
    let data = req.body
    console.log(data)

    db.query('update dogs set ? where id=?', [data, data.id], (err, results) => {
        if (err) {
            console.log('更新出错了~！')
            return console.log(err)
        }

        if (results.affectedRows > 0) {
            res.send({
                msg: '修改狗狗成功~！',
                statuscode: 0
            });
        } else {
            res.send({
                msg: '修改狗狗失败~！',
                statuscode: 2
            });
        }
    })
})


app.get('/dog/:id/:name/:gender', function (req, res) {
    console.log('req.params->', req.params)
    res.send('狗狗狗');
});


app.put('/regdog', function (req, res) {
    console.log(req.body)
    res.send('恭喜您，注册狗狗成功~！')
})

// 5.服务器端 获取 请求报文体 数据- FormData格式！
app.put('/upload', upload.single('headimg'), function (req, res) {
    console.log(req.body)
    console.log(req.file)
    res.send('上传成功啦~！')
})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.send(401)
    }
    console.log(err);
    next()
})
app.listen(8000, () => {
    console.log('服务器启动了： http://localhost:8000')
})