const TODO = require('../models/todos.model')

// const CreateData = (req, res) => {    //intially make a dummy so addtask can add the task, accepts googleid and task

// 	const { gid, task } = req.body  
// 	const to_add = TODO({
// 		googleId: gid,
// 		todos: {
// 			task: task,
// 			isCompleted: false,
// 			id: 78787
// 		}
// 	})

// 	to_add.save((err, result) => {
// 		if (err) { console.log(err); }
// 		res.json({ result: result })

// 	})
// }

const getInit = async (req, res) =>{
	gid = req.user 
	console.log(gid);
	result = await TODO.findOne({googleId:gid},{},{}).sort({"todos._id":-1})
	if (!result) return res.render('indexplain', {gid:gid})
		console.log('vaxa ta');
	result.todos.sort((a,b)=>{
		if (a._id < b._id ) {return 1} else {return -1}
	});
	
			
		res.render('index', {data:result})

}




const addTask = async (req, res) => {
	console.log('the body is',req.body);
	const { gid, task } = req.body       //get google id and task and append it to respective database
	var to_add = { task: task, isCompleted: false }
	data= await TODO.findOneAndUpdate({ googleId: gid }, { $push: { todos: to_add } }, {upsert:true, returnDocument: "after",returnNewDocument:true})
	if(data){
	lastelem = data.todos[data.todos.length-1]
	console.log(lastelem);
	res.send(lastelem)
	}
}


const updateTask = (req, res) => {
	const { gid, taskid } = req.body   //get gid and taskid , change its iscompleted to true
	console.log(req.body);
	
	TODO.findOneAndUpdate({ "googleId": gid, "todos._id": taskid }, { "$set": { "todos.$.isCompleted": "true" } }, {returnDocument: "after"}, (err, result) => {
		if(err) return console.log(err);
		if(result){
	lastelem = result.todos[result.todos.length-1]
	console.log(lastelem);
	res.send(lastelem)
	}
	})
}


const deleteTask = (req, res) => {    //get gid, taskid and remove respectice task
	const { gid, taskid } = req.body

	TODO.findOneAndUpdate({ "googleId": gid }, { "$pull": { "todos": { "_id": taskid } } }, {returnDocument: "after"}, (err, result) => {
		if (err) {
			return console.log(err);
		}
		if(result){
	lastelem = result.todos[result.todos.length-1]
	console.log(lastelem);
	res.send(lastelem)
	}
	})
}
// const getTask = (req, res) => {
// 	
// 	TODO.findOneAndUpdate({ $and : [{googleId:1234}, {todos:{id:78787}}]},{todos:{isCompleted:true}}, {}, (err, result)=>{
// 		if (err) { throw err}
// 		res.send(result)
// 	}
// )}

const getTask = (req, res) => {
	const gid = req.params.gid
	TODO.findOne({"googleId":gid}, {}, {}, (err, result)=>{
		if (err) return err
		res.send(result)
	})
}

const markTask = (req, res) => {
	
}





module.exports = { addTask, getTask, updateTask, markTask, deleteTask, getInit}


,(err,result)=>{
		// console.log(result);
		if (err) return err;
		
	}