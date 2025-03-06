var express = require('express');
var router = express.Router();
const {MongoClient, ObjectId} = require('mongodb'), 
client = new MongoClient("mongodb://localhost:27017/"),

teacher = [
    { name: 'Alex', tel: '91234567' },
    { name: 'David', tel: '92345678' },
    { name: 'David Lee', tel: '99889988' },
    { name: 'Heather', tel: '61234567' }];

router.get('/teacher/name/:qname', async function (req, res,next) {
    try {
        await client.connect();
        let data = await client.db("school").collection("teacher")
            .findOne({name:req.params.qname});                
        res.send(data ? data.tel : " not found");
    } catch (err) {
        console.log(err.name, err.message);
    }
    finally {
        client.close();
    }
});

router.get('/teacher/search', async function (req, res, next) {
    try {
        await client.connect();
        let data = await client.db("school").collection("teacher")
            .findOne({_id:new ObjectId('67c15859e99640d75d5bca59')});
        res.json(data);
    } catch (err) {
        console.log(err.name, err.message);
    } finally {
        client.close();
    }
});

router.get('/class/:cname', async function (req, res, next) {
    try {
        //e.g. class/Class3A&Name.1
        await client.connect();
        let html="", data = await client.db("school").collection(req.params.cname)
            .find().sort(req.query).toArray();
        res.send(data);
    } catch (err) {
        console.log(err.name, err.message);
    }
    finally {
        client.close();
    }
});

router.get('/teacher/list', async function (req, res, next) {
    try {
        await client.connect();
        let html="", data = await client.db("school").collection("teacher")
            .find().sort({name:1}).toArray();
        // <a href='/school/teacher/name/<NAME>'>NAME</a><br>
        for (let d of data)
        {
            //console.log(d.name);
            html += "<a href='/school/teacher/Name/" + d.name + "'>" + d.name + "</a><br>";
            //console.log(html);
        }
        res.send(html);

    } catch (err) {
        console.log(err.name, err.message);
    }
    finally {
        client.close();
    }
});

router.get('/teacher/create', async function (req, res, next) {
    try {
        await client.connect();
        await client.db("school").collection("teacher").insertMany(teacher);
    } catch(err) {
        console.log(err.name, err.message);
    }
    finally {
        client.close();
    }
    res.send(teacher.length + " documents inserted");
});

router.get('/teacher/name/:qname', function (req, res,next) {
    let match = false;
    console.log(req.params.qname);
    /*
    for (let i = 0; i < 3; i++) {
        if(req.params.qname == teacher[i].name) {
            res.send(teacher[i].tel);
            match = true;            
        }
    }
    if(!match) res.send('Not found');
    */
   for (let x of teacher){
        if (req.params.qname.trim().toLowerCase() != x.name.toLowerCase()) continue;

        res.send(x.tel);
        match=true;
        break;        
   }
   console.log(match);
   if(!match) res.send('Not found');
});

router.get('/teacher', function (req, res, next) {
    res.send(Object.keys(teacher[0]));
});

router.get('/', function (req, res, next) {
    res.send('welcome to school API');
});


module.exports = router;