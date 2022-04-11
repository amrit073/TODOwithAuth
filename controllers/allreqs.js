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

const getInit = (req, res) =>{
	gid = req.user 
	console.log(gid);
	

	TODO.findOne({googleId:gid},{},{},(err,result)=>{
		console.log(result);
		if (err) return err;
		if (!result) return res.render('indexplain', {gid:gid})
		console.log('vaxa ta');
			
		res.render('index', {data:result})
	}
	)
}


const addTask = (req, res) => {
	console.log(req.body);
	
	const { gid, task } = req.body       //get google id and task and append it to respective database
	var to_add = { task: task, isCompleted: false }
	TODO.updateOne({ googleId: gid }, { $push: { todos: to_add } }, {upsert:true}
		, (err, result) => {
			if (err) { console.log(err); }
	
			res.json({"result":result})
		})
}


const updateTask = (req, res) => {
	const { gid, taskid } = req.body   //get gid and taskid , change its iscompleted to true

	TODO.findOneAndUpdate({ "googleId": gid, "todos.id": taskid }, { "$set": { "todos.$.isCompleted": "true" } }, {}, (err, result) => {
		res.send(result)
	})
}


const deleteTask = (req, res) => {    //get gid, taskid and remove respectice task
	const { gid, taskid } = req.body

	TODO.findOneAndUpdate({ "googleId": gid }, { "$pull": { "todos": { "id": taskid } } }, {}, (err, result) => {
		if (err) {
			return console.log(err);
		}
		res.send(result)
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