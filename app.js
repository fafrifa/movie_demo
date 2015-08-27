var express = require('express'),
	app = express();

app.get('/',function(req,res){
	res.send('Hello Mov Anna');
});

app.listen(3000);
console.log('server is running on 3000');