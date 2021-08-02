module.exports = {
    index(req, res){
        res.send('เรียกข้อมูลผู้ใช้ทั้งหมด')
    },
    show(req, res){
        res.send('ดูข้อมูลผู้ใช้งาน ' + req.params.person);
    },
    create(req,res){
        res.send('ทำการสร้างผู้ใช้งาน ' + JSON.stringify(req.body))
    },
    put(req,res){
        res.send('ทำการแก้ไขผู้ใช้งาน' + req.params.userId + ' : '+
        JSON.stringify(req.body));
    },
    remove(req,res){
        res.send('ทำการลบผู้ใช้งาน' + req.params.userId + ' : '+
        JSON.stringify(req.body));
    }
}